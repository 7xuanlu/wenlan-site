# Competitive Intelligence Knowledge Base Candidate

Date: 2026-08-30

## Decision

Prepare one trilingual scenario family:

- /learn/build-competitive-intelligence-knowledge-base
- /zh-TW/learn/build-competitive-intelligence-knowledge-base
- /zh-CN/learn/build-competitive-intelligence-knowledge-base

The page owns one user task: maintain a bounded competitor dossier from
permitted, user-collected documents while preserving source class, date,
revision, observations, inferences, assumptions, contradictions, stale claims,
and open questions for human review.

This is not a generic AI competitor-analysis page. Wenlan does not discover
competitors, crawl or scrape websites, monitor live pricing or reviews, send
alerts, score competitors, recommend strategy, or make legal or commercial
decisions.

## Audience, trigger, and outcome

- Audience: product marketing managers, founders, and product, strategy, or
  market researchers who maintain competitor evidence.
- Trigger: a competitor review, battlecard, product decision, positioning
  update, or quarterly research refresh may rely on claims whose sources or
  revisions changed.
- Outcome: a current, traceable research packet that tells a reviewer which
  claims are observed, inferred, assumed, contradicted, stale, or unresolved.

## Trilingual demand evidence

English:

- [Aqute's dated competitive-intelligence program guide](https://www.aqute.com/blog/build-competitive-intelligence-program)
  treats source mapping, evidence, confidence, ownership, dates, and next
  review as a maintained system. It preserves human judgment rather than
  promising automated strategy.
- Natural query family: competitive intelligence knowledge base, competitor
  research knowledge base, and how to organize competitor research.

Taiwan Traditional Chinese:

- [Taiwan Marketing Research's competitor-data-source guide](https://tmrmds.co/article-business/21696/)
  separates primary and secondary sources and says competitor information
  must remain continuously updated.
- Natural query family: 競品分析知識庫, 競爭情報資料整理, and 競品資料更新.

Simplified Chinese:

- [人人都是產品經理的競品調研案例](https://www.woshipm.com/pd/6395378.html)
  starts from user manuals, release notes, and manually prepared sources,
  preserves an evidence chain, narrows the module under review, and keeps
  human research judgment explicit.
- Natural query family: 竞品分析知识库, 竞品调研资料库, and 竞品信息更新.

The structured source record in docs/seo-scenario-backlog.json preserves every
query or URL, capture date, language or geography, native unit, and
interpretation boundary. Search-result observations and research counts are
not keyword volume, GSC performance, rank, or causality.

## Clean intent gap

Current Wenlan owners cover AI knowledge-base tool selection, generic
source-backed research and literature synthesis, product research before a
PRD, client-project consulting delivery, investment research, document
ingestion, and citation verification.

None owns a maintained competitor dossier whose central contract is source
class, revision, observation versus inference, contradiction, stale claim, and
decision-specific human review. This is a distinct audience, trigger, task,
outcome, and result shape rather than another name for generic research.

## First-party product proof

Maintained Wenlan source proves:

- .md, .txt, text-extractable .pdf, folder, and read-only Obsidian Sources;
- incremental sync for file and folder Sources;
- source-backed Pages with citations, revisions, stale state, lint, and review;
- wenlan status and wenlan sources add PATH;
- plugin workflows for /distill, /pages, /lint, and /curate.

The product workflow is limited to documents the user is permitted to collect
and place in the supported source boundary. A custom integration may supply
prepared webpage content, but the page does not claim that Wenlan fetches or
monitors that webpage.

## Standalone workflow

1. Name one decision and a bounded competitor set.
2. Register each permitted source with type, location, publication or access
   date, revision, authority, and next review date.
3. Separate observation, inference, assumption, contradiction, and unknown.
4. Compare the same question or product module across equivalent source
   classes.
5. Resync changed documents and mark affected claims stale until reviewed.
6. Open the exact evidence before using a claim in a battlecard, product
   decision, or positioning update.

This workflow remains useful without Wenlan.

## Internal and authority paths

Three stable same-locale contextual paths are predeclared from source-backed
research, citation verification, and document-to-knowledge-base ingestion.

The separately approval-gated authority candidate is the maintained
[startup-skill competitive-analysis workflow](https://github.com/ferdinandobons/startup-skill/blob/main/startup-competitors/SKILL.md).
Its contribution guide accepts reference, framework, research-template, and
agent improvements. After the website family is separately approved and
published, a neutral provenance-and-staleness reference improvement may be
prepared. Wenlan may appear at most as one accurate implementation example.
Do not open an issue or pull request, message a maintainer, or assume
acceptance without separate explicit approval.

## Measurement contract

- 24 hours: technical availability and indexability only.
- Seven days: early per-locale GSC page/query and Vercel page/referrer
  observation.
- Formal judgment: confirmed post-deploy crawl plus 28 complete days.
- Minimum exposure per locale: 20 GSC target-page impressions.
- Success per locale: at least 3 qualified joined-query impressions and at
  least 1 GSC click.
- Missing or insufficient exposure remains inconclusive and does not block
  the next non-overlapping family.

## Approval boundary

The user approved local implementation and verification. Commit, push, pull
request, merge, Vercel deployment, request indexing, GSC validation, analytics
mutation, paid action, maintainer messaging, OSS contribution, synthetic
events, and other external publication remain excluded.
