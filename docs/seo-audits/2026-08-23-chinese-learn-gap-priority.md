# Wenlan Chinese Learn gap priority — 2026-08-23

## Decision

The repository had `47` English Learn articles and only `6` supported zh-TW
and `6` supported zh-CN articles before the current local candidate. This is a
real locale-coverage gap, but it is not evidence that all `41` missing route
counterparts should be translated.

The approved strategy is search-task parity, not route-count parity:

1. Build or localize a Mandarin owner only when zh-TW and zh-CN demand wording
   is independently inspectable.
2. Reuse an existing Mandarin owner when it already answers the same task.
3. Do not reproduce the early English generic-memory cluster merely to make
   counts equal.
4. Keep English, zh-TW, and zh-CN query families natural for each locale.

After the locally prepared citation-verification family, the working source
count becomes `48` English, `7` zh-TW, and `7` zh-CN. These local counts are not
live URLs, impressions, clicks, or publication evidence.

## Priority 1 — locally prepared now

| Search task | English owner | zh-TW wording | zh-CN wording | State |
| --- | --- | --- | --- | --- |
| Verify an AI knowledge-base answer whose citation points to the wrong page, chunk, version, or unsupported conclusion | `/learn/verify-ai-knowledge-base-citations` | `AI 知識庫引用對不上`、`回答沒有依據`、`引用來源可追溯` | `AI 知识库引用对不上`、`知识库回答无依据`、`引用溯源` | Three-locale local implementation prepared; publication separately gated |

The exact demand provenance, overlap check, product proof, inbound links, and
authority path live in `docs/seo-scenario-backlog.json`.

## Priority 2 — research the Chinese task, do not translate the English title

| English seed | Mandarin task to test | Main overlap risk |
| --- | --- | --- |
| `mcp-memory-server` | MCP 知識庫／MCP 知识库 server for Claude Code, Codex, ChatGPT, or Cursor | Generic MCP memory positioning is no longer the acquisition center |
| `claude-code-memory` | Claude Code 專案知識庫／项目知识库 and source-backed context | The published coding-agent knowledge-base owner may already answer it |
| `how-to-give-codex-persistent-memory` | Codex persistent project knowledge or knowledge-base setup | The published Codex source-backed owner may already answer it |
| `how-to-add-mcp-memory-to-cursor` | Cursor MCP 知識庫／知识库 setup | A setup task may be distinct, but generic memory wording is weak |
| `wenlan-vs-notion-ai` | Notion AI 知識庫 vs local maintained knowledge base | Comparison intent must be source-backed and independently repeated |
| `wenlan-vs-chatgpt-memory` | ChatGPT knowledge-base limits vs local source-backed knowledge | Do not reuse the weaker generic ChatGPT memory comparison without new evidence |

## Complete pre-candidate missing-route inventory

The following `41` English slugs had no zh-TW or zh-CN Learn counterpart. The
list is retained so the gap cannot disappear into chat history.

```text
ai-work-memory
mcp-memory-server
local-first-ai-memory
claude-code-memory
wenlan-for-claude-code
ai-work-memory-vs-knowledge-base
wenlan-vs-basic-memory
wenlan-vs-claude-mem
wenlan-vs-superlocal-memory
markdown-local-index-ai-memory
ai-agent-memory-types
ai-agent-handoff-loop
where-wenlan-stores-claude-code-memory
how-to-add-memory-to-claude-code
claude-code-memory-command-vs-wenlan
how-to-give-codex-persistent-memory
how-to-add-mcp-memory-to-cursor
claude-desktop-mcp-memory-setup
ai-agent-memory-local-vs-cloud
ai-coding-agent-loses-context
persistent-project-context-for-ai-agents
mcp-memory-server-localhost-7878
what-to-capture-in-ai-work-memory
wenlan-codex-workflow
wenlan-cursor-workflow
wenlan-claude-desktop-workflow
wenlan-gemini-cli-workflow
wenlan-vscode-mcp-workflow
claude-code-session-handoff
cursor-claude-code-shared-memory
codex-claude-code-shared-memory
multi-agent-memory-workflow
ai-agent-project-status-handoff
wenlan-vs-mcp-memory-service
wenlan-vs-chatgpt-memory
wenlan-vs-notion-ai
wenlan-vs-mem0
ai-memory-provenance
local-git-history-ai-memory
review-before-trust-ai-memory
project-scope-ai-memory
```

## Stop conditions

- Do not interpret the `41` missing counterparts as forty-one validated search
  intents.
- Do not publish literal translations that compete with the six existing
  Mandarin AI knowledge-base and LLM Wiki owners.
- Do not create separate zh-TW and zh-CN owners when their result sets expose
  the same task; use hreflang counterparts of one family.
- Missing GSC rows are unavailable, not zero, and external search observations
  are demand discovery rather than GSC or keyword volume.
