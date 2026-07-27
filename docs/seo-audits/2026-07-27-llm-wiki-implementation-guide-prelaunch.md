# LLM Wiki Implementation Guide Refresh — Prelaunch

**Experiment:** `EXP-2026-07-27-llm-wiki-implementation-guide-refresh`

**Prepared:** `2026-07-27`

**Status:** locally verified; publication approved; not yet published

## Decision

Refresh the existing indexed English
`/learn/distilled-wiki-pages-ai-memory` route. Do not create another LLM-wiki
URL.

The current page explains Wenlan's Source/Memory/Page model, but the corrected
query-to-page evidence and a fixed US SERP check do not support treating it as
an already-ranking category page. The replacement must earn the intent by
being independently useful: define the architecture, give a runnable protocol,
show observable success checks, explain recurring failure modes, and distinguish
an LLM wiki from RAG, Obsidian, and agent memory.

## Authenticated baseline

Source: Search Console API for `sc-domain:wenlan.app`, complete days
`2026-06-27..2026-07-24`, fetched under `/tmp/wenlan-seo`.

| Metric | Native value |
| --- | ---: |
| GSC property clicks | 7 |
| GSC property impressions | 329 |
| GSC visible-query clicks | 1 |
| GSC visible-query impressions | 81 |
| GSC query visibility gap | 6 clicks; 248 impressions |
| Target-page clicks | 0 |
| Target-page impressions | 2 |
| Target page-average position | 3.5 |
| Known qualified query-to-target impressions | 0 |
| Vercel property visitors | 1,406 |
| Vercel property pageviews | 1,612 |
| GitHub total stars | 47 |

Both target-page impressions are privacy-hidden at query level. The only
visible `llm wiki 2.0` query row has 0 clicks, 1 impression, and average
position 13.0, and the authenticated join maps it to
`https://wenlan.app/zh-TW`. It does not map to the target article.

Position 3.5 is therefore a two-impression page aggregate, not the target's
rank for `llm wiki`. GSC property totals, visible-query totals, visibility
gap, target-page data, and joined query rows remain separate. Vercel, GitHub,
and any later Umami observations also remain in their native units; no
source-to-page sessions or causal relationship is inferred.

## SERP observation

- Query: `llm wiki`
- URL:
  `https://www.google.com/search?q=llm+wiki&hl=en&gl=us&pws=0`
- Locale: English; geography fixed to United States
- Captured: `2026-07-27`
- Native unit: first rendered result page
- Observation: Wenlan was not present on the rendered first page. Visible
  result types included Karpathy's note, explanatory articles, an LLM-wiki
  product site, Reddit discussions, videos, and GitHub/OSS surfaces.

This is a diagnostic SERP observation, not GSC input, a durable rank tracker,
or keyword volume.

## Demand and failure-mode evidence

The committed signed-in Google Trends evidence remains request-relative
`0–100` demand discovery and is not repeated or converted here:
`docs/seo-audits/2026-07-18-trends-demand-discovery.md`.

Inspectable English sources captured on `2026-07-27`:

- [Karpathy's LLM-wiki note](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
  describes the maintained personal-wiki direction.
- [Rohitg00's LLM Wiki v2 proposal](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
  makes freshness, citations, and maintenance explicit.
- [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) is an inspectable OSS
  implementation surface.
- [How many of you are running an LLM wiki with Claude?](https://www.reddit.com/r/ClaudeAI/comments/1v4rdiv/how_many_of_you_are_running_an_llm_wiki_with/)
  asks for a practical protocol and discusses index growth, truncation,
  knowledge decay, stale links, and contradictions.
- [Karpathy's LLM wiki setup](https://www.reddit.com/r/ObsidianMD/comments/1uai1w2/karpathys_llm_wiki_setup/)
  tests the boundary between an Obsidian vault, AI organization, MCP access,
  and a human-owned source of truth.
- [Claude Code cross-session wiki plugin](https://www.reddit.com/r/ClaudeCode/comments/1sh4kot/i_built_a_claude_code_plugin_that_gives_it/)
  demonstrates the blank-session problem and a small index plus on-demand
  topic pages.
- [Local Obsidian LLM-wiki plugin](https://www.reddit.com/r/ObsidianMD/comments/1shntdn/new_plugin_llm_wiki_turn_your_vault_into_a/)
  combines local models, source links, hybrid search, and generated pages.
- [LLM-wiki research-on-miss workflow](https://www.reddit.com/r/ClaudeCode/comments/1shqjbp/llmwiki_a_claude_code_plugin_that_builds_a/)
  combines citations, freshness, Obsidian, MCP, and Git.
- [Readwise LLM-wiki use cases](https://www.reddit.com/r/readwise/comments/1t2g9ty/karpathys_llm_wiki_idea_got_me_thinking_what/)
  asks for connections, old-material resurfacing, contradictions, changing
  views, and maintained topic pages.

Each Reddit or OSS item is one inspectable observation. No score, comment
count, repository star count, or imagined keyword volume is used as GSC
evidence.

## Candidate gate

1. **Inspectable provenance:** authenticated GSC query/page exports, the fixed
   SERP request, committed Trends provenance, exact external URLs, capture
   date, locale, and native units are recorded.
2. **Repeated or high-intent problem:** independent LLM-wiki, Obsidian, Claude
   Code, and Readwise discussions repeat setup, on-demand loading, freshness,
   contradiction, and cross-session problems.
3. **Clean coverage gap:** Wenlan already has the indexed canonical URL. It
   partly covers the category but lacks a complete protocol, observable
   acceptance checks, repair guide, and neutral adjacent-system boundaries.
   Refreshing it is cleaner than creating a competing page.
4. **Maintained proof:** Wenlan `v0.15.0` and its maintained README document
   Sources, Memories, Pages, `/brief`, `/recall`, `/capture`, `/handoff`,
   `/distill`, `/pages`, citations, stale state, revisions, local Markdown,
   MCP, and human review:
   [tagged source](https://github.com/7xuanlu/wenlan/tree/v0.15.0).
5. **Standalone utility:** the definition, architecture, protocol, success
   checks, failure repairs, and neutral comparisons are useful without a
   Wenlan install.

## Bounded change

Keep:

- the canonical URL and `2026-06-24` original publication date;
- English-only locale availability;
- sitemap and hreflang behavior;
- Article and BreadcrumbList schemas;
- visible FAQ text without `FAQPage` JSON-LD;
- the existing CTA destination.

Refresh:

- H1, description, title metadata, keyword variants, modification date, and
  reading time;
- generic LLM-wiki definition and four-plane architecture;
- a six-command five-minute protocol:
  `/brief`, `/recall`, `/capture`, `/handoff`, `/distill`, `/pages`;
- observable acceptance checks and a source-to-memory-to-page evidence trail;
- repairs for context bloat, index truncation, stale links, contradictions,
  human-owned edits, full-vault loading, and cross-session blank starts;
- neutral boundaries among LLM wiki, RAG, Obsidian, agent memory, plain
  folders, and MCP/daemon-backed workflows;
- first-party Wenlan mapping only after the generic answer.

Add contextual inbound links from the existing English MCP memory server,
Claude Code memory, AI-agent-memory types, AI-work-memory versus knowledge
base, and Obsidian comparison pages. Retain the previously prepared related
links inside this same experiment rather than publishing them separately.

Do not add a new URL, Mandarin translation, programmatic page, source-free
comparison, invented search volume, indexing request, external publication,
or analytics event.

## Predeclared readout

- Publish date: not published.
- Index date: existing indexed page; exact initial index date unavailable.
- Visible qualified query cluster, reported only when joined to the target:
  `llm wiki`, `llm wiki for ai agents`, `karpathy llm wiki`,
  `llm wiki claude code`, `llm wiki obsidian`, and `llm wiki vs rag`.
- Minimum exposure: 20 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 GSC target-page click or at
  least 40 target-page impressions. Page-average position and visible joined
  queries are reported separately and are not substituted for exact-query
  rank.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks,
  fewer than 40 impressions, and page-average position worse than 20.0.
- Inconclusive: below minimum exposure, or any result between the success and
  failure conditions.
- Technical stop: invalid first-party command or lifecycle proof; broken
  contextual link; or any new canonical, indexing, robots, noindex,
  structured-data, sitemap, locale, publication-date, FAQ-policy, or rendered
  regression.
- 24h: technical and render verification only; no SEO-success judgment.
- 7d: GSC latency, target-page native units, joined visible-query rows when
  available, Vercel target presence, Umami CTA data when authenticated, and
  GitHub stars separately.
- W2: apply the exposure guard and inspect whether the generic answer earns
  relevant joined queries without collapsing LLM wiki into generic AI notes
  or enterprise knowledge-base intent.
- W4: evaluate the frozen success, failure, or inconclusive condition.
- W8: retain a post-campaign readout only if it remains useful.

## Approval boundary

The user approved local correction and verification. At
`2026-07-27T05:26:43Z`, the user approved commit, Git push, ready PR creation,
merge, the existing automatic Vercel deployment triggered by merge, and
read-only production verification. Request indexing, GSC validation, Reddit
or other external publication, OSS submission, paid acquisition, synthetic
analytics events, and metric changes remain unapproved.

## Local verification

Contract and build:

- the focused LLM-wiki acquisition contract failed against the previous H1
  and page shape, then passed after the implementation-guide refresh;
- `pnpm seo:goal:check`: passed after the link-only experiment was recorded as
  a terminal `stopped` readout and this refresh became the sole production
  preparation;
- `pnpm test:seo`: 189 passed, 0 failed;
- `pnpm test:i18n`: 53 passed, 0 failed;
- `pnpm lint`: passed;
- `pnpm build`: passed with 211 static pages; local postbuild skipped
  IndexNow;
- `pnpm seo:technical:built`: passed with 110 sitemap URLs, 26 redirects,
  seven noindex headers, 14 checked HTML pages, and no `FAQPage` across 114
  built HTML files;
- `pnpm i18n:technical:built`: passed against the isolated production server
  with 19 expected HTTP 200 routes and five expected hard 404 routes.

Fresh rendered evidence is under
`/private/tmp/wenlan-llm-wiki-visual-qa-2026-07-27/`.

The complete affected set contains six English routes at desktop and mobile
breakpoints plus the existing zh-TW and zh-CN target routes at the mobile
breakpoint: 14 full-page captures in total. A fifteenth settled-state capture
records the first visible FAQ opened. The browser viewport capability was
configured at `1440x1000` and `393x852`; the connected Chrome surface reported
CSS viewports of `1152x800` and `314x681`, so the mobile pass exercised a
narrower layout than the nominal 393 CSS-pixel target.

Objective rendered checks:

- all 14 routes returned the expected page with exact self-canonical and
  `index, follow`;
- every English page retained Article and BreadcrumbList JSON-LD; the target
  emitted `datePublished: 2026-06-24` and `dateModified: 2026-07-27`;
- the target emitted reciprocal `en-US`, `zh-TW`, `zh-CN`, and `x-default`
  alternates and no `FAQPage`;
- all pages had `documentElement.scrollWidth <= innerWidth`; every H1 had
  `scrollWidth == clientWidth`; the narrower mobile pass returned no element
  with visible horizontal overflow;
- no target-page or source-page browser warning or error was observed;
- each of the five contextual links resolved uniquely in the live DOM and a
  real click navigated to the exact English target canonical;
- the visible `What is an LLM wiki?` FAQ opened at the narrow mobile
  breakpoint and exposed its complete answer.

Two-pass inline visual review:

- **Pass A — design-system and functional integrity: PASS, high confidence.**
  The change uses the shared Learn article renderer, existing semantic
  sections, code blocks, links, FAQ controls, typography, cards, and color
  tokens. It adds no raster mock, ad-hoc layout primitive, or unrelated
  motion. All five new navigation paths and the FAQ interaction work.
- **Pass B — visual and text precision: PASS, high confidence.** Direct
  inspection of every fresh full-page capture and the FAQ close-up found no
  clipping, collision, broken link wrapping, document overflow, H1 overflow,
  tofu, or awkward one-character CJK orphan. The English guide remains
  readable at the narrower mobile viewport, and the unchanged zh-TW and zh-CN
  surfaces retain natural wrapping.

There is no concrete screenshot or Figma reference packet for this content
refresh, so pixel-diff similarity and hotspot fields are not applicable. The
fresh DOM metrics, full-page captures, interaction receipts, and direct visual
inspection are the rendered evidence.
