import { seoArticles } from "./seo-articles";

export const SITE_URL = "https://wenlan.app";
export const DEFAULT_AUTHOR = "Qi-Xuan Lu";
export const DEFAULT_AUTHOR_URL = "https://github.com/7xuanlu";
export const DEFAULT_AUTHOR_SAME_AS = ["https://github.com/7xuanlu"];

export const articleCategories = ["Concepts", "Comparisons", "Workflows"] as const;

export type LearnArticleCategory = (typeof articleCategories)[number];

export type LearnArticleSection = {
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
};

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
    metaTitle: "What Is AI Work Memory? | Wenlan",
    metaDescription:
      "Learn what AI work memory is, when built-in memory is not enough, and how Wenlan keeps work context local, visible, correctable, and MCP-native.",
    keywords: [
      "AI work memory",
      "memory for AI work",
      "LLM wiki for AI work",
      "durable AI work context",
      "Wenlan AI work",
    ],
    updatedAt,
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
        heading: "What useful AI work memory should do",
        body: [
          "The core job is not hoarding transcripts. Useful memory distills noisy conversations into compact knowledge and retrieves the right pieces later.",
          "That usually means combining semantic search, full-text search, metadata, and a knowledge graph. It also means letting people curate memory instead of trusting a black box.",
        ],
      },
      {
        heading: "How Wenlan approaches AI work memory",
        body: [
          "Wenlan is a local-first personal knowledge library for AI work in Claude Code, Cursor, Codex, Claude Desktop, Gemini CLI, and other MCP-compatible tools.",
          "Wenlan stores useful context locally, makes memory visible and correctable, writes handoffs, distills source-backed wiki pages, and uses hybrid retrieval that combines vector search, full-text search, and graph context.",
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
    ],
    relatedSlugs: ["mcp-memory-server", "local-first-ai-memory", "wenlan-vs-basic-memory"],
    cta: {
      heading: "Make your AI work compound",
      body: "Wenlan turns decisions, lessons, handoffs, and project context into memory and wiki pages your agents can use later.",
    },
  },
  {
    slug: "mcp-memory-server",
    eyebrow: "Protocol",
    category: "Concepts",
    title: "MCP Memory Server for Claude Code, Cursor, and Codex",
    description:
      "Learn what an MCP memory server does, how it connects AI tools to durable context, and how Wenlan keeps that memory local and inspectable.",
    metaTitle: "MCP Memory Server for Claude Code, Cursor, Codex | Wenlan",
    metaDescription:
      "Set up local MCP memory for Claude Code, Cursor, Codex, and other clients. Wenlan adds capture, recall, provenance, and local control.",
    keywords: [
      "MCP memory server",
      "memory MCP",
      "Claude MCP memory",
      "Cursor MCP memory",
      "MCP memory server GitHub",
      "persistent memory for AI agents",
    ],
    updatedAt: "2026-06-07",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "Developers and AI power users connecting multiple MCP clients",
    heroBullets: [
      "MCP servers expose tools, resources, and prompts to AI applications through a standard protocol.",
      "A memory server gives clients a way to store, search, recall, and manage durable work context.",
      "Wenlan keeps the MCP memory path local, source-backed, and shared across Claude Code, Cursor, Codex, and other clients.",
    ],
    sections: [
      {
        heading: "Quick answer",
        body: [
          "If you searched for an MCP memory server, you probably want an AI tool to remember project facts, decisions, preferences, and handoffs across sessions without pasting the same context every time.",
          "Wenlan is the local-first version of that workflow: the daemon owns the memory store, wenlan-mcp is the connector clients launch, and MCP-compatible tools call Wenlan when they need context.",
        ],
        bullets: [
          "Use MCP when the memory should be available outside one chat product.",
          "Use a local daemon when the memory includes private project context.",
          "Use Wenlan when you also want capture, recall, handoff, provenance, wiki pages, and human-readable artifacts.",
        ],
      },
      {
        heading: "What MCP adds to memory",
        body: [
          "The Model Context Protocol gives AI clients a standard way to call external capabilities. MCP servers expose those capabilities; MCP clients are created by host applications such as IDEs or AI tools to talk to particular servers.",
          "For memory, that protocol boundary matters. The AI tool can stay focused on the conversation while the memory server handles durable context, search, and storage.",
        ],
      },
      {
        heading: "What a memory server should expose",
        body: [
          "A useful MCP memory server should do more than append notes. It needs a way to capture one durable fact, recall relevant context, list or inspect stored memory, forget stale entries, and diagnose whether the local route is connected.",
          "Wenlan exposes that path through MCP tools around context, capture, recall, distillation, review, forget, and doctor checks. The goal is not a raw database endpoint; the goal is a memory loop agents can use safely during work.",
        ],
      },
      {
        heading: "Local vs hosted memory",
        body: [
          "Hosted memory servers are easy to start, but they require sending memory to someone else's infrastructure. Local memory servers take more care, but they keep private project context, preferences, and decisions under your control.",
          "Wenlan is built around the local-first path. The daemon runs on your machine, owns the database, and serves memory to MCP clients through the local wenlan-mcp connector.",
        ],
      },
      {
        heading: "Install path",
        body: [
          "Claude Code users should start with the Wenlan plugin because it adds slash commands and setup checks around the same local memory layer. Other MCP clients should run Wenlan setup, then let the CLI add the client-specific MCP configuration.",
          "The commands below are the normal non-Claude Code path for tools such as Cursor, Codex, Claude Desktop, VS Code, and Gemini CLI.",
        ],
        code: {
          label: "MCP client setup",
          code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan mcp add cursor\n~/.wenlan/bin/wenlan mcp add codex\n# or: claude-desktop, vscode, gemini",
        },
        link: {
          label: "Read the Claude Code memory guide",
          href: "/learn/claude-code-memory",
        },
      },
      {
        heading: "How Wenlan fits",
        body: [
          "Wenlan is more than a bare MCP store. It is a local runtime, CLI, MCP connector, and Claude Code plugin that carries work context forward, links related knowledge, detects contradictions, and keeps wiki pages and provenance attached.",
          "The MCP server is the bridge: AI tools read and write memory, while Wenlan keeps the broader work context visible, searchable, and locally owned.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Wenlan just an MCP memory server?",
        answer:
          "No. Wenlan includes an MCP server path, but the product also includes local storage, manual distillation, optional model-backed page work, contradiction detection, provenance, search, and wiki pages.",
      },
      {
        question: "Can one MCP memory server work with multiple AI tools?",
        answer:
          "Yes, if those tools support MCP and are configured to use the same server. Wenlan is designed for that shared-memory workflow.",
      },
    ],
    relatedSlugs: ["claude-code-memory", "mcp-memory-server-localhost-7878", "how-to-add-mcp-memory-to-cursor"],
    officialReferences: [
      {
        label: "MCP server concepts",
        href: "https://modelcontextprotocol.io/docs/learn/server-concepts",
      },
      {
        label: "MCP client concepts",
        href: "https://modelcontextprotocol.io/docs/learn/client-concepts",
      },
      {
        label: "Claude Code MCP setup",
        href: "https://code.claude.com/docs/en/mcp",
      },
      {
        label: "Wenlan on GitHub",
        href: "https://github.com/7xuanlu/wenlan",
      },
    ],
    cta: {
      heading: "Connect an MCP memory server locally",
      body: "Install Wenlan, add the MCP connector to your client, and verify capture and recall before trusting memory in real work.",
    },
  },
  {
    slug: "local-first-ai-memory",
    eyebrow: "Privacy",
    category: "Concepts",
    title: "Local-First AI Work Memory: Keep Context on Your Machine",
    description:
      "Local-first AI work memory keeps sensitive project knowledge, decisions, and preferences under your control while still making them useful to assistants.",
    metaTitle: "Local-First AI Work Memory | Wenlan",
    metaDescription:
      "Learn why local-first AI work memory matters for privacy, ownership, and long-running work. Wenlan keeps work context visible, correctable, and on your machine.",
    keywords: [
      "local-first AI work memory",
      "private AI work memory",
      "on-device AI work memory",
      "open source AI work memory",
      "self-hosted AI work memory",
    ],
    updatedAt,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "People using AI with sensitive work, client context, or private knowledge",
    heroBullets: [
      "Your memory database stays on your machine by default.",
      "On-device intelligence processes memory without making cloud storage the default.",
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
        ],
      },
      {
        heading: "How Wenlan keeps memory useful",
        body: [
          "Local-first does not mean inert. Wenlan combines vector search, full-text search, and a knowledge graph so assistants can retrieve the right work context without replaying everything.",
          "It also makes memory inspectable. You can see what was learned, trace it back to source conversations, and correct it when your understanding changes.",
        ],
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
    ],
    relatedSlugs: ["ai-work-memory", "mcp-memory-server", "markdown-local-index-ai-memory"],
    cta: {
      heading: "Keep your context where your work lives",
      body: "Wenlan gives AI tools useful memory without making your accumulated work context cloud-first by default.",
    },
  },
  {
    slug: "claude-code-memory",
    eyebrow: "Developer workflow",
    category: "Workflows",
    title: "Claude Code Memory: CLAUDE.md, /memory, and MCP Context",
    description:
      "Understand CLAUDE.md, Claude Code auto memory, /memory, and when to add Wenlan's local MCP memory for shared project context.",
    metaTitle: "Claude Code Memory: CLAUDE.md, /memory, MCP | Wenlan",
    metaDescription:
      "Use CLAUDE.md, auto memory, and /memory well. Add Wenlan when Claude Code needs local, source-backed memory shared with Cursor and Codex.",
    keywords: [
      "Claude Code memory",
      "Claude Code persistent memory",
      "Claude Code /memory",
      "Claude Code memory plugin",
      "Claude Code memory repo",
      "Claude Code MCP memory",
      "Claude Code project context",
      "AI coding agent memory",
    ],
    updatedAt: "2026-06-07",
    author: DEFAULT_AUTHOR,
    readingTime: "7 min read",
    audience: "Developers using Claude Code, Cursor, and other AI coding agents",
    heroBullets: [
      "Use CLAUDE.md for stable project instructions and auto memory for assistant-learned corrections and preferences.",
      "Use /memory to inspect and edit what Claude Code has loaded before you blame recall.",
      "Use Wenlan when memory should be local, source-backed, reviewable, and shared with Cursor, Codex, and other MCP clients.",
    ],
    sections: [
      {
        heading: "Quick answer",
        body: [
          "Claude Code already has memory. The official memory path combines CLAUDE.md files you write, auto memory Claude writes from corrections and preferences, and the /memory command for viewing and editing what is loaded.",
          "Wenlan is for the next problem: keeping evolving work context local, source-backed, and available outside one Claude Code session or one Claude-only surface.",
        ],
        bullets: [
          "Put stable rules, commands, and project architecture in CLAUDE.md.",
          "Use Claude Code auto memory for repeated corrections and preferences Claude discovers.",
          "Use Wenlan for decisions, gotchas, handoffs, source-backed wiki pages, and shared MCP memory.",
        ],
      },
      {
        heading: "How Claude Code memory works",
        body: [
          "Each Claude Code session starts with a fresh context window. Claude Code carries knowledge forward through CLAUDE.md files and auto memory, and both are loaded into new conversations as context.",
          "That makes Claude Code memory useful for persistent instructions. It also means memory competes with the rest of the context window, so it should stay concise and scoped.",
        ],
      },
      {
        heading: "Use CLAUDE.md for stable instructions",
        body: [
          "CLAUDE.md is excellent for project-level instructions: build commands, test commands, architecture notes, coding standards, and long-lived conventions the whole team should share.",
          "It should not become a dumping ground for every transient observation from every coding session. When the file gets too large or contradictory, Claude has more context to scan and less room for the current task.",
        ],
      },
      {
        heading: "Use /memory before adding another layer",
        body: [
          "If Claude Code seems to forget something, first inspect the built-in memory surface. /memory is the place to view and edit what Claude Code has loaded.",
          "That step matters because some problems are not Wenlan problems. The memory may be missing, stale, too broad, duplicated, or loaded at the wrong scope.",
        ],
      },
      {
        heading: "When Wenlan adds value",
        body: [
          "Use Wenlan when project context needs provenance, review, deletion, handoff, distillation, and access from more than one MCP-compatible tool.",
          "Useful Wenlan captures are specific and grounded: why a decision was made, what tradeoffs were considered, what command verifies a change, which module owns a behavior, or what gotcha should not be rediscovered next week.",
        ],
      },
      {
        heading: "Install path for Claude Code",
        body: [
          "The Claude Code plugin is the most complete Wenlan path because it adds /init, /brief, /capture, /recall, /handoff, /distill, and review workflows around the local daemon and MCP connector.",
          "After installing, restart Claude Code if prompted, run /init once, then verify a harmless capture and recall before relying on Wenlan for real project memory.",
        ],
        code: {
          label: "Claude Code plugin",
          code: "/plugin marketplace add 7xuanlu/claude-plugins\n/plugin install wenlan@7xuanlu\n/init\n/capture This project uses Wenlan for local AI work memory.\n/recall local AI work memory",
        },
      },
      {
        heading: "Share memory with Cursor and Codex",
        body: [
          "Wenlan exposes memory through its MCP server. Claude Code can write what it learns and recall relevant project context later. The same work context can also be available to Cursor, Codex, Claude Desktop, Gemini CLI, and other MCP clients when configured.",
          "That makes Wenlan a shared local layer for AI-assisted development rather than a single-client note file.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should Claude Code memory replace CLAUDE.md?",
        answer:
          "No. CLAUDE.md is best for stable project instructions. Wenlan is best for evolving memory across sessions, tools, and projects.",
      },
      {
        question: "Can Cursor use the same memory?",
        answer:
          "Yes. Wenlan is MCP-native, so multiple MCP-compatible tools can connect to the same local memory layer when configured.",
      },
    ],
    relatedSlugs: ["claude-code-memory-command-vs-wenlan", "wenlan-for-claude-code", "mcp-memory-server"],
    officialReferences: [
      {
        label: "Claude Code memory docs",
        href: "https://code.claude.com/docs/en/memory",
      },
      {
        label: "Claude Code MCP docs",
        href: "https://code.claude.com/docs/en/mcp",
      },
      {
        label: "Wenlan on GitHub",
        href: "https://github.com/7xuanlu/wenlan",
      },
    ],
    cta: {
      heading: "Verify Claude Code memory locally",
      body: "Install the Wenlan plugin, run /init, then test one capture and recall before adding real project context.",
    },
  },
  {
    slug: "wenlan-for-claude-code",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Wenlan for Claude Code Memory: The Daily /brief and /handoff Loop",
    description:
      "Use Wenlan inside Claude Code with /init, /brief, /capture, /recall, /handoff, and /distill so coding context carries across sessions.",
    metaTitle: "Wenlan for Claude Code Memory | Daily Workflow",
    metaDescription:
      "Install the Wenlan Claude Code plugin, run /init, start with /brief, capture durable decisions, and hand off sessions with local AI work memory.",
    keywords: [
      "Wenlan Claude Code",
      "Claude Code Wenlan plugin",
      "Claude Code memory workflow",
      "Claude Code handoff",
      "Claude Code persistent context",
    ],
    updatedAt: "2026-06-07",
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    audience: "Claude Code users who want project context to survive long work sessions",
    heroBullets: [
      "Install from the Claude Code plugin marketplace, then run /init once.",
      "Start real sessions with /brief and capture durable context during work.",
      "End with /handoff so the next agent starts from current project state.",
    ],
    sections: [
      {
        heading: "Install once, then verify the loop",
        body: [
          "Wenlan's Claude Code path starts with the plugin marketplace: `/plugin marketplace add 7xuanlu/claude-plugins`, `/plugin install wenlan@7xuanlu`, then `/init` after the restart Claude Code requests.",
          "`/init` handles daemon setup, MCP wiring, local memory setup, and a first round-trip check. The goal is not to add another manual note-taking habit. The goal is to make the memory route available at the moment work happens.",
        ],
        code: {
          label: "Claude Code setup",
          code: "/plugin marketplace add 7xuanlu/claude-plugins\n/plugin install wenlan@7xuanlu\n/init",
        },
      },
      {
        heading: "Start with /brief",
        body: [
          "`/brief [topic]` loads project status, recent handoffs, preferences, and topic-relevant memories before edits begin.",
          "That makes Claude Code less dependent on the current chat window. The agent walks into the session with the context Wenlan has already earned.",
        ],
      },
      {
        heading: "Capture decisions while they are fresh",
        body: [
          "`/capture` is for durable work knowledge: decisions, lessons, gotchas, project constraints, corrections, and preferences.",
          "A good capture includes why the fact matters. One atomic memory is easier to search, supersede, inspect, and distill than a paragraph that mixes five ideas.",
        ],
      },
      {
        heading: "Close with /handoff, then distill when needed",
        body: [
          "`/handoff` writes what changed, what remains open, and what the next agent should know. It also gives Wenlan better source material than a raw transcript.",
          "When a theme repeats across sessions, `/distill` turns related captures into source-backed wiki pages. The page record keeps source memory IDs, and pages can be refreshed as the work changes.",
        ],
        bullets: [
          "/brief: orient the agent before work.",
          "/capture: save one durable idea.",
          "/recall: look up a specific past thread.",
          "/handoff: preserve the session boundary.",
          "/distill: compose accumulated memories into wiki pages.",
        ],
        code: {
          label: "Daily loop",
          code: "/brief\n/capture <one durable project fact and why it matters>\n/recall <specific prior decision or gotcha>\n/handoff",
        },
      },
    ],
    faqs: [
      {
        question: "Do I need to use every command every session?",
        answer:
          "No. Most serious sessions need /brief and /handoff. Use /capture when something durable happens, /recall when history matters, and /distill when repeated captures deserve a page.",
      },
      {
        question: "Can the same Wenlan memory work outside Claude Code?",
        answer:
          "Yes. Claude Code gets the richest slash-command workflow, but Wenlan also exposes the same local memory through MCP for Cursor, Codex, Claude Desktop, VS Code, Gemini CLI, and other clients.",
      },
    ],
    relatedSlugs: ["claude-code-memory", "claude-code-memory-command-vs-wenlan", "how-to-add-memory-to-claude-code"],
    officialReferences: [
      {
        label: "Claude Code memory docs",
        href: "https://code.claude.com/docs/en/memory",
      },
      {
        label: "Claude Code plugin marketplace",
        href: "https://code.claude.com/docs/en/discover-plugins",
      },
      {
        label: "Wenlan plugin source",
        href: "https://github.com/7xuanlu/wenlan/tree/main/plugin",
      },
    ],
    cta: {
      heading: "Make Claude Code sessions compound",
      body: "Install Wenlan, run /init, then use /brief and /handoff around real work.",
    },
  },
  {
    slug: "distilled-wiki-pages-ai-memory",
    eyebrow: "Concept",
    category: "Concepts",
    title: "LLM Wiki for AI Work: Source-Backed Pages in Wenlan",
    description:
      "Wenlan turns repeated AI work context into a source-backed AI work wiki that agents and humans can reuse across tools.",
    metaTitle: "LLM Wiki for AI Work | Wenlan",
    metaDescription:
      "Learn how Wenlan acts as an LLM wiki for AI work by distilling captures into source-backed pages with provenance, stale reasons, and refreshable revision state.",
    keywords: [
      "LLM wiki for AI work",
      "source-backed AI work wiki",
      "distilled wiki pages",
      "AI memory distillation",
      "source-backed AI memory",
      "AI work wiki",
      "memory provenance",
    ],
    updatedAt,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "People evaluating whether AI memory should stay as storage or become composed, source-backed wiki knowledge",
    heroBullets: [
      "Wenlan treats captured memories as raw material for an LLM wiki, not as the final interface.",
      "Distilled pages cluster related captures into readable Markdown wiki entries with provenance.",
      "Source memory IDs, revision state, and git history keep each page inspectable as AI work changes.",
    ],
    sections: [
      {
        heading: "The short answer",
        body: [
          "An LLM wiki for AI work is a source-backed knowledge layer that agents can read, update, and cite while they work. It is not a static notes folder and it is not opaque model memory.",
          "Wenlan is built around that shape: agents capture durable facts, decisions, lessons, and handoffs; /distill turns repeated context into wiki pages; and each page keeps source memory IDs so people can inspect why it says what it says.",
        ],
        link: {
          label: "Install Wenlan first",
          href: "/docs/get-started",
        },
      },
      {
        heading: "Why memory needs a wiki layer",
        body: [
          "A long list of memories eventually becomes another inbox. The agent can search it, but the human has to trust that search will reconcile duplicates, stale facts, and contradictions correctly.",
          "The wiki layer gives repeated work a stable page: the current project constraint, the accepted tradeoff, the hard-earned setup fix, the handoff pattern, or the concept that keeps reappearing across sessions.",
        ],
        link: {
          label: "Use the daily workflow",
          href: "/docs/daily-workflow",
        },
      },
      {
        heading: "How Wenlan keeps pages source-backed",
        body: [
          "Every distilled page keeps the source memory IDs that produced it. Wenlan's daemon rejects unsourced pages instead of letting attractive summaries enter the store without provenance.",
          "That source chain matters when memory is wrong. You can inspect the original capture, see when it was written, and supersede it instead of guessing why a page says what it says.",
        ],
        link: {
          label: "Review the local data boundary",
          href: "/docs/data-and-privacy",
        },
      },
      {
        heading: "Pages can age and refresh",
        body: [
          "A useful LLM wiki needs to admit that knowledge changes. Wenlan pages carry revision state and stale reasons so repeated captures can refresh old conclusions instead of silently piling up beside them.",
          "Manual `/distill` is the deliberate path today. Optional local models or API keys can support richer background extraction and page refresh work when you want the daemon to do more between sessions.",
        ],
      },
      {
        heading: "Why this helps agents",
        body: [
          "Agents need compact context, not raw chat archaeology. A distilled page can say the current decision, cite where it came from, and link related entities.",
          "That makes retrieval more useful: Wenlan can serve atomic memories, wiki pages, graph context, full-text hits, and vector matches together instead of pretending one memory snippet is the whole answer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are distilled pages just summaries?",
        answer:
          "No. A summary compresses one source. A distilled page composes multiple related memories, cites source IDs, and can refresh as new captures supersede old context.",
      },
      {
        question: "Can I read the pages myself?",
        answer:
          "Yes. Pages are projected as Markdown under ~/.wenlan/pages/ and can be opened in any editor or symlinked into Obsidian.",
      },
    ],
    relatedSlugs: ["source-backed-wiki-pages-ai-work", "ai-memory-provenance", "local-git-history-ai-memory"],
    cta: {
      heading: "Turn memory into an LLM wiki",
      body: "Wenlan distills repeated captures into source-backed wiki pages your next AI session can actually use.",
    },
  },
  {
    slug: "ai-work-memory-vs-knowledge-base",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "AI Work Memory vs Knowledge Base: Which One Do You Need?",
    description:
      "A knowledge base stores what you know. AI work memory carries decisions, handoffs, lessons, and evolving context back into agent sessions.",
    metaTitle: "AI Work Memory vs Knowledge Base | Wenlan",
    metaDescription:
      "Compare AI work memory and knowledge bases, and learn why Wenlan is shaped around sessions, handoffs, provenance, and cross-tool MCP context.",
    keywords: [
      "AI work memory vs knowledge base",
      "AI knowledge base",
      "AI work context",
      "agent memory workflow",
      "AI memory system",
    ],
    updatedAt,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "People deciding whether they need a notes system or an AI work context layer",
    heroBullets: [
      "Knowledge bases are organized around documents and human browsing.",
      "AI work memory is organized around sessions, handoffs, retrieval, and reuse by agents.",
      "Wenlan keeps readable artifacts, but the workflow is built around compounding AI work.",
    ],
    sections: [
      {
        heading: "The difference in one sentence",
        body: [
          "A knowledge base helps people store and browse knowledge. AI work memory helps agents carry useful context from one work session into another.",
          "The overlap is real: both may use Markdown, links, search, and entities. The difference is the center of gravity.",
        ],
      },
      {
        heading: "When a knowledge base is enough",
        body: [
          "Use a knowledge base when the main job is writing durable documents, organizing notes, and browsing a corpus manually.",
          "That shape is excellent for stable reference material: docs, meeting notes, specs, research notes, and long-lived project explanations.",
        ],
      },
      {
        heading: "When AI work memory is the bottleneck",
        body: [
          "Use AI work memory when your pain is session loss. The agent solved a bug yesterday, made a tradeoff last week, or learned a project constraint in another tool, but today's session starts cold.",
          "The important artifacts are not always polished notes. They are decisions, gotchas, handoffs, corrections, stale facts, and relationships learned during work.",
        ],
      },
      {
        heading: "Why Wenlan includes both shapes",
        body: [
          "Wenlan keeps Markdown pages so humans can inspect the record. It also keeps a local libSQL index for vectors, FTS5, graph context, provenance, and retrieval metadata.",
          "That hybrid model is deliberate. The Markdown record keeps memory accountable. The local index makes it useful to agents at the moment they need context.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Wenlan a knowledge base?",
        answer:
          "Not primarily. Wenlan can project readable Markdown pages, but its core workflow is AI work memory: capture, handoff, distill, and recall across sessions and MCP clients.",
      },
      {
        question: "Can I use Wenlan with an existing knowledge base?",
        answer:
          "Yes. Wenlan's projected Markdown can be read by tools such as Obsidian, and selected durable notes can be migrated through explicit store or capture flows. The better long-term question is which system owns which kind of context.",
      },
    ],
    relatedSlugs: ["wenlan-vs-basic-memory", "markdown-local-index-ai-memory", "ai-work-memory"],
    cta: {
      heading: "Choose the workflow, not the label",
      body: "If your AI sessions keep losing decisions and project context, Wenlan is built for that loop.",
    },
  },
  {
    slug: "wenlan-vs-basic-memory",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs Basic Memory: Local AI Work Memory vs Markdown Knowledge Base",
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
    updatedAt: "2026-07-02",
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    audience: "People choosing a memory layer for AI-assisted work",
    heroBullets: [
      "Basic Memory is strongest as a Markdown-centered knowledge base with AI access.",
      "Wenlan is designed around the AI work loop: sessions, handoffs, distillation, provenance, and shared MCP memory.",
      "Both value human-readable memory; the right fit depends on whether you want a knowledge base or a work-session memory layer.",
      "This page reflects Basic Memory's public docs as of 2026-07-02 and Wenlan v0.12.0 as of 2026-07-08. If something has shifted on either side, please open an issue.",
    ],
    officialReferences: [
      {
        label: "Basic Memory documentation",
        href: "https://docs.basicmemory.com/",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "Choose Basic Memory if you want a Markdown-first knowledge base that humans and AI can both read and update.",
          "Choose Wenlan if your main problem is making AI work carry across sessions, tools, projects, and weeks without turning memory into a black box.",
        ],
      },
      {
        heading: "What Basic Memory emphasizes",
        body: [
          "Basic Memory presents itself around readable Markdown files, semantic structure, a knowledge graph, MCP access, and a web editor. That is a strong fit for people who want a knowledge base that AI can work with.",
          "The center of gravity is the knowledge base: notes, links, entities, and human-readable project knowledge.",
        ],
      },
      {
        heading: "What Wenlan emphasizes",
        body: [
          "Wenlan starts from the AI work session. It captures decisions, lessons, gotchas, handoffs, and project context, then refines them through manual distillation, optional model-backed page work, linking, and provenance.",
          "Raw captures and recall live in the daemon-owned store. Readable pages, sessions, and status files are projected under `~/.wenlan/` so people can inspect what agents rely on.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "If you mainly want a persistent Markdown knowledge base with AI access, Basic Memory may fit naturally. If you want a local memory loop for coding agents and MCP clients, Wenlan is more directly shaped around that workflow.",
          "The practical question is not which product has the word memory. It is whether your bottleneck is maintaining a knowledge base or carrying work context from one AI session into the next.",
        ],
      },
      {
        heading: "How the storage models differ in practice",
        body: [
          "Basic Memory keeps your notes as Markdown files in a vault. When the AI reads context, it reads the file content; when a human edits a note, the file changes; the vault is the source.",
          "Wenlan keeps raw captures in the daemon-owned libSQL store for retrieval and projects readable pages, session logs, and status Markdown under `~/.wenlan/`. Those readable artifacts are versioned in `~/.wenlan/.git/`, so `git log pages/<topic>.md` shows page history while recall and search still come from the daemon.",
          "The split matters at two scales. Search: a five-thousand-memory store needs vector plus FTS retrieval to answer 'what did I decide about token budgets last sprint' in under a second; Markdown-only search degrades fast past a few thousand notes. Audit: when an AI references a distilled page claim, you usually want source memory IDs, provenance state, and git history for the generated artifacts, not just the current page content.",
        ],
        bullets: [
          "Basic Memory: vault is the source. AI reads and writes Markdown directly.",
          "Wenlan: libSQL is the retrieval source, Markdown is the human projection. Daemon writes both atomically.",
          "Wenlan artifact history is per write for pages, sessions, and status Markdown. Raw capture retrieval remains daemon-owned.",
        ],
      },
      {
        heading: "A concrete walkthrough: distilling a week of sessions",
        body: [
          "Here is what a week with Wenlan looks like in my own work. Monday I capture three decisions inside Claude Code via the MCP `/capture` tool. Tuesday two more land from a Cursor session. Wednesday I run `/handoff` at the end of the day, then run `/distill` for the repeated auth theme. The result is a wiki page that quotes the original captures with mandatory source IDs.",
          "Friday I open the projected Markdown at `~/.wenlan/pages/auth.md`. The page reads like a coherent doc, not a chat log. Each claim has a source comment that links back to the originating memory IDs. The next AI session that asks 'what did we decide about retry strategy' gets the distilled answer, not five overlapping captures the model has to reconcile on the fly.",
          "Basic Memory's analog would be writing the wiki page myself, or asking the AI to draft it inside the vault. That works fine for a knowledge base. It is not a work-loop optimization, and the difference compounds across months.",
        ],
      },
      {
        heading: "When Basic Memory is the better call",
        body: [
          "I want to be specific about this. If your problem is 'I have hundreds of Markdown notes and I want AI to read and write to them naturally,' Basic Memory is closer to the shape of your problem. The vault is the product. AI is a citizen of the vault.",
          "If your problem is 'AI conversations keep losing context across sessions and tools,' Wenlan is closer. The work session is the product. Markdown is a projection for human readability.",
          "Both can run in parallel. The MCP layer does not care if two memory servers are registered. I have tested this; the practical limit is the human overhead of remembering which content belongs in which store. Most people end up picking one as primary within a couple of weeks.",
        ],
      },
      {
        heading: "Migration shape, if you decide to switch",
        body: [
          "Switching from a Basic Memory vault to Wenlan is selective today: pick durable notes that should become AI work memory and move them through `wenlan store`, `/capture`, or a small script over `/api/memory/store`. There is no general Markdown-vault importer in the current CLI.",
          "Going the other way is simpler. Wenlan's projected Markdown under `~/.wenlan/` is readable as plain text. Point Obsidian or another Markdown reader at the pages and sessions when you need a static record. You lose live recall, review, and distillation behavior, but the human-facing record remains portable.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Basic Memory",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "AI work session loop: capture, handoff, distill, recall across MCP clients.",
          competitor:
            "Markdown knowledge base humans and AI both read and edit.",
        },
        {
          dimension: "Storage",
          wenlan: "Local libSQL for retrieval plus Markdown projections in ~/.wenlan/; readable artifacts are tracked in ~/.wenlan/.git/.",
          competitor: "Markdown files in a local Obsidian-style vault.",
        },
        {
          dimension: "Retrieval",
          wenlan: "Hybrid: vector (BGE-Base-EN-v1.5-Q 768-dim) + FTS5 + reciprocal-rank fusion + knowledge-graph neighbors + CE reranker. LME_Oracle: 93.6% Recall@5, 0.857 MRR, 0.883 NDCG@10 (500 Q). LME_S: 87.7% Recall@5, 0.815 MRR, 0.822 NDCG@10 (deep, N=90).",
          competitor:
            "Semantic + FTS over Markdown notes; emphasis on note linking, not benchmark retrieval.",
        },
        {
          dimension: "Provenance",
          wenlan: "Mandatory source_memory_ids on every distilled page record. Daemon rejects pages with no source (HTTP 422). Pages can grow or refresh without losing the source chain.",
          competitor:
            "Wikilinks between notes; provenance is whatever the author writes by hand.",
        },
        {
          dimension: "Versioning",
          wenlan: "Real git history for readable artifacts in ~/.wenlan/.git/. Raw memory captures remain daemon-owned database records.",
          competitor:
            "File mtime; bring-your-own git if you want history.",
        },
        {
          dimension: "License",
          wenlan: "Apache-2.0 daemon, CLI, MCP server.",
          competitor: "AGPL-3.0 (Basic Memory open-source repo).",
        },
      ],
    },
    faqs: [
      {
        question: "Is Basic Memory a competitor to Wenlan?",
        answer:
          "They overlap around AI-readable memory and Markdown, but the product shapes differ. Basic Memory is closer to a Markdown knowledge base; Wenlan is closer to a local AI work memory loop.",
      },
      {
        question: "Can someone use both?",
        answer:
          "Yes, through MCP. Each registers as a distinct memory server with the AI client. The friction is human: you decide which one owns which kind of content. Most people pick one as primary within a few weeks.",
      },
      {
        question: "Does Wenlan work without the daemon running?",
        answer:
          "Reads of the projected Markdown under `~/.wenlan/` work without the daemon since the files are plain text. Anything that needs retrieval, capture, or distillation needs the daemon process. I run it as a launchd user service on macOS so I never think about it; the equivalents on Linux (systemd user unit) and Windows (Task Scheduler ONLOGON) ship in current Wenlan releases.",
      },
      {
        question: "How does Wenlan handle wikilinks compared to Basic Memory?",
        answer:
          "Wenlan extracts wikilinks during capture and creates explicit graph edges in the knowledge-graph layer, alongside the Markdown link. That lets hybrid retrieval traverse neighbors at query time. Basic Memory treats wikilinks primarily as Markdown links between notes.",
      },
      {
        question: "How fresh is this comparison?",
        answer:
          "Reflects Basic Memory's public docs as of 2026-07-02 and Wenlan v0.12.0 as of 2026-07-08. If something material changes on either side, please open an issue on github.com/7xuanlu/wenlan and I will update.",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-claude-mem",
      "wenlan-vs-superlocal-memory",
      "markdown-local-index-ai-memory",
      "ai-work-memory",
      "mcp-memory-server",
      "local-first-ai-memory",
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
    title: "Wenlan vs claude-mem: Which Claude Memory Workflow Fits Your Work?",
    description:
      "Compare Wenlan and claude-mem for Claude Code memory, observer-style capture, MCP access, local control, and work that spans tools.",
    metaTitle: "Wenlan vs claude-mem | Claude Memory Comparison",
    metaDescription:
      "Compare Wenlan and claude-mem for Claude Code memory workflows, observer capture, MCP memory, local control, and cross-tool AI work context.",
    keywords: [
      "Wenlan vs claude-mem",
      "claude-mem alternative",
      "Claude Code memory",
      "Claude memory workflow",
      "AI work memory",
    ],
    updatedAt: "2026-07-02",
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    audience: "Claude Code users choosing a memory workflow",
    heroBullets: [
      "claude-mem focuses on automatically observing Claude Code sessions and extracting useful context.",
      "Wenlan focuses on shared local AI work memory across Claude Code and other MCP clients.",
      "Both aim to reduce repeated context, but they choose different centers of gravity.",
      "Both products are early. This page covers the claude-mem npm package as of 2026-07-02 and Wenlan v0.12.0 as of 2026-07-08.",
    ],
    officialReferences: [
      {
        label: "claude-mem official website",
        href: "https://claude-mem.ai/",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "Choose claude-mem if your primary need is an observer-style memory workflow tightly centered on Claude Code sessions.",
          "Choose Wenlan if you want local-first AI work memory that can serve Claude Code, Cursor, Codex, Claude Desktop, Gemini CLI, and other MCP-compatible tools.",
        ],
      },
      {
        heading: "What claude-mem emphasizes",
        body: [
          "claude-mem presents itself as a memory sidekick for Claude Code. Its core idea is watching work happen, capturing decisions and context, and retrieving that context later with useful scoping.",
          "That is compelling when the main product surface is Claude Code and the desired experience is automatic memory capture around that tool.",
        ],
      },
      {
        heading: "What Wenlan emphasizes",
        body: [
          "Wenlan treats memory as part of a local AI work loop, not a single-client feature. Claude Code is important, but Wenlan also works through MCP so other clients can share the same context.",
          "Wenlan's workflow includes handoffs, manual distillation, optional model-backed page work, wiki pages, readable artifacts, local indexes, and provenance attached to durable memories.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "If you live entirely in Claude Code and want an observer-style assistant for that environment, claude-mem is directly aimed at that habit.",
          "If your work moves across coding agents, chat tools, projects, and sessions, Wenlan is designed to make the same context portable across those surfaces.",
        ],
      },
      {
        heading: "What 'observer mode' means in practice",
        body: [
          "claude-mem watches your Claude Code session and extracts memorable context without you naming it. The promise is low friction: keep working, memory accumulates on its own.",
          "Two trade-offs show up over weeks of use. First, false positives: an observer cannot reliably tell which 'decision' is durable versus which is the start of an idea you will revise an hour later. Second, attribution: when the AI later cites memory, you usually want to know whether it came from your considered handoff or from a sentence you typed while still figuring out the problem.",
          "Wenlan defaults to explicit capture for that reason. `/capture` is one keystroke during flow. `/handoff` preserves session state, and `/distill` deliberately turns repeated context into source-backed pages. Optional local models or API keys can add background extraction and page refresh work. The high-confidence layer is the one you marked.",
        ],
      },
      {
        heading: "What happens at session end",
        body: [
          "claude-mem's session-end pattern, as documented, summarizes the Claude Code session into memory entries automatically. That summary lives in claude-mem's store and gets retrieved on the next session via MCP.",
          "Wenlan's session-end pattern is the `/handoff` flow. You write one to three sentences about what happened, what is blocked, and what is next. The daemon attaches that to your session captures, links related entities, and updates readable session/status artifacts under `~/.wenlan/` that are versioned in `~/.wenlan/.git/`. The next session starts with a handoff brief plus relevant prior context, not a chat-log summary.",
          "Both reduce repeated context across sessions. The difference is who decides what is worth carrying forward: the model (claude-mem) or you with model help (Wenlan).",
        ],
        bullets: [
          "claude-mem: automatic session summary, model picks what is durable.",
          "Wenlan: explicit `/capture` plus `/handoff`, human picks; manual `/distill` and optional background page work supplement.",
          "Both expose recall via MCP. Wenlan also exposes `wenlan recall <id>` and the projected Markdown for direct human reading.",
        ],
      },
      {
        heading: "Cross-tool: Cursor, Codex, Claude Desktop, Gemini CLI",
        body: [
          "claude-mem's positioning is Claude Code first. MCP exposure exists so other clients can read the store, but the workflow shape (observer of Claude Code sessions) is the product.",
          "Wenlan's positioning is MCP first, Claude Code as one of many clients. One daemon at `127.0.0.1:7878` serves any MCP-compatible runtime. In my own work I switch between Cursor for refactors, Claude Code for greenfield, and Codex for shell-heavy tasks; the memory is the same memory.",
          "If you live 100% inside Claude Code, this difference is theoretical. If you context-switch between tools across a typical week, it is the difference between one memory layer and three disjoint ones.",
        ],
      },
      {
        heading: "When claude-mem is the better call",
        body: [
          "If your AI work is entirely inside Claude Code, you want zero capture friction, and you are comfortable letting an observer pick what is memorable, claude-mem is shaped exactly for that. Single-tool by design, not by oversight.",
          "If you want explicit human control over what enters memory, multiple AI clients sharing one local context store, or git-versioned audit trails for readable artifacts, those are not claude-mem's headline features. Use Wenlan.",
          "Cost: claude-mem ships as an npm package under MIT. Wenlan's daemon, CLI, and MCP server are Apache-2.0. Both are free to self-host. The optional Wenlan desktop app lives in a separate repo under AGPL-3.0 if you want a GUI on top.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "claude-mem",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "Local AI work memory across MCP clients: Claude Code, Cursor, Codex, Claude Desktop, VS Code, Gemini CLI.",
          competitor:
            "Observer-style memory assistant centered on Claude Code sessions.",
        },
        {
          dimension: "Capture mode",
          wenlan: "Explicit /capture in flow, /handoff at session end, plus manual /distill and optional background page work. Low-confidence and contradicting captures surface for review.",
          competitor:
            "Automatic observer of Claude Code sessions; less explicit human control over what enters memory.",
        },
        {
          dimension: "Retrieval",
          wenlan: "Hybrid retrieval (vector + FTS5 + RRF + graph + CE reranker). LME_Oracle: 93.6% Recall@5, 0.857 MRR, 0.883 NDCG@10. LME_S: 87.7% Recall@5, 0.815 MRR, 0.822 NDCG@10. ~168 tokens per recall query.",
          competitor:
            "Semantic recall via MCP scoped to past Claude Code sessions; no published benchmark.",
        },
        {
          dimension: "Cross-tool reach",
          wenlan: "One daemon serves any MCP client. Same memory across coding agents, chat tools, and CLI runtimes.",
          competitor:
            "Claude Code first. MCP exposure exists, but the workflow is tuned for the Claude Code surface.",
        },
        {
          dimension: "Provenance + versioning",
          wenlan: "Mandatory source IDs on distilled pages; readable pages, sessions, and status artifacts are versioned in ~/.wenlan/.git/.",
          competitor:
            "Session-attributed captures; no per-write git history by default.",
        },
        {
          dimension: "License",
          wenlan: "Apache-2.0 daemon, CLI, MCP server.",
          competitor: "MIT (per claude-mem npm package).",
        },
      ],
    },
    faqs: [
      {
        question: "Is Wenlan only for Claude Code?",
        answer:
          "No. Wenlan ships a Claude Code plugin, but it also exposes memory through MCP so other compatible tools can use the same local memory layer. Cursor, Codex, Claude Desktop, and Gemini CLI all work out of the box.",
      },
      {
        question: "Is claude-mem more automatic than Wenlan?",
        answer:
          "claude-mem is framed around observer-style capture for Claude Code. Wenlan has capture, handoffs, manual distillation, and optional model-backed page work, but it emphasizes inspectable memory, provenance, and cross-tool use. Less automatic at capture time, more controllable at recall time.",
      },
      {
        question: "Can I migrate from claude-mem to Wenlan?",
        answer:
          "There is no automated importer at the moment. claude-mem's memories are accessible through MCP, so a one-off script that reads selected durable items and POSTs to Wenlan's `/api/memory/store` endpoint would do the job. So far, manual capture during normal work has been faster than building one.",
      },
      {
        question: "Is automatic capture really lower-friction in the long run?",
        answer:
          "Friction at capture time is one form. Friction at recall time is another: a store filled with low-signal observations is one the AI has to wade through. Explicit capture front-loads the work; observer mode back-loads it. Wenlan uses explicit capture, handoffs, manual distillation, and optional background page work as the balance.",
      },
      {
        question: "Does Wenlan watch my Claude Code session in the background?",
        answer:
          "Not by default. There is no observer process. The daemon sees only what you capture or what you import. Session-level observation could be a build target later, but it is not a current feature, and the lack of it is intentional.",
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
    title: "Wenlan vs Superlocal Memory: Local-First AI Work Memory for Work That Spans Tools",
    description:
      "Compare Wenlan and Superlocal Memory as local-first AI memory tools for coding work, retrieval quality, MCP workflows, inspectability, and trust.",
    metaTitle: "Wenlan vs Superlocal Memory | AI Memory Alternative",
    metaDescription:
      "Compare Wenlan and Superlocal Memory for local-first AI memory, coding workflows, MCP clients, retrieval quality, provenance, and durable work context.",
    keywords: [
      "Wenlan vs Superlocal Memory",
      "Superlocal Memory alternative",
      "local-first AI work memory",
      "AI work memory reliability",
      "AI coding work memory",
    ],
    publishedAt: "2026-05-27",
    updatedAt: "2026-07-02",
    author: DEFAULT_AUTHOR,
    readingTime: "6 min read",
    audience: "Developers evaluating local-first memory for AI coding tools",
    heroBullets: [
      "Superlocal Memory now emphasizes a local reliability layer for memory, cache, prompt compression, KV-cache alignment, and LLM cost optimization.",
      "Wenlan emphasizes the AI work loop: capture, handoff, distill, retrieve, and keep readable artifacts inspectable.",
      "The best Superlocal Memory alternative depends on whether you need a reliability layer or an inspectable work-memory workflow across MCP clients.",
      "Wenlan version and framing reflect v0.12.0 on 2026-07-08. Check both project pages for newer releases before deciding.",
    ],
    officialReferences: [
      {
        label: "Superlocal Memory official website",
        href: "https://www.superlocalmemory.com/",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        body: [
          "Superlocal Memory and Wenlan both sit in the local-first AI memory category, but they optimize for different buying questions. Choose Superlocal Memory if its reliability-engineering framing, modes, benchmark positioning, and IDE integration story match your workflow.",
          "Choose Wenlan as the Superlocal Memory alternative when you want local AI work memory centered on sessions, handoffs, source-backed pages, MCP clients, and deliberate page distillation.",
        ],
      },
      {
        heading: "What Superlocal Memory emphasizes",
        body: [
          "Superlocal Memory presents itself as memory for AI reliability engineering, and its current public positioning goes beyond memory retrieval. It now frames the product as a local reliability layer spanning memory, cache, compression, and cost optimization.",
          "The official site and README describe repeat-call caching, prompt compression, provider KV-cache alignment, local-first retrieval, memory modes, IDE integrations, open research, AGPL v3 licensing, and benchmark-oriented claims. Treat the published savings numbers as the project's attributed claims and test them against your own workload.",
        ],
      },
      {
        heading: "What Wenlan emphasizes",
        body: [
          "Wenlan focuses on the loop around real AI work: sessions start, work happens, handoffs are written, memory is distilled, and the next session receives relevant context.",
          "The daemon-owned store powers retrieval, graph context, and hybrid search while Markdown artifacts stay readable and source-backed for inspection.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "If you want a reliability-oriented product with its own memory modes and integration claims, Superlocal Memory may be the natural thing to inspect.",
          "If you want the memory layer to feel like a transparent local record of your work across MCP-compatible tools, Wenlan is the closer fit.",
        ],
      },
      {
        heading: "Reading benchmark numbers honestly",
        body: [
          "Superlocal Memory reports ~74.8% on LoCoMo in their zero-LLM (pure-math) retrieval configuration. Wenlan's current public retrieval snapshot now leads with LongMemEval rows instead of preserving the older LoCoMo headline.",
          "Two things to read alongside it. First, benchmark mix: LongMemEval (LME) is a more recent and more rigorous evaluation, especially for time-aware questions and contradiction handling. Wenlan reports LME_Oracle at 93.6% Recall@5 / 0.857 MRR / 0.883 NDCG@10 on the 500-question snapshot, and LME_S at 87.7% Recall@5 / 0.815 MRR / 0.822 NDCG@10 on the stratified N=90 deep-S retrieval snapshot. I did not find LongMemEval numbers on SuperLocalMemory's official site during the 2026-06-24 source check. The leaderboard story is incomplete without both.",
          "Second, configuration: 'zero-LLM' means retrieval only, no answer generation. Wenlan's published retrieval rows are also retrieval-only, but Wenlan's product is designed to feed memories into an LLM for answer composition, not to be a SOTA retrieval algorithm in isolation. Different products optimize for different downstream tasks.",
          "If LoCoMo top score is the deciding factor for you, rerun the current Wenlan harness against the exact protocol you care about. If the question is 'which tool helps me carry AI work across sessions,' the benchmark is one input, not the answer.",
        ],
      },
      {
        heading: "Where Wenlan focuses instead of leaderboards",
        body: [
          "I picked LME_Oracle and LME_S as Wenlan's primary retrieval surfaces because the workload matches what actually breaks AI sessions: multi-turn conversations with implicit time references, contradictions across turns, references to facts established weeks ago. LoCoMo and LongMemEval stress different failure modes; run both against your workload if benchmark fit matters.",
          "The product gaps I notice in daily use are not retrieval ceiling. They are things like: did the AI capture the decision when I made it, is the wiki page distilled cleanly, can I open `~/.wenlan/pages/auth.md` and read it as prose, can I inspect the source memory IDs and artifact git history, does the same memory show up in Cursor and Claude Code.",
          "Those are workflow features, not benchmark features. Wenlan trades leaderboard simplicity for explicit capture, MCP-first cross-tool reach, projected Markdown, versioned readable artifacts, and mandatory provenance. If those things matter to your work, the trade is worth it. If they do not, look at Superlocal.",
        ],
      },
      {
        heading: "The 10-second inspectability test",
        body: [
          "Try this on any memory layer you are evaluating, including Wenlan. Open the tool. Find one memory the AI stored about you in the last week. Now answer five questions in under 10 seconds: can you see the verbatim text, can you see when it was stored, can you see what generated it, can you see what changes have been made to it since, can you delete it without an admin panel.",
          "Wenlan scores high on this test by design. Raw captures live in the daemon store for retrieval, while readable pages, session logs, and project status live under `~/.wenlan/` and are versioned in `~/.wenlan/.git/`. `wenlan recall <query>` shows matching memory text. Deletion goes through `/forget` or the MCP forget tool by source ID.",
          "Superlocal Memory now publishes source, docs, and research papers as part of its open research positioning. Use those materials to run the same inspection test against its current record format, provenance surface, history, and deletion flow before deciding.",
        ],
        bullets: [
          "Verbatim text visible? `wenlan recall <id>` in Wenlan.",
          "When was it stored? Daemon metadata for captures and git history for projected readable artifacts in Wenlan.",
          "What generated it? Source IDs on distilled pages, mandatory.",
          "Change history? `git log pages/<topic>.md` for projected pages and session artifacts in Wenlan.",
          "Delete without an admin panel? `/forget <id>` or MCP forget by source ID in Wenlan.",
        ],
      },
      {
        heading: "How I would actually evaluate both",
        body: [
          "If I were picking a memory layer from scratch today, I would run a two-week parallel trial. Week one: install both, point an MCP-capable AI client at each, and use them for real work. No synthesized traffic. Real captures only.",
          "End of week one, run three queries against each: 'what did I decide about X last Monday,' 'who did I have a conversation with about Y,' 'what is the current status of Z.' Compare not just accuracy, but readability of the response and traceability of where it came from.",
          "Week two, deliberately try to break each one. Introduce a contradiction by capturing two conflicting facts on consecutive days. Use a different MCP client. Kill the daemon mid-session and restart it. The product that recovers cleanly and surfaces the contradiction is the one I would keep.",
          "I am biased; I built Wenlan. This trial shape will surface real differences faster than reading either product page, including this one.",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Superlocal Memory",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "Local AI work loop: sessions, handoffs, distilled wiki pages, provenance, readable artifacts.",
          competitor:
            "Local AI reliability layer spanning memory, cache, compression, and cost optimization, with benchmark-led positioning.",
        },
        {
          dimension: "Retrieval",
          wenlan: "Hybrid: vector (BGE-Base-EN-v1.5-Q) + FTS5 + reciprocal-rank fusion + knowledge-graph context + CE reranker. LME_Oracle: 93.6% Recall@5, 0.857 MRR, 0.883 NDCG@10. LME_S: 87.7% Recall@5, 0.815 MRR, 0.822 NDCG@10.",
          competitor:
          "Pure-math retrieval emphasized in public materials. Reports ~74.8% on LoCoMo in their zero-LLM configuration; compare against current Wenlan runs only when the fixture and protocol match.",
        },
        {
          dimension: "Human-readable records",
          wenlan: "Markdown projection under ~/.wenlan/, symlinkable into Obsidian; pages and session logs are plain text.",
          competitor:
            "Public source, docs, and papers are available; evaluate whether its current memory records expose the plain-file workflow you want.",
        },
        {
          dimension: "Provenance + audit",
          wenlan: "Mandatory source_memory_ids; daemon returns HTTP 422 on empty source. Low-confidence captures and contradictions surface for review.",
          competitor:
            "Reliability-mode framing with public docs and source. Compare the exact per-memory source, history, and deletion surfaces before choosing.",
        },
        {
          dimension: "Versioning",
          wenlan: "Readable pages, session logs, and project status Markdown get local git history in ~/.wenlan/.git/.",
          competitor:
            "No public commitment to per-write git history.",
        },
        {
          dimension: "License + openness",
          wenlan: "Apache-2.0 daemon, CLI, MCP server. Repo: github.com/7xuanlu/wenlan.",
          competitor:
            "Current official site presents SuperLocalMemory as open research under AGPL v3, with public source code, documentation, and papers.",
        },
      ],
    },
    faqs: [
      {
        question: "Do Wenlan and Superlocal Memory solve the same problem?",
        answer:
          "They overlap around local-first AI work memory and retrieval for coding workflows. The difference is framing: Superlocal Memory emphasizes reliability engineering, Wenlan emphasizes the AI work loop and transparent local records.",
      },
      {
        question: "Why does Wenlan talk about Markdown and indexes?",
        answer:
          "Wenlan keeps human-readable artifacts in Markdown and uses the local libSQL store for retrieval indexes. That makes memory easier to inspect (you can open the file in any editor) while still giving agents fast hybrid search.",
      },
      {
        question: "Why does Wenlan lead with LME_Oracle and LME_S?",
        answer:
          "Because the current eval work distinguishes the 500-question LongMemEval snapshot from deep LME_S, and that distinction matches the product risk better than a single old LoCoMo headline. LME_Oracle publishes 93.6% Recall@5, 0.857 MRR, and 0.883 NDCG@10; LME_S publishes 87.7% Recall@5, 0.815 MRR, and 0.822 NDCG@10 on the stratified N=90 deep-S retrieval snapshot.",
      },
      {
        question: "Is Superlocal Memory open-source?",
        answer:
          "Yes. As of the 2026-06-24 source check, the official SuperLocalMemory site presents it as open source under AGPL v3. Wenlan's daemon, CLI, and MCP server are Apache-2.0 with source on github.com/7xuanlu/wenlan.",
      },
      {
        question: "How often do these numbers get re-run?",
        answer:
          "Wenlan's eval harness lives under `crates/wenlan-core/src/eval/` and runs locally on demand against the same fixtures the published numbers use. Anyone can re-run them. I refresh the published number when a release changes it materially. Last release alignment: v0.12.0 on 2026-07-08.",
      },
    ],
    relatedSlugs: [
      "local-first-ai-memory",
      "markdown-local-index-ai-memory",
      "ai-agent-handoff-loop",
      "wenlan-vs-basic-memory",
      "wenlan-vs-claude-mem",
      "ai-work-memory",
    ],
    cta: {
      heading: "Build memory around the work loop",
      body: "Wenlan keeps AI work context local, inspectable, and available to MCP-compatible tools.",
    },
  },
  {
    slug: "markdown-local-index-ai-memory",
    eyebrow: "Architecture",
    category: "Concepts",
    title: "Why Wenlan Uses Readable Artifacts plus a Local Store",
    description:
      "Wenlan keeps raw captures in a daemon-owned local store and projects readable artifacts, so AI memory stays inspectable and useful.",
    metaTitle: "Readable Artifacts plus Local Store for AI Memory | Wenlan",
    metaDescription:
      "Learn why Wenlan combines a daemon-owned local retrieval store with human-readable artifacts instead of hiding AI memory inside an opaque database.",
    keywords: [
      "readable AI memory",
      "local store AI memory",
      "AI memory database",
      "human-readable AI memory",
      "transparent AI memory",
    ],
    updatedAt,
    author: DEFAULT_AUTHOR,
    readingTime: "5 min read",
    audience: "People who want AI memory they can inspect and trust",
    heroBullets: [
      "Raw captures live in the daemon-owned local store that powers recall.",
      "Readable pages, sessions, and status files are projected under ~/.wenlan for inspection.",
      "This split keeps memory useful to agents without making it opaque to humans.",
    ],
    sections: [
      {
        heading: "The problem with black-box memory",
        body: [
          "A memory layer can become risky when the only record lives inside a database or model profile that users cannot inspect. If the assistant retrieves stale or wrong context, it is hard to know where the mistake came from.",
          "For long-running work, memory needs to be readable by people and searchable by agents.",
        ],
      },
      {
        heading: "Readable artifacts are the projection",
        body: [
          "Wenlan projects pages, session logs, and project status as readable Markdown so people can open them, read them, export them, and reason about them without a special UI.",
          "That does not mean every raw capture is a Markdown file. It means the human-facing artifacts remain inspectable while the daemon keeps the retrieval store authoritative.",
        ],
      },
      {
        heading: "The daemon store powers recall",
        body: [
          "Agents still need fast retrieval. Wenlan uses a local daemon store for captures, vector search, full-text search, graph context, provenance, and other metadata that make memories useful during an AI session.",
          "The store is not a cloud black box. It is local application data, and the pages, sessions, and status artifacts give people a readable view into the work loop.",
        ],
      },
      {
        heading: "Why the split matters",
        body: [
          "The readable-artifact-plus-local-store design gives both sides what they need: humans get inspection and portability, while agents get retrieval speed and context packaging.",
          "That is the basis for Wenlan's trust story. Memory can be powerful without becoming invisible.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why not store everything only in Markdown?",
        answer:
          "Markdown is excellent for human-readable artifacts, but agents need daemon-owned indexes for fast semantic and full-text retrieval. Wenlan uses both.",
      },
      {
        question: "Why not store everything only in a database?",
        answer:
          "A database-only memory layer can become opaque. Wenlan keeps readable artifacts available so people can inspect and correct what AI tools rely on.",
      },
    ],
    relatedSlugs: ["local-first-ai-memory", "wenlan-vs-basic-memory", "ai-work-memory"],
    cta: {
      heading: "Keep memory readable and searchable",
      body: "Wenlan pairs readable artifacts with a local retrieval store so memory stays useful to agents and visible to people.",
    },
  },
  {
    slug: "ai-agent-handoff-loop",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "The AI Agent Handoff Loop: How Work Carries Across Sessions",
    description:
      "A practical model for carrying decisions, lessons, gotchas, and next steps from one AI work session into the next.",
    metaTitle: "AI Agent Handoff Loop | Wenlan",
    metaDescription:
      "Learn how the AI agent handoff loop helps coding agents and AI tools carry decisions, lessons, project context, and next steps across sessions.",
    keywords: [
      "AI agent handoff",
      "AI work sessions",
      "persistent context AI agents",
      "coding agent memory",
      "AI session handoff",
    ],
    updatedAt,
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
          "Between sessions, Wenlan keeps captures, handoffs, related entities, and source-backed pages connected. Manual `/distill` turns repeated context into readable pages, while optional local models or API keys can add background page work.",
        ],
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
    ],
    relatedSlugs: ["claude-code-memory", "mcp-memory-server", "markdown-local-index-ai-memory"],
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
