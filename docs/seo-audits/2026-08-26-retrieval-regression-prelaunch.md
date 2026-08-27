# Retrieval-regression trilingual scenario — prelaunch record

Date: 2026-08-26

Status: selected and prepared locally; not published

## Decision

Select `retrieval-regression-after-knowledge-base-changes` as the scenario to
prepare before 2026-08-28. The proposed routes are:

- `/learn/test-ai-knowledge-base-retrieval-after-changes`
- `/zh-TW/learn/test-ai-knowledge-base-retrieval-after-changes`
- `/zh-CN/learn/test-ai-knowledge-base-retrieval-after-changes`

The task is to keep a versioned set of representative questions and expected
sources, then compare retrieval before and after one corpus, embedding,
chunking, hybrid-search, filter, or reranker change. It is not a generic RAG
overview.

## Why this is a clean owner

- Citation verification starts after an answer exists and checks whether each
  claim is supported by its cited source.
- Wenlan's evaluation documentation explains the maintained benchmark and its
  limits.
- This family starts before generation and teaches a user-owned golden-query,
  expected-source, before-and-after retrieval workflow with rollback.

The same task receives one owner per locale. Embedding, chunking, reranking,
and corpus changes are modifiers of that task, not separate pages.

## Evidence and product boundary

The complete source URLs, capture dates, languages, geographies, native units,
and notes are stored in `docs/seo-scenario-backlog.json`. English, Taiwan
Traditional-Chinese, and Mainland Simplified-Chinese result sets were kept
separate and were not converted into keyword volume or Wenlan performance.

Wenlan's repository maintains retrieval-only Recall@5, MRR, NDCG@10, labeled
fixtures, frozen ranking goldens, and the ignored maintainer test
`eval::retrieval_drift::tests::ranking_drift_vs_golden`. The article must say
that this detects drift, not correctness. It must not present this as a released
`wenlan eval` command or hosted CI feature.

## Local change

- Add one natural article in English, zh-TW, and zh-CN.
- Add reciprocal locale availability, sitemap ownership, Article and
  BreadcrumbList schema through the existing renderer, and CJK term protection.
- Add contextual inbound links from citation verification, source-backed
  knowledge base, and tool selection in each locale.
- Keep the visible FAQ and do not emit FAQPage JSON-LD.
- Verify desktop and exact 393px mobile rendering before requesting publication.

## Measurement and approvals

Each locale remains unavailable rather than zero until GSC returns a page row.
After publication and a confirmed crawl, minimum exposure is 20 GSC page
impressions per locale. Success requires at least 3 qualified joined-query
impressions and at least 1 GSC click in that locale; CTR and position remain
separate observations.

This record does not authorize commit, push, PR creation, merge, deployment,
request indexing, GSC validation, analytics mutation, paid action, synthetic
events, or external publication. The exact verified website diff requires a
separate approval.

## Verification result

At `2026-08-26T07:54:44Z`, the goal, scenario, intent, i18n, lint, build, and
built technical checks passed. The production build emitted 247 static pages,
the sitemap contained 138 locale-aware owners, and the intent verifier mapped
all 138 owners exactly once.

The three routes were rendered from the production build at exact 393x852 and
1440x1200 viewports. All seven article sections and an expanded FAQ were
checked in every locale. There was no horizontal overflow, broken image,
console warning, or console error. A mobile zh-TW/zh-CN orphan-question-mark
break found during the first pass was fixed and rechecked.

The full SEO suite retains four unrelated release-contract failures: the site
still publishes v0.16.0 while the sibling Wenlan repository reports v0.17.0.
The retrieval-regression scenario and its focused technical fixture pass; the
release-sync gap remains a separate change instead of being hidden in this
content branch.
