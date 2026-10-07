# 2026-10-07 Learn consolidation

Evidence snapshot for 7xuanlu/wenlan-site#220. This is not an `EXPERIMENTS.md`
record: the successor campaign ended at its 2026-09-21 deadline, and a new
campaign contract needs separate user approval.

## Why

The authenticated GSC export for `2026-09-09..2026-10-06` (kept in
`/tmp/wenlan-seo/2026-10-07-demand/`, not committed) showed 121 pages sharing
1,417 page impressions, with only 18 above 20 impressions. Five Learn pages
targeted "claude code memory" and two targeted "MCP memory server". With
almost no external authority, splitting one intent across several thin pages
spreads the little ranking signal and recrawl budget the site has.

## What changed

- 19 English Learn pages merged into the 10 pages that own each intent; the
  pairs live in `scripts/consolidated-learn-redirects.mjs`.
- Every former `/learn/<slug>`, `/guides/<slug>` and `/docs/guides/<slug>`
  URL answers with one 308 to its owner; legacy `origin-*` redirects point
  straight at owners. Sitemap: 173 to 154 URLs.
- Owner copy was reviewed against live SERPs, official Claude Code, Codex,
  Cursor and MCP docs, and the Wenlan main source. Fixes included the plugin
  marketplace (`7xuanlu/wenlan`), the absent "doctor" MCP tool, the Space
  Brief handoff model, Cursor's removed Memories, and AGENTS.md sharing
  between Codex and Claude Code.
- `/about`, `/docs` and `/links` no longer repeat the homepage title. The
  Learn index and footer link the Claude Code, Codex, shared-memory and MCP
  owners.
- The Wenlan READMEs link the owners directly (7xuanlu/wenlan#823).

## Baseline (GSC, `2026-09-09..2026-10-06`)

| Group | URLs with rows | Clicks | Page impressions |
|---|---|---|---|
| Property totals | — | 16 | 1,209 |
| 10 owner URLs | 6 | 0 | 107 |
| 19 merged URLs | 8 | 0 | 32 |
| Owners + merged | 14 | 0 | 139 |

Pages without rows are unavailable, not zero.

## Readouts

| When | Check |
|---|---|
| After deploy | `pnpm seo:technical:deployed`; every former URL returns one 308 to its owner; owners return 200 with self-canonicals; recrawl requested for the owners. |
| ~7 days | GSC page rows: owners appearing, merged URLs starting to drop. |
| 28 days | Owners together vs the 139-impression, 0-click baseline. Read as better if the owners exceed 139 impressions with at least 2 clicks; worse if they fall below 100 with no clicks. |
| ~8 weeks | Merged URLs no longer report page impressions. |

## Post-deploy receipt (2026-10-07, merge commit `dec3c10`)

- `pnpm seo:technical:deployed`: robots ok; sitemap locs 154; key pages 30;
  redirects 44; bridge host redirects 6; old URLs absent from sitemap; exit 0.
- Live sweep of `https://wenlan.app`: 71 sources (19 slugs under `/learn`,
  `/guides` and `/docs/guides`, plus 14 legacy `origin-*` URLs) each return
  one 308 to the expected owner, and the owner returns 200. All 10 owners
  return 200 with a self-canonical. No merged URL is in the sitemap. 0 failures.
- Live pages: `/learn/ai-work-memory` renders `id="what-to-capture"`; the
  zh-TW footer links the shared-memory owner; no `7xuanlu/claude-plugins`
  install line on the shared-memory page.
- IndexNow: the production build log shows 67 URLs submitted, response 200.
- Search Console recrawl requests: not yet made.

Repair immediately on a redirect chain or loop, a 404 for a former URL, an
owner canonical or sitemap error, or an owner fact contradicted by the Wenlan
source.
