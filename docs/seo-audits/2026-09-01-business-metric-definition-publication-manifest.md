# Business Metric Definition Knowledge Base Publication Manifest

Date: 2026-09-01

## Status

The English, zh-TW, and zh-CN candidate is complete and verified locally. At
`2026-09-01T05:03:53Z`, the user explicitly approved this exact candidate's
commit, Git push, pull request, merge, automatic Vercel deployment, and
read-only production verification.

The Wenlan source README authority link, request indexing, GSC validation,
analytics mutation, maintainer contact, paid actions, synthetic events, and
every other external action remain separate and excluded.

## Clean base

- A fresh fetch confirmed both this branch and `origin/main` at
  `9b12ad73eb51c95d013e69e455c1a67d03f0e08d`.
- The publication branch is
  `codex/business-metric-definition-knowledge-base` in the isolated worktree
  `/private/tmp/wenlan-business-metrics`.
- If `origin/main` advances before merge, rebase once, read the reconciled diff
  fresh, and rerun the complete verification floor on the integrated commit.

## Routes and owned task

- `https://wenlan.app/learn/build-business-metric-definition-knowledge-base`
- `https://wenlan.app/zh-TW/learn/build-business-metric-definition-knowledge-base`
- `https://wenlan.app/zh-CN/learn/build-business-metric-definition-knowledge-base`

All three routes own one task: turn approved Markdown, text, and
text-extractable PDF metric specifications into a cited, versioned,
human-reviewed definition record with business definition, non-executable
formula text, grain, dimensions, inclusions, exclusions, owner, source IDs and
revisions, review state, and supersession.

The candidate does not claim CSV or YAML ingestion, SQL execution, warehouse
or BI connectivity, metric calculation, lineage, data-quality monitoring,
permission management, approval workflow, or automatic reconciliation.

## Candidate-owned files

| File | Candidate-owned change |
| --- | --- |
| `src/app/(en)/learn/seo-articles.ts` | English article plus three contextual inbound links. |
| `src/i18n/learn-articles.ts` | Natural zh-TW and zh-CN articles plus six same-locale inbound links. |
| `src/i18n/learn-availability.ts` | Register the slug for both Mandarin locales. |
| `src/app/[locale]/learn/[slug]/page.tsx` | Reuse the CJK phrase-protection seam for metric-definition terms. |
| `scripts/i18n-built-check.mjs` | Add the two translated direct-200 routes. |
| `scripts/i18n-contract.test.mjs` | Protect route, metadata, content, boundary, and CJK behavior. |
| `scripts/seo-intent-map.test.mjs` | Protect the 168-owner and locale totals plus the three new owners. |
| `docs/seo-scenario-backlog.json` | Append family `business-metric-definition-knowledge-base`. |
| `scripts/seo-scenario-check.mjs` | Register the family and protected scenario hash. |
| `scripts/seo-scenario-check.test.mjs` | Protect the full candidate gate and new totals. |
| `docs/seo-scenario-backlog.md` | Generated human-readable backlog. |
| `docs/seo-audits/2026-08-31-business-metrics-glossary-demand-gate.md` | Demand, SERP, standards, overlap, and authority-path evidence. |
| `docs/seo-audits/2026-09-01-business-metric-definition-knowledge-base-prelaunch.md` | Local deterministic and rendered verification record. |
| `PLAN.md` | Current production slot, scenario decision, preparation, verification, and approval records. |
| `EXPERIMENTS.md` | Append-only start, local verification, and publication approval records. |
| `docs/seo-audits/2026-09-01-business-metric-definition-publication-manifest.md` | This exact publication boundary. |

## Verification floor

On the branch and again on the integrated merge commit:

1. `pnpm seo:goal:check`
2. `pnpm seo:scenario:check`
3. `pnpm test:goal`
4. `pnpm test:seo` against Wenlan v0.17.6
5. `pnpm test:i18n`
6. `pnpm lint`
7. `pnpm build`
8. `pnpm seo:technical:built`
9. Running-build locale route matrix and `git diff --check`
10. Fresh integrated-diff review
11. English, zh-TW, and zh-CN at `1280x900` and exact `393x852`
12. After Vercel production is ready, the deployed technical audit and the
    same direct production route, schema, image, FAQ, overflow, console, and
    protected-phrase checks

Vercel completion becomes the fixed experiment boundary. Publication and
technical availability are not evidence of a crawl, indexing, rank,
impressions, clicks, visitors, authority, or causality.
