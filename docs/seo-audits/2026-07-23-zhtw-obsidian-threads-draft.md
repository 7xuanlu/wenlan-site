# zh-TW Obsidian Threads Distribution Draft — 2026-07-23

## Status and job

- Status: local draft only; not approved and not published
- Candidate experiment:
  `EXP-2026-07-25-zhtw-obsidian-localization`
- Audience: Traditional Chinese Obsidian users and AI-assisted builders who
  move work across Claude Code, Codex, Cursor, or other MCP clients
- One job: make the difference between a human-maintained vault and durable
  agent work context useful enough to earn qualified attention
- Publication unit: one standalone main post plus its first reply containing
  the article link

The main post does not contain an external link. That keeps the thought useful
on its own and follows the user's existing Threads playbook: one job per post,
avoid combining a reflection, full product explanation, and external link in
the same body. The link reply remains part of the same separately
approval-gated distribution unit.

## Proposed main post

```text
Obsidian 筆記寫得很完整，
Claude Code 開新 session 還是像第一次見面。

我最近重新拆過一次 Obsidian、Claudian、MCP bridge 跟 agent memory 的分工，
發現重點不是誰取代誰，是各自該存什麼。

Obsidian 留研究原文、長筆記、你親自維護的知識。
Claudian 或 MCP bridge 讓 AI 讀寫這些檔案。
Agent memory 留的是下次還會影響決策的後果：做過的 tradeoff、踩過的坑、handoff、已經確認有效的修法。

我現在只用一個分法：

vault 保存原文，
memory 保存後果。

AI 只要搜尋和改 vault 的話，Obsidian 加一個 MCP bridge 就夠。
工作要在 Claude Code、Codex、Cursor 之間移動，才值得多一層能 review、追來源、跨 session 的 memory。

你現在都怎麼補？
每次重貼一次 context，還是靠 CLAUDE.md？
```

## Proposed first reply

```text
完整分工和一個最小 workflow 我寫成繁中版了。

先說清楚，Wenlan 是我在做的。文章裡也寫了什麼情況不需要它，如果只想讓 AI 讀寫 Obsidian，Claudian 或 MCP bridge 通常就夠。

https://wenlan.app/zh-TW/learn/wenlan-vs-obsidian-ai-memory?utm_source=threads&utm_medium=social&utm_campaign=zhtw_obsidian_agent_memory_20260725
```

Preserve the exact tagged URL, platform, post URL, reply URL, and publication
timestamp if this unit is approved. The tagged link is provenance for the
distribution action, not authenticated GSC data. Current analytics cannot
reliably join a Threads source to the page and then to GitHub.

## Claim and proof gate

| Draft claim | Type | Evidence | Decision |
| --- | --- | --- | --- |
| Obsidian is suitable for human-readable, human-maintained knowledge stored as Markdown files. | Verified fact plus bounded recommendation | Obsidian data-storage and plugin documentation linked from the prepared article | Keep |
| Claudian or an Obsidian MCP bridge can let an AI workflow read, write, or search vault content. | Verified project-capability summary | Maintained Claudian and Obsidian Claude Code MCP repositories linked from the prepared article | Keep; do not generalize to every integration |
| A separate memory layer becomes useful when work context must cross clients and sessions with review and provenance. | Product judgment grounded in Wenlan's maintained workflow | Wenlan capture, recall, review, distill, handoff, and source-backed-page behavior cited by the article | Keep as judgment, not a universal requirement |
| Claudian or an MCP bridge may already be enough for vault read/write. | Bounded opinion | Same maintained project documentation and the article's explicit native-first boundary | Keep |
| Wenlan directly syncs an Obsidian vault. | Unsupported and false for the current product | The prepared article explicitly says Wenlan does not provide Obsidian sync | Excluded |

## Pre-publish critique

- **Voice fit:** direct Traditional Chinese, natural developer vocabulary,
  uneven line rhythm, and no hashtags, corporate language, em dash, or
  numbered thought-leadership scaffold.
- **Personal stake:** the post says the author recently reworked this exact
  tool boundary. It is not framed as generic creator advice.
- **Disclosure:** the first reply states that Wenlan is the author's product
  before asking the reader to open the article.
- **Standalone utility:** readers get a usable rule even if they never open
  the link: `vault 保存原文，memory 保存後果`.
- **Honesty:** it clearly says many readers do not need another memory runtime.
- **Reply surface:** the final question asks for a concrete current workaround
  and offers `context` or `CLAUDE.md` as easy response handles.
- **Risk:** the body still carries several English product terms. Keep them
  because they name the real tools and workflow; do not add more jargon.
- **Risk:** the main post and first reply must be published close together if
  approved, or readers cannot reach the article. Record both timestamps.

## Three-model review synthesis

The review was read-only and did not publish or edit external state.

- **Gemini 3.1 Pro:** `ship`. It found the cold-reader distinction clear and
  suggested only minor rhythm changes. Its more formal `重新梳理` wording was
  not adopted because the existing voice source uses plainer language.
- **Claude Opus 4.6:** `revise`. Adopted its stronger concrete opener, direct
  tool naming instead of `前兩個`, more natural `確認有效的修法`, workaround
  question, and explicit author disclosure in the link reply.
- **GPT-OSS 120B:** `revise`. Rejected its recommendation to translate product
  vocabulary such as MCP and agent memory into awkward Chinese labels and add
  `點此深入了解 👉`; those changes make the post more promotional and less
  natural for the target developer audience.

The synthesis uses model criticism as input, not as authority. The final draft
still follows the verified article, the local Threads voice source, and the
campaign's approval and evidence rules.

## Prepared response boundaries

Use these only after separate publication/reply approval.

### If someone asks whether `CLAUDE.md` is enough

```text
如果只有一個 project、一個 client，而且你願意自己維護，CLAUDE.md 很可能就夠。

我會加 memory runtime，通常是因為 context 要跨 client，還需要 review、來源和 handoff，不是因為每個專案都該多一套系統。
```

### If someone asks whether Wenlan syncs Obsidian

```text
目前不會直接 sync Obsidian vault。

Wenlan 會把 pages、sessions、handoffs 投影成可讀 Markdown，你可以用 Obsidian 看或連結，但兩邊仍然有各自的 source of truth。
```

### If someone says plain Markdown is enough

```text
如果主要目的是人自己整理、搜尋和寫作，我也會先選 plain Markdown。

差別只在那些會影響未來 agent 工作的結論，要不要另外有 capture、review、provenance 和跨 session recall。
```

These are response drafts, not authorization to reply externally.

## Native-unit observation plan

Record only fields that are actually available. Missing fields remain
`unavailable`; do not infer or backfill them.

| Time | Threads manual observation | Vercel | GSC | GitHub |
| --- | --- | --- | --- | --- |
| Publish | Exact main-post/reply text, URLs, timestamps, and tagged outbound URL | Preserve pre-publish page row | Preserve pre-publish page row; do not expect same-day data | Total stars |
| 30 minutes | Views, likes, replies, reposts/shares, profile visits, follows, or bookmarks only when the UI exposes them | No causal judgment | Not due | Total stars, separate |
| 24 hours | Same available Threads units | Candidate-page visitors and pageviews; referrers separately | Reporting latency/indexing observation only | Total stars, separate |
| 7 days | Same available Threads units | Candidate-page visitors and pageviews; referrers separately | Page impressions, clicks, and average position when available | Total stars, separate |

Do not calculate the fixed CTA unless reliable `github_outbound` and eligible
acquisition-surface sessions both become available. Do not describe a star
increase, GSC impression, or Vercel visitor as caused by this Threads unit.

## Approval boundary

One explicit distribution approval covers only:

1. the exact main post above;
2. the exact first reply above after the production article is verified; and
3. the prepared factual replies only when the user separately approves live
   conversation handling.

It does not cover Reddit, X, LinkedIn, an OSS directory, paid acquisition,
request indexing, GSC validation, or changes to the draft after approval.
