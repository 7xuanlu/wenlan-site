# AI Agent Memory Types — Prelaunch

**Experiment:** `EXP-2026-07-25-ai-agent-memory-types`

**Prepared:** `2026-07-25T01:27:14Z`

**Status:** local preparation complete; approved for website publication

## Decision

Create one English acquisition page at
`/learn/ai-agent-memory-types` that explains working, episodic, semantic, and
procedural memory as different roles in an agent system, then gives a practical
placement guide for current context, event history, durable knowledge, and
rules or skills.

This is a net-new page because no current Wenlan Learn or Docs route answers
both questions: what the four memory types mean, and where each should live.
The page must explicitly distinguish this cognitive architecture from Wenlan's
own capture metadata values (`identity`, `preference`, `decision`, `lesson`,
`gotcha`, and `fact`).

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: no baseline exists because the URL is net new. No zero,
  position, or indexing state is inferred.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target route: no baseline exists because the URL is net new.
- GitHub: 47 total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

All measurements retain their source-native units. GSC pages, GSC queries,
Vercel pages, and referrers cannot be joined, so this record makes no
source-to-page session or causal claim.

## Demand-discovery provenance

A fresh signed-in Google Trends Explore export captured at
`2026-07-25T01:42:25Z` validates the broader English category, not this exact
title. Inside one Worldwide, Web Search, past-12-month request,
`AI agent memory` moved from a first-13-week average of `3.7` to a latest
13-week average of `26.9`, while `agent memory` moved from `11.7` to `73.1`.
These are Google's request-relative `0–100` indices, not search volume, and
are comparable only inside this request.

The complete 53-week raw series is committed at
`docs/seo-audits/data/2026-07-25-ai-agent-memory-trends.csv`. Its metadata
records the two queries, geography, period, captured-at time, search type,
category, date range, row count, unit, source URL, and downloaded-file
SHA-256 in
`docs/seo-audits/data/2026-07-25-ai-agent-memory-trends.metadata.json`.

The following English observations were captured at
`2026-07-25T01:27:14Z`. Reddit numbers are search-result score snapshots, not
API metrics or keyword volume:

| Source | Observed date | Native snapshot | Repeated question |
| --- | --- | ---: | --- |
| [Agent memory architecture pain](https://www.reddit.com/r/AI_Agents/comments/1unw22r/is_architecting_agentic_memory_a_real_pain/) | 2026-07-05 | +2 score | How to decide between episodic, semantic, and procedural memory |
| [Four-layer implementation discussion](https://www.reddit.com/r/AI_Agents/comments/1upzo7e/last_week_i_built_an_ai_agent_this_week_i_added/) | 2026-07-07 | +2 score | Where working, episodic, semantic, and procedural memory live |
| [Procedural memory gap](https://www.reddit.com/r/AI_Agents/comments/1v2c97j/your_agents_memory_remembers_everything_except/) | 2026-07-21 | +7 score | Why facts and events do not replace maintained procedures |
| [Three memory types](https://www.reddit.com/r/AI_Agents/comments/1rpyvwm/3_types_of_memory_your_ai_agent_needs_and_most/) | 2026-03-10 | +3 score | Different write and update behavior for facts, events, and workflows |

The four threads represent three independent authors. The two procedural
memory threads are by the same author, and the newer post discloses a Mengram
affiliation; they count as one source, not two independent observations.

Maintained research and framework sources support the taxonomy:

- [LangChain memory overview](https://docs.langchain.com/oss/python/concepts/memory)
  separates semantic, episodic, and procedural long-term memory and describes
  short-term state.
- [Cognitive Architectures for Language Agents](https://arxiv.org/abs/2309.02427)
  supplies the inspectable CoALA research model for working and long-term
  memory components.

The maintained Letta source supports the separate placement decision:

- [Letta context hierarchy](https://docs.letta.com/guides/core-concepts/memory/context-hierarchy)
  shows that in-context blocks, files, archival memory, and external
  retrieval have different placement and scale tradeoffs.

These sources discover and qualify the problem. They do not enter GSC input
or supply keyword volume.

## Candidate gate

1. **Inspectable provenance:** every observation retains a URL, capture time,
   date, language/community, and its native unit. The committed Trends CSV
   retains all 53 weekly raw `0–100` rows, and its metadata retains query,
   geography, period, captured-at time, search type, category, and SHA-256.
2. **Repeated or high-intent problem:** four threads from three independent
   authors ask how to separate or place the same memory roles; CoALA and
   LangChain independently establish the terminology, while Letta supports
   the placement tradeoff.
3. **Clean coverage gap:** `/learn/ai-work-memory` defines durable work
   context, `/learn/ai-coding-agent-loses-context` diagnoses session loss,
   and `/docs/memory-types` documents Wenlan capture metadata. None explains
   the four-part architecture and placement decision.
4. **Maintained proof:** the page can map the architecture without claiming
   Wenlan implements four cognitive stores. Current session state belongs to
   the client; Wenlan supports durable captures, handoffs, and source-backed
   pages; procedural behavior remains in prompts, rules, skills, or code.
5. **Standalone utility:** the placement guide remains useful without
   installing Wenlan because it tells a builder what belongs in current
   context, event history, durable knowledge, and executable instructions.

## Non-overlap and locale decision

- `/learn/ai-work-memory` remains the category definition for durable work
  context.
- `/learn/what-to-capture-in-ai-work-memory` remains the capture-quality
  guide.
- `/docs/memory-types` remains the exact Wenlan `memory_type` reference.
- `/learn/ai-agent-handoff-loop` remains the action-oriented session handoff
  workflow.
- This page owns the neutral four-role taxonomy and placement decision.

No zh-TW or zh-CN route is added. The validated category and repeated
taxonomy observations are English/global. Existing Taiwan evidence for
`AI 筆記` and modifier-qualified Obsidian intent does not establish this
four-type query in Mandarin.

## Bounded change

- Add one English Learn article with the exact four memory roles and a
  product-independent placement guide.
- State that these roles are architectural categories, not four required
  database tables.
- Explain that procedural memory belongs in versioned prompts, rules, skills,
  or code rather than being treated as another recalled fact.
- Map Wenlan conservatively and distinguish its six capture metadata values.
- Add maintained CoALA, LangChain, Letta, and Wenlan references.
- Add no localized route, `FAQPage` JSON-LD, indexing request, or external
  distribution.

## Predeclared readouts

- Minimum exposure: 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 GSC target-page click or average
  position of 30.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks
  and average position worse than 40.0.
- Inconclusive: fewer than 5 impressions, or 0 clicks with average position
  from 30.1 through 40.0 after minimum exposure.
- Technical stop: unsupported mapping, overlap with an existing search job,
  or any canonical, indexing, robots, noindex, schema, sitemap, locale,
  maintained-source, or rendered-layout regression.
- 24h: production technical and rendered proof only; no SEO-success judgment.
- 7d, W2, W4, W8: report source-native observations and apply the unchanged
  minimum-exposure guard.

## Approval boundary

The user approved this bounded website experiment, Git push, PR, merge, and
production deployment in the current Codex task on `2026-07-24` local time.
Request indexing, GSC validation, Reddit or other external publication, OSS
submission, paid acquisition, and metric-definition changes remain outside
that approval.

## Local verification

- The focused article contract was written RED-first against the missing route
  and passed after the bounded English article was added.
- The committed Trends evidence integrity test verifies the downloaded-file
  SHA-256, 53 weekly rows, the exact two-query request, and the first/latest
  13-week averages without interpreting the request-relative index as volume.
- `pnpm seo:goal:check`, `pnpm lint`, `pnpm seo:weekly:sample`, and
  `git diff --check` passed.
- `pnpm test:seo` passed 184/184 tests and `pnpm test:i18n` passed 53/53.
- `pnpm build` generated 211 static pages. `pnpm seo:technical:built` passed
  with 26 redirects, seven noindex headers, 110 sitemap locations, 14 checked
  HTML pages, and no `FAQPage` in 114 built HTML files.
- Built-locale validation passed 19 direct-200 routes and five expected 404s.
  The English target returned 200, the unsupported zh-TW and zh-CN targets
  returned 404, and only the English target appeared in the sitemap.
- Rendered QA covered 1440px desktop and a fresh 393x852 mobile viewport,
  including the open FAQ state. The expected H1, title, exact canonical,
  `index, follow`, Article and BreadcrumbList JSON-LD, four source links, and
  visible FAQ answer were present. Neither viewport had document or H1
  overflow. Evidence is preserved under
  `/tmp/wenlan-seo/visual-qa/2026-07-25-ai-agent-memory-types/`.
- The fresh mobile console contained one existing global warning about an
  unused preloaded Next font and no page error. The article introduced no
  target-route console error or rendered defect.
- Independent review initially returned `FIX FIRST` for missing raw Trends
  evidence, over-counted source independence, and using Letta as taxonomy
  proof. The fixes committed the raw 53-week export, counted the four Reddit
  threads as three independent authors, and limited Letta to placement
  support. Focused re-review returned `SHIP` with no remaining P0-P2 findings.
