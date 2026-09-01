# Course Wiki from Lecture Notes: prelaunch record

Date: 2026-08-31
State: locally prepared; not published

## Source-native baseline

The latest completed authenticated weekly range is `2026-07-31..2026-08-27`.
Every source remains in its own native unit:

- GSC property: 7 clicks / 913 impressions.
- GSC visible-query rows: 2 clicks / 221 impressions.
- GSC query-visibility gap: 5 clicks / 692 impressions.
- Vercel: 289 visitors / 690 pageviews.
- Vercel Google referrer: 28 visitors / 29 pageviews.
- GitHub: 51 stars at the weekly report capture.
- The three new target-page rows are unavailable rather than zero.

This baseline is not keyword volume, rank, authority, or causal evidence.

## Authority reconciliation

- `awesome-selfhosted/awesome-selfhosted-data#2955` was closed without merge on
  2026-08-31. No maintainer reason was recorded. It is not earned authority and
  no further maintainer contact is authorized by this record.
- `DhanushNehru/awesome-mcp-servers#52` was merged on 2026-08-24 and the Wenlan
  entry is visibly rendered upstream. This is one earned, inspectable repository
  listing; it links GitHub rather than `wenlan.app` and is not attributed traffic.
- The course-wiki family's proposed `awesome-ai-tools-for-students` entry remains
  planned and unpublished. It needs a separate decision after the website pages
  are live and verified; acceptance and any backlink are not assumed.

## Exact search owners

| Locale | Route | One search task |
| --- | --- | --- |
| English | `/learn/build-course-wiki-from-lecture-notes` | Turn readable lecture slides, notes, and course PDFs into a maintained course wiki with sources, prerequisites, revisions, and review state. |
| zh-TW | `/zh-TW/learn/build-course-wiki-from-lecture-notes` | 把可讀課堂講義、課件與 PDF 整理成可追溯、可複核的課程 Wiki。 |
| zh-CN | `/zh-CN/learn/build-course-wiki-from-lecture-notes` | 把可读课程讲义、课件与 PDF 整理成可追溯、可审核的课程 Wiki。 |

The locale queries are natural local expressions of one task, not claimed
translations of a measured keyword. Demand and SERP provenance remain in
`docs/seo-scenario-backlog.json` and
`docs/seo-audits/2026-08-31-next-scenario-demand-comparison.md`.

## Content and product boundary

Each owner leads with the answer, then provides a six-step workflow and a
copyable concept record containing the concept, question, prerequisites,
answer, exact sources, source revision, review state, reviewer, and next review
trigger. The product proof uses a deterministic Wenlan fixture and the real
commands `wenlan status`, `wenlan sources add`, `/distill`, `/pages`, `/lint`,
and `/curate`.

The page does not claim flashcards, quizzes, audio or video transcription, OCR,
grading, tutoring, homework solving, exam planning, automatic academic
judgment, or NotebookLM equivalence. Scanned and image-only files require an
external OCR step whose text is then reviewed before use.

## Overlap and internal links

This task is distinct from:

- generic document ingestion, which owns supported inputs;
- the Karpathy / LLM Wiki guide, which owns the general implementation pattern;
- the research knowledge-base page, which starts from papers and produces a
  literature matrix.

Those three owners provide one same-locale contextual inbound path in English,
zh-TW, and zh-CN. The new page links back to those owners plus citation
verification. It does not replace or rewrite any measuring owner.

## Technical contract

Each locale must have one natural H1, one exact self-canonical, reciprocal
`en-US` / `zh-TW` / `zh-CN` / `x-default` hreflang, sitemap membership, one
Article schema, one BreadcrumbList schema, a visible FAQ without FAQPage
JSON-LD, a loaded product-evidence image, same-locale related links, and no
horizontal overflow or protected Mandarin phrase split at exact 393px width.

## Measurement contract

- The production clock does not start until a separately approved deployment
  completes.
- 24 hours: technical and indexability observation only.
- 7 days: early source-native GSC page/query and Vercel page/referrer evidence.
- Formal decision: 28 complete post-crawl days and at least 20 target-page GSC
  impressions per locale.
- Success per locale: at least 3 qualified joined-query impressions and at
  least 1 GSC click. CTR and position remain separate observations.
- Insufficient exposure is `inconclusive` and does not block a non-overlapping
  family.

## Approval boundary

This record authorizes no commit, push, PR, merge, Vercel deployment, request
indexing, GSC validation, analytics mutation, OSS submission, maintainer
message, paid action, synthetic event, or other external publication.

## Local verification at 2026-08-31T18:36:02Z

- Goal and scenario verifiers passed with 17 trilingual families and 165
  sitemap owners.
- Goal tests passed 53/53; SEO tests passed 255/255 against the published
  `v0.17.6` source tag; i18n tests passed 80/80; TypeScript lint passed.
- The production build generated 283 static pages. The built technical audit
  passed 165 sitemap URLs, 24 required pages, 26 redirects, seven noindex
  header rules, robots, 24 checked HTML pages, and FAQPage absence across 169
  built HTML files.
- The running-build locale matrix returned 200 for all 37 expected routes and
  404 for the four intentional unsupported routes.
- The in-app Browser control tool was not exposed in this task, so the allowed
  fallback used bundled Playwright with local Google Chrome. English, zh-TW,
  and zh-CN passed at `1280x900` and exact `393x852`.
- All six states returned 200 with the expected title and H1, exact canonical,
  reciprocal hreflang, one Article schema, one BreadcrumbList schema, no
  FAQPage schema, one article, a loaded product-evidence image, two FAQ items,
  a working FAQ expansion, no framework overlay, no console warning or error,
  and no horizontal overflow. Every protected Traditional- and
  Simplified-Chinese course phrase stayed on one rendered line segment.
- First-viewport and FAQ-interaction captures are stored under
  `/private/tmp/course-wiki-*-hero.png` and
  `/private/tmp/course-wiki-{en,zh-tw,zh-cn}-{desktop,mobile}.png`; they are QA
  artifacts, not repository assets.
