# Wenlan Google Trends Demand Discovery — 2026-07-18

**Captured at:** `2026-07-19T02:47:01Z`

**Decision scope:** nominate or reject future acquisition clusters. This report
does not start a second experiment and does not change the active
`EXP-2026-07-18-claude-code-memory-refresh`.

## Data-source result

The Google Trends source is usable for this decision.

- The official Google Trends API remains a limited alpha that requires
  acceptance. It is not available as an unattended campaign dependency:
  [Google Trends API alpha](https://developers.google.com/search/apis/trends).
- Google documents the Explore UI as the supported path for comparing custom
  terms, regions, periods, related topics, and related queries:
  [Get started with Google Trends](https://developers.google.com/search/docs/monitor-debug/trends-start).
- The public BigQuery dataset contains top and rising terms. It cannot replace
  Explore for arbitrary Wenlan term comparisons:
  [Google Trends in BigQuery](https://cloud.google.com/blog/products/data-analytics/top-25-google-search-terms-now-in-bigquery).
- Anonymous internal Explore requests returned HTTP 429 twice. The signed-in
  official Explore UI loaded correctly in Chrome and exported the requested
  CSVs. This is the current repeatable capture path.

Raw captures remain outside git:

- `/tmp/wenlan-seo-demand/2026-07-18/trends/metadata.json`
- `/tmp/wenlan-seo-demand/2026-07-18/trends/group-*.csv`
- `/tmp/wenlan-seo-demand/2026-07-18/trends/related-*.csv`
- `/tmp/wenlan-seo-demand/2026-07-19/trends/metadata.json`
- `/tmp/wenlan-seo-demand/2026-07-19/trends/group-j-*.csv`
- `/tmp/wenlan-seo-demand/2026-07-19/trends/group-k-*.csv`
- `/tmp/wenlan-seo-demand/2026-07-19/trends/group-l-*.csv`
- `/tmp/wenlan-seo-demand/2026-07-18/google-trends-explore.headers`
- `/tmp/wenlan-seo-demand/2026-07-18/google-trends-explore.raw`

The combined capture contains 17 timeline comparisons and 9 related-query
exports, plus inspected related-query tables for the three false-positive
cleanup terms.
It covers Worldwide, United States, and Taiwan; English, Traditional Chinese,
and Simplified Chinese terms; past 12 months; and one Worldwide five-year
comparison.

Every raw series remains in Google's request-relative `0–100` unit. It is not
keyword volume. Values are compared only inside one request. Identical bridge
terms connect groups, but the report does not convert or merge independently
scaled requests. The directional summaries below treat a raw `<1` as `0.5`
only for an explicitly labelled average; the CSVs retain `<1`.

## What the comparisons say

The numbers below are the first 13-week average followed by the most recent
13-week average inside the named request. They show direction, not volume.

| Cluster | Trends direction | Intent and corroboration | Wenlan evidence | Decision |
| --- | --- | --- | --- | --- |
| `Claude Code memory` | `6.2 → 59.2` in the focused five-term memory request | `agent memory` related queries include `claude code memory` and show it at `+750%`; Reddit repeatedly describes cold starts, native-memory limits, and cross-session loss | GSC query rows total 5 visible impressions across `claude code memory`, `claudecode memory`, and `claude memory md`; `/learn/claude-code-memory` has 23 page impressions | **Validated and already active.** Wait for its readouts; do not stack another edit. |
| `AI agent memory` / `agent memory` | `10.1 → 74.8` for `AI agent memory`; `10.4 → 66.9` for `agent memory` | Related queries include `claude memory`, `claude code memory`, `agent workflow memory`, and named agent tools; `rohitg00/agentmemory` had 25,335 GitHub stars at capture | Existing `/learn/ai-agent-memory-local-vs-cloud`; no current GSC page row | **Validated category, lower execution priority.** It lacks an impression-backed page in the current window. |
| `LLM wiki` | `0.7 → 3.8` beside `Obsidian`; `1.6 → 15.2` in the niche request | Related queries are unusually clean: Karpathy, GitHub, Obsidian, Claude Code, Codex, `llm wiki skill`, and `llm wiki v2`; `nashsu/llm_wiki` had 14,854 GitHub stars | GSC exposes `llm wiki 2.0` with 1 impression at position 13; `/learn/distilled-wiki-pages-ai-memory` has 2 page impressions | **Validated strategic category and future refresh candidate.** Prefer the existing LLM-wiki page, not a new article. |
| `memory MCP` / `MCP memory server` | `3.9 → 13.7` for `memory MCP`; `4.2 → 11.3` for `MCP memory server` | Related queries directly include `mcp server memory`, `claude memory`, `claude code memory`, `codex memory`, `agent memory`, and `open memory` | `/learn/mcp-memory-server` has 1 impression at position 10; the localhost diagnostic has 3 impressions at position 6.7 | **Validated high-intent long tail.** Keep as setup/diagnostic acquisition, not the main reach bet. |
| `Obsidian` plus Claude/agent modifiers | Broad `Obsidian` rose `56.6 → 83.6` Worldwide and `24.3 → 69.6` in Taiwan | Generic `Obsidian` is mixed with stone, game, and app intent, but related rising queries include `obsidian claude code` `+3,350%`, `obsidian and claude` `+2,400%`, and `obsidian claude` `+1,500%`; two relevant Reddit posts showed scores 160 and 255; `AgriciDaniel/claude-obsidian` had 9,589 stars | `/learn/wenlan-vs-obsidian-ai-memory` has 4 impressions at position 4.5 and already cites maintained Obsidian/OSS sources | **Validated only with modifiers.** Do not target generic `Obsidian`; refresh or distribute the existing comparison when a later window permits. |
| `AI knowledge base` / `knowledge base for AI` | `1.9 → 3.8` for `AI knowledge base`; `2.6 → 4.8` for `knowledge base for AI` | Related queries include `knowledge base open source`, `claude knowledge base`, `RAG`, `LLM wiki`, and knowledge-base software, but enterprise support and generic definitions remain mixed | `/learn/ai-work-memory-vs-knowledge-base` has 6 impressions at position 8.2 | **Validated secondary cluster.** Use agent/local/source-backed modifiers and refresh the existing comparison before any new URL. |
| Generic `knowledge base` | `10.1 → 18.6` beside the same bridge terms | Related queries span definitions, IT, company support, Google, HubSpot, Microsoft, apps, and software | Wenlan has partial coverage, but the unmodified intent is much broader than the product | **Rejected as a primary target.** It is a modifier/parent category, not a standalone campaign keyword. |
| `AI memory` | Large apparent rise: `18.3 → 66.8` | Related queries are dominated by AI news, HBM, memory stocks, SK Hynix, memory cards, and memory foam | The raw phrase is not a clean description of Wenlan demand | **Rejected as a primary keyword.** The large curve is a false positive for this product. |
| `AI wiki` | `33.0 → 70.0` inside the niche request | Related queries are dominated by AI news, OpenAI, Character AI, Minecraft, and broad product queries | Wenlan's source-backed wiki job is narrower | **Rejected as a primary keyword.** Use `LLM wiki` or source-backed/agent modifiers instead. |
| `AI notes` | `47.2 → 75.3` Worldwide in the knowledge-work request | The phrase can mean transcription, note generation, note apps, or summaries; no current GSC corroboration was captured | No clean impression-backed Wenlan gap | **Inconclusive and out of priority.** Do not create a page from Trends alone. |

## False-positive removal and clarified priority — 2026-07-19

The first ranking gave `AI memory` too much visual influence even though its
related queries had already shown that the curve was irrelevant to Wenlan. A
second set of official Explore comparisons therefore removed `AI memory`
entirely. The Taiwan request also removed the large `Obsidian` anchor so that
`AI 筆記` and `AI 知識庫` could be assessed directly.

The numbers remain request-relative Trends indices. They cannot be compared
across the three tables as keyword volume.

### Worldwide without `AI memory`

| Term | First 13 weeks | Recent 13 weeks | Full-period average | Intent result |
| --- | ---: | ---: | ---: | --- |
| `LLM wiki` | 0.7 | 4.2 | 1.9 | Small reach, unusually clean Wenlan/OSS intent. |
| `AI knowledge base` | 2.0 | 3.8 | 2.6 | Small, mixed enterprise/RAG intent; usable only with agent, local, open-source, or source-backed modifiers. |
| `knowledge base` | 10.4 | 18.8 | 14.7 | Larger parent category, but too broad for primary targeting. |
| `Obsidian` | 57.8 | 84.8 | 69.5 | Large ecosystem reach, but only modifier-qualified queries fit Wenlan. |
| `AI notes` | 23.7 | 36.9 | 31.3 | Large adjacent demand; intent is mostly note tools and generation, not durable agent memory. |

In a second focused English request, `AI notes` moved `46.5 → 72.8`,
`agent memory` moved `5.4 → 35.1`, `LLM wiki` moved `0.9 → 7.8`,
`AI knowledge base` moved `3.3 → 7.8`, and `memory MCP` moved `2.0 → 7.0`.
This confirms that removing `AI memory` does not make raw popularity the
priority rule: `AI notes` is larger, while `agent memory`, `LLM wiki`, and
`memory MCP` have much cleaner Wenlan intent.

### Taiwan without the `Obsidian` anchor

| Term | First 13 weeks | Recent 13 weeks | Full-period average | Intent result |
| --- | ---: | ---: | ---: | --- |
| `AI 筆記` | 36.0 | 67.4 | 52.0 | Real and growing, but adjacent rather than core. |
| `AI 知識庫` | 0.0 | 1.3 | 0.3 | Too little exact-phrase evidence for a dedicated asset. |
| `知識庫` | 59.3 | 65.7 | 58.7 | Real parent-category demand, but broad enterprise/support/software intent. |
| `個人知識庫` | 0.0 | 2.3 | 0.6 | Too sparse for a dedicated asset. |
| `第二大腦` | 0.0 | 7.7 | 1.9 | Emerging but volatile and still weak. |

The `AI 筆記` related-query table explains the large signal: `notebooklm`
indexed at 100, `筆記 型 電腦` at 81, `google 筆記` at 50, `google ai` at 49,
and `notion ai` at 41. This is a real Taiwan discovery surface, but it is
primarily AI note tools, document Q&A, meeting capture, summaries, and a laptop
ambiguity. It does not establish demand for Wenlan's durable cross-agent
knowledge layer.

Inspectable Taiwan-facing sources corroborate that intent: Notion describes
its AI note-taker around recording conversations, transcripts, summaries, and
follow-up tasks
([Notion zh-TW release](https://www.notion.com/zh-tw/releases/2025-05-13));
Taiwan's public-service learning portal offers a course titled
`NotebookLM智慧文件與AI筆記`
([e等公務園](https://elearn.hrd.gov.tw/info/10044528)); and National Taiwan
University presents NotebookLM as an AI note tool for source-grounded
document work
([NTU Computer and Information Networking Center](https://www.cc.ntu.edu.tw/chinese/epaper/home/news_content_n_17852_sms_26963_s_261694.html)).
These sources validate the note/document job, not a Wenlan acquisition claim.

The `AI 知識庫` related-query table contained only generic `知識 庫` at 100
and `obsidian` below 1. Removing Obsidian therefore did not reveal a hidden
exact-phrase cluster. The generic `知識庫` parent category is real, but its
intent is not specific enough to lead the campaign.

### One focus, three non-competing roles

The earlier flat list mixed demand, positioning, and distribution. They should
not compete for one rank:

1. **Demand/problem focus:** `agent memory`, led today by the narrower
   impression-backed `Claude Code memory` problem.
2. **Product/category claim:** `LLM wiki for AI agents`, which describes
   Wenlan's source-backed maintained knowledge layer more precisely than
   generic memory or knowledge-base language.
3. **Reach and integration bridges:** modifier-qualified `Obsidian` for
   ecosystem exposure, and `MCP memory` for high-intent integration.

This is the campaign center: **agent-memory demand → source-backed LLM-wiki
solution → Claude Code, Obsidian, and MCP entry points**.

The execution queue remains evidence-gated rather than being inferred from
Trends alone:

**Current execution order**

1. `Claude Code memory`: keep the already-published, impression-backed
   experiment as the only active change.
2. At the next eligible window, compare fresh GSC evidence for the existing
   LLM-wiki and modifier-qualified Obsidian pages; do not declare a winner from
   request-relative Trends indices.
3. Keep `agent memory` as the next demand hypothesis. It has the strongest
   cleaned relevant Trends direction, but no current impression-backed page
   row, so it is not an automatic next edit.
4. Keep `MCP memory server` and `memory MCP` as strong-fit integration and
   diagnostic long tails.
5. Use `AI knowledge base for agents` only as supporting comparison language,
   with local, source-backed, or open-source modifiers.

**Message architecture**

1. Problem Wenlan solves now: durable `Claude Code` and `agent memory`.
2. Category Wenlan should try to own: `LLM wiki for AI agents`.
3. Ecosystem bridge for reach and stars: `Obsidian + Claude Code/MCP`.
4. Integration proof: `MCP memory server` and cross-client workflows.
5. Adjacent discovery vocabulary: `AI notes` / `AI 筆記` and generic
   `knowledge base` / `知識庫`; observe and potentially bridge later, but do
   not make them Wenlan's primary positioning.

`AI memory`, `AI wiki`, and exact Taiwan `AI 知識庫` are excluded from the
primary candidate ranking. `AI 筆記` is not rejected as fake demand; it is
classified as real adjacent demand with poor current product-intent evidence.

## English acquisition priority

For exposure and GitHub stars, the useful keyword architecture is:

1. **Demand/problem:** `Claude Code memory`, `AI agent memory`, `agent memory`
2. **Product/category:** `LLM wiki for AI agents`
3. **Ecosystem bridge:** `Obsidian Claude Code`, `Obsidian AI memory`,
   `Obsidian MCP`
4. **High-intent integration:** `MCP memory server`, `memory MCP`,
   `Claude MCP memory`
5. **Supporting category:** `AI knowledge base`, `knowledge base for AI
   agents`, with local/source-backed/open-source modifiers

The unmodified phrases `knowledge base`, `AI memory`, and `AI wiki` are not
safe primary targets.

## Mandarin acquisition check

Taiwan focused exact-query request, past 12 months, without an `Obsidian`
anchor:

| Term | First 13 weeks | Recent 13 weeks | Decision |
| --- | ---: | ---: | --- |
| `AI 筆記` | 36.0 | 67.4 | Real adjacent demand; NotebookLM/Notion/meeting-note intent dominates. |
| `AI 知識庫` | 0.0 | 1.3 | Too little exact-phrase evidence for a dedicated asset. |
| `知識庫` | 59.3 | 65.7 | Real parent category; too broad alone. |
| `個人知識庫` | 0.0 | 2.3 | Too sparse for a dedicated asset. |
| `第二大腦` | 0.0 | 7.7 | Emerging but volatile and still weak. |

In a separate Taiwan ecosystem request, `Obsidian` moved `24.3 → 69.6`,
`知識管理` moved `3.6 → 5.4`, and `筆記軟體` moved `6.2 → 3.2`. Those values
are not compared numerically with the focused table because each Explore
request has its own scale. The usable conclusion is only that modifier-qualified
Obsidian remains a bridge while generic knowledge-management and note-software
terms remain broad.

The Simplified Chinese Worldwide comparison also left `Obsidian` far above
`知识库`, `AI 知识库`, `第二大脑`, and `AI 笔记`. Because Worldwide language
mix is not mainland-China demand and Google Search coverage differs by market,
this does not justify a zh-CN content expansion.

Current localized coverage is sufficient for this window:

- zh-TW and zh-CN home/Learn surfaces already use `LLM wiki`.
- Both locales have the source-backed LLM-wiki article.
- GSC shows only 5 impressions for `/zh-TW`, 4 for `/zh-CN`, and 1 each for
  the localized source-backed wiki article.

Do not mass-translate the English memory cluster. Re-check locale-specific GSC
and Trends only after the current English experiment has a readout.

## Reddit and OSS provenance

Raw interpreted inputs are retained at:

- `/tmp/wenlan-seo-demand/2026-07-18/reddit-observations.json`
- `/tmp/wenlan-seo-demand/2026-07-18/oss-stars.json`

The strongest repeated external signal is not “generic knowledge base.” It is
the combination of:

- AI agents losing context across sessions;
- Claude Code native memory versus a durable/shared memory layer;
- Obsidian as a human-readable Markdown surface for Claude Code;
- MCP as the cross-client connector;
- LLM wiki as the source-backed, maintained knowledge layer.

These sources nominate experiments; they do not replace GSC, describe search
volume, or prove that any change caused traffic or stars.

## Campaign decision

The Trends prerequisite is resolved for the current decision through official
Explore CSV exports. The unattended API remains account-gated, so recurring
capture is a browser/export step until Google grants alpha access.

No second experiment starts now. The current Claude Code memory refresh remains
the only active experiment and must reach its predeclared readouts.

When a later weekly window permits a new experiment, inspect existing indexed
pages in this order:

1. `/learn/distilled-wiki-pages-ai-memory` for the `LLM wiki` category;
2. `/learn/wenlan-vs-obsidian-ai-memory` for the Obsidian plus Claude/agent
   bridge;
3. `/learn/ai-work-memory-vs-knowledge-base` for `AI knowledge base` with
   source-backed/local/agent modifiers;
4. `/learn/mcp-memory-server` for the high-intent integration and diagnostic
   cluster.

Use the next GSC window to choose among them. Do not create a net-new article
while an existing impression-bearing surface cleanly covers the intent.
