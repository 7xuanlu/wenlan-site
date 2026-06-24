# Weekly SEO/GEO Audit — 2026-06-22

Generated from Search Console UI CSV export. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | 2026-06-22 |
| Date range | 2026-05-24 to 2026-06-20 |
| GSC data source | Search Console UI CSV export |
| Query table clicks | 3 |
| Query table impressions | 122 |
| Query table CTR | 2.46% |
| Query table average position | 10.0 |
| Top query groups | Cursor/Codex workflows (51), Brand/entity (36), MCP memory (18), Claude Code (12) |
| Top page | / |
| Umami data source | manual / account-gated |
| Umami landing page views | manual |
| AI referrals | manual |
| Reddit referrals | manual |
| llms.txt hits | manual |

## Account-Gated Search Console Details

- Performance export: Browser-authenticated Search Console UI CSV export on 2026-06-22; Search type Web; Date Last 28 days; GSC last update 10 hours before export; chart range 2026-05-24 to 2026-06-20.
- Export shape: 26 query rows and 12 page rows normalized into `/tmp/origin-seo/gsc-queries.csv` and `/tmp/origin-seo/gsc-pages.csv`.
- Page indexing: last update 2026-06-11; Indexed 8; Not indexed 94.
- Not indexed reasons: Page with redirect 6; Alternate page with proper canonical tag 1; Crawled - currently not indexed 2; Duplicate, Google chose different canonical than user 1; Discovered - currently not indexed 84.
- Sitemap: `https://useorigin.app/sitemap.xml`; submitted 2026-06-06; last read 2026-06-19; status Success; 93 discovered pages; 0 discovered videos.
- Old guide URLs still surfacing in page rows: `/guides/claude-code-memory` (9 impressions), `/guides` (5), `/guides/ai-memory-app` (3), `/guides/mcp-memory-server` (2), `/guides/local-first-ai-memory` (1).
- Pages with impressions but no clicks: `/learn` (100), `/learn/claude-code-memory` (40), `/docs/configuration` (25), `/learn/local-first-ai-memory` (13), `/learn/distilled-wiki-pages-ai-memory` (10), `/guides/claude-code-memory` (9), `/guides` (5), `/guides/ai-memory-app` (3), `/guides/mcp-memory-server` (2), `/guides/local-first-ai-memory` (1).

## Technical SEO Verification

- `pnpm seo:technical:deployed -- --require-direct-changed-redirects true` passed on 2026-06-22: robots, 93 sitemap URLs, 8 key pages, 4 utility noindex headers, 9 redirects, 2 direct changed redirects, and old URL absence in the deployed sitemap.
- `pnpm build` passed on 2026-06-22.
- `pnpm seo:technical:built` passed on 2026-06-22: 7 redirects, 5 noindex header rules, 93 sitemap URLs, 8 required canonical sitemap URLs, robots output, 8 checked HTML pages, no `FAQPage` JSON-LD across 97 built HTML files, and old URL absence in the built sitemap.

## Local Changes Made

- Exported the authenticated Search Console Performance CSV zip from Browser and normalized real Query/Page CSVs into `/tmp/origin-seo`.
- Generated this weekly report from the real Search Console UI CSV export.
- No new page copy rewrite was made from this export. The non-technical actions target `/learn`, `/docs/configuration`, `/learn/wenlan-vs-superlocal-memory`, and `/learn/claude-code-memory`, which were already refreshed in the prior weekly loop; today's GSC evidence still includes old guide URLs and a 2026-06-19 sitemap read, so the safer action is to verify redirects, record indexing state, and remeasure.

## Top Actions

1. **technical-check** — `/guides/claude-code-memory`: Old guide URL should remain redirected; verify canonical Learn URL is indexed.
2. **technical-check** — `/guides`: Old guide URL should remain redirected; verify canonical Learn URL is indexed.
3. **technical-check** — `/guides/ai-memory-app`: Old guide URL should remain redirected; verify canonical Learn URL is indexed.
4. **technical-check** — `/guides/mcp-memory-server`: Old guide URL should remain redirected; verify canonical Learn URL is indexed.
5. **technical-check** — `/guides/local-first-ai-memory`: Old guide URL should remain redirected; verify canonical Learn URL is indexed.
6. **title-meta-refresh** — `/docs/configuration`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
7. **title-meta-refresh** — `superlocal memory`: Impressions with zero clicks in striking distance. Refresh title, meta, H1, and first answer.
8. **quick-answer-refresh** — `/learn`: Learn hub ranks strongly but earns no clicks. Sharpen SERP title, description, and first-screen search-path copy.

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| `superlocal memory` | Comparisons | `/learn/wenlan-vs-superlocal-memory` | 3 | 0 | 0.00% | 9.0 | title-meta-refresh | Impressions with zero clicks in striking distance. Refresh title, meta, H1, and first answer. |
| `origin by cursor` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 23 | 0 | 0.00% | 5.1 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `"origin app" -"blue origin" -"a trusted origin" -"country of origin"
-"nation of origin" -"origin of electro" -"owe its origin" -"owes its
origin" -"unknown origin" -site:reddit.com -site:twitter.com -site:x.com
-site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com
-site:booking.com -site:facebook.com -site:instagram.com -site:tiktok.com` | Brand/entity | `/` | 17 | 0 | 0.00% | 1.1 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `wenlan mcp` | MCP memory | `/learn/mcp-memory-server` | 14 | 1 | 7.14% | 3.6 | wait | No immediate content action. Keep measuring before changing the page. |
| `cursor origin` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 13 | 0 | 0.00% | 4.9 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `origin cursor ai` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 11 | 0 | 0.00% | 3.9 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `origin claude` | Brand/entity | `/` | 8 | 1 | 12.50% | 4.4 | wait | No immediate content action. Keep measuring before changing the page. |
| `"origin" "app" -"blue origin" -"a trusted origin" -"country of origin"
-"nation of origin" -"origin of electro" -"owe its origin" -"owes its
origin" -"unknown origin" -site:reddit.com -site:twitter.com -site:x.com
-site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com
-site:booking.com -site:facebook.com -site:instagram.com -site:tiktok.com` | Brand/entity | `/` | 7 | 0 | 0.00% | 1.9 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `claude code memory` | Claude Code | `/learn/claude-code-memory` | 6 | 0 | 0.00% | 41.2 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `origin memory` | Brand/entity | `/` | 3 | 1 | 33.33% | 5.7 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude memory mcp` | MCP memory | `/learn/mcp-memory-server` | 2 | 0 | 0.00% | 45.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `cursor announced origin` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 1 | 0 | 0.00% | 1.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `origin cursor` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 1 | 0 | 0.00% | 5.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `useorigin` | Brand/entity | `/` | 1 | 0 | 0.00% | 9.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `cursor orign` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 1 | 0 | 0.00% | 10.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude code origin` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 11.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `codememory mcp` | MCP memory | `/learn/mcp-memory-server` | 1 | 0 | 0.00% | 37.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `super local memory` | Comparisons | `/learn/wenlan-vs-superlocal-memory` | 1 | 0 | 0.00% | 37.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude code persistent memory` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 44.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude code memory repo` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 45.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude code memory server` | MCP memory | `/learn/mcp-memory-server` | 1 | 0 | 0.00% | 45.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude code permanent memory` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 48.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `memory claude code` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 49.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude code /memory` | Claude Code | `/learn/claude-code-memory-command-vs-wenlan` | 1 | 0 | 0.00% | 50.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `cursor memory mcp` | Cursor/Codex workflows | `/learn/how-to-add-mcp-memory-to-cursor` | 1 | 0 | 0.00% | 50.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `code memory` | Other | - | 1 | 0 | 0.00% | 57.0 | wait | Too little query evidence for a new page. Keep tracking before changing content. |

## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| `/guides/claude-code-memory` | 9 | 0 | 0.00% | 12.3 | technical-check | Old guide URL should remain redirected; verify canonical Learn URL is indexed. |
| `/guides` | 5 | 0 | 0.00% | 13.4 | technical-check | Old guide URL should remain redirected; verify canonical Learn URL is indexed. |
| `/guides/ai-memory-app` | 3 | 0 | 0.00% | 4.7 | technical-check | Old guide URL should remain redirected; verify canonical Learn URL is indexed. |
| `/guides/mcp-memory-server` | 2 | 0 | 0.00% | 3.0 | technical-check | Old guide URL should remain redirected; verify canonical Learn URL is indexed. |
| `/guides/local-first-ai-memory` | 1 | 0 | 0.00% | 6.0 | technical-check | Old guide URL should remain redirected; verify canonical Learn URL is indexed. |
| `/docs/configuration` | 25 | 0 | 0.00% | 13.1 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn` | 100 | 0 | 0.00% | 4.4 | quick-answer-refresh | Learn hub ranks strongly but earns no clicks. Sharpen SERP title, description, and first-screen search-path copy. |
| `/learn/claude-code-memory` | 40 | 0 | 0.00% | 32.2 | internal-link-refresh | Existing Learn page has search demand but weak ranking. Add links from stronger related pages before rewriting content. |
| `/` | 377 | 14 | 3.71% | 4.9 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/mcp-memory-server` | 28 | 1 | 3.57% | 4.9 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/local-first-ai-memory` | 13 | 0 | 0.00% | 2.8 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/distilled-wiki-pages-ai-memory` | 10 | 0 | 0.00% | 4.6 | wait | No immediate page-level change. Keep tracking before editing. |

## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

## Follow-Up

- [x] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [x] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [x] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [x] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [x] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [ ] Export or manually record Umami landing pages, referrers, AI referrals, Reddit referrals, and `llms.txt` hits.
- [ ] Add changed pages to the next weekly comparison.
- [x] Generate `pnpm seo:ai-visibility -- --date 2026-06-22`.
- [ ] Manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: 2026-06-29.
