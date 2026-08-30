# SRE Incident Knowledge Base Candidate

Date: `2026-08-29`

## Decision

Prepare one trilingual scenario family for SRE, platform engineering, and
on-call teams:

- `/learn/build-sre-incident-knowledge-base`
- `/zh-TW/learn/build-sre-incident-knowledge-base`
- `/zh-CN/learn/build-sre-incident-knowledge-base`

The page owns one task: turn approved runbooks, postmortems, architecture
notes, and sanitized incident summaries into current, traceable operational
knowledge that a named owner reviews and tests.

This is not an incident-management or AIOps page. It excludes monitoring,
alert routing, live telemetry, automatic RCA, incident command, command
execution, automatic remediation, approvals, credentials, and emergency
access.

## Demand evidence

The committed structured record in `docs/seo-scenario-backlog.json` preserves
the exact source URL or query, capture date, language or geography, native
unit, and interpretation boundary for every observation.

English evidence includes:

- Microsoft Azure SRE Agent documentation describing runbooks, troubleshooting
  guides, stale knowledge, and incident knowledge that otherwise remains in
  chat or engineer memory.
- Current Reddit SRE discussions about runbooks drifting from production and
  finding what was tried during an older incident.
- AWS reliability guidance connecting failure investigation playbooks to
  post-incident updates.

Traditional-Chinese evidence includes the current Microsoft Learn zh-TW
runbook-to-knowledge workflow and Taiwan-natural result wording around
`事故`, `值班`, `runbook`, `事故復盤`, `來源`, and `過期`.

Simplified-Chinese evidence includes the SRE Elite practice whitepaper and a
published runbook-maintenance guide using natural terms such as `故障复盘`,
`运行手册`, `值班`, `运维知识`, `版本`, and `验证`.

Google Trends was opened for a current comparison, but the page returned no
inspectable series in this pass. No Trends index, keyword volume, or substitute
metric is claimed.

## Candidate gate

All required gates pass:

1. Provenance: every retained observation is inspectable and dated.
2. Repeated demand: independent official, community, and practitioner sources
   repeat stale runbooks and missing incident learning.
3. Trilingual result review: each locale has its own natural query family.
4. Clean gap: no current Wenlan owner covers the complete post-incident
   runbook-maintenance task.
5. First-party proof: Wenlan maintains supported Sources and source-backed
   Pages with citations, revisions, stale state, lint, and review.
6. Standalone utility: the workflow remains useful without Wenlan.
7. Internal paths: document ingestion, source-backed architecture, and
   citation verification provide three same-locale contextual entries.
8. Authority path: a later Wenlan source-repository SRE workflow link is
   predeclared but remains separately approval-gated.

## Product evidence and safety

The page uses the genuine deterministic Wenlan app fixture already protected
by `docs/seo-product-evidence-standard.md`. The copy states that it is a
general product example, not incident or customer evidence. HTML text explains
the input, review decision, worked artifact, and operational limits.

A retrieved runbook is context for a qualified engineer. It is not permission
to execute a production change. A named owner must verify service version,
environment, permissions, risk, expected output, abort conditions, and
rollback in an approved exercise.

## Measurement contract

- 24 hours: technical availability and indexability only.
- Seven days: early per-locale GSC page/query and Vercel page/referrer evidence.
- Formal judgment: confirmed post-deploy crawl plus 28 complete days.
- Minimum exposure: 20 target-page GSC impressions per locale.
- Success: at least 3 qualified joined-query impressions and at least 1 GSC
  click for that locale.
- Missing or insufficient exposure remains `inconclusive`.

## Local verification

- Goal verifier: pass.
- Scenario verifier: pass, with 13 trilingual families and 153 sitemap owners.
- Goal tests: 49 pass.
- SRE intent and scenario tests: 13 pass.
- i18n tests: 75 pass.
- TypeScript: pass.
- Production build: pass, with 267 generated static pages.
- Built technical SEO: pass for 153 sitemap URLs; every one of 157 built HTML
  pages remains free of `FAQPage` JSON-LD.
- Browser QA: all three routes passed at `1280x900` and exact `393x852` in
  dark and light themes. Canonical, reciprocal hreflang, `Article`,
  `BreadcrumbList`, indexability, product evidence, in-page action, dates,
  image loading, and horizontal overflow checks passed in all 12 states.
- The first mobile pass exposed a trailing-character break in `事故復盤` and
  `故障复盘`. The localized renderer now keeps the complete conjunction phrase
  together, and a deterministic test protects the fix.

The unrelated public-release drift found during candidate verification was
repaired before publication in a separate commit. GitHub Releases identifies
`v0.17.4`, published `2026-08-30`, as authoritative; website release metadata,
download surfaces, About, Docs, schema, sitemap dates, and machine-readable
surfaces now agree. The five focused release contracts and all 75 i18n
contracts pass. The full SEO, build, and technical gates still run on the
combined branch before merge.

The user explicitly approved this exact verified SRE family for commit, push,
PR creation, merge, automatic Vercel deployment, and read-only production
verification. Request indexing, GSC validation, analytics mutation,
source-repository changes, maintainer messages, paid action, and unrelated
external publication remain excluded.
