# AI Knowledge-Base Locales Refresh — Prelaunch

## Decision

Refresh existing indexed acquisition surfaces in English, Traditional
Chinese, and Simplified Chinese. Do not create another article URL.

Target routes:

- `/learn`
- `/learn/source-backed-wiki-pages-ai-work`
- `/zh-TW/learn`
- `/zh-TW/learn/source-backed-wiki-pages-ai-work`
- `/zh-CN/learn`
- `/zh-CN/learn/source-backed-wiki-pages-ai-work`

## Candidate gate

1. Provenance: authenticated GSC and Vercel exports use the aligned complete
   `2026-06-28..2026-07-25` range. Simplified-Chinese community wording is
   preserved with URLs, captured-at time, and native platform units in
   `2026-07-29-zh-cn-community-demand.md`.
2. Repetition or intent: public Simplified-Chinese sources independently
   repeat `LLM Wiki 知识库`, `AI 知识库`, `有来源的知识库`, and
   `知识库最佳实践`. English GSC already exposes the Learn hub and the
   source-backed article. Exact Taiwan `AI 知識庫` demand remains sparse.
3. Coverage gap: all six routes already exist. Their copy is memory-first or
   mixed English/Chinese and does not cleanly answer provenance, maintenance,
   review, and verification as one AI knowledge-base workflow.
4. Maintained proof: Wenlan's maintained README and daily-workflow docs expose
   Sources, Memories, Pages, `/capture`, `/distill`, `/pages`, `/lint`, and
   `/curate`. The refresh may state only those verified product behaviors.
5. Standalone utility: the page explains how to evaluate and maintain a
   source-backed AI knowledge base even when the reader does not install
   Wenlan.

The gate passes for existing-page refreshes only. It does not justify a new
Traditional-Chinese URL or keyword-volume claim.

## Native-unit baseline

| Surface | GSC clicks | GSC impressions | GSC page-average position | Vercel visitors | Vercel pageviews |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/learn` | 0 | 91 | 15.4 | 100 | 102 |
| `/learn/source-backed-wiki-pages-ai-work` | 0 | 4 | 3.3 | 5 | 5 |
| `/zh-TW/learn/source-backed-wiki-pages-ai-work` | 0 | 1 | 49.0 | 1 | 1 |
| `/zh-CN/learn/source-backed-wiki-pages-ai-work` | 0 | 1 | 1.0 | 2 | 3 |

- GSC property: 8 clicks, 395 impressions.
- GSC visible queries: 2 clicks, 92 impressions.
- GSC visibility gap: 6 clicks, 303 impressions.
- Vercel raw: 1,420 visitors, 1,628 pageviews.
- Authenticated Umami events: unavailable, not zero.
- GitHub public REST: 46 stars.

These sources are not joined and do not establish causality. Page-average
position is not an exact-query rank.

## Change contract

- Lead the Learn hubs with `AI knowledge base` / `AI 知識庫` /
  `AI 知识库` and `LLM wiki`.
- Refresh the existing source-backed article in all three locales with:
  source provenance, the Sources → Atomic Knowledge → Pages separation,
  a real Wenlan command workflow, stale/conflict handling, and a verification
  checklist.
- Preserve original `datePublished`; move only `dateModified`.
- Keep Obsidian as an adjacent interface and ecosystem bridge, not the
  category center.
- Preserve URL, locale availability, reciprocal alternates, sitemap,
  canonical, Article and BreadcrumbList JSON-LD, visible FAQ, and the absence
  of `FAQPage`.
- Keep CJK words such as `知識庫`, `知识库`, `來源`, and `来源` intact at
  mobile line breaks.

## Readout contract

- Minimum exposure: 10 GSC impressions across changed canonical pages in one
  complete post-deploy readout window.
- Success at W2: at least 10 combined target-page impressions, at least two
  locale surfaces with nonzero page impressions, and no technical regression.
- Failure: a reliable complete window with zero target-page impressions, or a
  technical, locale, indexability, source-accuracy, or render regression.
- Otherwise: inconclusive.

Report GSC, Vercel, Umami, and GitHub separately. Do not infer keyword volume,
source-to-page sessions, causal lift, or star attribution.

## Approval

The user approved website implementation, commit, push, PR creation, merge,
automatic Vercel deployment, production verification, and a later GSC
inspection/indexing batch in this Codex task at `2026-07-30T06:57:46Z`, then
explicitly added zh-TW. The fixed post-deploy batch covers `/learn`,
`/zh-TW/learn`, `/zh-CN/learn`, and the zh-TW and zh-CN source-backed article
routes. The already-requested English source-backed article is excluded.
GSC validation, any other indexing URL, external publication, OSS submission,
paid acquisition, synthetic events, analytics account mutation, and metric
definition changes remain outside this approval.

## Local verification

- `pnpm seo:goal:check`: pass.
- `pnpm lint`: pass.
- Full `scripts/i18n-contract.test.mjs`: 56 tests pass.
- Changed acquisition, Goal, date-schema, and mobile-wrap contracts: pass.
- `pnpm build`: pass with 214 generated routes.
- `pnpm seo:technical:built`: pass with 113 sitemap URLs, 17 required URLs,
  26 redirects, seven noindex headers, 117 built HTML pages without
  `FAQPage`, correct robots, and legacy exclusions.
- Production-render QA covered all six routes at `1440×1100` and `393×852`.
  Every page had `scrollWidth === clientWidth`, the expected canonical and
  reciprocal English/zh-TW/zh-CN/x-default alternates, `index, follow`, and no
  `FAQPage`. All three articles exposed `Article` and `BreadcrumbList`.
- Article dates remained `2026-06-06` / `2026-07-30` in English and
  `2026-07-04` / `2026-07-30` in both Mandarin locales.
- Mobile range measurements confirmed `知識庫` and `知识库` stayed on one
  line inside their compound; no CJK acquisition term was split.
- Browser console warnings and errors: none.
- The full sibling-repo SEO suite still exposes the pre-existing release-sync
  mismatch: the site publishes `0.15.0` while the checked Wenlan sibling is
  `0.15.1`. Those three release assertions are outside this experiment; all
  changed and non-release acquisition contracts pass.

## Production and GSC execution

- PR #99 merged at `2026-07-30T07:58:58Z` as
  `5a4c8fe302b4557b4f34ca7ac9c40bad4e39bfbc`.
- Vercel production completed at `2026-07-30T07:59:58Z`.
- `pnpm seo:technical:deployed` passed robots, 113 sitemap URLs, 17 key
  pages, six utility noindex headers, sitemap-wide `FAQPage` absence,
  25 redirects, six bridge-host redirects, and legacy URL exclusions.
- Live render verification passed the exact canonical, indexability,
  reciprocal hreflang, schema, dates, visible workflow, visible FAQ, and
  overflow checks on the English, zh-TW, and zh-CN Learn hubs and
  source-backed article routes.
- GSC URL Inspection reported all five approved URLs already on Google:
  `/learn`, `/zh-TW/learn`, `/zh-CN/learn`,
  `/zh-TW/learn/source-backed-wiki-pages-ai-work`, and
  `/zh-CN/learn/source-backed-wiki-pages-ai-work`.
- One request-indexing action for each returned `Indexing requested` by
  `2026-07-30T08:07:02Z`. This proves queue acceptance only; it does not prove
  a post-change crawl, ranking change, impressions, clicks, or causality.
- The English source-backed article was excluded because it was already
  requested on 2026-07-28. No GSC validation or out-of-batch indexing action
  was performed.
