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
`extended`, `decided`, `inconclusive`, and `stopped`. Active reporting counts
`approved`, `active`, `live`, `measuring`, and `extended`; only `approved` and
`active` consume the single production-in-flight slot.

Allowed asset classes are `refresh`, `integration-hub`,
`diagnostic-recipe`, and `net-new-search`.

Each data window contains seven complete reporting dates, inclusive, on the
campaign cadence anchored at `2026-07-18..2026-07-24` and advancing in
seven-day increments. A reporting window does not block an approved launch.
There is no fixed net-new article interval, but the complete candidate gate,
preceding-change production verification, and non-overlapping-intent guard
still apply. No experiment may launch after the frozen `2026-08-18` campaign
deadline.

## Readout and correction records

Readouts and corrections are appended after the start record. They restate the
experiment ID, observation timestamp, native metric units, result, decision,
and next step. They never overwrite the start record. The verifier applies the
latest appended status for each experiment when enforcing production
concurrency.
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

### 2026-07-23T15:06:26Z — SEO-only website candidate published as draft PR

- Record type: campaign-observation
- Experiments started this window: 0
- Active experiments: 1
- Clean branch: `agent/zhtw-obsidian-seo`
- Candidate commit: `0a0d183`
- Draft PR: `https://github.com/7xuanlu/wenlan-site/pull/58`
- GitHub merge state at observation: `MERGEABLE`, `CLEAN`
- Vercel PR checks: preview deployment and preview comments both succeeded
- Production state: not merged and not production-deployed
- Scope: website SEO only; the branch and PR contain no Threads draft
- Next step: read the 2026-07-24 weekly evidence and apply the predeclared
  2026-07-25 launch gate before merge or production deploy

### 2026-07-23T15:14:19Z — immediate website launch correction

- Record type: campaign-correction
- User correction: there is no technical reason to delay the verified website
  candidate; the weekly reporting boundary must not block direct merge
- Supersedes: the proposed `2026-07-25` launch gate and the earlier instruction
  to keep the Claude Code memory experiment as the only active experiment
- Contract change: weekly windows remain reporting boundaries, but no longer
  cap verified and explicitly approved website launches
- Caps retained: at most two active experiments and at most one net-new search
  asset in any 14-calendar-day period
- Approval: website push, merge, and production deploy remain explicitly
  approved; no external publication or indexing action was added
- Next step: start the zh-TW experiment, merge PR #58, and verify production

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-23-zhtw-obsidian-localization

- Record type: experiment-start
- Experiment ID: EXP-2026-07-23-zhtw-obsidian-localization
- Status: approved
- Data window: 2026-07-18..2026-07-24
- Asset class: net-new-search
- Launched: 2026-07-23
- Hypothesis: Publishing the modifier-qualified zh-TW counterpart will create measurable Traditional Chinese search exposure and a useful path to GitHub without fabricating zh-CN coverage.
- Candidate evidence: Taiwan Google Trends observations, repeated Reddit and OSS workflows, Traditional Chinese corroboration, the English page's authenticated GSC impressions, and the clean localized coverage gap recorded in `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`.
- Baseline: GSC `sc-domain:wenlan.app` for `2026-06-24..2026-07-21` reported 6 property clicks and 264 impressions; visible query rows reported 0 clicks and 64 impressions; the English Obsidian page reported 0 clicks, 4 impressions, and average position 4.5; Vercel reported 1,142 property visitors, 6 `/zh-TW` visitors, 1 `/zh-TW/learn` visitor, and 3 English Obsidian-page visitors; GitHub reported 47 total stars; Umami outbound remained unavailable.
- Change: Publish only the prepared zh-TW route, localized Learn-hub entry, contextual links from the two existing zh-TW wiki pages, per-locale static params, sitemap, locale switching, and hreflang support; keep the unsupported zh-CN route as a hard 404.
- Publish date: not-published
- Index date: not-indexed
- Minimum exposure: 5 GSC page impressions within the first 28 complete post-index days
- Success criteria: After at least 5 GSC page impressions, the route earns at least 1 GSC click or average position is 20.0 or better; report Vercel page visitors and GitHub stars separately without a causal claim.
- Failure criteria: After 28 complete post-index days and at least 5 GSC page impressions, the route has 0 clicks and average position is worse than 20.0; fewer than 5 impressions is inconclusive.
- Stop criteria: Stop or hold if an official source becomes invalid; a canonical, indexing, robots, noindex, redirect, structured-data, sitemap, or locale regression appears; or the unsupported zh-CN route leaks into static params or hreflang.
- 24h readout: pending — verify live 200, canonical, indexability, sitemap and hreflang, zh-CN 404, production render, and separate Vercel/GitHub observations without an SEO-success judgment
- 7d readout: pending — report indexing latency, GSC page impressions/clicks/position when available, Vercel page visitors, and stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect English, zh-TW, and zh-CN acquisition surfaces for regressions
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: merge
- Next step: Mark PR #58 ready, merge it, verify production, and append the production completion evidence.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-23-zhtw-obsidian-localization at 2026-07-23T15:20:40Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-23-zhtw-obsidian-localization
- Observed at: 2026-07-23T15:20:40Z
- Readout: correction
- Status: live
- Evidence: PR #58 merged at `2026-07-23T15:18:29Z` as `7166bad1e3020bac60c9454780d2b732e17e4242`; Vercel production completed at `2026-07-23T15:19:18Z`. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide FAQPage absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live zh-TW route returned HTTP 200 with the exact canonical, expected title and H1, visible maintained-source links, no framework overlay or console warnings, and no horizontal overflow at 393px. The unsupported zh-CN route returned HTTP 404, and the live sitemap contained the zh-TW route without a zh-CN counterpart. No search-performance result is inferred at production completion.
- Result: pending
- Decision: wait
- Next step: Run the 24-hour technical/evidence readout after `2026-07-24T15:19:18Z`; waiting for that measurement does not block other eligible website work.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T18:37:21Z — production-throughput correction

- Record type: campaign-correction
- User approval: proceed with the proposed SEO-only website work and correct
  the Goal rules that had turned measurement into an idle period
- Contract change: replace the two-active-experiment and 14-day net-new limits
  with one production-in-flight website change; production-verified `live`,
  `measuring`, and `extended` cohorts retain their readouts without blocking
  another eligible change
- Article cadence: no fixed quota; a net-new asset still requires the complete
  candidate gate, a production-verified preceding change, and a non-overlapping
  intent
- Latest evidence read: authenticated weekly GSC and Vercel exports for
  `2026-06-26..2026-07-23`, regenerated as
  `docs/seo-audits/2026-07-24-weekly-seo.md`
- Experiments started before this record: 2
- Active experiments before this record: 2
- External actions: none
- Next step: refresh the existing indexed English AI work memory versus
  knowledge base page, verify it locally, and surface the Git publish boundary

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh
- Status: approved
- Data window: 2026-07-18..2026-07-24
- Asset class: refresh
- Launched: 2026-07-24
- Hypothesis: A more direct title, first answer, and source-backed role comparison on the existing indexed page will earn qualified exposure or clicks for AI work memory and AI knowledge-base intent without adding another URL.
- Candidate evidence: The authenticated `2026-06-26..2026-07-23` GSC page table reports 9 impressions, 0 clicks, and average position 8.0 for `/learn/ai-work-memory-vs-knowledge-base`; the weekly Searchfit queue recommends a title/meta/intro/quick-answer refresh; the cleaned Google Trends work retains modifier-qualified AI knowledge-base intent as a secondary cluster; Wenlan v0.14.1's maintained README documents distinct Source, Memory, and Page roles with a real capture, recall, handoff, and distill workflow.
- Baseline: GSC `sc-domain:wenlan.app` reported 7 property clicks and 310 property impressions; visible query rows reported 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap; the target page reported 0 clicks, 9 impressions, and average position 8.0; Vercel reported 1,402 visitors and 1,593 pageviews, while the target page was absent from the top-page export and no zero was inferred; GitHub reported 47 total stars; Umami and Vercel custom CTA events remained unavailable or account-gated.
- Change: Refresh only `/learn/ai-work-memory-vs-knowledge-base` in English: title, metadata, first answer, Source/Memory/Page boundary, comparison table, maintained first-party sources, contextual internal links, and visible FAQ copy; create no new URL, Mandarin translation, FAQPage JSON-LD, or external distribution.
- Publish date: not-published
- Index date: indexed-before-2026-07-24-date-unavailable
- Minimum exposure: 20 GSC page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 20 GSC page impressions, the page earns at least 1 GSC click or average position is 5.0 or better; report Vercel page visitors, GitHub outbound when available, and stars separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 20 GSC page impressions, the page has 0 clicks and average position is worse than the 8.0 baseline; fewer than 20 impressions is inconclusive.
- Stop criteria: Stop or hold if a first-party source becomes invalid; a canonical, indexing, robots, noindex, redirect, structured-data, sitemap, or locale regression appears; another controller edits the same page; or the refreshed page overlaps another acquisition route instead of clarifying its distinct intent.
- 24h readout: pending — verify live 200, title, description, canonical, indexability, structured data, source links, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency, target-page clicks, impressions and position when available, Vercel page visitors, and stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect the related AI work memory, LLM wiki, Obsidian, and Basic Memory routes for intent overlap
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: finish local content, test, build, technical, and rendered verification, then request explicit push, merge, and production-deploy approval.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T18:46:11Z — knowledge-base refresh locally verified

- Record type: campaign-observation
- Experiments started: 3
- Active experiments: 3
- Production-in-flight changes: 1
- Current change:
  `EXP-2026-07-24-ai-work-memory-knowledge-base-refresh`
- Evidence: `pnpm test:seo` 174/174; `pnpm test:i18n` 52/52;
  `pnpm lint`; `pnpm seo:goal:check`; `pnpm build` with 209 static pages;
  built technical SEO with 109 sitemap URLs, 14 checked HTML pages, and no
  `FAQPage` in 113 built HTML files; built i18n smoke with 19 direct-200 and 5
  hard-404 routes; current-production technical SEO; `git diff --check`
- Render evidence: refreshed article at 1440×1000 and 393×852; all six
  English, Simplified Chinese, and Traditional Chinese About/Get Started pages
  at 393×852; 1200×630 About social image. Expected title, metadata, canonical,
  release version, localized dates, and current Remote Access instructions
  were present with no document overflow, framework overlay, or console error.
  Evidence remains under
  `/tmp/wenlan-seo/visual-qa/2026-07-24-growth-unblock/`.
- Publish date: still `not-published`
- External actions: none; no push, merge, deployment, indexing request,
  validation, external post, OSS submission, or paid acquisition
- Next step: request explicit approval for Git push, merge, and production
  deploy; after production verification, mark the experiment `live` or
  `measuring` and free the production slot

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh at 2026-07-24T18:55:26Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh
- Observed at: 2026-07-24T18:55:26Z
- Readout: correction
- Status: live
- Evidence: PR #60 merged at `2026-07-24T18:53:32Z` as `f8b8adc9dc0cbbcb40c74f8928676d142268f643`; Vercel production completed at `2026-07-24T18:54:22Z`. The live route returned HTTP 200 with the refreshed title and H1, exact canonical, `index, follow`, Article JSON-LD, maintained source links, visible role-comparison copy, no `FAQPage`, no mobile document overflow, and no console warning or error. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. No search-performance result is inferred at production completion.
- Result: pending
- Decision: wait
- Next step: Run the 24-hour technical/evidence readout after `2026-07-25T18:54:22Z`; this measurement cohort does not consume the production slot or block another eligible website change.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-learn-hub-exposure-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-learn-hub-exposure-refresh
- Status: approved
- Data window: 2026-07-18..2026-07-24
- Asset class: integration-hub
- Launched: 2026-07-24
- Hypothesis: A direct LLM-wiki and AI-memory category answer plus evidence-ranked search paths on the existing English Learn hub will earn more qualified Google exposure or clicks and send more visitors into Wenlan's strongest existing guides without adding another URL.
- Candidate evidence: Authenticated GSC reports 71 impressions, 0 clicks, and average position 15.6 for `/learn`; same-range Vercel reports 98 visitors and 100 pageviews for the route; the reviewed exposure-first design names the Learn integration/workflow hub as the first backlog item; cleaned Trends, Reddit, OSS, and current GSC evidence validate Claude Code memory, LLM wiki, Basic Memory comparison, and MCP memory as distinct existing-page paths. The evidence sources retain their native units and are not joined or treated as keyword volume.
- Baseline: GSC `sc-domain:wenlan.app` for `2026-06-26..2026-07-23` reported 7 property clicks and 310 property impressions; visible query rows reported 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap; `/learn` reported 0 clicks, 71 impressions, and average position 15.6. Vercel separately reported 1,402 visitors and 1,593 pageviews property-wide and 98 visitors and 100 pageviews for `/learn`; no source-to-page sessions are inferred. GitHub reported 47 total stars. Umami and Vercel custom CTA events remained unavailable or account-gated.
- Change: Refresh only the English `/learn` metadata, first-screen answer, and existing popular-search-path cards. Lead with Claude Code memory, Basic Memory comparison, MCP memory server, and LLM wiki for AI agents; keep the complete article grid, existing canonical and locale alternates, and bottom GitHub/setup CTA. Create no new URL, Mandarin translation, schema type, FAQPage JSON-LD, or external distribution.
- Publish date: not-published
- Index date: indexed-before-2026-07-24-date-unavailable
- Minimum exposure: 100 GSC `/learn` page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 100 GSC `/learn` page impressions, the page earns at least 1 GSC click or average position is 12.0 or better; report Vercel page visitors, GitHub outbound when available, and stars separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 100 GSC `/learn` page impressions, the page has 0 clicks and average position is worse than the 15.6 baseline. Fewer than 100 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 12.1 through 15.6 is also inconclusive as no material change.
- Stop criteria: Stop or hold if a canonical, indexing, robots, noindex, structured-data, sitemap, locale, or rendered-layout regression appears; another controller edits the same hub; the search paths overlap or contradict an active article; or maintained Wenlan proof no longer supports the category answer.
- 24h readout: pending — verify live 200, title, description, canonical, locale alternates, CollectionPage and BreadcrumbList JSON-LD, search-path links, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency, `/learn` clicks, impressions and position when available, Vercel page visitors, and stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect English, zh-TW, and zh-CN Learn surfaces plus linked Claude Code, Basic Memory, MCP memory, and LLM-wiki pages for overlap or regression
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: Prepare the bounded English Learn-hub change, run focused and full SEO/i18n/build/technical/rendered checks, and then request explicit Git push, merge, and production-deploy approval.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T19:13:30Z — Learn hub refresh locally verified

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-learn-hub-exposure-refresh`
- Production-in-flight changes: 1
- Scope: English `/learn` metadata, CollectionPage description, H1, direct
  quick answer, and nine existing search-path cards; Goal fixtures and focused
  SEO assertions updated; no URL, Mandarin content, sitemap, canonical,
  locale-availability, schema-type, or CTA change
- Focused verification: the Learn-index assertion failed before implementation
  and passed after the bounded change
- Full verification: `pnpm test:seo` 174/174; `pnpm test:i18n` 52/52;
  `pnpm lint`; `pnpm seo:goal:check`; `pnpm build` with 209 static pages;
  built technical SEO with 109 sitemap URLs, 26 redirects, seven noindex
  headers, 14 checked HTML pages, and no `FAQPage` in 113 built HTML files;
  production-build i18n smoke with 19 expected direct-200 routes and five
  expected hard-404 routes; current-production deployed technical SEO;
  `git diff --check`
- Linked-path verification: `/learn`, its nine promoted destination routes,
  `/zh-TW/learn`, and `/zh-CN/learn` all returned local production-build HTTP
  200
- Render evidence: desktop 1440×1000 and mobile 393×852 English Learn checks
  confirmed the title, description, exact canonical, `index, follow`,
  reciprocal locale alternates, BreadcrumbList and CollectionPage JSON-LD,
  quick answer, ranked search paths, no `FAQPage`, no framework error overlay,
  and no document or H1 overflow. Mobile zh-TW and zh-CN Learn checks retained
  their localized titles, H1s, self-canonicals, and overflow-safe layouts.
  Screenshots are under
  `/tmp/wenlan-seo/visual-qa/2026-07-24-learn-hub-exposure/`.
- Independent review: initial `fix-first` found a neutral outcome band; the
  experiment now classifies 0 clicks with average position 12.1 through 15.6
  after minimum exposure as inconclusive. No other blocker was found.
- Publish date: still `not-published`
- External actions: none; no push, merge, deployment, indexing request,
  validation, external post, OSS submission, or paid acquisition
- Next step: request explicit Git push, merge, and production-deploy approval

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-learn-hub-exposure-refresh at 2026-07-24T19:21:10Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-learn-hub-exposure-refresh
- Observed at: 2026-07-24T19:21:10Z
- Readout: correction
- Status: live
- Evidence: PR #62 merged at `2026-07-24T19:17:15Z` as `e8c089a0391795e778b2e02f1bd11355fda4e4e8`; Vercel production completed at `2026-07-24T19:18:03Z`. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English `/learn` route returned HTTP 200 with the refreshed title, description, H1, quick answer, exact canonical, `index, follow`, reciprocal locale alternates, BreadcrumbList and CollectionPage JSON-LD, and all nine acquisition links. The English, zh-TW, and zh-CN Learn hubs and all promoted destinations returned HTTP 200; rendered checks found no `FAQPage`, document overflow, framework error, console warning, or console error. No search-performance result or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Next step: Run the 24-hour technical/evidence readout after `2026-07-25T19:18:03Z`; this measurement cohort does not consume the production slot or block another eligible website change.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-llm-wiki-category-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-llm-wiki-category-refresh
- Status: approved
- Data window: 2026-07-18..2026-07-24
- Asset class: refresh
- Launched: 2026-07-24
- Hypothesis: A clearer LLM-wiki-for-AI-agents title, concrete capture-to-page workflow, source-backed maintenance model, and explicit boundary from code or repository search on the existing indexed page will earn more qualified exposure or clicks for the validated LLM-wiki category without adding another URL.
- Candidate evidence: The authenticated `2026-06-26..2026-07-23` GSC page table reports 2 impressions, 0 clicks, and average position 3.5 for `/learn/distilled-wiki-pages-ai-memory`; the separate visible query `llm wiki 2.0` reports 1 impression, 0 clicks, and average position 13.0 and is not joined to that page row. Signed official Google Trends Explore captures recorded `LLM wiki` moving `0.7 → 3.8` and `1.6 → 15.2` in separate request-relative Worldwide 0–100 series, with clean related queries around Karpathy, GitHub, Obsidian, Claude Code, Codex, `llm wiki skill`, and `llm wiki v2`; these indices are not search volume and are not compared across requests. The maintained Wenlan repository at `93451bf0ef58399e08400e3b4ac613942adcfec8` documents the Source/Memory/Page model and the real `/capture`, `/distill`, and page-opening workflow. The target page's last substantive category copy was published on 2026-07-04, leaving a clean existing-page refresh seam.
- Baseline: GSC `sc-domain:wenlan.app` reported 7 property clicks and 310 property impressions; visible query rows reported 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap; the target page reported 0 clicks, 2 impressions, and average position 3.5; the separate visible query `llm wiki 2.0` reported 0 clicks, 1 impression, and average position 13.0. Vercel separately reported 1,402 visitors and 1,593 pageviews property-wide and 4 visitors and 4 pageviews for the target route; no source-to-page sessions are inferred. GitHub reported 47 total stars. Umami and Vercel custom CTA events remained unavailable or account-gated.
- Change: Refresh only `/learn/distilled-wiki-pages-ai-memory` in English: title, metadata, first answer, concrete `/capture` → `/distill` → `/pages` workflow, source-backed maintenance explanation, boundary from code and repository search, maintained references, and visible FAQ copy. Create no new URL, Mandarin translation, schema type, `FAQPage` JSON-LD, CTA change, or external distribution.
- Publish date: not-published
- Index date: indexed-before-2026-07-24-date-unavailable
- Minimum exposure: 10 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 10 GSC target-page impressions, the page earns at least 1 GSC click or keeps average position at 5.0 or better; report Vercel page visitors, GitHub outbound when available, and stars separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 10 GSC target-page impressions, the page has 0 clicks and average position is worse than 6.0. Fewer than 10 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 5.1 through 6.0 is also inconclusive as no material outcome.
- Stop criteria: Stop or hold if maintained Wenlan sources no longer support the workflow or boundary; a canonical, indexing, robots, noindex, structured-data, sitemap, locale, or rendered-layout regression appears; another controller edits the same route; or the refreshed page overlaps the source-backed-wiki trust-mechanics route instead of keeping a distinct category-and-workflow intent.
- 24h readout: pending — verify live 200, title, description, canonical, indexability, Article and BreadcrumbList JSON-LD, maintained references, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency, target-page clicks, impressions and position when available, Vercel page visitors, and stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect the related source-backed wiki, knowledge-base, Obsidian, and MCP-memory routes for intent overlap
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: finish local content, focused RED-to-GREEN assertion, full SEO/i18n/lint/build/technical checks, independent review, and rendered verification; then request explicit push, merge, and production-deploy approval.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T19:58:47Z — LLM-wiki category refresh locally verified

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-llm-wiki-category-refresh`
- Production-in-flight changes: 1
- Scope: English `/learn/distilled-wiki-pages-ai-memory` title, metadata,
  first answer, `/capture` to `/distill` to `/pages` workflow, code/repository
  search boundary, maintained references, and visible FAQ copy; original
  `2026-06-24` publication date retained and `2026-07-24` modification date
  recorded; no URL, Mandarin content, schema type, `FAQPage`, CTA, or external
  distribution change
- Focused verification: the category/workflow assertion failed before
  implementation and passed after the bounded content change; a separate
  mobile-readability assertion failed before the command hint was shortened
  and passed after; the independent review's intent-collision assertions now
  lock the LLM-wiki category page apart from the source-backed trust-mechanics
  route
- Full verification: `pnpm test:seo` 174/174; `pnpm test:i18n` 52/52;
  `pnpm lint`; `pnpm seo:goal:check`; `pnpm build` with 209 static pages;
  built technical SEO with 109 sitemap URLs, 14 checked HTML pages, and no
  `FAQPage` in 113 built HTML files; built i18n smoke with 19 direct-200 and
  5 hard-404 routes; current-production deployed technical SEO;
  `git diff --check`
- Final local HTML: title, description, exact canonical, reciprocal English,
  zh-TW, and zh-CN hreflang, `index, follow`, Article and BreadcrumbList
  JSON-LD, `datePublished: 2026-06-24`, `dateModified: 2026-07-24`, shortened
  workflow command, and `FAQPage` absence passed; SHA-256
  `c1daab8e4ebd4e2cde236e8936babc191a3e1a591f042d8cd3b8e20afea4edd7`
- Render evidence: desktop 1440×1000 and mobile 393×852 confirmed the expected
  H1, first-screen answer, workflow copy, no document or H1 overflow, no
  workflow-code horizontal scroll after the correction, no framework overlay,
  and no browser warning or error. Screenshots are under
  `/tmp/wenlan-seo/visual-qa/2026-07-24-llm-wiki-category/`.
- Independent review: initial `fix-first` findings for stale temporary HTML,
  obsolete raw-Trends wording, and missing intent-separation assertions were
  corrected; re-review verdict is `SHIP` with no remaining blocker.
- Publish date: still `not-published`
- External actions: none; no push, merge, deployment, indexing request,
  validation, external post, OSS submission, or paid acquisition
- Next step: request explicit approval for Git push, merge, and production
  deploy

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-23-zhtw-obsidian-localization at 2026-07-24T20:10:06Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-23-zhtw-obsidian-localization
- Observed at: 2026-07-24T20:10:06Z
- Readout: 24h
- Status: measuring
- Evidence: The latest authenticated weekly range is `2026-06-26..2026-07-23`: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions; the query visibility gap is 6 clicks and 235 impressions. The zh-TW target is absent from the GSC page table, so no zero is inferred; the range ends on the launch date and provides neither a confirmed index date nor a complete post-launch search cohort. The stale indexing snapshot was last updated on `2026-07-09`: 77 indexed URLs, 40 not indexed, 9 pages with redirect, 1 excluded by `noindex`, 1 alternate page with proper canonical, 27 discovered but not indexed, and 2 crawled but not indexed. Search Console last read the sitemap on `2026-07-03` with 101 discovered URLs, while the live sitemap has 109 URLs, so the target's indexing status remains unconfirmed. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide, 255 direct visitors and 319 direct pageviews, and a 1,149-visitor qualified-source aggregate that is not deduplicated. The target has 1 visitor and 2 pageviews in the same range, but that range includes only part of its launch day and is not a complete post-deploy 24-hour cohort. No source-to-page join or causal inference is made. GitHub REST reports 47 total stars. Vercel custom events remain account-gated and no authenticated Umami observation is available, so GitHub outbound and CTA are not reported. The live target returned HTTP 200 with its exact canonical, `index, follow`, `en-US`, `zh-TW`, and `x-default` alternates, Article and BreadcrumbList JSON-LD, visible maintained source links, and no `FAQPage`; the sitemap includes the zh-TW URL and excludes the unsupported zh-CN counterpart, which returned HTTP 404. The deployed technical audit passed 109 sitemap URLs, 14 key pages, noindex policy, redirects, bridge hosts, and legacy exclusions. Desktop 1440×1000 and mobile 393×852 renders showed the expected title and H1, seven maintained-source links, no document or H1 overflow, no framework overlay, and no console warning or error. Render evidence is under `/tmp/wenlan-seo/visual-qa/2026-07-24-zhtw-obsidian-24h/`.
- Result: pending
- Decision: wait
- Next step: Run the 7-day readout after `2026-07-30T15:19:18Z`; apply no success or failure judgment until the target has a confirmed indexing context and reaches the predeclared 5-impression minimum exposure.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T20:16:19Z — LLM-wiki website publication approved

- Record type: campaign-approval
- Approval: the user explicitly approved Git push, merge, and production
  deploy for `EXP-2026-07-24-llm-wiki-category-refresh`
- Approved external actions: push, merge, and deploy only for the current
  website experiment and its production evidence record
- Still approval-gated: Reddit or other external publication, OSS submission,
  paid acquisition, request indexing, GSC validation, and metric-definition
  changes
- Verification at approval: `pnpm test:seo` passed 174/174 with explicit
  Wenlan and wenlan-app checkout roots; `pnpm test:i18n` passed 52/52;
  `pnpm lint`, `pnpm seo:goal:check`, `pnpm build`,
  `pnpm seo:technical:built`, and `git diff --check` passed
- Next step: commit the reviewed scope, push the current branch, merge its PR,
  wait for Vercel production, and verify the live LLM-wiki page

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-llm-wiki-category-refresh at 2026-07-24T20:23:04Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-llm-wiki-category-refresh
- Observed at: 2026-07-24T20:23:04Z
- Readout: correction
- Status: live
- Evidence: PR #63 merged at `2026-07-24T20:18:36Z` as `73c3f0d6a2d7937408df1d297ef0607bd2637fcd`; Vercel production completed at `2026-07-24T20:19:21Z`. The live route returned HTTP 200 with the refreshed title and H1, exact canonical, `index, follow`, reciprocal `en-US`, `zh-TW`, `zh-CN`, and `x-default` alternates, Article and BreadcrumbList JSON-LD, `datePublished: 2026-06-24`, `dateModified: 2026-07-24`, the visible `/capture` to `/distill` to `/pages` workflow, code/repository-search boundary, and maintained Wenlan and LLM-wiki references. No `FAQPage` is present. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. Desktop 1440×1000 and mobile 393×852 renders showed the expected content with no document, H1, or workflow overflow, framework overlay, console warning, or console error. Render evidence is under `/tmp/wenlan-seo/visual-qa/2026-07-24-llm-wiki-production/`. No search-performance result or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Next step: Run the 24-hour technical/evidence readout after `2026-07-25T20:19:21Z`; this production-verified measurement cohort does not block another eligible website change.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T20:42:43Z — localized Learn BreadcrumbList correction locally verified

- Record type: campaign-observation
- Current change: `TECH-2026-07-24-localized-learn-breadcrumb`
- Production-in-flight changes: 1
- Production-before evidence: localized zh-TW and zh-CN Learn articles
  returned HTTP 200 with localized home and article BreadcrumbList items, but
  item 2 incorrectly pointed to the English `https://wenlan.app/learn` hub
- Scope: use `canonicalUrl(resolvedLocale, "/learn")` for localized Article
  BreadcrumbList item 2 and add a focused regression test; no visible copy,
  URL, canonical, hreflang, sitemap, locale availability, schema type, or
  `FAQPage` change
- Focused verification: the new contract failed against the hard-coded
  English ancestor and passed after the one-line implementation fix
- Full verification: `pnpm test:i18n` 53/53; `pnpm test:seo` 174/174 with
  explicit Wenlan and wenlan-app roots; `pnpm lint`;
  `pnpm seo:goal:check`; `pnpm build` with 209 static pages;
  `pnpm seo:technical:built`; `pnpm i18n:technical:built`; and
  `git diff --check`
- Built evidence: zh-TW and zh-CN article BreadcrumbList item 2 now points to
  the corresponding localized Learn hub; all 19 expected direct-200 and five
  expected hard-404 locale routes passed
- Render evidence: zh-TW and zh-CN at 393×852 retained localized title and H1,
  no document overflow, no framework overlay, and no console warning or error;
  screenshots are under
  `/tmp/wenlan-seo/visual-qa/2026-07-24-localized-breadcrumb/`
- Content decision: no new title/meta experiment starts from the weekly top
  three because the report keeps them inside recent measurement windows and
  current query/demand evidence is insufficient for another rewrite
- External actions: none; no push, merge, deploy, indexing request, validation,
  external post, OSS submission, paid acquisition, or metric change
- Next step: finish independent review, then request explicit approval for Git
  push, merge, and production deploy of this technical correction

### 2026-07-24T20:44:38Z — localized Learn breadcrumb independent review

- Record type: campaign-observation
- Current change: `TECH-2026-07-24-localized-learn-breadcrumb`
- Independent review: `SHIP` with no findings
- Review evidence: production reproduces the English Learn ancestor for both
  zh-TW and zh-CN; the local build emits the corresponding localized Learn
  ancestor; English remains `/learn`; Article `isPartOf`, `inLanguage`,
  sitemap membership, locale availability, and visible rendering remain
  unchanged
- Test assessment: the positive localized-helper assertion and explicit
  rejection of the former hard-coded expression adequately guard the defect
- External actions: none
- Next step: request explicit approval for Git push, merge, and production
  deploy; indexing and non-website publication remain separately gated

### 2026-07-24T20:51:29Z — localized Learn breadcrumb production verified

- Record type: campaign-observation
- Current change: `TECH-2026-07-24-localized-learn-breadcrumb`
- Approval: the user explicitly approved Git push, merge, and production
  deployment for this correction in the current Codex task
- Publication: PR #65 merged at `2026-07-24T20:47:55Z` as
  `7f54c64a46d48e1d5f0f4d619bdd5a61aaba75dd`; Vercel production completed at
  `2026-07-24T20:48:42Z`
- Deployed technical verification: robots, 109 sitemap URLs, 14 key pages, six
  utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six
  bridge-host redirects, and old-URL exclusions passed
- Locale-route verification: 19 expected HTTP 200 routes and five expected
  HTTP 404 routes passed against `https://wenlan.app`
- Structured-data verification: live zh-TW and zh-CN LLM-wiki articles emit
  `https://wenlan.app/zh-TW/learn` and
  `https://wenlan.app/zh-CN/learn` respectively as BreadcrumbList item 2 while
  retaining exact localized canonicals, H1s, and language tags
- Render verification: both 393×852 production pages had no document
  overflow, framework overlay, console warning, or console error
- Status: production-verified; the production preparation slot is open
- Unperformed gated actions: no indexing request, GSC validation, external
  post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the due Learn-hub and LLM-wiki 24-hour readouts after their
  predeclared timestamps and continue the read-only demand/coverage-gap audit
  without rewriting low-evidence weekly candidates

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-mcp-shared-memory-exposure

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-mcp-shared-memory-exposure
- Status: active
- Data window: 2026-07-18..2026-07-24
- Asset class: integration-hub
- Launched: 2026-07-24
- Hypothesis: Adding one relevant internal link from the high-use MCP memory integration hub to the existing Cursor and Claude Code shared-memory workflow will improve discovery and search exposure for the indexed target without stacking another copy rewrite on a page refreshed on 2026-07-17.
- Candidate evidence: Authenticated GSC for `2026-06-26..2026-07-23` reports 0 clicks, 8 impressions, and average position 20.8 for `/learn/cursor-claude-code-shared-memory`, and 0 clicks, 2 impressions, and average position 5.5 for `/learn/mcp-memory-server`. Same-range Vercel reports 291 visitors and 293 pageviews for the source; the target is absent from the returned top-page export, so no zero is inferred. Official signed-in Google Trends Explore captures at `2026-07-19T02:47:01Z` record `memory MCP` moving `2.0 → 7.0` inside a focused English Worldwide, past-12-month, request-relative 0–100 series; related queries in the committed integration-cluster interpretation include Claude, Claude Code, Codex, agent, and open memory. Reddit and GitHub/OSS observations captured on `2026-07-18` independently describe cross-session and cross-instance memory and a crowded cross-client MCP-memory category. The target already provides a standalone same-daemon, same-data-directory, same-space smoke test backed by current client documentation and the maintained Wenlan source.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target page has 0 clicks, 8 impressions, and average position 20.8; the source page has 0 clicks, 2 impressions, and average position 5.5. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide and 291 visitors and 293 pageviews for the source; no target count or source-to-target sessions are inferred. GitHub reports 47 total stars. Umami and Vercel custom CTA events remain unavailable or account-gated.
- Change: Add only `cursor-claude-code-shared-memory` to the English `/learn/mcp-memory-server` article's `relatedSlugs`. Do not edit the source or target copy, metadata, dates, URL, canonical, hreflang, sitemap, schema, CTA, Mandarin coverage, or external distribution.
- Publish date: not-published
- Index date: indexed-before-2026-07-24-date-unavailable
- Minimum exposure: 10 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 10 GSC target-page impressions, the target earns at least 1 GSC click or average position is 18.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 10 GSC target-page impressions, the target has 0 clicks and average position is worse than 22.0. Fewer than 10 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 18.1 through 22.0 is also inconclusive.
- Stop criteria: Stop or hold if the source-target relationship is no longer useful, maintained Wenlan or client sources no longer support the shared-memory workflow, the link creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, or rendered-layout regression, another controller edits either route, or the experiment would require an untracked source-to-target attribution claim.
- 24h readout: pending — verify both live routes, the visible source link, target canonical and indexability, structured data, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency, target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect source-target relevance, duplicate anchors, and overlap with the active Claude Code and Learn-hub cohorts
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: complete the focused RED-to-GREEN link assertion, full SEO/i18n/lint/build/technical checks, rendered verification, and independent review; then request explicit Git push, merge, and production-deploy approval.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T21:03:08Z — MCP shared-memory exposure locally verified

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-mcp-shared-memory-exposure`
- Production-in-flight changes: 1
- Scope: add only `cursor-claude-code-shared-memory` to the English
  `/learn/mcp-memory-server` related-article list; no source or target copy,
  metadata, date, URL, canonical, hreflang, sitemap, schema, CTA, Mandarin
  availability, or external-distribution change
- Focused verification: the new source-scoped related-link assertion failed
  before implementation and passed after the one-slug addition
- Full verification: `pnpm test:seo` 175/175 with explicit Wenlan and
  wenlan-app roots; `pnpm test:i18n` 53/53; `pnpm lint`;
  `pnpm seo:goal:check`; `pnpm build` with 209 static pages;
  `pnpm seo:technical:built`; built i18n smoke with 19 direct-200 and five
  hard-404 routes; `git diff --check`
- Local production evidence: the source and target returned HTTP 200, the
  source contained exactly one target link, and the target retained its exact
  self-canonical and `index, follow`
- Render evidence: mobile 393×852 and desktop 1440×1000 source renders showed
  the complete four-link related block; the mobile target retained the
  expected title and H1; there was no document overflow, framework overlay,
  `FAQPage`, console warning, or console error; screenshots are under
  `/tmp/wenlan-seo/visual-qa/2026-07-24-mcp-shared-memory-exposure/`
- Locale evidence: neither changed English slug entered the translated Learn
  availability registry; the 53 i18n contracts and localized smoke routes
  passed
- External actions: none; no push, merge, deployment, indexing request,
  validation, external post, OSS submission, paid acquisition, or metric
  change
- Next step: finish independent review, then request explicit Git push, merge,
  and production-deploy approval

### 2026-07-24T21:10:24Z — MCP shared-memory exposure approved for publication

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-mcp-shared-memory-exposure`
- Independent review: the initial pass found one stale contradiction in the
  mutable `PLAN.md` state; after that wording was corrected, the reviewer
  reread the changed state and returned `SHIP` with no other finding
- Approval: the user explicitly approved Git push, PR creation, merge, and
  production deployment in this Codex task
- Scope unchanged: one English related-article link and its focused contract;
  no copy, metadata, dates, URL, canonical, hreflang, sitemap, schema, CTA,
  Mandarin availability, indexing request, validation, external post, OSS
  submission, paid acquisition, or metric-definition change
- Next step: publish the reviewed branch and verify the resulting Vercel
  production deployment before marking the change production-verified

### 2026-07-24T21:13:05Z — MCP shared-memory exposure production verified

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-mcp-shared-memory-exposure`
- Status: live; measuring
- Production-in-flight changes: 0
- Publication: PR #67 merged at `2026-07-24T21:12:18Z` as
  `6de693d7069db65455712022efbad0520830746d`; Vercel production completed at
  `2026-07-24T21:13:05Z`
- Deployed technical verification: robots, 109 sitemap URLs, 14 key pages, six
  utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six
  bridge-host redirects, and old-URL exclusions passed
- Locale-route verification: 19 expected HTTP 200 routes and five expected
  HTTP 404 routes passed against `https://wenlan.app`
- Live source evidence: `/learn/mcp-memory-server` returned HTTP 200, retained
  its exact self-canonical and `index, follow`, and contained exactly one
  rendered link labeled `How to Share Memory Between Cursor and Claude Code`
- Live target evidence:
  `/learn/cursor-claude-code-shared-memory` returned HTTP 200 with the expected
  title and H1, exact self-canonical, `index, follow`, and no `FAQPage`
- Render verification: at 1280×720 the source link was visible and a real
  click navigated to the target; both pages had document width equal to client
  width and no console warning or console error
- Metric interpretation: no 24-hour SEO-success judgment, source-to-target
  session inference, causality claim, or new GSC/Vercel/Umami/GitHub metric
- Unperformed gated actions: no indexing request, GSC validation, external
  post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the predeclared 24-hour technical/evidence readout after
  `2026-07-25T21:13:05Z`; waiting for that readout does not close the
  production preparation slot

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-mcp-shared-memory-exposure at 2026-07-24T21:17:37Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-mcp-shared-memory-exposure
- Observed at: 2026-07-24T21:17:37Z
- Readout: correction
- Status: live
- Evidence: PR #67 merged at `2026-07-24T21:12:18Z` as `6de693d7069db65455712022efbad0520830746d`; Vercel production completed at `2026-07-24T21:13:05Z`. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. Nineteen expected locale routes returned HTTP 200 and five unsupported locale routes returned HTTP 404. The live source returned HTTP 200 with its exact self-canonical, `index, follow`, and exactly one visible shared-memory target link. A rendered click navigated to the HTTP 200 target with the expected title and H1, exact self-canonical, `index, follow`, no `FAQPage`, no document overflow, and no console warning or error. No search-performance result, source-to-target session, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Next step: Run the 24-hour technical/evidence readout after `2026-07-25T21:13:05Z`; this production-verified measurement cohort does not block another eligible website change.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-stale-ai-memory-diagnostic

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-stale-ai-memory-diagnostic
- Status: active
- Data window: 2026-07-18..2026-07-24
- Asset class: diagnostic-recipe
- Launched: 2026-07-24
- Hypothesis: Refreshing the existing English trust page into a modifier-qualified, source-backed diagnostic for stale and contradictory AI-agent memory will improve qualified discovery and exposure for that failure-mode intent without overlapping the active Claude Code or MCP workflows.
- Candidate evidence: Five English Reddit discussions observed at `2026-07-24T21:25:46Z` independently describe stale, contradictory, duplicated, or obsolete agent memory. Their search-result score snapshots were +39, +0, +2, +1, and +2; Reddit JSON returned HTTP 403, so these are not API scores. The directly inspectable HTML URLs and full provenance are recorded in `docs/seo-audits/2026-07-24-stale-ai-memory-diagnostic-prelaunch.md`. GitHub API evidence for open NousResearch/hermes-agent issue #10771 reports 9 comments, 5 reactions, creation at `2026-04-16T05:20:31Z`, and update at `2026-07-19T11:13:41Z`; it independently reports stale relative dates, contradictory entries, duplicates, obsolete notes, and memory rot. The existing Wenlan page partly covers trust but lacks a usable symptom-to-verification workflow. Maintained Wenlan commit `93451bf0ef58399e08400e3b4ac613942adcfec8`, version `0.14.1`, proves `/recall`, read-only `/lint deep`, `/curate revisions`, corrections and supersession, and destructive `/forget`. External observations are demand discovery only, not GSC or keyword volume.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target route is absent from the returned GSC page export, so no target zero, position, or indexing status is inferred. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide and 1 visitor and 1 pageview for the target route. GitHub reports 47 total stars. Umami and Vercel custom CTA events remain unavailable or account-gated. No source-to-page join or causal inference is made.
- Change: Refresh only the existing English `/learn/review-before-trust-ai-memory` article title, metadata, body, diagnostic code block, FAQ copy, maintained references, and related links. Keep its URL, canonical, sitemap membership, locale availability, Article and BreadcrumbList schema types, and CTA unchanged. Add no Mandarin route, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: unknown-existing-route
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 5 GSC target-page impressions, the target earns at least 1 GSC click or average position is 20.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 5 GSC target-page impressions, the target has 0 clicks and average position is worse than 30.0. Fewer than 5 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 20.1 through 30.0 is also inconclusive.
- Stop criteria: Stop or hold if maintained Wenlan sources no longer support the workflow, the diagnostic overlaps an active Claude Code or MCP page, another controller edits the route, or the change creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, or rendered-layout regression.
- 24h readout: pending — verify the live route, title, metadata, canonical, indexability, structured data, maintained references, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency and target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect diagnostic-intent relevance plus overlap with the Claude Code, MCP, Learn-hub, and LLM-wiki cohorts
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: complete RED-to-GREEN article verification, full SEO/i18n/lint/build/technical checks, rendered verification, independent review, and the user-approved website publication; do not perform indexing or external distribution.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-24T23:02:17Z — stale AI memory diagnostic locally verified

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-stale-ai-memory-diagnostic`
- Production-in-flight changes: 1
- Scope: refresh the existing English
  `/learn/review-before-trust-ai-memory` route into a source-backed
  stale/contradictory-memory diagnostic; no new URL, translation, canonical,
  sitemap, schema type, CTA, `FAQPage`, indexing request, or external
  distribution
- Focused verification: the new article contract failed against the old
  abstract trust page and passed after the diagnostic refresh; rendered mobile
  QA then exposed an internally scrolling command block, and a second
  RED-to-GREEN pass shortened only the example lines until the block fit
  337px inside 337px
- Full verification: `pnpm test:seo` 176/176 with explicit Wenlan and
  wenlan-app roots; `pnpm test:i18n` 53/53; `pnpm lint`;
  `pnpm seo:goal:check`; `pnpm build` with 209 static pages;
  `pnpm seo:technical:built`; built i18n smoke with 19 direct-200 and five
  hard-404 routes; `pnpm seo:technical:deployed`; and `git diff --check`
- Technical evidence: the final build retains 109 sitemap URLs, 26 compiled
  redirects, seven compiled noindex headers, 14 checked HTML pages, and no
  `FAQPage` across 113 built HTML files; unchanged production passed robots,
  109 sitemap URLs, 14 key pages, six utility noindex headers, 25 redirects,
  six bridge redirects, and legacy exclusions
- Render evidence: 1280×720 and 393×852 exposed the exact title and H1,
  canonical, `index, follow`, four maintained source links, Article and
  BreadcrumbList JSON-LD, and no `FAQPage`, framework overlay, document/H1/code
  overflow, console warning, or console error; screenshots are under
  `/tmp/wenlan-seo/visual-qa/2026-07-24-stale-ai-memory-diagnostic/`
- Metric interpretation: the GSC target remains absent from the authenticated
  page export, which is not a zero; same-range Vercel target baseline is
  1 visitor and 1 pageview; no source-to-page session or causal claim is made
- Approval: the user explicitly approved Git push, PR, merge, and production
  deployment for this bounded website experiment; indexing, GSC validation,
  external posts, OSS submission, paid acquisition, and metric changes remain
  unapproved
- Next step: complete independent final review, then publish and verify
  production

### 2026-07-24T23:06:05Z — stale AI memory diagnostic independent review

- Record type: campaign-observation
- Current change: `EXP-2026-07-24-stale-ai-memory-diagnostic`
- Independent review: `SHIP` with no P0–P2 findings
- Review evidence: all five candidate gates and source-native baselines were
  inspectable; the article preserves the read-only lint, curated revision,
  correction, and destructive forget boundaries; its failure-mode intent is
  distinct from Claude Code native memory, MCP setup/shared-client memory, and
  the product-reference docs; PLAN and the append-only ledger consistently
  report seven active experiments and one production slot
- Independent verification: `pnpm seo:goal:check`; `pnpm test:seo` 176/176;
  `pnpm test:i18n` 53/53; TypeScript lint; focused article contract;
  `git diff --check`; and fresh desktop/mobile clipping and command-block
  overflow inspection all passed
- Next step: commit, push, merge the user-approved PR, wait for Vercel
  production, and verify the deployed route before marking the experiment live

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-stale-ai-memory-diagnostic at 2026-07-24T23:08:30Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-stale-ai-memory-diagnostic
- Observed at: 2026-07-24T23:08:30Z
- Readout: correction
- Status: live
- Publish date: 2026-07-24
- Production-in-flight changes: 0
- Evidence: PR #69 merged at `2026-07-24T23:07:44Z` as `ee9694d40771a6477bf9b7c294f1ec45f7dd7c69`; Vercel production completed at `2026-07-24T23:08:30Z`. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. Nineteen expected locale routes returned HTTP 200 and five unsupported locale routes returned HTTP 404. The live English route returned HTTP 200 with the expected title and description, exact self-canonical, `index, follow`, Article and BreadcrumbList JSON-LD, `dateModified` `2026-07-24`, four maintained source links, and no `FAQPage`. Desktop 1280×720 and mobile 393×852 production renders showed the expected H1, no framework overlay, no console warning or error, and no document, H1, or command-block overflow; the mobile document and command widths were `387/387` and `337/337`. Render evidence is under `/tmp/wenlan-seo/visual-qa/2026-07-24-stale-ai-memory-production/`. This launch changes no Mandarin route; the separate zh-TW and zh-CN route smoke passed without regression.
- Metric interpretation: The authenticated pre-publish GSC target-page absence remains absence, not zero. Same-range Vercel target baseline remains 1 visitor and 1 pageview, and GitHub remains 47 total stars. No post-deploy SEO result, source-to-page session, CTA, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or other external post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the 24-hour technical/evidence readout after `2026-07-25T23:08:30Z`; this production-verified measurement cohort does not consume the production slot
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-claude-mem-comparison-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-claude-mem-comparison-refresh
- Status: active
- Data window: 2026-07-18..2026-07-24
- Asset class: refresh
- Launched: 2026-07-24
- Hypothesis: Correcting the existing claude-mem comparison around the current automatic-versus-explicit memory decision will improve qualified exposure for comparison intent without overlapping the active Claude Code memory page.
- Candidate evidence: The target has 7 authenticated GSC impressions, 0 clicks, and average position 14.4. Same-range Vercel reports 1 visitor and 1 pageview for the target. Current claude-mem commit `132b46343e60ecf4057c427736c57b08f7615dfe` and release `v13.12.4` show that the page's Claude-Code-only, MIT-license, and weak cross-agent framing is stale. GitHub REST reports 88,477 stars, 7,680 forks, and 274 open issues in native OSS units; issues #1270 and #1328 independently repeat the cross-agent job. Full provenance is recorded in `docs/seo-audits/2026-07-24-claude-mem-comparison-prelaunch.md`. External observations validate the candidate but are not GSC or keyword volume.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target page has 7 impressions, 0 clicks, and average position 14.4; no visible query row is joined to it. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide and 1 visitor and 1 pageview for the target. GitHub reports 47 Wenlan total stars. Umami and Vercel custom CTA events remain unavailable or account-gated. No source-to-page join or causal inference is made.
- Change: Refresh only the existing English `/learn/wenlan-vs-claude-mem` title, metadata, first answer, comparison copy and table, FAQ copy, and maintained references. Correct the competitor license and cross-agent support. Keep the URL, canonical, sitemap membership, locale availability, Article and BreadcrumbList schema types, and CTA unchanged. Add no Mandarin route, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: unknown-existing-route
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 5 GSC target-page impressions, the target earns at least 1 GSC click or average position is 12.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 5 GSC target-page impressions, the target has 0 clicks and average position is worse than 20.0. Fewer than 5 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 12.1 through 20.0 is also inconclusive.
- Stop criteria: Stop or hold if maintained sources no longer support the comparison, the page overlaps the active Claude Code memory intent, another controller edits the route, or the change creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, source-link, or rendered-layout regression.
- 24h readout: pending — verify the live route, title, metadata, canonical, indexability, structured data, maintained references, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency and target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect comparison-intent relevance plus overlap with the Claude Code memory cohort
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: complete RED-to-GREEN article verification, full SEO/i18n/lint/build/technical checks, rendered verification, and independent review; stop before push, PR, merge, or deploy without new explicit approval
<!-- EXPERIMENT-RECORD:END -->

### Campaign observation — 2026-07-25T00:02:30Z

- Experiment: `EXP-2026-07-24-superlocalmemory-comparison-refresh`
- Local preparation: complete
- Reviewer: initial `FIX FIRST` because the regression contracts did not protect the Mode C `87.7%` scope or the AGPL-family and commercial-license facts; added article-scoped assertions in both SEO contract suites; focused re-review returned `SHIP` with no remaining P0–P2 findings
- Verification: `seo:goal:check` passed; SEO tests 178/178; i18n tests 53/53; TypeScript lint passed; build generated 209 static pages; built technical SEO passed with 109 sitemap locations and no `FAQPage` in 113 built HTML files; locale-route technical checks and `git diff --check` passed
- Rendered QA: desktop and mobile production-build frames covered the complete article; document/client widths were `1274/1274` and `387/387`; the comparison table remained intentionally horizontally scrollable on mobile; source links, title, canonical, `index, follow`, Article and BreadcrumbList schema, and visible benchmark/licensing copy passed; browser warnings/errors were empty; both inline visual passes passed
- Locale decision: English refresh only. The authenticated/localized evidence does not establish a Mandarin SuperLocalMemory comparison cluster, so no zh-TW or zh-CN page was added; the existing localized route matrix passed without regression.
- Approval: at `2026-07-25T00:02:30Z`, the user approved commit, push, PR, merge, deployment, and production verification for this website change
- Still unapproved: request indexing, GSC validation, Reddit or other external publication, OSS submission, paid acquisition, and metric-definition changes
- Next step: publish through the normal PR gate, verify the production route and technical SEO, append the production evidence, and release the one production slot

### Campaign observation — 2026-07-24T23:27:13Z

- Experiment: `EXP-2026-07-24-claude-mem-comparison-refresh`
- Local preparation: complete
- Reviewer: initial `FIX FIRST` because the article treated Gemini as a client integration and named unsupported Hermes support; corrected to the pinned installation guide's supported-IDE list and cited that guide; focused re-review returned `SHIP`
- Verification: `seo:goal:check` passed; SEO tests 177/177; i18n tests 53/53; TypeScript lint passed; build generated 209 static pages; built technical SEO passed with 109 sitemap locations and no `FAQPage` in 113 built HTML files; `git diff --check` passed
- Rendered QA: desktop `1274/1274` and mobile `387/387` document/client widths; corrected integration list present; unsupported Gemini/Hermes integration claim absent; browser warnings/errors empty; both inline visual passes passed
- Locale decision: English refresh only. The latest authenticated/localized evidence still does not establish a Mandarin claude-mem comparison cluster, so no zh-TW or zh-CN page was added.
- Approval: at `2026-07-24T23:27:13Z`, the user approved commit, push, PR, merge, deployment, and production verification for this website change
- Still unapproved: request indexing, GSC validation, Reddit or other external publication, OSS submission, paid acquisition, and metric-definition changes
- Next step: publish through the normal PR gate, verify the production route and technical SEO, append the production evidence, and release the one production slot

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-claude-mem-comparison-refresh at 2026-07-24T23:34:19Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-claude-mem-comparison-refresh
- Observed at: 2026-07-24T23:34:19Z
- Readout: correction
- Status: live
- Publish date: 2026-07-24
- Production-in-flight changes: 0
- Evidence: PR #71 merged at `2026-07-24T23:33:32Z` as `f6e5dd083ad5086fe4c4552cee1764c8dc848645`; Vercel production completed at `2026-07-24T23:34:19Z`. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English route returned HTTP 200 with the expected title, exact self-canonical, `index, follow`, Article and BreadcrumbList JSON-LD, v13.12.4 and pinned installation sources, the corrected supported-IDE list, and no `FAQPage`. Desktop and mobile production renders showed the expected H1 and corrected copy, no console warning or error, and no document or H1 overflow; desktop and mobile document/client widths were `1274/1274` and `387/387`.
- Metric interpretation: The authenticated pre-publish target baseline remains 7 GSC impressions, 0 clicks, and average position 14.4. Same-range Vercel remains 1 visitor and 1 pageview for the target, while GitHub remains 47 total stars. No post-deploy SEO result, source-to-page session, CTA, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or other external post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the 24-hour technical/evidence readout after `2026-07-25T23:34:19Z`; this production-verified measurement cohort does not consume the production slot
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-24-superlocalmemory-comparison-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-24-superlocalmemory-comparison-refresh
- Status: active
- Data window: 2026-07-18..2026-07-24
- Asset class: refresh
- Launched: 2026-07-24
- Hypothesis: Correcting the existing SuperLocalMemory comparison around the current control-plane-versus-source-backed-wiki decision and matching the current competitor brand/version will improve qualified exposure for comparison intent without creating a competing URL.
- Candidate evidence: The target has 16 authenticated GSC impressions, 0 clicks, and average position 8.6. The visible query `super local memory` has 1 impression, 0 clicks, and average position 45.0, but the separate query and page exports are not joined. Earlier overlapping weekly data also returned `superlocal memory` and `super local memory`, establishing recurrence without adding the counts. GitHub REST reports 197 stars, 33 forks, 5 open issues, AGPL-3.0, and current commit `893e6d7d521cef6013d35f0ea468eca3005916de`; npm reports v3.8.3 published at `2026-07-24T15:17:25.395Z`. The v3.8.3 README and changelog show material drift to a local-first agent memory control plane with temporal retrieval, team scopes and access, audit, cache/compression, bounded loops, and framework adapters. Full provenance is recorded in `docs/seo-audits/2026-07-24-superlocalmemory-comparison-prelaunch.md`. OSS observations validate accuracy and intent but are not GSC or keyword volume.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target has 16 impressions, 0 clicks, and average position 8.6. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide and 7 visitors and 7 pageviews for the target. GitHub reports 47 Wenlan total stars. Umami and Vercel custom CTA events remain unavailable or account-gated. No source-to-page join or causal inference is made.
- Change: Refresh only the existing English `/learn/wenlan-vs-superlocal-memory` title, metadata, first answer, source links, body, comparison table, FAQ copy, and related links. Correct the current SuperLocalMemory product boundary and the published 60.4%, 74.8%, and 87.7% benchmark scopes. Keep the URL, canonical, sitemap membership, locale availability, Article and BreadcrumbList schema types, and CTA destination unchanged. Add no Mandarin route, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: unknown-existing-route
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 5 GSC target-page impressions, the target earns at least 1 GSC click or average position is 7.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 5 GSC target-page impressions, the target has 0 clicks and average position is worse than 15.0. Fewer than 5 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 7.1 through 15.0 is also inconclusive.
- Stop criteria: Stop or hold if maintained sources no longer support the comparison, another controller edits the route, a claim cannot be pinned to first-party evidence, or the change creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, source-link, or rendered-layout regression.
- 24h readout: pending — verify the live route, title, metadata, canonical, indexability, structured data, maintained references, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency and target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect comparison-intent relevance plus overlap with the local-first, trust, and claude-mem comparison cohorts
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: complete RED-to-GREEN article verification, full SEO/i18n/lint/build/technical checks, rendered verification, and independent review; stop before push, PR, merge, or deploy without new explicit approval
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-superlocalmemory-comparison-refresh at 2026-07-25T00:05:36Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-superlocalmemory-comparison-refresh
- Observed at: 2026-07-25T00:05:36Z
- Readout: correction
- Status: live
- Publish date: 2026-07-24
- Production-in-flight changes: 0
- Evidence: PR #73 merged at `2026-07-25T00:04:41Z` as `9883ddaf74ae07667a57d752aee59468c2d0ee1c`; Vercel production deployment `dpl_7ywPX5MLQVhr5NtFWqCNnevbTAGM` completed at `2026-07-25T00:05:36Z`, and `wenlan.app` resolved to that deployment. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English route returned HTTP 200 with the expected v3.8.3 title and H1, exact self-canonical, `index, follow`, English language, SoftwareApplication, WebSite, Organization, Article, and BreadcrumbList JSON-LD, five maintained source links, and no `FAQPage`. Desktop and mobile production renders showed the refreshed page without document or H1 overflow; desktop document/client widths were `1274/1274`, mobile widths were `387/387`, the mobile comparison table exposed its full 98-pixel horizontal scroll range, and browser warning/error logs were empty.
- Metric interpretation: The authenticated pre-publish target baseline remains 16 GSC impressions, 0 clicks, and average position 8.6. Same-range Vercel remains 7 visitors and 7 pageviews for the target, while GitHub remains 47 Wenlan total stars. No post-deploy SEO result, source-to-page session, CTA, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or other external post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the 24-hour technical/evidence readout after `2026-07-26T00:05:36Z`; this production-verified measurement cohort does not consume the production slot
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-25-basic-memory-comparison-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-25-basic-memory-comparison-refresh
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: refresh
- Launched: 2026-07-25
- Hypothesis: Correcting the existing comparison around Basic Memory's current local, Cloud, Teams, search, and maintenance paths versus Wenlan's source-backed AI-work workflow will improve qualified exposure without creating a competing URL.
- Candidate evidence: The target has 20 authenticated GSC impressions, 1 click, and average position 14.6. Joined visible rows `basic memory` and `basicmemory` have 5 impressions and 0 clicks; the page click is outside those visible rows and remains unattributed. Basic Memory release v0.22.1, PyPI v0.22.1, current source commit `5d444f0974476645f904c1446998c0a938a6e7f7`, and docs commit `1c670035987b21f0a93d4e45ea1eed1487775f74` show material drift from the page's local-vault-only framing to explicit local or hosted deployment, Teams, cross-client MCP, semantic and graph search, agent skills, sync, snapshots, and hosted file history. Independent English comparison surfaces from Mem0, Creed, and Hippo include Basic Memory in direct product-selection decisions. Each external surface is one inspectable observation, not keyword volume. Full provenance is recorded in `docs/seo-audits/2026-07-25-basic-memory-comparison-prelaunch.md`.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target has 20 impressions, 1 click, and average position 14.6. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide and 5 visitors and 5 pageviews for the target. GitHub reports 47 Wenlan total stars. Umami and Vercel custom CTA events remain unavailable or account-gated. No source-to-page join or causal inference is made.
- Change: Refresh only the existing English `/learn/wenlan-vs-basic-memory` H1, first answer, maintained source links, Basic Memory product boundary, decision framework, comparison table, FAQ copy, and freshness statement. State local and hosted Basic Memory paths separately, remove unsupported retrieval-scale and local-only history claims, and preserve a neutral chooser. Keep the URL, meta title, canonical, sitemap membership, locale availability, Article and BreadcrumbList schema types, related routes, and CTA destination unchanged. Add no Mandarin route, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: unknown-existing-route
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 5 GSC target-page impressions, the target earns at least 1 GSC click or average position is 12.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 5 GSC target-page impressions, the target has 0 clicks and average position is worse than 20.0. Fewer than 5 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 12.1 through 20.0 is also inconclusive.
- Stop criteria: Stop or hold if maintained sources no longer support the comparison, another controller edits the route, a claim cannot be pinned to first-party evidence, or the change creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, source-link, or rendered-layout regression.
- 24h readout: pending — verify the live route, title, metadata, canonical, indexability, structured data, maintained references, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency and target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect Basic Memory comparison relevance plus overlap with the knowledge-base, Learn-hub, and other comparison cohorts
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: complete focused article verification, full SEO/i18n/lint/build/technical checks, rendered verification, and independent review; stop before push, PR, merge, or deploy without new explicit approval
<!-- EXPERIMENT-RECORD:END -->

### Campaign observation — 2026-07-25T01:01:13Z

- Experiment: `EXP-2026-07-25-basic-memory-comparison-refresh`
- Local preparation: complete
- Change: refreshed the existing English Basic Memory comparison around its
  current local, Cloud, Teams, semantic and graph search, Agent Skills, hosted
  history, and collaboration paths versus Wenlan's source-backed Sources,
  Memories, and Pages workflow; preserved the URL, meta title, canonical,
  sitemap membership, locale availability, schema types, related routes, and
  CTA destination
- Publication-date correction: preserved the original
  `publishedAt: "2026-05-14"` and set `updatedAt: "2026-07-25"`; removed
  Wenlan-only LME numbers from the side-by-side table so the page does not
  imply an unmatched benchmark comparison
- Reviewer: initial `FIX FIRST` for the publication-date schema and asymmetric
  benchmark presentation; both were fixed, and the final independent verdict
  was `SHIP` with no remaining P0-P2 findings
- Verification: `seo:goal:check` passed; SEO tests 182/182; i18n tests 53/53;
  TypeScript lint passed; build generated 209 static pages; built technical SEO
  passed with 109 sitemap locations and no `FAQPage` in 113 built HTML files;
  production-build locale checks and `git diff --check` passed
- Rendered QA: desktop 1440x1000 and mobile 393x852 returned 200 with the
  expected H1, exact self-canonical, `index, follow`, Article and
  BreadcrumbList schema, no `FAQPage`, correct `datePublished` and
  `dateModified`, nine HTTPS source links, no document or H1 overflow, and no
  browser warning or error
- Locale decision: English refresh only. The authenticated and discovery
  evidence does not establish a Mandarin Basic Memory comparison cluster;
  zh-TW and zh-CN unsupported routes remain intentional 404s.
- Approval: at `2026-07-25T01:01:13Z`, the user approved commit, push, PR,
  merge, deployment, and production verification for this website change
- Still unapproved: request indexing, GSC validation, Reddit or other external
  publication, OSS submission, paid acquisition, and metric-definition changes
- Next step: publish through the normal PR gate, verify the production route
  and deployed technical SEO, append the production evidence, and release the
  one production slot
