# Reddit Distribution Playbook

Use Reddit for learning and distribution only after the relevant Learn/Docs page is indexed and the post has standalone value. Do not post generic launch announcements or thin links to Origin. The target is branded-search lift, developer trust, and referral learning, not immediate ranking manipulation.

## Rules

- Lead with the problem and what was learned.
- Do not mention Origin in the title.
- Include a link only when it helps the reader verify details or continue.
- Prefer one useful diagram, command checklist, or failure checklist over broad opinion.
- Track every post in Umami and Search Console for branded-search lift.
- If a community removes or downvotes the post for promotion, stop that angle and rewrite from first principles.

## Tracking template

| Date | Subreddit | Post angle | URL | Origin link used? | 24h comments | 7d referrals | 7d branded-query lift | Follow-up |
|---|---|---|---|---|---:|---:|---:|---|
| YYYY-MM-DD | r/ClaudeAI | Claude Code memory workflow | - | yes/no | 0 | 0 | 0 | - |

## Draft 1: Claude Code Memory Workflow

**Target communities:** r/ClaudeAI, r/ClaudeCode, r/LocalLLaMA if local-first angle is emphasized.

**Title options:**

- The session handoff loop that made Claude Code less forgetful
- What I started writing down so Claude Code could resume work cleanly

**Body outline:**

1. Problem: long coding sessions collapse into messy transcripts and the next session starts cold.
2. Useful loop: brief before work, capture decisions during work, handoff at the end, review when memory looks risky.
3. Concrete examples of what to capture: decisions, gotchas, constraints, changed facts.
4. Mistake learned: storing whole transcripts is less useful than source-backed, atomic memories.
5. Soft link: “I wrote up the exact loop here” pointing to `/learn/claude-code-session-handoff` or `/docs/daily-workflow`.

## Draft 2: MCP Memory Debugging

**Target communities:** r/mcp, r/ClaudeAI, r/Cursor, r/vscode.

**Title options:**

- My MCP memory checklist for when the client says connected but nothing works
- Debugging local MCP memory: the boring checks that saved me time

**Body outline:**

1. Problem: MCP can show as configured while the daemon, client config, or port is wrong.
2. Checklist: daemon health, port `7878`, client config, restart, tool list, one capture/recall smoke test.
3. Common failure modes: wrong MCP config file, stale client process, HTTP vs stdio mismatch, multiple local daemons.
4. Soft link to `/learn/mcp-memory-server-localhost-7878` or `/docs/troubleshooting`.

## Draft 2A: Claude Code /memory Boundary

**Target communities:** r/ClaudeAI, r/ClaudeCode.

**Title options:**

- When I use Claude Code /memory vs a shared MCP memory server
- The boundary that helped me keep Claude Code memory from becoming messy

**Body outline:**

1. Problem: Claude Code has native memory, but teams still confuse CLAUDE.md, `/memory`, auto memory, and external MCP memory.
2. Useful boundary: CLAUDE.md for stable instructions; `/memory` for inspecting/editing loaded native memory; shared MCP memory for decisions, gotchas, handoffs, and context that should reach Cursor/Codex too.
3. Concrete examples: one project rule, one decision capture, one stale gotcha, one handoff.
4. Mistake learned: copying every native memory into a second memory system creates duplicate stale context.
5. Soft link only if useful: `/learn/claude-code-memory-command-vs-origin`.

## Draft 3: Local-First AI Memory Boundary

**Target communities:** r/selfhosted, r/privacy, r/LocalLLaMA, r/opensource.

**Title options:**

- Local-first AI memory is not the same thing as private AI memory
- The trust boundary I use for AI memory tools

**Body outline:**

1. Problem: “memory” can mean local database, hosted account memory, or context sent to a model provider.
2. Clarify boundaries: local store, MCP client, model provider, optional API keys, exported artifacts.
3. Practical rule: keep the memory layer local, but assume retrieved context can still go to the active AI provider.
4. Soft link to `/learn/ai-agent-memory-local-vs-cloud` or `/docs/data-and-privacy`.

## Draft 4: GSC Indexing Lessons

**Target communities:** r/SEO, r/SaaS, r/microsaas, r/SideProject.

**Title options:**

- What I changed after Search Console showed only a handful of pages indexed
- My boring GSC loop for a developer-tool website

**Body outline:**

1. Problem: shipping pages is not the same as getting indexed or earning impressions.
2. Weekly loop: sitemap check, indexed pages, positions 8-30, low CTR, stale snippets, redirect/canonical reasons.
3. Lesson: do not keep writing until GSC tells you whether the last batch was discovered.
4. Soft link only if useful: `/learn` or a specific measurement write-up if one exists later.

## Draft 5: AI Work Memory vs Knowledge Base

**Target communities:** r/ClaudeAI, r/ObsidianMD, r/productivity, r/AI_Agents.

**Title options:**

- Why my notes app did not solve AI coding memory
- The difference between a knowledge base and memory for AI work

**Body outline:**

1. Problem: notes are written for humans; AI work memory has to survive session boundaries and be retrievable by tools.
2. Distinction: knowledge base, raw memory, source-backed page, handoff, local index.
3. Practical examples: a decision, a gotcha, a stale fact, a project status handoff.
4. Soft link to `/learn/ai-work-memory-vs-knowledge-base` or `/learn/source-backed-wiki-pages-ai-work`.
