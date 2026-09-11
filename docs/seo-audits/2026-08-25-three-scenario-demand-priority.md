# Three-scenario trilingual demand priority — 2026-08-25

## Decision

Correction after reconciling current `origin/main` and production: **citation
verification is already live and measuring**, not the next candidate. PR #137
merged as `b04a5e2` and Vercel production completed at
`2026-08-23T22:21:18Z`; all three locale routes return direct `200`.

The highest-leverage current action is the existing trilingual **LLM Wiki**
owner, beginning with an authority bridge rather than another page rewrite.
The English page has enough GSC exposure to be actionable, but authenticated
URL Inspection reports a last crawl at `2026-07-29T01:09:29Z`, before its
current production version deployed at `2026-08-02T04:39:55Z`. The page copy,
metadata, schema, internal links, and Mandarin variants therefore remain held
by the post-deploy-crawl and cooldown guard. The prepared next publication is
one natural link in each Wenlan source README from the existing LLM-wiki
explanation to the matching English, zh-TW, or zh-CN implementation guide.

Retrieval regression is the strongest next research candidate, but it is not
yet one of the seven IDs protected by `docs/seo-scenario-backlog.json` and the
scenario verifier. Do not silently fold it into citation verification or
change the protected backlog. A minimal control-plane amendment requires
separate approval before implementation.

Source-change and stale-page maintenance shows the broadest repeated problem,
but it fails the clean-gap gate: the existing three-locale source-backed
knowledge-base family already owns that task. It can only nominate an
existing-page refresh after the post-deploy crawl, 20 page-impression,
3 joined-qualified-impression, and 28-complete-day cooldown gates pass.

## Evidence boundary

- Research period requested: `2025-08-25..2026-08-25`, calculated from the
  current date `2026-08-25`.
- Capture completed: `2026-08-25T08:31:12Z`.
- Exa review: `240` returned result slots across `30` calls, including retries
  needed to replace truncated raw output. The final compact nine-query pass
  contained `72` slots and deduplicated to `61` unique URLs.
- Full-page validation: `10` representative practitioner, community,
  official, OSS, and research pages were fetched and read.
- Search results, page views, issue reactions, paper citations, and Trends
  indexes remain in their native units. None is GSC, Google rank, keyword
  volume, or causal evidence.
- Vendor roundups, affiliate pages, translated duplicates, and unsupported
  numerical claims were excluded from the decision even when returned by
  search.

## Google Trends

Google Trends was read directly in the authenticated `Qi-Xuan Lu` browser
session. Each comparison used Web Search, the exact period
`2025-08-25..2026-08-25`, and the stated geography.

| Geography | Compared search terms | Raw Trends result |
| --- | --- | --- |
| United States | `RAG freshness`; `RAG regression testing`; `RAG citation verification` | insufficient data; no 0–100 time series returned |
| Taiwan | `RAG 知識庫更新`; `RAG 回歸測試`; `RAG 引用驗證` | insufficient data; no 0–100 time series returned |
| China | `RAG 知识库更新`; `RAG 回归测试`; `RAG 引用验证` | insufficient data; no 0–100 time series returned |

The missing series means Trends cannot rank these long-tail tasks. It does not
mean zero demand. No broad parent-term index is converted into an estimate for
these narrower tasks.

## Candidate comparison

| Priority | Scenario | Repeated problem evidence | Clean Wenlan gap | Trilingual quality | Authority/readiness | Decision |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Existing LLM Wiki owner | Authenticated GSC, Trends, third-party estimates, and live SERP observations are preserved separately in `2026-08-24-next-scenario-demand-research.md` | existing exact owner; no new URL | English is actionable; Mandarin page rewrites remain below their independent floors | first-party three-language README bridge is exact and locally prepared | next action is the separately approved README authority bridge; do not rewrite the page yet |
| 2 | Regression-test retrieval after corpus, embedding, chunking, or reranker changes | independent official/practitioner guides and Chinese community material repeat golden questions, expected sources, before/after metrics, and rollback | pass: neither citation diagnosis nor evaluation docs owns a user-operated retrieval regression workflow | pass; English, Taiwan, and mainland sources expose distinct natural phrasing | first-party evaluation-doc path is plausible, but requires a protected scenario amendment | retain as the next net-new research candidate after the higher-demand LLM Wiki action |
| 3 | Verify citations, provenance, and unsupported claims | English developer issues plus a peer-reviewed paper; Taiwan practitioner evidence; mainland developer evidence | pass | pass | three locale routes and contextual links are live | published and measuring from `2026-08-23T22:21:18Z`; keep stable |
| 4 | Keep the knowledge base current after source changes and repair stale content | strongest repeated cross-language problem: source drift, stale chunks, version mixing, deletion, incremental sync, and rollback | fail: current source-backed owners already answer this task in all three locales | pass for demand, but no separate owner is justified | an authority path is still only a research target | reject a net-new URL; consider an existing-owner refresh only after 20/3/crawl/cooldown |

## Representative validated evidence

### Source changes and stale content

- English: the [LangChain production discussion](https://forum.langchain.com/t/post-retrieval-temporal-decay-how-are-you-handling-stale-context-in-production-rag-pipelines/3968)
  describes stale but semantically relevant chunks and compares freshness
  metadata, source hashes, re-embedding, and conflict handling.
- zh-TW: an [iThome incremental-index article](https://ithelp.ithome.com.tw/articles/10378411)
  recorded `556` page views and covers add, update, delete, rollback, and
  source-to-index reconciliation.
- zh-CN: a [SegmentFault Dify maintenance guide](https://segmentfault.com/a/1190000048002560)
  recorded `472` reads and separates source, sync ledger, index, and live
  visibility state.

These sources strengthen the demand finding but do not repair the failed
clean-gap gate.

### Retrieval regression

- English: [Braintrust's current testing guide](https://www.braintrust.dev/articles/how-to-test-rag-pipeline)
  separates retrieval and generation scores, pins corpus and model
  configuration, and builds regression cases from real production queries.
- zh-TW: a [practitioner debugging record](https://blog.tomting.com/2026/08/13/rag-retrieval-accuracy-eval-debug/)
  reports an apparent `27%` score becoming `10/11 ≈ 91%` after correcting a
  faulty source label, demonstrating why the test harness itself needs review.
- zh-CN: a [Tencent developer article](https://cloud.tencent.com.cn/developer/article/2648588)
  treats knowledge-base changes as content regressions and maps changed
  documents to focused golden-question replay.

The task is distinct and useful, but its scenario ID is not yet protected by
the current backlog schema.

### Citation verification

- English: the peer-reviewed [TU Delft citation-faithfulness paper](https://research.tudelft.nl/en/publications/correctness-is-not-faithfulness-in-retrieval-augmented-generation/)
  exposes `10` Scopus citations and `15` portal downloads and distinguishes
  citation correctness from genuine model reliance. The open
  [OpenAI Cookbook PR #2880](https://github.com/openai/openai-cookbook/pull/2880)
  adds a deterministic quote-in-document gate before semantic judging; its
  open state means it is OSS evidence, not official published guidance.
- zh-TW: an [Ultra Lab production account](https://ultralab.tw/blog/rag-confident-wrong-citation)
  records a real wrong-authority incident and a concrete audit workflow. The
  backlog separately preserves an iThome observation with `1,252` page views.
- zh-CN: an [Alibaba developer walkthrough](https://developer.aliyun.com/article/1750303)
  traces each answer claim to a source ID and makes insufficient evidence a
  valid result. The backlog separately preserves `482` SegmentFault reads and
  `67` Juejin reads for citation-mismatch tasks.

## Next action boundary

No page, metadata, schema, internal link, release, analytics setting, indexing
request, validation, directory, PR, or external message changed in this
correction. A four-file Wenlan source-repository patch is locally prepared:
three natural README guide links plus the required Spanish README sync-marker
update. Translation sync, self-test, diff hygiene, and all three destination
`200` checks pass. Commit, push, PR, merge, and publication remain separately
approval-gated. Retrieval regression remains the next qualified net-new
research candidate after the LLM Wiki authority bridge.

## 2026-08-26 selection outcome

The user selected retrieval regression for preparation before August 28. A
clean isolated branch, `codex/retrieval-regression-scenario`, was created from
current `origin/main` commit `fa6ae42e03d45abcc0d09faa341da31e6322464f`.
The prepared family owns one audience and trigger: developers or knowledge-
base maintainers who changed corpus content, embedding, chunking, hybrid
retrieval, filters, or reranking and need to know whether the same questions
still retrieve the expected sources.

The proposed locale owners are:

- `/learn/test-ai-knowledge-base-retrieval-after-changes`
- `/zh-TW/learn/test-ai-knowledge-base-retrieval-after-changes`
- `/zh-CN/learn/test-ai-knowledge-base-retrieval-after-changes`

The isolated branch adds the eighth protected trilingual scenario family,
three natural localized articles, same-locale contextual inbound paths,
Article and BreadcrumbList coverage through the existing renderer, sitemap
and intent ownership, and a CJK phrase-wrap correction found by the first
393px visual pass. Goal, scenario, intent, i18n, lint, build, built technical,
focused weekly-fixture, diff-hygiene, 393x852, and 1440x1200 checks pass. The
full SEO suite has only the separate current-release drift between website
v0.16.0 and sibling-repository v0.17.0; the scenario-specific checks pass.

This completes selection and local preparation, not publication. The current
controller worktree remains unchanged at seven protected families; the exact
isolated website diff still requires separate commit, push, PR, merge, Vercel
deployment, indexing, validation, and external-publication approval.
