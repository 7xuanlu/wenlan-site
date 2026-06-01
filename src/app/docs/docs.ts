import { DEFAULT_AUTHOR, SITE_URL } from "../learn/articles";

export const DOCS_UPDATED_AT = "2026-06-01";

export type DocGroup = "After setup" | "Reference" | "Project";

export type DocCodeBlock = {
  label: string;
  code: string;
};

export type DocSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  code?: DocCodeBlock;
  link?: {
    label: string;
    href: string;
  };
};

export type DocPage = {
  slug: string;
  group: DocGroup;
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  updatedAt: string;
  author: string;
  readingTime: string;
  summary: string[];
  sections: DocSection[];
  nextSlug?: string;
  howTo?: boolean;
};

const mcpAddCommand = `~/.origin/bin/origin mcp add claude-code
# or: codex, cursor, claude-desktop, vscode, gemini`;

const mcpConfig = `{
  "mcpServers": {
    "origin": {
      "command": "/Users/you/.origin/bin/origin-mcp"
    }
  }
}`;

const originSetupCommand = "npx -y @7xuanlu/origin setup";

const architectureMap = `origin-server  -> local daemon on 127.0.0.1:7878
origin-core    -> storage, search, graph, pages, eval
origin-cli     -> setup, service management, recall, doctor
origin-mcp     -> MCP connector for AI clients
origin-types   -> shared HTTP/MCP wire types
plugin/        -> Claude Code slash commands and hooks`;

const evalSnapshot = `Benchmark                         Recall@5   MRR     NDCG@10
LongMemEval oracle, 500 Q          93.6%     0.857   0.883
LoCoMo locomo10                    70.0%     0.647   0.684`;

export const docPages: DocPage[] = [
  {
    slug: "daily-workflow",
    group: "After setup",
    eyebrow: "Workflow",
    title: "Daily Workflow",
    howTo: true,
    description:
      "Start with context, capture what matters, recall when needed, and hand off before context goes cold.",
    metaTitle: "Origin Daily Workflow | Docs",
    metaDescription:
      "Learn the daily Origin loop after setup: /brief or MCP context, /capture, /recall, /handoff, plus review and distillation when needed.",
    keywords: [
      "Origin daily workflow",
      "AI session handoff",
      "memory capture workflow",
      "Claude Code workflow",
      "MCP daily workflow",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    summary: [
      "Start with /brief in Claude Code or context in MCP clients.",
      "Capture durable facts during work; close real sessions with /handoff.",
    ],
    sections: [
      {
        heading: "Start with context",
        body: [
          "Start a real work session with /brief in Claude Code or context in another MCP client. Origin returns project facts, recent handoffs, decisions, and distilled pages.",
          "If setup is not done yet, use /init in Claude Code. For other MCP clients, run npx -y @7xuanlu/origin setup, then ~/.origin/bin/origin mcp add for the client you use.",
        ],
        code: {
          label: "Session start",
          code: "Claude Code: /brief\nMCP tool: context",
        },
      },
      {
        heading: "Capture only durable knowledge",
        body: [
          "Use /capture for knowledge that should survive the current chat: decisions, lessons, gotchas, project constraints, preferences, and facts future agents would otherwise rediscover.",
          "Keep each capture atomic. One idea per memory is easier to search, merge, correct, and cite later.",
        ],
        bullets: [
          "Good: We chose local memory because this project needs local search without model setup.",
          "Good: Origin is AI work memory because it carries context across sessions, tools, and time.",
          "Skip: command output, temporary todos, filler, and facts the repo can trivially derive.",
        ],
        code: {
          label: "Claude Code",
          code: "/capture <one durable thing, including why it matters>",
        },
      },
      {
        heading: "Recall when history matters",
        body: [
          "Use /recall when the agent needs a specific thread of past context. This is better than asking the assistant to guess from the current chat.",
          "Specific recall queries work better than broad ones. Name the project, decision, person, feature, or failure mode you care about.",
        ],
        code: {
          label: "Claude Code",
          code: "/recall origin website docs decisions",
        },
      },
      {
        heading: "End with a handoff",
        body: [
          "/handoff is the closing ritual. It writes a session log, updates project status, and captures decisions, lessons, gotchas, and open threads before the session disappears into chat history.",
          "The next session can start from that handoff instead of rebuilding the situation from memory.",
        ],
        code: {
          label: "Claude Code",
          code: "/handoff",
        },
      },
      {
        heading: "Maintain memory when it grows",
        body: [
          "/review is for deep audits. /distill turns related memories into wiki pages.",
          "Use them after meaningful project work, before a new phase, or when recall starts surfacing repeated or stale context.",
        ],
        bullets: [
          "/review captures: walk unconfirmed memories when you want the full queue.",
          "/review revisions: accept or dismiss pending memory revisions.",
          "/distill: synthesize related memories into readable pages.",
          "/read: preview a distilled page without leaving the agent session.",
        ],
      },
    ],
    nextSlug: "core-concepts",
  },
  {
    slug: "core-concepts",
    group: "After setup",
    eyebrow: "Concepts",
    title: "Core Concepts",
    description:
      "Understand the pieces behind Origin: memories, sessions, handoffs, pages, the daemon, MCP, Markdown, and the local index.",
    metaTitle: "Origin Core Concepts | Docs",
    metaDescription:
      "Learn how Origin organizes AI work memory with sessions, handoffs, distilled pages, local Markdown records, a local index, and MCP clients.",
    keywords: [
      "Origin core concepts",
      "AI memory model",
      "memory sessions",
      "distilled pages",
      "local index",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    summary: [
      "Origin is local-first memory for AI work, not a chat UI or a notes app replacement.",
      "Markdown stays human-readable while the local database keeps retrieval indexes, graph structure, and metadata.",
    ],
    sections: [
      {
        heading: "Memory",
        body: [
          "A memory is one durable idea from your AI work. It might be a decision, preference, lesson, gotcha, project fact, or correction.",
          "Good memories include enough context to be useful later, especially why the fact matters.",
        ],
      },
      {
        heading: "Session",
        body: [
          "A session is a period of work with an AI agent. The session itself is noisy, but it contains decisions, constraints, and lessons worth carrying forward.",
          "Origin does not preserve every token as the primary interface. It extracts the durable parts and makes them searchable later.",
        ],
      },
      {
        heading: "Handoff",
        body: [
          "A handoff is the compact end-of-session record that lets a future agent resume without starting cold.",
          "It usually includes what changed, what was decided, what remains open, and what the next agent should know before acting.",
        ],
      },
      {
        heading: "Distilled pages",
        body: [
          "Distilled pages are wiki-style Markdown artifacts synthesized from related memories. They make accumulated context easier to inspect than a long list of individual captures.",
          "Pages are useful when a project, workflow, or concept keeps coming back across many sessions.",
        ],
      },
      {
        heading: "Daemon and MCP",
        body: [
          "The local daemon is the source of truth. It owns the database, search, distill cycles, provenance, and API.",
          "The MCP server is the bridge. Claude Code, Codex, Cursor, Claude Desktop, Gemini CLI, and other MCP clients can connect to the same local memory layer.",
        ],
      },
      {
        heading: "Markdown plus local index",
        body: [
          "Origin keeps human-readable artifacts in Markdown while the local database keeps indexes, metadata, graph structure, and retrieval state.",
          "That split matters for trust. The database helps agents search quickly, but the record is something you can inspect and control.",
        ],
      },
      {
        heading: "No model required",
        body: [
          "Origin gives you storage, embeddings, dedupe, hybrid search, and MCP recall without requiring a local model or API key.",
          "Claude Code skills can still classify captures, write handoffs, and distill pages because the agent already has language intelligence in the session.",
        ],
      },
    ],
    nextSlug: "architecture",
  },
  {
    slug: "architecture",
    group: "Reference",
    eyebrow: "Architecture",
    title: "Architecture",
    description:
      "How Origin is put together: one local daemon, thin clients, shared wire types, local artifacts, and retrieval owned by origin-core.",
    metaTitle: "Origin Architecture | Docs",
    metaDescription:
      "Understand Origin's daemon-first architecture, Cargo workspace crates, MCP connector, Claude Code plugin, local data layout, and retrieval pipeline.",
    keywords: [
      "Origin architecture",
      "Origin daemon",
      "origin-core",
      "origin-mcp architecture",
      "local AI work memory architecture",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    summary: [
      "Origin is daemon-first: origin-server owns storage, search, pages, graph context, distill cycles, and the HTTP API.",
      "Claude Code, MCP clients, the CLI, and local tools are thin clients over the same local source of truth.",
    ],
    sections: [
      {
        heading: "The boundary",
        body: [
          "Origin keeps product behavior in one local daemon instead of scattering memory logic across every client. The daemon listens on 127.0.0.1:7878 and owns the database, embeddings, search, pages, graph context, and distill cycles.",
          "That boundary is what lets Claude Code, Codex, Cursor, Claude Desktop, Gemini CLI, VS Code, and terminal commands share the same memory layer without each tool inventing its own store.",
        ],
      },
      {
        heading: "Workspace map",
        body: [
          "The public repository is a Cargo workspace. The desktop app lives in a separate repo, while the local runtime, CLI, MCP server, shared wire types, core logic, and Claude Code plugin live together.",
        ],
        code: {
          label: "Repository map",
          code: architectureMap,
        },
      },
      {
        heading: "Runtime flow",
        body: [
          "A client stores or recalls memory through HTTP, MCP, or the CLI. origin-server frames the request and calls origin-core. origin-core handles storage, hybrid retrieval, knowledge graph context, pages, quality gates, enrichment, and eval-facing logic.",
          "The client receives a compact response: memories, pages, decisions, graph context, or diagnostic state. The source of truth stays local.",
        ],
        bullets: [
          "Claude Code plugin: slash commands such as /brief, /capture, /recall, /distill, and /handoff.",
          "origin-mcp: MCP tools such as context, capture, recall, distill, list_pending, confirm_memory, forget, and doctor.",
          "origin CLI: setup, service management, status, recall, search, store, spaces, model, key, and doctor.",
        ],
      },
      {
        heading: "Storage and retrieval",
        body: [
          "The local database uses libSQL for document chunks, vector search, FTS5 search, graph tables, pages, and metadata. Recall combines vector search, full-text search, graph context, and relevant pages with Reciprocal Rank Fusion.",
          "Human-facing artifacts stay under ~/.origin. Pages and session logs are Markdown. The database is the index and retrieval substrate; the readable artifacts are the record people can inspect.",
        ],
      },
      {
        heading: "Model paths",
        body: [
          "Local memory mode works without a model download or API key. Store, embed, search, recall, and MCP memory are available immediately.",
          "On-device models and Anthropic keys are optional. They unlock heavier extraction, page synthesis, recaps, and richer distill cycles, but the basic memory loop does not depend on them.",
        ],
      },
      {
        heading: "Platform services",
        body: [
          "Origin installs a local runtime into ~/.origin/bin. The service manager differs by operating system: launchd on macOS, systemd user units on Linux, and a per-user Task Scheduler logon task on Windows.",
          "The same daemon contract is used across platforms. Cross-platform support in the public release covers macOS arm64/x64, Linux x86_64/aarch64 with glibc, and Windows x86_64.",
        ],
      },
      {
        heading: "Why this shape",
        body: [
          "The daemon-first shape keeps memory behavior consistent. It also makes Origin easier to test: origin-core has no Axum or Tauri dependency, origin-types stays lightweight, and clients do not own business logic.",
          "For users, the practical result is simpler: one local home for AI work context, with multiple tools reading and writing through the same boundary.",
        ],
        link: {
          label: "View the source repository",
          href: "https://github.com/7xuanlu/origin",
        },
      },
    ],
    nextSlug: "commands",
  },
  {
    slug: "commands",
    group: "Reference",
    eyebrow: "Reference",
    title: "Commands and Tools",
    description:
      "The essential Claude Code commands and MCP tools for running Origin day to day.",
    metaTitle: "Origin Commands and MCP Tools | Docs",
    metaDescription:
      "Reference the daily Origin Claude Code commands and MCP tools: /init, /brief, context, /capture, /recall, /handoff, scoped /review, /distill, and doctor.",
    keywords: [
      "Origin commands",
      "MCP tools",
      "Claude Code slash commands",
      "capture handoff recall",
      "distill review",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    summary: [
      "Most Claude Code users need /init for setup, then four daily commands: /brief, /capture, /recall, and /handoff.",
      "MCP clients start with context, then use capture, recall, distill, list pending, confirm memory, forget, and doctor.",
    ],
    sections: [
      {
        heading: "Daily commands",
        body: [
          "Use these commands for the normal memory loop in Claude Code.",
        ],
        bullets: [
          "/init: install or verify the daemon, plugin, MCP route, and memory round trip.",
          "/brief: load relevant context at the start of a session.",
          "/capture: save one durable memory with the reason it matters.",
          "/recall: search local memory for a specific topic.",
          "/handoff: close a session with decisions, lessons, gotchas, and next context.",
        ],
      },
      {
        heading: "Curation commands",
        body: [
          "Use these when memory needs inspection, cleanup, or synthesis.",
        ],
        bullets: [
          "/review captures: walk unconfirmed captures; bare /review only prints help.",
          "/review revisions: walk pending revisions when /brief shows more than the top few.",
          "/distill: synthesize related memories into wiki pages.",
          "/read: preview a distilled page from inside Claude Code.",
          "/forget: delete a memory by ID when it should not remain in Origin.",
          "/debrief: alias for /handoff.",
        ],
      },
      {
        heading: "MCP tools",
        body: [
          "Other MCP clients call tools instead of slash commands. The names are intentionally close to the Claude Code workflow.",
        ],
        bullets: [
          "context: load session context at the start of work or major topic shifts.",
          "capture: store a durable memory.",
          "recall: search for relevant memories.",
          "distill: synthesize or refresh pages.",
          "list_pending and confirm_memory: inspect and accept pending captures.",
          "forget: delete a memory.",
          "doctor: diagnose daemon and setup state.",
        ],
      },
      {
        heading: "How to choose",
        body: [
          "Start with /brief in Claude Code or context in another MCP client. Save durable knowledge with capture. Search history with recall. Close a serious session with /handoff.",
          "Use /review, /distill, and /read when memory needs maintenance or a topic deserves a page.",
        ],
      },
    ],
    nextSlug: "data-and-privacy",
  },
  {
    slug: "data-and-privacy",
    group: "Reference",
    eyebrow: "Local control",
    title: "Data and Privacy",
    description:
      "Where Origin keeps data, what stays local, and how Markdown records work with the local index.",
    metaTitle: "Origin Data and Privacy | Docs",
    metaDescription:
      "Understand Origin local storage, local memory setup, optional model/API paths, Markdown records, the local index, and deletion controls.",
    keywords: [
      "Origin data privacy",
      "local AI work memory storage",
      "Markdown records",
      "local-first privacy",
      "deletion controls",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    summary: [
      "Origin is local-first: the memory layer is owned by the daemon on your machine.",
      "Markdown artifacts remain readable while the database stores retrieval indexes and metadata.",
    ],
    sections: [
      {
        heading: "Local-first by default",
        body: [
          "Origin is designed so the durable context your agents use lives locally first. That context can include project decisions, private constraints, preferences, and work history.",
          "Connected AI tools may still send prompts to their own model providers. Origin's job is to keep the memory layer itself local, inspectable, and shared across tools.",
        ],
      },
      {
        heading: "Where data lives",
        body: [
          "Origin exposes human-facing artifacts under ~/.origin. The daemon database lives under the macOS application support directory and is linked from ~/.origin/db for convenience.",
          "The important files are readable without a special app: pages are Markdown, session logs are Markdown, and project status is stored beside the session records.",
        ],
        bullets: [
          "~/.origin/pages/: distilled wiki pages.",
          "~/.origin/sessions/: session handoff logs.",
          "~/.origin/sessions/_status/: current project status records.",
          "~/.origin/bin/: installed Origin CLI, daemon, and MCP connector binaries.",
          "~/.origin/db/: link to the daemon's local database store.",
          "~/Library/Application Support/origin/: daemon-owned application data.",
        ],
      },
      {
        heading: "Markdown and the local index",
        body: [
          "Markdown is the record you can read. The database is the index agents use to retrieve quickly.",
          "This avoids treating the database as an opaque source of truth. Search can be fast and structured while the important artifacts remain inspectable.",
        ],
      },
      {
        heading: "Local memory setup",
        body: [
          "Origin stores, embeds, deduplicates, and serves hybrid search without requiring a local model download or Anthropic API key.",
          "Optional model and API paths can add heavier language features, but they are not required for the basic memory loop.",
        ],
      },
      {
        heading: "Correction and deletion",
        body: [
          "If a memory is wrong, capture the correction with why it supersedes the old fact. If a memory should be removed entirely, use /forget with the memory ID.",
          "For distilled pages, inspect the Markdown directly. User-edited pages are treated carefully so automated distillation does not overwrite human work casually.",
        ],
      },
    ],
    nextSlug: "mcp-clients",
  },
  {
    slug: "mcp-clients",
    group: "Reference",
    eyebrow: "MCP",
    title: "Connect MCP Clients",
    description:
      "Use one local Origin memory layer from Claude Code, Codex, Cursor, Claude Desktop, Gemini CLI, and other MCP clients.",
    metaTitle: "Connect MCP Clients to Origin | Docs",
    metaDescription:
      "Run npx -y @7xuanlu/origin setup, add Origin with origin mcp add, and share one local AI work memory layer across MCP-compatible tools.",
    keywords: [
      "MCP client setup",
      "Claude Code MCP",
      "Cursor MCP",
      "Codex MCP",
      "Gemini CLI MCP",
      "origin-mcp",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "4 min read",
    summary: [
      "Origin's daemon is the local source of truth; origin-mcp is the bridge MCP clients launch.",
      "Claude Code users should start with the plugin. Other clients should run Origin setup first, then let the CLI add the MCP server config.",
    ],
    sections: [
      {
        heading: "How the pieces connect",
        body: [
          "The daemon runs locally and owns memory. origin-mcp is the connector MCP clients spawn when they need Origin tools.",
          "Once connected, a client can load context, capture, recall, distill, confirm, forget, and diagnose memory.",
        ],
      },
      {
        heading: "Set up the local runtime",
        body: [
          "Run this once before wiring another MCP client. It prepares the local Origin runtime that origin-mcp talks to.",
        ],
        code: {
          label: "Terminal",
          code: originSetupCommand,
        },
      },
      {
        heading: "Add a client",
        body: [
          "After setup, ask the Origin CLI to write the client-specific MCP configuration. It uses the local origin-mcp binary installed beside the CLI, with npm as a fallback when needed.",
        ],
        code: {
          label: "Terminal",
          code: mcpAddCommand,
        },
      },
      {
        heading: "Manual config fallback",
        body: [
          "If a client only accepts a raw JSON configuration, point it at the local MCP connector that setup installed. Use origin mcp add --dry-run to see the exact path for your machine.",
        ],
        code: {
          label: "mcpServers",
          code: mcpConfig,
        },
      },
      {
        heading: "Claude Code",
        body: [
          "The Claude Code plugin is the most complete path because it includes slash commands, setup checks, and the daily workflow around the MCP server.",
          "After installing the plugin, restart Claude Code if prompted, then run /init.",
        ],
        code: {
          label: "Claude Code",
          code: "/plugin marketplace add 7xuanlu/origin\n/plugin install origin@7xuanlu\n/init",
        },
      },
      {
        heading: "Other clients",
        body: [
          "Codex, Cursor, Claude Desktop, Gemini CLI, and other MCP clients can use origin mcp add when the client is supported.",
          "The settings screen differs by client. The important part is that the client launches the Origin MCP connector installed by setup.",
        ],
      },
      {
        heading: "Verify the connection",
        body: [
          "After connecting a client, run its available Origin doctor or recall tool. Then capture one small durable fact and recall it from another session or client.",
          "If that round trip works, the client is using the same local memory layer.",
        ],
      },
    ],
    nextSlug: "troubleshooting",
  },
  {
    slug: "troubleshooting",
    group: "Reference",
    eyebrow: "Repair",
    title: "Troubleshooting",
    description:
      "Fix the common setup issues: daemon not running, MCP not connected, missing Claude commands, stale context, and support escalation.",
    metaTitle: "Origin Troubleshooting | Docs",
    metaDescription:
      "Troubleshoot Origin setup issues with the daemon, MCP connection, Claude Code plugin commands, origin mcp add, port 7878, and memory recall.",
    keywords: [
      "Origin troubleshooting",
      "daemon not running",
      "MCP connection issues",
      "port 7878",
      "doctor command",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    summary: [
      "Start with /init in Claude Code, origin doctor in the terminal, or the doctor tool in an MCP client.",
      "Most issues are one of three things: daemon not reachable, MCP server not configured, or the client needs a restart.",
    ],
    sections: [
      {
        heading: "Claude Code commands are missing",
        body: [
          "If /brief, /capture, or /handoff do not appear after installing the plugin, restart Claude Code once.",
          "Then run /init. It should verify the plugin, daemon, MCP route, and memory round trip.",
        ],
        code: {
          label: "Claude Code",
          code: "/init",
        },
      },
      {
        heading: "Daemon is not reachable",
        body: [
          "Origin's daemon listens locally on port 7878. If a client cannot reach it, use /init from Claude Code or the doctor tool from an MCP client to check the daemon state.",
          "For non-Claude clients, rerun npx -y @7xuanlu/origin setup if the local runtime was never installed or status verification failed.",
          "Only one daemon should own the local database. If you have been developing Origin locally, make sure an old daemon from another checkout is not still running.",
        ],
      },
      {
        heading: "MCP client is not connected",
        body: [
          "Check that you ran npx -y @7xuanlu/origin setup first, then ran ~/.origin/bin/origin mcp add for that client. Some clients require a full restart after changing MCP settings.",
          "If the client shows the server but tools fail, run doctor. It reports whether the daemon is reachable and how setup is configured.",
        ],
        code: {
          label: "MCP config",
          code: mcpConfig,
        },
      },
      {
        heading: "Recall returns weak context",
        body: [
          "First make the recall query more specific. Include project names, feature names, decisions, people, or the exact failure mode.",
          "If the memory exists but is stale or duplicated, use /review for pending queues and /distill when a topic deserves a clearer page.",
        ],
      },
      {
        heading: "When to open an issue",
        body: [
          "If /init or doctor reports a daemon, MCP, or install failure you cannot resolve, open a GitHub issue with the client name, command you ran, and the diagnostic output.",
          "Avoid pasting private memory contents into public issues. Describe the setup failure and redact project-specific details.",
        ],
        link: {
          label: "Open a GitHub issue",
          href: "https://github.com/7xuanlu/origin/issues",
        },
      },
    ],
    nextSlug: "evaluation",
  },
  {
    slug: "evaluation",
    group: "Project",
    eyebrow: "Evaluation",
    title: "Evaluation",
    description:
      "What Origin's published retrieval numbers mean, how they are generated, and what they do not claim.",
    metaTitle: "Origin Evaluation and Benchmarks | Docs",
    metaDescription:
      "Read Origin's benchmark methodology, current retrieval snapshot, eval scope, and how to rerun LoCoMo and LongMemEval locally.",
    keywords: [
      "Origin evaluation",
      "Origin benchmarks",
      "LongMemEval",
      "LoCoMo",
      "AI memory retrieval benchmark",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    summary: [
      "The public numbers are retrieval metrics, not end-to-end answer quality claims.",
      "The current README snapshot reports 93.6% Recall@5 on LongMemEval oracle and 70.0% Recall@5 on LoCoMo locomo10.",
    ],
    sections: [
      {
        heading: "Current snapshot",
        body: [
          "Origin's README publishes a compact retrieval snapshot for the shipped hybrid retrieval path. The snapshot uses BGE-Base-EN-v1.5-Q embeddings, FTS5, Reciprocal Rank Fusion, and the latest shipped local rerank path when enabled.",
          "The numbers below are the public README snapshot from the daemon repository. They should be read as retrieval-only metrics over the stated fixtures.",
        ],
        code: {
          label: "README snapshot",
          code: evalSnapshot,
        },
      },
      {
        heading: "What is measured",
        body: [
          "The headline metrics are Recall@5, MRR, and NDCG@10. They measure whether the retrieval layer surfaces relevant context near the top of the result set.",
          "This is useful because Origin's job is to bring the right memories, pages, decisions, and graph context into the next agent session. It does not prove that a downstream model will always answer correctly.",
        ],
      },
      {
        heading: "What is not measured",
        body: [
          "The published table is not a full product-quality score, a guarantee of answer quality, or a latency benchmark. It is also not a cross-product claim unless the comparison page explicitly states the protocol.",
          "Single-run snapshots are useful for development direction. Public claims that compare improvements should be regenerated under the current schema and, for headline claims, backed by repeated runs or documented methodology.",
        ],
      },
      {
        heading: "Where the harness lives",
        body: [
          "The eval harness lives in crates/origin-core/src/eval. The workflow docs live in docs/eval in the Origin repository.",
          "Slow GPU or API-backed evals are manual. Normal CI avoids running heavy model benchmarks because hosted runners do not provide the right hardware, secrets, or cost profile.",
        ],
        bullets: [
          "LoCoMo and LongMemEval use Recall@5, MRR, and NDCG@10 headline fields.",
          "The README updater reads a local metrics JSON and writes the tracked README snapshot.",
          "Raw local baseline artifacts stay outside git; the repository keeps the methodology and curated snapshot.",
        ],
      },
      {
        heading: "How to rerun",
        body: [
          "Clone the repository, follow the eval docs, and run the appropriate ignored eval harness command for the benchmark you want to reproduce. Expect slow runs when local models or judges are involved.",
          "When comparing two retrieval modes, regenerate both sides under the same schema and fixture revision. Cross-schema comparisons are treated as invalid by the repository's eval discipline.",
        ],
        link: {
          label: "Open eval docs on GitHub",
          href: "https://github.com/7xuanlu/origin/tree/main/docs/eval",
        },
      },
    ],
    nextSlug: "changelog",
  },
  {
    slug: "changelog",
    group: "Project",
    eyebrow: "Releases",
    title: "Changelog",
    description:
      "The public release history for Origin, plus how to read unreleased work on main.",
    metaTitle: "Origin Changelog | Docs",
    metaDescription:
      "Review Origin's public release history, current stable release, recent milestones, and links to the full GitHub changelog.",
    keywords: [
      "Origin changelog",
      "Origin releases",
      "Origin version 0.7.0",
      "origin-mcp release notes",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    summary: [
      "The current stable release in the repository changelog is v0.7.0, dated 2026-05-24.",
      "Recent main-branch work after v0.7.0 is visible through merged PRs, but it should be treated as unreleased until the next release lands.",
    ],
    sections: [
      {
        heading: "Current stable release",
        body: [
          "Origin v0.7.0 is the current stable release recorded in CHANGELOG.md and the release-please manifest. It shipped cross-platform Linux and Windows support, spaces, eval reproducibility work, page and KG faithfulness benchmarks, and release pipeline hardening.",
          "The website keeps public install and product claims aligned to the stable release unless a page explicitly labels a feature as unreleased or on main.",
        ],
      },
      {
        heading: "v0.7.0 highlights",
        body: [
          "The v0.7.0 release broadened Origin from a macOS-first local runtime into a cross-platform local memory layer with explicit spaces and stronger evaluation discipline.",
        ],
        bullets: [
          "Cross-platform runtime support for macOS, Linux, and Windows.",
          "origin space subcommands and doctor resolver state.",
          "Plugin and server space resolver plumbing.",
          "KG-faithfulness and page-distillation faithfulness benchmarks.",
          "Structured binary judge and reproducibility foundations for evals.",
          "Release pipeline fixes for crates, npm, Homebrew, and version sync.",
        ],
      },
      {
        heading: "Earlier milestones",
        body: [
          "The v0.6.x line introduced the domain-to-space transition, curation workflows, pending revisions, and stronger daemon/client boundaries.",
          "The v0.5.x line merged the MCP server and Claude Code plugin into the monorepo, established the locked skill set, and made the public packages line up with the repo runtime.",
        ],
      },
      {
        heading: "Unreleased main work",
        body: [
          "After v0.7.0, main has received a wave of opt-in retrieval, refinery, and read-time experiments. Examples include query decomposition, graph activation gates, FTS hardening, temporal filters, session diversification, salience priors, fact channels, k-hop graph traversal, global preludes, background reflection debounce, CoT retrieval, and LLM read-time routing.",
          "Those PRs are useful signals for roadmap direction, but public users should treat them as main-branch work until a release entry publishes them.",
        ],
      },
      {
        heading: "Where to follow releases",
        body: [
          "GitHub releases are the canonical place to inspect release artifacts. CHANGELOG.md is generated by release-please and records the release history in the source repo.",
        ],
        link: {
          label: "View full changelog",
          href: "https://github.com/7xuanlu/origin/blob/main/CHANGELOG.md",
        },
      },
    ],
    nextSlug: "roadmap",
  },
  {
    slug: "roadmap",
    group: "Project",
    eyebrow: "Roadmap",
    title: "Roadmap and Status",
    description:
      "How to read Origin's current direction without confusing released features, main-branch work, and future bets.",
    metaTitle: "Origin Roadmap and Status | Docs",
    metaDescription:
      "Understand Origin's roadmap themes: reliable retrieval, provenance, local control, cross-client setup, eval discipline, and release status.",
    keywords: [
      "Origin roadmap",
      "Origin project status",
      "AI work memory roadmap",
      "Origin future releases",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    summary: [
      "Origin's roadmap is centered on making AI work compound: better retrieval, better provenance, better handoffs, and safer local control.",
      "Roadmap items are directional, not promises. Stable release notes remain the source of truth for what shipped.",
    ],
    sections: [
      {
        heading: "Status model",
        body: [
          "Origin uses three practical status buckets: released, on main, and planned. Released means it appears in CHANGELOG.md or the current README install path. On main means merged but not necessarily released. Planned means a product direction, not a promise.",
          "This distinction matters because the repository moves quickly. The website should help users understand what they can rely on today without hiding where the project is going.",
        ],
      },
      {
        heading: "Released now",
        body: [
          "The released public shape is local-first AI work memory: Claude Code plugin, MCP server, CLI setup, daemon, local memory, hybrid retrieval, spaces, Markdown artifacts, source-backed pages, git versioning, and cross-platform runtime support.",
          "That is enough for the core loop: brief, capture, recall, handoff, distill, and inspect local artifacts.",
        ],
      },
      {
        heading: "Current development themes",
        body: [
          "Recent merged PRs show a strong focus on retrieval quality and memory maintenance. Most of that work is opt-in while it is evaluated.",
          "The useful way to read the direction is not as a pile of toggles, but as one goal: make the next AI session receive the smallest, most relevant, most trustworthy context bundle.",
        ],
        bullets: [
          "Retrieval quality: query decomposition, temporal filters, graph gates, FTS hardening, salience, session diversity, and read-time routing.",
          "Context composition: page channels, global preludes, context compression, fact channels, and iterative retrieval.",
          "Memory maintenance: deduplication, contradiction resolution, stale page refresh, soft eviction, and background reflection.",
          "Trust and provenance: source-backed pages, review queues, revision state, and visible local git history.",
        ],
      },
      {
        heading: "Near-term documentation gaps",
        body: [
          "The product docs should stay practical. The most important next docs after this pass are deeper pages for spaces, source-backed pages, local git history, and advanced retrieval modes once they stabilize.",
          "Until then, the best public entry points are setup, daily workflow, architecture, data and privacy, evaluation, and troubleshooting.",
        ],
      },
      {
        heading: "How to judge progress",
        body: [
          "For users, progress should show up as fewer cold starts, fewer repeated explanations, better recall, and more inspectable context. For maintainers, progress should show up in eval snapshots, smaller PRs, and clearer release notes.",
          "The project avoids a broad workflow-suite shape. The goal is a focused local memory layer for serious AI work, not a general productivity operating system.",
        ],
        link: {
          label: "Open current GitHub issues",
          href: "https://github.com/7xuanlu/origin/issues",
        },
      },
    ],
    nextSlug: "contributing",
  },
  {
    slug: "contributing",
    group: "Project",
    eyebrow: "Open source",
    title: "Contributing",
    description:
      "How to contribute useful bug reports, docs, eval cases, and code changes to Origin.",
    metaTitle: "Contributing to Origin | Docs",
    metaDescription:
      "Learn how to contribute to Origin: development setup, architecture boundaries, tests, linting, PR process, licensing, and useful issue reports.",
    keywords: [
      "contribute to Origin",
      "Origin open source",
      "Origin development setup",
      "Origin GitHub issues",
    ],
    updatedAt: DOCS_UPDATED_AT,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    summary: [
      "Bug reports, docs, eval cases, and focused code changes are welcome in the Apache-2.0 Origin repo.",
      "The daemon, CLI, MCP server, core, shared types, and Claude Code plugin live in the main repo; the desktop app lives separately.",
    ],
    sections: [
      {
        heading: "What belongs in the main repo",
        body: [
          "The main Origin repo contains origin-server, origin-core, origin-cli, origin-mcp, origin-types, and the Claude Code plugin. Runtime, memory behavior, MCP tooling, docs, evals, and release infrastructure belong there.",
          "The desktop app is a separate repository. If an issue is about the local runtime, CLI, MCP server, plugin, or memory behavior, the main repo is the right place.",
        ],
      },
      {
        heading: "Useful contributions",
        body: [
          "The most useful contributions are focused and evidence-backed. A good issue includes the client, operating system, exact command, expected behavior, actual behavior, and redacted diagnostic output from /init, doctor, or origin status.",
          "For code, keep PRs narrow. One logical change is easier to review, test, and release than a large bundle.",
        ],
        bullets: [
          "Bug fixes with a repro and the smallest relevant test.",
          "Docs that remove setup ambiguity or stale product language.",
          "Eval fixtures, methodology improvements, or clearer benchmark reporting.",
          "MCP/client setup fixes for supported clients.",
          "Platform-specific install and service-management fixes.",
        ],
      },
      {
        heading: "Development setup",
        body: [
          "Origin is a Rust workspace. You need Rust stable and the platform build tools for your OS. macOS builds may take several minutes on the first run while llama.cpp compiles for Metal.",
          "For local development, build the workspace and run origin-server directly. To test the product path, build the release binaries and use origin setup, install, status, and doctor.",
        ],
        code: {
          label: "Local development",
          code: "git clone https://github.com/7xuanlu/origin.git\ncd origin\ncargo build --workspace\ncargo run -p origin-server",
        },
      },
      {
        heading: "Verification",
        body: [
          "Before opening a PR, run the relevant tests and lint checks. The full workspace can be expensive, so use targeted crate tests while iterating and full checks before asking for merge.",
        ],
        code: {
          label: "Core checks",
          code: "cargo fmt --check --all\ncargo clippy --workspace --all-targets -- -D warnings\ncargo test --workspace",
        },
      },
      {
        heading: "Architecture rules",
        body: [
          "origin-core owns business logic and must stay free of Axum and Tauri dependencies. origin-server frames HTTP requests. origin-types stays lightweight because it is shared by the server, MCP connector, CLI, and downstream clients.",
          "MCP wrappers should deserialize typed wire responses instead of passing untyped JSON through silently. Route handlers should snapshot state before awaits instead of holding long-lived locks.",
        ],
      },
      {
        heading: "License",
        body: [
          "The main repo is Apache-2.0. By contributing, you agree that your changes are licensed under the license that applies to the files you modify.",
          "The desktop app has its own repository and license. Check the target repo before contributing across that boundary.",
        ],
        link: {
          label: "Read CONTRIBUTING.md",
          href: "https://github.com/7xuanlu/origin/blob/main/CONTRIBUTING.md",
        },
      },
    ],
  },
];

export function getDocPage(slug: string) {
  return docPages.find((page) => page.slug === slug);
}

export function docUrl(slug: string) {
  return `${SITE_URL}/docs/${slug}`;
}

export function formatDocDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
