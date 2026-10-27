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
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
  audience: string;
  heroBullets: [string, string, string];
  quickAnswer: string;
  quickAnswerHeading?: string;
  quickAnswerFigure?: LearnArticle["sections"][number]["figure"];
  quickAnswerLink?: {
    label: string;
    href: string;
  };
  problem: string;
  problemSection?: LearnArticle["sections"][number];
  proofSections?: LearnArticle["sections"];
  wenlanFit: string;
  actionHeading: string;
  actionIntro: string;
  actionBullets: string[];
  code?: {
    label: string;
    code: string;
  };
  caution: string;
  cautionInAction?: boolean;
  faq: [string, string, string, string];
  relatedSlugs: string[];
  officialReferences?: OfficialReference[];
  comparisonTable?: ComparisonTable;
  productEvidence?: LearnArticle["productEvidence"];
  cta?: LearnArticle["cta"];
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
    publishedAt: spec.publishedAt,
    updatedAt: spec.updatedAt ?? UPDATED_AT,
    author: AUTHOR,
    readingTime: spec.readingTime ?? "5 min read",
    audience: spec.audience,
    heroBullets: spec.heroBullets,
    sections: [
      {
        heading: spec.quickAnswerHeading ?? "Quick answer",
        body: [spec.quickAnswer, spec.wenlanFit],
        link: spec.quickAnswerLink,
        figure: spec.quickAnswerFigure,
      },
      ...(spec.proofSections ?? []),
      spec.problemSection ?? {
        heading: "When this problem appears",
        body: [spec.problem],
      },
      {
        heading: spec.actionHeading,
        body: spec.cautionInAction ? [spec.actionIntro, spec.caution] : [spec.actionIntro],
        bullets: spec.actionBullets,
        code: spec.code,
      },
      ...(spec.cautionInAction ? [] : [{
        heading: "What to check next",
        body: [spec.caution],
      }]),
    ],
    comparisonTable: spec.comparisonTable,
    productEvidence: spec.productEvidence,
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
    cta: spec.cta ?? {
      heading: "Try the local memory loop",
      body: "Install Wenlan, connect your AI client, and verify that capture, recall, and handoff work on your machine.",
    },
  };
}

const setupArticles: BaseSpec[] = [
  {
    slug: "how-to-add-mcp-memory-to-cursor",
    eyebrow: "Setup",
    category: "Workflows",
    title: "Cursor Memory MCP: How to Add Local AI Work Memory",
    description:
      "Wire Cursor to Wenlan's local MCP memory server so coding sessions can capture and recall project context.",
    metaTitle: "Cursor Memory MCP Setup | Wenlan",
    metaDescription:
      "Give Cursor memory that lasts between chats: the ~/.cursor/mcp.json entry, one-command Wenlan setup, and a save-and-recall check shared with Claude Code.",
    keywords: [
      "Cursor MCP memory",
      "Cursor persistent memory",
      "Cursor AI memory",
      "Cursor memory MCP",
      "Wenlan Cursor setup",
      "MCP memory Cursor",
    ],
    updatedAt: "2026-10-07",
    audience: "Cursor users who want local project memory across coding sessions",
    heroBullets: [
      "Wenlan setup installs the local daemon and MCP connector.",
      "wenlan connect cursor writes the Cursor-side MCP configuration when supported.",
      "Cursor Agent can then use Wenlan's brief, recall, and capture tools.",
    ],
    quickAnswer:
      "Install Wenlan, then run ~/.wenlan/bin/wenlan connect cursor. Restart Cursor if needed, then verify that Wenlan tools appear and can recall a test capture.",
    problem:
      "Cursor doesn't carry memory between chats beyond Rules (its Memories feature was removed in 2.1), and Rules are Cursor-only. The gap appears when you want the same project context in Claude Code, Codex, Claude Desktop, or another MCP client.",
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
      "Run ~/.wenlan/bin/wenlan doctor, confirm Wenlan is enabled in Cursor's MCP settings, and check Output → MCP Logs if tools don't appear.",
      "Ask Cursor Agent to use Wenlan context before a meaningful feature or bugfix, approving the MCP tool call if prompted.",
      "Capture why a design path was chosen, and build, CI, or setup gotchas once you have verified them.",
      "Recall by feature name, error string, or project decision.",
      "Capture decisions and handoff context, not raw chat history.",
    ],
    code: {
      label: "Cursor MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect cursor\n~/.wenlan/bin/wenlan doctor",
    },
    caution:
      "If Cursor and another client both write memory, use spaces when contexts should stay separate. Cursor's agent can write pages itself; only background organization needs a separately configured model.",
    faq: [
      "Can Cursor and Claude Code use the same Wenlan memory?",
      "Yes. The shared daemon is the point: each configured client can read and write the same Wenlan context.",
      "Does Wenlan require Cursor to upload memory to a cloud service?",
      "Wenlan stores memory locally and doesn't upload it. Whatever Cursor retrieves is sent to Cursor's model provider like any other context.",
    ],
    relatedSlugs: ["mcp-memory-server", "cursor-claude-code-shared-memory"],
    officialReferences: [
      {
        label: "Cursor MCP docs",
        href: "https://cursor.com/docs/context/mcp",
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
      "Add persistent memory to Claude Desktop with MCP: where claude_desktop_config.json lives, the JSON to add, how to confirm the tools loaded, and one-command Wenlan setup.",
    keywords: [
      "Claude Desktop MCP memory",
      "Claude Desktop memory server",
      "Claude Desktop Wenlan setup",
      "MCP memory Claude Desktop",
      "persistent memory Claude Desktop",
    ],
    updatedAt: "2026-10-07",
    audience: "Claude Desktop users adding local MCP memory",
    heroBullets: [
      "Use the MCP-only setup path for Claude Desktop on supported local setups.",
      "Wenlan's daemon remains local on your machine.",
      "Verify in + → Connectors, then capture and recall a harmless fact.",
    ],
    quickAnswer:
      "On macOS, install Wenlan and run ~/.wenlan/bin/wenlan connect claude-desktop. It adds a wenlan entry under mcpServers in ~/Library/Application Support/Claude/claude_desktop_config.json (on Windows, %APPDATA%\\Claude\\claude_desktop_config.json; open it from Settings → Developer → Edit Config). Fully quit and reopen Claude Desktop, check that Wenlan appears under + → Connectors, then save one harmless fact and recall it in a new chat.",
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
      "Manual config (Windows, or no CLI): add \"wenlan\": {\"command\": \"npx\", \"args\": [\"-y\", \"wenlan-mcp\"]} under mcpServers, alongside any existing servers. For the official knowledge-graph server instead, see the MCP memory server guide.",
      "Restart Claude Desktop after MCP config changes.",
      "If tools fail, run ~/.wenlan/bin/wenlan doctor in a terminal.",
      "Recall a known capture before trusting the setup for real work.",
      "Use Claude Desktop for planning and research, then capture the outcome: selected plans, rejected alternatives, and constraints that implementation agents must respect.",
      "Recall those decisions from the coding client before implementation begins.",
    ],
    code: {
      label: "Claude Desktop MCP setup",
      code: "npx -y wenlan setup\n~/.wenlan/bin/wenlan connect claude-desktop\n~/.wenlan/bin/wenlan connect claude-desktop --dry-run",
    },
    caution:
      "Do not expose the local daemon beyond loopback unless you are intentionally doing development or self-hosted networking work. Normal desktop setup should stay local. Do not capture every paragraph of a planning conversation; save the outcome, assumptions, and consequences.",
    faq: [
      "Is Claude Desktop the same setup as the Claude Code plugin?",
      "No. Claude Desktop uses MCP-only setup. The Claude Code plugin adds slash commands and /wenlan on top of MCP.",
      "Can Claude Desktop create distilled pages?",
      "Yes. Claude Desktop can write pages through Wenlan's MCP tools using the model you're already chatting with. Background organization and automatic page updates are optional and need a separately configured model.",
    ],
    relatedSlugs: ["mcp-memory-server", "local-first-ai-memory"],
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
    relatedSlugs: ["local-first-ai-memory", "wenlan-vs-chatgpt-memory", "wenlan-vs-mem0", "ai-agent-memory-types"],
    officialReferences: [
      {
        label: "Wenlan data and privacy docs",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
  },
];

const contextLossArticle: LearnArticle = {
  slug: "ai-coding-agent-loses-context",
  eyebrow: "Problem",
  category: "Concepts",
  title: "Why AI Coding Agents Lose Context Between Sessions",
  description:
    "Resume the right session, check unfinished work, and give the next agent a clear starting point.",
  metaTitle: "AI Coding Agent Context Loss: Causes and Fixes | Wenlan",
  metaDescription:
    "Recover lost coding-agent context: choose resume or a fresh session, check changes and test evidence, and use a copyable recovery prompt before editing.",
  keywords: [
    "AI coding agent loses context",
    "AI coding agent context loss",
    "Claude Code loses context",
    "Claude Code context between sessions",
    "Claude Code auto memory",
    "AI agent session handoff",
  ],
  publishedAt: "2026-06-06",
  updatedAt: "2026-10-19",
  author: AUTHOR,
  readingTime: "4 min read",
  audience: "Developers recovering unfinished work after context loss or a tool switch",
  heroBullets: [
    "Choose resume or a fresh start.",
    "Check the current code and test results.",
    "Give the next agent one clear next step.",
  ],
  sections: [
    {
      heading: "Quick answer",
      body: [
        "A fresh session lacks the previous conversation; compaction can omit details. Start with the recovery path that matches what went missing.",
      ],
      table: {
        columns: ["What you need", "Start here"],
        rows: [
          ["The earlier conversation", "In Claude Code, resume the native session: claude --continue for the latest eligible session in this project, or claude --resume to choose one."],
          ["Standing rules", "Check the project instructions and native memory loaded by your client."],
          ["A decision lost during compaction", "Open its saved note or transcript. Unrecorded reasoning stays unknown."],
          ["To continue in a new session or tool", "Read the handoff, then check it against the current files using the steps below."],
        ],
      },
      link: {
        label: "Want a reusable skill? Inspect Session Handoff's create/resume workflow",
        href: "https://github.com/softaworks/agent-toolkit/blob/main/skills/session-handoff/README.md",
      },
    },
    {
      id: "check-current-work-before-continuing",
      heading: "Check what changed",
      body: [
        "Before editing, compare the handoff with the current repository. These commands inspect your work without resetting, staging or committing it.",
        "Replace src/retry.mjs with a relevant path. For the last command, replace BASE_COMMIT with the handoff's verified commit; skip it if none was recorded.",
      ],
      code: {
        label: "Inspect current and committed changes",
        code: "pwd\ngit branch --show-current\ngit rev-parse HEAD\ngit status --short\ngit diff --stat\ngit diff -- src/retry.mjs\ngit diff --cached -- src/retry.mjs\n# Also compare any commits since the handoff:\ngit diff BASE_COMMIT HEAD -- src/retry.mjs",
      },
      bullets: [
        "Check every kind of change: diff shows unstaged edits, --cached shows staged edits, and status lists untracked files to read separately. Preserve unrelated work.",
        "A clean worktree can still contain commits made after the handoff. Compare its recorded commit with HEAD too.",
        "Match test results to the code version they checked. Inspect unfamiliar test commands before rerunning them; missing results are unchecked.",
        "Find reasons in decision notes or the handoff, and command history in saved transcripts or terminal logs. A diff cannot reconstruct either.",
      ],
    },
    {
      id: "recover-without-the-previous-chat",
      heading: "Give the next agent this prompt",
      body: [
        "Replace HANDOFF.md with your actual handoff path. Have the agent report its findings before editing.",
      ],
      code: {
        label: "Copy into a fresh conversation",
        code: "Recover the task in HANDOFF.md.\nRead project instructions first.\nDo not edit, stage, reset, commit,\nor push.\nCheck the branch and HEAD.\nCompare commits since the handoff.\nInspect staged, unstaged and\nuntracked files.\nReport:\n- Completed and unfinished work.\n- Decisions, reasons and sources.\n- Test results and tested versions.\n- Conflicts with current files.\n- One next action.\nMark missing evidence unknown.",
      },
      link: {
        label: "Need to write the handoff first?",
        href: "/learn/ai-agent-handoff-loop#what-belongs-in-a-handoff",
      },
    },
    {
      id: "check-a-stale-handoff-against-the-code",
      heading: "Example: an old test pass no longer applies",
      body: [
        "We ran a tiny fictional Git project whose goal was to raise a retry limit. The handoff recorded a passing test; then only the implementation changed.",
        "The rerun caught the mismatch. The next step was to reconcile the intended behavior and test, rather than call the task finished.",
        "This was a synthetic Git/Node exercise, without an LLM or Wenlan run. The input files stayed unchanged during inspection and the test rerun.",
      ],
      table: {
        columns: ["Version checked", "Retry limit", "Actual test result"],
        rows: [
          ["Saved baseline", "2", "Passed: the test expected 2."],
          ["Current working tree", "3", "Failed: actual 3, expected 2; exit 1."],
        ],
      },
      link: {
        label: "Inspect the inputs, commands and actual output",
        href: "/examples/context-recovery-check.json",
      },
    },
    {
      heading: "When Wenlan helps",
      body: [
        "A handoff file can be enough for one project. Wenlan helps when several configured AI tools need durable decisions, reasons and project status in a shared memory boundary.",
        "The loop below requires Wenlan's Claude Code or Codex plugin. MCP-only clients can use context, recall and capture tools, with an explicit handoff for unfinished work.",
        "Keep code changes in Git and command history in saved transcripts or terminal logs. Wenlan does not replace those records or native resume.",
      ],
      code: {
        label: "Wenlan continuity loop",
        code: "/brief\n/recall <specific decision or gotcha>\n/capture <one durable fact and why it matters>\n/handoff",
      },
      link: {
        label: "See Claude save a decision and Codex read it back",
        href: "/learn/codex-claude-code-shared-memory#product-evidence",
      },
    },
  ],
  faqs: [
    {
      question: "Will resuming finish an interrupted command?",
      answer: "No. Resume restores the recorded conversation. Check what actually completed before rerunning a command; it does not roll back the repository.",
    },
    {
      question: "What if there is no handoff?",
      answer: "Give the new agent your goal and ask it to inspect the current files. Mark missing reasons and past test results unknown.",
    },
  ],
  relatedSlugs: ["claude-code-memory", "ai-agent-handoff-loop", "ai-agent-memory-types", "codex-claude-code-shared-memory"],
  officialReferences: [
    { label: "Claude Code memory", href: "https://code.claude.com/docs/en/memory" },
    { label: "Claude Code sessions", href: "https://code.claude.com/docs/en/sessions" },
    { label: "AI Hero: handoff and native session choices", href: "https://www.aihero.dev/skills-handoff" },
    { label: "Session Handoff: checking staleness before resuming", href: "https://github.com/softaworks/agent-toolkit/blob/main/skills/session-handoff/README.md" },
    { label: "Wenlan daily workflow", href: "https://wenlan.app/docs/daily-workflow" },
  ],
  cta: {
    heading: "Carry one decision into the next session",
    body: "Try the Claude-to-Codex example and compare the saved decision with the retrieved source.",
  },
};

const workflowArticles: BaseSpec[] = [
  {
    slug: "coding-agent-source-backed-knowledge-base",
    eyebrow: "Coding agent knowledge",
    category: "Workflows",
    title: "How to Give Codex a Source-Backed Project Knowledge Base",
    description:
      "Keep repository rules, source-of-truth documents, and maintained project knowledge separate so Codex can retrieve evidence without loading everything.",
    metaTitle: "Codex Source-Backed Project Knowledge Base | Wenlan",
    metaDescription:
      "Build a source-backed project knowledge base for Codex or another coding agent with AGENTS.md, maintained docs, citations, retrieval, and verification.",
    keywords: [
      "Codex knowledge base",
      "coding agent knowledge base",
      "Codex project knowledge",
      "source backed knowledge base for AI agents",
      "AGENTS.md knowledge base",
      "Claude Code project knowledge base",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-09-04",
    audience: "Developers who want Codex or another coding agent to reuse trustworthy project knowledge",
    heroBullets: [
      "Keep AGENTS.md or CLAUDE.md short and reserve it for instructions the agent must load every time.",
      "Keep code, tests, specifications, and maintained documents as the source of truth.",
      "Retrieve only the relevant cited page, then verify the conclusion against the repository and tests.",
    ],
    quickAnswer:
      "Use AGENTS.md or CLAUDE.md for short operating instructions, keep repository files as the source of truth for current facts, and use a source-backed knowledge base for decisions and explanations that must remain cited, reviewable, and reusable across sessions.",
    problem:
      "A giant instruction file consumes context and becomes stale, while raw repository search repeatedly rediscovers the same architecture decisions and external constraints. A coding agent needs a small always-loaded contract plus an on-demand, source-backed project knowledge layer.",
    wenlanFit:
      "Wenlan keeps Sources, atomic knowledge, and maintained Pages separate. Codex can connect to the local daemon, retrieve a relevant Page, inspect its citations, and share the same reviewed project knowledge with Claude Code or another MCP client.",
    actionHeading: "Use AGENTS.md and the knowledge base for different jobs",
    actionIntro:
      "Start with one bounded project topic and one inspectable document set. The slash commands below require the Wenlan Codex plugin: install it and run $wenlan once. The wenlan connect codex command configures the MCP connection only; MCP-only clients should use the equivalent Wenlan tools instead of slash commands. Then prove the complete read, cite, verify, and refresh loop before adding more material.",
    actionBullets: [
      "Put build commands, repository boundaries, and non-obvious rules in AGENTS.md or CLAUDE.md.",
      "Keep code, tests, specifications, and first-party docs authoritative; do not copy facts the agent can read directly.",
      "Add only supported Markdown, text, text-extractable PDF, or Obsidian sources to the maintained knowledge layer.",
      "Distill one repeated question into a Page, then verify that each important claim is actually supported by the cited passage; a valid source ID is only a pointer, not proof.",
      "Change one source the Page already cites and verify that the Page becomes stale before trusting the workflow. Adding a separate superseding record can preserve history without updating that Page, so lint and review are still required.",
    ],
    code: {
      label: "One bounded Codex knowledge workflow",
      code: "wenlan status\nwenlan connect codex\nwenlan sources add ~/project/docs\n/wenlan distill <project topic>\n/wenlan pages <project topic>\n/wenlan lint\n/wenlan curate",
    },
    caution:
      "Do not turn the knowledge base into a second copy of the repository. If the answer is already clear in current code or tests, link to that source; maintain only the reasoning, external constraint, or cross-file conclusion that is expensive to reconstruct.",
    faq: [
      "Should AGENTS.md contain the whole project knowledge base?",
      "No. Keep it short and always relevant. Put longer explanations in maintained documents or on-demand knowledge pages so they do not crowd out the task and current code.",
      "Can the knowledge base override the repository?",
      "No. Current code, tests, specifications, and approved first-party documents remain authoritative. A citation does not prove that the prose follows from its source. When a cited source changes, verify that the Page is marked stale, then rebuild and review it before reuse.",
    ],
    relatedSlugs: [
      "how-to-give-codex-persistent-memory",
      "source-backed-wiki-pages-ai-work",
      "build-local-ai-knowledge-base-from-documents",
      "when-ai-agent-should-query-knowledge-base",
      "review-before-trust-ai-memory",
    ],
    officialReferences: [
      {
        label: "OpenAI harness engineering",
        href: "https://openai.com/index/harness-engineering/",
      },
      {
        label: "AGENTS.md open format",
        href: "https://agents.md/",
      },
      {
        label: "Wenlan setup with AI clients",
        href: "https://github.com/wenlan-app/wenlan/blob/main/docs/setup-with-ai.md",
      },
      {
        label: "Wenlan source-backed Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
      {
        label: "Wenlan review and trust",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "Give Codex one project topic it can verify",
      body: "Connect Codex, add one inspectable source set, and prove that the resulting Page stays cited, reviewable, and subordinate to the repository.",
    },
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
      "Install the Claude Code plugin and run /wenlan.",
      "After /wenlan succeeds, run ~/.wenlan/bin/wenlan connect cursor, or wenlan connect cursor if ~/.wenlan/bin is on PATH.",
      "Verify capture in one client and recall in the other with the same daemon, data dir, and space.",
      "Use the same space for the same project; Cursor should pass the same space in Wenlan MCP calls or lock WENLAN_SPACE in ~/.cursor/mcp.json.",
      "Use /handoff in Claude Code when ending work that Cursor will continue.",
    ],
    code: {
      label: "Cursor and Claude Code smoke test",
      code: "/wenlan\n~/.wenlan/bin/wenlan connect cursor\n# Capture a harmless fact in Cursor with the same Wenlan space.\n# Recall that fact from Claude Code with /recall.\n# Then capture in Claude Code and recall from Cursor.",
    },
    caution:
      "If the tools appear to disagree, check space selection, daemon URL, and data directory before assuming memory is missing. The prebuilt runtime supports macOS, Linux glibc, and Windows; Claude Code on Windows may involve WSL or Git Bash caveats.",
    faq: [
      "Can Cursor read a Claude Code handoff?",
      "Yes, through Wenlan's local daemon and retrieval tools when both clients share the same store.",
      "Do I need to duplicate captures in both tools?",
      "No. Capture once in the right space; later clients can recall it.",
    ],
    relatedSlugs: ["how-to-add-mcp-memory-to-cursor", "claude-code-memory", "ai-agent-handoff-loop"],
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
    title: "How to Share Memory Between Codex and Claude Code",
    description: "Connect both tools to one Wenlan Space, save a decision in Claude Code, and recall it in a fresh Codex session. Inspect our recorded input, receipt, and matching result.",
    metaTitle: "Share Memory Between Codex and Claude Code (AGENTS.md + MCP)",
    metaDescription: "Share decisions between Claude Code and Codex through Wenlan. Follow a tested capture-and-recall workflow with the saved source ID and actual output.",
    keywords: [
      "Codex Claude Code shared memory",
      "how to share memory between Codex and Claude Code",
      "Codex Claude Code handoff",
      "shared memory AI coding agents",
      "Wenlan Codex Claude Code",
      "MCP shared memory Codex"
    ],
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-18",
    audience: "Developers using both Codex and Claude Code",
    heroBullets: [
      "Instructions: one AGENTS.md can serve both tools.",
      "Learned memory: native memories don't cross; a shared MCP store does.",
      "Tested: Claude saved a decision; a fresh Codex session returned the same source ID."
    ],
    quickAnswer: "Not natively. Claude Code's auto memory (~/.claude/projects/<project>/memory/) and Codex memories (~/.codex/memories/) stay separate. You can share instructions: keep one AGENTS.md, which Claude Code reads when the repo has no CLAUDE.md, or add @AGENTS.md to your CLAUDE.md. To share what each agent learns, connect both to the same local Wenlan daemon. A capture in one is then recallable from the other.",
    quickAnswerLink: { label: "Download the exact test receipt (JSON)", href: "/examples/claude-codex-shared-memory.json" },
    problem: "Instructions are the easy half. Codex reads AGENTS.md, and Claude Code reads it too (v2.1.277+) or imports it with @AGENTS.md. Decisions and gotchas each agent learns go into tool-only memory, so you end up copying them between tools by hand.",
    wenlanFit: "Wenlan keeps decisions, lessons, pages, and handoffs independent of the tool that produced them. That lets Codex and Claude Code participate in one work history. Shared memory is not automatic truth: review contradictions and stale context before letting old records steer important work.",
    actionHeading: "Verify cross-tool memory",
    actionIntro: "Start with a harmless decision in a registered test Space. Our example uses seo-shared-proof-20261018; choose your own name. You do not need acpx: it opened independent sessions for our test. The ordinary Claude Code and Codex plugins expose the same capture and recall tools.",
    actionBullets: [
      "Set up Wenlan once.",
      "Install the Claude Code plugin with /plugin marketplace add wenlan-app/wenlan, /plugin install wenlan@7xuanlu-wenlan, restart Claude Code, then run /wenlan.",
      "Add the Codex plugin: codex plugin marketplace add wenlan-app/wenlan, then codex plugin add wenlan@7xuanlu-wenlan, start a new task and run $wenlan.",
      "Register the test Space with ~/.wenlan/bin/wenlan spaces add seo-shared-proof-20261018. Ask both clients to use that exact Space, or launch both with WENLAN_SPACE set to it. Check the returned Space rather than relying on a folder-name guess.",
      "In Claude Code, ask Wenlan to capture one decision, its rejected alternative, and the reason. Keep the returned source_memory_id and write_outcome. A failed or staged write is not a live memory.",
      "Open a fresh Codex conversation. Ask it to recall the decision from that Space without pasting the answer, verification code, or source ID. Require Wenlan recall and the retrieved source_id.",
      "Compare the returned decision, reason, Space, and source ID with Claude’s receipt. Our result also preserved source_agent: claude-code and version: 1. It had confirmed: false, so retrieval succeeded but human confirmation had not occurred.",
      "If recall is empty, run ~/.wenlan/bin/wenlan doctor, compare the daemon, data directory and Space, and refresh the client’s MCP connection after setup changes.",
      "Capture decisions and lessons rather than every intermediate thought. Distill repeated topics into maintained Pages when useful."
    ],
    code: {
      label: "Reproduce the Claude → Codex check",
      code: "# Terminal: register your test Space once\n~/.wenlan/bin/wenlan spaces add seo-shared-proof-20261018\n\n# Claude Code prompt (synthetic example, not a production policy):\nUse Wenlan capture in space seo-shared-proof-20261018.\nSave this decision: Harbor demo uses four retry attempts with a\n17-second delay instead of unlimited retries, because the demo\nmust stop promptly when the upstream stays unavailable.\nAdd a new verification code. Show the capture receipt.\n\n# Fresh Codex conversation: do not paste the answer or receipt.\nUse Wenlan recall in space seo-shared-proof-20261018.\nWhat is the Harbor demo retry decision and its verification code?\nShow the decision, reason, source_id, and source_agent."
    },
    caution: "A staged revision awaits review rather than replacing the live source. After recall, inspect whether the decision is still current before acting. Wenlan stores memory locally; text retrieved by a cloud model enters that provider’s context. This run did not test remote machines, concurrent edits, automatic capture, or whether the retry policy is correct.",
    faq: [
      "Which tool should write handoffs?",
      "Use the tool ending the work. Both plugins provide /handoff.",
      "Can both tools write at the same time?",
      "They can use the same daemon, but keep captures atomic and scoped so review remains clear."
    ],
    relatedSlugs: [
      "how-to-give-codex-persistent-memory",
      "claude-code-memory",
      "prevent-multi-agent-knowledge-conflicts",
      "review-before-trust-ai-memory"
    ],
    officialReferences: [
      {
        label: "Recorded Claude-to-Codex test: exact inputs and output (JSON)",
        href: "https://wenlan.app/examples/claude-codex-shared-memory.json"
      },
      {
        label: "Codex MCP docs",
        href: "https://developers.openai.com/codex/mcp"
      },
      {
        label: "Codex Memories docs",
        href: "https://developers.openai.com/codex/memories"
      },
      {
        label: "Wenlan Claude Code plugin",
        href: "https://github.com/wenlan-app/wenlan/tree/main/plugin"
      }
    ],
    readingTime: "7 min read",
    productEvidence: {
      heading: "Tested: Claude saved it, Codex read it back",
      summary: "On October 18, 2026, Claude Code saved a synthetic Harbor demo decision through Wenlan capture. A new Codex process, in a separate empty working directory, received only the Space and a question. Its Wenlan recall call returned the exact saved content, random verification code, and matching source ID. Both used the same local Wenlan 0.19.1 daemon.",
      image: {
        src: "/images/product-evidence/wenlan-space-review-fixture.png",
        alt: "Wenlan desktop test fixture showing maintained knowledge Pages, source counts, and a review queue.",
        caption: "General product view: a genuine Wenlan desktop test fixture, not the Harbor test record. The actual Claude-to-Codex evidence is the tool input and output below and in the linked JSON receipt.",
        width: 1586,
        height: 992
      },
      workflow: [
        {
          label: "Claude saves the decision and why",
          detail: "Harbor demo: four attempts, 17-second delay, instead of unlimited retries, so the demo stops when its upstream stays unavailable. The capture also contained a random code: 02cbdd0bfa. This is invented test data, not advice for a production service."
        },
        {
          label: "Codex asks without being given the answer",
          detail: "The fresh conversation asked: “Harbor demo retry decision and its verification code”. Its prompt did not contain the decision, code, or source ID. The recorded reader made one Wenlan recall call and no file-reading or shell calls."
        },
        {
          label: "Compare the returned source",
          detail: "Recall returned one result: the full decision and rationale, code 02cbdd0bfa, and source_id mem_15dabf75a4df. That ID matched Claude’s source_memory_id; source_agent was claude-code. This establishes retrieval for this run, not a universal reliability rate."
        }
      ],
      artifactHeading: "The actual readback",
      artifactNote: "Sanitized excerpts from the MCP tool responses. The linked JSON receipt includes exact inputs, output, tested versions and transcript hashes; private session context is omitted.",
      artifactRows: [
        {
          label: "Saved",
          detail: "source_memory_id: mem_15dabf75a4df; space: seo-shared-proof-20261018; space_source: request; write_outcome: created."
        },
        {
          label: "Read back",
          detail: "Synthetic Harbor demo decision, not a production policy: use four retry attempts with a 17-second delay instead of unlimited retries, because the demo must stop promptly when the upstream stays unavailable. Verification code: 02cbdd0bfa."
        },
        {
          label: "Source",
          detail: "source_id: mem_15dabf75a4df; source_agent: claude-code; memory_type: decision; version: 1."
        },
        {
          label: "Review state",
          detail: "confirmed: false. Successfully stored and retrieved does not mean a human has confirmed the record or that its policy is appropriate."
        }
      ],
      action: {
        label: "Inspect the recorded Claude → Codex test",
        href: "#product-evidence"
      }
    },
    cta: {
      heading: "Carry one decision into your next Codex session",
      body: "Connect both plugins, save one harmless decision and its reason in Claude Code, then retrieve it from a fresh Codex conversation. Compare source IDs before relying on the memory. For occasional handoffs, a maintained shared Markdown file can also be enough; Wenlan adds shared retrieval and reviewable records when copying files becomes repetitive."
    }
  },
  {
    slug: "source-backed-research-knowledge-base",
    eyebrow: "Research workflow",
    category: "Workflows",
    title: "Build a Research Knowledge Base from Papers and PDFs",
    description:
      "Turn a bounded paper set into inspectable research notes that preserve claims, methods, limitations, contradictions, citations, and source updates.",
    metaTitle: "Build a Research Knowledge Base from Papers & PDFs",
    metaDescription:
      "Build a source-backed research knowledge base from papers and text PDFs with a literature matrix, exact citations, contradictions, limitations, and updates.",
    keywords: [
      "build research knowledge base from papers",
      "source backed literature review workflow",
      "AI research notes with citations",
      "PDF research knowledge base",
      "literature matrix AI",
      "research knowledge management",
    ],
    publishedAt: "2026-08-27",
    updatedAt: "2026-08-27",
    readingTime: "8 min read",
    audience:
      "Students and researchers who already have a bounded paper set and need inspectable synthesis rather than automatic paper discovery or writing",
    heroBullets: [
      "Begin with one research question and papers you have already selected.",
      "Track each claim, method, sample, result, and limitation back to an exact source location.",
      "Keep agreement, contradiction, and unknowns separate as new papers arrive.",
    ],
    quickAnswer:
      "Start with one research question and a bounded set of papers you already have. Keep the papers authoritative, extract only readable text, and build a literature matrix with one row per important claim: method, sample, result, limitation, exact source location, and current verification state.",
    wenlanFit:
      "Wenlan can register Markdown, text, text-extractable PDFs, folders, and read-only Obsidian sources, then maintain source-backed Pages with citations, stale state, revisions, lint, and human review. It does not search scholarly databases, discover papers, format bibliographies, or judge whether a study is academically valid.",
    problem:
      "A folder of PDFs is difficult to compare, while a smooth AI summary can erase disagreements, omit study limitations, or invent support. The useful research artifact preserves the question, evidence table, contradiction record, and exact passage behind every consequential synthesis so another reader can reproduce the reasoning.",
    actionHeading: "Build one inspectable paper-to-synthesis loop",
    actionIntro:
      "Use papers already acquired for one question. Keep the first pass small enough to verify every row.",
    actionBullets: [
      "Write one research question and freeze a bounded initial paper set; record the inclusion boundary instead of asking an assistant to discover an unknown corpus.",
      "Keep original papers authoritative. Use text-extractable PDFs or derived Markdown and text; run OCR outside Wenlan before adding scanned or image-only PDFs.",
      "Create a literature matrix with claim, method, sample, result, limitation, exact page or section, paper version, and verification status.",
      "Group agreement, contradiction, and unknowns separately. Do not flatten conflicting findings into one consensus paragraph.",
      "Open the cited passage for every important claim and verify numbers, scope, attribution, negation, and current source version.",
      "When a new or revised paper arrives, resync the source and refresh only the affected synthesis; preserve the earlier revision for review.",
      "Export or retain a readable research note. A human researcher remains responsible for interpretation, study-quality assessment, citations, and final writing.",
    ],
    code: {
      label: "After Wenlan and the AI client are configured",
      code: "wenlan status\nwenlan sources add ~/Research/papers\n# In a Wenlan plugin client:\n/wenlan distill <research question>\n/wenlan pages <research question>\n/wenlan lint\n/wenlan curate",
    },
    caution:
      "This workflow is not scholarly search, DOI discovery, Zotero import, reference formatting, automatic literature-review writing, or proof that a cited paper is true. Wenlan reads text-extractable PDFs; scanned PDFs require OCR first, and study quality, statistics, and academic integrity still require human review.",
    faq: [
      "Can Wenlan find papers or write my literature review?",
      "No. Begin with papers you already selected. Wenlan can help maintain an inspectable source-backed research artifact, but it does not replace scholarly search, source selection, interpretation, citation formatting, or authorship.",
      "How should I handle papers that disagree?",
      "Keep separate matrix rows for each result, scope, method, and limitation. Record the contradiction explicitly and leave the synthesis unresolved until the evidence supports a narrower conclusion.",
    ],
    relatedSlugs: [
      "build-local-ai-knowledge-base-from-documents",
      "verify-ai-knowledge-base-citations",
      "source-backed-wiki-pages-ai-work",
      "choose-ai-knowledge-base-tool",
      "build-ict-supplier-due-diligence-evidence-pack",
      "build-course-wiki-from-lecture-notes",
    ],
    officialReferences: [
      {
        label: "Wenlan supported document sources",
        href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
      },
      {
        label: "Wenlan source-backed Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
      {
        label: "National Taiwan University AI research guidance",
        href: "https://www.lib.ntu.edu.tw/img/tulblog/HELP/HELP_20260525_AI.pdf",
      },
      {
        label: "Distill research workspace",
        href: "https://github.com/luisalarcon-gauntlet/Distill",
      },
      {
        label: "UReKA research knowledge workflow",
        href: "https://github.com/Agents4Academia-AI/UReKA",
      },
    ],
    cta: {
      heading: "Build one inspectable research artifact",
      body: "Add a bounded paper set, create a literature matrix, and verify every important synthesis against the current source before expanding.",
    },
  },
  {
    slug: "choose-ai-knowledge-base-tool",
    eyebrow: "Selection guide",
    category: "Workflows",
    title: "AI Second Brain: Choose an App or Build Your Own?",
    description: "See how notes become useful work, then compare Claude Code or Codex, Obsidian with optional AI, and Wenlan’s maintained Wiki.",
    metaTitle: "AI Second Brain: Choose an App or Build Your Own?",
    metaDescription: "What can an AI second brain do? Turn notes into a project update, then choose Claude/Codex, Obsidian with optional AI, or Wenlan.",
    keywords: [
      "AI knowledge base tools",
      "AI knowledge base software",
      "choose AI knowledge base",
      "best AI knowledge base tool",
      "local AI knowledge base tool",
      "open source AI knowledge base",
      "AI knowledge base for agents",
      "AI knowledge base evaluation",
    ],
    publishedAt: "2026-08-02",
    updatedAt: "2026-10-25",
    readingTime: "9 min read",
    audience:
      "People with saved notes who want to understand what an AI second brain does and choose a useful starting setup",
    heroBullets: [
      "Understand what AI can help you do with knowledge you already saved.",
      "Choose a setup for your work, not just a collection of features.",
      "Check a real answer, its source, and what happens after a change.",
    ],
    quickAnswer:
      "If you save useful notes but still start each proposal or project update from scratch, a second brain gives you a way to reuse that work. Here, we’ll turn a few notes into an update, then carry what we learned into the next project.",
    wenlanFit:
      "A second brain is a system for keeping and using knowledge outside your head. In personal knowledge management (PKM), that means capturing ideas, connecting them to your work, drawing out what matters and putting it to use. AI can share the connecting and drafting; you bring context and make the decisions.",
    quickAnswerHeading: "Why use an AI second brain?",
    quickAnswerFigure: "second-brain-concept",
    quickAnswerLink: { label: "Already know the idea? Compare the setups", href: "#choose-your-path" },
    problem:
      "AI knowledge base products often use the same label for different jobs. A chatbot upload may answer questions for one session, a RAG service may retrieve document chunks, a notes tool may give an agent direct file access, and a maintained wiki may preserve reviewed answers over time. Comparing them as one feature list produces the wrong choice.",
    proofSections: [
      {
        id: "what-you-can-do",
        heading: "Let’s turn a few notes into a project update",
        body: [
          "Imagine a teammate asks, “Are we still launching on the original date?” You have the brief and the call notes. You also remember the plan changed. Now you need to put those pieces together and tell them what to do next.",
          "We connected Claude to five fictional project notes in Wenlan and asked it to draft an update. I wanted something a teammate could act on, including the decisions still open.",
        ],
        steps: [
          {
            title: "Give the AI a few relevant notes",
            body: "To try the idea without connecting an app, paste two or three short notes about one project into an AI chat you’re comfortable sharing them with. Keep their names and dates. No notes yet? Write what you know and what you need to decide; that is enough for a first attempt.",
          },
          {
            title: "Ask a question you actually need answered",
            body: "Ask which decision was approved, then open the note behind the answer. In this example, the approved date was January 14, 2027. Pricing was still undecided, so it stayed undecided in the answer.",
            prompt: {
              label: "Ask AI: check the launch plan",
              text: "Which launch date was approved, and what is still undecided? Name the notes you used. Flag conflicting notes; don’t fill in missing decisions.",
            },
          },
          {
            title: "Make something you can use",
            body: "Next, we asked Claude for a short update: launch date, confirmed scope, and open decision. Here is what it wrote:",
            bullets: [
              "Launch: January 14, 2027, approved to allow time for the data export review.",
              "Confirmed scope: support by email, in-app help, and phone; data export as CSV.",
              "Open decision: pricing. No price has been approved.",
            ],
            image: {
              src: "/images/product-evidence/claude-cedar-project-update.png",
              width: 776, height: 230,
              alt: "Actual Claude draft: launch January 14, 2027 for data export review; email, in-app and phone support with CSV export; pricing still open. Sources: decision-2026-10-15 and review-check-2026-10-22.",
              caption: "Claude’s draft from the five fictional project notes. Notice the open pricing decision and the named sources.",
            },
          },
        ],
        link: { label: "Follow the Wenlan setup we used", href: "/learn/build-local-ai-knowledge-base-from-documents#add-documents-in-wenlan" },
      },
      {
        id: "do-you-need-another-app",
        heading: "Use what you learned on the next project",
        body: [
          "The update answers today’s question. The notes can also help you work out what to do differently next time. We continued the example with Codex:",
        ],
        steps: [
          {
            title: "Ask what to carry forward",
            body: "We pasted the relevant note excerpts and checked update into Codex, asking what to check before the next launch. It separated facts from suggestions: confirm the approved date, scope and undecided pricing.",
            prompt: {
              label: "Ask AI: make a checklist for the next project",
              text: "What should I check before announcing the next project? Suggest three questions tied to these notes. Separate facts from suggestions; don’t carry this project’s decisions into the next one.",
            },
          },
          {
            title: "Review it, then save it",
            body: "We changed the third question to ask who would confirm each open decision; the notes hadn’t named an owner. We saved the revised checklist as next-launch-checklist.md:",
            bullets: [
              "What is this project’s latest approved date and purpose, and what does it supersede?",
              "Which scope and pricing details are approved, and which remain undecided?",
              "Who will confirm each open decision before we share the plan?",
            ],
            afterBullets: [
              "Source notes: project-brief.md; client-call-2026-10-10.md; decision-2026-10-15.md; review-check-2026-10-22.md.",
            ],
          },
          {
            title: "Use the saved note in a fresh conversation",
            body: "We gave Codex just that checklist and a new fictional project, Harbor, with no approved plan yet. Here are the questions it produced, without copying Cedar’s date or scope:",
            bullets: [
              "What purpose and target date should we propose for Harbor?",
              "What scope and pricing should we propose for approval?",
              "Who will confirm each open decision before we share the plan?",
            ],
          },
        ],
        link: { label: "Read the example notes and saved checklist (.md)", href: "/examples/ai-second-brain/worked-example.md" },
      },
      {
        id: "choose-your-path",
        heading: "Three ways to build an AI second brain",
        body: [
          "When the launch date changes, which saved summary needs to change with it? Compare where you do the work, where the result lives, and who keeps it current.",
          "We build Wenlan. Here is how I would choose between working directly with an AI agent, keeping control in Obsidian, and using a dedicated Wiki app.",
        ],
        figure: "second-brain-paths",
      },
      {
        id: "obsidian-second-brain-setup",
        heading: "Already use Obsidian? What would Wenlan add?",
        body: [
          "Keep writing your meeting notes in Obsidian. Wenlan reads the vault without moving or rewriting your files, then organizes related material into separate Wiki pages with links to the originals.",
          "Say a meeting changes the launch date. Wenlan tracks which Wiki pages use that note and can prepare updates, so you don’t have to find each page yourself. If your existing links, search, or plugins already cover that work, stay with them.",
        ],
        link: {
          label: "Connect your Obsidian vault",
          href: "/learn/migrate-obsidian-vault-to-llm-wiki",
        },
      },
    ],
    problemSection: {
      id: "review-the-update",
      heading: "Which updates happen automatically?",
      body: [
        "Once the changed note has synced into Wenlan, background upkeep can prepare updates for the pages that rely on it:",
      ],
      bullets: [
        "AI-maintained pages you haven’t edited or locked can update automatically after the draft passes Wenlan’s citation check.",
        "Pages you created, edited, or locked get a proposed revision. Your saved text stays until you accept; you can skip the change.",
      ],
      afterBullets: [
        "If that check fails, Wenlan keeps the current page. It checks support in the source text, not whether every conclusion is correct. Check important decisions against the original notes.",
        "In Settings, choose an AI service, assign models to background organization and Wiki page generation, and enable background upkeep. Keep Wenlan running with those models available. Updates aren’t immediate.",
      ],
      link: {
        label: "Set up background upkeep and page review",
        href: "https://github.com/wenlan-app/wenlan/blob/v0.20.1/docs/steep.md",
      },
    },
    actionHeading: "Try one decision before importing everything",
    actionIntro: "Before bringing in your whole archive, try one changed decision in the setup you chose.",
    actionBullets: [
      "If you use chat, ask a question the notes answer and open the original note it names. Ask something the notes cannot answer, too; the AI should say it does not know.",
      "Change one fact, then repeat the question or command. Check whether the new answer or written file uses the change.",
      "If the setup saves summaries or Wiki pages, check those separately. Add a sentence of your own and see whether an update preserves it and offers review.",
      "Check supported file formats, whether your AI tools can use the saved results, and how to export them.",
    ],
    cautionInAction: true,
    caution: "Before adding more notes, check where your chosen model sends them. A local folder does not make cloud AI calls local.",
    faq: [
      "Do I need to code to use an AI second brain?",
      "No. You can start by pasting a few notes into an AI chat. Obsidian lets you write and link notes without AI; plugins are optional. Wenlan provides an interface for sources and Wiki upkeep. Claude Code or Codex can work on files for you, but you manage the instructions and review the changes.",
      "Can I keep my Obsidian notes?",
      "Yes. Wenlan’s source connection reads your vault without moving or rewriting the original notes. You can keep writing in Obsidian, use an optional AI plugin there, or connect Wenlan for a maintained Wiki.",
    ],
    relatedSlugs: [
      "fix-pdf-ingestion-ai-knowledge-base",
      "build-local-ai-knowledge-base-from-documents",
      "source-backed-wiki-pages-ai-work",
      "distilled-wiki-pages-ai-memory",
      "verify-ai-knowledge-base-citations",
      "test-ai-knowledge-base-retrieval-after-changes",
    ],
    officialReferences: [
      { label: "Tiago Forte: what a second brain is for", href: "https://fortelabs.com/blog/basboverview/" },
      { label: "Ron Forbes: practical AI second-brain uses", href: "https://www.ronforbes.com/blog/building-your-ai-second-brain" },
      { label: "Obsidian: write and link your notes", href: "https://help.obsidian.md/" },
      { label: "Optional agent kit: setup and commands", href: "https://github.com/eugeniughelbur/obsidian-second-brain/tree/fe84aa94ea75a46a213d94304fe9f0501c18f109" },
      { label: "Optional Copilot plugin: context and mentions", href: "https://docs.obsidiancopilot.com/context-and-mentions/" },
      { label: "Wenlan: automatic upkeep and review", href: "https://github.com/wenlan-app/wenlan/blob/v0.20.1/docs/steep.md" },
      { label: "Wenlan: connecting an Obsidian vault", href: "https://github.com/wenlan-app/wenlan/blob/v0.20.1/docs/import-guide.md" },
      { label: "Wenlan: data and privacy", href: "https://wenlan.app/docs/data-and-privacy" },
    ],
    cta: {
      heading: "Try the Wenlan workflow",
      body: "Connect a small source set, ask a question, and check the cited answer before bringing in your whole vault.",
    },
  },
  {
    slug: "migrate-obsidian-vault-to-llm-wiki",
    eyebrow: "Migration guide",
    category: "Workflows",
    title: "Migrate an Obsidian Vault to a Source-Backed LLM Wiki",
    description:
      "Register an Obsidian vault as a Wenlan source that Wenlan follows in the background and never edits without your OK, and distill the most-reused notes into citation-backed wiki pages that AI agents can query.",
    metaTitle: "Migrate an Obsidian Vault to a Source-Backed LLM Wiki | Wenlan",
    metaDescription:
      "Move Obsidian notes into an AI-readable LLM wiki without leaving Obsidian: a vault source followed in the background and never edited without your OK, distilled pages with citations, and human review.",
    keywords: [
      "obsidian llm wiki",
      "migrate Obsidian to Wenlan",
      "Obsidian vault knowledge base",
      "Obsidian AI wiki migration",
      "obsidian notes for AI agents",
      "Obsidian to LLM wiki guide",
    ],
    publishedAt: "2026-09-12",
    updatedAt: "2026-10-22",
    readingTime: "6 min read",
    audience:
      "Obsidian users who want AI agents to read their notes through a maintained wiki",
    heroBullets: [
      "Register the vault as a source; Obsidian stays the human-owned writing surface, and Wenlan never edits your notes without your OK.",
      "Wenlan follows the vault in the background, so there is no manual resync; refresh the distilled pages after editing sessions.",
      "Agents query cited, reviewed answers instead of re-reading raw notes every session.",
    ],
    quickAnswer:
      "Register the vault as a Wenlan Source with `wenlan sources add <vault path>` and keep writing in Obsidian. Wenlan follows the vault in the background, checking about every 30 seconds and picking up new, edited, and deleted notes, so there is no manual resync. Then distill the topics you and your agents re-read most often into maintained Pages with citations. Your notes stay in Obsidian: Wenlan never edits them without your OK and writes a change only when you accept it.",
    quickAnswerLink: {
      label: "See the source-backed LLM-wiki workflow",
      href: "/learn/distilled-wiki-pages-ai-memory",
    },
    problem:
      "An Obsidian vault grows into a personal archive, but AI agents can only use it through direct file access. They re-read raw Markdown every session, mix up old and current notes, and leave no trail of which conclusion came from which note. Copying notes into a second tool fixes nothing: the truth splits in two, and the copy goes stale while the vault keeps evolving.",
    wenlanFit:
      "Wenlan is a local-first, open-source (Apache 2.0) LLM wiki built around a lightweight Rust daemon. It connects an Obsidian vault as a Source and follows its Markdown in the background, checking about every 30 seconds for new, edited, and deleted notes. Distilled Pages keep citations, staleness, revisions, and human review, and automatic refresh rejects citation-poor drafts. Notes stay in Obsidian, and Wenlan never edits them without your OK; it writes a change only when you accept it.",
    actionHeading: "Migrate one topic at a time",
    actionIntro:
      "Do not import the whole vault on day one. One topic keeps the first loop visible and the first failure small.",
    actionBullets: [
      "Back up the vault first. A vault is plain Markdown files on disk, so copy the folder or rely on your existing backup before the first import.",
      "Pick one topic that you and your agents ask about often, such as a project folder or an MOC. A small boundary keeps failures visible.",
      "Install the runtime for your operating system and run `wenlan status` to confirm the local daemon is healthy.",
      "Run `wenlan sources add <vault path>` and read the found, ingested, and skipped counts. Markdown content ingests; plugin-specific features like Dataview queries, Canvas boards, and embedded views are treated as plain Markdown text, not re-executed.",
      "In a Wenlan plugin client, run `/wenlan distill <topic>` and then `/wenlan pages <topic>`. In an MCP-only client, use the equivalent Wenlan tools that client exposes.",
      "Run `/wenlan lint` and `/wenlan curate` to catch malformed citations, orphan links, and broken embeddings before anyone relies on the Page.",
      "Optional round trip: symlink `~/.wenlan/pages/` into the vault so distilled Pages are visible where you write. Your edits stay human-owned; machine refreshes become reviewable revisions.",
      "Verify the loop: ask your agent a question the vault answers, open the citation behind the answer, edit the source note, and confirm the Page is marked stale before trusting it again.",
    ],
    code: {
      label: "Register the vault and distill one topic",
      code: "wenlan status\nwenlan sources add ~/Documents/obsidian-vault\n# in a Wenlan plugin client:\n/wenlan distill <topic you re-read often>\n/wenlan pages <topic you re-read often>\n/wenlan lint\n/wenlan curate",
    },
    caution:
      "Keep Obsidian as the writing surface. Wenlan follows the vault Source in the background and never edits your notes without your OK, so there is no manual resync after heavy editing sessions; give it a moment to pick up your changes. Image-only or scanned attachments need OCR before their text is extractable, and a Page is only as current as its last reviewed refresh.",
    faq: [
      "Will migration move, rewrite, or delete my Obsidian notes?",
      "No. Wenlan registers the vault as a Source. Notes stay where they are, and Wenlan never edits them without your OK; it writes a change only when you accept it. The derived Pages live in Wenlan, and those are Markdown you can inspect or export.",
      "Do I have to stop writing in Obsidian after migrating?",
      "No, keep writing there. Wenlan follows the Source in the background and picks up your edits about every 30 seconds, so you only need to review the refreshed Pages. The workflow is built for Obsidian to remain the human-owned surface while Wenlan keeps the agent-readable answers current.",
    ],
    relatedSlugs: [
      "wenlan-vs-obsidian-ai-memory",
      "build-local-ai-knowledge-base-from-documents",
      "distilled-wiki-pages-ai-memory",
      "verify-ai-knowledge-base-citations",
      "source-backed-wiki-pages-ai-work",
    ],
    officialReferences: [
      {
        label: "Obsidian data storage docs",
        href: "https://obsidian.md/help/data-storage",
      },
      {
        label: "Wenlan supported document sources",
        href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
      },
      {
        label: "Wenlan source-backed Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
      {
        label: "Wenlan review and trust",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "Move one vault topic, verify the loop",
      body: "Register the vault as a source, distill one repeated topic, then prove that citations and staleness work before migrating more.",
    },
  },
  {
    slug: "setup-agent-knowledge-base-for-coding-agents",
    eyebrow: "Setup guide",
    category: "Workflows",
    title: "Set Up a Knowledge Base Your Coding Agents Can Query",
    description:
      "Install the Wenlan runtime, connect Claude Code, Codex, and Cursor, add one project source set, and prove the capture, distill, cite, and refresh loop before expanding.",
    metaTitle: "Set Up an AI Agent Knowledge Base for Coding Agents | Wenlan",
    metaDescription:
      "A practical setup walkthrough: install the local runtime, connect coding clients over MCP, add project sources, distill the first cited page, and verify the refresh loop.",
    keywords: [
      "agent knowledge base",
      "set up AI agent knowledge base",
      "coding agent knowledge base setup",
      "knowledge base for Claude Code",
      "knowledge base for Codex",
      "local knowledge base for AI agents",
      "MCP knowledge base setup",
    ],
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-12",
    readingTime: "8 min read",
    audience:
      "Developers setting up shared, cited project knowledge for Claude Code, Codex, Cursor, or another coding agent",
    heroBullets: [
      "One local daemon holds the knowledge; every connected client queries the same sources and pages.",
      "Start with one client and one bounded source set, then prove citations and refresh before expanding.",
      "Keep the repository authoritative; the knowledge base holds the reasoning that is expensive to reconstruct.",
    ],
    quickAnswer:
      "Install the runtime for your operating system, run `wenlan status`, connect one coding client, point `wenlan sources add <path>` at one bounded project folder, distill one repeated topic into a cited Page, then verify that a second client can retrieve it and that editing a source marks the Page stale.",
    quickAnswerLink: {
      label: "See the content strategy behind this setup",
      href: "/learn/coding-agent-source-backed-knowledge-base",
    },
    problem:
      "A coding agent starts every session by re-reading the repository and rediscovering the same architecture decisions, external constraints, and tribal knowledge. Stuffing all of it into AGENTS.md burns context on every task and goes stale quietly. Raw search finds text, but it cannot tell which conclusion is current, cited, and reviewed.",
    wenlanFit:
      "Wenlan is a local-first, open-source (Apache 2.0) knowledge base built around a lightweight Rust daemon. Claude Code, Codex, Cursor, Claude Desktop, Gemini CLI, and other clients reach the same sources, memories, and maintained Pages over MCP or plugins, with citations, staleness, revisions, and human review kept visible.",
    actionHeading: "Build the loop in one afternoon",
    actionIntro:
      "Resist the urge to connect every client and import the whole company drive. The setup is done when one bounded topic survives the full read, cite, verify, and refresh loop.",
    actionBullets: [
      "Install the runtime for your operating system. On macOS Apple Silicon with Node.js: `npx -y wenlan setup`. Linux and Windows have their own one-command paths; the setup doc below lists them all.",
      "Run `wenlan status` and confirm the local daemon reports healthy before touching any client configuration.",
      "Connect one coding client first. Claude Code and Codex have Wenlan plugin paths with a `/wenlan setup` workflow that installs or repairs the runtime and verifies the MCP round trip. For Cursor and other local MCP clients, `~/.wenlan/bin/wenlan connect cursor` writes the client configuration.",
      "Add one bounded source set: `wenlan sources add <project docs folder>`. Read the found, ingested, and skipped counts; supported inputs are Markdown, text, text-extractable PDFs, folders, and read-only Obsidian vaults.",
      "Capture two or three real decisions or lessons with the client's capture path, then run `/wenlan distill <topic>` and `/wenlan pages <topic>` in a plugin client, or the equivalent Wenlan tools in an MCP-only client. Distill only what the sources can actually support.",
      "Run `/wenlan lint` and `/wenlan curate` to catch malformed citations, orphan links, and broken embeddings before anyone relies on the Page.",
      "Verify from a second client: retrieve the Page, open the citation to confirm it supports the claim, edit the cited source, and confirm the Page is marked stale.",
      "Only then add the next source set or client. Growing in small verified steps keeps one bad import from poisoning the whole knowledge base.",
    ],
    code: {
      label: "First-client setup sequence",
      code: "npx -y wenlan setup\nwenlan status\n~/.wenlan/bin/wenlan connect cursor\nwenlan sources add ~/projects/my-app/docs\n# in a Wenlan plugin client:\n/wenlan distill <recurring project topic>\n/wenlan pages <recurring project topic>\n/wenlan lint\n/wenlan curate",
    },
    caution:
      "Do not duplicate the repository inside the knowledge base. Current code, tests, and specifications stay authoritative; maintain only the reasoning, external constraints, and cross-file conclusions that are expensive to reconstruct. Keep AGENTS.md or CLAUDE.md short and let cited Pages carry the long explanations on demand.",
    faq: [
      "Should I connect every AI client on day one?",
      "No. Connect the client you use most, prove the full loop, then add the next one. Each client points at the same local daemon, so adding clients later is cheap once the knowledge layer is sound.",
      "How is this different from putting everything in AGENTS.md?",
      "AGENTS.md loads on every task, so it should stay short. A knowledge base keeps long explanations out of the context window and serves them on demand, with citations, staleness, and review that a static instruction file cannot provide.",
    ],
    relatedSlugs: [
      "coding-agent-source-backed-knowledge-base",
      "mcp-memory-server",
      "choose-ai-knowledge-base-tool",
      "review-before-trust-ai-memory",
      "how-to-give-codex-persistent-memory",
    ],
    officialReferences: [
      {
        label: "Wenlan platform and client setup",
        href: "https://github.com/wenlan-app/wenlan/blob/main/docs/setup-with-ai.md",
      },
      {
        label: "Wenlan CLI and MCP setup",
        href: "https://github.com/wenlan-app/wenlan/blob/main/crates/wenlan-cli/README.md",
      },
      {
        label: "Wenlan source-backed Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
      {
        label: "Wenlan MCP clients",
        href: "https://wenlan.app/docs/mcp-clients",
      },
    ],
    cta: {
      heading: "Prove one topic before scaling",
      body: "Set up one client and one source set, verify citations and refresh, then grow the knowledge base in small verified steps.",
    },
  },
];

const consultantClientProjectArticle: BaseSpec = {
  slug: "build-client-project-knowledge-base-for-consulting",
  eyebrow: "Consulting workflow",
  category: "Workflows",
  title: "How to Build a Client Project Knowledge Base for Consulting",
  description:
    "Keep one consulting engagement's sources, research, decisions, deliverables, and handoff context in a traceable client-project knowledge base.",
  metaTitle: "Build a Client Project Knowledge Base for Consulting",
  metaDescription:
    "Build a client-scoped consulting knowledge base for sources, research, decisions, deliverables, stale evidence, and project handoff.",
  keywords: [
    "consultant client knowledge base",
    "consulting engagement knowledge base",
    "client project knowledge handoff",
    "consulting research knowledge base",
    "client deliverable source tracking",
  ],
  publishedAt: "2026-08-28",
  updatedAt: "2026-08-28",
  readingTime: "8 min read",
  audience:
    "Independent consultants, boutique consulting teams, and research analysts delivering client engagements",
  heroBullets: [
    "Keep each client in a separate source boundary instead of mixing engagements.",
    "Trace findings, decisions, and deliverable claims back to current client-approved sources.",
    "Leave a reviewable handoff that records open questions, stale evidence, and the next owner.",
  ],
  quickAnswer:
    "Create one client-scoped knowledge base per engagement. Register only the approved project sources, keep a decision and open-question log, distill reusable findings into a source-backed Page, and verify every deliverable claim before handoff.",
  wenlanFit:
    "Wenlan can keep Sources, atomic Memories, and maintained Pages inside a client Space, with source references, revisions, stale state, lint, and review. It does not provide CRM ingestion, email or calendar sync, role-based access control, automatic redaction, legal compliance, billing, or project management.",
  problem:
    "A consultant often starts the next proposal, workshop, deliverable, or handoff by reconstructing context from folders, interview notes, slide decks, chats, and personal memory. The risk is not only wasted time: evidence from another client can leak into the engagement, an old decision can look current, and a polished claim can lose its source.",
  actionHeading: "Build one client-to-handoff loop",
  actionIntro:
    "Start with a non-sensitive sample engagement. Use the client's contractual and security controls before adding confidential material.",
  actionBullets: [
    "Create one Space and one source folder for a single client engagement; never use a shared catch-all client corpus.",
    "Register the approved proposal, scope, research, interview notes, source documents, decisions, and current deliverables with `wenlan sources add <path>`.",
    "Record each important decision with its date, owner, evidence, alternatives, and what would reopen it; keep unanswered questions separate.",
    "Distill one repeated project question into a maintained Page, then verify the cited source and revision before copying a claim into a deliverable.",
    "When a source changes, resync it and review only the affected Pages; mark unresolved claims stale instead of silently preserving them.",
    "Before handoff, record current scope, accepted decisions, open questions, deliverables, source boundaries, risks, and the next responsible person.",
    "Run lint and review before sharing. Keep confidential or regulated material out unless the engagement's approved controls permit it.",
  ],
  code: {
    label: "After Wenlan and the AI client are configured",
    code: "wenlan status\nwenlan sources add ~/Clients/acme-approved-sources\n# In a Wenlan plugin client:\n/wenlan distill <client project question>\n/wenlan pages <client project question>\n/wenlan lint\n/wenlan curate\n/handoff",
  },
  caution:
    "Local-first storage does not replace a consulting agreement, client consent, access control, retention policy, redaction, or a secure document system. Start with non-sensitive sample data, keep each client isolated, and withhold any claim whose current source cannot be verified.",
  faq: [
    "Should all consulting clients share one knowledge base?",
    "No. Give each engagement its own source boundary and Space. Reuse only explicitly approved general methods or templates, never another client's facts, files, or decisions.",
    "Does Wenlan manage client confidentiality or permissions for me?",
    "No. Wenlan keeps local, source-backed knowledge inspectable, but it is not a CRM, document access-control system, redaction tool, or legal-compliance service. Apply the client's approved security and retention controls first.",
  ],
  relatedSlugs: [
    "source-backed-wiki-pages-ai-work",
    "build-local-ai-knowledge-base-from-documents",
    "verify-ai-knowledge-base-citations",
    "source-backed-research-knowledge-base",
    "prevent-multi-agent-knowledge-conflicts",
  ],
  officialReferences: [
    {
      label: "Wenlan knowledge model and Spaces",
      href: "https://github.com/wenlan-app/wenlan#what-does-wenlan-build",
    },
    {
      label: "Wenlan daily workflow",
      href: "https://github.com/wenlan-app/wenlan#daily-workflow",
    },
    {
      label: "Cogni Consult client-delivery workspace",
      href: "https://github.com/cogni-work/insight-wave/tree/main/cogni-consult",
    },
    {
      label: "AI Consulting Methodology engagement lifecycle",
      href: "https://github.com/mardy123/AI-Consulting-Methodology-Toolkit/blob/main/06_Delivery/ENGAGEMENT_LIFECYCLE.md",
    },
    {
      label: "Market research workflow reference",
      href: "https://github.com/genli-ai/market-research-skills/blob/main/skills/analyst-research/references/workflow_medium.zh.md",
    },
  ],
  cta: {
    heading: "Build one inspectable client handoff",
    body: "Create a client-scoped source boundary, verify one deliverable claim, and leave a handoff another consultant can reproduce.",
  },
};

workflowArticles.push(consultantClientProjectArticle);

const investmentResearchKnowledgeBaseArticle: BaseSpec = {
  slug: "build-investment-research-knowledge-base",
  eyebrow: "Investment research workflow",
  category: "Workflows",
  title: "How to Build an Investment Research Knowledge Base",
  description:
    "Turn annual reports, filings, earnings-call notes, and research questions into a source-backed company dossier that stays reviewable as evidence changes.",
  metaTitle: "Build an Investment Research Knowledge Base | Wenlan",
  metaDescription:
    "Build a source-backed investment research knowledge base from filings, annual reports, and earnings calls with citations, thesis changes, and stale-evidence review.",
  keywords: [
    "investment research knowledge base",
    "AI investment research workflow",
    "annual report research workflow",
    "earnings call research notes",
    "source backed equity research",
    "financial research knowledge management",
  ],
  publishedAt: "2026-08-28",
  updatedAt: "2026-08-28",
  readingTime: "9 min read",
  audience:
    "Equity research analysts, independent investors, and finance professionals working from company filings and earnings materials",
  heroBullets: [
    "Keep one company and reporting period inside an explicit source boundary.",
    "Trace every material claim to the current filing, annual report, or earnings-call passage.",
    "Record what changed, what contradicts the thesis, and which questions remain open.",
  ],
  quickAnswer:
    "Create one company-scoped research knowledge base from documents you are allowed to use. Register the current annual report, filings, earnings releases, presentation, and your dated call notes; then maintain a source register, metric-and-guidance change log, thesis ledger, contradiction log, and open-question list.",
  wenlanFit:
    "Wenlan can ingest Markdown, text, text-extractable PDFs, folders, and read-only Obsidian sources, then maintain source-backed Pages with citations, revisions, stale state, lint, and human review. It does not fetch live market data, parse XBRL or tables reliably, calculate valuation, monitor portfolios, produce trading signals, or provide investment advice.",
  problem:
    "Company research becomes unreliable when each quarter adds another filing, transcript, model note, and management claim. A polished summary can silently mix periods, preserve superseded guidance, or turn an analyst inference into a sourced fact. The useful artifact preserves the exact document, reporting period, page or section, revision, and reviewer behind every consequential conclusion.",
  actionHeading: "Build one filing-to-thesis update loop",
  actionIntro:
    "Use one company and one reporting cycle first. Keep calculations in a spreadsheet or financial model and use the knowledge base for source-backed qualitative research and change tracking.",
  actionBullets: [
    "Create one company folder and source register with document type, reporting period, publication date, revision, authority, and local filename.",
    "Add the current annual report or 10-K, latest interim filing, earnings release, investor presentation, and dated earnings-call notes only when you have lawful access.",
    "Extract a compact Page for business model, segments, key metrics, guidance, risks, catalysts, management claims, and unresolved questions; cite the exact source location for every material statement.",
    "Keep reported facts, your calculations, and investment judgments in separate fields. Never let a Page turn an inference into a company statement.",
    "Compare the new period with the previous source set. Record changed guidance, newly disclosed risks, metric-definition changes, contradictions, and thesis implications.",
    "When a filing or transcript is corrected, resync the source and review only affected Pages. Mark unsupported or superseded claims stale instead of preserving them.",
    "Open the cited passage before using a claim in a memo. A citation proves a path exists, not that the claim, number, or interpretation is correct.",
  ],
  code: {
    label: "After Wenlan and the AI client are configured",
    code: "wenlan status\nwenlan sources add ~/Research/companies/acme\n# In a Wenlan plugin client:\n/wenlan distill <company and reporting-period question>\n/wenlan pages <company research topic>\n/wenlan lint\n/wenlan curate",
  },
  caution:
    "This workflow is for organizing user-provided, text-extractable research sources. Scanned PDFs require external OCR; tables, financial statements, and calculations must be checked against the original filing and a deterministic model. It is not investment advice and does not replace licensed data, compliance review, or professional judgment.",
  faq: [
    "Can Wenlan fetch SEC filings, market data, or earnings transcripts for me?",
    "No. Bring documents you are allowed to use. Wenlan does not provide a live financial-data feed, transcript license, XBRL pipeline, valuation engine, or portfolio monitor.",
    "How do I keep an investment thesis from going stale?",
    "Attach each thesis claim to a dated source and invalidation condition. After every filing or earnings call, compare the new source set, mark superseded claims stale, and preserve the prior revision for review.",
  ],
  relatedSlugs: [
    "build-local-ai-knowledge-base-from-documents",
    "verify-ai-knowledge-base-citations",
    "source-backed-wiki-pages-ai-work",
    "source-backed-research-knowledge-base",
    "test-ai-knowledge-base-retrieval-after-changes",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Anthropic equity-research earnings workflow",
      href: "https://github.com/anthropics/financial-services/blob/main/plugins/vertical-plugins/equity-research/commands/earnings.md",
    },
    {
      label: "AI4Finance finance research resources",
      href: "https://github.com/AI4Finance-Foundation/Awesome_AI4Finance",
    },
    {
      label: "Investor Harness evidence-led research workflow",
      href: "https://github.com/joansongjr/investor-harness",
    },
  ],
  cta: {
    heading: "Build one inspectable company dossier",
    body: "Add one reporting cycle, verify every material claim, and preserve what changed before expanding the research set.",
  },
};

workflowArticles.push(investmentResearchKnowledgeBaseArticle);

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
    relatedSlugs: ["mcp-memory-server", "codex-claude-code-shared-memory", "ai-work-memory"],
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
    code: {
      label: "Reproduce the difference in one minute",
      code:
        "# Wenlan: every recalled fact carries an id, a source, and a dated change\nwenlan search \"release checklist\" --limit 3\nhead -20 ~/.wenlan/pages/<page>.md   # front matter lists the memory ids the page cites\ngit -C ~/.wenlan log --oneline -5\n\n# ChatGPT: Settings > Personalization > Manage memories shows the saved list",
    },
    caution:
      "Do not put sensitive project context into any memory system without understanding where it is stored, how to delete it, and which tools can retrieve it. For ChatGPT, turning Memory off does not delete existing saved memories, deleting a chat does not remove saved memories, and full cleanup may require deleting saved memories plus source chats, files, or connected-app sources. OpenAI says deleted saved-memory logs may be retained for up to 30 days, and content may be used for model improvement when that setting applies.",
    faq: [
      "Does Wenlan replace built-in assistant memory?",
      "It can replace parts of the work-memory use case, but built-in memory may still be useful for lightweight personalization inside one assistant.",
      "Why not just paste project context each time?",
      "Manual paste works for occasional chats. It breaks down when work spans weeks, tools, and repeated sessions.",
    ],
    relatedSlugs: ["ai-work-memory", "ai-agent-memory-local-vs-cloud"],
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
    code: {
      label: "Check where the memory actually lives",
      code:
        "wenlan status                        # local daemon, model, and memory state\nls ~/.wenlan/pages                   # pages on disk, not in a hosted workspace\ngit -C ~/.wenlan log --oneline -5    # local, dated history you can diff",
    },
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
    relatedSlugs: ["ai-agent-memory-local-vs-cloud", "ai-work-memory", "wenlan-vs-mcp-memory-service", "wenlan-vs-notion-ai", "wenlan-vs-chatgpt-memory"],
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
    slug: "prevent-multi-agent-knowledge-conflicts",
    eyebrow: "Shared knowledge maintenance",
    category: "Workflows",
    title: "How to Prevent Multi-Agent Knowledge Conflicts and Stale Conclusions",
    description:
      "Prevent AI agents from overwriting shared knowledge, promoting unsupported claims, or reusing conclusions after their sources change.",
    metaTitle: "Prevent Multi-Agent Knowledge Conflicts | Wenlan",
    metaDescription:
      "Use evidence, candidate claims, version checks, review, and history to prevent stale or conflicting knowledge from spreading across AI agents.",
    keywords: [
      "multi agent shared knowledge conflict",
      "prevent stale agent knowledge",
      "AI agent memory conflict resolution",
      "multiple agents overwrite shared memory",
      "multi agent knowledge base governance",
      "shared agent knowledge provenance",
    ],
    publishedAt: "2026-08-24",
    updatedAt: "2026-08-24",
    audience:
      "Teams whose coding, research, or operations agents read from and write to the same project knowledge",
    heroBullets: [
      "Do not let every agent write directly into accepted shared knowledge.",
      "Keep evidence, candidate claims, and accepted conclusions as separate states.",
      "Detect stale writes before acceptance, review contradictions, and preserve the history they replace.",
    ],
    quickAnswer:
      "Prevent multi-agent knowledge conflicts by treating every agent write as a candidate claim, not immediate shared truth. Store its source, writer, scope, captured time, and expected version; re-read the target before acceptance; if it changed, do not publish the stale candidate. Compare contradictions with the current source, then let a reviewer promote, replace, or leave the claim unresolved. Preserve the replaced conclusion and its provenance so later agents can see why it changed.",
    problem:
      "The failure appears when one agent reads version A, another changes the source or conclusion, and the first agent later writes from its stale snapshot. It also appears when two plausible summaries contradict each other or an agent records a claimed completion without a verifiable result. A shared file or vector store makes the information visible, but does not decide which statement is current or supported.",
    wenlanFit:
      "Wenlan separates Sources, atomic Memories, and maintained Pages. Captures keep provenance; explicit replacements preserve a supersedes chain; stale Pages can be rebuilt from current support; machine changes to human-owned writing become reviewable revisions; and an optional reconcile pass can queue protected conflicts instead of overwriting history. That pass is off by default and does not replace source review.",
    actionHeading: "Use a staged write and review loop",
    actionIntro:
      "Use one small conflict fixture before several agents depend on the same knowledge base. The slash-command recipe below requires the Wenlan Codex plugin after `$wenlan setup`.",
    actionBullets: [
      "Define the authoritative source and the write scope for the fact or Page. Agent identity alone is not authority.",
      "Record the evidence, candidate claim, writer, source revision, captured time, and expected version together.",
      "Before accepting a write, re-read the source and target and compare them with the version recorded by the agent. A mismatch should stop the workflow before `write_page` and force a fresh read.",
      "Compare competing claims with the original evidence. Mark them supported, contradicted, stale, replaced, or unresolved; do not let recency alone decide.",
      "Promote only reviewed claims into accepted shared knowledge. Preserve the previous conclusion, its citations, and the replacement reason.",
      "Run the same recall from a second agent and verify that it sees the accepted state, the current source, and any unresolved conflict rather than a silent last write.",
    ],
    code: {
      label: "Wenlan Codex plugin: inspect, capture, distill, and review",
      code: "$wenlan pages <shared topic>\n/capture <candidate claim + source + why it matters>\n$wenlan distill <shared topic>\n$wenlan lint\n$wenlan curate",
    },
    caution:
      "Wenlan is not a multi-agent scheduler, distributed lock service, or automatic consensus engine. Repository files, tests, specifications, and maintained first-party documents remain authoritative. The current public MCP `write_page` does not accept `expected_version`, so this recipe performs the source-and-version comparison before the write instead of claiming an atomic stale-write rejection. Human-owned Page refreshes become reviewable revisions. Agents without the Codex plugin can use local MCP tools (`recall`, `capture`, `distill`, `lint`, and `list_pending_revisions`) or the local CLI (`wenlan pages`, `wenlan capture`, `wenlan lint`, and `wenlan curate revisions`). Local Page refresh is available only through local stdio MCP; semantic conflicts still require evidence and review.",
    faq: [
      "Should every agent write to the same shared Page?",
      "No. Agents can capture atomic evidence and candidate claims, but accepted Pages should have a defined scope and review path so one agent cannot silently overwrite another's supported conclusion.",
      "Does the optional reconcile pass resolve every contradiction automatically?",
      "No. It can queue protected conflicts for review and preserve supersession, but it is off by default and cannot decide whether the underlying source is correct.",
    ],
    relatedSlugs: [
      "codex-claude-code-shared-memory",
      "source-backed-wiki-pages-ai-work",
      "verify-ai-knowledge-base-citations",
      "build-business-metric-definition-knowledge-base",
      "distilled-wiki-pages-ai-memory",
    ],
    officialReferences: [
      {
        label: "Wenlan knowledge lifecycle",
        href: "https://github.com/wenlan-app/wenlan#two-lifecycles",
      },
      {
        label: "Wenlan review and trust guide",
        href: "https://wenlan.app/docs/review-and-trust",
      },
      {
        label: "Governed Shared Memory for Multi-Agent LLM Systems",
        href: "https://arxiv.org/abs/2606.24535",
      },
      {
        label: "MemTX transactional belief commit",
        href: "https://arxiv.org/abs/2607.23929",
      },
      {
        label: "Hindsight multi-agent shared-memory discussion",
        href: "https://github.com/vectorize-io/hindsight/discussions/1576",
      },
      {
        label: "Anthropic SDK multi-agent memory discussion",
        href: "https://github.com/anthropics/anthropic-sdk-python/discussions/1419",
      },
    ],
    cta: {
      heading: "Test one conflicting conclusion",
      body: "Connect two agents to Wenlan, stage one conflicting claim with its source, and verify that review and history stay visible before either agent reuses it.",
    },
  },
  {
    slug: "fix-pdf-ingestion-ai-knowledge-base",
    eyebrow: "Ingestion troubleshooting",
    category: "Workflows",
    title: "PDF Failed to Ingest into Your AI Knowledge Base? Diagnose It First",
    description:
      "Diagnose empty, skipped, malformed, oversized, or image-only PDFs before trusting an AI knowledge base or RAG answer.",
    metaTitle: "AI Knowledge Base PDF Ingestion Failed? Fix It",
    metaDescription:
      "Troubleshoot AI knowledge-base PDF ingestion: check the text layer, OCR scanned pages, file limits, parser errors, and extracted evidence.",
    keywords: [
      "AI knowledge base PDF ingestion failed",
      "scanned PDF AI knowledge base OCR",
      "PDF RAG empty chunks",
      "AI knowledge base document parsing error",
      "PDF text extraction failed",
      "knowledge base skipped PDF",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    audience:
      "People whose AI knowledge-base import reports success, skip, or error but produces empty, incomplete, or unusable PDF content",
    heroBullets: [
      "First distinguish a text PDF from a scanned or image-only PDF.",
      "Treat found, ingested, skipped, and error counts as diagnostics, not proof that usable text reached retrieval.",
      "Verify one known answer and its exact source before trusting the document set.",
    ],
    quickAnswer:
      "If a PDF produces no usable knowledge, first try selecting and copying text from the file. An image-only scan needs OCR before Wenlan can ingest it; Wenlan has no OCR in v1. Next check that the PDF is at most 10 MB, is not malformed, and contains enough real text. Run `wenlan sources add <path>`, inspect the found, ingested, skipped, and error counts, then verify that a known passage can be retrieved and cited. A successful registration or batch summary alone does not prove that extraction succeeded.",
    problem:
      "PDF ingestion can fail loudly with a parser error or quietly with an empty text layer. The dangerous case is an import that looks complete while the knowledge base contains no useful chunks, loses layout relationships, or cannot cite the passage a user expects.",
    wenlanFit:
      "Wenlan accepts `.md`, `.txt`, and text-extractable `.pdf` Sources. Its current source connector caps PDFs at 10 MB, skips image-only or near-empty extraction, reports malformed PDF parsing as an error, and continues processing the rest of a folder. It does not perform OCR in v1.",
    actionHeading: "Diagnose the file before changing retrieval",
    actionIntro:
      "Work from the source inward. Do not tune embeddings or prompts until you know the expected text actually entered the index.",
    actionBullets: [
      "Classify the PDF: if text cannot be selected or copied, treat it as a scan or image-only document.",
      "OCR scanned pages outside Wenlan, then save a text-extractable PDF or a clean `.md` or `.txt` file. Spot-check names, dates, numbers, tables, and page order against the original.",
      "Check the input boundary: folder Sources accept `.md`, `.txt`, and `.pdf`; PDFs over 10 MB, unsupported extensions, hidden files, symlinks, and skipped directories do not enter the normal folder scan.",
      "Run `wenlan sources add <path>` and record the found, ingested, skipped, and error counts. An error suggests read or parse failure; a skip can mean unchanged content, no extractable text, or content below the minimum quality floor.",
      "Wait for document processing, then retrieve a distinctive sentence that definitely exists in the source. Confirm the result opens the intended file or source reference.",
      "Ask one answerable question and one question the document cannot answer. The first should cite supporting text; the second should remain unknown.",
      "If extraction is incomplete, simplify the source to Markdown or plain text and re-run the same acceptance test. Do not hide missing tables or scanned pages behind a fluent summary.",
    ],
    code: {
      label: "Register or resync one diagnostic source",
      code: "wenlan status\nwenlan sources add ~/Knowledge/pdf-diagnostic",
    },
    caution:
      "OCR can introduce wrong characters, reading order, and table structure. A searchable PDF is not automatically a faithful PDF. Compare important passages with the rendered page and keep the original file authoritative.",
    faq: [
      "Why was my PDF found but no useful text appeared?",
      "The file may be image-only, contain too little extractable text, fail parsing, or still be processing. Check the text layer and source result, then retrieve a distinctive known sentence instead of trusting the batch summary.",
      "Does Wenlan OCR scanned PDFs?",
      "No. The current v1 document connector extracts an existing text layer; scan or image-only PDFs need OCR before import.",
    ],
    relatedSlugs: [
      "build-local-ai-knowledge-base-from-documents",
      "choose-ai-knowledge-base-tool",
      "verify-ai-knowledge-base-citations",
      "source-backed-wiki-pages-ai-work",
    ],
    officialReferences: [
      {
        label: "Wenlan supported document sources",
        href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
      },
      {
        label: "Wenlan directory ingestion source and limits",
        href: "https://github.com/wenlan-app/wenlan/blob/main/crates/wenlan-core/src/sources/directory.rs",
      },
      {
        label: "Wenlan folder-ingestion acceptance test",
        href: "https://github.com/wenlan-app/wenlan/blob/main/crates/wenlan-core/tests/folder_ingest_e2e.rs",
      },
      {
        label: "Google Cloud PDF OCR and layout parsing",
        href: "https://cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents",
      },
      {
        label: "DeepTutor scanned-PDF empty-document issue",
        href: "https://github.com/HKUDS/DeepTutor/issues/431",
      },
      {
        label: "Kodit silent PDF extraction failure issue",
        href: "https://github.com/helixml/kodit/issues/553",
      },
    ],
    cta: {
      heading: "Verify one PDF before importing the archive",
      body: "Install Wenlan, add one controlled document, and prove that its text, source, and citations survive the complete ingestion path.",
    },
  },
  {
    slug: "when-ai-agent-should-query-knowledge-base",
    eyebrow: "Retrieval policy",
    category: "Workflows",
    title: "When Should an AI Agent Query a Knowledge Base?",
    description:
      "Use a query-or-skip policy so AI agents retrieve authoritative knowledge when needed without repeatedly loading irrelevant documents into context.",
    metaTitle: "When Should an AI Agent Query a Knowledge Base?",
    metaDescription:
      "Decide when an AI agent should query a knowledge base, skip retrieval, inspect an index, or open the exact source without wasting context.",
    keywords: [
      "when should AI agent query knowledge base",
      "AI agent knowledge retrieval policy",
      "reduce AI agent context token cost",
      "avoid rereading documents AI agent",
      "just in time context retrieval",
      "progressive disclosure AI agent",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    audience:
      "Developers operating AI agents over documentation that is consulted repeatedly across tasks or sessions",
    heroBullets: [
      "Query when the answer depends on current, private, project-specific, or citable evidence.",
      "Skip retrieval when the exact authoritative source is already in context or the task does not depend on the corpus.",
      "Use an index to choose a source, then open the smallest exact passage needed to verify the answer.",
    ],
    quickAnswer:
      "An AI agent should query a knowledge base when the task depends on current, organization-specific, private, or citable information that is not already available in its context. It should skip retrieval for greetings, fixed control flow, or a task whose exact authoritative source is already open. When retrieval is needed, inspect a compact index first, load the smallest relevant page, and return to the cited source for consequential claims.",
    quickAnswerLink: {
      label: "Building an agent knowledge base? Start with the setup guide",
      href: "/learn/source-backed-wiki-pages-ai-work",
    },
    problem:
      "Always injecting a document collection adds irrelevant text, latency, and attention pressure. Never retrieving forces the agent to guess or repeatedly rediscover project decisions. The useful boundary is a reproducible task-level policy, not a promise that every retrieval saves a fixed number of tokens.",
    wenlanFit:
      "Wenlan keeps Sources, atomic knowledge, and maintained Pages separate. An agent can recall a narrow topic or open a relevant Page, inspect its citations, and return to the current source instead of replaying a whole archive; Wenlan does not replace direct code, test, policy, or document verification.",
    actionHeading: "Use this query-or-skip decision policy",
    actionIntro:
      "Classify the task before searching, then increase context only when the previous layer cannot support the answer. The slash-command example requires the Wenlan Codex plugin: install it and run $wenlan once. The wenlan connect codex command configures only the MCP connection; MCP-only clients should call Wenlan recall and inspect the Page results it returns. Use the local wenlan pages <topic> CLI when you need to list or open Pages without the plugin.",
    actionBullets: [
      "Query: the answer depends on current project facts, private material, organizational policy, exact numbers, or a citation.",
      "Pre-retrieve: every valid answer must use one controlled source, such as a compliance rule or operating procedure.",
      "Let the agent decide: only some requests in the workflow need the corpus, and the tool description states its scope and exclusions.",
      "Skip: the task is a greeting, static routing step, deterministic operation, or the exact authoritative file is already open.",
      "Progressively disclose: inspect titles, paths, abstracts, or a maintained index before loading the full page or document.",
      "Verify: open the exact cited passage for important claims and mark unavailable evidence unknown rather than filling the gap from memory.",
      "Measure: record retrieved tokens, latency, answer quality, and failed searches on your own workload; do not reuse another system's savings percentage as a guarantee.",
    ],
    code: {
      label: "Retrieve a narrow topic, then inspect its maintained page",
      code: "# Wenlan plugin:\n/recall <topic>\n/wenlan pages <topic>\n\n# MCP-only client: call Wenlan recall and inspect returned Page results.\n# Local CLI for Page listing or opening:\nwenlan pages <topic>",
    },
    caution:
      "Smaller context is not automatically better. A skipped lookup can save tokens and still produce a wrong answer; an eager lookup can add irrelevant chunks and reduce focus. Keep the authoritative source boundary explicit and measure retrieval behavior with representative tasks.",
    faq: [
      "Should an AI agent query the knowledge base for every question?",
      "No. Always-on retrieval is appropriate only when every answer must use a controlled source. Otherwise expose a clearly scoped tool and let the workflow or agent query only when the task depends on that corpus.",
      "Does a knowledge base guarantee lower token cost?",
      "No. A compact index and selective retrieval can reduce repeated document reading, but embeddings, tool calls, returned chunks, and failed searches also cost time or tokens. Measure the complete workflow on your own tasks.",
    ],
    relatedSlugs: [
      "ai-work-memory-vs-knowledge-base",
      "coding-agent-source-backed-knowledge-base",
      "source-backed-wiki-pages-ai-work",
      "verify-ai-knowledge-base-citations",
    ],
    officialReferences: [
      {
        label: "Anthropic context engineering for AI agents",
        href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      },
      {
        label: "CareerWise knowledge-search tool-use case",
        href: "https://www.cythilya.tw/2026/07/16/careerwise-search-knowledge-tool/",
      },
      {
        label: "JitAI scenario-based knowledge-base retrieval",
        href: "https://jit.pro/zh/docs/devguide/knowledge-base/integrate-knowledge-base-into-agent",
      },
      {
        label: "OpenViking progressive context layers",
        href: "https://docs.openviking.ai/zh/concepts/03-context-layers",
      },
      {
        label: "Wenlan source-backed pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
    ],
    comparisonTable: {
      competitorName: "Retrieval action",
      rows: [
        {
          dimension: "Current, private, or citable fact",
          wenlan: "Query a narrow topic, then open the cited current source.",
          competitor: "Query",
        },
        {
          dimension: "Mandatory controlled evidence",
          wenlan: "Pre-retrieve the required source and keep later source access available.",
          competitor: "Pre-retrieve",
        },
        {
          dimension: "Exact authoritative file already open",
          wenlan: "Read and verify that file directly; do not add a redundant search.",
          competitor: "Skip retrieval",
        },
        {
          dimension: "Large or unfamiliar corpus",
          wenlan: "Inspect the index or maintained page before loading exact source sections.",
          competitor: "Progressive disclosure",
        },
      ],
    },
    cta: {
      heading: "Test one retrieval boundary",
      body: "Connect Wenlan, choose one repeated project question, and compare always-load, query-on-demand, and direct-source workflows without assuming a token-saving result.",
    },
  },
  {
    slug: "verify-ai-knowledge-base-citations",
    eyebrow: "Trust check",
    category: "Workflows",
    title: "How to Verify AI Knowledge Base Citations and Unsupported Claims",
    description:
      "Audit a RAG or AI knowledge-base answer claim by claim to find wrong pages, mismatched chunks, stale sources, and unsupported conclusions.",
    metaTitle: "Verify AI Knowledge Base Citations | Wenlan",
    metaDescription:
      "Check AI knowledge-base citations claim by claim. Diagnose wrong pages, mismatched chunks, stale revisions, and unsupported RAG answers.",
    keywords: [
      "verify AI knowledge base citations",
      "RAG wrong page citations",
      "RAG citation faithfulness",
      "unsupported claims RAG",
      "AI knowledge base provenance",
      "citation verification checklist",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    audience:
      "People debugging AI knowledge-base answers that look grounded but cite the wrong page, chunk, version, or source",
    heroBullets: [
      "A citation marker proves that a source was attached, not that the source supports the claim.",
      "Check each important claim against the exact page, chunk, and source revision.",
      "Classify the result as supported, partial, unsupported, or stale before reusing the answer.",
    ],
    quickAnswer:
      "To verify an AI knowledge-base answer, split it into testable claims, open the exact cited page or chunk for each claim, and record whether the current source fully supports it. Treat missing, broken, wrong-page, mismatched, and stale citations as different failures instead of one generic hallucination score.",
    problem:
      "An answer can be factually plausible while its citation points to the first retrieved source, an unrelated chunk, or an older document revision. The failure stays hidden when reviewers check only that citation markers exist instead of comparing each claim with the cited evidence.",
    wenlanFit:
      "Wenlan keeps Sources, atomic knowledge, and maintained Pages separate. Page citations, source IDs, revisions, stale state, lint, and human review make the evidence trail inspectable, but Wenlan does not automatically prove that every source is true or replace review of important claims.",
    actionHeading: "Run a claim-to-evidence audit",
    actionIntro:
      "Start with one suspect answer. Keep the audit small enough that another person can reproduce every decision.",
    actionBullets: [
      "Copy the answer into separate factual claims; ignore transitions and opinions that make no factual assertion.",
      "For each claim, record the citation marker, source ID, document title, page or section, and source revision when available.",
      "Open the cited location and check whether it supports the whole claim, only part of it, a different claim, or nothing at all.",
      "Mark the claim supported, partial, unsupported, or stale; do not convert a missing row or unavailable source into a pass.",
      "Check numbers, negations, attribution, scope, and dates separately because a nearby passage can still contradict the answer.",
      "Correct the answer or keep the conclusion unknown before refreshing a maintained page.",
      "Run lint and human review, then repeat the same question to confirm the repaired answer returns to the intended source.",
    ],
    code: {
      label: "Inspect and review one Wenlan Page",
      code: "/wenlan pages <topic>\n/wenlan lint\n/wenlan curate",
    },
    caution:
      "This workflow is a diagnostic checklist, not an automatic RAG benchmark. A cited source may itself be wrong, outdated, or non-authoritative, so consequential claims still require the maintained first-party source and appropriate human review.",
    faq: [
      "Does a citation mean the answer is grounded?",
      "No. It means a source reference exists. The cited location must still support the exact claim, scope, number, attribution, and current version.",
      "What should I do when the citation points to the wrong page?",
      "Record it as a mismatched citation, locate the actual supporting source if one exists, and correct or withhold the claim. Do not silently keep the answer because it sounds plausible.",
    ],
    relatedSlugs: [
      "fix-pdf-ingestion-ai-knowledge-base",
      "source-backed-wiki-pages-ai-work",
      "choose-ai-knowledge-base-tool",
      "distilled-wiki-pages-ai-memory",
      "when-ai-agent-should-query-knowledge-base",
      "ai-work-memory",
      "test-ai-knowledge-base-retrieval-after-changes",
      "source-backed-research-knowledge-base",
      "build-client-project-knowledge-base-for-consulting",
      "build-investment-research-knowledge-base",
      "build-product-research-knowledge-base-for-prd",
      "build-sre-incident-knowledge-base",
      "build-ict-supplier-due-diligence-evidence-pack",
      "build-customer-support-answer-knowledge-base",
      "build-business-metric-definition-knowledge-base",
    ],
    officialReferences: [
      {
        label: "Anthropic citations documentation",
        href: "https://platform.claude.com/docs/en/build-with-claude/citations",
      },
      {
        label: "Open WebUI wrong-source issue",
        href: "https://github.com/open-webui/open-webui/issues/12655",
      },
      {
        label: "Open WebUI identical-chunk citation issue",
        href: "https://github.com/open-webui/open-webui/issues/20435",
      },
      {
        label: "Wenlan review and trust guide",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "Verify one answer before expanding the knowledge base",
      body: "Use Wenlan to inspect the Page, source IDs, stale state, lint findings, and review path, then keep only claims the current evidence supports.",
    },
  },
  {
    slug: "source-backed-wiki-pages-ai-work",
    eyebrow: "Trust",
    category: "Concepts",
    title: "Build a Source-Backed AI Knowledge Base for Agents",
    description:
      "Build a source-backed AI knowledge base by connecting trusted sources, atomic knowledge, maintained LLM-wiki pages, citations, review, and refresh state.",
    metaTitle: "Build a Source-Backed AI Knowledge Base | Wenlan",
    metaDescription:
      "Build a source-backed AI knowledge base with trusted sources, atomic knowledge, maintained LLM-wiki pages, citations, review, and refresh.",
    keywords: [
      "source backed AI knowledge base",
      "AI knowledge base for agents",
      "maintained LLM wiki",
      "local AI knowledge base",
      "knowledge base provenance",
    ],
    publishedAt: "2026-06-06",
    updatedAt: "2026-09-08",
    audience: "Teams building a local AI knowledge base that agents and people can inspect",
    heroBullets: [
      "Trusted sources remain separate from the knowledge derived from them.",
      "Atomic knowledge preserves precise evidence before it becomes a page.",
      "Maintained pages carry citations, review, revisions, and refresh state.",
    ],
    quickAnswer:
      "To build a source-backed AI knowledge base, keep trusted sources, atomic knowledge, and maintained LLM-wiki pages separate. Connect them with citations, review, revisions, and refresh state so agents retrieve current answers and people can inspect why those answers are trusted.",
    problem:
      "Raw document dumps and one-off summaries both decay. A dump makes agents search too much context; a detached summary can become stale without showing which source supported it or what should refresh it.",
    wenlanFit:
      "Wenlan separates Sources, Memories, and Pages. Pages retain source links, revisions, stale reasons, and review state so you can inspect what changed after a rebuild. Those records do not establish that the model preserved every number or exposed every source conflict.",
    actionHeading: "Build the smallest maintainable loop",
    actionIntro:
      "Prove one topic end to end before importing a large archive.",
    actionBullets: [
      "Register or scope the trusted source that should support the topic.",
      "Capture one atomic fact with its source and why it matters.",
      "Distill only after a topic repeats or needs a reusable answer.",
      "Open the page and inspect the source IDs behind its claims.",
      "Run lint to find thin, stale, conflicting, or unsupported knowledge.",
      "Curate revisions and refresh the page when its evidence changes.",
    ],
    code: {
      label: "Wenlan knowledge-base loop",
      code: "/brief <topic>\n/capture <fact + source + why>\n/wenlan distill <topic>\n/wenlan pages <topic>\n/wenlan lint\n/wenlan curate",
    },
    caution:
      "A maintained page is still a claim, not ground truth. Verify important conclusions against the cited source, and mark the page stale when the source or operating context changes.",
    faq: [
      "Is an AI knowledge base the same as RAG?",
      "No. RAG retrieves source fragments at question time. A maintained knowledge base also keeps reusable answers, citations, review, and refresh state; it may use retrieval underneath.",
      "Should I import every note before starting?",
      "No. Start with one repeated, high-value topic and prove its source, capture, distill, inspection, lint, and review loop before expanding.",
    ],
    relatedSlugs: ["distilled-wiki-pages-ai-memory", "coding-agent-source-backed-knowledge-base", "when-ai-agent-should-query-knowledge-base", "verify-ai-knowledge-base-citations", "build-business-metric-definition-knowledge-base", "test-ai-knowledge-base-retrieval-after-changes", "prevent-multi-agent-knowledge-conflicts", "source-backed-research-knowledge-base", "build-client-project-knowledge-base-for-consulting", "build-investment-research-knowledge-base", "build-product-research-knowledge-base-for-prd", "build-sre-incident-knowledge-base", "review-before-trust-ai-memory", "ai-work-memory"],
    officialReferences: [
      {
        label: "Wenlan knowledge model",
        href: "https://github.com/wenlan-app/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan daily workflow",
        href: "https://github.com/wenlan-app/wenlan#daily-workflow",
      },
      {
        label: "Wenlan review and trust guide",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
  },
  {
    slug: "review-before-trust-ai-memory",
    eyebrow: "Trust",
    category: "Concepts",
    title: "How to Fix Stale AI Agent Memory",
    description:
      "A practical diagnostic for stale, contradictory, or wrong AI agent memory: inspect the source, preserve corrections, and delete only when necessary.",
    metaTitle: "Fix Stale AI Agent Memory: Diagnose & Correct | Wenlan",
    metaDescription:
      "Fix stale AI agent memory by tracing the source, checking scope, reviewing contradictions, preserving corrections, and deleting only records that should not remain.",
    keywords: [
      "stale AI agent memory",
      "contradictory agent memory",
      "fix AI memory",
      "AI memory debugging",
      "AI memory drift",
    ],
    updatedAt: "2026-07-24",
    audience: "AI-agent users debugging stale, conflicting, or wrong recalled context",
    heroBullets: [
      "Reproduce the bad recall before changing stored memory.",
      "Verify the current source and scope before deciding what is stale.",
      "Preserve corrections; permanently delete only what should not remain.",
    ],
    quickAnswer:
      "To fix stale AI agent memory, first reproduce the wrong recall and find the record that supplied it. Check the current source and scope, then decide whether the memory is outdated, contradictory, scoped to the wrong project, or simply false. Preserve useful history by capturing the current fact and reviewing the resulting revision; permanently delete only records that should not remain.",
    problem:
      "The failure is not always forgetting. An agent can confidently retrieve an old decision, mix facts from two projects, surface duplicate rules, or return both sides of a changed fact. That stale or contradictory agent memory can steer new work in the wrong direction while still looking plausible.",
    wenlanFit:
      "Wenlan keeps this workflow inspectable: /recall finds matching memories and source IDs, /wenlan lint deep can surface semantic contradiction candidates without changing data, and /wenlan curate revisions lets you accept or dismiss staged updates. /wenlan forget permanently deletes one explicit source ID and cannot be undone.",
    actionHeading: "Diagnose before you delete",
    actionIntro:
      "Treat stale memory like a debugging problem: reproduce it, trace it, correct it, and verify the same retrieval again.",
    actionBullets: [
      "Repeat the query that returned stale context and write down the expected current fact.",
      "Use /recall to inspect the matching content, source ID, revision state, and active project space.",
      "Check current source code, documentation, or the recorded decision before changing memory.",
      "Run /wenlan lint deep when you need a read-only pass over possible contradictions or duplicates.",
      "Capture the corrected current fact; if Wenlan stages a revision, inspect it with /wenlan curate revisions before accepting or dismissing it.",
      "Repeat the original recall and verify that current context now ranks ahead of obsolete context.",
      "Use /wenlan forget only for an explicit record that is wrong, sensitive, or should not remain in local history.",
    ],
    code: {
      label: "Stale-memory diagnostic",
      code: "/recall <stale topic>\n/wenlan lint deep\n/capture <current fact + why>\n/wenlan curate revisions\n/recall <same topic>\n# Destructive; cannot be undone:\n/wenlan forget <source_id>",
    },
    caution:
      "Do not delete every contradiction. It may show that a decision changed or that two contexts were mixed. Plain /wenlan lint and /wenlan lint deep are read-only; repair is a separate approval-gated workflow. Verify the source and scope before changing any record.",
    faq: [
      "Should I delete every stale or contradictory memory?",
      "No. Preserve ordinary changes as corrections or accepted revisions so the history remains inspectable. Delete only records that are wrong, sensitive, or should not be retained.",
      "Does /wenlan lint deep fix stale memory automatically?",
      "No. It is a read-only diagnostic. Review the evidence first, then use an explicit correction, revision decision, or destructive forget action.",
    ],
    relatedSlugs: ["ai-work-memory", "local-first-ai-memory", "source-backed-wiki-pages-ai-work"],
    officialReferences: [
      {
        label: "Wenlan review and trust docs",
        href: "https://wenlan.app/docs/review-and-trust",
      },
      {
        label: "Wenlan curate workflow",
        href: "https://github.com/wenlan-app/wenlan/blob/main/plugin/skills/curate/SKILL.md",
      },
      {
        label: "Wenlan lint workflow",
        href: "https://github.com/wenlan-app/wenlan/blob/main/plugin/skills/lint/SKILL.md",
      },
      {
        label: "Wenlan forget workflow",
        href: "https://github.com/wenlan-app/wenlan/blob/main/plugin/skills/forget/SKILL.md",
      },
    ],
  },
];

const localKnowledgeBaseArticle: LearnArticle = {
  "slug": "build-local-ai-knowledge-base-from-documents",
  "eyebrow": "Workflow",
  "category": "Workflows",
  "title": "Build a Personal AI Knowledge Base from Your Documents",
  "description": "Ask questions across your notes and documents, with sources you can check. No terminal needed.",
  "metaTitle": "Build a Personal AI Knowledge Base from Documents | Wenlan",
  "metaDescription": "Build a personal AI knowledge base without a terminal. Add documents in Wenlan, ask Claude, check sources, and verify an update with our real example.",
  "keywords": [
    "personal AI knowledge base",
    "build AI knowledge base",
    "local AI knowledge base",
    "AI knowledge base builder",
    "Markdown AI knowledge base",
    "PDF AI knowledge base",
    "Obsidian AI knowledge base",
    "AI knowledge base for coding agents",
    "Claude knowledge base",
    "Codex knowledge base"
  ],
  "publishedAt": "2026-08-01",
  "updatedAt": "2026-10-22",
  "author": "Qi-Xuan Lu",
  "readingTime": "7 min read",
  "audience": "People who want to ask AI about their own notes and documents without using a terminal",
  "openingExample": {
    "heading": "What you can do",
    "usesHeading": "What can you do with it?",
    "questions": [
      "What have I already learned about this topic?",
      "What did we decide about this project?",
      "Which document supports this answer?"
    ],
    "context": "Here’s a real example: Claude searches three documents from a fictional project called Cedar to find its approved launch date.",
    "question": "When is Cedar approved to launch?",
    "answer": "November 19, 2026",
    "answerDetail": "The November 12 plan was superseded.",
    "sourceImage": {
      "src": "/images/product-evidence/wenlan-cedar-approved-source.jpg",
      "alt": "The original approved Cedar decision in Wenlan, replacing November 12 with November 19.",
      "caption": "Original decision in Wenlan: November 19 replaces November 12.",
      "width": 2560,
      "height": 1440
    },
    "sourceLabel": "decision-2026-10-08.md",
    "sourceHref": "#check-original-source",
    "actionLabel": "Try the sample files",
    "image": {
      "src": "/images/product-evidence/claude-cedar-first-answer.jpg",
      "alt": "Actual Claude Opus 5.5 response through Wenlan: November 19, email only, security review, CSV, and unknown price; filenames and passages accompany the answer.",
      "caption": "Actual Claude reply; question above shortened.",
      "width": 1382,
      "height": 753
    }
  },
  "heroBullets": [
    "Add your documents in Wenlan; ask questions in a connected AI app such as Claude.",
    "Follow the desktop and browser steps below without a terminal. CLI instructions are an advanced option.",
    "Try three fictional files, then one update. Check the actual answers against their sources."
  ],
  "sections": [
    {
      "id": "wenlan-knowledge-base",
      "heading": "Why use Wenlan?",
      "body": [
        "Wenlan manages the documents; Claude uses them to answer your questions. Connect a folder, let Claude search its contents, and open the cited originals in Wenlan. When files change, refresh the source before asking again.",
        "Choose this setup for documents you’ll reuse and update. A one-off PDF question may only need a direct upload or Claude Projects."
      ]
    },
    {
      "id": "worked-example-files",
      "heading": "Start with three small documents",
      "body": [
        "Install Wenlan to manage the sources, and sign in to Claude in your browser to ask questions. The connection needs internet and your computer must stay on. Let Wenlan finish its local search setup before continuing.",
        "Download and extract the Cedar ZIP into a new folder. It contains an initial plan, an approved change, and a later call quoting the old date. Keep the answer record and fourth file outside this folder until the update step."
      ],
      "link": {
        "label": "Download the three initial sources (.zip)",
        "href": "/examples/claude-knowledge-base-check/initial-sources.zip"
      }
    },
    {
      "id": "add-documents-in-wenlan",
      "heading": "1. Add the folder in Wenlan",
      "steps": [
        {
          "title": "Choose Add a source → Connect a folder",
          "body": "On the Wenlan home screen, click Add a source, then Connect a folder. Select your extracted Cedar folder in the file picker. For an existing vault, choose Connect Obsidian vault instead; leave your real archive out of this trial.",
          "image": {
            "src": "/images/product-evidence/wenlan-cedar-add-source.jpg",
            "alt": "Wenlan 0.19.2: the actual Add a source menu, including Connect a folder and Connect Obsidian vault.",
            "caption": "Wenlan 0.19.2: the actual Add a source menu, including Connect a folder and Connect Obsidian vault.",
            "width": 2560,
            "height": 1440
          }
        },
        {
          "title": "Check that all three files are indexed",
          "body": "Open Sources → Cedar project. In Info, check Files: 3, Memories: 3 and Status: Available. If indexing is unfinished, wait or use Refresh. Seeing a filename alone does not prove it is searchable.",
          "image": {
            "src": "/images/product-evidence/wenlan-cedar-three-sources.jpg",
            "alt": "The three fictional Cedar sources in Wenlan, with three files and three indexed memories.",
            "caption": "The three fictional Cedar sources in Wenlan, with three files and three indexed memories.",
            "width": 2560,
            "height": 1440
          }
        }
      ],
      "body": [
        "Use a small test folder first so you can inspect every source."
      ]
    },
    {
      "id": "connect-claude-web",
      "heading": "2. Connect Claude once, using the interface",
      "body": [
        "This route uses Wenlan’s experimental Web access. Retrieved text passes through wenlan-relay to Claude; it is not an offline model. Our test used a separate library containing only fictional Cedar and Atlas data."
      ],
      "steps": [
        {
          "title": "Enable Web access in Settings → Connections",
          "body": "Before turning on Web access, confirm that every item in your Wenlan library is okay to share with Claude. Whole library exposes every Space and unscoped note, not just the Cedar folder. If there are private notes or you are unsure of the scope, stop here. Our test used Whole library in a separate library containing only fictional data. To continue with a shareable library, open the user account menu → Settings → Connections and turn on Let web and phone AI apps search your library."
        },
        {
          "title": "Choose Add to Claude and approve the connection",
          "body": "In Claude, review the Wenlan connector. If one already exists, use Customize → Connectors → Yours → Reconnect. Return to Wenlan to Allow the request. If the app does not open, use Have a code? in Web access and enter the code shown by the pairing page. Confirm Claude appears under Connected apps.",
          "image": {
            "src": "/images/product-evidence/wenlan-cedar-connected.jpg",
            "alt": "The actual test connection: Wenlan shows Claude under Connected apps. This is the isolated fictional library.",
            "caption": "The actual test connection: Wenlan shows Claude under Connected apps. This is the isolated fictional library.",
            "width": 2560,
            "height": 1440
          }
        }
      ],
      "link": {
        "label": "Check Claude’s current custom-connector availability",
        "href": "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp"
      }
    },
    {
      "id": "worked-example-question",
      "heading": "3. Ask Claude to search the sources",
      "body": [
        "Start a new Claude chat. Enable Wenlan in the chat’s connectors menu if needed, send the prompt below, and allow its read requests. Look for a Wenlan Recall call and source passages, not just a plausible answer.",
        "In our first attempt Claude guessed a Space named Cedar and received an error. Removing that filter worked. The corrected prompt names the documents without inventing a Space."
      ],
      "code": {
        "label": "Copy into the connected Claude chat",
        "code": "Use Wenlan to search the Cedar project documents. Cedar is a project name, not a Space; do not set a Space filter. What are the approved launch date, support channels, reason for the date change, export format, and product price? Cite filenames and supporting passages. A quoted old date does not change an approved decision. Say unknown when the documents do not specify. Use only Cedar sources; do not write anything."
      },
    },
    {
      "id": "check-original-source",
      "heading": "4. Open the cited original in Wenlan",
      "body": [
        "Return to Sources → Cedar project → decision-2026-10-08.md. Compare the quoted passage with the original. It approves November 19 and replaces November 12. The later client-call note merely quotes the old date; it does not approve another change."
      ],
      "image": {
        "src": "/images/product-evidence/wenlan-cedar-approved-source.jpg",
        "alt": "The original approved decision opened in Wenlan. The Info panel confirms it is indexed as one passage.",
        "caption": "The original approved decision opened in Wenlan. The Info panel confirms it is indexed as one passage.",
        "width": 2560,
        "height": 1440
      }
    },
    {
      "id": "worked-example-update",
      "heading": "5. Add one update and ask in a fresh chat",
      "body": [
        "Download the update below and move only decision-2026-10-15.md into the Cedar folder. In Wenlan, return to the folder, click Refresh, and confirm four files and four memories. Open the new file to check its text before asking again."
      ],
      "steps": [
        {
          "title": "Check the updated source",
          "body": "The new note changes support to email and in-app. It leaves the approved launch date at November 19 and the export format at CSV. An ordinary folder is checked periodically, but use Refresh and the index status to confirm this update.",
          "image": {
            "src": "/images/product-evidence/wenlan-cedar-update-source.jpg",
            "alt": "After Refresh, Wenlan shows four files and four memories. The new original changes support coverage and leaves the date unchanged.",
            "caption": "After Refresh, Wenlan shows four files and four memories. The new original changes support coverage and leaves the date unchanged.",
            "width": 2560,
            "height": 1440
          }
        },
        {
          "title": "Repeat the prompt in a new Claude conversation",
          "body": "Ask the same five questions with the corrected prompt. Do not paste the previous answer into the new conversation. Compare both answers and their citations with the source notes.",
          "image": {
            "src": "/images/product-evidence/claude-cedar-updated-answer.jpg",
            "alt": "A separate Claude conversation reads the updated library: support is now email and in-app, while the approved date remains November 19.",
            "caption": "A separate Claude conversation reads the updated library: support is now email and in-app, while the approved date remains November 19.",
            "width": 1382,
            "height": 753
          }
        }
      ],
      "link": {
        "label": "Download the support update (.md)",
        "href": "/examples/claude-knowledge-base-check/updates/decision-2026-10-15.md"
      }
    },
    {
      "id": "recorded-claude-knowledge-base-check",
      "heading": "What the actual test returned",
      "body": [
        "We ran this desktop-and-browser workflow on October 20, 2026 with Wenlan 0.19.2 and Claude Opus 5.5 Medium. Claude’s tool response contained the Cedar source text. Both conversations cited the relevant notes; the second had no earlier chat context.",
        "This small test proves retrieval and the manually confirmed update for these files. It does not establish automatic wiki maintenance, PDF ingestion, Codex behavior, or an offline AI. Whole-library search also returned Atlas demo hits, which Claude excluded from its answer; a prompt is not an access boundary."
      ],
      "table": {
        "columns": [
          "Check",
          "Three sources",
          "After adding the update"
        ],
        "rows": [
          [
            "Approved date",
            "November 19",
            "November 19"
          ],
          [
            "Support",
            "Email only",
            "Email and in-app"
          ],
          [
            "Reason / export",
            "Security review / CSV",
            "Security review / CSV"
          ],
          [
            "Missing price",
            "Unknown",
            "Unknown"
          ]
        ]
      },
      "link": {
        "label": "Inspect the recorded GUI test and the earlier CLI test",
        "href": "/examples/claude-knowledge-base-check/recorded-result.md"
      }
    },
    {
      "id": "claude-projects-knowledge-base",
      "heading": "Can I just use Claude Projects?",
      "body": [
        "Yes. Put the three initial files in project knowledge and run the same source check. Replace or add the changed source before the second test. Wenlan does not automatically import private Projects uploads.",
        "Check the current account limits and retrieval features in Anthropic’s guide. The Wenlan connector and Projects are different ways to provide source material."
      ],
      "link": {
        "label": "Claude Projects guide and current availability",
        "href": "https://support.claude.com/en/articles/9517075-what-are-projects"
      }
    },
    {
      "id": "try-obsidian-test-vault",
      "heading": "Advanced: use an Obsidian vault or a CLI client",
      "body": [
        "For the Obsidian-only branch, open Manage vaults → Open folder as vault → Open and select the Cedar folder. No community plugin is needed to view the notes. Claude Code or Codex must be installed and signed in to read that folder through a terminal."
      ],
      "steps": [
        {
          "title": "Open the same source notes in Obsidian",
          "body": "Open decision-2026-10-08 and check its approved date. Keep generated answers outside the vault. For the GUI route above, connect this vault through Wenlan’s Connect Obsidian vault; Wenlan then follows its changes in the background.",
          "image": {
            "src": "/images/product-evidence/obsidian-cedar-approved.jpg",
            "alt": "The same Cedar source decision in Obsidian 1.13.7; this is a source note, not an AI answer.",
            "caption": "The same Cedar source decision in Obsidian 1.13.7; this is a source note, not an AI answer.",
            "width": 2048,
            "height": 1600
          }
        },
        {
          "title": "Use a terminal only if you prefer a coding client",
          "body": "Replace the path below, start Claude Code, and ask it to read only the source notes. For Codex, use codex instead of claude. This reads the folder directly; keep generated answers outside it.",
          "code": {
            "label": "Optional terminal commands — replace the folder path",
            "code": "cd \"/full/path/to/Cedar project\"\nclaude"
          }
        },
        {
          "title": "Import into a connected Wenlan client instead",
          "body": "As an alternative to direct folder reading, first configure the Wenlan connection linked below. Run these separate commands to check it and import the folder, then ask that client to use Wenlan recall.",
          "code": {
            "label": "Optional terminal — after Wenlan client setup",
            "code": "wenlan status\nwenlan sources add \"/full/path/to/Cedar project\""
          }
        }
      ],
      "link": {
        "label": "Connect a CLI client to Wenlan",
        "href": "/docs/mcp-clients"
      }
    },
    {
      "heading": "File and privacy limits",
      "body": [
        "Wenlan supports .md, .txt and text-extractable .pdf documents. Image-only or scanned PDFs need OCR. Directory Sources do not ingest arbitrary source-code files. Wenlan reads an Obsidian vault without rewriting its Markdown.",
        "Local storage does not mean a local model. Review the source-sharing scope and the AI provider’s settings before using personal documents. Turn off Web access or remove the connected app when you no longer want it to query the library."
      ]
    }
  ],
  "faqs": [
    {
      "question": "Do I need Wenlan to make a personal AI knowledge base?",
      "answer": "No. Start with files or a vault if those fit your workflow. Wenlan is useful when you want a local source set and maintained Pages with inspectable source support across sessions or tools."
    },
    {
      "question": "Does local knowledge-base storage mean my model runs locally?",
      "answer": "No. Local files and a local memory layer do not determine where a connected model runs. A cloud client may send the selected content to its provider; check your client and model settings."
    },
    {
      "question": "Does Wenlan rewrite my Obsidian vault?",
      "answer": "No. The vault connects as a source that Wenlan follows in the background. Notes stay in Obsidian, and Wenlan never edits them without your OK; it writes a change only when you accept it. Its source-backed Pages are separate Markdown artifacts."
    },
    {
      "question": "Which files can Wenlan read?",
      "answer": "The documented source types include Markdown, plain text, and text-extractable PDFs. Image-only or scanned PDFs need OCR, and arbitrary source-code files are not ingested as Directory Sources."
    }
  ],
  "relatedSlugs": [
    "wenlan-vs-obsidian-ai-memory",
    "coding-agent-source-backed-knowledge-base",
    "source-backed-wiki-pages-ai-work",
    "fix-pdf-ingestion-ai-knowledge-base",
    "source-backed-research-knowledge-base",
    "distilled-wiki-pages-ai-memory",
    "choose-ai-knowledge-base-tool",
    "prevent-multi-agent-knowledge-conflicts",
    "build-client-project-knowledge-base-for-consulting",
    "build-investment-research-knowledge-base",
    "build-product-research-knowledge-base-for-prd",
    "build-sre-incident-knowledge-base",
    "build-ict-supplier-due-diligence-evidence-pack",
    "build-customer-support-answer-knowledge-base",
    "build-course-wiki-from-lecture-notes"
  ],
  "officialReferences": [
    {
      "label": "Claude Projects availability and reference knowledge",
      "href": "https://support.claude.com/en/articles/9517075-what-are-projects"
    },
    {
      "label": "Wenlan platform and client setup",
      "href": "https://github.com/wenlan-app/wenlan/blob/main/docs/setup-with-ai.md"
    },
    {
      "label": "Wenlan supported document sources",
      "href": "https://github.com/wenlan-app/wenlan#what-can-i-bring-in"
    },
    {
      "label": "Wenlan sources add CLI",
      "href": "https://github.com/wenlan-app/wenlan/blob/main/crates/wenlan-cli/README.md#wenlan-sources-add"
    },
    {
      "label": "Wenlan source-backed Pages",
      "href": "https://wenlan.app/docs/source-backed-pages"
    },
    {
      "label": "Claude custom connectors and current plan limits",
      "href": "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp"
    }
  ],
  "cta": {
    "heading": "Keep your personal knowledge-base loop current",
    "body": "Add a few documents, ask one useful question, inspect its sources, then check a real update before bringing in your archive."
  }
};

const retrievalRegressionArticle: LearnArticle = {
  slug: "test-ai-knowledge-base-retrieval-after-changes",
  eyebrow: "Retrieval regression",
  category: "Workflows",
  title: "How to Regression-Test AI Knowledge Base Retrieval After Changes",
  description:
    "Use a versioned golden query set to find RAG retrieval regressions after corpus, embedding, chunking, hybrid search, or reranker changes.",
  metaTitle: "RAG Retrieval Regression Testing | Wenlan",
  metaDescription:
    "Regression-test AI knowledge-base retrieval with golden queries, expected sources, Recall@k, MRR, no-answer cases, failure triage, and rollback.",
  keywords: [
    "RAG retrieval regression testing",
    "RAG golden dataset",
    "AI knowledge base retrieval evaluation",
    "embedding change retrieval regression",
    "chunking regression test RAG",
    "reranker regression testing",
  ],
  publishedAt: "2026-08-26",
  updatedAt: "2026-08-26",
  author: AUTHOR,
  readingTime: "8 min read",
  audience:
    "Developers changing an AI knowledge base corpus, embedding model, chunking, hybrid retrieval, or reranker",
  heroBullets: [
    "Freeze representative questions and their expected sources before changing retrieval.",
    "Change one factor, then compare retrieval before evaluating answer generation.",
    "Inspect every regression and keep rollback available until the new baseline is justified.",
  ],
  sections: [
    {
      heading: "Quick answer",
      body: [
        "To regression-test an AI knowledge base, version a small golden query set with expected source IDs or documents, no-answer cases, and a baseline manifest. Run the same set before and after one corpus or retrieval change, compare retrieval-only results first, inspect every lost or newly introduced source, and accept the change only when the differences are understood.",
        "This is different from citation verification. Citation verification starts with one produced answer and checks whether its evidence supports each claim. Retrieval regression starts before generation and asks whether the same questions still retrieve the intended evidence after the system changes.",
      ],
    },
    {
      heading: "Run the test whenever retrieval inputs change",
      body: [
        "Re-run the suite after adding, deleting, or revising source documents; changing embeddings or chunk size; adjusting lexical-vector fusion; replacing a reranker; or changing filters and metadata. A fluent demo query is not enough because a change can improve one topic while silently removing evidence for another.",
      ],
      bullets: [
        "Include frequent real questions, known failures, edge cases, and questions the corpus should not answer.",
        "Keep the authoritative source revision beside each expected result so an intentional corpus change can invalidate the old label explicitly.",
        "Do not refresh the golden set merely because the new system disagrees with it; investigate the disagreement first.",
      ],
    },
    {
      heading: "Define a versioned golden query set",
      body: [
        "Each case needs a stable ID, the natural user question, expected source IDs or documents, optional excluded sources, whether no answer is valid, and the reason the case matters. Store the corpus revision and retrieval configuration separately so two runs remain comparable.",
      ],
      code: {
        label: "Minimal product-neutral golden-set record",
        code: "version: 1\ncorpus_revision: docs-2026-08-26\ncases:\n  - id: install-windows\n    query: Which Windows package includes the desktop app?\n    expected_sources: [release-v0.16.0]\n    excluded_sources: [runtime-zip]\n    no_answer: false\n  - id: unsupported-pricing\n    query: What is the enterprise price?\n    expected_sources: []\n    no_answer: true",
      },
    },
    {
      heading: "Freeze the baseline, then change one factor",
      body: [
        "Record the corpus revision, embedding model, chunker and parameters, filters, hybrid weights, reranker version, top-k, and runtime environment. Change one factor at a time when possible. Otherwise the result may reveal drift without showing which change caused it.",
        "Compare source-level Recall@k or Hit@k first, then MRR or NDCG when rank order matters. Keep no-answer cases and latency visible, but do not combine every measure into one score that hides a lost critical source.",
      ],
    },
    {
      heading: "Inspect regressions before judging generated answers",
      body: [
        "For every failed case, inspect the rewritten query, retrieved chunks, scores, source IDs, filters, fusion result, reranker output, and final ordering. Separate missing documents, wrong labels, extraction defects, metadata filters, embedding drift, chunk-boundary loss, and reranker changes. A bad expected-source label can make the test wrong, while a good aggregate score can still hide one dangerous regression.",
        "Only after the expected evidence is available should you evaluate grounding or answer quality. Retrieval success does not prove that a model will use the evidence correctly; citation verification remains a separate downstream check.",
      ],
    },
    {
      heading: "Use Wenlan's maintainer drift test honestly",
      body: [
        "Wenlan's repository maintains labeled retrieval fixtures, retrieval-only Recall@5, MRR, and NDCG@10 snapshots, frozen ranking goldens, and an ignored ranking-drift test used by the main canary. The test detects drift, not correctness: it compares the current ranking with a trusted reference.",
        "This is a Wenlan maintainer workflow, not a released `wenlan eval` end-user command or hosted CI feature. Users can still apply the product-neutral golden-set method above to any knowledge base and keep the exact source and rollback decision in their own repository.",
      ],
      code: {
        label: "Wenlan repository maintainer-only drift check",
        code: "cargo test -p wenlan-core --lib \\\n  eval::retrieval_drift::tests::ranking_drift_vs_golden \\\n  -- --ignored --nocapture",
      },
    },
  ],
  faqs: [
    {
      question: "How large should a RAG golden dataset be?",
      answer:
        "Start with enough representative questions to cover important sources, known failures, and no-answer behavior. A small reviewed set is better than a large unverified one; expand it from real failures and record why each case belongs.",
    },
    {
      question: "Should I update the golden set after the corpus changes?",
      answer:
        "Only when the source contract intentionally changed. Review the old expectation against the new authoritative source, record the reason, and version the update instead of silently blessing the new result.",
    },
    {
      question: "Does a passing retrieval regression test prove answer quality?",
      answer:
        "No. It proves that the tested retrieval behavior stayed within its declared contract. Generation, citation faithfulness, and source correctness require separate checks.",
    },
  ],
  relatedSlugs: [
    "verify-ai-knowledge-base-citations",
    "source-backed-wiki-pages-ai-work",
    "choose-ai-knowledge-base-tool",
    "fix-pdf-ingestion-ai-knowledge-base",
    "when-ai-agent-should-query-knowledge-base",
    "build-customer-support-answer-knowledge-base",
  ],
  officialReferences: [
    {
      label: "Wenlan evaluation methodology",
      href: "https://wenlan.app/docs/evaluation",
    },
    {
      label: "Wenlan retrieval drift source",
      href: "https://github.com/wenlan-app/wenlan/blob/main/crates/wenlan-core/src/eval/retrieval_drift.rs",
    },
    {
      label: "Haystack retrieval debugging discussion",
      href: "https://github.com/deepset-ai/haystack/discussions/11697",
    },
    {
      label: "RAG evaluation and golden-set guide",
      href: "https://dataaspirant.com/blog/rag-evaluation/",
    },
    {
      label: "Merged retrieval regression implementation",
      href: "https://github.com/inherent-prime/inherent/pull/140",
    },
  ],
  cta: {
    heading: "Freeze one retrieval baseline",
    body: "Choose representative project questions, record their expected sources, and keep the baseline beside the source revisions before changing retrieval.",
  },
};

const sreIncidentKnowledgeBaseArticle: BaseSpec = {
  slug: "build-sre-incident-knowledge-base",
  eyebrow: "SRE knowledge workflow",
  category: "Workflows",
  title: "How to Build an SRE Incident Knowledge Base",
  description:
    "Turn runbooks, postmortems, and approved incident notes into current, source-backed operational knowledge for on-call engineers.",
  metaTitle: "Build an SRE Incident Knowledge Base | Wenlan",
  metaDescription:
    "Build a source-backed SRE incident knowledge base from runbooks and postmortems, with current revisions, verification steps, stale-state review, and clear safety limits.",
  keywords: [
    "SRE incident knowledge base",
    "runbook knowledge base",
    "postmortem knowledge base",
    "on-call operational knowledge",
    "AI SRE runbook",
    "incident learning workflow",
  ],
  publishedAt: "2026-08-29",
  updatedAt: "2026-09-08",
  readingTime: "9 min read",
  audience:
    "SRE, platform engineering, and on-call teams maintaining runbooks and post-incident knowledge",
  heroBullets: [
    "Keep one service, environment, and incident class inside a clear source boundary.",
    "Trace each diagnostic step, mitigation, and verification signal to a current runbook or postmortem.",
    "Review stale steps after every incident instead of letting old operational advice stay silently active.",
  ],
  quickAnswer:
    "Build one incident knowledge base per service or operational boundary. Register approved runbooks, postmortems, architecture notes, and incident summaries; then maintain one reviewable Page for the incident class with symptoms, preconditions, diagnostic steps, mitigation limits, abort conditions, verification signals, owner, and review date.",
  quickAnswerLink: {
    label: "See the incident evidence workflow",
    href: "#product-evidence",
  },
  wenlanFit:
    "Wenlan can keep supported documents connected to source-backed Pages, citations, revisions, stale state, lint, and human review. It does not monitor production, receive alerts, ingest live telemetry, execute runbooks, approve changes, or replace an incident-management system.",
  problem:
    "The failure appears when an engineer is paged for a problem the team has seen before, but the useful context is split across an old runbook, a postmortem, chat history, architecture notes, and somebody's memory. A plausible AI summary can make this worse if it hides the service version, environment, source revision, risk, or evidence behind a command.",
  actionHeading: "Build one incident-to-runbook review loop",
  actionIntro:
    "Start after the incident is stable. Use sanitized, approved documents and keep live credentials, customer data, raw secrets, and unreviewed production commands outside the knowledge base.",
  actionBullets: [
    "Choose one service, environment, and incident class. Record what is included, what stays in the monitoring or incident system, and who owns the operational knowledge.",
    "Register the current runbook, relevant postmortem, architecture note, and sanitized incident summary with their dates, versions, owners, and source locations.",
    "Create one maintained Page with symptoms, scope, preconditions, read-only checks, mitigation boundaries, escalation triggers, abort conditions, verification signals, and the next review date.",
    "Keep observed facts, hypotheses, mitigations, and confirmed causes separate. Do not rewrite a postmortem into a single neat cause when the evidence shows several contributing factors.",
    "After an incident or system change, resync the approved sources and mark affected steps stale until an owner verifies them against the current service and environment.",
    "Run a tabletop or staging exercise. Record which steps were reproducible, which links or commands were outdated, and what evidence was missing before the page is trusted for on-call use.",
    "Open the exact source before acting. A retrieved runbook is context for a qualified engineer, not permission to execute a production change.",
  ],
  code: {
    label: "After Wenlan and the AI client are configured",
    code: "wenlan status\nwenlan sources add ~/Ops/approved-incident-knowledge\n# In a Wenlan plugin client:\n/wenlan distill <service and incident class>\n/wenlan pages <service incident runbook>\n/wenlan lint\n/wenlan curate",
  },
  caution:
    "Keep monitoring, alert routing, telemetry, incident command, credentials, change approvals, rollback execution, and emergency access in their purpose-built systems. Wenlan does not validate a command against production or guarantee that a runbook is safe. A named owner must review service version, environment, permissions, risk, expected output, abort conditions, and rollback before operational use.",
  productEvidence: {
    heading: "Inspect the source and review state before trusting a runbook",
    summary:
      "This genuine Wenlan desktop capture comes from the app's deterministic test fixture, not an incident or customer workspace. It shows maintained Pages with source counts and a review queue, the same product surfaces an SRE can use to keep source changes and unresolved conflicts visible.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space showing maintained Pages with source counts and a review queue for source conflicts and newly available evidence.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture. Source counts and the review queue remain visible; the screenshot is a general product example, not production incident evidence.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Bound the incident knowledge",
        detail:
          "Select one service, environment, incident class, and approved source set instead of importing an unrestricted operational archive.",
      },
      {
        label: "Distill a reviewable runbook Page",
        detail:
          "Keep symptoms, evidence, read-only checks, mitigations, risks, abort conditions, and verification signals attached to current sources.",
      },
      {
        label: "Review after change or incident",
        detail:
          "Recheck the cited revision, stale state, and unresolved conflicts, then test the procedure in an approved non-production exercise.",
      },
    ],
    artifactHeading: "Worked incident knowledge packet",
    artifactNote:
      "This example defines the fields a reviewer should inspect. Replace every row with approved evidence for one service and incident class.",
    artifactRows: [
      {
        label: "Evidence input",
        detail:
          "A current runbook, dated postmortem, architecture note, or sanitized incident summary with owner and revision.",
      },
      {
        label: "Operational claim",
        detail:
          "One symptom, diagnostic step, mitigation boundary, or verification signal linked to the exact supporting passage.",
      },
      {
        label: "Review result",
        detail:
          "Current, contradicted, stale, unsafe, or unresolved, with the service version, environment, reviewer, and next test recorded.",
      },
    ],
    action: {
      label: "See the incident evidence workflow",
      href: "#product-evidence",
    },
  },
  faq: [
    "Can Wenlan monitor incidents or run remediation commands?",
    "No. Wenlan does not receive alerts, ingest live telemetry, execute runbooks, approve changes, or replace monitoring and incident-management systems. It keeps approved operational knowledge source-backed and reviewable.",
    "How do we stop an old runbook from misleading on-call engineers?",
    "Give each Page a source revision, service and environment scope, owner, review date, expected signals, and abort conditions. After a source or system change, mark affected guidance stale until an approved exercise verifies it again.",
  ],
  relatedSlugs: [
    "build-local-ai-knowledge-base-from-documents",
    "source-backed-wiki-pages-ai-work",
    "verify-ai-knowledge-base-citations",
    "test-ai-knowledge-base-retrieval-after-changes",
    "prevent-multi-agent-knowledge-conflicts",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
    {
      label: "Microsoft Azure SRE Agent knowledge documents",
      href: "https://learn.microsoft.com/en-us/azure/sre-agent/tutorial-upload-knowledge-document",
    },
    {
      label: "AWS playbooks for failure investigation",
      href: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_testing_resiliency_playbook_resiliency.html",
    },
    {
      label: "Operate First incident and postmortem process",
      href: "https://github.com/operate-first/sre/blob/main/process/incident_management.md",
    },
  ],
  cta: {
    heading: "Make one incident lesson reproducible",
    body: "Choose one service and incident class, connect the current runbook and postmortem, then review every operational claim before the next on-call shift.",
  },
};

workflowArticles.push(sreIncidentKnowledgeBaseArticle);

const competitiveIntelligenceKnowledgeBaseArticle: BaseSpec = {
  slug: "build-competitive-intelligence-knowledge-base",
  eyebrow: "Competitive intelligence workflow",
  category: "Workflows",
  title: "How to Build a Source-Backed Competitive Intelligence Knowledge Base",
  description:
    "Keep competitor research current with a bounded source register, dated evidence, explicit uncertainty, and reviewable knowledge-base Pages.",
  metaTitle: "Build a Source-Backed Competitive Intelligence Knowledge Base | Wenlan",
  metaDescription:
    "Organize competitor research from permitted documents with source dates, revisions, stale claims, contradictions, and a human review loop.",
  keywords: [
    "competitive intelligence knowledge base",
    "competitor research knowledge base",
    "how to organize competitor research",
    "source-backed competitor research",
    "competitive intelligence workflow",
    "competitor information update",
    "AI knowledge base for product research",
  ],
  publishedAt: "2026-08-30",
  updatedAt: "2026-09-08",
  readingTime: "9 min read",
  audience:
    "Product marketing managers, founders, and product, strategy, or market researchers maintaining competitor evidence",
  heroBullets: [
    "Start with one decision and a bounded set of competitors instead of an unreviewed market archive.",
    "Register each source with its date, revision, scope, and next review so stale claims stay visible.",
    "Separate observations, inferences, assumptions, and unknowns before a battlecard or product decision uses them.",
  ],
  quickAnswer:
    "Build one competitor dossier for one decision, review question, or product area. Register user-collected and permitted product docs, manuals, release notes, and research notes with source, date, revision, scope, and review owner. Then maintain a source-backed Page that separates observations from inferences, preserves contradictions, and marks stale claims before anyone uses the dossier.",
  wenlanFit:
    "Wenlan can connect supported Markdown, text, text-extractable PDFs, folders, and read-only Obsidian sources to source-backed Pages, citations, revisions, stale state, lint, and human review. It does not crawl competitor sites, scrape reviews, monitor live pricing, discover competitors, send alerts, score vendors, make recommendations, or decide legal or commercial strategy.",
  problem:
    "A competitor spreadsheet or battlecard goes stale when product pages, documentation, releases, and positioning change but nobody can tell which claim came from which revision. A polished AI summary can hide that gap. A useful competitive intelligence knowledge base keeps a small, inspectable evidence chain so a researcher can tell what was observed, what was inferred, what is unknown, and what needs another check.",
  actionHeading: "Build one competitor dossier that can be reviewed",
  actionIntro:
    "Use one decision and a small source boundary first. The workflow remains useful without Wenlan because the source register and claim classifications are the durable practice.",
  actionBullets: [
    "Name the decision, review question, competitors, date range, source types, and excluded material. Do not ask an assistant to discover an unrestricted market corpus.",
    "Collect only permitted, user-provided sources such as product documentation, user manuals, release notes, dated research notes, or a read-only Obsidian vault. Keep credentials, private customer data, and restricted material outside the boundary.",
    "Record each source URL or file, publication or access date, version or revision, competitor, scope, authority, allowed use, and next review date.",
    "Classify every important statement as observation, inference, assumption, contradiction, or unknown. Preserve the exact passage and do not turn an inference into a competitor fact.",
    "Compare one product question or module at a time across the same source class. Record missing evidence instead of filling a row with generic market language.",
    "When a release or source changes, resync the affected source and mark dependent claims stale or contradicted until a reviewer checks the new revision.",
    "Before using a battlecard, positioning update, or product decision, open the source, check its scope and date, and leave the unresolved questions visible.",
  ],
  code: {
    label: "A bounded competitor-evidence workflow",
    code: "wenlan status\nwenlan sources add ~/Research/competitors\n# In a Wenlan plugin client:\n/wenlan distill <competitor research question>\n/wenlan pages <competitor topic>\n/wenlan lint\n/wenlan curate",
  },
  caution:
    "This is not automated market intelligence. Wenlan does not crawl or scrape competitor sites, monitor live websites or pricing, ingest reviews, discover competitors, run alerts, score products, generate recommendations, or make legal or commercial decisions. It only organizes supported sources you are allowed to use; verify public facts, permissions, dates, and strategic conclusions with the responsible human reviewer.",
  productEvidence: {
    heading: "Inspect the evidence and review state before using a dossier",
    summary:
      "This genuine Wenlan desktop capture comes from the app's deterministic test fixture, not a competitor workspace or customer data. It shows maintained Pages with source counts and a review queue, the product surfaces used to keep source changes and unresolved evidence visible.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space showing maintained Pages with source counts and a review queue for source conflicts and newly available evidence.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture. It is a general product example, not competitor research evidence; source counts and review state remain directly inspectable.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Bound the research question",
        detail:
          "Choose one decision, product question, competitor set, time range, and permitted source boundary instead of importing an unrestricted market archive.",
      },
      {
        label: "Distill a source-backed dossier",
        detail:
          "Keep observations, inferences, contradictions, stale claims, and unknowns connected to dated source revisions in a maintained Page.",
      },
      {
        label: "Review before reuse",
        detail:
          "Open the cited passage, confirm its scope and revision, and leave unresolved evidence visible before a battlecard or product decision uses it.",
      },
    ],
    artifactHeading: "Worked competitor evidence packet",
    artifactNote:
      "This is a product-neutral structure, not a claim about any competitor. Replace every row with permitted, dated evidence from the decision you are reviewing.",
    artifactRows: [
      {
        label: "Evidence input",
        detail:
          "A product document, manual, release note, or dated research note with source location, revision, scope, and allowed-use status.",
      },
      {
        label: "Claim classification",
        detail:
          "An observation, inference, assumption, contradiction, or unknown linked to the exact passage rather than a polished summary alone.",
      },
      {
        label: "Review result",
        detail:
          "Current, stale, contradicted, or unresolved, with reviewer, next check, and the decision context recorded before reuse.",
      },
    ],
    action: {
      label: "See the evidence review workflow",
      href: "#product-evidence",
    },
  },
  faq: [
    "Can Wenlan monitor competitors or track live pricing?",
    "No. Wenlan does not crawl or scrape competitor sites, monitor live pricing or reviews, discover competitors, or send alerts. Add only supported sources you are permitted to use, then review their dates and scope yourself.",
    "Should an AI agent automatically write the final competitor recommendation?",
    "No. Wenlan can organize source-backed observations and surface stale or conflicting claims, but a responsible human must interpret the evidence and make product, positioning, legal, or commercial decisions.",
  ],
  relatedSlugs: [
    "source-backed-research-knowledge-base",
    "verify-ai-knowledge-base-citations",
    "build-local-ai-knowledge-base-from-documents",
    "test-ai-knowledge-base-retrieval-after-changes",
    "build-product-research-knowledge-base-for-prd",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
    {
      label: "How to Build a Competitive Intelligence Program",
      href: "https://www.aqute.com/blog/build-competitive-intelligence-program",
    },
    {
      label: "Competitive intelligence source guidance (Taiwan Marketing Research)",
      href: "https://tmrmds.co/article-business/21696/",
    },
    {
      label: "竞品调研 workflow case (人人都是产品经理)",
      href: "https://www.woshipm.com/pd/6395378.html",
    },
  ],
  cta: {
    heading: "Make one competitor decision traceable",
    body: "Choose a bounded question, connect permitted sources, and review every consequential claim before it reaches a battlecard or product decision.",
  },
};

workflowArticles.push(competitiveIntelligenceKnowledgeBaseArticle);

const ictSupplierDueDiligenceArticle: BaseSpec = {
  slug: "build-ict-supplier-due-diligence-evidence-pack",
  eyebrow: "Supplier review workflow",
  category: "Workflows",
  title: "How to Build an ICT Supplier Due Diligence Evidence Pack",
  description:
    "Organize approved software-supplier documents into a source-backed evidence pack with provenance, scope, gaps, owners, and review dates.",
  metaTitle: "Build an ICT Supplier Due Diligence Evidence Pack | Wenlan",
  metaDescription:
    "Build a source-backed ICT supplier due diligence evidence pack for software vendor security review, with provenance, scope, gaps, and re-review dates.",
  keywords: [
    "ICT supplier due diligence",
    "software vendor security assessment",
    "supplier cybersecurity evidence pack",
    "third party risk assessment documents",
    "vendor due diligence checklist",
    "supplier security review",
  ],
  publishedAt: "2026-08-30",
  updatedAt: "2026-09-08",
  readingTime: "9 min read",
  audience:
    "Procurement, security, and IT owners reviewing one ICT or software supplier before approval or renewal",
  heroBullets: [
    "Keep every supplier claim attached to an approved document, date, revision, and evidence scope.",
    "Record data access, resilience, foundational security evidence, dependencies, and unanswered questions separately.",
    "Give the packet an owner and re-review date instead of turning old questionnaire answers into permanent truth.",
  ],
  quickAnswer:
    "Build one evidence pack for one ICT or software supplier. Register only approved source documents, then record each claim's provenance, revision, data-access scope, resilience and security evidence, dependencies, gaps, owner, and review date. Mark unsupported or stale claims as unverified and keep the final approval decision with procurement, security, legal, and privacy reviewers.",
  quickAnswerLink: {
    label: "See the supplier evidence workflow",
    href: "#product-evidence",
  },
  wenlanFit:
    "Wenlan can connect supported Markdown, text, text-extractable PDFs, folders, and read-only Obsidian sources to source-backed Pages, citations, revisions, stale state, lint, and human review. It does not validate certifications, crawl vendor sites, monitor suppliers, scan vulnerabilities, score risk, or approve procurement.",
  problem:
    "Supplier reviews often mix a current security policy, an old questionnaire, an architecture diagram, a certification claim, and an email clarification into one spreadsheet. Without source dates and scope, a confident summary can hide which statement is current, which applies only to one service, and which still lacks evidence.",
  actionHeading: "Build one reviewable supplier evidence pack",
  actionIntro:
    "Start with one supplier and one procurement or renewal decision. The source register and review fields remain useful even if the team does not use Wenlan.",
  actionBullets: [
    "Define the supplier, product or service, decision, business owner, review team, date range, approved source set, and excluded confidential material.",
    "Register current policies, architecture and data-flow documents, resilience material, subprocessors or dependencies, completed questionnaires, and dated clarifications only when your organization has approved their use.",
    "For every important claim, record the exact source passage, document revision, service scope, data-access profile, evidence owner, and next review date.",
    "Separate supplied evidence, reviewer interpretation, residual risk, missing evidence, contradictions, and open questions. Never turn an unanswered questionnaire row into an affirmative control claim.",
    "Map dependencies and supplier tiers explicitly. A downstream service, subprocessor, or hosting dependency may need its own evidence and owner.",
    "When a document or service scope changes, resync the affected source and mark dependent claims stale until a qualified reviewer checks the new revision.",
    "Before approval or renewal, open the cited source and let procurement, security, legal, and privacy owners make the decision under the organization's existing controls.",
  ],
  code: {
    label: "A bounded supplier-evidence workflow",
    code: "wenlan status\nwenlan sources add ~/Reviews/approved-supplier-docs\n# In a Wenlan plugin client:\n/wenlan distill <supplier and review scope>\n/wenlan pages <supplier evidence pack>\n/wenlan lint\n/wenlan curate",
  },
  caution:
    "A questionnaire or evidence pack is not a security guarantee. Wenlan does not validate certifications, perform legal or privacy review, discover vendors, crawl websites, monitor live supplier changes, scan vulnerabilities, score risk, or approve or reject a supplier. Keep sensitive material inside your organization's approved access controls and use qualified human reviewers.",
  productEvidence: {
    heading: "Inspect source and review state before reusing a supplier claim",
    summary:
      "This genuine Wenlan desktop capture comes from the app's deterministic test fixture, not a supplier review or customer workspace. It shows maintained Pages with source counts and a review queue, the product surfaces used to keep source changes and unresolved evidence visible.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space showing maintained Pages with source counts and a review queue for source conflicts and newly available evidence.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture. It is a general product example, not supplier security evidence; source counts and review state remain directly inspectable.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Bound the supplier review",
        detail:
          "Choose one supplier, service, decision, approved source set, and responsible reviewers before adding material.",
      },
      {
        label: "Build a cited evidence register",
        detail:
          "Keep provenance, revision, data-access scope, resilience and security evidence, dependencies, gaps, and questions attached to exact sources.",
      },
      {
        label: "Re-review before a decision",
        detail:
          "Open the cited passage, inspect stale or conflicting evidence, and leave approval with the organization's qualified procurement, security, legal, and privacy owners.",
      },
    ],
    artifactHeading: "Worked supplier evidence packet",
    artifactNote:
      "This is a vendor-neutral review structure, not a certification or procurement decision. Replace every row with approved evidence for one supplier and service scope.",
    artifactRows: [
      {
        label: "Evidence input",
        detail:
          "An approved policy, architecture or data-flow document, resilience plan, questionnaire, subprocessor record, or dated clarification with revision and owner.",
      },
      {
        label: "Review statement",
        detail:
          "One supplied fact, reviewer interpretation, residual risk, contradiction, missing item, or open question linked to the exact passage and service scope.",
      },
      {
        label: "Review state",
        detail:
          "Current, stale, contradicted, unsupported, or pending, with evidence owner, reviewer, dependency, and next review date recorded.",
      },
    ],
    action: {
      label: "See the supplier evidence workflow",
      href: "#product-evidence",
    },
  },
  faq: [
    "Can Wenlan validate a supplier's certification or approve the vendor?",
    "No. Wenlan does not validate certifications, score supplier risk, or approve procurement. It helps keep approved documents, claims, gaps, revisions, and review state inspectable for qualified reviewers.",
    "Is a completed vendor questionnaire enough evidence?",
    "No. Treat each answer as one supplied claim. Record its source, date, scope, owner, supporting document, contradictions, and next review date; leave unsupported answers explicitly unverified.",
  ],
  relatedSlugs: [
    "build-local-ai-knowledge-base-from-documents",
    "verify-ai-knowledge-base-citations",
    "source-backed-research-knowledge-base",
    "choose-ai-knowledge-base-tool",
    "build-competitive-intelligence-knowledge-base",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
    {
      label: "NIST SP 1326 ICT supplier due diligence guide",
      href: "https://www.nist.gov/publications/nist-cybersecurity-supply-chain-management-due-diligence-assessment-quick-start-guide",
    },
    {
      label: "Microsoft Supplier Security and Privacy Assurance",
      href: "https://learn.microsoft.com/en-us/compliance/assurance/assurance-supplier-security-and-privacy-assurance-program",
    },
  ],
  cta: {
    heading: "Make one supplier review traceable",
    body: "Choose one supplier and service scope, connect approved evidence, and leave every unsupported or stale claim visible before the decision meeting.",
  },
};

workflowArticles.push(ictSupplierDueDiligenceArticle);

const customerSupportAnswerKnowledgeBaseArticle: BaseSpec = {
  slug: "build-customer-support-answer-knowledge-base",
  eyebrow: "Support answer workflow",
  category: "Workflows",
  title: "How to Build a Customer Support Answer Knowledge Base",
  description:
    "Keep customer-support answers reviewable after product or policy changes with approved sources, explicit scope, prohibited promises, owners, and review dates.",
  metaTitle: "Build a Customer Support Answer Knowledge Base | Wenlan",
  metaDescription:
    "Build a source-backed customer-support answer knowledge base from approved product and policy documents, with scope, prohibited promises, escalation, owners, and review dates.",
  keywords: [
    "customer support knowledge base",
    "customer service knowledge base",
    "support answer knowledge base",
    "how to keep support knowledge base updated",
    "source-backed support answers",
    "customer support content workflow",
  ],
  publishedAt: "2026-08-31",
  updatedAt: "2026-09-08",
  readingTime: "8 min read",
  audience:
    "Support operations, technical writers, product support, and customer-success content owners maintaining approved customer answers",
  heroBullets: [
    "Start with one approved product or policy change and the support questions it affects.",
    "Record the supported answer, scope, prohibited promises, escalation condition, source revision, owner, and next review date.",
    "Keep stale or unsupported answers visible for human review instead of publishing or sending them automatically.",
  ],
  quickAnswer:
    "Build one answer pack for one support area and an approved set of product or policy documents. For each customer question, record the supported answer, scope, prohibited promise, escalation condition, source revision, human owner, and next review date. When a source changes, mark dependent answers stale or unresolved until the owner reviews the current passage.",
  quickAnswerLink: {
    label: "See the support answer evidence workflow",
    href: "#product-evidence",
  },
  wenlanFit:
    "Wenlan can connect supported Markdown, text, text-extractable PDFs, folders, and read-only Obsidian sources to source-backed Pages, citations, revisions, stale state, lint, and human review. It does not ingest help-desk tickets, CRM records, or raw customer conversations; it does not handle PII; it does not connect to support channels; it does not publish customer-facing answers; it does not generate replies; it does not synchronize channels; it does not automatically escalate.",
  problem:
    "The failure appears after a product release or policy change: a support answer still sounds plausible, but its scope, effective date, exception, or promise no longer matches the approved source. A shared document or polished AI summary hides which revision supports the answer and who must review it. A useful support knowledge base keeps each answer small enough to check and leaves unsupported questions visible rather than filling them with confident language.",
  actionHeading: "Build one question-to-answer review loop",
  actionIntro:
    "Start with one support area and a small set of approved product or policy documents. Keep customer conversations, tickets, CRM records, personal data, and any material you are not authorized to use outside the source boundary.",
  actionBullets: [
    "Name the product or policy area, effective date, support audience, included documents, excluded material, and human content owner.",
    "Register the approved Markdown, text, text-extractable PDF, folder, or read-only Obsidian source with its title, revision, date, and allowed scope.",
    "Create one answer record per recurring customer question. Separate the supported answer from applicability, prohibited promises, escalation conditions, and unresolved exceptions.",
    "Connect each important answer statement to the exact source passage and keep the source revision beside the record.",
    "When a release or policy changes, resync the affected source and mark dependent answers stale or unsupported until the owner checks the new revision.",
    "Before an answer is reused, have the owner open the source, confirm scope and effective date, and record the next review date. This workflow does not publish or send a reply.",
  ],
  code: {
    label: "Wenlan workflow and a neutral support answer record",
    code: "wenlan status\nwenlan sources add ~/Support/approved-product-policy\n# In a Wenlan plugin client:\n/wenlan distill <support answer topic>\n/wenlan pages <support answer topic>\n/wenlan lint\n/wenlan curate\n\nquestion: Can an existing subscription change plans immediately?\nsupported_answer: <answer supported by the approved policy>\nscope: <plan, region, account state, and effective date>\ndo_not_promise: <actions or outcomes the source does not authorize>\nescalate_when: <conditions requiring a human owner>\nsource_revision: <document ID, section, and revision>\nowner: <human content owner>\nnext_review: <date or product-change trigger>",
  },
  caution:
    "This is a source-backed content review workflow, not a help desk or customer-support automation system. Wenlan does not handle PII or promise redaction, provide team permissions, run support analytics, approve policies automatically, publish customer-facing answers, generate or deliver replies, synchronize channels, or automatically escalate a case. A qualified human owner must decide what an approved answer means and when it can be reused.",
  productEvidence: {
    heading: "Inspect source and review state before reusing an answer",
    summary:
      "This genuine Wenlan desktop capture comes from the app's deterministic test fixture, not a customer-support workspace or customer conversation. It shows maintained Pages with source counts and a review queue, the product surfaces used to keep source changes and unresolved evidence visible.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space showing maintained Pages with source counts and a review queue for source conflicts and newly available evidence.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture. It is a general product example, not customer-support evidence; source counts and review state remain directly inspectable.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Bound the answer pack",
        detail:
          "Choose one support area, approved source set, effective date, and human content owner before drafting answers.",
      },
      {
        label: "Distill a cited answer record",
        detail:
          "Keep the question, supported answer, scope, prohibited promise, escalation condition, source revision, and next review attached to exact sources.",
      },
      {
        label: "Review before reuse",
        detail:
          "Open the cited passage, inspect stale or conflicting evidence, and leave publication or reply delivery outside this workflow.",
      },
    ],
    artifactHeading: "Worked support answer record",
    artifactNote:
      "This neutral template is not a customer promise. Replace every placeholder with an approved source and a named human owner before reuse.",
    artifactRows: [
      {
        label: "Question and answer",
        detail:
          "One customer question paired with the shortest answer the approved product or policy source actually supports.",
      },
      {
        label: "Scope and boundaries",
        detail:
          "Applicable plan, region, account state, effective date, prohibited promises, exceptions, and conditions that require escalation.",
      },
      {
        label: "Review ownership",
        detail:
          "Source document and revision, human owner, current review state, and next review date or product-change trigger.",
      },
    ],
    action: {
      label: "See the support answer evidence workflow",
      href: "#product-evidence",
    },
  },
  faq: [
    "Can Wenlan ingest support tickets or send customer replies?",
    "No. This workflow uses approved documents you can inspect. Wenlan does not ingest help-desk tickets, CRM records, or raw customer conversations, and it does not publish, generate, deliver, or synchronize customer replies.",
    "What should happen when a product or policy changes?",
    "Resync the approved source, mark dependent answers stale or unresolved, and have the named owner review the current passage, scope, prohibited promises, escalation condition, source revision, and next review date before reuse.",
  ],
  relatedSlugs: [
    "build-local-ai-knowledge-base-from-documents",
    "verify-ai-knowledge-base-citations",
    "test-ai-knowledge-base-retrieval-after-changes",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan sources add CLI",
      href: "https://github.com/wenlan-app/wenlan/blob/main/crates/wenlan-cli/README.md#wenlan-sources-add",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
  ],
  cta: {
    heading: "Make one support answer reviewable",
    body: "Choose an approved product or policy source, record one bounded answer, and keep its revision, owner, limitations, and next review visible before anyone reuses it.",
  },
};

workflowArticles.push(customerSupportAnswerKnowledgeBaseArticle);

const courseWikiFromLectureNotesArticle: BaseSpec = {
  slug: "build-course-wiki-from-lecture-notes",
  eyebrow: "Course wiki workflow",
  category: "Workflows",
  title: "How to Build a Course Wiki from Lecture Notes and PDFs",
  description:
    "Turn one course's readable lecture slides, notes, and PDFs into a maintained wiki with exact sources, prerequisite links, revisions, and review state.",
  metaTitle: "Build a Course Wiki from Lecture Notes and PDFs | Wenlan",
  metaDescription:
    "Build a source-backed course wiki from lecture slides, notes, and readable PDFs, with concept pages, prerequisites, citations, source revisions, and review state.",
  keywords: [
    "course wiki from lecture notes",
    "turn lecture slides into a wiki",
    "source backed AI study notes",
    "student LLM wiki",
    "lecture notes knowledge base",
    "course PDF knowledge base",
  ],
  publishedAt: "2026-08-31",
  updatedAt: "2026-09-08",
  readingTime: "8 min read",
  audience:
    "Students, independent learners, and educators organizing one course's readable lecture slides, notes, and PDFs",
  heroBullets: [
    "Start with one course and an approved folder of readable lecture materials.",
    "Create one concept page at a time with exact sources, prerequisite links, and open questions.",
    "Track source revisions and review state so revised slides do not leave polished but stale notes behind.",
  ],
  quickAnswer:
    "Create one source boundary for one course, register its readable lecture slides, notes, and text-extractable PDFs, then maintain one page per durable concept. Each concept page should name its prerequisite concepts, cite the exact lecture or page, record the source revision, and show whether the explanation is current, stale, contradicted, or awaiting review.",
  quickAnswerLink: {
    label: "See the course-wiki evidence workflow",
    href: "#product-evidence",
  },
  wenlanFit:
    "Wenlan can sync supported course documents, distill source-backed Pages, preserve citations and wikilinks, surface stale dependencies, and keep revisions reviewable. It is not equivalent to NotebookLM and does not generate flashcards, create quizzes, transcribe audio, run OCR, grade work, tutor students, solve homework, plan exams, or make academic judgments.",
  problem:
    "Lecture materials accumulate by week, but the durable ideas do not follow the same structure. A definition may live in week two, its prerequisite in week one, a correction in a later slide deck, and an exception in a reading note. A one-time summary hides those relationships and can stay fluent after the instructor revises the source. A useful course wiki keeps the explanation small, linked, and traceable to the current material.",
  actionHeading: "Build one course-material to concept-page loop",
  actionIntro:
    "Use materials you are allowed to store and inspect. Begin with one course, one term or version, and a small source set so that every concept page can still be checked against its lecture material.",
  actionBullets: [
    "Name the course, term, source owner, included folders, excluded material, and the learner or educator responsible for review.",
    "Register readable Markdown, text, or text-extractable PDFs. Keep scanned PDFs outside the workflow until an external OCR step produces text you can verify.",
    "Create one page per durable concept instead of one giant course summary. Give every page a question it answers and a short current explanation.",
    "Link prerequisite concepts explicitly and record unresolved terms, conflicting explanations, and examples that belong to another page.",
    "Attach important statements to the exact lecture, page, section, or source ID and record the source revision or course-material date.",
    "When slides or notes change, resync the source, mark dependent pages stale or unresolved, and review the cited passage before accepting the new explanation.",
  ],
  code: {
    label: "Wenlan workflow and a neutral course concept record",
    code: "wenlan status\nwenlan sources add ~/Courses/distributed-systems/materials\n# In a Wenlan plugin client:\n/wenlan distill <course concept>\n/wenlan pages <course concept>\n/wenlan lint\n/wenlan curate\n\nconcept: leader election\nquestion: Why can two nodes not both remain leader in the same term?\nprerequisites: terms; quorum intersection\nanswer: <short explanation supported by the course material>\nsources: <lecture, slide or page, and source ID>\nsource_revision: <term, file revision, or material date>\nreview_state: <current | stale | contradicted | unresolved>\nreviewer: <student or educator>\nnext_review: <source-change trigger or date>",
  },
  caution:
    "This is a source-backed study organization workflow, not an AI tutor or assessment system. Wenlan does not generate flashcards, does not create quizzes, does not transcribe audio, does not run OCR, does not grade work, does not tutor students, does not solve homework, does not plan exams, and is not equivalent to NotebookLM. The learner or educator remains responsible for source rights, interpretation, academic integrity, and review.",
  productEvidence: {
    heading: "Inspect source and review state before trusting a concept page",
    summary:
      "This genuine Wenlan desktop capture comes from the app's deterministic test fixture, not a school, course, or student workspace. It shows maintained Pages with source counts and a review queue, the same product surfaces used to keep revised course material and unresolved evidence visible.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space showing maintained Pages with source counts and a review queue for changed and conflicting evidence.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture. It is a general product example, not course data or a student record.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Bound one course",
        detail:
          "Choose one course, term, readable source set, excluded material, and named reviewer before creating concept pages.",
      },
      {
        label: "Distill linked concepts",
        detail:
          "Keep each concept, prerequisite, explanation, source location, revision, and open question together in a reviewable record.",
      },
      {
        label: "Review after source changes",
        detail:
          "Open the cited lecture passage, inspect stale or conflicting support, and update the page only after the current material is understood.",
      },
    ],
    artifactHeading: "Worked course concept record",
    artifactNote:
      "This neutral template is not an answer key. Replace every placeholder with material you are allowed to use and a named reviewer.",
    artifactRows: [
      {
        label: "Concept and question",
        detail:
          "One durable course concept, the question it answers, and the shortest explanation the current material supports.",
      },
      {
        label: "Prerequisites and sources",
        detail:
          "Required concepts, exact lecture or page references, source IDs, material date, and source revision.",
      },
      {
        label: "Review state",
        detail:
          "Current, stale, contradicted, or unresolved, with a learner or educator reviewer and the next review trigger.",
      },
    ],
    action: {
      label: "See the course-wiki evidence workflow",
      href: "#product-evidence",
    },
  },
  faq: [
    "Can Wenlan turn scanned slides, audio, or video into study notes?",
    "No. Wenlan supports Markdown, text, and text-extractable PDFs for this workflow. Scanned or image-only files need external OCR, and audio or video needs an external transcription process before you can verify the resulting text.",
    "Is a course wiki the same as a study guide or an AI tutor?",
    "No. A course wiki maintains inspectable concept explanations, prerequisites, sources, and revision state. It does not generate an answer key, grade work, tutor a learner, create quizzes or flashcards, or decide what will appear on an exam.",
  ],
  relatedSlugs: [
    "build-local-ai-knowledge-base-from-documents",
    "distilled-wiki-pages-ai-memory",
    "source-backed-research-knowledge-base",
    "verify-ai-knowledge-base-citations",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
    {
      label: "Karpathy's LLM-wiki note",
      href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    },
  ],
  cta: {
    heading: "Build one inspectable course concept",
    body: "Add a small approved source set, maintain one concept page with prerequisites and exact sources, then revise it only after checking the changed material.",
  },
};

workflowArticles.push(courseWikiFromLectureNotesArticle);

const businessMetricDefinitionKnowledgeBaseArticle: BaseSpec = {
  slug: "build-business-metric-definition-knowledge-base",
  eyebrow: "Data dictionary workflow",
  category: "Workflows",
  title: "How to Build a Business Metric Definition Knowledge Base",
  description:
    "Turn approved KPI specifications into a source-backed data dictionary with formula text, grain, exclusions, owners, revisions, and review state.",
  metaTitle: "Build a Business Metric Definition Knowledge Base | Wenlan",
  metaDescription:
    "Build a reviewable metric-definition knowledge base from approved files, with formulas, grain, exclusions, owners, citations, revisions, and supersession.",
  keywords: [
    "business metric data dictionary",
    "metric definition knowledge base",
    "business glossary for AI agents",
    "KPI definition template",
    "metric glossary",
    "source backed data dictionary",
  ],
  publishedAt: "2026-09-01",
  updatedAt: "2026-09-08",
  readingTime: "8 min read",
  audience:
    "Data, analytics, product, finance, and operations teams resolving conflicting KPI definitions for people and AI agents",
  heroBullets: [
    "Start with approved metric specifications, not dashboards or inferred formulas.",
    "Keep formula text, grain, dimensions, exclusions, owner, and source revision in one record.",
    "Supersede stale definitions explicitly instead of letting agents blend them together.",
  ],
  quickAnswer:
    "Create one reviewed record per business metric. Record the business definition, formula as non-executable text, grain, dimensions, exclusions, owner, exact source IDs and revisions, review state, and which older definition it supersedes. When two approved sources disagree, preserve the conflict until a named reviewer resolves it; do not let an AI agent invent one blended definition.",
  quickAnswerLink: {
    label: "See the metric-definition evidence workflow",
    href: "#product-evidence",
  },
  wenlanFit:
    "Wenlan can read approved Markdown, text, and text-extractable PDFs, maintain source-backed Pages, preserve citations and source revisions, run provenance lint, and leave an exact revision for human review. It does not ingest CSV or YAML, does not run SQL, does not connect to a warehouse or BI tool, does not compute metrics, does not provide lineage, does not monitor data quality, does not manage permissions, does not approve definitions, and does not automatically reconcile conflicts.",
  problem:
    "A metric name such as active customer or net revenue can appear in a finance memo, analytics specification, product dashboard note, and operations handbook with different formulas, grains, exclusions, or owners. A polished summary can hide those differences. A useful data dictionary keeps each approved definition traceable, makes conflicts visible, and states which version is current without pretending to calculate the metric.",
  actionHeading: "Build one approved-specification to metric-record loop",
  actionIntro:
    "Begin with one metric family and a small set of approved definition files. The goal is a definition lookup and conflict-resolution record, not a live catalog of every table and dashboard.",
  actionBullets: [
    "Name the metric, business question, accountable owner, included files, excluded sources, and reviewer before synthesis.",
    "Register approved Markdown, text, or text-extractable PDF specifications. Keep CSV, YAML, SQL, warehouse metadata, and dashboard APIs outside this workflow.",
    "Write the formula as reviewable text and record its grain, dimensions, time window, inclusions, exclusions, and known edge cases.",
    "Attach each important field to the exact source ID, heading or page, source revision, and effective date.",
    "When approved sources disagree, keep both definitions and mark the record contradicted or unresolved instead of averaging or merging them.",
    "After a reviewer selects a current definition, record which version it supersedes, retain the earlier revision, and set the next review trigger.",
  ],
  code: {
    label: "Wenlan workflow and a neutral metric-definition record",
    code: "wenlan status\nwenlan sources add ~/Metrics/approved-specifications\n# In a Wenlan plugin client:\n/wenlan distill <metric definition>\n/wenlan pages <metric name>\n/wenlan lint\n/wenlan curate\n\nmetric: activated customer\nbusiness_definition: <what the approved sources mean>\nformula_text: <non-executable formula from the approved spec>\ngrain: <account | workspace | user | event>\ndimensions: <allowed breakdowns>\ninclusions: <included states or events>\nexclusions: <excluded states, events, or time windows>\nowner: <accountable team or reviewer>\nsources: <source IDs and exact locations>\nsource_revision: <version or effective date>\nreview_state: <current | stale | contradicted | unresolved>\nsupersedes: <previous definition or none>\nnext_review: <source-change trigger or date>",
  },
  caution:
    "This workflow maintains reviewed definition records; it is not a data catalog, semantic layer, metric store, governance platform, or calculation engine. Wenlan does not ingest CSV, does not run SQL, does not connect to a warehouse or BI system, does not compute metrics, does not provide lineage, does not monitor data quality, does not manage permissions, does not approve definitions, and does not automatically reconcile conflicting formulas. A named domain owner remains responsible for the business decision.",
  productEvidence: {
    heading: "Inspect source revision and review state before trusting a metric",
    summary:
      "This genuine Wenlan desktop capture comes from the app's deterministic test fixture, not a company's analytics or finance workspace. It shows maintained Pages with source counts and a review queue, the same product surfaces used to keep conflicting or revised metric evidence visible.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space showing maintained Pages with source counts and a review queue for changed and conflicting evidence.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture. It is a general product example, not a live data catalog or company metric record.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Bound the approved specifications",
        detail:
          "Choose one metric family, allowed definition files, excluded systems, accountable owner, and named reviewer.",
      },
      {
        label: "Distill one definition record",
        detail:
          "Keep definition, formula text, grain, dimensions, exclusions, citations, source revision, and conflicts in one reviewable Page.",
      },
      {
        label: "Review before superseding",
        detail:
          "Open the cited source, inspect contradictions and stale state, then mark the current definition and retain the superseded revision.",
      },
    ],
    artifactHeading: "Worked business metric record",
    artifactNote:
      "This neutral template does not calculate a KPI. Replace every placeholder with approved specifications and a named domain reviewer.",
    artifactRows: [
      {
        label: "Meaning and formula text",
        detail:
          "Business definition, non-executable formula, grain, dimensions, inclusions, exclusions, and edge cases.",
      },
      {
        label: "Owner and sources",
        detail:
          "Accountable owner, exact source IDs and locations, source revisions, and effective dates.",
      },
      {
        label: "Review and supersession",
        detail:
          "Current, stale, contradicted, or unresolved, plus the reviewer, superseded version, and next review trigger.",
      },
    ],
    action: {
      label: "See the metric-definition evidence workflow",
      href: "#product-evidence",
    },
  },
  faq: [
    "Does this connect to a warehouse, BI tool, or metric store?",
    "No. This workflow uses approved Markdown, text, and text-extractable PDF specifications. Wenlan does not discover tables, run SQL, calculate KPIs, or synchronize a warehouse, BI tool, semantic layer, or metric store.",
    "What should happen when two approved metric definitions disagree?",
    "Keep both cited definitions, record their formula, grain, exclusions, owner, and revision, and mark the record contradicted or unresolved. A named domain reviewer decides which definition becomes current and records what it supersedes.",
  ],
  relatedSlugs: [
    "source-backed-wiki-pages-ai-work",
    "verify-ai-knowledge-base-citations",
    "prevent-multi-agent-knowledge-conflicts",
    "build-investment-research-knowledge-base",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
    {
      label: "DataHub business glossary documentation",
      href: "https://github.com/datahub-project/datahub/blob/master/docs/glossary/business-glossary.md",
    },
  ],
  cta: {
    heading: "Make one metric definition inspectable",
    body: "Start with approved specification files, preserve conflicts and exact sources, and supersede an older definition only after a named reviewer checks it.",
  },
};

workflowArticles.push(businessMetricDefinitionKnowledgeBaseArticle);

const productResearchArticle: LearnArticle = {
  slug: "build-product-research-knowledge-base-for-prd",
  eyebrow: "Product research workflow",
  category: "Workflows",
  title: "Build a Product Research Knowledge Base Before Writing a PRD",
  description:
    "Turn approved research notes, support and sales signals, and prior decisions into a source-backed evidence base for a defensible PRD.",
  metaTitle: "Build a Product Research Knowledge Base Before a PRD | Wenlan",
  metaDescription:
    "Connect user research to a defensible PRD with dated sources, traceable requirements, contradictions, assumptions, open questions, and decision history.",
  keywords: [
    "product research knowledge base",
    "user research to PRD",
    "source-backed product decisions",
    "evidence-based PRD",
    "UX research knowledge base",
    "product operations knowledge base",
    "product discovery evidence",
  ],
  publishedAt: "2026-08-28",
  updatedAt: "2026-09-08",
  author: "Qi-Xuan Lu",
  readingTime: "8 min read",
  audience:
    "Product managers, UX researchers, and product operations teams preparing a PRD or roadmap review",
  heroBullets: [
    "Start with one product decision and its approved evidence boundary.",
    "Trace each requirement to dated research, support, sales, or decision sources.",
    "Keep observations, interpretations, assumptions, contradictions, and open questions separate.",
  ],
  productEvidence: {
    heading: "See the source-backed workspace a reviewer inspects",
    summary:
      "The product proof below is a genuine Wenlan desktop capture from the app's deterministic test fixture. It shows recently refined Pages with source counts plus a review queue for conflicts and newly available sources. The fixture is not customer data; the same review surface supports product-research evidence.",
    image: {
      src: "/images/product-evidence/wenlan-space-review-fixture.png",
      alt: "Wenlan desktop Space view showing recently refined Pages with source counts and a review queue for a source conflict and newly available sources.",
      caption:
        "Genuine Wenlan app capture from a deterministic test fixture: a general product example, not the output of a product-research project. Page rows show source counts; the review queue shows a source conflict and new sources.",
      width: 1586,
      height: 992,
    },
    workflow: [
      {
        label: "Approve the source boundary",
        detail:
          "Include only dated research notes, support or sales passages, and prior decisions the product team is allowed to inspect.",
      },
      {
        label: "Distill one product decision",
        detail:
          "Build one maintained Page for the question under review, with source IDs and contradictions attached to each consequential claim.",
      },
      {
        label: "Review before drafting",
        detail:
          "Open the cited passage, check the current revision and stale state, then carry only supported or explicitly unresolved requirements into the PRD.",
      },
    ],
    artifactHeading: "Worked PRD evidence packet",
    artifactNote:
      "This is an example structure, not a claim about your users. Replace every row with approved evidence from the product decision you are reviewing.",
    artifactRows: [
      {
        label: "Evidence input",
        detail:
          "A dated interview observation, support passage, sales note, or prior decision with an exact source location.",
      },
      {
        label: "Requirement candidate",
        detail:
          "One reviewable statement that separates the observed problem from interpretation, scope, and assumptions.",
      },
      {
        label: "Review result",
        detail:
          "Supported, contradicted, stale, or unresolved, with the reviewer and next check recorded before PRD approval.",
      },
    ],
    action: {
      label: "See evidence workflow",
      href: "#product-evidence",
    },
  },
  sections: [
    {
      heading: "Start with one product decision, not a company-wide archive",
      body: [
        "Before drafting a PRD, build one product-scoped evidence base for the decision under review. Collect only approved interview notes, support or sales notes, research artifacts, and prior decisions that the team can inspect; the goal is to make each requirement traceable, not to create a generic repository of every conversation.",
        "Wenlan can keep those supported Markdown, text, text-extractable PDF, folder, and read-only Obsidian sources connected to source-backed Pages, citations, revisions, stale state, and review. It does not decide the roadmap or turn a source into an approved product requirement.",
      ],
    },
    {
      heading: "Freeze the source boundary before synthesis",
      body: [
        "Write down the product area, review question, date range, included source types, and excluded material before asking an agent to synthesize. A narrow boundary makes it possible to tell whether a requirement is supported by an observed user need, a team interpretation, an assumption, or a decision that needs to be revisited.",
        "Keep source dates, document versions, and exact headings or passages in a small source register. If a note is incomplete or a source is not approved for this product decision, record it as unavailable rather than silently filling the gap.",
      ],
      bullets: [
        "Approved interview or research notes: preserve the observation and its source location.",
        "Support or sales notes: separate a repeated problem signal from an unverified request.",
        "Prior decisions: record the decision date, rationale, scope, and evidence available then.",
        "Assumptions and open questions: keep them visible instead of presenting them as user facts.",
      ],
    },
    {
      heading: "Build the evidence chain from note to requirement",
      body: [
        "Use one row or Page section per important requirement. Link the requirement to dated source passages, distinguish reported observations from your interpretation, and record contradictory evidence before deciding whether the requirement should remain, narrow, or stay unresolved.",
        "The same chain should survive a PRD review: a reviewer can open the source, see the current revision, understand which assumptions remain, and follow how a prior decision changed. If a source changes, refresh only the affected Page and leave the previous revision available for review.",
      ],
      bullets: [
        "Record the product question, source ID, date, exact location, and scope.",
        "Classify each statement as observation, interpretation, assumption, decision, or open question.",
        "Attach acceptance or rejection rationale to the evidence, not just to a meeting outcome.",
        "Compare conflicting signals and preserve the contradiction when the evidence cannot resolve it.",
        "Mark unsupported or stale requirements before they enter a PRD draft.",
      ],
      code: {
        label: "A bounded product-research knowledge workflow",
        code: "wenlan status\nwenlan sources add ~/Research/product-notes\n/wenlan distill <product decision>\n/wenlan pages <product decision>\n/wenlan lint\n/wenlan curate",
      },
    },
    {
      heading: "Draft the PRD only after the evidence is inspectable",
      body: [
        "A PRD can summarize the evidence base, but it should not hide the evidence behind polished prose. Before the review, check that every requirement has a source path or an explicit unresolved label, every important assumption has an owner or next check, and every prior decision still matches the current source set.",
        "This makes the document useful even without Wenlan: a small evidence register, requirement-to-source map, contradiction log, assumption list, and decision history are a repeatable product-research practice rather than a vendor-specific format.",
      ],
    },
    {
      heading: "Know what this workflow does not automate",
      body: [
        "Wenlan does not transcribe meetings, redact personally identifiable information, recruit participants, ingest analytics, connect Jira, Linear, Slack, or a CRM, automatically prioritize opportunities, generate a complete PRD, choose a roadmap, or claim a product outcome. Use maintained sources and human review for those decisions and controls.",
        "It also cannot make an unsupported request true. Keep the source, claim, date, limitation, and review state visible so an agent can help organize evidence without replacing the product team's judgment.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can Wenlan turn user research directly into a PRD?",
      answer:
        "No. It can help maintain a source-backed evidence base and a traceable requirement map from approved notes, but product managers and researchers still interpret evidence, resolve priorities, and write and approve the PRD.",
    },
    {
      question: "What if interview notes and support requests disagree?",
      answer:
        "Keep both dated sources, state their scope, and record the contradiction or unresolved question. Do not merge a support request, an observation, and a product decision into one unsupported requirement.",
    },
    {
      question: "Does this connect to Jira, Linear, Slack, or a CRM?",
      answer:
        "Not in this workflow. Use supported Markdown, text, text-extractable PDFs, folders, or a read-only Obsidian source, and explicitly maintain any exports or notes you are allowed to use.",
    },
  ],
  relatedSlugs: [
    "build-local-ai-knowledge-base-from-documents",
    "verify-ai-knowledge-base-citations",
    "source-backed-wiki-pages-ai-work",
    "source-backed-research-knowledge-base",
    "build-client-project-knowledge-base-for-consulting",
  ],
  officialReferences: [
    {
      label: "Wenlan supported document sources",
      href: "https://github.com/wenlan-app/wenlan#what-can-i-bring-in",
    },
    {
      label: "Wenlan source-backed Pages",
      href: "https://wenlan.app/docs/source-backed-pages",
    },
    {
      label: "Wenlan review and trust",
      href: "https://wenlan.app/docs/review-and-trust",
    },
    {
      label: "Wenlan daily workflow",
      href: "https://github.com/wenlan-app/wenlan#daily-workflow",
    },
  ],
  cta: {
    heading: "Make one product decision traceable",
    body: "Start with an approved source set, map requirements to dated evidence, and keep contradictions and open questions visible before the PRD review.",
  },
};

export const seoArticles: LearnArticle[] = [
  ...setupArticles.map(makeArticle),
  contextLossArticle,
  ...workflowArticles.map(makeArticle),
  ...comparisonArticles.map(makeArticle),
  ...trustArticles.map(makeArticle),
  localKnowledgeBaseArticle,
  retrievalRegressionArticle,
  productResearchArticle,
];
