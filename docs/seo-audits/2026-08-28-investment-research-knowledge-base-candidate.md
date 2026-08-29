# Investment research knowledge-base candidate — 2026-08-28

## Decision

Prepare one trilingual net-new family at `/learn/build-investment-research-knowledge-base`. The owner is one company and one reporting cycle: annual reports, filings, earnings releases, presentations, earnings-call material, source changes, thesis invalidation, contradictions, and stale evidence.

This is not a generic `AI for finance` page. It does not promise live market data, paid transcripts or research, XBRL, reliable table extraction, valuation, portfolio monitoring, trading signals, or investment advice.

## Audience, trigger, task, and outcome

- Audience: equity and investment research analysts, independent investors, and finance professionals working from company disclosures.
- Trigger: a new annual report, filing, earnings release, or earnings call changes the evidence behind a company thesis.
- Task: maintain one source-backed company research dossier from documents the user is allowed to use.
- Outcome: separate reported facts, analyst calculations, thesis judgments, contradictions, stale evidence, and open questions while preserving exact sources and revisions.

## Demand and language evidence

### English

- [Anthropic's maintained earnings-analysis command](https://github.com/anthropics/financial-services/blob/main/plugins/vertical-plugins/equity-research/commands/earnings.md) independently requires current earnings data, filings, earnings-call material, thesis updates, and source citations.
- [AI4Finance's maintained directory](https://github.com/AI4Finance-Foundation/Awesome_AI4Finance) contains a distinct finance-research and filing-analysis tool category. This establishes a practitioner ecosystem, not search volume or an endorsement of Wenlan.
- Natural task phrases found in result observations include `investment research`, `earnings analysis`, `filing analysis`, `source citations`, and `research repository`.

### zh-TW

- [BusinessNext's 2026-07-23 practitioner report](https://www.bnext.com.tw/article/91590/notebooklm-gemini-claude-ai-research-workflow) describes a former sell-side analyst keeping one notebook per company, multi-year 法說會 material, 財報, interview notes, standardized Markdown, and cross-company analysis.
- Natural Taiwan wording favors `財報`, `法說會`, `公司研究`, `研究筆記`, and `來源引用`. The page should use `投資研究知識庫` naturally but should not force `AI 知識庫` into every heading.

### zh-CN

- [Dayu Agent](https://github.com/huangbochn/dayu-agent) independently demonstrates a Chinese financial-report research workflow with traceable evidence.
- [Investor Harness](https://github.com/joansongjr/investor-harness) independently preserves evidence levels, gaps, structured archives, and resumable research.
- Natural Simplified Chinese wording favors `投研`, `财报`, `公告`, `研报`, `知识库`, `来源`, and `可追溯`.

## Keyword-tool boundary

Ubersuggest was authenticated and queried once per locale. It returned `volume: 0`, no suggestions, and no search-intent label for all nine exact long-tail phrases. That is an exact-query tool observation, not proof that the broader task has zero demand. The account then reached its three-report daily quota before broader phrases such as `investment research`, `財報分析`, or `投研` could be checked.

Do not use these exact zeroes as the demand gate. Recheck broader task phrases after the quota resets and keep any returned units separate from GSC, which remains the only source for Wenlan's own Google performance.

## Clean-gap check

- `/learn/source-backed-research-knowledge-base` owns a bounded paper set, literature matrix, study methods, limitations, and contradictions.
- `/learn/build-client-project-knowledge-base-for-consulting` owns one client engagement, decisions, deliverables, and handoff.
- `/learn/build-local-ai-knowledge-base-from-documents` owns generic supported-source ingestion.
- `/learn/verify-ai-knowledge-base-citations` owns claim-to-evidence diagnosis.

The new owner is distinct only while it remains company- and reporting-cycle-specific and separates company disclosures, calculations, and analyst judgment. If the page drifts into generic research notes or document ingestion, merge it into the existing owner instead.

## Wenlan proof and limits

Maintained Wenlan source proves Markdown, text, text-extractable PDF, directory, and read-only Obsidian sources; source-backed Pages; citations; revisions; stale state; lint; and review. It does not prove finance-specific ingestion, live data, XBRL, table extraction, valuation, portfolio monitoring, or advice.

The page therefore uses a user-provided document workflow and sends scanned PDFs to external OCR. Financial tables, numbers, and calculations remain subject to original-filing and deterministic-model verification.

## Internal links and authority path

Contextual inbound links are prepared from the three stable locale owners for document ingestion, source-backed architecture, and citation verification. A first-party Wenlan README link is predeclared for a later separately approved source-repo change.

Finance awesome-list or directory submissions are not part of this preparation. The closest lists emphasize finance agents, market data, modeling, or proven adoption, so a Wenlan entry would need an exact-fit maintained artifact and a separate publication decision.

## Stop boundary

Local article, tests, build, technical checks, and desktop plus exact `393px` renders are in scope. Commit, push, PR, merge, deployment, request indexing, GSC validation, analytics mutation, directory submission, and external publication remain unapproved.
