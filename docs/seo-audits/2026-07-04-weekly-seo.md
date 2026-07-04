# Weekly SEO/GEO Audit — 2026-07-04

Generated from Search Console API. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | 2026-07-04 |
| Date range | 2026-06-06 to 2026-07-03 |
| GSC data source | Search Console API |
| Query table clicks | 0 |
| Query table impressions | 0 |
| Query table CTR | 0.00% |
| Query table average position | 0.0 |
| Top query groups | - |
| Top page | - |
| Umami data source | manual / account-gated |
| Umami landing page views | manual |
| AI referrals | manual |
| Reddit referrals | manual |
| llms.txt hits | manual |

## GSC Indexing Details

Source: `/tmp/wenlan-seo/gsc-metadata.json` from `sc-domain:wenlan.app`.

| Field | Value |
| --- | --- |
| Sitemap | `https://wenlan.app/sitemap.xml` |
| Sitemap last submitted | 2026-07-03T04:40:50.520Z |
| Sitemap last read | 2026-07-04T04:58:15.751Z |
| Sitemap errors / warnings | 0 / 0 |
| Submitted web URLs | 101 |
| Indexed web URLs | 0 |
| Submitted images | 202 |
| Indexed images | 0 |
| Alternate canonical count | manual / account-gated |
| Page with redirect count | manual / account-gated |
| Old guide URLs surfacing in Search Analytics | none in this 0-row export |
| Pages with impressions and no clicks | none in this 0-row export |

## Top Actions

No immediate action. Keep measuring.

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |


## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |


## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

## Follow-Up

- [ ] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [ ] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [ ] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [ ] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [ ] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [ ] Export or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and `llms.txt` hits.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Generate `pnpm seo:ai-visibility -- --date YYYY-MM-DD` and manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: 2026-07-11.
