# Homepage acquisition-link restoration prelaunch

Date: 2026-08-01
Status: production-verified
Controller: Wenlan exposure Goal

## Decision

Restore direct homepage links to the existing localized LLM Wiki and
source-backed AI knowledge-base guides. Keep the Download and GitHub calls to
action unchanged. Treat this as a technical information-architecture
correction, not a new article or a new search experiment.

## Evidence

- Authenticated GSC for `sc-domain:wenlan.app`, 2026-07-03 through
  2026-07-30: 10 property clicks and 660 property impressions. These property
  totals remain separate from visible query rows.
- The visible query `llm wiki 2.0` had 1 impression, 0 clicks, and average
  position 13 on `/zh-TW`. The configured target is the localized LLM Wiki
  guide, so this is a query-to-page mismatch rather than target-page evidence.
- Same-range Vercel observations remain separate: 1,468 visitors and 1,745
  pageviews. The English LLM Wiki guide had 11 visitors, the English
  source-backed guide had 9, and each Mandarin LLM Wiki guide had 6. These
  page observations are not joined to GSC queries or referrers.
- The latest Friday action queue explicitly nominated a read-only audit of the
  zh-TW homepage, Learn hub, localized guide availability, titles, and
  contextual internal links.
- Source audit found `home.content.hero.metaLinks` in all three dictionaries,
  but `src/app/_pages/home.tsx` did not render the field after the homepage
  redesign. The deployed English, zh-TW, and zh-CN homepages therefore had no
  direct link to either core guide; visitors and crawlers had to go through the
  Learn hub.
- A fresh production contrast at `2026-08-01T07:28:06Z` returned HTTP 200 for
  `/`, `/zh-TW`, and `/zh-CN`, but none of the three HTML responses contained
  either localized guide href. This confirmed that the defect was still live
  before deployment and that the local candidate had not leaked into
  production.
- English, zh-TW, and zh-CN versions of both target guides already exist with
  canonical URLs, reciprocal locale support, sitemap membership, Article and
  BreadcrumbList schema, and maintained first-party sources. No new URL or
  unsupported translation is needed.

## Production internal-link inventory

A deterministic crawl at `2026-08-01T07:30:41Z` fetched all 113 canonical
sitemap pages without a failure and counted rendered anchor hrefs to the six
localized core-guide targets. A matching crawl of the local production build
at `2026-08-01T07:32:20Z` fetched the same 113 routes without a failure.

| Target | Production link occurrences | Production non-self sources | Local candidate link occurrences | Local candidate non-self sources |
| --- | ---: | ---: | ---: | ---: |
| English LLM Wiki | 20 | 7 | 21 | 8 |
| English AI knowledge base | 14 | 7 | 15 | 8 |
| zh-TW LLM Wiki | 12 | 3 | 13 | 4 |
| zh-TW AI knowledge base | 12 | 3 | 13 | 4 |
| zh-CN LLM Wiki | 11 | 2 | 12 | 3 |
| zh-CN AI knowledge base | 11 | 2 | 12 | 3 |

The candidate adds exactly one new non-self source and one rendered occurrence
to every target: its same-locale homepage. It does not alter any other inbound
source. English already has seven contextual source pages per guide; zh-TW has
three, and zh-CN has two. The Mandarin graph is thinner, but neither guide is
orphaned, and this inventory does not justify inventing another article or
stacking unrelated internal links. Raw crawl output remains outside git at
`/private/tmp/wenlan-production-internal-links.json` and
`/private/tmp/wenlan-local-internal-links.json`.

## Candidate gate

1. Provenance: pass. GSC, Vercel, deployed HTML, repository source, and the
   Friday audit are inspectable and retain their original units.
2. Repeated or high-intent problem: pass for bounded inspection. One visible
   exact query is low volume, but it independently exposes the homepage route
   mismatch and matches the campaign's frozen LLM Wiki and AI knowledge-base
   priority.
3. Clean coverage gap: pass. Content exists; the missing element is direct
   homepage navigation. Refreshing the existing surface is preferred over a
   new article.
4. Maintained Wenlan proof: pass. Both target guides are source-backed and
   have working localized routes.
5. Standalone utility: pass. The links lead to implementation and verification
   guides that are useful without requiring a product conversion.

## Bounded change

- Render a low-density navigation row after the hero and before the Download
  section.
- Link directly to the localized LLM Wiki guide and localized source-backed AI
  knowledge-base guide in English, zh-TW, and zh-CN.
- Replace the unused homepage `Claude Code memory` and `MCP server` dictionary
  entries with the acquisition-center guide pair. Those workflow pages remain
  reachable through Learn and are not deleted.
- Track clicks with the existing bounded `learn_article_click` event and a new
  `home-acquisition` placement. No analytics payload field or metric
  definition changes.
- Preserve homepage Download and GitHub CTA labels, routes, placement events,
  hero composition, URL structure, canonical, sitemap, schema, and FAQ policy.

## Measurement boundary

This technical correction reached production at `2026-08-01T14:19:53Z`; it
does not start a separate search experiment. The direct-link render is its
technical success condition. Continue
reporting each target page's GSC impressions and clicks separately by locale,
plus Vercel target-page observations and authenticated Umami
`home-acquisition` clicks when available. Do not infer source-to-page sessions
or attribute a target-page change to the link row alone.

This correction adds inbound exposure to the currently measuring zh-TW LLM
Wiki page. Its production time is recorded explicitly so the existing
experiment readout does not claim clean content-only attribution.

## Prelaunch verification

- Goal verifier: pass before the change.
- RED render contract: confirmed that none of the three homepages rendered the
  required direct links before implementation.
- GREEN render contract and i18n: `pnpm test:i18n` passed 58 of 58 tests.
- TypeScript: `pnpm lint` passed.
- SEO contract: `pnpm test:seo` passed 205 of 205 tests with the current Wenlan
  and wenlan-app repositories supplied explicitly.
- Production build: `pnpm build` passed and emitted 214 pages. The postbuild
  IndexNow step correctly skipped because `VERCEL_ENV` was unset.
- Built technical SEO: `pnpm seo:technical:built` passed its global 404,
  redirects, noindex headers, sitemap, robots, required pages, FAQ schema, and
  legacy-URL checks.
- Built locale routes: `I18N_CHECK_BASE_URL=http://127.0.0.1:3011 pnpm
  i18n:technical:built` passed 22 expected 200 routes and 5 expected 404
  routes.
- Performance boundary: the change adds two existing localized link
  components and no dependency, script, media, animation, or new client
  boundary. Lighthouse is not installed in this worktree or the bundled
  workspace runtime, so no Lighthouse score is claimed.
- At `2026-08-01T14:05:56Z`, the user explicitly approved publishing this
  exact homepage acquisition-links scope. The approval covers commit, push,
  PR, merge, automatic Vercel deployment, and read-only production
  verification. It does not cover request indexing, GSC validation, another
  website change, or another external publication.

## Rendered visual QA

### Pass A: implementation fidelity

- Coverage: English, zh-TW, and zh-CN at 1440-pixel desktop and 393-pixel
  mobile widths, in dark and light themes.
- The new row appears directly after the hero and before Download, with exactly
  the two localized targets. The existing Download and GitHub buttons retain
  their labels, hierarchy, routes, and placement.
- All six rendered viewports had `scrollWidth` equal to `clientWidth`; no
  horizontal overflow, clipped link, or off-canvas content was found.
- At 393 pixels both links remain readable on one line in every locale. CJK
  hero copy keeps natural line breaks with no one-character orphan, tofu,
  baseline clipping, or collision.
- Every destination route also passed the built locale 200-route check. No new
  loading state, interaction, animation, or accessibility-sensitive control
  was introduced.

Pass A verdict: PASS.

### Pass B: design quality

- The row uses the existing muted editorial navigation language rather than a
  new card, pill, or competing CTA. It remains visually subordinate to
  Download and GitHub while exposing the acquisition guides without requiring
  a Learn-hub detour.
- Desktop spacing preserves the existing hero-to-download rhythm; mobile
  spacing separates the two links from both the hero CTAs and the next content
  block.
- Baseline image comparisons report 77-78 similarity on desktop and 84-86 on
  mobile. Inspection attributes the differences to the existing animated hero
  state, the intentional new link row, and its expected downstream shift; no
  unexpected alpha, overflow, or unrelated layout change was found.

Pass B verdict: PASS.

Synthesized prelaunch verdict: GOOD. The candidate subsequently passed the
production checks below.

## Production verification

- PR #106 merged at `2026-08-01T14:19:05Z` as
  `c8ae3c82a281464bc29966785d77bf670bc439cc` after the Vercel preview gate
  passed.
- Vercel marked the main-branch production deployment complete at
  `2026-08-01T14:19:53Z`.
- English, zh-TW, and zh-CN homepages each returned direct HTTP 200 and
  rendered both exact localized guide hrefs and labels.
- `pnpm seo:technical:deployed` passed robots, 113 sitemap URLs, 17 key pages,
  six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects,
  six bridge-host redirects, and old-URL sitemap exclusion.
- The post-deploy rendered-anchor crawl at `2026-08-01T14:22:36Z` fetched all
  113 sitemap pages without a failure. It confirmed 8 non-self sources for
  each English guide, 4 for each zh-TW guide, and 3 for each zh-CN guide,
  exactly matching the predeclared one-source increase.
- No indexing request, GSC validation, analytics mutation, or unrelated
  external publication was performed. Production integrity is verified; SEO
  lift, clicks, conversion, star attribution, and causality remain unclaimed.
