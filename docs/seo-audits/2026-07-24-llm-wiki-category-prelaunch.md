# English LLM Wiki Category Refresh — Prelaunch

**Experiment:** `EXP-2026-07-24-llm-wiki-category-refresh`

**Prepared:** `2026-07-24T19:32:47Z`

**Status:** approved for local preparation; not published

## Decision

Refresh the existing English
`/learn/distilled-wiki-pages-ai-memory` route before creating another
article. Make the `LLM wiki for AI agents` category answer, the concrete
capture-to-page workflow, and the boundary from code or repository search
explicit. Keep the source-backed-wiki trust-mechanics page distinct.

Do not change the localized zh-TW or zh-CN counterparts in this experiment.
Current Mandarin search evidence is sparse and does not justify translating
new English framing merely because the English category signal is cleaner.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: 0 clicks, 2 impressions, 0.00% CTR, average position 3.5.
- GSC visible query `llm wiki 2.0`: 0 clicks, 1 impression, 0.00% CTR,
  average position 13.0.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target-route aggregate: 4 visitors and 4 pageviews.
- GitHub: 47 total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

The GSC page and query rows are separate and are not joined. GSC and Vercel
use different measurement systems, and the page and referrer aggregates are
not joined. This record does not infer source-to-page sessions or causality.

## Demand provenance

The signed-in official Google Trends Explore capture was recorded at
`2026-07-19T02:47:01Z` for the demand-discovery decision. It covered
Worldwide, United States, and Taiwan requests over the prior 12 months plus
one Worldwide five-year request. Every series remains Google's
request-relative `0–100` index and is not keyword volume.

Inside two separate Worldwide requests, `LLM wiki` moved from `0.7 → 3.8`
and `1.6 → 15.2` when comparing the first and most recent 13-week averages.
Related queries were unusually clean for Wenlan's product category:
Karpathy, GitHub, Obsidian, Claude Code, Codex, `llm wiki skill`, and
`llm wiki v2`. At capture, the separately inspectable
`nashsu/llm_wiki` repository had 14,854 GitHub stars. These units are retained
as captured and are not converted into search volume or combined with GSC.

The complete provenance and false-positive cleanup are preserved in
`docs/seo-audits/2026-07-18-trends-demand-discovery.md`. The raw temporary
exports are no longer present, so this experiment relies on that committed
capture record and does not invent a fresh Trends observation.

## Candidate gate

1. **Inspectable evidence:** the authenticated GSC and Vercel exports,
   committed Trends provenance, exact queries, dates, geographies, languages,
   and native units are recorded.
2. **Repeated or high-intent problem:** independent Trends related queries,
   the captured LLM-wiki OSS surface, and the visible GSC query all point to a
   specific maintained-wiki category rather than generic `AI memory` demand.
3. **Coverage decision:** Wenlan already has an indexed English LLM-wiki page,
   so refresh it instead of creating a duplicate URL.
4. **Maintained proof:** Wenlan repository commit
   `93451bf0ef58399e08400e3b4ac613942adcfec8` documents the Source/Memory/Page
   model and the `/capture`, `/distill`, and page-opening workflow.
5. **Standalone utility:** the refreshed page will explain when an LLM wiki is
   useful, how the workflow works, and when readers should use code or
   repository search instead, even if they do not install Wenlan.

## Why this page is next

The demand-discovery report ranked this exact existing page first for the
`LLM wiki` category. Since that report, the zh-TW Obsidian gap and English
AI-knowledge-base comparison have shipped, while this route's substantive
category copy remains from 2026-07-04.

`/docs/configuration` has 5 GSC impressions, 0 clicks, and average position
18.8, but no visible configuration query or independent demand capture. Its
773 Vercel visitors are retained as product-use evidence and an attribution
anomaly, not treated as a search-intent source. Cursor/Claude and claude-mem
pages were recently refreshed or release-aligned and overlap current
measurement lanes.

## Planned change

- Lead title, metadata, and first answer with `LLM wiki for AI agents`.
- Show the real `/capture` → `/distill` → `/pages` workflow.
- Explain source support, stale reasons, refresh, and reviewable revisions.
- State that an LLM wiki does not replace current source code, repository
  search, repo maps, or native tool documentation.
- Add maintained first-party Wenlan references and the inspectable LLM-wiki
  lineage.
- Keep the canonical URL, locale availability, schema types, related routes,
  and bottom CTA unchanged.
- Add no `FAQPage` JSON-LD.

## Predeclared readout

- Minimum exposure: 10 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 GSC click or average position
  5.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks
  and average position worse than 6.0.
- Inconclusive: below minimum exposure, or 0 clicks with average position from
  5.1 through 6.0 after minimum exposure.
- Technical stop: invalid maintained proof or any canonical, indexing, robots,
  noindex, schema, sitemap, locale, intent-overlap, or rendered-layout
  regression.

The user approved local preparation on `2026-07-24`. Push, merge, production
deployment, indexing requests, GSC validation, and external publication remain
separately approval-gated.

## Local verification

- Focused article assertion: RED before implementation, GREEN after.
- Mobile workflow assertion: RED on the horizontally scrolling command hint,
  GREEN after shortening it to `/capture <durable fact + why>`.
- Intent-separation guard: the category/workflow page retains its distinct
  scope while `/learn/source-backed-wiki-pages-ai-work` retains its exact
  trust-mechanics title, metadata, quick answer, and backlink.
- `pnpm test:seo`: 174 passed, 0 failed.
- `pnpm test:i18n`: 52 passed, 0 failed.
- `pnpm lint`: passed.
- `pnpm seo:goal:check`: passed.
- `pnpm build`: passed with 209 static pages; local postbuild skipped
  IndexNow.
- `pnpm seo:technical:built`: passed with 109 sitemap URLs, 26 redirects,
  seven noindex headers, 14 checked HTML pages, and no `FAQPage` across 113
  built HTML files.
- `pnpm i18n:technical:built`: passed against the final local production
  server with 19 expected direct-200 routes and five expected hard-404 routes.
- `pnpm seo:technical:deployed`: the unchanged current production baseline
  passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers,
  sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects,
  and old-URL exclusions.
- Final local production HTML passed title, description, exact canonical,
  reciprocal English/zh-TW/zh-CN hreflang, `index, follow`, Article and
  BreadcrumbList JSON-LD, `datePublished: 2026-06-24`,
  `dateModified: 2026-07-24`, visible shortened workflow, and `FAQPage`
  absence. Artifact:
  `/tmp/wenlan-seo/llm-wiki-local.html`; SHA-256
  `c1daab8e4ebd4e2cde236e8936babc191a3e1a591f042d8cd3b8e20afea4edd7`.
- Rendered QA passed at 1440×1000 and 393×852. The desktop and mobile route
  exposed the expected H1 and first-screen answer without document or H1
  overflow; the mobile workflow code fit without horizontal scrolling; no
  framework overlay, browser warning, or browser error appeared.
- Visual evidence:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-llm-wiki-category/`.
- Independent review changed from `fix-first` to `SHIP` after the temporary
  HTML evidence, Trends provenance wording, and intent-collision test were
  corrected. No blocker remains.

## Publication boundary

The change is locally complete and remains unpublished. Git push, merge, and
production deployment require explicit approval. Indexing requests, GSC
validation, and external publication remain separately approval-gated.
