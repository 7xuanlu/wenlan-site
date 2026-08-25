# Next trilingual scenario demand research

Captured: `2026-08-25T02:18:58Z`. This audit records external observations in
their native units and proposes the next scenario contract. It does not claim
keyword volume, Wenlan demand, rank, traffic, indexing success, or causality.

## Decision

The retrieval-regression scenario below passes the quality gate, but later
same-day demand comparison supersedes it as the next action. It remains a
qualified backlog candidate rather than the highest-leverage priority:

> After source documents, chunking, embeddings, reranking, or retrieval settings
> change, build a versioned golden query set and compare retrieval before and
> after the change so regressions are found before release.

The external-demand gate passes, but its observed demand is materially below
the existing LLM Wiki opportunity. The scenario is not added to the protected
scenario backlog and no page implementation or website publication is approved
by this research record.

## Proposed scenario contract

- Stable ID: `retrieval-regression-golden-dataset`.
- Audience: developers and knowledge-base operators responsible for retrieval
  quality after corpus or retrieval-pipeline changes.
- Trigger: source documents, chunks, embeddings, reranker, top-k, or retrieval
  policy changed, and the operator cannot tell whether retrieval improved or
  regressed.
- Task: create versioned queries with expected source IDs or revisions, run
  before-and-after top-k retrieval, inspect individual misses, include no-answer
  cases, and stop release on a material regression.
- Outcome: an inspectable retrieval baseline that identifies which queries and
  sources regressed, kept separate from end-to-end answer judging.
- Search stage: maintenance and verification.
- Recommended decision: `net-new`, subject to exact-contract approval and the
  protected backlog/verifier update.
- Proposed owner: `/learn/regression-test-ai-knowledge-base-retrieval`, with
  natural zh-TW and zh-CN locale equivalents at the same localized slug.

### Locale-natural query families

| Locale | Query family | Natural task wording |
| --- | --- | --- |
| English | `how to test AI knowledge base retrieval`; `RAG golden dataset`; `RAG regression testing after knowledge base update`; `measure retrieval quality` | Test retrieval after the knowledge base or retrieval pipeline changes. |
| zh-TW | `AI 知識庫驗收`; `RAG 檢索品質怎麼量`; `知識庫更新後回歸測試`; `黃金測試集` | 知識庫或檢索設定更新後，怎麼用黃金測試集驗收檢索品質。 |
| zh-CN | `AI 知识库评测`; `RAG 黄金数据集`; `知识库更新后回归测试`; `检索质量评估` | 知识库或检索配置更新后，如何用黄金数据集做检索回归测试。 |

These are candidate query families from source wording and SERP/community
observation. They are not search volume or authenticated GSC rows.

## Demand evidence

| Locale | Source and captured observation | Date or freshness | Native unit retained |
| --- | --- | --- | --- |
| English | [AWS Labs LISA RAG evaluation](https://awslabs.github.io/LISA/config/rag-evaluation.html) documents a golden JSONL query set with expected document IDs and precision@k, recall@k, and NDCG@k. | observed `2026-08-24` | one official documentation result |
| English | [RAGFlow feature request 15033](https://github.com/infiniflow/ragflow/issues/15033) asks for golden Q&A and retrieval metrics after chunking, embedding, retrieval, or assistant changes. | opened `2026-05-20` | one open feature request |
| English | [rag-ferrite issue 206](https://github.com/lelabdev/rag-ferrite/issues/206) specifies a versioned golden set and Recall@k, MRR/NDCG, source precision, empty-result, latency, and deterministic regression checks. | opened `2026-07-03`; closed after linked implementation | one implemented enhancement |
| English | [OpenRAG discussion 722](https://github.com/langflow-ai/openrag/discussions/722) asks for built-in benchmarks, synthetic data, and regression suites. | opened `2025-12-22` | one discussion; one participant; zero comments |
| English | [RAGAS issue 2010](https://github.com/explodinggradients/ragas/issues/2010) asks to evaluate retrieval and generation separately. | observed `2026-08-24` | one open question; one thumbs-up |
| zh-TW | [iThome retrieval evaluation article](https://ithelp.ithome.com.tw/articles/10390068) explains inspecting retrieval separately with Precision, Recall, and Precision@k. | published `2025-09-29` | 648 views at capture |
| zh-TW | [Ultra Lab production incident](https://ultralab.tw/blog/retrieval-phrasing-blind-spot) reports a regression set that appeared green because test and production parameters differed, while a paraphrase moved the relevant source from rank 5 to rank 21. | published `2026-08-09` | one documented production incident; ten real queries |
| zh-TW | [Tom Ting retrieval-debugging record](https://blog.tomting.com/2026/08/13/rag-retrieval-accuracy-eval-debug/) reports that an apparent 27% score became about 91% after inspecting 10 of 11 cases and finding a chunking/labeling problem. | published `2026-08-13` | one practitioner record; 10/11 inspected cases |
| zh-TW | [iThome RAG evaluation article](https://ithelp.ithome.com.tw/articles/10379937) describes comparing chunking, retriever, reranker, and model configurations. | published `2025-08-01` | one Taiwan practitioner article |
| zh-CN | [V2EX RAG evaluation question](https://www.v2ex.com/t/1162878) asks how to evaluate RAG and build a golden dataset for a large document collection. | published `2025-09-30` | 3,359 views and six replies at capture |
| zh-CN | [Juejin golden-case practice](https://juejin.cn/post/7644440015401418762) uses 15 golden cases to ask whether prompt and pipeline changes improve or regress results. | published `2026-05-27` | one practitioner report; 15 cases |
| zh-CN | [Tencent Cloud update-regression guide](https://cloud.tencent.com/developer/article/2648588) covers retrieval relevance, faithfulness, completeness, version consistency, and change-impact testing after a knowledge-base update. | published `2026-03-31` | one technical guide |
| zh-CN | [ragproof](https://github.com/however-yir/ragproof) provides a framework-neutral evaluation and regression CLI with recall@k, MRR, faithfulness, citation, and CI checks. | observed `2026-08-24` | one maintained OSS repository observation |

## Owner and overlap check

- `/docs/evaluation` owns Wenlan's branded benchmark methodology and current
  retrieval snapshot. It is project navigation, not a task-completion guide for
  a user's own knowledge-base change.
- `/learn/verify-ai-knowledge-base-citations` starts from one suspect answer and
  maps claims to supporting pages, chunks, sources, and revisions. The proposed
  scenario starts before release, from a corpus or retrieval change, and creates
  a repeatable query-level baseline.
- `/learn/source-backed-wiki-pages-ai-work` owns source-backed architecture,
  citation, review, and refresh. It does not own retrieval-regression design.

The trigger, workflow, and expected result are therefore distinct. The future
page must keep retrieval metrics separate from answer quality so it does not
absorb the citation-verification intent.

## Wenlan first-party proof and limits

- Wenlan's maintained evaluation documentation records retrieval-only snapshots
  and explicitly separates them from end-to-end answer quality.
- `crates/wenlan-core/tests/eval_harness.rs` stores baselines and computes
  Recall, MRR, and NDCG with paired comparison and no-regression assertions.
- The maintained `docs/eval` workflow explains updating benchmark metrics,
  checked source summaries, and translated README results.

This is sufficient to demonstrate a real maintained evaluation workflow. It is
not evidence that the public Wenlan CLI currently offers a one-command generic
RAG evaluation product, so a future guide must present a tool-neutral golden-set
workflow and state the product boundary plainly.

Planned same-locale inbound paths are the source-backed knowledge-base guide,
the citation-verification guide, and the document-to-knowledge-base guide. The
predeclared authority path is a separately approved maintained first-party
reference from Wenlan's `docs/eval` material back to the future guide after it
exists; no external post or repository change is approved now.

## Candidates not promoted

| Candidate | Decision | Reason |
| --- | --- | --- |
| Source deletion, reconciliation, and stale-page cleanup | `reject` as a new URL | Current source-backed and stale-page ownership already covers the task; RAGFlow issue 13708 corroborates the problem but does not create a clean new intent. |
| Coding-agent project onboarding knowledge base | `reject` as a new URL | Current `coding-agent-source-backed-knowledge-base` is already measuring; new V2EX observations are demand evidence for that owner, not justification for a duplicate page. |
| Permission-aware or private team knowledge base | `research` | There is community interest, but Wenlan's current proof is local-first spaces, not multi-user RBAC or tenant ACL. A page would risk unsupported product claims and overlap privacy owners. |

## GSC indexing action for the current experiment

Using the authenticated Search Console account `Qi-Xuan Lu
(h164654156465@gmail.com)`, the three current multi-agent knowledge-conflict
routes were inspected and submitted on `2026-08-25` UTC:

| URL | Before request | Request result |
| --- | --- | --- |
| `https://wenlan.app/learn/prevent-multi-agent-knowledge-conflicts` | URL unknown to Google; not indexed; last crawl unavailable | `Indexing requested` |
| `https://wenlan.app/zh-TW/learn/prevent-multi-agent-knowledge-conflicts` | URL unknown to Google; not indexed; last crawl unavailable | `Indexing requested` |
| `https://wenlan.app/zh-CN/learn/prevent-multi-agent-knowledge-conflicts` | URL unknown to Google; not indexed; last crawl unavailable | `Indexing requested` |

Each response confirms queue acceptance only. It does not prove a crawl,
indexing, ranking, impressions, or clicks, and the requests must not be repeated
to try to change queue priority.

## Evidence boundary and next approval

The latest successfully completed weekly report available to this task is the
`2026-08-21` report for `2026-07-24..2026-08-20`: GSC property totals were 8
clicks and 1,005 impressions; visible-query totals were 2 clicks and 216
impressions; Vercel recorded 248 visitors, including 30 attributed to Google;
GitHub recorded 48 stars. That report exists in the prior working tree but is
not committed on current `origin/main`; this is a version-control gap, not a
reason to reconstruct or invent new data.

## Highest-leverage correction at 2026-08-25T04:50:58Z

The user clarified that usefulness alone is insufficient: the next action must
start from the largest defensible search intent. The corrected priority is to
improve the existing trilingual LLM Wiki owner, beginning with English, rather
than create the retrieval-regression page now.

### Source-native demand comparison

Google Trends used one worldwide, past-12-month, Web Search comparison. Its
values are normalized relative-interest indices within this five-term capture,
not monthly searches:

| Search term | Average Trends index |
| --- | ---: |
| `Obsidian AI` | 49 |
| `AI knowledge base` | 31 |
| `LLM wiki` | 22 |
| `RAG evaluation` | 19 |
| `RAG tutorial` | 9 |

Ubersuggest separately returned US estimated monthly volume and Search
Difficulty. These estimates are not converted into Trends units:

| Search term | US monthly volume | SD |
| --- | ---: | ---: |
| `LLM wiki` | 6,600 | 20 |
| `Obsidian AI` | 4,400 | 22 |
| `AI powered knowledge base software` | 1,600 | 6 |
| `AI knowledge base` | 880 | 26 |
| `RAG evaluation` | 210 | 32 |
| `RAG knowledge base` | 140 | 26 |

The sources disagree about the relative order of `LLM wiki` and `Obsidian AI`,
so neither is treated as an exact universal market size. They agree that the
retrieval-regression vocabulary is not the largest current opportunity.

OpenSEO authentication is healthy for `h164654156465@gmail.com` and project
`wenlan.app`, but the hosted account reports `0` credits. Its paid DataForSEO
keyword metrics therefore could not be used. Its free authenticated GSC read
remained available. Ubersuggest's Taiwan and China calls labelled the requested
markets in their titles but linked to `locId=2840` (United States), so those
localized absolute-volume rows were rejected. Taiwan and China retain only
their Google Trends relative indices until a valid localized volume source is
available.

### Intent and fit comparison

- The live Google result set for `llm wiki` starts with Andrej Karpathy's gist,
  `nashsu/llm_wiki`, an LLM Wiki site, and implementation articles. This is an
  exact match for Wenlan's maintained-page and agent-knowledge workflow.
- `Obsidian AI` has high demand, but the result set is primarily Obsidian's own
  site, plugins, and ways to add AI to a vault. Wenlan is a relevant adjacent
  workflow, not the primary navigational or plugin answer.
- `AI knowledge base` and `AI powered knowledge base software` are dominated by
  enterprise customer-support vendors and comparison lists. Wenlan's local
  developer workflow is a narrower fit.

Therefore `LLM wiki` has the best combination of demand, product fit, existing
authority surface, and attainable rank. This is a leverage judgment, not a
composite metric added to campaign reporting.

### Current Wenlan evidence

Authenticated GSC final data for `2026-07-25..2026-08-22` remains separated by
page and visible query:

- English page total: 21 impressions, 1 click, 4.76% CTR, average position
  25.33.
- Visible English query rows: 7 impressions and 1 click. `llm wiki` alone has
  4 impressions, 1 click, 25% CTR, and average position 11.5;
  `llm wiki for codebase`, `the state of agent wikis`, and `wiki llm` each have
  one impression at average positions 7, 9, and 8 respectively.
- zh-TW page total: 1 impression, 0 clicks, average position 8. Its visible
  query rows are unavailable, not zero.
- zh-CN page total: 6 impressions, 0 clicks, average position 19.83. Its visible
  query rows are unavailable, not zero.

Google's generic `llm wiki` result set did not show Wenlan in the first ten
organic results, while `site:wenlan.app "llm wiki"` returned the canonical
article. This supports an authority and ranking gap, not an indexing failure.

The English page now clears the existing-page floor of 20 page impressions and
three qualified visible-query impressions and has an actual click. The Mandarin
pages do not clear their independent page-exposure floors, so their copy should
remain stable while locale-specific demand and authority paths are prepared.

## Corrected next decision

Prepare an exact English existing-page refresh and authority plan for
`/learn/distilled-wiki-pages-ai-memory`, preserving its canonical and intent.
The implementation should focus on the first-page gap rather than adding more
generic copy: exact answer and snippet alignment, inspectable implementation
asset, same-intent internal anchors, and a separately approved first-party or
external authority path. Keep the retrieval-regression scenario in research
state. Commit, push, PR, merge, deployment, indexing requests, GSC validation,
analytics mutation, and external publication remain outside this research
scope.

## Execution gate at 2026-08-25T05:07:10Z

Authenticated URL Inspection later showed that Google's last crawl was
`2026-07-29T01:09:29Z`, before the current LLM Wiki version reached production
on `2026-08-02T04:39:55Z`. The page-refresh portion of the decision is
therefore held by the confirmed-post-deploy-crawl and 28-complete-day cooldown
guard. Authority preparation continues without changing the canonical; the
exact source-repository and Awesome LLM Wiki proposals are stored in
`docs/seo-audits/2026-08-25-llm-wiki-authority-plan.md`.
