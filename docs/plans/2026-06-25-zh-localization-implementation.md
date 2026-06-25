# zh-TW and zh-CN Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add translated Traditional Chinese and Simplified Chinese core pages while blocking silent drift from the English source.

**Architecture:** English remains unprefixed. Chinese core pages render at `/zh-TW` and `/zh-CN`, and untranslated Chinese docs or learn URLs return hard 404 responses. Use `next-intl` for maintained App Router routing/navigation primitives, and keep repo-local coverage, hash, and protected-token guards because those are product-specific.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next-intl`, Node `node:test`, `tsx` for TypeScript imports in tests.

---

## Source Material

- Design spec: `docs/specs/2026-06-25-zh-localization-design.md`
- Existing English pages:
  - `src/app/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/docs/page.tsx`
  - `src/app/docs/get-started/page.tsx`
  - `src/app/not-found.tsx`
  - `src/components/site-footer.tsx`
  - `src/components/sections.tsx`
  - `src/components/problem-solution.tsx`
- Current root document shell: `src/app/layout.tsx`
- Current sitemap: `src/app/sitemap.ts`
- Current docs and learn corpora:
  - `src/app/docs/docs.ts`
  - `src/app/learn/articles.ts`

## Required Route Contract

Translated public routes:

```text
/
/about
/docs
/docs/get-started
/zh-TW
/zh-TW/about
/zh-TW/docs
/zh-TW/docs/get-started
/zh-CN
/zh-CN/about
/zh-CN/docs
/zh-CN/docs/get-started
```

Hard-404 Chinese routes until individually translated:

```text
/zh-TW/learn
/zh-TW/learn/*
/zh-CN/learn
/zh-CN/learn/*
/zh-TW/docs/*
/zh-CN/docs/*
```

`/zh-TW/docs/get-started` and `/zh-CN/docs/get-started` are exceptions and must render translated pages.

## File Structure

- Create `src/i18n/locales.ts`
  - Locale IDs, default locale, locale metadata, HTML lang, hreflang, Open Graph locale.
- Create `src/i18n/routing-config.ts`
  - `next-intl` `defineRouting` config with `localePrefix: "as-needed"` and `localeDetection: false`.
- Create `src/i18n/navigation.tsx`
  - `createNavigation(routing)` exports plus a coverage-aware `LocalizedLink`.
- Create `src/i18n/routing.ts`
  - Canonical URL, localized path, locale prefix parsing, explicit route coverage, alternate URL helpers.
- Create `src/i18n/hash.ts`
  - Shared string normalization, leaf extraction, and stable English content hashing.
- Create `src/i18n/protected-tokens.ts`
  - Protected token extraction and assertion helpers.
- Create `src/i18n/content/schema.ts`
  - Shared translated content types.
- Create `src/i18n/content/en.ts`
  - Canonical English core content copied from current core pages and footer.
- Create `src/i18n/content/zh-TW.ts`
  - Traditional Chinese translations for the same content structure.
- Create `src/i18n/content/zh-CN.ts`
  - Simplified Chinese translations for the same content structure.
- Create `src/i18n/content/index.ts`
  - `getCoreContent(locale)` and exported dictionaries.
- Create `src/app/root-document.tsx`
  - Shared `<html>`, `<head>`, theme boot script, JSON-LD shell, skip link, `ThemeProvider`, and localized footer.
- Create `src/app/(en)/layout.tsx`
  - English root layout using `RootDocument` with locale `en`.
- Create `src/app/[locale]/layout.tsx`
  - Localized root layout using `RootDocument`, `generateStaticParams`, and `notFound()` for unsupported locale params.
- Move route files into `src/app/(en)/...`
  - Move English core pages, docs pages, learn pages, feed, and metadata routes under `(en)` when they need the English root layout.
  - Keep metadata routes that do not need a layout at top level only when Next.js supports that location without the root layout.
- Create shared page modules under `src/app/_pages/`
  - `home.tsx`
  - `about.tsx`
  - `docs-index.tsx`
  - `get-started.tsx`
  - `not-found.tsx`
- Create localized route wrappers:
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/about/page.tsx`
  - `src/app/[locale]/docs/page.tsx`
  - `src/app/[locale]/docs/get-started/page.tsx`
  - `src/app/[locale]/not-found.tsx`
  - `src/app/[locale]/learn/page.tsx`
  - `src/app/[locale]/learn/[slug]/page.tsx`
  - `src/app/[locale]/docs/[slug]/page.tsx`
- Create `src/i18n/metadata.ts`
  - Locale-aware metadata, Open Graph, breadcrumb JSON-LD, collection JSON-LD, how-to JSON-LD, and alternates.
- Create `scripts/i18n-contract.test.mjs`
  - Node test suite for locale model, routing, dictionary shape, hash drift, protected tokens, no fallback, and alternates.
- Create `scripts/i18n-built-check.mjs`
  - Post-build network check for translated routes and hard-404 routes.
- Modify `package.json`
  - Add `next-intl` dependency.
  - Add `tsx` dev dependency.
  - Add `test:i18n` and `i18n:technical:built` scripts.
- Modify `next.config.ts`
  - Wrap config with `createNextIntlPlugin` only if the implemented `next-intl` request setup needs it. If `next-intl` is used only for routing/navigation, do not add unnecessary plugin wiring.
- Modify `src/app/sitemap.ts`
  - Add reciprocal alternates for translated routes and exclude untranslated Chinese docs/learn routes.

---

## Task 1: Install maintained i18n tooling and add contract tests

**Files:**
- Modify: `package.json`
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/routing-config.ts`
- Create: `src/i18n/navigation.tsx`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/hash.ts`
- Create: `src/i18n/protected-tokens.ts`
- Create: `src/i18n/content/schema.ts`
- Create: `src/i18n/content/en.ts`
- Create: `src/i18n/content/zh-TW.ts`
- Create: `src/i18n/content/zh-CN.ts`
- Create: `src/i18n/content/index.ts`
- Create: `scripts/i18n-contract.test.mjs`

- [ ] **Step 1: Add dependencies**

Run:

```bash
pnpm add next-intl
pnpm add -D tsx
```

Expected:

```text
dependencies:
+ next-intl
devDependencies:
+ tsx
```

- [ ] **Step 2: Add test scripts**

Edit `package.json` so the scripts block includes these exact commands while preserving existing scripts:

```json
{
  "test:i18n": "node --import tsx --test scripts/i18n-contract.test.mjs",
  "i18n:technical:built": "node scripts/i18n-built-check.mjs"
}
```

- [ ] **Step 3: Write the failing i18n contract test**

Create `scripts/i18n-contract.test.mjs` with this test coverage:

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LOCALE,
  LOCALE_CONFIG,
  SUPPORTED_LOCALES,
  TRANSLATED_LOCALES,
  isSupportedLocale,
} from "../src/i18n/locales.ts";
import {
  CORE_TRANSLATED_PATHS,
  alternateUrls,
  canonicalUrl,
  isTranslatedPath,
  localizePath,
  stripLocalePrefix,
} from "../src/i18n/routing.ts";
import { coreContentByLocale } from "../src/i18n/content/index.ts";
import { flattenLeafStrings, hashEnglishContentUnit, normalizeForHash } from "../src/i18n/hash.ts";
import { assertProtectedTokensPreserved } from "../src/i18n/protected-tokens.ts";

test("locale model uses full public locale codes", () => {
  assert.equal(DEFAULT_LOCALE, "en");
  assert.deepEqual(SUPPORTED_LOCALES, ["en", "zh-TW", "zh-CN"]);
  assert.deepEqual(TRANSLATED_LOCALES, ["zh-TW", "zh-CN"]);
  assert.equal(LOCALE_CONFIG.en.htmlLang, "en");
  assert.equal(LOCALE_CONFIG["zh-TW"].htmlLang, "zh-Hant");
  assert.equal(LOCALE_CONFIG["zh-CN"].htmlLang, "zh-Hans");
  assert.equal(LOCALE_CONFIG.en.hreflang, "en-US");
  assert.equal(LOCALE_CONFIG["zh-TW"].hreflang, "zh-TW");
  assert.equal(LOCALE_CONFIG["zh-CN"].hreflang, "zh-CN");
  assert.equal(isSupportedLocale("zh-TW"), true);
  assert.equal(isSupportedLocale("zh-Hant"), false);
});

test("localized path helpers keep English unprefixed and Chinese prefixed", () => {
  assert.equal(localizePath("en", "/"), "/");
  assert.equal(localizePath("en", "/docs/get-started"), "/docs/get-started");
  assert.equal(localizePath("zh-TW", "/"), "/zh-TW");
  assert.equal(localizePath("zh-TW", "/docs/get-started"), "/zh-TW/docs/get-started");
  assert.equal(localizePath("zh-CN", "/about"), "/zh-CN/about");
  assert.deepEqual(stripLocalePrefix("/zh-TW/docs/get-started"), {
    locale: "zh-TW",
    pathname: "/docs/get-started",
  });
});

test("Chinese coverage allows only translated core pages", () => {
  assert.deepEqual(CORE_TRANSLATED_PATHS, ["/", "/about", "/docs", "/docs/get-started"]);
  for (const locale of TRANSLATED_LOCALES) {
    assert.equal(isTranslatedPath(locale, "/"), true);
    assert.equal(isTranslatedPath(locale, "/about"), true);
    assert.equal(isTranslatedPath(locale, "/docs"), true);
    assert.equal(isTranslatedPath(locale, "/docs/get-started"), true);
    assert.equal(isTranslatedPath(locale, "/learn"), false);
    assert.equal(isTranslatedPath(locale, "/learn/wenlan-vs-basic-memory"), false);
    assert.equal(isTranslatedPath(locale, "/docs/daily-workflow"), false);
  }
});

test("alternates are reciprocal and include x-default for translated pages", () => {
  for (const pathname of CORE_TRANSLATED_PATHS) {
    const alternates = alternateUrls(pathname);
    assert.equal(alternates["en-US"], canonicalUrl("en", pathname));
    assert.equal(alternates["zh-TW"], canonicalUrl("zh-TW", pathname));
    assert.equal(alternates["zh-CN"], canonicalUrl("zh-CN", pathname));
    assert.equal(alternates["x-default"], canonicalUrl("en", pathname));
  }
});

test("dictionaries have exact matching keys for translated core content", () => {
  const englishKeys = Object.keys(coreContentByLocale.en).sort();
  assert.deepEqual(Object.keys(coreContentByLocale["zh-TW"]).sort(), englishKeys);
  assert.deepEqual(Object.keys(coreContentByLocale["zh-CN"]).sort(), englishKeys);
  for (const pageKey of englishKeys) {
    const enLeaves = flattenLeafStrings(coreContentByLocale.en[pageKey]);
    const zhTWLeaves = flattenLeafStrings(coreContentByLocale["zh-TW"][pageKey]);
    const zhCNLeaves = flattenLeafStrings(coreContentByLocale["zh-CN"][pageKey]);
    assert.equal(zhTWLeaves.length, enLeaves.length, `${pageKey} zh-TW leaf count changed`);
    assert.equal(zhCNLeaves.length, enLeaves.length, `${pageKey} zh-CN leaf count changed`);
  }
});

test("hash normalization catches source text drift", () => {
  assert.equal(normalizeForHash("A\\r\\n  B"), "A B");
  assert.equal(normalizeForHash("Use {client} now"), "Use {client} now");
  const original = { id: "hero.title", text: "Living personal knowledge library" };
  const changed = { id: "hero.title", text: "Living personal knowledge system" };
  assert.notEqual(hashEnglishContentUnit(original), hashEnglishContentUnit(changed));
});

test("stored Chinese source hashes match current English source hashes", () => {
  for (const pageKey of Object.keys(coreContentByLocale.en)) {
    const currentHash = hashEnglishContentUnit(coreContentByLocale.en[pageKey].content);
    assert.match(coreContentByLocale["zh-TW"][pageKey].sourceHash, /^[a-f0-9]{64}$/);
    assert.match(coreContentByLocale["zh-CN"][pageKey].sourceHash, /^[a-f0-9]{64}$/);
    assert.equal(coreContentByLocale["zh-TW"][pageKey].sourceHash, currentHash, `${pageKey} zh-TW is stale`);
    assert.equal(coreContentByLocale["zh-CN"][pageKey].sourceHash, currentHash, `${pageKey} zh-CN is stale`);
  }
});

test("protected tokens are preserved across translations", () => {
  for (const pageKey of Object.keys(coreContentByLocale.en)) {
    assertProtectedTokensPreserved(coreContentByLocale.en[pageKey], coreContentByLocale["zh-TW"][pageKey], `zh-TW ${pageKey}`);
    assertProtectedTokensPreserved(coreContentByLocale.en[pageKey], coreContentByLocale["zh-CN"][pageKey], `zh-CN ${pageKey}`);
  }
});
```

Run:

```bash
pnpm test:i18n
```

Expected before implementation:

```text
ERR_MODULE_NOT_FOUND
```

- [ ] **Step 4: Add locale and next-intl routing primitives**

Create `src/i18n/locales.ts`:

```ts
export const DEFAULT_LOCALE = "en" as const;
export const SUPPORTED_LOCALES = ["en", "zh-TW", "zh-CN"] as const;
export const TRANSLATED_LOCALES = ["zh-TW", "zh-CN"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type TranslatedLocale = (typeof TRANSLATED_LOCALES)[number];

export const LOCALE_CONFIG = {
  en: {
    label: "English",
    nativeLabel: "English",
    urlPrefix: "",
    htmlLang: "en",
    hreflang: "en-US",
    openGraphLocale: "en_US",
  },
  "zh-TW": {
    label: "Traditional Chinese",
    nativeLabel: "繁體中文",
    urlPrefix: "/zh-TW",
    htmlLang: "zh-Hant",
    hreflang: "zh-TW",
    openGraphLocale: "zh_TW",
  },
  "zh-CN": {
    label: "Simplified Chinese",
    nativeLabel: "简体中文",
    urlPrefix: "/zh-CN",
    htmlLang: "zh-Hans",
    hreflang: "zh-CN",
    openGraphLocale: "zh_CN",
  },
} as const satisfies Record<
  Locale,
  {
    label: string;
    nativeLabel: string;
    urlPrefix: string;
    htmlLang: string;
    hreflang: string;
    openGraphLocale: string;
  }
>;

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function isTranslatedLocale(value: Locale): value is TranslatedLocale {
  return TRANSLATED_LOCALES.includes(value as TranslatedLocale);
}
```

Create `src/i18n/routing-config.ts`:

```ts
import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./locales";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "zh-TW": "/zh-TW",
      "zh-CN": "/zh-CN",
    },
  },
  localeDetection: false,
});
```

Create `src/i18n/navigation.tsx`:

```tsx
import type { ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing-config";
import type { Locale } from "./locales";
import { isTranslatedPath, localizePath } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

type NextIntlLinkProps = ComponentProps<typeof Link>;

export function LocalizedLink({
  locale,
  href,
  children,
  ...props
}: Omit<NextIntlLinkProps, "href" | "locale"> & {
  locale: Locale;
  href: string;
  children: React.ReactNode;
}) {
  const resolvedHref =
    locale === "en" || isTranslatedPath(locale, href)
      ? localizePath(locale, href)
      : href;

  return (
    <Link href={resolvedHref} locale={false} {...props}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 5: Add route coverage and URL helpers**

Create `src/i18n/routing.ts` with this public API:

```ts
import { DEFAULT_LOCALE, LOCALE_CONFIG, type Locale, TRANSLATED_LOCALES } from "./locales";

export const SITE_URL = "https://useorigin.app";
export const CORE_TRANSLATED_PATHS = ["/", "/about", "/docs", "/docs/get-started"] as const;
export type CoreTranslatedPath = (typeof CORE_TRANSLATED_PATHS)[number];

const CORE_TRANSLATED_SET = new Set<string>(CORE_TRANSLATED_PATHS);

export function normalizePathname(pathname: string): string {
  if (pathname === "") return "/";
  const noQuery = pathname.split("?")[0]?.split("#")[0] ?? "/";
  const withSlash = noQuery.startsWith("/") ? noQuery : `/${noQuery}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : "/";
}

export function localizePath(locale: Locale, pathname: string): string {
  const normalized = normalizePathname(pathname);
  if (locale === DEFAULT_LOCALE) return normalized;
  const prefix = LOCALE_CONFIG[locale].urlPrefix;
  return normalized === "/" ? prefix : `${prefix}${normalized}`;
}

export function canonicalUrl(locale: Locale, pathname: string): string {
  return `${SITE_URL}${localizePath(locale, pathname)}`;
}

export function stripLocalePrefix(pathname: string): { locale: Locale; pathname: string } {
  const normalized = normalizePathname(pathname);
  for (const locale of TRANSLATED_LOCALES) {
    const prefix = LOCALE_CONFIG[locale].urlPrefix;
    if (normalized === prefix) return { locale, pathname: "/" };
    if (normalized.startsWith(`${prefix}/`)) {
      return { locale, pathname: normalized.slice(prefix.length) || "/" };
    }
  }
  return { locale: DEFAULT_LOCALE, pathname: normalized };
}

export function isTranslatedPath(locale: Locale, pathname: string): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  return CORE_TRANSLATED_SET.has(normalizePathname(pathname));
}

export function assertTranslatedPath(locale: Locale, pathname: string): void {
  if (!isTranslatedPath(locale, pathname)) {
    throw new Error(`Missing ${locale} translation for ${normalizePathname(pathname)}`);
  }
}

export function alternateUrls(pathname: CoreTranslatedPath): Record<string, string> {
  return {
    [LOCALE_CONFIG.en.hreflang]: canonicalUrl("en", pathname),
    [LOCALE_CONFIG["zh-TW"].hreflang]: canonicalUrl("zh-TW", pathname),
    [LOCALE_CONFIG["zh-CN"].hreflang]: canonicalUrl("zh-CN", pathname),
    "x-default": canonicalUrl("en", pathname),
  };
}
```

- [ ] **Step 6: Add content schema, hash helpers, and protected-token checks**

Create `src/i18n/content/schema.ts` with typed page units:

```ts
export type CoverageStatus = "translated" | "fallback_en" | "needs_update" | "unavailable";

export type LocalizedPage<TContent> = {
  id: string;
  status: CoverageStatus;
  sourceHash: string;
  content: TContent;
};

export type HomeContent = Record<string, unknown>;
export type AboutContent = Record<string, unknown>;
export type DocsIndexContent = Record<string, unknown>;
export type GetStartedContent = Record<string, unknown>;
export type NotFoundContent = Record<string, unknown>;
export type FooterContent = Record<string, unknown>;

export type CoreContent = {
  home: LocalizedPage<HomeContent>;
  about: LocalizedPage<AboutContent>;
  docs: LocalizedPage<DocsIndexContent>;
  getStarted: LocalizedPage<GetStartedContent>;
  notFound: LocalizedPage<NotFoundContent>;
  footer: LocalizedPage<FooterContent>;
};
```

Create `src/i18n/hash.ts`:

```ts
import { createHash } from "node:crypto";

export function normalizeForHash(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
}

export function flattenLeafStrings(value: unknown): string[] {
  if (typeof value === "string") return [normalizeForHash(value)];
  if (typeof value === "number" || typeof value === "boolean" || value == null) return [];
  if (Array.isArray(value)) return value.flatMap((item) => flattenLeafStrings(item));
  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .flatMap((key) => flattenLeafStrings((value as Record<string, unknown>)[key]));
  }
  return [];
}

export function hashEnglishContentUnit(value: unknown): string {
  const leaves = flattenLeafStrings(value);
  return createHash("sha256").update(JSON.stringify(leaves)).digest("hex");
}
```

Create `src/i18n/protected-tokens.ts`:

```ts
import assert from "node:assert/strict";
import { flattenLeafStrings } from "./hash";

export const PROTECTED_TOKEN_PATTERNS = [
  /\/plugin marketplace add 7xuanlu\/claude-plugins/g,
  /\/plugin install wenlan@7xuanlu/g,
  /\/init/g,
  /npx -y wenlan setup/g,
  /~\/\.wenlan\/bin\/wenlan/g,
  /WENLAN_[A-Z_]+/g,
  /LME_[A-Za-z]+/g,
  /\d+(?:\.\d+)?%/g,
  /\d+\.\d{3}/g,
  /Apache-2\.0/g,
  /https:\/\/[^\s)"]+/g,
  /Qi-Xuan Lu/g,
  /7xuanlu/g,
];

function extractProtectedTokens(value: unknown): string[] {
  const text = flattenLeafStrings(value).join("\n");
  return [...new Set(PROTECTED_TOKEN_PATTERNS.flatMap((pattern) => text.match(pattern) ?? []))].sort();
}

export function assertProtectedTokensPreserved(source: unknown, translated: unknown, label: string): void {
  const sourceTokens = extractProtectedTokens(source);
  const translatedText = flattenLeafStrings(translated).join("\n");
  for (const token of sourceTokens) {
    assert.equal(translatedText.includes(token), true, `${label} missing protected token ${token}`);
  }
}
```

- [ ] **Step 7: Add initial dictionaries**

Create English, Traditional Chinese, and Simplified Chinese dictionaries with matching keys:

```ts
// src/i18n/content/en.ts
import type { CoreContent } from "./schema";

export const enContent = {
  home: {
    id: "home",
    status: "translated",
    sourceHash: "en",
    content: {
      meta: {
        title: "Wenlan | Living Personal Knowledge Library for AI Work",
        description: "Wenlan is a living personal knowledge library for AI work: agents capture what they learn, you add sources you trust, and the daemon keeps source-cited pages current.",
      },
    },
  },
  about: {
    id: "about",
    status: "translated",
    sourceHash: "en",
    content: {
      meta: {
        title: "About Wenlan | Living Personal Knowledge Library",
        description: "Wenlan is an open-source, local-first personal knowledge library for AI work, built by agents and grounded in its sources.",
      },
    },
  },
  docs: {
    id: "docs",
    status: "translated",
    sourceHash: "en",
    content: {
      meta: {
        title: "Wenlan Docs | Product Manual",
        description: "Install Wenlan, learn the daily AI work memory loop, understand the architecture, and follow the project roadmap, changelog, and evals.",
      },
    },
  },
  getStarted: {
    id: "get-started",
    status: "translated",
    sourceHash: "en",
    content: {
      meta: {
        title: "Get Started with Wenlan | Local AI Work Memory",
        description: "Install Wenlan through the Claude Code plugin or run Wenlan setup before connecting another MCP client.",
      },
    },
  },
  notFound: {
    id: "not-found",
    status: "translated",
    sourceHash: "en",
    content: {
      title: "Page not found",
      body: "The page you are looking for does not exist.",
      homeLabel: "Go home",
    },
  },
  footer: {
    id: "footer",
    status: "translated",
    sourceHash: "en",
    content: {
      tagline: "Living personal knowledge library for AI work.",
      shortTagline: "Living personal knowledge library",
      builtBy: "Built by",
    },
  },
} satisfies CoreContent;
```

The worker must expand these dictionaries during Task 3 so every visible string and SEO string from the core pages is represented. The initial subset makes Task 1 tests executable before page extraction.

After creating `src/i18n/content/en.ts`, print the current English source hashes. The hash calculation lives in this one-off command and in tests, not inside the runtime content module:

```bash
node --import tsx -e 'const [{ enContent }, { hashEnglishContentUnit }] = await Promise.all([import("./src/i18n/content/en.ts"), import("./src/i18n/hash.ts")]); for (const [key, page] of Object.entries(enContent)) console.log(`${key} ${hashEnglishContentUnit(page.content)}`)'
```

Create `src/i18n/content/zh-TW.ts` and `src/i18n/content/zh-CN.ts` with the same shape. The `sourceHash` fields in both Chinese files must be fixed 64-character string literals from the command output, not imports from `enContent`, not a function call, and not a re-export. This is what makes later English edits fail the stale-translation test.

```ts
import type { CoreContent } from "./schema";

export const zhTWContent = {
  home: {
    id: "home",
    status: "translated",
    sourceHash: "64-character-home-sha256-from-the-command-output",
    content: {
      meta: {
        title: "Wenlan | AI 工作的活知識庫",
        description: "Wenlan 是為 AI 工作打造的活個人知識庫：代理會記錄學到的內容，你加入信任來源，daemon 會讓附來源的頁面保持最新。",
      },
    },
  },
  about: {
    id: "about",
    status: "translated",
    sourceHash: "64-character-about-sha256-from-the-command-output",
    content: {
      meta: {
        title: "關於 Wenlan | 活的個人知識庫",
        description: "Wenlan 是開源、local-first 的 AI 工作個人知識庫，由代理協作建立，並以來源為根據。",
      },
    },
  },
  docs: {
    id: "docs",
    status: "translated",
    sourceHash: "64-character-docs-sha256-from-the-command-output",
    content: {
      meta: {
        title: "Wenlan 文件 | 產品手冊",
        description: "安裝 Wenlan，學習每日 AI 工作記憶流程，理解架構，並追蹤專案 roadmap、changelog 與評測。",
      },
    },
  },
  getStarted: {
    id: "get-started",
    status: "translated",
    sourceHash: "64-character-getStarted-sha256-from-the-command-output",
    content: {
      meta: {
        title: "開始使用 Wenlan | 本機 AI 工作記憶",
        description: "透過 Claude Code plugin 安裝 Wenlan，或先執行 Wenlan setup 再連接其他 MCP client。",
      },
    },
  },
  notFound: {
    id: "not-found",
    status: "translated",
    sourceHash: "64-character-notFound-sha256-from-the-command-output",
    content: {
      title: "找不到頁面",
      body: "你要找的頁面不存在。",
      homeLabel: "回首頁",
    },
  },
  footer: {
    id: "footer",
    status: "translated",
    sourceHash: "64-character-footer-sha256-from-the-command-output",
    content: {
      tagline: "為 AI 工作打造的活個人知識庫。",
      shortTagline: "活的個人知識庫",
      builtBy: "作者",
    },
  },
} satisfies CoreContent;
```

For `zh-CN`, use Simplified Chinese text and the export name `zhCNContent`.

Create `src/i18n/content/index.ts`:

```ts
import type { Locale } from "../locales";
import { enContent } from "./en";
import { zhTWContent } from "./zh-TW";
import { zhCNContent } from "./zh-CN";

export const coreContentByLocale = {
  en: enContent,
  "zh-TW": zhTWContent,
  "zh-CN": zhCNContent,
} as const;

export function getCoreContent(locale: Locale) {
  return coreContentByLocale[locale];
}
```

- [ ] **Step 8: Run tests**

Run:

```bash
pnpm test:i18n
pnpm lint
```

Expected:

```text
pnpm test:i18n
# all i18n tests pass

pnpm lint
# TypeScript exits 0
```

- [ ] **Step 9: Commit**

Run:

```bash
git add package.json pnpm-lock.yaml src/i18n scripts/i18n-contract.test.mjs
git commit -m "feat: add i18n contract layer"
```

---

## Task 2: Split root layouts and preserve English routes

**Files:**
- Create: `src/app/root-document.tsx`
- Create: `src/app/(en)/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Move: current English route files from `src/app/...` into `src/app/(en)/...`
- Delete: `src/app/layout.tsx` after its shared shell exists in `root-document.tsx`
- Modify: imports in moved route files
- Modify: `scripts/i18n-contract.test.mjs`

- [ ] **Step 1: Extend tests for route-group layout structure**

Append tests that read the filesystem and assert the layout split:

```js
import { existsSync, readFileSync } from "node:fs";

test("root layouts provide server-side locale-specific html lang", () => {
  assert.equal(existsSync("src/app/layout.tsx"), false);
  assert.equal(existsSync("src/app/(en)/layout.tsx"), true);
  assert.equal(existsSync("src/app/[locale]/layout.tsx"), true);
  assert.match(readFileSync("src/app/root-document.tsx", "utf8"), /<html/);
  assert.match(readFileSync("src/app/root-document.tsx", "utf8"), /lang=\{LOCALE_CONFIG\[locale\]\.htmlLang\}/);
});
```

Run:

```bash
pnpm test:i18n
```

Expected before implementation:

```text
not equal
```

- [ ] **Step 2: Create the shared root document shell**

Create `src/app/root-document.tsx` by moving the current root shell out of `src/app/layout.tsx`. The resulting public component must have this interface:

```tsx
import type { Locale } from "@/i18n/locales";

export function RootDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return null;
}
```

Replace the `return null` body with the exact existing `<html>...</html>` tree from `src/app/layout.tsx`, with these required edits:

```tsx
<html
  lang={LOCALE_CONFIG[locale].htmlLang}
  data-scroll-behavior="smooth"
  className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
  suppressHydrationWarning
>
```

Pass `locale` to `SiteFooter`:

```tsx
<SiteFooter locale={locale} />
```

Keep:

```tsx
import "./globals.css";
```

inside `root-document.tsx`, because every root layout imports this component.

- [ ] **Step 3: Create English and localized root layouts**

Create `src/app/(en)/layout.tsx`:

```tsx
import type { Metadata, Viewport } from "next";
import { RootDocument } from "../root-document";
import { buildRootMetadata, viewport } from "@/i18n/metadata";

export const metadata: Metadata = buildRootMetadata("en");
export { viewport };

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
```

Create `src/app/[locale]/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootDocument } from "../root-document";
import { buildRootMetadata, viewport } from "@/i18n/metadata";
import { isSupportedLocale, TRANSLATED_LOCALES, type Locale } from "@/i18n/locales";

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale) || locale === "en") notFound();
  return buildRootMetadata(locale);
}

export { viewport };

export default async function LocalizedRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale) || locale === "en") notFound();
  return <RootDocument locale={locale as Locale}>{children}</RootDocument>;
}
```

Task 4 creates `src/i18n/metadata.ts`; for this task add a minimal version with `buildRootMetadata(locale)` and `viewport` copied from the old root metadata so the app compiles.

- [ ] **Step 4: Move English routes into the English route group**

Move the current English routes under `src/app/(en)/` while keeping public URLs unchanged:

```text
src/app/page.tsx -> src/app/(en)/page.tsx
src/app/about -> src/app/(en)/about
src/app/docs -> src/app/(en)/docs
src/app/learn -> src/app/(en)/learn
src/app/feed.xml -> src/app/(en)/feed.xml
src/app/llms-full.txt -> src/app/(en)/llms-full.txt
src/app/not-found.tsx -> src/app/(en)/not-found.tsx
src/app/opengraph-image.tsx -> src/app/(en)/opengraph-image.tsx
```

After moving, update relative imports. Examples:

```tsx
// src/app/(en)/about/page.tsx
import { ArticleHalo, MemoryIndex } from "../../learn/article-visuals";
```

becomes:

```tsx
import { ArticleHalo, MemoryIndex } from "../learn/article-visuals";
```

Use `pnpm lint` to catch each broken path and fix all moved imports.

- [ ] **Step 5: Run verification**

Run:

```bash
pnpm test:i18n
env WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan pnpm test:seo
pnpm lint
pnpm build
```

Expected:

```text
pnpm test:i18n
# all i18n tests pass

pnpm test:seo
# all SEO tests pass

pnpm lint
# TypeScript exits 0

pnpm build
# Next.js build succeeds
```

- [ ] **Step 6: Commit**

Run:

```bash
git add src/app src/i18n scripts/i18n-contract.test.mjs
git commit -m "feat: split locale root layouts"
```

---

## Task 3: Extract shared localized core pages

**Files:**
- Create: `src/app/_pages/home.tsx`
- Create: `src/app/_pages/about.tsx`
- Create: `src/app/_pages/docs-index.tsx`
- Create: `src/app/_pages/get-started.tsx`
- Create: `src/app/_pages/not-found.tsx`
- Modify: `src/app/(en)/page.tsx`
- Modify: `src/app/(en)/about/page.tsx`
- Modify: `src/app/(en)/docs/page.tsx`
- Modify: `src/app/(en)/docs/get-started/page.tsx`
- Modify: `src/app/(en)/not-found.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/about/page.tsx`
- Create: `src/app/[locale]/docs/page.tsx`
- Create: `src/app/[locale]/docs/get-started/page.tsx`
- Create: `src/app/[locale]/not-found.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/sections.tsx`
- Modify: `src/components/problem-solution.tsx`
- Expand: `src/i18n/content/*.ts`
- Modify: `scripts/i18n-contract.test.mjs`

- [ ] **Step 1: Extend contract tests for complete core extraction**

Add tests that fail until all required content sections exist:

```js
test("core dictionaries contain all first-release surfaces", () => {
  for (const locale of SUPPORTED_LOCALES) {
    const content = coreContentByLocale[locale];
    assert.ok(content.home.content.nav);
    assert.ok(content.home.content.hero);
    assert.ok(content.home.content.metrics);
    assert.ok(content.home.content.sections);
    assert.ok(content.home.content.faqs);
    assert.ok(content.about.content.principles);
    assert.ok(content.docs.content.sections);
    assert.ok(content.getStarted.content.steps);
    assert.ok(content.notFound.content.title);
    assert.ok(content.footer.content.groups);
  }
});
```

Run:

```bash
pnpm test:i18n
```

Expected before implementation:

```text
AssertionError
```

- [ ] **Step 2: Expand content dictionaries**

Move every visible string and SEO string from these sources into `src/i18n/content/en.ts`:

```text
src/app/(en)/page.tsx
src/app/(en)/about/page.tsx
src/app/(en)/docs/page.tsx
src/app/(en)/docs/get-started/page.tsx
src/app/(en)/not-found.tsx
src/components/site-footer.tsx
src/components/sections.tsx
src/components/problem-solution.tsx
```

Use stable IDs for arrays. Example shapes:

```ts
content: {
  nav: {
    docs: "Docs",
    learn: "Learn",
    about: "About",
    githubAria: "Wenlan on GitHub",
    preview: "PREVIEW",
  },
  hero: {
    title: "Wenlan",
    body: "A living personal knowledge library for the AI-native age. Agents capture what they learn, you add sources you trust, and Wenlan keeps source-cited pages current.",
    primaryCta: "Get started",
    secondaryCta: "View on GitHub",
  },
  faqs: [
    {
      id: "how-is-this-different",
      question: "How is this different from a chat memory feature?",
      answer: "Wenlan is local-first and source-backed. Agents can save durable facts, recall them later, and keep readable pages you can inspect.",
    },
  ],
}
```

The Traditional Chinese and Simplified Chinese dictionaries must contain the same IDs and keys, translated prose, and unchanged protected tokens. Keep product names, commands, URLs, package names, metric labels, metric values, license names, filesystem paths, and person names unchanged.

- [ ] **Step 3: Replace hardcoded footer copy**

Change `src/components/site-footer.tsx` to accept locale and content:

```tsx
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { getCoreContent } from "@/i18n/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const footer = getCoreContent(locale).footer.content;
  return (
    <footer className="border-t border-[var(--o-border-subtle)] px-6 py-12">
      {/* render footer.groups and footer.bottom from translated content */}
    </footer>
  );
}
```

Use `LocalizedLink` for internal links. External links remain `<a>`.

- [ ] **Step 4: Extract shared page modules**

For each core page, create a shared component that receives `locale` and uses `getCoreContent(locale)`. Preserve the current markup, class names, and component structure. Replace only string sources and internal links.

Example wrapper for home:

```tsx
// src/app/_pages/home.tsx
import type { Locale } from "@/i18n/locales";
import { getCoreContent } from "@/i18n/content";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = getCoreContent(locale).home.content;
  return (
    <div className="grain relative min-h-screen">
      {/* current home markup using copy.nav, copy.hero, copy.sections, copy.faqs */}
    </div>
  );
}
```

Example English route wrapper:

```tsx
// src/app/(en)/page.tsx
import { HomePage } from "../_pages/home";

export default function Page() {
  return <HomePage locale="en" />;
}
```

Example localized route wrapper:

```tsx
// src/app/[locale]/page.tsx
import { notFound } from "next/navigation";
import { HomePage } from "../_pages/home";
import { isSupportedLocale } from "@/i18n/locales";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale) || locale === "en") notFound();
  return <HomePage locale={locale} />;
}
```

- [ ] **Step 5: Add localized core route wrappers**

Create wrappers for:

```text
src/app/[locale]/about/page.tsx
src/app/[locale]/docs/page.tsx
src/app/[locale]/docs/get-started/page.tsx
src/app/[locale]/not-found.tsx
```

Each wrapper:

```tsx
import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/i18n/locales";

function resolveLocale(value: string) {
  if (!isSupportedLocale(value) || value === "en") notFound();
  return value;
}
```

Then render the matching shared page with the resolved locale.

- [ ] **Step 6: Run verification**

Run:

```bash
pnpm test:i18n
env WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan pnpm test:seo
pnpm lint
pnpm build
```

Expected: all pass.

- [ ] **Step 7: Commit**

Run:

```bash
git add src/app src/components src/i18n scripts/i18n-contract.test.mjs
git commit -m "feat: localize core pages"
```

---

## Task 4: Add localized metadata, JSON-LD, and sitemap alternates

**Files:**
- Create or expand: `src/i18n/metadata.ts`
- Modify: `src/app/root-document.tsx`
- Modify: core route wrappers in `src/app/(en)` and `src/app/[locale]`
- Modify: `src/app/sitemap.ts`
- Modify: `scripts/i18n-contract.test.mjs`

- [ ] **Step 1: Extend tests for metadata and sitemap helpers**

Add tests:

```js
import sitemap from "../src/app/sitemap.ts";
import { buildPageMetadata } from "../src/i18n/metadata.ts";

test("page metadata uses localized canonical and reciprocal alternates", () => {
  const metadata = buildPageMetadata("zh-TW", "/about", coreContentByLocale["zh-TW"].about.content.meta);
  assert.equal(metadata.alternates.canonical, "https://useorigin.app/zh-TW/about");
  assert.equal(metadata.alternates.languages["en-US"], "https://useorigin.app/about");
  assert.equal(metadata.alternates.languages["zh-TW"], "https://useorigin.app/zh-TW/about");
  assert.equal(metadata.alternates.languages["zh-CN"], "https://useorigin.app/zh-CN/about");
  assert.equal(metadata.alternates.languages["x-default"], "https://useorigin.app/about");
  assert.equal(metadata.openGraph.locale, "zh_TW");
});

test("sitemap includes translated alternates only for translated pages", () => {
  const urls = sitemap().map((entry) => entry.url).sort();
  assert.ok(urls.includes("https://useorigin.app/zh-TW"));
  assert.ok(urls.includes("https://useorigin.app/zh-CN/docs/get-started"));
  assert.equal(urls.includes("https://useorigin.app/zh-TW/learn"), false);
  assert.equal(urls.includes("https://useorigin.app/zh-CN/docs/daily-workflow"), false);
  const about = sitemap().find((entry) => entry.url === "https://useorigin.app/about");
  assert.equal(about.alternates.languages["x-default"], "https://useorigin.app/about");
});
```

Run:

```bash
pnpm test:i18n
```

Expected before implementation: failing metadata or sitemap assertions.

- [ ] **Step 2: Implement metadata helpers**

Create `src/i18n/metadata.ts` with these exports:

```ts
import type { Metadata, Viewport } from "next";
import { alternateUrls, canonicalUrl, type CoreTranslatedPath } from "./routing";
import { LOCALE_CONFIG, type Locale } from "./locales";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: light)", color: "#fefcf9" },
  ],
};

export function buildPageMetadata(
  locale: Locale,
  pathname: CoreTranslatedPath,
  copy: { title: string; description: string },
): Metadata {
  const url = canonicalUrl(locale, pathname);
  return {
    metadataBase: new URL("https://useorigin.app"),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: alternateUrls(pathname),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: pathname === "/docs/get-started" ? "article" : "website",
      url,
      siteName: "Wenlan",
      locale: LOCALE_CONFIG[locale].openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}
```

Add `buildRootMetadata(locale)` in the same file using the home metadata from `getCoreContent(locale).home.content.meta`, plus existing root icons, manifest, authors, creator, publisher, robots, and RSS type alternate.

- [ ] **Step 3: Wire route metadata**

For each English and localized core route, export `generateMetadata` or `metadata` using `buildPageMetadata`.

Example localized about route:

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata(locale, "/about", getCoreContent(locale).about.content.meta);
}
```

English wrappers can use:

```tsx
export const metadata = buildPageMetadata("en", "/about", getCoreContent("en").about.content.meta);
```

- [ ] **Step 4: Localize JSON-LD**

Move breadcrumb, collection, how-to, and root software/web site schema builders into `src/i18n/metadata.ts`. Each builder must accept `locale` and localized copy, and must set:

```ts
inLanguage: LOCALE_CONFIG[locale].hreflang
url: canonicalUrl(locale, pathname)
```

Update page modules and `RootDocument` to call these builders instead of hardcoded English schema data.

- [ ] **Step 5: Update sitemap**

Change `src/app/sitemap.ts` so it creates entries for each core translated path and each locale:

```ts
for (const pathname of CORE_TRANSLATED_PATHS) {
  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: canonicalUrl(locale, pathname),
      lastModified,
      changeFrequency,
      priority,
      images: sharedImages,
      alternates: { languages: alternateUrls(pathname) },
    });
  }
}
```

Keep English-only `docPages`, `/learn`, and `articles` in the sitemap without Chinese localized duplicates.

- [ ] **Step 6: Run verification**

Run:

```bash
pnpm test:i18n
env WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan pnpm test:seo
pnpm lint
pnpm build
```

Expected: all pass.

- [ ] **Step 7: Commit**

Run:

```bash
git add src/app src/i18n scripts/i18n-contract.test.mjs
git commit -m "feat: add localized metadata alternates"
```

---

## Task 5: Enforce hard 404 for untranslated Chinese docs and learn routes

**Files:**
- Create: `src/app/[locale]/docs/[slug]/page.tsx`
- Create: `src/app/[locale]/learn/page.tsx`
- Create: `src/app/[locale]/learn/[slug]/page.tsx`
- Create: `scripts/i18n-built-check.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add built-route verification script**

Create `scripts/i18n-built-check.mjs`:

```js
import assert from "node:assert/strict";

const baseUrl = process.env.I18N_CHECK_BASE_URL ?? "http://127.0.0.1:3000";

const expectedOk = [
  "/",
  "/about",
  "/docs",
  "/docs/get-started",
  "/zh-TW",
  "/zh-TW/about",
  "/zh-TW/docs",
  "/zh-TW/docs/get-started",
  "/zh-CN",
  "/zh-CN/about",
  "/zh-CN/docs",
  "/zh-CN/docs/get-started",
];

const expectedNotFound = [
  "/zh-TW/learn",
  "/zh-TW/learn/wenlan-vs-basic-memory",
  "/zh-TW/docs/daily-workflow",
  "/zh-CN/learn",
  "/zh-CN/learn/wenlan-vs-basic-memory",
  "/zh-CN/docs/daily-workflow",
];

async function status(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: "manual" });
  return response.status;
}

for (const pathname of expectedOk) {
  const actual = await status(pathname);
  assert.equal(actual, 200, `${pathname} expected 200, got ${actual}`);
}

for (const pathname of expectedNotFound) {
  const actual = await status(pathname);
  assert.equal(actual, 404, `${pathname} expected 404, got ${actual}`);
}
```

- [ ] **Step 2: Add explicit 404 localized catch routes**

Create:

```tsx
// src/app/[locale]/docs/[slug]/page.tsx
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function Page() {
  notFound();
}
```

Create:

```tsx
// src/app/[locale]/learn/page.tsx
import { notFound } from "next/navigation";

export default function Page() {
  notFound();
}
```

Create:

```tsx
// src/app/[locale]/learn/[slug]/page.tsx
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function Page() {
  notFound();
}
```

- [ ] **Step 3: Run build and network verification**

Run build:

```bash
pnpm build
```

Start production server in a separate terminal session:

```bash
pnpm start
```

Run:

```bash
I18N_CHECK_BASE_URL=http://127.0.0.1:3000 pnpm i18n:technical:built
```

Expected:

```text
# command exits 0
```

Stop the `pnpm start` server after the check.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/app scripts/i18n-built-check.mjs package.json
git commit -m "feat: block untranslated localized routes"
```

---

## Task 6: Final visual and regression verification

**Files:**
- Modify: files touched by visual fixes only when verification reveals concrete issues.

- [ ] **Step 1: Run full local verification**

Run:

```bash
pnpm test:i18n
env WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan pnpm test:seo
pnpm lint
pnpm build
```

Expected: all pass.

- [ ] **Step 2: Check representative rendered routes**

Start dev server:

```bash
pnpm dev
```

Open these routes in desktop and mobile viewport checks:

```text
http://localhost:3000/
http://localhost:3000/zh-TW
http://localhost:3000/zh-CN
http://localhost:3000/zh-TW/about
http://localhost:3000/zh-CN/docs/get-started
```

Verify:

```text
No CJK text overflow in nav, hero CTAs, cards, FAQ, footer, and get-started code blocks.
Theme toggle still works.
Internal Chinese core links stay under /zh-TW or /zh-CN.
Internal links to untranslated docs/learn from Chinese pages resolve to English canonical paths.
```

- [ ] **Step 3: Fix concrete visual defects**

If verification finds overflow, fix it with scoped CSS/class changes on the affected element. Acceptable examples:

```tsx
className="break-words"
className="leading-relaxed"
className="text-balance"
className="min-w-0"
```

Do not redesign the page, change palette, or alter unrelated layout.

- [ ] **Step 4: Final integrated review**

After all tasks pass, dispatch one fresh reviewer for the whole branch with this checklist:

```text
Check correctness, route coverage, untranslated-route 404 behavior, metadata alternates, sitemap alternates, JSON-LD language fields, protected token preservation, drift hash behavior, TypeScript soundness, and visual regression risk. Cite concrete file:line evidence for every finding.
```

Fix critical and important findings, rerun the exact failing verification, and repeat review until approved.

- [ ] **Step 5: Commit final fixes**

If Step 3 or Step 4 changed files, run:

```bash
git add src scripts package.json pnpm-lock.yaml
git commit -m "fix: polish localized Chinese pages"
```

---

## Self-Review Checklist

- The plan keeps English unprefixed and adds `/zh-TW` plus `/zh-CN`.
- The plan uses `next-intl` for maintained routing/navigation primitives.
- The plan keeps local coverage/hash/protected-token guards because those are product-specific.
- The plan includes a hard 404 policy for untranslated Chinese docs and learn routes.
- The plan verifies reciprocal `hreflang` plus `x-default` in metadata and sitemap.
- The plan prevents hidden `t(key) ?? en` fallback by using explicit route coverage.
- The plan includes a verify-the-verifier hash test.
- The plan includes protected-token checks for commands, paths, URLs, metrics, names, and licenses.
- The plan includes network-level verification for translated 200 routes and untranslated 404 routes.
- The plan includes visual checks for CJK text fit.
