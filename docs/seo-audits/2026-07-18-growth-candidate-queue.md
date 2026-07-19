# Wenlan Growth Candidate Queue — 2026-07-18

**Captured at:** `2026-07-18T22:12:48Z`

**Campaign window:** `2026-07-18..2026-07-24`

**Evidence boundary:** Search Console data below is authenticated performance
evidence. Reddit, GitHub, OSS, Google Trends, and SERP observations are
demand-discovery inputs only. Their native units are not keyword volume and are
not converted into GSC, Vercel, or GitHub metrics.

## Authenticated starting evidence

Date range: `2026-06-20..2026-07-17`.

- GSC property totals: 6 clicks and 197 impressions.
- GSC visible-query totals: 0 clicks and 44 impressions.
- Query visibility gap: 6 clicks and 153 impressions.
- `/learn/claude-code-memory`: 23 impressions, 0 clicks, 38.7 average
  position.
- Visible query rows include `claude code memory` (3 impressions),
  `claudecode memory` (1), and `claude memory md` (1). These rows are not
  joined to the page row and are not treated as complete non-brand demand.
- A same-range authenticated query-plus-page capture was added before publish.
  The target page has 7 visible rows totaling 11 impressions, 0 clicks, and
  53.8 impression-weighted average position. This leaves a 12-impression
  visibility gap against the 23-impression page total.
- The selected non-brand Claude-memory cluster contains 5 visible target-page
  queries totaling 9 impressions, 0 clicks, and 50.0 impression-weighted
  average position: `claude code memory`, `claude mcp memory`,
  `claude memory mcp`, `claude memory md`, and `claudecode memory`.
- Vercel `/learn/claude-code-memory`: 3 visitors and 3 pageviews.
- GitHub total stars: 47.
- Umami and Vercel custom CTA events: unavailable/account-gated. CTA remains
  diagnostic and no rate is inferred.

Provenance:

- `/tmp/wenlan-seo/gsc-metadata.json`
- `/tmp/wenlan-seo/gsc-queries.csv`
- `/tmp/wenlan-seo/gsc-pages.csv`
- `/tmp/wenlan-seo/gsc-query-pages.json`
- `/tmp/wenlan-seo/gsc-query-pages-metadata.json`
- `/tmp/wenlan-seo/vercel-metadata.json`
- `/tmp/wenlan-seo/vercel-pages.csv`

The query-plus-page capture is a visible-row subset, not a complete page query
total or keyword-volume estimate. If privacy filtering hides the comparison
cluster in a later window, its quality readout is inconclusive.

## Demand-discovery observations

### Google Trends

| Query | Geography | Period | Captured at | Native unit | Observation |
| --- | --- | --- | --- | --- | --- |
| `Claude Code memory` | US | Past 12 months | `2026-07-18T22:12:48Z` | 0–100 interest index | No data captured. The public explore endpoint returned HTTP 429. |
| `MCP memory server` | US | Past 12 months | `2026-07-18T22:12:48Z` | 0–100 interest index | No data captured. The public explore surface was not reliably accessible. |

No Trends index enters the candidate decision. A later capture must preserve
the raw 0–100 series, query, geography, period, and timestamp before it can be
used.

Retry: `Claude Code memory` and `MCP memory server` were requested again from
the official Google Trends public endpoint for US, past 12 months, at
`2026-07-19T00:21:54Z`. It again returned HTTP 429. The response headers and
body are retained outside git at
`/tmp/wenlan-seo-demand/2026-07-18/google-trends-explore.headers` and
`/tmp/wenlan-seo-demand/2026-07-18/google-trends-explore.raw`. No raw 0–100
series was available, so Trends remains absent from the candidate score and is
not replaced with a third-party keyword-volume estimate.

### Reddit

All observations are English; poster geography is unspecified.

| Source | Published | Native unit captured | Problem signal |
| --- | --- | --- | --- |
| [Claude Code has an undocumented persistent memory feature](https://www.reddit.com/r/ClaudeAI/comments/1qw9hr4/claude_code_has_an_undocumented_persistent_memory/) | 2026-02-05 | Search result reported score `215`; no view count captured | The discussion repeatedly asks how `MEMORY.md`, `CLAUDE.md`, auto memory, and session history differ. |
| [Claude Code's memory Issue](https://www.reddit.com/r/ClaudeCode/comments/1rz1evv/claude_codes_memory_issue/) | 2026-03, exact day unavailable in the public capture | No reliable score or view count captured | The user reports that written memories are not reliably read back and asks for a deterministic index/consolidation path. |
| [How do you handle context loss between Claude Code sessions?](https://www.reddit.com/r/ClaudeAI/comments/1rwg78y/how_do_you_handle_context_loss_between_claude/) | 2026-03, exact day unavailable in the public capture | No reliable score or view count captured | The thread shows both the persistent-context job and a strong objection: many users should use native `CLAUDE.md` before adding another memory server. |
| [Local-first persistent memory for Claude Code](https://www.reddit.com/r/ClaudeCode/comments/1stqhjw/localfirst_persistent_memory_for_claude_code/) | 2026-05, exact day unavailable in the public capture | No reliable score or view count captured | The discussion emphasizes local storage, cross-session gotchas, deduplication, and avoiding an embedding API round trip. |

Reddit provides repeated problem language and objections, not authenticated
traffic or search volume.

### GitHub issues and OSS

All observations are English/global and were captured through the public
GitHub REST API at `2026-07-18T22:12:48Z`.

| Source | Native unit | Observation |
| --- | --- | --- |
| [anthropics/claude-code #27298](https://github.com/anthropics/claude-code/issues/27298) | 24 comments; 2 reactions | A layered cross-session memory request describes re-explanation, context loss, always-loaded token cost, and a need for on-demand topic retrieval. Closed as not planned; updated 2026-07-04. |
| [anthropics/claude-code #34556](https://github.com/anthropics/claude-code/issues/34556) | 61 comments; 5 reactions | An open request after 59 compactions asks for structured memory, pre-compaction save, an append-only event log, and cross-instance sharing. |
| GitHub repository search `claude code memory in:name,description` | 5,170 repository results | This is a noisy OSS supply/discovery result, not search demand. Directly relevant returned projects included `centminmod/my-claude-code-setup` (2,519 stars), `coleam00/claude-memory-compiler` (1,247), `lucasrosati/claude-code-memory-setup` (866), `GMaN1911/claude-cognitive` (450), and `rlancemartin/claude-diary` (379). |
| [Model Context Protocol reference servers](https://github.com/modelcontextprotocol/servers) | Repository listing; no memory-specific usage count captured | The maintained reference collection includes a knowledge-graph memory server and explicitly warns that reference servers are educational examples, not production-ready solutions. |
| [awesome-mcp-servers memory listings](https://github.com/punkpeye/awesome-mcp-servers) | Directory entries; no normalized count captured | The directory contains multiple local, hosted, graph, vector, and cross-client memory servers. This confirms a crowded solution category, not demand for Wenlan specifically. |

### SERP observation

Query: exact phrase `"Claude Code memory"`.

- Language: English.
- Geography: unspecified by the search provider.
- Captured at: `2026-07-18T22:12:48Z`.
- Native unit: returned result order.
- Observation: the returned first page was crowded by an OSS repository,
  independent complete guides, and Claude Code memory explainers. Wenlan was
  not present in the first 10 returned results.
- Interpretation: the existing Wenlan page must be more current and more useful
  than a generic product pitch. This is not a Google ranking report or keyword
  volume.

## Current Wenlan coverage and proof

Current coverage:

- `/learn/claude-code-memory` already explains `CLAUDE.md`, auto memory,
  `/memory`, MCP, and cross-client context.
- `/learn/claude-code-memory-command-vs-wenlan`,
  `/learn/how-to-add-memory-to-claude-code`, and
  `/learn/where-wenlan-stores-claude-code-memory` cover adjacent jobs.
- `/learn` already links directly to the Claude Code memory page.

Maintained first-party proof:

- Wenlan repository commit
  `88fc7df1a242a1f2dbc33b6e76c2af4c39a1748a`, captured 2026-07-18.
- The current preferred Claude Code install path in the root README is:
  `/plugin marketplace add 7xuanlu/wenlan`,
  `/plugin install wenlan@7xuanlu-wenlan`, then `/setup`.
- The aggregator marketplace
  `7xuanlu/claude-plugins` / `wenlan@7xuanlu` remains a documented alternate,
  so existing site commands are not described as broken.
- The maintained README and plugin skills support `/brief`, `/capture`,
  `/recall`, `/handoff`, source-backed pages, review-before-trust, and the
  local daemon/MCP boundary.
- [Claude Code's official memory documentation](https://code.claude.com/docs/en/memory)
  documents `CLAUDE.md` plus auto memory, including the first 200 lines or
  25 KB of auto-memory context and the distinction between user-written
  instructions and assistant-written learnings.

## Candidate queue

| Candidate | Status | Existing surface | Decision |
| --- | --- | --- | --- |
| `CAND-2026-07-18-claude-code-memory-layer` | approved | `/learn/claude-code-memory` | Refresh the existing English page. Make the native-memory boundary, current limits, deterministic inspection path, and preferred direct Wenlan plugin path explicit. Do not create a new URL. |
| `CAND-2026-07-18-mcp-memory-category` | discovery-only | `/learn/mcp-memory-server` | The category is crowded and externally corroborated, but the current page already covers the job and has only 1 GSC impression. Wait rather than overlap the first experiment. |
| `CAND-2026-07-18-memory-trust-diagnostic` | discovery-only | `/learn/review-before-trust-ai-memory` | Retrieval-reliability and memory safety are real problems, but this page has no current GSC impression signal and would overlap the approved Claude Code refresh. Re-evaluate in a later window. |
| `CAND-2026-07-18-mandarin-claude-memory` | rejected for this window | no fully translated Claude Code memory article | Mandarin page evidence is sparse and no Mandarin-specific external demand capture passed the gate. Do not translate the English experiment speculatively. |

## Candidate-gate decision

`CAND-2026-07-18-claude-code-memory-layer` passes all five conditions:

1. **Inspectable provenance:** authenticated GSC/Vercel rows, public Reddit
   URLs, GitHub issue/API values, official docs, query/geography/date/native
   units, and the current Wenlan source commit are recorded.
2. **Repeated or high-intent problem:** Reddit discussions, two independent
   Claude Code issues, a crowded OSS category, and existing Wenlan GSC rows all
   describe persistent context, memory boundaries, retrieval, or compaction.
3. **Clean coverage decision:** Wenlan already has the URL, so the correct
   action is a refresh. No new article is justified.
4. **Maintained proof:** the page can use current Claude Code documentation and
   real Wenlan plugin commands, workflows, repository source, and versioned
   behavior.
5. **Standalone utility:** a native-memory-first decision guide is useful even
   when the reader does not install Wenlan.

The first experiment may therefore prepare one local refresh of
`/learn/claude-code-memory`. Publishing, external distribution, indexing
requests, push, merge, and deployment remain separately approval-gated.
