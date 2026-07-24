# English Learn Hub Exposure Refresh — Prelaunch

**Experiment:** `EXP-2026-07-24-learn-hub-exposure-refresh`

**Prepared:** `2026-07-24T19:04:17Z`

**Status:** live; production-verified at `2026-07-24T19:21:10Z`

## Decision

Refresh the existing English `/learn` integration hub before creating another
article. Limit the change to metadata, the first-screen answer, and the existing
popular-search-path cards. Keep the full article grid, canonical, locale
alternates, structured-data types, and bottom conversion links unchanged.

Do not change either Mandarin Learn hub in this experiment. Their current
inventory intentionally reflects only complete translations, and the zh-TW
Obsidian route is already a live measurement cohort.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC `/learn` page: 0 clicks, 71 impressions, 0.00% CTR, average position
  15.6.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel `/learn` aggregate: 98 visitors and 100 pageviews.
- GitHub: 47 total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

GSC and Vercel use different measurement systems. The page and referrer
aggregates are not joined, so this record does not infer source-to-page sessions
or causality.

## Why this page is next

The weekly Searchfit queue marks `/learn` for a quick-answer refresh. It is the
largest zero-click acquisition page in the authenticated GSC table and a
meaningful Vercel entry surface. The reviewed exposure-first growth design also
places the Learn integration/workflow hub first in the initial experiment
backlog.

The alternative Basic Memory comparison has 20 GSC impressions, 1 click, a
5.00% CTR, and average position 14.6. Its current weekly recommendation is an
internal-link refresh rather than another content rewrite. Promoting it from
the Learn hub follows that recommendation while preserving its existing click
signal.

The changelog, data-and-privacy, Superlocal, Cursor/Claude shared-memory, and
claude-mem pages were recently refreshed or release-aligned and remain inside
their current measurement windows. The newly deployed AI work memory versus
knowledge-base page is also excluded.

## Candidate gate

1. **Inspectable evidence:** authenticated GSC and Vercel exports, the
   committed weekly report, signed official Trends exports, inspectable
   Reddit/OSS observations, and the maintained Wenlan repository are recorded.
2. **Repeated or high-intent problem:** Claude Code memory, Basic Memory,
   LLM-wiki, and MCP-memory jobs recur across the independent evidence lane.
3. **Coverage decision:** Wenlan already has complete pages for these jobs, so
   strengthen the hub rather than create a duplicate URL.
4. **Maintained proof:** Wenlan's current README documents the
   Source/Memory/Page model and the recall, capture, handoff, and distill loop.
5. **Standalone utility:** the refreshed hub helps readers choose the right
   guide even if they do not install Wenlan.

## Planned change

- Lead the title, description, H1, and first answer with the source-backed
  LLM-wiki and persistent AI-work-memory category.
- Put Claude Code memory, Basic Memory comparison, MCP memory server, and LLM
  wiki for AI agents first in the popular search paths.
- Keep Cursor, knowledge-base comparison, Obsidian, local-first memory, and
  architecture/setup paths discoverable without adding a new leaf page.
- Keep English, zh-TW, and zh-CN route availability unchanged.
- Add no `FAQPage` JSON-LD.

## Predeclared readout

- Minimum exposure: 100 GSC `/learn` page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 GSC click or average position
  12.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks
  and average position worse than the 15.6 baseline.
- Inconclusive: below minimum exposure, or 0 clicks with average position from
  12.1 through 15.6 after minimum exposure.
- Technical stop: any canonical, indexing, robots, noindex, schema, sitemap,
  locale, or rendered-layout regression.

The user authorized Git push, merge, and production deployment on
`2026-07-24`. Indexing requests, GSC validation, and external publication
remain separately approval-gated.

## Local verification

- Focused Learn-index assertion: RED before implementation, GREEN after.
- `pnpm test:seo`: 174 passed, 0 failed.
- `pnpm test:i18n`: 52 passed, 0 failed.
- `pnpm lint`: passed.
- `pnpm seo:goal:check`: passed.
- `pnpm build`: passed with 209 static pages; local postbuild skipped IndexNow.
- `pnpm seo:technical:built`: passed with 109 sitemap URLs, 26 redirects,
  seven noindex headers, 14 checked HTML pages, and no `FAQPage` across 113
  built HTML files.
- `pnpm i18n:technical:built`: passed against the local production server with
  19 expected direct-200 routes and five expected hard-404 routes.
- `pnpm seo:technical:deployed`: the unchanged current production baseline
  passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers,
  sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and
  old-URL exclusions.
- All nine promoted destinations plus English, zh-TW, and zh-CN Learn hubs
  returned local production-build HTTP 200.
- Rendered QA passed at 1440×1000 and 393×852. The English page exposed the
  expected title, description, exact canonical, `index, follow`, reciprocal
  locale alternates, BreadcrumbList and CollectionPage JSON-LD, quick answer,
  ranked search paths, no `FAQPage`, no framework error overlay, and no
  document or H1 overflow.
- Mobile zh-TW and zh-CN Learn hubs retained localized titles, H1s,
  self-canonicals, and overflow-safe layouts.
- Independent review's only blocker was the previously undefined neutral
  outcome band. It is resolved by the explicit inconclusive rule above.
- Visual evidence:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-learn-hub-exposure/`.

## Production verification

- PR #62 merged at `2026-07-24T19:17:15Z` as
  `e8c089a0391795e778b2e02f1bd11355fda4e4e8`.
- Vercel reported production complete at `2026-07-24T19:18:03Z`.
- `pnpm seo:technical:deployed` passed robots, 109 sitemap URLs, 14 key
  pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25
  redirects, six bridge-host redirects, and legacy-URL exclusions.
- `/learn`, all nine promoted destinations, `/zh-TW/learn`, and
  `/zh-CN/learn` returned production HTTP 200.
- The rendered English route exposed the expected title, description, H1,
  quick answer, exact canonical, `index, follow`, reciprocal locale
  alternates, BreadcrumbList and CollectionPage JSON-LD, and all nine
  acquisition links. It had no `FAQPage`, document overflow, framework error,
  console warning, or console error.
- The production zh-TW and zh-CN Learn hubs retained localized titles and
  H1s, self-canonicals, no `FAQPage`, no document overflow, and no rendered
  error.
- Production screenshot:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-learn-hub-production/learn-production-desktop.jpg`.
