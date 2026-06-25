# Wenlan SEO Measurement

Use this checklist for Wenlan SEO measurement. The current deployed property remains `useorigin.app`; keep these URLs until the public Wenlan site/domain changes. The goal is to separate brand demand, category discovery, and AI-answer visibility instead of treating all traffic as one number.

Reusable runbook: `docs/seo-growth-loop.md`.

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
   - `https://useorigin.app/learn/claude-code-memory-command-vs-wenlan`
   - `https://useorigin.app/learn/wenlan-for-claude-code`
   - `https://useorigin.app/learn/distilled-wiki-pages-ai-memory`
   - `https://useorigin.app/learn/ai-work-memory-vs-knowledge-base`
   - `https://useorigin.app/learn/wenlan-vs-basic-memory`
   - `https://useorigin.app/learn/wenlan-vs-claude-mem`
   - `https://useorigin.app/learn/wenlan-vs-superlocal-memory`
   - `https://useorigin.app/learn/markdown-local-index-ai-memory`
   - `https://useorigin.app/learn/ai-agent-handoff-loop`
   - `https://useorigin.app/learn/where-wenlan-stores-claude-code-memory`
   - `https://useorigin.app/learn/how-to-add-memory-to-claude-code`
   - `https://useorigin.app/learn/how-to-give-codex-persistent-memory`
   - `https://useorigin.app/learn/how-to-add-mcp-memory-to-cursor`
   - `https://useorigin.app/learn/claude-desktop-mcp-memory-setup`
   - `https://useorigin.app/learn/ai-agent-memory-local-vs-cloud`
   - `https://useorigin.app/learn/ai-coding-agent-loses-context`
   - `https://useorigin.app/learn/persistent-project-context-for-ai-agents`
   - `https://useorigin.app/learn/mcp-memory-server-localhost-7878`
   - `https://useorigin.app/learn/what-to-capture-in-ai-work-memory`
   - `https://useorigin.app/learn/wenlan-codex-workflow`
   - `https://useorigin.app/learn/wenlan-cursor-workflow`
   - `https://useorigin.app/learn/wenlan-claude-desktop-workflow`
   - `https://useorigin.app/learn/wenlan-gemini-cli-workflow`
   - `https://useorigin.app/learn/wenlan-vscode-mcp-workflow`
   - `https://useorigin.app/learn/claude-code-session-handoff`
   - `https://useorigin.app/learn/cursor-claude-code-shared-memory`
   - `https://useorigin.app/learn/codex-claude-code-shared-memory`
   - `https://useorigin.app/learn/multi-agent-memory-workflow`
   - `https://useorigin.app/learn/ai-agent-project-status-handoff`
   - `https://useorigin.app/learn/wenlan-vs-mcp-memory-service`
   - `https://useorigin.app/learn/wenlan-vs-chatgpt-memory`
   - `https://useorigin.app/learn/wenlan-vs-obsidian-ai-memory`
   - `https://useorigin.app/learn/wenlan-vs-notion-ai`
   - `https://useorigin.app/learn/wenlan-vs-mem0`
   - `https://useorigin.app/learn/source-backed-wiki-pages-ai-work`
   - `https://useorigin.app/learn/ai-memory-provenance`
   - `https://useorigin.app/learn/local-git-history-ai-memory`
   - `https://useorigin.app/learn/review-before-trust-ai-memory`
   - `https://useorigin.app/learn/project-scope-ai-memory`
   - `https://useorigin.app/about`
   - `https://useorigin.app/llms.txt`
4. Track impressions before rankings. New pages usually show impressions before stable positions.
5. Do not start another content batch until the newest Learn pages are discovered/indexed or GSC shows which query clusters are earning impressions.

## Weekly Searchfit/GSC Loop

Use `docs/search-console-umami.md` as the operating checklist. The loop is:

1. Export Search Console Queries and Pages for the last 28 days.
2. Classify queries by the groups below.
3. Identify positions 8-30, low CTR pages, pages with impressions but no clicks, and indexed pages with no impressions.
4. Check Search Console indexing reasons before changing content.
5. Decide one action per row: wait, technical fix, title/meta refresh, internal-link refresh, page expansion, distribution, or new article.
6. Record the before/after snapshot whenever content changes.

Decision gates:

- **Technical before content:** sitemap, canonical, redirect, `noindex`, and status issues are fixed before writing.
- **Refresh before net-new:** pages with impressions get better quick answers, command blocks, screenshots, and internal links before creating adjacent articles.
- **New article only on evidence:** write a new Learn article only when GSC/Searchfit shows a query cluster that current pages do not answer.
- **Reddit only when useful:** use `docs/reddit-distribution.md` only for value-first posts that teach a workflow, checklist, or lesson without requiring Wenlan.

Indexing note: `Alternate page with proper canonical tag` is usually informational when it points from an old, duplicate, or redirected URL to the canonical page. Treat it as a problem only when the canonical URL we want indexed is missing, non-200, absent from sitemap, or replaced by the wrong canonical.

## Query Groups

Track these groups separately in Search Console:

- Brand/entity: `wenlan ai work`, `wenlan ai work memory`, `wenlan mcp`, `useorigin`
- AI work memory category: `ai work memory`, `memory for ai work`, `ai work memory layer`, `persistent memory for ai assistants`
- MCP memory: `mcp memory server`, `memory mcp`, `claude mcp memory`, `cursor mcp memory`
- Local-first/privacy: `local-first ai work memory`, `private ai work memory`, `on-device ai work memory`, `open source ai work memory`
- Developer workflow: `wenlan claude code`, `wenlan for claude code`, `claude code memory`, `claude code persistent memory`, `cursor memory`, `ai coding agent work memory`
- Setup and troubleshooting: `where does claude code store memory`, `add memory to claude code`, `codex persistent memory`, `cursor mcp memory`, `claude desktop mcp memory`, `wenlan 7878`
- Comparisons: `wenlan vs basic memory`, `wenlan vs claude-mem`, `wenlan vs superlocal memory`, `wenlan vs mcp-memory-service`, `wenlan vs chatgpt memory`, `wenlan vs obsidian`, `wenlan vs notion ai`, `wenlan vs mem0`, `basic memory alternative`, `claude-mem alternative`
- Obsidian AI memory: `obsidian ai memory`, `obsidian-mind alternative`, `claude-obsidian alternative`, `claude obsidian memory`, `obsidian mcp`, `obsidian mcp tools`, `obsidian claude code mcp`, `claude code obsidian memory`
- Architecture/workflow: `markdown ai work memory`, `local index ai work memory`, `distilled wiki pages ai work memory`, `ai work memory vs knowledge base`, `ai agent handoff`, `persistent context ai agents`, `ai memory provenance`, `review ai memory`, `git history ai memory`

## AI Visibility Prompts

Run the same prompts monthly in Claude, ChatGPT, Gemini, and Perplexity. Record whether Wenlan appears, its position, accuracy, and sentiment.

Generate the manual worksheet before running prompts:

```bash
pnpm seo:ai-visibility -- --date YYYY-MM-DD
```

The worksheet is written to `docs/seo-audits/YYYY-MM-DD-ai-visibility.md` by default. It does not call external assistants or infer answers; fill the rows manually from live assistant responses. Reruns refuse to overwrite an existing worksheet unless you pass `--force true`.

1. What is the best AI work memory for people who use Claude Code and Cursor?
2. What MCP memory server should I use for persistent memory across Claude Code and Cursor?
3. What is a local-first alternative to ChatGPT memory?
4. How can I give Claude Code persistent project memory?
5. Compare Wenlan vs Basic Memory for AI work memory.
6. Compare Wenlan vs claude-mem for Claude Code memory.
7. Compare Wenlan vs Superlocal Memory for local AI work memory.
8. Why use Markdown plus a local index for AI work memory?
9. What is an AI agent handoff loop?
10. What open-source AI memory tools work with MCP?
11. What tool helps AI work compound across coding agents?
12. How should I use Wenlan with Claude Code?
13. What is the difference between AI work memory and a knowledge base?
14. Why would an AI work memory tool distill wiki pages from captures?
15. How do I add memory to Claude Code?
16. How do I give Codex persistent project memory?
17. How do I add MCP memory to Cursor?
18. Where does Wenlan store Claude Code memory?
19. Compare Wenlan vs ChatGPT memory.
20. Compare Wenlan vs Mem0 for AI memory.
21. Compare Wenlan vs Obsidian, obsidian-mind, and claude-obsidian for AI memory.
22. What is AI memory provenance and why does it matter?
23. How can Cursor and Claude Code share AI memory?
24. What should I capture in AI work memory?

## GEO Surface

- `https://useorigin.app/llms.txt` is the current deployed AI-readable map of Wenlan, docs, Learn articles, GitHub, and official positioning. Update this surface when the public Wenlan site/domain changes.
- Treat `llms.txt` as cheap structured discoverability, not a guaranteed ranking factor or replacement for crawlable HTML.

## Distribution Surface

- Reddit drafts live in `docs/reddit-distribution.md`.
- Treat Reddit as a feedback and referral channel, not a backlink shortcut.
- Measure each post by Reddit referrals, branded-query lift, comments that reveal search intent, and whether it creates a useful page-refresh idea.

## Baseline Snapshots

### 2026-06-24 LME metric update

Local build evidence; recheck production after the Vercel deploy:

- The homepage build serves the README-aligned copy with `LME_Oracle` `93.6%` Recall@5 / `0.857` MRR / `0.883` NDCG@10, `LME_S` `87.7%` Recall@5 / `0.815` MRR / `0.822` NDCG@10 on the stratified `N=90` deep-S substrate, `softwareVersion` `0.9.1`, and the current `wenlan mcp add` setup wording.
- The `llms.txt` build serves the README-aligned AI-readable map with the same `LME_Oracle` / `LME_S` framing, retrieval token comparison, new Learn URLs, and updated Superlocal comparison wording.
- The local sitemap includes the new Learn URLs:
  - `/learn/wenlan-for-claude-code`
  - `/learn/distilled-wiki-pages-ai-memory`
  - `/learn/ai-work-memory-vs-knowledge-base`
- Old guide URLs still return permanent redirects, for example `/guides/mcp-memory-server` -> `/learn/mcp-memory-server`.

Public search snapshot caveat:

- Search results for Wenlan queries may show stale snippets from the pre-deploy site, including `/guides/*` URLs, old homepage copy, old setup language, and older crawl dates.
- Exact-match new Learn URLs may lag general search snapshots immediately after deploy.
- Treat this as the baseline before Google recrawls the sitemap and canonical URLs. Do not judge the content update by snippets until Search Console shows recrawl/indexing activity after 2026-06-24.

## Success Signals

- Week 1-2: pages indexed, sitemap accepted, no canonical conflicts.
- Month 1: impressions for long-tail queries, especially `Wenlan AI memory` and `MCP memory server`.
- Month 2-3: clicks for exact-match Learn and Docs queries, plus more AI-assistant mentions.
- Month 3+: comparison and integration pages become the next growth lever.
