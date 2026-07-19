# Wenlan Exposure-First Search Growth System

**Date:** 2026-07-18

**Status:** Three-lane reviewed proposal for user approval

**Canonical site:** `https://wenlan.app`

**Legacy bridge hosts:** `https://useorigin.app`, `https://www.useorigin.app`

## Decision

Wenlan's first 90-day growth objective is:

1. earn qualified exposure,
2. turn that exposure into website traffic and GitHub stars,
3. let setup starts grow as a slower, lagging outcome.

Setup starts are not the primary optimization target in this phase.

The website should not return to a content-volume strategy. It should run a
bounded discovery-and-experiment loop that can publish a net-new search asset
before GSC has high volume, but only when outside evidence identifies a real
problem, current Wenlan coverage has a clean gap, and Wenlan can support the
answer with a maintained product workflow or source.

GSC remains the authority for Google Search performance. Reddit, GitHub, OSS
documentation, and SERP observations may nominate experiments; they must never
be inserted into the authenticated GSC input contract or presented as search
volume.

## Current Baseline

The baseline is low-volume and should be treated as a starting point, not a
forecast.

| Surface | 28-day or current baseline | Interpretation |
| --- | ---: | --- |
| GSC property | 6 clicks, 190 impressions, 3.16% CTR, position 15.6 | Search demand exists, but visible query rows are sparse. |
| Vercel Web Analytics | 323 visitors, 374 pageviews | Useful exposure baseline; direct traffic dominates and custom CTA events are plan-gated. |
| Umami Cloud | Production tracker is live; exports/API evidence was not available to this run | A privacy-oriented event and UTM path already exists, but its usable reporting access must be verified. |
| Search referrals in Vercel | Google 131 visitors; Bing 4; DuckDuckGo 2 | Search is already a meaningful acquisition source, but source-level conversion is missing. |
| AI referrals in Vercel | 1 ChatGPT visit | Too small to infer a trend. |
| Reddit referrals in Vercel | 0 | No measured Reddit distribution result yet. |
| GitHub | 47 total stars; 4 stars in the last 28 days | The repository had an initial launch burst and now needs sustained discovery. |
| Setup starts | Not reliably measured | Lagging observation only; do not invent a proxy and label it as setup. |

The GitHub history shows 3 stars in April 2026, 32 in May, and 12 in June.
This proves that a 12-star month has already happened, but it does not prove
which channel caused it.

The current analytics design is not a blank slate:

- `root-document.tsx` enables Vercel Web Analytics on Vercel and conditionally
  loads Umami;
- the deployed homepage currently loads the Umami Cloud tracker;
- `tracked-link.tsx` already defines Vercel events for GitHub, Get Started,
  Learn article, and setup-path clicks;
- there is no current install-command copy control, so no copy event should be
  designed until that user-visible interaction exists.

## Goals and Non-Goals

### Goals

- Grow non-brand search and community discovery for the real problems Wenlan
  solves.
- Increase qualified visits to Wenlan's Learn, Docs, About, and GitHub
  surfaces.
- Restore a sustained GitHub star rate rather than relying on a launch spike.
- Learn which problem, integration, diagnostic, comparison, and workflow
  formats earn attention.
- Keep English and Mandarin acquisition surfaces deliberate and measurable.
- Preserve the current deterministic Searchfit/GSC weekly pipeline.

### Non-Goals

- A fixed blog quota.
- Programmatic comparison or integration pages without maintained evidence.
- Treating impressions, outbound clicks, stars, and setup starts as equivalent.
- Claiming that a star was caused by a specific website visit.
- Adding Google Ads, remarketing, Google Signals, User-ID, or cross-site
  profiling.
- Posting to Reddit, submitting directories, deploying, or requesting indexing
  without explicit approval.

## Measurement Model

Do not collapse the growth system into one composite score. Report the stages
separately so a traffic increase cannot hide a lack of project interest.

| Stage | Primary measure | Source of truth | What it proves |
| --- | --- | --- | --- |
| Search exposure | Impressions, indexed pages, query/page position | GSC | Wenlan is appearing in Google Search. |
| Qualified traffic | Qualified-source visitors and acquisition-surface visitors, reported separately | Vercel and Umami | Relevant sources and pages are growing, without pretending the current Vercel export provides their intersection. |
| Project interest | Net new stars and rolling star rate | GitHub REST API | More GitHub users expressed public interest. |
| Site-to-repo interest | GitHub outbound clicks by page and placement | Umami; optionally paid Vercel custom events | A Wenlan page sent a visitor to GitHub. |
| Setup interest | Get Started and setup-path interactions | Umami; optionally paid Vercel custom events | A visitor showed setup intent, not that setup succeeded. |
| Setup success | Verified install/connect success | Product-side opt-in telemetry or explicit user research | A setup actually worked. This is outside the website analytics scope. |

### Qualified Traffic

The current Vercel export provides separate page and referrer aggregates, not a
source-by-landing-page session table. Report three literal measures:

- `qualified-source visitors`: visitors attributed to organic search, an AI
  assistant, a relevant community or OSS directory, a release/integration
  reference, or a tagged approved distribution experiment;
- `acquisition-surface visitors`: visitors to the homepage, About, Learn, and
  Docs;
- `source-to-page sessions`: only when an authenticated Umami report can
  produce that joint view.

Direct traffic is reported separately because it mixes bookmarks, untagged
links, privacy loss, and unknown sources.

Preview deployments, local checks, known team traffic when identifiable, and
obvious bots must be excluded where the source permits. When they cannot be
excluded, label the number as raw.

### 90-Day Working Thresholds

These are decision thresholds, not forecasts. Rebaseline traffic and star
thresholds after the first 30 days if instrumentation reveals contamination or
a one-time launch effect.

- By day 30: one approved distribution experiment has used an existing indexed
  page and recorded its 24-hour and 7-day exposure/referral result; one content
  candidate has also passed or failed the candidate gate.
- By day 60: at least one content or hub experiment has reached W2 or W4, and no
  more than two experiments remain active.
- By day 90:
  - GSC reaches at least 18 clicks and 570 impressions in a rolling 28-day
    window;
  - at least three non-brand problem clusters earn clicks;
  - the rolling 28-day GitHub star rate reaches at least 12, restoring the
    already-demonstrated June pace;
  - qualified-source visitors and acquisition-surface visitors each grow in
    two consecutive comparable windows.

Setup starts remain a reported secondary signal and do not gate this phase.

## System Architecture

```text
Authenticated GSC ────────────────> weekly SEO report ──> refresh queue
                                                │
Reddit / OSS / SERP / GitHub ─> candidate log ─>│ coverage + proof gate
                                                │
                                                └─> approved experiment
                                                        │
                                                        ├─> existing-page refresh
                                                        ├─> integration/workflow guide
                                                        ├─> runnable recipe
                                                        ├─> diagnostic
                                                        ├─> honest comparison
                                                        └─> net-new search article
                                                                  │
                               Vercel / Umami / GSC / GitHub <────┘
                                                │
                                                └─> scale / refresh / merge / stop / localize
```

The authenticated GSC path and the external discovery path remain separate.
They meet only at the human-approved experiment gate.

## Demand Discovery Contract

Each external demand observation is stored as a
`DemandDiscoveryCandidate`. Raw exports and large source captures stay outside
git under `/tmp/wenlan-seo-demand`, physically separate from authenticated
weekly inputs under `/tmp/wenlan-seo`. The committed record contains only
interpreted, redacted evidence.

Required fields:

- immutable candidate ID,
- captured timestamp,
- source kind and source name,
- public source URL or source query,
- language and geography when known,
- observation period,
- raw metric and unit when a source provides one,
- the exact problem language in a short compliant excerpt or paraphrase,
- normalized problem cluster and intent,
- independent corroborating sources,
- current Wenlan coverage and matched slugs,
- a proposed asset format,
- a maintained Wenlan proof source,
- status: `discovery-only`, `approved`, `rejected`, or `converted`.

External numbers retain their original unit. A Reddit post view, GitHub star,
Google Trends index, and GSC impression are never normalized into fake keyword
volume.

### Candidate Gate

A candidate may become an experiment only when all are true:

1. the source is inspectable and provenance is recorded;
2. the problem is repeated, independently corroborated, or unusually
   high-intent;
3. no current Wenlan page answers the intent cleanly;
4. Wenlan can prove its answer with a real workflow, command, test, release, or
   maintained first-party source;
5. the proposed asset has standalone utility without requiring a product pitch.

An existing page that partly covers the intent is refreshed before a new URL is
created unless the search intent and user job are materially different.

## Content Experiment Contract

Each approved experiment records:

- candidate reference,
- one-sentence hypothesis,
- asset type,
- target locale and slug,
- one-page scope,
- exact audience and problem,
- maintained evidence sources,
- required internal links,
- baseline GSC, analytics, and GitHub snapshot,
- publish and index dates,
- W2, W4, and W8 review dates,
- experiment state: `approved`, `live`, `measuring`, `extended`,
  `inconclusive`, or `decided`,
- success, failure, and stop criteria,
- terminal decision: `scale`, `refresh`, `merge`, `stop`, `localize`, or one
  bounded `extend`.

The experiment ledger is a separate dated file under `docs/seo-audits/`.
The generated weekly SEO report is not overloaded with external evidence and
does not become the durable experiment store.

### Cadence

- Maximum one net-new search asset every 14 days.
- Maximum two active experiments through W8, including an extended experiment.
- Each experiment declares a positive minimum-exposure threshold and unit at
  approval time. Metrics below that threshold cannot support a success or
  failure verdict.
- W2: verify crawl, indexing, canonical, internal links, and early referrals.
- W4: evaluate source-specific exposure, acquisition-surface visitors, GitHub
  outbound interest, and qualitative community response.
- W8: scale, refresh, merge, or stop only when minimum exposure was reached.
  Otherwise mark it inconclusive and allow one extension of at most four weeks.
- `merge` preserves the public URL with a relevant redirect; `stop` ends the
  experiment but leaves an accurate indexed page intact. Neither silently
  deletes an indexed URL.

Low GSC volume does not block all learning. It changes the rule from "write
nothing" to "run one well-sourced experiment and measure it."

## Acquisition Asset Strategy

Prefer asset formats in this order:

1. refresh a page that already has impressions;
2. strengthen an integration or workflow hub;
3. publish a complete setup or integration guide with a verification step;
4. publish a runnable workflow recipe;
5. publish a diagnostic for a repeated failure mode;
6. publish an honest comparison or boundary page;
7. publish a new concept article only when the above formats do not fit.

Every setup or workflow guide should contain:

- prerequisites,
- exact setup seam,
- a real command or configuration,
- an observable success check,
- a recovery path,
- one alternate path and one next step,
- the Wenlan and client versions used for verification.

### Initial Experiment Backlog

The backlog is ordered, but publication still requires the candidate gate.

1. **Integration/workflow hub refresh:** reorganize `/learn` around first setup,
   one-client daily work, cross-client continuity, diagnostics, and trust. This
   uses existing Claude Code, Codex, Cursor, Claude Desktop, Gemini CLI, and VS
   Code pages before adding more leaves.
2. **Net-new boundary experiment:** an English page on persistent AI work
   memory versus codebase retrieval or repo maps. The page should answer the
   repeated large-codebase context problem while clearly stating what Wenlan
   does and does not replace.
3. **Stale-memory diagnostic refresh:** strengthen
   `/learn/review-before-trust-ai-memory` rather than creating a duplicate page.
   Show provenance, review, correction, and scoped retrieval as an inspectable
   workflow.
4. **Release-linked recipe:** when a real client integration or workflow
   changes, update its guide and release note together and add a tested
   "verified with version X" statement.

Do not publish the boundary experiment until current Wenlan behavior and the
compared code-retrieval mechanism have first-party sources.

## English and Mandarin

English is the first experiment surface because it has the current article
inventory and the external evidence collected so far.

Mandarin remains first-class, but translation is a scale decision:

- report English, Traditional Chinese, and Simplified Chinese page/referrer
  baselines separately;
- review Mandarin-specific demand candidates at least every four weeks even
  when none qualifies for publication;
- localize when Mandarin-specific evidence exists or an English experiment has
  passed W4/W8;
- translate the complete workflow, not only the title and metadata;
- verify terminology, route allow-lists, hreflang, canonical, sitemap, and
  reciprocal links;
- do not multiply low-evidence comparison pages across locales.

The first Mandarin candidates should be stable setup, privacy, workflow, and
source-backed wiki pages rather than rapidly changing comparisons.

## Distribution Design

Reddit is a demand and trust surface, not a backlink factory.

- Answer the problem completely in the post or comment.
- Disclose affiliation when Wenlan is relevant.
- Use each community's approved promotion lane.
- Do not seed questions, manufacture case studies, or hide a product reveal in
  the comments.
- Link only when the Wenlan page materially extends the answer.
- Record the post, source, landing page, 24-hour response, 7-day qualified
  visits, and any new demand language.

OSS distribution should prioritize:

- maintained integration directories,
- curated OSS lists with explicit inclusion criteria,
- release notes linked to the affected guide,
- runnable examples and diagnostic artifacts,
- partner or ecosystem pages only when the integration is real.

All posts, submissions, and external messages remain approval-gated.

## Analytics Decision

### Recommendation

Do not add GA4 in this growth phase.

Keep Vercel Web Analytics as the authenticated aggregate page/referrer
baseline. Use the already deployed Umami tracker as the single custom-event and
UTM layer, subject to verifying dashboard/export access. Keep GSC and GitHub as
their own sources of truth.

This is not an anti-Google rule. It is a sequencing decision:

- Vercel already provides the weekly exposure baseline;
- Umami is already deployed and supports custom events, outbound events, and
  UTM analysis without adding a third tracker;
- GA4 would duplicate current collection, add consent and disclosure work, and
  still would not measure stars;
- the first exposure experiment can use an existing indexed page and must not
  wait for new analytics or new content.

### Vercel versus GA4

| Capability | Vercel Web Analytics | GA4 | Wenlan decision |
| --- | --- | --- | --- |
| Pageviews, visitors, pages, referrers | Built-in and already in the weekly pipeline | Available | Keep Vercel for the stable aggregate baseline. |
| Identity model | Aggregated, anonymized, no cookies | Event/session model; first-party identifiers when analytics storage is granted | Do not add the higher-consent model without a specific unanswered question. |
| Custom events on Wenlan's current plan | Reporting is account-gated | Available | Use the already deployed Umami tracker instead of adding GA4. |
| UTM campaign reporting on Wenlan's current plan | Account-gated | Available | Use Umami UTM reporting for approved distribution experiments. |
| Outbound GitHub clicks | Existing Vercel event code is account-gated | Enhanced measurement or custom events | Send one provider-neutral custom event to Umami. |
| Funnels, paths, key-event attribution | Limited | Stronger | Not necessary for the exposure-first phase. |
| GitHub stars | No | No | Use a deterministic GitHub snapshot. |
| Google Search query/indexing data | No | No | Use GSC. |
| Privacy and consent overhead | Lower | Higher | Preserve the lower-overhead stack while traffic is small. |

Vercel, Umami, GSC, and GitHub totals use different definitions and will not
match. Report each source separately; never "fix" the difference by choosing
the larger number.

### Existing Umami Role

The production site already loads Umami Cloud. Official Umami documentation
describes cookie-free page/referrer analytics, custom events, outbound event
tracking, and UTM insights. The design should use that existing path before
adding another tracker.

Phase one must verify:

- account/dashboard access;
- whether same-range CSV export or API access is available;
- whether UTM and event reports are accessible on the current account;
- that tracking runs only on `wenlan.app`, excludes search parameters, and
  respects Do Not Track;
- that no session identification or personal event data is enabled.

If exports or API access remain paid/account-gated, the weekly automation keeps
those fields manual. That does not block a manually reviewed distribution
experiment.

### Provider-Neutral Event Contract

Refactor the existing `TrackedLink` seam so custom interactions have one
provider-neutral contract and one active custom-event sink. Vercel pageview
analytics remains enabled; custom events go to Umami when it is configured.

Map the existing event meanings:

| Existing event | Normalized event |
| --- | --- |
| `GitHub Click` | `github_outbound` |
| `Get Started Click` | `get_started_click` |
| `Learn Article Click` | `learn_article_click` |
| `Setup Path Click` | `setup_path_click` |

Allowed properties are `content_slug`, `placement`, `locale`, `context`, and a
fixed destination category. Do not add `setup_command_copy` until a real copy
control exists.

`github_outbound` is not a star. `get_started_click` and `setup_path_click` are
not successful setups.

Never send:

- email addresses or names,
- project or space names,
- captured memory text,
- code, command contents, user paths, or search/query contents,
- full URL query strings,
- a stable cross-session account identifier.

### GA4 Adoption Gate

Reconsider GA4 only when an approved acquisition question cannot be answered
by GSC, Vercel, Umami UTM/events, and GitHub snapshots—for example, a future
cross-channel attribution program with enough traffic to act on.

Adding GA4 later requires a new explicit approval and must replace, not join,
the custom-event sink. The design review for that change must:

- choose one consent mode;
- default to basic global opt-in, where the GA tag does not load or send pings
  before consent;
- specify pre-load ordering, withdrawal, and translated consent UI;
- add a separate public website-analytics disclosure;
- disable automatic outbound events if custom outbound events are sent;
- remove query strings from page locations and allow-list any UTM fields;
- keep Google Ads, Google Signals, advertising personalization, User-ID, and
  Google Tag Manager out of scope.

## Data and Pipeline Boundaries

Phase one adds a separate, deterministic command such as
`pnpm seo:demand:review`. It:

- reads local candidate fixtures or exports,
- validates the discovery and experiment contracts,
- maps candidates to current Learn/Docs coverage,
- produces an advisory report,
- performs no network fetch,
- publishes nothing,
- does not mutate GSC CSVs, GSC metadata, or the weekly report.

Phase one also adds a read-only `pnpm seo:github:snapshot` command. It records:

- repository and fetched-at provenance,
- total `stargazers_count`,
- delta from the previous comparable snapshot,
- enumerated `starred_at` events when the endpoint exposes them,
- the difference between the total count and visible timestamp rows,
- API/rate-limit failure without overwriting the last good snapshot.

The snapshot never persists stargazer usernames. Total-star delta and visible
timestamp events remain separate measures.

The existing authenticated weekly pipeline remains strict:

1. authenticated GSC data when available,
2. deterministic weekly report,
3. deployed and built technical SEO checks,
4. evidence-backed refreshes,
5. a separately approved content experiment when the candidate gate passes.

## Failure and Uncertainty Handling

- Missing GSC data: state that it is unavailable, run the sample pipeline only
  as a health check, and run technical checks. External candidates remain
  discovery-only until approved.
- Sparse GSC data: allow one external-evidence experiment; do not infer keyword
  volume.
- Missing analytics credentials or plan access: mark fields manual or
  account-gated.
- Missing Umami reporting access: retain Vercel's separate referrer and page
  aggregates; do not invent a source-by-page session count.
- Analytics disagreement: keep source-specific numbers and document the
  definition difference.
- GitHub API or rate-limit failure: retain the last good snapshot, mark the
  current window missing, and do not infer star timing.
- Star timing overlap: report correlation only. Do not claim a post or page
  produced a star without an explicit attributable mechanism.
- Candidate lacks first-party proof: reject or defer it even if the phrase is
  popular.
- Experiment remains below its minimum exposure at W8: mark it inconclusive
  and use its one bounded extension. If it is still inconclusive after that,
  stop iterating or merge it into a stronger page rather than publishing an
  adjacent article.

## Implementation Phases

### Phase 0 — Approve and Baseline

- approve this design and the exposure-first outcome;
- record the current GSC, Vercel, and GitHub baseline;
- define the cleaned qualified-traffic view;
- verify current Umami dashboard/export access.

### Phase 1 — Discovery and Experiment Ledger

- add the discovery/experiment schema and fixture-backed validator;
- add `seo:demand:review`;
- add the read-only GitHub snapshot command and fixtures;
- add a dated demand-discovery report template;
- update `docs/seo-growth-loop.md`, `docs/seo-measurement.md`,
  `docs/search-console-umami.md`, and `docs/reddit-distribution.md` without
  weakening GSC provenance.

### Phase 2 — Existing-Asset Exposure Pilot

- choose one existing indexed page with demonstrated traffic;
- prepare one value-first, community-compliant distribution experiment;
- obtain explicit approval before posting;
- use an allow-listed UTM link when the community permits it;
- record 24-hour and 7-day source-specific results;
- do not wait for GA4 or net-new content.

### Phase 3 — First Content Experiment

- refactor `TrackedLink` to one provider-neutral custom-event sink;
- harden the existing Umami configuration and public website disclosure;
- refresh the Learn integration/workflow hub;
- validate and publish at most one English boundary experiment;
- add source-backed references and 2–4 next-operation internal links;
- run SEO, i18n, build, built technical, and rendered checks.

### Phase 4 — Scale Measured Distribution

- prepare value-first Reddit or OSS submissions for the measured asset;
- obtain explicit approval before posting;
- record source, landing page, and measurement window.

### Phase 5 — Decide and Localize

- run W2/W4/W8 decisions;
- scale, refresh, merge, or stop;
- localize only an established winner or a separately proven Mandarin need.

## Verification

The implementation plan must include:

- positive and negative fixtures for discovery provenance and coverage mapping;
- tests proving external demand data cannot enter the authenticated GSC input
  contract, including before/after hashes of the GSC inputs;
- overwrite guards for reviewed experiment ledgers;
- tests for experiment state transitions and maximum active experiments;
- tests for the minimum-exposure guard and one-time extension;
- fixtures for GitHub pagination, timestamp visibility gaps, and rate limits;
- tests that GA4 remains absent;
- tests that exactly one custom-event provider is active;
- tests that analytics parameters cannot contain prohibited data;
- existing `pnpm test:seo`;
- `pnpm lint` for TypeScript changes;
- `pnpm build`;
- `pnpm seo:technical:built`;
- rendered verification for any copy, consent, or UI change;
- `pnpm seo:technical:deployed` only after an approved deployment;
- manual GSC, Umami, Vercel, and GitHub evidence recorded without forcing the
  numbers to match.

## Three-Lane Review Resolution

The primary design, Fable review, and independent GPT review agreed on:

- exposure, qualified traffic, and stars must lead;
- setup starts must remain lagging;
- GSC and external demand evidence must stay physically and semantically
  separate;
- content volume is not the growth strategy;
- stars need a deterministic source rather than website attribution;
- the initial GA4 recommendation was premature.

Changes accepted from the independent reviews:

- defer GA4 and use the already deployed Umami path;
- inventory and normalize the existing `TrackedLink` events;
- run an approved exposure experiment with an existing indexed page before
  waiting for a new page;
- split source visitors from acquisition-surface visitors;
- add a deterministic GitHub star snapshot;
- isolate demand inputs under `/tmp/wenlan-seo-demand`;
- cap all experiments through W8, add a minimum-exposure guard, and permit one
  bounded inconclusive extension;
- preserve public URLs when merging or stopping;
- add locale-sliced baselines and candidate review for Mandarin.

The reviews did not change the candidate gate, evidence-first asset formats,
English-first experiment order, or approval gates for deployment and external
posting.

## Evidence Used

The design draws on:

- the 2026-07-17 authenticated Wenlan GSC and Vercel weekly report;
- public GitHub repository and stargazer timestamps;
- Reddit moderator rules and developer pain discussions, including
  [r/SEO's anti-spam discussion](https://www.reddit.com/r/SEO/comments/1jbba9t/when_did_it_start_getting_spammy/),
  [r/selfhosted's project megathread rules](https://www.reddit.com/r/selfhosted/comments/1tqhzoo/new_project_megathread_week_of_28_may_2026/),
  and a
  [Claude Code context-retrieval question](https://www.reddit.com/r/ClaudeAI/comments/1qushxa/any_context_retrieval_mcps_for_claude_code/);
- maintained OSS acquisition structures from
  [Langfuse integrations](https://langfuse.com/integrations),
  [Supabase examples](https://github.com/supabase/supabase/tree/master/examples),
  [Mem0's quickstart template](https://docs.mem0.ai/templates/quickstart_template),
  [Cal.com workflows](https://cal.com/workflows), and
  [Sentry integration releases](https://sentry.io/changelog/perforce-integration-ga/);
- official
  [Vercel Web Analytics](https://vercel.com/docs/analytics),
  [Vercel analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing),
  [Umami tracker functions](https://docs.umami.is/docs/tracker-functions),
  [Umami UTM reporting](https://docs.umami.is/docs/utm),
  [GA4 outbound click](https://support.google.com/analytics/answer/13566436),
  [GA4 data collection](https://support.google.com/analytics/answer/11593727),
  and
  [GA4 consent](https://support.google.com/analytics/answer/12329599)
  documentation.
