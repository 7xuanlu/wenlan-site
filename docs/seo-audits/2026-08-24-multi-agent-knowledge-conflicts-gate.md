# Multi-Agent Shared-Knowledge Conflict Gate

Captured: `2026-08-24`. This document records candidate evidence in its native unit. It does not claim keyword volume, rank, traffic, or causality.

## Decision

The candidate passes the trilingual scenario gate as one new task owner:

- Audience: teams whose coding, research, or operations agents read and write the same project knowledge.
- Trigger: a shared conclusion is overwritten, contradicted, scope-polluted, or reused after its source changes.
- Task: detect stale writes before acceptance, compare candidate claims with current evidence, review before acceptance, and preserve supersession history.
- Outcome: every accepted conclusion remains attributable to a current source and an inspectable decision.

This does not duplicate `/learn/multi-agent-memory-workflow`. That route owns connecting clients to one daemon, data directory, and space, then using capture, recall, handoff, and distill. The new route owns the later maintenance failure after shared access already works.

## English evidence

- [Governed Shared Memory for Multi-Agent LLM Systems](https://arxiv.org/abs/2606.24535), submitted `2026-06-23`: one paper result naming stale propagation, contradiction persistence, and provenance collapse.
- [MemTX](https://arxiv.org/abs/2607.23929), submitted `2026-07-27`: one paper result distinguishing a memory write from an accepted belief commit.
- [Hindsight discussion 1576](https://github.com/vectorize-io/hindsight/discussions/1576), opened `2026-05-11`: one discussion and one comment; the user reports stale shared files, duplicate memories, and missing cross-document consolidation.
- [Anthropic SDK discussion 1419](https://github.com/anthropics/anthropic-sdk-python/discussions/1419), opened `2026-04-20`: one discussion and eight comments; a five-agent deployment reports overwrite conflicts and hallucinated shared state.

## zh-TW evidence

- [iThome multi-agent conflict report](https://www.ithome.com.tw/news/178146), published `2026-08-14`: one Taiwan article result using `AI 代理` and reporting shared-code conflicts, resource contention, and overlapping decisions.
- [Taiwan shared-knowledge implementation](https://blog.arc.idv.tw/2026/02/27/knowledge-base-institutional-memory-2026-02-27/), published `2026-02-27`: one practitioner article separating short-lived, low-quality shared summaries from a reviewed long-lived knowledge base.

The natural title vocabulary is `多個 AI Agent`, `共用知識`, `覆寫`, `過期結論`, and `審查`. The less natural `多智能體` remains a related term, not the H1.

## zh-CN evidence

- [AI Agent book chapter 10](https://github.com/bojieli/ai-agent-book/blob/main/book/chapter10.md): one maintained Simplified Chinese chapter result distinguishing file-level overwrites from semantic conflicts and describing version checks.
- [DeerFlow issue 4802](https://github.com/bytedance/deer-flow/issues/4802), opened `2026-08-13`: one issue report describing multi-agent memory leakage and personality contamination when scoped facts reach shared default memory.

The natural title vocabulary is `多智能体`, `共享知识`, `覆盖`, `过期结论`, and `写入冲突`. Memory contamination is corroboration, not the primary page intent.

## Wenlan proof and limits

Current Wenlan sources support these claims:

- Sources, atomic Memories, and maintained Pages remain separate.
- Explicit replacements preserve a `supersedes` chain.
- Stale Pages can rebuild from current support.
- Machine changes to human-owned Pages become reviewable revisions.
- The core manual Page update request can carry `expected_version`, but the current public MCP `write_page` refresh input does not. The public agent workflow must re-read and compare before calling it; human-owned Page refreshes become reviewable revisions instead of silent overwrites.
- The shown slash commands require the Wenlan Codex plugin. Other agents use local MCP tools or the local `wenlan pages`, `wenlan capture`, `wenlan lint`, and `wenlan curate revisions` commands.
- The optional Reconcile pass can queue protected conflicts for review, but is off by default.

Wenlan is not a multi-agent scheduler, distributed lock service, or automatic consensus engine. Repository code, tests, specifications, and maintained first-party documents remain authoritative; semantic conflicts still require evidence and review.

## Planned owner and paths

- `/learn/prevent-multi-agent-knowledge-conflicts`
- `/zh-TW/learn/prevent-multi-agent-knowledge-conflicts`
- `/zh-CN/learn/prevent-multi-agent-knowledge-conflicts`

Contextual inbound paths come from the existing multi-agent workflow, LLM Wiki, source-backed knowledge-base, and citation-verification owners. A neutral reference in Hindsight discussion 1576 is predeclared, but no external reply is approved.
