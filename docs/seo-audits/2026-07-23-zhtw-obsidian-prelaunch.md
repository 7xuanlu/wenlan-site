# zh-TW Obsidian Acquisition Prelaunch — 2026-07-23

## Decision

Publish the already-complete Traditional Chinese article immediately:

- Candidate route:
  `/zh-TW/learn/wenlan-vs-obsidian-ai-memory`
- Source route:
  `/learn/wenlan-vs-obsidian-ai-memory`
- Status: locally ready, queued, unpublished, and not an active experiment
- Locale scope: zh-TW only
- Experiment ID:
  `EXP-2026-07-23-zhtw-obsidian-localization`
- Proposed asset class: `net-new-search`

The route is new, so it uses the `net-new-search` class even though its subject
and maintained source base come from an existing English page. This is not a
new English topic and it does not justify a zh-CN counterpart.

The user approved website push, merge, and deploy, then explicitly rejected
using the weekly reporting boundary as a reason to delay the verified page.

## Why this is ready

The candidate passed all five evidence gates in
`docs/seo-audits/2026-07-19-localized-acquisition-gap.md`:

1. Taiwan Google Trends observations preserve geography, period, capture date,
   raw request-relative `0–100` indices, and rising-query percentages.
2. Modifier-qualified Obsidian plus Claude workflows repeat across Trends,
   Reddit discussions, maintained OSS integrations, and Traditional Chinese
   guides.
3. The existing English page already receives GSC impressions, while the
   zh-TW Learn surface has a clean corresponding gap.
4. Wenlan can demonstrate the answer with maintained capture, recall, review,
   distill, handoff, MCP, source-ID, and readable-Markdown workflows.
5. The article remains useful as an Obsidian-versus-agent-memory role map even
   if the reader does not adopt Wenlan.

Local implementation and verification are complete. Per-locale availability
drives static params, locale switching, sitemap entries, and hreflang. The
zh-TW page exists locally; the unsupported zh-CN route remains a verified 404
and is not advertised as an alternate.

## Pre-launch baseline

All observations remain in their source-native units. They are not joined,
normalized, or treated as causal.

### Search Console

Authenticated `sc-domain:wenlan.app` range:
`2026-06-24..2026-07-21`.

| Surface | Clicks | Impressions | Average position |
| --- | ---: | ---: | ---: |
| Property total | 6 | 264 | 14.0 |
| Visible query rows | 0 | 64 | not used as a property total |
| Query visibility gap | 6 | 200 | not applicable |
| English Obsidian article | 0 | 4 | 4.5 |
| `/zh-TW` | 1 | 7 | 5.3 |
| `/zh-TW/learn/source-backed-wiki-pages-ai-work` | 0 | 1 | 49.0 |

The unpublished zh-TW candidate has no GSC page baseline. Absence from the
authenticated page table is not recorded as zero demand or zero impressions.

### Vercel Web Analytics

Authenticated range: `2026-06-24..2026-07-21`.

| Surface | Visitors | Pageviews |
| --- | ---: | ---: |
| Property total | 1,142 | 1,313 |
| `/zh-TW` | 6 | 7 |
| `/zh-TW/learn` | 1 | 1 |
| English Obsidian article | 3 | 3 |
| `/zh-TW/learn/distilled-wiki-pages-ai-memory` | 2 | 3 |
| `/zh-TW/learn/source-backed-wiki-pages-ai-work` | 1 | 1 |

Vercel custom events are Pro/Enterprise-gated. No authenticated Umami report
is available, so GitHub outbound and the fixed
`github_outbound / eligible acquisition-surface sessions` CTA are unavailable.
Separate referrer and page aggregates cannot establish source-to-page
sessions.

### GitHub

- GitHub total stars: 47.
- Gap to the frozen target: 53 stars.

Stars remain a separate repository observation. A later star change must not
be attributed to this article without reliable supporting evidence.

## Immutable experiment fields

These fields define the experiment-start record.

- **Experiment ID:** `EXP-2026-07-23-zhtw-obsidian-localization`
- **Data window:** `2026-07-18..2026-07-24`
- **Asset class:** `net-new-search`
- **Hypothesis:** Publishing the modifier-qualified zh-TW counterpart will
  create measurable Traditional Chinese search exposure and a useful path to
  GitHub without fabricating zh-CN coverage.
- **Candidate evidence:** The inspectable Trends, Reddit, OSS, Traditional
  Chinese, GSC, and current-site sources recorded in
  `docs/seo-audits/2026-07-19-localized-acquisition-gap.md`.
- **Baseline:** The native-unit GSC, Vercel, and GitHub observations above;
  Umami and GitHub outbound remain unavailable.
- **Change:** Publish only the prepared zh-TW route plus its required
  per-locale availability, static-param, sitemap, locale-switching, and
  hreflang support. The Learn-hub entry, contextual links from the two existing
  zh-TW wiki pages, visible maintained references, and GitHub CTA are part of
  the same bounded website change.
- **Publish date:** `not-published` until production completion is verified.
- **Index date:** `not-indexed` until confirmed by authenticated evidence.
- **Minimum exposure:** 5 GSC page impressions within the first 28 complete
  post-index days.
- **Success criteria:** After at least 5 GSC page impressions, the route earns
  at least 1 GSC click or average position is 20.0 or better. Report Vercel
  page visitors and GitHub stars separately without a causal claim.
- **Failure criteria:** After 28 complete post-index days and at least 5 GSC
  page impressions, the route has 0 clicks and average position is worse than
  20.0.
- **Inconclusive rule:** Fewer than 5 GSC page impressions after the evaluation
  period is inconclusive, not failure.
- **Stop criteria:** Hold or stop if an official source becomes invalid; a
  canonical, indexing, robots, noindex, redirect, structured-data, sitemap, or
  locale regression appears; the unsupported zh-CN route leaks into static
  params or hreflang; the weekly controller selects a stronger action; or
  required approval is not granted.
- **24h readout:** Verify live 200, canonical, indexability, sitemap and
  hreflang, zh-CN 404, production render, and separate Vercel/GitHub
  observations. Make no SEO-success judgment.
- **7d readout:** Report indexing latency, GSC page impressions/clicks/position
  when available, Vercel page visitors, and stars separately.
- **W2 readout:** Apply the minimum-exposure guard and inspect English, zh-TW,
  and zh-CN acquisition surfaces for regressions.
- **W4 readout:** Evaluate the predeclared success, failure, or inconclusive
  condition without changing its thresholds.
- **W8 readout:** Record a post-campaign follow-up only if it remains useful.

## Exposure lane

Production launch alone is a weak reach plan for a new zh-TW URL with a sparse
localized Learn surface. This campaign now uses only website SEO surfaces:

1. Link the new route from the localized Learn hub.
2. Add contextual related-article links from the existing zh-TW
   `distilled-wiki-pages-ai-memory` and
   `source-backed-wiki-pages-ai-work` pages.
3. Include only the canonical zh-TW URL in the sitemap and advertise only real
   locale alternates; keep the unsupported zh-CN route as a hard 404.
4. Preserve the article's standalone decision value: when Obsidian Markdown is
   enough, what Claude Code or MCP adds, and when reviewed cross-client memory
   becomes a separate need.
5. Do not post to Threads or Reddit, submit an OSS directory, buy traffic,
   request indexing, or submit GSC validation without another explicit
   approval.

These website surfaces can improve crawl discovery and reader navigation, but
they cannot establish causality for GSC impressions, Vercel visitors, GitHub
outbound, or stars.

## Immediate launch

- Append the immutable experiment-start record.
- Mark draft PR #58 ready and merge it.
- Verify production deployment, canonical, indexability, sitemap/hreflang,
  unsupported zh-CN 404, and rendered desktop/mobile output.
- Do not add a Threads or other owned-social action to this SEO-only campaign.

## Remaining manual or account-gated evidence

- Complete GSC Pages indexing counts and exclusion-reason counts.
- Confirmed index date for the new route after publication.
- Authenticated Umami outbound and UTM observations.
- Vercel custom-event access and a reliable acquisition-session denominator.
- Any source-to-page-to-GitHub join.
- Production completion timestamp and confirmed index date.
