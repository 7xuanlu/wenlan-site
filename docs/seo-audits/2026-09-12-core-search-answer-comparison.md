# Core search answers: first comparison, 2026-09-12

Research checkpoint, not a published content experiment or evidence of ranking lift.
Website source state: `2779c5d0adea6ab40a6e6f32ba868e90fe04575e` plus the local
campaign-guidance edits on `codex/seo-value-query-goal`. No page implementation
changed during this comparison. PR190 material is already present; older audits
describing its routing and alignment work as unfinished are not current defects.

## Comparable GSC baseline

Reused authenticated Web/PT window **2026-08-11..2026-09-07**: property totals
15 clicks / 1,298 impressions; visible query rows 3 / 323. The 12 / 975 difference
is an aggregation/visibility gap, not additional identified demand. This window
predates PR190's verified production boundary, 2026-09-10T17:19:12.819Z.

Read-only OpenSEO Search Console calls filled missing query/page/country/device
dimensions for that same final-data window. They did not rerun the weekly pipeline.
Retained responses: external repo data
`seo-value-query-goal-20260912/gsc-missing-dimensions.json`, captured
2026-09-13 02:38:39 UTC. Existing full baseline capture is
`seo-status-2026-09-10.json` in the 2026/07/17 visualization evidence bundle.

| Fixed exact query | Observed canonical owner under `/learn/` | Country/device | Impressions | Clicks | CTR | Average position |
|---|---|---|---:|---:|---:|---:|
| llm wiki | distilled-wiki-pages-ai-memory | USA / desktop | 10 | 0 | 0% | 47.2 |
| agent knowledge base | when-ai-agent-should-query-knowledge-base | USA / desktop | 21 | 0 | 0% | 67.2381 |
| karpathy llm wiki | distilled-wiki-pages-ai-memory | USA / desktop | 1 | 0 | 0% | 45 |

Across countries, `llm wiki` has 16 impressions / 1 click; `karpathy llm wiki`
13 / 1. Do not replace these denominators with the US slice. Indonesia's two
`llm wiki` impressions average 7.5, but are insufficient to establish a repeatable
top-ten result. The build intent currently lands on the retrieval-timing owner;
PR190 already added a build-guide link. Repeating that repair is not new work.

The zh-TW page-filtered query joins returned no rows: unknown query visibility,
not proof of zero demand. The zh-CN join returned one relevant HKG/desktop
`jackwener/llm-wiki` impression at position 6; the other three rows were legacy
`site:` diagnostics. That single row does not establish a CN acquisition market.

## Google sampling conditions

Observed in Chrome on **2026-09-12 America/Los_Angeles** (September 13 UTC),
desktop native viewport; not a mobile or repeated-population sample. Search URLs
below retain query, `hl`, `gl`, and `pws=0`. Footers explicitly said results were
not personalized. EN footer identified US/California; TW and CN footers showed
Taiwan and Hong Kong with precise location unknown. The signed-in browser and
IP location remain sample limitations; `gl` is not proof of a local resident's view.

Orders below count standalone organic answers, excluding ads, AI answers and
video modules. OpenSEO paid SERP retrieval failed for insufficient credits
(0/3); no credits were purchased. These positions come from the actual Google
browser observations, not an OpenSEO response or generic web-search ranking.

The localized wording is a research candidate, not a proven keyword-volume
claim. Hong Kong is provisional for zh-CN; no mainland-China demand is inferred.
All 30 of 30 sampled answer positions are now read. Bnext was read through the
user-supplied article body described below, not through a browser fetch; the
blocked URL was not opened.

### EN / US — [llm wiki](https://www.google.com/search?q=llm+wiki&hl=en&gl=us&pws=0)

1. [Karpathy's gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): raw sources, wiki/schema, ingest/query/lint, index/log and contradiction handling. Useful conceptual recipe; explicitly not a complete executable implementation. Sources and maintenance are already part of this answer.
2. [LLM Wiki](https://llm-wiki.net/): nvk's agent instructions/plugin with research, ingest, compile, query and audit commands, topic isolation and immutable inputs. Actual installable workflow; documented capabilities do not independently prove answer accuracy.
3. [Wikipedia](https://en.wikipedia.org/wiki/Large_language_model): explains language-model architecture and training. This result exposes ambiguity in the broad query; it is not a wiki-building workflow.
4. [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki): desktop implementation with parsing, source retrieval, graph/vector features, review, MCP/API and citations. Author-reported recall results were not reproduced. Do not claim Wenlan is uniquely a real app with references.
5. [Two implementations, Towards AI](https://pub.towardsai.net/i-built-karpathys-llm-wiki-twice-once-as-code-once-as-a-md-heres-what-each-one-gives-up-08b31170999a): links Python and instruction-file implementations; compares typed stages, IDs, prompts, repair, deployment and flexibility. Full article read in Chrome. Quality/scale assertions are author reports, not reproduced results.

### EN / US — [agent knowledge base](https://www.google.com/search?q=agent+knowledge+base&hl=en&gl=us&pws=0)

Four sponsored results above the organic answers were excluded.

1. [Wisq](https://www.wisq.com/blog-post/what-is-an-agent-knowledge-base-how-to-build-it-and-why-you-need-one): organizational knowledge, RAG/graph/live APIs and HR action context. Full build guidance includes auditing, domain scoping, dated metadata, escalation, real-question tests and monitoring. This is an actionable governance checklist; vendor benefit claims remain unverified.
2. [AWS API reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent_AgentKnowledgeBase.html): precise AgentKnowledgeBase association fields and enabled-state behavior. Solves an API lookup task, not choosing a personal knowledge app.
3. [The New Stack](https://thenewstack.io/agentic-knowledge-base-patterns/): six interview-based patterns across coding, integrations, ERP, analytics and MCP. Concrete organizational architectures and ownership tradeoffs; reported benefits were not independently reproduced.
4. [Sendbird](https://sendbird.com/blog/ai-knowledge-base): four-phase build and test guidance, source-connection and per-agent settings images, governance and observability. Offers concrete support-buyer actions. “Training” includes retrieval and prompting in its own steps; no need to infer model fine-tuning. Vendor accuracy/freshness claims were not independently tested.
5. [HubSpot](https://www.hubspot.com/products/service/ai-knowledge-base-agent): ticket-to-draft articles, content gaps, review before publication and product imagery/video. Clearly shows the buyer's next action; no independent product trial performed.

### zh-TW / Taiwan — [LLM Wiki 知識庫](https://www.google.com/search?q=LLM+Wiki+%E7%9F%A5%E8%AD%98%E5%BA%AB&hl=zh-TW&gl=tw&pws=0)

1. [104](https://blog.104.com.tw/andrej-karpathy-llm-wiki/): three-layer explanation, folders/frontmatter and Obsidian/Claude commands; no reproduced output/evaluation inspected.
2. [AIhao](https://blog.aihao.tw/2026/05/20/llm-knowledge-base/): implementation comparisons, weekly-report ingest/compile/query/writeback/lint example and folder structure; quantitative benefits are author assertions.
3. [AIPostHub](https://www.aiposthub.com/llm-wiki-obsidian-guide/): approachable four-step raw/wiki setup, instructions, clipper and query/writeback checklist. Time and hallucination claims not independently verified.
4. [luotwo/llm-wiki](https://github.com/luotwo/llm-wiki): cloneable skill/template, index/log/frontmatter and ingest/query/lint/sync commands. Repository read; runtime not exercised.
5. [Oberon Lai](https://oberonlai.blog/llm-wiki-compile-blog-knowledge-base/): own-blog compile/question/comparison, linked browsable wiki/graph and limits of niche critique. Linked artifact fetch timed out; article was read, linked graph was not verified.

### zh-TW / Taiwan — [AI Agent 知識庫](https://www.google.com/search?q=AI+Agent+%E7%9F%A5%E8%AD%98%E5%BA%AB&hl=zh-TW&gl=tw&pws=0)

1. [宇鯨智能](https://yujing.io/articles/ai-knowledge-base-guide/): six-step adoption process, tools, owners, review cycles and quality controls. Reported productivity figures were not reproduced.
2. [ADBest](https://adbest.com.tw/blog/what-is-ai-knowledge-base/): enterprise data, eight-step build/test/governance table and tool comparison. General capability descriptions do not establish actual accuracy.
3. [Bnext](https://www.bnext.com.tw/article/90650/andrej-karpathy-ai-how): recorded article 90650 URL; the title “不用Obsidian也能建AI知識庫！Karpathy同款「說明書」設定，4.1萬人超人氣方法完整拆解,” byline 李先泰 and date 2026-04-15 come from the user-supplied paste. The original browser observation that this URL was blocked under site-safety policy remains historical; a complete body associated with the recorded URL was supplied by the user and read on 2026-09-12. This is user-paste body access, not a browser fetch; no independent refetch or version match is claimed. Images, linked posts and runtime claims were not independently verified.
4. [Felo](https://felo.ai/zh-Hant/blog/llm-knowledge-base-vs-persistent-workspace/): reference knowledge versus persistent project state, with decision table and tasks. Promoted product speed/support claims not independently tested.
5. [AgentGuideAI](https://agentguideai.com/knowledge): browser recovered content after empty text fetch. Format guidance, frontmatter/FAQ, Master_Index, instruction/knowledge separation and Gemini examples inspected through the footer. Platform limits, format rankings and claimed Google standard are unverified author assertions and must not become Wenlan facts. A strict prompt is not proof of faithful output.

### zh-CN / Hong Kong — [LLM Wiki 知识库](https://www.google.com/search?q=LLM+Wiki+%E7%9F%A5%E8%AF%86%E5%BA%93&hl=zh-CN&gl=hk&pws=0)

1. [luotwo/llm-wiki](https://github.com/luotwo/llm-wiki): same executable template reviewed above; appearance in a second sample is not independent product validation.
2. [知乎](https://zhuanlan.zhihu.com/p/2038601651041326144): RAG variants and desktop wiki, PDF ingestion, RAG.md, graph/lint screenshots and author test wiki. Browser read; runtime results not reproduced.
3. [CSDN](https://blog.csdn.net/Jmilk/article/details/160341294): three layers, index/log, Obsidian/Claude and sample Python/RAG flow. No runnable public repository or measured effectiveness verified.
4. [AWS enterprise practice](https://aws.amazon.com/cn/blogs/china/llm-wiki-enterprise-practice/): concrete serverless pipeline and author-reported document/question evaluation, with domain/model limitations. Code and evaluation data were not publicly inspected; cannot adopt its percentages as a Wenlan benchmark.
5. [DataCamp](https://www.datacamp.com/zh/blog/llm-wiki): ingest/compile/serve explanation, diagrams, RAG comparison, drift/freshness/scale limits. Explainer, not an independently exercised benchmark.

### zh-CN / Hong Kong — [AI Agent 知识库](https://www.google.com/search?q=AI+Agent+%E7%9F%A5%E8%AF%86%E5%BA%93&hl=zh-CN&gl=hk&pws=0)

1. [知乎](https://zhuanlan.zhihu.com/p/33140455592): WeChat/Coze/Feishu collection workflow, summaries, video scripts and PARA folders. Config examples read; installation abbreviated and author outcomes not reproduced.
2. [CSDN](https://blog.csdn.net/2401_84495872/article/details/139296291): broad enterprise explanation and hypothetical support architecture. No executable or measured result inspected.
3. [AI Agent book](https://github.com/bojieli/ai-agent-book/blob/main/book/chapter3.md): memory versus knowledge, retriever/tool examples and synthetic comparison protocols. No integrated runtime benchmark verified.
4. [宇鯨智能](https://yujing.io/articles/ai-knowledge-base-guide/): same six-step enterprise adoption and governance guide as the TW sample.
5. [Tencent Cloud ADP](https://adp.tencentcloud.com/zh/blog/build-a-customer-service-ai-agent-in-6-steps): scope, KB tree, ticket test plan, thresholds, dashboards and handoff. Routing percentages and deployment timing are vendor claims/goals, not independently observed outcomes.

## Bnext body provenance and bounded findings

The zh-TW / Taiwan **AI Agent 知識庫** sample keeps Bnext as its third
position. The supplied body supports a useful six-step folder/schema/import/compile/
query/writeback/healthcheck workflow, includes a Chinese `CLAUDE.md`
template and Mac save instructions, and reports 17 input files in Nick Spisak's
example. The supplied text does not provide a full inspectable output pack.

The article explicitly warns that errors compound and that some claims lack raw
support, so this evidence cannot be summarized as “no auditing”. Its disclosure
that the first draft was AI-written and then edited is evidence about authorship
disclosure only; it is not causal evidence about Google policy. Paid-plan and
pricing statements, popularity counts, and the two-page character-saving
comparison are author-reported metrics, not current independently verified
metrics. Images, linked posts and runtime claims remain outside this reading.

## What the comparison supports

The strongest answers already offer implementations, decisions, workflow examples
or concrete product actions. Merely adding “sources,” citations or more prose is
not a demonstrated advantage. Bnext also shows that a plain-files plus agent
workflow can already give a reader concrete steps. The useful comparison gap is
therefore a reproducible chain of fixed input → actual output → source change →
decision receipt. This sample does not establish Wenlan as unique or superior.
Broad agent-KB queries also include enterprise support deployment and API lookup;
Wenlan's local knowledge maintenance is only one relevant subtask. Do not turn
the page into an unsupported enterprise platform.

Two bounded improvement hypotheses deserve preparation:

1. **LLM Wiki:** a single inspectable source packet, actual product output,
   citation opening and changed-source review could let a first reader check
   what Wenlan does. Compare against ordinary Markdown and existing wiki tools;
   explain when they are sufficient. Existing authored fictional exercises are
   useful practice but are not generated runtime evidence.
2. **Agent knowledge base:** show the handoff from building a small source-backed
   collection to deciding when an agent should query it. Preserve the separate
   build and retrieval owners and their already-shipped link. Give a concrete
   input, expected bounded outcome and review decision, without promising that
   provenance checks prove semantic correctness.

These are testable proposals, not unique-capability claims. Three-locales must
present the same supported behavior in natural language; neither machine
translation nor English-plus-TW constitutes CN validation.

## Eligibility, AI evidence and next checkpoint

No retained post-PR190 Google crawl receipt establishes rewrite eligibility.
Even an immediate fresh crawl cannot satisfy the protected 28-complete-day
cooldown today. Keep 20 page / 3 qualified joined-query impressions in the same
complete 28-day range, original attribution, September 21 deadline and
August 24–September 20 final window. Do not relax them to launch a copy test.

Existing owners therefore receive comparisons and reviewable proposals first;
implementation is not claimed. Source-verified factual/accessibility defects
remain separately repairable if found. Do not manufacture one to bypass a gate.

Exploratory EN/CN Google AI overviews appeared. No Wenlan citation was observed
in the inspected CN answer text. This is not the fixed nine-prompt AI worksheet,
does not establish absence across Google, and is not a comparable citation score.

As of 2026-09-12, the Bnext evidence gap is resolved for this comparison through
the user-supplied body; the remaining decision is publication authorization.
Any later page change still requires the existing experiment and crawl gates. No
new scheduler, public edit, indexing submission or paid action was performed.

## Subsequent local factual correction

The core inventory subsequently reconciled 173 sitemap/intent rows. Reviewing
current source found four TW/CN metadata descriptions on
`source-backed-wiki-pages-ai-work` and `coding-agent-source-backed-knowledge-base`
that promised no fabricated answers. They now describe inspecting sources and
checking important conclusions, consistent with the existing article bodies.
English descriptions had no equivalent guarantee and were retained. No title,
body, URL, link or publication date changed.

The default build and required metadata checks passed after isolating this
worktree's lockfile dependencies. Browser receipts cover six locale routes at
desktop and 393px in both themes (24 first views). This is a local factual repair,
not an eligible SEO rewrite, public deployment or measured acquisition gain.
The ledger now contains an explicitly unstarted candidate preregistration;
the Bnext reading gap is resolved for comparison purposes through the user-supplied
body, while its images, linked posts and runtime claims remain unverified. Same-run
product evidence remains a separate limitation; publication authorization is the
remaining decision for this bounded documentation task.

## Fixed Google AI Overview cohort: subsequent observation

The exact nine core prompts in `docs/seo-measurement.md` were exercised once
on 2026-09-12 PDT (03:14–03:22 UTC on September 13), desktop Chrome, signed in,
`pws=0`, with nonpersonalized-result footers. The model was not exposed. EN used
`hl=en&gl=us` with a US IP footer; TW used `hl=zh-TW&gl=tw` with a Taiwan footer
and unknown precise location; CN used `hl=zh-CN&gl=cn` with unknown actual
country. These CN targets differ from the provisional Hong Kong organic samples
above and must not be pooled as the same market observation.

Six prompts triggered an AI Overview (1, 2, 4, 5, 7, 8). Prompt 5, **「來源文件
變更時，如何維護本機 LLM wiki？」**, included the
[Wenlan build page](https://wenlan.app/zh-TW/learn/source-backed-wiki-pages-ai-work)
in its expanded related-source panel, third among seven listed source cards.
The answer body did not name Wenlan; source-panel order is not organic rank or
proof that a specific sentence was supported by this page. The other five
answers had no Wenlan link after inspecting available source panels. None of
the six answer bodies mentioned Wenlan. The three CN-target prompts did not
trigger an Overview and are not failed-citation observations.

Per-prompt timestamps, context and result rows are in external repo data
`seo-value-query-goal-20260912/ai-visibility.md`; exact browser answer and source
receipts are retained in `ai-overview-raw-receipts.json`. Other AI surfaces' 45
rows remain `unrun`. This is one observed linked-source inclusion, not repeated
visibility, a measured click, top-ten organic performance or lift caused by the
unpublished local patch. Repeat the same cohort at the existing readout rather
than replacing unsuccessful prompts with ones that mention the brand.
