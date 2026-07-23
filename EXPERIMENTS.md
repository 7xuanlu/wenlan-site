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

### 2026-07-19T02:47:01Z — Google Trends demand-discovery gate resolved

- Record type: campaign-observation
- Experiments started: 0
- Active experiments: 1
- Source result: the official unattended Google Trends API remains
  limited-alpha/account-gated, but the signed-in official Explore UI produced
  repeatable CSV exports in Chrome
- Raw evidence: 14 request-relative `0–100` timeline comparisons, 9
  related-query exports, and capture metadata under
  `/tmp/wenlan-seo-demand/2026-07-18/trends/`
- Coverage: Worldwide, United States, and Taiwan; English, Traditional
  Chinese, and Simplified Chinese terms; past 12 months and one Worldwide
  five-year comparison
- Interpretation:
  `docs/seo-audits/2026-07-18-trends-demand-discovery.md`
- Validated clusters: `LLM wiki`, Claude/agent memory, modifier-qualified
  Obsidian, MCP memory, and modifier-qualified AI knowledge base
- Rejected as primary targets: generic `knowledge base`, `AI memory`, and
  `AI wiki`; `AI notes` remains inconclusive
- GSC guardrail: existing impression-bearing pages cover the validated
  clusters, so future work should refresh those pages before creating a new
  URL
- Result: demand-discovery prerequisite resolved; no second experiment started
- Decision: wait for the current Claude Code memory experiment's predeclared
  readouts
- Next step: use the next GSC window to choose among the existing LLM-wiki,
  Obsidian, AI-knowledge-base, and MCP-memory pages; do not stack an edit now

### 2026-07-19T17:10:27Z — Trends false-positive removal and ranking clarification

- Record type: campaign-observation
- Experiments started: 0
- Active experiments: 1
- Trigger: the user correctly challenged the visual influence of the
  false-positive `AI memory` curve and the unclear flat priority list
- Change to evidence: three new signed-in official Explore comparisons removed
  `AI memory`; the Taiwan comparison also removed the large `Obsidian` anchor
- Raw evidence: three request-relative `0–100` CSV exports and metadata under
  `/tmp/wenlan-seo-demand/2026-07-19/trends/`
- Taiwan result: `AI 筆記` moved `36.0 → 67.4`, but its top related queries
  were NotebookLM, laptop, Google Notes/AI, and Notion AI; it is real adjacent
  discovery demand, not a clean Wenlan problem cluster
- Taiwan result: exact `AI 知識庫` moved `0.0 → 1.3`; removing Obsidian did
  not reveal meaningful demand, while generic `知識庫` remained broad
- Clarified focus: agent-memory demand, `LLM wiki for AI agents` as the
  source-backed solution/category, and Claude Code/Obsidian/MCP as entry
  points; these are distinct roles rather than one flat keyword ranking
- Execution remains evidence-gated: the current Claude Code memory experiment
  is the only active edit; compare fresh GSC evidence for existing LLM-wiki and
  modifier-qualified Obsidian pages at the next eligible window
- `agent memory` is the next demand hypothesis because it has the strongest
  cleaned relevant Trends direction, but it is not an automatic next edit
  without an impression-backed current page row
- Rejected or held: `AI memory`, `AI wiki`, exact Taiwan `AI 知識庫`, generic
  `knowledge base`, and generic `AI notes`/`AI 筆記` as primary targets
- Decision: do not start a new experiment; wait for the current experiment's
  predeclared readout and use the next GSC window to choose the next existing
  page refresh

### 2026-07-19T17:33:31Z — Goal explicitly resumed

- Record type: campaign-approval
- User instruction: resume the existing Wenlan exposure Goal
- Controller reconciliation: the Goal API snapshot still carried the prior
  approval-boundary `blocked` status immediately before this resumed run; the
  explicit user instruction starts a fresh resumed run
- Contract gate: complete `PLAN.md` read; `pnpm seo:goal:check` passed
- Experiments started: 0
- Active experiments: 1
- Campaign state: evidence-wait; the published Claude Code memory refresh
  remains the only active website experiment
- Safe work resumed now: read-only net-new article coverage-gap research using
  cleaned Trends, related-query, Reddit, OSS, SERP, and current-site evidence
- External actions: none
- Decision: keep the 24h readout heartbeat active; do not start, publish,
  push, merge, deploy, distribute, or request indexing for a second experiment
- Next step: nominate at most one net-new article candidate for a later
  eligible window, or record that no clean coverage gap passes the candidate
  gate

### 2026-07-19T17:46:26Z — zh-TW localized acquisition candidate queued

- Record type: campaign-observation
- Experiments started: 0
- Active experiments: 1
- User direction: when a Chinese locale lacks a corresponding article and
  locale-specific demand evidence exists, treat that as a coverage gap worth
  filling
- Candidate:
  zh-TW localization of `/learn/wenlan-vs-obsidian-ai-memory`
- Candidate record:
  `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`
- Candidate-gate result: PASS for queueing; modifier-qualified Obsidian plus
  Claude Code/MCP/agent-memory intent is supported by Taiwan Trends direction,
  repeated Reddit and OSS workflows, Traditional Chinese corroboration, and
  the existing English page's authenticated GSC impressions
- Rejected framing: generic `Obsidian` and generic `AI 筆記`; both remain too
  broad or mixed without Claude, agent, MCP, or durable-knowledge modifiers
- Locale scope: zh-TW only; no zh-CN demand evidence was established
- Technical prerequisite: replace the shared two-locale Learn slug assumption
  with actual per-locale availability before publishing, so static params,
  sitemap entries, locale switching, and hreflang never advertise a
  nonexistent zh-CN page
- Current-window result: queued, not active; no page, code, route, sitemap, or
  production change was made
- External actions: none
- Decision: wait for the active Claude Code memory experiment's predeclared
  readout; do not stack a second experiment
- Next step: at the next eligible weekly window, re-read fresh GSC evidence
  before selecting this candidate as the single experiment

### 2026-07-19T18:05:38Z — early 24h-heartbeat timing correction

- Record type: campaign-observation
- Experiment ID: `EXP-2026-07-18-claude-code-memory-refresh`
- Experiments started: 0
- Active experiments: 1
- Heartbeat received: `2026-07-19T18:00:08Z`
- Production completion: `2026-07-19T00:26:09Z`
- Elapsed at heartbeat: 17 hours 33 minutes 59 seconds
- Readout label: not-24h; this observation does not replace the pending 24h
  field in the immutable experiment-start record
- Contract gate: complete `PLAN.md` read; `pnpm seo:goal:check` passed
- Latest weekly evidence: read from
  `docs/seo-audits/2026-07-17-weekly-seo.md`; no duplicate weekly pipeline was
  run
- GSC: no reliable post-publish complete-day observation was available; no
  search result was inferred
- Vercel partial range: `2026-06-22..2026-07-19`, fetched
  `2026-07-19T18:01:59Z` while the final date was incomplete; raw 818 visitors
  and 970 pageviews; direct 230 visitors and 290 pageviews; 590
  qualified-source visitors summed across the existing separate referrer
  allowlist and not deduplicated; target page 5 visitors and 14 pageviews;
  unique acquisition-surface visitors unavailable from separate path rows
- Vercel custom events: account-gated, Pro or Enterprise required
- Umami: no authenticated report available
- GitHub: 47 total stars at the read-only REST observation; unchanged from the
  fixed baseline and not attributed to the page
- Live route: HTTP 200; canonical
  `https://wenlan.app/learn/claude-code-memory`; `index, follow`; visible
  native-memory-first copy; direct plugin command block; Article
  `datePublished=2026-06-07` and `dateModified=2026-07-18`
- Production render: desktop at 1280x720 rendered the expected title, packet,
  intro, and article structure with no horizontal overflow or console
  warnings; mobile DOM at 393x852 rendered the same H1, eight H2 sections, and
  install commands with no horizontal overflow or console warnings. The
  isolated mobile screenshot capture timed out after the successful DOM
  checks, so it is not claimed as image evidence.
- Production technical evidence: deployed robots passed; sitemap contained
  108 URLs; 13 key pages passed; six utility noindex headers passed;
  `FAQPage` remained absent across 108 sitemap pages; 25 redirects and six
  bridge-host redirects passed; old URLs remained absent from the sitemap
- Result: pending; this was an early technical observation, not enough elapsed
  time or Search evidence for a success/failure/inconclusive experiment verdict
- Decision: wait
- External actions: no content change, second experiment, publish, indexing
  request, validation, push, merge, deploy, or distribution
- Heartbeat correction: the same
  `wenlan-claude-memory-24h-readout` heartbeat is active for
  `2026-07-20T00:30:00Z` (`2026-07-19 17:30`
  America/Los_Angeles), after the actual 24-hour boundary
- Next step: run the actual 24h technical/evidence readout, then keep waiting
  and update the same heartbeat to the predeclared 7-day follow-up if the
  result remains inconclusive

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-18-claude-code-memory-refresh at 2026-07-20T00:35:13Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-18-claude-code-memory-refresh
- Observed at: 2026-07-20T00:35:13Z
- Readout: 24h
- Status: measuring
- Evidence: GSC `sc-domain:wenlan.app` for `2026-06-22..2026-07-19` reported 6 property clicks and 212 property impressions; its visible query table reported 0 clicks and 51 impressions, including 22 non-brand impressions under the existing Searchfit classification. The target page remained at 23 impressions, 0 clicks, and 38.7 average position, and its five visible Claude-memory queries remained at 9 impressions and 0 clicks. Separate one-day GSC requests for both `2026-07-18` and `2026-07-19` returned no query or page rows, so no post-publish search result is available and the zeros are treated as reporting latency rather than zero demand. Vercel's complete-date `2026-06-22..2026-07-19` range reported 854 raw visitors and 1,009 pageviews; direct reported 232 visitors and 293 pageviews; the existing search, AI, and GitHub qualified-source allowlist summed to 629 visitors without user deduplication; `/learn/claude-code-memory` reported 6 visitors and 16 pageviews. Unique acquisition-surface visitors and source-to-page sessions are unavailable from the separate aggregates. Vercel custom events remain Pro/Enterprise-gated and no authenticated Umami report was available, so GitHub outbound and CTA are unavailable. GitHub REST reported 47 total stars, unchanged from the fixed baseline and not attributed to the page. The deployed technical suite passed robots, 108 sitemap URLs, 13 English/zh-TW/zh-CN key pages, six utility noindex headers, sitemap-wide FAQPage absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English route returned HTTP 200 with its canonical, `index, follow`, Article JSON-LD, expected title, H1, eight H2 sections, visible install commands, no document-level horizontal overflow, and no console warning/error entries. A requested 393x852 browser override remained at the backend's 1280x720 viewport, so this readout claims desktop DOM render evidence only rather than inventing a mobile result.
- Result: inconclusive
- Decision: wait
- Next step: keep this as the only active experiment and run the 7-day readout after `2026-07-26T00:26:09Z`; do not start another experiment before that evidence window
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-23T06:15:22Z — idle-posture correction and next-asset preparation

- Record type: campaign-observation
- User correction: the exposure Goal must not treat a predeclared readout as
  permission to leave the next content candidate unprepared
- Goal API state: still reported `blocked`; repo control plane and the
  same-thread heartbeat had continued, so the controller state was
  inconsistent
- Contract gate: complete `PLAN.md` read; `pnpm seo:goal:check` passed before
  this campaign action
- GSC: `2026-06-24..2026-07-21` property totals were 6 clicks and 264
  impressions; visible query rows were 0 clicks and 64 impressions, leaving a
  6-click and 200-impression visibility gap; the target Claude Code memory
  page remained at 23 impressions, 0 clicks, and 38.7 average position
- Vercel: the same complete-date range reported 1,142 raw visitors and 1,313
  pageviews; direct reported 242 visitors and 305 pageviews; the existing
  qualified-source allowlist summed to 912 visitors without user
  deduplication; `/docs/configuration` reported 624 visitors,
  `/learn/mcp-memory-server` 224, and `/learn/claude-code-memory` 7
- GitHub: 47 total stars; the 14-day traffic endpoint reported 247 repository
  views from 46 unique visitors and 3,738 clones from 811 unique cloners.
  Clones are not setup starts, and none of these observations is attributed to
  the website.
- Measurement finding: site GitHub CTAs already emit Vercel custom events,
  but the plan is account-gated from reading them; tracked external links also
  use `noreferrer`, so GitHub referrer data cannot establish
  `wenlan.app`-to-repository visits
- Deterministic report:
  `/tmp/wenlan-weekly-seo-2026-07-22.md`
- Experiments started: 0
- Active experiments: 1
- Preparation decision: build and verify the already-gated zh-TW Obsidian plus
  Claude Code / agent-memory localization locally now, including
  locale-specific route, sitemap, and hreflang support; do not create zh-CN
- Launch decision: wait for the `2026-07-25..2026-07-31` window and read the
  Friday weekly report before selecting the window's single experiment
- External actions: no publish, push, merge, deploy, indexing request,
  validation, external post, or OSS submission

### 2026-07-23T06:39:32Z — queued zh-TW acquisition asset locally ready

- Record type: campaign-observation
- Experiments started: 0
- Active experiments: 1
- Candidate:
  `/zh-TW/learn/wenlan-vs-obsidian-ai-memory`
- Preparation result: complete locally, queued, not active, not published
- Demand provenance:
  `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`; the asset keeps
  modifier-qualified Obsidian, Claude Code, MCP, and agent-memory intent rather
  than targeting generic `Obsidian` or generic `AI 筆記`
- Locale boundary: zh-TW only; per-locale availability drives static params,
  locale routing, sitemap, and alternates; the zh-CN counterpart is absent and
  verified as HTTP 404
- Source quality: visible official references include Obsidian data and plugin
  documentation, maintained Claudian and Obsidian MCP repositories, and
  Wenlan's core-concepts and data-and-privacy pages; the copy does not claim
  Obsidian sync
- Verification: `pnpm test:i18n` 52/52, `pnpm lint`, `pnpm build`,
  `pnpm seo:technical:built`, and the built-route i18n checker all passed; the
  latter verified 19 expected 200 routes and 5 expected 404 routes
- Render evidence:
  `/tmp/wenlan-visual-qa-2026-07-22-zhtw-obsidian`; final article captures used
  verified `1440x1200` and `393x852` CSS viewports. The mobile document
  reported `scrollWidth=393`, and the article, official references, CTA, FAQ,
  and Learn-card entry rendered without content clipping
- Launch decision: wait for the Friday weekly evidence and the
  `2026-07-25..2026-07-31` window; select this as the single launch only if no
  technical blocker or stronger impression-bearing existing-page action
  supersedes it
- External actions: no publish, push, merge, deploy, indexing request,
  validation, external post, or OSS submission

### 2026-07-23T14:32:13Z — zh-TW prelaunch contract drafted

- Record type: campaign-observation
- Experiments started this window: 0
- Active experiments: 1
- Candidate:
  `/zh-TW/learn/wenlan-vs-obsidian-ai-memory`
- Prelaunch record:
  `docs/seo-audits/2026-07-23-zhtw-obsidian-prelaunch.md`
- Prepared decision fields: source-native baseline, hypothesis, bounded change,
  5-GSC-page-impression minimum exposure, success/failure/inconclusive rules,
  stop criteria, and 24h/7d/W2/W4/W8 readouts
- Exposure proposal: after production verification, one separately approved
  Traditional Chinese owned-social post; Threads is the proposed first
  channel. Reddit, OSS submissions, paid acquisition, indexing requests, and
  GSC validation remain outside this proposal.
- Launch gate: read the 2026-07-24 weekly report, then choose this candidate
  only if no technical blocker or materially stronger impression-bearing
  existing-page action supersedes it
- Experiment state: queued and unpublished; no experiment-start record was
  appended and the `2026-07-25..2026-07-31` slot remains unused
- External actions: none
- Next step: run the contract verifier and diff check, then wait for the Friday
  report and explicit push, merge, deploy, and distribution approvals

### 2026-07-23T14:33:41Z — Goal API active-state reconciliation

- Record type: campaign-observation
- Codex Goal API status: active
- Prior mismatch: the API had continued to report the earlier
  approval-boundary `blocked` state after the user resumed the campaign
- Resolution: the live Goal controller and the repository control plane now
  agree that the campaign is active
- Experiments started this window: 0
- Active experiments: 1
- External actions: none
- Next step: keep the Goal active, read the 2026-07-24 weekly report, and make
  the predeclared 2026-07-25 single-experiment launch decision

### 2026-07-23T14:35:02Z — 7-day heartbeat launch-gate correction

- Record type: campaign-observation
- Automation:
  `wenlan-claude-memory-24h-readout`
- Schedule: unchanged at `2026-07-26T00:30:00Z`, after the 7-day boundary and
  the independent Friday weekly run
- Correction: the heartbeat no longer treats an inconclusive first experiment
  as an automatic reason to leave the next-window candidate inactive
- Required order: append the due 7-day readout first, then use the Friday
  report and
  `docs/seo-audits/2026-07-23-zhtw-obsidian-prelaunch.md` to evaluate the
  `2026-07-25..2026-07-31` single-experiment slot
- Approval boundary: without explicit approval, the heartbeat may select and
  report the candidate but must not append its experiment-start record, push,
  merge, deploy, publish the proposed Threads post, request indexing, submit
  validation, post to Reddit, submit OSS directories, or buy traffic
- Existing weekly automation: unchanged
- Experiments started this window: 0
- Active experiments: 1
- External actions: heartbeat instructions updated; no website, repository,
  indexing, or publication action
- Next step: wait for the Friday report and the scheduled combined readout plus
  launch-gate decision

### 2026-07-23T14:43:13Z — zh-TW owned-social unit locally ready

- Record type: campaign-observation
- Experiments started this window: 0
- Active experiments: 1
- Candidate experiment:
  `EXP-2026-07-25-zhtw-obsidian-localization`
- Draft:
  `docs/seo-audits/2026-07-23-zhtw-obsidian-threads-draft.md`
- Distribution shape: one standalone Traditional Chinese main post followed
  by a first reply containing the tagged canonical article link
- Voice evidence: the local Lucian Threads voice source requires direct,
  concrete Traditional Chinese, one job per post, no hashtags or em dash, and
  warns against placing a product explanation and external link inside the
  same main body
- Draft checks: main post is 461 characters including line breaks; no em dash,
  hashtag, or banned hype term appears in the extracted main-post text;
  article claims are tied to official Obsidian documentation, maintained
  Claudian and Obsidian MCP repositories, and Wenlan's maintained workflow
- Review synthesis: Gemini 3.1 Pro returned `ship`; Claude Opus 4.6 returned
  `revise` and its concrete opener, tool naming, natural wording, reply
  question, and author disclosure were adopted; GPT-OSS 120B returned `revise`
  but its forced product-term translations and promotional emoji CTA were
  rejected
- Observation plan: preserve exact post/reply text, URLs, timestamps, tagged
  URL, available Threads manual units, Vercel page/referrer aggregates, GSC
  page units, and GitHub stars separately without a causal claim
- Approval boundary: no post, reply, live conversation, push, merge, deploy,
  indexing request, validation, Reddit action, OSS submission, or paid
  acquisition is authorized by this preparation
- External actions: none
- Next step: at the 2026-07-25 launch gate, request one explicit website
  approval and one explicit main-post-plus-link-reply distribution approval

### 2026-07-23T14:50:03Z — zh-TW checkpoint verification complete

- Record type: campaign-observation
- Experiments started this window: 0
- Active experiments: 1
- Checkpoint scope: 16 modified or untracked files covering only the Trends
  interpretation, localized-candidate evidence, prelaunch and Threads drafts,
  mutable campaign state, the zh-TW article, per-locale availability,
  sitemap/hreflang/static params, official-reference rendering, and matching
  deterministic verifiers
- Independent review: `SHIP`; no correctness, SEO, locale, contract, or
  unrelated-scope blocker found
- Passing verification: `pnpm seo:goal:check`; `pnpm test:i18n` 52/52;
  `pnpm lint`; 45/45 affected built/deployed technical SEO tests;
  `pnpm build` with 209 generated static pages and no production IndexNow
  action; `pnpm seo:technical:built` with 109 sitemap URLs, 14 required URLs,
  14 checked HTML pages, and `FAQPage` absent from 113 HTML files; production
  build smoke test with 19 expected 200 routes and 5 expected 404 routes;
  `git diff --check`
- Render evidence: the unchanged final implementation remains represented by
  the verified 1440x1200 and 393x852 captures under
  `/tmp/wenlan-visual-qa-2026-07-22-zhtw-obsidian`; the mobile document width
  matched its 393px viewport
- Whole-suite caveat: with explicit sibling checkout roots, `pnpm test:seo`
  passed 64 tests and failed 5. Four failures are current source-fact drift
  outside this candidate (Wenlan 0.14.1/current desktop Remote Access versus
  website 0.13.2-era public facts); the fifth is the Node 24.11.1 native
  test-runner assertion in `scripts/seo-weekly.test.mjs`. The 45 tests covering
  this candidate's built/deployed technical checkers pass independently.
- External actions: none; no publish, push, merge, deploy, indexing request,
  validation, social post, Reddit action, OSS submission, or paid acquisition
- Next step: create a local-only Git checkpoint, then wait for the 2026-07-24
  weekly report and the explicit 2026-07-25 launch/distribution approvals

### 2026-07-23T14:52:42Z — approval-boundary campaign stop

- Record type: campaign-stop
- Stop condition: the same explicit external-action approval boundary blocked
  the next necessary exposure action for three consecutive resumed Goal turns
- Codex Goal API status: blocked
- Experiments started: 1
- Active experiments: 1
- Current experiment:
  `EXP-2026-07-18-claude-code-memory-refresh` remains measuring; its 24-hour
  result is inconclusive and its 7-day readout is not yet due
- Prepared next candidate:
  `EXP-2026-07-25-zhtw-obsidian-localization` remains queued, unpublished, and
  absent from the experiment-start ledger
- Local checkpoint: `9ea931f`
  (`seo: prepare zh-TW Obsidian acquisition experiment`), independently
  reviewed `SHIP`, with a clean worktree before this administrative record
- Attempted paths: authenticated GSC and Vercel evidence; GitHub stars; signed
  Google Trends exports with false-positive removal; Reddit, OSS, and
  Traditional Chinese candidate corroboration; zh-TW article and per-locale
  routing; sitemap/hreflang/404 verification; desktop/mobile rendered QA;
  predeclared experiment fields; exact Threads main post and link reply;
  three-model copy review; local-only Git checkpoint
- Evidence status: the candidate passed the five-part gate and all affected
  technical checks. The whole SEO suite still exposes four unrelated current
  source-fact drift failures plus one Node 24 test-runner crash, recorded in
  the preceding checkpoint observation.
- Heartbeat:
  `wenlan-claude-memory-24h-readout` paused while the Goal is blocked
- Existing weekly automation:
  `weekly-origin-seo-cleanup` remains ACTIVE and unchanged
- External actions: none; no publish, push, merge, deploy, indexing request,
  validation, social post, Reddit action, OSS submission, or paid acquisition
- Blocker: no explicit approval was granted for the prepared website
  push/merge/deploy or the exact Threads main-post-plus-link-reply unit
- Next user decision: approve the website action, approve the distribution
  unit, or approve both; any approval resumes this Goal as a fresh blocked
  audit and requires reading the latest Friday evidence before launch

### 2026-07-23T14:57:22Z — scope correction and website-action approval

- Record type: campaign-resume
- Experiments started this window: 0
- Active experiments: 1
- User scope correction: Threads and all owned-social work are outside this
  campaign; this controller is responsible only for website SEO
- Historical ledger entries mentioning a Threads draft remain unchanged
  because this file is append-only; this record supersedes those proposed
  actions
- Removed current Threads draft:
  `docs/seo-audits/2026-07-23-zhtw-obsidian-threads-draft.md`
- SEO-only exposure lane: localized Learn hub, canonical sitemap/hreflang, and
  contextual links from the two existing zh-TW wiki pages
- Approval granted: push, merge, and production deploy for the prepared
  website candidate
- Approval not granted: Threads, Reddit or other external publication, OSS
  submission, paid acquisition, request indexing, or GSC validation
- Launch state: queued, not active; do not consume the
  `2026-07-25..2026-07-31` slot until the 2026-07-24 weekly evidence is read
- Next step: verify and publish a GitHub PR for the website candidate, then
  wait for the Friday evidence and 2026-07-25 launch gate before merge/deploy
- Follow-up controller: `wenlan-claude-memory-24h-readout` reactivated with an
  SEO-only prompt for the 7-day readout and next launch gate
