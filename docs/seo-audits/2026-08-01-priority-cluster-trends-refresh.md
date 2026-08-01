# Priority Cluster Google Trends Refresh — 2026-08-01

Captured through the signed-in official Google Trends Explore UI. This is
demand-discovery evidence only. It is not GSC, keyword volume, traffic, or a
forecast, and it does not start another experiment.

## Provenance

- Capture completed: `2026-08-01T04:20:26Z`.
- Search type: Google Web Search.
- Period: past 12 months, weekly rows from `2025-07-27` through
  `2026-07-26`.
- Native unit: request-relative Google Trends index `0–100`.
- Interpretation: terms are compared only inside the request that contains
  them. A displayed `<1` is treated as `0.5` only for the labelled averages
  below; the raw CSV retains `<1`.
- Official Explore remained signed in. The unattended Google Trends API is
  still limited-alpha/account-gated and was not treated as available.

Raw exports remain outside git:

| Request | Raw export | SHA-256 |
| --- | --- | --- |
| English, Worldwide | `/tmp/wenlan-seo-demand/2026-08-01/trends/en-worldwide.csv` | `00803c6a606c75a3d32367ca699aa257971774cb827e3d4aedfaa59400b30506` |
| Traditional Chinese, Taiwan | `/tmp/wenlan-seo-demand/2026-08-01/trends/zh-tw-taiwan.csv` | `6ce9f34f8c59227520fc79d53d821a53a5d42afb307f0a97c375a42ca9a50427` |
| Simplified Chinese phrases, Worldwide | `/tmp/wenlan-seo-demand/2026-08-01/trends/zh-cn-worldwide.csv` | `ecdc5da011b6a471b267f80110744cb094b1b4f0cc4a97f8536d20bfd0126f76` |

Each export contains 53 raw weekly rows plus Google's metadata and header
rows. The Simplified-Chinese request is Worldwide and must not be described as
mainland-China search demand.

The Explore UI also displayed related-query panels during capture, but no
related-query export, screenshot, or stable Explore URL was retained. Those
ephemeral rows are therefore excluded from the evidence and candidate decision
below. Only the hashed interest-over-time exports support this refresh.

## English, Worldwide

Exact request:

`LLM wiki`, `AI knowledge base`, `Codex knowledge base`,
`ChatGPT knowledge base`, `knowledge base for AI`.

| Term | First 13-week average | Latest 13-week average | Full-period average | Latest raw index |
| --- | ---: | ---: | ---: | ---: |
| `LLM wiki` | 6.5 | 63.1 | 27.5 | 28 |
| `AI knowledge base` | 29.5 | 61.7 | 42.1 | 19 |
| `Codex knowledge base` | 0.0 | 2.8 | 1.1 | `<1` |
| `ChatGPT knowledge base` | 5.8 | 5.1 | 5.0 | 1 |
| `knowledge base for AI` | 11.8 | 18.9 | 15.7 | 5 |

The useful result is not a single popularity winner. `LLM wiki` and
`AI knowledge base` form the same primary category lane inside this request.
The exact Codex and ChatGPT knowledge-base phrases are much smaller and do not
justify separate primary pages.

The retained time series supports the combined LLM-wiki and AI-knowledge-base
category lane. It does not independently establish a Karpathy, Obsidian,
Codex, or ChatGPT modifier decision.

## Traditional Chinese, Taiwan

Exact request:

`LLM wiki`, `AI 知識庫`, `Codex 知識庫`, `ChatGPT 知識庫`,
`Obsidian AI 知識庫`.

| Term | First 13-week average | Latest 13-week average | Full-period average | Latest raw index |
| --- | ---: | ---: | ---: | ---: |
| `LLM wiki` | 0.0 | 48.6 | 18.2 | 24 |
| `AI 知識庫` | 0.0 | 2.0 | 0.5 | 6 |
| `Codex 知識庫` | 1.3 | 0.0 | 0.3 | 0 |
| `ChatGPT 知識庫` | 0.0 | 0.0 | 0.4 | 0 |
| `Obsidian AI 知識庫` | 0.0 | 0.0 | 0.3 | 0 |

The current Taiwan request strengthens `LLM wiki`; it does not support
splitting the locale into tool-name knowledge-base pages. The retained series
does not establish which modifier queries produced that interest.

This supports the just-published existing zh-TW LLM Wiki refresh at the
category level. It does not establish an additional zh-TW URL or an immediate
second edit to the same route.

## Simplified Chinese phrases, Worldwide

Exact request:

`LLM wiki`, `AI 知识库`, `Codex 知识库`, `ChatGPT 知识库`,
`Obsidian AI 知识库`.

| Term | First 13-week average | Latest 13-week average | Full-period average | Latest raw index |
| --- | ---: | ---: | ---: | ---: |
| `LLM wiki` | 6.5 | 63.1 | 27.5 | 28 |
| `AI 知识库` | 1.5 | 14.1 | 6.3 | 5 |
| `Codex 知识库` | 0.0 | 0.8 | 0.2 | `<1` |
| `ChatGPT 知识库` | 0.1 | 0.7 | 0.2 | `<1` |
| `Obsidian AI 知识库` | 0.0 | 0.4 | 0.1 | `<1` |

The request supports the combined `LLM Wiki 知识库` and `AI 知识库` lane,
with `LLM wiki` leading inside this particular comparison. It does not measure
mainland-China demand. Public Simplified-Chinese community evidence remains
the independent corroboration lane.

The retained time series does not nominate a standalone tool-name page or a
new modifier-qualified workflow bridge.

## GSC and coverage reconciliation

Authenticated GSC for `2026-07-03..2026-07-30` remains the search-performance
authority:

- Property totals: 10 clicks and 660 impressions.
- Visible-query totals: 2 clicks and 111 impressions.
- Query visibility gap: 8 clicks and 549 impressions.
- The only visible query in these priority families is `llm wiki 2.0` with
  1 impression, 0 clicks, and position 13 on `/zh-TW`.
- `/learn/distilled-wiki-pages-ai-memory` separately has 5 page impressions,
  0 clicks, and page-average position 6.2, but no visible qualified query row.
- `/learn/source-backed-wiki-pages-ai-work` separately has 4 page
  impressions, 0 clicks, and page-average position 3.3, again without a
  visible qualified query row.
- `/zh-CN/learn/source-backed-wiki-pages-ai-work` has 1 page impression and
  0 clicks. The zh-TW LLM Wiki article has no privacy-visible page row and is
  not reported as zero.

Wenlan already has LLM-wiki and source-backed AI-knowledge-base surfaces in
English, zh-TW, and zh-CN. The English MCP page already explains Codex and
ChatGPT access. The clean gap is therefore not another generic article; it is
whether existing category pages expose the right first answer, snippet, and
contextual tool bridges after Google has had a complete post-deploy window.

## Candidate decision

1. Keep `LLM wiki` and `AI knowledge base` as one co-primary acquisition
   lane. Karpathy remains protected by the Frozen Goal Contract and prior
   inspectable evidence; this retained Trends series neither strengthens nor
   weakens that modifier.
2. Treat Codex and ChatGPT as first-class tool modifiers and proof paths
   inside the existing category/MCP surfaces, not as separate primary
   knowledge-base pages from the current evidence.
3. Keep modifier-qualified Obsidian as the strongest ecosystem bridge from
   prior inspectable evidence. The retained Trends series does not update that
   decision.
4. The zh-TW LLM Wiki route began measuring at `2026-08-01T04:05:07Z`; do not
   stack another change on that route before its readout. Its measuring state
   and the weekly reporting boundary do not block a separate, non-overlapping
   candidate.
5. Reconcile the next available authenticated GSC query-page join with these
   Trends families, then inspect existing English, zh-TW, and zh-CN category
   snippets and internal links. Preparation may proceed as soon as a
   non-overlapping candidate passes the full gate; prefer a bounded
   existing-page or internal-link refresh, and create no new URL unless the
   gate reveals a clean uncovered job.

Result: demand-discovery gate refreshed; no new experiment launched and no
publication, indexing request, GSC validation, external post, or metric change
authorized.
