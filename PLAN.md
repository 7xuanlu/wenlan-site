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
- Start at most one experiment in each weekly data window. Before its
  predeclared readout, the default decision is wait.
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

- Goal status: resumed and active after the user explicitly approved push,
  merge, and deploy for the current experiment at `2026-07-19T00:22:07Z`.
- Goal deadline: 2026-08-18.
- Contract approval: approved by the user in this Codex task on
  `2026-07-18T22:06:21Z`.
- Website-affecting experiment:
  `EXP-2026-07-18-claude-code-memory-refresh`, published to production at
  `2026-07-19T00:26:09Z` (`2026-07-18` America/Los_Angeles).
- Active experiments: 1.
- Execution mode: primary Codex coordinator with bounded, short-lived native
  Codex subagents when parallel work helps; do not use Superpowers SDD, per
  the user's token-cost preference.
- Existing weekly automation: `weekly-origin-seo-cleanup`, ACTIVE, Friday at
  09:00, independent worktree execution; no field was changed in this setup.
- Latest committed weekly action queue:
  `docs/seo-audits/2026-07-17-weekly-seo.md`.
- Prior reviewed growth design:
  `docs/seo-audits/2026-07-18-exposure-first-growth-design.md`.
- Last production observation: `2026-07-19T00:28:15Z`; the refreshed route
  returned HTTP 200 with its canonical, `index, follow`, visible source-backed
  copy, and original/modified Article dates; deployed robots, 108 sitemap
  URLs, 13 key pages, noindex headers, structured-data policy, redirects,
  bridge-host redirects, and legacy-URL exclusions passed.
- Google Trends retry: `Claude Code memory` and `MCP memory server`, US, past
  12 months, captured `2026-07-19T00:21:54Z`; the official public endpoint
  again returned HTTP 429, so no 0–100 index enters the decision.
- Next evidence-window wake: one-time same-task heartbeat
  `wenlan-claude-memory-24h-readout`, Sunday `2026-07-19 18:00`
  America/Los_Angeles. The independent Friday weekly SEO automation remains
  unchanged.

### Fixed baseline and live provenance

The fixed baseline remains the campaign comparison anchor. The live observation
is recorded separately because rolling windows and source backfill can change
after the anchor is frozen.

| Metric | Fixed baseline | Verified live observation | Provenance | Gap to target from live observation |
| --- | ---: | ---: | --- | ---: |
| GitHub total stars | 47 | 47 | GitHub REST `GET /repos/7xuanlu/wenlan`, captured `2026-07-18T21:14:50Z` | 53 |
| GSC rolling-28-day property impressions | 197 | 197 | Search Console API, `sc-domain:wenlan.app`, `2026-06-20..2026-07-17`; same-range evidence restored `2026-07-18T23:30Z` in `/tmp/wenlan-seo/gsc-metadata.json` | 803 |
| Vercel rolling-28-day visitors | 323 | 350 | Vercel Web Analytics API, project `wenlan-site`, `2026-06-20..2026-07-17`, fetched `2026-07-18T23:30:11.388Z`; `/tmp/wenlan-seo/vercel-metadata.json` | 1,650 |

Supporting quality split for the same live range:

- GSC property totals: 6 clicks, 197 impressions.
- GSC visible-query totals: 0 clicks, 44 impressions.
- GSC query visibility gap: 6 clicks, 153 impressions.
- Visible-query non-brand impressions: 26 using the existing Searchfit group
  classification; this is a visible-row subset, not a property total.
- Visible non-brand candidate clusters currently include Basic Memory, Claude
  Code memory, MCP memory, LLM wiki, and setup/troubleshooting. Valid problem
  clusters at bootstrap: 0. Valid problem clusters now: 1, because Claude Code
  native-memory boundaries and cross-session context passed the complete
  candidate gate in
  `docs/seo-audits/2026-07-18-growth-candidate-queue.md`.
- Page rows with impressions are preserved in
  `/tmp/wenlan-seo/gsc-pages.csv`. The authenticated query-plus-page capture
  in `/tmp/wenlan-seo/gsc-query-pages.json` exposes 11 of the target page's 23
  impressions; 9 visible impressions belong to the five-query non-brand
  Claude-memory cluster at 50.0 impression-weighted average position. Keep the
  remaining 12-impression page-query visibility gap explicit.
- Vercel raw visitors: 350.
- Vercel direct visitors: 197.
- Vercel qualified-source visitor aggregate: 154 across the explicit current
  allowlist of search, AI, and GitHub referrers. This is a non-deduplicated
  referrer aggregate, not a source-to-page session count or a value that can be
  added to direct visitors.
- Vercel acquisition-surface visitors: not safely deduplicated by the current
  per-path aggregate API. Keep the per-path rows in
  `/tmp/wenlan-seo/vercel-pages.csv` and do not invent a unique total.
- Vercel custom CTA events: account-gated because the current plan requires Pro
  or Enterprise.
- Umami UTM, outbound, and CTA baseline: not available to this run.
- Setup starts: no reliable website-to-success measurement; lagging and
  non-gating.

### Current strategy

1. Protect the contract and ledger before any campaign action.
2. Contract approval received on `2026-07-18T22:06:21Z`.
3. After approval, read the latest Friday weekly report rather than duplicating
   its GSC, indexing, or technical work.
4. Build the first candidate queue from inspectable Google Trends, Reddit,
   GitHub issue/discussion, OSS documentation/directory, and SERP observations,
   preserving native units and provenance.
5. Prefer one existing indexed acquisition page with impressions for the first
   bounded experiment. Consider a net-new search asset only if the complete
   candidate gate passes and the 14-day cap permits it.
6. Prepare local changes and verifier evidence. Ask for approval only at the
   frozen external/shared-state boundaries.
7. Wait for the predeclared readout instead of stacking edits.

### Current gap

- Stars: 53 more than the verified live observation.
- GSC property impressions: 803 more in the fixed final rolling window.
- Vercel visitors: 1,650 more in the fixed final rolling window.
- Measurement gaps: complete non-brand page impressions, unique
  acquisition-surface visitors, Umami CTA baseline, and verified setup success
  remain unavailable; none may be invented.

### Current experiment

`EXP-2026-07-18-claude-code-memory-refresh` is approved, published, and active
for the `2026-07-18..2026-07-24` data window. It refreshes the existing English
`/learn/claude-code-memory` page with a native-memory-first layer map, current
official limits, deterministic inspection guidance, and the preferred direct
Wenlan plugin path. It creates no new URL and no speculative Mandarin
translation. Its qualified-exposure readout is guarded by the authenticated
five-query target-page baseline recorded in the pre-publish correction.
The publish date is `2026-07-18` America/Los_Angeles
(`2026-07-19T00:26:09Z`). Indexing has not been manually confirmed, and no
indexing request was submitted.

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
Do not start or rewrite another experiment. Wait for the one-time 24h heartbeat
and then the predeclared 7d readout; report GSC, Vercel, Umami, GitHub, and
technical evidence only when available in their native units. Reddit or other
external publication, OSS submission, request indexing, and GSC validation
remain separately approval-gated.
