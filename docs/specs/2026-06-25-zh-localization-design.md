# Wenlan Site zh-TW and zh-CN Localization Design

Date: 2026-06-25
Status: Draft for user review

## Goal

Add Traditional Chinese and Simplified Chinese versions to the public Wenlan
site without letting translated pages drift silently behind the English source.

The first release should localize the core product surface only:

- Home
- About
- Docs index
- Get Started
- Navigation
- Footer
- 404 page
- Homepage FAQ

Long-form docs and Learn article bodies remain English-only until explicitly
translated. They must not appear as indexable Chinese pages.

## Non-Goals

- No automatic machine translation in CI.
- No full docs or Learn corpus translation in the first release.
- No Accept-Language automatic redirect from English to Chinese.
- No custom translation parser or custom ICU/message-format implementation.
- No hidden fallback such as `t(key) ?? en`.

## Council Review Changes

The design was checked by Codex subagents plus sanitized Claude and AGY reviews.
The following changes are mandatory:

- Untranslated Chinese URLs use a hard 404 policy. They are not linked, not
  included in sitemap, and not included in hreflang.
- Hreflang sets are reciprocal and include self links plus `x-default`.
- Root layout must be restructured so `<html lang>` is correct server-side.
- Drift hashing covers normalized English leaf strings, not only object shape.
- Localized links must consult coverage before producing a Chinese URL.
- Route guards must account for Next.js `dynamicParams` behavior.
- The spec must distinguish "stale check passed" from "translation is good."

## Existing Tools First

Prefer existing framework and library support over custom implementation:

- Use Next.js App Router metadata and sitemap APIs for canonical, alternates,
  Open Graph, and sitemap generation.
- Evaluate `next-intl` first for message loading, ICU syntax, locale-aware
  navigation, and routing glue. Current docs show App Router support,
  `localePrefix: "as-needed"` for unprefixed default locale, and
  `localeDetection: false` to avoid Accept-Language redirects.
- If `next-intl` is adopted, configure it so English stays unprefixed and
  `zh-TW` / `zh-CN` remain prefixed. Do not enable automatic locale detection.
- If `next-intl` cannot enforce the coverage policy cleanly, use it for
  messages and formatting only, and keep route coverage checks in local helpers.
- Use standard `Intl` APIs or ICU message formatting for dates, numbers,
  interpolation, and pluralization. Do not concatenate localized fragments by
  hand when a sentence contains variables.

The repo-specific code should be limited to coverage metadata, protected-token
checks, route helpers, and drift tests.

## Locale Model

Supported public locales:

| Locale | Public URL prefix | Hreflang | HTML lang | Open Graph locale |
| --- | --- | --- | --- | --- |
| English | none | `en-US` | `en` | `en_US` |
| Traditional Chinese | `/zh-TW` | `zh-TW` | `zh-Hant` | `zh_TW` |
| Simplified Chinese | `/zh-CN` | `zh-CN` | `zh-Hans` | `zh_CN` |

English remains the default and `x-default` target.

## Route Policy

Translated routes:

- `/`
- `/about`
- `/docs`
- `/docs/get-started`
- `/zh-TW`
- `/zh-TW/about`
- `/zh-TW/docs`
- `/zh-TW/docs/get-started`
- `/zh-CN`
- `/zh-CN/about`
- `/zh-CN/docs`
- `/zh-CN/docs/get-started`

Untranslated localized slugs:

- `/zh-TW/docs/[slug]` for slugs other than `get-started`
- `/zh-CN/docs/[slug]` for slugs other than `get-started`
- `/zh-TW/learn`
- `/zh-CN/learn`
- `/zh-TW/learn/[slug]`
- `/zh-CN/learn/[slug]`

These must not render English fallback bodies under Chinese paths. They should
return 404 unless explicitly added to the translated route coverage table.

The language switcher may link from a Chinese page to the English canonical
version when a target page has no Chinese coverage.

## App Router Architecture

The current single root layout cannot remain hardcoded to English for all
routes. The implementation should use SSR-safe root layouts:

- Move shared document shell into a reusable `RootDocument` module.
- Use route groups or equivalent App Router structure:
  - English root layout renders `<html lang="en">`.
  - Localized root layout renders `<html lang="zh-Hant">` or
    `<html lang="zh-Hans">` based on the route locale.
- Do not set `document.documentElement.lang` client-side.

Page implementation should avoid duplication:

- Extract shared page modules, for example `HomePageContent`,
  `AboutPageContent`, `DocsIndexPageContent`, and `GetStartedPageContent`.
- Thin route files pass locale, localized content, metadata, and route helpers
  into shared modules.
- Shared components receive locale-aware copy and URL helpers; they should not
  import raw English content directly.

Dynamic localized slug routes must either:

- set `dynamicParams = false` and generate only translated params, or
- call `notFound()` immediately when coverage is missing.

The spec requires explicit network-level verification that untranslated
localized URLs return HTTP 404.

## Content Architecture

Create a dedicated i18n layer:

- `src/i18n/locales.ts`
  - supported locale list
  - locale display names
  - locale code mapping table
  - default locale
- `src/i18n/routing.ts`
  - `localizePath(locale, href)`
  - `canonicalUrl(locale, pathname)`
  - `alternateUrls(pathname, coverage)`
  - coverage-aware route matrix
- `src/i18n/content/en.ts`
  - canonical English core content
- `src/i18n/content/zh-TW.ts`
  - Traditional Chinese core translations
- `src/i18n/content/zh-CN.ts`
  - Simplified Chinese core translations
- `src/i18n/content/schema.ts`
  - types for translated units, coverage, hashes, and protected tokens

Fully translated dictionaries should be exact:

- English content is `as const`.
- Chinese content must satisfy the same structure for translated surfaces.
- Missing or extra keys fail type checks or i18n contract tests.
- Repeated items such as FAQ entries, cards, sections, and footer groups need
  stable IDs. Do not use array indexes as translation unit identity.

Coverage is explicit:

```ts
type CoverageStatus = "translated" | "fallback_en" | "needs_update" | "unavailable";
```

Only `translated` pages are eligible for Chinese route generation, hreflang,
sitemap entries, localized JSON-LD, and localized Open Graph metadata.

`needs_update` is an explicit escape hatch for English hotfixes. It allows
English changes to ship while marking the Chinese page as not translated for
SEO purposes. A `needs_update` page must be removed from Chinese hreflang and
sitemap until the translation is reviewed and restored to `translated`.

## Drift Guard

The drift guard catches stale translations, not translation quality.

Hash inputs:

- normalized English leaf strings
- stable translation unit IDs
- placeholder names
- page-level structure

Hash inputs must include visible and SEO-relevant text:

- page title
- meta title
- meta description
- Open Graph title and description
- JSON-LD names and descriptions
- hero copy
- CTA labels
- FAQ questions and answers
- navigation labels
- footer labels
- 404 copy

Hash inputs must not include generated absolute URLs, volatile dates, or build
timestamps.

Define one shared `normalizeForHash()` function and test it. The normalization
rules should cover whitespace, line endings, placeholder syntax, and stable
ordering.

Add a verify-the-verifier fixture: intentionally change one English string in a
fixture and assert that the i18n hash guard fails.

## Protected Tokens

Commands, package names, environment variables, URLs, versions, metric labels,
metric values, filesystem paths, licenses, and product names are protected.

Examples:

- `npx -y wenlan setup`
- `/plugin install wenlan@7xuanlu`
- `~/.wenlan/bin/wenlan`
- `WENLAN_SPACE`
- `LME_Oracle`
- `93.6%`
- `0.857`
- `Apache-2.0`
- `https://wenlan.app`

Preferred representation:

- Extract protected values into constants or placeholders.
- Translate the surrounding prose.
- Preserve placeholder names and resolved token values exactly.

The protected-token test should operate on rendered output where practical. If
rich text or Markdown enters the i18n layer later, prefer AST-level checks over
fragile regex-only checks.

## Metadata and SEO

Translated pages:

- canonical points to the localized URL itself
- `alternates.languages` includes English, `zh-TW`, `zh-CN`, and `x-default`
- every alternate set is reciprocal across the translated page set
- Open Graph URL and locale match the page locale
- JSON-LD `inLanguage`, `url`, breadcrumb labels, names, and descriptions match
  the page locale
- sitemap includes one canonical entry per translated locale URL
- sitemap alternates include the same reciprocal language set

English-only pages:

- canonical points to the English URL
- no Chinese alternates unless the page is fully translated
- no Chinese sitemap entries
- no Chinese JSON-LD for untranslated pages

RSS and LLM text surfaces:

- `/feed.xml` remains English-only in the first release.
- No `/zh-TW/feed.xml` or `/zh-CN/feed.xml` until translated Learn content
  exists.
- `llms.txt` and `llms-full.txt` remain English-only in the first release.
- Do not link non-existent or untranslated Chinese docs/Learn URLs from LLM
  surfaces.

Robots:

- Do not use `robots.txt` to hide fallback pages.
- Use hard 404 for untranslated Chinese URLs.

## Navigation

Add a coverage-aware link helper or component:

- `LocalizedLink` should receive the current locale and canonical target.
- If the target is translated, it outputs the localized route.
- If the target is not translated, it outputs the English canonical route.
- External URLs, file assets, RSS, `llms.txt`, and GitHub links bypass locale
  rewriting.

The language switcher:

- Does not auto-redirect by Accept-Language.
- Lets the user choose English, Traditional Chinese, or Simplified Chinese.
- May persist the choice in a cookie or local storage for UI preference.
- Must not redirect crawlers or first-time users automatically.

## Error Handling

- Invalid locale segments return 404.
- Unsupported localized slugs return 404.
- Missing translation keys fail tests or type checks before build completion.
- Stale translated pages fail `test:i18n` unless explicitly marked
  `needs_update`, which removes them from Chinese SEO surfaces.
- Broken localized links fail tests.

## Testing and Verification

Add package script:

```json
{
  "test:i18n": "node --test scripts/i18n*.test.mjs"
}
```

Required tests:

- `i18n-hash.test.mjs`
  - recomputes source hashes
  - fails stale Chinese source hashes
  - includes a verify-the-verifier failing fixture
- `i18n-keys.test.mjs`
  - flattens canonical English and translated dictionaries
  - fails missing or extra keys for translated surfaces
- `i18n-coverage.test.mjs`
  - every localized route has explicit coverage
  - no implicit fallback is allowed
  - `needs_update` is excluded from Chinese SEO surfaces
- `i18n-seo.test.mjs`
  - canonical and hreflang sets are reciprocal
  - `x-default` points to English
  - sitemap alternates match metadata alternates
  - untranslated pages have no Chinese sitemap or hreflang entries
- `i18n-protected-tokens.test.mjs`
  - rendered Chinese output preserves commands, URLs, env vars, package names,
    versions, metric labels, metric values, paths, and licenses
- `i18n-routes.test.mjs`
  - route matrix matches translated coverage
  - invalid locales return 404
  - untranslated localized slugs return hard 404
  - localized links do not point to unsupported Chinese routes
- TypeScript check
  - localized content satisfies the canonical content schema

Verification before completion:

- `pnpm lint`
- `pnpm test:i18n`
- `pnpm test:seo`
- `pnpm build`

Visual QA:

- Test desktop and mobile widths.
- Check hero, nav, footer, FAQ, CTA buttons, docs cards, Get Started code
  blocks, 404 page, language switcher, and mixed English/CJK terms.
- Add CJK font fallback or locale-specific font variables. Existing Latin-only
  font subsets are not enough for polished Chinese rendering.

## Implementation Sequence

1. Add i18n content schema, locale table, route coverage table, and route
   helpers.
2. Add i18n contract tests first.
3. Refactor root layout into SSR-safe shared document and locale-specific root
   layouts.
4. Extract shared page content modules for Home, About, Docs index, Get Started,
   404, FAQ, nav, and footer.
5. Add Traditional Chinese and Simplified Chinese dictionaries for core pages.
6. Add `LocalizedLink` and language switcher.
7. Wire locale-aware metadata, JSON-LD, Open Graph, and sitemap helpers.
8. Verify untranslated localized slugs hard 404.
9. Run TypeScript, i18n tests, SEO tests, build, and browser visual QA.

## Open Decisions

- Whether to add `next-intl` as a dependency in the first implementation pass
  or first complete a minimal route/content refactor with Next.js built-ins.
  Recommendation: evaluate `next-intl` first and adopt it if it cleanly supports
  the coverage and no-auto-redirect constraints.
- Whether to allow `needs_update` to ship in production. Recommendation: yes,
  but only when it removes that page from Chinese SEO surfaces.
