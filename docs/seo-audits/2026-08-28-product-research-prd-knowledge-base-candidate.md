# Product research to PRD knowledge-base candidate — 2026-08-28

This is demand discovery and candidate-gate evidence for the next Wenlan
three-locale website scenario. It is not authenticated GSC input, keyword
volume, rank, traffic, indexing success, or causality.

## Decision

Prepare one English, zh-TW, and zh-CN owner for this task:

> Before drafting or reviewing a PRD, turn approved user research and prior
> product decisions into a source-backed evidence base where claims,
> contradictions, assumptions, open questions, and decisions remain
> traceable.

The route family is intentionally narrower than generic `AI product manager`
content and broader than a single PRD prompt. It owns the evidence-maintenance
step before drafting or review; it does not promise to write or approve the
PRD.

## Why this is the next feasible high-leverage candidate

| Candidate | Demand observation | Wenlan task fit | Decision |
| --- | --- | --- | --- |
| Customer-support AI knowledge base | Highest request-relative signal in the checked US, Taiwan, and Simplified-Chinese phrase groups; separate result sets repeatedly showed stale-doc and wrong-answer problems. | Weak for the expected task. Wenlan does not provide ticket ingestion, CRM/help-desk integration, team permissions, customer-data redaction, or automatic support-answer deployment. | Reject for now. Publishing would attract integration intent the product cannot satisfy. |
| Student lecture/PDF study knowledge base | Repeated English and Chinese result sets plus existing `AI for students` evidence show a real study workflow. | Partial. Current SERPs heavily expect flashcards, quizzes, spaced repetition, audio/video transcription, image occlusion, and exam planning, which Wenlan does not provide. The existing research owner also covers bounded paper/PDF synthesis. | Continue research; do not publish a broad student page yet. |
| Product research to PRD knowledge base | Request-relative Trends, a current Taiwan PM publication, an English PM LLM wiki, an evidence-to-PRD workflow, and maintained Chinese PM repositories converge on user research, decisions, requirements, PRDs, and handoff. | Strong. Wenlan explicitly serves product teams and supports approved document sources, source-backed Pages, citations, stale state, revisions, review, and lint. | Prepare as the next trilingual family. |

This ranking applies the mandatory product-proof gate after demand discovery.
It does not convert Trends indices into search volume or claim that the chosen
candidate has the largest market.

## Google Trends observations

Captured through signed-in Google Trends Explore on `2026-08-28`. Every row
is a request-relative `0–100` average. Values may be compared only within the
same row.

| Geography and period | Query order | Average indices | Interpretation |
| --- | --- | --- | --- |
| United States, past 12 months | `AI study guide`; `AI product manager`; `AI customer support`; `AI research assistant`; `AI knowledge base` | `20; 24; 43; 16; 12` | Product-manager interest is visible and above the checked study, research-assistant, and category phrases in this request. Customer support is higher but fails product fit. |
| Taiwan, past 12 months, English phrases | same order | `24; 20; 29; 14; 10` | Product-manager interest is visible; the series is sparse and is not keyword volume. |
| Taiwan, past 12 months, native phrases | `AI 學習工具`; `AI 讀書筆記`; `AI 產品經理`; `AI 客服`; `AI 知識庫` | `2; 1; 1; 61; 1` | Native PM and study phrases are too sparse to rank confidently. This is a wording warning, not evidence of zero demand. |
| Worldwide, past 12 months, Simplified-Chinese phrases | `AI 学习工具`; `AI 学习笔记`; `AI 产品经理`; `AI 客服`; `AI 知识库` | `5; 0; 19; 42; 16` | The Simplified-Chinese PM phrase has visible request-relative interest. This is worldwide phrase evidence because mainland Google coverage is not claimed. |

Source URLs and raw query order are stored in
`docs/seo-scenario-backlog.json`.

## Three-locale result-shape observations

### English

The query `product manager user research PRD decisions source backed
knowledge base workflow practitioner` returned:

- [PM LLM Wiki](https://github.com/AliMahmoud15486/pm-llm-wiki), a product-
  management LLM-wiki workflow for problems, decisions, assumptions, open
  questions, customer evidence, and PRD traceability;
- [PMRead](https://pmread.org/), an evidence-to-PRD product workflow;
- product research notebook, research-to-PRD, and product-manager workflow
  results.

GitHub REST verification found the PM LLM Wiki public, non-archived, at `20`
stars, and last pushed `2026-07-03T08:40:37Z`. Its repository has no asserted
license, so it is demand/workflow evidence only and is not an approved
contribution target.

### zh-TW

The query `台灣 產品經理 使用者研究 PRD 決策 AI 知識庫 工作流程`
returned a current [經理人 PM workflow](https://www.managertoday.com.tw/articles/view/72779)
plus Taiwan pages about product research, PRDs, user stories, requirements,
decisions, and handoff.

The `2026-08-25` 經理人 article explicitly warns that AI should not replace
PM judgment or team-authored PRDs. It recommends evidence and exploration,
then describes user-research synthesis and PRD drafting as separate PM
workflows. This supports the candidate's evidence-first boundary.

### zh-CN

The query `中国 产品经理 用户研究 PRD 决策 AI 知识库 工作流` returned
Chinese-first product research, PRD, requirements-review, decision-research,
and Agent workflow repositories.

- [`PANGKAIFENG/ai-product-manager-skills`](https://github.com/PANGKAIFENG/ai-product-manager-skills)
  is MIT-licensed, public, non-archived, pushed `2026-08-26T08:03:53Z`, and
  explicitly covers product research, decision research, PRD drafting, review,
  and handoff.
- [`killvxk/pm-skills-zh`](https://github.com/killvxk/pm-skills-zh) is
  MIT-licensed with `65` skills, `36` workflows, and `148` stars at capture.

These are OSS workflow observations, not Simplified-Chinese keyword volume or
endorsements of Wenlan.

## OpenSEO boundary

OpenSEO was read through the authenticated `wenlan.app` project in the
Qi-Xuan Chrome profile. The project page was accessible, but the account
reported that all hosted credits were used. No new paid DataForSEO keyword or
live-SERP result was available, and no metric was invented.

OpenSEO remains useful for authenticated GSC views and future keyword work
when credits exist. It does not replace GSC, and this candidate does not spend
money or alter the account.

## Wenlan first-party proof

Maintained Wenlan source at
`231794f4e9cab8375f5152c7f2a2858249e6a711` states:

- `README.md:113`: Wenlan is for researchers, writers, consultants,
  **product teams**, and software teams whose knowledge is scattered across
  documents, notes, and AI conversations;
- `README.md:119`: Pages compile current Sources and Memories into source-
  cited Markdown;
- `README.md:205-209`: Pages distill, cite, track, refresh, and stage review;
- `README.md:240-244`: supported sources are Markdown, text, text-extractable
  PDF, folders, and read-only Obsidian Markdown;
- `README.md:256-272`: lint, distill, refresh, and curate are inspectable
  maintenance actions.

This proves the bounded workflow. It does not prove meeting transcription,
Jira, Linear, Slack, CRM or analytics ingestion, PII redaction, participant
recruiting, automatic prioritization, automatic PRD generation, roadmap
decisions, or product-outcome claims.

## Clean owner boundary

The new family owns one product or initiative and one task:

1. register approved interview, support, sales, and research sources;
2. separate observations, interpretations, assumptions, and decisions;
3. organize problem evidence by user segment and source date;
4. preserve contradictions and evidence gaps;
5. map requirement claims to exact sources before drafting a PRD;
6. review stale evidence and keep decision history inspectable.

It does not own academic literature synthesis, a consulting engagement, a
company investment thesis, generic document ingestion, citation debugging, or
project-wide repository context. Those tasks retain their current owners.

## Standalone utility

Without Wenlan, the page still teaches a useful evidence register,
problem-and-segment map, contradiction log, assumption ledger,
requirement-source matrix, open-question list, and decision history.

## Planned authority path

After the website family is separately approved and published, the closest
candidate is
[`PANGKAIFENG/ai-product-manager-skills`](https://github.com/PANGKAIFENG/ai-product-manager-skills).
Its contribution guide accepts reusable product-research and PRD workflows,
requires overlap checks, and prefers updates to existing boundaries when
appropriate. A neutral source-backed evidence example or focused update may be
prepared later; no issue, fork, PR, or maintainer message is authorized here.

## Candidate gate

| Gate | Result |
| --- | --- |
| Inspectable provenance | Pass |
| Repeated or high-intent problem | Pass |
| Three-locale result checks | Pass |
| Clean existing-owner gap | Pass |
| Maintained first-party proof | Pass |
| Standalone utility | Pass |
| Three same-locale contextual links | Pass: generic document ingestion, source-backed architecture, and citation verification |
| Predeclared authority path | Pass, separately approval-gated |

## Approval boundary

Local content and deterministic verification may be prepared. Commit, push,
PR creation, merge, Vercel deployment, request indexing, GSC validation,
analytics mutation, OSS contribution, maintainer messaging, paid action,
synthetic events, and unrelated external publication remain unapproved.
