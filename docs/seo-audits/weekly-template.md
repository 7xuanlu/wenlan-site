# Weekly SEO/GEO Audit — YYYY-MM-DD

Generated from Google Search Console query/page CSV exports. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | YYYY-MM-DD |
| Date range | Last 28 days |
| GSC data source | CSV export |
| Total clicks | - |
| Total impressions | - |
| Average CTR | - |
| Average position | - |
| Indexed pages | manual |
| Not indexed pages | manual |
| Sitemap last read | manual |
| Umami sessions | manual |
| AI referrals | manual |
| Reddit referrals | manual |

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

- [ ] Record before/after GSC snapshot for changed pages.
- [ ] Verify `/sitemap.xml` includes changed canonical URLs.
- [ ] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to `/learn/*`.
- [ ] Verify no old guide URLs appear in the sitemap.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Check whether AI assistants mention Origin accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: YYYY-MM-DD.
