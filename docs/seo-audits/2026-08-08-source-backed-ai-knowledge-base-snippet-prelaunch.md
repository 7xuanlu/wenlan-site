# Source-Backed AI Knowledge-Base Snippet Refresh — Prelaunch

## Decision

Refresh the existing indexed English
`/learn/source-backed-wiki-pages-ai-work` page. Do not create a new URL and do
not change the zh-TW or zh-CN counterparts.

The authenticated `2026-07-10..2026-08-06` Search Console range gives this
page 0 clicks, 8 impressions, 0.00% CTR, and page-average position 9.5. The
deterministic August 7 weekly report ranks it first among protected
AI-knowledge-base and wiki title/meta actions. Only 3 of its impressions are
visible in the query-page join, all from the brand/entity query
`wenlan technology`; the privacy-hidden remainder is not assigned an invented
query.

## Candidate gate

1. Provenance: authenticated GSC and Vercel exports for
   `2026-07-10..2026-08-06` are preserved under `/tmp/wenlan-seo`; the weekly
   report fingerprint is
   `sha256:b8ad7c6846309a4887031bf375c5949b513af1ff7583817b3d72aef333b5da87`.
   The earlier AI-knowledge-base and source-backed-wiki demand captures retain
   inspectable Trends, community, OSS, and maintained-source provenance in
   the existing audit records.
2. Repetition or intent: the protected AI-knowledge-base and source-backed
   wiki family already passed the July 30 candidate gate. The new evidence is
   page-level search exposure without a click, not a new keyword-volume claim.
3. Coverage gap: the page already owns this intent, so the action is a bounded
   snippet and first-answer refresh rather than another canonical.
4. Maintained proof: the existing page retains Wenlan's real Sources,
   atomic-knowledge, Pages, `/capture`, `/distill`, `/pages`, `/lint`, and
   `/curate` workflow plus maintained first-party references.
5. Standalone utility: the answer explains how to build and verify a
   source-backed AI knowledge base even without choosing Wenlan.

The gate passes for this English existing-page refresh only. It does not
establish an exact target query, keyword volume, or Mandarin demand.

## Native-unit baseline

- GSC property totals: 8 clicks and 874 impressions.
- GSC visible-query totals: 2 clicks and 172 impressions.
- GSC query visibility gap: 6 clicks and 702 impressions.
- Target page: 0 clicks, 8 impressions, 0.00% CTR, page-average position 9.5.
- Visible query-page evidence on the target: `wenlan technology`, 0 clicks,
  3 impressions, query-average position 1.0. This is brand/entity evidence,
  not the protected acquisition query.
- Vercel raw totals: 1,387 visitors and 1,666 pageviews.
- Vercel direct: 231 visitors and 383 pageviews.
- Vercel qualified-source allowlist: non-deduplicated row sum of 1,157
  visitors and 1,280 pageviews.
- Vercel target page: 5 visitors and 5 pageviews; no authenticated
  source-to-page row exists for the target.
- Unique acquisition-surface visitors: unavailable.
- Authenticated Umami: unavailable.
- Last separate GitHub REST observation: 47 total stars.

Every source remains in its native unit. No source-to-page session, exact
hidden query, conversion, star attribution, or causality is inferred.

## Search-surface freshness observation

At `2026-08-09T01:45:51Z`, a read-only public web-search observation for the
exact target URL and Wenlan's AI-knowledge-base/LLM-wiki phrases did not
surface the source-backed target page. The observed Learn-hub search result
still used the older `Wenlan Learn: AI Work Memory Guides for Claude Code,
Cursor, MCP` title and memory-first extract. A direct fetch of current
production separately returned the newer Learn title `LLM Wiki & AI Knowledge
Base Guides | Wenlan` and its knowledge-base-first answer, while the live
source-backed target correctly remained on the pre-experiment title because
this local change has not been deployed.

This is a public search-surface freshness diagnostic only. It is not an
authenticated Google result, GSC indexing state, exact rank, keyword volume,
or proof that a crawler has or has not processed a URL. It supports treating
search-result propagation as delayed or partial and reinforces the declared
post-deploy exposure guard; it does not change the experiment baseline or
authorize an indexing request.

### Authenticated GSC crawl reconciliation

Authenticated Search Console URL Inspection at `2026-08-09T01:54:04Z`
confirms the target is on Google, indexed, fetched successfully as Googlebot
smartphone, indexing-allowed, discovered through the sitemap, and using the
exact inspected canonical. Its last crawl is still
`2026-07-29T01:09:32Z` (`Jul 28, 2026, 6:09:32 PM` in the account UI).

The stored crawled HTML proves Google still holds the pre-July-30 page:

- title: `Source-Backed Wiki Pages for AI Work | Wenlan`;
- description: `Wenlan distilled pages store source memory IDs and keep
  revision state so AI work memory becomes readable without losing
  provenance.`;
- `dateModified: 2026-06-06`;
- the old four-section memory-to-page answer and old `0.15.0` site release
  schema.

Google has therefore not fetched either the July 30 production knowledge-base
refresh or the locally prepared August 8 snippet. The prior approved indexing
request did not produce a newer recorded crawl. No request was repeated in
this inspection.

This changes the attribution guard before publication: the proposed final
page remains the correct growth candidate, but a later click cannot be
attributed to the August 8 snippet alone because Google's next fetch would
also absorb the unseen July 30 refresh. Treat the intervention as the final
consolidated AI-knowledge-base framing on this canonical. Keep the original
10-impression threshold, but require a confirmed post-deploy Google crawl
before assessing success or failure; pre-crawl or mixed observations remain
inconclusive.

## Current production inbound-link floor

A deterministic rendered-anchor crawl at `2026-08-09T01:47:25Z` fetched all
120 production sitemap URLs without a failure. The English target receives 12
rendered link occurrences from 10 distinct non-self canonical sources:

- the homepage and Learn hub;
- the English LLM-wiki, AI-agent-memory-types, persistent-context,
  tool-selection, document-build, Obsidian, provenance, and review articles.

The anchor inventory includes `AI knowledge base guide`, `AI knowledge base
for agents`, `Inspect the source-backed page model`, and eight occurrences of
the full current article title. This is a source-native internal-link count,
not GSC impressions or link authority. It proves the target is not orphaned
and does not support stacking another internal-link edit before the snippet
readout. The current bottleneck is better tested by the bounded title/meta and
first-answer refresh already prepared.

## Authenticated site-wide indexing floor

The GSC Page indexing report observed at `2026-08-09T01:56:00Z` reports 116
indexed URLs and 30 not indexed. The submitted sitemap was last read on
2026-08-02 with `Success` and 120 discovered pages. The 30 exclusions break
down into 21 redirect URLs, one intentional `noindex` feed, one
tracking-parameter homepage alternate with a proper canonical, four
discovered-but-not-indexed URLs, and three crawled-but-not-indexed Open Graph
image URLs.

The four pages without a recorded crawl are `/docs/daily-workflow`,
`/docs/product-matrix`, `/docs/roadmap`, and `/zh-TW/download`. They should be
tracked, but they do not establish a broad failure of the English acquisition
cluster. Combined with the target-specific inspection, the evidence says the
site is generally indexable while Google's copy of the changed English target
is stale. This snapshot is not a performance metric or causal result, and no
validation or indexing request was submitted.

## Change contract

- Keep the exact canonical URL and `datePublished: 2026-06-06`.
- Set `dateModified: 2026-08-08`.
- Change only the English H1, page description, meta title, meta description,
  and quick answer to lead with the user's build job.
- Preserve the six-command implementation loop, maintained sources, related
  canonical owners, indexability, sitemap and hreflang membership, Article
  and BreadcrumbList schema, visible FAQ, and absence of `FAQPage`.
- Do not change zh-TW or zh-CN.

## Readout contract

- Minimum exposure: 10 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Attribution guard: a confirmed post-deploy Google crawl must exist before
  success or failure is assessed. A mixed or pre-crawl window is
  inconclusive even if it contains 10 page impressions.
- Success: after the crawl and minimum-exposure guards, the target earns at
  least 1 GSC click and the technical and content floor remains green. This
  supports the final consolidated page, not an isolated August 8 copy-causal
  claim.
- Failure: after 28 complete post-deploy days and minimum exposure, the target
  has a confirmed post-deploy crawl and still has 0 clicks, or the refresh
  creates a technical, source-accuracy, locale, schema, or rendered-layout
  regression.
- Otherwise: inconclusive.
- Stop for a controller-overlap edit to the same canonical or any canonical,
  indexability, schema-date, maintained-source, FAQ-policy, or render
  regression.

At 24 hours, verify publication integrity only. At 7 days, W2, W4, and W8,
keep property totals, visible-query totals, the visibility gap, the target
page row, visible joined queries, Vercel aggregates, Umami, and GitHub stars
separate. Never infer an exact hidden query from the page aggregate.

## Approval boundary

At `2026-08-09T15:18:19Z`, the user explicitly approved commit, push, PR
creation, merge, automatic Vercel deployment, and read-only production
verification for this exact English existing-canonical refresh. Request
indexing, GSC validation, external publication, paid action, synthetic
events, analytics mutation, and metric-definition changes remain excluded.

## Local publication verification

The isolated publication branch passed the deterministic Goal verifier,
focused acquisition contract, TypeScript check, production build, built-output
technical audit, and diff hygiene. The full SEO suite passed 219 of 222 tests;
the three failures are the existing public-release drift from the site's
`0.15.3` copy to the newer Wenlan source release and are outside this page
experiment.

Fresh production-versus-candidate captures are preserved under
`/tmp/wenlan-seo/evidence/2026-08-09-source-backed-snippet-prepublish/` at
`393x852` and `1440x1200`, with a separate mobile Quick answer capture. The
candidate uses the unchanged shared Learn renderer and design tokens. Both
inline visual QA passes returned PASS: the mobile and desktop H1, description,
Article Packet, and Quick answer remain inside their content bounds without
horizontal overflow, clipping, missing glyphs, or an unrelated layout change.
The image-diff hotspots are confined to the intended hero and Quick answer
copy plus their downstream vertical displacement.
