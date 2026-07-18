import type {
  ComparisonTable,
  LearnArticle,
  LearnArticleCategory,
  OfficialReference,
} from "./articles";

const UPDATED_AT = "2026-06-06";
const AUTHOR = "Qi-Xuan Lu";

type BaseSpec = {
  slug: string;
  eyebrow: string;
  category: LearnArticleCategory;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  updatedAt?: string;
  audience: string;
  heroBullets: [string, string, string];
  quickAnswer: string;
  problem: string;
  wenlanFit: string;
  actionHeading: string;
  actionIntro: string;
  actionBullets: string[];
  code?: {
    label: string;
    code: string;
  };
  caution: string;
  faq: [string, string, string, string];
  relatedSlugs: string[];
  officialReferences?: OfficialReference[];
  comparisonTable?: ComparisonTable;
};

function makeArticle(spec: BaseSpec): LearnArticle {
  return {
    slug: spec.slug,
    eyebrow: spec.eyebrow,
    category: spec.category,
    title: spec.title,
    description: spec.description,
    metaTitle: spec.metaTitle,
    metaDescription: spec.metaDescription,
    keywords: spec.keywords,
    updatedAt: spec.updatedAt ?? UPDATED_AT,
    author: AUTHOR,
    readingTime: "5 min read",
    audience: spec.audience,
    heroBullets: spec.heroBullets,
    sections: [
      {
        heading: "Quick answer",
        body: [spec.quickAnswer, spec.wenlanFit],
      },
      {
        heading: "When this problem appears",
        body: [spec.problem],
      },
      {
        heading: spec.actionHeading,
        body: [spec.actionIntro],
        bullets: spec.actionBullets,
        code: spec.code,
      },
      {
        heading: "What to check next",
        body: [spec.caution],
      },
    ],
    comparisonTable: spec.comparisonTable,
    faqs: [
      {
        question: spec.faq[0],
        answer: spec.faq[1],
      },
      {
        question: spec.faq[2],
        answer: spec.faq[3],
      },
    ],
    relatedSlugs: spec.relatedSlugs,
    officialReferences: spec.officialReferences,
    cta: {
      heading: "Try the local memory loop",
      body: "Install Wenlan, connect your AI client, and verify that capture, recall, and handoff work on your machine.",
    },
  };
}

const setupArticles: BaseSpec[] = [
  {
    slug: "where-wenlan-stores-claude-code-memory",
    eyebrow: "Setup",
    category: "Workflows",
    title: "Where Wenlan Stores Claude Code Memory",
    description:
      "Find the local files Wenlan writes when Claude Code captures memories, handoffs, and distilled pages.",
    metaTitle: "Where Wenlan Stores Claude Code Memory | ~/.wenlan",
    metaDescription:
      "Find Wenlan's local Claude Code memory artifacts under ~/.wenlan: pages, sessions, status files, database symlinks, and git history.",
    keywords: [
      "where does Claude Code store memory",
      "Claude Code memory location",
      "Wenlan memory location",
      "~/.wenlan",
      "Wenlan ~/.wenlan pages",
      "Claude Code local memory",
    ],
    audience: "Claude Code users checking where memory lives on disk",
    heroBullets: [
      "Wenlan writes readable artifacts under ~/.wenlan instead of hiding memory inside a chat profile.",
      "Distilled pages live under ~/.wenlan/pages and session handoffs live under ~/.wenlan/sessions.",
      "Readable pages and session handoffs are versioned in ~/.wenlan/.git.",
    ],
    quickAnswer:
      "Wenlan stores its local runtime and readable artifacts under ~/.wenlan. That is separate from Claude Code's own CLAUDE.md and auto-memory systems: Claude Code runs the plugin and calls MCP tools, while Wenlan's daemon owns the local memory store.",
    problem:
      "This question usually comes up after a user installs the Claude Code plugin and wants to know whether memories are trapped inside Claude Code, stored in the cloud, or written somewhere they can inspect.",
    wenlanFit:
      "Wenlan's answer is deliberately boring: the memory layer is local. Memories live in the daemon database, while pages, handoffs, project status, and local git history are exposed as readable artifacts.",
    actionHeading: "Inspect the local artifacts",
    actionIntro:
      "After setup, use the filesystem and CLI to confirm what Wenlan wrote.",
    actionBullets: [
      "Check ~/.wenlan/pages for distilled Markdown pages.",
      "Check ~/.wenlan/sessions for handoffs and project status.",
      "Check ~/.wenlan/db on macOS or Linux for the convenience symlink to the libSQL store.",
      "Run ~/.wenlan/bin/wenlan status to verify the daemon.",
      "Inspect ~/.wenlan/.git when you need history for readable artifact writes.",
    ],
    code: {
      label: "Local artifact checks",
      code: "ls ~/.wenlan\nls ~/.wenlan/pages\nls ~/.wenlan/sessions\n~/.wenlan/bin/wenlan status\ngit -C ~/.wenlan log --oneline -5",
    },
    caution:
      "Do not edit the database directly. MCP memories live in the daemon DB; distilled pages and session handoffs are the readable projection. Use Wenlan commands and tools for memory writes, review, distill, and delete.",
    faq: [
      "Is Claude Code itself storing the memory?",
      "No. Claude Code runs the plugin and calls MCP tools. Wenlan's local daemon owns the memory store and readable artifacts.",
      "Can I symlink Wenlan pages into Obsidian?",
      "Yes. The Markdown projection under ~/.wenlan/pages is designed to stay readable, so you can link it into another local knowledge tool if that helps your workflow.",
    ],
    relatedSlugs: ["claude-code-memory", "markdown-local-index-ai-memory", "local-git-history-ai-memory"],
    officialReferences: [
      {
        label: "Claude Code memory docs",
        href: "https://code.claude.com/docs/en/memory",
      },
      {
        label: "Wenlan daemon data layout",
        href: "https://github.com/7xuanlu/wenlan/blob/main/crates/wenlan-server/README.md",
      },
    ],
  },
  {
    slug: "how-to-add-memory-to-claude-code",
    eyebrow: "Setup",
    category: "Workflows",
    title: "How to Add Memory to Claude Code",
    description:
      "Install Wenlan's Claude Code plugin, run /setup, and verify a local memory round trip.",
    metaTitle: "How to Add Memory to Claude Code | Wenlan",
    metaDescription:
      "Add local-first AI work memory to Claude Code with the Wenlan plugin, /setup, /brief, /capture, /recall, and /handoff.",
    keywords: [
      "add memory to Claude Code",
      "Claude Code memory plugin",
      "Claude Code persistent memory",
      "Wenlan Claude Code setup",
      "Claude Code MCP memory",
    ],
    audience: "Claude Code users who want persistent project context",
    heroBullets: [
      "Install the Wenlan Claude Code plugin from the marketplace.",
      "Run /setup once to verify the daemon, MCP wiring, and first memory round trip.",
      "Use /brief, /capture, /recall, and /handoff as the daily loop.",
    ],
    quickAnswer:
      "Use the Claude Code plugin path: /plugin marketplace add 7xuanlu/claude-plugins, then /plugin install wenlan@7xuanlu, then /setup. Restart Claude Code once if prompted before running /setup.",
    problem:
      "Claude Code can do substantial work in one session, but the next session starts cold unless the decisions, gotchas, and project state are stored somewhere durable.",
    wenlanFit:
      "Wenlan adds that durable layer without turning Claude Code into a new app. The plugin gives slash commands; the daemon keeps local memory; MCP lets other clients share the same context.",
    actionHeading: "Install and verify",
    actionIntro:
      "Run the plugin setup first, then prove the loop with one harmless capture.",
    actionBullets: [
      "Run /plugin marketplace add 7xuanlu/claude-plugins.",
      "Run /plugin install wenlan@7xuanlu.",
      "Restart Claude Code if it asks, then run /setup and wait for the daemon, MCP, and local memory checks to pass.",
      "Run /capture with one durable project fact, then /recall with a specific query.",
      "End a real work session with /handoff.",
    ],
    code: {
      label: "Claude Code commands",
      code: "/plugin marketplace add 7xuanlu/claude-plugins\n/plugin install wenlan@7xuanlu\n/setup\n/capture Wenlan test: this project uses Wenlan for local AI work memory.\n/recall Wenlan local AI work memory",
    },
    caution:
      "Do not start by capturing full logs or command output. Wenlan works best when each memory is one durable idea with why it matters.",
    faq: [
      "Do I need an API key to add memory to Claude Code?",
      "No for the core local memory loop. Optional model or API-key paths add richer extraction and page refresh work, but setup and daily capture/recall do not start there.",
      "Is MCP-only setup enough for Claude Code?",
      "It can be enough for raw tools, but the plugin is the richer path because it adds slash commands like /brief, /handoff, /distill, and /setup.",
    ],
    relatedSlugs: ["claude-code-memory-command-vs-wenlan", "wenlan-for-claude-code", "claude-code-memory"],
    officialReferences: [
      {
        label: "Wenlan Claude Code plugin",
        href: "https://github.com/7xuanlu/wenlan/tree/main/plugin",
      },
      {
        label: "Wenlan get started docs",
        href: "https://wenlan.app/docs/get-started",
      },
    ],
  },
  {
    slug: "claude-code-memory-command-vs-wenlan",
    eyebrow: "Claude Code",
    category: "Workflows",
    title: "Claude Code /memory vs Wenlan: Native Memory or Shared Local Context?",
    description:
      "Use Claude Code /memory for native project memory inspection, and use Wenlan when context needs provenance, handoff, and cross-tool MCP access.",
    metaTitle: "Claude Code /memory vs Wenlan | Local MCP Memory",
    metaDescription:
      "Understand Claude Code /memory, CLAUDE.md, auto memory, and when Wenlan adds local MCP memory shared with Cursor, Codex, and other tools.",
    keywords: [
      "Claude Code /memory",
      "Claude Code memory command",
      "Claude Code memory vs Wenlan",
      "Claude Code MCP memory",
      "Claude Code shared memory",
    ],
    audience: "Claude Code users deciding whether native memory is enough",
    heroBullets: [
      "Claude Code /memory helps inspect and edit what Claude Code has loaded.",
      "CLAUDE.md and auto memory are the right place for stable project instructions and repeated corrections.",
      "Wenlan is for source-backed, local, cross-tool work memory that should also reach Cursor, Codex, and other MCP clients.",
    ],
    quickAnswer:
      "Start with Claude Code's native memory. Use /memory to inspect loaded memories, CLAUDE.md for stable project instructions, and auto memory for repeated preferences and corrections. Add Wenlan when the memory should become a local, reviewable work layer shared through MCP.",
    problem:
      "This question appears when Claude Code remembers some things but still loses session state, decisions, gotchas, or handoffs that matter outside the current chat. The risk is adding another memory layer before understanding what native Claude Code memory already solves.",
    wenlanFit:
      "Wenlan should not duplicate CLAUDE.md. Wenlan fits the evolving layer: decisions, lessons, gotchas, project status, source-backed pages, and handoffs that need provenance and cross-client recall.",
    actionHeading: "Choose the right memory surface",
    actionIntro:
      "Use the smallest memory surface that solves the job, then add Wenlan when the work needs to outgrow Claude Code's native memory boundary.",
    actionBullets: [
      "Use CLAUDE.md for durable project rules, commands, and conventions.",
      "Use /memory when you need to inspect or edit what Claude Code has loaded.",
      "Use Claude Code auto memory for repeated corrections and preferences Claude discovers.",
      "Use Wenlan /capture for one source-backed decision, gotcha, or project fact that should be searchable later.",
      "Use Wenlan /handoff when the next session or another agent needs current project state.",
      "Use Wenlan MCP setup when Cursor, Codex, Claude Desktop, or another client should share the same local memory.",
    ],
    code: {
      label: "Native first, Wenlan when shared",
      code: "/memory\n# Check CLAUDE.md for stable instructions.\n\n/capture We chose <decision> because <reason>; verify with <command>.\n/handoff",
    },
    caution:
      "Do not copy everything from /memory into Wenlan. Keep Claude Code instructions in Claude Code, and store only durable work context that benefits from provenance, search, handoff, or cross-tool access.",
    faq: [
      "Does Wenlan replace Claude Code /memory?",
      "No. /memory is Claude Code's native inspection and editing surface. Wenlan adds a local work-memory layer for source-backed context and MCP sharing.",
      "When should I use both?",
      "Use both when Claude Code needs its own instructions and your broader AI workflow also needs local, reviewable context across tools.",
    ],
    relatedSlugs: ["claude-code-memory", "how-to-add-memory-to-claude-code", "wenlan-for-claude-code"],
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
        label: "Wenlan Claude Code workflow",
        href: "https://wenlan.app/learn/wenlan-for-claude-code",
      },
    ],
  },
  {
    slug: "how-to-give-codex-persistent-memory",
    eyebrow: "Setup",
    category: "Workflows",
    title: "How to Give Codex Persistent Memory",
    description:
      "Connect Codex to Wenlan through MCP so sessions can recall local project context instead of starting from scratch.",
    metaTitle: "How to Give Codex Persistent Memory | Wenlan",
    metaDescription:
      "Use Wenlan with Codex by installing the local runtime, adding the Codex MCP client config, and verifying context, capture, and recall.",
    keywords: [
      "Codex persistent memory",
      "Codex MCP memory",
      "memory for Codex",
      "Wenlan Codex setup",
      "AI coding agent memory Codex",
    ],
    audience: "Codex users working across repeated coding sessions",
    heroBullets: [
      "Install the Wenlan runtime before configuring Codex as an MCP client.",
      "Run ~/.wenlan/bin/wenlan connect codex to write the client config when supported.",
      "Use MCP context, capture, recall, and doctor tools from Codex.",
    ],
    quickAnswer:
      "Set up Wenlan, then run ~/.wenlan/bin/wenlan connect codex. Restart Codex if its MCP settings require a reload, then verify with doctor or a capture/recall round trip.",
    problem:
      "Codex sessions are useful for implementation work, but project decisions, review lessons, and setup gotchas disappear if they only live in the chat transcript.",
    wenlanFit:
      "Wenlan gives Codex a source-backed wiki and shared local context that complement native Codex memories, AGENTS.md, skills, and MCP. The same Wenlan daemon can also serve other clients.",
    actionHeading: "Connect Codex through MCP",
    actionIntro:
      "Use the direct MCP path below when you want Codex working without a Wenlan source checkout. The Wenlan repository also ships a Codex plugin with the shared slash workflow.",
    actionBullets: [
      "Install the local runtime with the current setup path for your operating system.",
      "Run ~/.wenlan/bin/wenlan connect codex.",
      "Restart Codex if the client does not pick up MCP changes live.",
      "Call the doctor tool or run a small capture/recall test.",
      "Use handoff-like captures at the end of serious Codex sessions.",
    ],
    code: {
      label: "Codex MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect codex",
    },
    caution:
      "The direct MCP path exposes tools such as context and capture. The Codex plugin adds Wenlan slash skills such as /brief and /handoff; do not confuse the two interfaces.",
    faq: [
      "Does Codex share memory with Claude Code in Wenlan?",
      "Yes, when both clients point at the same local Wenlan daemon. The clients differ, but the daemon is the source of truth.",
      "Should I store every Codex transcript?",
      "No. Store the durable parts: decisions, lessons, gotchas, project facts, and handoff context future sessions need.",
    ],
    relatedSlugs: ["mcp-memory-server", "wenlan-codex-workflow", "codex-claude-code-shared-memory"],
    officialReferences: [
      {
        label: "Codex customization docs",
        href: "https://developers.openai.com/codex/concepts/customization",
      },
      {
        label: "OpenAI Docs MCP quickstart",
        href: "https://developers.openai.com/learn/docs-mcp",
      },
    ],
  },
  {
    slug: "how-to-add-mcp-memory-to-cursor",
    eyebrow: "Setup",
    category: "Workflows",
    title: "Cursor Memory MCP: How to Add Local AI Work Memory",
    description:
      "Wire Cursor to Wenlan's local MCP memory server so coding sessions can capture and recall project context.",
    metaTitle: "Cursor Memory MCP Setup | Wenlan",
    metaDescription:
      "Add local-first MCP memory to Cursor with Wenlan setup, wenlan connect cursor, client restart checks, and a capture/recall verification loop.",
    keywords: [
      "Cursor MCP memory",
      "Cursor persistent memory",
      "Cursor AI memory",
      "Cursor memory MCP",
      "Wenlan Cursor setup",
      "MCP memory Cursor",
    ],
    audience: "Cursor users who want local project memory across coding sessions",
    heroBullets: [
      "Wenlan setup installs the local daemon and MCP connector.",
      "wenlan connect cursor writes the Cursor-side MCP configuration when supported.",
      "Cursor can then use Wenlan context, capture, recall, and doctor tools.",
    ],
    quickAnswer:
      "Install Wenlan, then run ~/.wenlan/bin/wenlan connect cursor. Restart Cursor if needed, then verify that Wenlan tools appear and can recall a test capture.",
    problem:
      "Cursor has its own project-scoped Memories and Rules, but those are Cursor-native. The gap appears when you want the same work context available to Claude Code, Codex, Claude Desktop, or another MCP client.",
    wenlanFit:
      "Wenlan keeps durable context in its own local daemon while making it available to Cursor. That keeps the same source-backed context portable to Claude Code, Codex, and other clients later.",
    actionHeading: "Add Cursor as a client",
    actionIntro:
      "Treat Cursor as an MCP client connected to one local Wenlan daemon.",
    actionBullets: [
      "Install the Wenlan runtime once with the current setup path for your operating system.",
      "Run ~/.wenlan/bin/wenlan connect cursor.",
      "The generated Cursor config writes a global ~/.cursor/mcp.json entry.",
      "Restart Cursor if the MCP tools do not appear.",
      "Run the Wenlan doctor tool or a capture/recall round trip.",
      "Capture decisions and handoff context, not raw chat history.",
    ],
    code: {
      label: "Cursor MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect cursor\n~/.wenlan/bin/wenlan doctor",
    },
    caution:
      "If Cursor and another client both write memory, use spaces when contexts should stay separate. Richer distillation and page synthesis may need a configured local model or API-key path.",
    faq: [
      "Can Cursor and Claude Code use the same Wenlan memory?",
      "Yes. The shared daemon is the point: each configured client can read and write the same Wenlan context.",
      "Does Wenlan require Cursor to upload memory to a cloud service?",
      "No. Wenlan's default model is local-first. Optional model or API-key paths are separate choices for richer distillation.",
    ],
    relatedSlugs: ["mcp-memory-server", "wenlan-cursor-workflow", "cursor-claude-code-shared-memory"],
    officialReferences: [
      {
        label: "Cursor MCP docs",
        href: "https://docs.cursor.com/en/context/model-context-protocol",
      },
      {
        label: "Cursor Memories docs",
        href: "https://docs.cursor.com/en/context/memories",
      },
    ],
  },
  {
    slug: "claude-desktop-mcp-memory-setup",
    eyebrow: "Setup",
    category: "Workflows",
    title: "Claude Desktop MCP Memory Setup with Wenlan",
    description:
      "Connect Claude Desktop to Wenlan's local memory daemon through MCP and verify the first memory loop.",
    metaTitle: "Claude Desktop MCP Memory Setup | Wenlan",
    metaDescription:
      "Set up Claude Desktop with Wenlan MCP memory using the local runtime, wenlan connect claude-desktop, and a doctor/capture/recall check.",
    keywords: [
      "Claude Desktop MCP memory",
      "Claude Desktop memory server",
      "Claude Desktop Wenlan setup",
      "MCP memory Claude Desktop",
      "persistent memory Claude Desktop",
    ],
    audience: "Claude Desktop users adding local MCP memory",
    heroBullets: [
      "Use the MCP-only setup path for Claude Desktop on supported local setups.",
      "Wenlan's daemon remains local on your machine.",
      "Verify with doctor, then capture and recall a harmless durable fact.",
    ],
    quickAnswer:
      "On macOS, install Wenlan and run ~/.wenlan/bin/wenlan connect claude-desktop to write the Claude Desktop MCP config. Restart Claude Desktop, then use Wenlan's doctor and capture/recall tools to verify the local daemon connection.",
    problem:
      "Claude Desktop MCP users often add tools one by one, but memory only becomes useful when captures, retrieval, and maintenance all point at the same local store.",
    wenlanFit:
      "Wenlan gives Claude Desktop a local memory server while preserving the same daemon and artifacts used by coding clients. That makes desktop research or planning available to later coding sessions.",
    actionHeading: "Connect Claude Desktop",
    actionIntro:
      "Use the CLI-generated configuration first; use manual config only when a client needs raw JSON.",
    actionBullets: [
      "Install the local runtime with the current setup path for your operating system.",
      "Run ~/.wenlan/bin/wenlan connect claude-desktop.",
      "Use ~/.wenlan/bin/wenlan connect claude-desktop --dry-run if you want to inspect the JSON before writing it.",
      "Restart Claude Desktop after MCP config changes.",
      "Use the Wenlan MCP doctor tool or the wenlan doctor CLI if tools fail to call the daemon.",
      "Recall a known capture before trusting the setup for real work.",
    ],
    code: {
      label: "Claude Desktop MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect claude-desktop\n~/.wenlan/bin/wenlan connect claude-desktop --dry-run",
    },
    caution:
      "Do not expose the local daemon beyond loopback unless you are intentionally doing development or self-hosted networking work. Normal desktop setup should stay local.",
    faq: [
      "Is Claude Desktop the same setup as the Claude Code plugin?",
      "No. Claude Desktop uses MCP-only setup. The Claude Code plugin adds slash commands and /setup on top of MCP.",
      "Can Claude Desktop create distilled pages?",
      "It can call Wenlan MCP tools for page distillation when configured. Richer background extraction and page synthesis require a local model or explicit API-key path; readable pages are still written by the local Wenlan daemon.",
    ],
    relatedSlugs: ["wenlan-claude-desktop-workflow", "mcp-memory-server", "local-first-ai-memory"],
    officialReferences: [
      {
        label: "Claude Desktop local MCP docs",
        href: "https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop",
      },
      {
        label: "Anthropic remote MCP connector docs",
        href: "https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-integrations-using-remote-mcp",
      },
    ],
  },
  {
    slug: "ai-agent-memory-local-vs-cloud",
    eyebrow: "Decision",
    category: "Concepts",
    title: "AI Agent Memory: Local vs Cloud",
    description:
      "Choose between local-first memory and hosted memory based on privacy, portability, collaboration, and operational needs.",
    metaTitle: "AI Agent Memory: Local vs Cloud | Wenlan",
    metaDescription:
      "Compare local-first AI agent memory with hosted memory services and learn when Wenlan's local daemon is the right fit.",
    keywords: [
      "local AI agent memory",
      "cloud AI memory",
      "private AI memory",
      "local-first AI work memory",
      "AI memory privacy",
    ],
    audience: "Developers and teams choosing a memory architecture",
    heroBullets: [
      "Local memory keeps project context on your machine by default.",
      "Cloud memory can simplify multi-device collaboration but changes the trust boundary.",
      "Wenlan optimizes for local control, readable artifacts, and MCP portability.",
    ],
    quickAnswer:
      "Use local-first memory when the context is private, project-specific, or needs human-readable control. Use a hosted memory service when centralized collaboration and managed infrastructure matter more than local ownership.",
    problem:
      "Memory contains the parts of work that matter: decisions, preferences, debugging lessons, client context, and project constraints. The storage boundary is therefore a product decision, not an implementation detail.",
    wenlanFit:
      "Wenlan chooses the local-first side. It keeps the daemon, database, Markdown projection, and git history on your machine unless you opt into external model/API paths for richer maintenance.",
    actionHeading: "Choose the boundary",
    actionIntro:
      "Decide based on the sensitivity and collaboration shape of the work.",
    actionBullets: [
      "Choose local-first for private repos, client work, personal preferences, and inspectable artifacts.",
      "Choose hosted memory when many users need central access with account-level governance.",
      "Use MCP when you want many clients to talk to one memory boundary.",
      "Document what leaves the machine before adding API keys or cloud sync.",
      "Compare backup, export, deletion, offline access, team sharing, and lock-in before deciding.",
    ],
    caution:
      "Local-first keeps Wenlan's memory layer local by default, but connected AI tools may still send prompts and retrieved context to their own model providers. You still need backup, migration, and delete habits if the memory becomes important.",
    faq: [
      "Is local-first memory always better?",
      "No. It is better for control and privacy, but hosted systems may be better for managed team collaboration.",
      "Does Wenlan sync memory to the cloud by default?",
      "No. Wenlan has no cloud sync or telemetry by default. Optional models and API keys are explicit choices.",
    ],
    relatedSlugs: ["local-first-ai-memory", "wenlan-vs-chatgpt-memory", "wenlan-vs-mem0"],
    officialReferences: [
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
  },
  {
    slug: "ai-coding-agent-loses-context",
    eyebrow: "Problem",
    category: "Concepts",
    title: "Why AI Coding Agents Lose Context Between Sessions",
    description:
      "Understand why useful coding context disappears and how a local work-memory loop keeps decisions available.",
    metaTitle: "Why AI Coding Agents Lose Context | Wenlan",
    metaDescription:
      "AI coding agents lose context when work lives only in chat history. Wenlan captures decisions, lessons, handoffs, and project facts locally.",
    keywords: [
      "AI coding agent loses context",
      "Claude Code loses context",
      "Cursor loses context",
      "Codex loses context",
      "AI agent handoff",
    ],
    audience: "Developers frustrated by repeated AI session warmup",
    heroBullets: [
      "Chat history is not a durable work-memory layer.",
      "Important context is usually decisions, lessons, constraints, and open threads.",
      "Wenlan turns session boundaries into brief, capture, recall, and handoff habits.",
    ],
    quickAnswer:
      "AI coding agents lose context when the useful parts of work stay inside a transient conversation or a client-scoped memory system. Wenlan does not treat the full transcript as memory by default; the user or agent captures durable facts in flow, then retrieves them later without replaying the whole chat.",
    problem:
      "The failure shows up as repeated setup explanations, forgotten decisions, stale assumptions, and agents re-debugging problems already solved in a previous session.",
    wenlanFit:
      "Wenlan addresses the session boundary directly. Start with context, capture durable facts during work, and end with a handoff so the next agent can resume from the current state.",
    actionHeading: "Diagnose the context loss",
    actionIntro:
      "Check which layer failed before adding more prompt text.",
    actionBullets: [
      "Session boundary: the previous chat ended and the next agent has no compact handoff.",
      "Compacted context: the model kept a summary, but dropped decision rationale or failed paths.",
      "Client-scoped memory: one tool remembered something that another tool cannot read.",
      "Repo-state mismatch: files show what changed, but not why the tradeoff was chosen.",
      "Noisy transcript recall: the right fact exists in history, but it is buried in logs and chatter.",
      "Wenlan fix: capture durable decisions in flow, use recall for specific history, and write a handoff when work will continue.",
    ],
    caution:
      "Do not treat memory as a transcript archive. More stored text can make retrieval worse if it is not distilled, reviewed, and scoped.",
    faq: [
      "Can a longer context window solve this?",
      "It helps inside one session, but it does not create durable, inspectable, cross-tool memory.",
      "What is the first habit to add?",
      "End real work sessions with a handoff. It is the smallest action that prevents the next session from starting cold.",
    ],
    relatedSlugs: ["ai-agent-handoff-loop", "claude-code-session-handoff", "persistent-project-context-for-ai-agents"],
    officialReferences: [
      {
        label: "Wenlan daily workflow docs",
        href: "https://wenlan.app/docs/daily-workflow",
      },
      {
        label: "Wenlan core concepts docs",
        href: "https://wenlan.app/docs/core-concepts",
      },
      {
        label: "Wenlan MCP clients docs",
        href: "https://wenlan.app/docs/mcp-clients",
      },
    ],
  },
  {
    slug: "persistent-project-context-for-ai-agents",
    eyebrow: "Concept",
    category: "Concepts",
    title: "Persistent Project Context for AI Agents",
    description:
      "Keep project decisions, constraints, and handoffs available across Claude Code, Cursor, Codex, and other AI tools.",
    metaTitle: "Persistent Project Context for AI Agents | Wenlan",
    metaDescription:
      "Learn what persistent project context means for AI agents and how Wenlan keeps decisions, lessons, handoffs, and pages available locally.",
    keywords: [
      "persistent project context",
      "AI agent project context",
      "persistent context AI agents",
      "project memory AI coding",
      "Wenlan project context",
    ],
    audience: "Developers using multiple local AI tools on multi-session projects",
    heroBullets: [
      "Persistent context is more than a saved prompt.",
      "It includes decisions, constraints, gotchas, project status, and source-backed pages.",
      "Wenlan keeps that context local and retrievable through MCP.",
    ],
    quickAnswer:
      "Persistent project context is the durable working state an AI agent needs to continue a project later: what changed, what was decided, what to avoid, and where the source of truth lives.",
    problem:
      "Projects rarely fail because the agent forgot generic programming knowledge. They fail because it forgot local decisions: which tradeoff won, which migration was risky, which command proved the fix, or which feature is out of scope.",
    wenlanFit:
      "Wenlan stores that local work context as memories, session handoffs, project status, and distilled pages. It is not full transcript archival; MCP clients retrieve the relevant pieces instead of forcing the user to paste a project briefing every time.",
    actionHeading: "Capture project context",
    actionIntro:
      "Focus memory on a project context packet a future agent cannot infer cheaply.",
    actionBullets: [
      "Start with /brief in Claude Code or Wenlan context from an MCP client.",
      "Capture decisions and why they were chosen.",
      "Capture gotchas that would waste time if rediscovered.",
      "Capture source-of-truth files, current status, stale facts, and constraints when they are not obvious from the repo.",
      "Use /recall for specific prior decisions instead of asking the model to guess.",
      "Capture project status at session end with /handoff or a handoff-style MCP capture.",
      "Distill repeated clusters into pages when a topic keeps returning.",
    ],
    code: {
      label: "Claude Code daily loop",
      code: "/brief\n/capture <one durable project fact and why it matters>\n/recall <specific prior decision or gotcha>\n/handoff",
    },
    caution:
      "Do not store facts that the repo can read directly unless the important part is the reasoning behind them.",
    faq: [
      "Is persistent project context a README replacement?",
      "No. README files document public or contributor-facing facts. Wenlan carries session-level working context that changes while AI work happens.",
      "Can multiple tools share one project context?",
      "Yes, when they are configured to use the same local Wenlan daemon. That means local cross-tool continuity, not automatic cloud or team sync.",
    ],
    relatedSlugs: ["mcp-memory-server", "ai-agent-project-status-handoff", "source-backed-wiki-pages-ai-work"],
    officialReferences: [
      {
        label: "Wenlan daily workflow docs",
        href: "https://wenlan.app/docs/daily-workflow",
      },
      {
        label: "Wenlan core concepts docs",
        href: "https://wenlan.app/docs/core-concepts",
      },
      {
        label: "Wenlan MCP clients docs",
        href: "https://wenlan.app/docs/mcp-clients",
      },
    ],
  },
  {
    slug: "mcp-memory-server-localhost-7878",
    eyebrow: "Setup",
    category: "Concepts",
    title: "MCP Memory Server on localhost:7878: What to Check",
    description:
      "Understand the local daemon boundary behind Wenlan's MCP memory tools and how to troubleshoot port 7878.",
    metaTitle: "MCP Memory Server on localhost:7878 | Wenlan",
    metaDescription:
      "Debug Wenlan's local MCP memory server on 127.0.0.1:7878: daemon status, wenlan-mcp config, client restart, and doctor checks.",
    keywords: [
      "127.0.0.1 7878 Wenlan",
      "Wenlan daemon port",
      "MCP memory server localhost",
      "MCP server localhost 7878",
      "wenlan-mcp 7878",
      "wenlan-server 7878",
      "Wenlan doctor",
    ],
    audience: "Developers debugging MCP memory setup",
    heroBullets: [
      "The daemon is the local source of truth.",
      "MCP clients talk through wenlan-mcp to reach that daemon.",
      "doctor and status are the first checks when port 7878 fails.",
    ],
    quickAnswer:
      "Wenlan's daemon listens on 127.0.0.1:7878 by default. MCP clients do not talk to the database directly; they launch wenlan-mcp, and wenlan-mcp talks to the local daemon.",
    problem:
      "When MCP memory setup fails, users often see only a missing tool or a connection error. The real issue is usually daemon reachability, MCP configuration, or a client restart requirement.",
    wenlanFit:
      "Wenlan keeps this boundary explicit. The daemon owns storage and retrieval, while Claude Code, Cursor, Codex, and other clients call tools through the MCP connector.",
    actionHeading: "Debug port 7878",
    actionIntro:
      "Check the daemon before changing every client setting.",
    actionBullets: [
      "Run ~/.wenlan/bin/wenlan status.",
      "Run ~/.wenlan/bin/wenlan doctor for a fuller setup report.",
      "Run ~/.wenlan/bin/wenlan connect <client> --dry-run to inspect the wenlan-mcp command the client should launch.",
      "Run lsof -nP -iTCP:7878 -sTCP:LISTEN and identify which process owns the port before changing client settings.",
      "Restart the MCP client after config changes.",
      "Make sure another development daemon is not owning the wrong data directory.",
    ],
    code: {
      label: "Daemon and MCP checks",
      code: "~/.wenlan/bin/wenlan status\n~/.wenlan/bin/wenlan doctor\n~/.wenlan/bin/wenlan connect codex --dry-run\nlsof -nP -iTCP:7878 -sTCP:LISTEN",
    },
    caution:
      "Loopback avoids LAN exposure, but 127.0.0.1:7878 is still sensitive local access to a memory API. Do not bind the daemon to a non-loopback address unless you are intentionally doing development or self-hosted networking, and redact memory contents from diagnostics.",
    faq: [
      "Can I change the daemon port?",
      "Yes for development, but the daemon port, bind address, CLI target, and MCP connector target are separate settings. Non-default ports should update the daemon and connector together, usually with an isolated data dir.",
      "Why not let each MCP client store its own memory?",
      "Because separate stores fragment context. Wenlan uses one daemon so tools share the same source of truth.",
    ],
    relatedSlugs: ["mcp-memory-server", "how-to-give-codex-persistent-memory", "how-to-add-mcp-memory-to-cursor"],
    officialReferences: [
      {
        label: "Wenlan CLI and service docs",
        href: "https://wenlan.app/docs/cli-and-service",
      },
      {
        label: "Wenlan MCP clients docs",
        href: "https://wenlan.app/docs/mcp-clients",
      },
      {
        label: "Wenlan troubleshooting docs",
        href: "https://wenlan.app/docs/troubleshooting",
      },
      {
        label: "Wenlan configuration docs",
        href: "https://wenlan.app/docs/configuration",
      },
      {
        label: "Wenlan security docs",
        href: "https://wenlan.app/docs/security",
      },
    ],
  },
  {
    slug: "what-to-capture-in-ai-work-memory",
    eyebrow: "Capture",
    category: "Concepts",
    title: "What to Capture in AI Work Memory",
    description:
      "Use a simple test for deciding what belongs in Wenlan and what should stay out of memory.",
    metaTitle: "What to Capture in AI Work Memory | Wenlan",
    metaDescription:
      "Capture decisions, lessons, gotchas, preferences, constraints, and durable facts in Wenlan. Skip logs, filler, and facts the repo can derive.",
    keywords: [
      "what to capture in AI memory",
      "AI work memory capture",
      "Wenlan capture",
      "Claude Code capture",
      "memory capture quality",
    ],
    audience: "Wenlan users building better memory habits",
    heroBullets: [
      "Capture one durable idea at a time.",
      "Include why the fact matters for future sessions.",
      "Skip raw logs, filler, and temporary status.",
    ],
    quickAnswer:
      "Capture something when a future AI session would waste time or make a worse decision without it. Good captures are durable, atomic, specific, and include the reason.",
    problem:
      "Most memory systems get noisy when users store everything. AI work memory should not become a junk drawer of transcripts, logs, and temporary todos.",
    wenlanFit:
      "Wenlan's canonical memory types are identity, preference, decision, lesson, gotcha, and fact. Constraints and corrections are still valid capture content, but they usually become one of those types: a project constraint may be a fact or decision, and a correction should name what it supersedes.",
    actionHeading: "Use the capture test",
    actionIntro:
      "Before capturing, ask whether this fact will change a future AI session.",
    actionBullets: [
      "Capture decisions and why the chosen path won.",
      "Capture gotchas that would cause repeated debugging.",
      "Capture corrections when previous memory is stale or wrong.",
      "Capture project constraints that are not obvious from source files.",
      "Skip raw output; capture the durable conclusion, root cause, error signature, or command that proved the fix when future agents need it.",
    ],
    code: {
      label: "Capture examples",
      code: "/capture We chose source-backed pages because summaries need provenance.\n/capture Gotcha: wenlan-mcp must talk to the local daemon on 127.0.0.1:7878.\n/capture Supersedes mem_abc123: Windows setup now uses a Task Scheduler ONLOGON task.\n\nBad: /capture worked on repo\nBetter: /capture Wenlan docs now separate Learn SEO articles from product setup docs because users need different navigation paths.\n\nBad: /capture tests failed\nBetter: /capture Gotcha: pnpm build fails if Learn relatedSlugs point to missing article slugs; run the slug audit before build.",
    },
    caution:
      "If a source file is already the authority, do not duplicate the file into memory. Capture the reasoning or consequence instead.",
    faq: [
      "Should I capture every meeting note or chat summary?",
      "No. Capture the durable decisions, constraints, and follow-ups that should affect future AI work.",
      "What if I captured the wrong thing?",
      "Recall or find the old memory ID, capture a corrected self-contained statement, and name what it supersedes. Use forget only when the old record should not remain.",
    ],
    relatedSlugs: ["persistent-project-context-for-ai-agents", "review-before-trust-ai-memory", "ai-memory-provenance"],
    officialReferences: [
      {
        label: "Wenlan capture quality docs",
        href: "https://wenlan.app/docs/capture-quality",
      },
      {
        label: "Wenlan daily workflow docs",
        href: "https://wenlan.app/docs/daily-workflow",
      },
    ],
  },
];

const workflowArticles: BaseSpec[] = [
  {
    slug: "wenlan-codex-workflow",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Wenlan Workflow for Codex",
    description:
      "Use Wenlan with Codex for session context, durable captures, recall, and cross-tool handoff.",
    metaTitle: "Wenlan Workflow for Codex | Persistent AI Work Memory",
    metaDescription:
      "A practical Wenlan workflow for Codex users: connect MCP, load context, capture decisions, recall project memory, and hand off to future sessions.",
    keywords: [
      "Wenlan Codex workflow",
      "Codex memory workflow",
      "Codex MCP memory",
      "persistent context Codex",
      "Codex handoff",
    ],
    audience: "Codex users who want repeated sessions to compound",
    heroBullets: [
      "Use MCP context at the start of a Codex session.",
      "Capture durable project facts while implementation choices are fresh.",
      "Recall and capture handoff-style context through Wenlan so future Codex or Claude Code sessions can continue.",
    ],
    quickAnswer:
      "In Codex, use Wenlan to load context, capture decisions and gotchas, recall specific prior work, and leave a handoff before ending. The plugin and direct MCP paths reach the same daemon.",
    problem:
      "Codex can inspect a repo, but it cannot infer why prior sessions chose a tradeoff or which external constraint mattered unless that context is recorded.",
    wenlanFit:
      "Wenlan gives Codex a local shared context layer rather than a Codex-only note. Native Codex Memories and AGENTS.md help Codex itself; Wenlan MCP memory is the shared daemon layer that Claude Code, Cursor, and other clients can also use.",
    actionHeading: "Run the Codex loop",
    actionIntro:
      "Keep the loop short enough to use during real work.",
    actionBullets: [
      "Call context when starting a task or switching topics.",
      "Capture decisions, gotchas, and project constraints as atomic memories.",
      "Use recall with project names and failure modes.",
      "Capture a handoff before stopping if work remains open.",
    ],
    caution:
      "Avoid generic captures such as 'worked on repo.' Name the concrete decision, file area, or gotcha that future Codex sessions should know.",
    faq: [
      "Can Codex write the same memory store as Claude Code?",
      "Yes. Both can use the same local daemon when configured.",
      "Does Codex get /brief and /handoff slash commands?",
      "No. Codex uses MCP tools. The slash-command workflow belongs to the Claude Code plugin.",
    ],
    relatedSlugs: ["how-to-give-codex-persistent-memory", "codex-claude-code-shared-memory", "what-to-capture-in-ai-work-memory"],
    officialReferences: [
      {
        label: "Codex Memories docs",
        href: "https://developers.openai.com/codex/memories",
      },
      {
        label: "Codex MCP docs",
        href: "https://developers.openai.com/codex/mcp",
      },
    ],
  },
  {
    slug: "wenlan-cursor-workflow",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Wenlan Workflow for Cursor",
    description:
      "Use Wenlan from Cursor to keep project memory available across edits, branches, and future AI sessions.",
    metaTitle: "Wenlan Workflow for Cursor | Local AI Work Memory",
    metaDescription:
      "A Cursor workflow for Wenlan: connect MCP, load context, capture decisions, recall prior work, and share memory with Claude Code or Codex.",
    keywords: [
      "Wenlan Cursor workflow",
      "Cursor memory workflow",
      "Cursor MCP memory",
      "persistent Cursor context",
      "Cursor AI work memory",
    ],
    audience: "Cursor users working on projects over multiple sessions",
    heroBullets: [
      "Connect Cursor to Wenlan's MCP connector, which talks to the local daemon.",
      "Capture decisions while editing instead of after the context is gone.",
      "Use the same memory from Claude Code or Codex later.",
    ],
    quickAnswer:
      "Use Wenlan in Cursor as a local project-memory companion outside the editor: ask Cursor Agent to use Wenlan context, capture durable changes, recall previous decisions, and keep handoff facts available for other tools.",
    problem:
      "Cursor has native Memories and Rules for Cursor-scoped context. Wenlan's role is different: keep inspectable local work memory available to Cursor, Claude Code, Codex, and other MCP clients through one daemon.",
    wenlanFit:
      "Wenlan fills that gap with a source-backed system outside the editor. Cursor can use the same decisions, pages, and handoffs as other MCP clients.",
    actionHeading: "Use Cursor with a memory habit",
    actionIntro:
      "Add memory at the points where future confusion is likely.",
    actionBullets: [
      "Ask Cursor Agent to use Wenlan context before a meaningful feature or bugfix, approving the MCP tool call if prompted.",
      "Capture why a design path was chosen.",
      "Capture build, CI, or setup gotchas after verifying them.",
      "Recall by feature name, error string, or project decision.",
      "Use spaces if Cursor projects should not share context.",
    ],
    caution:
      "Do not make Wenlan a second task tracker. Store durable context for future agents, not every temporary edit in the current branch.",
    faq: [
      "Why use Wenlan if Cursor can read files?",
      "Cursor-native memory helps inside Cursor. Wenlan keeps inspectable, local, cross-client work memory outside the editor so Claude Code, Codex, and other MCP clients can use the same context.",
      "Can Cursor use distilled pages?",
      "Yes, once pages have been created through Wenlan's distill/page workflow. Cursor can retrieve them through Wenlan MCP.",
    ],
    relatedSlugs: ["how-to-add-mcp-memory-to-cursor", "cursor-claude-code-shared-memory", "mcp-memory-server-localhost-7878"],
    officialReferences: [
      {
        label: "Cursor MCP docs",
        href: "https://cursor.com/docs/mcp",
      },
      {
        label: "Cursor Memories docs",
        href: "https://docs.cursor.com/en/context/memories",
      },
    ],
  },
  {
    slug: "wenlan-claude-desktop-workflow",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Wenlan Workflow for Claude Desktop",
    description:
      "Use Claude Desktop with Wenlan MCP memory for planning, research, and handoff context that later coding agents can reuse.",
    metaTitle: "Wenlan Workflow for Claude Desktop | MCP Memory",
    metaDescription:
      "Claude Desktop can use Wenlan through MCP to capture planning decisions, recall local context, and share memory with coding tools.",
    keywords: [
      "Wenlan Claude Desktop workflow",
      "Claude Desktop memory workflow",
      "Claude Desktop MCP memory",
      "Claude Desktop persistent memory",
      "Wenlan MCP Claude Desktop",
    ],
    audience: "Claude Desktop users who plan or research before coding",
    heroBullets: [
      "Use Claude Desktop for planning while Wenlan stores durable decisions locally.",
      "Capture research outcomes that coding agents should use later.",
      "Recall captured decisions or existing distilled pages instead of asking future sessions to reread everything.",
    ],
    quickAnswer:
      "Claude Desktop works best with Wenlan after it is connected to the same local daemon and relevant space as your coding clients. Capture planning outcomes and project decisions that later coding sessions should inherit.",
    problem:
      "Planning often happens in Claude Desktop, while implementation happens in Claude Code, Cursor, or Codex. Without shared memory, the handoff depends on manual copy-paste.",
    wenlanFit:
      "Wenlan makes planning output available through the local daemon. A later coding agent can recall the same decision record or existing distilled page when it is configured against the same daemon and space.",
    actionHeading: "Capture planning context",
    actionIntro:
      "Use Claude Desktop for high-level reasoning, then save the durable results.",
    actionBullets: [
      "First connect Claude Desktop with npx -y wenlan setup, ~/.wenlan/bin/wenlan connect claude-desktop, a Claude Desktop restart, and doctor/capture/recall verification.",
      "Capture selected plans and rejected alternatives.",
      "Capture constraints that implementation agents must respect.",
      "Distill repeated research into a page when page synthesis is configured and the topic will guide future work.",
      "Recall from the coding client before implementation begins.",
    ],
    caution:
      "Do not capture every paragraph of a planning conversation. Save the outcome, assumptions, and consequences.",
    faq: [
      "Is Claude Desktop required for Wenlan?",
      "No. It is one MCP client path. Wenlan can also serve Claude Code, Cursor, Codex, Gemini CLI, VS Code, and others.",
      "Does Claude Desktop support Wenlan slash commands?",
      "No. Claude Desktop uses MCP tools. Wenlan slash commands like /brief, /handoff, /distill, and /setup are part of the Claude Code plugin workflow.",
    ],
    relatedSlugs: ["claude-desktop-mcp-memory-setup", "persistent-project-context-for-ai-agents", "what-to-capture-in-ai-work-memory"],
    officialReferences: [
      {
        label: "Claude Desktop local MCP docs",
        href: "https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop",
      },
      {
        label: "Anthropic remote MCP connector docs",
        href: "https://support.anthropic.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",
      },
    ],
  },
  {
    slug: "wenlan-gemini-cli-workflow",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Wenlan Workflow for Gemini CLI",
    description:
      "Connect Gemini CLI as an MCP client and use Wenlan for local capture, recall, and handoff-style notes.",
    metaTitle: "Wenlan Workflow for Gemini CLI | MCP Memory",
    metaDescription:
      "Use Wenlan's local MCP path with Gemini CLI for context, capture, recall, and cross-session handoffs.",
    keywords: [
      "Gemini CLI memory",
      "Gemini CLI MCP memory",
      "Wenlan Gemini CLI",
      "persistent memory Gemini CLI",
      "AI CLI memory workflow",
    ],
    audience: "Gemini CLI users adding persistent local memory",
    heroBullets: [
      "Gemini CLI can use the same Wenlan daemon through MCP.",
      "Capture durable facts from command-line work.",
      "Recall context from other Wenlan-connected clients.",
    ],
    quickAnswer:
      "Set up Wenlan, add Gemini CLI as an MCP client, verify with gemini mcp list or /mcp list, and ask Gemini to use the Wenlan MCP tools for context, capture, recall, and doctor checks.",
    problem:
      "CLI sessions are especially easy to lose. A useful command, setup gotcha, or verified diagnosis disappears unless it is captured while the evidence is fresh.",
    wenlanFit:
      "Wenlan keeps those durable lessons in the same local store used by GUI and coding clients, so terminal work can feed later AI sessions.",
    actionHeading: "Use Gemini CLI with Wenlan",
    actionIntro:
      "Treat the CLI as another surface over the same Wenlan daemon.",
    actionBullets: [
      "Run Wenlan setup before adding the client.",
      "Make sure Gemini CLI is installed and on PATH.",
      "Add Gemini CLI with ~/.wenlan/bin/wenlan connect gemini.",
      "Verify with gemini mcp list or /mcp list inside Gemini CLI.",
      "Ask Gemini to use Wenlan MCP tools such as mcp_wenlan_context or mcp_wenlan_capture.",
      "Capture verified setup and debugging lessons.",
      "Recall by command, error string, or project name.",
      "Capture a concise handoff-style note before ending a CLI session that future agents may continue.",
    ],
    code: {
      label: "Gemini CLI MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect gemini\ngemini mcp list",
    },
    caution:
      "Avoid capturing raw terminal output. Store the conclusion and the command that proved it when that matters. Wenlan uses Gemini's user-scope MCP setup; use project-scope or manual Gemini config only for isolated experiments.",
    faq: [
      "Can Gemini CLI share memory with Cursor or Codex?",
      "Yes, if all clients are configured to use the same Wenlan daemon.",
      "What should command-line sessions capture?",
      "Capture verified commands, setup gotchas, environment constraints, and handoff notes that future agents need.",
    ],
    relatedSlugs: ["mcp-memory-server", "mcp-memory-server-localhost-7878", "what-to-capture-in-ai-work-memory"],
    officialReferences: [
      {
        label: "Gemini CLI MCP server docs",
        href: "https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md",
      },
      {
        label: "Gemini CLI configuration docs",
        href: "https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md",
      },
      {
        label: "Wenlan MCP clients docs",
        href: "https://wenlan.app/docs/mcp-clients",
      },
    ],
  },
  {
    slug: "wenlan-vscode-mcp-workflow",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Wenlan Workflow for VS Code MCP Clients",
    description:
      "Use Wenlan as a local memory server from VS Code surfaces that support MCP.",
    metaTitle: "Wenlan Workflow for VS Code MCP Clients | Wenlan",
    metaDescription:
      "Connect VS Code MCP clients to Wenlan and use one source-backed context system for capture, recall, and project handoff.",
    keywords: [
      "VS Code MCP memory",
      "VS Code AI memory",
      "Wenlan VS Code workflow",
      "persistent memory VS Code",
      "MCP memory VS Code",
    ],
    audience: "VS Code users with MCP-compatible AI tools",
    heroBullets: [
      "Wenlan treats VS Code as another MCP client surface.",
      "The daemon remains local and shared with other tools.",
      "Use capture and recall around real project decisions.",
    ],
    quickAnswer:
      "If your VS Code AI surface supports MCP, connect it to Wenlan with the MCP-only setup path and use the same memory loop as other clients.",
    problem:
      "VS Code is often the center of coding work, but the AI context still fragments when terminal sessions, Claude Code runs, and editor chats each remember different things.",
    wenlanFit:
      "Wenlan keeps context in its local daemon instead of any one interface. VS Code can participate without becoming the only place where context exists.",
    actionHeading: "Connect the VS Code surface",
    actionIntro:
      "Use the supported MCP client path rather than hand-editing memory.",
    actionBullets: [
      "Run npx -y wenlan setup.",
      "From the workspace root, run ~/.wenlan/bin/wenlan connect vscode; it writes .vscode/mcp.json with servers.wenlan.",
      "Use ~/.wenlan/bin/wenlan connect vscode --dry-run to preview the workspace config before writing.",
      "In VS Code, confirm MCP server trust, use MCP: List Servers to start or restart the server, and enable/select Wenlan tools in Chat or Agent mode.",
      "Verify with doctor or capture/recall.",
      "Use spaces for separate project buckets.",
    ],
    code: {
      label: "VS Code workspace MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect vscode\n~/.wenlan/bin/wenlan connect vscode --dry-run",
    },
    caution:
      "Client MCP support changes over time. Prefer Wenlan's generated config or dry-run output over copying stale snippets from old docs. VS Code Remote and Dev Containers run MCP servers where configured; install or configure Wenlan in the remote environment or handle localhost forwarding intentionally.",
    faq: [
      "Does Wenlan replace VS Code settings or workspace files?",
      "No. Wenlan adds a memory service that AI clients can call. It does not replace source-controlled project documentation.",
      "Can VS Code memories be inspected later?",
      "Raw captures are inspectable through Wenlan tools. Generated pages and handoffs are readable under ~/.wenlan and versioned locally.",
    ],
    relatedSlugs: ["mcp-memory-server", "persistent-project-context-for-ai-agents", "mcp-memory-server-localhost-7878"],
    officialReferences: [
      {
        label: "VS Code MCP configuration",
        href: "https://code.visualstudio.com/docs/agents/reference/mcp-configuration",
      },
      {
        label: "VS Code MCP server management",
        href: "https://code.visualstudio.com/docs/agent-customization/mcp-servers",
      },
    ],
  },
  {
    slug: "claude-code-session-handoff",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Claude Code Session Handoff with Wenlan",
    description:
      "Close Claude Code sessions with enough context for the next agent to resume without replaying the chat.",
    metaTitle: "Claude Code Session Handoff | Wenlan",
    metaDescription:
      "Use Wenlan /handoff in Claude Code to preserve decisions, lessons, gotchas, open threads, and project status for the next session.",
    keywords: [
      "Claude Code handoff",
      "Claude Code session handoff",
      "Wenlan handoff",
      "AI agent handoff",
      "Claude Code project status",
    ],
    audience: "Claude Code users doing multi-session work",
    heroBullets: [
      "/handoff writes a Markdown session log and updates project status.",
      "Durable decisions, lessons, gotchas, and facts become MCP captures.",
      "/brief reads the handoff-maintained status file before loading Wenlan context.",
    ],
    quickAnswer:
      "Run /handoff before ending meaningful Claude Code work. It writes a Markdown session log, updates project status, and stores durable decisions, lessons, gotchas, and facts as MCP captures.",
    problem:
      "A session can end with working code but no durable explanation. The next agent may repeat old investigation or miss the reason a path was chosen.",
    wenlanFit:
      "Wenlan turns session ending into a concrete artifact boundary. The session log preserves the narrative thread, the status file tracks Active and Backlog work, and granular captures become searchable memory.",
    actionHeading: "Write a useful handoff",
    actionIntro:
      "Keep it action-oriented and grounded in what changed.",
    actionBullets: [
      "Let /handoff preview pending captures from the current session before closing.",
      "Confirm the resolved space so the next session searches the right project context.",
      "Let the skill scan git context since the last handoff when the cwd is a repo.",
      "State the goal and current status.",
      "Capture decisions and why they were made.",
      "Record gotchas or failed paths future agents should avoid.",
      "Name open threads, Active work, Backlog items, and next steps.",
      "Mention files or commands only when they orient the next agent and are not obvious from git.",
      "Start the next session with /brief; it reads the handoff-maintained status file, then loads relevant Wenlan context.",
    ],
    code: {
      label: "What /handoff writes",
      code: "~/.wenlan/sessions/<date>-<slug>.md\n~/.wenlan/sessions/_status/<project>.md\n~/.wenlan/sessions/_status/handoff-<project>.json\nWenlan MCP captures in the daemon DB",
    },
    caution:
      "A handoff is not a victory lap or a full transcript. It should make the next session easier to start.",
    faq: [
      "Should every Claude Code session end with /handoff?",
      "No. Use it for meaningful work that will continue later.",
      "Is this the same as Claude Code resume?",
      "No. Use Claude Code resume or continue when you want the same transcript. Use Wenlan /handoff for durable project status and cross-session or cross-tool context.",
    ],
    relatedSlugs: ["ai-agent-handoff-loop", "wenlan-for-claude-code", "how-to-add-memory-to-claude-code"],
    officialReferences: [
      {
        label: "Wenlan daily workflow docs",
        href: "https://wenlan.app/docs/daily-workflow",
      },
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
      {
        label: "Claude Code sessions docs",
        href: "https://code.claude.com/docs/en/agent-sdk/sessions",
      },
    ],
  },
  {
    slug: "cursor-claude-code-shared-memory",
    updatedAt: "2026-07-17",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "How to Share Memory Between Cursor and Claude Code",
    description:
      "Connect Cursor and Claude Code to one local Wenlan daemon so both tools can recall the same source-backed decisions and handoffs.",
    metaTitle: "Share Memory Between Cursor and Claude Code | Wenlan",
    metaDescription:
      "Connect Cursor through MCP and Claude Code through the Wenlan plugin so both AI coding tools share one local, source-backed memory store.",
    keywords: [
      "Cursor Claude Code shared memory",
      "shared AI coding memory",
      "Claude Code Cursor memory",
      "MCP shared memory",
      "Wenlan shared memory",
    ],
    audience: "Developers switching between Cursor and Claude Code",
    heroBullets: [
      "One local daemon prevents tool-specific memory silos.",
      "Claude Code gets the plugin workflow; Cursor gets MCP tools.",
      "Both can recall the same decisions and handoffs.",
    ],
    quickAnswer:
      "To share memory between Cursor and Claude Code, point both clients at the same Wenlan daemon, data directory, and space. Use the Claude Code plugin and Cursor's Wenlan MCP connection; a capture in either tool can then be recalled from the other.",
    problem:
      "Many developers plan in one tool and edit in another. If each tool has separate memory, the user becomes the synchronization layer.",
    wenlanFit:
      "Wenlan makes the daemon the shared boundary. The interface changes by client, but memory, pages, spaces, and git history stay in one local place.",
    actionHeading: "Set up both clients",
    actionIntro:
      "Use the richest path for each client while keeping one daemon.",
    actionBullets: [
      "Install the Claude Code plugin and run /setup.",
      "After /setup succeeds, run ~/.wenlan/bin/wenlan connect cursor, or wenlan connect cursor if ~/.wenlan/bin is on PATH.",
      "Verify capture in one client and recall in the other with the same daemon, data dir, and space.",
      "Use the same space for the same project; Cursor should pass the same space in Wenlan MCP calls or lock WENLAN_SPACE in ~/.cursor/mcp.json.",
      "Use /handoff in Claude Code when ending work that Cursor will continue.",
    ],
    code: {
      label: "Cursor and Claude Code smoke test",
      code: "/setup\n~/.wenlan/bin/wenlan connect cursor\n# Capture a harmless fact in Cursor with the same Wenlan space.\n# Recall that fact from Claude Code with /recall.\n# Then capture in Claude Code and recall from Cursor.",
    },
    caution:
      "If the tools appear to disagree, check space selection, daemon URL, and data directory before assuming memory is missing. The prebuilt runtime supports macOS, Linux glibc, and Windows; Claude Code on Windows may involve WSL or Git Bash caveats.",
    faq: [
      "Can Cursor read a Claude Code handoff?",
      "Yes, through Wenlan's local daemon and retrieval tools when both clients share the same store.",
      "Do I need to duplicate captures in both tools?",
      "No. Capture once in the right space; later clients can recall it.",
    ],
    relatedSlugs: ["how-to-add-mcp-memory-to-cursor", "how-to-add-memory-to-claude-code", "claude-code-session-handoff"],
    officialReferences: [
      {
        label: "Cursor MCP docs",
        href: "https://docs.cursor.com/context/model-context-protocol",
      },
      {
        label: "Claude Code plugins docs",
        href: "https://code.claude.com/docs/en/plugins",
      },
      {
        label: "Claude Code MCP docs",
        href: "https://code.claude.com/docs/en/mcp",
      },
    ],
  },
  {
    slug: "codex-claude-code-shared-memory",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "Shared Memory Between Codex and Claude Code",
    description:
      "Use Wenlan to carry implementation context between Codex sessions and Claude Code plugin workflows.",
    metaTitle: "Shared Memory Between Codex and Claude Code | Wenlan",
    metaDescription:
      "Wenlan lets Codex and Claude Code share one local, source-backed system for decisions, gotchas, handoffs, and project context.",
    keywords: [
      "Codex Claude Code shared memory",
      "Codex Claude Code handoff",
      "shared memory AI coding agents",
      "Wenlan Codex Claude Code",
      "MCP shared memory Codex",
    ],
    audience: "Developers using both Codex and Claude Code",
    heroBullets: [
      "Codex connects through MCP-only setup.",
      "Claude Code gets plugin commands and the same daemon.",
      "Handoffs make cross-tool continuation explicit.",
    ],
    quickAnswer:
      "Use Wenlan as the shared store: configure Codex through MCP, configure Claude Code through the plugin, and verify that a capture from one can be recalled from the other with the same daemon, data dir, and space.",
    problem:
      "Codex may handle one coding pass while Claude Code handles another. Codex native Memories and AGENTS.md still help Codex itself, but they do not automatically become Claude Code memory.",
    wenlanFit:
      "Wenlan keeps decisions, lessons, pages, and handoffs independent of the tool that produced them. That lets Codex and Claude Code participate in one work history.",
    actionHeading: "Verify cross-tool memory",
    actionIntro:
      "Do a small round trip before trusting the workflow.",
    actionBullets: [
      "Set up Wenlan once.",
      "Add Codex with ~/.wenlan/bin/wenlan connect codex.",
      "Install the Claude Code plugin with /plugin marketplace add 7xuanlu/claude-plugins, /plugin install wenlan@7xuanlu, then /setup.",
      "Capture a harmless project fact in Codex with space X.",
      "Recall that fact from Claude Code with the same space.",
      "Reverse the smoke test: capture in Claude Code, then recall from Codex.",
    ],
    code: {
      label: "Codex and Claude Code smoke test",
      code: "~/.wenlan/bin/wenlan connect codex\n/plugin marketplace add 7xuanlu/claude-plugins\n/plugin install wenlan@7xuanlu\n/setup\n# Use the same Wenlan space for both clients during capture and recall.",
    },
    caution:
      "Do not use different daemons, data directories, or spaces unless you intentionally want isolated memory stores. MCP-only Claude Code is tools-only; the plugin path is what provides /setup, /brief, and /handoff.",
    faq: [
      "Which tool should write handoffs?",
      "Use the tool ending the work. In Claude Code, /handoff is the easiest path; in Codex, capture a handoff-style memory.",
      "Can both tools write at the same time?",
      "They can use the same daemon, but keep captures atomic and scoped so review remains clear.",
    ],
    relatedSlugs: ["how-to-give-codex-persistent-memory", "how-to-add-memory-to-claude-code", "wenlan-codex-workflow"],
    officialReferences: [
      {
        label: "Codex MCP docs",
        href: "https://developers.openai.com/codex/mcp",
      },
      {
        label: "Codex Memories docs",
        href: "https://developers.openai.com/codex/memories",
      },
      {
        label: "Wenlan Claude Code plugin",
        href: "https://github.com/7xuanlu/wenlan/tree/main/plugin",
      },
    ],
  },
  {
    slug: "multi-agent-memory-workflow",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "A Multi-Agent Memory Workflow That Stays Local",
    description:
      "Coordinate multiple AI clients through one local, source-backed Wenlan system without turning project context into a cloud black box.",
    metaTitle: "Multi-Agent Memory Workflow That Stays Local | Wenlan",
    metaDescription:
      "Use Wenlan's daemon, MCP tools, spaces, capture, recall, handoff, and distill to coordinate multi-agent AI work locally.",
    keywords: [
      "multi-agent memory workflow",
      "local multi-agent memory",
      "AI agents shared memory",
      "MCP multi-agent memory",
      "Wenlan multi-agent workflow",
    ],
    audience: "Builders using several AI tools on the same body of work",
    heroBullets: [
      "Shared memory needs the same daemon, data directory, and active space.",
      "Use agent profiles and spaces to keep source and context visible.",
      "Distill repeated work into pages instead of growing a pile of raw memories.",
    ],
    quickAnswer:
      "A practical multi-agent memory workflow only works when every client is intentionally pointed at the same daemon, data directory, and active space, with source-agent attribution visible.",
    problem:
      "Multi-agent workflows become fragile when each agent writes its own private scratchpad. The user then has to reconcile conflicting state by hand.",
    wenlanFit:
      "Wenlan makes the daemon the shared local store. Agents can write captures, recall context, and read distilled pages while source attribution and review keep trust visible.",
    actionHeading: "Keep coordination simple",
    actionIntro:
      "Do not invent a complex protocol before the memory loop works.",
    actionBullets: [
      "Connect each MCP client to the same daemon and data directory for shared work.",
      "Use the same active space for collaborating agents; use separate spaces only when you intentionally want isolation.",
      "Capture decisions and lessons, not every intermediate thought.",
      "Use handoffs when one agent's output becomes another agent's starting point.",
      "Distill repeated topics into pages.",
    ],
    caution:
      "Shared memory is not automatic truth. Review contradictions and stale context before letting old records steer important work.",
    faq: [
      "Does Wenlan assign tasks to agents?",
      "No. Wenlan captures, refines, and recalls source-backed context. Your agent workflow decides task assignment.",
      "How do I avoid cross-project leakage?",
      "Use spaces intentionally. Run wenlan doctor from the terminal to inspect resolver state, then verify with a same-space capture/recall round trip.",
    ],
    relatedSlugs: ["codex-claude-code-shared-memory", "mcp-memory-server", "review-before-trust-ai-memory"],
    officialReferences: [
      {
        label: "Wenlan MCP clients docs",
        href: "https://wenlan.app/docs/mcp-clients",
      },
      {
        label: "Wenlan spaces docs",
        href: "https://wenlan.app/docs/spaces",
      },
      {
        label: "Wenlan agent profiles docs",
        href: "https://wenlan.app/docs/agent-profiles",
      },
    ],
  },
  {
    slug: "ai-agent-project-status-handoff",
    eyebrow: "Workflow",
    category: "Workflows",
    title: "AI Agent Project Status Handoff",
    description:
      "Keep project status usable for the next AI session without bloating memory with transient todos.",
    metaTitle: "AI Agent Project Status Handoff | Wenlan",
    metaDescription:
      "Use Wenlan handoffs and captures to preserve project status, open threads, decisions, and next steps for future AI agents.",
    keywords: [
      "AI agent project status",
      "AI project handoff",
      "AI session status",
      "Wenlan project status",
      "handoff for AI agents",
    ],
    audience: "Users who want AI sessions to resume work cleanly",
    heroBullets: [
      "Project status is the live ledger that /brief reads before memory context.",
      "Active and Backlog keep next moves separate from parked work.",
      "Session logs, status files, and durable captures each do different jobs.",
    ],
    quickAnswer:
      "A project status handoff is the per-project status file maintained by /handoff: Last session, Active work, Backlog, blockers, open questions, and the next useful action.",
    problem:
      "Without a status handoff, the next AI session spends its first minutes asking what happened, scanning files, or repeating old checks.",
    wenlanFit:
      "Wenlan's handoff loop writes a session log, updates the per-project status md/json files, and stores durable captures. /brief reads the status file first as the authoritative what-next ledger before loading MCP context.",
    actionHeading: "Write status for the next agent",
    actionIntro:
      "Focus on resumption, not narration.",
    actionBullets: [
      "State the current goal.",
      "List completed changes, decisions made, and verified outcomes.",
      "Name blockers or unresolved questions.",
      "Keep fresh next-move candidates in Active and older parked work in Backlog.",
      "Demote stale Active items when they have not been touched recently; promote Backlog items only when work resumes.",
      "Point to relevant files, commands, or docs only when useful.",
      "Flag stale memory drift; capture the durable correction only when it should survive future sessions.",
    ],
    code: {
      label: "Status file shape",
      code: "# <Project> - Current Status\n\n## Last session (<date>)\n- <accomplished bullet>\n\n## Active\n- <fresh next-move candidate> (added <YYYY-MM-DD>)\n- <blocked item> (added <YYYY-MM-DD>) (gated: <trigger>)\n\n## Backlog\n- <older parked item> (added <YYYY-MM-DD>)",
    },
    caution:
      "Temporary todos belong in task tools. Wenlan should keep the durable status that matters when the chat is gone.",
    faq: [
      "Should project status include test output?",
      "Only summarize the verified result and command. Do not store long logs.",
      "How often should I write a status handoff?",
      "After meaningful work that another session may continue.",
    ],
    relatedSlugs: ["claude-code-session-handoff", "what-to-capture-in-ai-work-memory", "persistent-project-context-for-ai-agents"],
    officialReferences: [
      {
        label: "Wenlan daily workflow docs",
        href: "https://wenlan.app/docs/daily-workflow",
      },
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
  },
];

const comparisonArticles: BaseSpec[] = [
  {
    slug: "wenlan-vs-mcp-memory-service",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs mcp-memory-service: Local AI Work Memory or Agent Pipeline Backend?",
    description:
      "Compare Wenlan with mcp-memory-service across user workflow, transports, storage control, and agent-pipeline scope.",
    metaTitle: "Wenlan vs mcp-memory-service | AI Memory Comparison",
    metaDescription:
      "Wenlan focuses on local AI work memory for users. mcp-memory-service is a broad self-hosted memory service for MCP, HTTP, and agent workflows.",
    keywords: [
      "Wenlan vs mcp-memory-service",
      "mcp-memory-service alternative",
      "MCP memory service comparison",
      "local AI work memory comparison",
      "agent pipeline memory",
    ],
    audience: "Developers comparing MCP-native memory tools",
    heroBullets: [
      "Wenlan is a user-facing, source-backed LLM wiki for AI work.",
      "mcp-memory-service is a broad self-hosted service with REST, MCP, dashboard, OAuth, remote/browser scenarios, and agent-framework scope.",
      "Choose based on whether your primary job is daily AI work continuity or backend memory infrastructure.",
    ],
    quickAnswer:
      "Choose Wenlan when you want local memory for your own AI work loop: capture, recall, handoff, pages, git history, and MCP clients. Choose mcp-memory-service when you want a self-hosted memory service for agent frameworks, HTTP clients, MCP tool users, remote/browser scenarios, and broader service operations.",
    problem:
      "Both tools speak to persistent memory, but their center of gravity is different. Confusing them leads to the wrong setup: a personal work loop may take on operational overhead it does not need, while an agent backend may need transports Wenlan does not optimize for.",
    wenlanFit:
      "Wenlan is deliberately not a memory infrastructure SDK. It is for people using AI daily who want local, inspectable, source-backed work context across tools.",
    actionHeading: "Choose by operating model",
    actionIntro:
      "Ask what you are trying to run.",
    actionBullets: [
      "Choose Wenlan for Claude Code slash workflows, local handoffs, spaces, git history, and readable pages.",
      "Choose mcp-memory-service for agent-framework backend needs, HTTP clients, web dashboards, OAuth, remote MCP, and browser/remote-client scenarios.",
      "Compare setup complexity against the actual job.",
      "Run a two-week trial with real captures instead of judging from feature checklists.",
    ],
    caution:
      "This comparison uses public project descriptions. Check the upstream repositories before relying on details that may change quickly.",
    faq: [
      "Is mcp-memory-service a direct Wenlan replacement?",
      "Not exactly. It overlaps on persistent memory, but it is more backend/service oriented while Wenlan is centered on local AI work continuity.",
      "Can both be useful?",
      "Yes. A team could use a backend memory service for agent infrastructure and still prefer Wenlan for personal local AI work sessions.",
    ],
    relatedSlugs: ["mcp-memory-server", "multi-agent-memory-workflow", "project-scope-ai-memory"],
    officialReferences: [
      {
        label: "mcp-memory-service GitHub repository",
        href: "https://github.com/doobidoo/mcp-memory-service",
      },
      {
        label: "Wenlan MCP clients docs",
        href: "https://wenlan.app/docs/mcp-clients",
      },
      {
        label: "Wenlan HTTP API docs",
        href: "https://wenlan.app/docs/http-api",
      },
      {
        label: "Wenlan project scope docs",
        href: "https://wenlan.app/docs/project-scope",
      },
    ],
    comparisonTable: {
      competitorName: "mcp-memory-service",
      rows: [
        {
          dimension: "Primary user",
          wenlan: "Individual AI power users and developers carrying work context across sessions.",
          competitor: "Builders operating a self-hosted memory service for agents, MCP clients, HTTP clients, and remote/browser use.",
        },
        {
          dimension: "Workflow surface",
          wenlan: "Claude Code plugin, MCP clients, CLI, handoff loop, pages, spaces.",
          competitor: "REST API, MCP, CLI, dashboard, OAuth, and framework-oriented integrations.",
        },
        {
          dimension: "API surface",
          wenlan: "Local daemon HTTP API on 127.0.0.1:7878 for CLI, MCP, desktop, and local scripts; not positioned as a hosted SDK surface.",
          competitor: "REST and MCP are first-class integration surfaces for agent and app backends.",
        },
        {
          dimension: "Artifacts and indexes",
          wenlan: "Readable Markdown pages, session logs, source trails, local git history, and local DB indexes.",
          competitor: "Service-managed records, tags, graph, dashboard, and APIs.",
        },
        {
          dimension: "Best fit",
          wenlan: "Personal or project AI work memory that should stay local and inspectable.",
          competitor: "Shared agent infrastructure where service operations are expected.",
        },
      ],
    },
  },
  {
    slug: "wenlan-vs-chatgpt-memory",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs ChatGPT Memory: Built-In Personalization or Local AI Work Memory?",
    description:
      "Compare built-in assistant memory with Wenlan's local, inspectable, cross-tool work-memory layer.",
    metaTitle: "Wenlan vs ChatGPT Memory | Local AI Work Memory",
    metaDescription:
      "ChatGPT memory can personalize one assistant. Wenlan keeps AI work memory local, source-backed, inspectable, and usable across MCP clients.",
    keywords: [
      "Wenlan vs ChatGPT memory",
      "ChatGPT memory alternative",
      "local alternative to ChatGPT memory",
      "AI work memory vs assistant memory",
      "cross tool AI memory",
    ],
    audience: "Users deciding between built-in assistant memory and local work memory",
    heroBullets: [
      "Built-in memory is convenient for ChatGPT-scoped personalization.",
      "Wenlan is for durable work context across tools and sessions.",
      "Local artifacts, provenance, and git history make the memory inspectable.",
    ],
    quickAnswer:
      "Use ChatGPT memory for personalization inside ChatGPT: saved memories, reference chat history, memory summary and sources, and optional personalization from files or connected apps where available. Use Wenlan when work context needs to be local, inspectable, source-backed, and available to Claude Code, Cursor, Codex, Claude Desktop, and other MCP clients.",
    problem:
      "Built-in memory can help an assistant remember preferences, but serious work often needs traceability: where did this fact come from, when did it change, and which tools should be allowed to use it?",
    wenlanFit:
      "Wenlan treats memory as a local work artifact managed by the local daemon, not as state managed inside ChatGPT's UI. That makes it better suited for source-backed project decisions, handoffs, wiki pages, and multi-tool AI work.",
    actionHeading: "Pick the memory boundary",
    actionIntro:
      "Use the tool that matches the risk and portability of the context.",
    actionBullets: [
      "Use built-in memory for simple assistant preferences.",
      "Use ChatGPT memory when past chats, saved memories, memory summary/sources, or connected-app personalization should improve ChatGPT itself.",
      "Use Wenlan for project decisions, gotchas, client context, and handoffs.",
      "Use Wenlan when multiple AI clients should share context.",
      "Use Wenlan when you need local files and provenance.",
    ],
    caution:
      "Do not put sensitive project context into any memory system without understanding where it is stored, how to delete it, and which tools can retrieve it. For ChatGPT, turning Memory off does not delete existing saved memories, deleting a chat does not remove saved memories, and full cleanup may require deleting saved memories plus source chats, files, or connected-app sources. OpenAI says deleted saved-memory logs may be retained for up to 30 days, and content may be used for model improvement when that setting applies.",
    faq: [
      "Does Wenlan replace built-in assistant memory?",
      "It can replace parts of the work-memory use case, but built-in memory may still be useful for lightweight personalization inside one assistant.",
      "Why not just paste project context each time?",
      "Manual paste works for occasional chats. It breaks down when work spans weeks, tools, and repeated sessions.",
    ],
    relatedSlugs: ["ai-work-memory", "ai-memory-provenance", "ai-agent-memory-local-vs-cloud"],
    officialReferences: [
      {
        label: "OpenAI ChatGPT Memory help",
        href: "https://help.openai.com/en/articles/8590148-memory-faq",
      },
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
      {
        label: "Wenlan core concepts docs",
        href: "https://wenlan.app/docs/core-concepts",
      },
      {
        label: "Wenlan security docs",
        href: "https://wenlan.app/docs/security",
      },
    ],
    comparisonTable: {
      competitorName: "ChatGPT memory",
      rows: [
        {
          dimension: "Scope",
          wenlan: "Local AI work memory across MCP-compatible tools.",
          competitor: "Built-in memory and saved context inside ChatGPT.",
        },
        {
          dimension: "Inspectability",
          wenlan: "Readable local artifacts, source-backed pages, and git history.",
          competitor: "Managed through product UI and account settings.",
        },
        {
          dimension: "Best fit",
          wenlan: "Project decisions, handoffs, local context, and cross-tool reuse.",
          competitor: "Personalization and continuity inside ChatGPT using past chats, saved memories, and supported file or connected-app sources.",
        },
        {
          dimension: "Control boundary",
          wenlan: "Local daemon and ~/.wenlan artifacts by default.",
          competitor: "Hosted product memory controlled through account settings.",
        },
      ],
    },
  },
  {
    slug: "wenlan-vs-obsidian-ai-memory",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs Obsidian AI Memory: Vaults, MCP Bridges, and Agent Work Context",
    description:
      "Compare Wenlan with Obsidian, obsidian-mind, claude-obsidian, Claudian, and Obsidian MCP projects for AI agent memory.",
    metaTitle: "Wenlan vs Obsidian AI Memory | Wenlan",
    metaDescription:
      "Compare Wenlan with Obsidian vault workflows, obsidian-mind, claude-obsidian, Claudian, and Obsidian MCP bridges for AI work memory.",
    keywords: [
      "Wenlan vs Obsidian",
      "Obsidian AI memory",
      "Obsidian mind",
      "obsidian-mind",
      "claude-obsidian",
      "Claude Obsidian memory",
      "Obsidian MCP",
      "Obsidian MCP tools",
      "AI memory Obsidian",
      "Markdown AI memory",
      "Obsidian alternative AI agents",
    ],
    audience: "Obsidian users evaluating AI-agent memory workflows",
    heroBullets: [
      "Obsidian is still strongest as a human-readable Markdown vault and thinking surface.",
      "Credible Obsidian AI projects now add Claude Code, Codex, MCP, and agent workflows around that vault.",
      "Wenlan is different: a daemon-owned AI work loop that projects readable Markdown while keeping retrieval, review, and handoff semantics outside the vault UI.",
    ],
    quickAnswer:
      "Use Obsidian-centered projects when your vault is already the operating system for notes, writing, and PKM. Use Wenlan when AI agents need a shared local work-memory loop with capture, recall, review, distillation, provenance, and handoff across Claude Code, Codex, Cursor, Gemini CLI, and other MCP-compatible tools.",
    problem:
      "Obsidian AI projects solve real problems: letting agents read a vault, write notes, run inside Obsidian, or expose vault operations over MCP. The remaining question is whether the vault should be the memory system itself, or whether the vault should stay a readable projection while a local daemon owns indexing, review states, provenance, and work-session handoffs.",
    wenlanFit:
      "Wenlan complements rather than replaces a Markdown vault. It projects readable pages and sessions under ~/.wenlan, so Obsidian can inspect them, while the daemon keeps the retrieval store, MCP tools, manual distillation, and trust workflow that agents use during work.",
    actionHeading: "Use both intentionally",
    actionIntro:
      "Separate the human knowledge surface from the agent memory runtime.",
    actionBullets: [
      "Use Obsidian for deliberate notes, writing, and personal wiki workflows.",
      "Use Obsidian-centered AI projects when the job is vault automation, note creation, or in-Obsidian agent collaboration.",
      "Use Wenlan for capture, recall, handoff, distill, spaces, source-backed wiki pages, and shared local memory across multiple AI clients.",
      "Symlink or read Wenlan Markdown pages from Obsidian if useful.",
      "Do not expect Obsidian core alone to provide review queues, provenance, handoff rituals, or cross-client memory semantics.",
      "Evaluate Obsidian integrations by what they own: vault access, agent UI, MCP transport, semantic search, or durable memory policy.",
    ],
    caution:
      "If a human-authored note is the source of truth, keep it in the vault. Capture the AI-work consequence in Wenlan when it should guide future sessions, show up in handoff, or be available outside Obsidian.",
    faq: [
      "Is Wenlan an Obsidian replacement or an obsidian-mind alternative?",
      "No. Wenlan is not trying to replace Obsidian as a note app. It is an AI work-memory runtime that can coexist with Obsidian and with vault-centered projects such as obsidian-mind or claude-obsidian.",
      "Can Wenlan pages be used from Obsidian?",
      "Yes. Distilled pages and session artifacts are projected as readable Markdown under ~/.wenlan, so you can inspect them directly or link them into an Obsidian workflow.",
    ],
    relatedSlugs: ["markdown-local-index-ai-memory", "source-backed-wiki-pages-ai-work", "ai-work-memory-vs-knowledge-base"],
    officialReferences: [
      {
        label: "Obsidian official site",
        href: "https://obsidian.md/",
      },
      {
        label: "Obsidian data storage docs",
        href: "https://obsidian.md/help/data-storage",
      },
      {
        label: "Obsidian plugins docs",
        href: "https://obsidian.md/help/plugins",
      },
      {
        label: "obsidian-mind GitHub",
        href: "https://github.com/breferrari/obsidian-mind",
      },
      {
        label: "claude-obsidian GitHub",
        href: "https://github.com/AgriciDaniel/claude-obsidian",
      },
      {
        label: "Claudian GitHub",
        href: "https://github.com/YishenTu/claudian",
      },
      {
        label: "Obsidian Agent Client GitHub",
        href: "https://github.com/RAIT-09/obsidian-agent-client",
      },
      {
        label: "obsidian-mcp-tools GitHub",
        href: "https://github.com/jacksteamdev/obsidian-mcp-tools",
      },
      {
        label: "obsidian-claude-code-mcp GitHub",
        href: "https://github.com/iansinnott/obsidian-claude-code-mcp",
      },
      {
        label: "Wenlan core concepts docs",
        href: "https://wenlan.app/docs/core-concepts",
      },
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    comparisonTable: {
      competitorName: "Obsidian + AI projects",
      rows: [
        {
          dimension: "Center of gravity",
          wenlan: "Local daemon and MCP tools own agent memory behavior; Markdown is a readable projection.",
          competitor: "Obsidian vault often remains the source of truth, UI, and collaboration surface.",
        },
        {
          dimension: "Credible project types",
          wenlan: "One local memory loop for capture, recall, review, distill, handoff, and provenance across clients.",
          competitor: "Vault templates such as obsidian-mind and claude-obsidian; plugins such as Claudian and Obsidian Agent Client; MCP bridges such as obsidian-mcp-tools and obsidian-claude-code-mcp.",
        },
        {
          dimension: "Agent memory mechanics",
          wenlan: "Capture, recall, review, distill, handoff, spaces, provenance.",
          competitor: "Depends on the project: vault access, note creation, in-vault agent UI, MCP transport, semantic search, or command packs.",
        },
        {
          dimension: "Best fit",
          wenlan: "AI work that should compound across Claude Code, Codex, Cursor, Gemini CLI, and future MCP clients.",
          competitor: "Teams or individuals whose Obsidian vault is already the operating system for notes, research, and writing.",
        },
        {
          dimension: "Main tradeoff",
          wenlan: "Less dependent on Obsidian as the primary UI; more opinionated about memory lifecycle and trust.",
          competitor: "More native to an existing vault; memory semantics vary by plugin, template, or MCP server.",
        },
      ],
    },
  },
  {
    slug: "wenlan-vs-notion-ai",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs Notion AI: Local AI Work Memory or Team Workspace AI?",
    description:
      "Compare Wenlan's local AI work memory with Notion AI's workspace, agents, meetings, and enterprise search features.",
    metaTitle: "Wenlan vs Notion AI | Local AI Work Memory",
    metaDescription:
      "Notion AI works from hosted workspace content and Notion MCP. Wenlan stores the AI work memory layer locally by default for MCP clients.",
    keywords: [
      "Wenlan vs Notion AI",
      "Notion AI memory alternative",
      "local AI work memory",
      "Notion AI agents comparison",
      "AI workspace memory",
    ],
    audience: "Teams and builders comparing workspace AI with local agent memory",
    heroBullets: [
      "Notion AI is built around the Notion workspace.",
      "Wenlan is built around local AI work context across tools.",
      "The right choice depends on whether the source of truth is a team workspace or your local agent workflow.",
    ],
    quickAnswer:
      "Use Notion AI when your work lives in Notion and you need workspace agents, AI Meeting Notes, enterprise search, hosted Notion MCP, and team governance. Use Wenlan when the memory layer should be stored locally by default and move across coding agents and MCP clients.",
    problem:
      "Workspace AI and agent memory can sound similar because both answer questions from context. The difference is where the context lives and what the AI is trying to continue.",
    wenlanFit:
      "Wenlan is not a company workspace. It is a local, source-backed LLM wiki for AI work: captures, handoffs, cited pages, and retrieval context across Claude Code, Codex, Cursor, Claude Desktop, ChatGPT, and other clients.",
    actionHeading: "Choose by source of truth",
    actionIntro:
      "Ask whether the memory belongs to a workspace or to a local AI work loop.",
    actionBullets: [
      "Choose Notion AI for Notion pages, databases, AI Meeting Notes, workspace search, Notion MCP, and team automation.",
      "Choose Wenlan for local project memory, code-agent handoffs, MCP clients, and inspectable ~/.wenlan artifacts.",
      "Use both if Notion is your team workspace and Wenlan is your AI coding memory layer.",
      "Do not duplicate everything across both; capture the consequence that future AI work needs.",
    ],
    caution:
      "Team workspace governance and local-first control solve different problems. Wenlan stores the memory layer locally by default, but connected AI clients may still send retrieved context to their model providers.",
    faq: [
      "Can Notion AI replace Wenlan for coding-agent memory?",
      "Not directly. Notion MCP can connect external AI tools to Notion workspace content, but the source of truth remains the hosted workspace. Wenlan is designed around a local daemon and ~/.wenlan artifacts.",
      "Can Wenlan replace Notion?",
      "No. Wenlan is not a workspace, docs database, calendar, or project-management suite.",
    ],
    relatedSlugs: ["ai-work-memory-vs-knowledge-base", "local-first-ai-memory", "wenlan-vs-obsidian-ai-memory"],
    officialReferences: [
      {
        label: "Notion AI official product page",
        href: "https://www.notion.com/product/ai",
      },
      {
        label: "Notion MCP docs",
        href: "https://developers.notion.com/guides/mcp/overview",
      },
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    comparisonTable: {
      competitorName: "Notion AI",
      rows: [
        {
          dimension: "Primary context",
          wenlan: "Local AI work memory, sessions, pages, and MCP clients.",
          competitor: "Notion workspace pages, databases, connected apps, meetings, and agents.",
        },
        {
          dimension: "Control boundary",
          wenlan: "Local daemon and artifacts by default.",
          competitor: "Hosted workspace with admin, security, and enterprise controls.",
        },
        {
          dimension: "Best fit",
          wenlan: "Coding-agent continuity and personal/local work memory.",
          competitor: "Team workspace automation, search, docs, and meeting memory.",
        },
        {
          dimension: "Integration shape",
          wenlan: "MCP clients and local CLI/plugin workflows.",
          competitor: "Notion AI, hosted Notion MCP, and workspace/app connections.",
        },
      ],
    },
  },
  {
    slug: "wenlan-vs-mem0",
    eyebrow: "Comparison",
    category: "Comparisons",
    title: "Wenlan vs Mem0: Personal AI Work Memory or App Memory Infrastructure?",
    description:
      "Compare Wenlan's local AI work-memory loop with Mem0's memory infrastructure for AI agents and applications.",
    metaTitle: "Wenlan vs Mem0 | AI Memory Comparison",
    metaDescription:
      "Mem0 is memory infrastructure for agents and apps. Wenlan is a local-first personal knowledge library for AI work across Claude Code, Cursor, Codex, and MCP clients.",
    keywords: [
      "Wenlan vs Mem0",
      "Mem0 alternative",
      "AI memory layer comparison",
      "local AI work memory",
      "memory infrastructure vs work memory",
    ],
    audience: "Developers comparing app memory infrastructure with personal AI work memory",
    heroBullets: [
      "Mem0 offers Platform, Open Source, and MCP/OpenMemory paths.",
      "Wenlan positions as a local-first personal knowledge library for AI work.",
      "Choose by whether you need managed/app memory, self-hosted infrastructure, or a local personal work loop.",
    ],
    quickAnswer:
      "Choose Mem0 Platform when you are adding managed memory to an AI application or agent product, Mem0 Open Source when you want to self-host that stack, and Mem0 MCP/OpenMemory when you want Mem0 memory through coding agents. Choose Wenlan when you want a local daemon, source-backed pages, handoffs, readable artifacts, and git/provenance for your own AI work sessions.",
    problem:
      "The phrase AI memory layer can mean two different things: infrastructure an app developer embeds, or a local work-memory layer an AI power user lives with every day.",
    wenlanFit:
      "Wenlan deliberately avoids being a generic memory infrastructure SDK. It is a source-backed LLM wiki for people using Claude Code, Codex, Cursor, Claude Desktop, ChatGPT, and other MCP clients against their own daemon.",
    actionHeading: "Choose by builder role",
    actionIntro:
      "Ask whether you are building memory into an app or using memory for your own work.",
    actionBullets: [
      "Choose Mem0 Platform for managed product/application memory infrastructure.",
      "Choose Mem0 Open Source when you want self-hosted Mem0 infrastructure.",
      "Choose Mem0 MCP/OpenMemory when Mem0's coding-agent MCP path fits your workflow.",
      "Choose Wenlan for local AI work continuity and inspectable artifacts.",
      "Use Wenlan when handoffs, spaces, pages, and local git history matter.",
      "Use app-memory infrastructure when end users need memory inside your product.",
    ],
    caution:
      "Do not judge only by feature names. The operational model and intended user are different.",
    faq: [
      "Is Wenlan an SDK for app developers?",
      "No. Wenlan is for people using AI daily, not as a backend for other apps building memory features.",
      "Can a developer use both?",
      "Yes. A developer might use Mem0 in an app and Wenlan for their own coding-agent work loop.",
    ],
    relatedSlugs: ["ai-agent-memory-local-vs-cloud", "project-scope-ai-memory", "wenlan-vs-mcp-memory-service"],
    officialReferences: [
      {
        label: "Mem0 official site",
        href: "https://mem0.ai/",
      },
      {
        label: "Mem0 MCP docs",
        href: "https://docs.mem0.ai/platform/mem0-mcp",
      },
      {
        label: "Mem0 Open Source overview",
        href: "https://docs.mem0.ai/open-source/overview",
      },
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
      {
        label: "Wenlan core concepts docs",
        href: "https://wenlan.app/docs/core-concepts",
      },
    ],
    comparisonTable: {
      competitorName: "Mem0",
      rows: [
        {
          dimension: "Primary user",
          wenlan: "AI power users and developers carrying their own work context.",
          competitor: "Developers adding memory to AI agents/apps, plus coding-agent users using Mem0 MCP/OpenMemory.",
        },
        {
          dimension: "Product shape",
          wenlan: "Local daemon, MCP connector, Claude Code plugin, pages, git history.",
          competitor: "Managed Platform, Open Source self-hosted stack, SDK/API surfaces, and hosted MCP/OpenMemory integrations.",
        },
        {
          dimension: "MCP boundary",
          wenlan: "Wenlan MCP talks to a local daemon and local store.",
          competitor: "Mem0 MCP exposes Mem0 memory through a hosted HTTP MCP path tied to Platform/API-key flows, with OSS/self-hosted options available separately.",
        },
        {
          dimension: "Best fit",
          wenlan: "Cross-tool personal/project work memory.",
          competitor: "Application-level persistent context or Mem0-managed coding-agent memory.",
        },
        {
          dimension: "Default trust model",
          wenlan: "Local-first, inspectable artifacts by default.",
          competitor: "Mem0 Platform is hosted; Mem0 Open Source is self-hosted; Mem0 MCP/OpenMemory uses Mem0's MCP memory path.",
        },
      ],
    },
  },
];

const trustArticles: BaseSpec[] = [
  {
    slug: "source-backed-wiki-pages-ai-work",
    eyebrow: "Trust",
    category: "Concepts",
    title: "Source-Backed Wiki Pages for AI Work",
    description:
      "Why Wenlan distills repeated memories into pages that keep source IDs and refresh state attached.",
    metaTitle: "Source-Backed Wiki Pages for AI Work | Wenlan",
    metaDescription:
      "Wenlan distilled pages store source memory IDs and keep revision state so AI work memory becomes readable without losing provenance.",
    keywords: [
      "source backed wiki pages",
      "AI memory wiki pages",
      "distilled pages AI memory",
      "AI work wiki",
      "memory provenance pages",
    ],
    audience: "Users who want memory to become readable without becoming untrusted",
    heroBullets: [
      "Pages are synthesized from related memories.",
      "Source IDs remain attached so summaries are not free-floating claims.",
      "Pages can grow or be refreshed as related memories accumulate.",
    ],
    quickAnswer:
      "Source-backed pages are the trust layer behind Wenlan's LLM wiki for AI work: readable wiki-style artifacts generated from related memories while keeping source memory IDs attached and inspectable through Wenlan.",
    problem:
      "Atomic memories are easy to capture but hard to read at scale. Summaries are easier to read but dangerous when they lose provenance.",
    wenlanFit:
      "Wenlan uses source-backed distillation for its LLM wiki: related captures become pages, and the page record keeps source IDs, version, changelog, stale reason, and source counts so humans and agents can inspect the chain.",
    actionHeading: "Use pages when memory clusters",
    actionIntro:
      "Do not force every capture into a page immediately.",
    actionBullets: [
      "Capture atomic memories first.",
      "Run distill when a topic repeats.",
      "Read the page for orientation.",
      "Use the page's source list when a page claim needs inspection.",
      "Refresh pages when stale context appears and the distill/page workflow is configured.",
    ],
    caution:
      "A page is only as trustworthy as its sources and refresh process. Treat unsourced summaries as weaker than source-backed pages.",
    faq: [
      "Are Wenlan pages hand-written notes?",
      "They can be read as Markdown, while Wenlan keeps source provenance in the page record.",
      "Why not store only pages?",
      "Atomic memories preserve fine-grained evidence. Pages compose them into readable context.",
    ],
    relatedSlugs: ["distilled-wiki-pages-ai-memory", "review-before-trust-ai-memory", "ai-memory-provenance"],
  },
  {
    slug: "ai-memory-provenance",
    eyebrow: "Trust",
    category: "Concepts",
    title: "AI Memory Provenance: Why Source IDs Matter",
    description:
      "Understand why AI memory needs source trails, supersession, and review before old context steers new work.",
    metaTitle: "AI Memory Provenance: Why Source IDs Matter | Wenlan",
    metaDescription:
      "AI memory needs provenance so humans can inspect where facts came from, what superseded them, and whether pages are source-backed.",
    keywords: [
      "AI memory provenance",
      "source IDs AI memory",
      "traceable AI memory",
      "AI memory trust",
      "Wenlan provenance",
    ],
    audience: "Users who need memory they can trust, inspect, and correct",
    heroBullets: [
      "Provenance answers where a memory came from.",
      "Supersession answers what changed.",
      "Review answers whether a record should guide future context.",
    ],
    quickAnswer:
      "AI memory provenance is the trail that connects a remembered fact to source memory IDs, page source lists, source-agent metadata, and supersession or revision state. Session logs are useful context, but they are not per-fact provenance.",
    problem:
      "Without provenance, memory becomes a black box. An assistant may retrieve a stale claim, but the user cannot tell when it was created, what supported it, or whether it was superseded.",
    wenlanFit:
      "Wenlan keeps source_memory_ids with page records, exposes source memories through page-source APIs, tracks revisions, and writes local git history for readable artifacts so memory work stays inspectable.",
    actionHeading: "Prefer traceable memory",
    actionIntro:
      "Make memory useful without making it mysterious.",
    actionBullets: [
      "Capture why a fact matters.",
      "Use corrections when facts change.",
      "Use review for low-confidence or conflicting records.",
      "Use source-backed pages for synthesis.",
      "Use source IDs, page sources, revisions, review, and forget flows for atomic memory inspection.",
      "Use local git history for readable artifact changes.",
    ],
    caution:
      "Provenance does not make every memory true. It makes claims inspectable so stale or wrong records can be corrected.",
    faq: [
      "Is provenance only for compliance?",
      "No. It is practical debugging for memory: where did this belief come from and should it still guide work?",
      "Where do I find the source IDs?",
      "Use Wenlan page-source views or APIs for page sources, and use recall/review surfaces for atomic memory records and corrections.",
    ],
    relatedSlugs: ["source-backed-wiki-pages-ai-work", "review-before-trust-ai-memory", "local-git-history-ai-memory"],
  },
  {
    slug: "local-git-history-ai-memory",
    eyebrow: "Trust",
    category: "Concepts",
    title: "Local Git History for AI Memory Artifacts",
    description:
      "Why Wenlan versions readable memory artifacts in a local git repository under ~/.wenlan/.git.",
    metaTitle: "Local Git History for AI Memory Artifacts | Wenlan",
    metaDescription:
      "Wenlan keeps real local git history for readable pages, session logs, and project status Markdown so AI work artifacts can be inspected and recovered.",
    keywords: [
      "git history AI memory artifacts",
      "versioned AI memory artifacts",
      "Wenlan git history",
      "~/.wenlan .git",
      "recover AI memory artifacts",
    ],
    audience: "Developers who want memory changes to be auditable",
    heroBullets: [
      "Readable memory artifacts are not invisible mutations.",
      "Wenlan commits local artifacts into ~/.wenlan/.git.",
      "Git history makes diffs and recovery familiar.",
    ],
    quickAnswer:
      "Wenlan uses real local git history so readable pages, session logs, and project status Markdown can be inspected over time instead of silently changing. Raw memory captures remain in the daemon database.",
    problem:
      "AI memory often changes in ways users cannot inspect. That is risky when memory steers future coding, product, or client decisions.",
    wenlanFit:
      "Wenlan uses a familiar developer primitive for auditability. The memory database powers retrieval, while git history makes local artifacts easier to inspect and recover.",
    actionHeading: "Inspect memory changes",
    actionIntro:
      "Use git when the timeline matters.",
    actionBullets: [
      "Run git -C ~/.wenlan log --oneline for the local artifact timeline.",
      "Run git -C ~/.wenlan diff when you need to inspect readable artifact changes.",
      "Inspect page and session changes as normal diffs.",
      "Use correction before destructive deletion when history matters.",
      "Back up git history with the rest of ~/.wenlan.",
    ],
    caution:
      "Do not edit daemon-owned state behind Wenlan's back. Git history is an inspection and recovery surface, not a replacement for memory APIs.",
    faq: [
      "Is Wenlan using git as the database?",
      "No. The daemon owns the database and indexes. Git versions readable artifacts such as pages, session logs, and tracked project status Markdown.",
      "Can I revert a bad memory change?",
      "You can inspect and recover readable artifacts with git, but use Wenlan commands for normal memory correction, review, and forget flows.",
    ],
    relatedSlugs: ["local-first-ai-memory", "ai-memory-provenance", "markdown-local-index-ai-memory"],
  },
  {
    slug: "review-before-trust-ai-memory",
    eyebrow: "Trust",
    category: "Concepts",
    title: "Review Before Trust in AI Memory",
    description:
      "Why useful AI memory should expose low-confidence captures, contradictions, revisions, and forget paths.",
    metaTitle: "Review Before Trust in AI Memory | Wenlan",
    metaDescription:
      "Wenlan treats AI memory trust as a workflow: review pending captures, revisions, contradictions, supersession, and forget before stale context steers work.",
    keywords: [
      "review AI memory",
      "AI memory trust",
      "pending AI memories",
      "AI memory contradictions",
      "Wenlan review",
    ],
    audience: "Users who want memory that improves without silently rotting",
    heroBullets: [
      "Uncertain captures stay inspectable and lower-trust until review.",
      "Contradictions can mean the project changed, not that memory failed.",
      "Review gives humans a chance to correct or dismiss memory before relying on it.",
    ],
    quickAnswer:
      "Review-before-trust means uncertain, duplicated, contradicted, or superseded memory stays visible and lower-trust instead of silently becoming authoritative context. Confirmation mainly changes trust/ranking; it is not a hard wall around every retrieval.",
    problem:
      "Bad memory is worse than no memory. A confident assistant using stale context can make a project go in the wrong direction faster.",
    wenlanFit:
      "Wenlan separates review surfaces: list_pending for unconfirmed captures, revision/refinement queues for proposed changes or contradictions, quality-gate rejection logs for diagnostics, and forget for destructive deletion.",
    actionHeading: "Review the right things",
    actionIntro:
      "Review is for trust decisions, not for reading every memory every day.",
    actionBullets: [
      "Review low-confidence captures before trusting them.",
      "Accept or dismiss revisions when facts change.",
      "Treat contradictions as prompts to decide what supersedes what.",
      "Use forget for records that should not remain at all.",
      "Use distill when related eligible captures deserve readable pages; review and confirmation remain separate.",
    ],
    caution:
      "Review should not become a bureaucratic chore. Use it when memory quality, contradiction, or sensitivity matters.",
    faq: [
      "Should every capture require manual approval?",
      "No. The goal is to surface uncertain or risky memory, not to block every useful capture.",
      "What is the difference between review and distill?",
      "Review decides how much trust a memory should carry. Distill composes related eligible captures into source-backed pages.",
    ],
    relatedSlugs: ["source-backed-wiki-pages-ai-work", "what-to-capture-in-ai-work-memory", "ai-memory-provenance"],
  },
  {
    slug: "project-scope-ai-memory",
    eyebrow: "Trust",
    category: "Concepts",
    title: "Project Scope for AI Memory in Wenlan",
    description:
      "Understand how Wenlan scopes local AI work memory with spaces, project context, and deliberate product boundaries.",
    metaTitle: "Project Scope for AI Memory | Wenlan",
    metaDescription:
      "Wenlan scopes to local-first AI work memory. It is not a life OS, workflow suite, generic memory infrastructure SDK, or one-off chat tool.",
    keywords: [
      "what Wenlan is not",
      "AI memory scope",
      "Wenlan project scope",
      "local AI work memory scope",
      "AI memory not life OS",
    ],
    audience: "Users deciding whether Wenlan fits their actual problem",
    heroBullets: [
      "Wenlan scopes to AI work artifacts and project spaces.",
      "It does not try to become a life OS or full workflow suite.",
      "It is for repeated AI work, not one-off chats.",
    ],
    quickAnswer:
      "Wenlan is local-first memory for repeated AI work. Use spaces as project/client buckets, not account permissions or team governance. It is not a life OS, not a general workflow suite, not a generic memory infrastructure SDK, and not needed for one-off chats.",
    problem:
      "Many AI tools blur scope until users cannot tell what problem they solve. Clear boundaries make Wenlan easier to choose and easier to reject.",
    wenlanFit:
      "Wenlan focuses on decisions, lessons, gotchas, project context, handoffs, source-backed pages, and retrieval across MCP clients configured against the same daemon, data dir, and active space.",
    actionHeading: "Use Wenlan when the scope matches",
    actionIntro:
      "Choose Wenlan for repeated work that needs continuity.",
    actionBullets: [
      "Use Wenlan for multi-session AI work.",
      "Use Wenlan when local, inspectable memory matters.",
      "Use spaces for project, client, or context buckets that should not automatically inform each other.",
      "Do not use Wenlan as a calendar, habit tracker, or full personal OS.",
      "Do not use Wenlan as a generic backend SDK for app memory.",
      "Skip Wenlan for one-off chats with no future context.",
    ],
    caution:
      "A narrow scope is a product feature. Local-first keeps Wenlan's memory layer local by default, but connected AI clients may still send retrieved context to their own model providers.",
    faq: [
      "Why state what Wenlan is not?",
      "Because honest scope prevents bad installs and makes the product easier to trust.",
      "Can Wenlan still work beside broader tools?",
      "Yes. Use Wenlan for local AI work memory and other tools for notes, tasks, calendars, or app infrastructure.",
    ],
    relatedSlugs: ["ai-work-memory", "wenlan-vs-mem0", "persistent-project-context-for-ai-agents"],
    officialReferences: [
      {
        label: "Wenlan project scope docs",
        href: "https://wenlan.app/docs/project-scope",
      },
      {
        label: "Wenlan spaces docs",
        href: "https://wenlan.app/docs/spaces",
      },
    ],
  },
];

export const seoArticles: LearnArticle[] = [
  ...setupArticles,
  ...workflowArticles,
  ...comparisonArticles,
  ...trustArticles,
].map(makeArticle);
