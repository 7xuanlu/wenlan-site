import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const repoRoot = resolve(import.meta.dirname, "..");

let modulesPromise;

async function loadI18nModules() {
  modulesPromise ??= Promise.all([
    import("../src/i18n/locales.ts"),
    import("../src/i18n/routing-config.ts"),
    import("../src/i18n/routing.ts"),
    import("../src/i18n/navigation.tsx"),
    import("../src/i18n/hash.ts"),
    import("../src/i18n/protected-tokens.ts"),
    import("../src/i18n/content/index.ts"),
    import("../src/i18n/metadata.ts"),
  ]).then(
    ([
      locales,
      routingConfig,
      routing,
      navigation,
      hash,
      protectedTokens,
      content,
      metadata,
    ]) => ({
      locales,
      routingConfig,
      routing,
      navigation,
      hash,
      protectedTokens,
      content,
      metadata,
    }),
  );

  return modulesPromise;
}

function contentShape(value) {
  if (typeof value === "string") return "string";
  if (Array.isArray(value)) return value.map(contentShape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, contentShape(value[key])]),
    );
  }
  return typeof value;
}

function contentShapesByKey(dictionary) {
  return Object.fromEntries(
    Object.keys(dictionary)
      .sort()
      .map((key) => [key, contentShape(dictionary[key].content)]),
  );
}

function leafCountsByKey(dictionary, flattenLeafStrings) {
  return Object.fromEntries(
    Object.keys(dictionary)
      .sort()
      .map((key) => [key, flattenLeafStrings(dictionary[key].content).length]),
  );
}

function hasNonProtectedText(value, protectedTokens) {
  const unprotected = protectedTokens
    .extractProtectedTokens(value)
    .reduce((remaining, token) => remaining.replaceAll(token, ""), value);

  return /[A-Za-z0-9]/.test(unprotected);
}

const allowedUnchangedLeafValues = new Set([
  "Apache-2.0",
  "GitHub",
  "Qi-Xuan Lu",
  "Wenlan",
  "7xuanlu",
]);

const allowedUnchangedLeafPaths = new Set(["notFound.eyebrow"]);

function findHiddenFallbackLeaves(
  unitKey,
  englishContent,
  translatedContent,
  flattenLeafStrings,
  protectedTokens,
) {
  const translatedLeavesByPath = new Map(
    flattenLeafStrings(translatedContent).map(({ path, value }) => [path, value]),
  );

  return flattenLeafStrings(englishContent)
    .filter(({ path, value }) => {
      if (translatedLeavesByPath.get(path) !== value) return false;
      return requiresTranslatedDifference(unitKey, path, value, protectedTokens);
    })
    .map(({ path, value }) => ({
      path: unitKey ? `${unitKey}.${path}` : path,
      value,
    }));
}

function requiresTranslatedDifference(unitKey, path, value, protectedTokens) {
  if (!hasNonProtectedText(value, protectedTokens)) return false;
  return !isAllowedUnchangedLeaf(unitKey, path, value);
}

function isAllowedUnchangedLeaf(unitKey, path, value) {
  if (isIdLeafPath(path)) return true;
  if (isHrefLeafPath(path)) return true;
  if (isOrdinalLeafPath(path)) return true;
  if (isUrlOnlyValue(value)) return true;
  if (allowedUnchangedLeafValues.has(value)) return true;
  return allowedUnchangedLeafPaths.has(unitKey ? `${unitKey}.${path}` : path);
}

function isIdLeafPath(path) {
  return path === "id" || path.endsWith(".id");
}

function isHrefLeafPath(path) {
  return path === "href" || path.endsWith(".href");
}

function isOrdinalLeafPath(path) {
  return path === "number" || path.endsWith(".number");
}

function isUrlOnlyValue(value) {
  return /^https?:\/\/[^\s]+$/.test(value);
}

function assertArrayItemsHaveStableIds(items, label) {
  assert.ok(Array.isArray(items), `${label} should be an array`);
  assert.ok(items.length > 0, `${label} should not be empty`);
  assert.deepEqual(
    items.map((item) => typeof item.id),
    Array.from({ length: items.length }, () => "string"),
    `${label} item ids`,
  );
  assert.equal(
    new Set(items.map((item) => item.id)).size,
    items.length,
    `${label} item ids should be unique`,
  );
}

async function fileExists(path) {
  try {
    await access(resolve(repoRoot, path));
    return true;
  } catch {
    return false;
  }
}

async function assertFileExists(path) {
  assert.equal(await fileExists(path), true, `${path} should exist`);
}

async function assertFileMissing(path) {
  assert.equal(await fileExists(path), false, `${path} should not exist`);
}

async function assertNotFoundRouteSource(path, options = {}) {
  await assertFileExists(path);

  const source = await readFile(resolve(repoRoot, path), "utf8");
  assert.match(source, /from\s+["']next\/navigation["']/, path);
  assert.match(source, /\bnotFound\(\)/, path);

  if (options.simpleRuntimeNotFound) {
    assert.doesNotMatch(source, /\bdynamicParams\b/, path);
    assert.doesNotMatch(source, /\bgenerateStaticParams\b/, path);
  }
}

async function loadStructuredDataModule() {
  try {
    return await import("../src/app/structured-data.ts");
  } catch (error) {
    assert.fail(`structured data helper missing or invalid: ${error.message}`);
  }
}

function renderJsonLd(Component, locale) {
  const html = renderToStaticMarkup(React.createElement(Component, { locale }));
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (match) => JSON.parse(match[1]),
  );
}

function schemaByType(schemas, type) {
  const schema = schemas.find((item) => item["@type"] === type);
  assert.ok(schema, `${type} schema should exist`);
  return schema;
}

function assertBreadcrumbItems(schema, expectedItems, label) {
  assert.deepEqual(
    schema.itemListElement.map((item) => item.item),
    expectedItems,
    label,
  );
}

test("app root layouts are split between English and translated locale roots", async () => {
  await assertFileMissing("src/app/layout.tsx");
  await assertFileExists("src/app/root-document.tsx");
  await assertFileExists("src/app/(en)/layout.tsx");
  await assertFileExists("src/app/[locale]/layout.tsx");

  const rootDocumentSource = await readFile(
    resolve(repoRoot, "src/app/root-document.tsx"),
    "utf8",
  );
  assert.match(rootDocumentSource, /<html\b/);
  assert.match(rootDocumentSource, /lang=\{LOCALE_CONFIG\[locale\]\.htmlLang\}/);

  const englishLayoutSource = await readFile(
    resolve(repoRoot, "src/app/(en)/layout.tsx"),
    "utf8",
  );
  assert.match(englishLayoutSource, /<RootDocument\s+locale="en"/);
  assert.match(englishLayoutSource, /buildRootMetadata\("en"\)/);
  assert.match(englishLayoutSource, /export\s+\{\s*viewport\s*\}/);

  const localizedLayoutSource = await readFile(
    resolve(repoRoot, "src/app/[locale]/layout.tsx"),
    "utf8",
  );
  assert.match(localizedLayoutSource, /generateStaticParams/);
  assert.match(localizedLayoutSource, /TRANSLATED_LOCALES/);
  assert.match(localizedLayoutSource, /notFound/);
});

test("Chinese locales use dedicated CJK typography stacks", async () => {
  const source = await readFile(resolve(repoRoot, "src/app/globals.css"), "utf8");

  assert.match(source, /html:lang\(zh-Hant\)/);
  assert.match(source, /html:lang\(zh-Hans\)/);
  assert.match(source, /Noto Serif TC/);
  assert.match(source, /Noto Serif SC/);
  assert.match(source, /PingFang TC/);
  assert.match(source, /PingFang SC/);
});

test("bilingual Wenlan wordmark keeps Latin Fraunces and Chinese sans paired", async () => {
  const wordmarkSource = await readFile(
    resolve(repoRoot, "src/components/brand-wordmark.tsx"),
    "utf8",
  );
  assert.match(wordmarkSource, /function\s+splitBrandLabel/);
  assert.match(wordmarkSource, /brand-wordmark__latin/);
  assert.match(wordmarkSource, /brand-wordmark__divider/);
  assert.match(wordmarkSource, /brand-wordmark__cjk/);
  assert.doesNotMatch(wordmarkSource, /brand-wordmark__latin[^>]*aria-hidden/);
  assert.doesNotMatch(wordmarkSource, /brand-wordmark__cjk[^>]*aria-hidden/);

  const homeSource = await readFile(resolve(repoRoot, "src/app/_pages/home.tsx"), "utf8");
  assert.match(homeSource, /<BrandWordmark\s+label=\{content\.nav\.brand\}\s+variant="nav"\s+\/>/);
  assert.match(homeSource, /<BrandWordmark\s+label=\{content\.hero\.title\}\s+variant="hero"\s+\/>/);

  const footerSource = await readFile(resolve(repoRoot, "src/components/site-footer.tsx"), "utf8");
  assert.match(footerSource, /<BrandWordmark\s+label=\{content\.signature\.brand\}\s+variant="footer"\s+\/>/);

  const cssSource = await readFile(resolve(repoRoot, "src/app/globals.css"), "utf8");
  assert.match(cssSource, /--font-brand-latin:\s*var\(--font-fraunces\)/);
  assert.match(cssSource, /\.brand-wordmark__latin\s*{/);
  assert.match(cssSource, /font-variation-settings:\s*"SOFT" 18,\s*"WONK" 0/);
  assert.match(cssSource, /\.brand-wordmark__cjk\s*{/);
  assert.doesNotMatch(cssSource, /\.brand-wordmark__cjk[\s\S]*Noto Serif/);
  assert.doesNotMatch(cssSource, /\.brand-wordmark__cjk[\s\S]*Songti/);
});

test("home nav exposes a route-preserving locale switcher", async () => {
  const source = await readFile(resolve(repoRoot, "src/app/_pages/home.tsx"), "utf8");

  assert.match(source, /SUPPORTED_LOCALES/);
  assert.match(source, /function\s+LanguageSwitcher/);
  assert.match(source, /<LanguageSwitcher\s+locale=\{locale\}\s+href="\/"\s+\/>/);
  assert.match(source, /localizedHrefForLocale\(targetLocale,\s*href\)/);
  assert.match(source, /aria-current=\{targetLocale === locale \? "true" : undefined\}/);
});

test("root SoftwareApplication JSON-LD keeps English featureList off translated locales", async () => {
  const { locales, routing } = await loadI18nModules();
  const { softwareApplicationSchema } = await loadStructuredDataModule();

  const englishSchema = softwareApplicationSchema("en");
  assert.equal(englishSchema.url, routing.canonicalUrl("en", "/"));
  assert.equal(englishSchema.inLanguage, locales.LOCALE_CONFIG.en.hreflang);
  assert.ok(Array.isArray(englishSchema.featureList), "English featureList");
  assert.match(
    englishSchema.featureList.join("\n"),
    /Hybrid retrieval on libSQL/,
    "English featureList keeps current product proof copy",
  );

  for (const locale of ["zh-TW", "zh-CN"]) {
    const schema = softwareApplicationSchema(locale);

    assert.equal(schema.url, routing.canonicalUrl(locale, "/"), `${locale}.url`);
    assert.equal(
      schema.inLanguage,
      locales.LOCALE_CONFIG[locale].hreflang,
      `${locale}.inLanguage`,
    );
    assert.equal(
      Object.hasOwn(schema, "featureList"),
      false,
      `${locale}.featureList`,
    );
  }
});

test("root document delegates SoftwareApplication schema to the locale-aware helper", async () => {
  const source = await readFile(
    resolve(repoRoot, "src/app/root-document.tsx"),
    "utf8",
  );

  assert.match(source, /softwareApplicationSchema\(locale\)/);
  assert.doesNotMatch(source, /featureList\s*:\s*\[/);
  assert.doesNotMatch(source, /Hybrid retrieval on libSQL/);
});

test("global unmatched-route 404 is explicitly enabled and branded", async () => {
  await assertFileExists("src/app/global-not-found.tsx");

  const nextConfigSource = await readFile(resolve(repoRoot, "next.config.ts"), "utf8");
  assert.match(nextConfigSource, /experimental\s*:\s*{/);
  assert.match(nextConfigSource, /globalNotFound\s*:\s*true/);

  const globalNotFoundSource = await readFile(
    resolve(repoRoot, "src/app/global-not-found.tsx"),
    "utf8",
  );
  assert.match(globalNotFoundSource, /^import\s+["']\.\/globals\.css["'];/m);
  assert.match(globalNotFoundSource, /\sfrom\s+["']next\/font\/google["'];/);
  assert.match(globalNotFoundSource, /<html\b/);
  assert.match(globalNotFoundSource, /<body\b/);
  assert.match(globalNotFoundSource, /lang=(?:"en"|'en'|\{"en"\})/);
  assert.match(globalNotFoundSource, /This page does not exist\./);
});

test("English app routes live under the unprefixed route group", async () => {
  for (const path of [
    "src/app/(en)/page.tsx",
    "src/app/(en)/about/page.tsx",
    "src/app/(en)/docs/page.tsx",
    "src/app/(en)/docs/get-started/page.tsx",
    "src/app/(en)/docs/[slug]/page.tsx",
    "src/app/(en)/learn/page.tsx",
    "src/app/(en)/learn/[slug]/page.tsx",
    "src/app/(en)/feed.xml/route.ts",
    "src/app/(en)/llms-full.txt/route.ts",
    "src/app/(en)/not-found.tsx",
  ]) {
    await assertFileExists(path);
  }
});

test("localized core page wrappers and shared page modules exist", async () => {
  for (const path of [
    "src/app/_pages/home.tsx",
    "src/app/_pages/about.tsx",
    "src/app/_pages/docs-index.tsx",
    "src/app/_pages/get-started.tsx",
    "src/app/_pages/not-found.tsx",
    "src/app/[locale]/page.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/docs/page.tsx",
    "src/app/[locale]/docs/get-started/page.tsx",
    "src/app/[locale]/not-found.tsx",
  ]) {
    await assertFileExists(path);
  }
});

test("localized home hero allows translated text to shrink on mobile", async () => {
  const source = await readFile(resolve(repoRoot, "src/app/_pages/home.tsx"), "utf8");

  assert.match(source, /className="relative z-10 w-full min-w-0 max-w-3xl text-center"/);
  assert.match(source, /className="[^"]*\bbreak-words\b[^"]*"/);
});

test("localized get-started layout allows mobile content columns to shrink", async () => {
  const source = await readFile(resolve(repoRoot, "src/app/_pages/get-started.tsx"), "utf8");

  assert.match(source, /className="min-w-0 space-y-14"/);
  assert.match(source, /className="grid min-w-0 gap-5/);
  assert.match(source, /<div className="min-w-0">/);
});

test("localized untranslated docs slug and Learn routes hard 404", async () => {
  await assertNotFoundRouteSource("src/app/[locale]/docs/[slug]/page.tsx", {
    simpleRuntimeNotFound: true,
  });
  await assertNotFoundRouteSource("src/app/[locale]/learn/page.tsx");
  await assertNotFoundRouteSource("src/app/[locale]/learn/[slug]/page.tsx", {
    simpleRuntimeNotFound: true,
  });
});

test("locale model exposes only the supported app locales and metadata", async () => {
  const { locales } = await loadI18nModules();

  assert.equal(locales.DEFAULT_LOCALE, "en");
  assert.deepEqual(locales.SUPPORTED_LOCALES, ["en", "zh-TW", "zh-CN"]);
  assert.deepEqual(locales.TRANSLATED_LOCALES, ["zh-TW", "zh-CN"]);
  assert.deepEqual(locales.htmlLangByLocale, {
    en: "en",
    "zh-TW": "zh-Hant",
    "zh-CN": "zh-Hans",
  });
  assert.deepEqual(locales.hreflangByLocale, {
    en: "en-US",
    "zh-TW": "zh-TW",
    "zh-CN": "zh-CN",
  });
  assert.deepEqual(locales.openGraphLocaleByLocale, {
    en: "en_US",
    "zh-TW": "zh_TW",
    "zh-CN": "zh_CN",
  });
  assert.equal(locales.isSupportedLocale("zh-TW"), true);
  assert.equal(locales.isSupportedLocale("zh-Hant"), false);
});

test("next-intl routing uses as-needed prefixes without locale detection", async () => {
  const { locales, routingConfig } = await loadI18nModules();

  assert.deepEqual(routingConfig.routing.locales, locales.SUPPORTED_LOCALES);
  assert.equal(routingConfig.routing.defaultLocale, "en");
  assert.deepEqual(routingConfig.routing.localePrefix, {
    mode: "as-needed",
    prefixes: {
      "zh-TW": "/zh-TW",
      "zh-CN": "/zh-CN",
    },
  });
  assert.equal(routingConfig.routing.localeDetection, false);
});

test("localized route helpers keep English canonical and prefix translated core routes", async () => {
  const { routing } = await loadI18nModules();

  assert.equal(routing.SITE_URL, "https://useorigin.app");
  assert.deepEqual(routing.CORE_TRANSLATED_PATHS, [
    "/",
    "/about",
    "/docs",
    "/docs/get-started",
  ]);
  assert.equal(routing.localizePath("en", "/docs/get-started"), "/docs/get-started");
  assert.equal(routing.localizePath("zh-TW", "/"), "/zh-TW");
  assert.equal(
    routing.localizePath("zh-TW", "/docs/get-started"),
    "/zh-TW/docs/get-started",
  );
  assert.equal(routing.localizePath("zh-CN", "/about"), "/zh-CN/about");
  assert.equal(routing.localizePath("zh-TW", "/learn"), "/learn");
  assert.deepEqual(routing.stripLocalePrefix("/zh-TW/docs/get-started"), {
    locale: "zh-TW",
    pathname: "/docs/get-started",
  });
  assert.deepEqual(routing.stripLocalePrefix("/docs/get-started"), {
    locale: "en",
    pathname: "/docs/get-started",
  });
  assert.equal(
    routing.canonicalUrl("zh-TW", "/docs/get-started"),
    "https://useorigin.app/zh-TW/docs/get-started",
  );
  assert.equal(routing.canonicalUrl("en", "/"), "https://useorigin.app");
  assert.equal(routing.isTranslatedPath("zh-TW", "/docs/get-started"), true);
  assert.equal(routing.isTranslatedPath("zh-CN", "/about"), true);
  assert.equal(routing.isTranslatedPath("zh-TW", "/learn"), false);
  assert.equal(
    routing.isTranslatedPath("zh-TW", "/learn/wenlan-vs-basic-memory"),
    false,
  );
  assert.equal(routing.isTranslatedPath("zh-CN", "/docs/daily-workflow"), false);
});

test("localized navigation helper localizes translated internal hrefs only", async () => {
  const { navigation } = await loadI18nModules();

  assert.equal(navigation.localizedHrefForLocale("zh-TW", "/about"), "/zh-TW/about");
  assert.equal(
    navigation.localizedHrefForLocale("zh-CN", "/docs/get-started?from=nav#install"),
    "/zh-CN/docs/get-started?from=nav#install",
  );
  assert.equal(navigation.localizedHrefForLocale("zh-TW", "/learn"), "/learn");
  assert.equal(
    navigation.localizedHrefForLocale("zh-TW", "https://useorigin.app/docs"),
    "https://useorigin.app/docs",
  );
});

test("alternate URLs are reciprocal and include x-default for core translated paths", async () => {
  const { locales, routing } = await loadI18nModules();

  for (const pathname of routing.CORE_TRANSLATED_PATHS) {
    const alternates = routing.alternateUrls(pathname);

    assert.deepEqual(Object.keys(alternates).sort(), [
      "en-US",
      "x-default",
      "zh-CN",
      "zh-TW",
    ]);
    assert.equal(alternates["x-default"], routing.canonicalUrl("en", pathname));
    assert.equal(alternates["en-US"], routing.canonicalUrl("en", pathname));
    assert.equal(alternates["zh-TW"], routing.canonicalUrl("zh-TW", pathname));
    assert.equal(alternates["zh-CN"], routing.canonicalUrl("zh-CN", pathname));

    for (const locale of locales.SUPPORTED_LOCALES) {
      assert.deepEqual(
        routing.alternateUrls(routing.localizePath(locale, pathname)),
        alternates,
        `${locale} ${pathname}`,
      );
    }
  }
});

test("page metadata helper emits localized canonical, alternates, and Open Graph locale", async () => {
  const { content, metadata, routing } = await loadI18nModules();
  assert.equal(typeof metadata.buildPageMetadata, "function");

  const pageMetadata = metadata.buildPageMetadata(
    "zh-TW",
    "/about",
    content.localizedContentByLocale["zh-TW"].about.content.seo,
  );
  const canonical = "https://useorigin.app/zh-TW/about";

  assert.equal(pageMetadata.metadataBase.href, "https://useorigin.app/");
  assert.equal(pageMetadata.alternates.canonical, canonical);
  assert.deepEqual(pageMetadata.alternates.languages, {
    "en-US": "https://useorigin.app/about",
    "zh-TW": canonical,
    "zh-CN": "https://useorigin.app/zh-CN/about",
    "x-default": "https://useorigin.app/about",
  });
  assert.deepEqual(
    pageMetadata.alternates.languages,
    routing.alternateUrls("/about"),
  );
  assert.equal(pageMetadata.openGraph.url, canonical);
  assert.equal(pageMetadata.openGraph.locale, "zh_TW");
});

test("root metadata includes reciprocal alternates for translated home locales", async () => {
  const { metadata, routing } = await loadI18nModules();

  for (const locale of ["zh-TW", "zh-CN"]) {
    const rootMetadata = metadata.buildRootMetadata(locale);

    assert.equal(rootMetadata.alternates.canonical, routing.canonicalUrl(locale, "/"));
    assert.deepEqual(rootMetadata.alternates.languages, routing.alternateUrls("/"));
    assert.deepEqual(Object.keys(rootMetadata.alternates.languages).sort(), [
      "en-US",
      "x-default",
      "zh-CN",
      "zh-TW",
    ]);
  }
});

test("core route wrappers export localized metadata for translated pages", async () => {
  const { routing } = await loadI18nModules();
  const routeModules = [
    {
      pathname: "/",
      english: await import("../src/app/(en)/page.tsx"),
      localized: await import("../src/app/[locale]/page.tsx"),
    },
    {
      pathname: "/about",
      english: await import("../src/app/(en)/about/page.tsx"),
      localized: await import("../src/app/[locale]/about/page.tsx"),
    },
    {
      pathname: "/docs",
      english: await import("../src/app/(en)/docs/page.tsx"),
      localized: await import("../src/app/[locale]/docs/page.tsx"),
    },
    {
      pathname: "/docs/get-started",
      english: await import("../src/app/(en)/docs/get-started/page.tsx"),
      localized: await import("../src/app/[locale]/docs/get-started/page.tsx"),
    },
  ];

  for (const { pathname, english, localized } of routeModules) {
    assert.deepEqual(
      english.metadata.alternates.languages,
      routing.alternateUrls(pathname),
      `en ${pathname}`,
    );
    assert.equal(
      english.metadata.openGraph.locale,
      "en_US",
      `en ${pathname} Open Graph locale`,
    );

    assert.equal(typeof localized.generateMetadata, "function", pathname);
    const zhMetadata = await localized.generateMetadata({
      params: Promise.resolve({ locale: "zh-TW" }),
    });

    assert.equal(
      zhMetadata.alternates.canonical,
      routing.canonicalUrl("zh-TW", pathname),
      `zh-TW ${pathname} canonical`,
    );
    assert.deepEqual(
      zhMetadata.alternates.languages,
      routing.alternateUrls(pathname),
      `zh-TW ${pathname} alternates`,
    );
    assert.equal(
      zhMetadata.openGraph.url,
      routing.canonicalUrl("zh-TW", pathname),
      `zh-TW ${pathname} Open Graph URL`,
    );
    assert.equal(
      zhMetadata.openGraph.locale,
      "zh_TW",
      `zh-TW ${pathname} Open Graph locale`,
    );
  }
});

test("sitemap includes localized core routes and excludes untranslated localized sections", async () => {
  const { locales, routing } = await loadI18nModules();
  const { default: sitemap } = await import("../src/app/sitemap.ts");
  const entries = sitemap();
  const urls = new Set(entries.map((entry) => entry.url));
  assert.equal(entries.length, urls.size, "sitemap URLs must be unique");

  for (const pathname of routing.CORE_TRANSLATED_PATHS) {
    for (const locale of locales.SUPPORTED_LOCALES) {
      assert.ok(
        urls.has(routing.canonicalUrl(locale, pathname)),
        `${locale} ${pathname}`,
      );
    }
  }

  assert.equal(urls.has("https://useorigin.app/zh-TW/learn"), false);
  assert.equal(urls.has("https://useorigin.app/zh-CN/learn"), false);
  assert.equal(
    urls.has("https://useorigin.app/zh-TW/learn/wenlan-vs-basic-memory"),
    false,
  );
  assert.equal(
    urls.has("https://useorigin.app/zh-CN/learn/wenlan-vs-basic-memory"),
    false,
  );
  assert.equal(urls.has("https://useorigin.app/zh-TW/docs/daily-workflow"), false);
  assert.equal(urls.has("https://useorigin.app/zh-CN/docs/daily-workflow"), false);
});

test("sitemap core route alternates are reciprocal for every localized entry", async () => {
  const { locales, routing } = await loadI18nModules();
  const { default: sitemap } = await import("../src/app/sitemap.ts");
  const entriesByUrl = new Map(sitemap().map((entry) => [entry.url, entry]));

  for (const pathname of routing.CORE_TRANSLATED_PATHS) {
    const expectedAlternates = routing.alternateUrls(pathname);

    for (const locale of locales.SUPPORTED_LOCALES) {
      const url = routing.canonicalUrl(locale, pathname);
      const entry = entriesByUrl.get(url);

      assert.ok(entry, url);
      assert.deepEqual(
        entry.alternates?.languages,
        expectedAlternates,
        `${locale} ${pathname}`,
      );
    }
  }
});

test("localized core page JSON-LD uses localized absolute URLs and languages for translated routes", async () => {
  const { locales, routing } = await loadI18nModules();
  const [{ AboutPage }, { DocsIndexPage }, { GetStartedPage }] = await Promise.all([
    import("../src/app/_pages/about.tsx"),
    import("../src/app/_pages/docs-index.tsx"),
    import("../src/app/_pages/get-started.tsx"),
  ]);

  for (const locale of ["zh-TW", "zh-CN"]) {
    const expectedLanguage = locales.LOCALE_CONFIG[locale].hreflang;
    const homeUrl = routing.canonicalUrl(locale, "/");
    const aboutUrl = routing.canonicalUrl(locale, "/about");
    const docsUrl = routing.canonicalUrl(locale, "/docs");
    const getStartedUrl = routing.canonicalUrl(locale, "/docs/get-started");

    const aboutSchemas = renderJsonLd(AboutPage, locale);
    assertBreadcrumbItems(
      schemaByType(aboutSchemas, "BreadcrumbList"),
      [homeUrl, aboutUrl],
      `${locale}.about.breadcrumbs`,
    );
    const aboutSchema = schemaByType(aboutSchemas, "AboutPage");
    assert.equal(aboutSchema.url, aboutUrl);
    assert.equal(aboutSchema.inLanguage, expectedLanguage);
    assert.equal(schemaByType(aboutSchemas, "Person").mainEntityOfPage, aboutUrl);

    const docsSchemas = renderJsonLd(DocsIndexPage, locale);
    assertBreadcrumbItems(
      schemaByType(docsSchemas, "BreadcrumbList"),
      [homeUrl, docsUrl],
      `${locale}.docs.breadcrumbs`,
    );
    const collectionSchema = schemaByType(docsSchemas, "CollectionPage");
    assert.equal(collectionSchema["@id"], `${docsUrl}#collection`);
    assert.equal(collectionSchema.url, docsUrl);
    assert.equal(collectionSchema.inLanguage, expectedLanguage);
    assert.ok(
      collectionSchema.hasPart.some((part) => part.url === getStartedUrl),
      `${locale}.docs.hasPart.getStarted`,
    );
    assert.ok(
      collectionSchema.hasPart.some(
        (part) => part.url === routing.canonicalUrl("en", "/docs/daily-workflow"),
      ),
      `${locale}.docs.hasPart.untranslatedDailyWorkflow`,
    );
    assert.equal(
      collectionSchema.hasPart.some(
        (part) => part.url === `${homeUrl}/docs/daily-workflow`,
      ),
      false,
      `${locale}.docs.hasPart.untranslatedDailyWorkflowLocalized`,
    );

    const getStartedSchemas = renderJsonLd(GetStartedPage, locale);
    assertBreadcrumbItems(
      schemaByType(getStartedSchemas, "BreadcrumbList"),
      [homeUrl, docsUrl, getStartedUrl],
      `${locale}.getStarted.breadcrumbs`,
    );
    const howToSchema = schemaByType(getStartedSchemas, "HowTo");
    assert.equal(howToSchema.url, getStartedUrl);
    assert.equal(howToSchema.inLanguage, expectedLanguage);
  }
});

test("content dictionaries keep exact core keys, content shapes, and leaf counts", async () => {
  const { content, hash } = await loadI18nModules();
  const expectedKeys = ["about", "chrome", "docs", "footer", "getStarted", "home", "notFound"];

  assert.deepEqual(Object.keys(content.enContent).sort(), expectedKeys);
  assert.deepEqual(Object.keys(content.zhTWContent).sort(), expectedKeys);
  assert.deepEqual(Object.keys(content.zhCNContent).sort(), expectedKeys);
  assert.deepEqual(content.localizedContentByLocale.en, content.enContent);
  assert.deepEqual(content.localizedContentByLocale["zh-TW"], content.zhTWContent);
  assert.deepEqual(content.localizedContentByLocale["zh-CN"], content.zhCNContent);

  assert.deepEqual(contentShapesByKey(content.zhTWContent), contentShapesByKey(content.enContent));
  assert.deepEqual(contentShapesByKey(content.zhCNContent), contentShapesByKey(content.enContent));
  assert.deepEqual(
    leafCountsByKey(content.zhTWContent, hash.flattenLeafStrings),
    leafCountsByKey(content.enContent, hash.flattenLeafStrings),
  );
  assert.deepEqual(
    leafCountsByKey(content.zhCNContent, hash.flattenLeafStrings),
    leafCountsByKey(content.enContent, hash.flattenLeafStrings),
  );
});

test("core content dictionaries cover first-release localized page surfaces", async () => {
  const { content } = await loadI18nModules();

  for (const [locale, dictionary] of Object.entries(content.coreContentByLocale)) {
    const home = dictionary.home.content;
    assert.ok(home.nav?.links?.length >= 4, `${locale}.home.content.nav.links`);
    assert.ok(home.hero?.primaryCta?.label, `${locale}.home.content.hero.primaryCta`);
    assert.ok(home.metrics?.rows?.length >= 3, `${locale}.home.content.metrics.rows`);
    assert.ok(home.faqs?.items?.length >= 10, `${locale}.home.content.faqs.items`);

    for (const key of [
      "problem",
      "solution",
      "memoryDistillery",
      "humanControl",
      "features",
      "openSourceCta",
    ]) {
      assert.ok(home.sections?.[key]?.title, `${locale}.home.content.sections.${key}.title`);
      assert.ok(home.sections?.[key]?.body, `${locale}.home.content.sections.${key}.body`);
    }
    assert.ok(home.sections.solution.visualLabels?.start, `${locale}.home.content.sections.solution.visualLabels.start`);
    assert.ok(home.sections.solution.visualLabels?.capture, `${locale}.home.content.sections.solution.visualLabels.capture`);
    assert.ok(home.sections.solution.visualLabels?.handoff, `${locale}.home.content.sections.solution.visualLabels.handoff`);
    assert.ok(home.sections.solution.visualLabels?.resume, `${locale}.home.content.sections.solution.visualLabels.resume`);
    assert.ok(home.sections.memoryDistillery.visualLabels?.merged, `${locale}.home.content.sections.memoryDistillery.visualLabels.merged`);
    assert.ok(home.sections.memoryDistillery.visualLabels?.linked, `${locale}.home.content.sections.memoryDistillery.visualLabels.linked`);
    assert.ok(home.sections.memoryDistillery.visualLabels?.refined, `${locale}.home.content.sections.memoryDistillery.visualLabels.refined`);

    const waitlistCopy = home.sections.openSourceCta.waitlist;
    for (const key of ["emailPlaceholder", "fallbackError"]) {
      assert.ok(waitlistCopy?.[key], `${locale}.home.content.sections.openSourceCta.waitlist.${key}`);
    }
    for (const key of ["required", "invalid", "notConfigured", "unknown"]) {
      assert.ok(waitlistCopy?.errors?.[key], `${locale}.home.content.sections.openSourceCta.waitlist.errors.${key}`);
    }

    assert.ok(dictionary.about.content.principles?.items?.length >= 4, `${locale}.about.content.principles.items`);
    assert.ok(dictionary.docs.content.sections?.items?.length >= 4, `${locale}.docs.content.sections.items`);
    for (const section of dictionary.docs.content.sections.items) {
      assert.ok(section.items?.length > 0, `${locale}.docs.content.sections.${section.id}.items`);
      for (const item of section.items) {
        assert.ok(item.href, `${locale}.docs.content.sections.${section.id}.items.${item.id}.href`);
        assert.ok(item.label, `${locale}.docs.content.sections.${section.id}.items.${item.id}.label`);
        assert.ok(item.title, `${locale}.docs.content.sections.${section.id}.items.${item.id}.title`);
        assert.ok(item.description, `${locale}.docs.content.sections.${section.id}.items.${item.id}.description`);
        assert.ok(item.meta, `${locale}.docs.content.sections.${section.id}.items.${item.id}.meta`);
      }
    }
    assert.ok(dictionary.getStarted.content.steps?.length >= 3, `${locale}.getStarted.content.steps`);
    assert.ok(dictionary.notFound.content.title, `${locale}.notFound.content.title`);
    assert.ok(dictionary.footer.content.ariaLabel, `${locale}.footer.content.ariaLabel`);
    assert.ok(dictionary.footer.content.groups?.length >= 3, `${locale}.footer.content.groups`);
  }

  assertArrayItemsHaveStableIds(content.enContent.home.content.nav.links, "home.nav.links");
  assertArrayItemsHaveStableIds(content.enContent.home.content.metrics.rows, "home.metrics.rows");
  assertArrayItemsHaveStableIds(content.enContent.home.content.faqs.items, "home.faqs.items");
  assertArrayItemsHaveStableIds(content.enContent.about.content.principles.items, "about.principles.items");
  assertArrayItemsHaveStableIds(content.enContent.docs.content.sections.items, "docs.sections.items");
  for (const section of content.enContent.docs.content.sections.items) {
    assertArrayItemsHaveStableIds(section.items, `docs.sections.${section.id}.items`);
  }
  assertArrayItemsHaveStableIds(content.enContent.getStarted.content.steps, "getStarted.steps");
  assertArrayItemsHaveStableIds(content.enContent.footer.content.groups, "footer.groups");
});

test("Chinese home surfaces include script-specific Wenlan Chinese names", async () => {
  const { content } = await loadI18nModules();
  const expectedNames = {
    "zh-TW": "文瀾",
    "zh-CN": "文澜",
  };

  for (const [locale, chineseName] of Object.entries(expectedNames)) {
    const home = content.localizedContentByLocale[locale].home.content;

    for (const [label, value] of Object.entries({
      seoTitle: home.seo.title,
      seoDescription: home.seo.description,
      navBrand: home.nav.brand,
      heroTitle: home.hero.title,
    })) {
      assert.match(value, /Wenlan/, `${locale}.${label}.Wenlan`);
      assert.match(value, new RegExp(chineseName), `${locale}.${label}.${chineseName}`);
    }
  }
});

test("waitlist client-visible copy is dictionary driven", async () => {
  const formSource = await readFile(
    resolve(repoRoot, "src/app/waitlist-form.tsx"),
    "utf8",
  );
  assert.match(formSource, /emailPlaceholder/);
  assert.match(formSource, /copy\.errors\[/);
  assert.match(formSource, /copy\.fallbackError/);
  assert.doesNotMatch(formSource, /placeholder="you@email\.com"/);
  assert.doesNotMatch(formSource, /\{state\.error\}/);

  const actionSource = await readFile(resolve(repoRoot, "src/app/actions.ts"), "utf8");
  assert.match(actionSource, /errorCode/);
  for (const literal of [
    "Email is required.",
    "Please enter a valid email.",
    "Waitlist is not configured yet.",
    "Something went wrong. Please try again.",
  ]) {
    assert.doesNotMatch(actionSource, new RegExp(literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("problem-solution visible SVG labels are supplied by localized content", async () => {
  const source = await readFile(
    resolve(repoRoot, "src/components/problem-solution.tsx"),
    "utf8",
  );
  assert.match(source, /visualLabels/);
  for (const label of ["START", "CAPTURE", "HANDOFF", "RESUME", "MERGED", "LINKED", "REFINED"]) {
    assert.doesNotMatch(source, new RegExp(`>${label}<|label:\\s*["']${label}["']`), label);
  }
});

test("footer aria label is localized content", async () => {
  const source = await readFile(
    resolve(repoRoot, "src/components/site-footer.tsx"),
    "utf8",
  );
  assert.match(source, /aria-label=\{content\.ariaLabel\}/);
  assert.doesNotMatch(source, /aria-label="Site footer"/);
});

test("shared accessibility navigation copy is localized content", async () => {
  const { content } = await loadI18nModules();

  assert.equal(content.enContent.chrome?.content?.skipLinkLabel, "Skip to content");
  assert.equal(content.enContent.chrome?.content?.breadcrumbAriaLabel, "Breadcrumb");
  assert.equal(content.zhTWContent.chrome?.content?.skipLinkLabel, "跳到主要內容");
  assert.equal(content.zhTWContent.chrome?.content?.breadcrumbAriaLabel, "麵包屑");
  assert.equal(content.zhCNContent.chrome?.content?.skipLinkLabel, "跳到主要内容");
  assert.equal(content.zhCNContent.chrome?.content?.breadcrumbAriaLabel, "面包屑");
});

test("localized shared modules do not hardcode English accessibility navigation copy", async () => {
  const rootDocumentSource = await readFile(
    resolve(repoRoot, "src/app/root-document.tsx"),
    "utf8",
  );
  assert.match(rootDocumentSource, /getCoreContent\(locale\)\.chrome\.content/);
  assert.match(rootDocumentSource, /skipLinkLabel/);
  assert.doesNotMatch(rootDocumentSource, />\s*Skip to content\s*</);

  for (const path of [
    "src/app/_pages/about.tsx",
    "src/app/_pages/docs-index.tsx",
    "src/app/_pages/get-started.tsx",
  ]) {
    const source = await readFile(resolve(repoRoot, path), "utf8");
    assert.match(source, /chrome\.breadcrumbAriaLabel/, path);
    assert.doesNotMatch(source, /aria-label="Breadcrumb"/, path);
  }
});

test("docs index visible cards come from localized docs content", async () => {
  const { content } = await loadI18nModules();

  for (const locale of ["zh-TW", "zh-CN"]) {
    const sections = content.localizedContentByLocale[locale].docs.content.sections.items;
    const afterSetup = sections.find((section) => section.id === "after-setup");
    const reference = sections.find((section) => section.id === "reference");
    const project = sections.find((section) => section.id === "project");

    assert.ok(Array.isArray(afterSetup?.items), `${locale}.docs.after-setup.items`);
    assert.ok(Array.isArray(reference?.items), `${locale}.docs.reference.items`);
    assert.ok(Array.isArray(project?.items), `${locale}.docs.project.items`);
    assert.ok(afterSetup?.items.some((item) => item.id === "daily-workflow"), `${locale}.docs.after-setup.daily-workflow`);
    assert.ok(reference?.items.some((item) => item.id === "architecture"), `${locale}.docs.reference.architecture`);
    assert.ok(project?.items.some((item) => item.id === "changelog"), `${locale}.docs.project.changelog`);
    for (const section of sections) {
      for (const item of section.items) {
        assert.match(item.href, /^\/docs\//, `${locale}.${section.id}.${item.id}.href`);
        assert.doesNotMatch(item.meta, /\bUpdated\b/, `${locale}.${section.id}.${item.id}.meta`);
      }
    }
  }

  const source = await readFile(
    resolve(repoRoot, "src/app/_pages/docs-index.tsx"),
    "utf8",
  );
  assert.doesNotMatch(source, /formatDocDate/);
  assert.doesNotMatch(source, /\bUpdated\b/);
  assert.doesNotMatch(source, /title:\s*page\.title/);
  assert.doesNotMatch(source, /description:\s*page\.description/);
});

test("Chinese core content cannot hide English fallback copies", async () => {
  const { content, hash, protectedTokens } = await loadI18nModules();
  assert.ok(content.coreContentByLocale, "coreContentByLocale export");

  const englishDictionary = content.coreContentByLocale.en;

  for (const locale of ["zh-TW", "zh-CN"]) {
    const dictionary = content.coreContentByLocale[locale];

    for (const key of Object.keys(englishDictionary)) {
      const englishUnit = englishDictionary[key];
      const translatedUnit = dictionary[key];
      const englishLeaves = hash.flattenLeafStrings(englishUnit.content);
      const translatedLeaves = hash.flattenLeafStrings(translatedUnit.content);
      const hiddenFallbackLeaves = findHiddenFallbackLeaves(
        key,
        englishUnit.content,
        translatedUnit.content,
        hash.flattenLeafStrings,
        protectedTokens,
      );

      assert.equal(translatedUnit.status, "translated", `${locale}.${key}.status`);
      assert.notDeepEqual(
        translatedLeaves,
        englishLeaves,
        `${locale}.${key}.content`,
      );
      assert.deepEqual(
        hiddenFallbackLeaves,
        [],
        `${locale}.${key}.content`,
      );
    }
  }
});

test("hidden fallback helper catches a copied normal English UI label", async () => {
  const { content, hash, protectedTokens } = await loadI18nModules();
  const copiedFooter = structuredClone(content.zhTWContent.footer.content);
  copiedFooter.groups[0].links[2].label = "Capture quality";

  assert.deepEqual(
    findHiddenFallbackLeaves(
      "footer",
      content.enContent.footer.content,
      copiedFooter,
      hash.flattenLeafStrings,
      protectedTokens,
    ),
    [{ path: "footer.groups[0].links[2].label", value: "Capture quality" }],
  );
});

test("English core content records the current SEO title and description subset", async () => {
  const { content } = await loadI18nModules();

  assert.equal(
    content.enContent.home.content.seo.title,
    "Wenlan | Living Personal Knowledge Library for AI Work",
  );
  assert.equal(
    content.enContent.home.content.seo.description,
    "Wenlan is a living personal knowledge library for AI work: agents capture what they learn, you add sources you trust, and the daemon keeps source-cited pages current.",
  );
  assert.equal(
    content.enContent.about.content.seo.title,
    "About Wenlan | Living Personal Knowledge Library",
  );
  assert.equal(
    content.enContent.docs.content.seo.title,
    "Wenlan Docs | Product Manual",
  );
  assert.equal(
    content.enContent.getStarted.content.seo.title,
    "Get Started with Wenlan | Local AI Work Memory",
  );
});

test("footer and root document pass locale through localized links", async () => {
  const siteFooterSource = await readFile(
    resolve(repoRoot, "src/components/site-footer.tsx"),
    "utf8",
  );
  assert.match(siteFooterSource, /type\s+SiteFooterProps\s*=\s*{\s*locale:\s*Locale\s*;/s);
  assert.match(siteFooterSource, /function\s+SiteFooter\s*\(\s*{\s*locale\s*}/);
  assert.match(siteFooterSource, /getCoreContent\(locale\)\.footer\.content/);
  assert.match(siteFooterSource, /LocalizedLink/);

  const rootDocumentSource = await readFile(
    resolve(repoRoot, "src/app/root-document.tsx"),
    "utf8",
  );
  assert.match(rootDocumentSource, /<SiteFooter\s+locale=\{locale\}\s*\/>/);
});

test("localized core wrappers reject unsupported and English locale params through the shared resolver", async () => {
  await assertFileExists("src/i18n/resolve-locale.ts");
  const resolverSource = await readFile(
    resolve(repoRoot, "src/i18n/resolve-locale.ts"),
    "utf8",
  );
  assert.match(resolverSource, /resolveLocalizedRouteLocale/);
  assert.match(resolverSource, /TRANSLATED_LOCALES/);
  assert.match(resolverSource, /notFound\(\)/);

  for (const path of [
    "src/app/[locale]/page.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/docs/page.tsx",
    "src/app/[locale]/docs/get-started/page.tsx",
  ]) {
    const source = await readFile(resolve(repoRoot, path), "utf8");
    assert.match(source, /resolveLocalizedRouteLocale/, path);
    assert.match(source, /await\s+params/, path);
  }

  const localizedNotFoundSource = await readFile(
    resolve(repoRoot, "src/app/[locale]/not-found.tsx"),
    "utf8",
  );
  assert.match(localizedNotFoundSource, /useParams/, "src/app/[locale]/not-found.tsx");
  assert.match(localizedNotFoundSource, /TRANSLATED_LOCALES/, "src/app/[locale]/not-found.tsx");
});

test("hashing normalizes whitespace, sorts leaves, and detects English content drift", async () => {
  const { hash } = await loadI18nModules();

  assert.equal(hash.normalizeForHash("  A\r\n  B\t\tC  "), "A B C");
  assert.deepEqual(hash.flattenLeafStrings({ b: "two", a: { z: "last", a: "first" } }), [
    { path: "a.a", value: "first" },
    { path: "a.z", value: "last" },
    { path: "b", value: "two" },
  ]);

  const baseHash = hash.hashEnglishContentUnit({
    seo: {
      description: "A living\r\npersonal   library.",
      title: "Wenlan",
    },
  });
  const reorderedSameHash = hash.hashEnglishContentUnit({
    seo: {
      title: "Wenlan",
      description: " A living personal library. ",
    },
  });
  const changedHash = hash.hashEnglishContentUnit({
    seo: {
      description: "A living personal library!",
      title: "Wenlan",
    },
  });

  assert.equal(baseHash, reorderedSameHash);
  assert.notEqual(baseHash, changedHash);
});

test("Chinese dictionaries store fixed source hashes equal to current English content", async () => {
  const { content, hash } = await loadI18nModules();

  for (const [locale, dictionary] of [
    ["zh-TW", content.zhTWContent],
    ["zh-CN", content.zhCNContent],
  ]) {
    for (const key of Object.keys(content.enContent)) {
      assert.match(
        dictionary[key].sourceHash,
        /^[a-f0-9]{64}$/,
        `${locale}.${key}.sourceHash`,
      );
      assert.equal(
        dictionary[key].sourceHash,
        hash.hashEnglishContentUnit(content.enContent[key].content),
        `${locale}.${key}.sourceHash`,
      );
    }
  }

  for (const path of ["src/i18n/content/zh-TW.ts", "src/i18n/content/zh-CN.ts"]) {
    const source = await readFile(resolve(repoRoot, path), "utf8");
    assert.doesNotMatch(source, /enContent|hashEnglishContentUnit|node:crypto/, path);
  }
});

test("translated content dictionaries preserve protected tokens from English content", async () => {
  const { content, protectedTokens } = await loadI18nModules();

  for (const locale of ["zh-TW", "zh-CN"]) {
    const dictionary = content.localizedContentByLocale[locale];

    for (const key of Object.keys(content.enContent)) {
      assert.doesNotThrow(
        () =>
          protectedTokens.assertProtectedTokensPreserved(
            content.enContent[key].content,
            dictionary[key].content,
            `${locale}.${key}`,
          ),
        `${locale}.${key}`,
      );
    }
  }
});

test("protected token extraction preserves commands, URLs, packages, env vars, metrics, license, and names", async () => {
  const { protectedTokens } = await loadI18nModules();
  const source = [
    "`/plugin marketplace add 7xuanlu/claude-plugins`",
    "`/plugin install wenlan@7xuanlu`",
    "`/init`",
    "`/distill`",
    "`npx -y wenlan setup`",
    "`~/.wenlan/bin/wenlan mcp add codex`",
    "`~/.wenlan/.git/` and `crates/wenlan-core/src/eval/`",
    "Wenlan and GitHub stay branded.",
    "See https://github.com/7xuanlu/wenlan and @7xuanlu/wenlan.",
    "Keep release v0.9.1 and daemon version 0.9.1 exact.",
    "Set WENLAN_RERANKER_ENABLED before reading LME_Oracle at 168 tokens / query, 93.6% / 0.857.",
    "Apache-2.0, Qi-Xuan Lu, and 7xuanlu stay exact.",
  ].join("\n");
  const translated = [
    "執行 `/plugin marketplace add 7xuanlu/claude-plugins`。",
    "再執行 `/plugin install wenlan@7xuanlu` 與 `/init`。",
    "需要時執行 `/distill`。",
    "也可以執行 `npx -y wenlan setup`。",
    "MCP 指令是 `~/.wenlan/bin/wenlan mcp add codex`。",
    "本地路徑包含 `~/.wenlan/.git/` 和 `crates/wenlan-core/src/eval/`。",
    "Wenlan 和 GitHub 保持品牌寫法。",
    "參考 https://github.com/7xuanlu/wenlan 和 @7xuanlu/wenlan。",
    "release v0.9.1 和 daemon version 0.9.1 必須保留。",
    "先設定 WENLAN_RERANKER_ENABLED，再閱讀 LME_Oracle 的 168 tokens / query、93.6% / 0.857。",
    "Apache-2.0、Qi-Xuan Lu、7xuanlu 必須保留。",
  ].join("\n");

  const extractedTokens = protectedTokens.extractProtectedTokens(source);
  for (const token of [
    "/plugin marketplace add 7xuanlu/claude-plugins",
    "/plugin install wenlan@7xuanlu",
    "/init",
    "/distill",
    "npx -y wenlan setup",
    "~/.wenlan/bin/wenlan mcp add codex",
    "~/.wenlan/.git/",
    "crates/wenlan-core/src/eval/",
    "Wenlan",
    "GitHub",
    "https://github.com/7xuanlu/wenlan",
    "@7xuanlu/wenlan",
    "v0.9.1",
    "0.9.1",
    "WENLAN_RERANKER_ENABLED",
    "LME_Oracle",
    "168 tokens / query",
    "93.6%",
    "0.857",
    "Apache-2.0",
    "Qi-Xuan Lu",
    "7xuanlu",
  ]) {
    assert.ok(extractedTokens.includes(token), token);
  }
  assert.doesNotThrow(() =>
    protectedTokens.assertProtectedTokensPreserved(source, translated, "protected sample"),
  );
  assert.throws(
    () =>
      protectedTokens.assertProtectedTokensPreserved(
        source,
        translated.replace("0.857", "0.856"),
        "protected sample",
      ),
    /protected sample.*0\.857/s,
  );
  assert.throws(
    () =>
      protectedTokens.assertProtectedTokensPreserved(
        source,
        translated.replace("v0.9.1", "v0.9.2"),
        "protected sample",
      ),
    /protected sample.*v0\.9\.1/s,
  );
});

test("protected token guard rejects changed translated href leaves", async () => {
  const { content, protectedTokens } = await loadI18nModules();
  const translated = structuredClone(content.zhTWContent.notFound.content);
  translated.popularDestinations[0].href = "/zh-TW/docs/get-started";

  assert.throws(
    () =>
      protectedTokens.assertProtectedTokensPreserved(
        content.enContent.notFound.content,
        translated,
        "zh-TW.notFound",
      ),
    /zh-TW\.notFound.*popularDestinations\[0\]\.href.*\/docs\/get-started/s,
  );
});

test("protected token guard rejects translated product names", async () => {
  const { content, protectedTokens } = await loadI18nModules();
  const translated = structuredClone(content.zhTWContent.home.content);
  translated.seo.title = translated.seo.title.replace("Wenlan", "文瀾");

  assert.throws(
    () =>
      protectedTokens.assertProtectedTokensPreserved(
        content.enContent.home.content,
        translated,
        "zh-TW.home",
      ),
    /zh-TW\.home.*seo\.title.*Wenlan/s,
  );
});
