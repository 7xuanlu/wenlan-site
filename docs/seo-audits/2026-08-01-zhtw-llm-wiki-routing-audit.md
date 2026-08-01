# zh-TW LLM Wiki Routing Audit — 2026-08-01

## Decision

Refresh the existing Traditional Chinese LLM Wiki article before considering
another URL. The observed mismatch is not a canonical, hreflang, sitemap, or
indexability defect. It is a localized content-and-routing gap: the zh-TW
homepage currently captures the visible `llm wiki 2.0` query, while the
localized article is an older, narrower version of the English and zh-CN
implementation guide.

Do not infer demand volume, exact-query rank beyond the observed GSC row, or
causality from this audit.

## Authenticated GSC evidence

- Property: `sc-domain:wenlan.app`.
- Range: `2026-07-03..2026-07-30`.
- Captured from Search Console API on `2026-07-31`.
- Property totals: 10 clicks and 660 impressions.
- Visible-query totals: 2 clicks and 111 impressions.
- Query visibility gap: 8 clicks and 549 impressions.
- Exact visible query-page row: `llm wiki 2.0` ->
  `https://wenlan.app/zh-TW`, 1 impression, 0 clicks, CTR 0, position 13.
- zh-TW homepage page row: 9 impressions, 1 click, CTR 11.11%, page-average
  position 5.9.
- No page row for
  `/zh-TW/learn/distilled-wiki-pages-ai-memory` is present in the export. This
  is an absent privacy-visible row, not proof of zero impressions.
- Provenance: `/tmp/wenlan-seo/gsc-metadata.json`,
  `/tmp/wenlan-seo/gsc-query-pages.json`, and
  `/tmp/wenlan-seo/gsc-pages.csv`.

## Live and source audit

The deployed technical audit passed robots, 113 sitemap URLs, 17 key pages,
six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects, six
bridge-host redirects, and legacy exclusions.

Live metadata and routing:

- `/zh-TW` is self-canonical and has reciprocal `en-US`, `zh-TW`, `zh-CN`,
  and `x-default` alternates. Its title is
  `Wenlan 文瀾 | AI 工作的 LLM wiki`.
- `/zh-TW/learn` is self-canonical, has reciprocal locale alternates, and
  visibly links to `/zh-TW/learn/distilled-wiki-pages-ai-memory`.
- `/zh-TW/learn/distilled-wiki-pages-ai-memory` is self-canonical, has the
  expected reciprocal alternates, and remains indexable.
- The current redesigned zh-TW homepage renders zero visible links to the
  localized LLM Wiki article. The content model still contains a hero
  `metaLinks` entry, but the current homepage renderer does not render that
  field.

Localized coverage comparison:

- The zh-TW article title is
  `AI 工作的 LLM wiki：Wenlan 的有來源頁面` and its last recorded update is
  `2026-07-04`.
- It has four concept sections and no maintained Karpathy or LLM Wiki v2
  reference.
- The English and zh-CN versions already answer architecture, RAG and Obsidian
  boundaries, setup, verification, failure modes, and when an LLM Wiki is not
  needed. They cite the maintained Karpathy LLM Wiki explanation and the LLM
  Wiki v2 proposal.

## Candidate gate

1. **Inspectable provenance:** pass. The authenticated query-page row, range,
   geography implied by the served locale, raw GSC units, live routes, and
   source files are preserved above.
2. **Repeated or high intent:** pass by clear high intent. The exact query
   names the LLM Wiki 2.0 concept; maintained Karpathy and v2 sources establish
   the task. The single GSC impression is not treated as volume.
3. **Clean coverage gap:** pass. A localized URL already exists, but it lacks
   the implementation and v2 material already maintained in English and
   zh-CN. Refresh the existing route; do not create another URL.
4. **Wenlan proof:** pass. Wenlan can demonstrate the answer through its
   maintained source/page model plus `/brief`, `/recall`, `/capture`,
   `/handoff`, `/distill`, and `/pages` workflow.
5. **Standalone utility:** pass. Architecture, RAG/Obsidian boundaries,
   verification, failure repair, and the decision not to use an LLM Wiki are
   useful without installing Wenlan.

## Minimum bounded experiment

- Refresh only the existing zh-TW article; preserve its URL, original
  `datePublished: 2026-07-04`, locale availability, canonical, sitemap,
  hreflang, Article and BreadcrumbList schema, and visible FAQ without
  `FAQPage` JSON-LD.
- Align the article with the maintained English and zh-CN architecture,
  workflow, verification, and source coverage in idiomatic Traditional
  Chinese. Make Karpathy and LLM Wiki v2 visible in maintained references.
- Do not add a new URL or rewrite the zh-TW homepage from one impression.
- Treat a visible homepage-to-article link as a separate UI/internal-link
  candidate. The current audit establishes its absence but does not authorize
  a new homepage layout decision.

## Verification floor

- Focused i18n and SEO contract tests for title, metadata, seven guide
  sections, six-command workflow, maintained references, stable publication
  date, and no `FAQPage`.
- `pnpm seo:goal:check`, `pnpm test:seo`, `pnpm lint`, `pnpm build`,
  `pnpm seo:technical:built`, locale-route checks, and fresh zh-TW desktop and
  mobile render inspection before any publish request.
- No push, PR, merge, deploy, repeat indexing request, GSC validation, or
  external publication is included in local preparation.

## Local preparation result

The bounded refresh is complete locally and remains unpublished. It preserves
the existing route and `datePublished: 2026-07-04`, sets
`dateModified: 2026-08-01`, and adds the seven intended guide sections, the
visible six-command workflow, four visible FAQ answers without `FAQPage`
JSON-LD, and maintained Wenlan, Karpathy, and LLM Wiki v2 sources.

Verification completed on 2026-08-01:

- `pnpm seo:goal:check`: pass.
- `pnpm test:seo`: 202 of 202 pass.
- `pnpm test:i18n`: 57 of 57 pass.
- `pnpm lint`: pass.
- `pnpm build`: pass; 214 static pages generated and production-only IndexNow
  submission skipped.
- `pnpm seo:technical:built`: pass; 26 redirects, seven noindex routes, 113
  sitemap URLs, 17 required locations and HTML files, `FAQPage` absent from
  117 built pages, and legacy URLs absent.
- Built locale-route check: 22 expected `200` routes and five expected `404`
  routes pass.
- Visual QA: pass at `393x852` and `1440x1100` across the zh-TW home, download,
  and refreshed article plus the zh-CN About page. Computed heading stacks use
  Fraunces for supported Latin glyphs and PingFang TC/SC for Chinese glyphs.
  Each document keeps `clientWidth === scrollWidth`; no browser console or page
  errors were observed. The 10-capture evidence bundle is
  `/private/tmp/wenlan-cjk-sans-heading-visual-qa-2026-08-01/evidence.json`.

The final typography stack follows the desktop App's native-fallback model:
Fraunces remains the Latin display face and Instrument Sans the Latin body face,
while Chinese glyphs in both headings and body copy use the surrounding native
sans interface stack: PingFang TC/SC on macOS, with script-appropriate Microsoft
and Noto fallbacks on Windows and Linux. A self-hosted four-family Noto CJK
trial was rejected after production QA showed
429 font files, 21 MB of build media, and roughly 2.6–4.1 MB of font resources
on a sampled Chinese page. The final build returns to 14 font files and 480 KB
of media, with no self-hosted CJK download.

Publication remains the next approval boundary. No post-change GSC result is
claimed from this local preparation.
