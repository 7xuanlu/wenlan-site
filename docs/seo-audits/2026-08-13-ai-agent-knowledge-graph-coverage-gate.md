# AI-agent knowledge-graph coverage gate — 2026-08-13

## Decision

Refresh the existing indexed English `/docs/knowledge-graph` owner locally.
Do not create another Learn URL, and do not add zh-TW or zh-CN routes in this
round.

The candidate gate passes for an existing-page refresh. The new task language
is an AI-agent knowledge graph that keeps cross-source relationships,
provenance, graph context, and source-backed pages inspectable. Wenlan already
implements that answer and already owns the canonical; the gap is that the
current snippet says only `Wenlan Knowledge Graph`, the page has no quick
answer, and Google has not crawled it since `2026-07-16T09:43:37Z`.

## Candidate gate

1. **Inspectable provenance.** English observations include the public
   Hermes Agent issue on cross-source wiki, skills, memory, and session
   discovery; an independent Claude Code knowledge-management graph post; and
   the maintained WeKnora issue for unified RAG plus Wiki retrieval with
   citations. Simplified-Chinese observations include a public V2EX agent
   knowledge-base workflow and a Zhihu knowledge-context comparison of RAG,
   LLM Wiki, knowledge graphs, and GraphRAG. Every URL, capture date, language,
   and displayed native unit remains source-native; none is GSC or keyword
   volume.
2. **Repeated problem.** Independent sources repeat fragmented agent
   knowledge, relationships/backlinks, cross-source discovery, provenance,
   and the need to combine precise source evidence with structured pages or
   graph context.
3. **Clean coverage action.** Wenlan already has one indexed English owner at
   `/docs/knowledge-graph`. It covers entities, relations, observations,
   wikilinks, hybrid retrieval, and cleanup, so a new URL would overlap. The
   clean gap is a task-qualified title, first answer, and source-backed
   knowledge-base boundary on the existing page.
4. **Maintained Wenlan proof.** Wenlan `v0.15.8` documents typed entities,
   observations, directed relations, entity resolution, Memory-to-Source
   linkage, graph context in hybrid retrieval, and review/quality paths. The
   implementation exposes graph routes and retrieval over the entity-relation
   graph.
5. **Standalone utility.** The refreshed answer will explain when an AI-agent
   knowledge graph helps, what it adds beyond vector similarity, and why graph
   context is supporting evidence rather than authority, even if the reader
   does not choose Wenlan.

## Source-native baseline

- GSC property totals for `2026-07-15..2026-08-11`: 7 clicks and 855
  impressions.
- Visible query totals: 2 clicks and 170 impressions.
- Query visibility gap: 5 clicks and 685 impressions.
- The target is absent from the authenticated GSC page export and must be
  reported as unavailable, not zero.
- Authenticated URL Inspection at `2026-08-13T05:42:49Z`: `PASS`, submitted
  and indexed, exact Google and user canonical, successful mobile fetch,
  sitemap discovery, and last crawl `2026-07-16T09:43:37Z`.
- Same-range Vercel target-page and source-to-page rows: unavailable in the
  preserved top-row exports; do not report zero.
- GitHub stars remain a separate 47-star observation. Umami remains
  unavailable.

## Evidence provenance

| Source | URL | Captured | Language / geography | Native unit retained | What it contributes |
| --- | --- | --- | --- | --- | --- |
| Hermes Agent issue #57580 | https://github.com/NousResearch/hermes-agent/issues/57580 | 2026-08-13 | English / global | issue state and visible text | Cross-source discovery, backlinks, orphan detection, and concept search across wiki, skills, memory, and sessions. |
| Claude Code Reddit post | https://www.reddit.com/r/ClaudeCode/comments/1rmneek/my_first_project_knowledge_management_graph_for/ | 2026-08-13 | English / unspecified | visible post text; displayed reactions remain source-native | Markdown, decisions, failure lessons, session summaries, local/Git/MCP portability. |
| WeKnora issue #2194 | https://github.com/Tencent/WeKnora/issues/2194 | 2026-08-13 | English / global | issue state and visible text | Unified raw-source plus Wiki retrieval, source-specific provenance, fallback tests, and evaluation. |
| V2EX Tapestry post | https://v2ex.com/t/1198796 | 2026-08-13 | Simplified Chinese / public V2EX | 1,542 displayed views | Agent-native ingestion, local persistence, synthesis, and a browsable knowledge base for Claude Code and Codex. |
| Zhihu knowledge-context article | https://zhuanlan.zhihu.com/p/2050613582593779556 | 2026-08-13 | Simplified Chinese / public Zhihu | visible article text; no volume inferred | Explicit comparison of RAG, LLM Wiki, graph, GraphRAG, provenance, gaps, and freshness. |

The Simplified-Chinese observations nominate terminology and a later locale
audit. They do not justify a Mandarin translation in this experiment because
the current localized Docs detail routes are intentional 404s and no
locale-specific target-page GSC row exists.

## Proposed bounded change

- Keep `/docs/knowledge-graph`, its canonical, sitemap membership, publication
  date, TechArticle and BreadcrumbList schema, adjacent Docs routing, and
  English-only locale behavior.
- Change the meta title, description, keywords, visible H1/description, and
  first section to answer `AI-agent knowledge graph` and `source-backed AI
  knowledge base` without claiming that graph context replaces sources.
- Add one compact quick-answer section explaining:
  - use vectors or text search for direct matches;
  - use graph context for typed relationships and nearby facts;
  - keep source memories and maintained pages as the inspectable authority;
  - review ambiguous entities and noisy imported links.
- Preserve maintained product truth and add no unsupported GraphRAG,
  auto-codebase graph, multi-hop benchmark, or visual graph-browser claim.

## Readout contract

- Minimum exposure: 10 GSC target-page impressions after a confirmed
  post-deploy Google crawl.
- Success: after both guards, at least 1 target-page GSC click or at least 5
  privacy-visible qualified `AI agent knowledge graph` / `agent knowledge
  graph` impressions on the intended canonical, with technical floors green.
- Failure: after 28 complete post-deploy days and both guards, 0 target-page
  clicks and no qualified visible query reaches 5 impressions, or any
  technical/source/render regression occurs.
- Otherwise: inconclusive.
- Stop: another controller edits the canonical, product truth changes, or the
  page implies graph context is authoritative without inspectable sources.
- 24h, 7d, W2, W4, and W8: keep property totals, visible-query totals,
  visibility gap, target row, joined qualified queries, Vercel, Umami, and
  GitHub separate.

## Approval boundary

Local preparation and deterministic verification may proceed under the
approved Goal contract. Commit, push, PR creation, merge, deployment, request
indexing, GSC validation, external publication, paid action, synthetic event,
analytics mutation, and metric-definition changes remain separately gated.

## Local verification

- RED control: the focused knowledge-graph contract test failed against the
  prior page because the AI-agent title and source-backed answer were absent.
- GREEN control: `pnpm test:seo` passed 223/223 with the sibling Wenlan and
  wenlan-app roots supplied; `pnpm lint`, `pnpm seo:goal:check`, and
  `git diff --check` passed.
- `pnpm build` passed after installing the lockfile-pinned dependencies in the
  isolated worktree. The non-production postbuild correctly skipped IndexNow.
- `pnpm seo:technical:built` passed the global 404, 26 redirects, 7 noindex
  headers, 120 sitemap URLs, 24 required sitemap URLs, robots, 24 HTML page
  checks, absence of `FAQPage` across 124 HTML pages, and old-URL exclusion.
- Fresh local production rendering passed at 1440 x 1000 and 393 x 852. The
  complete 3,535 px desktop page was inspected across four viewports and the
  complete 5,802 px mobile page across eight viewports. There was no horizontal
  overflow, clipped text, broken image, or awkward single-word heading line.
- Rendered metadata reports the exact canonical
  `https://wenlan.app/docs/knowledge-graph`, `index, follow`, the intended H1,
  and the compact quick answer.
- The automated image diff against the current production page is not a
  fidelity score: production was captured in the saved light theme while the
  isolated local origin used the default dark theme, and the candidate
  intentionally changes the page text. It reported matching dimensions and
  intact alpha, but a full-frame pixel difference. Direct per-viewport image
  inspection and DOM bounds are the applicable visual evidence.

The candidate is locally ready. No commit, push, PR, merge, deployment,
indexing request, validation, or external publication has occurred.
