import { seoArticles } from "./seo-articles";
import { workedExampleSections } from "@/lib/llm-wiki-worked-example";

export const SITE_URL = "https://wenlan.app";
export const DEFAULT_AUTHOR = "Qi-Xuan Lu";
export const DEFAULT_AUTHOR_URL = "https://github.com/7xuanlu";
export const DEFAULT_AUTHOR_SAME_AS = ["https://github.com/7xuanlu"];

export const articleCategories = ["Concepts", "Comparisons", "Workflows"] as const;

export type LearnArticleCategory = (typeof articleCategories)[number];

export type LearnArticleSection = {
  id?: string;
  heading: string;
  body: string[];
  bullets?: string[];
  code?: {
    label: string;
    code: string;
  };
  link?: {
    label: string;
    href: string;
  };
  figure?: LearnFigureId;
  table?: {
    columns: string[];
    rows: string[][];
  };
};

export type LearnFigureId = "llm-wiki-architecture" | "llm-wiki-vs-rag";

export type LearnArticleFaq = {
  question: string;
  answer: string;
};

export type OfficialReference = {
  label: string;
  href: string;
};

export type ComparisonRow = {
  dimension: string;
  wenlan: string;
  competitor: string;
};

export type ComparisonTable = {
  competitorName: string;
  rows: ComparisonRow[];
};

export type ProductEvidence = {
  heading: string;
  summary: string;
  image: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  workflow: Array<{
    label: string;
    detail: string;
  }>;
  artifactHeading: string;
  artifactNote: string;
  artifactRows: Array<{
    label: string;
    detail: string;
  }>;
  action: {
    label: string;
    href: string;
  };
};

export type LearnArticle = {
  slug: string;
  eyebrow: string;
  category: LearnArticleCategory;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  publishedAt?: string;
  updatedAt: string;
  author: string;
  readingTime: string;
  audience: string;
  heroBullets: string[];
  sections: LearnArticleSection[];
  comparisonTable?: ComparisonTable;
  faqs: LearnArticleFaq[];
  relatedSlugs: string[];
  officialReferences?: OfficialReference[];
  productEvidence?: ProductEvidence;
  cta: {
    heading: string;
    body: string;
  };
};

const updatedAt = "2026-06-24";

const baseArticles: LearnArticle[] = [
  {
    slug: "ai-work-memory",
    eyebrow: "Concept",
    category: "Concepts",
    title: "What Is AI Work Memory?",
    description:
      "AI work memory carries sessions, decisions, lessons, project context, and wiki pages across tools and time.",
    metaTitle: "AI Work Memory for Coding Assistants and Agents | Wenlan",
    metaDescription:
      "How Claude Code, Codex, and Cursor keep decisions and project context across sessions: instruction files, native memory, MCP memory, and what to capture.",
    keywords: [
      "AI work memory",
      "memory for AI work",
      "LLM wiki for AI work",
      "durable AI work context",
      "Wenlan AI work",
    ],
    updatedAt: "2026-10-07",
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "AI power users, knowledge workers, and developers",
    heroBullets: [
      "Captures decisions, preferences, gotchas, and project knowledge from AI work.",
      "Makes memory visible and correctable instead of hiding it inside a model profile.",
      "Lets multiple AI tools recall the same durable context through MCP.",
    ],
    sections: [
      {
        heading: "The short definition",
        body: [
          "AI work memory is durable context from real work with AI agents, made available when a later session needs it.",
          "That context can include decisions, facts, project constraints, personal preferences, lessons learned, handoffs, wiki pages, and relationships between ideas. The goal is simple: your AI should not rediscover the same knowledge from scratch every session.",
        ],
      },
      {
        heading: "Memory options for AI coding assistants",
        body: [
          "Claude Code, Codex, and Cursor start each session without the previous conversation. Most developers combine three layers.",
        ],
        bullets: [
          "Instruction files (CLAUDE.md, AGENTS.md, Cursor rules): short standing rules loaded every session, not a store for accumulated decisions.",
          "Native memory, such as Claude Code auto memory: notes one client keeps for itself on one machine.",
          "An MCP memory server: decisions, lessons, and project facts any connected client can search on demand.",
          "Wenlan is that third layer, with source links, review, and Spaces per project.",
        ],
      },
      {
        id: "what-to-capture",
        heading: "What to capture",
        body: [
          "Capture something when a future AI session would waste time or make a worse decision without it. Good captures are durable, atomic, specific, and say why the fact matters. Wenlan's memory types are identity, preference, decision, lesson, gotcha, and fact.",
        ],
        bullets: [
          "Decisions, and why the chosen path won.",
          "Gotchas that would cause repeated debugging.",
          "Corrections, naming the memory they supersede.",
          "Project constraints that are not obvious from source files.",
          "Skip raw logs and temporary todos. Capture the durable conclusion, root cause, or command that proved the fix instead.",
        ],
        code: {
          label: "Capture examples",
          code: "/capture We chose source-backed pages because summaries need provenance.\n/capture Supersedes mem_abc123: Windows setup now uses a Task Scheduler ONLOGON task.\n\nBad: /capture tests failed\nBetter: /capture Gotcha: the build fails if Learn relatedSlugs point to missing article slugs; run the slug audit before building.",
        },
      },
      {
        heading: "Why built-in memory is not enough",
        body: [
          "Built-in memory is convenient, but it is usually opaque. The assistant decides what matters, stores a compressed version, and may retrieve it later without showing you why.",
          "For real work, people need memory they can inspect, correct, delete, and trace back to source conversations. Bad memory is worse than no memory when it contains stale decisions or wrong assumptions.",
        ],
        bullets: [
          "You need to see what the assistant remembers.",
          "You need provenance for important claims and decisions.",
          "You need memory to move across tools, not stay trapped in one chat product.",
          "You need contradictions and duplicates to be managed over time.",
        ],
      },
      {
        heading: "How Wenlan approaches AI work memory",
        body: [
          "Wenlan is a local-first, source-backed LLM wiki for AI work in Claude Code, Codex, Cursor, Claude Desktop, and other MCP clients, with experimental web access for supported web AI clients.",
          "Wenlan stores useful context locally, makes memory visible and correctable, writes handoffs, distills source-backed wiki pages, and uses hybrid retrieval that combines vector search, full-text search, and graph context.",
        ],
      },
      {
        heading: "Source trails and project scope",
        body: [
          "Provenance is the trail from a remembered fact to its source. Wenlan keeps source memory IDs with page records, exposes source memories through page-source views and APIs, tracks revisions, and writes local git history for readable artifacts. Session logs are useful context but not per-fact provenance, and provenance does not make a memory true; it makes claims inspectable so stale ones can be corrected.",
          "Wenlan is for repeated AI work, not one-off chats. Spaces are project or client buckets for context that should not automatically inform each other, not account permissions or team governance. It is not a life OS, a general workflow suite, or a memory SDK for app backends, and connected AI clients may still send retrieved context to their own model providers.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is AI work memory the same as a notes app?",
        answer:
          "No. A notes app is mainly for human writing and retrieval. AI work memory turns sessions, decisions, lessons, and project context into structured context that assistants can recall while they work.",
      },
      {
        question: "Does AI work memory replace ChatGPT or Claude memory?",
        answer:
          "It can complement or replace parts of built-in memory. The main difference is control: Wenlan makes memories visible, correctable, traceable, and available across MCP-compatible tools.",
      },
      {
        question: "What if I captured the wrong thing?",
        answer:
          "Recall the old memory, capture a corrected self-contained statement, and name what it supersedes. Use forget only when the old record should not remain.",
      },
    ],
    relatedSlugs: ["mcp-memory-server", "local-first-ai-memory", "wenlan-vs-basic-memory", "ai-work-memory-vs-knowledge-base", "review-before-trust-ai-memory", "source-backed-wiki-pages-ai-work"],
    cta: {
      heading: "Make your AI work compound",
      body: "Wenlan turns decisions, lessons, handoffs, and project context into memory and wiki pages your agents can use later.",
    },
  },
  {
    slug: "mcp-memory-server",
    eyebrow: "Protocol",
    category: "Concepts",
    title: "MCP Memory Server: How It Works, Setup for Claude Code and Cursor, and Which One to Use",
    description:
      "What an MCP memory server is, how to set up the official memory server in Claude Code, Codex, Cursor, and VS Code, where it stores data, and how the popular options compare.",
    metaTitle: "MCP Memory Server: Setup and Best Options Compared | Wenlan",
    metaDescription:
      "Set up the official MCP memory server in Claude Code, Cursor, Codex, or VS Code, see where it stores data, and compare Mem0, Basic Memory, and Wenlan.",
    keywords: [
      "MCP memory server",
      "memory MCP",
      "memory MCP server Claude Code",
      "knowledge graph memory MCP",
      "best memory MCP server",
      "local memory MCP server",
      "memory MCP server Cursor",
      "MCP knowledge base server",
    ],
    publishedAt: "2026-06-07",
    updatedAt: "2026-10-07",
    author: DEFAULT_AUTHOR,
    readingTime: "8 min read",
    audience: "Developers adding persistent memory to Claude Code, Cursor, Codex, VS Code, and other MCP clients",
    heroBullets: [
      "An MCP memory server stores what your AI should remember and lets any MCP client read and write it.",
      "The official server is a small knowledge graph saved to one JSONL file. Set MEMORY_FILE_PATH so the file doesn't get lost.",
      "Pick a server by where memory lives, how it searches, and whether you need to read and check what it remembers.",
    ],
    sections: [
      {
        heading: "Quick answer",
        body: [
          "An MCP memory server is a program that stores memories and exposes them as tools through the Model Context Protocol (MCP). Claude Code, Cursor, Codex, VS Code, Claude Desktop, and other MCP clients can call those tools to save something and look it up later, so memory outlasts one chat and can be shared between tools.",
          "The best-known one is Anthropic's Knowledge Graph Memory Server (@modelcontextprotocol/server-memory) in the official MCP servers repository. It is a good place to start; other servers add semantic search, Markdown notes, hosting, or source tracking.",
        ],
      },
      {
        id: "how-the-official-memory-server-works",
        heading: "How the official memory server works",
        body: [
          "The official server stores a knowledge graph with three parts. Entities are things such as a person, a project, or a tool. Relations connect two entities, such as \"Alice works_at Acme\". Observations are single facts attached to an entity, such as \"prefers pnpm\".",
          "It gives the AI nine tools: create_entities, create_relations, add_observations, delete_entities, delete_observations, delete_relations, read_graph, search_nodes, and open_nodes. search_nodes matches text in names, types, and observations; it is not semantic search.",
        ],
        code: {
          label: "One entity in the memory graph",
          code: "{\n  \"name\": \"wenlan-site\",\n  \"entityType\": \"project\",\n  \"observations\": [\"Uses pnpm\", \"Deployed on Vercel\"]\n}",
        },
      },
      {
        id: "add-memory-server-to-claude-code",
        heading: "Add the memory server to Claude Code, Codex, Cursor, or VS Code",
        body: [
          "Each client needs the same command, npx -y @modelcontextprotocol/server-memory, plus a MEMORY_FILE_PATH that points to a file you control. Create the file's parent directory before starting the server; this also applies when you set the path in a client's JSON config. Restart the client or start a new session after adding it.",
        ],
        code: {
          label: "Claude Code and Codex",
          code: "mkdir -p \"$HOME/.mcp-memory\"\n\nclaude mcp add memory -e MEMORY_FILE_PATH=$HOME/.mcp-memory/memory.jsonl \\\n  -- npx -y @modelcontextprotocol/server-memory\n\ncodex mcp add memory --env MEMORY_FILE_PATH=\"$HOME/.mcp-memory/memory.jsonl\" \\\n  -- npx -y @modelcontextprotocol/server-memory",
        },
        bullets: [
          "Cursor: add a \"memory\" entry under mcpServers in ~/.cursor/mcp.json, or .cursor/mcp.json for one project.",
          "VS Code: add it under servers in .vscode/mcp.json, or use the install button in the server's README.",
          "Claude Desktop: add it under mcpServers in claude_desktop_config.json.",
          "Docker: the README also shows a docker run command using the mcp/memory image and a named volume.",
        ],
      },
      {
        id: "where-mcp-memory-is-stored",
        heading: "Where the MCP memory server stores data",
        body: [
          "Everything lives in one JSONL file. If you don't set MEMORY_FILE_PATH, the file is memory.jsonl in the server's own folder. With npx, that folder is inside the npm cache, which can be cleared or replaced on update. Set MEMORY_FILE_PATH to a path you back up.",
          "Because it's one file per path, clients can reuse the same MEMORY_FILE_PATH sequentially. In local stdio setups, each client usually starts its own server process, and each process has its own mutation queue; writes from separate processes are not coordinated. Avoid simultaneous writes to the same file, or route clients through one coordinated service. Give each project its own path if you don't want memories to mix.",
        ],
        code: {
          label: "Cursor or Claude Desktop JSON",
          code: "{\n  \"mcpServers\": {\n    \"memory\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-memory\"],\n      \"env\": { \"MEMORY_FILE_PATH\": \"/Users/you/.mcp-memory/memory.jsonl\" }\n    }\n  }\n}",
        },
      },
      {
        heading: "Make the AI actually use it",
        body: [
          "Adding the server only makes the tools available. The AI decides when to call them, and many sessions never do. Tell it when to read and write memory in your instructions file: CLAUDE.md for Claude Code, AGENTS.md for Codex, or Cursor rules.",
        ],
        bullets: [
          "At the start of a task, search memory for the project name before asking me for context.",
          "When I state a preference or we make a decision, save it as an observation.",
          "Keep one fact per observation, and don't save secrets.",
        ],
      },
      {
        id: "best-mcp-memory-servers",
        heading: "MCP memory servers compared",
        body: [
          "The servers differ mostly in where memory lives and how they find it. GitHub star counts are from October 2026.",
        ],
        table: {
          columns: ["Server", "How it stores and searches", "Runs", "Good for"],
          rows: [
            ["Official memory server", "Knowledge graph in one JSONL file; text search", "Local", "A simple start and learning how MCP memory works"],
            ["Mem0 (about 67,000 stars)", "Memory platform with semantic search; hosted MCP server", "Hosted, or self-host Mem0", "Apps and agents that need managed memory"],
            ["Basic Memory (about 4,100 stars)", "Markdown files you can open and edit, for example in Obsidian", "Local, with an optional cloud version", "Notes you want to read and edit yourself"],
            ["mcp-memory-service (about 2,000 stars)", "Semantic search over stored memories; SQLite locally or Cloudflare", "Local or cloud", "Semantic recall shared across agents and frameworks"],
            ["codebase-memory-mcp (about 46,000 stars)", "Indexes your code into a knowledge graph", "Local", "Code structure, not decisions or preferences"],
            ["Wenlan", "Local memories plus wiki pages that cite their sources and flag when a source changes", "Local", "Project knowledge you want to read, check, and share across tools"],
          ],
        },
        link: {
          label: "Compare Wenlan with mcp-memory-service",
          href: "/learn/wenlan-vs-mcp-memory-service",
        },
      },
      {
        id: "mcp-knowledge-base-server",
        heading: "MCP memory server vs knowledge base",
        body: [
          "A memory server keeps small facts: preferences, decisions, names. That works until you need to know where a fact came from, or the document it was based on changes. Then you want a knowledge base: memories linked to their sources, organized into pages you can read, with a way to spot outdated answers.",
          "Wenlan is built for that second case. It keeps short memories for recall, groups related memories and documents into wiki pages that cite their sources, and marks pages for review when a source changes instead of silently overwriting them.",
        ],
        link: {
          label: "See how memories become source-backed wiki pages",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "Add Wenlan as your MCP memory server",
        body: [
          "Wenlan is an open-source desktop app with a local MCP server. Install it, then connect each client you use. They all read the same local memory and pages.",
          "Claude Code and Codex also have Wenlan plugins with commands such as /brief, /capture, /recall, and /handoff.",
        ],
        code: {
          label: "Connect MCP clients to Wenlan",
          code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect claude-code\n~/.wenlan/bin/wenlan connect cursor\n~/.wenlan/bin/wenlan connect codex\n# also: claude-desktop, vscode, gemini",
        },
        link: {
          label: "Read all MCP client setup paths",
          href: "/docs/mcp-clients",
        },
      },
      {
        heading: "Check that memory works",
        body: [
          "A configured server isn't proof that memory works. Run a small round trip before you rely on it.",
        ],
        bullets: [
          "List the server tools from one MCP client and confirm the memory tools appear.",
          "Ask the AI to save one harmless fact, then open a new session and ask for it.",
          "Ask the same question from a second client to confirm they share memory.",
          "For a knowledge base, query one harmless source and inspect the citation, then change the source and check that the answer is flagged or updated.",
        ],
      },
      {
        id: "wenlan-gemini-cli-vscode",
        heading: "Connect Gemini CLI and VS Code to Wenlan",
        body: [
          "Both clients use the same Wenlan daemon through MCP, so they share memory with your other tools. For terminal work, capture the conclusion and the command that proved it, not raw output.",
        ],
        bullets: [
          "Gemini CLI: run ~/.wenlan/bin/wenlan connect gemini, then verify with gemini mcp list, or /mcp list inside Gemini CLI. Wenlan uses Gemini's user-scope MCP setup. Then ask Gemini to use Wenlan's brief, recall, or capture tools.",
          "VS Code: from the workspace root, run ~/.wenlan/bin/wenlan connect vscode. It writes .vscode/mcp.json with a servers.wenlan entry. Add --dry-run to preview the config first.",
          "In VS Code, confirm MCP server trust, use MCP: List Servers to start or restart the server, and enable the Wenlan tools in Chat or Agent mode.",
          "VS Code Remote and Dev Containers run MCP servers where they are configured. Install or configure Wenlan in the remote environment, or handle localhost forwarding on purpose.",
        ],
        code: {
          label: "Gemini CLI and VS Code setup",
          code: "~/.wenlan/bin/wenlan connect gemini\ngemini mcp list\n~/.wenlan/bin/wenlan connect vscode --dry-run",
        },
      },
      {
        id: "wenlan-localhost-7878",
        heading: "What's running on localhost:7878? Troubleshoot Wenlan's daemon",
        body: [
          "Wenlan's daemon listens on 127.0.0.1:7878 by default. MCP clients don't talk to the database directly: they launch wenlan-mcp, and wenlan-mcp talks to the local daemon. When a tool is missing or a connection fails, check the daemon before changing every client. If something answers on 127.0.0.1:7878 and you don't use Wenlan, it's another local program (the Rust Book's example web server uses the same port); the lsof command below shows which process owns it.",
        ],
        bullets: [
          "Run wenlan status, then wenlan doctor for a fuller setup report.",
          "Run wenlan connect <client> --dry-run to see the wenlan-mcp command the client should launch.",
          "Run lsof to see which process owns port 7878, and make sure another development daemon isn't using the wrong data directory.",
          "Restart the MCP client after config changes.",
          "Loopback avoids LAN exposure, but the port is still sensitive access to a memory API. Don't bind the daemon to a non-loopback address unless you are deliberately developing or self-hosting, and redact memory contents from diagnostics.",
        ],
        code: {
          label: "Daemon and MCP checks",
          code: "~/.wenlan/bin/wenlan status\n~/.wenlan/bin/wenlan doctor\n~/.wenlan/bin/wenlan connect codex --dry-run\nlsof -nP -iTCP:7878 -sTCP:LISTEN",
        },
      },
    ],
    faqs: [
      {
        question: "What is an MCP memory server?",
        answer:
          "A server that stores memories and exposes them as MCP tools, so AI clients such as Claude Code, Cursor, and Codex can save and recall information across sessions.",
      },
      {
        question: "Where does the MCP memory server store data?",
        answer:
          "The official server writes one JSONL file. By default it is memory.jsonl in the server's folder; set MEMORY_FILE_PATH to choose the location.",
      },
      {
        question: "Can Claude Code and Cursor share one MCP memory server?",
        answer:
          "Yes, they can use the same MEMORY_FILE_PATH for sequential access. Separate local stdio server processes do not coordinate concurrent writes, so avoid simultaneous writers or use one coordinated service if both clients need to write at the same time. Both clients can also connect to the same Wenlan install.",
      },
      {
        question: "Is an MCP memory server the same as RAG?",
        answer:
          "No. MCP is how the client talks to the server. RAG is one way a server can search. Some memory servers use semantic search; the official one uses plain text matching.",
      },
      {
        question: "Can I change Wenlan's daemon port?",
        answer:
          "Yes for development, but the daemon port, bind address, CLI target, and MCP connector target are separate settings. Update the daemon and connector together, usually with an isolated data directory. For example, point the connector elsewhere with wenlan-mcp --origin-url http://127.0.0.1:7879.",
      },
      {
        question: "Does Claude Code need an MCP memory server?",
        answer:
          "Not always. Claude Code has CLAUDE.md and auto memory built in. Add an MCP memory server when you want the same memory in other tools or need more control over what is stored.",
      },
    ],
    relatedSlugs: [
      "claude-code-memory",
      "how-to-give-codex-persistent-memory",
      "cursor-claude-code-shared-memory",
      "source-backed-wiki-pages-ai-work",
      "build-local-ai-knowledge-base-from-documents",
      "distilled-wiki-pages-ai-memory",
      "wenlan-vs-mcp-memory-service",
      "prevent-multi-agent-knowledge-conflicts",
    ],
    officialReferences: [
      {
        label: "Knowledge Graph Memory Server (official MCP servers repo)",
        href: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
      },
      {
        label: "MCP server concepts",
        href: "https://modelcontextprotocol.io/docs/learn/server-concepts",
      },
      {
        label: "Claude Code MCP setup",
        href: "https://code.claude.com/docs/en/mcp",
      },
      {
        label: "Codex MCP setup",
        href: "https://developers.openai.com/codex/mcp",
      },
      {
        label: "Mem0 MCP server",
        href: "https://docs.mem0.ai/platform/mem0-mcp",
      },
      {
        label: "Basic Memory on GitHub",
        href: "https://github.com/basicmachines-co/basic-memory",
      },
      {
        label: "mcp-memory-service on GitHub",
        href: "https://github.com/doobidoo/mcp-memory-service",
      },
      {
        label: "Wenlan on GitHub",
        href: "https://github.com/7xuanlu/wenlan",
      },
    ],
    cta: {
      heading: "Use one local memory server for all your AI tools",
      body: "Install Wenlan, connect one MCP client, and test a save-and-recall round trip before connecting the rest.",
    },
  },
  {
    slug: "wenlan-vs-obsidian-ai-memory",
    eyebrow: "Developer workflow",
    category: "Workflows",
    title: "Obsidian + Claude Code: How to Set Up Your Vault, MCP, Plugins, and Skills",
    description:
      "How to use Claude Code with an Obsidian vault: run it in the vault folder, add a CLAUDE.md, use the Obsidian CLI and skills, connect an MCP server, or work inside Obsidian with a plugin.",
    metaTitle: "Obsidian + Claude Code: Setup, MCP, Plugins & Skills | Wenlan",
    metaDescription:
      "Connect Claude Code to an Obsidian vault: run it in the vault, add CLAUDE.md, use the Obsidian CLI and skills, or add an MCP server or the Claudian plugin.",
    keywords: [
      "obsidian claude code",
      "claude code obsidian",
      "obsidian claude",
      "obsidian mcp",
      "obsidian claude code mcp",
      "claude code obsidian vault",
      "obsidian claude code plugin",
      "claude code obsidian skill",
      "obsidian second brain claude code",
      "Obsidian AI knowledge base",
    ],
    publishedAt: "2026-06-06",
    updatedAt: "2026-10-06",
    author: DEFAULT_AUTHOR,
    readingTime: "8 min read",
    audience: "Obsidian users who want Claude Code to read, write, and organize their vault",
    heroBullets: [
      "An Obsidian vault is a folder of Markdown files. Run Claude Code in that folder and it can already read, search, and edit your notes.",
      "Add the Obsidian CLI and Obsidian skills when Claude should see backlinks, use Obsidian syntax, or edit Bases and Canvas files.",
      "Use an MCP server for tools without file access, such as Claude Desktop, and a plugin like Claudian if you'd rather stay inside Obsidian.",
    ],
    sections: [
      {
        heading: "Quick answer",
        body: [
          "You don't need a plugin to use Claude Code with Obsidian. Open a terminal in your vault folder and run claude. Claude Code can then read, search, create, and edit any note, the same way it works on a code repository.",
          "Everything else is optional and solves a specific gap. Pick by what's missing:",
        ],
        table: {
          columns: ["Setup", "What it adds", "Good for"],
          rows: [
            ["Claude Code in the vault folder", "Read, write, and search every Markdown file", "Almost everyone; start here"],
            ["CLAUDE.md in the vault", "Standing instructions: folders, note style, what not to touch", "Consistent results every session"],
            ["Obsidian CLI + Obsidian skills", "Backlinks, Obsidian search, tasks, and correct Obsidian syntax, Bases, and Canvas", "Vaults that rely on links and Obsidian features"],
            ["Obsidian MCP server", "Vault tools for any MCP client", "Claude Desktop and other tools without file access"],
            ["Plugin inside Obsidian (Claudian)", "Claude Code chat in an Obsidian sidebar", "People who don't want to use a terminal"],
          ],
        },
      },
      {
        id: "connect-claude-code-to-obsidian-vault",
        heading: "Step 1: Run Claude Code in your Obsidian vault",
        body: [
          "Your vault is the folder you picked when you created it in Obsidian. Start Claude Code there. Obsidian shows changes as soon as Claude Code saves a file, so you can keep both open side by side.",
          "If you're already working in another project, add the vault as an extra folder instead of switching.",
        ],
        code: {
          label: "Start Claude Code in the vault",
          code: "cd ~/Documents/MyVault\nclaude\n\n# or, from another project folder:\nclaude --add-dir ~/Documents/MyVault",
        },
        bullets: [
          "Back up first. Put the vault under git or use Obsidian Sync version history, so you can undo a bad edit.",
          "Try one small task before a big one, such as \"summarize my notes tagged #project-x\" or \"add links between these three notes\".",
          "Claude Code sends the notes it reads to Anthropic to answer you. Keep private folders out of scope, or tell Claude Code not to read them.",
        ],
      },
      {
        id: "claude-md-for-obsidian",
        heading: "Step 2: Add a CLAUDE.md to the vault",
        body: [
          "Claude Code reads CLAUDE.md from the folder it starts in at the beginning of every session. Use it to explain how your vault is organized, so you don't repeat it every time.",
        ],
        code: {
          label: "~/Documents/MyVault/CLAUDE.md",
          code: "# My vault\n\n- Notes use [[wikilinks]], not Markdown links.\n- New notes go in Inbox/. Never move files out of Archive/.\n- Daily notes live in Daily/ as YYYY-MM-DD.md.\n- Put AI-written summaries in AI/, not next to my own notes.\n- Never edit anything inside .obsidian/.",
        },
      },
      {
        id: "obsidian-cli-and-skills",
        heading: "Step 3: Add the Obsidian CLI and Obsidian skills",
        body: [
          "Reading files is not the same as understanding a vault. On its own, Claude Code sees text, not Obsidian's link graph, search index, or properties. The official Obsidian CLI fills that gap: Claude Code can run commands to search the vault, list backlinks, read tasks, and append to the daily note.",
          "The CLI needs Obsidian 1.12 or later. Turn it on in Settings > General > Command line interface. Obsidian must be running; the first command opens it if it isn't.",
        ],
        code: {
          label: "Obsidian CLI commands Claude Code can run",
          code: "obsidian search query=\"meeting notes\"\nobsidian backlinks file=Recipe\nobsidian tasks todo\nobsidian daily:append content=\"- [ ] Follow up\"",
        },
        bullets: [
          "Obsidian skills (kepano/obsidian-skills, about 49,000 GitHub stars) teach Claude Code to use the Obsidian CLI and to write Obsidian-flavored Markdown, Bases, and JSON Canvas files correctly.",
          "Install them as a Claude Code plugin: /plugin marketplace add kepano/obsidian-skills, then /plugin install obsidian@obsidian-skills.",
          "The same skills work in Codex and other tools that support Agent Skills.",
        ],
      },
      {
        id: "obsidian-mcp-server",
        heading: "Obsidian MCP server: when you need one",
        body: [
          "Claude Code can already reach your files, so an MCP server is usually optional there. MCP matters when the tool can't read your disk, such as Claude Desktop, or when you want the same vault tools in several clients.",
          "The Local REST API community plugin now includes an MCP server. Install and enable it in Obsidian, copy the API key from Settings > Local REST API, then add it to Claude Code. Obsidian must be running for the server to answer.",
        ],
        code: {
          label: "Add the Obsidian MCP server to Claude Code",
          code: "claude mcp add --transport http obsidian https://127.0.0.1:27124/mcp/ \\\n  --header \"Authorization: Bearer <your-api-key>\"",
        },
        bullets: [
          "The plugin uses its own certificate. If the connection fails, trust its certificate or enable the plain HTTP server on port 27123 in the plugin settings.",
          "mcp-obsidian (about 4,500 stars) is an older Python server that talks to the same plugin through uvx.",
          "Keep the API key out of shared files such as a committed .mcp.json.",
        ],
      },
      {
        id: "obsidian-claude-code-plugin",
        heading: "Obsidian plugins for Claude Code",
        body: [
          "If you'd rather not use a terminal, a plugin can run Claude Code inside Obsidian. You still need Claude Code installed and signed in. Star counts are from October 2026.",
        ],
        table: {
          columns: ["Plugin", "What it does", "Install"],
          rows: [
            ["Claudian (about 15,600 stars)", "Runs Claude Code or Codex in an Obsidian sidebar with your vault as the working folder", "Community plugins: search \"Claudian\""],
            ["Claude Code IDE bridge (obsidian-claude-ide)", "Shares the active file and selection with Claude Code running in a terminal", "Settings → Community plugins → Browse → search `Claude Code IDE`; install and enable, then run `/ide` in the Claude Code terminal and select Obsidian"],
            ["obsidian-claude-code (Roasbeef)", "An embedded Claude assistant inside the vault", "From GitHub"],
            ["obsidian-claude-code-mcp (iansinnott)", "MCP and IDE bridge for Claude Code; last updated in 2025", "From GitHub"],
          ],
        },
      },
      {
        id: "obsidian-second-brain-claude-code",
        heading: "Build a second brain with Claude Code and Obsidian",
        body: [
          "Most second-brain setups follow the same loop. You drop raw material into an inbox folder: articles, meeting notes, transcripts. Claude Code reads it, writes a summary note, links it to existing notes, and files it. Starter kits such as claude-obsidian (about 15,400 stars) package that loop as Claude Code skills.",
          "The risk is gradual. After a few hundred AI-written notes, it gets hard to tell what you wrote, what the AI inferred, and which summaries no longer match their source.",
        ],
        bullets: [
          "Keep AI-written notes in their own folder.",
          "Ask Claude Code to link every summary back to the note or file it came from.",
          "Review changes with git diff before you commit them.",
          "Re-check summaries when the original note changes.",
        ],
      },
      {
        id: "claude-code-obsidian-memory",
        heading: "Does Claude Code remember your vault?",
        body: [
          "Each Claude Code session starts with a fresh context window, but CLAUDE.md, auto memory, and resumed conversations can carry context forward. What Claude knows depends on what those mechanisms retain and load. An Obsidian vault stores notes, but does not by itself track which notes informed Claude's conclusions or whether those conclusions are out of date.",
          "Wenlan adds that layer without touching the vault. It reads your vault as a read-only source, combines it with decisions you capture while working, and writes wiki pages that cite their sources and are flagged for review when a source note changes. The same memory works in Claude Code, Codex, Cursor, and other MCP clients.",
        ],
        code: {
          label: "Add Wenlan to Claude Code",
          code: "npx -y wenlan setup\n# then, inside Claude Code:\n/plugin marketplace add 7xuanlu/wenlan\n/plugin install wenlan@7xuanlu-wenlan",
        },
        link: {
          label: "See how notes become source-backed wiki pages",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
    ],
    faqs: [
      {
        question: "How do I connect Claude Code to my Obsidian vault?",
        answer:
          "Open a terminal in the vault folder and run claude, or run claude --add-dir with the vault path from another project. No plugin is needed for Claude Code to read and edit notes.",
      },
      {
        question: "Does Obsidian have a Claude Code plugin?",
        answer:
          "Not an official one. Community plugins such as Claudian run Claude Code inside Obsidian, and obsidian-claude-ide shares your active note with Claude Code in a terminal.",
      },
      {
        question: "Do I need an MCP server to use Claude Code with Obsidian?",
        answer:
          "No. Claude Code can read the files directly. An Obsidian MCP server helps tools without file access, such as Claude Desktop, or when you want the same vault tools in several clients.",
      },
      {
        question: "Can Claude Code see Obsidian links and backlinks?",
        answer:
          "It can read [[wikilinks]] in the text. To list backlinks or use Obsidian search, turn on the Obsidian CLI and install the Obsidian skills so Claude Code knows how to call it.",
      },
      {
        question: "Is it safe to let Claude Code edit my vault?",
        answer:
          "Back up the vault with git or Obsidian Sync first, start with one folder, and keep AI-written notes separate. Claude Code sends the notes it reads to Anthropic.",
      },
    ],
    relatedSlugs: [
      "claude-code-memory",
      "migrate-obsidian-vault-to-llm-wiki",
      "mcp-memory-server",
      "distilled-wiki-pages-ai-memory",
      "local-first-ai-memory",
      "source-backed-wiki-pages-ai-work",
      "wenlan-vs-basic-memory",
      "ai-work-memory-vs-knowledge-base",
    ],
    officialReferences: [
      {
        label: "Obsidian CLI docs",
        href: "https://obsidian.md/help/cli",
      },
      {
        label: "Obsidian data storage docs",
        href: "https://obsidian.md/help/data-storage",
      },
      {
        label: "Claude Code memory and CLAUDE.md",
        href: "https://code.claude.com/docs/en/memory",
      },
      {
        label: "Obsidian skills (kepano/obsidian-skills)",
        href: "https://github.com/kepano/obsidian-skills",
      },
      {
        label: "Local REST API with MCP",
        href: "https://github.com/coddingtonbear/obsidian-local-rest-api",
      },
      {
        label: "Claudian",
        href: "https://github.com/YishenTu/claudian",
      },
      {
        label: "Claude Code IDE bridge for Obsidian",
        href: "https://github.com/petersolopov/obsidian-claude-ide",
      },
      {
        label: "obsidian-claude-code embedded assistant",
        href: "https://github.com/Roasbeef/obsidian-claude-code",
      },
      {
        label: "Obsidian Claude Code MCP bridge",
        href: "https://github.com/iansinnott/obsidian-claude-code-mcp",
      },
      {
        label: "Wenlan with Obsidian",
        href: "https://github.com/7xuanlu/wenlan#local-markdown-that-works-with-obsidian",
      },
    ],
    cta: {
      heading: "Keep what Claude learns from your vault",
      body: "Install Wenlan, add your vault as a read-only source, and check one cited page before relying on it.",
    },
  },
  {
    slug: "local-first-ai-memory",
    eyebrow: "Privacy",
    category: "Concepts",
    title: "Local-First AI Work Memory: Keep Context on Your Machine",
    description:
      "Local-first AI work memory keeps sensitive project knowledge, decisions, and preferences under your control while still making them useful to assistants.",
    metaTitle: "Local-First AI Memory: What Stays on Your Machine | Wenlan",
    metaDescription:
      "Learn why local-first AI work memory matters for privacy, ownership, and long-running work. Wenlan keeps work context visible, correctable, and on your machine.",
    keywords: [
      "local-first AI work memory",
      "private AI work memory",
      "on-device AI work memory",
      "open source AI work memory",
      "self-hosted AI work memory",
    ],
    updatedAt: "2026-10-07",
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "People using AI with sensitive work, client context, or private knowledge",
    heroBullets: [
      "Your memory database stays on your machine by default.",
      "Base retrieval runs locally; optional enrichment can use an on-device model, a local endpoint, or a cloud model you choose.",
      "Every memory remains visible, correctable, and traceable.",
    ],
    sections: [
      {
        heading: "What local-first means for AI work memory",
        body: [
          "Local-first AI work memory means the durable context your assistants rely on is owned and stored primarily on your device. Cloud services may still be useful in some workflows, but they are not the default source of truth.",
          "For memory, that distinction matters. The data can include client names, strategy decisions, personal preferences, private codebase details, and the accumulated reasoning behind your work.",
        ],
      },
      {
        heading: "Why memory is more sensitive than prompts",
        body: [
          "A single prompt may be sensitive. A memory layer is sensitive in a different way because it accumulates. Over time it becomes a compact map of what you care about, what you are building, where you got stuck, and what decisions you made.",
          "That makes visibility and control non-negotiable. You should be able to inspect, correct, export, and delete what your AI remembers.",
        ],
      },
      {
        heading: "The tradeoff",
        body: [
          "Cloud memory can be easier to access across devices. Local-first memory gives stronger ownership, simpler privacy boundaries, and better fit for work that cannot casually leave your machine.",
          "Wenlan chooses local-first because the memory layer should be something you trust, not another opaque profile maintained by a platform.",
          "Local-first is not offline-only. A connected AI client sends the context it retrieves to its own model provider, a cloud model you configure for enrichment receives the content it processes, and experimental web access passes queries and results through a relay.",
        ],
      },
      {
        heading: "How Wenlan keeps memory useful",
        body: [
          "Local-first does not mean inert. Wenlan combines vector search, full-text search, and a knowledge graph so assistants can retrieve the right work context without replaying everything.",
          "It also makes memory inspectable. You can see what was learned, trace it back to source conversations, and correct it when your understanding changes.",
        ],
      },
      {
        heading: "Readable artifacts plus a local store",
        body: [
          "Wenlan keeps Memories and graph data in a daemon-owned local libSQL store that powers fast semantic and full-text recall, and projects Pages with citations and revisions, session logs, and project status as readable Markdown under ~/.wenlan. Markdown alone would not give agents fast retrieval, and a database alone would be opaque to you.",
          "Those readable artifacts are also committed to a local git repository at ~/.wenlan/.git, so changes show up as ordinary diffs and can be recovered. Git versions the artifacts; the daemon still owns the database and indexes.",
        ],
        bullets: [
          "git -C ~/.wenlan log --oneline shows the timeline of artifact changes; git -C ~/.wenlan diff shows readable changes.",
          "Back up ~/.wenlan, including .git, with the rest of your local data.",
          "Use Wenlan's correction, review, and forget flows for memory changes instead of editing daemon-owned state behind its back.",
        ],
        code: {
          label: "Inspect local artifacts",
          code: "ls ~/.wenlan/pages ~/.wenlan/sessions\ngit -C ~/.wenlan log --oneline -5",
        },
      },
    ],
    faqs: [
      {
        question: "Does local-first mean no AI model can use the memory?",
        answer:
          "No. Local-first means the memory layer is owned locally. MCP-compatible AI tools can still access relevant context through the local Wenlan daemon.",
      },
      {
        question: "Is Wenlan fully self-hosted?",
        answer:
          "Wenlan is local-first on macOS, Linux, and Windows. The daemon and database run locally, and optional integrations may depend on the AI tools you connect.",
      },
      {
        question: "Is Wenlan using git as the database?",
        answer:
          "No. The daemon owns the database and indexes. Git versions readable artifacts such as pages, session logs, and project status Markdown.",
      },
    ],
    relatedSlugs: ["ai-work-memory", "mcp-memory-server", "ai-work-memory-vs-knowledge-base", "wenlan-vs-basic-memory"],
    cta: {
      heading: "Keep your context where your work lives",
      body: "Wenlan gives AI tools useful memory without making your accumulated work context cloud-first by default.",
    },
  },
  {
    slug: "claude-code-memory",
    eyebrow: "Developer guide",
    category: "Workflows",
    title: "Claude Code Memory: How It Works, Where It's Stored, and How to Extend It",
    description:
      "How Claude Code memory works: CLAUDE.md vs auto memory, where MEMORY.md lives, how to view, clear, or turn it off, why it forgets your last session, and when a plugin helps.",
    metaTitle: "Claude Code Memory: How It Works & Where It's Stored | Wenlan",
    metaDescription:
      "How Claude Code memory works: CLAUDE.md, AGENTS.md and auto memory, where MEMORY.md is stored, how to clear or disable it, and when a memory plugin helps.",
    keywords: [
      "Claude Code memory",
      "Claude Code memory.md",
      "Claude Code memory location",
      "Claude Code memory vs CLAUDE.md",
      "how Claude Code memory works",
      "Claude Code auto memory",
      "clear Claude Code memory",
      "Claude Code remember previous session",
      "Claude Code memory plugin",
      "Claude Code MCP memory",
    ],
    publishedAt: "2026-06-07",
    updatedAt: "2026-10-07",
    author: DEFAULT_AUTHOR,
    readingTime: "9 min read",
    audience: "Developers who want Claude Code to remember project rules, preferences, and decisions",
    heroBullets: [
      "Claude Code has two memory systems: CLAUDE.md, which you write, and auto memory, which Claude writes.",
      "Auto memory lives in ~/.claude/projects/<project>/memory/, and only the first 200 lines or 25 KB of MEMORY.md load at startup.",
      "Memory is not chat history. To pick up a past conversation, use claude --continue or claude --resume.",
    ],
    sections: [
      {
        heading: "Quick answer",
        body: [
          "Claude Code memory is two sets of Markdown files that load at the start of every session. CLAUDE.md holds instructions you write. Auto memory holds notes Claude writes for itself from your corrections and preferences.",
          "Start with Claude Code's native memory. It covers project rules and personal preferences on one machine. Add a plugin or MCP memory server only when other AI tools need the same memory, when notes should point back to their sources, or when memory has to outlive one machine.",
        ],
        table: {
          columns: ["", "CLAUDE.md", "Auto memory"],
          rows: [
            ["Who writes it", "You", "Claude"],
            ["What goes in it", "Instructions: build commands, conventions, \"always do X\" rules", "Learnings: your preferences, corrections, ongoing decisions"],
            ["Scope", "Project, user, or organization", "One folder per Git repository"],
            ["Loaded at startup", "The whole file (aim for under 200 lines)", "First 200 lines or 25 KB of MEMORY.md"],
            ["Shared with teammates", "Yes, if you commit the project file", "No, it stays on your machine"],
          ],
        },
      },
      {
        id: "where-claude-code-stores-memory",
        heading: "Where Claude Code stores memory",
        body: [
          "Auto memory is stored in ~/.claude/projects/<project>/memory/. The project name comes from the Git repository, so auto memory is per repository and shared across worktrees and subdirectories. Outside a Git repo, the project root is used instead.",
          "MEMORY.md is an index with one line per memory, and each memory is its own topic file. Topic files are not loaded at startup; Claude opens them when it needs them.",
          "Auto memory is machine-local. It is not synced to other computers or cloud sessions. To keep it somewhere else, set autoMemoryDirectory in settings.json to an absolute path or a path that starts with ~/.",
        ],
        code: {
          label: "Auto memory folder",
          code: "~/.claude/projects/<project>/memory/\n├── MEMORY.md            # index, loaded every session\n├── user_role.md         # one memory per file\n├── feedback_testing.md\n└── ...",
        },
      },
      {
        heading: "Where CLAUDE.md files live",
        body: [
          "Claude Code loads CLAUDE.md files from your working directory and every folder above it, and combines them. A CLAUDE.md in a subfolder loads only when Claude works with files in that subfolder.",
        ],
        table: {
          columns: ["File", "Location", "Use it for"],
          rows: [
            ["Project", "./CLAUDE.md or ./.claude/CLAUDE.md", "Team rules, commands, and architecture notes. Commit it."],
            ["Personal, this project", "./CLAUDE.local.md", "Your own sandbox URLs or test data. Add it to .gitignore."],
            ["Personal, all projects", "~/.claude/CLAUDE.md", "Preferences you want in every project"],
            ["Rules", ".claude/rules/*.md", "One topic per file, optionally limited to certain paths"],
            ["Shared with other agents", "./AGENTS.md", "Read in place of CLAUDE.md when the project has no CLAUDE.md (Claude Code v2.1.277+). Or keep CLAUDE.md and add the line @AGENTS.md to it."],
            ["Organization", "macOS: /Library/Application Support/ClaudeCode/CLAUDE.md; Linux/WSL: /etc/claude-code/CLAUDE.md; Windows: C:\\Program Files\\ClaudeCode\\CLAUDE.md", "Company-wide instructions managed by IT"],
          ],
        },
      },
      {
        heading: "Claude Code memory vs CLAUDE.md: what goes where",
        body: [
          "Put something in CLAUDE.md when it is a rule everyone on the project should follow in every session. Let auto memory hold what Claude learns about how you work.",
          "When you tell Claude \"remember that the API tests need a local Redis\", it saves that to auto memory. To put it in CLAUDE.md instead, say \"add this to CLAUDE.md\" or edit the file yourself.",
        ],
        bullets: [
          "CLAUDE.md: build and test commands, coding standards, naming rules, architecture decisions.",
          "Auto memory: your preferences, corrections you gave Claude, ongoing work Claude can't see in the code.",
          "Neither: multi-step procedures belong in a skill, and anything that must always happen belongs in a hook.",
        ],
      },
      {
        id: "view-clear-or-disable-claude-code-memory",
        heading: "How to view, clear, or turn off Claude Code memory",
        body: [
          "Run /memory inside a session. It lists every CLAUDE.md and memory location, opens files in your editor, has an auto memory on/off toggle, and can open the auto memory folder.",
          "Everything is plain Markdown. To clear auto memory, delete the topic files you no longer want and their lines in MEMORY.md. Claude Code cleans up old session transcripts, but memory files stay until you or Claude remove them.",
        ],
        bullets: [
          "See what loaded: /context lists the CLAUDE.md files in this session under Memory files.",
          "Turn off auto memory everywhere: use the toggle in /memory, which saves autoMemoryEnabled to your user settings.",
          "Turn it off for one project: set \"autoMemoryEnabled\": false in that project's .claude/settings.json.",
          "Turn it off with an environment variable: CLAUDE_CODE_DISABLE_AUTO_MEMORY=1.",
        ],
        code: {
          label: "Disable auto memory for one project (.claude/settings.json)",
          code: "{\n  \"autoMemoryEnabled\": false\n}",
        },
      },
      {
        heading: "Why Claude Code doesn't remember your last session",
        body: [
          "Memory and conversation history are different things. A new session starts with an empty context window plus your memory files. It does not include what you said yesterday unless Claude saved it to auto memory.",
          "To continue an earlier conversation, resume it instead of starting a new one. To carry decisions forward without replaying a whole transcript, write them down at the end of the session: ask Claude to update CLAUDE.md, or use a handoff tool.",
        ],
        code: {
          label: "Resume a conversation",
          code: "claude --continue   # reopen the most recent conversation in this folder\nclaude --resume     # pick one from a list\n/resume             # switch conversations from inside a session",
        },
      },
      {
        heading: "Auto memory not working, or Claude ignoring CLAUDE.md",
        body: [
          "Memory files are context, not enforced settings. Claude reads them and tries to follow them, but vague or conflicting instructions get followed inconsistently.",
        ],
        bullets: [
          "Run /context and check Memory files. If a CLAUDE.md is missing there, Claude can't see it.",
          "Remember that a CLAUDE.md in a subfolder loads only when Claude works in that subfolder.",
          "Keep MEMORY.md under 200 lines and 25 KB. Anything past that isn't loaded at startup.",
          "Look for conflicting rules across CLAUDE.md files and .claude/rules/. Claude may pick either one.",
          "Make instructions specific: \"use 2-space indentation\" works better than \"format code nicely\".",
          "If something must happen every time, such as before each commit, use a hook instead of a memory file.",
          "Check that autoMemoryEnabled or CLAUDE_CODE_DISABLE_AUTO_MEMORY hasn't turned auto memory off.",
        ],
      },
      {
        id: "claude-code-memory-plugins",
        heading: "Claude Code memory plugins and MCP servers",
        body: [
          "Native memory has limits by design. It stays on one machine, each repository gets its own folder, tools such as Cursor or Codex can't read it, and notes don't point back to where they came from.",
          "If those limits matter, add a memory tool. The common options solve different problems, so pick by what you're missing. GitHub star counts are from October 2026.",
        ],
        table: {
          columns: ["Option", "How it works", "Good for"],
          rows: [
            ["Native auto memory", "Claude writes short Markdown notes per repository", "Preferences and corrections on one machine"],
            ["claude-mem (about 97,000 stars)", "Records what the agent does each session, compresses it with AI, and injects relevant context into later sessions", "Automatic session recall without writing notes"],
            ["An MCP memory server", "Stores memories behind MCP tools that any compatible client can call", "Sharing memory between Claude Code, Cursor, Codex, and other MCP clients"],
            ["Wenlan", "Local MCP memory plus wiki pages that cite their sources and flag when a source changes", "Project decisions and knowledge you want to read, check, and share across tools"],
          ],
        },
        link: {
          label: "Compare Wenlan and claude-mem",
          href: "/learn/wenlan-vs-claude-mem",
        },
      },
      {
        heading: "Add Wenlan to Claude Code",
        body: [
          "Wenlan is an open-source desktop app and Claude Code plugin. It keeps memory on your computer, turns related notes into wiki pages that cite their sources, and serves the same memory to Cursor, Codex, Claude Desktop, and other MCP clients.",
          "Install the plugin, restart Claude Code if asked, then run /setup. Test one capture and one recall before relying on it for real project memory.",
        ],
        code: {
          label: "Claude Code plugin",
          code: "/plugin marketplace add 7xuanlu/wenlan\n/plugin install wenlan@7xuanlu-wenlan\n/setup\n/capture This project uses Wenlan for local AI work memory.\n/recall local AI work memory",
        },
        link: {
          label: "Turn Claude Code memory into an LLM wiki",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        id: "wenlan-daily-loop-claude-code",
        heading: "The daily Wenlan loop in Claude Code",
        body: [
          "Wenlan does not replace /memory or CLAUDE.md. Keep stable project rules in CLAUDE.md, and use Wenlan for the part that keeps changing: decisions, lessons, gotchas, and project status that must reach the next session or another tool.",
          "The plugin adds a short loop around real work. Most serious sessions need /brief at the start and /handoff at the end.",
          "Claude Code runs the plugin and calls MCP tools; it does not store Wenlan's memory. Wenlan's local daemon owns the memory store, separate from CLAUDE.md and auto memory, and writes readable artifacts under ~/.wenlan: distilled pages in ~/.wenlan/pages, session logs and a read-only project-status receipt in ~/.wenlan/sessions, and local git history in ~/.wenlan/.git. Use Wenlan commands and tools for writes, review, distill, and delete rather than editing the database directly, and run ~/.wenlan/bin/wenlan status to check the daemon.",
        ],
        bullets: [
          "/brief: load project status, recent handoffs, preferences, and relevant memories before edits begin.",
          "/capture: save one durable idea, such as a decision, gotcha, or constraint, and why it matters.",
          "/recall: look up a specific past decision or gotcha.",
          "/handoff: write what changed and what is still open, and store durable captures for the next session.",
          "/distill: turn repeated captures into wiki pages that cite their sources.",
        ],
        code: {
          label: "Daily loop",
          code: "/brief\n/capture <one durable project fact and why it matters>\n/recall <specific prior decision or gotcha>\n/handoff",
        },
      },
    ],
    faqs: [
      {
        question: "Where is Claude Code memory stored?",
        answer:
          "Auto memory is in ~/.claude/projects/<project>/memory/, with MEMORY.md as the index. CLAUDE.md files live in your project (./CLAUDE.md), your home folder (~/.claude/CLAUDE.md), or an organization-managed location.",
      },
      {
        question: "Is MEMORY.md the same as CLAUDE.md?",
        answer:
          "No. You write CLAUDE.md to give Claude instructions. Claude writes MEMORY.md and its topic files to remember what it learned about your project and preferences.",
      },
      {
        question: "How do I clear Claude Code memory?",
        answer:
          "Run /memory, open the auto memory folder, and delete the files or lines you don't want. To stop new memories, turn auto memory off in /memory or set CLAUDE_CODE_DISABLE_AUTO_MEMORY=1.",
      },
      {
        question: "Does Claude Code remember previous sessions?",
        answer:
          "Not the conversation itself. Each session reloads CLAUDE.md and auto memory. Use claude --continue or claude --resume to reopen an earlier conversation.",
      },
      {
        question: "Can Cursor or Codex use Claude Code memory?",
        answer:
          "Not directly. Auto memory is a Claude Code feature on one machine. To share memory across tools, use an MCP memory server such as Wenlan.",
      },
      {
        question: "Does Wenlan replace Claude Code /memory?",
        answer:
          "No. /memory inspects and edits what Claude Code has loaded. Wenlan adds a local work-memory layer for source-backed context, handoffs, and MCP sharing with other tools.",
      },
      {
        question: "Does Claude Code store Wenlan's memory?",
        answer:
          "No. Claude Code runs the plugin and calls MCP tools. Wenlan's local daemon owns the memory store and writes readable pages and session handoffs under ~/.wenlan.",
      },
    ],
    relatedSlugs: ["wenlan-vs-claude-mem", "mcp-memory-server", "ai-agent-handoff-loop", "ai-coding-agent-loses-context"],
    officialReferences: [
      {
        label: "Claude Code memory docs",
        href: "https://code.claude.com/docs/en/memory",
      },
      {
        label: "Claude Code sessions docs",
        href: "https://code.claude.com/docs/en/sessions",
      },
      {
        label: "Claude Code MCP docs",
        href: "https://code.claude.com/docs/en/mcp",
      },
      {
        label: "claude-mem on GitHub",
        href: "https://github.com/thedotmack/claude-mem",
      },
      {
        label: "Wenlan on GitHub",
        href: "https://github.com/7xuanlu/wenlan",
      },
    ],
    cta: {
      heading: "Share Claude Code memory with your other AI tools",
      body: "Install the Wenlan plugin, run /setup, then test one capture and recall before adding real project context.",
    },
  },
  {
    slug: "how-to-give-codex-persistent-memory",
    eyebrow: "Developer workflow",
    category: "Workflows",
    title: "Codex Memory: How Memories and AGENTS.md Work, and How to Add Persistent Memory",
    description:
      "How Codex remembers things between sessions: the memories feature, where ~/.codex/memories lives, how to turn it on or off, what belongs in AGENTS.md, and when to add an MCP memory server.",
    metaTitle: "Codex Memory: How Memories & AGENTS.md Work | Wenlan",
    metaDescription:
      "Codex memories are off by default. How to turn them on, where ~/.codex/memories lives, what belongs in AGENTS.md, and how to share memory with Claude Code.",
    keywords: [
      "Codex memory",
      "Codex memories",
      "Codex persistent memory",
      "Codex CLI memory",
      "Codex memories folder",
      "Codex AGENTS.md",
      "Codex memory plugin",
      "Codex MCP memory",
    ],
    publishedAt: "2026-06-07",
    updatedAt: "2026-10-07",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "Developers using the Codex CLI, the Codex IDE extension, or the ChatGPT desktop app for coding",
    heroBullets: [
      "Codex memories are off by default. Turn them on in settings or with memories = true in config.toml.",
      "Codex writes memories to ~/.codex/memories/ in the background. Rules that must always apply belong in AGENTS.md.",
      "Codex memory stays inside Codex. Use an MCP memory server when Claude Code or Cursor need the same context.",
    ],
    sections: [
      {
        heading: "Quick answer",
        body: [
          "Codex has two kinds of memory. AGENTS.md files are instructions you write; Codex reads them at the start of every session. Memories are notes Codex writes itself from your earlier chats, so you don't have to repeat preferences, project conventions, and known pitfalls.",
          "Memories are off by default. Once on, Codex updates them in the background after a chat has been idle for a while, not the moment it ends.",
        ],
        table: {
          columns: ["", "AGENTS.md", "Codex memories"],
          rows: [
            ["Who writes it", "You", "Codex, from earlier chats"],
            ["Where it lives", "~/.codex/AGENTS.md and AGENTS.md files in your repository", "~/.codex/memories/"],
            ["When it loads", "Every session, every time", "When memories are on for that chat"],
            ["Use it for", "Rules, commands, and conventions that must always apply", "Preferences and lessons Codex picks up as you work"],
            ["On by default", "Yes, if the file exists", "No"],
          ],
        },
      },
      {
        id: "turn-codex-memories-on-or-off",
        heading: "How to turn Codex memories on or off",
        body: [
          "In the ChatGPT desktop app, open Settings > Personalization and turn on Enable Codex memories. For the Codex CLI, add the feature flag to ~/.codex/config.toml.",
          "If you don't see the setting, check the current Codex memories docs for regional availability.",
        ],
        code: {
          label: "~/.codex/config.toml",
          code: "[features]\nmemories = true",
        },
      },
      {
        heading: "Control memories for one chat with /memories",
        body: [
          "In the Codex TUI and the ChatGPT desktop app, type /memories to decide whether the current chat can use existing memories and whether Codex may learn from it. This only affects the current chat; your global setting stays the same.",
          "For finer control, these settings go under memories in config.toml:",
        ],
        bullets: [
          "memories.use_memories: whether Codex puts existing memories into new sessions.",
          "memories.generate_memories: whether new chats can be turned into memories.",
          "memories.disable_on_external_context: keep chats that used MCP tools or web search out of memory.",
          "memories.min_rate_limit_remaining_percent: skip memory updates when you're close to your usage limit.",
        ],
      },
      {
        id: "where-codex-stores-memories",
        heading: "Where Codex stores memories",
        body: [
          "Codex keeps memories in your Codex home folder, which is ~/.codex unless you set CODEX_HOME. The memories folder holds summaries, longer-lasting entries, recent inputs, and the evidence they came from.",
          "OpenAI describes these files as generated state. Open them to see what Codex remembers or to check for anything sensitive before you share your Codex folder, but don't treat hand edits as the main way to control memory. Use the settings above instead.",
        ],
        code: {
          label: "Codex home folder",
          code: "~/.codex/\n├── AGENTS.md        # your global instructions\n├── config.toml      # [features] memories = true\n└── memories/        # written by Codex",
        },
      },
      {
        id: "codex-agents-md",
        heading: "What goes in AGENTS.md instead",
        body: [
          "OpenAI's own advice is to keep required guidance in AGENTS.md, not in memories. Memories help Codex recall things; they are not guaranteed to load every time.",
          "Codex reads ~/.codex/AGENTS.md first, then each AGENTS.md from your repository root down to the folder you're working in. A file closer to your folder wins when rules conflict. An AGENTS.override.md in the same folder replaces the AGENTS.md there.",
        ],
        bullets: [
          "Put build, test, and lint commands in the repository's AGENTS.md.",
          "Put personal working preferences in ~/.codex/AGENTS.md.",
          "Codex stops reading once the combined files reach 32 KiB. Raise project_doc_max_bytes or split the instructions into folders if you hit the limit.",
          "To check what loaded, run: codex --ask-for-approval never \"Summarize the current instructions.\"",
        ],
      },
      {
        heading: "Why Codex doesn't remember your last session",
        body: [
          "A new Codex session starts a new conversation. It reloads AGENTS.md and, if memories are on, relevant memories, but not the previous chat itself. Memories also arrive late: Codex waits until a chat has been idle before it summarizes it.",
          "To pick up exactly where you left off, resume the conversation instead.",
        ],
        code: {
          label: "Resume or fork a Codex session",
          code: "codex resume          # pick from recent sessions\ncodex resume --last   # most recent session in this folder\ncodex resume --all    # search sessions from every folder\ncodex fork --last     # start a new chat from the last one",
        },
      },
      {
        heading: "Codex memories not working",
        body: [
          "Most problems come from one of these:",
        ],
        bullets: [
          "Nothing in ~/.codex/memories/: memories are off, or your chats were too short or still active. Give it time after a chat goes idle.",
          "Codex ignores a rule: move the rule to AGENTS.md. Memories are a recall aid, not a guarantee.",
          "Chats that used MCP tools or web search never become memories: check memories.disable_on_external_context.",
          "No updates while you work hard: Codex skips memory updates when your remaining usage is below memories.min_rate_limit_remaining_percent.",
          "Edited the wrong file: run echo $CODEX_HOME. A custom value points Codex at a different home folder.",
        ],
      },
      {
        id: "codex-memory-plugins",
        heading: "Codex memory plugins and MCP servers",
        body: [
          "Native memories stay inside Codex on one machine. Claude Code, Cursor, and other tools can't read them, and a memory doesn't link back to the file or decision it came from.",
          "If you use more than one AI tool, or want memory you can read and check, add a memory server through MCP. Codex supports MCP and plugins, so any MCP memory server can plug in.",
        ],
        table: {
          columns: ["Option", "How it works", "Good for"],
          rows: [
            ["Codex memories", "Codex writes notes from earlier chats into ~/.codex/memories/", "Preferences and lessons, Codex only"],
            ["AGENTS.md", "You write instructions Codex loads every session", "Rules that must always apply"],
            ["An MCP memory server", "Stores memories behind MCP tools that any compatible client can call", "Sharing memory between Codex, Claude Code, Cursor, and others"],
            ["Wenlan", "Local MCP memory plus wiki pages that cite their sources and flag when a source changes", "Project knowledge you want to read, check, and share across tools"],
          ],
        },
        link: {
          label: "Share one memory between Codex and Claude Code",
          href: "/learn/codex-claude-code-shared-memory",
        },
      },
      {
        heading: "Add Wenlan to Codex",
        body: [
          "Wenlan is an open-source desktop app with a Codex plugin. It keeps memory on your computer, turns related notes into wiki pages that cite their sources, and serves the same memory to Claude Code, Cursor, Claude Desktop, and other MCP clients.",
          "Install the Wenlan runtime first, then add the plugin, start a new Codex task, and run /setup. Test one capture and one recall before relying on it for real project memory.",
        ],
        code: {
          label: "Codex plugin",
          code: "npx -y wenlan setup   # macOS Apple Silicon; other platforms: see setup docs\ncodex plugin marketplace add 7xuanlu/wenlan\ncodex plugin add wenlan@7xuanlu-wenlan\n# start a new Codex task, then:\n/setup",
        },
        link: {
          label: "MCP only, without the plugin: wenlan connect codex",
          href: "/docs/mcp-clients",
        },
      },
      {
        heading: "Use Wenlan in a Codex session",
        body: [
          "The Codex plugin adds the same session commands as Claude Code. Name the concrete decision, file area, or gotcha; a capture like \"worked on repo\" will not help a later session.",
        ],
        bullets: [
          "/brief: load project status and relevant memories before you start.",
          "/capture: save one decision, gotcha, or constraint and why it matters.",
          "/recall: look up a past decision by project name or failure mode.",
          "/handoff: record what changed and what is open, so a later Codex or Claude Code session can continue.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Codex have memory?",
        answer:
          "Yes. Codex memories carry preferences, conventions, and known pitfalls from earlier chats into new ones. They are off by default. Codex also loads AGENTS.md instructions in every session.",
      },
      {
        question: "Where are Codex memories stored?",
        answer:
          "In ~/.codex/memories/, inside your Codex home folder. If you set CODEX_HOME, they are under that folder instead.",
      },
      {
        question: "How do I turn Codex memories on or off?",
        answer:
          "Use Settings > Personalization in the ChatGPT desktop app, or set memories = true (or false) under [features] in ~/.codex/config.toml. Use /memories to change it for one chat only.",
      },
      {
        question: "Should I use AGENTS.md or memories?",
        answer:
          "Both. Put rules that must always apply in AGENTS.md. Let memories handle the smaller preferences Codex picks up as you work.",
      },
      {
        question: "Can Claude Code use Codex memories?",
        answer:
          "Not directly. Codex memories are only for Codex. To share memory across tools, connect both to the same MCP memory server, such as Wenlan.",
      },
      {
        question: "Can Codex write the same Wenlan memory as Claude Code?",
        answer:
          "Yes, when both use the same local Wenlan daemon. Both plugins provide /brief, /capture, /recall and /handoff, so either tool can end a session and the other can pick it up.",
      },
    ],
    relatedSlugs: ["codex-claude-code-shared-memory", "coding-agent-source-backed-knowledge-base", "claude-code-memory", "mcp-memory-server", "ai-coding-agent-loses-context"],
    officialReferences: [
      {
        label: "Codex memories docs",
        href: "https://developers.openai.com/codex/memories",
      },
      {
        label: "Codex AGENTS.md guide",
        href: "https://developers.openai.com/codex/guides/agents-md",
      },
      {
        label: "Codex CLI reference",
        href: "https://developers.openai.com/codex/cli/reference",
      },
      {
        label: "Wenlan setup for Codex",
        href: "https://github.com/7xuanlu/wenlan/blob/main/docs/setup-with-ai.md#codex",
      },
    ],
    cta: {
      heading: "Share Codex memory with your other AI tools",
      body: "Install the Wenlan plugin for Codex, run /setup, then test one capture and recall before adding real project context.",
    },
  },
  {
    slug: "distilled-wiki-pages-ai-memory",
    eyebrow: "Guide",
    category: "Concepts",
    title: "Karpathy's LLM Wiki: What It Is and How to Build One",
    description:
      "Andrej Karpathy's LLM Wiki pattern explained with diagrams, the implementations people actually use, and a copy-paste Claude Code setup.",
    metaTitle: "Karpathy LLM Wiki: What It Is & How to Build One",
    metaDescription:
      "Karpathy's LLM Wiki explained with diagrams: how it differs from RAG, the most-used implementations, and a copy-paste Claude Code setup with CLAUDE.md.",
    keywords: [
      "LLM wiki",
      "Karpathy LLM wiki",
      "Andrej Karpathy LLM wiki",
      "LLM wiki Karpathy",
      "Karpathy LLM wiki GitHub",
      "Karpathy LLM wiki implementation",
      "how to build an LLM wiki",
      "LLM wiki Claude Code",
      "LLM wiki CLAUDE.md",
      "LLM wiki Obsidian",
      "LLM wiki vs RAG",
      "AI knowledge base",
    ],
    publishedAt: "2026-06-24",
    updatedAt: "2026-10-06",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "Anyone who read Karpathy's LLM Wiki note and wants a working version with Claude Code, Codex, or Obsidian",
    heroBullets: [
      "An LLM wiki is a folder of Markdown pages that an AI keeps up to date from your sources, so answers build on earlier work instead of starting over.",
      "It has three layers (sources, wiki, schema) and three jobs (ingest, query, lint).",
      "Most people start from a ready-made project. You can also build one with Claude Code and an empty folder.",
    ],
    sections: [
      {
        heading: "What Karpathy's LLM Wiki is",
        body: [
          "In April 2026 Andrej Karpathy published a GitHub gist called LLM Wiki. The pattern is to ingest sources into linked Markdown pages, so later questions can start from a maintained synthesis instead of searching the whole collection from scratch. When a source changes, it still needs to be read again and affected pages checked; answers may also need to return to cited sources.",
          "This article cites Karpathy's public note as the source of the pattern; it does not imply that Karpathy endorses Wenlan.",
        ],
        figure: "llm-wiki-architecture",
        link: {
          label: "See a complete example without installing anything",
          href: "#worked-example",
        },
      },
      {
        heading: "The three jobs: ingest, query, lint",
        body: [
          "Every change to the wiki is one of three jobs. Keeping them separate stops a question from quietly rewriting pages.",
        ],
        bullets: [
          "Ingest: read a new source, write its summary page, update the pages it affects, then update index.md and log.md.",
          "Query: read index.md, open only the pages needed, and answer with links. A good answer can be saved as a page.",
          "Lint: look for contradictions, claims a newer source replaced, pages nothing links to, and topics with no page yet.",
        ],
      },
      {
        heading: "LLM wiki vs RAG",
        body: [
          "RAG retrieves relevant source chunks for each query; the source collection and its index remain available, and the same material may be retrieved again for another question. An LLM wiki keeps a maintained synthesis in pages that you can open and check, so a later query can start there. New or changed sources still need ingestion, and important claims may need checking against their citations. A large wiki can use search to find the right pages.",
        ],
        figure: "llm-wiki-vs-rag",
      },
      {
        id: "llm-wiki-implementations",
        heading: "LLM wiki implementations you can use",
        body: [
          "Most people start from an existing project. GitHub lists more than 6,400 repositories with \"llm-wiki\" in the name or description, most created since April 2026. The two most-starred, nashsu/llm_wiki and claude-obsidian, each have more than 15,000 stars (October 2026).",
        ],
        table: {
          columns: ["Project", "What it is", "Good fit if you"],
          rows: [
            ["Karpathy's gist", "The original note: a description, not software", "want to write your own setup (below)"],
            ["nashsu/llm_wiki", "Cross-platform desktop app", "want a standalone app for your documents"],
            ["AgriciDaniel/claude-obsidian", "Claude Code + Obsidian setup", "already keep your notes in Obsidian"],
            ["Astro-Han/karpathy-llm-wiki", "Agent Skills package for Claude Code, Cursor, and Codex", "want the pattern as an agent skill"],
            ["Wenlan", "Desktop app with an MCP server", "use several AI tools and want pages kept current without losing your edits"],
          ],
        },
      },
      {
        id: "build-an-llm-wiki-with-claude-code",
        heading: "Build one with Claude Code in 15 minutes",
        body: [
          "You need Claude Code, or another agent that can edit files such as Codex or Cursor, and an empty folder. Create this layout and run git init, so you can see and undo every change. To read the pages, open the folder in Obsidian or any Markdown editor.",
        ],
        code: {
          label: "Folder layout",
          code: [
            "my-wiki/",
            "  CLAUDE.md        # the schema: rules the agent follows",
            "  raw/             # your sources; the agent never edits these",
            "  wiki/",
            "    index.md       # one line per page",
            "    log.md         # one line per ingest, query, or lint",
            "    sources/       # one summary page per source",
            "    topics/        # one page per topic, person, or idea",
          ].join("\n"),
        },
        link: {
          label: "Already have an Obsidian vault? Turn it into an LLM wiki",
          href: "/learn/migrate-obsidian-vault-to-llm-wiki",
        },
      },
      {
        heading: "The CLAUDE.md schema to copy",
        body: [
          "This file is the whole system: CLAUDE.md for Claude Code or AGENTS.md for Codex. The \"My notes\" rule keeps a refresh from replacing text you corrected by hand.",
          "Then type ingest raw/<file>, query <question>, or lint in Claude Code. Start with two or three sources on one topic, and check the git diff after each job.",
        ],
        code: {
          label: "CLAUDE.md",
          code: [
            "# LLM Wiki",
            "",
            "This folder is a wiki you maintain from my sources.",
            "",
            "## Layout",
            "- raw/: my sources. Read them. Never edit, move, or delete them.",
            "- wiki/sources/: one summary page per source, named after the source.",
            "- wiki/topics/: one page per topic, person, or idea.",
            "- wiki/index.md: every page, one line each: [[page]] - summary.",
            "- wiki/log.md: one line per job: ## [YYYY-MM-DD] ingest | <title>",
            "",
            "## Page rules",
            "- Start each page with a two- or three-sentence summary.",
            "- Every claim links to the source page it came from.",
            "- Link related pages with [[wiki links]].",
            "- If a new source contradicts a page, say so on the page and cite both.",
            "- Never rewrite text under a \"## My notes\" heading. I write that part.",
            "",
            "## Jobs",
            "- ingest <file>: summarize it, update affected topic pages,",
            "  update index.md, and log it.",
            "- query <question>: read index.md first, open only the pages you need,",
            "  and answer with links. Offer to save a useful answer as a page.",
            "- lint: list contradictions, outdated claims, orphan pages, and",
            "  missing pages. Fix only what I approve.",
          ].join("\n"),
        },
      },
      ...workedExampleSections("en"),
      {
        heading: "Where a do-it-yourself LLM wiki breaks",
        body: [
          "The setup above works for one person, one agent, and a few dozen sources. As it grows:",
        ],
        bullets: [
          "Sources change, pages don't. Nothing flags a stale page until the next lint.",
          "Hand edits get overwritten unless every agent follows the \"My notes\" rule every time.",
          "Each AI tool needs its own rules file, and the copies drift apart.",
          "index.md outgrows the context window after a few hundred pages.",
          "Decisions made in AI chats never reach raw/ unless you copy them by hand.",
        ],
      },
      {
        id: "the-five-minute-llm-wiki-protocol",
        heading: "The LLM-wiki workflow in Wenlan",
        body: [
          "Wenlan is an open-source app that runs this pattern for you. It turns your documents, notes, and AI chats into pages with links to their sources, and updates them as sources change without overwriting your edits. Claude Code, Codex, and other AI tools read the same pages.",
          "/capture saves a decision from the chat, /distill builds or refreshes a topic page, /pages opens it, and /brief and /recall load only what the next session needs.",
        ],
        code: {
          label: "Wenlan workflow — requires an installed, connected client",
          code: [
            "/brief <topic>",
            "/recall <question>",
            "/capture <decision + why>",
            "/handoff",
            "/distill <topic>",
            "/pages <topic>",
          ].join("\n"),
        },
        link: {
          label: "Use the complete daily workflow",
          href: "/docs/daily-workflow",
        },
      },
    ],
    comparisonTable: {
      competitorName: "DIY folder + CLAUDE.md",
      rows: [
        {
          dimension: "Setup",
          wenlan: "Install the app and connect your AI tool",
          competitor: "A folder, a schema file, and git",
        },
        {
          dimension: "When a source changes",
          wenlan: "Pages update when you ask, or automatically in the background",
          competitor: "Found at the next lint, if you run one",
        },
        {
          dimension: "Your own edits",
          wenlan: "Kept; refreshes do not overwrite pages you edited",
          competitor: "Kept only if the agent follows the schema rule",
        },
        {
          dimension: "Several AI tools",
          wenlan: "One wiki shared by Claude Code, Codex, and other clients",
          competitor: "One rules file per tool",
        },
        {
          dimension: "AI chats as sources",
          wenlan: "Decisions can be captured from the chat",
          competitor: "Copied into raw/ by hand",
        },
      ],
    },
    faqs: [
      {
        question: "What is the Karpathy LLM Wiki idea?",
        answer:
          "Andrej Karpathy described a personal wiki that an AI writes and maintains from your sources: it ingests sources into linked Markdown pages, which can help answer later questions. Changed sources still need to be read again and affected pages checked. Citing his note does not imply an endorsement of Wenlan.",
      },
      {
        question: "What is an LLM wiki?",
        answer:
          "An LLM wiki is a folder of Markdown pages that an AI keeps current from your sources, with an index so the AI can find the right page and links back to the sources behind each claim.",
      },
      {
        question: "Is an LLM wiki the same as RAG?",
        answer:
          "They are different approaches. RAG retrieves relevant source chunks for each query, and the same material may be retrieved again. An LLM wiki keeps a maintained synthesis in pages that you can open and check; changed sources still need ingestion, and important claims may need checking against their citations. A large wiki can also use search to find pages.",
      },
      {
        question: "How do I build an LLM wiki with Claude Code?",
        answer:
          "Create a folder with raw/ for sources and wiki/ for pages, add a CLAUDE.md that describes the layout, page rules, and the ingest, query, and lint jobs, then run git init. Start Claude Code in the folder and ingest two or three sources.",
      },
      {
        question: "Do I need Obsidian for an LLM wiki?",
        answer:
          "No. The wiki is plain Markdown, so any editor works. Obsidian is useful for reading it: wiki links become clickable and graph view shows how pages connect.",
      },
      {
        question: "Where is Karpathy's LLM Wiki on GitHub?",
        answer:
          "It is a GitHub gist by karpathy titled LLM Wiki, linked in the references below. It is a description of the pattern rather than a repository you install; projects such as nashsu/llm_wiki and claude-obsidian package it as software.",
      },
      {
        question: "Does an LLM wiki replace code search or documentation?",
        answer:
          "No. An LLM wiki does not replace codebase search, current source code, test output, or a tool's own documentation; those stay the authority on what software does today. It pays off when the same topics come back across many sessions or tools.",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "verify-ai-knowledge-base-citations",
      "build-course-wiki-from-lecture-notes",
      "ai-work-memory-vs-knowledge-base",
      "wenlan-vs-obsidian-ai-memory",
      "ai-work-memory",
      "local-first-ai-memory",
      "migrate-obsidian-vault-to-llm-wiki",
      "setup-agent-knowledge-base-for-coding-agents",
    ],
    officialReferences: [
      {
        label: "Karpathy's LLM-wiki note",
        href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
      },
      {
        label: "nashsu/llm_wiki desktop app",
        href: "https://github.com/nashsu/llm_wiki",
      },
      {
        label: "Astro-Han/karpathy-llm-wiki Agent Skills",
        href: "https://github.com/Astro-Han/karpathy-llm-wiki",
      },
      {
        label: "AgriciDaniel/claude-obsidian",
        href: "https://github.com/AgriciDaniel/claude-obsidian",
      },
      {
        label: "Wenlan Source, Memory, and Page model",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan daily workflow",
        href: "https://github.com/7xuanlu/wenlan#daily-workflow",
      },
    ],
    cta: {
      heading: "Let the wiki keep itself current",
      body: "Wenlan turns your documents, notes, and AI chats into pages with links to their sources, and updates them as sources change without overwriting your edits.",
    },
  },
  {
    slug: "ai-work-memory-vs-knowledge-base",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "AI Work Memory vs Knowledge Base: What’s the Difference?",
    description:
      "A knowledge base maintains what is currently known. AI work memory preserves the decisions, lessons, corrections, and handoffs that agents need while working.",
    metaTitle: "AI Work Memory vs Knowledge Base: The Difference",
    metaDescription:
      "Compare AI work memory and AI knowledge bases: what each stores, when agents use it, and why durable AI work needs both atomic memory and maintained pages.",
    keywords: [
      "AI work memory vs knowledge base",
      "AI knowledge base",
      "AI work context",
      "agent memory workflow",
      "AI memory system",
    ],
    publishedAt: "2026-05-27",
    updatedAt: "2026-07-24",
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    audience: "People designing durable context for AI agents and knowledge work",
    heroBullets: [
      "A knowledge base maintains current explanations, reference material, and source-backed pages.",
      "AI work memory preserves atomic decisions, lessons, corrections, preferences, and handoffs from real work.",
      "Agents often need both: memory carries the work forward, while pages compile the current answer.",
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "AI work memory and an AI knowledge base solve different parts of the same problem. Memory preserves what happened during work: a decision, lesson, correction, preference, or handoff. A knowledge base turns current evidence into maintained explanations that people and agents can reuse.",
          "Choose memory when agents keep starting cold. Choose a knowledge base when the current answer is scattered across notes and documents. For durable AI work, the useful design is usually both with a clear boundary between them.",
        ],
      },
      {
        heading: "What each layer should own",
        body: [
          "A source should preserve material you can inspect: a document, imported conversation, or registered file. A memory should preserve one complete thing learned from work. A page should compile the current understanding from relevant sources and memories.",
          "Keeping those roles distinct prevents two common failures: treating every chat transcript as knowledge, or rewriting a polished page every time one small fact changes.",
        ],
        link: {
          label: "See Wenlan's source-backed page model",
          href: "/docs/source-backed-pages",
        },
      },
      {
        heading: "When a knowledge base is enough",
        body: [
          "Use a conventional knowledge base when the main job is authoring durable documents, organizing reference material, and browsing a corpus. Product docs, research notes, meeting records, policies, and stable project explanations fit this shape.",
          "It can still be AI-enabled. Search, chat, and MCP access do not by themselves turn a document collection into work memory. The deciding question is whether the system captures what agents learn between sessions and can return it during later work.",
        ],
      },
      {
        heading: "When AI work memory is the missing layer",
        body: [
          "Use AI work memory when the recurring failure is session loss. An agent fixed a bug yesterday, learned a project constraint in another tool, or received a correction last week, but the next session starts without that context.",
          "The useful unit is often smaller than a document: one decision and why it was made, one gotcha, one preference, or one explicit replacement for a stale fact. Those memories need provenance and retrieval cues so an agent can use them without loading the full history.",
        ],
        link: {
          label: "See the AI work memory model",
          href: "/learn/ai-work-memory",
        },
      },
      {
        heading: "How memory becomes a maintained answer",
        body: [
          "A practical loop starts by recalling relevant knowledge, captures new decisions or lessons while work is happening, and closes with a handoff. Repeated or related material can then be distilled into a maintained page.",
          "That page is not a raw memory dump. It should state the current answer, cite its support, and be refreshable when a source changes or a later memory supersedes an earlier conclusion.",
        ],
        bullets: [
          "Recall the smallest relevant context at the start of work.",
          "Capture one durable decision, lesson, correction, preference, or fact at a time.",
          "Write a handoff that records what changed and what remains open.",
          "Distill related sources and memories into a page that can be reviewed and refreshed.",
        ],
        link: {
          label: "See the complete LLM-wiki workflow",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "How Wenlan combines the two",
        body: [
          "Wenlan uses one knowledge system with three roles: traceable sources, atomic memories from AI work, and maintained source-backed pages. Memories preserve how knowledge changed; pages compile what is currently supported.",
          "Retrieval uses a local index for exact terms, semantic similarity, and graph context. Durable synthesis remains readable Markdown under ~/.wenlan, with citations, revisions, and local git history available for inspection.",
          "This does not mean every team needs another note editor. Wenlan can read existing document sources and coexist with Obsidian. Its job is to keep the agent work loop and the maintained knowledge layer connected without hiding either one.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Knowledge base",
      rows: [
        {
          dimension: "Unit of knowledge",
          wenlan: "Atomic memory: one decision, lesson, correction, preference, fact, or handoff.",
          competitor: "Document, note, page, record, or collection.",
        },
        {
          dimension: "Primary trigger",
          wenlan: "An agent learns something during work or needs context in a later session.",
          competitor: "A person or process authors, imports, or updates reference material.",
        },
        {
          dimension: "Main job",
          wenlan: "Carry useful context across sessions, tools, projects, and time.",
          competitor: "Maintain and browse the current body of knowledge.",
        },
        {
          dimension: "Change history",
          wenlan: "Provenance, corrections, and explicit supersession preserve how a conclusion changed.",
          competitor: "Document revisions preserve how the maintained answer changed.",
        },
        {
          dimension: "Best combined pattern",
          wenlan: "Feed durable work lessons into source-backed pages.",
          competitor: "Give agents a maintained answer backed by inspectable sources and memories.",
        },
      ],
    },
    faqs: [
      {
        question: "Is Wenlan a knowledge base?",
        answer:
          "Yes, but not only a document store. Wenlan combines traceable sources, atomic AI work memories, and maintained source-backed pages. The memory layer captures what work teaches; the page layer compiles the current answer.",
      },
      {
        question: "Does AI work memory replace a knowledge base?",
        answer:
          "No. Memory is good at preserving decisions, lessons, corrections, and handoffs. A knowledge base is good at maintaining explanations and reference material. The two layers work better when each has a clear role.",
      },
      {
        question: "Can Wenlan work with Obsidian or an existing knowledge base?",
        answer:
          "Yes. Wenlan can read document sources, index an Obsidian vault, and project maintained pages as Markdown under ~/.wenlan. You can keep your existing knowledge base while using Wenlan for cross-session agent memory and source-backed synthesis.",
      },
    ],
    relatedSlugs: ["ai-work-memory", "distilled-wiki-pages-ai-memory", "wenlan-vs-obsidian-ai-memory", "wenlan-vs-notion-ai", "wenlan-vs-chatgpt-memory"],
    officialReferences: [
      {
        label: "Wenlan source, memory, and page model",
        href: "https://github.com/7xuanlu/wenlan#what-is-this",
      },
      {
        label: "Wenlan daily workflow",
        href: "https://github.com/7xuanlu/wenlan#daily-workflow",
      },
      {
        label: "Karpathy's LLM Wiki foundation",
        href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
      },
    ],
    cta: {
      heading: "Connect memory to maintained knowledge",
      body: "Wenlan carries decisions and lessons across agent sessions, then turns supported context into source-backed pages you can inspect.",
    },
  },
  {
    slug: "wenlan-vs-basic-memory",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs Basic Memory: Source-Backed AI Work vs Shared Markdown Knowledge",
    description:
      "Compare Wenlan and Basic Memory across Markdown, MCP, local-first control, workflow fit, and how each product helps AI tools use durable context.",
    metaTitle: "Wenlan vs Basic Memory | AI Memory Comparison",
    metaDescription:
      "Compare Wenlan and Basic Memory for local AI work memory, Markdown knowledge bases, MCP workflows, human control, and long-running AI sessions.",
    keywords: [
      "Wenlan vs Basic Memory",
      "Basic Memory alternative",
      "AI memory markdown",
      "MCP memory knowledge base",
      "local AI work memory",
    ],
    publishedAt: "2026-05-14",
    updatedAt: "2026-07-25",
    author: DEFAULT_AUTHOR,
    readingTime: "8 min read",
    audience: "People choosing a memory layer for AI-assisted work",
    heroBullets: [
      "Basic Memory v0.22.1 is a human-readable Markdown knowledge base with local or hosted deployment paths, one knowledge base across MCP clients, and optional Team workspaces.",
      "Wenlan v0.14.1 is a local-first Sources, Memories, and Pages system built around capture, handoff, curation, source-backed Pages, and reviewable distillation.",
      "Choose between a shared Markdown knowledge base and a source-backed AI-work workflow—not between “memory” and “no memory.”",
      "This page pins Basic Memory's source, release, and documentation on 2026-07-25 and reflects Wenlan v0.14.1 as of 2026-07-20. If either product changes, the source links below make the comparison auditable.",
    ],
    officialReferences: [
      {
        label: "Basic Memory v0.22.1 release",
        href: "https://github.com/basicmachines-co/basic-memory/releases/tag/v0.22.1",
      },
      {
        label: "Basic Memory source snapshot",
        href: "https://github.com/basicmachines-co/basic-memory/tree/5d444f0974476645f904c1446998c0a938a6e7f7",
      },
      {
        label: "Basic Memory documentation snapshot",
        href: "https://github.com/basicmachines-co/docs.basicmemory.com/tree/1c670035987b21f0a93d4e45ea1eed1487775f74",
      },
      {
        label: "What is Basic Memory?",
        href: "https://docs.basicmemory.com/start-here/what-is-basic-memory",
      },
      {
        label: "Basic Memory technical information",
        href: "https://docs.basicmemory.com/reference/technical-information",
      },
      {
        label: "Basic Memory Cloud guide",
        href: "https://docs.basicmemory.com/cloud/cloud-guide",
      },
      {
        label: "Basic Memory Teams",
        href: "https://docs.basicmemory.com/teams/about",
      },
      {
        label: "Basic Memory AI assistant guide",
        href: "https://docs.basicmemory.com/reference/ai-assistant-guide",
      },
      {
        label: "Wenlan v0.14.1 source and documentation",
        href: "https://github.com/7xuanlu/wenlan/tree/v0.14.1",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "Choose Basic Memory if you want people and AI assistants to work in the same Markdown knowledge base. You can keep it local, add Basic Memory Cloud for hosted access and sync, or use Team workspaces for shared knowledge.",
          "Choose Wenlan if the harder problem is turning AI work into maintained knowledge: capture decisions across sessions, hand work off between agents, and distill supported context into source-backed Pages that remain reviewable.",
          "Both expose context through MCP, keep important material human-readable, and support semantic search. The meaningful difference is the operating model around that context.",
        ],
      },
      {
        heading: "Basic Memory today: local, Cloud, and Teams",
        body: [
          "Basic Memory's open-source path stores human-readable Markdown files and builds a secondary index for search and graph operations. Its MCP server lets supported AI clients read and write that knowledge base, while the files remain usable in editors such as Obsidian or VS Code.",
          "Basic Memory Cloud is the hosted path. It adds remote MCP access, a web editor, optional local sync, snapshots, and file history. Team workspaces add shared projects, membership, collaborative editing, activity, and per-file history.",
          "Current Basic Memory also provides semantic search, graph traversal, `build_context`, and Agent Skills that teach assistants to search before answering, capture durable knowledge, link related notes, and maintain the knowledge base. It is no longer accurate to describe the product as only a local vault or as having no work-loop guidance.",
        ],
      },
      {
        heading: "Wenlan today: Sources, Memories, and Pages",
        body: [
          "Wenlan starts from the work an AI agent is doing. Agents explicitly capture decisions, lessons, and corrections as Memories; `/handoff` preserves the state of an unfinished session; `/distill` turns repeated, supported context into Pages; `/curate` and `/lint` make review and repair visible.",
          "Sources are the evidence layer. Memories retain durable working context. Pages synthesize that context into readable knowledge with source IDs, citations, and revision history. The distinction is deliberate: recalled fragments and maintained wiki pages do not silently become the same thing.",
          "The local daemon provides retrieval across MCP clients. Readable Pages, sessions, and status artifacts are projected under `~/.wenlan/` with local git history, while capture and retrieval remain backed by the daemon-owned store.",
        ],
      },
      {
        heading: "The decision in one workflow",
        body: [
          "Imagine that three coding agents investigate the same authentication problem over a week. With Basic Memory, the durable object is the shared knowledge base: agents search existing notes, add observations, link related entities, and update a Markdown document that the team can also edit.",
          "With Wenlan, the durable path is evidence to maintained knowledge: each agent captures the decisions or gotchas it learned, hands off unfinished state, and later distills supported memories into a Page whose source chain can be inspected and revised.",
          "Basic Memory is the more direct fit when the shared note is the product. Wenlan is the more direct fit when you need to see how session evidence became a maintained answer.",
        ],
      },
      {
        heading: "Storage, sync, and history are separate choices",
        body: [
          "For local Basic Memory, Markdown files are the primary human-readable record and a database acts as a derived search index. File history depends on the local tools you choose. Basic Memory Cloud adds managed sync, snapshots, and hosted per-file history; Teams extends that hosted model to collaborators.",
          "Wenlan keeps raw captures in its local daemon store for recall and projects readable Pages, sessions, and status Markdown under `~/.wenlan/`. Those projected artifacts are versioned locally in `~/.wenlan/.git/`, so Page revisions can be inspected without turning the projection into the retrieval database.",
          "Neither shape is automatically better. Basic Memory favors a file-first knowledge base that can gain hosted collaboration. Wenlan favors a local retrieval store plus human-readable, source-linked outputs.",
        ],
        bullets: [
          "Basic Memory local: Markdown files plus a derived search index.",
          "Basic Memory Cloud and Teams: hosted MCP, sync, snapshots, file history, and collaboration.",
          "Wenlan: local retrieval store plus Markdown projections with source links and local git history.",
        ],
      },
      {
        heading: "Search and maintenance",
        body: [
          "Basic Memory combines text and semantic search with graph traversal over observations and relations. Its `build_context` tool assembles connected knowledge, and its Agent Skills give assistants an explicit search, capture, and maintenance routine.",
          "Wenlan combines full-text and embedding retrieval, weighted fusion, eligible graph context, and optional reranking. Its plugin workflow separates `/recall`, `/capture`, `/handoff`, `/distill`, `/curate`, and `/lint`, so retrieval, capture, synthesis, review, and repair remain distinct actions.",
          "The products publish different retrieval evidence, so this page does not turn unmatched benchmarks into a winner. Test each system with the same real task: recover an old decision, update it after a correction, and inspect why the final answer should be trusted.",
        ],
      },
      {
        heading: "The provenance boundary",
        body: [
          "Basic Memory makes notes and their relationships inspectable. A team can read the Markdown, follow links, inspect Cloud history, and decide what belongs in its shared knowledge base.",
          "Wenlan adds a stricter boundary between working memory and a distilled Page. A Page record carries source memory IDs, citations, provenance state, and revisions, and the daemon rejects a Page with no source. That is useful when the question is not only “what does the note say?” but “which captured evidence supports this maintained claim?”",
          "Basic Memory can still hold source citations, and Wenlan Pages remain editable and reviewable. The difference is which provenance behavior the system requires rather than what a careful author could add manually.",
        ],
      },
      {
        heading: "When Basic Memory is the better call",
        body: [
          "Choose Basic Memory when you already think in Markdown notes, want AI assistants to share that knowledge base, or need a hosted web and Team path without building your own sync layer.",
          "It is also the clearer fit when people and agents should directly co-edit the same durable notes and the knowledge base—not session provenance—is the primary unit of work.",
        ],
      },
      {
        heading: "When Wenlan is the better call",
        body: [
          "Choose Wenlan when context is scattered across AI sessions and tools, and you want explicit capture and handoff before that context is promoted into maintained knowledge.",
          "It is the clearer fit when source-backed distillation, reviewable revisions, local operation, and a visible repair loop matter more than hosted team collaboration.",
        ],
      },
      {
        heading: "Migration shape, if you decide to switch",
        body: [
          "Moving from Basic Memory to Wenlan is selective today. Choose the durable notes that should become Sources or Memories, capture them through the CLI or MCP workflow, and distill only the claims whose source chain you want Wenlan to maintain. Wenlan does not currently advertise a one-command Basic Memory vault importer.",
          "Moving Wenlan's readable output into another knowledge base is straightforward at the file level: Pages and sessions under `~/.wenlan/` are Markdown. That preserves readable content, but not Wenlan's live recall, provenance state, curation, or distillation behavior.",
          "Using both is technically possible because each exposes an MCP server. If you do, assign ownership clearly—for example, Basic Memory for shared team notes and Wenlan for source-backed personal AI-work history—so agents do not create conflicting copies.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Basic Memory",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "Source-backed AI-work loop: capture, recall, handoff, distill, curate, and lint across MCP clients.",
          competitor:
            "Human-readable Markdown knowledge base that people and AI assistants read, edit, link, and maintain.",
        },
        {
          dimension: "Deployment",
          wenlan: "Local-first daemon, CLI, MCP server, plugins, and readable local artifacts.",
          competitor:
            "Open-source local server or hosted Basic Memory Cloud with remote MCP and optional local sync.",
        },
        {
          dimension: "Collaboration",
          wenlan: "Personal local knowledge workflow in v0.14.1; no hosted team workspace is claimed.",
          competitor:
            "Team workspaces with membership, collaborative editing, activity, snapshots, and file history.",
        },
        {
          dimension: "Storage",
          wenlan: "Local daemon-owned retrieval store plus Markdown projections in ~/.wenlan/; readable artifacts are tracked in local git.",
          competitor:
            "File-first Markdown with a derived local index; Cloud adds hosted storage, sync, snapshots, and history.",
        },
        {
          dimension: "Retrieval",
          wenlan: "Full-text and embedding retrieval, weighted fusion, eligible graph context, and optional reranking.",
          competitor:
            "Text and semantic search, graph traversal, and build_context over notes, observations, and relations.",
        },
        {
          dimension: "Maintenance workflow",
          wenlan: "Separate capture, handoff, distill, curate, and lint actions keep working memory, synthesis, review, and repair visible.",
          competitor:
            "Agent Skills teach search-before-answer, capture, linking, and knowledge-base maintenance.",
        },
        {
          dimension: "Provenance and history",
          wenlan: "Distilled Pages require source memory IDs and retain citations, provenance state, revisions, and local git history for readable artifacts.",
          competitor:
            "Readable notes and links; local history uses the user's tools, while Cloud provides snapshots and per-file history.",
        },
        {
          dimension: "License",
          wenlan: "Apache-2.0 daemon, CLI, MCP server.",
          competitor:
            "AGPL-3.0 open-source server and client; Cloud and Teams are hosted product paths.",
        },
      ],
    },
    faqs: [
      {
        question: "Is Basic Memory a competitor to Wenlan?",
        answer:
          "They overlap around MCP, AI-readable memory, Markdown, search, and durable context. Basic Memory centers a knowledge base that people and agents maintain together. Wenlan centers a source-backed workflow from session memory to reviewable Pages.",
      },
      {
        question: "Can someone use both?",
        answer:
          "Yes. Each can register as a separate MCP server. Define ownership first—for example, Basic Memory for shared team notes and Wenlan for source-backed personal AI-work history—so an agent does not maintain conflicting copies.",
      },
      {
        question: "Is Basic Memory local or hosted?",
        answer:
          "Both paths exist. The open-source server works with local Markdown files and a derived index. Basic Memory Cloud adds hosted MCP access, web editing, optional local sync, snapshots, and history. Team workspaces add shared collaboration.",
      },
      {
        question: "What is the main provenance difference?",
        answer:
          "Basic Memory makes the note, its links, and—on Cloud—its file history inspectable. Wenlan additionally requires a distilled Page record to name source memory IDs, retaining citations, provenance state, and revisions between captured evidence and the maintained Page.",
      },
      {
        question: "How fresh is this comparison?",
        answer:
          "The Basic Memory side is pinned to v0.22.1, source commit 5d444f0, and documentation commit 1c67003, checked on 2026-07-25. The Wenlan side is pinned to v0.14.1, released on 2026-07-20. The maintained source links above are the authority if either product changes.",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-claude-mem",
      "wenlan-vs-superlocal-memory",
      "local-first-ai-memory",
      "ai-work-memory",
      "mcp-memory-server",
    ],
    cta: {
      heading: "Try the AI work memory loop",
      body: "Wenlan is built for sessions, handoffs, provenance, and local retrieval across MCP-compatible AI tools.",
    },
  },
  {
    slug: "wenlan-vs-claude-mem",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs claude-mem: Which AI Memory Tool Should You Use?",
    description:
      "claude-mem automatically captures and compresses your agent sessions; Wenlan keeps explicit, source-backed memory you review and maintain as readable pages. Compare capture, retrieval, cross-agent support, and control.",
    metaTitle: "Wenlan vs claude-mem: Which AI Memory Should You Use?",
    metaDescription:
      "Pick claude-mem for automatic session capture and compression; pick Wenlan for explicit, source-backed memory you can review, correct, and keep as pages.",
    keywords: [
      "Wenlan vs claude-mem",
      "claude-mem vs Wenlan",
      "claude-mem alternative",
      "automatic AI memory",
      "Claude Code memory",
      "AI agent memory",
    ],
    updatedAt: "2026-07-24",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "AI coding-agent users choosing an automatic or explicit memory workflow",
    heroBullets: [
      "claude-mem automatically captures agent sessions, compresses observations, and injects relevant history later.",
      "Wenlan defaults to explicit source-backed capture, handoffs, review, and maintained wiki pages.",
      "Both support Claude Code, Codex, and cross-agent retrieval; the real difference is how knowledge enters and stays inspectable.",
      "This page checks claude-mem v13.12.4 and commit 132b4634 against Wenlan v0.14.1 and commit 93451bf0.",
    ],
    officialReferences: [
      {
        label: "claude-mem official website",
        href: "https://claude-mem.ai/",
      },
      {
        label: "claude-mem v13.12.4 release",
        href: "https://github.com/thedotmack/claude-mem/releases/tag/v13.12.4",
      },
      {
        label: "claude-mem architecture at the reviewed commit",
        href: "https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/docs/public/architecture/overview.mdx",
      },
      {
        label: "claude-mem installation guide at the reviewed commit",
        href: "https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/docs/public/installation.mdx",
      },
      {
        label: "claude-mem search workflow at the reviewed commit",
        href: "https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/docs/public/usage/search-tools.mdx",
      },
      {
        label: "claude-mem Codex hooks at the reviewed commit",
        href: "https://github.com/thedotmack/claude-mem/blob/132b46343e60ecf4057c427736c57b08f7615dfe/plugin/hooks/codex-hooks.json",
      },
      {
        label: "Wenlan workflow at the reviewed commit",
        href: "https://github.com/7xuanlu/wenlan/blob/93451bf0ef58399e08400e3b4ac613942adcfec8/README.md",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "Choose claude-mem when you want memory to happen by itself: hooks observe your agent sessions, compress them into searchable history, and inject the relevant parts back later with little effort from you.",
          "Choose Wenlan when you want durable facts, decisions, handoffs, and pages to be explicit, source-backed, reviewable, and readable outside the agent that captured them.",
          "Do not choose between them on the old assumption that only Wenlan works across agents. Current claude-mem source includes Codex hooks and other integrations; current Wenlan uses one local daemon plus MCP and native plugin paths. The useful decision is automatic session history versus deliberately maintained work knowledge.",
        ],
      },
      {
        heading: "What current claude-mem emphasizes",
        body: [
          "claude-mem v13.12.4 is an automatic memory-compression system. Hooks capture prompts and tool activity, a local worker processes observations, and later sessions receive compact context or fetch more through search, timeline, and observation-detail steps.",
          "The maintained source uses SQLite with FTS5, optional Chroma semantic search, a worker UI, citations by observation ID, and progressive disclosure so an agent can inspect an index before loading full history.",
          "Its roots remain in Claude Code, but its current repository also includes Codex hooks, adapters, and integrations for other agents. It is no longer accurate to describe claude-mem as a single-tool store.",
        ],
      },
      {
        heading: "What Wenlan emphasizes",
        body: [
          "Wenlan treats memory as maintained work knowledge. `/capture` records one durable fact, decision, correction, preference, or lesson with provenance; `/handoff` records what changed and what comes next; `/distill` deliberately creates or refreshes source-backed pages.",
          "Recall and storage run through one local daemon. Claude Code and Codex have plugin paths, while Cursor, Claude Desktop, Gemini CLI, VS Code, and other clients can reach the same knowledge through MCP.",
          "The default workflow is explicit, but not frozen in manual mode: optional model-backed passes can enrich captures, connect entities, and propose page revisions. `/brief`, `/curate`, and read-only `/lint` keep those proposals and knowledge-health findings inspectable.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "Start with the capture contract, not the client list. If missing a useful event is the main risk, automatic observation is attractive. If preserving only deliberate, attributable knowledge is the main risk, explicit capture and review are easier to audit.",
          "Then inspect the artifact you want to own. claude-mem centers a searchable session timeline and compressed observations. Wenlan centers atomic memories plus maintained Markdown pages, citations, revisions, and local git history.",
        ],
        bullets: [
          "Choose claude-mem for automatic session observation and low capture-time friction.",
          "Choose Wenlan for explicit durable knowledge, human review, and maintained pages.",
          "Test both with your real correction, retrieval, and handoff workflow before migrating history.",
        ],
      },
      {
        heading: "Automatic capture changes where the work happens",
        body: [
          "Automatic capture moves effort away from the moment of work. claude-mem records activity and uses an AI processor to compress it, so users do not have to label every useful event in real time.",
          "The later responsibility is retrieval and trust: decide which extracted observation is current, which is merely historical, and how much detail to load. claude-mem exposes observation IDs, citations, search filters, timeline context, and privacy tags to support that review.",
          "Wenlan front-loads more intent. A user or agent chooses what deserves `/capture`, records a focused `/handoff`, and uses `/distill` only when repeated evidence deserves a maintained page. Proposed revisions and conflicts can then be accepted or dismissed rather than silently replacing the source-backed layer.",
        ],
      },
      {
        heading: "What happens at session end",
        body: [
          "claude-mem's hooks generate observations and session summaries automatically. Future sessions receive a compact index and can progressively fetch a timeline or full observation details.",
          "Wenlan's `/handoff` asks for a concise record of what changed, what is blocked, and what comes next. The next session can combine that status with relevant atomic memories and maintained pages.",
          "Both reduce repeated setup. claude-mem preserves a compressed history of what the agent observed; Wenlan preserves the durable knowledge and handoff state that a user or agent chose to keep.",
        ],
        bullets: [
          "claude-mem: hook-driven observations, summaries, and progressive history retrieval.",
          "Wenlan: explicit `/capture`, `/handoff`, deliberate `/distill`, and optional reviewed enrichment.",
          "Both keep local stores and expose identifiers that let a reader trace retrieved context.",
        ],
      },
      {
        heading: "Cross-agent support is no longer the dividing line",
        body: [
          "Current claude-mem source includes Codex hooks and adapters. Its pinned installation guide lists Claude Code, Cursor, Windsurf, OpenCode, Codex CLI, Antigravity CLI, and OpenClaw as supported IDEs. The exact capture depth depends on each integration, so inspect the maintained setup path for the client you use.",
          "Wenlan exposes one local source of truth through Claude Code and Codex plugins plus MCP connectors for other clients. Its cross-client promise is shared access to the same atomic memories and pages, not automatic observation of every client by default.",
          "For a mixed-agent workflow, compare what each client can write, what it can only read, and how failures degrade. A logo list is not enough.",
        ],
      },
      {
        heading: "When claude-mem is the better call",
        body: [
          "Choose claude-mem when automatic observation is the feature, not a compromise: you want session history captured with little interruption, summarized by an AI processor, browsable in a viewer, and retrieved in layers.",
          "Choose Wenlan when the durable unit should be an explicit fact, decision, correction, handoff, or maintained page with review and provenance. It is also the clearer fit when readable Markdown and local git history are part of the ownership contract.",
          "Both projects use Apache-2.0 for the compared open-source core. Wenlan's optional desktop app is maintained separately under AGPL-3.0. Licensing therefore is not the useful differentiator; capture and artifact models are.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "claude-mem",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "Explicit, source-backed work knowledge: atomic memories, handoffs, reviewed revisions, and maintained pages.",
          competitor:
            "Automatic session observation, AI compression, searchable history, and progressive context injection.",
        },
        {
          dimension: "Capture mode",
          wenlan: "Explicit /capture and /handoff, deliberate /distill, plus optional model-backed enrichment and revision proposals.",
          competitor:
            "Agent hooks capture prompts and tool activity; a local worker processes observations and summaries automatically.",
        },
        {
          dimension: "Retrieval flow",
          wenlan: "Recall over atomic memories and pages, with source IDs, graph context, and direct human-readable artifacts.",
          competitor:
            "SQLite/FTS5 plus optional Chroma; progressive disclosure through search, timeline, and full observation details.",
        },
        {
          dimension: "Cross-tool reach",
          wenlan: "Claude Code and Codex plugins plus MCP connectors share one local daemon and knowledge store.",
          competitor:
            "Claude Code roots plus maintained hooks or adapters for Codex and other agents; capture depth varies by integration.",
        },
        {
          dimension: "Provenance + versioning",
          wenlan: "Source IDs, citations, revisions, readable pages, and local git history for projected artifacts.",
          competitor:
            "Session-attributed observation IDs, citations, SQLite history, and a viewer; no per-write git history by default.",
        },
        {
          dimension: "License",
          wenlan: "Apache-2.0 runtime, CLI, MCP server, and plugin files.",
          competitor: "Apache-2.0 repository and current open-source core.",
        },
      ],
    },
    faqs: [
      {
        question: "Is Wenlan only for Claude Code?",
        answer:
          "No. Wenlan ships Claude Code and Codex plugins, local MCP setup for Cursor, Claude Desktop, Gemini CLI, and VS Code, and Streamable HTTP MCP Remote Access for ChatGPT and Claude.ai.",
      },
      {
        question: "Is claude-mem more automatic than Wenlan?",
        answer:
          "Yes, automatic session observation and compression are central to claude-mem. Wenlan defaults to explicit capture and handoff, with optional model-backed enrichment and page-refresh proposals that remain reviewable.",
      },
      {
        question: "Does claude-mem support Codex?",
        answer:
          "Yes. The reviewed claude-mem source includes Codex hooks and adapters. Check its maintained setup documentation for the current write and read behavior rather than assuming every integration captures the same lifecycle events.",
      },
      {
        question: "Can I migrate from claude-mem to Wenlan?",
        answer:
          "There is no maintained one-command importer. Export or retrieve the small set of durable items you still trust, then capture them into Wenlan with provenance and review the result. Do not bulk-copy an automatic history without deciding what remains current.",
      },
      {
        question: "Is automatic capture really lower-friction in the long run?",
        answer:
          "It is lower-friction at capture time. The later work is reviewing retrieval quality, stale observations, scope, and correction behavior. Explicit capture spends more attention up front. Test both costs on a real multi-session project.",
      },
      {
        question: "Does Wenlan watch my Claude Code session in the background?",
        answer:
          "Not by default. Wenlan stores what a user or agent explicitly captures, imports, or hands off. Optional model-backed passes can enrich that material and propose page work, but they do not silently turn every tool event into durable memory.",
      },
    ],
    relatedSlugs: [
      "claude-code-memory",
      "mcp-memory-server",
      "ai-agent-handoff-loop",
      "wenlan-vs-basic-memory",
      "wenlan-vs-superlocal-memory",
      "ai-work-memory",
    ],
    cta: {
      heading: "Carry Claude Code context beyond one session",
      body: "Wenlan helps Claude Code and other MCP clients use the same local work memory.",
    },
  },
  {
    slug: "wenlan-vs-superlocal-memory",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs SuperLocalMemory v3.8.3: Which Local AI Memory Fits Your Work?",
    description:
      "SuperLocalMemory is a local memory control plane for teams; Wenlan is a source-backed LLM wiki for deliberate knowledge work. Compare retrieval, team controls, audit, and artifacts.",
    metaTitle: "Wenlan vs SuperLocalMemory v3.8.3: Which Memory Fits?",
    metaDescription:
      "Choose SuperLocalMemory for a team memory control plane with roles and audit; choose Wenlan for explicit capture, handoffs, and a source-backed LLM wiki.",
    keywords: [
      "Wenlan vs SuperLocalMemory",
      "SuperLocalMemory vs Wenlan",
      "SuperLocalMemory alternative",
      "super local memory",
      "local AI agent memory",
      "local-first agent memory",
    ],
    publishedAt: "2026-05-27",
    updatedAt: "2026-07-24",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "Developers and teams comparing local-first memory systems for AI agents",
    heroBullets: [
      "SuperLocalMemory v3.8.3 is a broad local-first control plane for agent memory, temporal retrieval, team access, audit, cache, compression, and bounded loops.",
      "Wenlan v0.14.1 is a source-backed LLM wiki workflow for explicit capture, handoff, review, retrieval, and maintained readable pages.",
      "Choose by operating boundary: automated memory operations and team controls, or deliberate knowledge work with inspectable artifacts.",
      "The comparison is pinned to both projects' maintained sources on 2026-07-24; benchmark numbers retain their original protocol scopes.",
    ],
    officialReferences: [
      {
        label: "SuperLocalMemory v3.8.3 source",
        href: "https://github.com/qualixar/superlocalmemory/tree/v3.8.3",
      },
      {
        label: "SuperLocalMemory v3.8.3 README",
        href: "https://github.com/qualixar/superlocalmemory/blob/893e6d7d521cef6013d35f0ea468eca3005916de/README.md",
      },
      {
        label: "SuperLocalMemory v3.8.3 changelog",
        href: "https://github.com/qualixar/superlocalmemory/blob/893e6d7d521cef6013d35f0ea468eca3005916de/CHANGELOG.md",
      },
      {
        label: "SuperLocalMemory official website",
        href: "https://www.superlocalmemory.com/",
      },
      {
        label: "Wenlan v0.14.1 source",
        href: "https://github.com/7xuanlu/wenlan/tree/v0.14.1",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "Choose SuperLocalMemory when you want a local-first memory control plane for a team: automated ingestion, temporal and graph-aware retrieval, personal/team scopes, role-based access, and a hash-chained audit trail.",
          "Choose Wenlan when you want an LLM wiki for AI work: explicit capture, handoffs between sessions, reviewable memories, source-backed pages, local hybrid retrieval, and readable artifacts that can sit beside an Obsidian vault.",
          "Both are local-first and MCP-capable. The useful distinction is not whether either product has retrieval; it is whether you want a broad operational control plane or a deliberate, inspectable knowledge workflow.",
        ],
      },
      {
        heading: "What changed in SuperLocalMemory v3.8.3",
        body: [
          "The maintained v3.8.3 README now describes SuperLocalMemory as an enterprise-oriented, local-first agent memory control plane rather than only a retrieval and optimization layer. SQLite and sqlite-vec remain canonical; optional CozoDB and LanceDB projections stay behind parity checks.",
          "Its current retrieval path combines semantic, BM25 lexical, temporal retrieval, Hopfield associative, and spreading-activation candidates before fusion and optional reranking. The release also exposes provenance, memory inspection, personal, shared, and global scopes, multi-workspace isolation, role-based access, retention and erasure controls, a hash-chained audit trail, and a dashboard.",
          "The control plane also covers exact caching, opt-in compression, trusted-peer coordination, bounded loops, and nine framework adapters. Provider-backed enrichment, cloud modes, connectors, and networked adapters remain explicit operator choices rather than requirements of the local core.",
        ],
      },
      {
        heading: "What Wenlan emphasizes",
        body: [
          "Wenlan focuses on turning AI work into a maintained, source-backed LLM wiki. Agents explicitly capture durable facts, write handoffs, retrieve prior context, curate revisions, and distill selected memories into readable pages.",
          "Its local daemon combines FTS5, BGE embeddings, weighted reciprocal-rank fusion, eligible graph context, and optional reranking. The same memory is available across MCP clients, while projected Markdown pages, citations, revisions, session artifacts, and local git history keep the maintained knowledge layer inspectable.",
          "Wenlan is not trying to be a team access-control plane, an LLM proxy, or a framework runtime. Its narrower boundary is useful when the primary job is preserving why work changed and keeping the resulting knowledge readable by people.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "Start with the artifact you need at the end. If you need a governed operational memory service for several agents or people, test SuperLocalMemory's profiles, scopes, role gates, audit surfaces, cache, compression, and framework adapters.",
          "If you need a durable project record that an agent can retrieve and a person can open, review, cite, revise, and carry across tools, test Wenlan's capture, handoff, recall, curate, distill, and page workflows.",
          "A team can reasonably use both boundaries. The comparison matters when choosing which product should own the durable memory and which one, if any, should own optimization or operational controls.",
        ],
      },
      {
        heading: "Read the benchmark scopes before comparing scores",
        body: [
          "SuperLocalMemory's maintained README separates three LoCoMo results. Mode A Raw reports 60.4% across 10 conversations and 1,276 scored questions with local retrieval and zero-LLM answer construction. Mode A Retrieval reports 74.8% on the same question count, but uses GPT-4.1-mini answer synthesis after local retrieval. Mode C reports 87.7% on one conversation and 81 scored questions with cloud embeddings, answer generation, and judging.",
          "Wenlan publishes retrieval-only LongMemEval rows: LME_Oracle at 93.6% Recall@5 / 0.857 MRR / 0.883 NDCG@10 on 500 questions, and LME_S at 87.7% Recall@5 / 0.815 MRR / 0.822 NDCG@10 on a stratified 90-question deep-retrieval snapshot.",
          "Those percentages are not a head-to-head leaderboard. The datasets, sample sizes, answer-construction steps, models, and metrics differ. Use each result to inspect its own retrieval contract, then rerun both products on the same workload if benchmark performance determines the decision.",
        ],
      },
      {
        heading: "Run an inspectability and recovery test",
        body: [
          "Install both against disposable test data. Store a decision, its source, and a later correction. Ask a time-qualified question, inspect which evidence was retrieved, verify the correction, delete the original, restart the service, and repeat from a second MCP client.",
          "In SuperLocalMemory, inspect the operation receipt, provenance, scope, audit event, profile boundary, recall trace, and dashboard record. In Wenlan, inspect the recalled memory, source IDs, curated revision, distilled Markdown page, session handoff, and local git history.",
          "Then test the failure paths you actually care about: low-confidence recall, conflicting facts, unavailable enrichment, a busy daemon, a profile or Space boundary, and recovery after restart. This produces a decision you can audit instead of a feature-count vote.",
        ],
        bullets: [
          "Can you see the verbatim record, capture time, source, scope, and retrieval trace?",
          "Can you distinguish a stored assertion from a query-relative ranking score?",
          "Can you correct or delete one item and prove the old state no longer returns?",
          "Can another client retrieve the intended record without crossing the wrong workspace boundary?",
          "Can a person read the durable knowledge artifact without the original chat client?",
        ],
      },
      {
        heading: "A fair two-week evaluation",
        body: [
          "During week one, use real work rather than synthetic prompts. Record capture effort, recall usefulness, source traceability, false positives, and how often a person must repair the memory. Keep SuperLocalMemory's optional cloud modes and Wenlan's optional enrichment settings fixed and documented.",
          "During week two, test time, contradiction, deletion, restart, and cross-client behavior. If you need team governance, add two profiles and verify read, write, and delete boundaries. If you need a maintained knowledge base, require each system to produce or support a readable project summary with citations.",
          "I built Wenlan, so treat this page as a source-linked test plan rather than a neutral verdict. The pinned references above are there so you can check every moving product claim before choosing.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "SuperLocalMemory v3.8.3",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "Source-backed LLM wiki workflow: explicit capture, handoff, review, recall, distillation, and readable maintained pages.",
          competitor:
            "Local-first agent memory control plane: ingestion, retrieval, scopes, audit, operations, cache, compression, coordination, and adapters.",
        },
        {
          dimension: "Retrieval",
          wenlan: "FTS5 + local BGE embeddings + weighted RRF, with eligible graph context and optional reranking.",
          competitor:
            "Semantic, BM25, temporal, Hopfield, and spreading-activation candidates, followed by fusion, optional reranking, and graph score enhancement.",
        },
        {
          dimension: "Durable artifact",
          wenlan: "Local libSQL is retrieval authority; projected Markdown pages, citations, revisions, session artifacts, and git history stay readable.",
          competitor:
            "SQLite + sqlite-vec are canonical; the dashboard, CLI, MCP, traces, and audit surfaces expose and operate the control-plane records.",
        },
        {
          dimension: "Team boundaries",
          wenlan: "Spaces and read scopes separate memory contexts; the public product is centered on an individual local knowledge workflow.",
          competitor:
            "Profiles, personal/shared/global memory, role-based access, workspace isolation, and optional sign-in for shared deployments.",
        },
        {
          dimension: "Provenance + audit",
          wenlan: "Source IDs on distilled pages, review queues, revisions, corrections, and git history for projected readable artifacts.",
          competitor:
            "Operation receipts, provenance, recall traces, retention/erasure controls, and a hash-chained audit trail.",
        },
        {
          dimension: "Optimization + automation",
          wenlan: "Does not own the primary LLM request path; focuses on memory, handoffs, review, retrieval, and maintained pages.",
          competitor:
            "Exact cache, opt-in compression, proxy/MCP/skill surfaces, bounded loops, peer coordination, and framework adapters.",
        },
        {
          dimension: "License",
          wenlan: "Apache-2.0 for the daemon, CLI, MCP server, and plugin source.",
          competitor:
            "AGPL v3 family licensing in the maintained repository and package metadata; a separate commercial-license file is published.",
        },
      ],
    },
    faqs: [
      {
        question: "Do Wenlan and SuperLocalMemory solve the same problem?",
        answer:
          "They overlap around local-first agent memory, retrieval, MCP clients, provenance, and durable context. SuperLocalMemory v3.8.3 has the broader operational control-plane boundary; Wenlan has the narrower source-backed LLM wiki and work-memory boundary.",
      },
      {
        question: "Which is better for team access controls?",
        answer:
          "SuperLocalMemory v3.8.3 explicitly documents profiles, role-based access, personal/shared/global scopes, workspace isolation, optional sign-in, and governance controls. Wenlan uses Spaces and read scopes, but its public workflow is centered on source-backed local knowledge rather than a multi-user access-control plane.",
      },
      {
        question: "Can I compare the published benchmark percentages directly?",
        answer:
          "No. SuperLocalMemory publishes protocol-scoped LoCoMo answer results, while Wenlan publishes retrieval metrics on LongMemEval snapshots. The datasets, sample sizes, models, answer-construction steps, and metrics differ, so the numbers are not a head-to-head leaderboard.",
      },
      {
        question: "Is SuperLocalMemory open source?",
        answer:
          "Yes. The v3.8.3 repository and package publish AGPL v3 family licensing and also include a commercial-license file. Wenlan's daemon, CLI, MCP server, and plugin source are Apache-2.0.",
      },
      {
        question: "What versions does this comparison cover?",
        answer:
          "This page pins SuperLocalMemory v3.8.3 and Wenlan v0.14.1 using maintained first-party source captured on 2026-07-24. Last release alignment: v0.14.1 on 2026-07-20. Check the linked changelog and tagged source before relying on a moving product claim.",
      },
    ],
    relatedSlugs: [
      "local-first-ai-memory",
      "ai-agent-handoff-loop",
      "wenlan-vs-basic-memory",
      "wenlan-vs-claude-mem",
      "review-before-trust-ai-memory",
    ],
    cta: {
      heading: "Build a source-backed LLM wiki",
      body: "Wenlan keeps AI work context local, reviewable, and available across MCP-compatible tools.",
    },
  },
  {
    slug: "ai-agent-memory-types",
    eyebrow: "Architecture",
    category: "Concepts",
    title:
      "AI Agent Memory Types: Working, Episodic, Semantic, and Procedural",
    description:
      "Learn what the four AI agent memory types do, where each should live, and why facts, events, current context, and procedures need different lifecycles.",
    metaTitle: "AI Agent Memory Types: 4 Layers Explained | Wenlan",
    metaDescription:
      "Compare working, episodic, semantic, and procedural memory for AI agents, with a practical guide to storage, retrieval, and updates.",
    keywords: [
      "AI agent memory types",
      "working memory AI agents",
      "episodic memory AI agents",
      "semantic memory AI agents",
      "procedural memory AI agents",
      "agent memory architecture",
    ],
    publishedAt: "2026-07-25",
    updatedAt: "2026-07-25",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "Developers designing durable memory for AI agents",
    heroBullets: [
      "Working memory holds the active task, observations, and temporary state.",
      "Episodic and semantic memory preserve what happened and what is known.",
      "Procedural memory controls how the agent behaves and should be updated like instructions, not facts.",
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "An AI agent needs different memory roles because current task state, past events, durable knowledge, and operating instructions do not age or change in the same way. Working memory is temporary. Episodic memory records what happened. Semantic memory stores what is known. Procedural memory controls how work is done.",
          "These are architectural roles, not four required database tables. One system may use a context window, event log, knowledge store, and versioned skills; another may share infrastructure while keeping separate write, retrieval, and update rules.",
        ],
      },
      {
        heading: "The four AI agent memory types",
        body: [
          "The CoALA model separates an agent's short-term working memory from long-term episodic, semantic, and procedural memory. The useful distinction is not the label on a storage engine. It is what the information means and how the system should maintain it.",
        ],
        bullets: [
          "Working memory: the active goal, recent observations, intermediate results, and current tool state needed for the task in front of the agent.",
          "Episodic memory: records of events and outcomes, such as a debugging session, a deployment, a user interaction, or a handoff between agents.",
          "Semantic memory: durable facts, concepts, preferences, decisions, and maintained knowledge that can be reused outside the event that produced them.",
          "Procedural memory: instructions for how to act, including prompts, policies, rules, skills, tools, and code.",
        ],
      },
      {
        heading: "Where each memory type should live",
        body: [
          "Place information according to its lifecycle and consumer. Current state should be cheap to replace; event records need time and outcome context; durable knowledge needs correction and provenance; behavior needs versioning and tests.",
        ],
        bullets: [
          "Working memory belongs in the current context window or session state. Keep only what the active task needs, then discard or compress it when the task ends.",
          "Episodic memory belongs in timestamped session history and handoffs. Preserve what happened, what changed, the outcome, and links to relevant artifacts.",
          "Semantic memory belongs in durable facts and maintained knowledge. Give important claims source links, scope, correction paths, and a way to supersede stale versions.",
          "Procedural memory belongs in versioned prompts, rules, skills, or code. Review it as behavior, test important paths, and retain why a procedure changed.",
        ],
      },
      {
        heading: "Why one vector store is not enough",
        body: [
          "Putting every transcript, fact, event, and instruction into one retrieval index hides the differences that matter. A stale fact should be corrected or superseded. An old event may remain historically true. A failed procedure should be revised and tested. Temporary task state should usually disappear.",
          "Retrieval can still span multiple roles, but the write and maintenance rules should stay explicit. Otherwise the agent may retrieve an obsolete workflow as if it were a current fact, or treat a one-time event as a lasting rule.",
        ],
      },
      {
        heading: "How Wenlan fits without changing the taxonomy",
        body: [
          "Wenlan is the durable work-memory and source-backed knowledge layer, not the entire agent architecture. The AI client owns working context. Wenlan can preserve useful session handoffs, durable facts, decisions, lessons, and maintained Pages. Prompts, project rules, skills, and executable code remain the procedural layer.",
          "Wenlan's identity, preference, decision, lesson, gotcha, and fact are capture metadata, not the four cognitive layers. They help classify a durable capture inside Wenlan; they do not relabel working, episodic, semantic, and procedural memory.",
        ],
        link: {
          label: "See how semantic memory becomes a maintained page",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
    ],
    faqs: [
      {
        question: "Are the four AI agent memory types four separate databases?",
        answer:
          "No. They are roles with different lifecycles. A system may share storage, but it should keep the write, retrieval, correction, retention, and versioning rules distinct.",
      },
      {
        question: "Should procedural memory go into a vector database?",
        answer:
          "A system can retrieve procedures dynamically, but important behavior should remain inspectable and versioned as prompts, rules, skills, or code. Treating a procedure as an ordinary fact makes changes and failures harder to review.",
      },
    ],
    relatedSlugs: [
      "ai-work-memory",
      "ai-agent-handoff-loop",
      "source-backed-wiki-pages-ai-work",
    ],
    officialReferences: [
      {
        label: "CoALA: Cognitive Architectures for Language Agents",
        href: "https://arxiv.org/abs/2309.02427",
      },
      {
        label: "LangChain memory overview",
        href: "https://docs.langchain.com/oss/python/concepts/memory",
      },
      {
        label: "Letta context hierarchy",
        href: "https://docs.letta.com/guides/core-concepts/memory/context-hierarchy",
      },
      {
        label: "Wenlan memory types",
        href: "https://wenlan.app/docs/memory-types",
      },
    ],
    cta: {
      heading: "Keep durable agent memory inspectable",
      body: "Wenlan preserves decisions, lessons, handoffs, and source-backed knowledge while your agent keeps current context and procedures in the right layers.",
    },
  },
  {
    slug: "ai-agent-handoff-loop",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "The AI Agent Handoff Loop: How Work Carries Across Sessions",
    description:
      "A practical model for carrying decisions, lessons, gotchas, and next steps from one AI work session into the next.",
    metaTitle: "AI Agent Session Handoff for Claude Code and Codex | Wenlan",
    metaDescription:
      "Learn how the AI agent handoff loop helps coding agents and AI tools carry decisions, lessons, project context, and next steps across sessions.",
    keywords: [
      "AI agent handoff",
      "AI work sessions",
      "persistent context AI agents",
      "coding agent memory",
      "AI session handoff",
    ],
    updatedAt: "2026-10-07",
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "Developers and AI power users running multi-session work",
    heroBullets: [
      "Session start: load relevant context before work begins.",
      "During work: capture durable facts, decisions, gotchas, and follow-ups.",
      "Session end: write a handoff so the next run knows what changed.",
    ],
    sections: [
      {
        heading: "Why sessions need handoffs",
        body: [
          "AI work often fails at the boundary between sessions. The assistant did useful work, but the next run does not know what changed, what was decided, or where to continue.",
          "A handoff loop turns that boundary into a habit. The next agent starts with the right context instead of replaying a full chat history.",
        ],
      },
      {
        heading: "The loop",
        body: [
          "Wenlan follows a simple rhythm: load context when a session starts, capture durable knowledge during work, write a handoff when the session ends, refine memory between sessions, and retrieve the right context next time.",
          "The loop is deliberately practical. It focuses on what future agents need to act well: decisions, lessons, constraints, unresolved threads, and source provenance.",
        ],
      },
      {
        heading: "What belongs in a handoff",
        body: [
          "A good handoff is not a transcript. It should say what changed, what matters, what remains open, and which files, commands, or project areas are relevant.",
          "The point is to compress the state of work into something useful for the next session.",
        ],
        bullets: [
          "Decision made and why it was chosen.",
          "Lesson or gotcha discovered while debugging.",
          "Follow-up that should not be lost.",
          "Project context the next agent needs before editing.",
        ],
      },
      {
        heading: "How Wenlan supports it",
        body: [
          "Wenlan gives agents a place to save the durable parts of the session and a way to recall them through MCP later.",
          "Between sessions, Wenlan keeps captures, handoffs, related entities, and source-backed pages connected. Manual /distill turns repeated context into readable pages, while optional local models or API keys can add background page work.",
        ],
      },
      {
        heading: "What /handoff writes in Claude Code and Codex",
        body: [
          "In Claude Code and Codex, /handoff writes a Markdown session log, applies one typed update to the project's Space Brief (last-session summary plus Active and Backlog items), and stores durable decisions, lessons, gotchas, and facts as MCP captures. The next session starts with /brief, which reads that Brief.",
          "A handoff is not Claude Code resume. Use claude --resume or --continue when you want the same transcript; use a handoff for durable project status and context that crosses sessions or tools.",
        ],
        bullets: [
          "Let /handoff preview pending captures from the current session before closing.",
          "Confirm the resolved space so the next session searches the right project context.",
          "Mention files or commands only when they orient the next agent and are not obvious from git.",
        ],
        code: {
          label: "What /handoff writes",
          code: "~/.wenlan/sessions/<YYYY-MM-DD-HHmm>-<slug>.md\nSpace Brief update in the daemon DB\n~/.wenlan/sessions/_status/<space>.md (read-only receipt)\nWenlan MCP captures in the daemon DB",
        },
      },
      {
        heading: "Keep project status for the next agent",
        body: [
          "The Space Brief is the live ledger /brief reads: last session, Active work, Backlog, and gated items. The _status Markdown file is a readable receipt of it, not something to edit. Write for resumption, not narration.",
        ],
        bullets: [
          "Keep fresh next-move candidates in Active and older parked work in Backlog.",
          "Complete or move items explicitly; /handoff never auto-demotes untouched Active work.",
          "Summarize a verified result and the command that proved it instead of storing long logs.",
          "Leave temporary todos to task tools. Keep the durable status that matters when the chat is gone.",
        ],
        code: {
          label: "Brief receipt shape",
          code: "# <Project> - Current Status\n\n## Last session (<date>)\n- <accomplished bullet>\n\n## Active\n- <fresh next-move candidate> (added <YYYY-MM-DD>)\n- <blocked item> (added <YYYY-MM-DD>) (gated: <trigger>)\n\n## Backlog\n- <older parked item> (added <YYYY-MM-DD>)",
        },
      },
    ],
    faqs: [
      {
        question: "Is a handoff the same as summarizing a chat?",
        answer:
          "No. A handoff is action-oriented. It captures what the next session needs to continue the work, not everything that happened.",
      },
      {
        question: "Does every AI session need a handoff?",
        answer:
          "No. One-off chats may not need one. Handoffs matter most when work spans days, projects, tools, or multiple AI sessions.",
      },
      {
        question: "Is a handoff the same as Claude Code resume?",
        answer:
          "No. Resume reopens the same transcript. A Wenlan /handoff keeps durable project status and context that also reaches future sessions and other tools.",
      },
    ],
    relatedSlugs: ["claude-code-memory", "mcp-memory-server", "local-first-ai-memory", "ai-coding-agent-loses-context"],
    cta: {
      heading: "Stop restarting from zero",
      body: "Wenlan makes handoffs, decisions, and project context available when the next AI session begins.",
    },
  },
];

export const articles: LearnArticle[] = [...baseArticles, ...seoArticles];

export function getArticle(slug: string): LearnArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function articleUrl(slug: string): string {
  return `${SITE_URL}/learn/${slug}`;
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
