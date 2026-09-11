# Wenlan audience-scenario demand refresh — 2026-08-27

## Scope and evidence boundary

Captured on `2026-08-28` UTC before the Friday weekly SEO run. This is a
demand-discovery record for selecting future trilingual scenario families; it
is not authenticated GSC evidence, keyword volume, rank tracking, or a reason
to overwrite an existing owner.

Twelve locale-and-audience searches returned `74` result slots across four
audiences: software engineering, consulting/research analysis, finance
analysis, and students. Result slots remain search-result observations rather
than demand volume. Page-native reads, stars, reads, event dates, and quoted
product capabilities are retained only in their original units.

## Audience-by-task decision

| Audience | Repeated user task | Inspectable evidence | Existing Wenlan overlap | Maintained Wenlan proof | Decision |
| --- | --- | --- | --- | --- | --- |
| Finance analysts | Build a source-backed research knowledge base from filings and reports already held by the analyst; trace each written claim to an exact source and keep the research current | Anthropic's Kepler case describes a verifiable workflow over `26M+` SEC filings and `14,000` companies after interviews with `147` financial firms. Tencent Cloud's EasyLink article reports `420` reads and repeats source traceability, updates, audit, and multi-document finance work. `joansongjr/investor-harness` has `22` GitHub stars and preserves evidence levels, research archives, and handoffs. | Partial. Current source-backed and document-ingestion pages explain provenance generally, but none owns the analyst task of turning an existing filing set into an auditable research dossier. | Partial PASS. Wenlan proves source-backed Pages, per-claim citations, Spaces, source refresh, review, and handoff. It does **not** prove financial calculations, live market data, scanned-table extraction, investment advice, or regulatory compliance. | `research` — highest observed demand and intent, but publication requires a neutral authority path and an explicit non-advice/text-extractable-source boundary. |
| Consultants and research analysts | Keep client sources, research, decisions, and deliverable handoffs inside one client-scoped knowledge base | `cogni-work/insight-wave` exposes a consulting-engagement workflow with a shared knowledge base, reusable research, personas, handoffs, and deliverables. BusinessNext describes a former brokerage analyst using per-company notebooks and Markdown handoffs for cross-company comparison and client deliverables. `genli-ai/market-research-skills` publishes a Chinese structured research workflow with sources, data, reports, and signoff. | Partial. The research-paper page owns academic synthesis; the source-backed page owns generic provenance. Neither owns a client engagement with scoped sources, decisions, and deliverable handoffs. | PASS. Maintained Wenlan documentation explicitly supports Spaces for client knowledge, source-backed Pages, citations, refresh/review, `/brief`, and `/handoff`. | `research` — best next full-gate candidate. Complete independent English, zh-TW, and zh-CN SERP checks, three contextual inbound paths, and one neutral authority path before nominating publication. |
| Software engineers | Give Codex, Claude Code, or another coding agent stable project context backed by project sources | Taiwan Signals explains `CLAUDE.md`, context-window limits, relevant-file selection, and explore-first workflows. `chu1999tw/specrail` treats PRD and technical design as sources of truth for coding agents. A Tencent Cloud practitioner article reports `1,660` reads and combines Obsidian with source/wiki/schema and lint/review layers. | Covered. The current coding-agent source-backed family and LLM Wiki implementation pages already own this task. | PASS, but the clean-gap gate fails. | `reject` for a net-new URL. Route newly discovered wording to the existing owner only after its crawl/20/3/cooldown gate passes. |
| Students | Turn course slides, papers, and PDFs into a study knowledge base with citations and review | Fu Jen Catholic University Library published a `2026-08-24` event around course materials, PDFs, papers, citations, and study use. Mason AI Lab describes literature matrices, citation verification, text-versus-scanned-PDF limits, and academic integrity. `IssacW228/student-llm-wiki` has `172` GitHub stars and turns course slides into an LLM Wiki for review and exam preparation. | Mostly covered by the research-paper and document-ingestion owners. Exam preparation may be a distinct task, but it is not yet supported by a Wenlan-specific study workflow. | Partial. Wenlan proves source-backed ingestion and citations, but not quizzes, flashcards, grading, or an exam-preparation workflow. | `reject` for the current queue. Reconsider only if a standalone source-backed study task passes the product-proof gate without implying quiz or grading features. |

## Source record

### Engineering

- Taiwan Signals, Claude Code project context:
  <https://signals.tw/articles/claude-code-project-context/>
- `chu1999tw/specrail` (GitHub observation: `0` stars at capture):
  <https://github.com/chu1999tw/specrail>
- Tencent Cloud practitioner article (page observation: `1,660` reads):
  <https://developer.cloud.tencent.com/article/2668323>

### Consulting and research analysis

- `cogni-work/insight-wave`, consulting engagement orchestrator:
  <https://github.com/cogni-work/insight-wave/tree/main/cogni-consult>
- BusinessNext, multi-tool analyst research workflow:
  <https://www.bnext.com.tw/article/91590/notebooklm-gemini-claude-ai-research-workflow>
- `genli-ai/market-research-skills`, Chinese medium research workflow:
  <https://github.com/genli-ai/market-research-skills/blob/main/skills/analyst-research/references/workflow_medium.zh.md>

### Finance analysis

- Anthropic, Kepler verifiable financial research:
  <https://claude.com/blog/how-kepler-built-verifiable-ai-for-financial-services-with-claude>
- Tencent Cloud, EasyLink finance knowledge-base case (page observation:
  `420` reads): <https://cloud.tencent.cn/developer/article/2716609>
- `joansongjr/investor-harness` (GitHub observation: `22` stars at capture):
  <https://github.com/joansongjr/investor-harness>

### Students

- Fu Jen Catholic University Library event, published `2026-08-24`:
  <https://home.lib.fju.edu.tw/TC/index.php/node/4784>
- Mason AI Lab, student research workflow:
  <https://masonailab.com/career/ai-student-research/>
- `IssacW228/student-llm-wiki` (GitHub observation: `172` stars at capture):
  <https://github.com/IssacW228/student-llm-wiki>

## Next gate

The next research pass should finish the consultant/client-engagement family
first because its clean task gap and maintained product proof are stronger.
The finance family remains the higher-demand candidate, but it cannot be
published until its authority path and high-stakes capability boundaries pass.

No page, scenario decision, indexing state, external listing, or production
state changed from this research.
