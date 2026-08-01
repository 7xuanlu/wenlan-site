# Obsidian + Claude Code AI Knowledge-Base Locales — Prelaunch

**Experiment:** `EXP-2026-08-01-obsidian-knowledge-base-locales`

**Prepared:** `2026-08-01`

**Status:** locally verified; not published

## Decision

Refresh the existing Traditional Chinese
`/zh-TW/learn/wenlan-vs-obsidian-ai-memory` route and publish its missing
Simplified Chinese counterpart at
`/zh-CN/learn/wenlan-vs-obsidian-ai-memory` as one locale-parity experiment.
Do not change the English canonical in this experiment.

The job is not generic AI memory. It is the concrete decision behind
`Obsidian + Claude Code`: when direct Markdown access is enough, what an IDE
bridge or Obsidian MCP adds, and when vault access needs a separate,
source-backed AI knowledge-base lifecycle.

The earlier zh-TW localization centered `AI 筆記` and `Agent Memory`. Fresh
evidence now supports the stronger AI-knowledge-base framing. The new change
supersedes that page's older measurement cohort instead of mixing two
interventions on the same URL.

## Candidate gate

1. **Inspectable provenance:** authenticated GSC and Vercel use the complete
   `2026-07-03..2026-07-30` range. Official Trends observations preserve
   geography, capture date, period, and native rising-query percentages.
   OpenSEO preserves its own displayed DataForSEO-backed volume unit and live
   SERP observation. Simplified-Chinese community sources preserve exact URLs
   and native platform metrics.
2. **Repeated or high-intent problem:** Taiwan Trends recorded
   `obsidian claude code` at `+3,350%`, `obsidian and claude` at `+2,400%`,
   and `obsidian claude` at `+1,500%` in their captured request. OpenSEO
   separately displayed United States `obsidian claude code` at `210`, with
   plugin, skill, MCP, CLI, and how-to modifiers. These values remain in their
   source-native units and are not forecasts.
3. **Locale corroboration and clean gap:** public Simplified-Chinese sources
   repeat `Claude Code + Obsidian`, `Obsidian CLI + Claude Code`,
   `LLM Wiki 知识库`, and `AI 知识库`. The inspected Bilibili observations
   include `8.0万播放`, `3.1万播放`, and `2.5万播放`; V2EX records 2,116 views
   for an Obsidian + Claude Code plugin discussion; Juejin records 2,053
   reads for an Obsidian LLM Wiki workflow. Wenlan has English and zh-TW
   routes but the exact zh-CN route is a current hard 404.
4. **Maintained Wenlan proof:** current Wenlan source implements Obsidian
   vault detection and read-only source ingestion, directory resync,
   Markdown projection, MCP tools, `/distill`, `/pages`, `/lint`, and review
   paths. The public English page already cites the maintained Obsidian data,
   plugin, IDE-bridge, MCP-bridge, and Wenlan sources used by both locales.
5. **Standalone utility:** the four-layer decision—direct files, editor
   context, structured MCP tools, then knowledge lifecycle—and the disposable
   note verification checklist remain useful without installing Wenlan.

Result: all five gates pass. Refresh an existing zh-TW page before adding the
matching zh-CN locale, keep both in one experiment, and create no additional
English or generic Obsidian URL.

## Native-unit baseline

Authenticated range: `2026-07-03..2026-07-30`.

| Evidence | Native observation |
| --- | ---: |
| GSC property clicks | 10 |
| GSC property impressions | 660 |
| GSC visible-query clicks | 2 |
| GSC visible-query impressions | 111 |
| GSC query visibility gap | 8 clicks; 549 impressions |
| English target page | 0 clicks; 8 impressions; page-average position 5.6 |
| zh-TW target page | no privacy-visible GSC page row; not reported as zero |
| zh-CN candidate | unpublished hard 404; no page baseline |
| Vercel property | 1,468 visitors; 1,745 pageviews |
| English target | 7 visitors; 12 pageviews |
| zh-TW target | 2 visitors; 3 pageviews |
| GitHub total stars | 46 |
| Authenticated Umami custom events | unavailable; not zero |

No visible Obsidian query row is joined to the English or zh-TW page. The
English page-average position is not an exact-query rank. Property totals,
visible queries, the visibility gap, target-page rows, Vercel observations,
Umami events, GitHub stars, OpenSEO values, Trends values, and community
metrics remain separate and are never converted into one score.

## Bounded change

- Preserve the English route and copy unchanged.
- Preserve the existing zh-TW URL and original
  `datePublished: 2026-07-22`; set only `dateModified: 2026-08-01`.
- Add the corresponding zh-CN route with
  `datePublished: 2026-08-01` and `dateModified: 2026-08-01`.
- Give both Mandarin pages six standalone sections: smallest integration,
  four connection layers, access-versus-maintenance boundary, read-only
  Obsidian Source workflow, minimal verification loop, and operational
  safety checks.
- Cite Obsidian's maintained data and plugin documentation, the three
  inspected Claude Code integrations, and current Wenlan documentation.
- Add the real zh-CN route to static params, locale switching, sitemap,
  reciprocal hreflang, compiled and deployed technical checks, and the locale
  route matrix.
- Keep Article and BreadcrumbList schema and visible FAQ without `FAQPage`.
- Add no copied MCP configuration, unsupported benchmark, source-free
  comparison, programmatic page, analytics event, indexing request, or
  external post.

## Predeclared readout

- **Publish date:** `not-published` until Vercel production completion is
  verified.
- **Index date:** the zh-TW route exists, but its exact index date is not
  confirmed; the zh-CN route is unpublished and has no index date.
- **Minimum exposure:** evaluate each Mandarin route separately after at
  least 5 GSC page impressions in a complete post-deploy window. Do not blend
  the locales to cross the threshold.
- **Success:** after its own minimum exposure, a locale route earns at least
  1 GSC click or has page-average position 20.0 or better, while the technical
  and locale floor remains green.
- **Failure:** after 28 complete post-index days and its own minimum exposure,
  a locale route has 0 clicks and page-average position worse than 20.0, or
  the publication creates a technical, source-accuracy, or rendered-layout
  regression.
- **Inconclusive:** a locale remains below 5 GSC page impressions or lacks a
  confirmed index/post-deploy window. One locale cannot supply evidence for
  the other.
- **Technical stop:** canonical, hreflang, sitemap, indexability, Article or
  BreadcrumbList schema, publication dates, source links, visible FAQ policy,
  locale routing, CJK rendering, or direct-200 behavior regresses.
- **24h:** verify production commit, direct 200, exact canonical, reciprocal
  alternates, sitemap membership, schema dates, six intended sections,
  maintained sources, FAQPage absence, and desktop/mobile rendering. Do not
  infer SEO success.
- **7d:** reuse the latest authenticated weekly range and keep GSC property,
  visible-query, visibility-gap, each target page, Vercel, authenticated
  Umami, GitHub, and indexing observations separate.
- **W2:** apply each locale's own exposure threshold and inspect whether
  qualified visible queries map to the intended route.
- **W4:** apply the fixed success, failure, or inconclusive rules.
- **W8:** retain a post-campaign readout only if useful; do not move the
  Goal's fixed final window.

## Approval boundary

The approved Goal contract authorizes local preparation and verification.
Commit, push, PR creation, merge, automatic Vercel deployment, request
indexing, GSC validation, external publication, paid acquisition, synthetic
analytics events, and account mutation remain separately approval-gated for
this experiment.

## Local verification

Completed at `2026-08-01T20:30:38Z` against the final local production build.

- `pnpm seo:goal:check` passed the frozen contract and single-production-slot
  guard.
- `pnpm test:seo` passed 217 of 217 tests; `pnpm test:i18n` passed 60 of 60;
  `pnpm lint` passed.
- `pnpm build` generated 215 static pages. `pnpm seo:technical:built` passed
  114 sitemap URLs, 18 required canonical pages, robots, redirects, noindex
  headers, Article checks, and sitemap-wide `FAQPage` absence.
- The local production route matrix passed 23 expected direct-200 routes and
  four expected 404 routes. The new zh-CN Obsidian route moved from the 404
  set to the 200 set.
- Fresh browser captures covered both Mandarin routes at `393x852` and
  `1280x720`, with complete-page mobile captures. DOM measurements reported
  no horizontal overflow or clipped headings, exact locale canonicals,
  `index, follow`, Article and BreadcrumbList schema, and no `FAQPage`.
- Inline visual QA passed both the design-system/functional and CJK-precision
  passes on captures produced after the final copy and renderer changes.
  zh-TW and zh-CN had matching page geometry, no clipped or orphaned CJK
  headings, no tofu, and no table or code overflow. Character-level rendered
  line inspection confirmed that `來源` / `来源` and
  `AI 知識庫` / `AI 知识库` remain intact at the mobile breakpoint.
- The review also corrected two source-accuracy overclaims: Wenlan Sources
  perform ingestion/resync while MCP exposes the tool surface, and the
  read-only vault retains the original Markdown while Wenlan rescans, chunks,
  and indexes the vault's current content. Built and deployed checkers now fail if either locale's
  Article publication or modification date drifts from the predeclared
  contract.
- `git diff --check` passed. No commit, push, PR, merge, deployment, indexing
  request, GSC validation, external post, synthetic event, or account mutation
  was performed.
