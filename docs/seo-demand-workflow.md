# Trilingual Search-Demand Workflow

Use this workflow to collect candidate wording and compare Google Keyword Planner estimates, Google Trends relative interest, qualitative SERP intent, and Wenlan's observed Search Console data. Collection can use connected tools; the report CLI remains offline. The initial capture is recorded in [the October 7 audit](seo-audits/2026-10-07-trilingual-demand-workflow.md). Keep raw manifests/reports under `/tmp/wenlan-seo-demand/` and authenticated GSC originals under `/tmp/wenlan-seo/`; never commit raw exports.

## Claude and Codex continuity

This file is the shared decision workflow, not a Codex-only skill. Both hosts enter
through `AGENTS.md`'s campaign routing and `pnpm seo:goal:control`; `CLAUDE.md`
imports `AGENTS.md` directly. Plugin names below describe tested execution options,
not requirements that every host have the same installation.

The repo-local `wenlan-seo` skill is a thin entrypoint at
`.agents/skills/wenlan-seo/SKILL.md`; Claude's `.claude/skills/wenlan-seo` is a
relative symlink to that same directory. Invoke `$wenlan-seo` in Codex or
`/wenlan-seo` in Claude Code, or explicitly ask to use that file if discovery has
not refreshed. The skill routes here rather than duplicating the workflow.
Both the file and link must travel with authorized changes; other checkouts do
not acquire uncommitted files automatically. Native skill discovery is documented
by [OpenAI](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)
and [Claude](https://code.claude.com/docs/en/skills#choose-where-skills-load).

- **One source of truth:** this file owns research/decision routing;
  `seo-growth-loop.md` owns cadence; `seo-growth-recovery.md` owns current decisions
  and next checks; `seo-scenario-backlog.json` owns scenarios; `EXPERIMENTS.md` owns
  experiment readouts. Dated audits own evidence interpretations. Link these rather
  than copying them into host memory, parallel plans or vendor project stores.
- **Check capabilities on arrival:** distinguish configured, visible, authenticated,
  exercised and successful. Codex's Ubersuggest/Keyword Tool checks do not certify
  Claude access. Claude's configured Searchfit/marketing plugins do not certify
  usable data or matching skills. Native connection settings, credentials and hooks
  stay with their host; select an available tool by the deliverable table below.
- **Hand off one compact note:** `writer → receiver; sender stopped editing`,
  `checkout/branch/HEAD + uncommitted files/owner`, `control result/fingerprint`,
  `question + locale/owner`, `evidence links/window + raw paths/local or shared`,
  `decision/why/change condition`, `next check/source/earliest date`,
  `capabilities worked/failed/untested`, `authorization scope/source/date or none`,
  and `open disagreement`. The receiver reruns the control read. Keep decisions
  and next checks in the existing recovery entry; transient details go in chat/acpx,
  not a new handoff database or scheduler.
- **Resume the actual state:** only one agent owns edits to the same files at a time.
  The receiver checks the named checkout and relevant changes, reruns the control
  read, then reads only the linked current evidence. Different worktrees/machines
  must receive the actual authorized changes; an untracked file or `/tmp` export
  is not shared merely because its path was mentioned. Missing evidence is a named
  gap to recover or recollect, not permission to invent or restart the strategy.
- **Verify shared judgment:** on the same candidate/evidence, each side states the
  next action, hold reason and evidence that could change it. Resolve material
  differences against sources and the user's goal; neither side's agreement proves
  data completeness or SEO gains. Record an unresolved difference before dependent
  action. Cross-host agreement requires an actual returned response, not a session
  creation receipt or an authentication failure.

## Tool routing and project judgment

**The workflow belongs to the project; tools are replaceable ways to obtain evidence and prepare an answer.** Start with one unresolved question from the [current recovery queue](seo-growth-recovery.md), the decision it blocks, and the smallest useful evidence collection. Reuse an existing skill before writing a collector, clustering engine or briefing template. Do not run every tool or generate another report merely because it is available.

| Current problem → required output | Current execution / replacement path | Decision the output must support |
| --- | --- | --- |
| Unclear user wording → a small set of exact phrases with source, locale/market and concrete reader task | Ubersuggest **keyword-research** (Codex-tested; load **seo-foundations** first); fallback to Planner ideas, observed search suggestions or Keyword Tool | Which task deserves validation? Suggestions and AI hypotheses do not become measured demand. |
| Uncertain demand or fading topic → attributed estimates, periods and trend evidence for the shortlist | Planner + Trends; another provider may add separately labeled estimates. If unavailable, retain dated evidence and the missing field | Continue, deprioritize or investigate the task; do not transfer a head term's volume to a long tail. |
| Low position or weak search-result promise → query × page performance, crawl state, actual SERP and displayed snippet | GSC API/export + Ubersuggest SERP (Codex-tested); an authorized GSC connector can replace the transport, direct search/page inspection can replace SERP tooling | Is the problem intent, presentation, coverage or an unobserved new version? Choose an eligible change or a named hold reason. |
| Useful task but unclear page answer → intent cluster, existing owner, outline and verifiable product result | Ubersuggest **content-brief** / clustering steps (Codex-tested); another inspected skill or direct page review can produce the same deliverable | Reuse, improve or propose a page; Wenlan checks product fit, locale ownership, proof and publication gates. |
| Weak independent discovery/references → relevant reader surfaces, independent mentions/referrals and a useful asset for those readers | Existing GSC Links/referral evidence + the inspected OpenSEO **link-prospecting** method; use available public research when its MCP is unavailable | Select a relevant page with an evidenced reason to cite the asset. A prospect is not an acquired link, referral or ranking gain; outreach still needs authorization. |
| Few useful visits → comparable query/page outcomes and available on-site actions | GSC + GA4/Umami, accessed through current exports or an authorized replacement connector | Continue, revise or stop the action; preserve consent coverage and distinguish visits, download clicks and actual use. |

**Codex, checked 2026-10-07:** Ubersuggest is the currently tested free research/brief option, not a permanent dependency. Keyword Tool is a fallback. The [dated comparison and probes](seo-audits/2026-10-07-trilingual-demand-workflow.md#工具選型與現成流程盤點) support that choice; verify current entitlements rather than treating installation as proof of access.

**Claude via acpx, checked 2026-10-07:** Searchfit skills loaded, but provide
instructions rather than a data API; use them on sourced inputs and omit volume
or difficulty unless backed by attributed data. The configured marketing plugin
was not loaded; Ubersuggest and Keyword Tool were absent. This session could read
local evidence but could not complete live collection: it lacked browser access
and its attempted site request was blocked. Reuse existing evidence; run the repo's
GSC scripts only where authentication/network are verified, or hand the smallest
missing collection to a capable host. These limits describe this ACP session,
not every interactive Claude session. If the required Space Brief cannot be read,
record that gap; recover its relevant decision before dependent work and continue
independent checks. A plugin listing alone establishes no access.

### Replacing a plugin without changing the decision process

- **Match the deliverable, not the tool name.** Inspect the replacement's skill and actual output, free limits, supported markets, data dates and any write actions. Test one representative request for each needed locale/market; an English success does not certify Chinese support. Update the execution column and dated evidence, not the project's decision criteria.
- **Keep the evidence portable.** Retain exact wording, source/tool, retrieval and metric dates, requested/returned scope, native units, missing fields and source links/raw exports in the existing records. Keep owner URLs and decisions outside a vendor-only project store. A new collection does not reproduce an old Planner, Trends or SERP snapshot. Retain durable interpretations in the existing audit/backlog; if a historical raw snapshot is missing, mark it missing rather than substituting new data. Do not add a new universal schema or wrapper merely to support hypothetical future tools.
- **Preserve meaning across a switch.** Replacing a connector to the same GSC property can preserve comparable windows/filters; replacing a keyword database may change estimates and difficulty scales. Label the source change and establish its own baseline instead of splicing the numbers into a trend. GSC remains authoritative for Google's own performance even when the connector changes.
  Before comparing growth rates, align the exact query/match scope, market, source, metric and both comparison windows. A Planner three-month field and a Trends related-query increase are not one series or evidence of audience migration. Keep head-term volume separate from task-term volume; do not sum overlapping variants. Reconcile downloaded rows when the UI virtualizes its table before marking a submitted keyword missing.
- **Degrade explicitly.** If quota, language coverage or connection fails, use the listed path that can answer the same question. If none can, record what is unknown and choose the next affordable check. Never substitute autocomplete for volume, third-party traffic estimates for GSC, or an AI brief for product proof. WebSearch/Exa results may aid discovery but do not prove Google's actual SERP or displayed snippet. A switch succeeds when it supports the required decision, not just when a tool responds.
- **Prove the claimed coverage.** For a full-pool audit, freeze the supplied source rows, reconcile every locale + normalized query, and resolve duplicate decisions and canonical owners. Keep actual submitted queries separate from family members. Report successful exact lookups, inconclusive/failed lookups and direct Google observations separately; a completed lookup is not verified demand. Provider pagination, quota gaps and unreturned rows stay explicit. Reuse the existing dated audit and an evidence table, not a second editable backlog.

### Tested execution adapters (Codex, 2026-10-07)

Load skills by their installed plugin name; do not copy their full instructions into this repo. Ubersuggest 3.0.0 was inspected on 2026-10-07. Its live account was `free`, with `reports: 3` and `keywords: 20`; the provider documents three new report subjects per day. These are allowances, not a verified remaining balance or a promise that every endpoint returns exactly 20 rows. Reading skills adds no vendor-data entitlement.

1. Start with `auth_status` and `user_limits`. Reuse today's evidence. Resolve each country through `location_suggest`; require a country match, not a similarly named city. Pass language explicitly and inspect returned scope. Our China lookup did not resolve the country; do not guess an ID or silently use global data.
2. Run the research skill on **one focused seed/market first**, within the free plan. `google_suggestions` expands wording; `keyword_suggestions` adds available metrics; `keyword_overview` checks shortlisted terms; `serp_analysis` checks intent/result types. `match_keywords` is optional deeper expansion. The skill's default 20–40-term metric pass is not our default free-budget batch. Stop on quota errors; retain useful results and use existing Google evidence rather than start a paid trial.
3. Preserve request parameters, retrieval time, metric update dates, missing values and raw response in the dated `/tmp/wenlan-seo-demand/` folder. A freshly fetched response may contain older metrics. SERP feature blocks are not ordinary result pages; provider click estimates are not observed clicks. Inspect `updated_at` separately from the keyword metric history.
4. Use `content-brief` only for a selected, corroborated task. Scale top-page lookups to available free reports. Its projected clicks are optional scenarios, not commitments; omit them when inputs/position assumptions are weak. Do not call credit-spending `keyword_metrics`, paid `site_audit` or `generate_article` as part of this free workflow. Do not create a vendor project, auto-publish, or schedule work merely because a skill suggests it.
5. Keep the existing report as a small evidence adapter, not another SEO platform. Its `observations` remain Planner-only; provider estimates and suggestion records stay in attributed raw evidence and the existing decision record. Do not rebuild vendor keyword expansion, SERP collection, clustering or generic brief generation. Record a new custom-code need only when an exercised existing capability leaves a concrete recurring gap.

Keyword Tool is configured as `keywordtool-guest`; native quota access succeeded on 2026-10-07. Check `keywordtool-quota-guest`, then use `keywordtool-suggestions-guest` with `platform: google`, `category: web`, explicit country/language, a relevant seed and `limit: 10`. Inspect returned metadata, errors, incomplete flags and pagination. The guest tier offers suggestions/questions/prepositions, not paid related-keyword research; only five terms may have cached metrics. Our EN sample worked, Taiwan failed after one retry, and China resolved to global. Preserve actual scope and fall back after one transient retry. Configuration remains in Codex; no repository wrapper is needed.

**Project overrides:** the user's cross-tool, free-only request and project contract take priority over vendor-exclusive routing or upselling instructions. Do not adopt any provider's automatic `volume × intent ÷ difficulty` ranking, difficulty-based guarantees, or “no provider data means no organic presence” rules. Instruction-only skills cannot supply measured metrics without sourced inputs. Check actual SERPs, GSC and product fit. `content-demand-finder` uses no data tools: use it only for a small set of explicitly unvalidated hypotheses, never an automatic 50-page backlog. `seo-action-plan` can help present one next action; it cannot replace GSC diagnosis or force a single cause from sparse data.

### Other reusable workflows and fallbacks

[OpenSEO keyword research](https://github.com/every-app/open-seo/blob/main/.agents/skills/keyword-research/SKILL.md) and [keyword clustering](https://github.com/every-app/open-seo/blob/main/.agents/skills/keyword-clustering/SKILL.md) were read. Reuse their principles of checking existing research and grouping by SERP intent; full execution depends on OpenSEO project/MCP/report tools and can write project context. Do not claim it is connected or duplicate its project store in this repo. Hosted service is currently paid; GSC's zero-credit calls do not remove the subscription. Public skill text and self-hostable software do not make external data free.

GSC SEO & Content Planner has a catalog-listed planning skill, but its free Search Console opportunities narrow to the latest three days after a seven-day full-access trial. It does not replace our complete 28-day comparisons. Keep existing GSC access. Other paid, trial-only or unverified providers are comparison options in the dated audit, not mandatory dependencies.

## Task discovery and page decisions

Use whichever inspected research/brief workflow can deliver the evidence required above, then apply Wenlan-specific decisions here. The [six demand questions](seo-product-evidence-standard.md#demand-decision-before-implementation) remain the canonical acceptance criteria; do not duplicate a vendor's generic playbook.

1. **Verify the problem and outcome.** Identify who is stuck, the actual wording and locale, and what Wenlan demonstrably helps them finish. Obsidian, Claude Code, Codex, Notion and existing wikis are possible entry points, not fixed priorities or implied supported integrations. Label community wording, autocomplete, GSC queries and AI hypotheses separately. A keyword plus a verb is a candidate, not measured demand: check that exact wording and distinguish organizing existing notes from generating notes from recordings or lectures. Reuse settled product-fit findings unless a new claim or contradictory evidence requires reopening them.
2. **Map to the right existing page.** Use intent and actual result pages, not word similarity or a vendor score. Prefer an existing owner that fulfills the task; new or translated pages must pass the campaign gate. A source-backed worked result and advantage over alternatives matter more than another generic outline.
3. **Align promise and answer.** Check the title, page-specific description and opening answer against the reader's task. Inspect Google's actual query-specific snippet using the procedure below; neither a simulator nor source metadata proves what Google displays.
   For a low-ranking owner, inspect representative result-page bodies and the current owner including shared page components and deployed evidence. Separate what is already answered, a missing task/result, a product mismatch, and an unverified advantage; do not turn every competitor feature into new content. Record full-body versus excerpt coverage and Google-observed versus supplementary sources. Check exact query × page performance and crawl state before judging a rewrite. Inspect referring pages, not just backlink totals: owned READMEs, package mirrors and independent references have different meanings; GSC Links is sampled and may retain removed links. Missing competitor link data leaves causality unknown. See the [worked ranking diagnosis](seo-audits/2026-10-07-ranking-gap.md).
   When the observed bottleneck is search exposure or clicks, prioritize same-query competitor comparison, crawl state and discoverability. Product tests are required for new unproven product claims, not as a blanket prerequisite for ranking diagnosis or researching distribution of an already useful page.
4. **Choose and measure one action.** Record refresh, clean new task, distribution or hold, with the baseline, first-reader path, next observation and stop/change condition. Use the existing crawl/exposure/cooldown gates and distinguish GSC outcomes from on-site actions. Tool success is not acquisition success.

Before calling revised copy ready, read each locale for unclear wording, repetition, unsupported claims, and missing steps. Run any new product exercise against the stated version; a build or an AI-detection score cannot establish that a reader can complete it. Fix failures in the existing page and record the result in its current audit.

Keep one compact record: `problem/decision → locale + wording/source → reader task → SERP evidence → owner/gap → demonstrated result → action + first-reader path → baseline/readout + stop/change condition`. Close each pass with the decision reached, remaining uncertainty and next check. Tool lists, keyword counts and report completion are not the deliverable. Link raw evidence instead of adding parallel reports or another skill.

### Longer questions and AI search

Use the same task/owner record for SEO and AEO; do not create a separate prompt backlog. Check English, Traditional Chinese and Simplified Chinese independently, retaining market and source wording. A short keyword can hide several tasks; a detailed question narrows the task but does not establish demand or search volume. Keep observed GSC/community questions separate from translated or AI-generated candidates; never assign a head term's volume to a full question.

Use keyword data to establish a topic's market, original questions to identify constraints, and actual result/citation pages to inspect what answers are selected. Record why the reader would still visit or use Wenlan after reading an AI answer. Improve the matching existing owner with an executable result, sources and limitations; do not manufacture one page per prompt.

For measurement, distinguish Google Search Console **Generative AI features** impressions (AI Overviews/AI Mode) from ordinary query/page performance, Bing's sampled **grounding queries**, controlled prompt tests, and on-site referrals/actions. Google's AI report currently has no query dimension or clicks; its data overlaps Web performance, and page sums differ from property totals. Bing retrieval phrases are not users' verbatim prompts. Availability of either tool does not prove this project's account data is accessible. A model returning our page in a test proves that test's result, not market demand or stable visibility.

Check technical prerequisites before expecting citations: Google AI Overviews/AI Mode require an indexed page eligible for a Search snippet. Fix crawl/index/snippet blockers first; this is different from waiting for top-ten rankings. Once eligible, improve task answers and source clarity for SEO and AEO together and measure their outcomes separately. Across AI platforms, discovery systems and off-site brand mentions differ, so Google ranking is not a universal gate. Verify platform-specific evidence and report versions/dates rather than transferring an assistant study to Google AI Overviews. Practitioner basis: [Ahrefs keyword/prompt lesson](https://ahrefs.com/academy/aeo-course/lesson-2-2), [Google AI measurement](https://support.google.com/webmasters/answer/16984139?hl=en-GB), [Bing grounding-query definition](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/). [Dependency and candidate validation](seo-audits/2026-10-07-ranking-gap.md#seoaeo-依存與候選用語實查) resolves which tasks to retain versus which long phrases to reject as primary acquisition targets. Project validation: [October 8 evidence](seo-audits/2026-10-07-ranking-gap.md#信件教學實測與-ai-搜尋複核).

### Practitioner basis

Reviewed 2026-10-07. These are practitioner methods and self-reported cases, not a universal recipe or forecasts for Wenlan. The project checks above combine these methods with reused vendor workflows; local campaign thresholds are our operating rules, not claims made by these authors.

| Source | Adopted practice | Boundary |
| --- | --- | --- |
| [Grow and Convert: Pain Point SEO](https://www.growandconvert.com/seo/pain-point-seo/) | Start with customer problems, task intent, category and comparison needs; evaluate product-related actions as well as traffic. | Do not assume every how-to query converts or borrow their conversion rates. |
| [Ahrefs: Search intent](https://ahrefs.com/blog/search-intent/) | Inspect result type, format and angle before choosing the answer. | A matching format is not a ranking guarantee; do not copy competitors' content. |
| [Ahrefs: Meta descriptions](https://ahrefs.com/blog/meta-description/) | State a concrete benefit in natural language matching the task and page. | Google's displayed snippet may differ; do not attribute CTR changes without comparable exposure. |
| [Animalz: Distribution-first strategy](https://www.animalz.co/blog/distribution-first-strategy) | Identify a relevant reader channel before spending on more content. | A proposed channel is not delivered traffic or an independent citation. |

### Validate practitioner claims and skills

The [October 7 validation](seo-audits/2026-10-07-trilingual-demand-workflow.md#reddit-實務與-skills-交叉查證) compares Reddit reports, substantive replies, counterexamples, controlled tests and actual skill instructions. Reddit is a source of practitioner experience here, not the prescribed acquisition channel.

- Separate popularity, a documented result and an isolated causal effect. Deduplicate crossposts; record the original outcome/window, concurrent changes, substantive peer evidence and failed replications. Indexed vote scores are dated snapshots, not a count of people who reproduced the result.
- Validate the mechanism against stronger evidence where available. A before/after case can nominate an experiment; a large-site split test does not supply Wenlan's expected uplift. Preserve null and negative results, not only successes.
- Reuse inspected skills for collection, SERP-based grouping, briefs and prospect qualification. Reject unsupported diagnoses: missing provider data is unknown; one query reaching multiple pages is not by itself harmful cannibalization; a low difficulty score is not proof that a new site can rank.
- Use OpenSEO **seo-audit**'s comparison of different opportunity types as a method reference before choosing one. Keep project records local and tool-independent; its paid MCP, project writes and hosted reports are not prerequisites for our decisions. Do not copy its entire report workflow.
- Test skill defaults against our inputs and free budget. OpenSEO's 50-impression/position-5–20 discovery filter would omit our sparse/outside-top-20 queries; widen discovery when needed while retaining the separate campaign edit gates. Preserve explicit locales instead of defaulting to US.
- Compare whether a search needs an explanation, comparison, template or working tool. Do not build a tool, add links or rewrite an article until the specific mismatch is observed. Keep Claude's current article work and crawl measurement window intact.

## Monthly collection

Refresh Keyword Planner and Trends monthly, or sooner when intent changes. In Google Ads, open Tools → Planning → Keyword Planner → Discover new keywords. Record ideas only: do not create a campaign, add a budget, or enable paid delivery. Keep these Google-only cohorts separate:

| Locale | Market | Language | Network |
| --- | --- | --- | --- |
| `en` | United States | English | Google |
| `zh-TW` | Taiwan | Chinese (Traditional) | Google |
| `zh-CN` | China | Chinese (Simplified) | Google |

China + Google does not represent all Simplified Chinese searches or Baidu demand; Google coverage or volume availability may be limited. Use locally natural seeds. Save the displayed period and monthly-search **range**. Do not use CSV midpoint scalars as exact volume. An unavailable range is unknown, not zero.

Capture GSC separately with its actual property, source, scope, and dates. The manifest stores those rows under each cohort; for a global export, repeat the same GSC scope/window and relevant query/page rows across cohorts so the report can filter owners by page locale. Global GSC rows are not a same-market comparison against country-specific Planner cohorts. A missing query row means “not observed in this export,” not no demand or rank zero. Preserve separate page owners for repeated queries.

Capture Google Trends' exact URL, geography, time range, Web Search type, status, and displayed 0–100 points. This is relative interest, not search volume; index 0 does not mean zero searches. For SERP review, save result URLs and qualitative intent evidence: what task results serve, whether Wenlan has a real answer, and whether an existing owner or a clean gap fits. SERP captures are observations, not future-rank promises.

For each priority query, also record the **actual displayed title and snippet**, query, date, language/region, device and personalization status. Compare with the deployed page title, meta description and opening answer: does the result state the reader's task and a concrete outcome? Google may generate different snippets from page text for different queries; source metadata alone is not display evidence. A `site:` probe only checks that probe's appearance, not normal-query rank or snippet. Diagnose stale presentation versus weak copy before editing. Evaluate CTR within comparable query/page/country/device and position conditions when available; low rank, sparse exposure or a changed query mix cannot isolate a description effect.

## Manifest and report

Save one JSON manifest per dated refresh, then run:

```bash
pnpm seo:demand:report -- \
  --input /tmp/wenlan-seo-demand/YYYY-MM-DD/manifest.json \
  --output /tmp/wenlan-seo-demand/YYYY-MM-DD/demand-report.md
```

The CLI is offline; it reads the named manifest and creates a new report. The output must not exist: use a new filename for a rerun. It refuses to overwrite input, aliases or earlier reports. Required root fields are `schemaVersion: 1`, timezone-qualified ISO `capturedAt`, and `cohorts`. Each cohort requires a unique `id`, supported `locale`, `market`, `language`, `network: "Google"`, `periodStart`, `periodEnd`, `source: "authenticated Google Ads Keyword Planner UI"`, non-empty `seeds`, and `observations`. An observation has `keyword`, `state: "observed" | "unavailable"`, and `monthlyRange`: exact visible range for observed data, `null` for unavailable. Optional `adsCompetition` is an ad metric, not organic difficulty.

Optional source details:

- `gsc`: `source` (`Search Console API` or `authenticated GSC UI export`), `siteUrl: "sc-domain:wenlan.app"`, `startDate`, `endDate`, optional `country`/`scopeNote`, and `rows` of `query`, canonical `page`, integer `clicks`/`impressions`, and positive average `position`.
- `trends`: rows of `query`, Google Trends `sourceUrl`, `geography`, `timeRange`, `searchType: "Web Search"`, `status` (`observed`, `insufficient-data`, or `unavailable`), optional `points: [{date,index}]` with index 0–100, and optional `note`. Observed requires points; other statuses have none.
- `decisions`: manually reviewed `keyword`, same-locale canonical `ownerUrl`, `status` (`investigate`, `candidate`, `hold`, `reject`), `rationale`, `serpEvidenceUrls`, and `nextAction`.

Runnable synthetic manifest examples live in [the report tests](../scripts/seo-demand-report.test.mjs); they demonstrate the format, not observed Wenlan demand.

The report joins only exact keywords after case/space normalization, keeps page owners and locale cohorts separate, sorts monthly bands only within a cohort, and leaves ties explicit. Missing evidence stays unknown. Trends is summarized separately; its complete points remain in the raw manifest and linked source. Neither Trends summaries nor ad competition rank candidates.

## Weekly use

Read the latest completed demand report beside the latest weekly GSC report. GSC remains authoritative for Wenlan query/page performance. For each qualified exact query × page owner, track its own GSC average-position targets of 10 or better, then 5 or better, alongside that pair's clicks and impressions. These are per-pair targets, not a site average or guarantee; GSC position is a windowed average, not a fixed live rank. No visible row means position unknown.

Treat weekly heuristic labels such as `title-meta-refresh` as hypotheses. For an existing-page edit, follow the [authority-first correction](../SEO-CAMPAIGN.md#authority-first-growth-correction), including the confirmed-crawl, same-window 20-page/3-qualified-query impression floors and cooldown. For a new/translated page, follow the [full candidate gate](../SEO-CAMPAIGN.md#candidate-gate) and [demand-decision questions](seo-product-evidence-standard.md#demand-decision-before-implementation). Research does not authorize publication, deployment, indexing, or paid acquisition.

Record each final query × owner row with locale/market, exact query and URL, GSC source/window, clicks, impressions, CTR, position, current deployment boundary, crawl date/status, gate status, and explicit hold reason or manual decision. Include country/device splits only if the authenticated export contains them. Do not add a scheduler; the existing weekly loop consumes this report, and monthly Planner/Trends refresh remains manual.
