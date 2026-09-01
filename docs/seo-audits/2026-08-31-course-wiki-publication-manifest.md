# Course Wiki from Lecture Notes Publication Manifest

Date: 2026-08-31

## Status

The English, zh-TW, and zh-CN Course Wiki candidate is complete and verified
locally. At `2026-09-01T04:21:18Z`, the user explicitly approved this exact
candidate's commit, Git push, pull request, merge, automatic Vercel deployment,
and read-only production verification. Publication may now proceed through the
verification floor below.

Request indexing, GSC validation, analytics mutation, the conditional
`sohailakhtar01/awesome-ai-tools-for-students` proposal, maintainer contact,
paid actions, synthetic events, and every other external publication remain
separate and excluded.

## Clean base

- Current `origin/main` and the detached candidate both resolve to
  `e8bdbd2980d7c8c0eef1f4d3fe29e88fb141bee9` after a fresh fetch on
  2026-08-31. No upstream integration delta exists at this capture.
- Do not push the detached dirty worktree at
  `/private/tmp/wenlan-customer-record-integrated-e8bdbd2`.
- After publication approval, create a fresh `codex/` branch from current
  `origin/main` and transfer only the candidate-owned changes below. If
  `origin/main` advances first, reconcile the semantic owners and rerun every
  verification gate on the integrated commit.

## Candidate routes and task

- `https://wenlan.app/learn/build-course-wiki-from-lecture-notes`
- `https://wenlan.app/zh-TW/learn/build-course-wiki-from-lecture-notes`
- `https://wenlan.app/zh-CN/learn/build-course-wiki-from-lecture-notes`

All three routes own one task: turn one approved set of readable lecture
slides, notes, and text-extractable course PDFs into a maintained course wiki
whose concept pages preserve prerequisites, exact source locations, source
revisions, reviewer, review state, and next review trigger.

The candidate does not claim flashcards, quizzes, audio or video
transcription, OCR, grading, tutoring, homework solving, exam planning,
automatic academic judgment, or NotebookLM equivalence.

## Candidate-owned files

| File | Exact candidate-owned change |
| --- | --- |
| `src/app/(en)/learn/seo-articles.ts` | Add the English Course Wiki article, bounded workflow, neutral concept record, maintained references, product-evidence packet, FAQ, and related routes. |
| `src/app/(en)/learn/articles.ts` | Register the new English article through the existing workflow registry. |
| `src/i18n/learn-articles.ts` | Add the natural zh-TW and zh-CN article objects and the three same-locale inbound links from document ingestion, LLM Wiki, and research knowledge-base owners. |
| `src/i18n/learn-availability.ts` | Add the slug to the translated-slug contract and both Mandarin locale lists. |
| `src/app/[locale]/learn/[slug]/page.tsx` | Add only the candidate slug and Course Wiki Mandarin phrase-protection terms to the existing CJK rendering seam. |
| `scripts/brand-contract.test.mjs` | Add the Course Wiki owner to the existing LLM Wiki acquisition related-route contract. |
| `scripts/i18n-built-check.mjs` | Add the zh-TW and zh-CN built routes to the expected direct-200 matrix. |
| `scripts/i18n-contract.test.mjs` | Add route, metadata, locale, content, product-evidence, boundary, renderer, and CJK phrase assertions for this family. |
| `scripts/seo-intent-map.test.mjs` | Raise the owner totals from `162` to `165`, preserve locale totals, and assert the three new Course Wiki owners. |
| `docs/seo-scenario-backlog.json` | Append only family `course-slides-source-backed-llm-wiki` with its three-locale evidence, clean gap, product proof, internal links, authority path, and measurement contract. |
| `scripts/seo-scenario-check.mjs` | Add the family ID and candidate-backed scenario contract hash. |
| `scripts/seo-scenario-check.test.mjs` | Raise family and sitemap totals and protect this family's complete candidate gate. |
| `docs/seo-scenario-backlog.md` | Regenerate from the JSON source with `pnpm seo:scenario:update`; do not hand-edit it. |
| `EXPERIMENTS.md` | Append only the start and local-verification records for `EXP-2026-08-31-course-wiki-from-lecture-notes-locales`. |
| `PLAN.md` | Transfer only the Course Wiki production-slot line, active-experiment count, current-experiment replacement, research, preparation, and verification records. |
| `docs/seo-audits/2026-08-31-next-scenario-demand-comparison.md` | Add the inspectable three-way demand comparison and rejected-candidate record. |
| `docs/seo-audits/2026-08-31-course-wiki-from-lecture-notes-prelaunch.md` | Add the exact task, overlap, product-proof, content, technical, visual, measurement, and approval boundary. |
| `docs/seo-audits/2026-08-31-course-wiki-publication-manifest.md` | Add this clean publication boundary and reconstruction contract. |

The existing product-evidence image
`public/images/product-evidence/wenlan-space-review-fixture.png` is already on
the clean base. No image or binary belongs in this candidate diff.

## Explicit exclusions

- Exclude the same-day follow-up in
  `docs/seo-audits/2026-08-31-release-distribution-cohort.md`; it is a separate
  GitHub release and star observation, not Course Wiki content.
- Exclude every website, README, release, analytics, Search Console, indexing,
  directory, paid, or maintainer-message change outside the files and hunks
  listed above.
- Do not open or modify the conditional
  `sohailakhtar01/awesome-ai-tools-for-students` authority proposal in the
  website publication step.
- Do not request indexing or submit GSC validation after deployment under this
  approval. Those are separate source-native actions.

## Verification floor

On the clean publication branch and again on the integrated merge commit:

1. Run `pnpm seo:scenario:update` and confirm that only the intended family
   changes the generated Markdown.
2. Run `pnpm seo:goal:check`.
3. Run `pnpm seo:scenario:check`.
4. Run `pnpm test:goal`.
5. Run `pnpm test:seo` against the current published Wenlan source tag.
6. Run `pnpm test:i18n`.
7. Run `pnpm lint`.
8. Run `pnpm build`.
9. Run `pnpm seo:technical:built`.
10. Run the built locale route matrix and `git diff --check`.
11. Inspect the clean integrated diff from `origin/main`.
12. Repeat desktop `1280x900` and exact mobile `393x852` checks for all three
    routes: one natural H1, exact self-canonical, reciprocal hreflang, Article
    and BreadcrumbList schema, visible FAQ without `FAQPage`, loaded product
    evidence, working FAQ expansion, no horizontal overflow, no console or
    framework error, and no protected Mandarin phrase split.
13. After Vercel reports Ready, run the deployed technical audit and the same
    direct production checks. Keep the Vercel completion time as the fixed
    experiment boundary; deployment itself is not a crawl or growth result.

The completed detached-worktree checks are readiness evidence, not a
substitute for verification on the clean branch and integrated commit.

## Exact approval received

At `2026-09-01T04:21:18Z`, the user explicitly approved the Course Wiki
candidate's commit, Git push, pull request creation, merge, automatic Vercel
deployment, and read-only production verification. All exclusions above remain
outside that approval.
