# Obsidian + Claude Code Existing-Page Refresh — Prelaunch

**Experiment:** `EXP-2026-07-29-obsidian-claude-code-refresh`

**Prepared:** `2026-07-29`

**Status:** active local preparation; not published

## Decision

Refresh the existing English
`/learn/wenlan-vs-obsidian-ai-memory` route. Do not create another Obsidian
URL and do not change the already-live zh-TW article.

The current English page already has Search Console exposure, but its title
and metadata lead with the weak, unverified phrase `Obsidian AI Memory`.
Inspectable demand-discovery sources instead repeat a concrete tool-pair
question: how Claude Code should work with an Obsidian vault, when direct file
access is enough, and when an IDE bridge or MCP server adds something useful.

Obsidian remains an ecosystem bridge into Wenlan's AI-knowledge-base story,
not a separate acquisition center. The refresh must answer the integration
question before introducing Wenlan's maintained, source-backed knowledge
lifecycle.

## Authenticated baseline

Source: Search Console API for `sc-domain:wenlan.app` and Vercel Web Analytics,
complete days `2026-06-28..2026-07-25`, preserved under
`/tmp/wenlan-seo-2026-07-28`.

| Metric | Native value |
| --- | ---: |
| GSC property clicks | 8 |
| GSC property impressions | 395 |
| GSC visible-query clicks | 2 |
| GSC visible-query impressions | 92 |
| GSC query visibility gap | 6 clicks; 303 impressions |
| Target-page clicks | 0 |
| Target-page impressions | 4 |
| Target page-average position | 4.5 |
| Visible Obsidian query rows | none |
| Vercel property visitors | 1,420 |
| Vercel property pageviews | 1,628 |
| Target-page Vercel visitors | 4 |
| Target-page Vercel pageviews | 4 |
| GitHub total stars | 47 |

The four target-page impressions are privacy-hidden at query level.
Page-average position `4.5` is not the page's rank for any exact Obsidian
query. GSC property totals, visible-query totals, query visibility gap,
target-page data, Vercel observations, and GitHub stars remain separate.
Authenticated Umami events are unavailable, so no source-to-page session or
CTA baseline is inferred.

## Demand-discovery provenance

### Google Trends

The signed-in official Explore capture from `2026-07-18` recorded Taiwan
related rising queries:

| Query | Geography | Period | Native observation |
| --- | --- | --- | ---: |
| `obsidian claude code` | Taiwan | capture request documented in the Trends audit | +3,350% |
| `obsidian and claude` | Taiwan | capture request documented in the Trends audit | +2,400% |
| `obsidian claude` | Taiwan | capture request documented in the Trends audit | +1,500% |

These are request-relative rising-query percentages, not search volume. The
captured-at value, request URLs, raw `0–100` indices, and interpretation are
preserved in
`docs/seo-audits/2026-07-18-trends-demand-discovery.md`.

### Repeated community and SERP wording

Current inspectable Reddit titles include:

- [Claude Code and Obsidian as an AI-maintained second brain](https://www.reddit.com/r/ClaudeAI/comments/1uwrxbo/claude_code_and_obsidian_as_an_aimaintained/)
- [Connect Obsidian to Claude Code](https://www.reddit.com/r/ObsidianMD/comments/1rz89qh/connect_obsidian_to_claude_code/)
- [Claude Code + Obsidian?](https://www.reddit.com/r/ClaudeAI/comments/1skw2vb/claude_code_obsidian/)

Fixed English SERP observations on `2026-07-29` used:

- `https://www.google.com/search?q=obsidian+claude+code&hl=en&gl=us&pws=0`
- `https://www.google.com/search?q=claude+code+obsidian&hl=en&gl=us&pws=0`
- `https://www.google.com/search?q=obsidian+claude+code+mcp&hl=en&gl=us&pws=0`

The inspected results repeatedly returned direct vault access, Claude Code
IDE, MCP, plugin, and setup surfaces. Wenlan was not present in the inspected
result set. This is a time-bound SERP observation, not GSC input, a durable
rank tracker, or keyword volume.

### Maintained OSS surfaces

Read-only GitHub REST observations captured on `2026-07-29`:

| Repository | Native observation | Capability boundary |
| --- | --- | --- |
| [Roasbeef/obsidian-claude-code](https://github.com/Roasbeef/obsidian-claude-code) | 209 stars; 28 forks; 13 open issues; last push `2026-01-28T16:30:35Z`; unarchived | Embeds Claude through the Claude Agent SDK, with vault file tools and Obsidian-specific actions. |
| [petersolopov/obsidian-claude-ide](https://github.com/petersolopov/obsidian-claude-ide) | 84 stars; 6 forks; 0 open issues; last push `2026-06-04T14:38:50Z`; unarchived | Shares the active file and selection with Claude Code; direct file reads and edits remain filesystem operations. |
| [iansinnott/obsidian-claude-code-mcp](https://github.com/iansinnott/obsidian-claude-code-mcp) | 326 stars; 52 forks; 19 open issues; last push `2025-06-27T01:35:19Z`; unarchived | Adds an MCP/IDE bridge for vault file operations, workspace context, and more than one supported client. |

Stars, forks, issues, and dates stay in their native GitHub units. They prove
inspectable implementation shapes, not Google demand or Wenlan traffic.

## Candidate gate

1. **Inspectable provenance:** authenticated GSC and Vercel ranges, the
   committed Trends capture, exact Reddit/SERP/OSS URLs, capture date,
   geography or language, and native units are recorded.
2. **Repeated or high-intent problem:** Trends, Reddit, current SERPs, and
   three independent OSS implementations repeat Claude Code plus Obsidian,
   editor context, and MCP intent.
3. **Clean coverage gap:** Wenlan already has one indexed English canonical
   with four impressions. It partly covers the integration, but its title and
   first answer are organized around unsupported `Obsidian AI Memory`
   wording. Refreshing it is cleaner than adding a competing URL.
4. **Maintained Wenlan proof:** the current Wenlan README documents read-only
   Obsidian source sync, readable Markdown Pages, source-backed distillation,
   revisions, `/brief`, `/recall`, `/capture`, `/handoff`, and `/distill`.
5. **Standalone utility:** a smallest-layer decision—direct files, editor
   context, MCP, then durable knowledge maintenance—is useful even when the
   reader never installs Wenlan.

## Bounded change

Keep:

- `/learn/wenlan-vs-obsidian-ai-memory`, its canonical, sitemap entry, and
  locale behavior;
- the original `datePublished: "2026-06-06"`;
- Article and BreadcrumbList schema;
- visible FAQs without `FAQPage` JSON-LD;
- the existing CTA destination;
- zh-TW and unsupported zh-CN behavior unchanged.

Refresh:

- H1, title metadata, description, keyword variants, and
  `dateModified: "2026-07-29"`;
- the quick answer around direct filesystem access, editor context, and MCP;
- a standalone smallest-layer decision path;
- the boundary between vault access and a maintained AI knowledge base;
- maintained Obsidian/Claude Code OSS references and current Wenlan proof;
- comparison rows and FAQs without claiming that a bridge alone provides
  provenance, review, refresh, or cross-client lifecycle semantics.

Do not add a new URL, Mandarin translation, copied MCP configuration,
programmatic page, source-free comparison, invented keyword volume, indexing
request, external post, analytics event, or metric change.

## Predeclared readout

- Publish date: not published.
- Index date: existing indexed page; exact initial index date unavailable.
- Visible qualified query cluster, reported only when joined to the target:
  `obsidian claude code`, `claude code obsidian`, `obsidian claude`,
  `obsidian mcp`, and `obsidian claude code mcp`.
- Minimum exposure: 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 12 GSC target-page impressions or
  at least 1 target-page click. Page-average position and visible joined
  queries remain separate and are not substituted for exact-query rank.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks,
  fewer than 8 target-page impressions, and page-average position worse than
  20.0.
- Inconclusive: below minimum exposure, or any result between the success and
  failure conditions.
- Technical stop: unsupported integration claim; stale or missing first-party
  source; accidental zh-TW copy change; or any new canonical, indexing,
  robots, noindex, structured-data, sitemap, locale, publication-date,
  FAQ-policy, source-link, or rendered-layout regression.
- 24h: verify exact production commit, direct 200, canonical, indexability,
  Article and BreadcrumbList dates, visible decision layers, maintained
  sources, locale non-regression, sitemap membership, FAQPage absence, and
  desktop/mobile rendering. Do not infer SEO success.
- 7d: reuse the latest authenticated weekly range and report GSC property,
  visible-query, visibility-gap, target-page, joined qualified-query,
  Vercel, authenticated Umami when available, and GitHub observations
  separately.
- W2: apply the same source-native split and inspect target-page plus joined
  qualified-query exposure only after enough complete post-deploy days.
- W4: apply the frozen success, failure, or inconclusive condition.
- W8: retain a post-campaign readout only if it remains useful; do not move
  the Goal's fixed final window.

## Approval boundary

Local preparation and verification are authorized by the approved Goal
contract. At `2026-07-29T06:04:29Z`, the user approved commit, Git push, PR
creation, merge, automatic Vercel deployment, and read-only production
verification of this exact locally verified scope. Request indexing, GSC
validation, Reddit or other external publication, OSS submission, paid
acquisition, synthetic analytics events, account mutation, and
metric-definition changes remain unapproved.

## Local verification

- The focused Obsidian acquisition contract failed against the previous
  memory-first title and passed after the refresh.
- `pnpm seo:goal:check` passes.
- `pnpm test:seo` passes 196 tests with the Wenlan and wenlan-app source roots
  supplied.
- `pnpm test:i18n` passes 55 tests.
- `pnpm lint` passes.
- `pnpm build` completes with 214 static pages.
- `pnpm seo:technical:built` passes 26 redirects, seven noindex headers,
  113 sitemap locations, 17 required URLs, and 117 built HTML pages without
  `FAQPage`.
- The local production locale matrix passes 22 direct-200 routes and five
  expected 404 routes.
- The rendered Article contract preserves the exact canonical,
  `datePublished: "2026-06-06"`, `dateModified: "2026-07-29"`, Article and
  BreadcrumbList schema, and visible FAQs without `FAQPage`.
- Fresh production-build QA at 1440 by 1100 and 393 by 852 CSS pixels covers
  the hero, quick answer, integration decision, comparison, CTA, maintained
  references, related pages, FAQs, and footer. The document and H1 do not
  overflow; the comparison table's horizontal scrolling remains contained;
  no browser warning or error was observed.
- The inline design-system and functional-integrity pass and the separate
  responsive visual-precision pass both passed. Production was used only as
  a geometry reference because the persisted production and local theme
  states differed.
- `git diff --check` passes.

The experiment is locally verified and publication-approved. Request indexing
and GSC validation remain separately gated.
