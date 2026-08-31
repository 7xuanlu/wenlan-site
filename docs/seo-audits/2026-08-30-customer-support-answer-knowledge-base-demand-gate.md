# Customer-support answer knowledge-base demand gate

Captured: 2026-08-30

## Decision

The broad `AI customer support` candidate remains rejected. Wenlan does not
provide help-desk or CRM ingestion, customer-data redaction, team permissions,
ticket analytics, reply deployment, channel synchronization, or automated
escalation.

A narrower trilingual task passes the research gate: a support content owner
can turn an approved product and policy document set into a source-backed
support answer pack for human review. Each answer records the customer
question, supported answer, scope, prohibited promise, escalation condition,
source revision, owner, and next review date. A future page must not claim that
Wenlan sends replies or operates a customer-support system.

The evidence below nominates a task. External observations are not GSC,
Wenlan rankings, traffic, causality, or interchangeable demand units.

## Search and demand observations

### English

- Ubersuggest returned `70` estimated US monthly searches for
  `customer support knowledge base` and `110` for the related
  `customer service knowledge base` phrase. The report used US English and
  `locId=2840`; CPC and difficulty remain separate tool fields. These estimates
  are lower than the recorded `LLM wiki` estimate and do not replace GSC.
- [KCS Content Health](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030/040/010)
  treats support knowledge as a maintained lifecycle with structured articles,
  reuse, improvement, archiving, governance, and content-health checks.
- [Microsoft Inside Track](https://www.microsoft.com/insidetrack/blog/ai-for-knowledge-management-keeping-support-content-up-to-date-at-microsoft/)
  describes a Global Help Desk problem in which thousands of changing support
  articles, agent systems, and SharePoint sites relied on manual review and
  subject-matter experts to find outdated content.
- [Emergent's knowledge-base-as-code case](https://emergent.sh/blog/our-knowledge-base-is-code)
  starts from a support AI confidently giving an old product answer, then uses
  product changes to nominate `NEW`, `INCOMPLETE`, or `OUTDATED` knowledge for
  human review and a versioned change. Its implementation is evidence of a
  repeated problem, not a feature attributed to Wenlan.

### Traditional Chinese / Taiwan

- Result surfaces for `客服知識庫`, `客服話術知識庫`, and
  `客服知識庫更新` repeatedly returned internal support-answer structure,
  product or policy changes, ownership, source, review date, and human
  escalation. The result shape is not keyword volume.
- [AI 客服答錯問題？上線前先補 6 種知識庫資料](https://richardmarketings.com/ai-customer-service-knowledge-base-taiwan-smes/)
  gives a Taiwan-specific answer record with applicability, supported answer,
  steps, exceptions, prohibited promises, escalation, source, and last-update
  fields. It is a practitioner/marketing source and is retained only as locale
  wording plus independent workflow corroboration.
- Ubersuggest labelled its Traditional-Chinese response as Taiwan, but its CTA
  URL still used US `locId=2840`. Its localized absolute-volume rows are invalid
  and excluded rather than reported as Taiwan demand.

### Simplified Chinese

- Result surfaces for `客服知识库`, `客服话术知识库`, and
  `客服知识库更新` repeatedly returned version control, policy changes,
  ownership, review, source, rollback, and escalation. The result shape is not
  keyword volume.
- [AI 客服知识库怎么更新：版本、审批与回滚 SOP](https://solvea.shulex.com/blog/ai-customer-service-knowledge-base-update-version-control)
  records source, scope, effective dates, owner, approval, tests, deprecation,
  and rollback for changing customer answers. It is a vendor source; its
  product claims and automation are not attributed to Wenlan.
- Ubersuggest labelled its Simplified-Chinese response as China, but its CTA URL
  again used US `locId=2840`. The localized absolute-volume rows are invalid and
  excluded.

## Candidate gate

- Provenance: passed. Retained sources record URL, capture or publication date,
  language or geography, native unit, and interpretation limits.
- Repeated demand: passed. KCS, Microsoft, Emergent, Taiwan practitioner
  evidence, and a Simplified-Chinese operating guide repeat the stale-answer,
  source, ownership, review, and escalation problem.
- Trilingual result surfaces: passed. English, Taiwan Traditional Chinese, and
  Simplified Chinese were inspected separately and retain natural locale
  phrasing.
- Clean gap: passed only for the narrow answer-pack task. Existing Wenlan owners
  explain generic document ingestion, source-backed architecture, citation
  verification, stale Pages, and retrieval regression. None starts from an
  approved support question and produces a reviewable answer record with scope,
  prohibited promises, escalation, source revision, owner, and review date. The
  broad AI-support platform intent remains rejected.
- First-party proof: passed within the manual boundary. Wenlan proves supported
  local documents, source-backed Pages, citations, revisions, stale state, lint,
  and human review. It does not prove ticket, CRM, permissions, PII, analytics,
  channel, or reply-deployment features.
- Standalone utility: passed. The answer-record template and review checklist
  remain useful without Wenlan.
- Internal links: passed for preparation. Three same-locale generic owners can
  link from document ingestion, citation verification, and retrieval-regression
  testing after a separate publication approval and an attribution-safe edit
  boundary.
- Authority path: passed conditionally. The maintained
  [awesome-customer-success](https://github.com/keon/awesome-customer-success)
  repository has a `Knowledge Base and Documentation` section and merged
  relevant tool additions in 2026. It has no written contribution guide and
  only 24 GitHub stars at capture time, so it is an exact-fit but limited-reach
  path. A neutral Wenlan entry may be proposed only after separate website and
  external-publication approval; acceptance and a backlink are not assumed.

## Product and page contract

The future owner is for support operations, technical writers, product support,
and customer-success content owners. Its single task is to build and maintain
one bounded, reviewable support answer pack from approved documents.

The page may teach this product-neutral record:

```yaml
question: Can an existing subscription change plans immediately?
supported_answer: <answer supported by the approved policy>
scope: <plan, region, account state, and effective date>
do_not_promise: <actions or outcomes the source does not authorize>
escalate_when: <conditions requiring a human owner>
source_revision: <document id, section, and revision>
owner: <human content owner>
next_review: <date or product-change trigger>
```

It must exclude raw customer conversations, ticket ingestion, CRM or help-desk
sync, PII handling, team permissions, support analytics, automatic policy
approval, customer-facing publication, reply generation or delivery, channel
synchronization, and automatic escalation.

## Prepared routes and publication boundary

The user separately approved exact local preparation. The family is `net-new` /
`prepared`, with these local routes:

- `/learn/build-customer-support-answer-knowledge-base`
- `/zh-TW/learn/build-customer-support-answer-knowledge-base`
- `/zh-CN/learn/build-customer-support-answer-knowledge-base`

No public measurement clock has started. Commit, push, PR, merge, automatic
deployment, request indexing, GSC validation, analytics mutation, the
`awesome-customer-success` proposal, maintainer contact, paid action, and every
other external publication remain separately approval-gated.

## Local verification

The candidate was reconstructed on current `origin/main` and passes Goal and
scenario verification, 52 Goal tests, 254 SEO tests, 79 i18n tests, TypeScript
lint, a 279-page production build, the 162-owner built technical audit, and the
running-build matrix of 35 expected 200 routes plus four intentional 404s.

Fresh Playwright captures used real `393x852` and `1280x900` CSS viewports for
all three locales. Every document has `scrollWidth === clientWidth`, a direct
200, the exact self-canonical, reciprocal `en-US`, `zh-TW`, `zh-CN`, and
`x-default` alternates, Article and BreadcrumbList schema, no FAQPage schema,
no broken image, and no console warning or error. The first FAQ opens in every
locale. A regression test now requires explicit shrinkable mobile grid tracks
instead of relying on implicit `auto` tracks.
