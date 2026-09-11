# Wenlan successor decision matrix — 2026-08-28

## Status

Prepared on `2026-08-22T21:16:21Z` for the approved `2026-08-28` decision
boundary. This file is a fill-in control artifact, not a performance report.
Do not populate it before the latest Friday weekly pipeline has completed
successfully, and do not substitute the `2026-08-21` reference values for the
new source-native range.

Expected interim range: `2026-07-31..2026-08-27`, the 28 complete days ending
the day before the report date. The successor Goal's fixed final range remains
`2026-08-24..2026-09-20`; this interim matrix does not move or replace it.

Control-plane prefill on `2026-08-23` records only already-completed state:
the coding-agent source-backed family is published and measuring through PR
#136; the v0.16.0 factual release correction is live; and Awesome Mac PR #2643
is an open distribution attempt. These facts do not pre-fill August 28 GSC or
Vercel evidence and do not count as acquisition outcomes.

The read-only `2026-08-26T08:00:45Z` authority refresh records two later
states without pre-filling August 28 performance evidence: Dhanush PR #52 is
merged and visibly lists Wenlan on upstream `main`; Awesome Mac PR #2643 is
again `MERGEABLE/CLEAN` after its approved conflict resolution, but remains an
open distribution attempt until upstream merges and renders it.

The pre-boundary `2026-08-28T05:20:00Z` refresh keeps every Friday GSC and
Vercel field below `PENDING`. GitHub separately reports `51` stars, `160`
repository views from `41` unique viewers, and `68` Overview views from `30`
unique viewers for its sliding `2026-08-13..2026-08-26` traffic window. These
are interim GitHub-native observations, not the August 28 weekly result and
not a viewer-to-star join.

The same read-only refresh finds the latest GitHub release at `v0.17.3` while
the live homepage, download page, and about page still display `v0.16.0`.
Treat this as a separately approvable factual correction, not as a growth
experiment. Audience-scenario discovery in
`docs/seo-audits/2026-08-27-audience-scenario-demand-refresh.md` ranks an
auditable finance-research knowledge base highest for observed demand but
leaves it at `research` until its authority path and high-stakes boundaries
pass. A client-scoped consulting/research knowledge base is the next cleaner
full-gate candidate. Engineering and student net-new pages currently fail the
clean-gap or maintained-product-proof gate.

## Evidence inputs

Reuse, rather than rerun, the latest completed `weekly-origin-seo-cleanup`
pipeline and its committed report. Record the exact report path, evidence
fingerprint, source, range, and capture time below. If the August 28 weekly
run fails before authenticated evidence collection, leave the new fields
`unavailable`, cite the latest successful report, and make no on-page action.

| Input | Required source | 2026-08-28 capture |
| --- | --- | --- |
| Weekly report | `docs/seo-audits/2026-08-28-weekly-seo.md` or the latest successfully completed retry | PENDING |
| GSC property totals | Search Console API, `sc-domain:wenlan.app` | PENDING |
| GSC visible query totals | Search Console API query export | PENDING |
| GSC query-page join | Search Console API query-plus-page export | PENDING |
| GSC target-page rows | Search Console API page export | PENDING |
| URL Inspection | Authenticated Search Console URL Inspection API or UI, exact canonical and last crawl | PENDING |
| Vercel totals, referrers, pages, source-to-page aggregates | Authenticated Vercel Web Analytics API | PENDING |
| GitHub stars and release downloads | GitHub REST API | PENDING |
| Authority paths | Source-native GitHub PR/listing state | PENDING |
| Umami or Resend | Optional authenticated native-unit enrichment only | manual / account-gated unless a real export exists |

## Property-level progress

Keep each metric in its native unit. Do not combine them into a score or infer
causality. The `2026-08-21` row is a reference observation only; it does not
pre-fill the August 28 result or rewrite the fixed successor starting values.

| Source-native metric | Fixed successor start | 2026-08-21 reference | 2026-08-28 observation | Protected target | Gap from 2026-08-28 |
| --- | ---: | ---: | ---: | ---: | ---: |
| GSC property clicks | 8 | 8 | PENDING | 100 | PENDING |
| GSC property impressions | 985 | 1,005 | PENDING | 10,000 | PENDING |
| GSC visible-query clicks | 2 | 2 | PENDING | diagnostic only | not applicable |
| GSC visible-query impressions | 212 | 216 | PENDING | diagnostic only | not applicable |
| GSC click visibility gap | 6 | 6 | PENDING | diagnostic only | not applicable |
| GSC impression visibility gap | 773 | 789 | PENDING | diagnostic only | not applicable |
| Vercel raw visitors | 248 | 248 | PENDING | 2,000 | PENDING |
| Vercel direct visitors | 217 | 217 | PENDING | diagnostic only | not applicable |
| Vercel qualified-source visitors | unavailable at fixed start | 31 aggregate referrer visitors | PENDING | diagnostic only | not applicable |
| Vercel unique acquisition-surface visitors | unavailable | unavailable | PENDING or unavailable | diagnostic only | not applicable |
| GitHub total stars | 48 | 48 | PENDING | 100 | PENDING |

The `31` reference referrer visitors are `google.com: 30`, `cn.bing.com: 1`,
and `duckduckgo.com: 1` as separate Vercel aggregate rows; they are not
deduplicated people, GSC clicks, or source-to-page sessions.

## Existing-page action gate

An existing canonical is eligible only when every gate is `PASS`:

1. Google has a confirmed crawl after the page's current production version.
2. The same complete 28-day GSC range has at least `20` target-page
   impressions.
3. The query-page join has at least `3` qualified visible impressions owned
   by that exact canonical and locale.
4. Twenty-eight complete days have elapsed after the confirmed post-deploy
   crawl, unless the change is a separately approved factual or technical
   correction that is excluded from growth attribution.
5. The visible query owner is aligned or a routing review establishes the
   correct owner without claiming cannibalization from a sparse mismatch.
6. No newer production change overlaps the canonical, and the single website
   production slot is open.

Page-average position is never substituted for exact-query rank. A missing
row is `unavailable`, not zero. Do not pool English, zh-TW, and zh-CN.

| Locale | Canonical owner | Current production boundary or `dateModified` | Confirmed post-deploy crawl | Cooldown end | Page clicks | Page impressions | Qualified joined impressions | Owner state | 20/3/crawl/cooldown result | Eligible move |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| en | `/learn/distilled-wiki-pages-ai-memory` | production `2026-08-02T04:39:55Z`; `dateModified` 2026-08-01 | NO — GSC still shows `Jul 28, 2026, 6:09:29 PM`, equivalent to `2026-07-29T01:09:29Z`, before production | not started | 1 | 21 | 7 visible qualified-query impressions on this owner | aligned; exact `llm wiki` is visible on the canonical | performance floors pass, but post-deploy crawl and cooldown fail | authority bridge only; no existing-page edit |
| zh-TW | `/zh-TW/learn/distilled-wiki-pages-ai-memory` | current `dateModified` from live schema | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / routing review / existing-page refresh |
| zh-CN | `/zh-CN/learn/distilled-wiki-pages-ai-memory` | current `dateModified` from live schema | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / routing review / existing-page refresh |
| en | `/learn/source-backed-wiki-pages-ai-work` | `2026-08-09T15:34:35Z` conservative ready boundary | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-TW | `/zh-TW/learn/source-backed-wiki-pages-ai-work` | current live version | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-CN | `/zh-CN/learn/source-backed-wiki-pages-ai-work` | current live version | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| en | `/learn/build-local-ai-knowledge-base-from-documents` | `2026-08-02T02:42:26Z` | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-TW | `/zh-TW/learn/build-local-ai-knowledge-base-from-documents` | `2026-08-02T02:42:26Z` | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-CN | `/zh-CN/learn/build-local-ai-knowledge-base-from-documents` | `2026-08-02T02:42:26Z` | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| en | `/learn/wenlan-vs-obsidian-ai-memory` | `2026-07-29T06:07:17Z` | GSC displayed `Aug 1, 2026, 3:01:38 PM`; timezone not normalized | PENDING from exact source-native timestamp | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-TW | `/zh-TW/learn/wenlan-vs-obsidian-ai-memory` | `2026-08-01T21:09:50Z` | GSC displayed `Aug 1, 2026, 3:04:09 PM`; timezone not normalized | PENDING from exact source-native timestamp | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-CN | `/zh-CN/learn/wenlan-vs-obsidian-ai-memory` | `2026-08-01T21:09:50Z` | GSC displayed `Aug 1, 2026, 2:57:54 PM`; timezone not normalized | PENDING from exact source-native timestamp | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| en | `/learn/choose-ai-knowledge-base-tool` | `2026-08-02T07:55:01Z` | GSC displayed `Aug 2, 2026, 7:20:50 AM`; timezone not normalized | PENDING from exact source-native timestamp | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-TW | `/zh-TW/learn/choose-ai-knowledge-base-tool` | `2026-08-02T07:55:01Z` | no crawl in the formal 24h readout | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |
| zh-CN | `/zh-CN/learn/choose-ai-knowledge-base-tool` | `2026-08-02T07:55:01Z` | no crawl in the formal 24h readout | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | wait / existing-page refresh |

`/learn` remains a routing diagnostic, not an automatic copy-refresh owner.
On August 21 it had 140 page impressions, but its three qualified impressions
belonged to three different intents. Re-evaluate each query-to-owner mapping
before treating the hub total as a passed 20/3 gate.

## Net-new or translated asset gate

No net-new asset is nominated merely because an existing page is below the
20/3 gate. A candidate must pass every row independently for its locale.

| Candidate lane | Locale | Inspectable provenance and native unit | Repeated or high-intent problem | Clean coverage gap | Maintained Wenlan proof | Standalone utility | Predeclared authority path | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Coding-agent source-backed project knowledge base | en, zh-TW, zh-CN independently | Complete locale-specific provenance is stored in `docs/seo-scenario-backlog.json`; no row is keyword volume | PASS | PASS: session context and generic knowledge architecture remain different owners | PASS | PASS | PASS: exact small `ai-prompting-guide` path is predeclared; external action remains separately gated | published and measuring through PR #136; wait for source-native page/query rows |
| Verify AI knowledge-base citations and unsupported claims | en, zh-TW, zh-CN independently | PASS: Stack Overflow, OpenWebUI, Taiwan iThome, Juejin, SegmentFault, developer-community, and official-doc observations preserve native units | PASS | PASS only for the diagnostic task: start from a suspect answer and verify claim-to-source support | PASS with boundary: source IDs, citation-gated synthesis, per-claim citations, lint, stale state, and review; no generic RAG scorer claim | PASS | PASS: `Danielskry/Awesome-RAG` has a maintained Production & Best Practices resource section and accepted external-resource precedent; wait for existing Wenlan PR #142 to resolve before proposing a second neutral reference | published and measuring from PR #137 / `2026-08-23T22:21:18Z`; keep stable rather than treating it as the next candidate |
| Regression-test AI knowledge-base retrieval after changes | en, zh-TW, zh-CN independently | PASS: `110` returned result observations produced `94` unique URLs; retained practitioner, official, OSS, and Chinese-community sources preserve native units; targeted Reddit result is unavailable, not substituted. OpenSEO is connected but has zero credits and no saved research, so it contributes no metric or rank. | PASS: all three languages repeat golden questions, expected sources, retrieval metrics, and before/after checks for embedding, chunking, reranker, or corpus changes | PASS: citation verification owns one answer and evaluation docs own Wenlan benchmark reproduction; neither owns a user-operated retrieval regression workflow | PASS with boundary: tracked fixtures, retrieval metrics, ranking goldens, and a guarded drift test exist in the maintained Wenlan repo; no released `wenlan eval` user command is claimed | PASS | PASS with sequencing: a later neutral `Danielskry/Awesome-RAG` Production & Best Practices proposal is possible only after the current Wenlan contribution resolves and with separate approval | selected and locally prepared before August 28 on isolated branch `codex/retrieval-regression-scenario`; publication and every shared-state action remain separately approval-gated |
| ChatGPT source-backed knowledge base | en, zh-TW, zh-CN separately | Prior pass found materially weaker evidence | not established | PENDING | PENDING | PENDING | PENDING | reject unless new independent evidence changes the gate |

Generic AI memory, generic Obsidian workflow, generic AI notes, and broad
unqualified knowledge-base wording cannot nominate an asset.

The corrected comparison is recorded in
`docs/seo-audits/2026-08-25-three-scenario-demand-priority.md`. Direct Google
Trends comparisons for the three long-tail tasks in the United States,
Taiwan, and China returned insufficient data and no 0–100 time series, so
Trends does not rank them. Citation verification is already published and
measuring. The current priority is an authority bridge to the higher-demand
existing LLM Wiki owner; retrieval regression is the next qualified net-new
research candidate; stale-source maintenance remains a rejected net-new URL
because the clean gap fails.

The exact pre-August-28 selection is therefore retrieval regression. Its
isolated local family covers English, zh-TW, and zh-CN, has one task owner per
locale, and passes the deterministic and rendered prelaunch gate. This is a
prepared decision input rather than a populated August 28 performance result;
no GSC, Vercel, GitHub-star, or indexing field above is inferred from local
completion.

## Authority and conversion lanes

Interim source-native authority capture: `2026-08-26T08:00:45Z`. This may be
carried into the August 28 decision if it remains current, but it does not
pre-fill GSC, Vercel, GitHub-star, or release-download observations and does
not establish causality. A separate GitHub REST read at this capture reports
`51` Wenlan stars versus the fixed successor start of `48`; this is an interim
cumulative observation, not the August 28 matrix value or an attributed gain.

Read-only refresh at `2026-08-26T08:00:45Z`: Wenlan remains at `51` stars.
Awesome Selfhosted #2955 is open, non-draft, `MERGEABLE/CLEAN`, with
`syntax-checks` successful and no review or comment. Dhanush #52 is merged and
owner-approved, and current upstream `README.md` renders the Wenlan MCP line.
Awesome Mac #2643 is open, non-draft, `MERGEABLE/CLEAN`, with License
Compliance successful and no review or comment after the approved conflict
resolution. These authority states do not prefill August 28 GSC, Vercel,
release-download, or star evidence.

| Lane | Latest source-native state | Counts as authority? | Allowed next move |
| --- | --- | --- | --- |
| `awesome-selfhosted/awesome-selfhosted-data#2955` | Open, non-draft, `MERGEABLE/CLEAN`; `syntax-checks` passed; no review or comment; head remains `5db2d2953f342d0ea953f8bfe98dea3dc2e319ec` | no; this remains attempted distribution | wait for a maintainer merge, then verify the rendered upstream listing; do not message maintainers or push a no-op change |
| `DhanushNehru/awesome-mcp-servers#52` | Merged at `2026-08-24T10:01:32Z` as `47ea4cb2f509bb1b1b102b719a755d865f2f1ba3` after owner approval. Upstream `main` README line 90 and the rendered GitHub README show `Wenlan MCP` linked to `https://github.com/7xuanlu/wenlan`; `Origin MCP` is absent. The unrelated whole-repository `lychee` check remained failed while `hypersweep` passed. | yes; one accurate merged and publicly rendered authority source | record the authority gain and leave it stable; do not infer or attribute GSC, Vercel, downloads, or stars from the merge |
| `jaywcjlove/awesome-mac#2643` | Open, non-draft, `MERGEABLE/CLEAN`; License Compliance passes; no review or comment. Approved conflict resolution commit `59700ec37cecd909c697ee0f52253ea5cdf611ba` keeps exactly one Wenlan insertion in each required English, Chinese, Japanese, and Korean README. | no; this remains attempted distribution | wait for a maintainer merge, then verify the rendered upstream listing; do not message maintainers or push a no-op change |
| GitHub visitor-to-star path | The authenticated GitHub traffic window `2026-08-12..2026-08-25` reports 238 views, 41 unique viewers, and 63 Overview views from 27 unique viewers. The repository still has 51 stars; there is no viewer-to-star join. Full native-unit evidence is in `docs/seo-audits/2026-08-25-github-visitor-star-funnel.md`. | diagnostic only | treat qualified repo reach as the observed constraint; keep the optional star CTA on hold and prioritize inspectable authority/distribution |
| Website release accuracy | v0.16.0 correction merged in PR #134 and Vercel production completed on 2026-08-23 | technical correctness, not authority | keep stable; do not infer visitors, downloads, stars, or search lift from deployment |
| Wenlan source README to LLM Wiki guide | Merged in `7xuanlu/wenlan#599` at `2026-08-26T04:57:49Z` as `2f36e4203414edba2ef8dc20d21201d4f6fd8aba`. The exact four-file diff adds natural English, zh-TW, and zh-CN guide links and updates only the required Spanish sync marker. Translation checks, destination `200` checks, integrated CI, and rendered GitHub `main` verification passed. | yes; one inspectable first-party authority bridge after publication, but not rank or traffic proof | leave the bridge stable and observe the next source-native GSC/Vercel window; do not attribute impressions, clicks, visitors, downloads, or stars to this merge |

Awesome Mac conflict resolution completed under the user's exact approval.
Commit `59700ec37cecd909c697ee0f52253ea5cdf611ba` updates the existing
`codex/add-wenlan-ai-tools` branch and preserves only the four required README
insertions. GitHub now reports PR #2643 `MERGEABLE/CLEAN`; License Compliance
passes, the public file list contains only the four intended README files,
and no maintainer message was sent. This remains attempted distribution until
the upstream maintainer merges it and the rendered upstream READMEs expose
Wenlan.

## Decision rule

Choose at most one next production action:

1. Fix a factual or technical regression first, with separate approval and no
   growth attribution.
2. Otherwise, if exactly one existing owner passes every crawl, 20/3,
   cooldown, ownership, and concurrency gate, nominate one bounded refresh.
3. Otherwise, if a net-new or translated asset passes the full candidate gate
   and has a predeclared authority path, nominate one exact proposal.
4. Otherwise, if an authority candidate has a real actionable state, nominate
   that single authority action.
5. Otherwise record `WAIT — no qualified action`. Do not convert missing or
   sparse evidence into another title, article, translation, or internal-link
   task.

## 2026-08-28 decision record

- Selected action: PENDING
- Exact evidence that passed every required gate: PENDING
- Rejected alternatives and failing gates: PENDING
- Separate approval required: PENDING
- Next source-native read: PENDING
