# Wenlan One-Month Exposure Growth Campaign

<!-- FROZEN-GOAL-CONTRACT:START -->
## Frozen Goal Contract

This section is immutable for the life of this Goal. Any change requires explicit
user approval and a corresponding verifier update. The strategy and campaign
state below this frozen section may change as evidence arrives.

### Goal, deadline, baselines, and final window

- Deadline: 2026-08-18.
- GitHub total stars >= 100 at the deadline.
- GSC `sc-domain:wenlan.app` rolling-28-day property impressions >= 1,000.
- Vercel Web Analytics rolling-28-day visitors >= 2,000 over the same range.
- Fixed progress baseline: GitHub total stars 47.
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
- GSC impressions, website visitors, GitHub outbound clicks, stars, and setup
  starts remain separate metrics. Do not create a composite score and do not
  claim causality among them.
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

- The acquisition center for new experiments is AI knowledge bases, LLM wiki,
  source-backed wiki, knowledge bases for AI agents, and modifier-qualified
  Obsidian or knowledge-base workflows.
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

- Goal status: active. At `2026-07-24T18:37:21Z`, the user approved the
  throughput correction: measurement cohorts no longer consume the production
  slot, and there is no fixed calendar article quota. Threads and other
  owned-social work remain outside this SEO-only campaign.
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
  `EXP-2026-07-29-docs-github-acquisition` is active in the single
  production slot. It adds one bounded, tracked open-source module to the
  existing English Docs article rail. The aligned baseline keeps
  `/docs/configuration` at 774 Vercel visitors and 850 pageviews, while GSC
  separately reports 12 impressions, 0 clicks, and average position 15.8.
  GitHub public REST reports 46 stars, and authenticated Umami events remain
  unavailable rather than zero. The user approved local preparation, commit,
  push, PR creation, merge, automatic Vercel deployment, read-only production
  verification, and the later GSC inspection/indexing batch at
  `2026-07-30T06:57:46Z`. No GSC validation, synthetic event, external post,
  OSS submission, paid acquisition, analytics account mutation, or metric
  change is approved.
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
- Active experiments: 17.
- Execution mode: primary Codex coordinator with bounded, short-lived native
  Codex subagents when parallel work helps; do not use Superpowers SDD, per
  the user's token-cost preference.
- Existing weekly automation: `weekly-origin-seo-cleanup`, ACTIVE, Friday at
  09:00, independent worktree execution; no field was changed in this setup.
- Latest completed Friday weekly action queue:
  `docs/seo-audits/2026-07-24-weekly-seo.md`, regenerated from the authenticated
  GSC and Vercel exports preserved under `/tmp/wenlan-seo`.
- Latest aligned inter-window action view:
  `/tmp/wenlan-seo-2026-07-28/weekly-seo-corrected.md`, generated from the
  authenticated `2026-06-28..2026-07-25` GSC and Vercel inputs through the
  corrected acquisition classifier. Its durable interpretation is
  `docs/seo-audits/2026-07-29-unified-acquisition-observation.md`.
- Prior reviewed growth design:
  `docs/seo-audits/2026-07-18-exposure-first-growth-design.md`.
- Latest deployment observation: PR #89 merged at
  `2026-07-27T05:28:59Z` as
  `a8698b1629e88e4f48949fbc3ec96046e4e39f81`; Vercel production completed at
  `2026-07-27T05:29:47Z`. The deployed audit passed 110 sitemap URLs, 14 key
  pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25
  redirects, six bridge-host redirects, and legacy-URL exclusions. The live
  LLM-wiki target retained its exact canonical, original and modified dates,
  implementation-guide sections, and five contextual inbound links.
- Latest source-release observation: refreshed at
  `2026-07-27T03:02:34Z`. Wenlan `v0.15.0` was published at
  `2026-07-26T05:13:54Z` with native Windows x64, macOS Apple silicon, Linux
  x64, and Linux ARM64 runtime archives. The tagged Windows package contains
  the CLI, daemon, MCP connector, ONNX Runtime, and Vulkan loader and is now
  eligible for a direct website download. wenlan-app's published release
  remains `v0.14.0`; its later Windows-compatible main work does not establish
  a released Windows desktop app. Evidence and the production-verified
  correction are in
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
| GitHub total stars | 47 | 46 | GitHub REST `GET /repos/7xuanlu/wenlan`, read on 2026-07-30 | 54 |
| GSC rolling-28-day property impressions | 197 | 395 | Search Console API, `sc-domain:wenlan.app`, `2026-06-28..2026-07-25`; `/tmp/wenlan-seo-2026-07-28/gsc-metadata.json` | 605 |
| Vercel rolling-28-day visitors | 323 | 1,420 | Vercel Web Analytics API, project `wenlan-site`, `2026-06-28..2026-07-25`; `/tmp/wenlan-seo-2026-07-28/vercel-metadata.json` | 580 |

Supporting quality split for the same live range:

- GSC property totals: 8 clicks, 395 impressions.
- GSC visible-query totals: 2 clicks, 92 impressions.
- GSC query visibility gap: 6 clicks, 303 impressions.
- Visible-query non-brand impressions: 48 using the existing Searchfit group
  classification; this is a visible-row subset, not a property total, and the
  current `Other` bucket still contains noisy Wenlan misspellings.
- Vercel raw totals: 1,420 visitors and 1,628 pageviews.
- Vercel direct traffic: 270 visitors and 351 pageviews.
- Vercel qualified-source aggregate: 1,152 visitors summed across the existing
  separate search, AI, and GitHub referrer allowlist; this is not a
  deduplicated user count.
- Vercel reports 2 visitors and 2 pageviews for
  `/learn/ai-work-memory-vs-knowledge-base`; the page aggregate does not
  provide a source-to-page join.
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

1. Protect the contract and ledger before any campaign action.
2. Contract approval received on `2026-07-18T22:06:21Z`.
3. After approval, read the latest Friday weekly report rather than duplicating
   its GSC, indexing, or technical work.
4. Build the first candidate queue from inspectable Google Trends, Reddit,
   GitHub issue/discussion, OSS documentation/directory, and SERP observations,
   preserving native units and provenance.
   The first multi-group Trends capture and interpretation is recorded in
   `docs/seo-audits/2026-07-18-trends-demand-discovery.md`. It contains
   historical observations across wiki, knowledge-base, Obsidian, and memory
   families; those observations keep their original units but no longer share
   one priority tier. On `2026-07-29`, the user corrected the acquisition
   center to AI knowledge bases, LLM wiki,
   source-backed wiki, and Obsidian or knowledge-base-adjacent workflows.
   Memory remains enabling product infrastructure and supporting vocabulary;
   generic memory demand no longer nominates the next acquisition asset.
   The next candidate must be selected from fresh evidence for `AI knowledge
   base`, `LLM wiki`, `source-backed wiki`, `knowledge base for AI agents`,
   or a modifier-qualified Obsidian intent. For Obsidian, the currently
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
5. Prefer one existing indexed acquisition page with impressions for the first
   bounded experiment. Consider a net-new search asset only if the complete
   candidate gate passes, the preceding website change is production-verified,
   and the intent does not overlap an existing page.
6. Prepare local changes and verifier evidence. Ask for approval only at the
   frozen external/shared-state boundaries.
7. Keep every launched cohort on its predeclared readout schedule, but do not
   treat measurement as a reason to stop preparing or shipping the next
   eligible website change.
8. Continue a read-only net-new article coverage-gap audit
   from the cleaned Trends, related-query, Reddit, OSS, SERP, and current-site
   evidence. This may nominate one later experiment but does not start it.
   The audit now treats a missing localized counterpart as a real coverage gap
   when that locale has inspectable demand evidence. It queued the existing
   Obsidian comparison for a zh-TW localization in
   `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`; generic
   `AI 筆記` remains supporting vocabulary rather than the article's target.
9. Prefer an existing indexed AI knowledge-base, LLM-wiki, or
   source-backed-wiki page before another net-new URL. Treat Obsidian as an
   integration bridge when an inspectable modifier-qualified Trends query,
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

- Stars: 54 more than the verified live observation.
- GSC property impressions: 605 more in the fixed final rolling window.
- Vercel visitors: 580 more in the fixed final rolling window.
- Legacy migration diagnostic: `sc-domain:useorigin.app` still has
  516 impressions and 5 clicks in the same aligned range. Those values are
  not added to the Wenlan Goal metric.
- Measurement gaps: complete non-brand page impressions, unique
  acquisition-surface visitors, Umami CTA baseline, and verified setup success
  remain unavailable; none may be invented.

### Current experiment

`EXP-2026-07-29-docs-github-acquisition` is active in the single production
slot. The shared English Docs slug renderer currently has no tracked
repository path even though `/docs/configuration` received 774 Vercel
visitors and 850 pageviews in the aligned complete range. The route
separately has 12 GSC impressions, 0 clicks, and average position 15.8.

The bounded change adds one quiet open-source module below the existing Docs
table of contents and extends only the bounded placement union with
`docs-article`. It sends the existing `github_outbound` event to configured
Umami with locale `en`, context `setup`, and destination category `github`.
It changes no URL, metadata, canonical, sitemap entry, Docs content,
structured-data type, or `FAQPage` policy.

The experiment requires 50 post-deploy Vercel visitors to English Docs slug
routes before interpretation. Authenticated Umami must show at least five
`docs-article` outbound events by 7d for success; 100 exposed visitors with
zero authenticated events is failure. Missing exposure or unavailable Umami
remains inconclusive. GitHub stars remain a separate public REST observation
and are never attributed causally to the CTA.

The complete gate, source-native baseline, verification contract, and user
approval are recorded in
`docs/seo-audits/2026-07-29-docs-github-acquisition-prelaunch.md` and the
append-only ledger. The user approved commit, push, PR creation, merge,
automatic Vercel deployment, read-only production verification, and the
later GSC inspection/indexing batch at `2026-07-30T06:57:46Z`.

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
knowledge-base, English Learn-hub, English LLM-wiki, MCP shared-memory, and
stale-memory changes remain production-verified measurement cohorts; they do
not consume the production slot.

### Current technical correction

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

#### Acquisition and migration decision

The active production decision is the Docs-to-GitHub bridge described in the
Current experiment section. After it is production-verified and releases the
slot, the user-approved next website change refreshes the English, zh-TW, and
zh-CN Learn knowledge-base acquisition surfaces while preserving existing
URLs. Do not start the second production change before the first is verified.

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

The Learn-hub, LLM-wiki, MCP shared-memory, stale-memory, claude-mem,
SuperLocalMemory, and Basic Memory 24-hour readouts were completed at
`2026-07-26T01:47:53Z`. Their production gates passed, but the latest
authenticated GSC and complete Vercel range ends before deployment, so each
result remains pending. Run their 7-day readouts after their predeclared
times from `2026-07-31T19:18:03Z` through `2026-08-01T01:04:56Z`, using the
Friday weekly evidence rather than duplicating its pipeline.

The same-task `wenlan-claude-memory-24h-readout` heartbeat completed the
actual 24-hour zh-CN LLM-wiki readout and the user-requested early partial
English Obsidian observation at `2026-07-30T05:39:51Z`. Reuse that same
heartbeat at `2026-08-01T02:20:00Z`, safely after the Friday weekly SEO run
and the latest 7-day boundary. That batch covers the due zh-TW Obsidian,
AI-work-memory versus knowledge-base, Learn-hub, LLM-wiki, MCP shared-memory,
stale-memory, claude-mem, SuperLocalMemory, Basic Memory,
AI-agent-memory-types, and context-loss 7-day readouts. It must not record the
Claude Code memory W2 readout before `2026-08-02T00:26:09Z`.

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

No additional English, zh-TW, or zh-CN content experiment is started by this
indexing action. Reassess the candidate gate under the corrected AI
knowledge-base and wiki center rather than carrying forward the old
memory-first queue. A localized candidate still needs matching
locale-specific evidence. Targeted indexing for the four URLs above was
approved and completed; any additional indexing, non-website publication, or
GSC validation remains separately approval-gated.
Report GSC, Vercel, Umami, GitHub, and technical evidence only when available
in their native units. Reddit or other external publication, OSS submission,
request indexing, and GSC validation remain separately approval-gated.
