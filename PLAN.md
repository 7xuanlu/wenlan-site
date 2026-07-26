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
  `EXP-2026-07-25-context-loss-diagnostic-refresh`, live,
  production-verified, and measuring. It no longer consumes the single
  production slot. The AI agent memory types, Basic Memory, SuperLocalMemory,
  claude-mem, stale-memory, and MCP shared-memory changes remain live,
  production-verified, and measuring; they do not consume the slot.
- Website-affecting technical correction:
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
- Active experiments: 12.
- Execution mode: primary Codex coordinator with bounded, short-lived native
  Codex subagents when parallel work helps; do not use Superpowers SDD, per
  the user's token-cost preference.
- Existing weekly automation: `weekly-origin-seo-cleanup`, ACTIVE, Friday at
  09:00, independent worktree execution; no field was changed in this setup.
- Latest weekly action queue:
  `docs/seo-audits/2026-07-24-weekly-seo.md`, regenerated from the authenticated
  GSC and Vercel exports preserved under `/tmp/wenlan-seo`.
- Prior reviewed growth design:
  `docs/seo-audits/2026-07-18-exposure-first-growth-design.md`.
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
| GitHub total stars | 47 | 47 | GitHub REST `GET /repos/7xuanlu/wenlan`, read on 2026-07-26 | 53 |
| GSC rolling-28-day property impressions | 197 | 329 | Search Console API, `sc-domain:wenlan.app`, `2026-06-27..2026-07-24`; `/tmp/wenlan-seo/gsc-metadata.json` | 671 |
| Vercel rolling-28-day visitors | 323 | 1,406 | Vercel Web Analytics API, project `wenlan-site`, `2026-06-27..2026-07-24`; `/tmp/wenlan-seo/vercel-metadata.json` | 594 |

Supporting quality split for the same live range:

- GSC property totals: 7 clicks, 329 impressions.
- GSC visible-query totals: 1 click, 81 impressions.
- GSC query visibility gap: 6 clicks, 248 impressions.
- Visible-query non-brand impressions: 40 using the existing Searchfit group
  classification; this is a visible-row subset, not a property total, and the
  current `Other` bucket still contains noisy Wenlan misspellings.
- Vercel raw totals: 1,406 visitors and 1,612 pageviews.
- Vercel direct traffic: 262 visitors and 341 pageviews.
- Vercel qualified-source aggregate: 1,149 visitors summed across the existing
  separate search, AI, and GitHub referrer allowlist; this is not a
  deduplicated user count.
- Vercel reports 2 visitors and 2 pageviews for
  `/learn/ai-work-memory-vs-knowledge-base`; the page aggregate does not
  provide a source-to-page join.
- Unique acquisition-surface visitors and source-to-page sessions remain
  unavailable from the separate Vercel aggregates. Vercel custom events
  remain Pro/Enterprise-gated, and no authenticated Umami report was
  available, so GitHub outbound and CTA are not reported.
- Visible non-brand candidate clusters currently include Basic Memory, Claude
  Code memory, MCP memory, LLM wiki, and setup/troubleshooting. Valid problem
  clusters at bootstrap: 0. Valid problem clusters now: 1, because Claude Code
  native-memory boundaries and cross-session context passed the complete
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
   `docs/seo-audits/2026-07-18-trends-demand-discovery.md`; it validates
   `LLM wiki`, Claude/agent memory, modifier-qualified Obsidian, MCP memory,
   and modifier-qualified AI knowledge-base clusters. The clarified focus is
   agent-memory demand, a source-backed `LLM wiki for AI agents` product
   category, and Claude Code/Obsidian/MCP entry points. The next existing page
   is selected from fresh GSC evidence rather than Trends alone. Generic
   `knowledge base`, `AI memory`, `AI wiki`, and exact Taiwan `AI 知識庫` are
   not primary targets; `AI 筆記` is discovery-only until GSC or another clean
   high-intent observation connects it to Wenlan.
   A 2026-07-25 follow-up found independent direct-comparison surfaces from
   Mem0, Creed, and Hippo that include Basic Memory in a product-selection
   decision. Combined with the existing Basic Memory page's authenticated
   exposure and current-source drift, this clears the candidate gate for a
   bounded English refresh. Each external page or repository remains one
   inspectable observation, not keyword volume.
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
9. Prefer the existing `/learn/ai-coding-agent-loses-context` diagnostic
   before another net-new URL. Its page has authenticated exposure, repeated
   cross-session and compaction pain appears in independent Reddit threads and
   Anthropic issues, and current Claude Code memory/session documentation
   exposes accuracy drift in the older article.

### Current gap

- Stars: 53 more than the verified live observation.
- GSC property impressions: 671 more in the fixed final rolling window.
- Vercel visitors: 594 more in the fixed final rolling window.
- Measurement gaps: complete non-brand page impressions, unique
  acquisition-surface visitors, Umami CTA baseline, and verified setup success
  remain unavailable; none may be invented.

### Current experiment

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

### Immediate localized launch

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

The production slot is open. The
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

The same-task `wenlan-claude-memory-24h-readout` heartbeat is scheduled for
`2026-08-01T02:20:00Z`, safely after the Friday weekly SEO run and the latest
7-day boundary. It will batch the due zh-TW Obsidian, AI-work-memory versus
knowledge-base, Learn-hub, LLM-wiki, MCP shared-memory, stale-memory,
claude-mem, SuperLocalMemory, Basic Memory, AI-agent-memory-types, and
context-loss 7-day readouts. It must not record the Claude Code memory W2
readout before `2026-08-02T00:26:09Z`.

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

No additional English, zh-TW, or zh-CN candidate passed all five gates in the
latest Friday report or the bounded read-only demand-discovery follow-up.
Validated English problem clusters are already covered by live measurement
cohorts; zh-TW `AI 筆記` remains adjacent note-tooling demand without a clean
Wenlan intent; and no Simplified Chinese observation supports another
localized page. The minimum missing evidence is a later authenticated GSC
`query + page` window with a recurring non-brand cluster that no current page
answers cleanly; a localized candidate also needs matching locale-specific
evidence. Do not start a new experiment from unsupported Trends, Vercel, or
incomplete cohort signals. No indexing or non-website publication is
authorized.
Report GSC, Vercel, Umami, GitHub, and technical evidence only when available
in their native units. Reddit or other external publication, OSS submission,
request indexing, and GSC validation remain separately approval-gated.
