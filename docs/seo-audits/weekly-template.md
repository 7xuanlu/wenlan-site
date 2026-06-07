# Weekly SEO/GEO Worksheet

Copy this file for each weekly cleanup as `YYYY-MM-DD-weekly-seo.md`. Keep raw Search Console and Umami exports outside git; commit the interpreted worksheet only when it changes strategy or documents shipped work.

## Snapshot

| Field | Value |
| --- | --- |
| Week of | YYYY-MM-DD |
| Date range | Last 28 days |
| GSC data source | live / export / unavailable |
| Total clicks | - |
| Total impressions | - |
| Average CTR | - |
| Average position | - |
| Indexed pages | - |
| Not indexed pages | - |
| Sitemap last read | - |
| Umami sessions | - |
| AI referrals | - |
| Reddit referrals | - |

## Query Worksheet

| Query | Query group | Page | Impressions | Clicks | CTR | Avg position | Indexed? | Action | Owner | Date changed | Evidence |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| `claude code memory` | Claude Code memory | `/learn/claude-code-memory` | - | - | - | - | yes/no | wait / refresh / link / distribute | Origin team | - | GSC live/export |
| `claude code /memory` | Claude Code native command | `/learn/claude-code-memory-command-vs-origin` | - | - | - | - | yes/no | wait / refresh / link / distribute | Origin team | - | GSC live/export |
| `mcp memory server` | MCP memory server | `/learn/mcp-memory-server` | - | - | - | - | yes/no | wait / refresh / link / distribute | Origin team | - | GSC live/export |
| `cursor memory mcp` | Cursor MCP memory | `/learn/how-to-add-mcp-memory-to-cursor` | - | - | - | - | yes/no | wait / refresh / link / distribute | Origin team | - | GSC live/export |
| `origin memory` | Brand + category | `/` or `/learn` | - | - | - | - | yes/no | wait / refresh / entity links | Origin team | - | GSC live/export |

## Indexing Worksheet

| Issue | Count | Example URL | Intended canonical | Action | Evidence |
| --- | ---: | --- | --- | --- | --- |
| Page with redirect | - | `/guides/...` | `/learn/...` | Usually wait if canonical Learn URL is indexed | GSC Pages |
| Alternate page with proper canonical tag | - | - | - | Act only if wanted canonical is missing | GSC Pages |
| Crawled - currently not indexed | - | - | - | Improve internal links/content if stable for several weeks | GSC Pages |
| Discovered - currently not indexed | - | - | - | Check sitemap/internal links; wait for new pages | GSC Pages |

## Weekly Decision

Top action this week:

1. -
2. -
3. -

Do not create a new Learn page unless GSC/Searchfit shows a query cluster no current page answers cleanly. Prefer refreshing pages already getting impressions.

## Changes Made

| File/Page | Change | Verification |
| --- | --- | --- |
| - | - | - |

## Follow-Up

- [ ] Record before/after GSC snapshot for changed pages.
- [ ] Verify `/sitemap.xml` includes changed canonical URLs.
- [ ] Verify old `/guides/*` URLs redirect to `/learn/*`.
- [ ] Check whether AI assistants mention Origin accurately for the tracked prompts in `docs/seo-measurement.md`.
