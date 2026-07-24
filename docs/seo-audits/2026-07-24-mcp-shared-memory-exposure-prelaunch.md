# MCP Hub to Shared-Memory Workflow Exposure — Prelaunch

**Experiment:** `EXP-2026-07-24-mcp-shared-memory-exposure`

**Prepared:** `2026-07-24T20:57:32Z`

**Status:** locally verified, independently reviewed, and approved for
publication; not yet published

## Decision

Add one contextual related-article link from the existing English
`/learn/mcp-memory-server` integration hub to the existing indexed
`/learn/cursor-claude-code-shared-memory` workflow.

This is an exposure experiment, not another copy refresh. The target was
substantively refreshed on `2026-07-17`; the source already answers whether
one MCP memory server can serve multiple tools, but its related-article block
does not expose the concrete Cursor plus Claude Code workflow.

## Source-native baseline

Authenticated range: `2026-06-26..2026-07-23`.

| Source | Metric | Native observation |
| --- | --- | ---: |
| GSC property | Clicks / impressions | 7 / 310 |
| GSC visible-query table | Clicks / impressions | 1 / 75 |
| GSC query visibility gap | Clicks / impressions | 6 / 235 |
| GSC target page | Clicks / impressions / average position | 0 / 8 / 20.8 |
| GSC source page | Clicks / impressions / average position | 0 / 2 / 5.5 |
| Vercel property | Visitors / pageviews | 1,402 / 1,593 |
| Vercel source page | Visitors / pageviews | 291 / 293 |
| GitHub | Total stars | 47 |

The target does not appear in the returned Vercel top-page export. No target
zero is inferred. GSC, Vercel, and GitHub observations are not joined and do
not establish source-to-target sessions or causality. Umami and Vercel custom
CTA events are unavailable or account-gated.

Authenticated inputs remain outside git:

- `/tmp/wenlan-seo/gsc-metadata.json`
- `/tmp/wenlan-seo/gsc-pages.csv`
- `/tmp/wenlan-seo/gsc-queries.csv`
- `/tmp/wenlan-seo/vercel-metadata.json`
- `/tmp/wenlan-seo/vercel-pages.csv`

## Candidate gate

1. **Inspectable provenance:** the GSC and Vercel rows above come from the
   authenticated weekly range. Official signed-in Google Trends Explore data
   was captured at `2026-07-19T02:47:01Z` for Worldwide, past 12 months, in
   request-relative 0–100 indices. Reddit and GitHub/OSS observations preserve
   their URLs, capture dates, comments/reactions, repository results, or
   directory units in the existing demand records.
2. **Repeated or high-intent problem:** `memory MCP` moved `2.0 → 7.0` inside
   the focused English Worldwide, past-12-month Trends request; related
   queries in the committed integration-cluster interpretation include Claude,
   Claude Code, Codex, agent, and open memory. Independent Reddit and GitHub
   issue evidence repeatedly describes cross-session and cross-instance
   memory. The Trends indices are not search volume.
3. **Clean coverage gap:** the target page already answers the workflow and
   has eight GSC impressions. The missing seam is a relevant internal path
   from the high-use MCP integration hub, so no new URL or target rewrite is
   needed.
4. **Maintained proof:** the target contains an exact same-daemon,
   same-data-directory, same-space smoke test and maintained Cursor, Claude
   Code, and Wenlan references. The link adds no new product claim.
5. **Standalone utility:** a reader asking whether one MCP memory server can
   serve multiple tools receives a direct path to the complete two-client
   setup and verification workflow, whether or not they ultimately choose
   Wenlan.

Demand-discovery provenance:

- `docs/seo-audits/2026-07-18-trends-demand-discovery.md`
- `docs/seo-audits/2026-07-18-growth-candidate-queue.md`
- `docs/seo-audits/2026-07-18-exposure-first-growth-design.md`

## Bounded change

- Add `cursor-claude-code-shared-memory` to the source article's
  `relatedSlugs`.
- Add one focused regression assertion scoped to the
  `mcp-memory-server` article object.
- Do not change either page's copy, metadata, dates, URL, canonical, hreflang,
  sitemap membership, schema, CTA, or locale availability.
- Do not add a Mandarin route from English evidence.

## Predeclared readouts

- Minimum exposure: 10 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least one target-page GSC click or
  average position of 18.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, zero clicks
  and average position worse than 22.0.
- Inconclusive: fewer than 10 impressions, or zero clicks with average position
  from 18.1 through 22.0 after minimum exposure.
- 24h: technical/link/render verification only.
- 7d: GSC latency and source-native observations.
- W2: minimum-exposure guard, link relevance, duplicate anchors, and cohort
  overlap.
- W4: success/failure/inconclusive decision without changing thresholds.
- W8: optional post-campaign follow-up.

## Verification

- Focused contract: failed before the source article exposed
  `cursor-claude-code-shared-memory`, then passed after the single
  `relatedSlugs` addition.
- `pnpm test:seo`: 175 passed, 0 failed, using explicit Wenlan and wenlan-app
  checkout roots.
- `pnpm test:i18n`: 53 passed, 0 failed.
- `pnpm lint`: passed.
- `pnpm seo:goal:check`: passed with six active experiments and exactly one
  production-in-flight experiment.
- `pnpm build`: passed with 209 static pages; IndexNow was skipped outside
  production.
- `pnpm seo:technical:built`: passed with 109 sitemap URLs, 26 redirects,
  seven noindex headers, 14 checked HTML pages, and no `FAQPage` across 113
  built HTML files.
- `I18N_CHECK_BASE_URL=http://127.0.0.1:3019 pnpm
  i18n:technical:built`: 19 expected direct-200 routes and five expected
  hard-404 routes passed.
- Local production HTTP checks found exactly one target link on the source;
  both source and target returned HTTP 200; the target retained its exact
  `https://wenlan.app/learn/cursor-claude-code-shared-memory` canonical.
- At 393×852, the source rendered all four related links including the target;
  the target retained its title, H1, self-canonical, and `index, follow`.
  Source and target had no document overflow, framework overlay, `FAQPage`,
  console warning, or console error.
- At 1440×1000, the source sidebar displayed the complete four-link related
  block without document overflow, framework overlay, console warning, or
  console error.
- English changes only: neither MCP nor Cursor-plus-Claude target slug entered
  `TRANSLATED_LEARN_SLUGS`; the localized route contract and Mandarin
  acquisition inventory remained unchanged.
- Render evidence:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-mcp-shared-memory-exposure/`.

## Publication boundary

The independent reviewer returned `SHIP` after one stale `PLAN.md` state
contradiction was corrected; no other finding remained. The user explicitly
approved Git push, PR creation, merge, and production deployment for this
bounded website experiment in the current Codex task.

Indexing requests, GSC validation, external posts, OSS submission, paid
acquisition, and metric-definition changes remain outside that approval.
