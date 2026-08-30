# Engineering ADR / RFC knowledge-base demand gate

Captured: 2026-08-29
Evidence role: demand discovery only; not GSC, keyword volume, or rank evidence.

## Decision

Do not create a new ADR or RFC URL. The task already belongs to the existing
trilingual `coding-agent-source-backed-knowledge-base` owner. ADR, RFC, and
technical-design language can nominate a bounded refresh only after that
canonical independently passes the confirmed post-deploy crawl, 20 target-page
impressions, 3 qualified joined-query impressions, and 28-complete-day cooldown
gate.

## Audience, trigger, task, and outcome

- Audience: engineers and coding-agent users maintaining architecture decisions.
- Trigger: an engineer or agent can see the current code but cannot recover why
  an earlier architecture or technical-design decision was accepted.
- Task: connect RFC or design-document evidence to an accepted or superseded ADR,
  preserving rationale, alternatives, consequences, status, and source revision.
- Outcome: retrieve the relevant decision context, then verify it against current
  code, tests, and maintained documentation before treating it as current.

## Trilingual query and result shape

| Locale | Natural query family | Result shape | Owner decision |
| --- | --- | --- | --- |
| English | `ADR RFC design doc decision history`; `why was this architecture decision made`; `source-backed architecture decisions for coding agents` | Maintained ADR guidance and practitioner discussions describe rationale, alternatives, consequences, status, and supersession. | Refresh the existing coding-agent owner when its evidence gate passes. |
| zh-TW | `架構決策紀錄 ADR 找回當初為什麼這樣設計`; `RFC 技術設計文件 決策脈絡`; `架構決策 可追溯 來源` | Results use 架構決策紀錄、決策背景、取捨、可追溯 and shared source-of-truth language. | Refresh the existing localized owner when eligible. |
| zh-CN | `架构决策记录 ADR 找回当初为什么这样设计`; `RFC 技术方案 决策上下文`; `架构决策可追溯 ADR` | Results use 架构决策记录、决策日志、技术方案、评审 and 取舍 language. | Refresh the existing localized owner when eligible. |

## Inspectable evidence

- [ADR GitHub organization](https://adr.github.io/): maintained ADR definition
  and resources; English; captured 2026-08-29; native unit: one maintained site.
- [Hacker News practitioner discussion](https://news.ycombinator.com/item?id=46726249):
  engineers discuss recovering the reason behind old decisions; English;
  captured 2026-08-29; native unit: one discussion.
- [AI-assisted architecture discussion](https://github.com/dermot-obrien/ai-assisted-architecture/discussions/1):
  ADR context, alternatives, consequences, status, and agent prompts; English;
  captured 2026-08-29; native unit: one maintained-project discussion.
- [Microsoft Learn zh-TW ADR guidance](https://learn.microsoft.com/zh-tw/azure/well-architected/architect-role/architecture-decision-record):
  rationale, append-only history, supersession, and shared source of truth;
  zh-TW; captured 2026-08-29; native unit: one official documentation page.
- [Taiwan practitioner ADR article](https://yylab.tw/ai-adr-decision-context/):
  ADR decision context in AI-assisted maintenance; zh-TW; captured 2026-08-29;
  native unit: one practitioner article.
- [AWS zh-CN ADR process](https://docs.aws.amazon.com/zh_cn/prescriptive-guidance/latest/architectural-decision-records/adr-process.html):
  rationale, ownership, review, lifecycle, and supersession; zh-CN; captured
  2026-08-29; native unit: one official documentation page.
- [InnerSource Commons zh-CN RFC pattern](https://patterns.innersourcecommons.org/zh/p/transparent-cross-team-decision-making-using-rfcs):
  transparent cross-team technical decisions through RFCs; zh-CN; captured
  2026-08-29; native unit: one maintained OSS pattern.

The Exa research lane reviewed 150 returned results across two structured
passes and deduplicated the second pass from 73 returned rows to 63 exact URLs.
Exa did not provide regional Google rank or search-volume evidence.

## Candidate gate

| Gate | Result | Reason |
| --- | --- | --- |
| Inspectable provenance | Pass | Sources preserve URL, capture date, language, and native observation unit. |
| Repeated or high-intent task | Pass | Official ADR/RFC guidance and independent practitioners repeat the same recovery and decision-history problem. |
| Trilingual natural language | Pass | English, zh-TW, and zh-CN converge on rationale, trade-offs, status, and traceability without word-for-word translation. |
| Clean Wenlan owner gap | **Fail** | The existing coding-agent source-backed knowledge-base family already owns repository truth, architecture decisions, cited Pages, and verification. |
| Maintained first-party proof | Pass with boundary | Wenlan proves citations, review, stale state, and repository/test verification; it does not prove automated code-to-ADR compliance. |
| Standalone utility | Pass | A vendor-neutral ADR/RFC evidence checklist remains useful without Wenlan. |
| Three contextual locale links | Pass | Coding-agent, source-backed architecture, and citation-verification owners exist in each locale. |
| Authority path | Partial | The existing coding-agent family has an approval-gated handbook candidate; no separate ADR/RFC authority placement was verified. |

## Eligible future refresh boundary

If the existing owner later clears every protected existing-page gate, add one
bounded section that distinguishes an RFC or design document as working evidence
from an ADR as the accepted decision record. Preserve source links, alternatives,
consequences, status, and supersession; require code and test verification. Do not
claim automated policy enforcement, code-to-ADR drift detection, or architecture
approval.

The next-best idea, “does this code path still follow the ADR?”, remains rejected
until maintained first-party Wenlan capability can prove code-to-decision
compliance.
