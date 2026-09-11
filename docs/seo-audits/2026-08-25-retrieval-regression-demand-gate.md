# Retrieval regression demand gate — 2026-08-25

## Decision

`PASS — eligible net-new trilingual scenario, not authorized for publication.`

The distinct user task is: after changing source documents, embeddings,
chunking, hybrid retrieval, or reranking, use a versioned golden query set to
check whether an AI knowledge base still retrieves the expected evidence.

This is not the same intent as the existing citation-verification family. That
owner starts from one suspicious answer and checks whether each cited source
supports its claim. This candidate compares the same representative questions
before and after a retrieval change, separates retrieval from generation, and
records regressions by expected source and failure type.

The current `2026-08-24..2026-08-30` content commitment is already fulfilled.
This pass nominates the family for the next open decision window; it does not
start a second website experiment, change a page, request indexing, or publish
an external contribution.

## Research contract

- Research period: `2026-02-25..2026-08-25`.
- Capture date: `2026-08-25`.
- Discovery source: Exa web search and full-page extraction.
- Raw unit: returned result observation or inspectable page, issue, discussion,
  pull request, or maintained repository. None is keyword volume or Google
  rank.
- Search review: `110` returned result slots across `11` separate English,
  zh-TW, zh-CN, OSS, and Reddit-targeted searches; `94` unique URLs after URL
  deduplication; `16` duplicate slots.
- Reddit result: `unavailable`. Two explicit Reddit-targeted searches returned
  no `reddit.com` URL. GitHub discussions and practitioner articles are kept in
  their real source classes and are not relabeled as Reddit evidence.
- Google geography and exact rank: unavailable. The result sets establish a
  repeated search landscape, not a regional Google SERP position.

### OpenSEO boundary check

The connected hosted OpenSEO account returned `h164654156465@gmail.com`, scopes
`offline_access` and `mcp`, and `0` remaining credits. It contains one
`wenlan.app` project with default market `2840/en`, but no saved keywords, rank
tracker, project context, key pages, competitors, or research log. The account
email alone does not prove that the UI profile name is `Qi-Xuan Lu`.

No paid keyword-metrics or live-SERP call was attempted at a zero-credit
balance. OpenSEO therefore contributes an inspected capability/account boundary
to this gate, not keyword volume, rank, or cached demand evidence. GSC remains
the authority for Wenlan performance, and the Exa/community/OSS observations
remain demand discovery only.

## Natural query families

| Locale | One owner should cover | Do not split yet |
| --- | --- | --- |
| English | `RAG retrieval regression testing`; `RAG golden dataset`; `test AI knowledge base retrieval after embedding or chunking changes` | embedding, chunking, reranker, and corpus-update variants |
| zh-TW | `RAG 檢索回歸測試`; `RAG 黃金資料集`; `AI 知識庫召回準確率怎麼測`; `換 embedding 後怎麼驗證` | 黃金資料集／評測集 and 檢索／召回 wording |
| zh-CN | `RAG 召回回归测试`; `RAG 黄金评测集`; `知识库检索怎么评测`; `Embedding 升级召回漂移` | 黄金数据集／评测集 and 检索／召回 wording |

These are observed wording families, not volume estimates. Keep all variants on
one locale owner unless later GSC query-page evidence proves a different task.

## Evidence reconciliation

### English

- [DataAspirant's 2026 evaluation guide](https://dataaspirant.com/blog/rag-evaluation/)
  separates retrieval and generation, builds a golden set with expected
  sources and unanswerable cases, uses recall at k before an LLM judge, and
  turns the fixed set into a regression harness.
- [Haystack discussion #11697](https://github.com/deepset-ai/haystack/discussions/11697)
  is a dated production-practitioner question about debugging retrieval
  failures. The inspectable reply separates single-query debugging, corpus
  health, and regression evaluation, and uses a small golden set with
  document-level metrics.
- [rag-ferrite issue #206](https://github.com/lelabdev/rag-ferrite/issues/206)
  asks for a versioned golden dataset, Recall@k, MRR or nDCG, source precision,
  latency, deterministic comparison, and machine-readable output for a
  personal-knowledge retriever.
- [inherent pull request #140](https://github.com/inherent-prime/inherent/pull/140)
  is a merged implementation of run-over-run retrieval regression deltas, a
  gate, and an expanded golden corpus. Its review also documents why a zero
  baseline or unverified ratchet can make a claimed hard gate inert.

### Traditional Chinese

- [小丁的 RAG 檢索準確率除錯實錄](https://blog.tomting.com/2026/08/13/rag-retrieval-accuracy-eval-debug/)
  uses a gold set and Hit@k, then shows that a bad label pipeline produced a
  false low score. This is direct evidence for validating the measuring stick
  before tuning retrieval.
- [小丁的 retrieval ablation follow-up](https://blog.tomting.com/2026/08/15/rag-ablation-bm25-chunksize-reranker/)
  keeps one gold set and changes one factor at a time. It also corrects an
  earlier reranker conclusion after expanding from 10 to 100 questions,
  showing why minimum exposure and sample size belong in the workflow.
- [YennJ12's evaluation-pipeline guide](https://yennj12.js.org/yennj12_blog_V4/posts/fde-interview-guide-part36-eval-pipeline-zh/)
  treats a versioned golden dataset, offline evaluation, CI quality gate, and
  online monitoring as different layers.
- [Microsoft's zh-TW RAG evaluation guide](https://learn.microsoft.com/zh-tw/azure/architecture/ai-ml/guide/rag/rag-llm-evaluation-phase)
  is an official localized reference that separates grounding, completeness,
  utilization, relevance, and correctness. Its locale is zh-TW; user geography
  is not inferred.

### Simplified Chinese

- [AJie's RAG retrieval debugging guide](https://www.promptnet.cn/2026/06/09/rag-knowledge-base-retrieval-debugging/)
  repeatedly asks practitioners to inspect the query, retrieved chunks,
  scores, sources, rerank result, final context, and citations before changing
  the model.
- [Juejin's RAG retrieval implementation walkthrough](https://juejin.cn/post/7669038440533786687)
  repeats user-visible failures such as missing known material, invented
  numbers, and paraphrase instability, then separates chunking, vector recall,
  BM25, fusion, and reranking.
- [SegmentFault's embedding-upgrade drift guide](https://segmentfault.com/a/1190000048058746)
  is the closest exact-task match: it calls for a fixed evaluation set with
  expected document and revision evidence, no-answer cases, shadow indexes,
  and rollback acceptance before switching generations.
- [CRUD-RAG](https://github.com/IAAR-Shanghai/CRUD_RAG) is a maintained Chinese
  benchmark and implementation reference. It predates the research window, so
  it supports first-party method availability but is not counted as recent
  demand evidence.

## Candidate gate

| Required gate | Result | Reason |
| --- | --- | --- |
| Inspectable provenance | PASS | Every retained source preserves URL, capture date, language or locale, and native source class. No number is treated as search volume. |
| Repeated or high-intent problem | PASS | Independent practitioner reports, official documentation, OSS issues, a merged OSS implementation, and Chinese developer material repeat the same regression-testing task. Reddit is unavailable but not required because independent corroboration exists. |
| Trilingual search landscape | PASS with boundary | Separate English, zh-TW, and zh-CN searches return the same task in natural locale wording. Exact Google rank and regional search volume remain unavailable. |
| Clean Wenlan coverage gap | PASS | `/learn/verify-ai-knowledge-base-citations` owns claim-to-source verification for one answer. `/docs/evaluation` owns Wenlan benchmark interpretation and reproduction. Neither teaches a user-owned golden query set and before/after retrieval regression workflow. |
| Maintained Wenlan proof | PASS with boundary | Wenlan has tracked eval fixtures, labeled retrieval metrics, frozen ranking goldens, and a manual drift test. This is a maintainer workflow, not a released `wenlan eval` end-user command; the page must say so. |
| Standalone utility | PASS | The page can teach a product-neutral method: select real questions and known failures, record expected sources, freeze the baseline, change one factor, compare retrieval first, inspect failures, and update the set deliberately. |
| Internal links | PASS | Same-locale Learn hub, citation verification, source-backed knowledge-base, tool-selection, and Wenlan evaluation surfaces provide at least three contextual entry paths without changing their primary intents. |
| Authority path | PASS with publication boundary | A neutral regression-testing resource could later be proposed to `Danielskry/Awesome-RAG` under Production & Best Practices, but only after the current Wenlan contribution there resolves and only with separate approval. |

## Wenlan proof and non-claims

- `crates/wenlan-core/src/eval/retrieval_drift.rs:2-7` explicitly freezes
  rankings and says the result detects drift, not correctness.
- `crates/wenlan-core/src/eval/retrieval_drift.rs:277-316` provides the guarded
  golden refresh command and the ignored drift test selected by the main
  canary.
- `README.md:292-301` publishes retrieval-only Recall@5, MRR, and NDCG@10
  snapshots and does not turn them into end-to-end answer-quality claims.
- `src/app/(en)/docs/docs.ts:3618-3686` already owns Wenlan-specific benchmark
  scope, methodology, and reproduction.
- `src/app/(en)/learn/seo-articles.ts:2269-2341` already owns claim-by-claim
  citation verification. The new family must link to it, not duplicate it.

The proposed article must not claim that Wenlan automatically builds a user's
golden dataset, exposes a stable public `wenlan eval` command, proves answer
correctness from ranking drift, or provides a hosted CI gate. Its honest
first-party proof is the maintained repository workflow and published
retrieval methodology.

## Proposed owner contract

- Proposed slug in all locales:
  `test-ai-knowledge-base-retrieval-after-changes`.
- English H1: `How to Regression-Test AI Knowledge Base Retrieval After Changes`.
- zh-TW H1: `AI 知識庫改版後，怎麼做 RAG 檢索回歸測試？`.
- zh-CN H1: `AI 知识库改版后，怎么做 RAG 召回回归测试？`.
- One direct answer: freeze representative questions and expected sources,
  capture a comparable baseline, change one factor, compare retrieval before
  generation, inspect every regression, and refresh the test set only when the
  source contract intentionally changes.
- Required sections: when to run; golden-set schema; expected-source labels;
  baseline manifest; Recall@k/MRR plus no-answer cases; one-factor comparison;
  failure triage; corpus-change invalidation; Wenlan maintainer example and
  product boundary.
- Planned internal entry paths per locale: Learn hub, citation-verification
  guide, source-backed knowledge-base guide, tool-selection guide, and
  evaluation docs.
- Visible FAQ only; no `FAQPage` JSON-LD.

## Next decision

At the next open production window, compare this candidate against the latest
authenticated GSC owner gaps and the remaining approved scenario queue. If it
is selected, prepare the exact three-locale page diff and renders locally, then
ask separately for commit, push, PR, merge, Vercel deployment, indexing, and
any external contribution. Until then, keep it as a passed demand gate, not a
published experiment or an asserted traffic opportunity.
