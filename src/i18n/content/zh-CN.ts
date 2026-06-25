import type { CoreContent } from "./schema";

const claudeCommands = [
  "/plugin marketplace add 7xuanlu/claude-plugins",
  "/plugin install wenlan@7xuanlu",
  "/init",
] as const;

export const zhCNContent = {
  home: {
    status: "translated",
    sourceHash: "d56cb27d582ab7832f5a92cb330bbabe4cd066e0d679fa0a627640f2e060d76f",
    content: {
      seo: {
        title: "Wenlan | AI 工作的活个人知识库",
        description:
          "Wenlan 是为 AI 工作而生的活个人知识库：agent 捕捉学到的内容，你加入信任的来源，daemon 让有来源引用的页面保持最新。",
      },
      nav: {
        schemaName: "Wenlan 网站导航",
        brand: "Wenlan",
        previewBadge: "预览版",
        githubAriaLabel: "在 GitHub 查看 Wenlan",
        themeToggle: {
          lightLabel: "切换到浅色主题",
          darkLabel: "切换到深色主题",
        },
        links: [
          { id: "docs", href: "/docs", label: "文档" },
          { id: "learn", href: "/learn", label: "学习" },
          { id: "about", href: "/about", label: "关于" },
          { id: "github", href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
        ],
      },
      hero: {
        title: "Wenlan",
        description:
          "面向 AI-native 时代的活个人知识库。Agents 捕捉学到的内容，你加入信任的来源，Wenlan 让有来源引用的页面保持最新。",
        primaryCta: { id: "get-started", href: "/docs/get-started", label: "开始使用" },
        secondaryCta: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "在 GitHub 查看",
        },
        metaText: [
          { id: "claude-code-plugin", label: "Claude Code 插件" },
          { id: "local-daemon", label: "本地 daemon" },
        ],
        metaLinks: [
          {
            id: "claude-code-memory",
            href: "/learn/claude-code-memory",
            label: "Claude Code 记忆",
          },
          {
            id: "mcp-memory-server",
            href: "/learn/mcp-memory-server",
            label: "MCP 服务器",
          },
        ],
      },
      demo: {
        title: "Wenlan 演示 v0.9",
        playLabel: "播放 Wenlan 演示 v0.9",
      },
      sections: {
        problem: {
          eyebrow: "问题",
          title: "每一次新的 AI session 都从冷启动开始。",
          body: "工作已经发生，但 context 没有留下来。决策、修 bug 的教训和项目直觉都困在旧聊天里，没有帮到下一个 agent。",
          note: "少一次 handoff，就足以让下一段对话重跑上一段工作。",
        },
        solution: {
          eyebrow: "Wenlan 带来什么",
          title: "给 AI 工作用的 handoff 循环。",
          body: "Wenlan 会在工作发生时捕捉决策、教训和下一步，并在下一个 agent 开始时加载 handoff。",
          note: "下一段对话从 handoff 开始，而不是重新拼回过去。",
        },
        memoryDistillery: {
          eyebrow: "刻意蒸馏",
          title: "Wenlan 把重复出现的 context 变成有来源支持的页面。",
          body: "当重复捕捉的内容值得变成可读页面时，运行 /distill。可选的本地模型或 API key 路径可以加入背景提取与页面更新。",
          note: "下一次运行从有引用的 context 开始，而不是从 transcript 残留开始。",
        },
        features: {
          eyebrow: "知识页面",
          title: "工作会变成可重用的页面。",
          body: "整理过的决策与教训会成为耐用页面，而不是被埋在聊天记录里。它们足够有组织，agent 能使用；也足够具体，人可以阅读。",
          note: "你的工作不再只是 transcript 历史，而是开始变成项目知识。",
        },
        humanControl: {
          eyebrow: "混合存储",
          title: "daemon 负责 recall，可读 artifacts 仍然可检查。",
          body: "Wenlan 把原始 captures 保存在本地 daemon store 供 retrieval 使用，再投射出你可以打开、diff、移动的 pages、handoffs 和 status files。",
          note: "Agents 从 daemon recall。你检查可读文件。",
        },
        openSourceCta: {
          eyebrow: "开源",
          title: "在重要的地方保持开放。",
          body: "本地 runtime、CLI、MCP server 和 Claude Code plugin 都是 Apache-2.0。",
          note: "",
          primaryCta: { id: "get-started", href: "/docs/get-started", label: "开始使用" },
          secondaryCta: {
            id: "github",
            href: "https://github.com/7xuanlu/wenlan",
            label: "在 GitHub 查看",
          },
          waitlistHeading: "获取 release 更新。",
          waitlist: {
            successMessage: "你已加入。我们会持续通知你。",
            pendingLabel: "加入中...",
            submitLabel: "获取更新",
          },
        },
      },
      metrics: {
        eyebrow: "Hybrid retrieval，实测",
        title: "少 96% tokens。诚实的 retrieval metrics。",
        description: "Hybrid retrieval 不需要重放聊天历史，也能找到正确的本地 context。",
        headers: {
          surface: "表面",
          scope: "范围",
          result: "结果",
        },
        rows: [
          {
            id: "full-replay",
            surface: "完整重放",
            scope: "不使用 retrieval",
            result: "每次查询 4,505 tokens / query",
          },
          {
            id: "lme-oracle",
            surface: "LME_Oracle",
            scope: "CE-reranked，500 Q",
            result: "每次查询 168 tokens / query · 93.6% R@5 · 0.883 NDCG@10",
          },
          {
            id: "lme-s",
            surface: "LME_S",
            scope: "CE-reranked，N=90 deep-S",
            result: "每次查询 168 tokens / query · 87.7% R@5 · 0.822 NDCG@10",
          },
        ],
        note:
          "Retrieval-only snapshots。LME_Oracle 也记录 0.857 MRR；LME_S 在 90-question deep-S fixture 的 84 个可评分 rows 上记录 0.815 MRR。Token 对比是完整重放对 retrieved context。",
        link: {
          id: "harness",
          href: "https://github.com/7xuanlu/wenlan/tree/main/crates/wenlan-core/src/eval",
          label: "自己运行 harness。",
        },
      },
      faqs: {
        eyebrow: "常见问题",
        title: "常见问题。",
        items: [
          {
            id: "what-is-wenlan",
            q: "Wenlan 是什么？",
            a: "Wenlan 是为 AI 工作而生的活个人知识库。Agents 捕捉学到的内容，你加入信任的来源，本地 daemon 让有来源引用的页面跨 chats、tools、projects 和时间保持最新。",
          },
          {
            id: "built-in-memory",
            q: "Wenlan 和内建 AI memory 有什么不同？",
            a: "内建 memory 会保存 AI 认为重要的内容。你通常无法追踪、修正，或从另一个工具使用它。Wenlan 让 memory 留在本地、可见、可修正、可追溯。可读 pages、session logs 和 project status 都 versioned in ~/.wenlan/.git/，每个 distilled page 都会引用产生它的 source memory IDs。",
          },
          {
            id: "retrieval-quality",
            q: "Wenlan 的 retrieval quality 到哪里？",
            a: "Hybrid retrieval 结合 vector search (BGE-Base-EN-v1.5-Q, 768-dim)、FTS5、reciprocal-rank fusion、knowledge-graph context 和本地 BGE reranker。LME_Oracle 在 500-question snapshot 上是 93.6% Recall@5、0.857 MRR、0.883 NDCG@10。LME_S 在 stratified N=90 deep-S snapshot 上是 87.7% Recall@5、0.815 MRR、0.822 NDCG@10。Eval harness 放在 repo 的 crates/wenlan-core/src/eval/。",
          },
          {
            id: "privacy",
            q: "我的数据是私密的吗？",
            a: "是。Wenlan 在你的机器上运行，数据库也存放在本地。默认没有 cloud sync 或 telemetry。本地 memory setup 不需要模型或 API key。On-device models 或 Anthropic key 只有在你选择启用 automatic page distillation、recaps 和更丰富 graph work 时才会使用。",
          },
          {
            id: "memory-mcp",
            q: "Wenlan 只是另一个 memory MCP 吗？",
            a: "不是。MCP server 只是 connector。Wenlan 还包含本地 daemon、manual /distill、可选的 model-backed background extraction 和 page work、具备 DiskANN vectors 的 libSQL store、FTS5 + knowledge graph、mandatory provenance、memory/page/session artifacts 的真实 git versioning，以及可读的 Markdown export paths。",
          },
          {
            id: "tools",
            q: "哪些 AI tools 可以搭配 Wenlan？",
            a: "Claude Code 有 marketplace plugin。Cursor、Codex、Claude Desktop、VS Code、Gemini CLI 等 MCP-compatible clients 可通过 Wenlan 的 MCP server 连接。",
          },
          {
            id: "not-notes",
            q: "Wenlan 能取代 Notion 或 Obsidian 吗？",
            a: "不能。Wenlan 不是 notes app，也不是 writing tool。它捕捉并整理你从 AI conversations 学到的内容。如果你想在 Obsidian 阅读，可以把 ~/.wenlan/ 底下的 Markdown projection symlink 进去。",
          },
          {
            id: "setup",
            q: "我要怎么设置？",
            a: "在 Claude Code 中运行 /plugin marketplace add 7xuanlu/claude-plugins，接着运行 /plugin install wenlan@7xuanlu，然后运行 /init。其他 MCP clients 先运行 npx -y wenlan setup，再运行 ~/.wenlan/bin/wenlan mcp add codex、cursor、claude-desktop、vscode 或 gemini。",
          },
          {
            id: "platforms",
            q: "Wenlan 支持 Windows 或 Linux 吗？",
            a: "支持。daemon 可以在 macOS (arm64, x64)、Linux (x86_64, aarch64; glibc) 和 Windows (x86_64) build 并运行。Service registration 在 macOS 使用 launchd、Linux 使用 systemd-user、Windows 使用 Task Scheduler (schtasks)。",
          },
          {
            id: "spaces",
            q: "我可以把工作和个人 memory 分开吗？",
            a: "可以。Memories、pages 和 recalls 都属于一个 space，例如 work、personal 或 client-X。你可以用 WENLAN_SPACE 在每个 shell 设置 active space，或在 ~/.wenlan/spaces.toml 声明。Auto-detector 也会从当前 repo 或 workspace 选择 space。",
          },
          {
            id: "free",
            q: "Wenlan 免费吗？",
            a: "是。Wenlan 是 open-source。Wenlan repo 里的本地 runtime、CLI、MCP server 和 Claude Code plugin files 都是 Apache-2.0。",
          },
        ],
      },
    },
  },
  about: {
    status: "translated",
    sourceHash: "a255919d26031825833fe5b1d5dabddec41b595ff265fea28053f1e7cfe47a8f",
    content: {
      seo: {
        title: "关于 Wenlan | 活个人知识库",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作个人知识库，由 agents 建立，并以来源为根基。",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "关于",
      },
      hero: {
        eyebrow: "关于",
        title: "活个人知识库。",
        description:
          "Agents 捕捉学到的内容，你加入信任的来源，Wenlan 让有来源引用的 wiki pages 在 AI 工作中保持最新。",
        statusLabel: "项目状态",
        statusItems: ["版本 v0.9.1", "支持 macOS、Linux、Windows", "Apache-2.0", "Qi-Xuan Lu 构建"],
      },
      sections: [
        {
          id: "why",
          number: "01",
          title: "为什么 Wenlan 存在",
          paragraphs: [
            "AI 工作已经变成严肃工作，但大多数 sessions 仍像一次性对话一样结束。决策、debugging lessons、项目限制和 handoffs 都被埋在旧 chats 里。",
            "Wenlan 是为了让工作能 compound 而建。Agents 可以保存重要内容，之后 recall，并让 refined context 跨 MCP-compatible tools 持续可用。",
          ],
        },
        {
          id: "builder",
          number: "03",
          title: "由 Qi-Xuan Lu 构建",
          paragraphs: [
            "Wenlan 由 Qi-Xuan Lu (GitHub @7xuanlu) 构建与维护。背景涵盖 AI infrastructure、knowledge graphs 和 local-first systems。",
            "这项工作把 memory 视为 AI tools 的 first-class layer：libSQL 上的 hybrid retrieval、可读页面的真实 git versioning、session handoffs、status artifacts、distilled pages 的 mandatory provenance，以及一个 daemon 服务所有 MCP-compatible client。",
            "项目渠道：bugs 和 feature requests 用 GitHub Issues，vulnerabilities 看 SECURITY.md，变更则看 Wenlan release notes。",
          ],
        },
        {
          id: "status",
          number: "04",
          title: "当前状态",
          paragraphs: [
            "Wenlan v0.9.1 支持 macOS (arm64, x64)、Linux (x86_64, aarch64; glibc) 和 Windows (x86_64)。daemon、CLI、MCP server 和 Claude Code plugin 都以 Apache-2.0 open source。",
          ],
        },
      ],
      principles: {
        title: "设计原则",
        items: [
          {
            id: "local-first",
            title: "本地优先",
            body: "Memory 从你的机器开始。Cloud sync、telemetry、本地模型和 API keys 都是 opt-in，而不是默认的 source of truth。",
          },
          {
            id: "human-readable",
            title: "人可阅读",
            body: "Memory、page 和 session writes 会在本地 git 留下 Markdown artifacts。daemon database 负责 retrieval，而有来源引用的 artifacts 仍可检查。",
          },
          {
            id: "session-rhythm",
            title: "Session 节奏",
            body: "Wenlan 顺着 AI 工作实际发生的方式：加载 context、捕捉 durable facts、写 handoffs，并把正确 context 带进下一次运行。",
          },
          {
            id: "deliberate-distillation",
            title: "刻意蒸馏",
            body: "Sessions 之间，Wenlan 会 deduplicate 重复 facts 并连接相关 ideas。当一个 topic 值得成为 source-backed page 时，运行 /distill；本地模型或 API keys 可以加入 automatic page distillation 和更丰富的 graph work。",
          },
        ],
      },
      projectLinksHeading: "开源",
      projectLinks: [
        {
          id: "repository",
          href: "https://github.com/7xuanlu/wenlan",
          label: "GitHub 代码库",
        },
        {
          id: "license",
          href: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
          label: "Apache-2.0 授权",
        },
        {
          id: "contributing",
          href: "https://github.com/7xuanlu/wenlan/blob/main/CONTRIBUTING.md",
          label: "贡献指南",
        },
        {
          id: "security",
          href: "https://github.com/7xuanlu/wenlan/blob/main/SECURITY.md",
          label: "安全政策",
        },
      ],
      help: {
        eyebrow: "帮助",
        bodyPrefix: "Bugs 和 feature requests 请使用 GitHub Issues。Vulnerabilities 请遵循",
        securityLink: {
          id: "security-reporting-guide",
          href: "/docs/security",
          label: "安全报告指南",
        },
        bodySuffix: "。",
      },
      cta: {
        primary: { id: "get-started", href: "/docs/get-started", label: "开始使用" },
        secondary: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "在 GitHub 查看",
        },
      },
      schema: {
        name: "关于 Wenlan",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作个人知识库，由 Qi-Xuan Lu 构建。",
      },
    },
  },
  docs: {
    status: "translated",
    sourceHash: "f9d9acd4a50745375c9a298270eec771b44f71d5679db6b8403893d661635775",
    content: {
      seo: {
        title: "Wenlan 文档 | 产品手册",
        description:
          "安装 Wenlan，学习每日 AI 工作记忆循环，理解架构，并追踪项目 roadmap、changelog 和 evals。",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "文档",
      },
      hero: {
        eyebrow: "文档",
        title: "开始使用 Wenlan。",
        description:
          "安装本地 memory layer，学习每日 handoff loop，并让 AI 工作 context 可读、可搜索、可由你掌控。",
      },
      intro: {
        eyebrow: "从这里开始",
        body: "新用户应该先安装，为自己的 client 运行 setup，接着阅读 daily workflow 和 core concepts。Project docs 涵盖 architecture、reference paths、evals、releases、scope、source builds、roadmap、development conventions 和 contribution paths。",
      },
      sections: {
        items: [
          {
            id: "start-here",
            title: "从这里开始",
            description: "安装 Wenlan，并验证第一次 memory round trip。",
          },
          {
            id: "after-setup",
            title: "安装之后",
            description:
              "把安装变成工作习惯：带着 context 开始、捕捉有用内容、检查哪些内容应该被信任，并在 context 变冷前 hand off。",
          },
          {
            id: "reference",
            title: "参考资料",
            description:
              "Memory types、glossary、architecture、commands、Claude Code plugin、CLI/service management、updates、upgrade notes、package names、platform support、HTTP API、API examples、typed clients、spaces、graph context、pages、import paths、git history、retrieval status、experimental flags、local data、backup paths、configuration、environment variables、MCP clients、agent profiles、diagnostics、FAQ 和 repair paths。",
          },
          {
            id: "project",
            title: "项目",
            description:
              "Security reporting、evaluation、desktop status、changelog、release/versioning、roadmap、project scope、source builds、testing、CI、development conventions，以及帮助判断 Wenlan 是否可信到值得采用或贡献的 contribution paths。",
          },
        ],
      },
      startItem: {
        href: "/docs/get-started",
        label: "设置",
        title: "开始使用 Wenlan",
        description:
          "安装 Claude Code plugin，或为另一个 MCP client 运行 Wenlan setup，然后确认本地 memory loop 可以工作。",
        meta: "Wenlan 团队 · 更新于 2026 年 5 月 15 日 · 4 分钟设置",
      },
      cta: {
        eyebrow: "已经安装了？",
        title: "把 memory loop 变成习惯。",
        body: "先从 daily workflow 开始；需要 commands、MCP setup 或 repair steps 时，再使用 reference docs。",
        primary: { id: "daily-workflow", href: "/docs/daily-workflow", label: "每日工作流程" },
        secondary: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "GitHub",
        },
      },
      schema: {
        name: "Wenlan 文档",
        description: "Wenlan local-first AI 工作 memory 的产品文档。",
      },
    },
  },
  getStarted: {
    status: "translated",
    sourceHash: "87fbb446a6a248806986c9233ccfa1c886a08b5fb18c2fb3e0bb7863ba312525",
    content: {
      seo: {
        title: "开始使用 Wenlan | 本地 AI 工作记忆",
        description:
          "通过 Claude Code plugin 安装 Wenlan，或先运行 Wenlan setup，再连接其他 MCP client。",
      },
      breadcrumbs: {
        home: "Wenlan",
        docs: "文档",
      },
      hero: {
        eyebrow: "开始使用",
        title: "把 Wenlan 接到你的 AI tools。",
        description:
          "先从 Claude Code plugin 开始，或通过本地 MCP server 把 Wenlan 加到另一个 MCP-compatible client。",
        meta: ["Wenlan 团队", "更新于 2026 年 5 月 15 日", "4 分钟设置"],
        setupPathLabel: "设置路径",
        setupPathItems: ["Claude Code 工具", "MCP clients 连接", "本地 daemon"],
      },
      steps: [
        {
          id: "claude-code-plugin",
          number: "01",
          title: "Claude Code 插件",
          paragraphs: [
            "这是最快的路径。plugin 会处理 daemon setup、MCP wiring、本地 memory setup，以及第一次 round-trip check。",
            "如果 Claude Code 在安装后要求 restart，重启一次，然后运行 /init。",
          ],
          commands: claudeCommands,
          ctas: [],
        },
        {
          id: "other-mcp-clients",
          number: "02",
          title: "其他 MCP clients",
          paragraphs: [
            "Cursor、Codex、Claude Desktop、Gemini CLI 和其他 MCP-compatible clients，要先设置本地 Wenlan runtime。接着让 Wenlan CLI 把 MCP connector 加到你使用的 client。",
            "Wenlan setup 会安装 CLI、daemon 和 MCP connector，设置本地 memory，向操作系统的 user service manager 注册 daemon，并验证状态。",
          ],
          commands: [
            "npx -y wenlan setup",
            "~/.wenlan/bin/wenlan mcp add codex\n# 或：cursor, claude-desktop, vscode, gemini",
          ],
          ctas: [],
        },
        {
          id: "try-first",
          number: "03",
          title: "先试什么",
          paragraphs: [
            "保存一个 durable project fact，然后在新 session 请你的 agent recall。Wenlan 应该让这段 context 可见、可搜索，并通过同一个本地 memory layer 使用。",
          ],
          commands: [],
          ctas: [
            { id: "daily-workflow", href: "/docs/daily-workflow", label: "开始 daily workflow" },
            { id: "learn", href: "/learn", label: "阅读文章" },
          ],
        },
      ],
      sidebar: {
        eyebrow: "你会得到",
        items: [
          { id: "local-daemon", label: "本地 daemon" },
          { id: "claude-code-plugin", label: "Claude Code 插件" },
          { id: "mcp-server", label: "MCP 服务器" },
          { id: "shared-memory-layer", label: "共享 memory layer" },
        ],
      },
      schema: {
        name: "开始使用 Wenlan",
        description:
          "在 Claude Code 安装 Wenlan，或先运行 Wenlan setup 再连接其他 MCP client。",
      },
    },
  },
  notFound: {
    status: "translated",
    sourceHash: "58391d595516d6d5c9ccfe9b619b16eadab552459334ae9fefd950899b332dc5",
    content: {
      eyebrow: "404",
      title: "这个页面不存在。",
      description:
        "如果你是从链接进入，链接可能已经过期。如果你手动输入 URL，请检查是否有错字。下面是常用起点。",
      primaryCta: "回到首页",
      secondaryCta: "浏览文章",
      popularHeading: "常用目的地",
      popularDestinations: [
        {
          id: "get-started",
          href: "/docs/get-started",
          label: "开始使用",
          description: "安装 Wenlan，并验证第一次本地 memory loop。",
        },
        {
          id: "daily-workflow",
          href: "/docs/daily-workflow",
          label: "每日工作流程",
          description: "在 AI sessions 之间 capture、handoff、distill。",
        },
        {
          id: "ai-work-memory",
          href: "/learn/ai-work-memory",
          label: "AI 工作记忆",
          description: "当 AI sessions 能跨天带着 context，工作会有什么改变。",
        },
        {
          id: "mcp-memory-server",
          href: "/learn/mcp-memory-server",
          label: "MCP 记忆服务器",
          description: "Wenlan 如何通过 MCP 暴露 memory。",
        },
        {
          id: "basic-memory",
          href: "/learn/wenlan-vs-basic-memory",
          label: "Wenlan 与 Basic Memory 对比",
          description: "Markdown knowledge base 与 AI work-session memory layer 的差异。",
        },
        {
          id: "about",
          href: "/about",
          label: "关于",
          description: "项目背景、原则，以及 Wenlan 背后的人。",
        },
      ],
    },
  },
  footer: {
    status: "translated",
    sourceHash: "ae36345cdc60d621c15b556e8e233adf90fe2d12aefe0953a73e34eabb522094",
    content: {
      brand: "Wenlan",
      tagline: "为 AI 工作而生的活个人知识库。",
      groups: [
        {
          id: "product",
          title: "产品",
          links: [
            { id: "get-started", href: "/docs/get-started", label: "开始使用" },
            { id: "daily-workflow", href: "/docs/daily-workflow", label: "每日工作流程" },
            { id: "capture-quality", href: "/docs/capture-quality", label: "捕捉质量" },
            { id: "core-concepts", href: "/docs/core-concepts", label: "核心概念" },
            { id: "data-and-privacy", href: "/docs/data-and-privacy", label: "数据与隐私" },
            { id: "configuration", href: "/docs/configuration", label: "配置" },
            { id: "updates", href: "/docs/updates-and-uninstall", label: "更新" },
            { id: "platforms", href: "/docs/platforms", label: "平台" },
            { id: "docs", href: "/docs", label: "文档" },
          ],
        },
        {
          id: "learn",
          title: "学习",
          links: [
            { id: "learn-hub", href: "/learn", label: "学习中心" },
            { id: "vs-basic-memory", href: "/learn/wenlan-vs-basic-memory", label: "与 Basic Memory 对比" },
            { id: "vs-claude-mem", href: "/learn/wenlan-vs-claude-mem", label: "与 claude-mem 对比" },
            {
              id: "vs-superlocal-memory",
              href: "/learn/wenlan-vs-superlocal-memory",
              label: "与 Superlocal Memory 对比",
            },
          ],
        },
        {
          id: "project",
          title: "项目",
          links: [
            { id: "about", href: "/about", label: "关于" },
            { id: "architecture", href: "/docs/architecture", label: "架构" },
            { id: "evaluation", href: "/docs/evaluation", label: "评估" },
            { id: "changelog", href: "/docs/changelog", label: "更新日志" },
            { id: "roadmap", href: "/docs/roadmap", label: "路线图" },
            { id: "project-scope", href: "/docs/project-scope", label: "项目范围" },
            { id: "security", href: "/docs/security", label: "安全" },
            { id: "github", href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
            { id: "rss", href: "/feed.xml", label: "RSS 订阅" },
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
        tagline: "活个人知识库",
        builtByPrefix: "作者",
        author: "Qi-Xuan Lu",
        authorUrl: "https://github.com/7xuanlu",
      },
    },
  },
} as const satisfies CoreContent;
