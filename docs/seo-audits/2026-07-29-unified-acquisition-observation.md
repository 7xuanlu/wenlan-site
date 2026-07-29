# Unified Acquisition Observation — 2026-07-29

This observation keeps Search Console, Vercel, GitHub, indexing, and the
legacy-domain migration in one decision view. It does not merge their units,
invent a source-to-page join, or turn them into a composite score.

## Decision window

- Rolling range: `2026-06-28..2026-07-25`, 28 complete days.
- Search source: authenticated Search Console API.
- Visitor source: authenticated Vercel Web Analytics API.
- Search properties:
  - Goal property: `sc-domain:wenlan.app`.
  - Migration diagnostic only: `sc-domain:useorigin.app`.
- Raw inputs:
  - `/tmp/wenlan-seo-2026-07-28/`
  - `/tmp/useorigin-seo-2026-07-28/`
- Deterministic Wenlan report:
  `/tmp/wenlan-seo-2026-07-28/weekly-seo-corrected.md`.

## One-window acquisition view

| Layer | Native observation | Interpretation |
| --- | --- | --- |
| Wenlan GSC property | 8 clicks, 395 impressions, 2.03% CTR, 12.1 average position | Goal authority; 605 impressions remain to the fixed 1,000 target. |
| Wenlan visible queries | 2 clicks, 92 impressions | Privacy-visible subset only. |
| Wenlan visible-query non-brand | 48 impressions | Existing Searchfit classification; the `Other` group still includes noisy Wenlan misspellings. |
| Wenlan query visibility gap | 6 clicks, 303 impressions | Property totals minus visible query totals; not a non-brand estimate. |
| Legacy `useorigin.app` GSC property | 5 clicks, 516 impressions, 0.97% CTR, 16.7 average position | Migration diagnostic only; never added to the Wenlan Goal total. |
| Vercel raw | 1,420 visitors, 1,628 pageviews | Same rolling range; 580 visitors remain to the fixed 2,000 target. |
| Vercel direct | 270 visitors, 351 pageviews | Separate referrer row. |
| Vercel qualified-source aggregate | 1,152 visitors across separate search, AI, and GitHub referrer rows | Sum of per-referrer rows, not deduplicated people and not a source-to-page join. |
| Vercel `google.com` | 1,137 visitors, 1,256 pageviews | A referrer aggregate, not equivalent to GSC clicks. |
| GitHub | 47 total stars | Public REST observation; 53 remain to the fixed 100 target. |
| Umami / CTA | unavailable | No authenticated event read; no CTA ratio is reported. |

The Vercel `google.com` row remains much larger than the two GSC properties'
click totals. The legacy property proves that search visibility is still
split across domains, but it does not fully explain the Vercel attribution
gap. Without a reliable source-to-page join, server-log evidence, or an
authenticated Umami event export, no causal reconciliation is claimed.

## AI knowledge-base and wiki surfaces

GSC page rows and Vercel page rows remain separate:

| Surface | GSC clicks | GSC impressions | GSC average position | Vercel visitors | Vercel pageviews |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/learn/ai-work-memory-vs-knowledge-base` | 0 | 9 | 8.0 | 2 | 2 |
| `/learn/source-backed-wiki-pages-ai-work` | 0 | 4 | 3.3 | 5 | 5 |
| `/learn/distilled-wiki-pages-ai-memory` | 0 | 2 | 3.5 | 7 | 7 |
| `/learn/wenlan-vs-obsidian-ai-memory` | 0 | 4 | 4.5 | 4 | 4 |
| `/zh-TW/learn/distilled-wiki-pages-ai-memory` | no page row | no page row | no page row | 3 | 4 |
| `/zh-CN/learn/distilled-wiki-pages-ai-memory` | no page row | no page row | no page row | 2 | 3 |
| `/zh-TW/learn/source-backed-wiki-pages-ai-work` | 0 | 1 | 49.0 | 1 | 1 |
| `/zh-CN/learn/source-backed-wiki-pages-ai-work` | 0 | 1 | 1.0 | 2 | 3 |

The GSC range ends before the 2026-07-27 LLM-wiki implementation refresh, so
these rows are baselines, not post-change results. Page-average position is
not an exact-query rank.

## Migration and indexing actions

Read-only Search Console verification after the user's account actions showed:

- `useorigin.app` is currently moving to `wenlan.app`.
- The Change of Address start date is 2026-07-28.
- `https://wenlan.app/sitemap.xml` was submitted and read on 2026-07-28.
- Sitemap status is `Success`, with 113 discovered pages.
- Wenlan's current overview reports 102 indexed and 32 not-indexed pages.

With explicit user approval, URL Inspection confirmed that each selected URL
was already on Google and then returned `Indexing requested`:

1. `https://wenlan.app/learn/distilled-wiki-pages-ai-memory`
2. `https://wenlan.app/learn/source-backed-wiki-pages-ai-work`
3. `https://wenlan.app/learn/ai-work-memory-vs-knowledge-base`
4. `https://wenlan.app/zh-TW/learn/distilled-wiki-pages-ai-memory`

No GSC validation was submitted because there is no matching repaired
coverage issue awaiting validation. No request was sent for zh-CN because no
locale-specific evidence justified adding it to this indexing batch.

## Acquisition decision

The acquisition center is now AI knowledge bases and source-backed wiki
workflows:

- LLM wiki for AI agents;
- source-backed wiki pages;
- AI knowledge base architecture and maintenance;
- Obsidian and knowledge-base-adjacent workflows;
- Traditional Chinese coverage where locale-specific evidence exists.

`Memory` remains an enabling product capability and supporting vocabulary. It
does not, by itself, nominate the next acquisition page.

The next content decision is not a generic memory article. Re-run the
candidate gate around `AI knowledge base`, `LLM wiki`, `source-backed wiki`,
`knowledge base for AI agents`, and modifier-qualified Obsidian intent. First
refresh a current indexed page when it partly covers the winning intent;
create a net-new URL only when the clean coverage gap and maintained Wenlan
proof are both explicit.

### Obsidian query-language boundary

`Obsidian workflow` is a campaign category, not a verified search query. The
current authenticated GSC export contains no visible Obsidian query row. The
English Obsidian page has 4 impressions and average position 4.5, but that
page aggregate does not reveal the query that produced them.

The inspectable demand-discovery sources support a narrower tool-pair lane:

- The signed-in Taiwan Google Trends capture from 2026-07-18 recorded related
  rising queries `obsidian claude code` (+3,350%), `obsidian and claude`
  (+2,400%), and `obsidian claude` (+1,500%). These are Trends rising
  percentages, not search volume.
- Reddit threads use titles such as `Claude Code + Obsidian?`, `Connect
  Obsidian to Claude Code`, and `Claude Code and Obsidian as an AI-maintained
  second brain`. They describe direct vault access, `CLAUDE.md`, Markdown
  structure, current-editor context, and MCP bridges rather than an abstract
  “workflow” category.
- Current Obsidian community plugins and OSS surfaces use names such as
  `Claude Code IDE`, `MCP Server`, and `obsidian-claude-code-mcp`.

Therefore the only protected Obsidian discovery families are currently
`obsidian claude code`, `claude code obsidian`, `obsidian claude`, `obsidian
mcp`, and `obsidian claude code mcp`. Generic `obsidian`, `obsidian workflow`,
`obsidian knowledge base`, `markdown knowledge base`, and `obsidian ai
memory` remain discovery-only. Obsidian is an integration bridge into the
AI-knowledge-base story, not a peer acquisition center and not grounds for a
new URL without the complete candidate gate.

This is an advance-layout lane, not a wait-for-GSC rule. The Trends query
strings may nominate a refresh before Wenlan has a visible GSC query when
independent sources repeat the intent and the remaining candidate gates pass.
GSC then measures Wenlan's actual search exposure and indexing. The current
zh-TW page already applies that logic by leading with `Obsidian + Claude Code`
and covering `Obsidian MCP`; the English route still leads with the weaker
`Obsidian AI Memory` framing and is the cleaner existing-page refresh
candidate if the next experiment is approved.

After the Searchfit focus correction, the same authenticated inputs nominate
only two Top Actions: refresh the existing
`/learn/ai-work-memory-vs-knowledge-base` knowledge-base surface and sharpen
the `/learn` hub. Generic memory rows remain visible in the full query and
page queues but no longer appear as acquisition nominations. The visible
`llm wiki 2.0` row now maps to the existing distilled-wiki page instead of
`Other`; its single impression remains below the action threshold.

## Next read

Use the next authenticated weekly window to read all of the following
together:

1. Wenlan property totals, visible-query totals, and visibility gap.
2. Legacy `useorigin.app` property totals and its change from this migration
   baseline.
3. Vercel raw, direct, qualified-source, and per-surface page rows.
4. GitHub total stars.
5. Indexing and sitemap status.
6. Authenticated Umami events only if an export becomes available.

Do not call the migration successful from one early window. A healthy
direction is legacy impressions declining while Wenlan impressions increase,
with redirects, sitemap, canonical, and indexing checks remaining green.
