# Competitive Intelligence Knowledge Base Publication Manifest

Date: 2026-08-30

## Status

The trilingual candidate is complete and verified locally. At
`2026-08-30T19:44:10Z`, the user approved its exact commit, Git push, pull
request, merge, automatic Vercel deployment, and read-only production
verification scope. Indexing requests, GSC validation, analytics mutation,
maintainer contact, and the planned OSS authority contribution remain
unapproved.

## Clean base

- Rebuild from current `origin/main` commit
  `d94b807cc83f66ac5be85500682066fdb68d0d05`.
- Do not push the detached dirty worktree at
  `/tmp/wenlan-seo-readout-20260830`.
- Create a fresh `codex/` branch or worktree from that exact base and transfer
  only the candidate-owned changes below.

## Candidate routes

- `https://wenlan.app/learn/build-competitive-intelligence-knowledge-base`
- `https://wenlan.app/zh-TW/learn/build-competitive-intelligence-knowledge-base`
- `https://wenlan.app/zh-CN/learn/build-competitive-intelligence-knowledge-base`

All three routes own one task: maintain a bounded, source-backed competitor
dossier from permitted documents. They do not claim competitor discovery,
crawling, scraping, live monitoring, current pricing or review collection,
alerts, automatic scoring, recommendations, or legal or commercial decisions.

## Include from the candidate

| File | Exact candidate-owned change |
| --- | --- |
| `src/app/(en)/learn/seo-articles.ts` | Add the English article spec and push it into `workflowArticles`. |
| `src/i18n/learn-articles.ts` | Add only the zh-TW and zh-CN article objects for the candidate slug. |
| `src/i18n/learn-availability.ts` | Add the slug to the translated slug contract and both Mandarin locale lists. |
| `src/app/[locale]/learn/[slug]/page.tsx` | Add the slug to the existing CJK term-protection condition and protect the candidate-specific Mandarin terms `競品檔案` / `竞品档案`, `證據` / `证据`, and `追溯`. |
| `scripts/i18n-contract.test.mjs` | Add route, metadata, three-locale content, product-evidence, renderer, and CJK phrase assertions for this slug. |
| `scripts/seo-intent-map.test.mjs` | Raise the sitemap-owner totals from `153` to `156`, the locale totals to `110/23/23`, and assert the three new owners. |
| `docs/seo-scenario-backlog.json` | Set `updatedAt` to `2026-08-30` and append only family `competitive-intelligence-knowledge-base`. |
| `scripts/seo-scenario-check.mjs` | Add the family ID and use the candidate-backed approved contract hash. |
| `scripts/seo-scenario-check.test.mjs` | Raise family and sitemap totals and add the candidate gate assertions. |
| `docs/seo-scenario-backlog.md` | Regenerate from the JSON source with `pnpm seo:scenario:update`; do not hand-copy it. |
| `EXPERIMENTS.md` | Append only the experiment start and local-verification correction for `EXP-2026-08-30-competitive-intelligence-knowledge-base-locales`. |
| `PLAN.md` | Transfer only the candidate preparation section and this clean-rebuild publication note, if the clean branch's Goal verifier requires them. Do not transfer unrelated PLAN hunks. |
| `docs/seo-audits/2026-08-30-competitive-intelligence-knowledge-base-candidate.md` | Add the inspectable demand, overlap, product-proof, authority-path, and measurement record. |
| `docs/seo-audits/2026-08-30-competitive-intelligence-publication-manifest.md` | Add this publication boundary and reconstruction record. |
| `docs/seo-audits/2026-08-30-competitive-intelligence-clean-rebuild-verification.md` | Add the clean-base deterministic, built-output, responsive, and two-pass visual verification record. |

The product-evidence image
`public/images/product-evidence/wenlan-space-review-fixture.png` already exists
on the clean base. No image or binary file belongs in this candidate diff.

## Explicit exclusions

- Exclude the unrelated indentation-only change in the existing zh-CN SRE
  reference entry in `src/i18n/learn-articles.ts`.
- Exclude all other `PLAN.md` changes from this dirty worktree, including weekly
  evidence restoration, authority observations, the README star proposal, and
  other scenario research.
- Exclude these untracked artifacts from the candidate publication commit:
  - `docs/seo-audits/2026-08-21-weekly-seo.md`
  - `docs/seo-audits/2026-08-28-successor-decision-matrix.md`
  - `docs/seo-audits/2026-08-28-weekly-seo.md`
  - `docs/seo-audits/2026-08-30-authority-pr-readout.md`
  - `docs/seo-audits/2026-08-30-github-visitor-to-star-readout.md`
  - `docs/seo-audits/2026-08-30-next-scenario-capability-gate.md`
  - `docs/seo-audits/2026-08-30-readme-star-proposal.patch`
  - `docs/seo-audits/2026-08-30-rfp-proposal-readiness-demand-gate.md`
- Do not include any README, release, analytics, Search Console, indexing,
  directory, paid, or maintainer-message change.
- Do not open the planned `ferdinandobons/startup-skill` authority proposal in
  the website publication step.

## Reconstruction and verification floor

After transferring the candidate-only hunks to the clean branch:

1. Run `pnpm seo:scenario:update` and confirm that only the candidate family
   changes the generated Markdown.
2. Run `pnpm seo:goal:check`.
3. Run `pnpm seo:scenario:check`.
4. Run `pnpm test:goal`.
5. Run `pnpm test:seo`.
6. Run `pnpm test:i18n`.
7. Run `pnpm lint`.
8. Run `pnpm build`.
9. Run `pnpm seo:technical:built`.
10. Run `git diff --check` and inspect the candidate diff from the clean base.
11. Repeat desktop and exact `393px` visual checks for English, zh-TW, and
    zh-CN. Verify one H1, exact canonical, reciprocal hreflang, Article and
    BreadcrumbList schema, no `FAQPage`, no horizontal overflow, loaded product
    evidence, and natural CJK wrapping.

The prior dirty-worktree verification is useful evidence but is not a substitute
for these checks on the reconstructed branch and the eventual integrated commit.

## Publication approval

The user gave the exact publication approval at `2026-08-30T19:44:10Z`.
Request indexing, GSC validation, analytics mutation, the OSS authority
proposal, maintainer messaging, paid actions, and all other external
publication remain separate decisions.
