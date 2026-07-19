# Wenlan Growth Experiment Ledger

This file is append-only. Never delete, reorder, or rewrite a historical
record. Correct an earlier statement by appending a new correction or readout
record with a later timestamp and the same experiment ID. Git history is the
audit trail; the verifier enforces record shape and campaign caps but does not
replace review of destructive history edits.

Before appending a record:

1. read `PLAN.md`;
2. run `pnpm seo:goal:check`;
3. stop if it fails;
4. keep external demand provenance separate from authenticated GSC inputs;
5. do not perform an approval-gated external action.

## Experiment-start record schema

Every started experiment uses one immutable block with these exact fields:

```text
<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-YYYY-MM-DD-short-name

- Record type: experiment-start
- Experiment ID: EXP-YYYY-MM-DD-short-name
- Status: active
- Data window: YYYY-MM-DD..YYYY-MM-DD
- Asset class: refresh
- Launched: YYYY-MM-DD
- Hypothesis: one falsifiable sentence
- Candidate evidence: inspectable sources, dates, locale/geography, and native units
- Baseline: GSC, Vercel, GitHub, and optional Umami measures kept separate
- Change: one bounded change
- Publish date: YYYY-MM-DD or not-published
- Index date: YYYY-MM-DD or not-indexed
- Minimum exposure: positive threshold and native unit
- Success criteria: predeclared
- Failure criteria: predeclared
- Stop criteria: predeclared
- 24h readout: pending or observed evidence
- 7d readout: pending or observed evidence
- W2 readout: pending or observed evidence
- W4 readout: pending or observed evidence
- W8 readout: pending or observed evidence
- Result: pending, success, failure, or inconclusive
- Decision: wait, scale, refresh, merge, stop, localize, or extend
- Next step: one concrete next action or wait condition
<!-- EXPERIMENT-RECORD:END -->

```

Allowed start statuses are `approved`, `active`, `live`, `measuring`,
`extended`, `decided`, `inconclusive`, and `stopped`. The active cap counts
`approved`, `active`, `live`, `measuring`, and `extended`.

Allowed asset classes are `refresh`, `integration-hub`,
`diagnostic-recipe`, and `net-new-search`.

Each data window contains seven complete dates, inclusive, on the campaign
cadence anchored at `2026-07-18..2026-07-24` and advancing in seven-day
increments. At most one experiment may launch in a data window, at most two
experiments may be active, and net-new search assets must launch at least 14
calendar days apart. No experiment may launch after the frozen
`2026-08-18` campaign deadline.

## Readout and correction records

Readouts and corrections are appended after the start record. They restate the
experiment ID, observation timestamp, native metric units, result, decision,
and next step. They never overwrite the start record. The verifier applies the
latest appended status for each experiment when enforcing the two-active cap.
A readout must follow its experiment-start record. Its `Observed at` value is a
real ISO-8601 UTC calendar timestamp, cannot predate launch, and must strictly
increase for that experiment.

```text
<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-YYYY-MM-DD-short-name at YYYY-MM-DDTHH:MM:SSZ

- Record type: experiment-readout
- Experiment ID: EXP-YYYY-MM-DD-short-name
- Observed at: YYYY-MM-DDTHH:MM:SSZ
- Readout: 24h, 7d, W2, W4, W8, or correction
- Status: active, live, measuring, extended, decided, inconclusive, or stopped
- Evidence: native-unit observations separated by source
- Result: pending, success, failure, or inconclusive
- Decision: wait, scale, refresh, merge, stop, localize, or extend
- Next step: one concrete next action or wait condition
<!-- EXPERIMENT-RECORD:END -->

```

## Ledger

### 2026-07-18T21:14:56.537Z — control-plane bootstrap

- Record type: campaign-bootstrap
- Goal deadline: 2026-08-18
- Contract status: pending user review
- Experiments started: 0
- Active experiments: 0
- Website-affecting changes: none
- External actions: none
- Next step: review `PLAN.md`, `EXPERIMENTS.md`, the verifier, and its tests.

### 2026-07-18T22:06:21Z — contract approval

- Record type: campaign-approval
- Contract status: approved by the user in this Codex task
- Experiments started: 0
- Active experiments: 0
- Website-affecting changes: none
- External actions: none
- Execution mode: primary Codex agent inline; no SDD or subagents
- Next step: build the provenance-backed demand candidate queue and apply all
  five candidate-gate conditions before recording an experiment.

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-18-claude-code-memory-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-18-claude-code-memory-refresh
- Status: approved
- Data window: 2026-07-18..2026-07-24
- Asset class: refresh
- Launched: 2026-07-18
- Hypothesis: A native-memory-first, source-current refresh of the existing indexed Claude Code memory page will earn more qualified search exposure and make the route more useful without adding another URL.
- Candidate evidence: `CAND-2026-07-18-claude-code-memory-layer` in `docs/seo-audits/2026-07-18-growth-candidate-queue.md`; authenticated GSC and Vercel rows; inspectable Reddit discussions; Claude Code issues #27298 and #34556; current official Claude Code memory docs; current Wenlan README at commit `88fc7df1a242a1f2dbc33b6e76c2af4c39a1748a`.
- Baseline: GSC page row for `2026-06-20..2026-07-17` is 23 impressions, 0 clicks, and 38.7 average position; visible Claude-memory query rows total 5 impressions but are not joined to the page; Vercel page aggregate is 3 visitors and 3 pageviews; GitHub total stars are 47; Umami and Vercel custom CTA events are unavailable/account-gated.
- Change: Refresh only `/learn/claude-code-memory` in English with the documented Claude Code native-memory layers and limits, deterministic `/memory` inspection, the current preferred direct Wenlan plugin path, and an explicit native-first boundary; create no new URL and no Mandarin translation.
- Publish date: not-published
- Index date: not-indexed
- Minimum exposure: 25 GSC page impressions in the first 28 complete days after the refreshed page is first confirmed crawled or indexed
- Success criteria: After minimum exposure, the page earns at least 2 GSC clicks or improves average position by at least 10 positions from the 38.7 baseline; report clicks, impressions, position, Vercel visitors, GitHub outbound, and stars separately.
- Failure criteria: After minimum exposure and 28 complete post-index days, the page has 0 GSC clicks and average position is 38.7 or worse; if minimum exposure is not reached, mark the result inconclusive instead.
- Stop criteria: Stop or hold the experiment if a source fact becomes invalid, any canonical/indexing/robots/noindex/redirect/structured-data regression appears, a second controller edits the same page, or the required publish/distribution approval is not granted.
- 24h readout: pending — after publish, verify the live page, canonical, indexability, structured data, links, and separate Vercel page/referrer observations without judging SEO success
- 7d readout: pending — report GSC latency/index state, page impressions/clicks/position when available, Vercel page visitors, GitHub outbound when available, and total stars separately
- W2 readout: pending — apply the minimum-exposure rule and inspect English, zh-TW, and zh-CN surfaces for regressions without speculative localization
- W4 readout: pending — evaluate the predeclared success/failure criteria in native units and keep source metrics separate
- W8 readout: pending — post-campaign follow-up if still useful; scale, refresh, merge, stop, or mark inconclusive without changing the fixed Goal window
- Result: pending
- Decision: wait
- Next step: prepare and verify the local one-page refresh, then request explicit approval before deploy, push/merge, distribution, indexing, or validation
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-18T23:24:28Z — execution-mode correction

- Record type: campaign-correction
- Corrects: the execution-mode line in the
  `2026-07-18T22:06:21Z` contract approval record
- Execution mode: primary Codex coordinator with bounded, short-lived native
  Codex subagents; no Superpowers SDD
- Reason: the user clarified that the token-cost preference excludes the
  Superpowers SDD workflow, not ordinary native Codex subagents
- Experiments started: 1
- Active experiments: 1
- External actions: none
- Next step: use bounded native subagents to prepare, source-check, and review
  the approved local experiment

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-18-claude-code-memory-refresh at 2026-07-18T23:33:43Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-18-claude-code-memory-refresh
- Observed at: 2026-07-18T23:33:43Z
- Readout: correction
- Status: active
- Evidence: Before publish, an authenticated same-range GSC query-plus-page capture exposed 11 of the page's 23 impressions. The selected five-query non-brand Claude-memory cluster has 9 visible impressions, 0 clicks, and 50.0 impression-weighted average position. The original page-level success condition remains necessary but is no longer sufficient for a qualified-exposure success label. Qualified-exposure success also requires the cluster to remain visible with at least 9 impressions and to improve in at least one native unit: at least 1 click, at least 12 impressions, or impression-weighted average position of 45.0 or better. If the cluster is hidden by privacy filtering or this guardrail is not met, report the qualified-exposure result as inconclusive even if page-level efficiency improves.
- Result: pending
- Decision: wait
- Next step: finish local verification, then request approval before publish; after publish, keep page-level and visible non-brand cluster readouts separate
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-18-claude-code-memory-refresh at 2026-07-18T23:38:34Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-18-claude-code-memory-refresh
- Observed at: 2026-07-18T23:38:34Z
- Readout: correction
- Status: active
- Evidence: Local preparation is complete and unpublished. Official Claude Code memory facts and the Wenlan direct plugin path were independently source-checked. `pnpm test:seo` passed 172 tests, `pnpm lint` passed, `pnpm build` generated 208 static pages and skipped IndexNow outside production, built technical SEO passed, i18n contract and live built-route checks passed, and desktop/mobile rendered QA passed with no global overflow or browser warnings. Evidence report: `/tmp/wenlan-seo/visual-qa/2026-07-18-claude-code-memory/report.md`.
- Result: pending
- Decision: wait
- Next step: create the durable local Git checkpoint, then request explicit approval before push, merge, deploy, external distribution, indexing, or validation
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-18T23:45:41Z — pre-publish wait observation

- Record type: campaign-observation
- Experiments started this window: 0
- Active experiments: 1
- Publish state: `EXP-2026-07-18-claude-code-memory-refresh` remains unpublished
- GitHub evidence: 47 total stars from GitHub REST, captured `2026-07-18T23:45:41Z`
- Production technical evidence: deployed robots, 108 sitemap URLs, 13 key pages, 6 utility noindex headers, FAQPage absence across 108 sitemap URLs, 25 redirects, 6 bridge-host redirects, and old-URL sitemap exclusions passed
- External actions: none
- Decision: wait; no new evidence-backed experiment and no continuous rewrite
- Next step: one-time same-thread heartbeat `wenlan-growth-evidence-window-2` on `2026-07-25 10:00` America/Los_Angeles, after the Friday weekly SEO controller

### 2026-07-18T23:48:28Z — approval-boundary stop

- Record type: campaign-stop
- Stop condition: approval boundaries block a necessary action after three
  consecutive Goal turns
- Experiments started: 1
- Active experiments: 1
- Publish state:
  `EXP-2026-07-18-claude-code-memory-refresh` remains locally prepared and
  unpublished
- Evidence attempted: frozen control plane and verifier; authenticated GSC and
  Vercel baselines; GitHub stars; target query-plus-page guardrail; official
  source review; full local, built, i18n, rendered, and deployed technical SEO
  verification
- Result: the experiment is unexposed and remains pending; no publish or index
  date exists, so it is neither a success nor a failure
- External actions: none
- Heartbeat: `wenlan-growth-evidence-window-2` deleted
- Blocker: explicit push, merge, and deploy approval was not granted
- Next decision: the user must explicitly approve push, merge, and deploy to
  resume this current experiment; Reddit or other external publication, OSS
  submission, request indexing, and GSC validation remain separately
  approval-gated

### 2026-07-19T00:22:07Z — campaign resumed

- Record type: campaign-approval
- Approval: the user explicitly approved push, merge, and deploy for
  `EXP-2026-07-18-claude-code-memory-refresh`
- Goal status: resumed from the approval-boundary stop
- Experiments started: 1
- Active experiments: 1
- Google Trends retry: `Claude Code memory` and `MCP memory server`, US, past
  12 months, captured `2026-07-19T00:21:54Z`; the official public endpoint
  returned HTTP 429 again, so no 0–100 index was captured or used
- Raw Trends retry evidence:
  `/tmp/wenlan-seo-demand/2026-07-18/google-trends-explore.headers` and
  `/tmp/wenlan-seo-demand/2026-07-18/google-trends-explore.raw`
- Approved external actions: push, merge, and deploy only for the current
  experiment
- Still approval-gated: Reddit or other external publication, OSS submission,
  request indexing, and GSC validation
- Next step: publish the current experiment, verify production, then wait for
  the predeclared 24h and 7d readouts

### 2026-07-19T00:33:42Z — experiment published

- Record type: campaign-observation
- Experiment ID: `EXP-2026-07-18-claude-code-memory-refresh`
- Active experiments: 1
- Pull request: `https://github.com/7xuanlu/wenlan-site/pull/56`
- Merge revision: `1546bde7aa94dad7c5530002325d0c60cb3e0b8e`
- Publish date: `2026-07-18` America/Los_Angeles
- Production completion: `2026-07-19T00:26:09Z`
- Index date: not confirmed; no indexing request or GSC validation was
  submitted
- Live route: `https://wenlan.app/learn/claude-code-memory` returned HTTP 200
  with the canonical URL, `index, follow`, the native 200-line/25-KB limit,
  `/memory` guidance, the direct Wenlan plugin commands, and Article
  `datePublished=2026-06-07` plus `dateModified=2026-07-18`
- Production technical evidence: robots, 108 sitemap URLs, 13 direct-200 key
  pages, six utility noindex headers, sitemap-wide FAQPage absence, 25
  redirects, six bridge-host redirects, and legacy-URL sitemap exclusions
  passed
- Production rendered evidence: desktop top/install and mobile top/all seven
  sections passed with no document-level horizontal overflow and no console
  entries; report:
  `/tmp/wenlan-seo/visual-qa/production-2026-07-19-claude-code-memory/report.md`
- Result: pending; the experiment has only just received exposure and cannot
  be judged at publish time
- Decision: wait
- Next step: one-time same-task heartbeat
  `wenlan-claude-memory-24h-readout` at `2026-07-19 18:00`
  America/Los_Angeles; do not start another experiment
