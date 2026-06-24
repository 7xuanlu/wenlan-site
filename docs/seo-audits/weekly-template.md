# Weekly SEO/GEO Audit — YYYY-MM-DD

Generated from Google Search Console query/page CSV exports. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | YYYY-MM-DD |
| Date range | Last 28 days |
| GSC data source | CSV export |
| Query table clicks | - |
| Query table impressions | - |
| Query table CTR | - |
| Query table average position | - |
| Indexed pages | manual |
| Not indexed pages | manual |
| Sitemap last read | manual |
| Umami data source | manual / account-gated |
| Umami landing page views | manual |
| AI referrals | manual |
| Reddit referrals | manual |
| llms.txt hits | manual |

Use property-level GSC aggregate cards only when they are separately captured. Do not label partial visible query/page table sums as property totals.

## Top Actions

1. **recommended-action** — `query-or-page`: diagnosis.

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| `example query` | Query group | `/learn/example` | - | - | - | - | title-meta-refresh / quick-answer-refresh / internal-link-refresh / technical-check / distribution / new-article-candidate / wait | - |

## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| `/learn/example` | - | - | - | - | title-meta-refresh / internal-link-refresh / technical-check / distribution / wait | - |

## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions, fixing title/meta gaps, strengthening first-screen answers, and adding internal links before adding net-new content.

## Follow-Up

- [ ] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [ ] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [ ] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [ ] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [ ] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [ ] Export or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and `llms.txt` hits.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Generate `pnpm seo:ai-visibility -- --date YYYY-MM-DD` and manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`. The command only creates a local worksheet, does not call external assistants, and refuses to overwrite an existing worksheet unless you pass `--force true`.
- [ ] Next measurement date: YYYY-MM-DD.
