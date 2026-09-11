# Wenlan successor waiting-work initial audit — 2026-08-22

## Scope and boundaries

This is the first saved output of the user-approved successor waiting work.
It covers `2026-02-22..2026-08-22` demand discovery across English, zh-TW,
and zh-CN plus a read-only public GitHub visitor-to-star audit. It does not
modify a website page, README, release, analytics source, indexing state, or
external listing.

Demand observations remain separate from authenticated GSC. Exa reviewed 96
results across 12 search workstreams and deduplicated them to 81 unique URLs.
Three Exa searches aimed at Reddit returned no `reddit.com` URLs, so none of
those results were labeled Reddit evidence. Three subsequent domain-filtered
searches retained 12 relevant Reddit pages. Search-result similarity and
engagement are discovery evidence only, not keyword volume or Wenlan
performance.

## Demand matrix

| Locale | Repeated current wording | Strongest inspectable evidence | Wenlan coverage and decision |
| --- | --- | --- | --- |
| English | `Karpathy's LLM Wiki`, `persistent knowledge base for Claude Code`, `Obsidian + Claude Code`, source-cited or read-only wiki | A practitioner documented the raw-source, wiki, schema, ingest/query/lint workflow and the cost of re-deriving context every session; another documented event-driven document ingestion. Reddit discussions independently expose token cost, long-document ingestion, read-only source ownership, local execution, language support, and maintenance concerns. | Existing English LLM Wiki, Obsidian, and document-knowledge-base owners already cover the intent. Their latest clean evidence remains below the protected 20-page/3-qualified-query gate. Keep stable until the 2026-08-28 comparison. |
| zh-TW | `LLM Knowledge Base`, `AI 知識庫`, `LLM Wiki 知識系統`, `Claude Code + Obsidian` | Taiwan practitioners describe grounded knowledge-base routing, compare LLM Wiki implementations, and document real ingestion, source-cleaning, citation, stale-state, and format limitations. Engagement totals were not available in a stable native unit and remain unavailable, not zero. | Existing zh-TW LLM Wiki, Obsidian, and document-guide routes cover the main jobs. The evidence supports the established co-primary cluster, not another translation or generic `AI 筆記` page. |
| zh-CN | `Codex + Obsidian 自生长知识库`, `codex 外挂知识库`, `code agent 知识库`, `中文优先的 LLM 知识库` | V2EX posts describe repeated project-context loss, knowledge scattered across code/docs/people, uncertainty about when an agent should query the knowledge base, and real Codex/Claude Code workarounds. An Obsidian community implementation reports a 1,900+ page Chinese-first LLM Wiki and identifies long-term decay, logs, concurrent agent writes, and evidence links as the hard problems. | The existing Codex pages are framed primarily as persistent memory or workflow; this is a partial coverage gap for a source-backed Codex knowledge-base job. It may nominate a future refresh, but cannot bypass the post-crawl 20/3 gate or the clean-window requirement. |

## High-signal sources retained

### English and cross-language implementation evidence

- [Karpathy's original LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f4): maintained first-party seed for the raw-source, wiki, and schema model.
- [Building a Persistent Knowledge Base for Claude Code](https://puvaan.dev/posts/building-a-persistent-knowledge-base-for-claude-code/): practitioner implementation with session-start injection, transcript extraction, human review, and wiki linting.
- [Event-driven document management for llm-wiki](https://jakobs.dev/extending-llm-wiki-event-driven-doc-management/): practitioner implementation covering watched files, immutable sources, Obsidian, agent routing, and append-only logs.
- [Karpathy's LLM Wiki setup](https://www.reddit.com/r/ObsidianMD/comments/1uai1w2/karpathys_llm_wiki_setup/): 145-vote first-person discussion with both positive workflows and a 213-vote objection that AI-managed linking may weaken human knowledge work; replies separately emphasize canonical source files and review.
- [Token-efficient Karpathy LLM Wiki refactor](https://www.reddit.com/r/ObsidianMD/comments/1sqfe7m/i_have_refactored_the_karpathy_llmwiki_and_it_is/): 88-vote implementation report moving ingest, lint, and query operations out of an oversized always-loaded file.
- [Local LLM Wiki Obsidian plugin](https://www.reddit.com/r/ObsidianMD/comments/1shntdn/new_plugin_llm_wiki_turn_your_vault_into_a/): 212-vote launch with source links, local execution, and explicit read-only concerns in the discussion.
- [Claude Code and Obsidian as an AI-maintained wiki](https://www.reddit.com/r/ClaudeAI/comments/1uwrxbo/claude_code_and_obsidian_as_an_aimaintained/): 362-vote workflow centered on immutable raw material, maintained Markdown, ingest/query operations, and citations.

### zh-TW evidence

- [LLM Knowledge Base implementation comparison](https://blog.aihao.tw/2026/05/20/llm-knowledge-base/): compares real LLM Wiki structures and highlights source links, conflict handling, lint, and the difference from repeated RAG reconstruction.
- [CareerWise knowledge-base routing case](https://www.cythilya.tw/2026/07/16/careerwise-search-knowledge-tool/): grounded Taiwan implementation showing why unconditional retrieval wastes latency and tokens and why weak chunks can mislead answers.
- [Karpathy AI knowledge base with Claude Cowork](https://yojuhsu.com/blog/karpathy-ai-wiki-claude-cowork): first-person migration of long-lived notes with source cleaning, human judgment, format limits, and maintenance requirements.
- [Three months using Claude with Obsidian](https://ericwu.asia/blog/2026-05-30-%E6%88%91%E7%94%A8-claude-%E7%AE%A1-obsidian-%E7%9A%84%E4%B8%89%E5%80%8B%E6%9C%88/): retained as a practitioner durability check rather than a keyword-volume source.

### zh-CN evidence

- [给 Codex 做外挂知识库](https://www.v2ex.com/t/1223201): concrete project-handover case where code, external documents, historical decisions, and human knowledge are disconnected; replies discuss Obsidian, Git, and agent-maintained documentation.
- [有没有办法给 code agent 提供知识库？](https://www.v2ex.com/t/1221777): explicit high-intent question about repeated agent mistakes, overloaded `AGENTS.md`, retrieval timing, and MCP or file-based workarounds.
- [中文优先的 LLM 知识库运营工具链](https://forum-zh.obsidian.md/t/topic/62709): first-person 1,900+ page implementation identifying ingestion debt, log growth, concurrent agent writes, and evidence provenance as operating problems.
- [Codex + Obsidian 自生长知识库](https://juejin.cn/post/7671867883983896618): uses the exact `Codex + LLM wiki + Obsidian` wording and describes raw, wiki, and schema layers plus Git-traceable change history.

## Demand conclusion

The three languages converge on one operational job: preserve source material,
let agents incrementally compile and query maintained Markdown, and keep
citations, conflicts, freshness, review, and file ownership inspectable. The
recurring adoption problems are not generic memory: they are ingestion,
retrieval timing, context/token cost, long or non-text documents, stale pages,
concurrent writes, and safe source ownership.

This strengthens the existing co-primary AI knowledge-base and Karpathy or LLM
Wiki center. It does not justify splitting Karpathy below AI knowledge bases.
`Obsidian + Claude Code` and zh-CN `Codex knowledge base` are concrete workflow
phrases; generic `Obsidian workflow`, `AI memory`, and `AI notes` remain too
broad. ChatGPT-specific source-backed knowledge-base evidence was materially
weaker in this pass, so no ChatGPT-specific page is nominated.

## Public GitHub visitor-to-star audit

Captured from `7xuanlu/wenlan` public `main` and the latest GitHub release on
2026-08-22.

### What already works

- English, zh-Hant, zh-Hans, and Spanish READMEs share the same first-screen
  structure and expose synchronized localized product claims.
- The first screen states the disappearing-AI-work problem, shows the desktop
  product with citations, exposes CI/release/license signals, and provides a
  direct Get started path.
- The README gives concrete desktop, headless, Claude Code, Codex, and MCP
  installation paths and accurately explains the LLM Wiki foundation.
- No large README rewrite is justified. The current public README is already
  materially stronger than a feature list or generic AI-memory pitch.

### Discrete gaps

1. GitHub's latest public release is `v0.16.0`, published
   `2026-08-19T03:57:54Z`, but the production homepage, download page, and
   about page all still render `v0.15.8`. This is a factual release-surface
   drift and the highest-priority conversion repair candidate.
2. The four README locales contain no literal request to star the repository.
   That is a possible conversion gap, not proven causality. A future candidate
   should place one restrained star request only after concrete product proof,
   not above the first explanation or as a repeated badge wall.
3. `v0.16.0` has 12 release assets. At capture, the runtime archives had small
   but non-zero downloads, while the macOS DMG and Windows setup executable
   each had zero downloads. These are cumulative point-in-time GitHub units,
   not a date-range CTA rate or evidence that a platform lacks demand.

## Candidate decisions

| Candidate | State | Reason |
| --- | --- | --- |
| `v0.16.0` site release alignment | Prepare exact proposal; separate publication approval required | Proven live factual drift across homepage, download, and about surfaces. This is technical/product correctness, not a new search experiment. |
| Restrained GitHub star CTA after product proof | Hold as a local wording candidate | No literal star request exists, but traffic is too small to claim this is the primary growth constraint. Do not mix it into the release correction. |
| Existing English LLM Wiki / Obsidian / document pages | Wait to 2026-08-28 | Current owners exist and remain below the protected clean 20/3 gate. |
| Existing Codex page reframed around a source-backed knowledge-base job | Candidate for later evidence read | zh-CN sources show a clean problem formulation, but current Codex routes partially cover it and the action gate has not passed. Refresh before considering a new URL. |
| New ChatGPT knowledge-base page | Reject for this pass | Independent, high-intent source-backed evidence was weaker than Codex, Claude Code, LLM Wiki, and Obsidian evidence. |

## Next saved outputs

1. Complete the single exact-fit high-authority-path research lane without a
   submission or maintainer contact.
2. Prepare the `2026-08-28` native-unit decision matrix from the next completed
   weekly report.
3. If separately approved, build the `v0.16.0` factual correction as an
   isolated exact diff; keep the optional star CTA out of that correction.
