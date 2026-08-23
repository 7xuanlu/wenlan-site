# Wenlan Search Intent Map

Captured at: 2026-08-23T03:49:23.630Z

This is a deterministic planning and ownership contract for every canonical URL in the sitemap. A primary search phrase identifies the page owner; it is not keyword volume, a ranking promise, or a claim that Google uses the site's meta-keywords field. Locale variants may own the same concept in different languages.

## Coverage

| Locale | Mapped sitemap URLs |
| --- | ---: |
| English | 98 |
| zh-TW | 11 |
| zh-CN | 11 |
| Total | 120 |

The contract fails when a sitemap URL has no owner, one URL has multiple records, a locale has duplicate primary searches or titles, or required intent fields are empty. Technical canonical, hreflang, indexability, and rendering checks remain separate regression gates.

## Google Search guardrails

- One owner means one clear user need and one preferred canonical URL. It does
  not mean creating a page for every wording variant. Google's people-first
  guidance warns against producing many search-first pages or query variants
  without independent value:
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Every page needs a distinct, descriptive, concise title that matches its
  visible main content. Repeated boilerplate and keyword stuffing are rejected
  by this operating rule:
  https://developers.google.com/search/docs/appearance/title-link
- The `Primary search` column is an internal owner label. Google does not use
  the `meta keywords` tag for indexing or ranking:
  https://developers.google.com/search/docs/crawling-indexing/special-tags
- Internal links should use crawlable `<a href>` links and descriptive anchor
  text that explains the destination rather than generic `click here` copy:
  https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Duplicate or substantially overlapping URLs should consolidate through a
  preferred canonical, consistent internal links, sitemap inclusion, or a
  redirect when the duplicate should disappear:
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- English, zh-TW, and zh-CN pages may own the same concept independently when
  their main content is genuinely localized. Every locale page remains
  self-canonical and participates in a reciprocal `hreflang` cluster:
  https://developers.google.com/search/docs/specialty/international/localized-versions

## Latest authenticated ownership evidence

- Source: Search Console API for `sc-domain:wenlan.app`, complete range
  `2026-07-24..2026-08-20`, captured in
  `/tmp/wenlan-seo/gsc-query-pages.json` with 115 privacy-visible query-page
  rows. Property totals, visible-query totals, and the visibility gap remain
  separate in `docs/seo-audits/2026-08-21-weekly-seo.md`.
- No privacy-visible protected AI knowledge-base, LLM-wiki, source-backed-wiki,
  or modifier-qualified Obsidian query appeared on more than one URL in this
  capture. Hidden rows remain unknown, so this is not proof that no
  cannibalization exists.
- `types of ai agent memory` contributes 11 visible impressions and
  `ai agent memory glossary` contributes 3, both on
  `/learn/ai-agent-memory-types`. The old weekly classifier incorrectly named
  `/learn/ai-work-memory` as their owner; the classifier now preserves the
  observed dedicated types-page intent.
- `obsidian 筆記` contributes one visible impression on the zh-TW Obsidian
  route. The classifier now preserves that locale owner and uses the equivalent
  Simplified-Chinese script guard for zh-CN instead of sending Mandarin intent
  to the English route.
- `llm wiki v2` remains a one-impression owner mismatch on `/learn` versus the
  dedicated LLM-wiki article. It stays a measurement item below the protected
  three-qualified-impression action floor; this audit does not authorize a
  copy, title, internal-link, indexing, or canonical change.
- The old click-opportunity queue pooled three unrelated one-impression
  mismatches on `/learn`—MCP memory, Claude Code memory, and LLM wiki—into one
  artificial three-impression action floor. The queue now groups mismatches by
  configured owner and keeps them separate; no single owner clears the floor.

## Scope and interpretation

The 120 primary search phrases below are ownership declarations derived from
the current content model and explicit core-page records. They do not claim
keyword volume or demand. GSC remains the authority for whether Google has
actually associated a query with a page. This change adds a deterministic
guard and corrects report routing only; it does not change public page copy,
metadata, canonicals, sitemap membership, or deployment state.

## en

| URL | Surface | Intent | Primary search | User need |
| --- | --- | --- | --- | --- |
| / | core | navigational | Wenlan | Wenlan is an LLM wiki for AI work: agents capture what they learn, you add sources you trust, and the local daemon keeps source-backed wiki pages current. |
| /about | core | informational | what is Wenlan | Wenlan is an open-source, local-first LLM wiki for AI work, built by agents and grounded in its sources. |
| /docs | core | navigational | Wenlan documentation | Install Wenlan, learn the AI work memory loop, and understand how source-backed wiki pages, provenance, retrieval, and MCP clients fit together. |
| /docs/advanced-retrieval | docs | reference | Wenlan retrieval | Read Wenlan's retrieval status: shipped hybrid retrieval, page channel, graph context, evaluation limits, and opt-in experimental flags on main. |
| /docs/agent-profiles | docs | reference | Wenlan agent profiles | Inspect Claude Code, Codex, Cursor, and local tool attribution in Wenlan with source_agent, agent profiles, trust, enabled state, and CLI commands. |
| /docs/api-examples | docs | reference | Wenlan API examples | Copy local curl examples for Wenlan daemon health, setup status, memory store/search, chat context, review, confirm, and page search endpoints. |
| /docs/architecture | docs | reference | Wenlan architecture | Understand Wenlan's daemon-first architecture, Cargo workspace crates, local and remote MCP paths, Claude Code and Codex plugins, local data layout, and retrieval pipeline. |
| /docs/backup-and-migration | docs | reference | Wenlan backup | Learn what to back up for Wenlan, how readable ~/.wenlan artifacts relate to daemon data, and how to verify a restored or migrated install. |
| /docs/build-from-source | docs | project-navigation | build Wenlan from source | Learn how to build Wenlan from source, run the daemon locally, understand workspace crates, and run contributor verification commands. |
| /docs/capture-quality | docs | task-completion | Wenlan capture | Learn what to capture in Wenlan, what to skip, how to write useful atomic memories, and how corrections, review, distill, and forget fit the memory loop. |
| /docs/changelog | docs | project-navigation | Wenlan changelog | Check Wenlan's current stable version, shipped changes, release dates, recent milestones, and the canonical GitHub changelog. |
| /docs/claude-code-plugin | docs | reference | Wenlan Claude Code plugin | Install and use the Wenlan Claude Code plugin with /setup, /brief, /capture, /recall, /lint, /handoff, /distill, /curate, /forget, and /pages. |
| /docs/cli-and-service | docs | reference | Wenlan CLI | Run the Wenlan CLI for setup, daemon status, doctor diagnostics, background service management, recall, search, capture, and MCP client configuration. |
| /docs/commands | docs | reference | Wenlan commands | Reference the daily Wenlan plugin, CLI, and MCP commands for Claude Code, Codex, and other clients: /setup, /brief, context, /capture, /recall, /handoff, /curate, /distill, and doctor. |
| /docs/configuration | docs | reference | Wenlan configuration | Configure Wenlan with /setup, wenlan setup, wenlan connect, WENLAN_SPACE, WENLAN_BIND_ADDR, local paths, models, API keys, and doctor checks. |
| /docs/contributing | docs | project-navigation | contribute to Wenlan | Learn how to contribute to Wenlan: development setup, architecture boundaries, tests, linting, PR process, licensing, and useful issue reports. |
| /docs/core-concepts | docs | task-completion | Wenlan core concepts | Learn how Wenlan organizes AI work memory with sessions, handoffs, distilled pages, readable artifacts, a daemon-owned retrieval store, and MCP clients. |
| /docs/daily-workflow | docs | task-completion | Wenlan daily workflow | Learn the daily Wenlan loop after setup: /brief or MCP context, /capture, /recall, /handoff, plus review and distillation when needed. |
| /docs/data-and-privacy | docs | reference | Wenlan data privacy | See where Wenlan stores local AI work memory, what stays on your machine, when AI providers may receive prompts, and how readable artifacts and deletion controls work. |
| /docs/desktop-app | docs | project-navigation | Wenlan desktop app | Learn whether the Wenlan desktop app is required, how it ships from the main Wenlan repo, and which license boundary applies. |
| /docs/development-conventions | docs | project-navigation | Wenlan development conventions | Learn Wenlan contributor conventions for crate boundaries, SQL safety, async state snapshots, typed MCP wrappers, dev/prod isolation, and worktree gotchas. |
| /docs/diagnostics-and-issue-reports | docs | reference | Wenlan diagnostics | Use /setup, wenlan status, wenlan doctor, MCP dry-run output, and port checks to diagnose Wenlan setup issues before opening a redacted GitHub issue. |
| /docs/environment-variables | docs | reference | Wenlan environment variables | Reference Wenlan environment variables including WENLAN_SPACE, WENLAN_BIND_ADDR, WENLAN_PORT, WENLAN_DATA_DIR, ORT_DYLIB_PATH, ANTHROPIC_API_KEY, and eval cache variables. |
| /docs/evaluation | docs | project-navigation | Wenlan evaluation | Read Wenlan's benchmark methodology, current LME_Oracle and LME_S retrieval snapshot, eval scope, and how to rerun LongMemEval locally. |
| /docs/experimental-flags | docs | reference | Wenlan experimental flags | Understand Wenlan's opt-in experimental flags for retrieval, context compression, memory maintenance, entity resolution, page guards, and reflection. |
| /docs/faq | docs | reference | Wenlan FAQ | Answer common Wenlan questions about product positioning, install paths, desktop app status, local data, Markdown artifacts, uninstall behavior, and verification. |
| /docs/get-started | core | task-completion | install Wenlan | Install Wenlan, connect Claude Code, Codex, ChatGPT, Claude.ai, or another MCP client, then verify the first capture and recall round trip. |
| /docs/glossary | docs | reference | Wenlan glossary | Define Wenlan product terms including memories, handoffs, distilled pages, spaces, daemon, MCP connector, Markdown projection, local index, provenance, revisions, and retrieval metrics. |
| /docs/http-api | docs | reference | Wenlan HTTP API | Reference Wenlan's local daemon HTTP API surfaces for health, setup, memory store/search, context, review, distill, model setup, and Anthropic key setup. |
| /docs/import-and-portability | docs | reference | Wenlan migration | Migrate selected durable notes into Wenlan, understand the current no-bulk-import boundary, and read Wenlan's projected Markdown pages and session logs outside the daemon. |
| /docs/knowledge-graph | docs | reference | Wenlan knowledge graph | Learn how Wenlan's knowledge graph uses entities, relations, observations, post-ingest enrichment, imported wikilinks, and graph context during retrieval. |
| /docs/local-git-history | docs | reference | Wenlan git history | Learn how Wenlan uses a real local git repository under ~/.wenlan/.git to version readable pages, sessions, handoffs, and status files. |
| /docs/mcp-clients | docs | reference | MCP client setup | Connect local clients with wenlan connect, or connect ChatGPT and Claude.ai through Wenlan's Streamable HTTP MCP Remote Access path. |
| /docs/memory-types | docs | reference | Wenlan memory types | Reference Wenlan memory_type values for identity, preference, decision, lesson, gotcha, and fact, with selection rules, stability tiers, and aliases. |
| /docs/models-and-keys | docs | reference | Wenlan models | Understand Wenlan setup modes: no-model local memory, optional on-device models, optional Anthropic API keys, model status, key status, and privacy implications. |
| /docs/packages-and-registries | docs | reference | Wenlan packages | Understand Wenlan package names across the Claude Code and Codex plugins, npm setup, wenlan-mcp, wenlan-types, crates.io, and GitHub Releases. |
| /docs/platforms | docs | reference | Wenlan platform support | Review Wenlan platform support for macOS, Linux, and Windows, including service registration, data directories, model backend differences, and bind-address caveats. |
| /docs/product-matrix | docs | reference | Wenlan product matrix | Use the Wenlan product matrix to understand the daemon, CLI, local and remote MCP paths, Claude Code and Codex plugins, ChatGPT, the desktop app, platform support, and docs provenance. |
| /docs/project-scope | docs | project-navigation | Wenlan project scope | Understand what Wenlan is and is not: local-first AI work memory, not a life OS, not a workflow suite, not a memory SDK, and not for one-off chats. |
| /docs/releases-and-versioning | docs | project-navigation | Wenlan releases | Learn Wenlan's release-please flow, pre-1.0 version bump rules, package publishing surfaces, and how users should distinguish released behavior from main-branch work. |
| /docs/review-and-trust | docs | task-completion | Wenlan review | Learn how Wenlan handles review queues, pending captures, memory revisions, contradictions, quality-gate rejections, confirm, forget, and trust before distillation. |
| /docs/roadmap | docs | project-navigation | Wenlan roadmap | Understand Wenlan's roadmap themes: reliable retrieval, provenance, local control, cross-client setup, eval discipline, and release status. |
| /docs/security | docs | project-navigation | Wenlan security | Learn how to report Wenlan security issues privately, use security.txt, avoid leaking private memory contents, and keep the local daemon on the intended boundary. |
| /docs/source-backed-pages | docs | reference | Wenlan pages | Learn how Wenlan distilled pages work: source-backed Markdown pages, provenance, stale reasons, revision state, /distill, and /pages. |
| /docs/spaces | docs | reference | Wenlan spaces | Learn how Wenlan spaces isolate AI work memory by project, client, or context using WENLAN_SPACE, spaces.toml, wenlan spaces commands, and doctor resolver state. |
| /docs/testing-and-ci | docs | project-navigation | Wenlan tests | Learn Wenlan's local test workflow, pre-commit and pre-push hooks, PR CI, coverage policy, manual eval boundaries, and verification expectations for contributors. |
| /docs/troubleshooting | docs | reference | Wenlan troubleshooting | Troubleshoot Wenlan setup issues with the daemon, MCP connection, Claude Code plugin commands, wenlan connect, port 7878, and memory recall. |
| /docs/typed-clients | docs | reference | wenlan-types | Learn when to use the wenlan-types crate for Wenlan daemon request and response types, what stability to expect before 1.0, and why the local daemon remains the boundary. |
| /docs/updates-and-uninstall | docs | reference | update Wenlan | Learn how to update Wenlan's local runtime, verify status with wenlan doctor, handle MCP client restarts, and uninstall the daemon safely. |
| /docs/upgrade-notes | docs | reference | Wenlan upgrade notes | Upgrade Wenlan safely across plugin, npm setup, MCP connector, daemon service, spaces, platform support, and local data paths. |
| /download | core | transactional | download Wenlan | Download the current Wenlan CLI, local daemon, and MCP connector for Windows x64, macOS Apple silicon, Linux x64, or Linux ARM64. |
| /learn | core | informational-hub | AI knowledge base guides | Build a source-backed AI knowledge base with maintained LLM wiki pages, citations, review, refresh state, and local workflows for AI agents. |
| /learn/ai-agent-handoff-loop | learn | task-completion | AI agent handoff | Learn how the AI agent handoff loop helps coding agents and AI tools carry decisions, lessons, project context, and next steps across sessions. |
| /learn/ai-agent-memory-local-vs-cloud | learn | informational | local AI agent memory | Compare local-first AI agent memory with hosted memory services and learn when Wenlan's local daemon is the right fit. |
| /learn/ai-agent-memory-types | learn | informational | AI agent memory types | Compare working, episodic, semantic, and procedural memory for AI agents, with a practical guide to storage, retrieval, and updates. |
| /learn/ai-agent-project-status-handoff | learn | task-completion | AI agent project status | Use Wenlan handoffs and captures to preserve project status, open threads, decisions, and next steps for future AI agents. |
| /learn/ai-coding-agent-loses-context | learn | informational | AI coding agent loses context | Diagnose why AI coding agents lose context between sessions and choose the right fix: resume, project instructions, handoffs, or durable memory. |
| /learn/ai-memory-provenance | learn | informational | AI memory provenance | AI memory needs provenance so humans can inspect where facts came from, what superseded them, and whether pages are source-backed. |
| /learn/ai-work-memory | learn | informational | AI work memory | Learn what AI work memory is, when built-in memory is not enough, and how Wenlan keeps work context local, visible, correctable, and MCP-native. |
| /learn/ai-work-memory-vs-knowledge-base | learn | commercial-investigation | AI work memory vs knowledge base | Compare AI work memory and AI knowledge bases: what each stores, when agents use it, and why durable AI work needs both atomic memory and maintained pages. |
| /learn/build-local-ai-knowledge-base-from-documents | learn | task-completion | build AI knowledge base | Build a local AI knowledge base from Markdown, text files, text PDFs, folders, or an Obsidian vault, then verify sources and maintained pages. |
| /learn/choose-ai-knowledge-base-tool | learn | task-completion | AI knowledge base tools | Use eight practical tests to choose an AI knowledge base tool for documents, RAG, local notes, or maintained knowledge across AI agents. |
| /learn/claude-code-memory | learn | task-completion | Claude Code memory | Use CLAUDE.md, auto memory, and /memory well. Add Wenlan when Claude Code needs local, source-backed memory shared with Cursor and Codex. |
| /learn/claude-code-memory-command-vs-wenlan | learn | task-completion | Claude Code /memory | Understand Claude Code /memory, CLAUDE.md, auto memory, and when Wenlan adds local MCP memory shared with Cursor, Codex, and other tools. |
| /learn/claude-code-session-handoff | learn | task-completion | Claude Code handoff | Use Wenlan /handoff in Claude Code to preserve decisions, lessons, gotchas, open threads, and project status for the next session. |
| /learn/claude-desktop-mcp-memory-setup | learn | task-completion | Claude Desktop MCP memory | Set up Claude Desktop with Wenlan MCP memory using the local runtime, wenlan connect claude-desktop, and a doctor/capture/recall check. |
| /learn/codex-claude-code-shared-memory | learn | task-completion | Codex Claude Code shared memory | Wenlan lets Codex and Claude Code share one local, source-backed system for decisions, gotchas, handoffs, and project context. |
| /learn/cursor-claude-code-shared-memory | learn | task-completion | Cursor Claude Code shared memory | Connect Cursor through MCP and Claude Code through the Wenlan plugin so both AI coding tools share one local, source-backed memory store. |
| /learn/distilled-wiki-pages-ai-memory | learn | informational | LLM wiki | Learn the Karpathy LLM Wiki pattern, how it differs from RAG, and how source-backed pages, Obsidian, checks, and refreshes fit together. |
| /learn/how-to-add-mcp-memory-to-cursor | learn | task-completion | Cursor MCP memory | Add local-first MCP memory to Cursor with Wenlan setup, wenlan connect cursor, client restart checks, and a capture/recall verification loop. |
| /learn/how-to-add-memory-to-claude-code | learn | task-completion | add memory to Claude Code | Add local-first AI work memory to Claude Code with the Wenlan plugin, /setup, /brief, /capture, /recall, and /handoff. |
| /learn/how-to-give-codex-persistent-memory | learn | task-completion | Codex persistent memory | Use Wenlan with Codex by installing the local runtime, adding the Codex MCP client config, and verifying context, capture, and recall. |
| /learn/local-first-ai-memory | learn | informational | local-first AI work memory | Learn why local-first AI work memory matters for privacy, ownership, and long-running work. Wenlan keeps work context visible, correctable, and on your machine. |
| /learn/local-git-history-ai-memory | learn | informational | git history AI memory artifacts | Wenlan keeps real local git history for readable pages, session logs, and project status Markdown so AI work artifacts can be inspected and recovered. |
| /learn/markdown-local-index-ai-memory | learn | informational | readable AI memory | Learn why Wenlan combines a daemon-owned local retrieval store with human-readable artifacts instead of hiding AI memory inside an opaque database. |
| /learn/mcp-memory-server | learn | informational | MCP memory server | Connect Claude Code, Codex, Cursor, ChatGPT, Claude.ai, and other clients to Wenlan with local or Streamable HTTP MCP. |
| /learn/mcp-memory-server-localhost-7878 | learn | informational | 127.0.0.1 7878 Wenlan | Debug Wenlan's local MCP memory server on 127.0.0.1:7878: daemon status, wenlan-mcp config, client restart, and doctor checks. |
| /learn/multi-agent-memory-workflow | learn | task-completion | multi-agent memory workflow | Use Wenlan's daemon, MCP tools, spaces, capture, recall, handoff, and distill to coordinate multi-agent AI work locally. |
| /learn/persistent-project-context-for-ai-agents | learn | informational | persistent project context | Learn what persistent project context means for AI agents and how Wenlan keeps decisions, lessons, handoffs, and pages available locally. |
| /learn/project-scope-ai-memory | learn | informational | what Wenlan is not | Wenlan scopes to local-first AI work memory. It is not a life OS, workflow suite, generic memory infrastructure SDK, or one-off chat tool. |
| /learn/review-before-trust-ai-memory | learn | informational | stale AI agent memory | Fix stale AI agent memory by tracing the source, checking scope, reviewing contradictions, preserving corrections, and deleting only records that should not remain. |
| /learn/source-backed-wiki-pages-ai-work | learn | informational | source backed AI knowledge base | Build a source-backed AI knowledge base with trusted sources, atomic knowledge, maintained LLM-wiki pages, citations, review, and refresh. |
| /learn/wenlan-claude-desktop-workflow | learn | task-completion | Wenlan Claude Desktop workflow | Claude Desktop can use Wenlan through MCP to capture planning decisions, recall local context, and share memory with coding tools. |
| /learn/wenlan-codex-workflow | learn | task-completion | Wenlan Codex workflow | A practical Wenlan workflow for Codex users: connect MCP, load context, capture decisions, recall project memory, and hand off to future sessions. |
| /learn/wenlan-cursor-workflow | learn | task-completion | Wenlan Cursor workflow | A Cursor workflow for Wenlan: connect MCP, load context, capture decisions, recall prior work, and share memory with Claude Code or Codex. |
| /learn/wenlan-for-claude-code | learn | task-completion | Wenlan Claude Code | Install the Wenlan Claude Code plugin, run /setup, start with /brief, capture durable decisions, and hand off sessions with local AI work memory. |
| /learn/wenlan-gemini-cli-workflow | learn | task-completion | Gemini CLI memory | Use Wenlan's local MCP path with Gemini CLI for context, capture, recall, and cross-session handoffs. |
| /learn/wenlan-vs-basic-memory | learn | commercial-investigation | Wenlan vs Basic Memory | Compare Wenlan and Basic Memory for local AI work memory, Markdown knowledge bases, MCP workflows, human control, and long-running AI sessions. |
| /learn/wenlan-vs-chatgpt-memory | learn | commercial-investigation | Wenlan vs ChatGPT memory | ChatGPT memory can personalize one assistant. Wenlan keeps AI work memory local, source-backed, inspectable, and usable across MCP clients. |
| /learn/wenlan-vs-claude-mem | learn | commercial-investigation | Wenlan vs claude-mem | Compare Wenlan and claude-mem for automatic session capture, explicit source-backed memory, progressive retrieval, cross-agent workflows, and local control. |
| /learn/wenlan-vs-mcp-memory-service | learn | commercial-investigation | Wenlan vs mcp-memory-service | Wenlan focuses on local AI work memory for users. mcp-memory-service is a broad self-hosted memory service for MCP, HTTP, and agent workflows. |
| /learn/wenlan-vs-mem0 | learn | commercial-investigation | Wenlan vs Mem0 | Mem0 is memory infrastructure for agents and apps. Wenlan is a local-first personal knowledge library for AI work across Claude Code, Cursor, Codex, and MCP clients. |
| /learn/wenlan-vs-notion-ai | learn | commercial-investigation | Wenlan vs Notion AI | Notion AI works from hosted workspace content and Notion MCP. Wenlan stores the AI work memory layer locally by default for MCP clients. |
| /learn/wenlan-vs-obsidian-ai-memory | learn | commercial-investigation | obsidian claude code | Learn when Claude Code can use an Obsidian vault directly, what IDE and MCP bridges add, and when durable source-backed knowledge needs a separate lifecycle. |
| /learn/wenlan-vs-superlocal-memory | learn | commercial-investigation | Wenlan vs SuperLocalMemory | Compare Wenlan with SuperLocalMemory v3.8.3: local agent memory, temporal retrieval, team controls, MCP workflows, auditability, and source-backed pages. |
| /learn/wenlan-vscode-mcp-workflow | learn | task-completion | VS Code MCP memory | Connect VS Code MCP clients to Wenlan and use one source-backed context system for capture, recall, and project handoff. |
| /learn/what-to-capture-in-ai-work-memory | learn | informational | what to capture in AI memory | Capture decisions, lessons, gotchas, preferences, constraints, and durable facts in Wenlan. Skip logs, filler, and facts the repo can derive. |
| /learn/where-wenlan-stores-claude-code-memory | learn | task-completion | where does Claude Code store memory | Find Wenlan's local Claude Code memory artifacts under ~/.wenlan: pages, sessions, status files, database symlinks, and git history. |

## zh-TW

| URL | Surface | Intent | Primary search | User need |
| --- | --- | --- | --- | --- |
| /zh-TW | core | navigational | 文瀾 | Wenlan 文瀾是 AI 工作的 LLM wiki：AI 代理捕捉學到的內容，你加入信任來源，本地 daemon 讓有來源依據的 wiki 頁面保持最新。 |
| /zh-TW/about | core | informational | 文瀾是什麼 | Wenlan 是 open-source、local-first 的 AI 工作 LLM wiki，由 AI 代理建立，並以來源為根基。 |
| /zh-TW/docs | core | navigational | 文瀾文件 | 安裝 Wenlan，學習 AI 工作記憶循環，理解有來源依據的 wiki 頁面、provenance、retrieval 和 MCP clients 如何配合。 |
| /zh-TW/docs/get-started | core | task-completion | 安裝文瀾 | 安裝 Wenlan，連接 Claude Code、Codex、ChatGPT、Claude.ai 或其他 MCP client，再驗證第一次 capture 與 recall round trip。 |
| /zh-TW/download | core | transactional | 下載文瀾 | 下載最新版 Wenlan CLI、本地 daemon 與 MCP connector，支援 Windows x64、macOS Apple silicon、Linux x64 與 Linux ARM64。 |
| /zh-TW/learn | core | informational-hub | AI 知識庫指南 | 建立有來源、可審查、會持續更新的 AI 知識庫，並用 Wenlan 將可信資料整理成 AI agent 可重用的 LLM Wiki 頁面。 |
| /zh-TW/learn/build-local-ai-knowledge-base-from-documents | learn | task-completion | 建立 AI 知識庫 | 用 Markdown、文字檔、文字型 PDF、資料夾或 Obsidian vault 建立本地 AI 知識庫，並驗證同步、來源與維護型頁面。 |
| /zh-TW/learn/choose-ai-knowledge-base-tool | learn | task-completion | AI 知識庫工具 | 用 8 個實際測試選擇 AI 知識庫工具，比較文件問答、RAG、本地筆記與跨 AI agent 維護知識的差異。 |
| /zh-TW/learn/distilled-wiki-pages-ai-memory | learn | informational | LLM Wiki 知識庫 | 了解 Karpathy LLM Wiki 的架構、它和 RAG 的差異，以及來源頁面、Obsidian、驗證與持續更新如何配合。 |
| /zh-TW/learn/source-backed-wiki-pages-ai-work | learn | informational | AI 知識庫 | 建立有來源的 AI 知識庫：分開可信來源、原子知識與 LLM Wiki 頁面，並用 Wenlan 保留引用、更新與審查狀態。 |
| /zh-TW/learn/wenlan-vs-obsidian-ai-memory | learn | commercial-investigation | Obsidian Claude Code | 了解 Claude Code 何時直接讀 Obsidian vault 就夠、IDE 與 MCP bridge 增加什麼，以及 AI 知識庫何時需要來源、更新與審查流程。 |

## zh-CN

| URL | Surface | Intent | Primary search | User need |
| --- | --- | --- | --- | --- |
| /zh-CN | core | navigational | 文澜 | Wenlan 文澜是 AI 工作的 LLM wiki：AI 代理捕捉学到的内容，你加入信任来源，本地 daemon 让有来源依据的 wiki 页面保持最新。 |
| /zh-CN/about | core | informational | 文澜是什么 | Wenlan 是 open-source、local-first 的 AI 工作 LLM wiki，由 AI 代理建立，并以来源为根基。 |
| /zh-CN/docs | core | navigational | 文澜文档 | 安装 Wenlan，学习 AI 工作记忆循环，理解有来源依据的 wiki 页面、provenance、retrieval 和 MCP clients 如何配合。 |
| /zh-CN/docs/get-started | core | task-completion | 安装文澜 | 安装 Wenlan，连接 Claude Code、Codex、ChatGPT、Claude.ai 或其他 MCP client，再验证第一次 capture 与 recall round trip。 |
| /zh-CN/download | core | transactional | 下载文澜 | 下载最新版 Wenlan CLI、本地 daemon 与 MCP connector，支持 Windows x64、macOS Apple silicon、Linux x64 与 Linux ARM64。 |
| /zh-CN/learn | core | informational-hub | AI 知识库指南 | 建立有来源、可审核、会持续更新的 AI 知识库，并用 Wenlan 把可信资料整理成 AI agent 可复用的 LLM Wiki 页面。 |
| /zh-CN/learn/build-local-ai-knowledge-base-from-documents | learn | task-completion | 搭建 AI 知识库 | 用 Markdown、文本文件、文本型 PDF、文件夹或 Obsidian vault 搭建本地 AI 知识库，并验证同步、来源与维护型页面。 |
| /zh-CN/learn/choose-ai-knowledge-base-tool | learn | task-completion | AI 知识库工具 | 用 8 个实际测试选择 AI 知识库工具，比较文档问答、RAG、本地笔记与跨 AI agent 维护知识的区别。 |
| /zh-CN/learn/distilled-wiki-pages-ai-memory | learn | informational | LLM Wiki 知识库 | 了解 Karpathy LLM Wiki 的架构、它和 RAG 的区别，以及来源页面、Obsidian、校验与持续更新如何配合。 |
| /zh-CN/learn/source-backed-wiki-pages-ai-work | learn | informational | AI 知识库 | 建立有来源的 AI 知识库：分开可信来源、原子知识与 LLM Wiki 页面，并用 Wenlan 保留引用、更新与审核状态。 |
| /zh-CN/learn/wenlan-vs-obsidian-ai-memory | learn | commercial-investigation | Obsidian Claude Code | 了解 Claude Code 何时直接读取 Obsidian vault 就够、IDE 与 MCP bridge 增加什么，以及 AI 知识库何时需要来源、更新与审核流程。 |
