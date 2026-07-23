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
   fail when any protected Goal clause or experiment cap is missing or
   violated.
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
- Keep at most two active experiments.
- Start at most one net-new search asset in any 14-calendar-day period.
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

- Goal status: active. At `2026-07-23T15:14:19Z`, the user rejected delaying an
  already verified and approved website asset for a reporting-window boundary
  and directed the controller to merge it immediately. Threads and other
  owned-social work remain outside this SEO-only campaign.
- The weekly window is now a reporting boundary, not a publish gate. The
  maximum-two-active and 14-day net-new caps remain protected.
- Draft PR: `https://github.com/7xuanlu/wenlan-site/pull/58` from
  `agent/zhtw-obsidian-seo`; GitHub reports the branch mergeable and clean.
  Vercel preview checks passed, but no production merge or deploy has occurred.
- Goal deadline: 2026-08-18.
- Contract approval: approved by the user in this Codex task on
  `2026-07-18T22:06:21Z`.
- Website-affecting experiment:
  `EXP-2026-07-23-zhtw-obsidian-localization`, approved for immediate merge
  and production deploy.
- Active experiments: 2.
- Execution mode: primary Codex coordinator with bounded, short-lived native
  Codex subagents when parallel work helps; do not use Superpowers SDD, per
  the user's token-cost preference.
- Existing weekly automation: `weekly-origin-seo-cleanup`, ACTIVE, Friday at
  09:00, independent worktree execution; no field was changed in this setup.
- Latest committed weekly action queue:
  `docs/seo-audits/2026-07-17-weekly-seo.md`.
- Prior reviewed growth design:
  `docs/seo-audits/2026-07-18-exposure-first-growth-design.md`.
- Last production observation: `2026-07-20T00:35:13Z`; the refreshed route
  returned HTTP 200 with its canonical, `index, follow`, visible source-backed
  copy, and original/modified Article dates; deployed robots, 108 sitemap
  URLs, 13 key pages, noindex headers, structured-data policy, redirects,
  bridge-host redirects, and legacy-URL exclusions passed. The rendered
  English route retained its title, H1, eight H2 sections, install commands,
  Article JSON-LD, and no document-level horizontal overflow or console
  warnings. The deployed key-page check separately covered English, zh-TW,
  and zh-CN acquisition surfaces.
- Google Trends demand-discovery gate: resolved for the current decision at
  `2026-07-19T02:47:01Z` through signed-in official Explore UI CSV exports.
  Seventeen timeline comparisons and nine related-query exports cover
  Worldwide, US, and Taiwan; English, Traditional Chinese, and Simplified
  Chinese terms; 12 months and one five-year range. Raw request-relative
  `0–100` values and metadata remain under the
  `/tmp/wenlan-seo-demand/2026-07-18/trends/` and
  `/tmp/wenlan-seo-demand/2026-07-19/trends/` capture directories;
  interpreted decisions are in
  `docs/seo-audits/2026-07-18-trends-demand-discovery.md`. The official
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
- The `wenlan-claude-memory-24h-readout` heartbeat is ACTIVE for the 7-day
  readout and next launch gate. Its prompt is website-SEO-only and carries the
  2026-07-23 website approval. The independent Friday
  `weekly-origin-seo-cleanup` automation remains ACTIVE and unchanged.

### Fixed baseline and live provenance

The fixed baseline remains the campaign comparison anchor. The live observation
is recorded separately because rolling windows and source backfill can change
after the anchor is frozen.

| Metric | Fixed baseline | Verified live observation | Provenance | Gap to target from live observation |
| --- | ---: | ---: | --- | ---: |
| GitHub total stars | 47 | 47 | GitHub REST `GET /repos/7xuanlu/wenlan`, captured during the `2026-07-22` America/Los_Angeles campaign check | 53 |
| GSC rolling-28-day property impressions | 197 | 264 | Search Console API, `sc-domain:wenlan.app`, `2026-06-24..2026-07-21`; `/tmp/wenlan-seo-live-2026-07-22/gsc-metadata.json` | 736 |
| Vercel rolling-28-day visitors | 323 | 1,142 | Vercel Web Analytics API, project `wenlan-site`, `2026-06-24..2026-07-21`; `/tmp/wenlan-seo-live-2026-07-22/vercel-metadata.json` | 858 |

Supporting quality split for the same live range:

- GSC property totals: 6 clicks, 264 impressions.
- GSC visible-query totals: 0 clicks, 64 impressions.
- GSC query visibility gap: 6 clicks, 200 impressions.
- Visible-query non-brand impressions: 32 using the existing Searchfit group
  classification; this is a visible-row subset, not a property total.
- Vercel raw totals: 1,142 visitors and 1,313 pageviews.
- Vercel direct traffic: 242 visitors and 305 pageviews.
- Vercel qualified-source aggregate: 912 visitors summed across the existing
  separate search, AI, and GitHub referrer allowlist; this is not a
  deduplicated user count.
- Vercel target-page aggregate: 7 visitors and 19 pageviews for
  `/learn/claude-code-memory`.
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
  `/tmp/wenlan-seo-live-2026-07-22/gsc-pages.csv`. The pre-publish
  authenticated query-plus-page capture in
  `/tmp/wenlan-seo/gsc-query-pages.json` exposes 11 of the target page's 23
  baseline impressions; 9 visible impressions belong to the five-query
  non-brand Claude-memory cluster at 50.0 impression-weighted average
  position. Keep the remaining 12-impression page-query visibility gap
  explicit.
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
- GSC: no post-publish complete-day observation was available at the early
  heartbeat. The latest committed weekly report ends before publication, so
  no Search result was inferred.

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
   category, and Claude Code/Obsidian/MCP entry points. The current Claude Code
   memory experiment remains the only active edit; the next existing page is
   selected from fresh GSC evidence rather than Trends alone. Generic
   `knowledge base`, `AI memory`, `AI wiki`, and exact Taiwan `AI 知識庫` are
   not primary targets; `AI 筆記` is discovery-only until GSC or another clean
   high-intent observation connects it to Wenlan.
5. Prefer one existing indexed acquisition page with impressions for the first
   bounded experiment. Consider a net-new search asset only if the complete
   candidate gate passes and the 14-day cap permits it.
6. Prepare local changes and verifier evidence. Ask for approval only at the
   frozen external/shared-state boundaries.
7. Wait for the predeclared readout instead of stacking edits.
8. During the wait, continue a read-only net-new article coverage-gap audit
   from the cleaned Trends, related-query, Reddit, OSS, SERP, and current-site
   evidence. This may nominate one later experiment but does not start it.
   The audit now treats a missing localized counterpart as a real coverage gap
   when that locale has inspectable demand evidence. It queued the existing
   Obsidian comparison for a zh-TW localization in
   `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`; generic
   `AI 筆記` remains supporting vocabulary rather than the article's target.

### Current gap

- Stars: 53 more than the verified live observation.
- GSC property impressions: 736 more in the fixed final rolling window.
- Vercel visitors: 858 more in the fixed final rolling window.
- Measurement gaps: complete non-brand page impressions, unique
  acquisition-surface visitors, Umami CTA baseline, and verified setup success
  remain unavailable; none may be invented.

### Current experiment

`EXP-2026-07-23-zhtw-obsidian-localization` is approved for immediate
production launch. It publishes the evidence-backed zh-TW counterpart of the
existing English Obsidian comparison, adds contextual links from the two
existing zh-TW wiki pages, and keeps the unsupported zh-CN route out of static
params, sitemap, and hreflang.

The earlier English Claude Code memory refresh remains active and measuring.
Its readouts continue independently; it no longer blocks another verified
website asset from reaching production.

### Immediate localized launch

The next eligible localized candidate is a zh-TW counterpart of the existing
English `/learn/wenlan-vs-obsidian-ai-memory` page, with modifier-qualified
Obsidian, Claude Code, MCP, and agent-memory intent. It passed the candidate
gate from Taiwan Trends direction, repeated Reddit and OSS workflows,
Traditional Chinese corroboration, the English page's current GSC impressions,
and a clean zh-TW route gap.

The candidate is active and approved for immediate merge. Local preparation completed at
`2026-07-23T06:39:32Z`: the localized Learn registry, static params, sitemap,
locale switching, and hreflang now enumerate actual per-locale availability;
the zh-TW article includes visible maintained sources; and the nonexistent
zh-CN route remains a verified 404 without a sitemap or alternate entry.

The immutable experiment fields, source-native baseline, and exposure lane are
recorded in
`docs/seo-audits/2026-07-23-zhtw-obsidian-prelaunch.md`. The website exposure
lane consists of the localized Learn hub, sitemap/hreflang, and contextual
links from the two existing zh-TW wiki pages. Threads and other owned-social
work are excluded from this campaign.

Website push, merge, and production deploy were explicitly approved by the
user on `2026-07-23`. The user then explicitly rejected the reporting-window
delay, so PR #58 should merge immediately; its production completion and
technical evidence must be appended afterward.

### Working cadence

- Evidence waiting is not production waiting. While one experiment measures,
  prepare the next candidate, its tests, and its verification evidence
  locally.
- Read the Friday report for measurement and follow-up priorities; do not use
  its calendar boundary to delay a verified, approved website asset.
- Keep the frozen two-active-experiment and 14-day net-new caps. This is a
  rolling content system, not an article quota.
- Do not create a zh-CN counterpart from Taiwan-only evidence.

### Execution phases

- [x] Phase 0: verify repo, active Goal, weekly automation, and authenticated
  baseline provenance.
- [x] Phase 0: create the frozen contract, append-only ledger, and deterministic
  verifier with RED-to-GREEN tests.
- [x] Phase 1: receive user approval for the protected Goal contract.
- [x] Phase 2: refresh the candidate queue from the next evidence window and
  select no more than one experiment for that weekly data window.
- [x] Phase 3: prepare the approved local experiment change, verify technical
  and locale quality, and stop at any external/shared-state approval boundary.
- [ ] Phase 4: append 24h, 7d, W2, W4, and W8 readouts as they become due;
  wait when minimum exposure has not been reached.
- [ ] Phase 5: read the fixed final window ending 2026-08-17, delayed only for
  GSC reporting latency, then deliver the terminal decision.

### Next decision

The one-page English refresh for
`EXP-2026-07-18-claude-code-memory-refresh` is live and production-verified.
The actual 24-hour Claude Code memory readout is inconclusive, and its current
target-page GSC row remains 23 impressions, 0 clicks, and 38.7 average
position. That readout continues independently. The clean zh-TW website
candidate is draft PR #58 and is approved for immediate merge and production
deploy. The next action is merge, verify production, and append the production
evidence; no Friday-calendar wait remains.
Report GSC, Vercel, Umami, GitHub, and technical evidence only when available
in their native units. Reddit or other external publication, OSS submission,
request indexing, and GSC validation remain separately approval-gated.
