# AI Coding Agent Context Loss — Prelaunch

**Experiment:** `EXP-2026-07-25-context-loss-diagnostic-refresh`

**Prepared:** `2026-07-25T01:58:34Z`

**Status:** locally verified; website publication approved

## Decision

Refresh the existing English
`/learn/ai-coding-agent-loses-context` route as a practical diagnostic that
separates four recovery jobs:

1. resume the exact saved conversation;
2. load persistent project instructions or native client memory;
3. write a compact handoff for current project state;
4. keep durable decisions, lessons, and maintained knowledge behind a shared
   memory boundary when multiple sessions or clients need them.

The H1 and URL remain stable. This is an existing-page refresh, not a new
article or a claim that every context problem requires Wenlan.

## Authenticated baseline

Date range: `2026-06-26..2026-07-23`.

- GSC property: 7 clicks, 310 impressions, 2.26% CTR, average position 13.0.
- GSC visible-query table: 1 click, 75 impressions, 1.33% CTR, average
  position 17.8.
- GSC query visibility gap: 6 clicks and 235 impressions.
- GSC target page: 0 clicks, 2 impressions, 0.00% CTR, average position 9.5.
- Same-range query-plus-page response: no visible row for the target, leaving
  a 2-impression target page-query visibility gap. No hidden query is guessed.
- Vercel property: 1,402 visitors and 1,593 pageviews.
- Vercel target route: 1 visitor and 1 pageview.
- GitHub: 47 total Wenlan stars.
- Umami and Vercel custom CTA events: unavailable or account-gated.

Every value retains its source-native unit. The separate GSC and Vercel
tables cannot be joined, so this record makes no source-to-page session or
causal claim.

## Demand-discovery provenance

The following direct English observations were captured at
`2026-07-25T01:58:34Z`. Reddit scores are public search-result snapshots;
GitHub comments and reactions are mutable issue snapshots. None is keyword
volume or authenticated GSC input.

| Source | Source date | Native snapshot | Repeated problem |
| --- | --- | ---: | --- |
| [How do you handle context loss between Claude Code sessions?](https://www.reddit.com/r/ClaudeAI/comments/1qn64j4/how_do_you_handle_context_loss_between_claude/) | 2026-01-26 | +8 score | Re-explaining project state, decisions, and rationale after each session |
| [How do you handle project context across Claude Code sessions?](https://www.reddit.com/r/ClaudeCode/comments/1tu579r/how_do_you_handle_project_context_across_claude/) | 2026-06-01 | +8 score | Whether a new session understands architecture and project conventions |
| [anthropics/claude-code#27298](https://github.com/anthropics/claude-code/issues/27298) | 2026-02-21 | 24 comments; 2 reactions; closed | Cross-session context versus bloated always-loaded project memory |
| [anthropics/claude-code#34556](https://github.com/anthropics/claude-code/issues/34556) | 2026-03-15 | 61 comments; 5 reactions; open | Durable context across repeated compactions and multiple projects |

The committed Google Trends two-query request for `AI agent memory` and
`agent memory` supports the broader English category only. Its 53 weekly
request-relative `0–100` rows remain in
`docs/seo-audits/data/2026-07-25-ai-agent-memory-trends.csv`; the index is
not search volume and is not used as an exact context-loss query claim.

Maintained Claude Code documentation supplies the current native boundary:

- [How Claude remembers your project](https://code.claude.com/docs/en/memory)
  states that each session begins with a fresh context and distinguishes
  CLAUDE.md project instructions from auto memory.
- [Manage sessions](https://code.claude.com/docs/en/sessions) documents
  `--continue`, `--resume`, `/resume`, saved conversation history, and
  compaction controls.

Maintained Wenlan sources supply the durable-workflow proof:

- `plugin-contract.json` in the tagged/current Wenlan source exposes
  user-invocable `brief`, `capture`, `recall`, and `handoff` skills.
- [Wenlan daily workflow](https://wenlan.app/docs/daily-workflow) documents the
  same start, capture, recall, and close loop.
- [Wenlan capture quality](https://wenlan.app/docs/capture-quality) defines
  what should survive the current chat and what should remain in source files.

## Candidate gate

1. **Inspectable provenance:** GSC, Vercel, Reddit, GitHub, Claude Code docs,
   and Wenlan sources retain URLs, dates or capture time, locale, and native
   units.
2. **Repeated or high-intent problem:** two independent Reddit questions and
   two independently authored Anthropic issues repeat session-start,
   compaction, project-state, and memory-bloat failures.
3. **Clean existing-page job:** this route owns diagnosis. The Claude Code
   memory page owns native capability and setup; the session-handoff page owns
   the handoff procedure; the persistent-project-context page owns the context
   packet; the AI-agent-memory-types page owns the cognitive taxonomy.
4. **Maintained proof:** current Claude Code docs support resume, project
   instructions, and native memory; current Wenlan source and docs support the
   durable continuity loop. The refresh does not claim that Wenlan replaces
   native session recovery.
5. **Standalone utility:** the symptom-to-recovery diagnosis remains useful
   without installing Wenlan because it first routes users to resume or
   project instructions when those are the correct fix.

## Non-overlap and locale decision

- `/learn/claude-code-memory` remains the Claude Code native-memory boundary
  and Wenlan setup page.
- `/learn/claude-code-session-handoff` remains the exact Claude Code handoff
  workflow.
- `/learn/persistent-project-context-for-ai-agents` remains the guide to what a
  durable project context packet contains.
- `/learn/ai-agent-memory-types` remains the working, episodic, semantic, and
  procedural taxonomy.
- This route owns failure diagnosis and recovery-path selection.

No zh-TW or zh-CN route is added. The authenticated page evidence, Reddit
questions, GitHub issues, and maintained product documentation are English.
Existing Taiwan `AI 筆記` or Obsidian evidence does not establish Mandarin
context-loss demand.

## Bounded change

- Keep the URL and H1.
- Refresh the title metadata, description, quick answer, failure diagnosis,
  recovery checklist, FAQ, maintained references, and related links.
- Add the verified Wenlan `/brief`, `/recall`, `/capture`, `/handoff` loop.
- Distinguish native resume, project instructions, native memory, handoffs,
  and a shared durable-memory layer.
- Add no localized route, `FAQPage` JSON-LD, indexing request, or external
  distribution.

## Predeclared readouts

- Minimum exposure: 5 GSC target-page impressions in the first 28 complete
  post-deploy days.
- Success: after minimum exposure, at least 1 GSC target-page click or average
  position of 8.0 or better.
- Failure: after 28 complete post-deploy days and minimum exposure, 0 clicks
  and average position worse than 15.0.
- Inconclusive: fewer than 5 impressions, or 0 clicks with average position
  from 8.1 through 15.0 after minimum exposure.
- Technical stop: unsupported native-memory claim, overlap with an existing
  page job, or any canonical, robots, noindex, schema, sitemap, locale,
  source-link, internal-link, or rendered-layout regression.
- 24h: production technical and rendered proof only; no SEO-success judgment.
- 7d, W2, W4, W8: preserve source-native units and apply the unchanged
  minimum-exposure guard.

## Approval boundary

At `2026-07-25T02:09:09Z`, the controller recorded the user's explicit
approval to complete this website change through commit, Git push, PR, merge,
production deployment, and production verification. Request indexing, GSC
validation, Reddit or other external publication, OSS submission, paid
acquisition, and metric-definition changes remain unapproved.

## Local verification

- Goal contract: `pnpm seo:goal:check` passed after the complete `PLAN.md` was
  read.
- Focused contract: the new context-loss test failed before the article
  refresh, then passed after implementation.
- Independent review: initial verdict `FIX FIRST` because the shared article
  factory did not carry a stable original publication date for this existing
  page. The fix added `publishedAt` pass-through, pinned this route to
  `publishedAt: "2026-06-06"`, retained `updatedAt: "2026-07-25"`, and added
  an article-scoped regression assertion.
- Built metadata proof: the production build contains
  `datePublished: "2026-06-06"` and `dateModified: "2026-07-25"` rather than
  presenting the refresh as a new publication.
- SEO suite: 185/185 passed.
- i18n suite: 53/53 passed.
- TypeScript lint, the deterministic weekly sample, `git diff --check`, and
  the production build passed.
- Built technical SEO: 110 sitemap locations, 14 checked HTML pages, seven
  noindex header rules, 26 redirects, no legacy sitemap URLs, and no
  `FAQPage` in 117 built HTML pages passed.
- Built locale checks: 19 expected 200 routes and five expected 404 routes
  passed. This English-only refresh still has no zh-TW or zh-CN article route.

## Rendered QA

Fresh screenshots from the final build are under
`/tmp/wenlan-seo/visual-qa/2026-07-25-context-loss-diagnostic/`.

- Desktop: four viewport segments covered the complete 3,619 px page.
- Mobile: nine viewport segments covered the complete 6,285 px page at
  390 × 844.
- The final render has the expected title, exact self-canonical,
  `index, follow`, Article and BreadcrumbList schema, five maintained
  references, related links, and no `FAQPage`.
- The mobile document width remained within the viewport (`384 < 390`) and
  emitted no browser warning or error. The code block remains intentionally
  horizontally scrollable without causing document overflow.
- The first visible FAQ opened and exposed the complete native-session versus
  durable-memory answer.

Visual QA Pass A and Pass B both returned `PASS`: the page remains a live
component-rendered article using the existing design system; desktop and
mobile structure, content, interaction, and responsive layout had no blocking
finding. There is no concrete pixel-reference target for this copy refresh, so
no reference image-diff score is claimed.

## Production verification

- PR [#80](https://github.com/7xuanlu/wenlan-site/pull/80) merged at
  `2026-07-25T02:14:16Z` as
  `338f5a510d0294b69b7b691d82b6da9e42481a9b`.
- Vercel production completed at `2026-07-25T02:15:21Z`.
- The deployed technical audit passed robots, 110 sitemap URLs, 14 key pages,
  six utility noindex headers, sitemap-wide `FAQPage` absence, 25 redirects,
  six bridge-host redirects, and legacy-URL exclusions.
- The live English route returned HTTP 200 with the expected H1 and title,
  exact self-canonical, `index, follow`, five maintained references,
  SoftwareApplication, WebSite, Organization, Article, and BreadcrumbList
  schema, `datePublished: "2026-06-06"`,
  `dateModified: "2026-07-25"`, and no `FAQPage`.
- The unsupported zh-TW and zh-CN routes returned 404 and were absent from the
  sitemap.
- Complete production screenshots are under the `production/` subdirectory
  of the local QA evidence path. Desktop and 390 px mobile covered the full
  page without document overflow or browser warning/error; the first FAQ
  opened with the expected answer.
- This is technical publication evidence only. The pre-publish GSC, Vercel,
  and GitHub values remain separate native-unit baselines; no SEO success,
  CTA change, source-to-page session, or causal effect is inferred at
  production completion.
