# Vercel Google-referrer traffic-quality audit

Captured on 2026-08-01 PDT. This is a measurement-quality audit, not an SEO
experiment and not a replacement for the protected Goal metrics.

## Question

Can the authenticated Vercel `google.com` referrer total for
`2026-07-03..2026-07-30` be treated as qualified Google Search traffic, and
can any suspicious subset be separated without silently changing the raw
visitor metric?

## Evidence contract

- GSC remains the authority for Google Search clicks and impressions.
- Vercel raw visitors remain the Goal visitor metric.
- A Vercel cohort may be labelled `suspected automated` only as a diagnostic.
  It is not labelled a bot or removed from raw totals without stronger event-
  level evidence and explicit approval for any metric-definition change.
- The complement of a suspicious cohort is `not matched by this signature`,
  not `human`.
- All values remain in their source-native units. No source-to-page session or
  causal join is inferred.

## Authenticated same-range observations

Search Console was queried read-only for every supported search result type at
`2026-08-02T05:58:13Z`. The API uses `type`; the older `searchType` field is
deprecated. Web, Image, Video, and News used `byProperty`; Discover and Google
News used their supported automatic/page aggregation.

| GSC result type | Clicks | Impressions | Aggregation |
| --- | ---: | ---: | --- |
| Web | 10 | 706 | `byProperty` |
| Image | 0 | 23 | `byProperty` |
| Video | 0 | 0 | `byProperty` |
| News tab | 0 | 5 | `byProperty` |
| Discover | 0 | 0 | `byPage` |
| Google News | 0 | 0 | `byPage` |

The 706 Web impressions are a later same-range API backfill. They do not
silently replace the earlier weekly export's 660 impressions; the next normal
weekly run should capture the authoritative rolling window again.

The Vercel Web Analytics public API was queried read-only over the exact same
UTC boundaries. Vercel visitor hashes reset daily; summing the 28 daily rows
reconciles exactly to each whole-range total.

| Vercel cohort | Exact filter | Visitors | Pageviews |
| --- | --- | ---: | ---: |
| Raw | none | 1,468 | 1,745 |
| Google referrer | `referrerHostname eq 'google.com'` | 1,148 | 1,267 |
| Exact suspicious signature | Google referrer AND `browserName eq 'Chrome'` AND `osName eq 'GNU/Linux'` AND `deviceType eq 'desktop'` | 1,132 | 1,251 |
| Google to configuration page | Google referrer AND `requestPath eq '/docs/configuration'` | 774 | 850 |
| Not matched by the exact signature | raw minus the exact subset | 336 | 494 |

The exact signature accounts for 98.6% of the Google-referrer visitors and
77.1% of all raw visitors. These ratios describe this fixed window only.

## Time-shape check

| UTC interval | Raw visitors | Google-referrer visitors | Exact-signature visitors | GSC Web clicks |
| --- | ---: | ---: | ---: | ---: |
| 2026-07-03..2026-07-14 | 203 | 23 | 13 | 6 |
| 2026-07-15..2026-07-23 | 1,199 | 1,111 | 1,109 | 1 |
| 2026-07-24..2026-07-30 | 66 | 14 | 10 | 3 |

The nine-day middle interval contains 1,109 of the signature's 1,132 visitors
(98.0%). Daily signature visitors rose from 13 across the preceding twelve
days to 38, 69, 13, 268, 201, 167, 110, 124, and 119, then fell to zero on
2026-07-24. The same nine-day interval has one finalized GSC Web click. This
time shape is incompatible with interpreting the whole signature as Google
Search clicks, but aggregate data still cannot establish the identity of each
visitor.

## Hostname and environment boundary

- Public API checks showed `production` equals the whole-range project total
  and `preview` is zero for this window.
- The public Web Analytics API does not expose `hostname` as an accepted OData
  filter.
- The authenticated Vercel dashboard was therefore checked directly with
  Production selected. Its broader Last 30 Days Hostnames view, which contains
  the exact audit interval, reported `wenlan.app` as 100% of 1.5K visitors and
  1.8K pageviews. The anomalous cohort is not explained by another production
  hostname in the project.

## Decision

The following split is supported for diagnostics:

1. `raw`: 1,468 visitors. This remains the protected Goal metric.
2. `suspected automated/referrer-incompatible`: 1,132 visitors matching the
   exact signature. Preserve the filter and window whenever this label is
   used.
3. `not matched by exact signature`: 336 visitors. Do not call this human or
   qualified traffic.

Do not hard-exclude the signature from Goal visitors or silently redefine the
existing qualified-source metric. Event-level Web Analytics Drains or request
logs could provide stronger classification evidence, but Vercel documents
Drains as Pro/Enterprise-only. The current Hobby-plan aggregate API can prove
the cohort shape and contradiction with Search Console, not the identity of
every visit.

For future complete windows, repeat the exact three-way observation: raw
totals, the preserved signature, and its non-matching complement. Keep GSC
search-result types separate. A new pattern must receive a new explicit
signature rather than widening this one after seeing the result.
