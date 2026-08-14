# AI knowledge-base contextual links — prelaunch contract

Date: 2026-08-13

## Decision

Prepare a bounded English internal-link refresh into the existing
`/learn/ai-work-memory-vs-knowledge-base` owner. Do not rewrite the target,
create another URL, translate this evidence into Mandarin, or publish before
explicit approval.

## Evidence and coverage gate

- Authenticated GSC for the first complete post-refresh range
  `2026-07-25..2026-08-12` reports 1 click, 44 impressions, 2.27% CTR, and
  page-average position 10.0 for the target. This crosses the existing
  experiment's 20-impression floor and satisfies its one-click success rule.
- The only privacy-visible joined query is `knowledge db` with one impression
  at position 81. It does not reveal the clicked query and is not treated as
  exact-query rank or keyword volume.
- Vercel separately reports 4 visitors and 4 pageviews for the target in the
  same complete-date range. The latest rolling source-to-page export reports
  one `google.com` visitor and one pageview. No causal join is made.
- The deterministic weekly report recommends an internal-link refresh for the
  target rather than another copy rewrite.
- A read-only URL Inspection refresh at `2026-08-13T10:06:00Z` reports
  `Crawled - currently not indexed`, with successful fetch, indexing allowed,
  exact Google and user canonicals, sitemap discovery, and last crawl
  `2026-07-29T01:10:28Z`. This current state does not erase the historical
  GSC impressions; it makes renewed discovery the immediate job.
- The initially prepared source-backed, document-ingestion, and tool-selection
  sources are still inside separate attribution windows. Editing them would
  trigger their controller-overlap stop criteria, so they are deliberately
  excluded from the final candidate.
- The stable provenance, project-scope, and readable-artifact/local-store
  owners each answer a distinct boundary needed by the comparison and already
  use the shared related-article component. The latest rolling GSC page export
  reports 4 impressions for provenance and 23 for project scope; the readable-
  artifact source is unavailable rather than zero. None currently routes to
  the successful comparison owner.

## Proposed change

Add `ai-work-memory-vs-knowledge-base` to `relatedSlugs` for exactly these
English sources:

1. `/learn/ai-memory-provenance`
2. `/learn/project-scope-ai-memory`
3. `/learn/markdown-local-index-ai-memory`

Keep target and source titles, descriptions, body copy, publication and update
dates, schema, canonicals, sitemap membership, and locale routes unchanged.

## Proposed experiment contract

- Experiment ID: `EXP-2026-08-13-ai-knowledge-base-context-links`
- Asset class: refresh
- Hypothesis: Three additional semantically exact contextual entry points will
  help Google and users discover the existing English comparison owner without
  disturbing its successful answer, increasing attributable target-page
  exposure or clicks.
- Baseline: GSC target row for `2026-07-25..2026-08-12` is 1 click, 44
  impressions, 2.27% CTR, and page-average position 10.0. Vercel target row for
  the same range is 4 visitors and 4 pageviews. GitHub is 47 stars. The clicked
  query, CTA events, and source-to-star path are unavailable.
- Minimum exposure: 20 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after at least 20 target-page impressions, the target earns at
  least 2 clicks or page-average position is 8.0 or better.
- Failure: after 28 complete post-deploy days and at least 20 impressions, the
  target remains at 1 or fewer clicks and page-average position is worse than
  10.0. Fewer than 20 impressions is inconclusive.
- Stop: stop if another controller edits the target or any of the three source
  pages, or if a link, direct-200, canonical, indexability, sitemap, schema,
  related-card render, or English/zh-TW/zh-CN locale regression appears. The
  source-backed, document-guide, tool-selection, Knowledge Graph, and LLM Wiki
  measurement surfaces must remain unchanged.
- Readouts: 24h technical and source-native observation; 7d exposure check;
  W2 apply the minimum; W4 decide success, failure, or inconclusive; W8 only if
  useful.

## Approval boundary

Local preparation and verification are allowed. Commit, push, PR creation,
merge, automatic Vercel deployment, production verification, request indexing,
GSC validation, external publication, paid action, analytics mutation,
synthetic events, and metric-definition changes remain unapproved.

## Local verification

- RED control: the focused contract test failed because none of the three
  source records contained the target slug. It passed after the bounded data
  change.
- `pnpm test:seo` with explicit Wenlan and wenlan-app roots: 223/223 passed.
- `pnpm lint`: passed.
- `pnpm build`: passed with 223 generated static pages; IndexNow correctly
  skipped outside production.
- `pnpm seo:technical:built`: passed with 120 sitemap URLs, 24 checked pages,
  seven noindex headers, 26 redirects, and no `FAQPage` in 124 built HTML
  files.
- `pnpm seo:goal:check` and `git diff --check`: passed.
- Browser DOM verification: each source has exactly one visible link to the
  target; no source emits `FAQPage`; desktop document width is 1,274/1,274 and
  exact-mobile width is 387/387, with no horizontal overflow.
- Fresh production-reference and local screenshots cover all three sources at
  393px and 1440px. Image diffs are 97/100 similarity on mobile and 99/100 on
  desktop with alpha intact. Mobile captures are 61–62px taller because the
  added title wraps inside the existing Related Articles card; every hotspot
  is confined to that changed region or its expected downstream vertical
  shift.

Visual QA Pass A: PASS. The implementation reuses the existing article data
model and Related Articles component, adds no CSS, image, dependency, motion,
or interaction, and every added route is a working DOM link.

Visual QA Pass B: PASS. The six full-page local captures preserve layout,
typography, spacing, and responsive behavior relative to the six matching
production captures. No clipping, horizontal overflow, broken glyph, or CJK
change appears; the experiment changes English records only.

Evidence:
`/tmp/wenlan-seo/visual-qa/2026-08-13-ai-kb-links-stable-sources/`.

## Publication approval and final gate

At `2026-08-14T05:24:28Z`, the user approved commit, push, ready PR creation,
merge, automatic Vercel deployment, and read-only production verification for
this exact candidate. Request indexing, GSC validation, external publication,
paid action, synthetic events, analytics mutation, and metric changes remain
excluded.

The final pre-commit capture repeated all three source pages at exact 393px and
1440px viewports against the then-current production reference. Every response
was direct 200 with the exact canonical; each local source contained exactly
one target link, no horizontal overflow, broken image, console warning, or
console error. Pass A and Pass B remained green. Viewport-level image
similarity was 91/100 on mobile and 98/100 on desktop, with all meaningful
hotspots confined to the intended Related Articles addition and its expected
vertical displacement.

Final evidence:
`/tmp/wenlan-seo/visual-qa/2026-08-14-ai-kb-links-premerge/`.
