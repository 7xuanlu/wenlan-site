# Stale AI Agent Memory Diagnostic — Prelaunch

**Experiment:** `EXP-2026-07-24-stale-ai-memory-diagnostic`

**Prepared:** `2026-07-24T21:31:52Z`

**Status:** live; production-verified; measuring

## Decision

Refresh the existing English
`/learn/review-before-trust-ai-memory` route into a practical diagnostic for
stale, contradictory, duplicated, or wrongly scoped AI-agent memory.

This is not a generic `AI memory` article and does not create a new URL. The
existing page already partially covers trust and contradictions, but its
abstract review framing does not answer the repeated problem-led question:
what should someone do when an agent confidently recalls obsolete or
conflicting context?

Keep `/docs/review-and-trust` as the exact product-reference surface. The Learn
page owns the standalone symptom-to-diagnosis flow and links to the docs.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: absent from the returned page export. No zero, position, or
  indexing status is inferred from absence.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target route: 1 visitor and 1 pageview.
- GitHub: 47 total stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

GSC, Vercel, and GitHub keep their native units. The page and referrer exports
cannot be joined, so this record makes no source-to-page session or causality
claim.

## Demand-discovery provenance

Captured at `2026-07-24T21:25:46Z`. These observations nominate the problem;
they are not authenticated GSC input or keyword volume.

Reddit's JSON endpoint returned HTTP 403. The native numbers below are the
search-result score snapshots visible at capture time, while each linked
HTML page returned HTTP 200:

| Source | Language / community | Observed date | Native snapshot |
| --- | --- | --- | ---: |
| [Agentic-memory failure modes](https://www.reddit.com/r/ClaudeCode/comments/1uhq1bd/i_mapped_alzheimers_research_to_agentic_memory/) | English / r/ClaudeCode | 2026-06-28 | +39 score |
| [Memory is broken at trust, not storage](https://www.reddit.com/r/ClaudeAI/comments/1saig5f/ai_agent_memory_is_broken_not_the_storage_part/) | English / r/ClaudeAI | 2026-04-02 | +0 score |
| [Accumulated memory can make agents worse](https://www.reddit.com/r/ClaudeCode/comments/1t776gn/claude_codes_memory_system_can_actually_make_ai/) | English / r/ClaudeCode | 2026-05-08 | +2 score |
| [Claude Code memory staleness](https://www.reddit.com/r/AI_Agents/comments/1t3n7pb/claude_code_memory_staleness/) | English / r/AI_Agents | 2026-05-04 | +1 score |
| [Forgetting is the hard part](https://www.reddit.com/r/ClaudeCode/comments/1u4ntd5/what_i_learned_building_a_memory_system_for_my/) | English / r/ClaudeCode | 2026-06-13 | +2 score |

[NousResearch/hermes-agent issue #10771](https://github.com/NousResearch/hermes-agent/issues/10771)
was also read through the GitHub API at the capture timestamp. Its native
state was open, 9 comments, and 5 reactions; it was created
`2026-04-16T05:20:31Z` and updated `2026-07-19T11:13:41Z`. It independently
reports stale relative dates, contradictory entries, duplicates, obsolete
notes, and memory rot.

Current SERP observations also exposed multiple 2026 pages about stale or
contradictory agent memory. They confirm an active problem vocabulary but
carry no volume estimate and are not used as a metric.

## Candidate gate

1. **Inspectable provenance:** every external observation above preserves its
   URL, capture timestamp, language/community, observed date, and native
   score, comment, or reaction unit.
2. **Repeated or high-intent problem:** stale, contradictory, duplicated, and
   obsolete agent memory repeats across five Reddit discussions and one
   independently maintained OSS issue.
3. **Coverage decision:** Wenlan already has a partial English trust page, so
   refresh that route instead of creating a duplicate article.
4. **Maintained proof:** Wenlan `origin/main` commit
   `93451bf0ef58399e08400e3b4ac613942adcfec8`, version `0.14.1`, documents
   `/recall`, read-only `/lint deep`, `/curate revisions`, correction and
   supersession behavior, and destructive `/forget`.
5. **Standalone utility:** the page gives a product-independent diagnostic:
   reproduce the bad recall, verify current source and scope, distinguish a
   changed fact from mixed context, preserve the correction, and delete only
   records that should not remain.

## Non-overlap

- The Claude Code memory cohort explains native-memory boundaries and
  cross-session preservation.
- The MCP cohort exposes a shared-memory workflow across clients.
- `/docs/review-and-trust` remains the Wenlan command and tool reference.
- This experiment answers the different failure-mode query: how to diagnose
  and correct stale or contradictory agent memory.

No Mandarin route is added. The fresh evidence is English, and the current
Mandarin demand record does not establish a matching locale-specific cluster.

## Bounded change

- Replace the abstract title and metadata with modifier-qualified stale-memory
  diagnostic intent.
- Add a concrete reproduce → recall → source/scope verification → read-only
  lint → correction/revision review → repeat-recall flow.
- State that plain `/lint` and `/lint deep` are read-only.
- State that `/forget` is destructive and cannot be undone.
- Link to maintained Wenlan docs plus the current curate, lint, and forget
  workflow sources.
- Keep the URL, canonical, sitemap membership, locale availability, Article
  and BreadcrumbList schema types, and bottom CTA unchanged.
- Add no `FAQPage` JSON-LD and no external distribution.

## Predeclared readouts

- Minimum exposure: 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 target-page GSC click or average
  position of 20.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks
  and average position worse than 30.0.
- Inconclusive: fewer than 5 impressions, or 0 clicks with average position
  from 20.1 through 30.0 after minimum exposure.
- Technical stop: invalid maintained proof, intent overlap, or any canonical,
  indexing, robots, noindex, schema, sitemap, locale, or rendered-layout
  regression.
- 24h: technical and rendered production proof only; no SEO-success judgment.
- 7d, W2, W4, W8: report available source-native evidence and apply the
  predeclared minimum-exposure guard without moving thresholds.

## Local verification

- Focused article contract: RED against the prior abstract trust page, then
  GREEN after the diagnostic refresh.
- Render follow-up: the first 393×852 render exposed an internally scrolling
  command block at 435px content width inside 337px. A second RED-to-GREEN
  pass shortened only the example placeholders and warning line; the final
  block is 337px content width inside 337px.
- `pnpm test:seo`: 176 passed, 0 failed, using explicit Wenlan and wenlan-app
  checkout roots.
- `pnpm test:i18n`: 53 passed, 0 failed.
- `pnpm lint`: passed.
- `pnpm seo:goal:check`: passed with seven active experiments and exactly one
  production-in-flight experiment.
- `pnpm build`: passed with 209 static pages; local postbuild skipped
  IndexNow. One intermediate retry failed only while fetching all three
  Google Font families; the immediate clean retry succeeded.
- `pnpm seo:technical:built`: passed with 109 sitemap URLs, 26 redirects,
  seven noindex headers, 14 checked HTML pages, and no `FAQPage` across 113
  built HTML files.
- `I18N_CHECK_BASE_URL=http://127.0.0.1:3023 pnpm
  i18n:technical:built`: 19 expected direct-200 routes and five expected
  hard-404 routes passed.
- The unchanged production baseline passed `pnpm seo:technical:deployed`:
  robots, 109 sitemap URLs, 14 key pages, six utility noindex headers,
  sitemap-wide `FAQPage` absence, 25 redirects, six bridge-host redirects,
  and legacy exclusions.
- Final 1280×720 and 393×852 renders exposed the exact title, H1, canonical,
  `index, follow`, four maintained sources, Article and BreadcrumbList
  JSON-LD, and no `FAQPage`, framework overlay, browser warning, or browser
  error. Document, H1, and final command-block widths fit their viewports.
- Render evidence:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-stale-ai-memory-diagnostic/`.
- Independent final review: `SHIP` with no P0–P2 findings. The reviewer
  independently reran the Goal verifier, 176 SEO tests, 53 i18n tests,
  TypeScript lint, the focused article contract, `git diff --check`, and fresh
  desktop/mobile overflow inspection.

## Approval boundary

The user explicitly approved this bounded website refresh, Git push, PR,
merge, and production deployment in the current Codex task on `2026-07-24`.
Reddit or other external publication, OSS submission, paid acquisition,
request indexing, GSC validation, and metric-definition changes remain
outside that approval.

## Production publication and verification

- PR #69 merged at `2026-07-24T23:07:44Z` as
  `ee9694d40771a6477bf9b7c294f1ec45f7dd7c69`.
- Vercel production completed at `2026-07-24T23:08:30Z`.
- The deployed technical audit passed robots, 109 sitemap URLs, 14 key pages,
  six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects,
  six bridge-host redirects, and legacy-URL exclusions.
- The deployed i18n smoke passed 19 expected direct-200 routes and five
  expected hard-404 routes.
- The live English route retained its exact canonical, `index, follow`,
  Article and BreadcrumbList JSON-LD, `dateModified` `2026-07-24`, and four
  maintained source links, with no `FAQPage`.
- Desktop 1280×720 and mobile 393×852 production renders had no framework
  overlay, console warning, console error, or document, H1, or command-block
  overflow. Mobile document and command widths were `387/387` and `337/337`.
- Production render evidence:
  `/tmp/wenlan-seo/visual-qa/2026-07-24-stale-ai-memory-production/`.
- No SEO-success judgment is made at production completion. The 24-hour
  technical/evidence readout is due after `2026-07-25T23:08:30Z`.
