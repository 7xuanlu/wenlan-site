import type { CoreContent } from "./schema";

const claudeCommands = [
  "/plugin marketplace add 7xuanlu/claude-plugins",
  "/plugin install wenlan@7xuanlu",
  "/init",
] as const;

export const enContent = {
  home: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "Wenlan | Living Personal Knowledge Library for AI Work",
        description:
          "Wenlan is a living personal knowledge library for AI work: agents capture what they learn, you add sources you trust, and the daemon keeps source-cited pages current.",
      },
      nav: {
        schemaName: "Wenlan site navigation",
        brand: "Wenlan",
        previewBadge: "PREVIEW",
        githubAriaLabel: "Wenlan on GitHub",
        themeToggle: {
          lightLabel: "Switch to light theme",
          darkLabel: "Switch to dark theme",
        },
        links: [
          { id: "docs", href: "/docs", label: "Docs" },
          { id: "learn", href: "/learn", label: "Learn" },
          { id: "about", href: "/about", label: "About" },
          { id: "github", href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
        ],
      },
      hero: {
        title: "Wenlan",
        description:
          "A living personal knowledge library for the AI-native age. Agents capture what they learn, you add sources you trust, and Wenlan keeps source-cited pages current.",
        primaryCta: { id: "get-started", href: "/docs/get-started", label: "Get started" },
        secondaryCta: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "View on GitHub",
        },
        metaText: [
          { id: "claude-code-plugin", label: "Claude Code plugin" },
          { id: "local-daemon", label: "Local daemon" },
        ],
        metaLinks: [
          {
            id: "claude-code-memory",
            href: "/learn/claude-code-memory",
            label: "Claude Code memory",
          },
          {
            id: "mcp-memory-server",
            href: "/learn/mcp-memory-server",
            label: "MCP server",
          },
        ],
      },
      demo: {
        title: "Wenlan Demo v0.9",
        playLabel: "Play Wenlan Demo v0.9",
      },
      sections: {
        problem: {
          eyebrow: "The problem",
          title: "Every new AI session starts cold.",
          body: "The work happened, but the context did not survive. Decisions, fixes, and project instincts stay trapped in old chats instead of helping the next agent.",
          note: "One missing handoff is enough to make the next conversation repeat the last one.",
        },
        solution: {
          eyebrow: "What Wenlan brings",
          title: "A handoff loop for AI work.",
          body: "Wenlan captures decisions, lessons, and next steps as work happens, then loads the handoff when the next agent starts.",
          note: "The next conversation starts from the handoff instead of reconstructing the past.",
          visualLabels: {
            start: "START",
            capture: "CAPTURE",
            handoff: "HANDOFF",
            resume: "RESUME",
          },
        },
        memoryDistillery: {
          eyebrow: "Deliberate distillation",
          title: "Wenlan turns repeated context into source-backed pages.",
          body: "Run /distill when repeated captures should become a readable page. Optional model or API-key paths can add background extraction and page refresh work.",
          note: "The next run starts from cited context, not transcript residue.",
          visualLabels: {
            merged: "MERGED",
            linked: "LINKED",
            refined: "REFINED",
          },
        },
        features: {
          eyebrow: "Knowledge pages",
          title: "The work becomes reusable pages.",
          body: "Cleaned decisions and lessons become durable pages instead of buried chat logs. They are organized enough for agents to use and concrete enough for humans to read.",
          note: "Your work stops being transcript history and starts becoming project knowledge.",
        },
        humanControl: {
          eyebrow: "Hybrid storage",
          title: "The daemon owns recall. Readable artifacts stay inspectable.",
          body: "Wenlan keeps raw captures in the local daemon store for retrieval, then projects pages, handoffs, and status files you can open, diff, and move.",
          note: "Agents recall from the daemon. You inspect the readable files.",
        },
        openSourceCta: {
          eyebrow: "Open source",
          title: "Open where it matters.",
          body: "The local runtime, CLI, MCP server, and Claude Code plugin are Apache-2.0.",
          note: "",
          primaryCta: { id: "get-started", href: "/docs/get-started", label: "Get started" },
          secondaryCta: {
            id: "github",
            href: "https://github.com/7xuanlu/wenlan",
            label: "View on GitHub",
          },
          waitlistHeading: "Get release updates.",
          waitlist: {
            successMessage: "You're in. We'll keep you posted.",
            pendingLabel: "Joining...",
            submitLabel: "Get Updates",
            emailPlaceholder: "you@email.com",
            fallbackError: "Something went wrong. Please try again.",
            errors: {
              required: "Email is required.",
              invalid: "Please enter a valid email.",
              notConfigured: "Waitlist is not configured yet.",
              unknown: "Something went wrong. Please try again.",
            },
          },
        },
      },
      metrics: {
        eyebrow: "Hybrid retrieval, measured",
        title: "96% fewer tokens. Honest retrieval metrics.",
        description:
          "Hybrid retrieval finds the right local context without replaying chat history.",
        headers: {
          surface: "Surface",
          scope: "Scope",
          result: "Result",
        },
        rows: [
          {
            id: "full-replay",
            surface: "Full replay",
            scope: "No retrieval",
            result: "4,505 tokens / query",
          },
          {
            id: "lme-oracle",
            surface: "LME_Oracle",
            scope: "CE-reranked, 500 Q",
            result: "168 tokens / query · 93.6% R@5 · 0.883 NDCG@10",
          },
          {
            id: "lme-s",
            surface: "LME_S",
            scope: "CE-reranked, N=90 deep-S",
            result: "168 tokens / query · 87.7% R@5 · 0.822 NDCG@10",
          },
        ],
        note:
          "Retrieval-only snapshots. LME_Oracle also records 0.857 MRR; LME_S records 0.815 MRR on 84 gradeable rows from the 90-question deep-S fixture. Token comparison is full replay vs retrieved context.",
        link: {
          id: "harness",
          href: "https://github.com/7xuanlu/wenlan/tree/main/crates/wenlan-core/src/eval",
          label: "Run the harness yourself.",
        },
      },
      faqs: {
        eyebrow: "FAQ",
        title: "Common questions.",
        items: [
          {
            id: "what-is-wenlan",
            q: "What is Wenlan?",
            a: "Wenlan is a living personal knowledge library for AI work. Agents capture what they learn, you add sources you trust, and the local daemon keeps source-cited pages current across chats, tools, projects, and time.",
          },
          {
            id: "built-in-memory",
            q: "How is Wenlan different from built-in AI memory?",
            a: "Built-in memory stores what the AI decided was important. You usually cannot trace it, correct it, or use it from another tool. Wenlan keeps memory local, visible, correctable, and traceable. Readable pages, session logs, and project status are versioned in ~/.wenlan/.git/, and every distilled page cites the source memory IDs that produced it.",
          },
          {
            id: "retrieval-quality",
            q: "What retrieval quality does Wenlan reach?",
            a: "Hybrid retrieval combines vector search (BGE-Base-EN-v1.5-Q, 768-dim), FTS5, reciprocal-rank fusion, knowledge-graph context, and the local BGE reranker. LME_Oracle is 93.6% Recall@5, 0.857 MRR, and 0.883 NDCG@10 on the 500-question snapshot. LME_S is 87.7% Recall@5, 0.815 MRR, and 0.822 NDCG@10 on the stratified N=90 deep-S snapshot. The eval harness ships in the repo at crates/wenlan-core/src/eval/.",
          },
          {
            id: "privacy",
            q: "Is my data private?",
            a: "Yes. Wenlan runs on your machine and stores its database locally. No cloud sync or telemetry by default. Local memory setup works without a model or API key. On-device models or an Anthropic key are opt-in for automatic page distillation, recaps, and richer graph work.",
          },
          {
            id: "memory-mcp",
            q: "Is Wenlan just another memory MCP?",
            a: "No. The MCP server is the connector. Wenlan also includes the local daemon, manual /distill, optional model-backed background extraction and page work, a libSQL store with DiskANN vectors, FTS5 + knowledge graph, mandatory provenance, real git versioning for memory, page, and session artifacts, and readable Markdown export paths.",
          },
          {
            id: "tools",
            q: "What AI tools work with Wenlan?",
            a: "Claude Code has a marketplace plugin. MCP-compatible clients such as Cursor, Codex, Claude Desktop, VS Code, Gemini CLI, and others connect through Wenlan's MCP server.",
          },
          {
            id: "not-notes",
            q: "Is Wenlan a replacement for Notion or Obsidian?",
            a: "No. Wenlan is not a notes app or a writing tool. It captures and refines what you learn from AI conversations. The Markdown projection under ~/.wenlan/ can be symlinked into Obsidian if you want to read it there.",
          },
          {
            id: "setup",
            q: "How do I set it up?",
            a: "In Claude Code, run /plugin marketplace add 7xuanlu/claude-plugins, then /plugin install wenlan@7xuanlu, then /init. For other MCP clients, run npx -y wenlan setup first, then ~/.wenlan/bin/wenlan mcp add codex, cursor, claude-desktop, vscode, or gemini.",
          },
          {
            id: "platforms",
            q: "Does Wenlan work on Windows or Linux?",
            a: "Yes. The daemon builds and runs on macOS (arm64, x64), Linux (x86_64, aarch64; glibc), and Windows (x86_64). Service registration uses launchd on macOS, systemd-user on Linux, and Task Scheduler (schtasks) on Windows.",
          },
          {
            id: "spaces",
            q: "Can I keep work and personal memory separate?",
            a: "Yes. Memories, pages, and recalls belong to a space (for example, work, personal, or client-X). Set the active space per shell with WENLAN_SPACE, or declare them in ~/.wenlan/spaces.toml. The auto-detector also picks a space from the current repo or workspace.",
          },
          {
            id: "free",
            q: "Is Wenlan free?",
            a: "Yes. Wenlan is open-source. The local runtime, CLI, MCP server, and Claude Code plugin files in the Wenlan repo are Apache-2.0.",
          },
        ],
      },
    },
  },
  about: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "About Wenlan | Living Personal Knowledge Library",
        description:
          "Wenlan is an open-source, local-first personal knowledge library for AI work, built by agents and grounded in its sources.",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "About",
      },
      hero: {
        eyebrow: "About",
        title: "A living personal knowledge library.",
        description:
          "Agents capture what they learn, you add sources you trust, and Wenlan keeps source-cited wiki pages current across AI work.",
        statusLabel: "Project status",
        statusItems: ["v0.9.1", "macOS, Linux, Windows", "Apache-2.0", "Built by Qi-Xuan Lu"],
      },
      sections: [
        {
          id: "why",
          number: "01",
          title: "Why Wenlan exists",
          paragraphs: [
            "AI work has become serious work, but most sessions still end like disposable conversations. Decisions, debugging lessons, project constraints, and handoffs get buried in old chats.",
            "Wenlan is built so the work can compound. Agents can save what matters, recall it later, and keep refined context available across MCP-compatible tools.",
          ],
        },
        {
          id: "builder",
          number: "03",
          title: "Built by Qi-Xuan Lu",
          paragraphs: [
            "Wenlan is built and maintained by Qi-Xuan Lu (GitHub @7xuanlu). Background in AI infrastructure, knowledge graphs, and local-first systems.",
            "The work focuses on memory as a first-class layer for AI tools: hybrid retrieval on libSQL, real git versioning for readable pages, session handoffs, and status artifacts, mandatory provenance on distilled pages, and one daemon serving every MCP-compatible client.",
            "Project channels: GitHub Issues for bugs and feature requests, SECURITY.md for vulnerabilities, and the Wenlan release notes for changes.",
          ],
        },
        {
          id: "status",
          number: "04",
          title: "Current status",
          paragraphs: [
            "Wenlan v0.9.1 ships for macOS (arm64, x64), Linux (x86_64, aarch64; glibc), and Windows (x86_64). The daemon, CLI, MCP server, and Claude Code plugin are open source under Apache-2.0.",
          ],
        },
      ],
      principles: {
        title: "Design principles",
        items: [
          {
            id: "local-first",
            title: "Local-first",
            body: "Memory starts on your machine. Cloud sync, telemetry, local models, and API keys are opt-in choices rather than the default source of truth.",
          },
          {
            id: "human-readable",
            title: "Human-readable",
            body: "Memory, page, and session writes leave Markdown artifacts in local git. The daemon database powers retrieval, while the source-cited artifacts stay inspectable.",
          },
          {
            id: "session-rhythm",
            title: "Session rhythm",
            body: "Wenlan follows how AI work actually happens: load context, capture durable facts, write handoffs, and bring the right context into the next run.",
          },
          {
            id: "deliberate-distillation",
            title: "Deliberate distillation",
            body: "Between sessions, Wenlan deduplicates repeat facts and links related ideas. Run /distill when a topic deserves a source-backed page; local models or API keys can add automatic page distillation and richer graph work.",
          },
        ],
      },
      projectLinksHeading: "Open source",
      projectLinks: [
        {
          id: "repository",
          href: "https://github.com/7xuanlu/wenlan",
          label: "GitHub repository",
        },
        {
          id: "license",
          href: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
          label: "Apache-2.0 license",
        },
        {
          id: "contributing",
          href: "https://github.com/7xuanlu/wenlan/blob/main/CONTRIBUTING.md",
          label: "Contributing guide",
        },
        {
          id: "security",
          href: "https://github.com/7xuanlu/wenlan/blob/main/SECURITY.md",
          label: "Security policy",
        },
      ],
      help: {
        eyebrow: "Help",
        bodyPrefix: "For bugs and feature requests, use GitHub Issues. For vulnerabilities, follow the",
        securityLink: {
          id: "security-reporting-guide",
          href: "/docs/security",
          label: "security reporting guide",
        },
        bodySuffix: ".",
      },
      cta: {
        primary: { id: "get-started", href: "/docs/get-started", label: "Get started" },
        secondary: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "View on GitHub",
        },
      },
      schema: {
        name: "About Wenlan",
        description:
          "Wenlan is an open-source, local-first personal knowledge library for AI work, built by Qi-Xuan Lu.",
      },
    },
  },
  docs: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "Wenlan Docs | Product Manual",
        description:
          "Install Wenlan, learn the daily AI work memory loop, understand the architecture, and follow the project roadmap, changelog, and evals.",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "Docs",
      },
      hero: {
        eyebrow: "Docs",
        title: "Start using Wenlan.",
        description:
          "Install the local memory layer, learn the daily handoff loop, and keep AI work context readable, searchable, and under your control.",
      },
      intro: {
        eyebrow: "Start here",
        body: "New users should install first, run setup for their client, then read the daily workflow and core concepts. The project docs cover architecture, reference paths, evals, releases, scope, source builds, roadmap, development conventions, and contribution paths.",
      },
      sections: {
        items: [
          {
            id: "start-here",
            title: "Start here",
            description: "Install Wenlan and verify the first memory round trip.",
            items: [
              {
                id: "get-started",
                href: "/docs/get-started",
                label: "Setup",
                title: "Get started with Wenlan",
                description:
                  "Install the Claude Code plugin or run Wenlan setup for another MCP client, then confirm the local memory loop works.",
                meta: "Wenlan team · Updated May 15, 2026 · 4 min setup",
              },
            ],
          },
          {
            id: "after-setup",
            title: "After setup",
            description:
              "Turn the install into a working habit: start warm, capture useful context, review what should be trusted, and hand off before context goes cold.",
            items: [
              {
                id: "daily-workflow",
                href: "/docs/daily-workflow",
                label: "Workflow",
                title: "Daily Workflow",
                description:
                  "Start with context, capture what matters, recall when needed, and hand off before context goes cold.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "capture-quality",
                href: "/docs/capture-quality",
                label: "Capture",
                title: "Capture Quality",
                description:
                  "Decide what belongs in Wenlan: durable facts, decisions, lessons, gotchas, corrections, and project context.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "review-and-trust",
                href: "/docs/review-and-trust",
                label: "Trust",
                title: "Review and Trust",
                description:
                  "Understand how Wenlan keeps uncertain memory visible: pending captures, revisions, contradictions, rejections, confirm, and forget.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "core-concepts",
                href: "/docs/core-concepts",
                label: "Concepts",
                title: "Core Concepts",
                description:
                  "Understand the pieces behind Wenlan: memories, sessions, handoffs, pages, the daemon, MCP, Markdown, and the local index.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
            ],
          },
          {
            id: "reference",
            title: "Reference",
            description:
              "Memory types, glossary, architecture, commands, Claude Code plugin, CLI/service management, updates, upgrade notes, package names, platform support, HTTP API, API examples, typed clients, spaces, graph context, pages, import paths, git history, retrieval status, experimental flags, local data, backup paths, configuration, environment variables, MCP clients, agent profiles, diagnostics, FAQ, and repair paths.",
            items: [
              {
                id: "memory-types",
                href: "/docs/memory-types",
                label: "Memory",
                title: "Memory Types",
                description:
                  "Understand Wenlan's six canonical memory types, how agents choose them, and which legacy aliases still appear at API boundaries.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "glossary",
                href: "/docs/glossary",
                label: "Glossary",
                title: "Glossary",
                description:
                  "A quick map of Wenlan terms: memory, handoff, page, space, daemon, MCP, local index, provenance, and eval language.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "architecture",
                href: "/docs/architecture",
                label: "Architecture",
                title: "Architecture",
                description:
                  "How Wenlan is put together: one local daemon, thin clients, shared wire types, local artifacts, and retrieval owned by wenlan-core.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 7 min read",
              },
              {
                id: "commands",
                href: "/docs/commands",
                label: "Reference",
                title: "Commands and Tools",
                description:
                  "The essential Claude Code commands and MCP tools for running Wenlan day to day.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "claude-code-plugin",
                href: "/docs/claude-code-plugin",
                label: "Plugin",
                title: "Claude Code Plugin",
                description:
                  "Use Wenlan's richest workflow inside Claude Code: setup, session brief, capture, recall, review, distill, read, and handoff.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "cli-and-service",
                href: "/docs/cli-and-service",
                label: "CLI",
                title: "CLI and Service Management",
                description:
                  "Use the Wenlan CLI to install the runtime, manage the daemon, inspect status, search memory, and wire MCP clients.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "updates-and-uninstall",
                href: "/docs/updates-and-uninstall",
                label: "Lifecycle",
                title: "Updates and Uninstall",
                description:
                  "Refresh Wenlan's local runtime, verify version health, restart MCP clients, and remove the service without losing data by accident.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "upgrade-notes",
                href: "/docs/upgrade-notes",
                label: "Upgrade",
                title: "Upgrade Notes",
                description:
                  "Read the practical upgrade path for Wenlan releases: what to rerun, what to verify, and what changed in the current public runtime shape.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "packages-and-registries",
                href: "/docs/packages-and-registries",
                label: "Packages",
                title: "Packages and Registries",
                description:
                  "Know which Wenlan package name maps to the plugin, runtime setup, MCP connector, Rust crates, and release binaries.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "platforms",
                href: "/docs/platforms",
                label: "Platforms",
                title: "Platform Support",
                description:
                  "Understand how Wenlan runs on macOS, Linux, and Windows: service managers, local data paths, model backends, and Docker/VM caveats.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "http-api",
                href: "/docs/http-api",
                label: "API",
                title: "HTTP API",
                description:
                  "Know the local daemon surfaces that the CLI, MCP connector, plugin, and local tools call under the hood.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "api-examples",
                href: "/docs/api-examples",
                label: "API",
                title: "API Examples",
                description:
                  "Use the local daemon HTTP API from scripts when the CLI or MCP tools are not the right fit.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "typed-clients",
                href: "/docs/typed-clients",
                label: "Types",
                title: "Typed Clients",
                description:
                  "Use wenlan-types when a Rust tool needs to call the local daemon without relying on untyped JSON shapes.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "spaces",
                href: "/docs/spaces",
                label: "Spaces",
                title: "Spaces",
                description:
                  "Separate work, personal, client, and project memory, and understand how Wenlan resolves the active space.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "knowledge-graph",
                href: "/docs/knowledge-graph",
                label: "Graph",
                title: "Knowledge Graph",
                description:
                  "Understand how Wenlan links people, projects, tools, observations, and relations so recall can recover context through more than text similarity.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "source-backed-pages",
                href: "/docs/source-backed-pages",
                label: "Pages",
                title: "Source-Backed Pages",
                description:
                  "Understand how Wenlan turns atomic captures into readable pages with source memory IDs, revision state, and refresh paths.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "import-and-portability",
                href: "/docs/import-and-portability",
                label: "Portability",
                title: "Import and Portability",
                description:
                  "Move selected durable context into Wenlan and keep Wenlan's readable artifacts portable outside the daemon.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "local-git-history",
                href: "/docs/local-git-history",
                label: "Versioning",
                title: "Local Git History",
                description:
                  "Inspect the real git history Wenlan keeps for readable page, session, handoff, and status artifacts.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "models-and-keys",
                href: "/docs/models-and-keys",
                label: "Models",
                title: "Models and Keys",
                description:
                  "Choose between local memory mode, optional on-device models, and optional Anthropic API keys for richer extraction, page synthesis, recaps, and graph work.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "advanced-retrieval",
                href: "/docs/advanced-retrieval",
                label: "Retrieval",
                title: "Advanced Retrieval Status",
                description:
                  "Understand Wenlan's shipped retrieval path and the opt-in main-branch experiments behind newer retrieval work.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "experimental-flags",
                href: "/docs/experimental-flags",
                label: "Experiments",
                title: "Experimental Flags",
                description:
                  "How to read Wenlan's opt-in main-branch flags without mistaking them for released defaults.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "data-and-privacy",
                href: "/docs/data-and-privacy",
                label: "Local control",
                title: "Data and Privacy",
                description:
                  "Where Wenlan keeps data, what stays local, and how readable artifacts work with the daemon-owned retrieval store.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "backup-and-migration",
                href: "/docs/backup-and-migration",
                label: "Backup",
                title: "Backup and Migration",
                description:
                  "Back up Wenlan's readable artifacts and daemon data together, then verify the restored runtime before trusting recall.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "configuration",
                href: "/docs/configuration",
                label: "Configuration",
                title: "Wenlan Configuration",
                description:
                  "Configure Wenlan spaces, MCP clients, daemon bind address, local paths, models, and keys without editing the database by hand.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "environment-variables",
                href: "/docs/environment-variables",
                label: "Config",
                title: "Environment Variables",
                description:
                  "Know which Wenlan environment variables are normal configuration, which are development-only, and which belong to eval or Windows repair paths.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "mcp-clients",
                href: "/docs/mcp-clients",
                label: "MCP",
                title: "Connect MCP Clients",
                description:
                  "Use one local Wenlan memory layer from Claude Code, Codex, Cursor, Claude Desktop, Gemini CLI, and other MCP clients.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "agent-profiles",
                href: "/docs/agent-profiles",
                label: "Agents",
                title: "Agent Profiles",
                description:
                  "Inspect the AI clients and local tools that write to Wenlan, then manage source attribution, enabled state, and trust from the CLI.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "troubleshooting",
                href: "/docs/troubleshooting",
                label: "Repair",
                title: "Troubleshooting",
                description:
                  "Fix the common setup issues: daemon not running, MCP not connected, missing Claude commands, stale context, and support escalation.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "diagnostics-and-issue-reports",
                href: "/docs/diagnostics-and-issue-reports",
                label: "Diagnostics",
                title: "Diagnostics and Issue Reports",
                description:
                  "Run the right checks before asking for help, separate daemon problems from client problems, and share only redacted output.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "faq",
                href: "/docs/faq",
                label: "FAQ",
                title: "FAQ",
                description:
                  "Short answers to the adoption questions people ask before and after installing Wenlan.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
            ],
          },
          {
            id: "project",
            title: "Project",
            description:
              "Security reporting, evaluation, desktop status, changelog, release/versioning, roadmap, project scope, source builds, testing, CI, development conventions, and contribution paths for people deciding whether Wenlan is credible enough to adopt or contribute to.",
            items: [
              {
                id: "security",
                href: "/docs/security",
                label: "Security",
                title: "Security and Reporting",
                description:
                  "Report vulnerabilities privately, keep diagnostic reports redacted, and understand Wenlan's local security boundary.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "evaluation",
                href: "/docs/evaluation",
                label: "Evaluation",
                title: "Evaluation",
                description:
                  "What Wenlan's published retrieval numbers mean, how they are generated, and what they do not claim.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "desktop-app",
                href: "/docs/desktop-app",
                label: "Desktop",
                title: "Desktop App Status",
                description:
                  "Understand how the optional Wenlan desktop app relates to the daemon, CLI, MCP server, and Claude Code plugin.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 4 min read",
              },
              {
                id: "changelog",
                href: "/docs/changelog",
                label: "Releases",
                title: "Changelog",
                description:
                  "The public release history for Wenlan, plus how to read unreleased work on main.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "releases-and-versioning",
                href: "/docs/releases-and-versioning",
                label: "Releases",
                title: "Releases and Versioning",
                description:
                  "Understand how Wenlan turns merged work into tagged releases, package versions, binaries, npm packages, and crates.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "roadmap",
                href: "/docs/roadmap",
                label: "Roadmap",
                title: "Roadmap and Status",
                description:
                  "How to read Wenlan's current direction without confusing released features, main-branch work, and future bets.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 6 min read",
              },
              {
                id: "project-scope",
                href: "/docs/project-scope",
                label: "Scope",
                title: "Project Scope",
                description:
                  "What Wenlan is for, what it deliberately avoids, and how to decide whether it fits your AI work.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "build-from-source",
                href: "/docs/build-from-source",
                label: "Development",
                title: "Build from Source",
                description:
                  "Build the Wenlan daemon, CLI, MCP server, shared types, core crate, and plugin from the public repository.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "testing-and-ci",
                href: "/docs/testing-and-ci",
                label: "Quality",
                title: "Testing and CI",
                description:
                  "Understand which Wenlan checks run locally, which run in GitHub Actions, and which evals stay manual.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "development-conventions",
                href: "/docs/development-conventions",
                label: "Development",
                title: "Development Conventions",
                description:
                  "Codebase rules that keep Wenlan's daemon, CLI, MCP connector, shared types, and core logic maintainable.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
              {
                id: "contributing",
                href: "/docs/contributing",
                label: "Open source",
                title: "Contributing",
                description:
                  "How to contribute useful bug reports, docs, eval cases, and code changes to Wenlan.",
                meta: "Qi-Xuan Lu · Updated Jun 24, 2026 · 5 min read",
              },
            ],
          },
        ],
      },
      cta: {
        eyebrow: "Already installed?",
        title: "Make the memory loop habitual.",
        body: "Start with the daily workflow, then use the reference docs when you need commands, MCP setup, or repair steps.",
        primary: { id: "daily-workflow", href: "/docs/daily-workflow", label: "Daily workflow" },
        secondary: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "GitHub",
        },
      },
      schema: {
        name: "Wenlan Docs",
        description: "Product documentation for Wenlan's local-first AI work memory.",
      },
    },
  },
  getStarted: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "Get Started with Wenlan | Local AI Work Memory",
        description:
          "Install Wenlan through the Claude Code plugin or run Wenlan setup before connecting another MCP client.",
      },
      breadcrumbs: {
        home: "Wenlan",
        docs: "Docs",
      },
      hero: {
        eyebrow: "Get started",
        title: "Connect Wenlan to your AI tools.",
        description:
          "Start with the Claude Code plugin, or add Wenlan to another MCP-compatible client through the local MCP server.",
        meta: ["Wenlan team", "Updated May 15, 2026", "4 min setup"],
        setupPathLabel: "Setup path",
        setupPathItems: ["Claude Code", "MCP clients", "Local daemon"],
      },
      steps: [
        {
          id: "claude-code-plugin",
          number: "01",
          title: "Claude Code plugin",
          paragraphs: [
            "This is the fastest path. The plugin handles daemon setup, MCP wiring, local memory setup, and the first round-trip check.",
            "If Claude Code asks for a restart after installing, restart once, then run /init.",
          ],
          commands: claudeCommands,
          ctas: [],
        },
        {
          id: "other-mcp-clients",
          number: "02",
          title: "Other MCP clients",
          paragraphs: [
            "For Cursor, Codex, Claude Desktop, Gemini CLI, and other MCP-compatible clients, set up the local Wenlan runtime first. Then let the Wenlan CLI add the MCP connector to the client.",
            "Wenlan setup installs the CLI, daemon, and MCP connector, configures local memory, registers the daemon with your operating system's user service manager, and verifies status.",
          ],
          commands: [
            "npx -y wenlan setup",
            "~/.wenlan/bin/wenlan mcp add codex\n# or: cursor, claude-desktop, vscode, gemini",
          ],
          ctas: [],
        },
        {
          id: "try-first",
          number: "03",
          title: "What to try first",
          paragraphs: [
            "Store one durable project fact, then ask your agent to recall it in a new session. Wenlan should make that context visible, searchable, and available through the same local memory layer.",
          ],
          commands: [],
          ctas: [
            { id: "daily-workflow", href: "/docs/daily-workflow", label: "Start daily workflow" },
            { id: "learn", href: "/learn", label: "Read articles" },
          ],
        },
      ],
      sidebar: {
        eyebrow: "You get",
        items: [
          { id: "local-daemon", label: "Local daemon" },
          { id: "claude-code-plugin", label: "Claude Code plugin" },
          { id: "mcp-server", label: "MCP server" },
          { id: "shared-memory-layer", label: "Shared memory layer" },
        ],
      },
      schema: {
        name: "Get started with Wenlan",
        description:
          "Install Wenlan in Claude Code or run Wenlan setup before connecting another MCP client.",
      },
    },
  },
  notFound: {
    status: "translated",
    sourceHash: null,
    content: {
      eyebrow: "404",
      title: "This page does not exist.",
      description:
        "If you followed a link, it may be outdated. If you typed the URL, check for a typo. Below are common starting points.",
      primaryCta: "Back to home",
      secondaryCta: "Browse articles",
      popularHeading: "Popular destinations",
      popularDestinations: [
        {
          id: "get-started",
          href: "/docs/get-started",
          label: "Get started",
          description: "Install Wenlan and verify the first local memory loop.",
        },
        {
          id: "daily-workflow",
          href: "/docs/daily-workflow",
          label: "Daily workflow",
          description: "Capture, handoff, distill across AI sessions.",
        },
        {
          id: "ai-work-memory",
          href: "/learn/ai-work-memory",
          label: "AI work memory",
          description: "What changes when AI sessions carry context across days.",
        },
        {
          id: "mcp-memory-server",
          href: "/learn/mcp-memory-server",
          label: "MCP memory server",
          description: "How Wenlan exposes memory through MCP.",
        },
        {
          id: "basic-memory",
          href: "/learn/wenlan-vs-basic-memory",
          label: "Wenlan vs Basic Memory",
          description: "Markdown knowledge base vs AI work-session memory layer.",
        },
        {
          id: "about",
          href: "/about",
          label: "About",
          description: "Project background, principles, and the person behind Wenlan.",
        },
      ],
    },
  },
  footer: {
    status: "translated",
    sourceHash: null,
    content: {
      ariaLabel: "Site footer",
      brand: "Wenlan",
      tagline: "Living personal knowledge library for AI work.",
      groups: [
        {
          id: "product",
          title: "Product",
          links: [
            { id: "get-started", href: "/docs/get-started", label: "Get started" },
            { id: "daily-workflow", href: "/docs/daily-workflow", label: "Daily workflow" },
            { id: "capture-quality", href: "/docs/capture-quality", label: "Capture quality" },
            { id: "core-concepts", href: "/docs/core-concepts", label: "Core concepts" },
            { id: "data-and-privacy", href: "/docs/data-and-privacy", label: "Data and privacy" },
            { id: "configuration", href: "/docs/configuration", label: "Configuration" },
            { id: "updates", href: "/docs/updates-and-uninstall", label: "Updates" },
            { id: "platforms", href: "/docs/platforms", label: "Platforms" },
            { id: "docs", href: "/docs", label: "Docs" },
          ],
        },
        {
          id: "learn",
          title: "Learn",
          links: [
            { id: "learn-hub", href: "/learn", label: "Learn hub" },
            { id: "vs-basic-memory", href: "/learn/wenlan-vs-basic-memory", label: "vs Basic Memory" },
            { id: "vs-claude-mem", href: "/learn/wenlan-vs-claude-mem", label: "vs claude-mem" },
            {
              id: "vs-superlocal-memory",
              href: "/learn/wenlan-vs-superlocal-memory",
              label: "vs Superlocal Memory",
            },
          ],
        },
        {
          id: "project",
          title: "Project",
          links: [
            { id: "about", href: "/about", label: "About" },
            { id: "architecture", href: "/docs/architecture", label: "Architecture" },
            { id: "evaluation", href: "/docs/evaluation", label: "Evaluation" },
            { id: "changelog", href: "/docs/changelog", label: "Changelog" },
            { id: "roadmap", href: "/docs/roadmap", label: "Roadmap" },
            { id: "project-scope", href: "/docs/project-scope", label: "Project scope" },
            { id: "security", href: "/docs/security", label: "Security" },
            { id: "github", href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
            { id: "rss", href: "/feed.xml", label: "RSS feed" },
            {
              id: "license",
              href: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
              label: "Apache-2.0",
            },
          ],
        },
      ],
      signature: {
        brand: "Wenlan",
        tagline: "Living personal knowledge library",
        builtByPrefix: "Built by",
        author: "Qi-Xuan Lu",
        authorUrl: "https://github.com/7xuanlu",
      },
    },
  },
} as const satisfies CoreContent;
