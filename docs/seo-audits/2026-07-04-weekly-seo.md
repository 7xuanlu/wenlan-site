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

## Post-Deploy URL Inspection Details

Source: Google Search Console URL Inspection API for `sc-domain:wenlan.app`, captured after PR #50 reached production on 2026-07-04.

| URL | Verdict | Coverage state | Google canonical | Last crawl |
| --- | --- | --- | --- | --- |
| `https://wenlan.app/` | PASS | Submitted and indexed | `https://wenlan.app/` | 2026-07-04T05:19:21Z |
| `https://wenlan.app/learn` | NEUTRAL | Discovered - currently not indexed | manual / unavailable | manual / unavailable |
| `https://wenlan.app/learn/distilled-wiki-pages-ai-memory` | PASS | Submitted and indexed | `https://wenlan.app/learn/distilled-wiki-pages-ai-memory` | 2026-07-03T07:52:31Z |
| `https://wenlan.app/learn/source-backed-wiki-pages-ai-work` | NEUTRAL | Discovered - currently not indexed | manual / unavailable | manual / unavailable |
| `https://wenlan.app/zh-TW` | NEUTRAL | Discovered - currently not indexed | manual / unavailable | manual / unavailable |
| `https://wenlan.app/zh-CN` | NEUTRAL | URL is unknown to Google | manual / unavailable | manual / unavailable |

## Search Console UI Actions

Source: authenticated Search Console UI for `sc-domain:wenlan.app`, captured on 2026-07-04 after production deployment.

| Action | Result |
| --- | --- |
| Opened Search Console property | Verified property access for `wenlan.app`; overview showed 0 total web search clicks. |
| Confirmed sitemap discovery for `/learn` | URL Inspection UI showed sitemap `https://wenlan.app/sitemap.xml` and referring page `https://wenlan.app/`. |
| Requested indexing for `/learn` | Attempted via the UI `REQUEST INDEXING` button. Search Console started "Testing if live URL can be indexed" and did not complete after multiple minutes; Computer Use could not interact with the stuck modal because the visible Chrome frame and accessibility tree diverged. Treat as manual/UI-blocked, not completed. |
| Resubmitted sitemap through API | Not completed. The current ADC token has `webmasters.readonly`; the Search Console sitemap write call returned `ACCESS_TOKEN_SCOPE_INSUFFICIENT`. The sitemap is already submitted and last read on 2026-07-04. |

## Top Actions

1. Manually finish Search Console UI indexing requests for the key canonical URLs that are discovered but not indexed: `/learn`, `/learn/source-backed-wiki-pages-ai-work`, `/zh-TW`, and `/zh-CN`. This is UI-only for ordinary web pages; the API can inspect status but not submit indexing requests.
2. Keep monitoring Search Analytics; the 2026-06-06 to 2026-07-03 API export still has 0 query rows and 0 page rows, so do not create new content from inferred demand.
3. Use Vercel Analytics or Umami exports as enrichment once traffic appears; until then, leave landing-page/referrer/AI-referral fields manual instead of inferring demand.

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |


## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |


## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

## Follow-Up

- [x] Record pre-change GSC snapshot for changed pages in this worksheet.
- [x] Record post-change GSC snapshot after deployment and the next GSC read.
- [x] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [x] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [x] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [x] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [x] Generate `pnpm seo:ai-visibility -- --date 2026-07-04 --force true`; manual assistant checks remain unfilled by design.
- [ ] Request indexing in Search Console UI for `/learn`, `/learn/source-backed-wiki-pages-ai-work`, `/zh-TW`, and `/zh-CN`; `/learn` was attempted on 2026-07-04 but the UI live test did not complete.
- [ ] Export or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and `llms.txt` hits.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: 2026-07-11.
