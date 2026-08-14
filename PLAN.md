# Wenlan One-Month Exposure Growth Campaign

<!-- FROZEN-GOAL-CONTRACT:START -->
## Frozen Goal Contract

This section is immutable for the life of this Goal. Any change requires explicit
user approval and a corresponding verifier update. The strategy and campaign
state below this frozen section may change as evidence arrives.

### Goal, deadline, baselines, and final window

- Deadline: 2026-08-18.
- GitHub total stars >= 100 at the deadline.
- GSC `sc-domain:wenlan.app` rolling-28-day property clicks >= 100.
- GSC `sc-domain:wenlan.app` rolling-28-day property impressions >= 10,000.
- Vercel Web Analytics rolling-28-day visitors >= 2,000 over the same range.
- Fixed progress baseline: GitHub total stars 47.
- Fixed progress baseline: GSC property clicks 6.
- Fixed progress baseline: GSC property impressions 197.
- Fixed progress baseline: Vercel visitors 323.
- Verify the fixed progress baselines against the real source on the day the
  control plane starts and record provenance. A later observation may be
  recorded separately, but it does not silently rewrite the fixed baseline.
- Target values, deadline, metric definitions, and the final window must not be
  changed by the Goal controller.
- The final search and traffic window is the 28 complete days ending
  2026-08-17. If GSC reporting is delayed, delay the final read; do not move the
  window.
- Wenlan and `https://wenlan.app` are the destination product and canonical
  public site. `https://useorigin.app` and `https://www.useorigin.app` are
  redirect bridges into Wenlan, not destination brands.

### Control-plane precondition

1. `PLAN.md` must keep this Frozen Goal Contract above the mutable strategy,
   current gap, current experiment, and next decision.
2. `EXPERIMENTS.md` is append-only and records every experiment round with its
   hypothesis, candidate evidence, baseline, change, publish and index dates,
   24h, 7d, W2, W4, and W8 readouts, result, decision, and next step.
3. `pnpm seo:goal:check` must be deterministic, use no new dependency, and
   fail when any protected Goal clause or production-concurrency guard is
   missing or violated.
4. Before every campaign action, read `PLAN.md` and run
   `pnpm seo:goal:check`. If the verifier fails, stop; do not continue from a
   summary or chat memory.
5. Deliver the artifact and verifier diff plus verification evidence for user
   review before starting any experiment that affects the website. The Goal
   contract must be approved before such an experiment begins.

### Quality conditions

- Every weekly report must show GSC property totals, visible-query totals, and
  the query visibility gap separately. Visible query rows must never be
  presented as complete property totals or complete non-brand totals.
- Track visible-query non-brand impressions, valid problem clusters, and
  non-brand pages with impressions separately so brand and irrelevant queries
  cannot hide quality degradation.
- Report Vercel raw visitors, direct traffic, qualified-source visitors, and
  acquisition-surface visitors separately. If a source-to-page join is not
  available, do not invent source-to-page sessions.
- GSC clicks, GSC impressions, website visitors, GitHub outbound clicks,
  stars, and setup starts remain separate metrics. Do not create a composite
  score and do not claim causality among them.
- CTA is fixed as `github_outbound / eligible acquisition-surface sessions`.
  Until a reliable Umami baseline exists, CTA is diagnostic only and has no
  invented 4% threshold.
- Setup starts are a lagging metric: report them when reliable, but they do not
  gate completion of this Goal.
- Sitemap, canonical, robots, redirects, noindex and X-Robots headers,
  structured data, key direct-200 URLs, and indexing must not gain a new
  technical regression.
- Inspect English, zh-TW, and zh-CN acquisition surfaces separately. Do not
  translate low-evidence English content at scale.
- Do not use a fixed article quota, programmatic SEO, source-free comparisons,
  invented keyword volume, or `FAQPage` JSON-LD for an ordinary software site.
- Prefer a real, maintained Wenlan command, workflow, test, release, or
  first-party source over generic prose.

### Evidence roles and demand discovery

- GSC is the only authority for Google Search performance and indexing.
- Vercel is the primary source for visitors and referrers. Umami may enrich
  UTM, outbound, and CTA evidence when available. GitHub public or REST data is
  the authority for stars.
- Google Trends, Reddit, GitHub issues and discussions, OSS documentation and
  directories, and SERP observations are demand-discovery inputs only. They
  may nominate experiments, but they must never enter authenticated GSC input,
  impersonate GSC evidence, or be described as keyword volume.
- Google Trends must preserve query, geography, period, captured-at, and the raw 0-100 index.
  A Trends index must never be interpreted as search volume.
- Every source keeps its native unit. Do not convert or normalize numbers
  across GSC, Trends, Reddit, GitHub, Vercel, Umami, or other sources.
- Raw or large external discovery captures stay under
  `/tmp/wenlan-seo-demand`, physically separate from authenticated GSC inputs
  under `/tmp/wenlan-seo`. A committed candidate record contains only
  interpreted, redacted, inspectable provenance.

### Acquisition focus

- The acquisition center for new experiments is one co-primary, non-ranked
  cluster: AI knowledge bases, Karpathy or LLM wiki, source-backed wiki, and
  knowledge bases for AI agents across English, zh-TW, and zh-CN.
- Codex, ChatGPT, Claude Code, Obsidian, and MCP are first-class tool or
  workflow entry points into that same cluster when the candidate gate passes.
  Do not rank Karpathy or LLM-wiki demand below AI-knowledge-base demand by
  default; select the page or refresh from evidence and coverage gaps.
- Generic memory demand does not nominate a new acquisition experiment.
  Existing memory pages and cohorts remain measurable evidence and may be
  maintained for factual or technical correctness, but they do not control the
  next content decision.
- Historical route slugs or article titles containing `memory` do not change
  this priority. Treat them as existing coverage only when they answer one of
  the protected acquisition families above.

### Candidate gate

An external observation can become an experiment only when all five conditions
are true:

1. The source is inspectable, and its URL or query, capture date, language or
   geography, and native unit have provenance.
2. The problem repeats, has independent corroboration, or has clear high
   intent.
3. Existing Wenlan coverage has a clean gap. If a page partly covers the
   intent, refresh the existing page before creating a new URL.
4. Wenlan can prove the answer with a real command, workflow, test, release, or
   maintained first-party source.
5. The asset has standalone utility even without promoting Wenlan.

### Experiment rules

- Priority order:
  `technical blockers -> indexed page with impressions -> integration/workflow hub -> diagnostic/recipe -> net-new article`.
- Weekly data windows are reporting boundaries, not launch blockers. A
  verified, evidence-backed website asset with explicit publish approval may
  launch while another experiment is measuring.
- Production concurrency is capped at one website change in `approved` or
  `active` preparation/verification state.
- Once a change is production-verified, record it as `live` or `measuring`.
  `live`, `measuring`, and `extended` measurement cohorts do not consume the
  production slot and do not block another evidence-backed website change.
- Do not impose a fixed calendar article quota. A net-new search asset may
  launch after the full candidate gate passes, the preceding website change is
  production-verified, and the new asset does not overlap an existing intent.
- Every experiment predeclares its hypothesis, baseline, positive minimum
  exposure threshold and unit, success, failure, and stop criteria, and its
  24h, 7d, W2, W4, and W8 readouts.
- If minimum exposure is not reached, the result is `inconclusive`; do not
  force a success or failure verdict.
- In month one, prefer an existing indexed page plus approved distribution.
  Do not make success depend only on a new article waiting for Google to crawl.
- When there is no new evidence, wait. Do not continuously rewrite the same
  page.

### Relationship to the existing weekly SEO automation

- The existing `weekly-origin-seo-cleanup` automation remains independent. Do
  not create a duplicate weekly cron or change its schedule or ID without
  explicit user approval.
- This Goal is the campaign controller. The existing weekly automation remains
  the Searchfit, GSC, indexing, and technical-evidence lane.
- The Goal reads the latest weekly report and result so it does not repeat the
  same evidence collection or concurrently modify the same page.
- The weekly prompt currently allows low-risk code and content edits. If that
  conflicts with experiment attribution or campaign working files, present the
  smallest prompt diff for user approval; do not silently allow both
  controllers to write.
- Keep the Goal active until the deadline and execute it in evidence-driven
  bursts. When there is no new evidence, wait.
- If a calendar wake is needed, use a scheduled follow-up in this same main
  task. Do not create another standalone SEO automation, and do not write files
  at the same time as the Friday weekly run.

### Approval boundaries

- No deploy, Reddit or external article/message publication, OSS directory submission, paid acquisition, request indexing, GSC validation submission, push, or merge without explicit user approval.
- Do not change metric definitions without explicit user approval.
- GA4 is outside this Goal. Keep the GSC + Vercel + existing Umami + GitHub
  evidence stack unless an approved question cannot be answered by it and the
  user separately approves GA4.
- Contract approval authorizes the Goal controller to maintain the mutable plan
  and prepare evidence-backed local experiment changes within these bounds. It
  does not authorize any external or shared-state action listed above.

### Stop conditions

Stop the campaign and deliver attempted paths, evidence by source,
success/failure/inconclusive experiments, blockers, and the next decision that
requires the user when any condition is true:

1. The deadline arrives and one or more fixed targets are unmet.
2. Two consecutive windows have no reliable data.
3. No reasonable experiment passes the candidate gate.
4. Approval boundaries block a necessary action.

The Goal does not stop merely because one window is quiet. It waits until a
readout, a new evidence window, a stop condition, or the fixed final read.
<!-- FROZEN-GOAL-CONTRACT:END -->

## Mutable Campaign State

This section is maintained by the Goal controller. It may change only after the
controller has read the frozen section and `pnpm seo:goal:check` passes.

### Control-plane status

- PR #130 squash-merged at `2026-08-15T00:23:03Z` as
  `3f2eeb9aabb40213f0526e571e66bb29788988a2`; Vercel Production deployment
  `dpl_GPLMqStz21H724odWXZv8jQZMRQE` completed successfully at
  `2026-08-15T00:23:48.475Z`. The deployed technical audit, exact canonical,
  indexability, corrected TechArticle dates, BreadcrumbList, sitemap
  membership, visible source boundary, intentional unsupported locale 404s,
  and `FAQPage` absence pass. The correction is production-verified and no
  longer consumes the website production slot. No indexing request, GSC
  validation, external publication, paid action, synthetic event, analytics
  mutation, or metric change occurred.
- At `2026-08-15T00:20:38Z`, the user explicitly resumed the Goal and
  approved commit, push, ready PR creation, merge, automatic Vercel
  deployment, and read-only production verification for the exact
  `TECH-2026-08-14-knowledge-graph-published-date` correction on
  `codex/knowledge-graph-published-date-fix`. The approved scope restores the
  existing English `/docs/knowledge-graph` TechArticle
  `datePublished: 2026-07-09`, retains `dateModified: 2026-08-13`, adds the
  focused regression assertion and immutable correction audit, and includes
  the required campaign records. It changes no visible copy, URL, canonical,
  sitemap membership, locale route, schema type, or experiment metric.
  Request indexing, GSC validation, external publication, paid action,
  synthetic events, analytics mutation, and metric changes remain excluded.
  The correction is approved and occupies the single website production slot
  until production verification passes.
- At `2026-08-14T05:24:28Z`, the user explicitly resumed the active Goal and
  approved commit, push, ready PR creation, merge, automatic Vercel
  deployment, and read-only production verification for the exact
  `EXP-2026-08-13-ai-knowledge-base-context-links` candidate on
  `codex/ai-knowledge-base-context-links`. The scope is exactly three English
  contextual related-article links, their focused regression test, the
  immutable candidate audit, and required campaign records. Request indexing,
  GSC validation, external publication, paid action, synthetic events,
  analytics mutation, and metric changes remain excluded.
- PR #128 squash-merged at `2026-08-14T05:41:10Z` as
  `764649dbeae42684e33d0d1cc8a151be438d98b6`; Vercel Production deployment
  `CjgnT33d3KWotANpYXSf479Gruve` completed successfully at
  `2026-08-14T05:41:58Z`. The deployed technical audit, exact source and target
  contracts, schema, sitemap, intentional unsupported locale 404 behavior,
  and fresh 393px plus 1440px production renders pass. The contextual-link
  experiment is production-verified and measuring; it no longer consumes the
  website production slot. No indexing request, GSC validation, external
  publication, paid action, synthetic event, analytics mutation, or metric
  change occurred.
- At `2026-08-13T06:36:02Z`, the user explicitly approved commit, push, PR
  creation, merge, automatic Vercel deployment, and read-only production
  verification for the exact
  `EXP-2026-08-13-ai-agent-knowledge-graph-refresh` candidate on
  `codex/ai-agent-knowledge-graph-refresh`. The approval covers only the
  existing English `/docs/knowledge-graph` metadata, visible title and
  description, first answer, focused regression test, candidate audit, and
  campaign records. Request indexing, GSC validation, external publication,
  paid action, synthetic events, analytics mutation, and metric changes remain
  excluded.
- PR #126 squash-merged at `2026-08-13T06:39:04Z` as
  `fe5e6c7816c397d207de71ae6d28069b355b313d`; Vercel Production deployment
  `5883194191` completed successfully at `2026-08-13T06:39:50Z`. The deployed
  technical audit, exact page contract, schema, sitemap, intentional locale
  404 behavior, and fresh 393px plus 1440px production renders pass. The
  Knowledge Graph experiment is production-verified and measuring; it no
  longer consumes the website production slot. No indexing request, GSC
  validation, external publication, paid action, synthetic event, analytics
  mutation, or metric change occurred.
- At `2026-08-13`, the user explicitly approved commit, push, PR creation,
  merge, automatic Vercel deployment, and read-only production verification
  for the exact `EXP-2026-08-11-llm-wiki-schema-template-refresh` candidate on
  `codex/llm-wiki-starter-schema`. The approval covers only the existing
  English, zh-TW, and zh-CN LLM Wiki canonical refresh, its tests, candidate
  audit, and campaign records. Request indexing, GSC validation, external
  publication, paid actions, synthetic events, analytics mutation, and metric
  changes remain excluded.
- Goal status: active. At `2026-07-24T18:37:21Z`, the user approved the
  throughput correction: measurement cohorts no longer consume the production
  slot, and there is no fixed calendar article quota. Threads and other
  owned-social work remain outside this SEO-only campaign.
- At `2026-07-31T23:54:43Z`, the user explicitly expanded the protected GSC
  targets for the same deadline and final rolling window to 100 property
  clicks and 10,000 property impressions. The stars, Vercel, quality,
  evidence-role, approval, and stop-condition clauses remain unchanged.
- At `2026-08-01T05:11:57Z`, the user corrected the two-repository OSS
  inventory and approved the complete non-duplicate publication scope:
  publish the docs-only control-plane correction, update valid existing pre-Wenlan
  PRs and accepted listings in place, and submit new high-fit directory
  candidates whose current contribution gates pass. Website content, request
  indexing, GSC validation, analytics mutation, paid acquisition, unrelated
  external posts, and prerequisite product/plugin packaging changes remain
  excluded.
- At `2026-08-01T14:05:56Z`, the user explicitly approved publication of the
  locally verified three-language homepage acquisition-links correction. The
  approval covers commit, push, PR, merge, automatic Vercel deployment, and
  read-only production verification of that exact scope. It does not cover
  request indexing, GSC validation, another website change, analytics
  mutation, or another external publication.
- PR #106 merged at `2026-08-01T14:19:05Z` as
  `c8ae3c82a281464bc29966785d77bf670bc439cc`; Vercel completed production at
  `2026-08-01T14:19:53Z`. The three-language homepage acquisition-links
  correction is production-verified and no longer consumes the production
  slot. No indexing request, GSC validation, analytics mutation, or unrelated
  external publication was performed.
- At `2026-08-01T16:43:08Z`, the user approved local preparation of a bounded
  GitHub-download and signup-attribution correction. The work keeps GitHub
  cumulative release downloads, anonymous Umami events, and Resend contacts
  in their native units and never sends email to Umami. Local preparation of
  `TECH-2026-08-01-download-signup-attribution` occupies the website-change
  slot. Commit, push, PR, merge, deployment, Resend contact-property mutation,
  Vercel environment mutation, and a live signup remain separately gated.
- At `2026-08-01T18:42:18Z`, the user confirmed the Resend secrets already
  exist in Vercel and approved completing the exact measurement scope. The
  production and preview environments contain the Resend API key, Audience
  ID, and Umami website ID; values were not copied or printed. All six bounded
  Resend string properties now exist, and
  `RESEND_ACQUISITION_PROPERTIES_ENABLED=1` is set for Production and Preview.
  PR #108 merged at `2026-08-01T19:14:11Z` as
  `3daf34b31d43ecaa4f4eaaf365a7fb3565ba3327`; Vercel production completed at
  `2026-08-01T19:14:59Z`. New successful signups can now carry those bounded
  Resend fields and emit the anonymous Umami success event. No fabricated
  contact or synthetic analytics event was created.
- At `2026-08-01T20:43:01Z`, the user explicitly approved commit, Git push,
  PR creation, merge, automatic Vercel deployment, and read-only production
  verification for the exact
  `EXP-2026-08-01-obsidian-knowledge-base-locales` scope. Request indexing,
  GSC validation, external publication, paid acquisition, synthetic events,
  and account mutation remain excluded.
- PR #110 merged at `2026-08-01T20:45:39Z` as
  `317bc9152fd8f22bded644c64934ebac7d2bc372`; Vercel completed production at
  `2026-08-01T20:46:25Z`. The deployed SEO and locale matrices passed, and
  actual `393px` measurement confirmed no document overflow. The fresh full-
  page visual pass found two CJK semantic-phrase breaks in the article packet
  and CTA plus a flex-distribution side effect in one FAQ question. A bounded
  renderer/copy correction was published through PR #111, which merged at
  `2026-08-01T21:09:03Z` as
  `4c67e4c54b90c6f05fda29f0390cc380157c9849`; Vercel completed production at
  `2026-08-01T21:09:50Z`. The deployed technical and locale matrices passed
  again. Fresh production captures at `393px` and `1280px` for both locales
  have no document overflow and zero protected-phrase splits. The experiment
  is now live and measuring; its actual 24-hour boundary is after
  `2026-08-02T21:09:50Z`.
- At `2026-08-01T22:00:20Z`, the user's explicit approval for the fixed
  four-URL GSC Request Indexing batch was completed. Search Console returned
  `Indexing requested` for the English, zh-TW, and zh-CN Obsidian URLs and the
  zh-CN LLM Wiki URL. The new zh-CN Obsidian URL was not on Google before the
  request; the other three were indexed but had stale crawl timestamps. Do
  not repeat these requests. Queue acceptance is not a new crawl, indexing,
  ranking, traffic, click, or causal result. No GSC validation was submitted.
- At `2026-08-02T00:36:22Z`, the user explicitly approved commit, push, PR
  creation, merge, automatic Vercel deployment, and read-only production
  verification for `EXP-2026-08-01-document-knowledge-base-guide`. The exact
  scope is the English, zh-TW, and zh-CN document-to-local-AI-knowledge-base
  guide family plus deterministic Vercel acquisition source-to-page report
  support. Request indexing, GSC validation, paid OpenSEO actions,
  rank-tracking setup, external publication, paid acquisition, synthetic
  events, and metric-definition changes remain excluded. The approved change
  occupies the single production slot until production verification.
- PR #114 merged at `2026-08-02T02:41:40Z` as
  `8577a2730946a110ac6d6d26d15e27c4e250505c`; Vercel completed production at
  `2026-08-02T02:42:26Z`. The deployed technical, locale, canonical, schema,
  source, FAQ-policy, and responsive-render gates passed. The experiment is
  now live and measuring, the production slot is open, and its actual 24-hour
  boundary is after `2026-08-03T02:42:26Z`. No indexing request or GSC
  validation was submitted.
- At `2026-08-02T04:14:53Z`, the due 24-hour readout for
  `EXP-2026-08-01-zhtw-llm-wiki-v2-refresh` found no complete authenticated
  post-deploy GSC or Vercel window. Its five-impression exposure guard was not
  met, so the result is inconclusive rather than success or failure. The live
  technical, canonical, hreflang, schema, sitemap, source, FAQ-policy, and
  visible-content floor remained green. The intervention is stopped and
  superseded before another change touches the same canonical family.
- At `2026-08-02T04:14:53Z`, the user approved implementation, build, PR,
  merge, automatic Vercel deployment, and read-only production verification
  for `EXP-2026-08-01-karpathy-llm-wiki-locales-refresh`. The bounded change
  refreshes the existing English, zh-TW, and zh-CN LLM Wiki canonicals around
  the co-primary Karpathy LLM Wiki and AI knowledge-base intent. It creates no
  new URL. Request indexing, GSC validation, paid OpenSEO actions, external
  posts, paid acquisition, synthetic events, analytics mutation, and metric
  changes remain excluded. This approved preparation occupies the single
  production slot until production verification.
- At `2026-08-02T04:34:55Z`, the three-language refresh completed local
  implementation and verification. The experiment is active and still
  occupies the production slot until the approved PR, merge, Vercel
  deployment, and production checks complete. The local gate passed 222 SEO
  tests, lint, build, the built technical audit, the Goal verifier, diff
  hygiene, and English, zh-TW, and zh-CN responsive rendering including a
  separate 320px no-overflow check.
- PR #116 merged at `2026-08-02T04:39:10Z` as
  `93c943637e8e7dad4db881fd2564b18abca4a208`, and Vercel production completed
  at `2026-08-02T04:39:55Z`. The deployed technical audit, exact three-locale
  canonical and schema matrix, sitemap and hreflang membership, source and
  endorsement copy, and 393px plus 320px production renders are green. The
  experiment is measuring, the production slot is open, and its actual
  24-hour boundary is after `2026-08-03T04:39:55Z`.
- At `2026-08-02T07:41:27Z`, the user explicitly approved commit, Git push,
  PR creation and merge, automatic Vercel deployment, and read-only production
  verification for the exact
  `EXP-2026-08-02-ai-knowledge-base-tool-selection` three-locale family.
  Request indexing, GSC validation, paid actions, external publication,
  synthetic events, analytics mutation, and metric-definition changes remain
  excluded. The approved change continues to consume the single production
  slot until production verification completes.
- The weekly window is a reporting boundary, not a publish gate. Only one
  website change may be in `approved` or `active` preparation at a time;
  production-verified `live`, `measuring`, and `extended` cohorts continue
  their readouts without blocking the next evidence-backed change.
- PR #58 merged at `2026-07-23T15:18:29Z` as
  `7166bad1e3020bac60c9454780d2b732e17e4242`. Vercel production completed at
  `2026-07-23T15:19:18Z`.
- PR #60 merged at `2026-07-24T18:53:32Z` as
  `f8b8adc9dc0cbbcb40c74f8928676d142268f643`. Vercel production completed at
  `2026-07-24T18:54:22Z`.
- PR #62 merged at `2026-07-24T19:17:15Z` as
  `e8c089a0391795e778b2e02f1bd11355fda4e4e8`. Vercel production completed at
  `2026-07-24T19:18:03Z`.
- PR #63 merged at `2026-07-24T20:18:36Z` as
  `73c3f0d6a2d7937408df1d297ef0607bd2637fcd`. Vercel production completed at
  `2026-07-24T20:19:21Z`.
- PR #65 merged at `2026-07-24T20:47:55Z` as
  `7f54c64a46d48e1d5f0f4d619bdd5a61aaba75dd`. Vercel production completed at
  `2026-07-24T20:48:42Z`.
- PR #67 merged at `2026-07-24T21:12:18Z` as
  `6de693d7069db65455712022efbad0520830746d`. Vercel production completed at
  `2026-07-24T21:13:05Z`.
- PR #69 merged at `2026-07-24T23:07:44Z` as
  `ee9694d40771a6477bf9b7c294f1ec45f7dd7c69`. Vercel production completed at
  `2026-07-24T23:08:30Z`.
- PR #73 merged at `2026-07-25T00:04:41Z` as
  `9883ddaf74ae07667a57d752aee59468c2d0ee1c`. Vercel production completed at
  `2026-07-25T00:05:36Z`.
- PR #75 merged at `2026-07-25T00:40:19Z` as
  `052fb4952b5c7bd38bca6633197ff7ca8b92c245`. It changed only the weekly SEO
  report generator, its tests, and the 2026-07-24 audit. Vercel completed the
  resulting production build, and the deployed technical audit remained
  green.
- Goal deadline: 2026-08-18.
- Contract approval: approved by the user in this Codex task on
  `2026-07-18T22:06:21Z`.
- Website-affecting experiment:
  `EXP-2026-08-13-ai-knowledge-base-context-links` is production-verified and
  measuring; the single website production slot is open. It adds exactly
  three English contextual links to the existing comparison owner and changes
  no canonical, schema, sitemap, date, copy, or locale route. PR #128
  squash-merged at `2026-08-14T05:41:10Z` as
  `764649dbeae42684e33d0d1cc8a151be438d98b6`; Vercel Production deployment
  `CjgnT33d3KWotANpYXSf479Gruve` completed successfully at
  `2026-08-14T05:41:58Z`. Request indexing, validation, external publication,
  paid action, synthetic events, analytics mutation, and metric changes remain
  gated.
  `EXP-2026-08-13-ai-agent-knowledge-graph-refresh` is stopped after its
  24-hour technical readout found a publication-date schema regression; it
  no longer consumes the single website production slot. It refreshed only
  the existing indexed English `/docs/knowledge-graph`
  canonical and creates no URL or Mandarin Docs route. PR #126 squash-merged
  at `2026-08-13T06:39:04Z` as
  `fe5e6c7816c397d207de71ae6d28069b355b313d`; Vercel Production deployment
  `5883194191` completed successfully at `2026-08-13T06:39:50Z`. Indexing,
  validation, external publication, paid action, synthetic events, analytics
  mutation, and metric changes remain separately gated.
  `EXP-2026-08-11-llm-wiki-schema-template-refresh` is production-verified
  and measuring; it no longer consumes the single website production slot.
  It refreshes only the existing English, zh-TW, and zh-CN LLM Wiki canonical
  family and creates no URL. PR #124 squash-merged at `2026-08-13T05:21:47Z` as
  `38e5a6b69a0b30a73550f97732b59c2fff0b5b8c`; Vercel Production deployment
  `5882382588` completed successfully at `2026-08-13T05:22:32Z`.
  `EXP-2026-08-08-source-backed-ai-knowledge-base-snippet-refresh` is
  production-verified and measuring; it no longer consumes the website
  production slot. It refreshes only the existing English
  `/learn/source-backed-wiki-pages-ai-work` canonical and creates no URL.
  PR #121 squash-merged at `2026-08-09T15:31:50Z` as
  `3736a89135be0ef826cb6eaf1f1d039140bf7145`; Vercel Production deployment
  `5820163298` completed successfully at `2026-08-09T15:32:38Z`. Its due
  24-hour evidence readout remains inconclusive because authenticated URL
  Inspection at `2026-08-13T05:35:20Z` still reports the pre-deploy crawl
  `2026-07-29T01:09:32Z`. Request indexing was not repeated.
  `EXP-2026-08-02-ai-knowledge-base-tool-selection` is live and measuring for
  its exact English, zh-TW, and zh-CN tool-selection canonical family. PR #118
  merged at `2026-08-02T07:54:17Z` as
  `4d4d805b82527bff1d312779047c7ee37408f855`; Vercel production completed at
  `2026-08-02T07:55:01Z`. Its narrow same-experiment CJK phrase-wrap
  correction was production-verified at `2026-08-02T08:22:13Z`. The deployed
  technical contract and exact-device render checks passed; the experiment
  remains measuring and does not consume the production slot. Request
  indexing, GSC validation, external publication, paid action, synthetic
  events, analytics mutation, and metric changes remain approval-gated.
  `EXP-2026-08-01-karpathy-llm-wiki-locales-refresh` is production-verified
  and measuring; it no longer occupies the single production slot. It
  refreshes only the existing English, zh-TW,
  and zh-CN LLM Wiki canonical family, keeps LLM Wiki and AI knowledge base
  co-primary, and exposes the independently corroborated Karpathy modifier
  without implying an endorsement. Publication must retain independent
  five-impression per-locale exposure guards.
  `EXP-2026-08-01-document-knowledge-base-guide` is live,
  production-verified, and measuring; it no longer consumes the single
  production slot. Its
  three locale URLs keep independent 5-impression minimum-exposure guards and
  start their measurement clocks from Vercel production completion at
  `2026-08-02T02:42:26Z`. PR #114 merged as
  `8577a2730946a110ac6d6d26d15e27c4e250505c`. The immutable contract is in
  `docs/seo-audits/2026-08-01-tool-boundaries-and-document-knowledge-base-gate.md`.
  `EXP-2026-08-01-obsidian-knowledge-base-locales` is live,
  production-verified, and measuring; it no longer consumes the single
  production slot. It refreshes the existing zh-TW Obsidian + Claude Code
  route around direct files, editor context, MCP, and a maintained AI
  knowledge-base lifecycle, then adds the independently corroborated zh-CN
  counterpart. PR #110 and corrective PR #111 are merged; corrected Vercel
  production completed at `2026-08-01T21:09:50Z`. English remains unchanged.
  Indexing, validation, external publication, paid acquisition, synthetic
  events, and account mutation remain separately approval-gated.
  `EXP-2026-08-01-zhtw-llm-wiki-v2-refresh` is stopped and superseded after an
  inconclusive 24-hour readout with no complete authenticated post-deploy
  window. PR #101 merged at `2026-08-01T04:04:21Z` as
  `ee72f1dea9bd46e93db220fb70cca420d4684f56`; Vercel production completed at
  `2026-08-01T04:05:07Z`. No repeat indexing request is due.
  `EXP-2026-07-29-docs-github-acquisition` is live,
  production-verified, and measuring; it no longer consumes the single
  production slot. PR #98 merged at `2026-07-30T07:26:34Z` as
  `15fbea08073646d977b9c3b1036e592fe99f5a10`; Vercel production completed
  at `2026-07-30T07:27:30Z`. The live English Docs article renderer exposes
  one bounded `docs-article` GitHub outbound path, and the deployed technical,
  canonical, indexability, FAQ policy, console, and responsive checks pass.
  `EXP-2026-07-29-obsidian-claude-code-refresh` is live,
  production-verified, and measuring; it no longer consumes the single
  production slot. It refreshes the
  existing English Obsidian canonical around the modifier-qualified
  `obsidian claude code`, `claude code obsidian`, and `obsidian mcp` intent;
  it creates no new URL or locale. PR #95 merged at
  `2026-07-29T06:06:33Z` as
  `04fce969e09e56dee72b97bd0b59da05a09b4f61`; Vercel production completed
  at `2026-07-29T06:07:17Z`. The deployed technical, locale, content, and
  responsive render checks passed.
  Indexing requests, GSC validation, external publication, paid acquisition,
  synthetic analytics events, and metric changes remain unapproved.
  `EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh` is live,
  production-verified, and measuring; it no longer consumes the slot. PR #92
  merged at `2026-07-29T05:16:36Z` as
  `1618945972a6957c4fd08501de464d2fb94627f1`, and corrective PR #93 merged
  at `2026-07-29T05:27:38Z` as
  `5a4cc9264a9fa7554fc20f56bbda07bdbbb50685`; corrected Vercel production
  completed at `2026-07-29T05:28:22Z`.
  `EXP-2026-07-27-download-information-architecture` is live,
  production-verified, and measuring; it no longer consumes the slot. PR #91
  merged at `2026-07-28T14:29:47Z` as
  `ca89fb2d16f51a15c8b36378a22425af346b5954`. The production audit verified
  113 sitemap URLs, 17 key pages, six utility noindex headers, sitemap-wide
  `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL
  exclusions. The localized homepage recommendation and `/download` routes
  are live. Request indexing for the download surfaces was not submitted.
  The LLM-wiki implementation guide, context-loss, AI agent memory types,
  Basic Memory, SuperLocalMemory, claude-mem, stale-memory, and MCP
  shared-memory changes remain live, production-verified, and measuring; they
  do not consume the slot.
- Website-affecting technical correction:
  `TECH-2026-08-01-download-signup-attribution` is production-verified and no
  longer consumes the single production slot. GitHub release downloads,
  anonymous Umami events, and configured-audience Resend contacts remain
  separate native-unit evidence lanes.
  `TECH-2026-08-01-home-acquisition-links` is production-verified and no
  longer consumes the single production slot.
  `TECH-2026-08-01-release-v0.15.2-alignment` is production-verified and no
  longer consumes the single production slot.
  `TECH-2026-07-26-source-release-boundary` is production-verified and no
  longer consumes the single production slot.
  `TECH-2026-07-26-provider-neutral-cta-tracking`, production-verified and no
  longer consuming the single production slot.
  `TECH-2026-07-26-knowledge-base-published-date`, production-verified and no
  longer consuming the preparation slot.
  `TECH-2026-07-24-localized-learn-breadcrumb` remains production-verified
  and does not consume the slot.
- The user approved Git push, merge, and production deploy for this LLM-wiki
  refresh at `2026-07-24T20:16:19Z`. Reddit or other external publication, OSS
  submission, paid acquisition, request indexing, GSC validation, and metric
  changes remain outside that approval.
- The user approved Git push, merge, and production deploy for the localized
  Learn breadcrumb correction in this Codex task before PR #65 was created at
  `2026-07-24T20:47:07Z`. That approval did not include indexing, GSC
  validation, non-website publication, OSS submission, paid acquisition, or
  metric changes.
- The user approved local preparation, Git push, PR creation, merge, and
  production deployment for
  `EXP-2026-07-24-stale-ai-memory-diagnostic` in this Codex task on
  `2026-07-24`. That approval does not include indexing, GSC validation,
  non-website publication, OSS submission, paid acquisition, or metric
  changes.
- The user approved commit, Git push, PR creation, merge, production
  deployment, and production verification for
  `EXP-2026-07-24-superlocalmemory-comparison-refresh` in this Codex task at
  `2026-07-25T00:02:30Z`. That approval does not include request indexing,
  GSC validation, non-website publication, OSS submission, paid acquisition,
  or metric changes.
- The user approved commit, Git push, PR creation, merge, production
  deployment, and production verification for
  `EXP-2026-07-25-basic-memory-comparison-refresh` in this Codex task at
  `2026-07-25T01:01:13Z`. That approval does not include request indexing,
  GSC validation, non-website publication, OSS submission, paid acquisition,
  or metric changes.
- The user approved local preparation, commit, Git push, PR creation, merge,
  production deployment, and production verification for
  `EXP-2026-07-25-ai-agent-memory-types` in this Codex task before
  `2026-07-25T01:27:14Z`. That approval does not include request indexing,
  GSC validation, non-website publication, OSS submission, paid acquisition,
  or metric changes.
- At `2026-07-25T02:09:09Z`, the controller recorded the user's approval for
  local preparation, commit, Git push, PR creation, merge, production
  deployment, and production verification for
  `EXP-2026-07-25-context-loss-diagnostic-refresh`. That approval does not
  include request indexing, GSC validation, non-website publication, OSS
  submission, paid acquisition, or metric changes.
- At `2026-07-26T02:24:10Z`, the controller recorded the user's approval for
  local preparation, commit, Git push, PR creation, merge, production
  deployment, and production verification for
  `TECH-2026-07-26-knowledge-base-published-date`. That approval does not
  include request indexing, GSC validation, non-website publication, OSS
  submission, paid acquisition, or metric changes.
- At `2026-07-26T02:49:29Z`, the controller recorded the user's approval for
  commit, Git push, PR creation, merge, automatic production deployment, and
  production verification of the authenticated GSC query-plus-page export
  and the matching inter-window Goal observation. That approval does not
  include request indexing, GSC validation, non-website publication, OSS
  submission, paid acquisition, or metric changes.
- Active experiments: 22.
- Execution mode: primary Codex coordinator with bounded, short-lived native
  Codex subagents when parallel work helps; do not use Superpowers SDD, per
  the user's token-cost preference.
- Existing weekly automation: `weekly-origin-seo-cleanup`, ACTIVE, Friday at
  09:00, independent worktree execution; no field was changed in this setup.
- Latest completed Friday weekly action queue:
  `docs/seo-audits/2026-08-07-weekly-seo.md` in the canonical weekly
  worktree, generated from the authenticated GSC, query-page, and Vercel
  exports preserved under `/tmp/wenlan-seo` for `2026-07-10..2026-08-06`.
  It separates observed GSC pages from configured targets and ranks click
  opportunities without allowing brand noise or generic-memory cohorts to
  nominate the next acquisition experiment. The report file remains
  uncommitted in that independent worktree; this controller reads it but does
  not copy or publish the weekly controller's artifact.
- Latest aligned inter-window action view:
  `/tmp/wenlan-seo-2026-07-28/weekly-seo-corrected.md`, generated from the
  authenticated `2026-06-28..2026-07-25` GSC and Vercel inputs through the
  corrected acquisition classifier. Its durable interpretation is
  `docs/seo-audits/2026-07-29-unified-acquisition-observation.md`.
- Prior reviewed growth design:
  `docs/seo-audits/2026-07-18-exposure-first-growth-design.md`.
- Latest website-affecting deployment observation: PR #114 merged at
  `2026-08-02T02:41:40Z` as
  `8577a2730946a110ac6d6d26d15e27c4e250505c`; Vercel reported production
  completion at `2026-08-02T02:42:26Z`. The deployed audit passed robots, 117
  sitemap URLs, 21 key pages, six utility noindex headers, sitemap-wide
  `FAQPage` absence, 25 redirects, six bridge-host redirects, 18 direct changed
  redirects, and legacy-URL exclusions. The live locale matrix passed 25
  direct-200 routes and four expected 404 routes. Fresh English, zh-TW, and
  zh-CN renders at `393px` and `1280px` have no document overflow or protected-
  phrase split.
- Latest source-release observation: refreshed and production-verified at
  `2026-08-01T04:36:11Z`. Wenlan `v0.15.2` was published at
  `2026-07-31T10:16:24Z` with native Windows x64, macOS Apple silicon, Linux
  x64, and Linux ARM64 runtime archives. The tagged Windows package contains
  the CLI, daemon, MCP connector, ONNX Runtime, and Vulkan loader and is now
  eligible for a direct website download. wenlan-app's published release
  remains `v0.14.0`; its later Windows-compatible main work does not establish
  a released Windows desktop app. Wenlan `v0.15.2` evidence and the
  production-verified correction are in
  `docs/seo-audits/2026-08-01-v0.15.2-release-alignment.md`; the historical
  Wenlan-versus-wenlan-app release boundary remains in
  `docs/seo-audits/2026-07-25-source-release-boundary.md`.
- Last production observation: `2026-07-26T02:32:30Z`; PR #83 merged as
  `a54f13f891d472774f48cafb8798955bf8906ce4`, and Vercel production completed
  at `2026-07-26T02:31:19Z`. Deployed robots, 110 sitemap URLs, 14 key pages,
  six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects,
  six bridge-host redirects, and legacy-URL exclusions passed. The production
  locale matrix passed 19 expected HTTP 200 routes and five expected hard 404
  routes. The live `/learn/ai-work-memory-vs-knowledge-base` route retained
  its exact self-canonical and `index, follow`; Open Graph and Article JSON-LD
  now emit the original `datePublished: "2026-05-27"` and refreshed
  `dateModified: "2026-07-24"`, with no `FAQPage`.
- Latest authenticated inter-window observation: fetched on `2026-07-26` for
  the 28 complete days `2026-06-27..2026-07-24`. Search Console property
  totals are 7 clicks and 329 impressions; visible-query totals are 1 click
  and 81 impressions; the visibility gap is 6 clicks and 248 impressions.
  Vercel reports 1,406 visitors and 1,612 pageviews for the same range.
  GitHub REST still reports 47 stars. The deterministic temporary report is
  `/tmp/wenlan-seo/2026-07-25-goal-check.md`, with evidence fingerprint
  `sha256:05e9acea6da290f494238e55bafb3f9762ab858d44e0dec81b490a2277ba5599`.
  This is an early evidence refresh, not a scheduled experiment verdict.
- Latest unified acquisition observation: fetched for the aligned 28 complete
  days `2026-06-28..2026-07-25` and recorded in
  `docs/seo-audits/2026-07-29-unified-acquisition-observation.md`.
  `sc-domain:wenlan.app` reports 8 clicks and 395 impressions; visible-query
  totals are 2 clicks and 92 impressions, leaving a 6-click and
  303-impression visibility gap. Vercel reports 1,420 visitors and
  1,628 pageviews for the same range. GitHub reports 47 stars.
  `sc-domain:useorigin.app` separately reports 5 clicks and 516 impressions;
  it is a migration diagnostic and is never added to the Wenlan Goal metric.
  The user submitted Change of Address from `useorigin.app` to `wenlan.app`
  on 2026-07-28. Search Console now shows the move as active. The refreshed
  Wenlan sitemap was submitted and read on 2026-07-28 with status `Success`
  and 113 discovered pages.
- LLM-wiki evidence correction: the target page's 2 impressions and average
  position 3.5 are a page aggregate whose queries are fully privacy-hidden.
  The only visible `llm wiki 2.0` query row maps to `/zh-TW`, not to the
  target page. Known qualified `llm wiki` query-to-target impressions are
  therefore 0 in the authenticated `2026-06-27..2026-07-24` join. The fixed
  US English first-page SERP observation also did not show Wenlan. Position
  3.5 must not be reported as the target page's rank for `llm wiki`.
- Google Trends demand-discovery gate: resolved for the current decision at
  `2026-07-19T02:47:01Z` through signed-in official Explore UI CSV exports.
  Seventeen timeline comparisons and nine related-query exports cover
  Worldwide, US, and Taiwan; English, Traditional Chinese, and Simplified
  Chinese terms; 12 months and one five-year range. The interpreted summary
  remains in
  `docs/seo-audits/2026-07-18-trends-demand-discovery.md`, but its temporary
  raw capture directories are no longer present.
  A fresh signed-in two-query recapture at `2026-07-25T01:42:25Z` now
  preserves the complete 53-week raw `0–100` series and provenance metadata
  for `AI agent memory` and `agent memory` under
  `docs/seo-audits/data/`; values are interpreted only inside that request
  and never as search volume. The official
  unattended API remains limited-alpha/account-gated. The follow-up removed
  the false-positive `AI memory` series and the large Taiwan `Obsidian`
  anchor. It classifies `AI 筆記` as real but adjacent NotebookLM/Notion/note
  tooling demand, and exact `AI 知識庫` as too weak for a primary cluster.
- Priority-cluster Trends refresh: completed through the signed-in official
  Explore UI at `2026-08-01T04:20:26Z`. Three 53-week raw CSVs preserve
  English Worldwide, Traditional Chinese Taiwan, and Simplified Chinese
  phrase Worldwide requests under
  `/tmp/wenlan-seo-demand/2026-08-01/trends/`, with hashes and interpretation
  in
  `docs/seo-audits/2026-08-01-priority-cluster-trends-refresh.md`. The raw
  request-relative `0–100` indices strengthen one co-primary LLM-wiki and
  AI-knowledge-base lane and do not support separate Codex-knowledge-base or
  ChatGPT-knowledge-base pages. Related-query panels were not retained and do
  not support this decision. Karpathy and modifier-qualified Obsidian remain
  protected by the Frozen Goal Contract and prior inspectable evidence.
  Simplified-Chinese Worldwide data is not described as mainland-China demand.
  No experiment was started from Trends.
- Early heartbeat correction: the first
  `wenlan-claude-memory-24h-readout` wake arrived at
  `2026-07-19T18:00:08Z`, only 17 hours 33 minutes 59 seconds after production
  completion. It was not recorded as the 24-hour experiment readout.
- Actual 24-hour readout: observed at `2026-07-20T00:35:13Z`. Technical and
  production-render checks passed, but the Search Console API returned no
  query or page rows for either `2026-07-18` or `2026-07-19`; those dates are
  reporting-latency observations, not evidence of zero search demand. The
  result remains inconclusive.
- The zh-TW Obsidian article's actual 24-hour readout was recorded at
  `2026-07-24T20:10:06Z`. Technical and production-render checks passed; the
  latest GSC range ends on the launch date, the target has no confirmed index
  date, and the partial Vercel launch-day row is not a complete post-deploy
  cohort, so the result remains pending without an SEO-success judgment. Its
  7-day readout is due after `2026-07-30T15:19:18Z`. The
  `wenlan-claude-memory-24h-readout` heartbeat can now be reused for the
  earlier Claude Code experiment's 7-day readout. The independent Friday
  `weekly-origin-seo-cleanup` automation remains ACTIVE and unchanged.
- Seven additional 24-hour readouts were recorded at
  `2026-07-26T01:47:53Z` for the Learn hub, LLM-wiki category, MCP
  shared-memory exposure, stale-memory diagnostic, claude-mem comparison,
  SuperLocalMemory comparison, and Basic Memory comparison. All eight live
  routes in the batch returned HTTP 200 with exact self-canonicals and
  `index, follow`; the deployed technical audit passed with 110 sitemap URLs,
  and the production locale matrix passed 19 expected HTTP 200 routes and
  five expected hard 404 routes. Fresh desktop/mobile DOM and render evidence
  found no document or H1 overflow, no `FAQPage`, and no browser warning or
  error. The latest authenticated GSC and complete Vercel range still ends on
  `2026-07-23`, before these deployments, so every result remains pending
  without a 24-hour SEO-success judgment. GitHub remains 47 stars.
- The Claude Code memory refresh's due 7-day readout and the AI-agent-memory
  types page's due 24-hour readout were recorded at
  `2026-07-26T02:04:08Z`. The latest authenticated range still ends on
  `2026-07-23`: it does not contain seven complete post-deploy days for the
  Claude refresh and predates the AI-agent-memory deployment. The Claude
  target remains at 0 clicks, 23 impressions, and average position 38.7; its
  fixed five-query visible cluster remains at 0 clicks, 9 impressions, and
  50.0 impression-weighted average position. The original 25-impression
  post-change minimum cannot be applied because no refreshed-page crawl or
  index date is confirmed. The AI-agent-memory live route, maintained
  sources, schemas, unsupported locale 404s, and fresh desktop/mobile renders
  passed. Both results remain measuring without a causal or SEO-success
  claim, and GitHub remains 47 stars.
- The context-loss diagnostic's actual 24-hour readout was recorded after its
  boundary at `2026-07-26T02:15:47Z`. The post-boundary deployed audit passed
  with 110 sitemap URLs, and the production locale matrix passed 19 expected
  HTTP 200 routes and five expected hard 404 routes. The live English target
  retained its exact canonical, `index, follow`, Article and BreadcrumbList
  schemas, stable original and modified dates, five maintained source links,
  four related internal links, and no `FAQPage`; unsupported zh-TW and zh-CN
  routes remained 404. The authenticated range predates deployment, so the
  target remains at its 0-click, 2-impression, 9.5-position baseline without
  a 24-hour SEO-success judgment. GitHub remains 47 stars.
- An independent control-plane review found that
  `EXP-2026-07-24-ai-work-memory-knowledge-base-refresh` had reached
  production but its 24-hour readout was omitted from the first batch. The
  controller recorded a late, non-backdated readout at
  `2026-07-26T02:19:26Z`. Its live route, canonical, indexability,
  first-party sources, unsupported locale 404s, and retained production
  render evidence passed, but a follow-up review found that the Article
  schema incorrectly used `2026-07-24` as both `datePublished` and
  `dateModified`. Git history establishes the original page date as
  `2026-05-27`; the approved local correction preserves that publication
  date while retaining `2026-07-24` as the modification date. Production
  remains regressed until the correction is deployed and verified. The
  authenticated range predates deployment, so the target remains at its
  0-click, 9-impression, 8.0-position baseline without an SEO-success
  judgment. Its 7-day readout is due after `2026-07-31T18:54:22Z`.

### Fixed baseline and live provenance

The fixed baseline remains the campaign comparison anchor. The live observation
is recorded separately because rolling windows and source backfill can change
after the anchor is frozen.

| Metric | Fixed baseline | Verified live observation | Provenance | Gap to target from live observation |
| --- | ---: | ---: | --- | ---: |
| GitHub total stars | 47 | 47 | GitHub REST, read on 2026-08-14T06:41Z | 53 |
| GSC rolling-28-day property clicks | 6 | 8 | Search Console API, `sc-domain:wenlan.app`, `2026-07-17..2026-08-13`; `/tmp/wenlan-seo-goal-20260815/gsc-metadata.json` | 92 |
| GSC rolling-28-day property impressions | 197 | 951 | Search Console API, `sc-domain:wenlan.app`, `2026-07-17..2026-08-13`; `/tmp/wenlan-seo-goal-20260815/gsc-metadata.json` | 9,049 |
| Vercel rolling-28-day visitors | 323 | 1,268 | Vercel Web Analytics API, project `wenlan-site`, `2026-07-17..2026-08-13`; `/tmp/wenlan-seo-goal-20260815/vercel-metadata.json` | 732 |

Supporting quality split for the same live range:

- GSC property totals: 8 clicks, 951 impressions.
- GSC visible-query totals: 3 clicks, 208 impressions.
- GSC query visibility gap: 5 clicks, 743 impressions.
- The weekly classifier has not recomputed visible-query non-brand impressions
  for this inter-window capture. Keep the latest weekly classified value
  separate rather than applying an ad hoc exclusion to the new query rows.
- The deterministic weekly report's existing group classification remains
  the action-queue authority and still contains noisy Wenlan misspellings in
  `Other`.
- Vercel raw totals: 1,268 visitors and 1,785 pageviews.
- Vercel direct traffic: 234 visitors and 628 pageviews.
- Vercel qualified-source source-to-page row sum: 1,078 visitors and 1,156
  pageviews across the existing separate search, AI, and GitHub referrer
  allowlist; this is not a deduplicated user count.
- Vercel reports 5 visitors and 5 pageviews for
  `/learn/ai-work-memory-vs-knowledge-base`; the page aggregate does not
  provide a source-to-page join.
- A same-range traffic-quality audit on 2026-08-01 found that 1,132 of the
  1,148 `google.com`-referrer visitors share the exact
  `Chrome + GNU/Linux + desktop` signature. Of those, 1,109 occurred during
  2026-07-15..2026-07-23, while finalized GSC Web data records one click in
  that interval and zero clicks across Image, Video, News, Discover, and
  Google News for the full range. The authenticated Vercel Production
  dashboard's broader 30-day Hostnames view reports `wenlan.app` at 100%, so
  another production hostname does not explain the cohort. The historical
  quality audit preserved 1,468 raw visitors for its own window; report the
  1,132 as
  `suspected automated/referrer-incompatible` and the remaining 336 only as
  `not matched by the exact signature`, never as confirmed human traffic.
  This diagnostic does not silently redefine qualified-source visitors. Full
  provenance and the daily reconciliation are in
  `docs/seo-audits/2026-08-01-vercel-google-referrer-quality-audit.md`.
- Unique acquisition-surface visitors and source-to-page sessions remain
  unavailable from the separate Vercel aggregates. Vercel custom events
  remain Pro/Enterprise-gated, and no authenticated Umami report was
  available, so GitHub outbound and CTA are not reported.
- The visible-query inventory currently includes Basic Memory, Claude Code
  memory, MCP memory, LLM wiki, and setup/troubleshooting. This inventory is
  measurement evidence, not the acquisition priority list. Valid problem
  clusters at bootstrap: 0. Valid problem clusters now: 1, because Claude Code
  native-memory boundaries and cross-session context passed the historical
  candidate gate in
  `docs/seo-audits/2026-07-18-growth-candidate-queue.md`.
- Current page rows with impressions are preserved in
  `/tmp/wenlan-seo/gsc-pages.csv`. The pre-publish
  authenticated query-plus-page capture in
  `/tmp/wenlan-seo/gsc-query-pages.json` exposes 11 of the target page's 23
  baseline impressions; 9 visible impressions belong to the five-query
  non-brand Claude-memory cluster at 50.0 impression-weighted average
  position. Keep the remaining 12-impression page-query visibility gap
  explicit.
- The refreshed authenticated query-plus-page export now comes directly from
  `pnpm seo:gsc:fetch` and contains 49 visible rows for
  `2026-06-27..2026-07-24` in
  `/tmp/wenlan-seo/gsc-query-pages.json`. It maps 8 visible impressions on
  the Basic Memory comparison to `basic memory`, `basic-memory github`, and
  `basicmemory`; the separate page row has 23 impressions and one click, so
  the 15-impression and one-click visibility gap remains explicit. It also
  shows that all visible rows for `/docs/changelog` and
  `/docs/data-and-privacy` are brand variants or noisy misspellings, not a
  product problem cluster. The Learn hub exposes only two visible
  single-impression rows against its 78-impression page total.
- Setup starts: no reliable website-to-success measurement; lagging and
  non-gating.
- Early partial Vercel observation: fetched at `2026-07-19T18:01:59Z` for
  `2026-06-22..2026-07-19`, with the final date still incomplete. The raw
  count was 818 visitors and 970 pageviews; direct was 230 visitors and 290
  pageviews; the existing qualified-source allowlist summed to 590 visitors
  across separate referrer rows and is not deduplicated; the target page row
  was 5 visitors and 14 pageviews. Unique acquisition-surface visitors remain
  unavailable from the separate per-path aggregate. This partial range is not
  a comparable rolling-28-complete-day Goal observation and does not replace
  the fixed or verified live baselines above.
- Early GitHub observation: 47 total stars from the read-only REST check during
  the `2026-07-19T18:00Z` heartbeat; no causal claim is attached.
- Latest target-page evidence: the existing
  `/learn/ai-work-memory-vs-knowledge-base` route has 9 impressions, 0 clicks,
  and average position 8.0 in the authenticated `2026-06-26..2026-07-23`
  page table. This is page evidence for a refresh, not proof of a visible
  query cluster or future CTR.

### Current strategy

1. Optimize first for authenticated GSC property clicks, then expand GSC
   property impressions while monitoring visible qualified-query quality
   separately. The protected final-window targets are 100 clicks and 10,000
   impressions; CTR, average position, page rows, visible queries, and the
   query visibility gap remain diagnostics rather than substitutes.
2. Protect the contract and ledger before any campaign action.
3. Contract approval received on `2026-07-18T22:06:21Z`; the GSC target
   expansion was explicitly approved at `2026-07-31T23:54:43Z`.
4. After approval, read the latest Friday weekly report rather than duplicating
   its GSC, indexing, or technical work.
5. Build the first candidate queue from inspectable Google Trends, Reddit,
   GitHub issue/discussion, OSS documentation/directory, and SERP observations,
   preserving native units and provenance.
   The first multi-group Trends capture and interpretation is recorded in
   `docs/seo-audits/2026-07-18-trends-demand-discovery.md`. It contains
   historical observations across wiki, knowledge-base, Obsidian, and memory
   families; those observations keep their original units. On `2026-07-29`,
   the user corrected the acquisition center to AI knowledge bases, LLM wiki,
   source-backed wiki, and Obsidian or knowledge-base-adjacent workflows. On
   `2026-07-31`, the user clarified that English, zh-TW, and zh-CN are all
   first-class acquisition languages; Karpathy or LLM-wiki intent and
   AI-knowledge-base intent form one co-primary, non-ranked cluster; and Codex
   and ChatGPT join Claude Code, Obsidian, and MCP as first-class tool or
   workflow entry points. Candidate selection may separate distinct user tasks
   into pages, but it must not impose a default priority between Karpathy or
   LLM wiki and AI knowledge bases.
   Memory remains enabling product infrastructure and supporting vocabulary;
   generic memory demand no longer nominates the next acquisition asset.
   The next candidate must be selected from fresh evidence for `AI knowledge
   base`, `Karpathy LLM wiki`, `LLM wiki`, `source-backed wiki`, `knowledge
   base for AI agents`, or a modifier-qualified Codex, ChatGPT, Claude Code,
   Obsidian, or MCP intent. For Obsidian, the currently
   evidenced search language is the tool pair: `obsidian claude code`,
   `claude code obsidian`, `obsidian claude`, `obsidian mcp`, and
   `obsidian claude code mcp`. `Obsidian workflow` is an internal category,
   not a proven query. Generic `obsidian`, `obsidian knowledge base`,
   `markdown knowledge base`, and `obsidian ai memory` remain
   discovery-only. Generic `knowledge base`, unqualified `AI wiki`, and exact
   Taiwan `AI 知識庫` still require a clean intent and coverage-gap check;
   `AI 筆記` remains discovery-only.
   A 2026-07-25 follow-up found independent direct-comparison surfaces from
   Mem0, Creed, and Hippo that include Basic Memory in a product-selection
   decision. That evidence remains valid for the already-shipped comparison
   refresh, but it no longer nominates a new acquisition asset. Each external
   page or repository remains one inspectable observation, not keyword volume.
   On 2026-07-29, the user added a Simplified Chinese community-heat lane.
   Once per campaign window or before candidate selection, inspect public
   V2EX, Bilibili, Juejin, Zhihu, and maintained Chinese OSS wording. Preserve
   every platform metric in its native unit, deduplicate reposts, and keep
   login-gated sources manual. The initial snapshot in
   `docs/seo-audits/2026-07-29-zh-cn-community-demand.md` independently
   repeats `LLM Wiki 知识库`, `AI 知识库`, `本地 AI 知识库`,
   `Claude Code + Obsidian`, and `Obsidian CLI + Claude Code`. These phrases
   can nominate advance preparation through the full candidate gate; they do
   not enter authenticated GSC input or become keyword-volume estimates.
6. Prefer one existing indexed acquisition page with impressions for the first
   bounded experiment. Consider a net-new search asset only if the complete
   candidate gate passes, the preceding website change is production-verified,
   and the intent does not overlap an existing page.
7. Prepare local changes and verifier evidence. Ask for approval only at the
   frozen external/shared-state boundaries.
8. Keep every launched cohort on its predeclared readout schedule, but do not
   treat measurement as a reason to stop preparing or shipping the next
   eligible website change.
9. Continue a read-only net-new article coverage-gap audit
   from the cleaned Trends, related-query, Reddit, OSS, SERP, and current-site
   evidence. This may nominate one later experiment but does not start it.
   The audit now treats a missing localized counterpart as a real coverage gap
   when that locale has inspectable demand evidence. It queued the existing
   Obsidian comparison for a zh-TW localization in
   `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`; generic
   `AI 筆記` remains supporting vocabulary rather than the article's target.
10. Prefer an existing indexed AI knowledge-base, Karpathy or LLM-wiki, or
   source-backed-wiki page before another net-new URL. Treat Codex, ChatGPT,
   Claude Code, Obsidian, and MCP as first-class integration or workflow
   entry points when an inspectable modifier-qualified Trends query,
   independent corroboration, a clean coverage gap, maintained Wenlan proof,
   and standalone utility pass the complete candidate gate. GSC measures the
   resulting Wenlan exposure later; it is not a prerequisite for preparing
   the experiment. A page-level GSC aggregate still cannot prove its hidden
   query by itself. The next candidate
   must pass the full provenance, repeated-problem, coverage-gap, maintained
   Wenlan proof, and standalone-utility gate. Existing memory cohorts continue
   their scheduled measurement, but they do not control the next content
   decision.

### Current gap

- Stars: 53 more than the verified live observation.
- GSC property clicks: 92 more in the fixed final rolling window.
- GSC property impressions: 9,049 more in the fixed final rolling window.
- Vercel visitors: 732 more in the fixed final rolling window.
- Legacy migration diagnostic: `sc-domain:useorigin.app` still has
  516 impressions and 5 clicks in the same aligned range. Those values are
  not added to the Wenlan Goal metric.
- Measurement gaps: complete non-brand page impressions, unique
  acquisition-surface visitors, Umami CTA baseline, and verified setup success
  remain unavailable; none may be invented.

The latest successfully completed weekly range `2026-07-10..2026-08-06`
remains a newer supporting observation, not the final window: GSC property
totals are 8 clicks and 874 impressions; visible-query totals are 2 clicks and
172 impressions; the visibility gap is 6 clicks and 702 impressions. Vercel
separately reports 1,387 visitors and 1,666 pageviews, including 231 direct
visitors and 383 direct pageviews. GitHub public REST reports 47 stars at
`2026-08-13T06:07:55Z`. These source-native values do not silently replace the
fixed baseline or the fixed final read.

An earlier inter-window capture for the 28 complete dates
`2026-07-16..2026-08-12`, collected at `2026-08-14T05:54:00Z`, reports GSC
property totals of 8 clicks and 958 impressions, visible-query totals of 3
clicks and 208 impressions, and a visibility gap of 5 clicks and 750
impressions. Vercel separately reports 1,339 visitors and 1,773 pageviews;
GitHub public REST reports 47 stars. These are rolling-window observations,
not attributed experiment lift or regression. Raw inputs remain outside git
under `/tmp/wenlan-seo-goal-20260814`.

The newer authenticated inter-window capture covers `2026-07-17..2026-08-13`
and does not replace the independent Friday report. GSC property totals are 8
clicks and 951 impressions; visible-query totals are 3 clicks and 208
impressions; the query visibility gap is 5 clicks and 743 impressions. Vercel
separately reports 1,268 raw visitors and 1,785 pageviews, 234 direct visitors
and 628 direct pageviews, and a non-deduplicated qualified source-to-page row
sum of 1,078 visitors and 1,156 pageviews. GitHub remains 47 stars; Umami
custom events remain account-gated. The rolling-window decreases from the
preceding inter-window capture show older dates leaving faster than the newest
date replaces them; they are not daily losses or evidence of a CTA problem.
No new privacy-visible query cluster passes the candidate gate.

### Current experiment

`EXP-2026-08-13-ai-knowledge-base-context-links` is production-verified and
measuring; the single website production slot is open. It adds exactly one
existing Related Articles link from each of the stable English provenance,
project-scope, and readable-artifact/local-store owners to the existing
`/learn/ai-work-memory-vs-knowledge-base` comparison. It creates no URL and
changes no target or source title, description, body copy, date, metadata,
canonical, schema, sitemap entry, or locale route.

Authenticated GSC for `2026-07-25..2026-08-12` reports the target at 1 click,
44 impressions, 2.27% CTR, and page-average position 10.0. The only
privacy-visible joined query is `knowledge db` with one impression at
position 81; it does not reveal the clicked query or an exact-query rank.
Vercel separately reports 4 visitors and 4 pageviews for the target, while
GitHub remains 47 stars and Umami CTA evidence remains unavailable. Read-only
URL Inspection at `2026-08-13T10:06:00Z` reports `Crawled - currently not
indexed`, successful fetch, indexing allowed, exact Google and user
canonicals, sitemap discovery, and last crawl `2026-07-29T01:10:28Z`.

The candidate deliberately excludes the source-backed, document-ingestion,
and tool-selection pages because their separate attribution windows remain
open. The exact source selection, immutable 20-impression exposure floor,
success, failure, stop criteria, and rendered evidence are in
`docs/seo-audits/2026-08-13-ai-knowledge-base-context-links-prelaunch.md`.
Local verification passes 223/223 SEO tests, TypeScript, the Goal verifier,
diff hygiene, a 223-page production build, the built technical audit, DOM
assertions, and fresh 393px plus 1440px visual QA. The user approved the exact
publication scope at `2026-08-14T05:24:28Z`; request indexing, GSC validation,
external publication, paid action, synthetic events, analytics mutation, and
metric changes remain separately gated.

PR #128 squash-merged at `2026-08-14T05:41:10Z` as
`764649dbeae42684e33d0d1cc8a151be438d98b6`; Vercel Production deployment
`CjgnT33d3KWotANpYXSf479Gruve` completed successfully at
`2026-08-14T05:41:58Z`. The deployed technical audit passed 120 sitemap URLs,
24 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25
redirects, six bridge-host redirects, and old-URL exclusions. Each live source
and the unchanged target return direct 200 with exact self-canonical, `index,
follow`, Article and BreadcrumbList schema, sitemap membership, no `FAQPage`,
and unchanged dates. Each source exposes exactly one target link. Fresh exact
393px and 1440px renders have no horizontal overflow, broken image, console
warning, or console error. The zh-TW and zh-CN Learn hubs remain direct 200;
the six unsupported localized source routes remain direct 404. The 24-hour
technical and source-native readout is due only after
`2026-08-15T05:41:58Z`; the seven-day readout is due only after
`2026-08-21T05:41:58Z`.

`TECH-2026-08-14-knowledge-graph-published-date` is production-verified and no
longer consumes the single website production slot. It restores only the stable
`datePublished: 2026-07-09` value on `/docs/knowledge-graph`, retains
`dateModified: 2026-08-13`, and adds the focused regression guard. The user
approved the exact publication scope at `2026-08-15T00:20:38Z`; PR #130 and
Vercel Production completed at `2026-08-15T00:23:48.475Z`, and the live gate
passed. Request indexing, GSC validation, external publication, paid action,
synthetic events, analytics mutation, and metric changes remain separately
gated.

### Stopped experiment: Karpathy LLM Wiki locales

`EXP-2026-08-01-karpathy-llm-wiki-locales-refresh` is production-verified but
stopped and superseded; the single production slot is open. It refreshed the existing
English, zh-TW, and zh-CN LLM Wiki canonical family, keeps LLM Wiki and AI
knowledge base co-primary, and exposes the independently corroborated
Karpathy modifier without implying that Andrej Karpathy endorsed Wenlan. It
creates no new URL.

The authenticated pre-publish range is `2026-07-03..2026-07-30`. GSC property
totals are 10 clicks and 660 impressions; visible-query totals are 2 clicks
and 111 impressions; the visibility gap is 8 clicks and 549 impressions.
Vercel separately reports 1,468 visitors and 1,745 pageviews. The target
family has no complete post-August-1 authenticated page window, so missing
locale rows remain unavailable rather than zero. Each locale independently
requires 5 target-page GSC impressions; locale exposure is never pooled.

The user approved implementation, build, PR, merge, automatic Vercel
deployment, and read-only production verification at
`2026-08-02T04:14:53Z`. Request indexing, GSC validation, paid OpenSEO work,
rank tracking, external posts, paid acquisition, synthetic events, analytics
mutation, and metric changes remain outside the approval. Local preparation
completed at `2026-08-02T04:34:55Z` with 222 SEO tests, lint, build, built
technical checks, the Goal verifier, diff hygiene, and three-locale responsive
rendering green. The complete demand gate is in
`docs/seo-audits/2026-08-01-karpathy-llm-wiki-three-language-demand.md`.

PR #116 merged at `2026-08-02T04:39:10Z` as
`93c943637e8e7dad4db881fd2564b18abca4a208`, and Vercel production completed at
`2026-08-02T04:39:55Z`. That exact time starts the 24h, 7d, W2, W4, and W8
clocks. The deployed audit and live three-locale route, schema, sitemap,
hreflang, visible-copy, 393px, and 320px checks pass. Its attributable
`2026-08-03..2026-08-11` evidence remained below five impressions in every
locale. The newer schema-template refresh changed the same canonical family
on `2026-08-13T05:22:32Z`, so this older intervention is stopped as
inconclusive and receives no W2 or later attribution.

### Measuring experiment: Obsidian knowledge-base locales

`EXP-2026-08-01-obsidian-knowledge-base-locales` is live,
production-verified, and measuring; the single production slot is open. It
changes one canonical family only: refresh the existing
`/zh-TW/learn/wenlan-vs-obsidian-ai-memory` page and add the missing
`/zh-CN/learn/wenlan-vs-obsidian-ai-memory` counterpart. The English route is
already measuring the current direct-files, editor-context, MCP, and durable
knowledge-lifecycle answer and remains unchanged.

The latest authenticated baseline remains source-separated: GSC property
totals are 10 clicks and 660 impressions; visible-query totals are 2 clicks
and 111 impressions; the visibility gap is 8 clicks and 549 impressions. The
English page has 0 clicks, 8 impressions, and page-average position 5.6 but no
visible joined Obsidian query. The zh-TW page has no privacy-visible GSC page
row and is not reported as zero; Vercel separately reports 2 visitors and 3
pageviews. The zh-CN route remains a hard 404 in current production and has no
baseline; the local production build now serves the candidate route directly.

The full candidate gate passes from Taiwan Trends, the OpenSEO tool-pair and
live-SERP observation, repeated English community and maintained OSS wording,
and independently repeated Simplified-Chinese Bilibili, V2EX, and Juejin
workflows. Current Wenlan source proves read-only Obsidian Source ingestion,
Markdown resync and projection, MCP, distillation, lint, and review. Each
locale keeps its own 5-impression minimum; one locale cannot supply exposure
for the other.

The earlier zh-TW-only Obsidian cohort is superseded as inconclusive rather
than mixed with this new zh-TW framing. PR #110 and corrective PR #111 are
merged and production-verified; corrected production completed at
`2026-08-01T21:09:50Z`. The 24-hour readout boundary is after
`2026-08-02T21:09:50Z`. Request indexing, GSC validation, external
publication, paid acquisition, synthetic analytics events, and account
mutation remain separately approval-gated. The immutable contract and evidence are in
`docs/seo-audits/2026-08-01-obsidian-knowledge-base-locales-prelaunch.md`.

### Measuring cohort: Obsidian Claude Code

`EXP-2026-07-29-obsidian-claude-code-refresh` is live,
production-verified, and measuring. It
keeps the existing English `/learn/wenlan-vs-obsidian-ai-memory` route while
replacing the unsupported `Obsidian AI Memory` framing with the evidenced
tool-pair intent:
`obsidian claude code`, `claude code obsidian`, `obsidian claude`,
`obsidian mcp`, and `obsidian claude code mcp`.

The candidate gate passes from the signed-in Taiwan Trends rising-query
observations, repeated Reddit and current SERP wording, three maintained
Obsidian/Claude Code OSS implementations, the existing page's four
authenticated GSC impressions, and maintained Wenlan support for read-only
Obsidian source sync plus source-backed Pages. The page will answer the
standalone smallest-layer decision—direct Markdown files, editor context,
MCP, then durable knowledge lifecycle—before describing Wenlan. Obsidian
remains an integration bridge into the AI-knowledge-base story, not the
acquisition center.

The latest aligned baseline remains source-separated: GSC property totals are
8 clicks and 395 impressions; visible-query totals are 2 clicks and
92 impressions; the query visibility gap is 6 clicks and 303 impressions.
The target page has 0 clicks, 4 impressions, and page-average position 4.5,
but no visible Obsidian query row. Vercel separately reports 4 target-page
visitors and 4 pageviews; GitHub reports 47 stars; authenticated Umami events
remain unavailable. No exact-query rank, source-to-page session, keyword
volume, SEO lift, conversion, star attribution, or causal outcome is
preclaimed.

The original publication date is pinned from git history and the live Article
schema as `2026-06-06`; only `dateModified` moves to `2026-07-29`. The focused
RED-to-GREEN contract, 196 SEO tests, 55 i18n tests, TypeScript lint,
production build, built technical checks, locale-route matrix, and fresh
desktop/mobile production-build QA pass. The full hypothesis, evidence
provenance, exposure threshold, success/failure rules, stop conditions, and
readout schedule are in
`docs/seo-audits/2026-07-29-obsidian-claude-code-prelaunch.md` and the
append-only ledger. The change is locally verified. At
`2026-07-29T06:04:29Z`, the user approved commit, push, PR creation, merge,
automatic Vercel deployment, and read-only production verification of this
exact scope. Request indexing, GSC validation, external publication, paid
acquisition, synthetic analytics events, and metric changes remain separate
explicit approval boundaries.

PR #95 merged at `2026-07-29T06:06:33Z` as
`04fce969e09e56dee72b97bd0b59da05a09b4f61`; Vercel production completed at
`2026-07-29T06:07:17Z`. The live route returns direct HTTP 200 with its exact
self-canonical, `index, follow`, stable `datePublished: "2026-06-06"`,
`dateModified: "2026-07-29"`, Article and BreadcrumbList schema, the four
intended integration layers, maintained sources, visible FAQ without
`FAQPage`, and unchanged locale behavior. The deployed technical audit,
locale matrix, complete desktop/mobile render inspection, and exact
local-versus-production image differential passed. This verifies publication
integrity only; it does not establish SEO lift, exact-query rank, conversion,
star attribution, or causality. Run the 24-hour technical/evidence readout
after `2026-07-30T06:07:17Z`.

### Measuring cohorts

This section is measurement maintenance for already-published work. It does
not nominate the next acquisition experiment and must not override the
protected AI knowledge-base and wiki focus.

`EXP-2026-07-27-llm-wiki-implementation-guide-refresh` is live,
production-verified, and measuring. It keeps the indexed English
`/learn/distilled-wiki-pages-ai-memory` canonical URL and original publication
date while adding a standalone implementation guide and five contextual
inbound links. PR #89 merged at `2026-07-27T05:28:59Z`; Vercel production
completed at `2026-07-27T05:29:47Z`. Its 24-hour readout was recorded at
`2026-07-28T05:47:53Z`; the available authenticated GSC and complete Vercel
range still ended before deployment, so the result remains pending without an
SEO-success judgment. Do not record its 7-day readout before
`2026-08-03T05:29:47Z`. The target's approved URL Inspection request was
completed on 2026-07-28 and returned `Indexing requested`; do not repeat it.
Additional indexing requests, GSC validation, external publication, synthetic
analytics events, paid acquisition, OSS submission, and metric changes remain
separately approval-gated.

The Simplified Chinese LLM-wiki and AI-knowledge-base refresh is live,
production-verified, and measuring. PR #92 plus the localized renderer
correction in PR #93 completed corrected production at
`2026-07-29T05:28:22Z`. The live route preserves
`datePublished: "2026-07-04"`, emits `dateModified: "2026-07-29"`, and passes
canonical, indexability, sitemap, hreflang, schema, visible six-command
workflow, and desktop/mobile render checks. Its 24-hour technical/evidence
readout is due after `2026-07-30T05:28:22Z`; it does not consume the
production slot.

The actual 24-hour readout was recorded at `2026-07-30T05:39:51Z`.
Canonical, indexability, sitemap, hreflang, schema dates, all seven guide
sections, the six-command workflow, FAQ policy, deployed technical audit, and
the 22-direct-200 plus five-expected-404 locale matrix pass. The latest
authenticated GSC and Vercel range still ends before deployment, so no SEO
outcome is inferred. Fresh full-page visual QA found no document or H1
overflow, but the focused mobile CJK pass found the H1 splitting `知识库` as
`知识 / 库` and the article packet splitting `来源` as `来 / 源`. The technical
readout remains measuring while a bounded mobile wrapping correction awaits
separate publication approval.

`EXP-2026-07-25-context-loss-diagnostic-refresh` is live,
production-verified, and measuring. It refreshes the existing English
`/learn/ai-coding-agent-loses-context` route around a four-way diagnostic:
native session resume, project instructions or native memory, a compact
handoff, and durable cross-session or cross-tool knowledge.

The target has 2 authenticated GSC impressions, 0 clicks, and average position
9.5, but no visible joined query row; the two-impression page-query visibility
gap remains explicit. Same-range Vercel reports 1 visitor and 1 pageview.
Two independent Reddit questions and two Anthropic GitHub issues repeat the
cross-session, compaction, and project-memory problem. Current Claude Code
documentation confirms that a fresh session, resume, CLAUDE.md, and auto
memory are separate mechanisms. Maintained Wenlan sources confirm the
`/brief`, `/recall`, `/capture`, and `/handoff` continuity loop.

The bounded refresh keeps the existing URL and H1, adds no Mandarin route,
and changes no `FAQPage`, indexing, or distribution behavior. It sharpens the
meta answer, diagnosis, native-versus-durable boundary, maintained references,
and related internal links. The complete gate, baseline, locale decision, and
readouts are recorded in
`docs/seo-audits/2026-07-25-context-loss-diagnostic-prelaunch.md`.

PR #80 merged at `2026-07-25T02:14:16Z` as
`338f5a510d0294b69b7b691d82b6da9e42481a9b`; Vercel production completed at
`2026-07-25T02:15:21Z`. The deployed technical audit, stable original and
modified dates, live metadata and schema, five maintained references,
unsupported locale 404s, sitemap membership, FAQ interaction, and complete
desktop/mobile renders passed. No SEO-success judgment is made at production
completion.

The AI agent memory types cohort is live, production-verified, and measuring.
It creates one English
`/learn/ai-agent-memory-types` acquisition page explaining working, episodic,
semantic, and procedural memory as
different architectural roles, plus where each should live.

The broader `agent memory` category is supported by the signed-in Trends
recapture and its committed 53-week raw series. Four English Reddit threads
from three independent authors repeat the taxonomy or placement problem;
CoALA and LangChain establish the four-role terminology, while Letta supports
the placement tradeoff. A coverage audit found no current Wenlan page that
answers both the taxonomy and placement decision. The page explicitly
separates this cognitive architecture from Wenlan's six capture `memory_type`
metadata values. The complete gate, native-unit baseline, locale decision,
and predeclared readouts are recorded in
`docs/seo-audits/2026-07-25-ai-agent-memory-types-prelaunch.md`.

The change is English-only because no matching Mandarin taxonomy demand has
been observed. It adds no `FAQPage` JSON-LD, indexing request, or external
distribution.

PR #78 merged at `2026-07-25T01:48:42Z` as
`4d4ff8abc51fd053809e32ec63da9e8c3d604926`; Vercel production completed at
`2026-07-25T01:49:40Z`. The deployed technical audit, live metadata and
schema, four maintained references, unsupported locale 404s, sitemap locale
membership, FAQ interaction, and desktop/mobile renders passed. No
SEO-success judgment is made at production completion.

The Basic Memory comparison refresh is live, production-verified, and
measuring. It no longer consumes the one production slot. It refreshes only
the existing English
`/learn/wenlan-vs-basic-memory` route. The authenticated target baseline is
20 GSC impressions, 1 click, and average position 14.6.
Joined visible rows `basic memory` and `basicmemory` have 5 impressions and 0
clicks; the target's one click is outside those visible rows and remains
unattributed. Same-range Vercel reports 5 visitors and 5 pageviews for the
target.

Basic Memory release v0.22.1, PyPI v0.22.1, current source commit
`5d444f0974476645f904c1446998c0a938a6e7f7`, and docs commit
`1c670035987b21f0a93d4e45ea1eed1487775f74` show that the current page's
local-vault-only framing is incomplete. Maintained sources now document local
or hosted deployment, Teams, cross-client MCP, semantic and graph search,
Agent Skills, local sync, snapshots, and hosted file history. Independent
English comparison surfaces from Mem0, Creed, and Hippo corroborate the
comparison decision without supplying keyword volume.

The bounded refresh corrects the operating-model boundary and removes
unsupported retrieval-scale and local-only history claims. It keeps the URL,
meta title, canonical, sitemap membership, locale availability, schema types,
related routes, and CTA destination unchanged. It adds no Mandarin route,
`FAQPage`, indexing request, or external distribution. The source evidence,
candidate gate, native-unit baseline, and predeclared readouts are recorded
in
`docs/seo-audits/2026-07-25-basic-memory-comparison-prelaunch.md`.

The SuperLocalMemory comparison refresh is live,
production-verified, and measuring. It no longer consumes the production
slot. It refreshes only the existing English
`/learn/wenlan-vs-superlocal-memory` route. The authenticated target baseline
is 16 GSC impressions, 0 clicks, and average position 8.6.
The separate visible query `super local memory` has 1 impression, 0 clicks,
and average position 45.0; it is not joined to the page export. Same-range
Vercel reports 7 visitors and 7 pageviews for the target.

Maintained SuperLocalMemory tag `v3.8.3`, commit
`893e6d7d521cef6013d35f0ea468eca3005916de`, npm publication
`2026-07-24T15:17:25.395Z`, README, and changelog show material drift from
the page's June reliability-layer snapshot to a local-first agent memory
control plane with temporal retrieval, team scopes and access, audit,
cache/compression, bounded loops, and framework adapters. The same source
corrects the old 74.8% zero-LLM description: Mode A Raw is 60.4% with
zero-LLM answer construction, while Mode A Retrieval is 74.8% with
GPT-4.1-mini answer synthesis. The bounded refresh compares that operational
control plane with Wenlan's explicit source-backed LLM wiki workflow and
keeps the URL, canonical, sitemap membership, locale availability, schema
types, and CTA destination unchanged. It adds no Mandarin route, `FAQPage`,
indexing request, or external distribution.

The current source evidence, candidate gate, native-unit baseline, and
predeclared readouts are recorded in
`docs/seo-audits/2026-07-24-superlocalmemory-comparison-prelaunch.md`.
The focused article contract failed against the old page and passes after the
refresh. SEO tests pass 178/178; i18n tests pass 53/53; TypeScript lint,
production build, built technical SEO, locale-route checks, full desktop and
mobile rendered QA, and `git diff --check` pass. Independent review found one
P2 gap in benchmark/license regression coverage; the repair added
article-scoped Mode C and licensing assertions, and re-review returned `SHIP`
with no remaining P0–P2 findings.

PR #73 merged at `2026-07-25T00:04:41Z` as
`9883ddaf74ae07667a57d752aee59468c2d0ee1c`; Vercel production completed at
`2026-07-25T00:05:36Z`. Deployed robots, sitemap, canonical, indexability,
utility headers, redirects, bridge hosts, schema, source links, locale
non-regression, and desktop/mobile renders passed. No SEO-success judgment is
made at production completion.

The claude-mem comparison is live, production-verified, and measuring. PR #71
merged at `2026-07-24T23:33:32Z` as
`f6e5dd083ad5086fe4c4552cee1764c8dc848645`; Vercel production completed at
`2026-07-24T23:34:19Z`. Its deployed technical, metadata,
maintained-source, and rendered checks passed, and no SEO-success judgment
was made at production completion.

The stale-memory diagnostic is live, production-verified, and measuring. PR
#69 merged at `2026-07-24T23:07:44Z` as
`ee9694d40771a6477bf9b7c294f1ec45f7dd7c69`; Vercel production completed at
`2026-07-24T23:08:30Z`. Its deployed technical and rendered checks passed,
and no SEO-success judgment was made at production completion.

The English Claude Code memory, zh-TW Obsidian, English AI work memory versus
knowledge-base, English LLM-wiki, MCP shared-memory, and
stale-memory changes remain production-verified measurement cohorts; they do
not consume the production slot.

`EXP-2026-07-24-learn-hub-exposure-refresh` ended inconclusive at
`2026-07-30T07:53:53Z` before reaching its 100-impression minimum. The
approved three-locale knowledge-base refresh changes the same English
`/learn` framing, so the older cohort is explicitly superseded rather than
mixed into future attribution.

### Latest technical correction

`TECH-2026-08-01-download-signup-attribution` is production-verified and no
longer consumes the website-change slot. PR #108 merged at
`2026-08-01T19:14:11Z` as
`3daf34b31d43ecaa4f4eaaf365a7fb3565ba3327`; Vercel production completed at
`2026-08-01T19:14:59Z`. The deployed technical audit and live English,
zh-TW, zh-CN, and Download acquisition surfaces pass.

GitHub release downloads remain cumulative point-in-time counters. Anonymous
Umami events, configured-audience Resend contacts, GitHub stars, GSC, and
Vercel remain separate native-unit evidence without a causal or person-level
join. All six Resend properties and the production feature flag are live. No
fabricated contact or synthetic analytics event was created. The complete
production record is in
`docs/seo-audits/2026-08-01-download-signup-attribution-prelaunch.md`.

### OpenSEO evaluation

The bounded `2026-08-01` OpenSEO trial is complete without connecting GSC or
buying a plan. OpenSEO remains an optional third-party demand-discovery and
live-SERP lane, not an authority for Wenlan performance. In its own displayed
DataForSEO-backed volume unit, the strongest tested seeds were United States
`llm wiki` at 5,400, United States `AI knowledge base` at 880, United States
`obsidian claude code` at 210, Taiwan `AI 知識庫` at 210, and United States
`chatgpt knowledge base` at 50. United States `codex knowledge base` collided
with an unrelated game intent, and Singapore `AI 知识库` returned insufficient
data; neither may nominate a direct page.

Keep LLM Wiki, Karpathy, and AI knowledge base as one top acquisition family.
Keep Obsidian plus Claude Code/MCP as the next clean workflow cluster. Treat
ChatGPT as a smaller monitored lane and use task-qualified Codex/context/MCP
phrasing only after independent corroboration. OpenSEO's broad AI expansions
were noisy and its Simplified Chinese result did not close the evidence gap,
so GSC, inspectable Trends, and provenance-preserving Chinese-community
observations remain necessary. No new article or experiment starts from this
evaluation alone. After the technical correction reached production, the
OpenSEO tool-pair observation combined with authenticated page evidence,
official Trends, maintained OSS, and Simplified-Chinese community provenance
to nominate the current Obsidian locale experiment through the full gate.
Evidence and provenance are recorded in
`docs/seo-audits/2026-08-01-openseo-evaluation.md`.

The final post-review gate completed at `2026-08-01T19:09:02Z`. The fresh-eye
review returned `MERGE` after all four findings were resolved. `pnpm
seo:goal:check`, TypeScript, 215 SEO tests, 58 i18n tests, the 214-page
production build, compiled technical SEO, 22 expected localized 200 routes,
5 expected localized 404 routes, the fixture-backed weekly pipeline, the live
audience-scoped Resend aggregate fetch, and `git diff --check` all pass. The
approved scope merged in PR #108 and is production-verified.

`TECH-2026-07-26-source-release-boundary` is production-verified and no longer
consumes the single production slot.
The original contract defect remains fixed: published wenlan-app facts come
from the highest immutable version tag with `git show`, both backend-pin
manifest shapes are supported, and missing tags fail closed instead of
silently reading a mutable working tree.

The source premise changed after that audit. Wenlan `v0.15.0` was published at
`2026-07-26T05:13:54Z` with direct native Windows x64, macOS Apple silicon,
Linux x64, and Linux ARM64 runtime archives. The bounded public-site change
adds one exact release contract, a visible homepage Download section, direct
release-asset CTAs, platform setup instructions in English, Traditional
Chinese, and Simplified Chinese, and aligned About, docs, schema, sitemap, and
social-image release claims. Windows is described as a released headless
runtime with ONNX Runtime and Vulkan support, not as a released desktop app;
wenlan-app remains pinned to published `v0.14.0`.

Local verification passed the Goal checker, 189 SEO tests, 53 i18n tests,
TypeScript, production build, compiled technical SEO, four direct release
asset URL checks, and fresh rendered QA over 18 route/locale/viewport
combinations. The first visual pass found and the second pass confirmed the
fix for awkward Chinese compound wrapping. Evidence is in
`docs/seo-audits/2026-07-25-source-release-boundary.md`. The user explicitly
approved commit, push, PR creation, merge, automatic Vercel deployment, and
production verification at `2026-07-27T04:00:43Z`; indexing requests, GSC
validation, and external publication remain unapproved.

PR #88 merged at `2026-07-27T04:03:09Z` as
`f8ca1a975f3c567de934dd757023b0b199e61e15`; Vercel production completed at
`2026-07-27T04:03:56Z`. The deployed technical audit and the exact English,
zh-TW, zh-CN, and four release-asset checks passed at
`2026-07-27T04:06:15Z`. This proves release accuracy and availability only,
not SEO lift, CTA conversion, star attribution, or causality.

`TECH-2026-07-26-provider-neutral-cta-tracking` is production-verified. Before
the correction, the live site loaded the configured Umami Cloud tracker, but
`TrackedLink` sent custom interactions only to Vercel Analytics. Vercel
custom-event reporting is account-plan-gated, so no reliable
`github_outbound` observation or diagnostic CTA baseline existed.

The bounded correction implements the provider-neutral contract already
approved in
`docs/seo-audits/2026-07-18-exposure-first-growth-design.md`: Vercel remains
the pageview source, while configured Umami becomes the single custom-event
sink for `github_outbound`, `get_started_click`, `learn_article_click`, and
`setup_path_click`. Event properties are limited to placement, locale,
context, and a fixed destination category. The Umami script is restricted to
`wenlan.app`, excludes URL search parameters, and respects Do Not Track.
`/docs/data-and-privacy` separately discloses public website analytics without
changing installed Wenlan's no-product-telemetry default.

This is a measurement correction, not an SEO-success or star-attribution
experiment. It changes no metric definition, URL, canonical, sitemap route,
locale availability, structured-data type, or `FAQPage` policy. The complete
evidence, privacy boundary, and verification contract are in
`docs/seo-audits/2026-07-25-cta-measurement-prelaunch.md`. Local preparation
is complete. The user approved commit, Git push, PR creation, merge,
automatic Vercel deployment, and production verification at
`2026-07-26T03:07:04Z`. PR #86 merged at
`2026-07-26T03:12:02Z` as
`7674c47405ed42a71f8776b8276093fbea05fefd`; Vercel production completed at
`2026-07-26T03:12:51Z`. The live tag exposes the hardened domain, query, and
Do Not Track attributes; the disclosure and normalized CTA event names are
live; and the deployed technical SEO audit passes. The production slot is
released. Synthetic production events and authenticated production event
reads remain separately unavailable or prohibited.

`TECH-2026-07-26-knowledge-base-published-date` corrects the live Article
JSON-LD for `/learn/ai-work-memory-vs-knowledge-base`. The existing indexed
page first shipped with the article registry's `2026-05-27` date, but the
2026-07-24 refresh supplied only `updatedAt`. The shared schema fallback
therefore emitted `datePublished: "2026-07-24"` and
`dateModified: "2026-07-24"`, rewriting the original publication date.

The bounded correction adds `publishedAt: "2026-05-27"` while retaining
`updatedAt: "2026-07-24"`, plus a focused regression assertion. It changes no
visible copy, URL, canonical, hreflang, sitemap membership, locale
availability, schema type, `FAQPage` policy, or experiment baseline. The user
approved commit, push, PR, merge, deployment, and production verification at
`2026-07-26T02:24:10Z`.

PR #83 merged at `2026-07-26T02:30:28Z` as
`a54f13f891d472774f48cafb8798955bf8906ce4`; Vercel production completed at
`2026-07-26T02:31:19Z`. The deployed technical audit, locale-route matrix,
exact canonical, indexability, Open Graph dates, Article JSON-LD dates, and
`FAQPage` absence passed at `2026-07-26T02:32:30Z`. The correction is
production-verified and no longer consumes the production slot.

`TECH-2026-07-24-localized-learn-breadcrumb` fixes a deterministic mismatch
between localized Learn Article JSON-LD and the visible localized breadcrumb.
Production-before checks showed the zh-TW and zh-CN article home and article
items localized correctly while item 2 still pointed to the English
`https://wenlan.app/learn` hub.

The production change uses `canonicalUrl(resolvedLocale, "/learn")` for item 2
and adds a focused regression test. Live production HTML now emits
`https://wenlan.app/zh-TW/learn` and `https://wenlan.app/zh-CN/learn`.
It changes no visible copy, article canonical, hreflang, sitemap membership,
locale availability, schema type, or `FAQPage` policy. Evidence is in
`docs/seo-audits/2026-07-24-localized-learn-breadcrumb-prelaunch.md`.

PR #65 merged at `2026-07-24T20:47:55Z` as
`7f54c64a46d48e1d5f0f4d619bdd5a61aaba75dd`; Vercel production completed at
`2026-07-24T20:48:42Z`. The deployed technical, locale-route, structured-data,
and rendered checks passed. The correction is production-verified and no
longer consumes the preparation slot.

The weekly report's changelog and data/privacy candidates remain unstarted.
The refreshed query-plus-page join shows their visible rows are brand variants
and noisy misspellings rather than a standalone changelog, privacy, or
configuration problem cluster; the remaining page impressions stay
privacy-filtered and cannot be invented. The SuperLocalMemory comparison was
the evidence-backed exception: fresh tagged source and the v3.8.3 package
established material product and benchmark drift beyond the one visible query
row, so refreshing the existing indexed page passed the full candidate gate.

### Completed localized launch

The next eligible localized candidate is a zh-TW counterpart of the existing
English `/learn/wenlan-vs-obsidian-ai-memory` page, with modifier-qualified
Obsidian, Claude Code, MCP, and agent-memory intent. It passed the candidate
gate from Taiwan Trends direction, repeated Reddit and OSS workflows,
Traditional Chinese corroboration, the English page's current GSC impressions,
and a clean zh-TW route gap.

The candidate went live at `2026-07-23T15:19:18Z`. The localized Learn
registry, static params, sitemap, locale switching, and hreflang enumerate
actual per-locale availability; the zh-TW article includes visible maintained
sources; and the nonexistent zh-CN route is a verified production 404 without
a sitemap or alternate entry.

The immutable experiment fields, source-native baseline, and exposure lane are
recorded in
`docs/seo-audits/2026-07-23-zhtw-obsidian-prelaunch.md`. The website exposure
lane consists of the localized Learn hub, sitemap/hreflang, and contextual
links from the two existing zh-TW wiki pages. Threads and other owned-social
work are excluded from this campaign.

Website push, merge, and production deploy were explicitly approved by the
user on `2026-07-23`. PR #58 is merged and production-verified.

### Working cadence

- Evidence waiting is not production waiting. While one experiment measures,
  prepare the next candidate, its tests, and its verification evidence
  locally.
- Read the Friday report for measurement and follow-up priorities; do not use
  its calendar boundary to delay a verified, approved website asset.
- Keep one website change in production preparation at a time. Production-
  verified measurement cohorts do not block the next change, and there is no
  fixed calendar article quota.
- Do not create a zh-CN counterpart from Taiwan-only evidence.

### Execution phases

- [x] Phase 0: verify repo, active Goal, weekly automation, and authenticated
  baseline provenance.
- [x] Phase 0: create the frozen contract, append-only ledger, and deterministic
  verifier with RED-to-GREEN tests.
- [x] Phase 1: receive user approval for the protected Goal contract.
- [x] Phase 2: refresh the candidate queue from evidence and keep experiment
  launches inside the production-concurrency and candidate gates.
- [x] Phase 3: prepare the approved local experiment change, verify technical
  and locale quality, and stop at any external/shared-state approval boundary.
- [ ] Phase 4: append 24h, 7d, W2, W4, and W8 readouts as they become due;
  wait when minimum exposure has not been reached.
- [ ] Phase 5: read the fixed final window ending 2026-08-17, delayed only for
  GSC reporting latency, then deliver the terminal decision.

### Next decision

At `2026-08-14T05:58:00Z`, the controller evaluated the fresh inter-window
GSC query-page rows without replacing the independent Friday report. The
English Learn hub has 132 impressions and zero clicks, but only three
privacy-visible qualified impressions: two for
`ai memory mcp persistent context llm` and one for
`claude agents sdk memory`. Google already crawled the current
knowledge-base-first hub after its prior refresh, and the live source already
exposes direct routes for AI knowledge-base tool selection, document ingest,
source-backed pages, Karpathy LLM Wiki, Claude Code, MCP, and Obsidian. Hidden
rows therefore do not justify another hub title, snippet, or card rewrite.

The remaining core query-page joins are individually sparse: one impression
for `llm wiki for codebase`, one for `local ai knowledge base`, and one for
`stevenstavrakis/obsidian-mcp`. Their owners are already measuring or have a
near-term predeclared readout, so no overlapping content edit is started.
The approved directory lane was also reconciled read-only: all 13 submitted
PRs remain open, no maintainer correction is requested, 11 are `CLEAN`, one
is `BLOCKED` only on required review, and one is `UNSTABLE` on the previously
documented unrelated whole-repository link failures. No no-op push,
maintainer message, duplicate submission, website edit, indexing request, or
validation action is supported by this evidence. Run the due LLM-Wiki and
AI-agent-knowledge-graph 24-hour reads at their existing boundary before
selecting another same-surface change.

At `2026-08-13T06:21:14Z`, the controller completed the overdue seven-day
readouts for the three core August acquisition families without rerunning the
weekly pipeline. Read-only GSC page filters used the nine complete dates
`2026-08-03..2026-08-11`; Vercel used the same complete-date window. All nine
URLs are submitted and indexed with exact Google and user canonicals, but no
locale reached its independent five-impression minimum. The document guide
has English 2 impressions, zh-TW 1, and zh-CN unavailable; tool selection has
English 1, zh-TW 1, and zh-CN unavailable; the Karpathy/LLM Wiki family has
English 1, zh-TW 1, and zh-CN 3. All returned page rows have zero clicks. The
only privacy-visible qualified join is English `local ai knowledge base` at
one impression and position 56. These results are inconclusive, not failures
or proof of low demand. Document and tool selection remain unchanged until W2
after `2026-08-16`; the Karpathy intervention is stopped because the newer
schema-template experiment changed the same canonical family on August 13.

The matching Vercel window reports 74 raw visitors and 214 pageviews, 65
direct visitors and 203 direct pageviews, and a non-deduplicated qualified-
referrer row sum of 9 visitors and 10 pageviews. Target-page traffic is sparse
and no qualified source-to-target row was returned, so no source-to-page or
causal claim is made. GitHub remains 47 stars. This confirms that the immediate
growth constraint is discovery and exposure rather than an observed CTA-rate
problem.

The approved OSS distribution lane was refreshed at
`2026-08-14T07:06:01Z`. `TensorBlock/awesome-mcp-servers` PR #1500 merged at
`2026-08-03T00:09:13Z`, and the default-branch knowledge-management file now
contains the exact `7xuanlu/wenlan` repository link and the approved
AI-knowledge-base plus LLM-wiki description. Eleven Wenlan PRs remain open;
all eleven currently report `MERGEABLE`. One explicitly requires maintainer
review, and the only failing check remains the previously verified unrelated
whole-repository link checker. No maintainer review or comment requests an
author-side correction. The prepared one-line
`appcypher/awesome-mcp-servers` entry still has no upstream or all-state PR
duplicate, its repository and icon links return HTTP 200, and its fork branch
is exactly one commit ahead. GitHub nevertheless rejected a fresh PR creation
attempt before mutation with `7xuanlu does not have the correct permissions to
execute CreatePullRequest`. No PR or maintainer message was created. Stop
retrying that destination until the permission relationship changes.

The previously pending free `mcpservers.org` submission is now publicly live
at `/servers/7xuanlu/wenlan`. A direct read returned HTTP 200; the page is not
marked `noindex`, links to both `https://github.com/7xuanlu/wenlan` and
`https://wenlan.app`, and contains the approved `AI knowledge base` and `LLM
wiki` wording. The public server sitemap includes the exact listing URL with
`lastmod` `2026-08-13T06:35:37.000Z`. Treat this as one live free-directory
surface, not a search click, star, visitor, or causal result, and do not
resubmit submission ID `5334`.

At `2026-08-13T05:35:20Z`, the controller reconciled an omitted published
experiment record before selecting another website edit. The English
`/learn/source-backed-wiki-pages-ai-work` snippet refresh had already shipped
through PR #121 and Vercel Production at `2026-08-09T15:32:38Z`, but its
experiment start and due 24-hour readout were absent from `main`. The append-
only ledger now records the original 10-impression plus post-deploy-crawl
guards. Read-only URL Inspection still reports the pre-deploy
`2026-07-29T01:09:32Z` crawl, so the formal 24-hour result is inconclusive and
the canonical must remain unchanged. The production slot remains open.

The same read-only inspection removes a different uncertainty around the
English Learn hub: Google last crawled `/learn` at
`2026-08-04T07:58:16Z`, after its July 30 knowledge-base-first title and
quick-answer refresh. The current 120-impression, zero-click page aggregate
therefore cannot be dismissed as entirely pre-refresh, but only three
privacy-visible qualified query impressions map to the hub. The remaining
page impressions do not reveal their intent. Do not stack another Learn-hub
rewrite or assign the hidden rows to AI knowledge-base demand.

The next non-overlapping demand-discovery lane is a source-backed AI-agent
knowledge graph, not another generic memory page. Fresh inspectable English
Reddit and maintained OSS/GitHub observations repeat cross-source discovery,
relationships/backlinks, provenance, graph context, and agent-readable
knowledge. Independent Simplified-Chinese V2EX, Zhihu, and Bilibili surfaces
repeat Agent knowledge-base plus knowledge-graph wording in their native
public units. Wenlan first-party source proves typed entities, observations,
relations, entity resolution, graph context in retrieval, source linkage, and
review/quality paths. The coverage audit passes only for refreshing the
existing indexed English Docs owner at `/docs/knowledge-graph`; another Learn
URL would overlap. Authenticated URL Inspection reports the exact canonical
indexed but last crawled at `2026-07-16T09:43:37Z`. The current page already
covers entities, relations, observations, wikilinks, hybrid retrieval, and
cleanup, but its snippet is product-name-first and it has no compact AI-agent
knowledge-graph answer. Local preparation may sharpen that existing page
around the user job while preserving graph-as-support-not-authority and
maintained-source truth. Do not add zh-TW or zh-CN Docs detail routes in this
round: the localized routes remain intentional 404s and there is no locale-
specific target-page GSC evidence. The immutable candidate and readout
contract is in
`docs/seo-audits/2026-08-13-ai-agent-knowledge-graph-coverage-gate.md`.
External observations remain demand discovery, not GSC or keyword volume.

The bounded English Docs refresh is production-verified from Vercel deployment
`5883194191` at `2026-08-13T06:39:50Z`. Its live technical, content, locale,
schema, sitemap, and exact-device rendered checks pass, so the production slot
is open. Wait for its 24-hour source-native readout after
`2026-08-14T06:39:50Z`; do not infer a Google crawl, impression or click lift,
or causal result from deployment. Request indexing, GSC validation, external
posts, paid action, synthetic events, analytics mutation, and metric changes
remain outside the publication scope.

At `2026-08-14T06:43:56Z`, the formal 24-hour readout found that the search
performance and crawl guards are still unmet: the latest complete GSC range
ends before deployment, the target row remains unavailable, and URL Inspection
still reports the pre-deploy `2026-07-16T09:43:37Z` crawl. The live technical
checker otherwise passes, but the deployed TechArticle now emits
`datePublished: 2026-08-13` together with `dateModified: 2026-08-13`. Before
the refresh, the page inherited `2026-07-09` from `DOCS_UPDATED_AT`; the
approved candidate contract required that publication date to remain stable.
This schema-date regression triggers the original technical stop criterion.
Prioritize a bounded explicit `publishedAt: 2026-07-09` correction and focused
regression test before another content publication. Commit, push, PR, merge,
deployment, request indexing, and validation remain separately approval-gated.

The bounded correction is locally verified on
`codex/knowledge-graph-published-date-fix` at `2026-08-14T06:51:40Z`.
The focused RED-to-GREEN control, 223 SEO tests, TypeScript, Goal verifier,
production build, built technical audit, and compiled TechArticle date check
pass. It changes no visible copy, URL, canonical, sitemap, locale route,
schema type, or experiment metric. At `2026-08-15T00:20:38Z`, the user
explicitly approved its commit, push, ready PR creation, merge, automatic
Vercel deployment, and live read-only verification. PR #130 and Vercel
Production completed successfully at `2026-08-15T00:23:48.475Z`; the live
technical and exact schema gate passed, so the correction is closed and the
production slot is open. Reassess the already prepared non-overlapping MCP
knowledge-base-server candidate against the latest evidence before asking for
another publication approval.

The overdue W2 readout for the existing English Obsidian + Claude Code page
was reconciled at `2026-08-13T06:07:55Z` without rerunning the weekly pipeline.
The latest weekly range contains 0 target-page clicks and 12 impressions, but
it starts before deployment. A narrow final GSC page query for eight complete
post-deploy days `2026-07-30..2026-08-06` reports 0 clicks, 6 impressions,
and page-average position 28.8; the only privacy-visible target join is
`stevenstavrakis/obsidian-mcp` with 1 impression at position 46. The 5-
impression minimum is met, but neither success nor failure criteria are met,
so W2 is inconclusive. Read-only URL Inspection reports a post-deploy mobile
crawl at `2026-08-03T11:30:48Z`, exact Google and user canonicals, and
submitted/indexed status. Current live HTML and sitemap preserve direct 200,
exact canonical, `index, follow`, Article and BreadcrumbList dates, direct
files/editor context/MCP/source-backed lifecycle content, two visible FAQs,
no `FAQPage`, and sitemap membership. No indexing request or validation was
submitted, and no source-to-page, exact-query-rank, causality, or SEO-success
claim is made. Keep the canonical unchanged until W4 after
`2026-08-26T06:07:17Z`.

The fresh three-language Karpathy / LLM Wiki gate completed at
`2026-08-02T03:52:06Z`. Signed-in Trends related-query panels now independently
repeat `Karpathy`, `LLM Wiki`, `Obsidian`, and `GitHub` across the United
States, Taiwan, and a Worldwide Simplified-Chinese phrase comparison. OpenSEO's
prior native-unit results, English Reddit and maintained OSS, and public
Simplified-Chinese community wording corroborate the same family. Existing
coverage rejects another URL: the clean gap is that `Karpathy` appears only in
reference labels, not in the three localized LLM Wiki titles, first answers,
section headings, or internal-link anchors. The due zh-TW readout at
`2026-08-02T04:14:53Z` was inconclusive because no complete authenticated
post-deploy GSC or Vercel window exists, and that intervention is now stopped
and superseded. The user approved the bounded existing-canonical
three-language refresh. PR #116 is merged and production-verified from
`2026-08-02T04:39:55Z`; wait for its actual 24-hour technical and evidence
readout after `2026-08-03T04:39:55Z`, without inferring a crawl or SEO result
from deployment. The complete provenance and candidate gate are in
`docs/seo-audits/2026-08-01-karpathy-llm-wiki-three-language-demand.md`.

The document knowledge-base guide family is production-verified and measuring
from `2026-08-02T02:42:26Z`. Run its actual 24-hour technical and evidence
readout only after `2026-08-03T02:42:26Z`. The existing same-task heartbeat has
an earlier Obsidian-locale readout due after `2026-08-02T21:09:50Z`; keep that
earlier wake and let it advance to the document-guide boundary afterward
rather than creating another automation. Do not infer crawl, indexing,
impressions, clicks, or visitor lift from the successful deployment.

Keep the Vercel Goal metric raw and add the preserved traffic-quality split to
future complete-window observations before using referrer totals as evidence
of acquisition quality. The current aggregate evidence supports an exact
`suspected automated/referrer-incompatible` cohort, not a general Linux,
Chrome, Google-referrer, or bot exclusion rule. Do not call the 336-visitor
complement human traffic and do not change the protected qualified-source or
visitor definitions without explicit approval. The deterministic evidence and
capability boundary are recorded in
`docs/seo-audits/2026-08-01-vercel-google-referrer-quality-audit.md`.

Authenticated GSC URL Inspection at `2026-08-01T21:47:09Z` isolated crawl
freshness as the immediate search constraint. The user approved the fixed
four-URL request-indexing batch, and Search Console returned `Indexing
requested` for the English, zh-TW, and zh-CN Obsidian URLs and the zh-CN LLM
Wiki URL by `2026-08-01T22:00:20Z`. Do not repeat those requests, the earlier
English source-backed request, or the earlier zh-TW LLM Wiki request. Queue
acceptance is not a new crawl, indexing, ranking, traffic, click, or causal
result. Wait for the actual Obsidian-locale 24-hour boundary or later
authenticated evidence before re-reading crawl state; do not rewrite content
from this operation. The source-native inspection matrix and execution are in
`docs/seo-audits/2026-08-01-core-acquisition-url-inspection.md`.

Do not start another overlapping website edit from the current authenticated range. The
range ends on `2026-07-30`, before the August 1 homepage links, zh-TW LLM Wiki
refresh, and Obsidian locale experiment have a complete post-deploy day. The
production slot is open, but another website candidate still requires either a
new authenticated query-page join or a separately inspectable demand signal
that passes the complete candidate gate.

The fresh three-language coverage audit rejects a separate “self-updating
codebase wiki” article in this window. English Reddit and maintained OSS repeat
the documentation-drift problem, but the existing English, zh-TW, and zh-CN
LLM Wiki and source-backed knowledge-base canonicals already cover sources,
staleness, refresh, review, and the boundary that current code and tests remain
authoritative. First-party Directory Source ingestion currently accepts only
`.md`, `.txt`, and `.pdf`; the generic code chunker is not wired into that
source path. A new URL would therefore overlap existing intent and risk an
unsupported code-sync claim. Keep the phrases as a monitoring lane and revisit
only after a qualified query-page join or maintained code-ingestion proof. The
full gate is in
`docs/seo-audits/2026-08-01-self-updating-codebase-wiki-coverage-gate.md`.

The earlier zh-TW localization cohort is superseded as inconclusive because
the same URL receives a new title, first answer, and workflow framing. Keep the
English Obsidian experiment measuring independently. Each Mandarin route has
its own minimum exposure and result; do not aggregate locales or infer exact
query rank from page-average position.

At the next authenticated window, first reconcile `/learn`, the English,
zh-TW, and zh-CN LLM Wiki and source-backed knowledge-base families, and the
three Obsidian locale routes. Keep property totals, visible-query totals,
visibility gaps, page aggregates, and joined qualified queries separate. If
the evidence still predates the August 1 changes or stays below each
experiment's minimum exposure, record an inconclusive readout and do not
rewrite. Memory remains supporting infrastructure, not the acquisition
center.

The fresh signed-in Google Trends refresh at `2026-08-01T04:20:26Z` narrows
that inspection further. It keeps `LLM wiki` and `AI knowledge base` in one
co-primary category lane and rejects separate exact-phrase Codex or ChatGPT
knowledge-base pages from the retained evidence. Related-query panels were
not retained, so this refresh does not update the existing Karpathy or
modifier-qualified Obsidian decision. Reconcile the next available
authenticated query-page join with the existing English, zh-TW, and zh-CN
category pages before selecting any snippet or internal-link refresh. That
inspection may proceed without waiting for a weekly boundary when a
non-overlapping candidate passes the full gate. The preserved raw series and
full decision are in
`docs/seo-audits/2026-08-01-priority-cluster-trends-refresh.md`.

The Friday query-page audit exposed a narrower technical acquisition defect.
All three homepage dictionaries retained direct guide metadata after the
homepage redesign, but the shared homepage renderer no longer emitted those
links. In the pre-deploy production snapshot at `2026-08-01T07:28:06Z`,
English, zh-TW, and zh-CN homepages therefore routed LLM Wiki and AI
knowledge-base visitors through the Learn hub instead of linking to the
existing localized guides directly. The bounded correction is now
`production-verified` in
`docs/seo-audits/2026-08-01-home-acquisition-links-prelaunch.md`: restore one
low-density homepage navigation row to the localized LLM Wiki and
source-backed AI knowledge-base guides, preserve Download and GitHub CTAs,
and add an actual render contract so dictionary-only strings cannot satisfy
the link floor. It is a technical information-architecture correction, not a
new article or experiment start. PR #106 merged at `2026-08-01T14:19:05Z`,
and Vercel completed production at `2026-08-01T14:19:53Z`; that time is part
of the measuring zh-TW LLM Wiki page's attribution boundary.

A 113-page production internal-link crawl and matching local-build crawl now
quantify the correction. It adds exactly one new same-locale homepage source
to each of the six English, zh-TW, and zh-CN core-guide targets. The
pre-deploy production crawl exposed seven non-self sources per English guide,
three per zh-TW guide, and two per zh-CN guide; the local candidate raised
those counts to eight, four, and three respectively without changing another
source. This
supported publishing the bounded homepage correction but does not nominate a
second article or an additional link edit.

The post-deploy crawl at `2026-08-01T14:22:36Z` fetched all 113 sitemap pages
without a failure and confirmed the exact predeclared increase: eight
non-self sources per English guide, four per zh-TW guide, and three per zh-CN
guide. English, zh-TW, and zh-CN homepages each return direct 200 and render
both exact localized hrefs. The deployed technical SEO audit remains green.

The account-wide distribution correction is complete at
`docs/seo-audits/2026-08-01-oss-directory-publication-scope.md`, and the user
approved its complete non-duplicate publication scope at
`2026-08-01T05:11:57Z`. The inventory found ten still-open pre-Wenlan PRs, four
upstream-merged pre-Wenlan PRs, one additional entry merged manually after PR
closure, one closed unmerged PR with a new Glama prerequisite, and four forks
without an external PR. Existing PRs and accepted listings must be updated in
place; do not add a second Wenlan entry.

The immediate new-PR lane is the verified
`gavischneider/awesome-llm-wiki` entry. An exact `Note Taking` patch for
`appcypher/awesome-mcp-servers` must pass its current format and link checks
before it joins that lane. The repository-supported website lane for
`wong2/awesome-mcp-servers` remains pending an approved contact email; its
documented free submission path is the only permitted option, and the $39
Premium path remains prohibited as paid acquisition. Immediately before every
push or submission, search the current upstream, all-author PRs, and directory
surface for an existing Wenlan name or repository URL. The older
`punkpeye/awesome-mcp-servers` patch is not submission-ready because public
Glama reads for both Wenlan and the legacy slug return 404, and PR #7080
documents a mandatory Glama listing, runtime check, and score badge. The current Codex
plugin directory also cannot be submitted until a separately approved
repository-root plugin package and HOL scanner CI satisfy its published gate.
Publish the control-plane correction first, then execute the verified
in-place updates and eligible new submissions. Keep PR state, accepted
listing count, listing-days, GitHub stars, GSC, Vercel, and Umami in their
native units without attribution.

The same preflight found that `src/lib/releases.ts`, localized
download/get-started copy, About OG copy, changelog/security docs, and sitemap
freshness still identified `v0.15.0`, while immutable Wenlan tag `v0.15.2`
and its GitHub release were published on
`2026-07-31`. `TECH-2026-08-01-release-v0.15.2-alignment` is now live and
production-verified beside the localized refresh. Keep it outside the
experiment attribution: it updates only release-backed version, date, asset
URL/size, changelog, and freshness claims and does not start another content
experiment. Evidence and the exact boundary are in
`docs/seo-audits/2026-08-01-v0.15.2-release-alignment.md`.

#### Acquisition and migration decision

The Docs-to-GitHub bridge and the English, zh-TW, and zh-CN Learn
knowledge-base refresh are production-verified and measuring. The production
slot is open for the next non-overlapping candidate that passes the full
evidence gate. Preserve existing URLs, reciprocal locale behavior, canonical
and sitemap membership, Article and BreadcrumbList schema, and visible FAQ
without `FAQPage`.

Treat the domain migration and acquisition evidence as one operating view.
The user submitted Change of Address from `useorigin.app` to `wenlan.app` and
resubmitted the Wenlan sitemap on 2026-07-28. Search Console verification
shows the move active and the sitemap successful with 113 discovered pages.
With explicit approval, URL Inspection confirmed that the following URLs were
already on Google and then returned `Indexing requested`:

- `/learn/distilled-wiki-pages-ai-memory`
- `/learn/source-backed-wiki-pages-ai-work`
- `/learn/ai-work-memory-vs-knowledge-base`
- `/zh-TW/learn/distilled-wiki-pages-ai-memory`

Do not repeat those requests; Google states that resubmission does not improve
queue priority. No GSC validation was submitted because there is no matching
repaired coverage issue awaiting validation.

Use
`docs/seo-audits/2026-07-29-unified-acquisition-observation.md` as the current
decision view. The next authenticated read must keep the aligned date range
and show Wenlan GSC, legacy `useorigin.app` GSC, Vercel
raw/direct/qualified/page rows,
GitHub stars, and indexing together while preserving every source's native
unit and refusing a fabricated source-to-page join.

The next full candidate gate selected a refresh of the existing English
Obsidian page around modifier-qualified `obsidian claude code`, `claude code
obsidian`, and `obsidian mcp` intent. Memory is supporting infrastructure, not
the acquisition center. The standalone answer must distinguish direct
Markdown file access, real-time editor context, an Obsidian MCP tool surface,
and a maintained source-backed AI knowledge base. Keep
`/learn/wenlan-vs-obsidian-ai-memory`; do not add another Obsidian URL or
translate the refresh without matching locale evidence.

The experiment is production-verified and measuring. PR #95 merged at
`2026-07-29T06:06:33Z`; Vercel completed production at
`2026-07-29T06:07:17Z`. Preserve the original
`datePublished: "2026-06-06"`, canonical, sitemap and locale behavior,
Article and BreadcrumbList schema, and visible FAQ without `FAQPage`.
Do not rewrite the page again before a declared readout or new evidence.
At the user's request, an early partial technical/evidence observation was
recorded at `2026-07-30T05:39:51Z`, 23 hours 32 minutes 34 seconds after
production completion. It is not labeled as the formal 24-hour readout.
Technical, locale, content, and responsive render checks pass; the latest
authenticated GSC and Vercel range still predates deployment, so no SEO
outcome is inferred. A separate non-overlapping website candidate may be
prepared only after its complete gate passes; no new candidate is started by
this observation. Request indexing and GSC validation remain separately
gated.

#### Scheduled measurement maintenance

The following due readouts preserve previously launched experiment contracts.
They do not nominate new memory content or alter the acquisition priority.

The 24-hour technical/evidence readout for
`EXP-2026-07-27-llm-wiki-implementation-guide-refresh` completed at
`2026-07-28T05:47:53Z`. Keep the English target's page aggregate and joined
visible queries separate, and do not record its 7-day readout before
`2026-08-03T05:29:47Z`. Do not add a new search URL or translate the new
framing without locale-specific evidence. Actual Umami totals remain
manual/account-gated.

The
`TECH-2026-07-26-knowledge-base-published-date` correction is
production-verified: live Open Graph and Article JSON-LD preserve
`datePublished: "2026-05-27"` and `dateModified: "2026-07-24"`, and the
deployed technical and locale checks pass. Keep the related experiment's
original measurement schedule.

The context-loss diagnostic completed its 24-hour technical/evidence readout
at `2026-07-26T02:15:47Z`; run its 7-day readout after
`2026-08-01T02:15:21Z` and apply the original 5-impression minimum.

`EXP-2026-07-25-ai-agent-memory-types` completed its 24-hour
technical/evidence readout at `2026-07-26T02:04:08Z`; run its 7-day readout
after `2026-08-01T01:49:40Z` and apply the original 5-impression minimum.

`EXP-2026-07-18-claude-code-memory-refresh` completed its due 7-day readout
at `2026-07-26T02:04:08Z`, but the authenticated range did not contain seven
complete post-deploy days and no post-change crawl date is confirmed. Run its
W2 readout after `2026-08-02T00:26:09Z` with the original page and visible
qualified-cluster guards.

That W2 readout completed at `2026-08-02T06:17:58Z`. Authenticated URL
Inspection reports the page as submitted and indexed with the exact
self-canonical, but its last crawl remains `2026-07-04T09:03:21Z`, before the
July 18 refresh. The same-range backfilled page row is still below the
25-impression minimum at 0 clicks, 24 impressions, and 38.8 average position;
the fixed five-query guard is unchanged at 0 clicks, 9 impressions, and 50.0
impression-weighted average position. The W2 result is therefore
inconclusive, not a failure. Keep the page unchanged and evaluate it again at
W4 only after a post-refresh crawl can be confirmed or the original contract
otherwise becomes assessable.

The LLM-wiki, MCP shared-memory, stale-memory, claude-mem,
SuperLocalMemory, and Basic Memory 24-hour readouts were completed at
`2026-07-26T01:47:53Z`. Their production gates passed, but the latest
authenticated GSC and complete Vercel range ends before deployment, so each
result remains pending. Run their 7-day readouts after their predeclared
times from `2026-07-31T19:18:03Z` through `2026-08-01T01:04:56Z`, using the
Friday weekly evidence rather than duplicating its pipeline.

Do not run another readout for
`EXP-2026-07-24-learn-hub-exposure-refresh`; it was stopped as inconclusive
when the approved 2026-07-30 experiment superseded the same `/learn` surface.

The same-task `wenlan-claude-memory-24h-readout` heartbeat completed the
actual 24-hour zh-CN LLM-wiki readout and the user-requested early partial
English Obsidian observation at `2026-07-30T05:39:51Z`. Reuse that same
heartbeat at `2026-08-01T02:20:00Z`, safely after the Friday weekly SEO run
and the latest 7-day boundary. That batch covers the due zh-TW Obsidian,
AI-work-memory versus knowledge-base, LLM-wiki, MCP shared-memory,
stale-memory, claude-mem, SuperLocalMemory, Basic Memory,
AI-agent-memory-types, and context-loss 7-day readouts. It must not record the
Claude Code memory W2 readout before `2026-08-02T00:26:09Z`.

The document knowledge-base guide's production-verification record starts its
24-hour boundary at `2026-08-02T02:42:26Z`; do not record that readout before
`2026-08-03T02:42:26Z`. Keep the earlier Obsidian-locale heartbeat boundary
first and reuse the same task rather than creating a duplicate automation.

That due batch completed at `2026-08-01T02:37:50Z` using the authenticated
`2026-07-03..2026-07-30` weekly GSC and Vercel evidence. No source pipeline
was rerun. Target-page rows, visible joined queries, Vercel page rows, raw and
direct traffic, non-deduplicated qualified referrer rows, account-gated Umami,
and 46 GitHub stars remain separate. The range overlaps pre-deploy dates and
does not contain seven complete post-deploy dates for the 2026-07-24 and
2026-07-25 changes, so all ten results remain pending. The next scheduled
campaign readout is the Claude Code memory W2 readout after
`2026-08-02T00:26:09Z`; do not record it early.

The authenticated `2026-06-27..2026-07-24` inter-window refresh adds
19 property impressions, six visible-query impressions, four Vercel visitors,
and 19 Vercel pageviews relative to the preceding rolling range. These are
overlapping rolling-window observations, not daily gains or causal lift.
`basic memory` now has 4 visible impressions and
`basic-memory github` appears with 2 impressions, but the existing Basic
Memory page already covers that intent and its refresh was deployed after
this evidence window. The Learn hub has 78 impressions and no clicks, but the
range contains only its launch date rather than a complete post-change
cohort. Neither signal justifies stacking another edit before the scheduled
readout. The current 49-row query-plus-page export confirms these mappings and
also rejects the changelog and data/privacy queues as brand-noise candidates,
not new non-brand demand.

No additional English, zh-TW, or zh-CN content experiment is started by an
indexing action. Reassess the candidate gate under the corrected AI
knowledge-base and wiki center rather than carrying forward the old
memory-first queue. A localized candidate still needs matching
locale-specific evidence. Targeted indexing for the four URLs listed earlier
was approved and completed; do not repeat those requests.

The approved post-deploy GSC batch completed by `2026-07-30T08:07:02Z`. URL
Inspection reported each changed existing URL already on Google, and one
request-indexing action for each returned `Indexing requested`:

- `/learn`
- `/zh-TW/learn`
- `/zh-CN/learn`
- `/zh-TW/learn/source-backed-wiki-pages-ai-work`
- `/zh-CN/learn/source-backed-wiki-pages-ai-work`

The already-requested English source-backed article was excluded. Do not
repeat these requests; queue acceptance is not an indexing or ranking result.
Any URL outside this completed five-URL batch, non-website publication, or
GSC validation remains separately approval-gated.

#### 2026-08-01 authenticated tool boundary and new-content decision

The user clarified that low traffic makes eligible net-new articles a valid
growth tactic; waiting for another GSC window is not a blanket launch rule.
OpenSEO and Vercel were therefore verified inside their actual signed-in
account surfaces before changing the queue.

OpenSEO is authenticated for the `wenlan.app` project, but the hosted account
has exhausted its credits and GSC is not connected. Existing result pages are
readable; new keyword research, audit, rank tracking, GSC connection, and paid
actions remain unavailable, unverified, or separately approval-gated.

Vercel CLI 52.0.0 proved that the current Wenlan account can filter Web
Analytics by `referrerHostname` and group by `requestPath`, or filter by
`requestPath` and group by `referrerHostname`. The deterministic weekly lane
may therefore report authenticated acquisition source-to-page aggregates
without inventing a join. CTA custom events remain account-gated by HTTP 402
and must not be inferred.

The candidate gate passed for one non-overlapping three-locale workflow:
`/learn/build-local-ai-knowledge-base-from-documents`. It owns the document
ingestion, supported source types, repeatable sync, scanned-PDF boundary,
Obsidian read-only boundary, and end-to-end validation intent that the existing
conceptual LLM Wiki and source-backed knowledge-base pages do not. First-party
Wenlan source proves every product claim. The user approved commit, push, PR
creation, merge, automatic Vercel deployment, and read-only production
verification at `2026-08-02T00:36:22Z`. PR #114 merged as
`8577a2730946a110ac6d6d26d15e27c4e250505c`, and Vercel completed production
at `2026-08-02T02:42:26Z`; the change is live and measuring and no longer
consumes the production slot. Indexing requests, GSC
validation, external publication, paid actions, and account mutations remain
separately gated. See
`docs/seo-audits/2026-08-01-tool-boundaries-and-document-knowledge-base-gate.md`.
Report GSC, Vercel, Umami, GitHub, and technical evidence only when available
in their native units. Reddit or other external publication, OSS submission,
request indexing outside the fixed batch, and GSC validation remain
separately approval-gated.

#### OSS directory publication execution

The approved control-plane scope merged in PR #103 at
`2026-08-01T05:35:39Z`. The external execution then updated nine existing
pre-Wenlan PRs in place, opened four PRs that replace already-accepted legacy
listings, and opened the new exact-topic Awesome LLM Wiki PR #4. Every target
passed the just-in-time upstream, all-author PR, and directory duplicate gate
before push. `ComposioHQ/awesome-claude-skills` PR #852 passed its validation
after the Wenlan line was moved to its current alphabetical position.
`toolsdk-ai/toolsdk-mcp-registry` PR #433 passed both Package Schema Check and
biome; its trusted-main validator also checked the changed registry identity
with zero errors and zero warnings.

Keep three execution boundaries explicit. The prepared
`appcypher/awesome-mcp-servers` branch could be compared successfully, but
GitHub denied PR creation through both GraphQL and REST despite the valid fork
relationship; do not create a duplicate or misreport it as submitted.
`DhanushNehru/awesome-mcp-servers` PR #52 has a failing whole-repository link
check caused by nine unrelated upstream URLs, while the Wenlan repository URL
returns `200`; do not mix that upstream cleanup into the one-line rebrand PR.
Before destination-specific confirmation, the free `mcpservers.org` form was
prepared with Premium unchecked and held unsubmitted. That confirmation gate
was cleared by the user; the contact address remains excluded from this
repository.

The user confirmed the destination-specific public contact email and the free
`mcpservers.org` submission was accepted at `2026-08-01T06:38:49Z` as
submission ID `5334`. The authoritative response is `pending`, `plan=free`,
and `paymentStatus=not_required`; the contact address is not stored in this
repository. At `2026-08-14T07:06:01Z`, a direct public read confirmed that
this submission is now a live free listing at
`https://mcpservers.org/servers/7xuanlu/wenlan`; the public sitemap carries the
same URL. Do not resubmit or select Premium. Keep this listing separate from
GitHub PR acceptance and from GSC, Vercel, stars, or causal attribution.

The Glama prerequisite now has an authoritative account boundary: Glama
requires GitHub OAuth maintainer verification and a connected GitHub App
before it indexes and scores an open-source server. Installing that app or
granting repository access was not authorized by this directory batch, so the
punkpeye resubmission remains blocked. The Codex directory likewise remains
blocked on the separate repository-root plugin packaging and scanner contract.
Neither blocker authorizes a website edit, another experiment, paid listing,
indexing request, GSC validation, or analytics mutation.

The approved OSS batch received a second upstream acceptance at
`2026-08-01T22:15:12Z`: `TeleAI-UAGI/Awesome-Agent-Memory` PR #72 merged as
`62f9864ca13ced26dd645025940d72aaeb5b2f96`, and the default-branch README now
links the Wenlan site and `7xuanlu/wenlan` repository directly. Together with
the already-live `gavischneider/awesome-llm-wiki` entry and the now-merged
`TensorBlock/awesome-mcp-servers` PR #1500, the batch now has three merged OSS
listings and eleven open PRs. All eleven report `MERGEABLE`; one explicitly
requires maintainer review, while `DhanushNehru/awesome-mcp-servers` PR #52
still has the previously verified unrelated whole-repository link-check
failure. No maintainer comment or review requests an author-side correction.
Continue passive review-state observation; do not push no-op commits or
contact maintainers from this evidence.

#### Release-to-download integrity observation

The official GitHub latest release remained `v0.15.3`, published at
`2026-08-01T08:47:47Z`, when checked at `2026-08-02T06:29:47Z`; the official
tag list contained no `v0.15.4`. All four public site download assets for
Windows x64, macOS Apple Silicon, Linux x64, and Linux ARM64 resolved with
HTTP 200. The live `/`, `/download`, `/zh-TW/download`, `/zh-CN/download`,
`/about`, and `/docs/get-started` routes also returned HTTP 200, displayed
`v0.15.3`, and did not display `v0.15.4`; the applicable download surfaces
linked the expected release assets.

GitHub PRs #430 and #431 are evidence of mutable, unreleased repository work,
not a published release contract. No website correction is warranted until an
official release or tag exists and its artifacts can be verified. This
read-only observation made no website edit, push, PR, merge, deployment,
indexing request, validation submission, external publication, or analytics
mutation.

#### Acquisition hierarchy evidence guard

The local weekly report generator now prepares an explicit deterministic
`Acquisition Hierarchy Validation` section from the authenticated GSC
query-plus-page join. It keeps query impressions, joined owner impressions,
their visibility difference, observed owner pages, configured owner, and the
decision separate. A visible split or mismatch is only a routing-review signal,
not proof of cannibalization; a missing row is unavailable, not zero. Protected
locale rows are never pooled, and joined evidence below the existing
three-impression query-action floor remains `wait`.

Running the prepared generator against the latest preserved authenticated
`2026-07-03..2026-07-30` inputs produced one privacy-visible protected row:
`llm wiki 2.0` has one query impression and one joined impression on `/zh-TW`,
rather than the configured English LLM Wiki owner. No protected query is
visibly split across multiple pages. Because the only row is below the
diagnostic floor and the range predates the August 1 routing and localized
content changes, the hierarchy remains unproven rather than wrong. Do not edit
or create a page from this observation; rerun the same deterministic section
with the next authenticated query-page window.

#### Next non-overlapping content candidate

A bounded 2026-08-02 demand and coverage-gap pass rejected separate
`RAG vs LLM Wiki`, Codex/ChatGPT knowledge-base, and duplicate local/open-source
build URLs because the current LLM Wiki, MCP, and document-workflow owners
already cover those intents. The strongest clean gap is instead the
high-intent selection question: how to choose a reliable AI knowledge-base
tool.

The candidate has inspectable English Reddit, Simplified-Chinese V2EX, and
Taiwan-language result-shape evidence. OpenSEO's previously captured United
States `AI knowledge base` 880 and Taiwan `AI 知識庫` 210 remain in OpenSEO's
native third-party unit; authenticated GSC exposes no visible tool-selection
query and is not reported as zero. First-party Wenlan sources can prove the
proposed eight-test framework, and the asset remains useful without choosing
Wenlan. The clean provisional canonical family is
`/learn/choose-ai-knowledge-base-tool` plus zh-TW and zh-CN counterparts.

Decision: prepare locally; publication remains approval-gated. The current
Frozen Goal Contract has no fixed calendar article quota. The prior website
changes are production-verified and measuring, so the single preparation slot
is open and this non-overlapping candidate may enter local preparation now.
Push, PR creation, merge, deployment, request indexing, GSC validation, and
external publication remain separately gated. See
`docs/seo-audits/2026-08-02-ai-knowledge-base-tool-selection-gate.md`.

At `2026-08-02T06:57:00Z`, the candidate entered local preparation as
`EXP-2026-08-02-ai-knowledge-base-tool-selection`. It occupies the single
website preparation slot until local verification finishes. The bounded scope
is one English, zh-TW, and zh-CN canonical family plus same-locale Learn-hub
routing and deterministic SEO coverage. It must not alter the existing LLM
Wiki, document-build, source-backed trust, MCP, or Obsidian canonical owners.
No publication or external/shared-state action is approved by this local
preparation.

At `2026-08-02T07:17:04Z`, local preparation passed its deterministic and
rendered gates. The query-owner fixture keeps tool selection, document build,
LLM Wiki/category, source-backed maintenance, and Obsidian workflow intent on
distinct configured owners in English, zh-TW, and zh-CN. The complete SEO
suite passed 222/222, the i18n contract passed 63/63, TypeScript and the
production build passed, and the built technical checker verified 120 sitemap
URLs, 24 required canonicals, 24 checked pages, and no `FAQPage` across 124
built HTML pages. Fresh 393px and 1440px Chrome captures covered all three
routes; titles, hierarchy, CJK wrapping, code containment, CTA, and visible
FAQ passed, and each FAQ surface opened without browser errors.

This proves implementation separation, not search-market correctness. After
publication, each locale must independently reach its declared GSC exposure
floor. An above-floor visible query split or mismatch nominates routing review;
it does not justify preserving the new URL. The experiment remains the single
active website change. At `2026-08-02T07:41:27Z`, the user approved commit,
push, PR creation and merge, automatic Vercel deployment, and read-only
production verification of this exact scope. Request indexing, GSC validation,
external publication, paid action, synthetic event, analytics mutation, and
metric-definition changes remain excluded.

At `2026-08-02T07:54:17Z`, PR #118 squash-merged as
`4d4d805b82527bff1d312779047c7ee37408f855`; Vercel production completed at
`2026-08-02T07:55:01Z`. The live deployed checker passed 120 sitemap URLs, 24
key pages, six utility noindex headers, 120 sitemap-page `FAQPage` absence
checks, 25 redirects, six bridge-host redirects, and old-URL sitemap absence.
The experiment's publish and measurement boundary is that production
completion time; a later markup-only phrase-wrap correction does not move it.

Fresh Chrome device emulation then verified the exact 393px and 1440px CSS
viewports for all three routes. Each document's root and body scroll widths
equaled its viewport width, the title bounds stayed inside the content column,
the complete pages rendered, and the first visible FAQ opened with a non-empty
answer. The earlier apparent 393px clipping came from Chrome's command-line
window minimum, not the page. The stricter CJK pass did find that the new
localized route had not inherited the existing semantic-term wrapper, allowing
`驗收資料` / `验收资料` and `8 項` / `8 项` to split awkwardly. A focused
same-experiment correction now protects those phrases and `AI 知識庫` /
`AI 知识库`; its regression test first failed and now passes 63/63. This is a
render-only correction: visible text, metadata, canonical ownership, and the
measurement boundary remain unchanged. The correction must pass build,
technical, responsive, PR, deployment, and live verification gates before the
production readout is closed.

At `2026-08-02T08:15:04Z`, the focused correction passed its complete local
gate. The i18n contract passed 63/63, the full SEO suite passed 222/222,
TypeScript passed, the Goal verifier passed, the production build generated
223 static pages, and the built technical checker again passed 120 sitemap
URLs, 24 key pages, and `FAQPage` absence across 124 built HTML pages. The
built i18n route matrix passed 27 direct 200 routes and four intentional 404s.
Fresh exact-device Chrome captures covered all three routes at 393px and
1440px; both inline visual passes passed. The real component tree and shared
tokens remained intact, root/body width matched every viewport, complete-page
and FAQ-open states rendered, and `AI 知識庫` / `AI 知识库`, `知識庫` /
`知识库`, `驗收資料` / `验收资料`, and `8 項` / `8 项` no longer split
inside their semantic phrases. No visible copy, metadata, schema, canonical,
or experiment metric changed.

At `2026-08-02T08:21:25Z`, PR #119 squash-merged the focused correction as
`cde12da7226f8129822ae45fa61a8cc85592adce`; Vercel production completed at
`2026-08-02T08:22:13Z`. The deployed technical checker again passed 120
sitemap URLs, 24 key pages, six utility noindex headers, 120 sitemap-page
`FAQPage` absence checks, 25 redirects, six bridge-host redirects, and
old-URL sitemap absence. Fresh production Chrome device emulation covered all
three routes at exact 393px and 1440px CSS viewports. Root and body scroll
widths matched every viewport, titles stayed inside their content columns,
complete pages rendered, all first FAQs opened with non-empty answers, and the
four protected CJK phrase families remained intact. The correction is now
production-verified. The experiment remains live and measuring from its
original `2026-08-02T07:55:01Z` boundary; no indexing request, GSC validation,
external publication, paid action, synthetic event, analytics mutation, or
metric-definition change occurred.
