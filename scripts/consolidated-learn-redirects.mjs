// Learn pages merged into an owner page. Mirrors CONSOLIDATED_LEARN_SLUGS in
// next.config.ts: each source answers with a permanent redirect to its owner.
export const CONSOLIDATED_LEARN_REDIRECTS = [
  ["how-to-add-memory-to-claude-code", "claude-code-memory"],
  ["claude-code-memory-command-vs-wenlan", "claude-code-memory"],
  ["where-wenlan-stores-claude-code-memory", "claude-code-memory"],
  ["wenlan-for-claude-code", "claude-code-memory"],
  ["wenlan-codex-workflow", "how-to-give-codex-persistent-memory"],
  ["mcp-memory-server-localhost-7878", "mcp-memory-server"],
  ["wenlan-gemini-cli-workflow", "mcp-memory-server"],
  ["wenlan-vscode-mcp-workflow", "mcp-memory-server"],
  ["wenlan-claude-desktop-workflow", "claude-desktop-mcp-memory-setup"],
  ["wenlan-cursor-workflow", "how-to-add-mcp-memory-to-cursor"],
  ["ai-agent-project-status-handoff", "ai-agent-handoff-loop"],
  ["claude-code-session-handoff", "ai-agent-handoff-loop"],
  ["local-git-history-ai-memory", "local-first-ai-memory"],
  ["markdown-local-index-ai-memory", "local-first-ai-memory"],
  ["what-to-capture-in-ai-work-memory", "ai-work-memory"],
  ["project-scope-ai-memory", "ai-work-memory"],
  ["ai-memory-provenance", "ai-work-memory"],
  ["persistent-project-context-for-ai-agents", "ai-coding-agent-loses-context"],
  ["multi-agent-memory-workflow", "codex-claude-code-shared-memory"],
].map(([slug, owner]) => ({
  source: `/learn/${slug}`,
  destination: `/learn/${owner}`,
}));
