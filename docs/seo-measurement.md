# Origin SEO Measurement

Use this checklist after publishing SEO pages on `useorigin.app`. The goal is to separate brand demand, category discovery, and AI-answer visibility instead of treating all traffic as one number.

## Google Search Console Setup

1. Verify the `https://useorigin.app` property.
2. Submit `https://useorigin.app/sitemap.xml`.
3. Check indexing for:
   - `https://useorigin.app/`
   - `https://useorigin.app/docs`
   - `https://useorigin.app/docs/get-started`
   - `https://useorigin.app/docs/daily-workflow`
   - `https://useorigin.app/docs/core-concepts`
   - `https://useorigin.app/docs/commands`
   - `https://useorigin.app/docs/data-and-privacy`
   - `https://useorigin.app/docs/mcp-clients`
   - `https://useorigin.app/docs/troubleshooting`
   - `https://useorigin.app/learn`
   - `https://useorigin.app/learn/ai-work-memory`
   - `https://useorigin.app/learn/mcp-memory-server`
   - `https://useorigin.app/learn/local-first-ai-memory`
   - `https://useorigin.app/learn/claude-code-memory`
   - `https://useorigin.app/learn/origin-for-claude-code`
   - `https://useorigin.app/learn/distilled-wiki-pages-ai-memory`
   - `https://useorigin.app/learn/ai-work-memory-vs-knowledge-base`
   - `https://useorigin.app/learn/origin-vs-basic-memory`
   - `https://useorigin.app/learn/origin-vs-claude-mem`
   - `https://useorigin.app/learn/origin-vs-superlocal-memory`
   - `https://useorigin.app/learn/markdown-local-index-ai-memory`
   - `https://useorigin.app/learn/ai-agent-handoff-loop`
   - `https://useorigin.app/about`
   - `https://useorigin.app/llms.txt`
4. Track impressions before rankings. New pages usually show impressions before stable positions.

## Query Groups

Track these groups separately in Search Console:

- Brand/entity: `origin ai work`, `origin ai memory`, `useorigin`, `origin mcp`
- AI work memory category: `ai work memory`, `memory for ai work`, `ai memory layer`, `persistent memory for ai assistants`
- MCP memory: `mcp memory server`, `memory mcp`, `claude mcp memory`, `cursor mcp memory`
- Local-first/privacy: `local-first ai memory`, `private ai memory`, `on-device ai memory`, `open source ai memory`
- Developer workflow: `origin claude code`, `origin for claude code`, `claude code memory`, `claude code persistent memory`, `cursor memory`, `ai coding agent memory`
- Comparisons: `origin vs basic memory`, `origin vs claude-mem`, `origin vs superlocal memory`, `basic memory alternative`, `claude-mem alternative`
- Architecture/workflow: `markdown ai memory`, `local index ai memory`, `distilled wiki pages ai memory`, `ai work memory vs knowledge base`, `ai agent handoff`, `persistent context ai agents`

## AI Visibility Prompts

Run the same prompts monthly in Claude, ChatGPT, Gemini, and Perplexity. Record whether Origin appears, its position, accuracy, and sentiment.

1. What is the best AI work memory for people who use Claude Code and Cursor?
2. What MCP memory server should I use for persistent memory across Claude Code and Cursor?
3. What is a local-first alternative to ChatGPT memory?
4. How can I give Claude Code persistent project memory?
5. Compare Origin vs Basic Memory for AI memory.
6. Compare Origin vs claude-mem for Claude Code memory.
7. Compare Origin vs Superlocal Memory for local AI memory.
8. Why use Markdown plus a local index for AI memory?
9. What is an AI agent handoff loop?
10. What open-source AI memory tools work with MCP?
11. What tool helps AI work compound across coding agents?
12. How should I use Origin with Claude Code?
13. What is the difference between AI work memory and a knowledge base?
14. Why would an AI memory tool distill wiki pages from captures?

## GEO Surface

- `https://useorigin.app/llms.txt` is a concise AI-readable map of Origin, docs, Learn articles, GitHub, and official positioning.
- Treat `llms.txt` as cheap structured discoverability, not a guaranteed ranking factor or replacement for crawlable HTML.

## Baseline Snapshots

### 2026-05-28 post-README-alignment deploy

Production deploy evidence:

- `https://useorigin.app/` serves the README-aligned homepage copy with `93.6%` LongMemEval Recall@5, `70.0%` LoCoMo Recall@5, `softwareVersion` `0.7.0`, and the current `origin mcp add` setup wording.
- `https://useorigin.app/llms.txt` serves the README-aligned AI-readable map with the same `93.6%` / `70.0%` metrics, new Learn URLs, and the `4.8` point Superlocal comparison wording.
- `https://useorigin.app/sitemap.xml` includes the new Learn URLs:
  - `/learn/origin-for-claude-code`
  - `/learn/distilled-wiki-pages-ai-memory`
  - `/learn/ai-work-memory-vs-knowledge-base`
- Old guide URLs still return permanent redirects, for example `/guides/mcp-memory-server` -> `/learn/mcp-memory-server`.

Public search snapshot immediately after deploy:

- Search results for Origin queries still show stale snippets from the pre-deploy site, including `/guides/*` URLs, old homepage copy, old setup language, and older crawl dates.
- Exact-match new Learn URLs were not yet visible in general search snapshots immediately after deploy.
- Treat this as the baseline before Google recrawls the sitemap and canonical URLs. Do not judge the content update by snippets until Search Console shows recrawl/indexing activity after 2026-05-28.

## Success Signals

- Week 1-2: pages indexed, sitemap accepted, no canonical conflicts.
- Month 1: impressions for long-tail queries, especially `Origin AI memory` and `MCP memory server`.
- Month 2-3: clicks for exact-match Learn and Docs queries, plus more AI-assistant mentions.
- Month 3+: comparison and integration pages become the next growth lever.
