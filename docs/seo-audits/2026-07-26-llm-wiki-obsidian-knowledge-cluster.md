# LLM Wiki, Obsidian, and AI Knowledge Cluster — 2026-07-26

Status: candidate decision prepared from current evidence. No experiment is
started while the `v0.15.0` release/download correction occupies the single
production slot.

## Decision

Do not create another URL for generic `AI notes`, `AI 筆記`, `knowledge base`,
or `AI 知識庫`. The requested discovery surface already exists as three
non-competing roles:

1. **Category:** `/learn/distilled-wiki-pages-ai-memory` explains the
   source-backed LLM wiki for AI agents.
2. **Ecosystem bridge:** `/learn/wenlan-vs-obsidian-ai-memory` explains
   Obsidian vaults, AI notes, MCP bridges, and agent-memory boundaries; the
   evidence-backed zh-TW counterpart covers `AI 筆記` and `AI 知識庫`.
3. **Supporting comparison:** `/learn/ai-work-memory-vs-knowledge-base`
   explains why atomic work memory and maintained AI knowledge pages are
   different layers.

The next SEO action is a small internal-link closure, not another article:

- add the English knowledge-base and Obsidian pages to the LLM-wiki page's
  related paths;
- add the English LLM-wiki page to the Obsidian page's related paths;
- leave the already complete knowledge-base links and Learn-hub search cards
  unchanged;
- keep `AI notes` / `AI 筆記` as adjacent bridge vocabulary inside the
  Obsidian decision page, not Wenlan's primary category claim;
- do not add a zh-CN Obsidian or knowledge-base page without locale-specific
  evidence.

This candidate may start immediately after the current release/download
change is production-verified. Measurement waiting is not a reason to delay
that next preparation.

## Authenticated GSC evidence

Source: Search Console API for `sc-domain:wenlan.app`, complete days
`2026-06-27..2026-07-24`, fetched into `/tmp/wenlan-seo`.

| Metric | Native value |
| --- | ---: |
| Property clicks | 7 |
| Property impressions | 329 |
| Visible-query clicks | 1 |
| Visible-query impressions | 81 |
| Query visibility gap | 6 clicks; 248 impressions |

The visible rows are a privacy-filtered subset and are not treated as complete
property or non-brand totals.

| Existing page/query | Clicks | Impressions | Average position | Decision |
| --- | ---: | ---: | ---: | --- |
| LLM-wiki page | 0 | 2 | 3.5 | Keep the current category answer; strengthen its cluster exits only. |
| `llm wiki 2.0` visible query | 0 | 1 | 13.0 | Confirms the category vocabulary but is too small for another URL. |
| English Obsidian page | 0 | 4 | 4.5 | Preserve the strong modifier-qualified page and link it directly to the LLM-wiki hub. |
| AI work memory vs knowledge base | 0 | 9 | 8.0 | Preserve the current page while its 20-impression experiment threshold is still pending. |

## Demand-discovery boundary

The official Trends evidence in
`docs/seo-audits/2026-07-18-trends-demand-discovery.md` remains in native
request-relative `0–100` units:

- `LLM wiki` is small but has unusually clean Wenlan/OSS intent.
- `Obsidian` is a large ecosystem, but only modifier-qualified AI-agent,
  Claude Code, and MCP queries fit Wenlan.
- English `AI knowledge base` is smaller and mixed with enterprise/RAG
  intent; it is usable only with agent, local, open-source, or source-backed
  modifiers.
- Taiwan `AI 筆記` is real and growing, but its dominant intent is note tools,
  NotebookLM, Notion, meeting capture, and summaries.
- Exact Taiwan `AI 知識庫` was too sparse for a dedicated asset.

Those indices are not keyword volume and are not converted into GSC,
visitors, outbound events, or stars.

## Current coverage graph

| Surface | LLM wiki | Obsidian / AI notes | AI knowledge base | Remaining gap |
| --- | --- | --- | --- | --- |
| English Learn hub | Direct search card | Direct search card | Direct search card | None |
| English LLM-wiki article | Primary answer | Obsidian appears only in FAQ/projection copy | Described as a maintained knowledge layer | Missing direct related links to both comparison pages |
| English Obsidian article | Source-backed page link only | Primary comparison | Direct related link | Missing direct related link to the LLM-wiki category page |
| English knowledge-base article | Direct related link | Direct related link | Primary comparison | None |
| zh-TW Learn/LLM-wiki/Obsidian | Translated hub and article | Translated evidence-backed comparison | Supporting phrase plus English comparison path | No new URL needed |
| zh-CN Learn/LLM-wiki | Translated hub and article | No locale-specific demand gate | Supporting category only | Keep narrower coverage |

## Candidate gate

1. **Inspectable provenance:** authenticated GSC query/page exports, committed
   Trends provenance, exact routes, date range, locales, and native units are
   recorded.
2. **Repeated or high-intent problem:** LLM-wiki and modifier-qualified
   Obsidian demand repeat across Trends, OSS, and existing GSC page rows;
   knowledge-base language is supporting rather than primary.
3. **Clean coverage gap:** no new content gap exists, but the English
   cross-link graph is incomplete.
4. **First-party proof:** Wenlan can demonstrate the Source/Memory/Page model,
   `/capture`, `/distill`, `/pages`, review, provenance, handoff, and readable
   Markdown projection.
5. **Standalone utility:** the three pages remain useful decision guides even
   if the reader never installs Wenlan.

## Guardrails

- Keep all three existing canonical URLs, publication dates, hreflang,
  sitemap membership, and schema types.
- Do not add `FAQPage` JSON-LD.
- Do not imply that Trends indices are search volume.
- Do not claim SEO lift, source-to-page sessions, CTA causality, or star
  attribution.
- Do not request indexing, submit validation, publish externally, or deploy
  without the applicable approval.
