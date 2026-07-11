# SEO Optimization Pipeline Review - 2026-07-10

## Outcome

- Automation `weekly-origin-seo-cleanup` now uses `gpt-5.6-sol` with `high` reasoning.
- The deterministic fixture pipeline, SEO contract suite, and deployed technical checker pass.
- The review found three false-success paths and two narrower coverage gaps; all five were fixed locally after review.
- A follow-up GSC aggregation fix now reports property totals separately from visible query/page rows instead of mislabeling the visible query sum as the property total.

## Resolution

- Both public weekly scripts now use the metadata-gated pipeline. Normal runs require metadata for `sc-domain:wenlan.app`, an accepted GSC source label, and the expected 28-complete-day range; the explicit manual-range override does not weaken date validation.
- Fixture bypass is bound to the `pnpm seo:weekly:sample` lifecycle and committed fixture directory. Metadata remains a local provenance declaration rather than cryptographic proof, so operators must still obtain exports from authenticated GSC.
- Metadata JSON fills evidence fields when populated CSV rows do not carry row-level date/source columns. Conflicting row-level metadata, source labels, and declared query/page row counts are rejected.
- Deployed key pages must return a direct 200. Sitemap XML and HTML bodies are bounded while streaming, with an eight-request concurrency bound, a 500-URL sitemap ceiling, and a 1 MB response ceiling.
- Sitemap scans reject cross-origin and network-path targets before fetching them.
- Built and deployed noindex contracts now include `/humans.txt` and `/manifest.webmanifest`.
- The GSC fetcher explicitly requests `byProperty` query aggregation plus a separate no-dimension `byProperty` total. Metadata preserves empty CTR/position as unavailable, rejects contradictory property metrics, and records the visible-query gap caused by anonymized or truncated rows.
- The 2026-07-10 real-input report now reconciles 3 property clicks / 67 property impressions, 0 visible-query clicks / 13 visible-query impressions, and 3 visible-page clicks / 121 visible-page impressions.

## Findings

### Resolved P1 - Weekly reports did not require provenance or a current evidence range

`scripts/seo-weekly-pipeline.mjs:82-97` requires only readable query and page CSVs; `gsc-metadata.json` is optional. `scripts/seo-weekly.mjs:264-283` fills missing evidence with `Last 28 days` and `CSV export`, then states that the report came from Google Search Console.

This is observable in the committed health-check fixture: `pnpm seo:weekly:sample` succeeds with metadata-free synthetic CSVs and emits `Generated from Google Search Console CSV exports`. The pipeline also does not compare an evidence range with the requested report date. A stale or synthetic input can therefore look like a current GSC-backed weekly report.

Recommended gate: keep the sample command explicitly fixture-only, but require `gsc-metadata.json`, `siteUrl`, `startDate`, `endDate`, and source for normal `seo:weekly:run`; verify that the range is the expected 28 complete days for `--date`, unless an explicit manual-range flag is supplied.

### Resolved P1 - The GSC property identity was written but never enforced

`scripts/seo-gsc-fetch.mjs:291-301` writes `siteUrl` into metadata. `scripts/seo-weekly.mjs:234-285` reads only date range and source, so `siteUrl` is ignored.

Negative runtime check: the current real Wenlan CSVs were paired with metadata changed only to `sc-domain:example.com`. The generator exited 0 and wrote `/tmp/wenlan-seo-review-wrong-property.md` as a normal Search Console API report with 13 impressions.

Recommended gate: reject metadata unless `siteUrl === "sc-domain:wenlan.app"`, and cover the wrong-property case with a failing pipeline test.

### Resolved P1 - Deployed key-page checks accepted redirecting URLs

`scripts/seo-deployed-technical-check.mjs:216-225` follows redirects by default. `scripts/seo-deployed-technical-check.mjs:387-418` checks only the final response and does not assert that each requested key URL itself returned 200 without redirecting.

The weekly requirement is to audit key 200 URLs. A key route can currently redirect to another page with valid canonical, robots, and schema markup and still produce `key pages ok`.

Recommended gate: request required HTML pages with `redirect: "manual"`, require status 200, then inspect that response body.

### Resolved P2 - Two configured noindex utility routes were outside both checkers

`next.config.ts:26-35` configures `X-Robots-Tag` for `/humans.txt` and `/manifest.webmanifest`. They are absent from `REQUIRED_NOINDEX_HEADERS` in `scripts/seo-built-technical-check.mjs:89-95` and from `UTILITY_NOINDEX_PATHS` in `scripts/seo-deployed-technical-check.mjs:140-145`.

Recommended gate: add both paths to the built and deployed contracts, with regression fixtures.

### Resolved P2 - Deployed FAQPage detection covered only the fixed key-page list

`scripts/seo-built-technical-check.mjs:616-625` scans every built HTML file for `FAQPage`. The deployed checker only scans `REQUIRED_HTML_PAGES` in `scripts/seo-deployed-technical-check.mjs:387-418`.

A production drift on an unlisted article can pass the deployed weekly check. The local build gate catches this only when the automation builds the same revision that is deployed.

Recommended gate: derive deployed HTML targets from the sitemap and scan each same-origin HTML URL, with a bounded concurrency limit.

## Deliberate Non-Finding

`scripts/indexnow-ping.mjs:95-104` keeps IndexNow failures non-blocking. This is appropriate for an optional post-deploy freshness signal and should not fail an otherwise valid site build. Keep the warning visible in deployment logs; do not elevate it to a correctness gate.

The global 404 check is also not raised as a current defect: `src/app/global-not-found.tsx:23-30` explicitly emits noindex metadata. Deployed 404 coverage remains a lower-priority hardening opportunity.

## Verification

- `pnpm seo:weekly:sample` - passed and wrote `/tmp/wenlan-weekly-seo-sample.md`.
- `WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan WENLAN_APP_REPO_ROOT=/Users/lucian/Repos/wenlan-app pnpm test:seo` - passed 145/145.
- `pnpm lint` - passed.
- `NEXT_TELEMETRY_DISABLED=1 pnpm build` - passed and generated 208 static pages.
- `pnpm seo:technical:built` - passed: 7 noindex headers, 106 sitemap URLs, 13 required HTML pages, and 112 HTML files without `FAQPage`.
- `pnpm seo:technical:deployed -- --require-direct-changed-redirects true` - passed: 106 sitemap URLs, 13 direct-200 key pages, 6 utility noindex paths, sitemap-wide `FAQPage` scan at peak concurrency 8, 25 redirects, 6 bridge redirects, and 18 direct changed redirects.
- Real-input CLI happy path - `pnpm seo:gsc:fetch -- --date 2026-07-10` and `pnpm seo:weekly:run -- --date 2026-07-10` reproduced the 3/67 property aggregate and wrote the corrected weekly report from Search Console API evidence for 2026-06-12 through 2026-07-09.
- Real-input CLI stale-range path - `--date 2026-06-07` exited 1 and named the expected and received ranges.
- Wrong-property, row/sidecar mismatch, invalid-date, network-path, query-bearing sitemap, oversized-sitemap, oversized-response, redirecting-key-page, and over-concurrency cases are covered by passing negative tests.
- `--help` remains unsupported and exits 1; this is an existing CLI usability gap, not a correctness bypass.

## Manual QA Matrix

| Scenario | Surface | Expected | Result |
| --- | --- | --- | --- |
| Current real GSC input, report date `2026-07-10` | `pnpm seo:weekly:run` | Generate from 2026-06-12 through 2026-07-09 | Pass; property 3/67, visible query 0/13, visible page 3/121 |
| Same input, stale report date `2026-06-07` | `pnpm seo:weekly:run` | Reject mismatched evidence range | Pass; exit 1 with expected and received ranges |
| Synthetic source label | Focused CLI regression | Reject before generation | Pass |
| Direct fixture flag outside sample lifecycle | Focused CLI regression | Reject before generation | Pass |
| Oversized sitemap XML, key-page HTML, or sitemap HTML | Deployed-checker regressions | Cancel body read above 1 MB | Pass |
| Seventeen delayed sitemap pages | Deployed-checker regression | Observed request overlap peaks at eight | Pass; fixture stdout event stream confirms peak eight without filesystem writes |
| Query-bearing key-page URL in sitemap | Deployed-checker regression | Scan separately from the canonical key page | Pass; injected `FAQPage` is rejected |
| Production `wenlan.app` | Deployed technical checker | Direct 200s, redirects, noindex, sitemap-wide schema scan | Pass; 106 sitemap URLs, peak eight |

Final review used one focused Sol reviewer. Its aggregation-boundary findings were fixed, and the same affected lane returned `APPROVE`; no five-lane restart was used. Future maintenance should run one complete final review, then rerun only affected lanes after fixes.

## Implemented Fix Order

1. Enforce metadata, expected date range, and `sc-domain:wenlan.app` at the normal weekly pipeline boundary.
2. Require direct 200 responses for deployed key pages.
3. Close utility noindex and sitemap-wide FAQPage coverage gaps.
