# AI knowledge-base tool-selection candidate gate

Captured at: `2026-08-02T06:49:33Z`

This is a demand-discovery and coverage-gap decision. It does not start an
experiment, publish a page, request indexing, or convert third-party numbers
into GSC metrics.

## Evidence kept in native units

### Authenticated Wenlan evidence

The preserved Search Console export for `sc-domain:wenlan.app`,
`2026-07-03..2026-07-30`, reports 10 property clicks and 660 property
impressions. The 38 visible query rows expose only one priority-family query,
`llm wiki 2.0`, at 1 impression. No visible row contains `knowledge base`,
`知識庫`, `知识库`, `tool`, or `software`. This is a visibility limitation,
not zero demand.

OpenSEO's previously captured United States `AI knowledge base` result showed
880 in OpenSEO's third-party volume unit and exposed `tools`, `builder`,
`examples`, `open-source`, `GitHub`, and `free` modifiers. Its Taiwan
`AI 知識庫` result showed 210 in that same third-party unit. Neither value is
GSC data, Google Trends search volume, or a traffic forecast.

### Inspectable external demand and result shape

| Locale | Observation | Native unit and date | Provenance |
| --- | --- | --- | --- |
| English | People ask which AI knowledge-base tool works beyond basic search and compare source-of-truth, ingestion, freshness, maintenance, and MCP/context tradeoffs. | Reddit post: 33 votes, published 2026-01-09; inspected 2026-08-02. The post is now moderator-removed, so only its still-inspectable discussion is retained. | https://www.reddit.com/r/ProductManagement/comments/1q86wmx/any_ai_knowledge_base_tool_that_actually_works/ |
| Simplified Chinese | `求推荐一个可靠的 AI 知识库` asks for accurate, source-grounded document answers and discusses NotebookLM, local tools, retrieval limits, and long-context tradeoffs. | 6,166 views and 28 replies; created 2025-01-03; inspected 2026-08-02. | https://www.v2ex.com/t/1102252 |
| Traditional Chinese | Taiwan-language result pages already target `AI 知識庫工具`, tool suitability, source checking, privacy, and document-quality limits. This is result-shape corroboration, not user-volume evidence. | Page last checked 2026-04-28; inspected 2026-08-02. | https://aitoolradar.tw/articles/github-tools/anythingllm-private-ai-knowledge-base |
| Traditional Chinese | A Taiwan SERP result explicitly targets `AI知識庫軟體推薦` and a comparison-guide format. This is competitor/result-shape evidence only. | Crawled in the inspected result within four weeks; inspected 2026-08-02. | https://aitools.aiting.com/tw/topic/ai-knowledge-base |

The sources nominate a selection problem. They do not establish keyword
volume, exact rank potential, or that Wenlan should claim to be the best tool.

## Coverage and ownership check

Existing Wenlan owners are kept distinct:

| Intent | Current owner | Decision |
| --- | --- | --- |
| What an LLM Wiki / AI knowledge base is | `/learn/distilled-wiki-pages-ai-memory` | Keep. It already covers Karpathy, LLM Wiki, RAG, and the maintained-wiki model in three locales. |
| How to build one from Markdown, PDFs, folders, or Obsidian | `/learn/build-local-ai-knowledge-base-from-documents` | Keep. It owns document ingestion, repeatable sync, supported inputs, and the first build loop. |
| How source-backed knowledge stays current and reviewable | `/learn/source-backed-wiki-pages-ai-work` | Keep. It owns provenance, stale/conflicting evidence, refresh, and review. |
| How Codex, ChatGPT, Claude Code, and Cursor connect | `/learn/mcp-memory-server` | Keep. Tool-name access belongs to MCP, not separate Codex/ChatGPT knowledge-base URLs. |
| How to choose a suitable AI knowledge-base tool | No dedicated owner | Clean candidate gap. The answer should compare operating models and verification criteria, not publish an unsourced vendor ranking. |

Rejected new URLs:

- `RAG vs LLM Wiki`: already answered visibly in all three LLM Wiki locales;
  the retained exact Trends request had a 12-month average index of 0.
- `Codex knowledge base` and `ChatGPT knowledge base`: the retained Trends
  request is much smaller than the category lane, and the existing MCP page
  already owns client access.
- another `local/open-source AI knowledge base` build page: the newly live
  document workflow already owns that intent.
- a generic `best AI knowledge base tools` list: it would require volatile,
  source-by-source product maintenance and risks becoming an unsupported
  comparison.

## Candidate gate

1. **Inspectable provenance: pass.** Each observation retains URL, date,
   locale, and its native unit or explicitly says no volume is available.
2. **Repeated or high-intent problem: pass.** English, Simplified Chinese, and
   Taiwan-language result surfaces independently show tool-selection intent.
3. **Clean Wenlan gap: pass.** Current pages explain category, construction,
   trust, and client access, but none owns the selection question.
4. **First-party Wenlan proof: pass.** The Wenlan repository documents local
   storage, supported sources, source-backed Pages, citations, review, refresh,
   MCP clients, open-source scope, and explicit input limitations. These are
   sufficient to demonstrate the evaluation criteria without inventing a
   capability.
5. **Standalone utility: pass.** A reader can use the checklist to evaluate
   any tool even if they do not choose Wenlan.

## Prepared asset contract

Provisional canonical family:

- `/learn/choose-ai-knowledge-base-tool`
- `/zh-TW/learn/choose-ai-knowledge-base-tool`
- `/zh-CN/learn/choose-ai-knowledge-base-tool`

Provisional titles:

- `How to Choose an AI Knowledge Base Tool: 8 Tests That Matter`
- `如何選 AI 知識庫工具：8 個真正重要的檢查`
- `如何选 AI 知识库工具：8 个真正重要的检查`

The page should distinguish four operating models before evaluating products:

1. one-session document upload or long-context reading;
2. RAG/document question answering;
3. note editor or local Markdown vault with AI access;
4. maintained, source-backed knowledge used across agents and sessions.

The eight tests are source traceability, update/staleness behavior,
conflict/review handling, file ownership/export, local/privacy boundary,
agent interoperability, supported-input limits, and a reproducible acceptance
test. Use real Wenlan commands only in the Wenlan proof section. Do not add
`FAQPage` JSON-LD. Any named third-party product claim must come from a
maintained first-party source captured close to publication.

## Decision and boundary

Decision: **prepare locally; publication remains approval-gated**.

This candidate is distinct and passes the content gate. The current Frozen
Goal Contract has no fixed calendar article quota. The document knowledge-base
guide and Karpathy refresh are production-verified and measuring, so neither
consumes the single preparation slot. This candidate may therefore enter local
preparation now.

Push, PR creation, merge, deployment, request indexing, GSC validation, and
external publication remain separately approval-gated. Existing measuring
category pages must not be silently rewritten to smuggle this candidate into
their attribution windows.
