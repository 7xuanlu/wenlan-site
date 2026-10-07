import type { NextConfig } from "next";

const NOINDEX_FOLLOW = [
  { key: "X-Robots-Tag", value: "noindex, follow" },
];

const NOINDEX_ASSET = [
  { key: "X-Robots-Tag", value: "noindex" },
];

const CANONICAL_ORIGIN = "https://wenlan.app";
const BRIDGE_HOSTS = [
  "www.wenlan.app",
  "useorigin.app",
  "www.useorigin.app",
] as const;

// Learn pages merged into a stronger owner page. Keep every source here so old
// URLs and legacy redirects point straight at the owner without chains.
const CONSOLIDATED_LEARN_SLUGS: Record<string, string> = {
  "how-to-add-memory-to-claude-code": "claude-code-memory",
  "claude-code-memory-command-vs-wenlan": "claude-code-memory",
  "where-wenlan-stores-claude-code-memory": "claude-code-memory",
  "wenlan-for-claude-code": "claude-code-memory",
  "wenlan-codex-workflow": "how-to-give-codex-persistent-memory",
  "mcp-memory-server-localhost-7878": "mcp-memory-server",
  "wenlan-gemini-cli-workflow": "mcp-memory-server",
  "wenlan-vscode-mcp-workflow": "mcp-memory-server",
  "wenlan-claude-desktop-workflow": "claude-desktop-mcp-memory-setup",
  "wenlan-cursor-workflow": "how-to-add-mcp-memory-to-cursor",
  "ai-agent-project-status-handoff": "ai-agent-handoff-loop",
  "claude-code-session-handoff": "ai-agent-handoff-loop",
  "local-git-history-ai-memory": "local-first-ai-memory",
  "markdown-local-index-ai-memory": "local-first-ai-memory",
  "what-to-capture-in-ai-work-memory": "ai-work-memory",
  "project-scope-ai-memory": "ai-work-memory",
  "ai-memory-provenance": "ai-work-memory",
  "persistent-project-context-for-ai-agents": "ai-coding-agent-loses-context",
  "multi-agent-memory-workflow": "codex-claude-code-shared-memory",
};

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    globalNotFound: true,
  },
  async headers() {
    return [
      { source: "/llms.txt", headers: NOINDEX_FOLLOW },
      { source: "/llms-full.txt", headers: NOINDEX_FOLLOW },
      { source: "/feed.xml", headers: NOINDEX_FOLLOW },
      { source: "/humans.txt", headers: NOINDEX_FOLLOW },
      { source: "/manifest.webmanifest", headers: NOINDEX_FOLLOW },
      { source: "/.well-known/security.txt", headers: NOINDEX_FOLLOW },
      { source: "/_next/static/media/:path*", headers: NOINDEX_ASSET },
      { source: "/examples/:path*", headers: NOINDEX_ASSET },
    ];
  },
  async redirects() {
    return [
      ...BRIDGE_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      })),
      {
        source: "/learn/origin-for-claude-code",
        destination: "/learn/claude-code-memory",
        permanent: true,
      },
      {
        source: "/learn/claude-code-memory-command-vs-origin",
        destination: "/learn/claude-code-memory",
        permanent: true,
      },
      {
        source: "/learn/where-origin-stores-claude-code-memory",
        destination: "/learn/claude-code-memory",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-basic-memory",
        destination: "/learn/wenlan-vs-basic-memory",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-claude-mem",
        destination: "/learn/wenlan-vs-claude-mem",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-superlocal-memory",
        destination: "/learn/wenlan-vs-superlocal-memory",
        permanent: true,
      },
      {
        source: "/learn/origin-codex-workflow",
        destination: "/learn/how-to-give-codex-persistent-memory",
        permanent: true,
      },
      {
        source: "/learn/origin-cursor-workflow",
        destination: "/learn/how-to-add-mcp-memory-to-cursor",
        permanent: true,
      },
      {
        source: "/learn/origin-claude-desktop-workflow",
        destination: "/learn/claude-desktop-mcp-memory-setup",
        permanent: true,
      },
      {
        source: "/learn/origin-gemini-cli-workflow",
        destination: "/learn/mcp-memory-server",
        permanent: true,
      },
      {
        source: "/learn/origin-vscode-mcp-workflow",
        destination: "/learn/mcp-memory-server",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-mcp-memory-service",
        destination: "/learn/wenlan-vs-mcp-memory-service",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-chatgpt-memory",
        destination: "/learn/wenlan-vs-chatgpt-memory",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-obsidian-ai-memory",
        destination: "/learn/wenlan-vs-obsidian-ai-memory",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-notion-ai",
        destination: "/learn/wenlan-vs-notion-ai",
        permanent: true,
      },
      {
        source: "/learn/origin-vs-mem0",
        destination: "/learn/wenlan-vs-mem0",
        permanent: true,
      },
      ...Object.entries(CONSOLIDATED_LEARN_SLUGS).flatMap(([slug, owner]) =>
        [`/learn/${slug}`, `/guides/${slug}`, `/docs/guides/${slug}`].map((source) => ({
          source,
          destination: `/learn/${owner}`,
          permanent: true,
        })),
      ),
      {
        source: "/learn/ai-memory-app",
        destination: "/learn/ai-work-memory",
        permanent: true,
      },
      {
        source: "/guides/ai-memory-app",
        destination: "/learn/ai-work-memory",
        permanent: true,
      },
      {
        source: "/guides",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/guides/:slug",
        destination: "/learn/:slug",
        permanent: true,
      },
      {
        source: "/docs/guides",
        destination: "/learn",
        permanent: true,
      },
      {
        source: "/docs/guides/ai-memory-app",
        destination: "/learn/ai-work-memory",
        permanent: true,
      },
      {
        source: "/docs/guides/:slug",
        destination: "/learn/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
