# Weekly SEO/GEO Audit — 2026-07-03

Generated from Search Console API. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | 2026-07-03 |
| Date range | 2026-06-05 to 2026-07-02 |
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

## Top Actions

1. Keep the GSC demand gate strict: the `wenlan.app` Search Console API export for `2026-06-05` to `2026-07-02` returned `0` query rows and `0` page rows, so no demand metrics were inferred.
2. Refresh the existing wiki-pages hub instead of creating a competing page: `/learn/distilled-wiki-pages-ai-memory` now owns the "LLM wiki for AI work" cluster and links back to setup, workflow, privacy, provenance, and git-history context.
3. Align acquisition and GEO surfaces across English, zh-TW, zh-CN, `llms.txt`, `llms-full.txt`, structured data, sitemap/build checks, and the AI visibility worksheet.

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |


## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |


## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

## GSC Indexing Details

Search Console performance evidence was available through the API, but the normalized `wenlan.app` query and page exports were empty for `2026-06-05` to `2026-07-02`.

| Detail | Value |
| --- | --- |
| Indexed count | manual / account-gated |
| Sitemap last read | manual / account-gated |
| Alternate canonical count | manual / account-gated |
| Page-with-redirect count | manual / account-gated |
| Old guide URLs still surfacing | manual / account-gated |
| Pages with impressions but no clicks | none in current `wenlan.app` API export |

Do not submit GSC validation or indexing requests until the user approves account-side actions.

## Changes Made

- Updated English homepage, about, docs, get-started, manifest, OG, structured data, `llms.txt`, and `llms-full.txt` copy around "LLM wiki for AI work."
- Updated zh-TW and zh-CN core surfaces with Mandarin positioning for `AI 工作的 LLM wiki`, while keeping Chinese Learn/docs slug routes 404 and absent from the sitemap.
- Refreshed `/learn/distilled-wiki-pages-ai-memory` as the canonical LLM-wiki hub; kept `/learn/source-backed-wiki-pages-ai-work` as a supporting provenance/trust article.
- Added internal discovery from the homepage and Learn hub into the canonical wiki hub, plus hub links to `/docs/get-started`, `/docs/daily-workflow`, and `/docs/data-and-privacy`.
- Added 28-row AI visibility prompt coverage, including English LLM-wiki prompts and zh-TW/zh-CN Mandarin prompts; generated `docs/seo-audits/2026-07-03-ai-visibility.md` for manual assistant checks.
- Added SEO/i18n contract tests that prevent this positioning from drifting off English, Mandarin, the canonical hub, `llms.txt`, structured data, and measurement prompts.

## Verification Run

- `pnpm test:seo` — pass.
- `pnpm test:i18n` — pass.
- `pnpm lint` — pass.
- `pnpm seo:weekly:sample` — pass; wrote `/tmp/wenlan-weekly-seo-sample.md`.
- `pnpm seo:ai-visibility -- --date 2026-07-03` — pass; wrote `docs/seo-audits/2026-07-03-ai-visibility.md`.
- `NEXT_TELEMETRY_DISABLED=1 pnpm build` — pass; IndexNow skipped because `VERCEL_ENV` is unset.
- `pnpm seo:technical:built` — pass; redirects, headers, robots, sitemap, checked HTML, and FAQPage absence clean.
- `pnpm seo:technical:deployed` — pass; deployed robots, sitemap, key pages, utility noindex headers, redirects, bridge host redirects, and old-URL sitemap absence clean.
- `pnpm start` then `pnpm i18n:technical:built` — pass; 12 localized/core 200 routes and 6 untranslated zh Learn/docs routes returning 404.
- Stale-string scan — pass for old "living personal knowledge library", `AI-native`, `活個人知識庫`, `活个人知识库`, and `source-cited` strings in public source/report surfaces.
- Built inspections — pass for no `FAQPage`, no localized untranslated Learn/docs URLs in sitemap, and reciprocal canonical/alternate metadata in built HTML.

## Follow-Up

- [x] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [x] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [x] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [x] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [ ] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [ ] Export or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and `llms.txt` hits.
- [ ] Add changed pages to the next weekly comparison.
- [x] Generate `pnpm seo:ai-visibility -- --date YYYY-MM-DD`.
- [ ] Manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: 2026-07-10.
