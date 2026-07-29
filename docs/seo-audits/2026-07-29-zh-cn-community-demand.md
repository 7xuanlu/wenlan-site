# Simplified Chinese Community Demand — 2026-07-29

Captured at `2026-07-29T04:29:56Z`.

This is a demand-discovery snapshot for candidate nomination. It is not
authenticated GSC, Google Trends, keyword volume, or a claim that engagement
on one platform converts into search demand on another.

## Source and unit rules

- Preserve titles and phrases as community authors used them.
- Preserve each platform metric in its native name and unit.
- Do not add, normalize, or compare plays, views, clicks, replies, reads,
  votes, favorites, comments, stars, Trends indices, or GSC impressions.
- Deduplicate reposted or syndicated articles before counting independent
  corroboration.
- Treat Xiaohongshu, WeChat, and other login- or app-gated sources as manual
  enrichment. Lack of a public observation is not zero demand.
- Future raw captures belong under
  `/tmp/wenlan-seo-demand/YYYY-MM-DD/zh-cn-community/`.

## Initial public snapshot

| Platform | Public wording | Native observation at capture | URL |
| --- | --- | --- | --- |
| Bilibili | `Hermes+Obsidian+LLM wkii，构建AI知识库` | `8.0万播放` | https://www.bilibili.com/video/BV16hZFB5ERM/ |
| Bilibili | `跟Karpathy学搭建AI知识库-附Obsidian实例` | `3.1万播放` | https://www.bilibili.com/video/BV1mgQPBXEZp/ |
| Bilibili | `ObsidianCLI+ClaudeCode:我的AI笔记工作流` | `2.5万播放` | https://www.bilibili.com/video/BV1qNAqzxETr/ |
| Bilibili | `〖新手教程〗这绝对是B站最好的llm-wiki搭建知识库教程，手把手教会你0代码实现Karpathy llm-wiki知识库，全程详解，小白也能轻松上手！` | `4,885` displayed as the leading video count | https://www.bilibili.com/video/BV1vaoYBfEXg/ |
| V2EX | `上线了一个 LLM wiki 网站...让 AI 帮你维护私人知识库` | 1,236 clicks; 1 reply | https://www.v2ex.com/t/1209841 |
| V2EX | `在 Obsidian 里面装了 Claude Code 相关的插件` | 2,116 views; 6 replies | https://v2ex.com/t/1183826 |
| V2EX | `现在知识库最佳实践是什么？` | 1,654 views; 4 replies in the inspected result | https://v2ex.com/t/1210662 |
| Juejin | `用 Obsidian 实现 LLM Wiki 知识库管理方法` | 2,053 reads | https://juejin.cn/post/7634711670124920882 |
| Juejin | `从 0 到 1 搭建 AI 知识库：obsidian-wiki 完整实操` | Public article; engagement cells were not reliable in the inspected response | https://juejin.cn/post/7637823184209494051 |
| Zhihu | `Obsidian + AI：从零搭建智能知识库` | Public article; no reliable engagement total captured | https://zhuanlan.zhihu.com/p/2039490782814528850 |

The observations above are not a representative survey of each platform.
They establish inspectable wording and independent recurrence only.

## Query-language families

### Core category

- `LLM Wiki`
- `LLM Wiki 知识库`
- `AI 知识库`
- `本地 AI 知识库`
- `AI 维护知识库`

The core job described across platforms is not merely storing notes. It is
letting an LLM ingest sources, maintain connected Markdown pages, update old
conclusions, and keep a durable wiki useful over time.

### Architecture and problem language

- `RAG vs LLM Wiki`
- `持续更新的知识库`
- `知识复利`
- `有来源的知识库`
- `知识库最佳实践`

These phrases expose the standalone question a Wenlan page must answer:
whether knowledge is retrieved from raw chunks at query time or compiled into
maintained, inspectable pages with sources and revision behavior.

### Tool and ecosystem bridge

- `Claude Code + Obsidian`
- `Obsidian CLI + Claude Code`
- `Obsidian MCP`
- `Claudian`
- `AI 笔记工作流`
- `第二大脑`

The bridge is concrete tool use: direct vault access, CLI or MCP connection,
agent-assisted organization, and human-readable Markdown. `第二大脑` and
`AI 笔记工作流` remain adjacent vocabulary until their intent is separately
clean enough.

## Coverage and candidate decision

Wenlan already has
`/zh-CN/learn/distilled-wiki-pages-ai-memory` and
`/zh-CN/learn/source-backed-wiki-pages-ai-work`. The first route partially
answers the strongest community family but currently leads with
`AI 工作的 LLM wiki`, not the repeated `LLM Wiki 知识库` and
`AI 知识库` wording.

The clean next step is therefore an existing-page candidate, not another URL:

1. Inspect a zh-CN title/meta/quick-answer refresh around `LLM Wiki 知识库`,
   `AI 知识库`, and `本地 AI 知识库`.
2. Preserve the maintained Raw Sources → Wiki → Schema distinction, source
   IDs, revision behavior, and Wenlan's real `/distill` workflow.
3. Add a standalone `RAG vs LLM Wiki` answer without making unsupported
   performance claims.
4. Keep Obsidian and Claude Code as an ecosystem bridge rather than replacing
   the AI-knowledge-base center.
5. Apply the full experiment contract and approval boundary before publishing.

This snapshot nominates investigation and advance preparation. It does not
declare Google rank, traffic potential, or an experiment result.
