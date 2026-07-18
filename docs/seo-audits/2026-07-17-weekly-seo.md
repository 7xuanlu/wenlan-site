# Weekly SEO/GEO Audit — 2026-07-17

Generated from Search Console API. Raw exports stay outside git.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | 2026-07-17 |
| Date range | 2026-06-19 to 2026-07-16 |
| GSC data source | Search Console API |
| Property clicks | 6 |
| Property impressions | 190 |
| Property CTR | 3.16% |
| Property average position | 15.6 |
| Visible query table clicks | 0 |
| Visible query table impressions | 44 |
| Visible query table CTR | 0.00% |
| Visible query table average position | 24.5 |
| Query visibility gap | 6 clicks; 146 impressions |
| Visible page table clicks | 6 |
| Visible page table impressions | 263 |
| Top query groups | Brand/entity (18), Other (13), Claude Code (5), MCP memory (4) |
| Top page | /learn |
| Analytics data source | Vercel Web Analytics API |
| Analytics date range | 2026-06-19 to 2026-07-16 |
| Analytics visitors | 323 |
| Analytics pageviews | 374 |
| AI referrals | 1 visit from 1 referrer |
| Reddit referrals | 0 visits from 0 referrers |
| llms.txt hits | 0 |
| CTA custom events | account-gated: Pro or Enterprise plan required |

## Vercel Analytics Evidence

Authenticated Web Analytics API data for the linked Wenlan Vercel project. Property totals come from the count endpoint; tables show the top aggregate rows returned by the API.

### Pages

| Page | Visitors | Pageviews |
| --- | ---: | ---: |
| `/` | 68 | 80 |
| `/learn` | 69 | 71 |
| `/learn/mcp-memory-server` | 57 | 57 |
| `/zh-TW` | 6 | 7 |
| `/learn/wenlan-vs-superlocal-memory` | 6 | 6 |
| `/learn/wenlan-vscode-mcp-workflow` | 6 | 6 |
| `/docs/packages-and-registries` | 5 | 5 |
| `/learn/ai-work-memory` | 5 | 5 |
| `/learn/wenlan-vs-basic-memory` | 5 | 5 |
| `/zh-CN` | 5 | 5 |
| `/docs/get-started` | 4 | 4 |
| `/docs/spaces` | 4 | 4 |

### Referrers

| Referrer | Visitors | Pageviews | Channel |
| --- | ---: | ---: | --- |
| (direct) | 183 | 227 | Other |
| google.com | 131 | 131 | Other |
| bing.com | 4 | 5 | Other |
| duckduckgo.com | 2 | 5 | Other |
| chatgpt.com | 1 | 1 | AI referral |
| github.com | 1 | 1 | Other |
| m.baidu.com | 1 | 1 | Other |
| search.yahoo.com | 1 | 1 | Other |
| vercel.com | 1 | 2 | Other |
| yandex.ru | 1 | 1 | Other |

## Indexing and Technical Evidence

- The Search Console sitemap API reports `https://wenlan.app/sitemap.xml` last submitted at `2026-07-03T04:40:50.520Z` and last downloaded at `2026-07-04T04:58:15.751Z`, with 101 submitted web URLs, 0 warnings, and 0 errors.
- The sitemap API's `indexed: 0` field is not a complete Pages indexing count. The authenticated Pages report totals plus `Alternate page with proper canonical tag` and `Page with redirect` counts remain a manual Search Console check.
- The deployed technical audit passed with 108 sitemap URLs, 13 direct-200 key pages, six utility noindex surfaces, 25 required redirects, six bridge-host redirects, and 18 direct changed redirects.
- Old `/guides/*`, `/docs/guides/*`, and legacy pre-Wenlan URLs were absent from the deployed sitemap. `useorigin.app` and `www.useorigin.app` remained redirect bridges into `wenlan.app`.
- Pages with impressions but no clicks are listed in the Page Action Queue below; no click or indexing metric was inferred beyond the authenticated GSC export.

## Top Actions

1. **title-meta-refresh** — `/docs/changelog`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
2. **title-meta-refresh** — `/docs/data-and-privacy`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
3. **title-meta-refresh** — `/learn/cursor-claude-code-shared-memory`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
4. **title-meta-refresh** — `/docs/configuration`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
5. **title-meta-refresh** — `/learn/wenlan-vs-claude-mem`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
6. **title-meta-refresh** — `/docs/cli-and-service`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
7. **title-meta-refresh** — `/docs/security`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.
8. **title-meta-refresh** — `/learn/ai-coding-agent-loses-context`: Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer.

## Operator Decisions and Changes

- Accepted `/docs/changelog`: its 13 impressions, 0 clicks, and average position 8.5 coincided with a source-fact defect. The page, structured data, About release surfaces, comparison freshness notes, localized About copy, and sitemap dates now track Wenlan v0.13.2 from 2026-07-14 instead of v0.12.0.
- Deferred `/docs/data-and-privacy`: it was refreshed on 2026-07-10, while GSC still reports the sitemap last downloaded on 2026-07-04. Rewriting it again would not provide a clean measurement window.
- Accepted `/learn/cursor-claude-code-shared-memory`: its 8 impressions, 0 clicks, and average position 20.8 support a title/meta/quick-answer refresh. The page now answers how to connect both clients to one daemon, data directory, and space.
- No new Learn page was created. The visible query table is too sparse to validate a new cluster, including `wenlanmwep3`.
- English coverage was checked for source-backed and LLM wiki pages, Claude Code memory, MCP memory server, Cursor MCP, local and agent memory, legacy migration, AI work memory, comparisons, and Obsidian-adjacent intent.
- Traditional and Simplified Chinese coverage was checked through the localized home/docs surfaces, localized Learn hubs, and the two fully translated acquisition articles: `distilled-wiki-pages-ai-memory` and `source-backed-wiki-pages-ai-work`. GSC showed only five localized page rows, so no new Mandarin article was inferred.

## Query Action Queue

| Query | Query group | Current page | Impressions | Clicks | CTR | Avg position | Recommended action | Diagnosis |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| `wenlanmwep3` | Other | - | 4 | 0 | 0.00% | 6.0 | new-article-candidate | No mapped page answers this query cluster cleanly. Validate recurrence before writing. |
| `wenlan web3` | Brand/entity | `/` | 6 | 0 | 0.00% | 5.0 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `wenlan web` | Brand/entity | `/` | 5 | 0 | 0.00% | 5.6 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `"origin app" -"blue origin" -"a trusted origin" -"country of origin" -"nation of origin" -"origin of electro" -"owe its origin" -"owes its origin" -"unknown origin" -site:reddit.com -site:twitter.com -site:x.com -site:wykop.pl -site:tripadvisor.com -site:youtube.com -site:yelp.com -site:booking.com -site:facebook.com -site:instagram.com -site:tiktok.com` | Brand/entity | `/` | 4 | 0 | 0.00% | 6.0 | wait | Ranking is already strong but clicks are absent. Review SERP intent and title before changing page copy. |
| `basic memory` | Comparisons | `/learn/wenlan-vs-basic-memory` | 3 | 0 | 0.00% | 32.7 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `claude code memory` | Claude Code | `/learn/claude-code-memory` | 3 | 0 | 0.00% | 51.0 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `claude memory mcp` | MCP memory | `/learn/mcp-memory-server` | 3 | 0 | 0.00% | 50.3 | wait | Mapped page ranks weakly, but evidence is too thin for a new action. Keep measuring and review page quality or internal links. |
| `basicmemory` | Other | - | 2 | 0 | 0.00% | 29.5 | wait | Too little query evidence for a new page. Keep tracking before changing content. |
| `wenlan wep3` | Brand/entity | `/` | 2 | 0 | 0.00% | 3.5 | wait | No immediate content action. Keep measuring before changing the page. |
| `woflan` | Other | - | 2 | 0 | 0.00% | 91.0 | wait | Too little query evidence for a new page. Keep tracking before changing content. |
| `文澜` | Other | - | 2 | 0 | 0.00% | 5.5 | wait | Too little query evidence for a new page. Keep tracking before changing content. |
| `claude mcp memory` | MCP memory | `/learn/mcp-memory-server` | 1 | 0 | 0.00% | 46.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claude memory md` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 55.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `claudecode memory` | Claude Code | `/learn/claude-code-memory` | 1 | 0 | 0.00% | 45.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `llm wiki 2.0` | Other | - | 1 | 0 | 0.00% | 13.0 | wait | Too little query evidence for a new page. Keep tracking before changing content. |
| `localhost:7878` | Setup/troubleshooting | `/docs/troubleshooting` | 1 | 0 | 0.00% | 6.0 | wait | No immediate content action. Keep measuring before changing the page. |
| `md memory` | Other | - | 1 | 0 | 0.00% | 72.0 | wait | Too little query evidence for a new page. Keep tracking before changing content. |
| `memory md` | Other | - | 1 | 0 | 0.00% | 70.0 | wait | Too little query evidence for a new page. Keep tracking before changing content. |
| `wenlan` | Brand/entity | `/` | 1 | 0 | 0.00% | 5.0 | wait | No immediate content action. Keep measuring before changing the page. |

## Page Action Queue

| Page | Impressions | Clicks | CTR | Avg position | Recommended action | Likely issue |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| `/docs/changelog` | 13 | 0 | 0.00% | 8.5 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/data-and-privacy` | 11 | 0 | 0.00% | 20.4 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/cursor-claude-code-shared-memory` | 8 | 0 | 0.00% | 20.8 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/configuration` | 5 | 0 | 0.00% | 18.8 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/wenlan-vs-claude-mem` | 3 | 0 | 0.00% | 13.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/cli-and-service` | 2 | 0 | 0.00% | 9.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/security` | 2 | 0 | 0.00% | 8.5 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/ai-coding-agent-loses-context` | 2 | 0 | 0.00% | 9.5 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/wenlan-vs-notion-ai` | 2 | 0 | 0.00% | 11.5 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/agent-profiles` | 1 | 0 | 0.00% | 10.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/get-started` | 1 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/docs/memory-types` | 1 | 0 | 0.00% | 8.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn/mcp-memory-server` | 1 | 0 | 0.00% | 10.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/zh-TW/docs` | 1 | 0 | 0.00% | 10.0 | title-meta-refresh | Page earns impressions with no clicks. Refresh title/meta, intro, and quick answer. |
| `/learn` | 30 | 0 | 0.00% | 19.2 | quick-answer-refresh | Learn hub earns impressions with no clicks. Sharpen search-path copy and first-screen answer. |
| `/learn/claude-code-memory` | 23 | 0 | 0.00% | 38.7 | internal-link-refresh | Existing Learn page has search demand but weak ranking. Add links from stronger related pages before rewriting content. |
| `/learn/wenlan-vs-basic-memory` | 15 | 1 | 6.67% | 17.6 | internal-link-refresh | Page has search demand. Add internal links from stronger related pages. |
| `/learn/claude-code-session-handoff` | 4 | 1 | 25.00% | 24.5 | internal-link-refresh | Page has search demand. Add internal links from stronger related pages. |
| `/about` | 29 | 0 | 0.00% | 7.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/platforms` | 16 | 0 | 0.00% | 7.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/` | 13 | 0 | 0.00% | 3.8 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-vs-superlocal-memory` | 12 | 0 | 0.00% | 6.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/architecture` | 7 | 1 | 14.29% | 4.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-work-memory` | 6 | 2 | 33.33% | 3.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/core-concepts` | 6 | 0 | 0.00% | 4.8 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW` | 5 | 1 | 20.00% | 5.2 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs` | 5 | 0 | 0.00% | 5.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-work-memory-vs-knowledge-base` | 5 | 0 | 0.00% | 7.6 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/capture-quality` | 4 | 0 | 0.00% | 5.3 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-vs-obsidian-ai-memory` | 4 | 0 | 0.00% | 4.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN` | 4 | 0 | 0.00% | 5.8 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/evaluation` | 3 | 0 | 0.00% | 6.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/mcp-memory-server-localhost-7878` | 3 | 0 | 0.00% | 6.7 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/api-examples` | 2 | 0 | 0.00% | 3.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/contributing` | 2 | 0 | 0.00% | 4.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/project-scope` | 2 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/distilled-wiki-pages-ai-memory` | 2 | 0 | 0.00% | 3.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/markdown-local-index-ai-memory` | 2 | 0 | 0.00% | 6.5 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/wenlan-vs-mcp-memory-service` | 2 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/docs/glossary` | 1 | 0 | 0.00% | 7.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/learn/ai-agent-handoff-loop` | 1 | 0 | 0.00% | 3.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-CN/learn/source-backed-wiki-pages-ai-work` | 1 | 0 | 0.00% | 1.0 | wait | No immediate page-level change. Keep tracking before editing. |
| `/zh-TW/learn/source-backed-wiki-pages-ai-work` | 1 | 0 | 0.00% | 49.0 | wait | No immediate page-level change. Keep tracking before editing. |

## Do Not Write Yet Gate

Do not create a new Learn page unless GSC/Searchfit shows a recurring query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions. Wait when pages are newly shipped, when GSC has not reread the sitemap, or when old redirect/canonical URLs are the main noise.

## Follow-Up

- [ ] Record pre-change GSC snapshot for changed pages in this worksheet.
- [ ] Record post-change GSC snapshot after deployment and the next GSC read.
- [ ] Run `pnpm seo:technical:deployed` to verify deployed robots, sitemap, canonicals, redirects, noindex headers, and checked-page schema.
- [ ] Run `pnpm build` and `pnpm seo:technical:built` to verify local built robots, sitemap, redirects, noindex headers, canonicals, and schema.
- [ ] Verify old `/guides/*` and `/docs/guides/*` URLs redirect to canonical `/learn/*` URLs.
- [ ] Recheck changed redirects after deployment with `pnpm seo:technical:deployed -- --require-direct-changed-redirects true`.
- [ ] Run `pnpm seo:vercel:fetch -- --date YYYY-MM-DD` before the weekly report; keep custom CTA events marked account-gated when the Vercel plan blocks them.
- [ ] Add changed pages to the next weekly comparison.
- [ ] Generate `pnpm seo:ai-visibility -- --date YYYY-MM-DD` and manually check whether AI assistants mention Wenlan accurately for the tracked prompts in `docs/seo-measurement.md`.
- [ ] Next measurement date: 2026-07-24.
