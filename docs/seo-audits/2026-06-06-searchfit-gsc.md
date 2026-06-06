# Searchfit + GSC Audit Snapshot — 2026-06-06

Source of truth: Google Search Console property `sc-domain:useorigin.app`, live fetches from `https://useorigin.app`, and the Searchfit SEO audit checklist.

## Live Technical Audit

- `https://useorigin.app/` returned `200`.
- `/docs`, `/docs/get-started`, `/learn`, key Learn pages, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/llms-full.txt` returned expected statuses.
- Old guide URLs return permanent redirects:
  - `/guides/mcp-memory-server` -> `/learn/mcp-memory-server`
  - `/docs/guides/mcp-memory-server` -> `/learn/mcp-memory-server`
- Live sitemap contains `92` URLs.
- Live sitemap excludes old `/guides/*` and `/docs/guides/*` URLs.
- Live sitemap includes `/learn/origin-vs-obsidian-ai-memory`.
- `robots.txt` references the sitemap and does not block all crawling.
- `/llms.txt` and `/llms-full.txt` return `X-Robots-Tag: noindex, follow`, which is intentional for AI-readable helper files.
- Sampled deployed pages have canonical URLs and JSON-LD.
- Sampled deployed pages do not include `FAQPage` JSON-LD.

## GSC Indexing

GSC overview:

- Indexed pages: `10`
- Not indexed pages: `21`
- Last Pages report update: `2026-05-28`

Why pages are not indexed:

| Reason | Source | Validation | Pages |
| --- | --- | --- | ---: |
| Page with redirect | Website | Failed | 3 |
| Alternate page with proper canonical tag | Website | Not Started | 1 |
| Crawled - currently not indexed | Google systems | Not Started | 1 |
| Discovered - currently not indexed | Google systems | Started | 16 |

Interpretation:

- The redirect and alternate-canonical items are likely old `/guides/*` / duplicate URLs aging out, not current canonical sitemap problems.
- The important gap is discovery/recrawl lag. GSC sitemap data is stale relative to the live sitemap.

## GSC Sitemap

Submitted sitemap:

- URL: `https://useorigin.app/sitemap.xml`
- Submitted: `2026-04-25`
- Last read: `2026-05-30`
- Status: `Success`
- Discovered pages: `23`
- Discovered videos: `0`

Interpretation:

- Live sitemap now has `92` URLs, but GSC has only discovered `23`.
- This means Google has not yet read the post-Learn-expansion sitemap state.
- Do not start another broad content batch until GSC rereads the sitemap and the new Learn URLs either index or show query impressions.

## GSC Performance — Last 28 Days

Date range shown by GSC: `2026-05-07` to `2026-06-03`.

- Clicks: `0`
- Impressions: `153`
- CTR: `0%`
- Average position: `12.4`
- Last update: `5.5 hours ago` at time of audit

Top visible queries:

| Query | Clicks | Impressions |
| --- | ---: | ---: |
| `"origin app"` filtered query | 0 | 19 |
| `"origin" "app"` filtered query | 0 | 7 |
| `claude code memory` | 0 | 6 |
| `superlocal memory` | 0 | 3 |
| `claude memory mcp` | 0 | 2 |
| `claude code /memory` | 0 | 2 |
| `codememory mcp` | 0 | 1 |
| `super local memory` | 0 | 1 |
| `claude code persistent memory` | 0 | 1 |
| `claude code memory repo` | 0 | 1 |
| `claude code memory server` | 0 | 1 |
| `claude code permanent memory` | 0 | 1 |
| `origin ai` | 0 | 1 |
| `memory claude code` | 0 | 1 |
| `cursor memory mcp` | 0 | 1 |
| `code memory` | 0 | 1 |

Top visible pages:

| Page | Clicks | Impressions |
| --- | ---: | ---: |
| `https://useorigin.app/learn` | 0 | 40 |
| `https://useorigin.app/` | 0 | 36 |
| `https://useorigin.app/guides` | 0 | 31 |
| `https://useorigin.app/learn/claude-code-memory` | 0 | 29 |
| `https://useorigin.app/guides/claude-code-memory` | 0 | 19 |
| `https://useorigin.app/guides/local-first-ai-memory` | 0 | 9 |
| `https://useorigin.app/guides/mcp-memory-server` | 0 | 6 |
| `https://useorigin.app/learn/mcp-memory-server` | 0 | 4 |
| `https://useorigin.app/guides/ai-memory-app` | 0 | 2 |

## Searchfit Interpretation

Current strongest query cluster:

- Claude Code memory
- Claude memory MCP
- Claude Code persistent/permanent memory
- Cursor memory MCP
- Superlocal comparison

Current strongest page cluster:

- `/learn`
- `/`
- `/learn/claude-code-memory`
- `/learn/mcp-memory-server`

Old `/guides/*` URLs still receive impressions. Since they redirect correctly and are excluded from the sitemap, this is a transition artifact. Do not re-add guide URLs.

## Next Actions

1. After the Obsidian comparison update is merged/deployed, resubmit `sitemap.xml` in GSC or use URL inspection for priority Learn URLs.
2. Wait for GSC to read the `92`-URL sitemap before another broad content batch.
3. Refresh pages already receiving impressions before writing new pages:
   - `/learn`
   - `/`
   - `/learn/claude-code-memory`
   - `/learn/mcp-memory-server`
4. For the Claude Code memory cluster, improve first-screen copy and metadata around exact phrases:
   - `claude code memory`
   - `claude code persistent memory`
   - `claude memory mcp`
   - `claude code memory server`
5. Keep the old guide redirects. The `Page with redirect` GSC issue is expected until Google drops those old URLs.
6. Treat the GSC FAQ enhancement as stale historical data. Current sampled deployed pages do not emit `FAQPage` JSON-LD.

