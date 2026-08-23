#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { docPages, docUrl } from "../src/app/(en)/docs/docs.ts";
import {
  articles,
  articleUrl,
  SITE_URL,
} from "../src/app/(en)/learn/articles.ts";
import * as sitemapModule from "../src/app/sitemap.ts";
import { getCoreContent } from "../src/i18n/content/index.ts";
import {
  getLocalizedLearnArticles,
} from "../src/i18n/learn-articles.ts";
import { localizedLearnIndexContent } from "../src/i18n/learn-index.ts";
import { canonicalUrl } from "../src/i18n/routing.ts";

const LOCALES = ["en", "zh-TW", "zh-CN"];

const CORE_INTENTS = {
  en: {
    "/": ["Wenlan", "navigational"],
    "/about": ["what is Wenlan", "informational"],
    "/download": ["download Wenlan", "transactional"],
    "/docs": ["Wenlan documentation", "navigational"],
    "/docs/get-started": ["install Wenlan", "task-completion"],
    "/learn": ["AI knowledge base guides", "informational-hub"],
  },
  "zh-TW": {
    "/": ["文瀾", "navigational"],
    "/about": ["文瀾是什麼", "informational"],
    "/download": ["下載文瀾", "transactional"],
    "/docs": ["文瀾文件", "navigational"],
    "/docs/get-started": ["安裝文瀾", "task-completion"],
    "/learn": ["AI 知識庫指南", "informational-hub"],
  },
  "zh-CN": {
    "/": ["文澜", "navigational"],
    "/about": ["文澜是什么", "informational"],
    "/download": ["下载文澜", "transactional"],
    "/docs": ["文澜文档", "navigational"],
    "/docs/get-started": ["安装文澜", "task-completion"],
    "/learn": ["AI 知识库指南", "informational-hub"],
  },
};

const LEARN_INTENT_BY_CATEGORY = {
  Concepts: "informational",
  Comparisons: "commercial-investigation",
  Workflows: "task-completion",
};

const DOC_INTENT_BY_GROUP = {
  "After setup": "task-completion",
  Reference: "reference",
  Project: "project-navigation",
};

function getSitemapFunction() {
  if (typeof sitemapModule.default === "function") return sitemapModule.default;
  if (typeof sitemapModule.default?.default === "function") {
    return sitemapModule.default.default;
  }
  throw new Error("Unable to resolve the sitemap generator");
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.search = "";
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString().replace(/\/$/, "");
}

function normalizeQuery(value) {
  return String(value)
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase();
}

function coreSeo(locale, pathname) {
  const content = getCoreContent(locale);
  if (pathname === "/") return content.home.content.seo;
  if (pathname === "/about") return content.about.content.seo;
  if (pathname === "/download") {
    return content.home.content.download.page.seo;
  }
  if (pathname === "/docs") return content.docs.content.seo;
  if (pathname === "/docs/get-started") {
    return content.getStarted.content.seo;
  }
  if (pathname === "/learn") {
    if (locale === "en") {
      return {
        title: "LLM Wiki & AI Knowledge Base Guides | Wenlan",
        description:
          "Build a source-backed AI knowledge base with maintained LLM wiki pages, citations, review, refresh state, and local workflows for AI agents.",
      };
    }
    return localizedLearnIndexContent[locale].seo;
  }
  throw new Error(`Unsupported core intent path: ${locale} ${pathname}`);
}

function contentRow({
  url,
  locale,
  surface,
  primaryQuery,
  intentType,
  title,
  userNeed,
  source,
}) {
  return {
    url: normalizeUrl(url),
    locale,
    surface,
    primaryQuery: primaryQuery.trim(),
    intentType,
    title: title.trim(),
    userNeed: userNeed.trim(),
    source,
  };
}

export function buildPageIntentRows() {
  const rows = [];

  for (const locale of LOCALES) {
    for (const [pathname, [primaryQuery, intentType]] of Object.entries(
      CORE_INTENTS[locale],
    )) {
      const seo = coreSeo(locale, pathname);
      rows.push(
        contentRow({
          url: canonicalUrl(locale, pathname),
          locale,
          surface: "core",
          primaryQuery,
          intentType,
          title: seo.title,
          userNeed: seo.description,
          source: `core:${pathname}`,
        }),
      );
    }
  }

  for (const page of docPages) {
    rows.push(
      contentRow({
        url: docUrl(page.slug),
        locale: "en",
        surface: "docs",
        primaryQuery: page.keywords?.[0] ?? "",
        intentType: DOC_INTENT_BY_GROUP[page.group],
        title: page.metaTitle,
        userNeed: page.metaDescription,
        source: `docs:${page.slug}`,
      }),
    );
  }

  for (const article of articles) {
    rows.push(
      contentRow({
        url: articleUrl(article.slug),
        locale: "en",
        surface: "learn",
        primaryQuery: article.keywords[0] ?? "",
        intentType: LEARN_INTENT_BY_CATEGORY[article.category],
        title: article.metaTitle,
        userNeed: article.metaDescription,
        source: `learn:${article.slug}`,
      }),
    );
  }

  for (const locale of ["zh-TW", "zh-CN"]) {
    for (const article of getLocalizedLearnArticles(locale)) {
      rows.push(
        contentRow({
          url: canonicalUrl(locale, `/learn/${article.slug}`),
          locale,
          surface: "learn",
          primaryQuery: article.keywords[0] ?? "",
          intentType: LEARN_INTENT_BY_CATEGORY[article.category],
          title: article.metaTitle,
          userNeed: article.metaDescription,
          source: `learn:${article.slug}`,
        }),
      );
    }
  }

  return rows.sort((a, b) => a.url.localeCompare(b.url, "en"));
}

export function validatePageIntentRows(
  rows,
  sitemapUrls = getSitemapFunction()().map((entry) => entry.url),
) {
  const errors = [];
  const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
  const rowsByUrl = new Map();
  const ownerByLocaleQuery = new Map();
  const titleByLocale = new Map();

  for (const row of rows) {
    for (const field of [
      "url",
      "locale",
      "surface",
      "primaryQuery",
      "intentType",
      "title",
      "userNeed",
      "source",
    ]) {
      if (!String(row[field] ?? "").trim()) {
        errors.push(`missing ${field}: ${row.url || row.source || "unknown"}`);
      }
    }

    const normalizedUrl = normalizeUrl(row.url);
    const urlOwners = rowsByUrl.get(normalizedUrl) ?? [];
    urlOwners.push(row.source);
    rowsByUrl.set(normalizedUrl, urlOwners);

    const queryKey = `${row.locale}:${normalizeQuery(row.primaryQuery)}`;
    const queryOwner = ownerByLocaleQuery.get(queryKey);
    if (queryOwner && queryOwner !== normalizedUrl) {
      errors.push(
        `duplicate primary query in ${row.locale}: ${row.primaryQuery} -> ${queryOwner}, ${normalizedUrl}`,
      );
    } else {
      ownerByLocaleQuery.set(queryKey, normalizedUrl);
    }

    const titleKey = `${row.locale}:${normalizeQuery(row.title)}`;
    const titleOwner = titleByLocale.get(titleKey);
    if (titleOwner && titleOwner !== normalizedUrl) {
      errors.push(
        `duplicate title in ${row.locale}: ${row.title} -> ${titleOwner}, ${normalizedUrl}`,
      );
    } else {
      titleByLocale.set(titleKey, normalizedUrl);
    }
  }

  for (const [url, owners] of rowsByUrl) {
    if (owners.length !== 1) {
      errors.push(`duplicate intent URL: ${url} -> ${owners.join(", ")}`);
    }
    if (!sitemapSet.has(url)) errors.push(`intent URL is not in sitemap: ${url}`);
  }

  for (const url of sitemapSet) {
    if (!rowsByUrl.has(url)) errors.push(`missing sitemap URL: ${url}`);
  }

  return {
    errors: [...new Set(errors)].sort(),
    sitemapCount: sitemapSet.size,
    intentCount: rows.length,
  };
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function renderPageIntentReport(rows, capturedAt) {
  const counts = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      rows.filter((row) => row.locale === locale).length,
    ]),
  );
  const sections = LOCALES.map((locale) => {
    const localeRows = rows.filter((row) => row.locale === locale);
    return `## ${locale}\n\n| URL | Surface | Intent | Primary search | User need |\n| --- | --- | --- | --- | --- |\n${localeRows
      .map(
        (row) =>
          `| ${escapeCell(new URL(row.url).pathname)} | ${escapeCell(row.surface)} | ${escapeCell(row.intentType)} | ${escapeCell(row.primaryQuery)} | ${escapeCell(row.userNeed)} |`,
      )
      .join("\n")}`;
  });

  return `# Wenlan Search Intent Map\n\nCaptured at: ${capturedAt}\n\nThis is a deterministic planning and ownership contract for every canonical URL in the sitemap. A primary search phrase identifies the page owner; it is not keyword volume, a ranking promise, or a claim that Google uses the site's meta-keywords field. Locale variants may own the same concept in different languages.\n\n## Coverage\n\n| Locale | Mapped sitemap URLs |\n| --- | ---: |\n| English | ${counts.en} |\n| zh-TW | ${counts["zh-TW"]} |\n| zh-CN | ${counts["zh-CN"]} |\n| Total | ${rows.length} |\n\nThe contract fails when a sitemap URL has no owner, one URL has multiple records, a locale has duplicate primary searches or titles, or required intent fields are empty. Technical canonical, hreflang, indexability, and rendering checks remain separate regression gates.\n\n${sections.join("\n\n")}\n`;
}

function parseArgs(argv) {
  const args = { output: null };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--output") {
      args.output = argv[index + 1];
      index += 1;
    }
  }
  return args;
}

async function main() {
  const rows = buildPageIntentRows();
  const result = validatePageIntentRows(rows);
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`[seo-intent] ${error}`);
    process.exitCode = 1;
    return;
  }

  const args = parseArgs(process.argv.slice(2));
  if (args.output) {
    const outputPath = resolve(args.output);
    await writeFile(
      outputPath,
      renderPageIntentReport(rows, new Date().toISOString()),
      "utf8",
    );
    console.log(`[seo-intent] wrote ${outputPath}`);
  }
  console.log(
    `[seo-intent] PASS: ${result.intentCount}/${result.sitemapCount} sitemap URLs have one locale-aware intent owner.`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}

export { CORE_INTENTS, SITE_URL };
