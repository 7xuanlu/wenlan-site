# SuperLocalMemory Comparison Refresh — Prelaunch

**Experiment:** `EXP-2026-07-24-superlocalmemory-comparison-refresh`

**Prepared:** `2026-07-24T23:47:20Z`

**Status:** active local preparation; not published

## Decision

Refresh the existing English
`/learn/wenlan-vs-superlocal-memory` comparison. Do not create another URL or
a Mandarin counterpart.

The page already has authenticated search exposure. Its competitor snapshot,
however, still describes the June reliability-layer boundary and incorrectly
labels the published 74.8% LoCoMo row as a zero-LLM result. Maintained
SuperLocalMemory source now identifies v3.8.3 as a broader local-first agent
memory control plane and separates the benchmark protocols.

The refresh answers the current decision:

- choose SuperLocalMemory for broad memory operations, team scopes, access
  controls, temporal retrieval, audit, cache/compression, bounded loops, and
  framework adapters;
- choose Wenlan for an explicit source-backed LLM wiki workflow with capture,
  handoff, review, retrieval, distillation, and readable maintained artifacts.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: 16 impressions, 0 clicks, 0.00% CTR, average position 8.6.
- Visible query `super local memory`: 1 impression, 0 clicks, average position
  45.0. The query and page exports are separate tables and cannot be joined,
  so this is demand direction, not proof that the query produced all target
  page impressions.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target route: 7 visitors and 7 pageviews.
- GitHub: 47 Wenlan total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

The earlier `2026-06-13` weekly report also returned `superlocal memory` with
3 impressions at average position 9.0 and `super local memory` with
1 impression at average position 37.0. Those ranges overlap the current
rolling window, so their counts are not added to the current baseline. They
only establish that the comparison intent did not appear for the first time
in the latest export.

GSC, Vercel, GitHub, npm, and repository observations remain separate native
units. This record makes no source-to-page or causal claim.

## Current-source provenance

Captured at `2026-07-24T23:47:20Z`. These sources validate accuracy and product
boundary drift. They are not GSC or keyword-volume inputs.

| Source | Native observation | Provenance | Use |
| --- | --- | --- | --- |
| [qualixar/superlocalmemory](https://github.com/qualixar/superlocalmemory) | 197 stars, 33 forks, 5 open issues; `AGPL-3.0`; main commit `893e6d7d521cef6013d35f0ea468eca3005916de` | GitHub REST API | Confirms maintained source, license family, current commit, and active OSS attention. Stars are attention, not search demand. |
| [v3.8.3 tag](https://github.com/qualixar/superlocalmemory/tree/v3.8.3) | Tag points to commit `893e6d7d521cef6013d35f0ea468eca3005916de` | GitHub tags API | Pins the competitor snapshot even though the GitHub Releases endpoint still reports v3.7.8 as its latest release object. |
| [npm package](https://www.npmjs.com/package/superlocalmemory) | Latest dist-tag `3.8.3`, published `2026-07-24T15:17:25.395Z`; license `AGPL-3.0-or-later` | npm registry API | Independently confirms that v3.8.3 is the published package version. |
| [v3.8.3 README](https://github.com/qualixar/superlocalmemory/blob/893e6d7d521cef6013d35f0ea468eca3005916de/README.md) | Local-first agent memory control plane; SQLite/sqlite-vec canonical store; semantic, BM25, temporal, Hopfield, and spreading-activation retrieval; scopes, access controls, provenance, audit, cache/compression, Mesh, bounded loops, and framework adapters | Maintained source at the pinned tag | Supports the current product-boundary comparison without turning every optional path into a default. |
| [v3.8.3 changelog](https://github.com/qualixar/superlocalmemory/blob/893e6d7d521cef6013d35f0ea468eca3005916de/CHANGELOG.md) | v3.8.0 added team access, scopes, governance, bounded loops, and nine framework adapters; v3.8.1–v3.8.3 hardened existing-install ingestion and recall responsiveness | Maintained source at the pinned tag | Establishes material drift after the page's June competitor check. |
| [Official website](https://www.superlocalmemory.com/) | Still foregrounds v3.6, memory/cache/compression, 74.8% LoCoMo, and AGPL v3 | First-party website, captured `2026-07-24T23:47:20Z` | Shows why the page should pin its product claims to the newer tagged source and keep website claims attributed. |

The maintained README distinguishes:

- **Mode A Raw:** 60.4% across 10 conversations and 1,276 scored questions,
  using local retrieval and zero-LLM answer construction.
- **Mode A Retrieval:** 74.8% across the same 1,276 questions, using local
  retrieval followed by GPT-4.1-mini answer synthesis.
- **Mode C:** 87.7% on Conv-30 only, 81 scored questions, with cloud
  embeddings, answer generation, and judging.

These LoCoMo answer results are not converted into Wenlan's LongMemEval
retrieval metrics.

Maintained Wenlan proof is pinned to release
[`v0.14.1`](https://github.com/7xuanlu/wenlan/tree/v0.14.1), commit
`a52f83404e1192c8c0539616f7fafac9b86a64e2`, released
`2026-07-20T13:13:48-07:00`. Its README, technical foundations, and plugin
skills support:

- explicit capture, recall, handoff, curate, and distill workflows;
- local FTS5 and BGE retrieval with weighted RRF, eligible graph context, and
  optional reranking;
- source IDs, revisions, readable Markdown projection, and local git history;
- one local daemon available to MCP clients;
- Apache-2.0 licensing for the daemon, CLI, MCP server, and plugin source.

## Candidate gate

1. **Inspectable provenance — PASS.** Current GSC, Vercel, GitHub, npm,
   competitor tag/source/changelog, Wenlan release, dates, and native units
   are recorded.
2. **Repeated or clear high intent — PASS.** The current target has
   16 authenticated GSC impressions at average position 8.6. Comparison-form
   SuperLocalMemory queries also appeared in the earlier weekly export, and
   the maintained competitor project has materially changed. Overlapping
   query windows are not summed.
3. **Clean coverage decision — PASS.** Wenlan already has the exact indexed
   comparison page. Refresh it rather than adding a URL.
4. **Maintained Wenlan proof — PASS.** Tagged source supports each Wenlan
   workflow, retrieval, provenance, and artifact claim used in the page.
5. **Standalone utility — PASS.** The page explains the current operating
   boundary, corrects benchmark scopes, and provides an inspectability and
   recovery test a reader can use without choosing Wenlan.

## Experiment contract

- **Hypothesis:** Correcting the existing comparison around the current
  control-plane-versus-source-backed-wiki decision and matching the current
  SuperLocalMemory brand/version will improve qualified exposure for
  comparison intent without creating a competing URL.
- **Change:** Refresh only the existing English title, metadata, quick answer,
  source links, body, comparison table, FAQ copy, and related links.
- **Preserved:** URL, self-canonical, sitemap membership, locale availability,
  Article and BreadcrumbList schema types, visible FAQ rendering, and CTA
  destination.
- **Minimum exposure:** 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- **Success:** After minimum exposure, at least 1 GSC click or target average
  position 7.0 or better.
- **Failure:** After 28 complete post-deploy days and minimum exposure,
  0 clicks and target average position worse than 15.0.
- **Inconclusive:** Fewer than 5 target impressions, or after minimum exposure
  0 clicks with target average position from 7.1 through 15.0.
- **Stop:** Stop or hold if maintained sources no longer support the
  comparison, another controller edits the route, a claim cannot be pinned to
  first-party evidence, or the change creates a canonical, indexing, robots,
  noindex, structured-data, sitemap, locale, source-link, or rendered-layout
  regression.

## Locale decision

This is an English comparison refresh. The authenticated export does not show
a zh-TW or zh-CN SuperLocalMemory query cluster, and the current demand record
does not independently establish Mandarin intent for this competitor. No
translation, localized route, hreflang entry, or Mandarin sitemap entry is
added.

## Approval boundary

Local preparation and verification are authorized by the active Goal
contract. Push, PR creation, merge, and deployment remain unperformed until
the user explicitly approves them for this experiment. No indexing request,
GSC validation, Reddit or other external post, OSS submission, paid
acquisition, or metric-definition change is authorized.
