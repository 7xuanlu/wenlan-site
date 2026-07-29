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

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-25-basic-memory-comparison-refresh at 2026-07-25T01:04:56Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-25-basic-memory-comparison-refresh
- Observed at: 2026-07-25T01:04:56Z
- Readout: correction
- Status: live
- Publish date: 2026-07-25
- Production-in-flight changes: 0
- Evidence: PR #76 merged at `2026-07-25T01:04:11Z` as `983f9383b499c73e293b7c61e5f256ea1276388b`; Vercel production completed at `2026-07-25T01:04:56Z`. The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English route returned HTTP 200 with the refreshed H1, exact self-canonical, `index, follow`, English language, SoftwareApplication, WebSite, Organization, Article, and BreadcrumbList JSON-LD, nine maintained source links, no `FAQPage`, `datePublished: "2026-05-14"`, and `dateModified: "2026-07-25"`. Desktop and mobile production renders showed the refreshed page without document or H1 overflow; the mobile comparison table remained horizontally accessible; no unmatched LME metric or browser warning/error was present.
- Metric interpretation: The authenticated pre-publish target baseline remains 20 GSC impressions, 1 click, and average position 14.6. Joined visible rows remain 5 impressions and 0 clicks, with the page click unattributed. Same-range Vercel remains 5 visitors and 5 pageviews for the target, while GitHub remains 47 Wenlan total stars. No post-deploy SEO result, source-to-page session, CTA, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or other external post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the 24-hour technical/evidence readout after `2026-07-26T01:04:56Z`; this production-verified measurement cohort does not consume the production slot
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-25-ai-agent-memory-types

- Record type: experiment-start
- Experiment ID: EXP-2026-07-25-ai-agent-memory-types
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: net-new-search
- Launched: 2026-07-25
- Hypothesis: A neutral placement guide for working, episodic, semantic, and procedural AI-agent memory will earn qualified exposure inside the validated English `agent memory` category without competing with Wenlan's existing AI-work-memory definition, capture-quality guide, handoff workflow, or product memory-type reference.
- Candidate evidence: A signed-in Google Trends Explore export captured at `2026-07-25T01:42:25Z` preserves 53 raw weekly request-relative `0–100` rows for one Worldwide, Web Search, past-12-month request. Inside that request, `AI agent memory` moved from a first-13-week average of 3.7 to a latest-13-week average of 26.9, and `agent memory` from 11.7 to 73.1. The raw CSV and provenance metadata are committed under `docs/seo-audits/data/`. Four English Reddit threads observed at `2026-07-25T01:27:14Z` represent three independent authors; two procedural-memory posts share one author and count as one source. CoALA and LangChain establish the four-role taxonomy, while Letta supports the placement tradeoff. The complete URLs, dates, native units, provenance, limitations, and coverage audit are in `docs/seo-audits/2026-07-25-ai-agent-memory-types-prelaunch.md`. External observations are demand discovery only, not GSC input or keyword volume.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target page and target query have no prelaunch rows because the URL is net new; no zero or indexing state is inferred. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide, with no target-route baseline. GitHub reports 47 Wenlan total stars. Umami and Vercel custom CTA events remain unavailable or account-gated. No source-to-page join or causal inference is made.
- Change: Add one English `/learn/ai-agent-memory-types` article that defines the four roles, gives a practical placement guide, explains their different lifecycles, and conservatively maps Wenlan's durable captures, handoffs, and source-backed pages while keeping client working context and procedural rules or skills distinct. Explicitly state that Wenlan's six `memory_type` values are capture metadata, not the four cognitive layers. Add no zh-TW or zh-CN route, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: unknown-net-new-route
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 5 GSC target-page impressions, the target earns at least 1 GSC click or average position is 30.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 5 GSC target-page impressions, the target has 0 clicks and average position is worse than 40.0. Fewer than 5 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 30.1 through 40.0 is also inconclusive.
- Stop criteria: Stop or hold if maintained sources do not support the taxonomy, the page conflates cognitive roles with Wenlan's capture metadata, another controller edits the route, or the change creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, source-link, or rendered-layout regression.
- 24h readout: pending — verify the live route, title, metadata, canonical, indexability, structured data, maintained references, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency and target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect whether the taxonomy page remains distinct from AI work memory, capture quality, handoff, and Wenlan memory-type docs
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: run the focused article contract RED, implement the bounded English page, then complete full SEO/i18n/lint/build/technical, rendered, and independent-review gates before the approved PR and production path
<!-- EXPERIMENT-RECORD:END -->

### Campaign observation — 2026-07-25T01:45:53Z

- Experiment: `EXP-2026-07-25-ai-agent-memory-types`
- Local preparation: complete
- Change: added one English `/learn/ai-agent-memory-types` acquisition page
  explaining working, episodic, semantic, and procedural memory roles plus a
  product-independent placement guide; explicitly separated those roles from
  Wenlan's six capture metadata values
- Evidence repair: committed the complete signed-in 53-week Google Trends
  export and metadata, counted four Reddit threads as three independent
  authors, and used Letta only as placement evidence rather than taxonomy
  proof
- Reviewer: initial `FIX FIRST` for evidence provenance and attribution; all
  findings were corrected, and focused re-review returned `SHIP` with no
  remaining P0-P2 findings
- Verification: `seo:goal:check` passed; SEO tests 184/184; i18n tests 53/53;
  TypeScript lint passed; weekly sample pipeline passed; build generated 211
  static pages; built technical SEO passed with 110 sitemap locations and no
  `FAQPage` in 114 built HTML files; built-locale checks passed 19 direct-200
  routes and five expected 404s; `git diff --check` passed
- Rendered QA: desktop 1440px and fresh mobile 393x852 returned the expected
  H1, title, exact canonical, `index, follow`, Article and BreadcrumbList
  schema, four source links, and visible FAQ behavior with no document or H1
  overflow. One existing global unused-font preload warning appeared on the
  fresh mobile render; no page error or target-route defect appeared.
- Locale decision: English only. No independent zh-TW or zh-CN taxonomy demand
  has been observed; both unsupported Mandarin routes remain intentional 404s.
- Approval: the user approved commit, push, PR, merge, deployment, and
  production verification for this website change
- Still unapproved: request indexing, GSC validation, Reddit or other external
  publication, OSS submission, paid acquisition, and metric-definition changes
- Next step: publish through the normal PR gate, wait for Vercel production,
  verify the live route and deployed technical SEO, append the production
  evidence, and release the one production slot

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-25-ai-agent-memory-types at 2026-07-25T01:49:40Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-25-ai-agent-memory-types
- Observed at: 2026-07-25T01:49:40Z
- Readout: correction
- Status: live
- Publish date: 2026-07-25
- Production-in-flight changes: 0
- Evidence: PR #78 merged at `2026-07-25T01:48:42Z` as `4d4ff8abc51fd053809e32ec63da9e8c3d604926`; the Vercel production commit status completed successfully at `2026-07-25T01:49:40Z`. The deployed technical audit passed robots, 110 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English route returned HTTP 200 with the expected title and H1, exact self-canonical, `index, follow`, English language, SoftwareApplication, WebSite, Organization, Article, and BreadcrumbList JSON-LD, four maintained source links, two visible FAQ questions, and no `FAQPage`. The unsupported zh-TW and zh-CN routes returned 404 and were absent from the sitemap. Desktop and mobile production renders had no document or H1 overflow and no browser warning or error; document/client widths were `1440/1440` and `393/393`. The first FAQ opened and exposed the expected answer.
- Metric interpretation: The authenticated pre-publish property baseline remains 7 GSC clicks and 310 impressions, while the target route has no prelaunch GSC or Vercel row because it is net new; no zero or indexing state is inferred. GitHub REST reports 47 total Wenlan stars. No post-deploy SEO result, source-to-page session, CTA, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or other external post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the 24-hour technical/evidence readout after `2026-07-26T01:49:40Z`; this production-verified measurement cohort does not consume the production slot
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-25-context-loss-diagnostic-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-25-context-loss-diagnostic-refresh
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: diagnostic-recipe
- Launched: 2026-07-25
- Hypothesis: Refreshing the existing context-loss page as a source-backed symptom-to-recovery diagnostic will improve qualified exposure without competing with the Claude Code memory, handoff, persistent-project-context, or AI-agent-memory-types pages.
- Candidate evidence: The target has 2 authenticated GSC impressions, 0 clicks, and average position 9.5, but no visible joined query row; the 2-impression page-query visibility gap remains explicit. Same-range Vercel reports 1 visitor and 1 pageview. Two independent Reddit questions observed at `2026-07-25T01:58:34Z` have +8 score snapshots each. Independently authored Anthropic issues #27298 and #34556 have 24 comments and 2 reactions, and 61 comments and 5 reactions, respectively. Current Claude Code memory and session docs distinguish fresh sessions, resume, CLAUDE.md, auto memory, and compaction; current Wenlan source and docs support the brief, recall, capture, and handoff loop. Full URLs, dates, native units, limitations, and overlap analysis are in `docs/seo-audits/2026-07-25-context-loss-diagnostic-prelaunch.md`. External observations are demand discovery only, not GSC input or keyword volume.
- Baseline: GSC property totals are 7 clicks and 310 impressions; visible-query totals are 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target has 2 impressions, 0 clicks, and average position 9.5, while its visible joined query total is 0 rows and the 2-impression page-query gap remains unknown. Vercel separately reports 1,402 visitors and 1,593 pageviews property-wide and 1 visitor and 1 pageview for the target. GitHub reports 47 Wenlan total stars. Umami and Vercel custom CTA events remain unavailable or account-gated. No source-to-page join or causal inference is made.
- Change: Refresh only the existing English `/learn/ai-coding-agent-loses-context` title metadata, description, quick answer, diagnosis, recovery checklist, FAQ, maintained source links, and related links. Keep the URL and H1. Distinguish exact native-session resume, project instructions or native memory, handoffs, and a shared durable-memory boundary; add the verified Wenlan `/brief`, `/recall`, `/capture`, `/handoff` loop. Add no zh-TW or zh-CN route, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: unknown-existing-route
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete post-deploy days
- Success criteria: After at least 5 GSC target-page impressions, the target earns at least 1 GSC click or average position is 8.0 or better; Vercel target-page visitors and GitHub stars are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 5 GSC target-page impressions, the target has 0 clicks and average position is worse than 15.0. Fewer than 5 impressions is inconclusive; after minimum exposure, 0 clicks with average position from 8.1 through 15.0 is also inconclusive.
- Stop criteria: Stop or hold if maintained sources do not support a native-memory claim, the page overlaps an existing search job, another controller edits the route, or the change creates a canonical, robots, noindex, structured-data, sitemap, locale, source-link, internal-link, or rendered-layout regression.
- 24h readout: pending — verify the live route, title, metadata, canonical, indexability, structured data, maintained references, internal links, locale non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency and target-page clicks, impressions, and position when available, Vercel target-page presence when available, and GitHub stars separately
- W2 readout: pending — apply the minimum-exposure guard and inspect whether the diagnostic remains distinct from native Claude Code memory, handoff, persistent-project-context, and taxonomy pages
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: make the focused article contract pass, then complete full SEO/i18n/lint/build/technical, rendered, and independent-review gates before requesting explicit publication approval
<!-- EXPERIMENT-RECORD:END -->

### Campaign observation — 2026-07-25T02:09:09Z

- Experiment: `EXP-2026-07-25-context-loss-diagnostic-refresh`
- Local preparation: complete
- Change: refreshed the existing English
  `/learn/ai-coding-agent-loses-context` diagnostic without changing the URL
  or H1; separated native session resume, project instructions or native
  memory, handoffs, and durable cross-session or cross-tool knowledge
- Evidence: retained the authenticated target baseline of 2 GSC impressions,
  0 clicks, and average position 9.5; retained the empty visible joined query
  set and two-impression page-query visibility gap; retained Vercel's separate
  1 visitor and 1 pageview target-route observation
- Review repair: independent review found that the existing-page refresh would
  otherwise present the update date as a new publication date. Added
  `publishedAt` pass-through, pinned the original date to `2026-06-06`, kept
  `updatedAt: "2026-07-25"`, and added a focused regression assertion
- Verification: Goal verifier passed; focused test completed RED to GREEN; SEO
  tests 185/185; i18n tests 53/53; TypeScript lint, weekly sample, build,
  built technical SEO, built locale checks, and `git diff --check` passed
- Rendered QA: the final build passed complete desktop and 390 px mobile
  segmented inspection, exact canonical, `index, follow`, Article and
  BreadcrumbList schema, stable original and modified dates, maintained
  references, visible FAQ interaction, no `FAQPage`, no page overflow, and no
  browser warning or error
- Locale decision: English refresh only; unsupported zh-TW and zh-CN article
  routes remain intentional 404s
- Approval: at `2026-07-25T02:09:09Z`, the controller recorded the user's
  approval for commit, push, PR, merge, deployment, and production
  verification
- Still unapproved: request indexing, GSC validation, Reddit or other external
  publication, OSS submission, paid acquisition, and metric-definition changes
- Next step: publish through the normal PR gate, verify production, append the
  production readout, and release the single production slot

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-25-context-loss-diagnostic-refresh at 2026-07-25T02:15:21Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-25-context-loss-diagnostic-refresh
- Observed at: 2026-07-25T02:15:21Z
- Readout: correction
- Status: live
- Publish date: 2026-07-25
- Production-in-flight changes: 0
- Evidence: PR #80 merged at `2026-07-25T02:14:16Z` as `338f5a510d0294b69b7b691d82b6da9e42481a9b`; Vercel production completed successfully at `2026-07-25T02:15:21Z`. The deployed technical audit passed robots, 110 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL exclusions. The live English route returned HTTP 200 with the expected title and H1, exact self-canonical, `index, follow`, SoftwareApplication, WebSite, Organization, Article, and BreadcrumbList JSON-LD, five maintained source links, `datePublished: "2026-06-06"`, `dateModified: "2026-07-25"`, and no `FAQPage`. The unsupported zh-TW and zh-CN routes returned 404 and were absent from the sitemap. Complete desktop and 390 px mobile production renders covered the full page without document overflow or browser warning/error, and the first FAQ opened with the expected native-session versus durable-memory answer.
- Metric interpretation: The authenticated pre-publish property baseline remains 7 GSC clicks and 310 impressions; visible-query totals remain 1 click and 75 impressions, leaving a 6-click and 235-impression visibility gap. The target baseline remains 2 impressions, 0 clicks, and average position 9.5 with no visible joined query row; its two-impression page-query visibility gap remains unknown. Same-range Vercel remains 1,402 property visitors and 1,593 pageviews, with 1 visitor and 1 pageview for the target route. GitHub REST reports 47 total Wenlan stars. No post-deploy SEO result, source-to-page session, CTA, or causal effect is inferred at production completion.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or other external post, OSS submission, paid acquisition, or metric-definition change
- Next step: run the 24-hour technical/evidence readout after `2026-07-26T02:15:21Z`; this production-verified measurement cohort does not consume the production slot
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-26T01:47:53Z — due 24-hour cohort evidence

- Record type: campaign-observation
- Scope: shared evidence for the seven 24-hour readouts due from the Learn-hub
  refresh through the Basic Memory comparison refresh; the AI-agent-memory
  types and context-loss cohorts were not yet due at this observation time
- Search Console: the latest authenticated Friday weekly range remains
  `2026-06-26..2026-07-23`, before these deployments. Property totals are
  7 clicks and 310 impressions; visible-query totals are 1 click and
  75 impressions; the query visibility gap is 6 clicks and 235 impressions.
  This range cannot measure a post-deploy 24-hour cohort and is not treated as
  zero post-deploy demand.
- Vercel: the same complete range reports 1,402 visitors and 1,593 pageviews,
  including 255 direct visitors and 319 direct pageviews. The existing
  qualified-source allowlist sums to 1,149 visitors across separate referrer
  rows and is not deduplicated. The range predates these deployments and
  cannot be joined to a post-deploy route cohort.
- GitHub: the read-only REST observation reports 47 total Wenlan stars.
  Vercel custom events remain account-gated and no authenticated Umami
  observation is available, so GitHub outbound and CTA are not reported.
- Deployed technical SEO: robots passed; the live sitemap contains 110 URLs;
  14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence,
  25 redirects, six bridge-host redirects, and legacy-URL exclusions passed.
  The production locale matrix passed 19 expected HTTP 200 routes and five
  expected hard 404 routes.
- Live cohort routes: `/learn`,
  `/learn/distilled-wiki-pages-ai-memory`, `/learn/mcp-memory-server`,
  `/learn/cursor-claude-code-shared-memory`,
  `/learn/review-before-trust-ai-memory`,
  `/learn/wenlan-vs-claude-mem`,
  `/learn/wenlan-vs-superlocal-memory`, and
  `/learn/wenlan-vs-basic-memory` each returned HTTP 200 with the exact
  self-canonical and `index, follow`. The Learn hub retained
  `CollectionPage` and `BreadcrumbList`; every article retained `Article` and
  `BreadcrumbList`; none emitted `FAQPage`. The MCP source retained exactly
  one link to the shared-memory target.
- Production render: fresh desktop and mobile evidence covered all eight
  routes. Document and H1 scroll widths equaled their client widths on every
  route; comparison tables remained within their rendered containers; browser
  warning/error logs were empty. The in-app browser's long-page full-page
  capture stitched repeated viewport segments on some routes, so those
  artifacts are not interpreted as page regressions. Objective DOM geometry,
  fresh viewport evidence, and prior/current desktop image comparisons remain
  the render gate. The unchanged LLM-wiki desktop capture was pixel-identical
  to its production reference; the stale-memory desktop comparison remained
  96/100 similar with differences concentrated near the long-page bottom.
  Evidence is under
  `/tmp/wenlan-seo/visual-qa/2026-07-25-due-24h-readouts/`.
- Interpretation: technical health passed. No SEO success, source-to-page
  session, CTA, or causal effect is inferred at 24 hours.

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-learn-hub-exposure-refresh at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-learn-hub-exposure-refresh
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed the live route, canonical, indexability, locale, schema, technical, and render gates. The latest authenticated GSC range ends before deployment; its target baseline remains 0 clicks, 71 impressions, and average position 15.6 for `/learn`. Same-range Vercel remains 98 visitors and 100 pageviews for `/learn`; GitHub reports 47 stars. No complete post-deploy search or visitor cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-07-31T19:18:03Z`; apply the 100-impression minimum-exposure guard and keep source-native metrics separate
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-llm-wiki-category-refresh at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-llm-wiki-category-refresh
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed the live route, reciprocal locale alternates, canonical, indexability, schema, technical, and render gates. The latest authenticated GSC range ends before deployment; its target baseline remains 0 clicks, 2 impressions, and average position 3.5 for `/learn/distilled-wiki-pages-ai-memory`. Same-range Vercel remains 4 visitors and 4 pageviews for the target; GitHub reports 47 stars. No complete post-deploy search or visitor cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-07-31T20:19:21Z`; apply the 10-impression minimum-exposure guard and keep the LLM-wiki category separate from source-backed trust mechanics
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-mcp-shared-memory-exposure at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-mcp-shared-memory-exposure
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed both live routes, the source's single visible target link, the target canonical and indexability, schema, locale, technical, and render gates. The latest authenticated GSC range ends before deployment; its target baseline remains 0 clicks, 8 impressions, and average position 20.8, while the source baseline remains 0 clicks, 2 impressions, and average position 5.5. Same-range Vercel remains 291 visitors and 293 pageviews for the source; the target is absent from the returned top-page export, so no zero is inferred. GitHub reports 47 stars. No source-to-target session or complete post-deploy cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-07-31T21:13:05Z`; apply the 10-impression target minimum and do not infer source-to-target attribution
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-stale-ai-memory-diagnostic at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-stale-ai-memory-diagnostic
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed the live route, canonical, indexability, schema, locale, technical, and render gates. The target remains absent from the latest authenticated GSC page export, whose range ends before deployment; absence is not reported as zero. Same-range Vercel remains 1 visitor and 1 pageview for the target; GitHub reports 47 stars. No complete post-deploy search or visitor cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-07-31T23:08:30Z`; apply the 5-impression minimum-exposure guard and keep failure-mode intent separate from generic AI memory
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-claude-mem-comparison-refresh at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-claude-mem-comparison-refresh
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed the live route, canonical, indexability, schema, locale, technical, and render gates. The latest authenticated GSC range ends before deployment; its target baseline remains 0 clicks, 7 impressions, and average position 14.4 for `/learn/wenlan-vs-claude-mem`. Same-range Vercel remains 1 visitor and 1 pageview for the target; GitHub reports 47 stars. No complete post-deploy search or visitor cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-07-31T23:34:19Z`; apply the 5-impression minimum-exposure guard and inspect comparison-intent overlap separately
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-superlocalmemory-comparison-refresh at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-superlocalmemory-comparison-refresh
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed the live route, canonical, indexability, schema, locale, technical, and render gates. The latest authenticated GSC range ends before deployment; its target baseline remains 0 clicks, 16 impressions, and average position 8.6 for `/learn/wenlan-vs-superlocal-memory`. Same-range Vercel remains 7 visitors and 7 pageviews for the target; GitHub reports 47 stars. No complete post-deploy search or visitor cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-08-01T00:05:36Z`; apply the 5-impression minimum-exposure guard and inspect local-first comparison overlap separately
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-25-basic-memory-comparison-refresh at 2026-07-26T01:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-25-basic-memory-comparison-refresh
- Observed at: 2026-07-26T01:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The shared batch observation above passed the live route, canonical, indexability, schema, locale, technical, and render gates. The latest authenticated GSC range ends before deployment; its target baseline remains 1 click, 20 impressions, and average position 14.6. Joined visible rows remain 0 clicks and 5 impressions, so the page click remains unattributed. Same-range Vercel remains 5 visitors and 5 pageviews for the target; GitHub reports 47 stars. No complete post-deploy search or visitor cohort is available.
- Result: pending
- Decision: wait
- Next step: run the 7-day readout after `2026-08-01T01:04:56Z`; apply the 5-impression minimum-exposure guard and keep the unattributed page click separate from visible product-name queries
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-26T01:51:16Z — next-candidate demand gate

- Record type: campaign-observation
- Decision: no new English, zh-TW, or zh-CN experiment currently passes all
  five candidate gates
- English: repeated agent-memory taxonomy, context-loss, stale-memory, MCP
  shared-memory, LLM-wiki, Basic Memory, claude-mem, and SuperLocalMemory
  demand is already covered by live measurement cohorts. The latest
  authenticated GSC maps the visible Claude Code memory, MCP memory, and Basic
  Memory terms to existing pages and supplies no new recurring non-brand
  cluster with a clean coverage gap.
- zh-TW: the modifier-qualified Obsidian, Claude Code, and MCP intent is
  already covered by the live Obsidian localization. `AI 筆記` remains
  adjacent NotebookLM, Notion, meeting-note, and note-tooling demand without a
  clean Wenlan intent.
- zh-CN: no inspectable Simplified Chinese demand observation supports a new
  localized page; Taiwan or Worldwide evidence is not extrapolated.
- Trends interpretation: the committed 53-row, Worldwide, English,
  past-12-month `AI agent memory` versus `agent memory` series remains a
  request-relative `0–100` category signal, not exact-query demand or search
  volume.
- Minimum missing evidence: a later authenticated GSC `query + page` window
  must expose a recurring non-brand cluster that no existing page answers
  cleanly. A localized candidate also needs matching locale-specific query,
  Trends, or local-language community evidence.
- Next step: wait for the next authenticated GSC window while keeping the
  already scheduled technical/evidence readouts; do not manufacture an
  experiment from generic Trends, Vercel totals, or incomplete cohort data

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-18-claude-code-memory-refresh at 2026-07-26T02:04:08Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-18-claude-code-memory-refresh
- Observed at: 2026-07-26T02:04:08Z
- Readout: 7d
- Status: measuring
- Evidence: The latest authenticated Friday range is
  `2026-06-26..2026-07-23`, so it does not contain seven complete
  post-deploy days after production completed at `2026-07-19T00:26:09Z`.
  GSC property totals are 7 clicks and 310 impressions; visible-query totals
  are 1 click and 75 impressions; the query visibility gap is 6 clicks and
  235 impressions. The target remains at 0 clicks, 23 impressions, and
  average position 38.7. Its five predeclared visible Claude-memory query
  rows remain at 0 clicks, 9 impressions, and 50.0
  impression-weighted average position. The rolling page row and fixed
  visible cluster therefore match the pre-publish baseline, but they are not
  a complete seven-day post-deploy cohort and do not establish a refresh
  effect. The refresh has no confirmed post-change crawl or index date, so
  the 25-impression minimum-exposure clock cannot be proven from this range.
- Vercel: The same complete range reports 1,402 raw visitors and 1,593
  pageviews, including 255 direct visitors and 319 direct pageviews. The
  existing qualified-source allowlist sums to 1,149 visitors across separate
  referrer rows and is not deduplicated. The target reports 7 visitors and
  19 pageviews, compared with the separate 3-visitor and 3-pageview
  pre-publish baseline. The date ranges differ and the current range is not
  seven complete post-deploy days, so no lift, source-to-page session, or
  causal claim is inferred. Unique acquisition-surface visitors remain
  unavailable.
- Technical and source evidence: The deployed technical audit passed after
  the latest production deployment with 110 sitemap URLs. The live target
  returned HTTP 200 with the exact self-canonical, `index, follow`, Article
  and BreadcrumbList JSON-LD, `datePublished: "2026-06-07"`,
  `dateModified: "2026-07-18"`, the current official Claude Code memory
  source, and no `FAQPage`. Its 24-hour production render evidence remains
  green; no page change has been made since that readout.
- GitHub and CTA: GitHub REST reports 47 total Wenlan stars. Vercel custom
  events remain account-gated and no authenticated Umami observation is
  available, so GitHub outbound and CTA are not reported.
- Result: inconclusive
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or
  other external post, OSS submission, paid acquisition, or metric-definition
  change
- Next step: run the W2 readout after `2026-08-02T00:26:09Z`; use the next
  authenticated Friday evidence, apply the original 25-impression and
  qualified-cluster guards, and keep the unknown post-change crawl date
  explicit
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-25-ai-agent-memory-types at 2026-07-26T02:04:08Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-25-ai-agent-memory-types
- Observed at: 2026-07-26T02:04:08Z
- Readout: 24h
- Status: measuring
- Evidence: The latest authenticated GSC and complete Vercel range remains
  `2026-06-26..2026-07-23`, before this route was deployed. GSC property
  totals are 7 clicks and 310 impressions; visible-query totals are 1 click
  and 75 impressions; the query visibility gap is 6 clicks and
  235 impressions. The net-new target is absent from the pre-deploy page
  table, so no zero, index state, or post-deploy demand is inferred. Vercel
  separately reports 1,402 raw visitors and 1,593 pageviews, 255 direct
  visitors and 319 direct pageviews, and a non-deduplicated 1,149-visitor
  qualified-source aggregate. The range predates deployment and provides no
  target baseline, acquisition-surface visitor count, or source-to-page join.
- Technical and render evidence: The deployed technical audit passed after
  the latest production deployment with 110 sitemap URLs. The live English
  route returned HTTP 200 with the expected title and H1, exact
  self-canonical, `index, follow`, Article and BreadcrumbList JSON-LD,
  `datePublished: "2026-07-25"`, `dateModified: "2026-07-25"`, four
  maintained source links, two visible FAQ questions, and no `FAQPage`.
  Unsupported zh-TW and zh-CN routes returned HTTP 404. Fresh Chrome
  desktop and mobile renders showed the expected first screen; document and
  H1 scroll widths matched their client widths, and no page warning or error
  was recorded.
- GitHub and CTA: GitHub REST reports 47 total Wenlan stars. Vercel custom
  events remain account-gated and no authenticated Umami observation is
  available, so GitHub outbound and CTA are not reported.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or
  other external post, OSS submission, paid acquisition, or metric-definition
  change
- Next step: run the 7-day readout after `2026-08-01T01:49:40Z`; apply the
  original 5-impression minimum-exposure guard and keep English, zh-TW, and
  zh-CN evidence separate
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-25-context-loss-diagnostic-refresh at 2026-07-26T02:15:47Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-25-context-loss-diagnostic-refresh
- Observed at: 2026-07-26T02:15:47Z
- Readout: 24h
- Status: measuring
- Evidence: The latest authenticated GSC and complete Vercel range remains
  `2026-06-26..2026-07-23`, before this refresh was deployed. GSC property
  totals are 7 clicks and 310 impressions; visible-query totals are 1 click
  and 75 impressions; the query visibility gap is 6 clicks and
  235 impressions. The target's pre-publish page row remains 0 clicks,
  2 impressions, and average position 9.5, while its visible joined query set
  remains empty; the two-impression page-query visibility gap is not
  interpreted as a target query or post-deploy result. Vercel separately
  reports 1,402 raw visitors and 1,593 pageviews, 255 direct visitors and
  319 direct pageviews, and a non-deduplicated 1,149-visitor
  qualified-source aggregate. The same pre-deploy range reports 1 visitor and
  1 pageview for the target. It supplies no acquisition-surface visitor
  count, source-to-page join, or post-deploy cohort.
- Technical and locale evidence: The post-boundary deployed audit passed
  robots, 110 sitemap URLs, 14 key pages, six utility noindex headers,
  sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects,
  and legacy-URL exclusions. The production locale matrix passed 19 expected
  HTTP 200 routes and five expected hard 404 routes. The live English target
  returned HTTP 200 with its exact self-canonical, `index, follow`, Article
  and BreadcrumbList JSON-LD, `datePublished: "2026-06-06"`,
  `dateModified: "2026-07-25"`, five maintained source links, four related
  internal links, and no `FAQPage`. Unsupported zh-TW and zh-CN routes
  returned HTTP 404.
- Render evidence: Fresh desktop and mobile Chrome renders in this readout
  sequence showed the expected title, H1, description, and first-screen
  layout. Document and H1 scroll widths matched their client widths. The
  post-boundary live HTML and technical checks confirmed the same production
  artifact. No Wenlan-origin browser warning or error appeared; one recorded
  error originated from an unrelated Chrome extension URL and is not treated
  as a page regression.
- GitHub and CTA: GitHub REST reports 47 total Wenlan stars. Vercel custom
  events remain account-gated and no authenticated Umami observation is
  available, so GitHub outbound and CTA are not reported.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or
  other external post, OSS submission, paid acquisition, or metric-definition
  change
- Next step: run the 7-day readout after `2026-08-01T02:15:21Z`; apply the
  original 5-impression minimum-exposure guard and keep this diagnostic
  distinct from native Claude Code memory, handoff, persistent-project
  context, and taxonomy pages
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh at 2026-07-26T02:19:26Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh
- Observed at: 2026-07-26T02:19:26Z
- Readout: 24h
- Status: measuring
- Timing: This readout is late and is recorded at the actual observation
  time. It is not backdated to the original boundary at
  `2026-07-25T18:54:22Z`.
- Evidence: The latest authenticated GSC and complete Vercel range remains
  `2026-06-26..2026-07-23`, before this refresh was deployed. GSC property
  totals are 7 clicks and 310 impressions; visible-query totals are 1 click
  and 75 impressions; the query visibility gap is 6 clicks and
  235 impressions. The target remains at its pre-publish 0 clicks,
  9 impressions, and average position 8.0. No visible joined target query is
  claimed. Vercel separately reports 1,402 raw visitors and 1,593 pageviews,
  255 direct visitors and 319 direct pageviews, and a non-deduplicated
  1,149-visitor qualified-source aggregate. The target reports 1 visitor and
  1 pageview in that pre-deploy range; no post-deploy cohort,
  acquisition-surface visitor count, source-to-page join, or causal effect is
  inferred.
- Technical, locale, and render evidence: The post-boundary deployed audit
  passed robots, 110 sitemap URLs, 14 key pages, six utility noindex headers,
  sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects,
  and legacy-URL exclusions. The live English target returned HTTP 200 with
  its refreshed title, exact self-canonical, `index, follow`, Article and
  BreadcrumbList JSON-LD, `datePublished: "2026-07-24"`,
  `dateModified: "2026-07-24"`, maintained first-party source links, and no
  `FAQPage`; unsupported zh-TW and zh-CN routes returned HTTP 404. The
  production desktop/mobile render evidence from the deployment readout
  remains green, and no page change has been made since that verification.
- GitHub and CTA: GitHub REST reports 47 total Wenlan stars. Vercel custom
  events remain account-gated and no authenticated Umami observation is
  available, so GitHub outbound and CTA are not reported.
- Result: pending
- Decision: wait
- Unperformed gated actions: no indexing request, GSC validation, Reddit or
  other external post, OSS submission, paid acquisition, or metric-definition
  change
- Next step: run the 7-day readout after `2026-07-31T18:54:22Z`; apply the
  original 20-impression minimum-exposure guard and keep this Source/Memory/Page
  role comparison distinct from generic AI knowledge-base demand
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh correction at 2026-07-26T02:24:10Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh
- Observed at: 2026-07-26T02:24:10Z
- Readout: correction
- Status: active
- Evidence: This corrects the date-health interpretation in the preceding
  24-hour readout. The route and its canonical,
  indexability, maintained sources, unsupported locale 404s, and retained
  render evidence were healthy, but the date-health interpretation was not.
  Live Article JSON-LD emits `datePublished: "2026-07-24"` and
  `dateModified: "2026-07-24"`. Git history establishes that the page first
  shipped with the article registry's `2026-05-27` date, so the refresh
  rewrote the original publication date instead of preserving it.
- Local change: add `publishedAt: "2026-05-27"` while retaining
  `updatedAt: "2026-07-24"`, protected by a focused regression assertion.
- Scope: metadata and Article JSON-LD only. No visible copy, URL, canonical,
  hreflang, sitemap membership, locale availability, schema type,
  `FAQPage`, experiment baseline, or metric definition changes.
- Approval: At `2026-07-26T02:24:10Z`, the user approved local preparation,
  commit, Git push, PR creation, merge, production deployment, and production
  verification for this correction.
- Production slot: occupied until the live Article JSON-LD and deployed
  technical checks verify the correction.
- Unperformed separately gated actions: no indexing request, GSC validation,
  Reddit or other external post, OSS submission, paid acquisition, or
  metric-definition change.
- Result: pending
- Decision: refresh
- Next step: prove the focused test GREEN, run the full relevant build and SEO
  verification, obtain independent review, publish the approved correction,
  and append production evidence without changing the experiment's 7-day
  readout schedule.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh production correction at 2026-07-26T02:32:30Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-24-ai-work-memory-knowledge-base-refresh
- Observed at: 2026-07-26T02:32:30Z
- Readout: correction
- Status: measuring
- Evidence: PR #83 merged at `2026-07-26T02:30:28Z` as
  `a54f13f891d472774f48cafb8798955bf8906ce4`; Vercel production completed at
  `2026-07-26T02:31:19Z`. The deployed technical audit passed robots,
  110 sitemap URLs, 14 key pages, six utility noindex headers, sitemap-wide
  `FAQPage` absence, 25 redirects, six bridge-host redirects, and legacy-URL
  exclusions. The production locale matrix passed 19 expected HTTP 200 routes
  and five expected hard 404 routes. The live English target retained its
  exact self-canonical and `index, follow`; Open Graph and Article JSON-LD now
  emit `datePublished: "2026-05-27"` and
  `dateModified: "2026-07-24"`, with no `FAQPage`. This verifies the
  technical correction only and does not establish search-performance lift.
- Production slot: released after production verification.
- Unperformed separately gated actions: no indexing request, GSC validation,
  Reddit or other external post, OSS submission, paid acquisition, or
  metric-definition change.
- Result: pending
- Decision: wait
- Next step: run the experiment's original 7-day readout after
  `2026-07-31T18:54:22Z`; apply the predeclared 20-impression minimum-exposure
  guard without attributing any effect to this technical correction.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-26T02:59:07Z — provider-neutral CTA measurement correction prepared

- Record type: campaign-observation
- Technical correction:
  `TECH-2026-07-26-provider-neutral-cta-tracking`
- Status: active local preparation; consumes the single production slot
- Evidence: The live `wenlan.app` homepage returned HTTP 200 at
  `2026-07-26T02:56:08Z` and loaded the configured Umami Cloud tracker.
  Before this correction, `TrackedLink` sent the four acquisition
  interactions only through `@vercel/analytics`, while the authenticated
  weekly evidence kept Vercel custom events account-plan-gated. No
  `github_outbound` total or CTA baseline is inferred.
- Change: normalize the existing events to `github_outbound`,
  `get_started_click`, `learn_article_click`, and `setup_path_click`; keep
  Vercel for pageviews; route custom events only to configured Umami; allow
  only placement, locale, context, and a fixed destination category; harden
  the tracker to `wenlan.app`, exclude search parameters, and respect Do Not
  Track; disclose public website analytics separately from installed Wenlan
  product telemetry.
- Privacy: no memory content, code, commands, user paths, search terms, names,
  emails, query strings, full URLs, or stable account identifiers are sent.
- RED/GREEN: the source contract failed while it still required Vercel custom
  events, then passed after the provider-neutral seam and disclosure were
  implemented. Runtime interaction tests pass for all four event mappings and
  safe no-op behavior when Umami is unavailable.
- Metric role: this enables a future diagnostic CTA observation only.
  `github_outbound` is not a star, no metric definition changes, and no
  search-performance or causal claim is made.
- Approval: At `2026-07-26T03:07:04Z`, the user approved commit, Git push, PR
  creation, merge, automatic Vercel deployment, and production verification.
- Remaining boundary: no synthetic production event, indexing request, GSC
  validation, external publication, OSS submission, paid acquisition, account
  mutation, or metric-definition change is authorized.
- Evidence record:
  `docs/seo-audits/2026-07-25-cta-measurement-prelaunch.md`
- Local verification: SEO tests 187/187; i18n tests 53/53; TypeScript, Goal
  verifier, weekly sample, production build, built technical SEO, built locale
  matrix, desktop/mobile render, tracked CTA navigation, and
  `git diff --check` pass. Independent review returned APPROVE with no P0-P2
  findings.
- Next step: publish and production-verify the approved technical correction

### 2026-07-26T03:14:06Z — provider-neutral CTA measurement correction production verification

- Record type: campaign-observation
- Technical correction:
  `TECH-2026-07-26-provider-neutral-cta-tracking`
- Status: production-verified; production slot released
- Publication: PR #86 merged at `2026-07-26T03:12:02Z` as
  `7674c47405ed42a71f8776b8276093fbea05fefd`; Vercel production completed at
  `2026-07-26T03:12:51Z`.
- Live evidence: the configured Umami tag exposes the approved
  `data-domains="wenlan.app"`, `data-exclude-search="true"`, and
  `data-do-not-track="true"` attributes. The public website-analytics
  disclosure and normalized `github_outbound` and `get_started_click` event
  code are live.
- Technical evidence: the deployed audit passed robots, 110 sitemap URLs, 14
  key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25
  redirects, six bridge-host redirects, and legacy-URL exclusions.
- Metric role: this verifies deployment and future measurement readiness
  only. No CTA count, star attribution, SEO lift, or causal result is inferred.
  Actual Umami totals remain manual/account-gated until authenticated access
  is available.
- Unperformed separately gated actions: no synthetic production event,
  indexing request, GSC validation, external publication, OSS submission,
  paid acquisition, account mutation, or metric-definition change.
- Next step: wait for real authenticated Umami observations and the scheduled
  Goal readouts; do not infer zero events from missing dashboard access.

### 2026-07-26T03:21:39Z — Wenlan source release-boundary audit

- Record type: campaign-observation
- Technical correction: `TECH-2026-07-26-source-release-boundary`
- Status: active local preparation; no public page change
- Source evidence: Wenlan's published release remains `v0.14.1`, while remote
  main at `65013459b0909cbb1899e9fd1667f80bad981194` includes merged PR #390
  and PR #382. wenlan-app's published release remains `v0.14.0`, while remote
  main at `3ef7332c6a37e2ae5810b89ad1ba630b4d5d426a` includes merged PR #98 and
  PR #96.
- Checkout limitation: both local source checkouts were two commits behind.
  The wenlan-app checkout also contained unrelated user changes, so neither
  working tree was pulled, reset, or modified. Remote refs and GitHub were
  inspected read-only.
- Finding: the Wenlan contract already resolves the latest version tag. The
  wenlan-app contract instead read the mutable working tree and accepted its
  unreleased `0.14.1` state as a release even though the latest published app
  tag is `v0.14.0`.
- RED/GREEN: the focused contract failed with actual `v0.14.1` versus expected
  published tag `v0.14.0`. It passes 5/5 after reading immutable tag files with
  `git show`, failing closed without tags, and supporting both backend-pin
  manifest shapes. The complete SEO contract passes 189/189; TypeScript, Goal
  verifier, and `git diff --check` also pass. Independent review returned
  APPROVE with no remaining P0-P2 findings after mixed-manifest parsing was
  made fail-closed.
- Product decision: PR #382, #390, #96, and #98 remain merged but unreleased.
  Do not change stable website product claims until a containing release is
  published; no content experiment starts from this audit.
- Evidence:
  `docs/seo-audits/2026-07-25-source-release-boundary.md`
- Approval boundary: local preparation only. No push, merge, deployment,
  indexing request, GSC validation, external publication, source-repository
  mutation, or metric-definition change is authorized.
- Next step: present the verified local diff for explicit push, merge, and
  automatic deployment approval.

### 2026-07-27T03:02:34Z — Wenlan v0.15.0 release/download correction prepared

- Record type: campaign-observation
- Technical correction: `TECH-2026-07-26-source-release-boundary`
- Status: active local public-site preparation; consumes the single production
  slot
- Changed premise: Wenlan `v0.15.0` was published at
  `2026-07-26T05:13:54Z`. The release now provides native Windows x64, macOS
  Apple silicon, Linux x64, and Linux ARM64 runtime archives. The Windows ZIP
  includes `wenlan.exe`, `wenlan-server.exe`, `wenlan-mcp.exe`,
  `onnxruntime.dll`, `vulkan-1.dll`, and the Vulkan runtime license.
- Desktop-app boundary: wenlan-app's latest published release remains
  `v0.14.0`. Later Windows-compatible main work does not establish a
  downloadable Windows desktop app, installer, signer, or updater.
- Change: centralize exact `v0.15.0` release metadata and four direct assets;
  add the release-backed homepage Download section; point the main homepage
  action at it; add English, Traditional Chinese, and Simplified Chinese
  platform setup; align About, changelog, platform/security/build docs,
  structured data, social image, and sitemap dates; track direct asset clicks
  as bounded `github_outbound` events with `placement="home-download"`.
- URL evidence: read-only HEAD requests followed all four GitHub release
  redirects and returned HTTP 200.
- Local verification: Goal verifier passed; SEO tests 189/189; i18n tests
  53/53; TypeScript passed; the production build generated 211 static pages
  and correctly skipped IndexNow; compiled technical SEO passed 110 sitemap
  URLs, 26 redirects, seven noindex headers, 14 checked HTML pages, and
  sitemap-wide `FAQPage` absence across 114 built HTML files.
- Render verification: Home, Get Started, and About were captured from the
  production build in English, Traditional Chinese, and Simplified Chinese at
  `1440x1000` and `393x852`. All 18 route/viewport pairs returned HTTP 200,
  none had horizontal overflow, all release assets were present, the
  `#download` path and Windows focus target worked, and no page or console
  error appeared. The first visual pass found an unnatural Chinese
  `直 / 接` break and possible `選 / 擇` and `不需 / 要` breaks; the second
  fresh-build pass confirmed the exact word-joiner fix.
- Metric role: this is release accuracy and conversion-path readiness, not
  proof of SEO lift, CTA conversion, star growth, or causal effect.
- Evidence:
  `docs/seo-audits/2026-07-25-source-release-boundary.md`
- Approval boundary: no push, PR, merge, deployment, indexing request, GSC
  validation, external publication, source-repository mutation, OSS
  submission, paid acquisition, account mutation, or metric-definition change
  was performed.
- Next step: obtain explicit push, merge, and automatic deployment approval,
  production-verify the exact runtime/app boundary and four download paths,
  then release the production slot.

### 2026-07-27T03:02:34Z — LLM-wiki, Obsidian, and knowledge-cluster candidate

- Record type: campaign-observation
- Status: queued candidate; not an experiment start and does not consume a
  second production slot
- User intent: improve discovery for `LLM wiki`, modifier-qualified Obsidian,
  AI-native notes, and AI knowledge-base searches without opening overlapping
  URLs.
- Authenticated GSC evidence: `sc-domain:wenlan.app`,
  `2026-06-27..2026-07-24`, reports 7 property clicks and 329 property
  impressions. Visible-query rows report 1 click and 81 impressions, leaving
  a visibility gap of 6 clicks and 248 impressions. The page rows separately
  report 2 impressions at average position 3.5 for the LLM-wiki page,
  4 impressions at 4.5 for the English Obsidian page, and 9 impressions at
  8.0 for the knowledge-base comparison. The visible `llm wiki 2.0` row has
  1 impression at position 13.0.
- Coverage finding: the English Learn hub already has direct search paths to
  all three pages; the knowledge-base page already links to the LLM-wiki and
  Obsidian pages; the zh-TW Obsidian page already covers `AI 筆記` and
  supporting `AI 知識庫` language. The remaining clean gap is that the
  English LLM-wiki page lacks direct related links to the two comparison
  pages, and the English Obsidian page lacks a direct related link back to the
  LLM-wiki category page.
- Demand boundary: Trends retains request-relative `0–100` indices, not search
  volume. `AI notes` / `AI 筆記` is real adjacent demand dominated by note-tool
  and document-QA intent; exact Taiwan `AI 知識庫` remains too sparse for a
  dedicated asset; generic `knowledge base` is too broad without agent,
  local, open-source, or source-backed modifiers.
- Candidate decision: after the current release/download correction is
  production-verified, launch one bounded English internal-link closure across
  the existing pages. Do not rewrite titles, change canonical URLs, create a
  generic notes article, or manufacture zh-CN coverage.
- Evidence:
  `docs/seo-audits/2026-07-26-llm-wiki-obsidian-knowledge-cluster.md`
- Next step: production-verify the current correction, then create the
  immutable experiment start for this cross-link change with its own baseline
  and readout thresholds.

### 2026-07-27T04:00:43Z — v0.15.0 release/download publication approved

- Record type: campaign-approval
- Technical correction: `TECH-2026-07-26-source-release-boundary`
- Status: approved for publication; continues to consume the single production
  slot until production verification
- Approved action: commit the verified local scope, push its existing branch,
  create and merge its pull request, allow the normal automatic Vercel
  deployment, and verify the resulting production surface and direct release
  downloads.
- Approval provenance: the user replied `批准` after receiving the exact
  requested boundary: commit, push, PR, merge, Vercel deployment, production
  verification, then an immediate separately attributable internal-link
  experiment.
- Still unapproved: request indexing, submit GSC validation, publish Reddit or
  other external posts, submit an OSS directory, buy traffic, mutate analytics
  accounts, generate synthetic production events, or change metric
  definitions.
- Next step: run the frozen-contract verifier after this record, commit and
  publish the bounded correction, then append native-unit production evidence.

### 2026-07-27T04:06:15Z — v0.15.0 release/download production verification

- Record type: campaign-observation
- Technical correction: `TECH-2026-07-26-source-release-boundary`
- Status: production-verified; releases the single production slot
- Git evidence: PR #88 merged at `2026-07-27T04:03:09Z` as
  `f8ca1a975f3c567de934dd757023b0b199e61e15`.
- Deployment evidence: the Vercel status for that exact commit changed to
  `success` with `Deployment has completed` at `2026-07-27T04:03:56Z`.
- Technical evidence: the deployed audit passed robots, 110 sitemap URLs, 14
  key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25
  redirects, six bridge-host redirects, and legacy-URL exclusions.
- Render and asset evidence: English, zh-TW, and zh-CN homepages returned HTTP
  200 with the localized v0.15.0 copy and all four exact asset links. The
  Windows x64, macOS Apple silicon, Linux x64, and Linux ARM64 release assets
  each returned HTTP 200.
- Metric interpretation: this proves deployment and download availability
  only. No SEO lift, CTA conversion, source-to-page session, star attribution,
  setup success, or causal result is inferred.
- Unperformed gated actions: no indexing request, GSC validation, Reddit or
  other external post, OSS submission, paid acquisition, synthetic analytics
  event, account mutation, or metric-definition change.
- Next step: start the separately attributable LLM-wiki, Obsidian, and
  knowledge-cluster internal-link experiment already requested by the user.

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-27-llm-wiki-knowledge-cluster-links

- Record type: experiment-start
- Experiment ID: EXP-2026-07-27-llm-wiki-knowledge-cluster-links
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: integration-hub
- Launched: 2026-07-27
- Hypothesis: Closing the missing related-link edges among Wenlan's existing LLM-wiki, Obsidian AI-memory, and AI knowledge-base pages will increase qualified Google exposure across that cluster without creating a competing URL or changing its category claims.
- Candidate evidence: Authenticated GSC API data for `sc-domain:wenlan.app`, complete days `2026-06-27..2026-07-24`, reports the three existing pages separately; signed-in Trends evidence retains request-relative `0–100` indices for Worldwide English and Taiwan Mandarin demand; current route and content inspection proves the incomplete English cross-link graph. Repeated OSS, Reddit, and maintained first-party evidence supports modifier-qualified LLM-wiki, Obsidian, agent-memory, and knowledge-base jobs. Complete URLs, dates, locales, native units, limitations, candidate gate, and coverage graph are in `docs/seo-audits/2026-07-26-llm-wiki-obsidian-knowledge-cluster.md`. External observations remain demand discovery only and are not GSC input or keyword volume.
- Baseline: GSC property totals are 7 clicks and 329 impressions; visible-query totals are 1 click and 81 impressions, leaving a 6-click and 248-impression visibility gap. The LLM-wiki page has 0 clicks, 2 impressions, and average position 3.5; the English Obsidian page has 0 clicks, 4 impressions, and position 4.5; the knowledge-base comparison has 0 clicks, 9 impressions, and position 8.0. Vercel separately reports 1,406 visitors and 1,612 pageviews property-wide; no target-route or source-to-page baseline is inferred. GitHub reports 47 total Wenlan stars. Umami and Vercel custom CTA observations remain unavailable or account-gated.
- Change: Keep all three existing canonical URLs and visible answers. Add the English knowledge-base and Obsidian comparison routes to the LLM-wiki page's related paths, and add the English LLM-wiki route to the Obsidian comparison's related paths. Leave the already complete knowledge-base links, English Learn-hub cards, zh-TW cluster, and intentionally narrower zh-CN coverage unchanged. Add no article, title rewrite, `FAQPage` JSON-LD, indexing request, or external distribution.
- Publish date: not-published
- Index date: existing-indexed-pages
- Minimum exposure: 15 combined GSC impressions across the three target pages in the first 28 complete post-deploy days
- Success criteria: After 28 complete post-deploy days and at least 15 combined GSC target-page impressions, the cluster earns at least 1 GSC click or at least 30 combined impressions; per-page clicks, impressions, and average positions remain separate, and Vercel, Umami, and GitHub observations are reported separately without a causal claim.
- Failure criteria: After 28 complete post-deploy days and at least 15 combined GSC target-page impressions, the cluster has 0 clicks and no more than 15 combined impressions. A result from 16 through 29 combined impressions with 0 clicks is inconclusive; fewer than 15 impressions is also inconclusive.
- Stop criteria: Stop or hold if a link targets a missing or redirected route, another controller edits either page, the related paths become duplicative or misleading, or the change creates a canonical, indexing, robots, noindex, structured-data, sitemap, locale, publication-date, source-link, or rendered-layout regression.
- 24h readout: pending — verify the two live English related-link sets, the unchanged knowledge-base links, canonical/indexability/schema/FAQ policy, English and Mandarin non-regression, production render, and separate source-native observations without an SEO-success judgment
- 7d readout: pending — report GSC latency plus per-page clicks, impressions, and average position when available; report Vercel target-page presence, Umami internal CTA observations, and GitHub stars separately when available
- W2 readout: pending — apply the minimum-exposure guard and inspect whether the cluster remains category-distinct rather than collapsing LLM wiki, AI notes, Obsidian, and knowledge base into one claim
- W4 readout: pending — evaluate the predeclared success, failure, or inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains useful
- Result: pending
- Decision: wait
- Next step: finish the focused RED-to-GREEN contract, run full SEO/i18n/lint/build/technical and rendered verification, then present the exact diff for separate publication approval
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-27-llm-wiki-knowledge-cluster-links at 2026-07-27T04:45:29Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-27-llm-wiki-knowledge-cluster-links
- Observed at: 2026-07-27T04:45:29Z
- Readout: correction
- Status: stopped
- Evidence: The target LLM-wiki page has 0 clicks, 2 impressions,
  and page-average position 3.5, but both underlying queries are
  privacy-hidden. The authenticated query-plus-page join maps the only visible
  `llm wiki 2.0` row to `https://wenlan.app/zh-TW`, not to the target article.
  Known qualified `llm wiki` query-to-target impressions are therefore 0 for
  `2026-06-27..2026-07-24`. A fixed US English first-page SERP observation
  also did not show Wenlan. Position 3.5 is not an exact-query rank.
- Result: inconclusive
- Decision: stop
- Interpretation: The experiment stopped before publication, so its original
  minimum exposure, success, failure, and readout thresholds will not be
  applied. Do not publish the three related-link changes as a standalone
  experiment; fold the useful links into a stronger existing-page refresh
  with standalone implementation utility.
- Production effect: none. No commit, push, PR, merge, deployment, indexing
  request, validation, or external publication occurred for this standalone
  experiment.
- Next step: start
  `EXP-2026-07-27-llm-wiki-implementation-guide-refresh` in the released
  production slot.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-27-llm-wiki-implementation-guide-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-27-llm-wiki-implementation-guide-refresh
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: refresh
- Launched: 2026-07-27
- Hypothesis: Turning the existing English LLM-wiki route into a standalone
  definition, architecture, protocol, verification, failure-repair, and
  adjacent-system decision guide, with contextual inbound links from five
  relevant existing pages, will earn qualified Google exposure or clicks
  without creating a competing URL.
- Candidate evidence: Authenticated GSC API data for `sc-domain:wenlan.app`,
  complete days `2026-06-27..2026-07-24`, reports 2 privacy-hidden target-page
  impressions and no known qualified query-to-target impression. A fixed US
  English first-page SERP did not show Wenlan. Committed signed-in Trends
  observations, Karpathy and Rohitg00 notes, the inspectable LLM-wiki OSS
  surface, and independent Reddit threads repeat high-intent setup, freshness,
  contradiction, context-bloat, Obsidian, Claude Code, MCP, and cross-session
  jobs. Wenlan `v0.15.0` provides maintained first-party commands and
  Source/Memory/Page lifecycle proof. Exact URLs, dates, locales, native units,
  limitations, and the complete candidate gate are in
  `docs/seo-audits/2026-07-27-llm-wiki-implementation-guide-prelaunch.md`.
  External observations remain demand discovery only, not GSC input or
  keyword volume.
- Baseline: GSC property totals are 7 clicks and 329 impressions;
  visible-query totals are 1 click and 81 impressions, leaving a 6-click and
  248-impression visibility gap. The target page has 0 clicks, 2 impressions,
  and page-average position 3.5; both queries are hidden. The visible
  `llm wiki 2.0` row has 0 clicks, 1 impression, and position 13.0 but maps to
  `/zh-TW`, so known qualified query-to-target impressions are 0. Vercel
  separately reports 1,406 visitors and 1,612 pageviews property-wide; no
  source-to-page session is inferred. GitHub reports 47 total Wenlan stars.
  Umami and Vercel custom CTA observations remain unavailable or
  account-gated.
- Change: Keep `/learn/distilled-wiki-pages-ai-memory`, its original
  publication date, English-only availability, sitemap/hreflang behavior,
  Article and BreadcrumbList schemas, visible-only FAQ policy, and CTA
  destination. Refresh H1 and metadata; add the generic four-plane
  architecture, six-command five-minute protocol, observable success checks,
  source-to-memory-to-page evidence trail, five recurring failure repairs,
  and neutral RAG/Obsidian/agent-memory boundaries before the maintained
  Wenlan mapping. Add contextual inbound links from the MCP memory, Claude
  Code memory, AI-agent-memory-types, knowledge-base, and Obsidian pages.
  Retain the prepared related links inside this experiment. Add no new URL,
  Mandarin translation, `FAQPage` JSON-LD, indexing request, or external
  distribution.
- Publish date: not-published
- Index date: existing-indexed-page-date-unavailable
- Minimum exposure: 20 GSC target-page impressions in the first 28 complete
  post-deploy days
- Success criteria: After minimum exposure, at least 1 GSC target-page click
  or at least 40 target-page impressions. Page-average position and visible
  joined query rows remain separate and are not reported as exact-query rank.
- Failure criteria: After 28 complete post-deploy days and minimum exposure,
  the target has 0 clicks, fewer than 40 impressions, and page-average
  position worse than 20.0. Below minimum exposure or any result between the
  success and failure conditions is inconclusive.
- Stop criteria: Stop or hold if a maintained Wenlan command or lifecycle
  claim is invalid, an inbound link is missing or redirected, another
  controller edits the route, or the change creates a canonical, indexing,
  robots, noindex, structured-data, sitemap, locale, publication-date,
  FAQ-policy, source-link, intent-overlap, or rendered-layout regression.
- 24h readout: pending — verify the live route, H1, metadata, six-command
  protocol, contextual inbound paths, canonical/indexability/schema/FAQ
  policy, locale non-regression, and production render without an SEO-success
  judgment
- 7d readout: pending — report GSC latency, target-page clicks, impressions,
  page-average position, and joined visible qualified rows when available;
  report Vercel target presence, authenticated Umami CTA observations, and
  GitHub stars separately
- W2 readout: pending — apply the exposure guard and inspect whether the page
  earns relevant joined `llm wiki`, Claude Code, Obsidian, and RAG-modified
  intent without collapsing into generic AI notes or enterprise
  knowledge-base demand
- W4 readout: pending — evaluate the predeclared success, failure, or
  inconclusive condition without changing thresholds
- W8 readout: pending — record a post-campaign follow-up only if it remains
  useful
- Result: pending
- Decision: wait
- Next step: finish local SEO/i18n/lint/build/technical and rendered
  verification, then present the exact diff for separate publication approval
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-27T04:59:46Z — LLM-wiki implementation guide locally verified

- Record type: campaign-observation
- Current experiment:
  `EXP-2026-07-27-llm-wiki-implementation-guide-refresh`
- Status: active; locally verified; not published; continues to consume the
  single production slot until production verification or a terminal decision
- Evidence correction retained: target-page average position 3.5 remains a
  two-impression page aggregate with both queries hidden. The visible
  `llm wiki 2.0` row maps to `/zh-TW`; known qualified query-to-target
  impressions remain 0. No exact-query rank is inferred.
- Scope: one existing English canonical refreshed with a generic definition,
  four-plane architecture, six-command protocol, observable checks,
  source-to-page evidence trail, five recurring failure repairs, neutral
  adjacent-system boundaries, and maintained Wenlan proof. Five existing
  English pages add contextual inbound links. No URL, locale availability,
  original publication date, sitemap/hreflang behavior, schema type, CTA
  destination, or visible-only FAQ policy changed.
- Contract evidence: the focused acquisition assertion failed before the page
  refresh and passed after it.
- Static verification: Goal PASS; SEO 189/189; i18n 53/53; TypeScript PASS;
  production build PASS with 211 static pages; compiled technical SEO PASS
  with 110 sitemap URLs, 26 redirects, seven noindex headers, 14 checked HTML
  pages, and no `FAQPage` across 114 built HTML files.
- Runtime verification: the locale matrix passed 19 expected HTTP 200 routes
  and five expected hard 404 routes against the isolated production server.
  Fresh rendered QA covered six English direct content/link surfaces at
  desktop and mobile breakpoints plus the existing zh-TW and zh-CN target
  routes on mobile. All five contextual links navigated to the exact target;
  the mobile FAQ opened; no document/H1 overflow, console warning/error, CJK
  clipping, canonical, schema, or FAQ-policy regression was found.
- Evidence path:
  `/private/tmp/wenlan-llm-wiki-visual-qa-2026-07-27/`
- Result: pending; no SEO lift or causal effect is inferred before publication
  or from local verification.
- Unperformed gated actions: no commit, push, PR, merge, deployment, indexing
  request, GSC validation, Reddit or other external post, OSS submission,
  paid acquisition, synthetic analytics event, or metric change.
- Next step: present the exact local diff and verification results for
  separate publication approval.

### 2026-07-27T05:26:43Z — LLM-wiki implementation guide publication approved

- Record type: campaign-observation
- Current experiment:
  `EXP-2026-07-27-llm-wiki-implementation-guide-refresh`
- Status: active; locally verified; publication authorized
- Approval: the user approved commit, Git push, ready PR creation, merge, the
  existing automatic Vercel deployment triggered by merge, and read-only
  production verification.
- Boundaries retained: no request indexing, GSC validation, Reddit or other
  external post, OSS submission, paid acquisition, synthetic analytics event,
  account mutation, or metric-definition change is authorized.
- Next step: re-run the frozen Goal and release gates, publish the scoped diff,
  wait for required GitHub checks, merge, and verify the exact production
  commit without making an SEO-success or causal claim.

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-27-llm-wiki-implementation-guide-refresh production verification at 2026-07-27T05:38:39Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-27-llm-wiki-implementation-guide-refresh
- Observed at: 2026-07-27T05:38:39Z
- Readout: correction
- Status: measuring
- Evidence: PR #89 merged as the exact commit recorded below; its Vercel
  status completed successfully, the live target and five inbound paths
  matched the approved change, and the deployed technical audit passed.
- Publication: PR #89 merged at `2026-07-27T05:28:59Z` as
  `a8698b1629e88e4f48949fbc3ec96046e4e39f81`; Vercel production completed at
  `2026-07-27T05:29:47Z`.
- Live evidence: the English target returned its exact self-canonical, H1,
  `datePublished: "2026-06-24"`, `dateModified: "2026-07-27"`, five-minute
  protocol, verification section, failure repairs, and neutral adjacent-system
  comparison. Each of the five contextual source pages exposed the exact
  inbound target link.
- Technical evidence: the deployed audit passed robots, 110 sitemap URLs,
  14 key pages, six utility noindex headers, sitemap-wide `FAQPage` absence,
  25 redirects, six bridge-host redirects, and legacy-URL exclusions.
- Locale boundary: no Mandarin content or locale availability changed. The
  existing zh-TW and zh-CN target routes remain outside this English refresh's
  content attribution.
- Production slot: released after production verification.
- Metric interpretation: publication and technical integrity are verified.
  No SEO lift, exact-query ranking, source-to-page session, CTA conversion,
  star attribution, setup success, or causal result is inferred.
- Unperformed separately gated actions: no indexing request, GSC validation,
  Reddit or other external post, OSS submission, paid acquisition, synthetic
  analytics event, account mutation, or metric-definition change.
- Result: pending
- Decision: wait
- Next step: run the 24-hour technical/evidence readout after
  `2026-07-28T05:29:47Z`, keeping page-level GSC data, joined visible queries,
  Vercel, Umami when authenticated, and GitHub stars in their native units.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-27-download-information-architecture

- Record type: experiment-start
- Experiment ID: EXP-2026-07-27-download-information-architecture
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: integration-hub
- Launched: 2026-07-27
- Hypothesis: Replacing the full homepage release matrix with one compact
  browser-recommended platform action, while moving every archive and setup
  path to a localized `/download` hub, will make the download action visible
  in the first mobile anchor viewport and earn qualified GitHub outbound use
  without weakening release accuracy or technical SEO.
- Candidate evidence: The live `https://wenlan.app/#download` render inspected
  on `2026-07-27` measured about 960.45 CSS pixels on desktop and about
  1,739 to 1,834 CSS pixels on the inspected mobile views. The first mobile
  anchor viewport exposed no download action. Current source promotes Windows
  structurally before browser-system evidence exists and gives the other three
  visible actions the same generic label. The user independently confirmed
  that the homepage should show only a system recommendation and link to a
  complete download page. Exact rendered, code, date, and locale provenance is
  recorded in
  `docs/seo-audits/2026-07-27-download-information-architecture-prelaunch.md`.
- Baseline: GSC property totals are 7 clicks and 329 impressions;
  visible-query totals are 1 click and 81 impressions, leaving a 6-click and
  248-impression visibility gap. Vercel separately reports 1,406 visitors and
  1,612 pageviews. GitHub reports 47 total Wenlan stars. Authenticated Umami
  CTA totals and Vercel source-to-page sessions are unavailable, so no CTA
  ratio, star attribution, or causal baseline is inferred.
- Change: Keep the homepage `#download` anchor but replace its full platform
  matrix with one compact client-leaf recommendation and a localized complete
  download link. Add `/download`, `/zh-TW/download`, and `/zh-CN/download`
  with all four immutable release archives, platform-specific setup guidance,
  `wenlan doctor` verification, reciprocal canonical and hreflang metadata,
  sitemap membership, and BreadcrumbList JSON-LD. Keep release facts sourced
  from `WENLAN_RELEASE`; add no search article, `FAQPage` JSON-LD, indexing
  request, or external distribution.
- Publish date: not-published
- Index date: not-indexed
- Minimum exposure: 100 Vercel pageviews summed in native units across the
  localized homepage and download-hub paths in the first 28 complete
  post-deploy days; this is not a deduplicated visitor count
- Success criteria: After minimum exposure, at least 10 authenticated Umami
  `github_outbound` events across `home-download` and `download-page`, while
  technical, release, locale, and rendered-layout gates continue to pass.
- Failure criteria: After 28 complete post-deploy days and minimum exposure,
  zero authenticated Umami `github_outbound` events across both placements
  while tracker coverage is verified.
- Stop criteria: Stop or repair if the recommendation mismatches the detected
  desktop OS family, an archive disappears, release facts drift from
  `WENLAN_RELEASE`, another controller edits the same surfaces, or the change
  creates a canonical, indexing, robots, noindex, redirect, structured-data,
  sitemap, locale, analytics, accessibility, or rendered-layout regression.
- 24h readout: pending - verify the live homepage recommendation, complete
  download hub, four archive URLs, canonical/hreflang/sitemap/schema contract,
  locale routes, mobile first-viewport action, and tracker presence without a
  conversion or causal judgment
- 7d readout: pending - report Vercel homepage and download-hub pageviews,
  authenticated Umami outbound events when available, GSC, and GitHub stars
  separately; keep the result inconclusive without tracker coverage
- W2 readout: pending - apply the native-unit exposure guard and inspect
  platform recommendation errors, download-hub engagement, and technical or
  locale regressions
- W4 readout: pending - apply the predeclared success, failure, or
  inconclusive condition without changing thresholds
- W8 readout: pending - record a post-campaign follow-up only if the
  conversion surface remains useful to evaluate
- Result: pending
- Decision: wait
- Next step: Implement and verify the approved local scope, then stop before
  commit, push, PR, merge, deployment, request indexing, GSC validation,
  synthetic analytics events, or external publication.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-27T06:22:51Z — Download information architecture local preflight

- Record type: campaign-observation
- Current experiment:
  `EXP-2026-07-27-download-information-architecture`
- Status: active; locally implemented and verified; not published
- Verification: frozen Goal verifier, TypeScript, 193 SEO/brand/technical
  tests, 53 i18n tests, production build, built technical SEO, local
  production-route i18n checks, and rendered desktop/mobile QA all passed.
- Rendered result: the English homepage download surface measured about 411
  CSS pixels on the inspected desktop viewport and about 698 CSS pixels at
  393 by 852 CSS pixels, versus live baselines of about 960 and 1,834 CSS
  pixels. English, zh-TW, and zh-CN home/download routes had no document-level
  horizontal overflow, and every mobile download-hub CTA stayed within the
  viewport.
- Technical result: all four immutable release assets, exact localized
  canonicals, reciprocal hreflang, sitemap membership, `BreadcrumbList` and
  `WebPage` JSON-LD, visible `wenlan doctor`, and the ordinary-site
  no-`FAQPage` rule were verified locally.
- Metric interpretation: local implementation and technical integrity are
  verified. No pageview, event, search, star, setup, conversion, or causal
  result is inferred before publication.
- Unperformed separately gated actions: no commit, push, PR, merge,
  deployment, indexing request, GSC validation, external post, OSS
  submission, paid acquisition, synthetic analytics event, or
  metric-definition change.
- Next step: present the exact local diff and verification evidence for
  separate publication approval.

### 2026-07-27T06:58:14Z — Download information architecture PR approved

- Record type: campaign-observation
- Current experiment:
  `EXP-2026-07-27-download-information-architecture`
- Status: active; locally verified; PR publication authorized
- Approval: the user approved commit, Git push, and PR creation for the exact
  locally verified download-information-architecture diff.
- Boundaries retained: no merge, deployment, request indexing, GSC
  validation, Reddit or other external post, OSS submission, paid
  acquisition, synthetic analytics event, account mutation, or
  metric-definition change is authorized.
- Next step: re-run the frozen Goal and release gates, publish an isolated
  branch and draft PR, and stop before merge or deployment.

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-27-llm-wiki-implementation-guide-refresh at 2026-07-28T05:47:53Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-27-llm-wiki-implementation-guide-refresh
- Observed at: 2026-07-28T05:47:53Z
- Readout: 24h
- Status: measuring
- Evidence: The production and locale gates passed, while every available
  authenticated search and visitor range still ends before deployment.
- GSC evidence: The latest authenticated range remains
  `2026-06-27..2026-07-24`, before the implementation-guide deployment.
  Property totals are 7 clicks and 329 impressions; visible-query totals are
  1 click and 81 impressions; the query visibility gap is 6 clicks and
  248 impressions. The target-page row is separately 0 clicks,
  2 impressions, and page-average position 3.5. The joined visible qualified
  query-to-target subset is 0 clicks, 0 impressions, and 0 rows. The visible
  `llm wiki 2.0` row has 1 impression and average position 13.0 but maps to
  `/zh-TW`, not to the target. This range cannot measure the first complete
  post-deploy day; no indexing state, exact-query rank, SEO success, or
  post-change search effect is inferred.
- Vercel evidence: The same complete pre-deploy range reports 1,406 raw
  visitors and 1,612 pageviews. Direct traffic is separately 262 visitors and
  341 pageviews. The existing qualified-source allowlist sums to
  1,149 visitors across separate search, AI, and GitHub referrer rows and is
  not a deduplicated visitor count. Acquisition-surface page rows are
  separately 5 visitors and 5 pageviews for the English target,
  3 visitors and 4 pageviews for the zh-TW counterpart, and 2 visitors and
  3 pageviews for the zh-CN counterpart. The aggregates provide no
  source-to-page join or unique cross-page acquisition-surface visitor count,
  and the range predates this refresh.
- Umami and GitHub evidence: No authenticated Umami event observation is
  available. Vercel custom events remain Pro-or-Enterprise account-gated, so
  GitHub outbound and CTA are not reported. GitHub REST reports 47 total
  Wenlan stars at this readout; no star attribution or causal claim is made.
- Technical evidence: The production technical audit passed robots,
  110 sitemap URLs, 14 key pages, six utility noindex headers,
  sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects,
  18 direct changed redirects, and legacy-URL exclusions. The English target
  returned direct HTTP 200 with no blocking `X-Robots-Tag`, its exact
  self-canonical, `index, follow`, Article and BreadcrumbList JSON-LD,
  `datePublished: "2026-06-24"`, and
  `dateModified: "2026-07-27"`.
- Content and link evidence: The live page retained the LLM-wiki definition,
  four-plane architecture, six-command `/brief`, `/recall`, `/capture`,
  `/handoff`, `/distill`, and `/pages` protocol, observable verification
  section, source-to-maintained-answer evidence trail, failure repairs, and
  neutral RAG, Obsidian, repository-search, and agent-memory boundaries.
  Four visible FAQ summary controls remain present without `FAQPage`
  JSON-LD. The MCP memory, Claude Code memory, AI-agent-memory-types,
  AI-work-memory-versus-knowledge-base, and Obsidian comparison pages each
  expose a visible exact link to the target.
- Locale and render evidence: English, zh-TW, and zh-CN targets returned their
  exact self-canonicals, `index, follow`, reciprocal `en-US`, `zh-TW`,
  `zh-CN`, and `x-default` alternates, and Article plus BreadcrumbList schema.
  Fresh rendered DOM checks found no document or H1 overflow on the English
  desktop and 393 by 852 CSS-pixel views or on the two Mandarin desktop
  views. The English implementation sections and FAQ controls had rendered
  dimensions, and the browser recorded no warning or error.
- Result: pending
- Decision: wait
- Unperformed gated actions: no push, PR, merge, deployment, indexing request,
  GSC validation, Reddit or other external post, OSS submission, paid
  acquisition, synthetic analytics event, account mutation, or
  metric-definition change was performed in this readout.
- Next step: keep this cohort measuring and do not record its 7-day readout
  before `2026-08-03T05:29:47Z`. Reuse the next authenticated weekly evidence
  rather than duplicating its GSC or Vercel pipeline, and keep every source in
  its native unit.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-29T01:01:37Z — unified acquisition and domain-migration observation

- Record type: campaign-observation
- Status: Change of Address active; sitemap refreshed; targeted indexing
  requests completed; no new content experiment started
- User correction: the acquisition center is AI knowledge bases, LLM wiki,
  source-backed wiki, and Obsidian or knowledge-base-adjacent workflows.
  Memory remains an enabling product capability and supporting vocabulary,
  but generic memory demand no longer nominates the next acquisition asset.
- Aligned evidence window: `2026-06-28..2026-07-25`.
- Wenlan GSC: 8 property clicks and 395 property impressions; visible-query
  totals are 2 clicks and 92 impressions; the visibility gap is 6 clicks and
  303 impressions. The existing Searchfit grouping reports 48 visible
  non-brand impressions; its `Other` bucket still includes noisy Wenlan
  misspellings.
- Legacy `useorigin.app` GSC: 5 property clicks and 516 property impressions. These
  remain a migration diagnostic and are not added to the Wenlan Goal metric.
- Vercel: 1,420 raw visitors and 1,628 pageviews; direct is separately
  270 visitors and 351 pageviews; the qualified-source sum is separately
  1,152 visitors across per-referrer rows and is not deduplicated.
- GitHub and CTA: GitHub reports 47 stars. No authenticated Umami event read
  is available, so no GitHub-outbound or CTA ratio is reported.
- Search Console migration verification: `useorigin.app` shows
  `This site is currently moving` to `wenlan.app`, with start date
  2026-07-28. The Wenlan sitemap was submitted and read on 2026-07-28 with
  `Success` and 113 discovered pages.
- Targeted URL Inspection: all four selected URLs first returned
  `URL is on Google`, then returned `Indexing requested`:
  `/learn/distilled-wiki-pages-ai-memory`,
  `/learn/source-backed-wiki-pages-ai-work`,
  `/learn/ai-work-memory-vs-knowledge-base`, and
  `/zh-TW/learn/distilled-wiki-pages-ai-memory`.
- GSC validation: not submitted because no matching repaired coverage issue
  is awaiting validation.
- Evidence:
  `docs/seo-audits/2026-07-29-unified-acquisition-observation.md`.
- Decision: monitor migration and re-run the candidate gate around AI
  knowledge base and wiki intent; do not repeat indexing requests or start a
  generic memory article.
- Next step: read Wenlan GSC, legacy `useorigin.app` GSC, Vercel, GitHub, indexing, and
  sitemap evidence together in the next authenticated window while preserving
  native units and avoiding a fabricated source-to-page join.

### 2026-07-29T02:56:17Z — acquisition-focus control-plane correction

- Record type: campaign-observation
- Status: local control-plane and Searchfit correction verified; no website
  experiment started
- Approval: after correcting the acquisition center to AI knowledge bases,
  LLM wiki, source-backed wiki, and Obsidian or knowledge-base workflows, the
  user instructed the controller to continue implementing the semantic guard.
- Contract change: the frozen acquisition focus now separates new acquisition
  decisions from existing memory-page measurement and maintenance. Generic
  memory demand cannot nominate the next experiment.
- Mutable-plan change: existing memory cohorts are labeled measurement
  maintenance and no longer occupy the acquisition decision lane.
- Pipeline change: Searchfit now maps LLM-wiki, source-backed-wiki,
  AI-knowledge-base, Traditional Chinese `AI 知識庫`, and Simplified Chinese
  `AI 知识库` queries to maintained existing surfaces before generic
  memory-adjacent groups. Modifier-qualified Obsidian intent remains mapped to
  the Obsidian surface.
- Verification: the focused Goal drift test and the focused Searchfit mapping
  test pass, and `pnpm seo:goal:check` passes with the updated frozen hash.
- Boundaries: no article or website copy was changed; no push, PR, merge,
  deployment, indexing request, GSC validation, external publication, paid
  acquisition, synthetic analytics event, or metric-definition change was
  performed.
- Decision: use AI knowledge-base and wiki evidence for the next candidate;
  keep memory rows reportable only as historical or measuring evidence.
- Next step: regenerate the latest authenticated report through the corrected
  classifier, then evaluate the highest-evidence existing knowledge-base or
  wiki page before considering a net-new URL.

### 2026-07-29T02:59:52Z — corrected Searchfit action read

- Record type: campaign-observation
- Status: corrected authenticated action view generated; no website experiment
  started
- Evidence window: `2026-06-28..2026-07-25`, reusing the same authenticated
  Wenlan GSC and Vercel inputs without changing any native metric.
- Report:
  `/tmp/wenlan-seo-2026-07-28/weekly-seo-corrected.md`.
- Evidence fingerprint:
  `sha256:eeddd8e91beeccb18dc26ee212349f73911ff37fc940e18824076d4e949a4e3d`.
- Corrected query mapping: visible `llm wiki 2.0` now maps to the existing
  distilled-wiki page under `AI knowledge base / wiki` instead of `Other`.
  Its single impression remains below the action threshold.
- Top Actions: refresh the existing
  `/learn/ai-work-memory-vs-knowledge-base` knowledge-base surface and sharpen
  the `/learn` hub. Generic memory rows remain in the complete queues but are
  excluded from acquisition nominations.
- Decision: evaluate the indexed knowledge-base surface first, then the Learn
  hub; do not launch a generic memory experiment from this report.
- Next step: inspect the current knowledge-base page, joined visible-query
  evidence, SERP intent, and maintained Wenlan proof before proposing a
  bounded content refresh.

### 2026-07-29T03:14:36Z — Obsidian query-language boundary

- Record type: campaign-observation
- Status: demand-discovery boundary and Searchfit nomination guard verified;
  no website experiment started
- Authenticated GSC evidence: the `2026-06-28..2026-07-25` visible query
  export contains no Obsidian row. The English Obsidian page has 4 impressions
  and average position 4.5, but its page aggregate does not reveal the search
  wording.
- Google Trends evidence: the signed-in Taiwan capture from 2026-07-18
  recorded related rising queries `obsidian claude code` (+3,350%),
  `obsidian and claude` (+2,400%), and `obsidian claude` (+1,500%). These are
  Trends rising percentages, not search volume.
- Independent wording evidence: current Reddit, Obsidian community-plugin,
  OSS, and SERP surfaces repeatedly pair Obsidian with Claude Code, Claude,
  or MCP.
- Decision: `Obsidian workflow` is an internal category, not a proven query.
  Obsidian is a discovery bridge into the AI-knowledge-base story, not a peer
  acquisition center.
- Pipeline guard: only a visible query pairing `obsidian` with `claude`,
  `claude code`, or `mcp` can nominate the Obsidian group in Top Actions.
  Generic `obsidian`, `obsidian workflow`, `obsidian knowledge base`,
  `markdown knowledge base`, and `obsidian ai memory` remain reportable but
  discovery-only.
- Verification: `pnpm seo:goal:check` passes; the full 195-test SEO suite
  passes; the same authenticated report retains evidence fingerprint
  `sha256:eeddd8e91beeccb18dc26ee212349f73911ff37fc940e18824076d4e949a4e3d`
  and still nominates only the indexed knowledge-base page and Learn hub.
- Boundaries: no website content, URL, canonical, sitemap, structured data, or
  analytics definition changed; no push, PR, merge, deployment, indexing
  request, GSC validation, external publication, or paid acquisition occurred.

### 2026-07-29T03:46:54Z — Trends nomination clarification

- Record type: campaign-observation
- Status: control-plane interpretation corrected; no website experiment
  started
- Correction: the preceding Searchfit guard applies only to Top Actions
  derived from authenticated GSC rows. It is not a campaign-wide requirement
  to wait for a visible GSC query.
- Evidence role: an inspectable modifier-qualified Trends query may nominate
  advance preparation when independent corroboration, a clean coverage gap,
  maintained Wenlan proof, and standalone utility also pass. GSC remains the
  later authority for Wenlan search performance and indexing.
- Existing coverage: the live zh-TW Obsidian page already leads with
  `Obsidian + Claude Code` and covers `Obsidian MCP`. The existing English
  route still leads with `Wenlan vs Obsidian AI Memory`, making it the cleaner
  refresh candidate for the observed English tool-pair queries.
- Decision: do not create another Obsidian URL. If selected as the next
  experiment, refresh the existing English route around `obsidian claude
  code`, `claude code obsidian`, and `obsidian mcp`, while keeping the
  AI-knowledge-base role and maintained sources explicit.

### 2026-07-29T04:29:56Z — Simplified Chinese community-heat lane

- Record type: campaign-observation
- Status: initial public-source snapshot recorded; no website experiment
  started
- Sources: public V2EX, Bilibili, Juejin, Zhihu, and Simplified Chinese
  SERP-visible community pages. Login-gated sources remain manual and were not
  treated as unavailable-zero observations.
- Repeated core language: `LLM Wiki 知识库`, `AI 知识库`, `本地 AI 知识库`,
  `AI 维护知识库`, and `RAG vs LLM Wiki`.
- Repeated tool-bridge language: `Claude Code + Obsidian`, `Obsidian CLI +
  Claude Code`, `Obsidian MCP`, and `Claudian`.
- Native-unit examples at capture: one Bilibili LLM-Wiki/Obsidian item showed
  `8.0万播放`; a Karpathy AI-knowledge-base item showed `3.1万播放`; a V2EX
  LLM-wiki launch thread showed 1,236 clicks and 1 reply; a V2EX Obsidian plus
  Claude Code thread showed 2,116 views and 6 replies; a Juejin LLM-Wiki
  article showed 2,053 reads. These units are not combined or converted.
- Coverage read: the existing zh-CN LLM-wiki page partially covers the core
  language. Its current title leads with `AI 工作的 LLM wiki`, while public
  community wording repeatedly leads with `LLM Wiki 知识库` or
  `AI 知识库`. Refresh that existing route before creating another zh-CN URL
  if the full candidate gate clears.
- Decision: monitor the lane at most once per campaign window and use it for
  advance candidate nomination, not authenticated GSC input, keyword-volume
  claims, or causal attribution.
- Evidence:
  `docs/seo-audits/2026-07-29-zh-cn-community-demand.md`.

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-27-download-information-architecture production correction at 2026-07-29T04:52:26Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-27-download-information-architecture
- Observed at: 2026-07-29T04:52:26Z
- Readout: correction
- Status: measuring
- Evidence: PR #91 merged at `2026-07-28T14:29:47Z` as
  `ca89fb2d16f51a15c8b36378a22425af346b5954`; production completed and the
  localized homepage recommendation plus `/download`, `/zh-TW/download`, and
  `/zh-CN/download` are live. The deployed technical audit passes 113 sitemap
  URLs, 17 key pages, six utility noindex headers, sitemap-wide `FAQPage`
  absence, 25 redirects, six bridge-host redirects, and old-URL exclusions.
  This correction reconciles the append-only experiment state with the
  production-verified PLAN record and releases the preparation slot.
- Result: pending
- Decision: wait
- Next step: Keep the download cohort on its predeclared readouts while the
  single production-preparation slot is available to the next eligible
  evidence-backed website experiment.
<!-- EXPERIMENT-RECORD:END -->

<!-- EXPERIMENT-RECORD:START -->
## Experiment start: EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh

- Record type: experiment-start
- Experiment ID: EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh
- Status: active
- Data window: 2026-07-25..2026-07-31
- Asset class: refresh
- Launched: 2026-07-29
- Hypothesis: Refreshing the existing zh-CN LLM-wiki canonical around the
  recurring public language `LLM Wiki 知识库`, `AI 知识库`, and
  `本地 AI 知识库`, while adding a standalone RAG comparison and an
  inspectable implementation loop, will create measurable Simplified Chinese
  search exposure without adding an overlapping URL.
- Candidate evidence: The public Simplified Chinese snapshot captured
  independent Bilibili, V2EX, and Juejin pages using the target language,
  including native observations of `8.0万播放`, `3.1万播放`, 1,236 clicks
  plus 1 reply, and 2,053 reads; these units remain separate. Current SERP
  observations also return exact-language competing LLM-wiki and
  knowledge-base pages while Wenlan was absent from the inspected first
  results. The existing
  `/zh-CN/learn/distilled-wiki-pages-ai-memory` route is the clean coverage
  seam but currently leads with memory-first wording. Evidence and URLs are
  preserved in
  `docs/seo-audits/2026-07-29-zh-cn-community-demand.md`.
- Baseline: Authenticated GSC for `2026-06-28..2026-07-25` reports 8 property
  clicks and 395 property impressions; visible-query totals are 2 clicks and
  92 impressions, leaving a 6-click and 303-impression visibility gap. The
  target zh-CN URL has no GSC page row, which is not reported as zero.
  Vercel separately reports 2 visitors and 3 pageviews for the target page.
  GitHub reports 47 total Wenlan stars. Authenticated Umami events are
  unavailable, so no CTA baseline or source-to-page session is inferred.
- Change: Keep
  `/zh-CN/learn/distilled-wiki-pages-ai-memory`, its original
  `datePublished: "2026-07-04"`, canonical, sitemap entry, hreflang set, and
  Article plus BreadcrumbList schema. Refresh its title, metadata, quick
  answer, architecture, RAG/Obsidian boundaries, implementation and
  verification sections, FAQs, and maintained references around the
  Simplified Chinese AI-knowledge-base intent. Set
  `dateModified: "2026-07-29"`. Keep visible FAQ text without `FAQPage`
  JSON-LD and do not add a new URL or unsupported locale.
- Publish date: pending explicit publication approval
- Index date: not observed; no indexing request authorized
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete
  post-publication days for which Search Console data is available.
- Success criteria: After minimum exposure, the target page records at least
  1 GSC click or page-average position at or above the declared threshold of
  20 or better. Keep any visible joined qualified-query rows separate from
  the page aggregate.
- Failure criteria: After 28 complete post-publication days and minimum
  exposure, the target page records 0 clicks and page-average position worse
  than 20.
- Stop criteria: Stop or repair before publication if the refresh creates a
  canonical, sitemap, hreflang, robots, noindex, Article/BreadcrumbList,
  localization, maintained-source, duplicate-intent, or rendered-layout
  regression. After publication, stop further copy churn until a declared
  readout or new evidence.
- 24h readout: Verify exact production commit, HTTP 200, self-canonical,
  indexability, schema dates, visible target sections, FAQPage absence,
  reciprocal locale alternates, sitemap membership, and rendered desktop plus
  mobile output. Report available metrics in native units without an SEO or
  causal judgment.
- 7d readout: Reuse the latest authenticated weekly range; report GSC
  property, visible-query, visibility-gap, target-page, Vercel, Umami when
  authenticated, and GitHub observations separately. Mark inconclusive when
  the range or exposure is incomplete.
- W2 readout: Apply the same native-unit split and inspect target-page plus
  visible qualified-query movement only after enough post-publication days.
- W4 readout: Apply the predeclared minimum exposure and success or failure
  rule; otherwise record inconclusive.
- W8 readout: Preserve the final observation if available after the campaign
  deadline without moving the Goal's fixed final window.
- Result: pending
- Decision: wait
- Next step: complete local content, localization, rendered UI, build, and
  technical SEO verification, then stop at the explicit Git push, PR, merge,
  deployment, and indexing approval boundaries.
<!-- EXPERIMENT-RECORD:END -->

### 2026-07-29T05:00:11Z — zh-CN LLM-wiki refresh local verification

- Record type: campaign-observation
- Current experiment:
  `EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh`
- Status: active; locally verified; awaiting explicit publication approval
- Content evidence: the existing zh-CN canonical now leads with
  `LLM Wiki 知识库`, `AI 知识库`, `本地 AI 知识库`, and
  `RAG vs LLM Wiki`; it adds a standalone definition, four-layer
  architecture, Ingest/Query/Lint responsibilities, a six-command Wenlan
  implementation loop, observable checks, failure boundaries, visible FAQs,
  and maintained first-party references. The original publication date
  remains `2026-07-04`; the local modified date is `2026-07-29`.
- RED/GREEN evidence: the focused zh-CN acquisition-intent contract first
  failed on the old memory-first title and then passed after the refresh.
- Verification: `pnpm seo:goal:check` passes; `pnpm test:i18n` passes
  54 tests; `pnpm test:seo` passes 195 tests with
  `WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan` and
  `WENLAN_APP_REPO_ROOT=/Users/lucian/Repos/wenlan-app`; `pnpm lint` passes;
  `pnpm build` generates 214 static pages; `pnpm seo:technical:built` passes
  113 sitemap URLs, 17 required URLs, seven noindex headers, and 117 built
  HTML pages without `FAQPage`; `pnpm i18n:technical:built` passes 22 direct
  200 routes and five expected 404 routes; `git diff --check` passes.
- Deployed baseline: before publication, the production audit passes 113
  sitemap URLs, 17 key pages, six utility noindex headers, sitemap-wide
  `FAQPage` absence, 25 redirects, six bridge-host redirects, and old-URL
  exclusions. The current live target returns direct 200, `index, follow`,
  its exact self-canonical, and Article dates `2026-07-04`.
- Rendered verification: fresh production-build captures at 1440 by 1100 and
  393 by 852 CSS pixels show the hero, architecture, RAG comparison,
  implementation, verification, CTA, references, and FAQ surfaces without
  document-level horizontal overflow, clipped headings, CJK orphan lines, or
  browser warnings/errors. Article and BreadcrumbList schema expose
  `datePublished: "2026-07-04"` and `dateModified: "2026-07-29"`.
  Evidence is under `/tmp/wenlan-zhcn-llm-wiki-*.png`.
- Visual QA: the inline design-system/functional-integrity pass and the
  independent visual/CJK-precision pass both return PASS on the same build.
- Boundaries: no commit, Git push, PR, merge, deployment, indexing request,
  GSC validation, Reddit or other external post, OSS submission, paid
  acquisition, synthetic analytics event, account mutation, or
  metric-definition change was performed.
- Next decision: obtain explicit approval for commit, Git push, PR creation,
  merge, automatic Vercel deployment, and read-only production verification
  of this exact locally verified experiment. Indexing and GSC validation stay
  separately gated.

### 2026-07-29T05:13:16Z — zh-CN LLM-wiki publication approval

- Record type: campaign-approval
- Current experiment:
  `EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh`
- Approval: the user explicitly approved publication of this Simplified
  Chinese LLM-Wiki and AI-knowledge-base experiment in the active Codex Goal.
- Authorized actions: commit the exact locally verified worktree scope, push
  an isolated Git branch, create a pull request, merge it, allow the automatic
  Vercel production deployment, and perform read-only production
  verification.
- Boundaries retained: no request indexing, GSC validation, Reddit or other
  external post, OSS submission, paid acquisition, synthetic analytics event,
  account mutation, or metric-definition change is authorized.
- Next step: re-run the frozen Goal and publication gates, publish the isolated
  branch, verify the exact production commit and live technical/content state,
  then record production completion without claiming SEO lift or causality.

### 2026-07-29T05:25:56Z — zh-CN localized code-block production correction

- Record type: campaign-observation
- Current experiment:
  `EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh`
- Status: active; production-render correction in flight
- Publication provenance: PR #92 merged at `2026-07-29T05:16:36Z` as
  `1618945972a6957c4fd08501de464d2fb94627f1`; Vercel reported production
  success at `2026-07-29T05:17:23Z`.
- Production finding: live technical SEO, canonical, indexability, Article and
  BreadcrumbList schema, sitemap membership, hreflang, and locale-route checks
  passed. The visible six-command implementation loop did not: the localized
  Learn route rendered section body, bullets, and links but omitted the
  existing `section.code` data. The live HTML therefore lacked `/brief
  <主题>`.
- Correction: render localized `section.code` with the same bounded code-block
  treatment used by English Learn pages, and add a focused renderer contract.
  The focused test failed before the renderer change and passed afterward.
- Local verification: `pnpm seo:goal:check` passes; `pnpm test:i18n` passes 55
  tests; `pnpm test:seo` passes 195 tests; `pnpm lint` passes; `pnpm build`
  generates 214 static pages; `pnpm seo:technical:built` passes; and the local
  production locale matrix passes 22 expected 200 routes plus five expected
  404 routes. At a 393-pixel viewport, the document `scrollWidth` equals its
  387-pixel `clientWidth`; the zh-CN six-command block is fully visible.
  Desktop rendering at 1440 pixels also passes. The existing zh-TW long-command
  block remains contained by its own horizontal scroller without widening the
  document.
- Result: no SEO result; production correction pending
- Decision: repair
- Boundaries: this correction uses the existing publication approval for the
  exact experiment. No request indexing, GSC validation, external post, OSS
  submission, paid acquisition, synthetic analytics event, account mutation,
  or metric-definition change is performed.
- Next step: publish the isolated renderer correction, verify the exact live
  command block and technical state, then start the post-publication readout
  clock from the corrected production completion time.

<!-- EXPERIMENT-RECORD:START -->
## Experiment readout: EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh production verification at 2026-07-29T05:30:32Z

- Record type: experiment-readout
- Experiment ID: EXP-2026-07-29-zhcn-llm-wiki-knowledge-base-refresh
- Observed at: 2026-07-29T05:30:32Z
- Readout: correction
- Status: measuring
- Evidence: PR #92 and corrective PR #93 are merged and production-deployed;
  the exact live content, technical SEO, locale matrix, and responsive render
  checks below passed against `https://wenlan.app`.
- Publication: PR #92 merged at `2026-07-29T05:16:36Z` as
  `1618945972a6957c4fd08501de464d2fb94627f1`; its Vercel production completed
  at `2026-07-29T05:17:23Z`. PR #93 merged the localized renderer correction
  at `2026-07-29T05:27:38Z` as
  `5a4cc9264a9fa7554fc20f56bbda07bdbbb50685`; corrected Vercel production
  completed at `2026-07-29T05:28:22Z`.
- Live content evidence: the target returns direct HTTP 200 with the
  AI-knowledge-base title, exact self-canonical, `index, follow`, reciprocal
  `en-US`, `zh-TW`, `zh-CN`, and `x-default` alternates, Article and
  BreadcrumbList JSON-LD, stable `datePublished: "2026-07-04"`,
  `dateModified: "2026-07-29"`, seven intended guide sections, four
  maintained source links, visible FAQs without `FAQPage`, and all six
  `/brief`, `/recall`, `/capture`, `/handoff`, `/distill`, and `/pages`
  workflow commands.
- Technical evidence: the deployed audit passes robots, 113 sitemap URLs, 17
  key pages, six utility noindex headers, sitemap-wide `FAQPage` absence, 25
  redirects, six bridge-host redirects, and legacy-URL exclusions. The live
  locale matrix passes 22 expected direct-200 routes and five expected 404
  routes.
- Render evidence: at a 393-pixel viewport, document `scrollWidth` equals the
  387-pixel `clientWidth`, the command block occupies 337 pixels, and the six
  commands are visible. At 1440 pixels, document `scrollWidth` equals the
  1434-pixel `clientWidth` and the command block occupies 586 pixels. No
  browser warning or error was observed.
- Production slot: released after production verification.
- Metric interpretation: publication and technical integrity are verified.
  No SEO lift, exact-query rank, source-to-page session, CTA conversion, star
  attribution, setup success, or causal result is inferred.
- Unperformed separately gated actions: no indexing request, GSC validation,
  Reddit or other external post, OSS submission, paid acquisition, synthetic
  analytics event, account mutation, or metric-definition change.
- Result: pending
- Decision: wait
- Next step: run the 24-hour technical/evidence readout after
  `2026-07-30T05:28:22Z`, keeping GSC property totals, visible-query totals,
  query visibility gap, target-page rows, Vercel native-unit observations,
  authenticated Umami observations when available, and GitHub stars separate.
<!-- EXPERIMENT-RECORD:END -->
