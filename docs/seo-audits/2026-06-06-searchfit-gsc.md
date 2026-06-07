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

## Why Impressions Have No Clicks

This does not look like one single failure. It is a mix of normal early-stage SEO behavior and fixable snippet/recrawl issues.

1. **Average position is not high enough yet.** GSC shows average position `12.4` over the last 28 days. That is usually page-two or bottom-page-one territory, where zero clicks on only `153` impressions is plausible.
2. **The top branded rows are probably diagnostic searches.** The two largest query rows are long filtered queries around `"origin app"` / `"origin" "app"` with many negative terms. Those look like manual ranking checks, not normal user searches. They should not drive product/content decisions.
3. **Old guide URLs are still in Google's performance data.** `/guides`, `/guides/claude-code-memory`, `/guides/local-first-ai-memory`, `/guides/mcp-memory-server`, and `/guides/ai-memory-app` together account for visible impressions. They redirect correctly, but Google is still showing or attributing old URLs while the new `/learn/*` URLs are still being discovered.
4. **Search intent is broader than Origin.** For `claude code memory`, searchers often want Anthropic's official explanation of CLAUDE.md, project memory, and auto memory. Origin's page must answer that native Claude Code memory intent first, then explain where Origin adds MCP/local/shared memory.
5. **The Learn hub title was too generic.** `/learn` earned `40` impressions in 28 days, but its title was `Learn | Origin`. That is not click-worthy for queries like `claude code memory`, `claude memory mcp`, or `cursor memory mcp`.
6. **The homepage snippet over-led with benchmark proof.** The homepage description was accurate but long and benchmark-heavy. For searchers seeing an unknown brand, the snippet needed to state the concrete workflow: Claude Code, Cursor, Codex, MCP, capture, recall, handoff.

Applied CTR-snippet fixes in the current branch:

- Homepage title/description now name Claude Code, Cursor, Codex, MCP, local AI work memory, capture, recall, handoff, provenance, and Markdown artifacts.
- `/learn` metadata now targets AI work memory guides for Claude Code, Cursor, and MCP instead of the generic `Learn | Origin`.
- `/learn/claude-code-memory` metadata and first section now cover CLAUDE.md, auto memory, and MCP memory directly.

## Query-Language Fix

The public positioning can keep "AI work memory" as Origin's category, but SEO needs to bridge into the phrases users actually search.

Do not use competitor landing pages as the deciding source. They are weak vocabulary signals only. The stronger evidence stack is:

1. **Search Console impressions for useorigin.app.** The visible 28-day query table already includes `claude code memory`, `claude memory mcp`, `claude code /memory`, `codememory mcp`, `claude code persistent memory`, and `claude code memory repo`. This is the strongest signal because Google actually showed Origin for these searches.
2. **Google autocomplete.** Fresh checks returned suggestions for `claude code memory`, `claude code memory.md`, `claude code memory plugin`, `mcp memory server`, `mcp memory github`, `mcp memory claude`, `cursor memory mcp`, `ai agent memory system`, `ai agent memory mcp`, `ai agent memory layer`, `local ai persistent memory`, and `local ai agent memory`.
3. **Official docs terminology.** Anthropic's Claude Code docs use `CLAUDE.md`, auto memory, and `/memory`; MCP's official docs use MCP servers and describe broad client/server support across AI assistants and development tools.
4. **GitHub developer vocabulary.** GitHub repo search shows developers naming projects around `claude-code-memory`, `MCP memory server`, `cursor-memory-mcp`, and `AI Agent Memory`.

Do not optimize only for:

- `AI work memory`
- `Origin memory`
- `single local home`
- `local home for AI`

Those are useful product-language phrases, but they are not yet the strongest empirical query language. The route should prioritize the phrases with direct GSC/autocomplete/GitHub evidence:

- `persistent memory for AI agents`
- `MCP memory server`
- `shared memory for Claude Code Cursor Codex`
- `local memory for Claude Code Cursor Codex`
- `one memory every AI`
- `one memory across AI tools`
- `AI coding agent memory`
- `Claude Code persistent memory`
- `Claude Code memory server`
- `Cursor memory MCP`
- `memory fragmentation AI tools`
- `context loss between Claude Code Cursor sessions`

Cluster map:

| Cluster | Confidence | Primary phrase | Supporting phrases | Target page |
| --- | --- | --- | --- | --- |
| Claude Code memory | High | Claude Code memory | CLAUDE.md; Claude Code auto memory; Claude Code persistent memory; Claude Code memory plugin | `/learn/claude-code-memory` |
| MCP memory server | High | MCP memory server | Claude memory MCP; Cursor memory MCP; MCP memory github; memory MCP server | `/learn/mcp-memory-server` |
| Cross-tool shared memory | Medium | shared local memory for Claude Code, Cursor, Codex | shared memory AI agents; AI tools shared memory; one memory across AI tools | `/` and `/learn` |
| AI agent memory | Medium | AI agent memory | AI agent memory system; AI agent memory MCP; AI agent memory layer | `/learn/ai-work-memory` |
| Local trust | Medium | local AI memory | local AI persistent memory; local AI agent memory; local-first MCP memory server | `/learn/local-first-ai-memory` and `/learn/markdown-local-index-ai-memory` |
| Context-loss pain | Low until visible in GSC | AI coding agent memory | context loss between sessions; agents forget project context | `/learn/ai-coding-agent-loses-context` |

Applied title adjustment:

- Homepage title now uses `Shared Local Memory for Claude Code, Cursor, Codex`. This is a positioning hypothesis that combines the strongest tool nouns from GSC/autocomplete (`Claude Code`, `memory`, `MCP`, `Cursor`) with Origin's cross-tool value. Keep validating it against GSC before expanding more pages.

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
