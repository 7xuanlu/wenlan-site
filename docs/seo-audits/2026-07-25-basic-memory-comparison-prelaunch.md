# Basic Memory Comparison Refresh — Prelaunch

**Experiment:** `EXP-2026-07-25-basic-memory-comparison-refresh`

**Prepared:** `2026-07-25T00:47:56Z`

**Status:** local preparation verified and approved; not published

## Decision

Refresh the existing English
`/learn/wenlan-vs-basic-memory` comparison. Do not create another URL or a
Mandarin counterpart.

The page already has authenticated search exposure, but most of its Basic
Memory product claims were written in May and June. Its current framing treats
Basic Memory mainly as a local Markdown vault, calls its history file mtime
plus bring-your-own git, and omits its current Cloud, Teams, cross-client,
semantic-search, agent-skill, and hosted file-history paths. The page also
shows an update date of 2026-07-24 while saying its Basic Memory source check
ended on 2026-07-02.

The bounded refresh answers the current product decision:

- choose Basic Memory for a human-readable Markdown knowledge base that can
  run locally or through a hosted service and can be shared across agents or a
  team;
- choose Wenlan for a local-first Sources, Memories, and Pages workflow with
  explicit capture, handoff, curation, source-backed distillation, and
  reviewable Page refresh.

This is a factual operating-model comparison. It does not compare unmatched
benchmarks or claim that either product is universally better.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: 20 impressions, 1 click, 5.00% CTR, average position 14.6.
- Joined visible row `basic memory`: 3 impressions, 0 clicks, average position
  32.7 on the target page.
- Joined visible row `basicmemory`: 2 impressions, 0 clicks, average position
  29.5 on the target page.
- The target-page click is outside those two visible joined rows and remains
  unattributed.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target route: 5 visitors and 5 pageviews.
- GitHub: 47 Wenlan total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

The two visible product-name queries do not by themselves prove direct
comparison intent. GSC page, query, Vercel, and GitHub observations remain
separate native units, and no source-to-page or causal claim is made.

## Current-source provenance

Captured at `2026-07-25T00:47:56Z`. These sources validate accuracy, product
boundary drift, and repeated comparison-category coverage. They are not GSC
or keyword-volume inputs.

| Source | Native observation | Provenance | Use |
| --- | --- | --- | --- |
| [basicmachines-co/basic-memory](https://github.com/basicmachines-co/basic-memory) | 3,507 stars, 237 forks, 68 open issues, `AGPL-3.0`; main commit `5d444f0974476645f904c1446998c0a938a6e7f7` dated 2026-07-24 | GitHub REST API | Confirms a maintained source, current attention, license, and the source snapshot. Stars are attention, not search demand. |
| [Basic Memory v0.22.1](https://github.com/basicmachines-co/basic-memory/releases/tag/v0.22.1) | Tag commit `232f4690656d7c93f39fc0cb13b0826243f2e0da`; published 2026-06-13 | GitHub release and tag APIs | Pins the current stable open-source release. |
| [basic-memory on PyPI](https://pypi.org/project/basic-memory/) | Version `0.22.1`, uploaded `2026-06-13T03:35:17.720541Z`, `AGPL-3.0-or-later` | PyPI JSON API | Independently confirms the published package version and license family. |
| [What is Basic Memory](https://docs.basicmemory.com/start-here/what-is-basic-memory) | Local or Cloud deployment; one memory across MCP clients; Teams, web app, local sync, snapshots, semantic graph, and `build_context` | Maintained first-party docs; docs repo commit [`1c670035987b21f0a93d4e45ea1eed1487775f74`](https://github.com/basicmachines-co/docs.basicmemory.com/commit/1c670035987b21f0a93d4e45ea1eed1487775f74) dated 2026-07-16 | Corrects the page's local-vault-only boundary. |
| [Technical information](https://docs.basicmemory.com/reference/technical-information) | File-first Markdown, secondary database index, hybrid search, semantic matching, graph traversal, MCP, and AGPL-3.0 | Maintained first-party docs at the pinned docs commit | Removes the unsupported “Markdown-only search degrades” comparison. |
| [Basic Memory Cloud](https://docs.basicmemory.com/cloud/cloud-guide) and [Teams](https://docs.basicmemory.com/teams/about) | Hosted MCP, optional local sync, web editing, shared workspaces, CRDT collaboration, activity, snapshots, and per-file history | Maintained first-party docs at the pinned docs commit | Separates local and hosted storage, collaboration, and history accurately. |
| [AI assistant guide](https://docs.basicmemory.com/reference/ai-assistant-guide) | Agent Skills teach search-before-answer, capture, linking, and knowledge-base maintenance | Maintained first-party docs at the pinned docs commit | Corrects the claim that Basic Memory is not a work-loop optimization. |
| [Basic Memory vs Mem0](https://basicmemory.com/compare/mem0) | One first-party comparison page, updated 2026-06-10 | First-party comparison surface | Shows that Basic Memory itself presents a current product-selection boundary; it is corroborative, not independent demand. |
| [Mem0 Codex MCP guide](https://mem0.ai/blog/codex-mem0-mcp-build-a-coding-agent-that-remembers-your-codebase) | One independent vendor page directly answers “What is the difference between Mem0 and Basic Memory for Codex?” | English page captured 2026-07-25; geography not stated | Independent direct comparison-category corroboration. |
| [Creed memory MCP comparison](https://creed.md/learn/memory-mcp-servers-compared) | One independent five-product comparison including Basic Memory | English page captured 2026-07-25; geography not stated | Independent direct comparison-category corroboration. |
| [kitfunso/hippo-memory](https://github.com/kitfunso/hippo-memory/tree/3dab4b5f4398d99e0404284099b374fda461d470) | One independent OSS comparison table including Basic Memory; repository has 717 stars, 37 forks, and 10 open issues | GitHub REST API and pinned commit dated 2026-07-18 | Independent OSS comparison-category corroboration. Its product claims are not copied into Wenlan's comparison. |

Maintained Wenlan proof is pinned to release
[`v0.14.1`](https://github.com/7xuanlu/wenlan/tree/v0.14.1), commit
`a52f83404e1192c8c0539616f7fafac9b86a64e2`, released
`2026-07-20T13:13:48-07:00`. Its README and source support:

- a local daemon shared by MCP clients;
- the Sources, Memories, and Pages model;
- explicit `/capture`, `/recall`, `/handoff`, `/distill`, `/curate`, and
  `/lint` workflows;
- local FTS5, BGE retrieval, weighted RRF, eligible graph context, and
  optional reranking;
- source IDs, citations, reviewable revisions, Markdown projection, and local
  git history;
- Apache-2.0 licensing for the daemon, CLI, MCP server, and plugins.

## Candidate gate

1. **Inspectable provenance — PASS.** Current GSC, Vercel, GitHub, PyPI,
   maintained Basic Memory docs/release/source, Wenlan release, direct
   comparison observations, dates, languages, and native units are recorded.
2. **Repeated or clear high intent — PASS.** The existing target has 20
   authenticated GSC impressions and 1 unattributed click. Mem0, Creed, and
   Hippo independently place Basic Memory inside a direct product-comparison
   decision. These pages are counted as separate observations, not search
   volume.
3. **Clean coverage decision — PASS.** Wenlan already has the exact English
   comparison URL. Refresh it rather than adding a competing page. No current
   experiment edits this target.
4. **Maintained Wenlan proof — PASS.** Tagged Wenlan source supports each
   Sources, Memories, Pages, workflow, retrieval, provenance, artifact, and
   license claim used in the refresh.
5. **Standalone utility — PASS.** A neutral local-versus-hosted,
   personal-versus-team, knowledge-base-versus-source-backed-workflow chooser
   remains useful even when the reader chooses Basic Memory.

## Experiment contract

- **Hypothesis:** Correcting the existing comparison around Basic Memory's
  current local, Cloud, Teams, search, and maintenance paths versus Wenlan's
  source-backed AI-work workflow will improve qualified exposure without
  creating a competing URL.
- **Change:** Refresh only the existing English H1, first answer, maintained
  source links, Basic Memory product boundary, decision framework, comparison
  table, FAQ copy, and freshness statement.
- **Preserved:** URL, meta title, canonical, sitemap membership, locale
  availability, Article and BreadcrumbList schema types, visible FAQ
  rendering, related routes, and CTA destination.
- **Minimum exposure:** 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- **Success:** After minimum exposure, at least 1 GSC target-page click or
  average position 12.0 or better.
- **Failure:** After 28 complete post-deploy days and minimum exposure, 0
  clicks and average position worse than 20.0.
- **Inconclusive:** Fewer than 5 target impressions, or after minimum exposure
  0 clicks with target average position from 12.1 through 20.0.
- **Stop:** Stop or hold if a maintained source no longer supports the
  comparison, another controller edits the target, a claim cannot be pinned,
  or the change creates a canonical, indexing, robots, noindex,
  structured-data, sitemap, locale, source-link, or rendered-layout
  regression.

## Locale decision

This is an English comparison refresh. Neither the authenticated export nor
the current external record establishes a zh-TW or zh-CN Basic Memory
comparison cluster. No translation, localized route, hreflang entry, or
Mandarin sitemap entry is added.

## Local verification

Completed against the final diff on 2026-07-25:

- `pnpm seo:goal:check`: passed.
- Focused Basic Memory contract: passed RED-to-GREEN.
- `pnpm test:seo`: 182/182 passed.
- `pnpm test:i18n`: 53/53 passed.
- `pnpm lint`: passed.
- `pnpm build`: passed and generated 209 static pages.
- `pnpm seo:technical:built`: passed with 109 sitemap locations, 14 required
  key pages, 26 redirects, seven noindex headers, and no `FAQPage` in 113
  built HTML files.
- `I18N_CHECK_BASE_URL=http://127.0.0.1:3027 pnpm
  i18n:technical:built`: 19 direct-200 routes and five intentional
  untranslated 404 routes passed, including zh-TW and zh-CN Basic Memory
  route absence.
- `git diff --check`: passed.
- Independent review first found two P2 issues: the refresh needed the
  original `publishedAt: "2026-05-14"` so Article schema would not treat the
  refresh date as publication, and Wenlan-only retrieval numbers did not
  belong beside an unquantified competitor cell. Both were fixed. The final
  reviewer verdict was `SHIP` with no remaining P0-P2 findings.
- Desktop 1440x1000 and mobile 393x852 production-build renders returned 200
  with the expected H1, exact self-canonical, `index, follow`, English
  language, Article and BreadcrumbList schema, no `FAQPage`, nine HTTPS source
  links, no browser warning or error, and no document or H1 overflow.
- Article schema reports `datePublished: "2026-05-14"` and
  `dateModified: "2026-07-25"`. The visible page contains the local/hosted,
  Teams, and Agent Skills boundaries and contains no unmatched LME metric.
- Render evidence:
  `/tmp/wenlan-seo/basic-memory-desktop-2026-07-25.png` and
  `/tmp/wenlan-seo/basic-memory-mobile-2026-07-25.png`.

## Approval boundary

The user approved commit, push, PR creation, merge, deployment, and production
verification for this website change at `2026-07-25T01:01:13Z`. No indexing
request, GSC validation, Reddit or other external post, OSS submission, paid
acquisition, or metric-definition change is authorized.
