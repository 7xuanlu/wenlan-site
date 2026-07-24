# Localized Learn Breadcrumb Technical SEO Correction — Prelaunch

**Change:** `TECH-2026-07-24-localized-learn-breadcrumb`

**Prepared:** `2026-07-24T20:42:43Z`

**Status:** production-verified

## Decision

Fix the localized Learn Article `BreadcrumbList` before starting another
content experiment. The visible zh-TW and zh-CN breadcrumbs already link to
their localized Learn hubs, but the JSON-LD ancestor still points to the
English `https://wenlan.app/learn` URL.

This is a deterministic technical SEO defect, so it has priority over another
page rewrite under the frozen Goal order:
`technical blockers -> indexed page with impressions -> integration/workflow hub`.

## Production-before evidence

Read-only checks against production on `2026-07-24` returned HTTP 200 and these
breadcrumb item URLs:

| Route | Home item | Learn item before fix | Article item |
| --- | --- | --- | --- |
| `/zh-TW/learn/distilled-wiki-pages-ai-memory` | `/zh-TW` | `/learn` | localized article |
| `/zh-CN/learn/distilled-wiki-pages-ai-memory` | `/zh-CN` | `/learn` | localized article |
| `/zh-TW/learn/wenlan-vs-obsidian-ai-memory` | `/zh-TW` | `/learn` | localized article |

The mismatch affects every localized Learn article rendered through
`src/app/[locale]/learn/[slug]/page.tsx`. It does not affect the visible
breadcrumb, article canonical, hreflang, sitemap membership, or English Learn
articles.

## Change

- Replace the hard-coded English Learn ancestor with
  `canonicalUrl(resolvedLocale, "/learn")`.
- Add a focused source-contract test that requires the localized helper and
  rejects the former hard-coded URL.
- Change no visible copy, route, locale availability, canonical, sitemap entry,
  schema type, or `FAQPage` policy.

## Why no content experiment starts in this change

The authenticated `2026-06-26..2026-07-23` weekly report ranks three existing
pages for possible title/meta refreshes:

| Route | GSC clicks | GSC impressions | Average position | Vercel visitors / pageviews |
| --- | ---: | ---: | ---: | ---: |
| `/docs/changelog` | 0 | 21 | 8.0 | 4 / 4 |
| `/docs/data-and-privacy` | 0 | 18 | 14.6 | 1 / 1 |
| `/learn/wenlan-vs-superlocal-memory` | 0 | 16 | 8.6 | 7 / 7 |

The same weekly decision records that all three were recently refreshed and
remain inside their measurement windows. Changelog and privacy have no visible
matching query or committed demand-discovery candidate. Superlocal has one
visible `super local memory` impression at average position 45.0, which is not
enough to establish recurrence; its detailed competitor claims also require a
fresh official-source check before another rewrite. Vercel aggregates are kept
separate and do not establish search intent.

No new content experiment is started from those rows. Fresh authenticated GSC
or independently corroborated demand evidence is required first.

## Verification

- Focused breadcrumb contract: RED against the hard-coded English ancestor,
  GREEN after using `canonicalUrl(resolvedLocale, "/learn")`.
- `pnpm test:i18n`: 53 passed, 0 failed.
- `pnpm test:seo` with explicit Wenlan and wenlan-app roots: 174 passed,
  0 failed.
- `pnpm lint`: passed.
- `pnpm seo:goal:check`: passed.
- `pnpm build`: passed with 209 static pages; local postbuild skipped IndexNow.
- `pnpm seo:technical:built`: passed with 109 sitemap URLs, 26 redirects,
  seven noindex headers, 14 checked HTML pages, and no `FAQPage` across 113
  built HTML files.
- `pnpm i18n:technical:built`: 19 expected direct-200 routes and five expected
  hard-404 routes passed.
- Local production HTML now gives zh-TW articles
  `https://wenlan.app/zh-TW/learn` and zh-CN articles
  `https://wenlan.app/zh-CN/learn` as BreadcrumbList item 2.
- Mobile 393×852 renders for zh-TW and zh-CN retained the expected localized
  title and H1, no document overflow, no framework overlay, and no console
  warning or error.
- Render evidence:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-localized-breadcrumb/`.
- Independent review verdict: `SHIP`. The reviewer confirmed the live bug,
  localized post-fix item 2 URLs, unchanged English breadcrumb and sitemap,
  correct Article `isPartOf` and `inLanguage`, and adequate positive plus
  negative regression assertions.

## Production result

The user explicitly approved Git push, merge, and production deployment for
this correction in the Codex task. PR #65 merged at
`2026-07-24T20:47:55Z` as
`7f54c64a46d48e1d5f0f4d619bdd5a61aaba75dd`; Vercel production completed at
`2026-07-24T20:48:42Z`.

Post-deploy verification passed:

- `pnpm seo:technical:deployed`: robots, 109 sitemap URLs, 14 key pages, six
  utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six
  bridge-host redirects, and old-URL exclusions.
- `I18N_CHECK_BASE_URL=https://wenlan.app pnpm i18n:technical:built`: 19
  expected HTTP 200 routes and five expected HTTP 404 routes.
- The live zh-TW article emits `https://wenlan.app/zh-TW/learn` as
  BreadcrumbList item 2; the live zh-CN article emits
  `https://wenlan.app/zh-CN/learn`.
- Both 393×852 production renders retained the localized title, H1, canonical,
  and language tag with no document overflow, framework overlay, console
  warning, or console error.

No indexing request, GSC validation, external post, OSS submission, paid
acquisition, or metric-definition change was performed.
