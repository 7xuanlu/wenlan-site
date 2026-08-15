# MCP knowledge-base server coverage gate — 2026-08-13

## Decision

Refresh the existing indexed English `/learn/mcp-memory-server` owner around
`MCP knowledge base server`. Keep the URL and its existing memory-server
language as a secondary comparison. Do not create a second English URL or add
zh-TW and zh-CN routes in this round.

The page already has impressions and a recent successful Google crawl, but its
title and first answer only describe generic persistent memory. Current MCP
documentation, maintained packages, independent implementations, and user
discussions repeatedly use MCP as the route into a queryable knowledge base.
Wenlan can answer that task with source-backed memories, maintained pages,
citations, refresh, review, and supported MCP client setup.

## Candidate gate

1. **Inspectable provenance.** The observations below preserve their URLs,
   capture date, language, geography when known, and displayed native unit.
   They nominate a page refresh only; none is GSC or keyword volume.
2. **Repeated problem.** Official MCP concepts, two maintained knowledge-base
   implementations, current integration documentation, and independent Reddit
   discussions repeat the need to query shared documents or standards through
   MCP from several AI clients.
3. **Clean coverage action.** Wenlan already owns
   `/learn/mcp-memory-server`, and authenticated GSC reports 24 impressions for
   it. Refreshing that URL is cleaner than adding a competing MCP
   knowledge-base page.
4. **Maintained Wenlan proof.** Wenlan `v0.15.8` documents a source-backed
   knowledge base, memories with provenance, maintained Pages, citations,
   refresh and review, local MCP, Streamable HTTP MCP, plugins, and
   `wenlan connect <client>` setup.
5. **Standalone utility.** The page explains the difference between an MCP
   memory server and knowledge base, the minimum server contract, local versus
   hosted operation, and a vendor-neutral validation loop.

## Source-native baseline

- Range: the 28 complete dates `2026-07-16..2026-08-12`.
- GSC property totals: 8 clicks and 958 impressions.
- Visible-query totals: 3 clicks and 208 impressions.
- Query visibility gap: 5 clicks and 750 impressions.
- Target page: 0 clicks, 24 impressions, and page-average position 7.2.
- The only privacy-visible target joins are `site:useorigin.app` with 4
  impressions and `wenlan web3 charge` with 2 impressions. They do not prove
  MCP knowledge-base intent; the other 18 target impressions are hidden and
  their intent is not inferred.
- Read-only URL Inspection: `PASS`, submitted and indexed, successful fetch,
  indexing allowed, sitemap discovery, exact Google and user canonicals, and
  last crawl `2026-08-10T00:37:43Z`.
- Vercel separately reports 293 target visitors and 296 pageviews. Its
  `google.com` source-to-target row reports 285 visitors and 287 pageviews,
  but that pattern is preserved as a possibly automated or referrer-
  incompatible observation, not human search traffic or a causal path.
- GitHub reports 47 stars. Umami is unavailable/account-gated.

## Evidence provenance

| Source | URL | Captured | Language / geography | Native unit retained | What it contributes |
| --- | --- | --- | --- | --- | --- |
| MCP server concepts | https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts | 2026-08-13 | English / global | documentation text | Servers expose tools, resources, and prompts; resources can include knowledge bases. |
| `mcp-kb` on PyPI | https://pypi.org/project/mcp-kb/ | 2026-08-13 | English / global | version `0.4.5`, release `2025-10-28` | A maintained package explicitly named MCP Knowledge Base Server for local Markdown search and file operations. |
| Basic Memory Claude Code integration | https://docs.basicmemory.com/integrations/claude-code/ | 2026-08-13 | English / global | documentation text | A persistent knowledge base exposed through MCP across coding clients and Obsidian. |
| Docsie MCP knowledge base | https://www.docsie.io/solutions/mcp-knowledge-base/ | 2026-08-13 | English / global | public solution text | Connects a documentation knowledge base to Claude, Cursor, and other MCP clients. |
| Cartographer Reddit post | https://www.reddit.com/r/ClaudeCode/comments/1v3sxzq/i_built_an_mcp_server_that_syncs_knowledge_skills/ | 2026-08-13 | English / unspecified | displayed `+1`; posted about three weeks earlier | Shared standards and knowledge across Claude Code, Codex CLI, Kiro, and OpenCode, with lint and Git-backed review. |
| Knowledge-base MCP Reddit post | https://www.reddit.com/r/ClaudeAI/comments/1tad08r/heres_how_i_expose_my_knowledge_as_a_wiki_and_an/ | 2026-08-13 | English / unspecified | displayed `+2`; posted about three months earlier | URL, PDF, and Notion sources synchronized into a wiki and exposed through MCP for query and write paths. |
| Shared team knowledge Reddit post | https://www.reddit.com/r/mcp/comments/1s3of3x/i_built_a_shared_knowledge_base_so_your_whole/ | 2026-08-13 | English / unspecified | displayed `+1`; posted about four months earlier | A central knowledge base for coding standards queried over MCP. |

Simplified-Chinese and Traditional-Chinese searches did not produce equally
strong, exact, inspectable `MCP knowledge base server` evidence or a locale-
specific GSC target row. They remain demand-discovery lanes, but translating
this refresh now would outrun the evidence.

## Bounded change

- Keep the existing URL, canonical, sitemap membership, Article and
  BreadcrumbList schema, `datePublished: 2026-06-07`, and English-only locale
  behavior. Move only `dateModified` to `2026-08-13`.
- Change the H1, description, metadata, keywords, first answer, section
  headings, FAQ, related paths, and CTA to make `MCP knowledge base server`
  primary while preserving `MCP memory server` as a direct comparison.
- Explain the minimum useful contract: query path, sources, citations or
  source IDs, freshness, explicit writes, and stale-knowledge review.
- Add a four-step validation loop covering tool discovery, one harmless source,
  citation inspection, source refresh, and cross-client retrieval.
- Make no unsupported benchmark, hosted-service, security, endorsement,
  automatic codebase-indexing, or universal-client claim.

## Readout contract

- Minimum exposure: 15 GSC target-page impressions after a confirmed
  post-deploy Google crawl.
- Success: after both guards, at least 1 target-page click or at least 5
  privacy-visible qualified impressions for `MCP knowledge base server`, `MCP
  knowledge server`, or a tool-qualified MCP knowledge-base query on the
  intended canonical, with all technical floors green.
- Failure: after 28 complete post-deploy days and both guards, 0 target clicks
  and no qualified visible query reaches 5 impressions, or a technical,
  source, product-truth, or rendered regression appears.
- Otherwise: inconclusive.
- Stop: another controller edits this canonical, product truth changes, or the
  page implies MCP itself supplies provenance or freshness without the
  knowledge-base implementation.
- Readouts: 24h, 7d, W2, W4, and W8. Keep GSC property totals, visible-query
  totals, visibility gap, target row, joined qualified queries, Vercel, Umami,
  GitHub, and crawl evidence in separate native units.

This refresh supersedes the older July MCP shared-memory copy on the same
canonical. Observations after the new production boundary must not be
attributed to that older copy.

## Approval boundary

Local preparation and deterministic/rendered verification may proceed under
the approved Goal contract. Commit, push, PR creation, merge, deployment,
request indexing, GSC validation, external publication, paid action, synthetic
events, analytics mutation, and metric-definition changes remain separately
gated.

## Local verification

- RED control: the focused article contract failed against the prior page
  because the knowledge-base H1, server contract, comparison, and validation
  loop were absent. After the bounded refresh, both the new knowledge-base
  contract and the existing Cursor plus Claude Code shared-memory contract
  pass.
- `pnpm test:seo` passes 224/224 with the sibling Wenlan and wenlan-app roots
  supplied. `pnpm lint`, `pnpm seo:goal:check`, and `git diff --check` pass.
- `pnpm build` passes and generates all 223 static pages. The non-production
  postbuild correctly skips IndexNow.
- `pnpm seo:technical:built` passes the global 404, 26 redirects, seven
  noindex headers, 120 sitemap URLs, 24 required canonicals and HTML checks,
  robots, `FAQPage` absence across 124 built HTML pages, and old-URL sitemap
  exclusion.
- Fresh local production rendering passes at exact 393 x 852 and 1440 x 1000
  CSS viewports. The complete 8,477 px mobile page and 4,897 px desktop page
  were inspected through overlapping viewport captures after confirming each
  requested scroll position. The document and body scroll widths equal their
  client widths; the H1 and code block remain inside the viewport; all seven
  sections, CTA, table of contents, maintained references, related routes,
  FAQ, and footer are readable; no image is broken; and the browser reports no
  warning or error.
- All three FAQ rows expand on mobile and expose the intended complete answer.
  The page retains Article and BreadcrumbList schema and emits no `FAQPage`.
- The automated image diff used the old production page only as a structural
  baseline. Browser screenshots are lossy JPEG captures converted to PNG, and
  the candidate intentionally changes nearly every text region, so the script
  reports a full-frame difference despite matching dimensions and intact
  alpha. Direct viewport inspection and DOM bounds are the applicable visual
  evidence; the numeric diff is not treated as a fidelity score.
- Visual QA pass A: PASS. The change uses the existing typed article model,
  renderer, tokens, responsive layout, links, and FAQ interaction; it adds no
  mock-only or image-backed UI.
- Visual QA pass B: PASS. Fresh mobile and desktop captures show no clipping,
  awkward heading orphan, code overflow, missing content, or unintended layout
  regression. CJK precision is not applicable because this evidence-backed
  round intentionally changes no Mandarin route.

The candidate is locally ready. No commit, push, PR, merge, deployment,
indexing request, validation, external publication, analytics mutation, or
synthetic event has occurred.

## 2026-08-15 Friday-evidence reassessment

The completed `2026-08-14` weekly report covers the 28 complete dates
`2026-07-17..2026-08-13`. It reports 8 GSC property clicks and 951 property
impressions, 3 visible-query clicks and 208 visible-query impressions, and a
5-click plus 743-impression visibility gap. The target remains at 0 clicks,
24 impressions, and page-average position 7.2. The report's deterministic
page queue says `wait`, and its only visible MCP-memory query has 2
impressions on `/learn`, not this target. This does not prove exact MCP
knowledge-base demand, and the hidden target queries remain uninterpreted.

Vercel separately reports 240 target visitors and 243 pageviews, including a
`google.com` source-to-target aggregate of 232 visitors and 234 pageviews.
The previously identified referrer/device anomaly still applies, so these
rows are retained as raw traffic observations rather than confirmed human
search sessions or evidence for the query hypothesis.

Decision: keep the candidate eligible as an external-evidence-backed refresh
of an existing indexed page, not as a GSC-derived exact-query action. The
official protocol boundary, maintained implementations, independent user
problems, clean existing-page owner, maintained Wenlan proof, and standalone
validation loop still satisfy the full campaign candidate gate. The latest
weekly evidence strengthens the zero-click snippet problem but does not
justify a second URL or Mandarin translations. Publication remains separately
approval-gated.

## Publication-date regression guard

The current production HTML emits `datePublished: 2026-06-07`. A fresh local
build initially exposed that changing only `updatedAt` would rewrite both
`datePublished` and `dateModified` to `2026-08-13`. The focused guard failed
before the correction. The candidate now pins `publishedAt: 2026-06-07` and
keeps `updatedAt: 2026-08-13`; the focused contract and compiled HTML must
prove those exact separate dates before publication.
