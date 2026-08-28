# Audience-oriented scenario demand validation

Captured: `2026-08-26` (`America/Los_Angeles`)

Decision: **one audience-oriented task passes demand discovery, but broad persona pages do not.** Prepare a research workflow around papers, PDFs, claim-to-source traceability, and literature synthesis. Do not create generic pages for students, engineers, consultants, or finance users.

This record is demand discovery, not GSC input, keyword volume, or a publication approval. Google Trends values remain request-relative `0–100` indices. SERP observations record result shape, not an exact ranking guarantee. Community posts and OSS repositories show repeated problems and implementations, not market size.

## Authenticated evidence boundary

- OpenSEO identified the connected account as `h164654156465@gmail.com`; the signed-in Google surface displayed `Qi-Xuan Lu` for the same address. The OpenSEO project is `Default (wenlan.app)`, market `2840/en`.
- OpenSEO reported `0` credits, no saved keywords, no rank tracker, and an empty project research log. Paid keyword metrics or live SERP research could not be bought and were not invented.
- One authenticated OpenSEO GSC read returned `71` privacy-visible query rows for `sc-domain:wenlan.app`, `2026-07-27..2026-08-24`. The rows included `llm wiki`, agent-memory terms, brand terms, and unrelated noise. None visibly named a student, research, consultant, product, or finance workflow. Missing visible rows are **unavailable**, not proof of zero demand.
- Later OpenSEO requests returned `Auth required`. The successful first-party read above remains a bounded observation; no additional OpenSEO result is claimed.

## Google Trends discovery

All comparisons use Web Search, past 12 months, captured through the signed-in official Google Trends Explore UI on `2026-08-26`.

### Worldwide audience wording

Query URL: <https://trends.google.com/trends/explore?date=today%2012-m&q=AI%20for%20students,AI%20research%20assistant,AI%20for%20consultants,AI%20for%20finance,AI%20for%20product%20managers>

| Query | Average raw index |
| --- | ---: |
| `AI for students` | 53 |
| `AI research assistant` | 10 |
| `AI for consultants` | 4 |
| `AI for finance` | 37 |
| `AI for product managers` | 1 |

`AI for finance` is ambiguous and cannot be treated as knowledge-base demand. The comparison only shows that student/research language is more visible than consultant or product-manager wording inside this request.

### Worldwide task wording

Query URL: <https://trends.google.com/trends/explore?date=today%2012-m&q=AI%20literature%20review,AI%20research%20assistant,PDF%20AI,client%20knowledge%20base,consulting%20knowledge%20management>

| Query | Average raw index |
| --- | ---: |
| `AI literature review` | 1 |
| `AI research assistant` | 1 |
| `PDF AI` | 54 |
| `client knowledge base` | 0 |
| `consulting knowledge management` | 0 |

The comparison supports document/PDF language, but not the conclusion that a generic `PDF AI` page fits Wenlan. Its SERP must be checked for the actual job.

### Taiwan Traditional Chinese

Query URL: <https://trends.google.com/trends/explore?date=today%2012-m&geo=TW&q=AI%20%E7%9F%A5%E8%AD%98%E5%BA%AB,AI%20%E7%AD%86%E8%A8%98,AI%20%E7%A0%94%E7%A9%B6%E5%8A%A9%E6%89%8B,AI%20%E8%AB%96%E6%96%87,AI%20%E9%A1%A7%E5%95%8F>

| Query | Average raw index |
| --- | ---: |
| `AI 知識庫` | 0 |
| `AI 筆記` | 26 |
| `AI 研究助手` | 0 |
| `AI 論文` | 55 |
| `AI 顧問` | 10 |

`AI 論文` and `AI 筆記` are the natural discovery handles in this comparison. Exact `AI 知識庫` is too weak to lead a Taiwan researcher page. The rising query panel connected `AI 知識庫` with `obsidian`, and connected `AI 筆記` with NotebookLM wording; those remain adjacent signals, not a Wenlan performance claim.

### Mainland-China geography, Simplified Chinese wording

Query URL: <https://trends.google.com/trends/explore?date=today%2012-m&geo=CN&q=AI%20%E7%9F%A5%E8%AF%86%E5%BA%93,AI%20%E7%AC%94%E8%AE%B0,AI%20%E7%A0%94%E7%A9%B6%E5%8A%A9%E6%89%8B,AI%20%E8%AE%BA%E6%96%87,AI%20%E5%92%A8%E8%AF%A2>

| Query | Average raw index |
| --- | ---: |
| `AI 知识库` | 7 |
| `AI 笔记` | 1 |
| `AI 研究助手` | 0 |
| `AI 论文` | 31 |
| `AI 咨询` | 7 |

Google usage and Trends coverage in mainland China are sparse, so these values are not population demand. They are retained only as one source-native comparison. The related-query panel connected both `AI 知识库` and `AI 笔记` with `obsidian`.

## Trilingual SERP result shape

One focused Google query was inspected per locale on `2026-08-26`.

| Locale | Query | Result shape | Wenlan implication |
| --- | --- | --- | --- |
| English / US | `AI research assistant literature review PDF citations` | ResearchPal, Paperguide, SciSpace, ResearchRabbit, university guidance, and a Reddit discussion. Results emphasize paper discovery, PDF reading, literature review, and citations. | Do not promise scholarly search, automatic literature-review writing, DOI lookup, or citation formatting. |
| zh-TW / Taiwan | `AI 論文 PDF 引用 文獻回顧` | A university-library guide, practitioner workflows, tool lists, and a visible `PDF 抓完就忘？…打造「論文大腦」` result. | Natural language is `AI 論文`, `文獻回顧`, `文獻筆記`, and `論文大腦`, not a literal `AI 研究助手`. |
| zh-CN / China | `AI 论文 PDF 引用 文献综述` | Zhihu, CSDN, Bilibili, and commercial research tools emphasize PDF reading, literature-review generation, real citations, and reference formatting. | Use `AI 论文`, `文献综述`, `论文知识库`, and `可追溯引用`, while explicitly excluding paper generation and citation-style automation. |

The three result sets expose the same research workflow but also show that the broad head term is dominated by capabilities Wenlan does not provide. The eligible page must own a narrower job: maintain an inspectable research knowledge base from papers the user already has.

## Repeated problem evidence

### Researcher and student workflow — passes

- [Distill](https://github.com/luisalarcon-gauntlet/Distill) and [UReKA](https://github.com/Agents4Academia-AI/UReKA) implement research knowledge workflows over papers, course material, Zotero, Notion, Obsidian, and source-cited answers.
- A firsthand study-bot report documented fabricated citations and used an explicit claim/source ledger to catch unsupported answers: <https://dev.to/magickong/my-study-bot-invented-citations-a-30-line-ledger-caught-them-2ki2>.
- Taiwan university guidance independently requires users to verify AI output, citations, current source versions, and research integrity: <https://www.lib.ntu.edu.tw/img/tulblog/HELP/HELP_20260525_AI.pdf> and <https://ctld.ntnu.edu.tw/generative_ai>.
- An academic-data discussion reports that two-column PDFs, footnotes, tables, and extraction quality can dominate retrieval quality: <https://community.deeplearning.ai/t/how-are-you-handling-academic-data-collection-for-research-based-ai-projects/892630>.

The repeated job is not “AI for students.” It is: **compare a bounded set of papers, keep every synthesis traceable to the paper and passage, expose contradictions and limitations, and update the synthesis when new papers arrive.**

### Consultants — real problem, insufficient acquisition evidence

- Independent consultant discussions mention preliminary research, past proposals, case studies, and source-returning internal knowledge systems: <https://www.reddit.com/r/consulting/comments/1mydo41/are_consultancies_actually_using_ai_tools/> and <https://www.reddit.com/r/consulting/comments/1j2hsay/consultants_in_midsized_firmswhat_ai_tools_are/>.
- Vendor and practitioner guides repeatedly describe client/project separation, approved versus draft work, freshness, provenance, and reusing prior research.

The task is plausible, but the retained evidence is too vendor-heavy and the Trends/Google result shape is too weak to make a new page the highest-leverage choice. Continue research around the narrower task `reuse prior research without mixing client context`; do not publish `AI knowledge base for consultants`.

### Finance — demand exists, Wenlan fit fails

- Maintained OSS projects such as [sec-filing-agent](https://github.com/Zhonghui-li/sec-filing-agent) and [finance-filings-analyst](https://github.com/aman9824/finance-filings-analyst) repeat SEC filing retrieval, XBRL and period controls, verbatim numeric verification, citations, abstention, and evaluation.

Finance-grade search requires deterministic numeric checks, filing/date semantics, and often XBRL-aware retrieval. Wenlan can manage source documents and citations, but current first-party proof does not establish those finance-specific controls. A finance persona page would be YMYL-adjacent and overclaim product fit. Reject it now.

### Engineers — already covered

Current owners already cover coding-agent project knowledge, retrieval regression, when agents should query, and multi-agent conflict. A generic `AI knowledge base for engineers` page would be a persona doorway page. Only a distinct diagnostic task may nominate another URL.

### Product and operations — research only

Interview notes, decision logs, PRDs, and source-backed product briefs recur in product-tool content, but current independent demand evidence is weaker and overlaps existing source-backed and coding-agent owners. Continue research around `keep user interviews and product decisions source-backed across AI sessions`; do not publish a generic product-manager page.

## Candidate gate: source-backed research knowledge base

Canonical scenario family: `source-backed-research-knowledge-base` in English, zh-TW, and zh-CN.

| Gate | Status | Evidence-backed decision |
| --- | --- | --- |
| Inspectable provenance | Pass | Trends query, geography, period, capture date, raw index, SERP query, community URL, and OSS URL are retained above. |
| Repeated or high-intent problem | Pass | Independent OSS, student/practitioner, university, and forum sources repeat multi-PDF synthesis, citation verification, and extraction failures. |
| Trilingual SERP | Pass, narrow task only | All three result sets show research/PDF/citation intent. The broad tool/writing intent is explicitly excluded. |
| Clean coverage gap | Pass, with a hard boundary | The generic document-import guide owns supported inputs and sync; the citation guide owns claim-level debugging. No current owner gives researchers a literature matrix, contradiction/limitation workflow, new-paper update loop, and academic-integrity boundary as one task. |
| Wenlan first-party proof | Pass | Current source proves `.md`, `.txt`, text-extractable `.pdf`, folder and read-only Obsidian ingestion; incremental sync; maintained source-backed Pages; per-claim citations; stale/revision/review state; and lint. |
| Standalone utility | Pass | The workflow works as a neutral research method even without Wenlan. |
| Contextual internal links | Pass when implemented | Link from the document-import guide, citation-verification guide, source-backed knowledge-base guide, and locale Learn hub. |
| Authority path | Pass as a predeclared candidate only | `0x11c11e/awesome-ai-research-tools` is active, non-archived, CC0, had 65 stars and a `2026-08-15` push at capture, contains a specific `Notes & Knowledge Management` category, welcomes factual sub-18-word PRs, and had no Wenlan duplicate. A later submission remains separately approval-gated. |

## Required page contract

### One task and natural query family

- English: `build a research knowledge base from papers and PDFs`, `source-backed literature review workflow`, `AI research notes with citations`.
- zh-TW: `用論文 PDF 建立研究知識庫`, `AI 論文筆記保留引用`, `論文大腦 文獻回顧`, `可追溯來源的研究筆記`.
- zh-CN: `用论文 PDF 建立研究知识库`, `AI 论文笔记保留引用`, `论文知识库 文献综述`, `可追溯来源的研究笔记`.

### Standalone workflow

1. Start with one research question and a bounded set of already acquired papers.
2. Keep originals authoritative; ingest only text-extractable PDFs or derived Markdown/text.
3. Build a literature matrix for claim, method, sample, result, limitation, and exact source location.
4. Separate agreement, contradiction, and unknowns instead of generating one smooth consensus.
5. Verify important claims against the cited passage and current paper version.
6. Add new papers through the same source boundary and refresh only the affected synthesis.
7. Export or preserve a readable, inspectable research artifact; human researchers own interpretation and final writing.

### Prohibited claims

- No scholarly database search, DOI discovery, Zotero import, reference-style formatting, or automatic paper discovery.
- No promise to write a thesis, literature review, or publishable manuscript.
- No claim that RAG eliminates hallucinations or that citations prove truth.
- No direct support claim for scanned/image-only PDFs before OCR.
- No claim that Wenlan evaluates study quality, statistics, or academic validity.

## Decision and next action

The research task passes demand discovery and is the highest-leverage audience-oriented candidate currently found. After integration with the retrieval-regression family already on `main`, it is recorded as the ninth protected scenario family and must remain one trilingual task with separate natural language—not three literal translations.

The structured backlog, generated report, scenario verifier, and scenario tests now protect the new family. Local three-locale page preparation was completed on `2026-08-27` at:

- `/learn/source-backed-research-knowledge-base`
- `/zh-TW/learn/source-backed-research-knowledge-base`
- `/zh-CN/learn/source-backed-research-knowledge-base`

Each locale owns the same bounded research task in natural local search language, links from the document-ingestion, citation-verification, and source-backed knowledge-base owners, and keeps the prohibited claims above visible. After integration with current `main`, the sitemap intent map has one owner for each of `141/141` URLs.

Integrated verification passed `pnpm seo:goal:check`, `pnpm seo:scenario:check`, `pnpm test:goal`, the focused scenario/intent/i18n suite, `pnpm lint`, `pnpm build`, and `pnpm seo:technical:built`. The focused integrated suite passed `79/79`; the production build generated `251` static pages. Desktop `1280x720` and mobile `393x852` production renders were checked for all three locales with correct canonical, locale routing, Article/BreadcrumbList schema, visible FAQ without FAQPage schema, and no document-level horizontal overflow or CJK glyph failure.

The full `pnpm test:seo` suite remains blocked by four pre-existing release-alignment assertions: the current sibling Wenlan source reports `0.17.3` while current `main` still contains `0.16.0` release metadata. The new scenario tests pass; this receipt does not silently repair that unrelated release state.

The user approved website commit, push, PR, merge, Vercel deployment, and production verification on `2026-08-27`. Request indexing, GSC validation, and the external directory proposal remain separately approval-gated.
