import type { CoreContent } from "./schema";

const claudeCommands = [
  "/plugin marketplace add 7xuanlu/claude-plugins",
  "/plugin install wenlan@7xuanlu",
  "/setup",
] as const;

export const zhCNContent = {
  chrome: {
    status: "translated",
    sourceHash: "bda0fd8a846d006539eab9c685b3be1e51df3f019c837c06e79900eb774faa57",
    content: {
      skipLinkLabel: "跳到主要内容",
      breadcrumbAriaLabel: "面包屑",
    },
  },
  home: {
    status: "translated",
    sourceHash: "2eda8645f54472fe4d1808a15d6112a25a826748af65e07c734d564b5185356e",
    content: {
      seo: {
        title: "Wenlan 文澜 | AI 工作的 LLM wiki",
        description:
          "Wenlan 文澜是 AI 工作的 LLM wiki：AI 代理捕捉学到的内容，你加入信任来源，本地 daemon 让有来源依据的 wiki 页面保持最新。",
      },
      nav: {
        schemaName: "Wenlan 文澜网站导航",
        brand: "Wenlan 文澜",
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
        title: "Wenlan 文澜",
        description:
          "AI 工作的 LLM wiki。AI\u00a0代理捕捉学到的内容，你加入信任来源，Wenlan 让有来源依据的 wiki 页面跨工具、跨时间保持最新。",
        primaryCta: { id: "get-started", href: "/docs/get-started", label: "开始使用" },
        secondaryCta: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "在 GitHub 查看",
        },
        metaText: [
          { id: "agent-plugins", label: "Claude Code + Codex 插件" },
          { id: "chatgpt-mcp", label: "ChatGPT 通过远程 MCP" },
          { id: "local-daemon", label: "本地 daemon" },
        ],
        metaLinks: [
          {
            id: "llm-wiki",
            href: "/learn/distilled-wiki-pages-ai-memory",
            label: "LLM wiki 导览",
          },
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
        title: "Wenlan v0.9 历史演示",
        playLabel: "播放 Wenlan v0.9 历史演示",
      },
      useCases: {
        eyebrow: "使用场景",
        title: "给 code、客户工作、研究用的\nLLM wiki。",
        description:
          "Wenlan 把 repo 事实、客户限制、source trails 和读书笔记变成 agent 能简报、召回、交接的 source-cited 页面。",
        evidenceLabel: "Agent 可引用的页面",
        outcomeLabel: "可引用页面",
        actionsLabel: "Agent 动作",
        index: {
          title: "Wenlan Wiki 索引",
          activeViewLabel: "当前视图",
          pagesTitle: "Agent 可引用的页面",
          pagesLabel: "页面",
          sourcesLabel: "来源",
          statusLabel: "状态",
          sourceBackedLabel: "有来源",
          citationLabel: "Agent 引用",
          citingLabel: "引用中的页面",
        },
        scenarios: [
          {
            id: "dev-codebase",
            label: "Dev / codebase 工作",
            railLabel: "代码",
            summary: "会持续更新的工程文档",
            lead: "维护工程师真的会更新的 codebase 文档。",
            body: "Wenlan 让有来源的工程页面持续更新：架构地图、runbook、migration plan、integration note、debugging log 都会跟着 repo 变化。",
            evidence: [
              {
                id: "architecture",
                label: "架构地图",
                detail: "服务边界、数据流、owner、runtime constraints，以及会随代码改变的 diagrams。",
              },
              {
                id: "failed-paths",
                label: "操作手册",
                detail: "如何重现、release、rollback、监控或操作系统，不必再问上一位工程师。",
              },
              {
                id: "dependency-research",
                label: "Migration 计划",
                detail: "Schema 变更、API migration、rollout 阶段、blocked paths，以及跨 session 的 cleanup tasks。",
              },
              {
                id: "open-threads",
                label: "集成笔记",
                detail: "Dependency quirks、版本限制、adapter decisions，以及连到 source docs 的 upstream issues。",
              },
            ],
            outcome: "下一个 agent 打开的是工程师也会更新的 living docs。",
          },
          {
            id: "product-customers",
            label: "Product / 客户工作",
            railLabel: "客户工作",
            summary: "通话、限制、proposal",
            lead: "让下一份 proposal 带着客户 context 开始。",
            body:
              "下一份 proposal 前，产品团队、顾问和自由工作者可以召回客户反对点、client constraint，以及真正改变方案的取舍。",
            evidence: [
              {
                id: "customer-voice",
                label: "客户反对点",
                detail: "访谈、support、sales notes 中反复出现的需求和反对理由。",
              },
              {
                id: "client-constraints",
                label: "Client 限制",
                detail: "每个 client space 的品牌、预算、审批、法务或交付限制。",
              },
              {
                id: "decision-rationale",
                label: "Proposal 取舍",
                detail: "为什么某个 roadmap、proposal 或 pricing 取舍胜过其他选项。",
              },
              {
                id: "follow-up-threads",
                label: "后续 owner",
                detail: "下一次会议前要追的问题、承诺的下一步，以及负责人。",
              },
            ],
            outcome: "下一份 proposal 从客户反对点、限制、取舍和 owner 开始。",
          },
          {
            id: "research-writing",
            label: "Research / 写作",
            railLabel: "研究",
            summary: "sources、有引用的页面、下一版 outline",
            lead: "把研究脉络变成可引用的 wiki 页面。",
            body: "Papers、docs、transcripts 和 links 堆起来后，下一稿可以从可信 quote、待重查 claim，以及有引用的 outline 接续。",
            evidence: [
              {
                id: "trusted-sources",
                label: "可信 quote",
                detail: "你已经决定信任的 papers、docs、transcripts 和 links。",
              },
              {
                id: "comparison-notes",
                label: "比较 note",
                detail: "工具、主张或标准之间哪里改变，并保留完整 source trail。",
              },
              {
                id: "outline-decisions",
                label: "下一稿 outline",
                detail: "下一稿要延续的论点、段落顺序和开放问题。",
              },
              {
                id: "stale-claims",
                label: "待重查 claim",
                detail: "放进公开文案前，需要重新确认的事实。",
              },
            ],
            outcome: "写作从有引用的 working page 接续，而不是从一堆 tabs 重开。",
          },
          {
            id: "learning-study",
            label: "学习与读书",
            railLabel: "学习",
            summary: "概念、前置知识、复习",
            lead: "把读书 session 变成能教下一次的页面。",
            body: "终于想通的解释会变成概念页面，前置知识也链接好，下一次 session 是在复习理解，而不是回头翻聊天记录。",
            evidence: [
              {
                id: "concept-pages",
                label: "概念页面",
                detail: "那个终于说通的解释，连同让它成立的来源一起留下。",
              },
              {
                id: "prerequisite-links",
                label: "前置链接",
                detail: "每个概念建立在什么之上，先链好，让知识缺口在造成代价前现形。",
              },
              {
                id: "review-notes",
                label: "复习笔记",
                detail: "上次哪里想错，以及修正它的那个更正。",
              },
              {
                id: "study-plan",
                label: "读书计划",
                detail: "接下来该读什么，按你已掌握的前置知识排序。",
              },
            ],
            outcome: "下一次读书 session 打开的是概念页面，不是上周的聊天滚动。",
          },
        ],
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
          visualLabels: {
            start: "开始",
            capture: "捕捉",
            handoff: "交接",
            resume: "接续",
          },
        },
        memoryDistillery: {
          eyebrow: "刻意蒸馏",
          title: "Wenlan 把重复出现的 context 变成 LLM wiki。",
          body: "当重复捕捉的内容值得变成可读的 wiki 页面时，运行 /distill。可选的本地模型或 API key 路径可以加入背景提取与页面更新。",
          note: "下一次运行从有引用的 context 开始，而不是从 transcript 残留开始。",
          visualLabels: {
            merged: "合并",
            linked: "连接",
            refined: "精炼",
          },
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
          body: "本地 runtime、CLI、MCP server、Claude Code plugin 和 Codex plugin 都是 Apache-2.0。",
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
            emailPlaceholder: "you@email.com",
            fallbackError: "发生错误，请再试一次。",
            errors: {
              required: "请输入 email。",
              invalid: "请输入有效的 email。",
              notConfigured: "候补名单尚未设置。",
              unknown: "发生错误，请再试一次。",
            },
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
            a: "Wenlan 是 AI 工作的 LLM wiki。AI 代理捕捉学到的内容，你加入信任来源，本地 daemon 让有来源依据的 wiki 页面跨 chats、tools、projects 和时间保持最新。",
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
            a: "Claude Code 和 Codex 有 plugin 路径。Cursor、Claude Desktop、VS Code、Gemini CLI 等本地 clients 通过 Wenlan 的 MCP server 连接。ChatGPT 和 Claude.ai 使用 Streamable HTTP MCP，desktop app 的 Remote Access 提供引导式路径。Remote Access 没有身份验证；任何拿到 URL 的人都能访问 Wenlan，因此不用时请停止 Remote Access。",
          },
          {
            id: "not-notes",
            q: "Wenlan 能取代 Notion 或 Obsidian 吗？",
            a: "不能。Wenlan 不是 notes app，也不是 writing tool。它捕捉并整理你从 AI conversations 学到的内容。如果你想在 Obsidian 阅读，可以把 ~/.wenlan/ 底下的 Markdown projection symlink 进去。",
          },
          {
            id: "setup",
            q: "我要怎么设置？",
            a: "Claude Code 使用 marketplace plugin 和 /setup。Codex 可以使用 Wenlan plugin，或运行 wenlan connect codex。其他本地 clients 使用 wenlan connect <client>。ChatGPT 和 Claude.ai 通过 desktop app 的 Remote Access URL 使用 Streamable HTTP MCP。该 URL 没有身份验证，请视为秘密，并在不用时停止 Remote Access。",
          },
          {
            id: "platforms",
            q: "Wenlan 支持 Windows 或 Linux 吗？",
            a: "支持。当前预编译 daemon release 覆盖 macOS Apple Silicon、Linux (x86_64, aarch64; glibc) 和 Windows (x86_64)。macOS Intel 仍可走 source/dev 路径，但目前没有 macOS Intel 预编译运行时。Service registration 在 macOS 使用 launchd、Linux 使用 systemd-user、Windows 使用 Task Scheduler (schtasks)。",
          },
          {
            id: "spaces",
            q: "我可以把工作和个人 memory 分开吗？",
            a: "可以。Memories、pages 和 recalls 都属于一个 space，例如 work、personal 或 client-X。你可以用 WENLAN_SPACE 在每个 shell 设置 active space，或在 ~/.wenlan/spaces.toml 声明。Auto-detector 也会从当前 repo 或 workspace 选择 space。",
          },
          {
            id: "free",
            q: "Wenlan 免费吗？",
            a: "是。Wenlan 是 open-source。Wenlan repo 里的本地 runtime、CLI、MCP server、Claude Code plugin 和 Codex plugin files 都是 Apache-2.0。",
          },
        ],
      },
      redesign: {
        hero: {
          headline: { pre: "值得信任的", emphasis: "活", post: " wiki。" },
          description:
            "你的 agents 边工作边写的第二大脑：repo 事实、客户通话、训练计划。每一页都保持有引用、有链接、跟得上现况，你不用自己维护。",
          assurances: [
            { id: "cited", label: "每个 claim 都有引用" },
            { id: "superseded", label: "过时事实自动被取代" },
            { id: "linked", label: "页面彼此链接" },
          ],
          worksWithLabel: "可搭配",
          worksWithNote: "Local-first、MCP server",
        },
        pains: {
          title: "每个 wiki 都死于乏人照料。",
          intro:
            "先是手工照料的 vault，接着是挂上 wiki 的 agents：写得更快，一样腐坏。Wenlan 是接下来的那一步。",
          generations: [
            {
              id: "wiki-graveyard",
              name: "Wiki 墓园",
              body: "Obsidian vaults、Notion 页面、团队 wiki。全靠手工照料，你的纪律撑多久，它就活多久。",
            },
            {
              id: "llm-wiki-1",
              name: "初代 llm-wiki",
              body: "Agents 把笔记倒进 Markdown 文件。没有来源、没有 recall、没有维护。它腐坏得更快，还更有自信。",
            },
            {
              id: "vault-agents",
              name: "Obsidian 加上 agents",
              body: "Agents 写进你的 vault，但园艺活还是你的。捕捉变容易了，腐坏照旧。",
            },
          ],
          current: {
            name: "Wenlan",
            body: "会自我维护的 llm-wiki：在真实工作中写成、引用到来源、由 hybrid recall 找回、在你睡觉时持续 enrich。",
          },
          closer: { pre: "而在你睡觉时，wiki 只会变得", emphasis: "更好", post: "。" },
        },
        pipeline: {
          intro:
            "Wenlan 在工作发生时捕捉决策，在 sessions 之间精炼 wiki，并在下一个 session 开始时送上简报。",
          stages: [
            { id: "capture", step: "/capture · session 进行中", title: "工作留下轨迹" },
            { id: "distill", step: "/distill · sessions 之间", title: "重复出现的内容变成页面" },
            { id: "brief", step: "/brief · 下一个 session", title: "下一个 agent 热启动" },
          ],
          distillNote: "当某个主题值得立刻成页时，agents 也会直接创建页面。",
          arcLabel: "/handoff 收尾每一轮",
        },
        bento: {
          cells: [
            {
              id: "pages",
              title: "人类读得懂，agents 用得上",
              body: "整理过的决策和教训变成耐用的页面，而不是埋在聊天记录里。",
            },
            {
              id: "graph",
              title: "Recall 带着脉络一起回来",
              body: "人、项目、页面会连着 memory 也彼此相连地回来，recall 到手时就带着整个邻域。",
            },
            {
              id: "citations",
              title: "每个 claim 都留着来源",
              body: "Wenlan 拒绝没有来源的页面。每个蒸馏出的 claim 都引用产生它的 memory，随时可以回溯重查。",
            },
            {
              id: "review",
              title: "先审核，再信任",
              body: "低信心的捕捉和矛盾会浮上来等你审核，而不是悄悄进入 context。你只在要紧时介入。",
            },
            {
              id: "nurture",
              title: "每一轮都更新鲜",
              body: "在 sessions 之间，后台批次会链接 entities、扩充相符的页面、淡化过时的 memories。",
            },
            {
              id: "spaces",
              title: "Spaces 让工作各归各位",
              body: "捕捉和 recall 都带上 space 标签，客户事实永远不会渗进 side project 的简报。",
            },
            {
              id: "git",
              title: "像代码一样有版本",
              body: "Memory、页面和 session artifacts 都活在真正的 git 历史里。可查看、可 diff、可回滚。",
            },
            {
              id: "mcp",
              title: "一个家，不被任何工具绑死",
              body: "每个 MCP client 都通过同一个本地 daemon 读同一份共享记忆。文件永远是你的。",
            },
          ],
        },
        storage: {
          title: "Agents 拿到索引。\n你拿到文件。",
          intro:
            "捕捉先进到快速的本地索引，再凝固成你能打开、diff、保存的 Markdown 页面。",
          indexLabel: "索引 · agents 的工作记忆",
          filesLabel: "Markdown · 属于你的长期记录",
          fusionNote: "三条路进来，一次查询。任何单一路径都会漏掉其中两条。",
          distillCaption: "staging 变成页面",
          ingestCaption: "页面被索引供 recall",
          tradeoffs: [
            {
              id: "files-alone",
              title: "只有文件",
              body: "每次 recall 都要重读整个文件夹，context window 买单。",
            },
            {
              id: "db-alone",
              title: "只有数据库",
              body: "快但不透明。没有东西可以打开、diff 或搬走。",
            },
            {
              id: "index-files",
              title: "索引 + 文件",
              body: "给 agents 一次查询。给你可读、有版本的文件。",
            },
          ],
        },
        metrics: {
          title: "少 96% tokens。",
          bars: [
            {
              id: "full-replay",
              label: "完整聊天重播",
              value: "每次查询 4,505 tokens / query",
              sub: "不使用 retrieval，整份 transcript 进 context",
            },
            {
              id: "wenlan",
              label: "Wenlan 检索",
              value: "每次查询 168 tokens / query",
              sub: "CE-reranked，500 题 snapshot",
            },
          ],
          footnote:
            "Retrieval-only snapshots。LME_S 在 stratified N=90 deep-S fixture 上记录 87.7% R@5 和 0.815 MRR。Token 比较是完整重播对 retrieved context。",
        },
      },
    },
  },
  about: {
    status: "translated",
    sourceHash: "cbceeec775dd09dfe648dd5ab097f81af302795ef8fbec3c72e7c76857da5ba4",
    content: {
      seo: {
        title: "关于 Wenlan | AI 工作的 LLM wiki",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作 LLM wiki，由 AI 代理建立，并以来源为根基。",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "关于",
      },
      hero: {
        eyebrow: "关于",
        title: "AI 工作的 LLM wiki。",
        description:
          "AI 代理捕捉学到的内容，你加入信任来源，Wenlan 让有来源依据的 wiki 页面在 AI 工作中保持最新。",
        statusLabel: "项目状态",
        statusItems: ["版本 v0.12.0", "支持 macOS、Linux、Windows", "Apache-2.0", "Qi-Xuan Lu 构建"],
      },
      sections: [
        {
          id: "why",
          number: "01",
          title: "为什么 Wenlan 存在",
          paragraphs: [
            "AI 工作已经变成严肃工作，但大多数 sessions 仍像一次性对话一样结束。决策、debugging lessons、项目限制和 handoffs 都被埋在旧 chats 里。",
            "Wenlan 是为了让工作积累成 LLM wiki 而建。AI 代理可以保存重要内容，之后 recall，并让有来源依据的 refined context 跨 MCP-compatible tools 持续可用。",
          ],
        },
        {
          id: "builder",
          number: "03",
          title: "由 Qi-Xuan Lu 构建",
          paragraphs: [
            "Wenlan 由 Qi-Xuan Lu (GitHub @7xuanlu) 构建与维护。背景涵盖 AI infrastructure、knowledge graphs 和 local-first systems。",
            "这项工作聚焦在 agent 能构建、用户能检查的 LLM wiki：libSQL 上的 hybrid retrieval、可读页面的真实 git versioning、session handoffs、status artifacts、distilled pages 的 mandatory provenance，以及一个 daemon 服务多种 AI tools。",
            "项目渠道：bugs 和 feature requests 用 GitHub Issues，vulnerabilities 看 SECURITY.md，变更则看 Wenlan release notes。",
          ],
        },
        {
          id: "status",
          number: "04",
          title: "当前状态",
          paragraphs: [
            "Wenlan v0.12.0 支持的预编译运行时包括 macOS Apple Silicon、Linux (x86_64, aarch64; glibc) 和 Windows (x86_64)。macOS Intel 仍是 source/dev-only，直到 public release workflow 发布该 artifact。daemon、CLI、MCP server、Claude Code plugin 和 Codex plugin 都以 Apache-2.0 open source。",
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
          "Wenlan 是 open-source、local-first 的 AI 工作 LLM wiki，由 Qi-Xuan Lu 构建。",
      },
    },
  },
  docs: {
    status: "translated",
    sourceHash: "7bc1f96816d6d23bd333ae918c78426688e6b07f45390c7e02531a2408a4528f",
    content: {
      seo: {
        title: "Wenlan 文档 | AI 工作的 LLM wiki",
        description:
          "安装 Wenlan，学习 AI 工作记忆循环，理解有来源依据的 wiki 页面、provenance、retrieval 和 MCP clients 如何配合。",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "文档",
      },
      hero: {
        eyebrow: "文档",
        title: "开始使用 Wenlan。",
        description:
          "安装 Wenlan、连接你使用的 AI tools，并构建可读、可搜索、由你掌控的 source-backed LLM wiki。",
      },
      intro: {
        eyebrow: "从这里开始",
        body: "新用户应该先安装，为自己的 client 运行 setup，接着阅读 daily workflow 和 core concepts。Project docs 涵盖 source-backed pages、architecture、reference paths、evals、releases、scope、source builds、roadmap、development conventions 和 contribution paths。",
      },
      sections: {
        items: [
          {
            id: "start-here",
            title: "从这里开始",
            description: "安装 Wenlan，并验证第一次 memory round trip。",
            items: [
              {
                id: "get-started",
                href: "/docs/get-started",
                label: "设置",
                title: "开始使用 Wenlan",
                description:
                  "选择 Claude Code、Codex、ChatGPT 或本地 MCP 路径，然后确认第一次 capture 与 recall round trip 可以工作。",
                meta: "Wenlan 团队 · 更新于 2026 年 7 月 9 日 · 4 分钟设置",
              },
            ],
          },
          {
            id: "after-setup",
            title: "安装之后",
            description:
              "把安装变成工作习惯：带着 context 开始、捕捉有用内容、检查哪些内容应该被信任，并在 context 变冷前 hand off。",
            items: [
              {
                id: "daily-workflow",
                href: "/docs/daily-workflow",
                label: "工作流",
                title: "每日 Workflow",
                description:
                  "带着 context 开始，捕捉重要内容，需要时 recall，并在 context 变冷前 hand off。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "capture-quality",
                href: "/docs/capture-quality",
                label: "捕捉",
                title: "捕捉质量",
                description:
                  "判断什么该进 Wenlan：durable facts、decisions、lessons、gotchas、corrections 和 project context。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "review-and-trust",
                href: "/docs/review-and-trust",
                label: "信任",
                title: "检查与信任",
                description:
                  "了解 Wenlan 如何让不确定的 memory 可见：pending captures、revisions、contradictions、rejections、confirm 和 forget。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "core-concepts",
                href: "/docs/core-concepts",
                label: "概念",
                title: "核心概念",
                description:
                  "了解 Wenlan 背后的组件：memories、sessions、handoffs、pages、daemon、MCP、Markdown 和 local index。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
            ],
          },
          {
            id: "reference",
            title: "参考资料",
            description:
              "Memory types、glossary、architecture、commands、Claude Code 和 Codex plugins、CLI/service management、updates、upgrade notes、package names、platform support、HTTP API、API examples、typed clients、spaces、graph context、pages、import paths、git history、retrieval status、experimental flags、local data、backup paths、configuration、environment variables、本地与 web MCP clients、agent profiles、diagnostics、FAQ 和 repair paths。",
            items: [
              {
                id: "memory-types",
                href: "/docs/memory-types",
                label: "记忆",
                title: "Memory 类型",
                description:
                  "了解 Wenlan 的六种 canonical memory types、agent 如何选择，以及哪些 legacy aliases 仍会出现在 API 边界。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "glossary",
                href: "/docs/glossary",
                label: "术语表",
                title: "术语表",
                description:
                  "快速对照 Wenlan 术语：memory、handoff、page、space、daemon、MCP、local index、provenance 和 eval language。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "architecture",
                href: "/docs/architecture",
                label: "架构",
                title: "架构",
                description:
                  "Wenlan 的组成方式：一个本地 daemon、薄 client、shared wire types、本地 artifacts，以及由 wenlan-core 负责的 retrieval。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 7 分钟阅读",
              },
              {
                id: "product-matrix",
                href: "/docs/product-matrix",
                label: "矩阵",
                title: "产品矩阵",
                description:
                  "对照 Wenlan 的 daemon、CLI、MCP connector、plugins、desktop app、代码仓库、平台 artifacts 和 release 边界。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 7 月 9 日 · 6 分钟阅读",
              },
              {
                id: "commands",
                href: "/docs/commands",
                label: "命令参考",
                title: "Commands 与 Tools",
                description:
                  "日常使用 Wenlan 时最重要的 Claude Code 与 Codex plugin commands、CLI commands 和 MCP tools。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "claude-code-plugin",
                href: "/docs/claude-code-plugin",
                label: "插件",
                title: "Claude Code 插件",
                description:
                  "在 Claude Code 中使用 Wenlan 最完整的 workflow：setup、session brief、capture、recall、curate、distill、pages 和 handoff。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "cli-and-service",
                href: "/docs/cli-and-service",
                label: "CLI 管理",
                title: "CLI 与 Service 管理",
                description:
                  "使用 Wenlan CLI 安装 runtime、管理 daemon、检查 status、搜索 memory，并连接 MCP clients。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "updates-and-uninstall",
                href: "/docs/updates-and-uninstall",
                label: "生命周期",
                title: "更新与卸载",
                description:
                  "刷新 Wenlan 本地 runtime、验证版本健康、重启 MCP clients，并在不意外丢失数据的前提下移除 service。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "upgrade-notes",
                href: "/docs/upgrade-notes",
                label: "升级",
                title: "升级笔记",
                description:
                  "阅读 Wenlan releases 的实用升级路径：要重跑什么、验证什么，以及当前 public runtime shape 改了什么。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "packages-and-registries",
                href: "/docs/packages-and-registries",
                label: "Packages 包",
                title: "Packages 与 Registries",
                description:
                  "了解 Wenlan package name 如何对应到 plugin、runtime setup、MCP connector、Rust crates 和 release binaries。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "platforms",
                href: "/docs/platforms",
                label: "平台",
                title: "平台支持",
                description:
                  "了解 Wenlan 如何在 macOS、Linux 和 Windows 上运行：service managers、local data paths、model backends，以及 Docker/VM caveats。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "http-api",
                href: "/docs/http-api",
                label: "API 参考",
                title: "HTTP API 参考",
                description:
                  "了解 CLI、MCP connector、plugin 和 local tools 背后调用的本地 daemon surfaces。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "api-examples",
                href: "/docs/api-examples",
                label: "API 示例",
                title: "API 示例",
                description:
                  "当 CLI 或 MCP tools 不是合适选择时，从 scripts 使用本地 daemon HTTP API。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "typed-clients",
                href: "/docs/typed-clients",
                label: "Types 参考",
                title: "Typed Clients 类型客户端",
                description:
                  "当 Rust tool 需要调用本地 daemon、又不想依赖 untyped JSON shapes 时，使用 wenlan-types。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "spaces",
                href: "/docs/spaces",
                label: "Spaces 管理",
                title: "Spaces 空间",
                description:
                  "分开 work、personal、client 和 project memory，并了解 Wenlan 如何解析 active space。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "knowledge-graph",
                href: "/docs/knowledge-graph",
                label: "Graph 图谱",
                title: "Knowledge Graph 知识图谱",
                description:
                  "了解 Wenlan 如何连接 people、projects、tools、observations 和 relations，让 recall 不只靠文本相似度也能找回 context。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "source-backed-pages",
                href: "/docs/source-backed-pages",
                label: "Pages 页面",
                title: "有来源支撑的 Pages",
                description:
                  "了解 Wenlan 如何把 atomic captures 变成含 source memory IDs、revision state 和 refresh paths 的可读 pages。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "import-and-portability",
                href: "/docs/import-and-portability",
                label: "可移植性",
                title: "Import 与 Portability",
                description:
                  "把选定的 durable context 移入 Wenlan，并让 Wenlan 的可读 artifacts 在 daemon 之外也保持 portable。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "local-git-history",
                href: "/docs/local-git-history",
                label: "版本",
                title: "本地 Git History",
                description:
                  "检查 Wenlan 为可读 page、session、handoff 和 status artifacts 保留的真实 git history。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "models-and-keys",
                href: "/docs/models-and-keys",
                label: "模型",
                title: "Models 与 Keys",
                description:
                  "在 local memory mode、可选 on-device models 和可选 Anthropic API keys 之间选择，用于更丰富的 extraction、page synthesis、recaps 和 graph work。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "advanced-retrieval",
                href: "/docs/advanced-retrieval",
                label: "Retrieval 检索",
                title: "进阶 Retrieval 状态",
                description:
                  "了解 Wenlan 已发布的 retrieval path，以及新版 retrieval work 背后那些 opt-in main-branch experiments。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "experimental-flags",
                href: "/docs/experimental-flags",
                label: "Experiments 实验",
                title: "Experimental Flags 实验标志",
                description:
                  "了解如何阅读 Wenlan 的 opt-in main-branch flags，而不把它们误认为 released defaults。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "data-and-privacy",
                href: "/docs/data-and-privacy",
                label: "本地控制",
                title: "数据与隐私",
                description:
                  "Wenlan 把数据放在哪里、哪些内容保持本地，以及可读 artifacts 如何搭配 daemon-owned retrieval store。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "backup-and-migration",
                href: "/docs/backup-and-migration",
                label: "备份",
                title: "备份与迁移",
                description:
                  "一起备份 Wenlan 的可读 artifacts 和 daemon data，并在信任 recall 前验证还原后的 runtime。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "configuration",
                href: "/docs/configuration",
                label: "配置",
                title: "Wenlan 配置",
                description:
                  "配置 Wenlan spaces、MCP clients、daemon bind address、local paths、models 和 keys，不需要手动编辑 database。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "environment-variables",
                href: "/docs/environment-variables",
                label: "Config 变量",
                title: "Environment Variables 环境变量",
                description:
                  "了解哪些 Wenlan environment variables 是一般 configuration、哪些只用于 development，以及哪些属于 eval 或 Windows repair paths。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "mcp-clients",
                href: "/docs/mcp-clients",
                label: "MCP 连接",
                title: "连接 MCP Clients",
                description:
                  "把 Claude Code、Codex、Cursor、Claude Desktop、Gemini CLI、ChatGPT、Claude.ai 和其他 MCP clients 连接到 Wenlan。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "agent-profiles",
                href: "/docs/agent-profiles",
                label: "Agents 管理",
                title: "Agent Profiles 配置",
                description:
                  "检查写入 Wenlan 的 AI clients 和 local tools，并从 CLI 管理 source attribution、enabled state 和 trust。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "troubleshooting",
                href: "/docs/troubleshooting",
                label: "修复",
                title: "故障排查",
                description:
                  "修正常见 setup issues：daemon 未运行、MCP 未连上、Claude commands 缺失、stale context，以及 support escalation。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "diagnostics-and-issue-reports",
                href: "/docs/diagnostics-and-issue-reports",
                label: "诊断",
                title: "诊断与 Issue 报告",
                description:
                  "求助前先跑正确 checks，分开 daemon problems 与 client problems，并只分享 redacted output。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "faq",
                href: "/docs/faq",
                label: "常见问题",
                title: "FAQ 常见问题",
                description:
                  "安装 Wenlan 前后常见 adoption questions 的短答案。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
            ],
          },
          {
            id: "project",
            title: "项目",
            description:
              "Security reporting、evaluation、desktop status、changelog、release/versioning、roadmap、project scope、source builds、testing、CI、development conventions，以及帮助判断 Wenlan 是否可信到值得采用或贡献的 contribution paths。",
            items: [
              {
                id: "security",
                href: "/docs/security",
                label: "安全",
                title: "安全与报告",
                description:
                  "私下报告 vulnerabilities、让 diagnostic reports 保持 redacted，并了解 Wenlan 的本地安全边界。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "evaluation",
                href: "/docs/evaluation",
                label: "评估",
                title: "Evaluation 评估",
                description:
                  "了解 Wenlan 公开 retrieval numbers 代表什么、如何产生，以及没有声称什么。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "desktop-app",
                href: "/docs/desktop-app",
                label: "桌面版",
                title: "Desktop App 状态",
                description:
                  "了解可选的 Wenlan desktop app 与 daemon、plugins、source-backed wiki，以及 ChatGPT 和 Claude.ai Remote Access 的关系。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 4 分钟阅读",
              },
              {
                id: "changelog",
                href: "/docs/changelog",
                label: "版本",
                title: "Changelog 更新日志",
                description:
                  "Wenlan 的 public release history，以及如何阅读 main 上尚未发布的工作。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "releases-and-versioning",
                href: "/docs/releases-and-versioning",
                label: "发布",
                title: "Releases 与 Versioning",
                description:
                  "了解 Wenlan 如何把 merged work 变成 tagged releases、package versions、binaries、npm packages 和 crates。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "roadmap",
                href: "/docs/roadmap",
                label: "路线图",
                title: "Roadmap 与 Status",
                description:
                  "了解 Wenlan 当前方向，同时不混淆 released features、main-branch work 和 future bets。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 6 分钟阅读",
              },
              {
                id: "project-scope",
                href: "/docs/project-scope",
                label: "范围",
                title: "Project Scope 项目范围",
                description:
                  "Wenlan 适合什么、刻意避开什么，以及如何判断它是否适合你的 AI work。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "build-from-source",
                href: "/docs/build-from-source",
                label: "开发",
                title: "从 Source Build",
                description:
                  "从 public repository build Wenlan daemon、CLI、MCP server、shared types、core crate 和 plugin。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "testing-and-ci",
                href: "/docs/testing-and-ci",
                label: "质量",
                title: "Testing 与 CI",
                description:
                  "了解哪些 Wenlan checks 在本地运行、哪些在 GitHub Actions 运行，以及哪些 evals 保持 manual。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "development-conventions",
                href: "/docs/development-conventions",
                label: "开发惯例",
                title: "Development Conventions 开发惯例",
                description:
                  "让 Wenlan daemon、CLI、MCP connector、shared types 和 core logic 维持可维护的 codebase rules。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
              {
                id: "contributing",
                href: "/docs/contributing",
                label: "开源贡献",
                title: "Contributing 贡献",
                description:
                  "如何为 Wenlan 贡献有用的 bug reports、docs、eval cases 和 code changes。",
                meta: "Qi-Xuan Lu · 更新于 2026 年 6 月 24 日 · 5 分钟阅读",
              },
            ],
          },
        ],
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
        description: "Wenlan 这套 source-backed AI 工作 LLM wiki 的产品文档。",
      },
    },
  },
  getStarted: {
    status: "translated",
    sourceHash: "ec2b349cd5ea407b5c9172d99bf518ec790085aa5fa4b8b7797f122e41226eff",
    content: {
      seo: {
        title: "开始使用 Wenlan | AI 工作的 LLM wiki",
        description:
          "通过 Claude Code、Codex、ChatGPT、Claude.ai 或其他 MCP client 连接 Wenlan，再验证第一次 capture 与 recall round trip。",
      },
      breadcrumbs: {
        home: "Wenlan",
        docs: "文档",
      },
      hero: {
        eyebrow: "开始使用",
        title: "把 Wenlan 接到你的\u00a0AI\u00a0工具。",
        description:
          "Coding agents 使用 Claude Code 或 Codex 路径，ChatGPT 或 Claude.ai 使用 Remote Access，其他 clients 使用本地 MCP。每条路径都会进入同一个 source-backed wiki 与 handoff loop。",
        meta: ["Wenlan 团队", "更新于 2026 年 7 月 9 日", "4 分钟设置"],
        setupPathLabel: "设置路径",
        setupPathItems: ["Claude Code 路径", "Codex 路径", "ChatGPT 路径", "本地 + 远程 MCP"],
      },
      steps: [
        {
          id: "claude-code-plugin",
          number: "01",
          title: "Claude Code 插件",
          paragraphs: [
            "这是最快的路径。plugin 会处理 daemon setup、MCP wiring、本地 memory setup，以及第一次 round-trip check。",
            "如果 Claude Code 在安装后要求 restart，重启一次，然后运行 /setup。",
          ],
          commands: claudeCommands,
          ctas: [],
        },
        {
          id: "codex",
          number: "02",
          title: "Codex 设置",
          paragraphs: [
            "先运行 Wenlan setup，再把 Codex 连接到本地 MCP server。主要 Wenlan repo 也提供 Codex plugin 给从 checkout 安装的用户；wenlan connect codex 是不需要 checkout 的直接 client 路径。",
          ],
          commands: [
            "npx -y wenlan setup",
            "~/.wenlan/bin/wenlan connect codex",
          ],
          ctas: [],
        },
        {
          id: "chatgpt-web",
          number: "03",
          title: "ChatGPT 和 Claude.ai",
          paragraphs: [
            "在 Wenlan desktop app 打开 Remote Access，为 Streamable HTTP MCP 创建临时的 HTTPS URL。App 会在 loopback 以 --no-auth 启动 wenlan-mcp，再通过 tunnel 暴露；任何拿到 URL 的人都能访问。在 ChatGPT 启用 Developer mode、创建 app，并以 No Auth 粘贴 URL；Claude.ai 则通过 Add Custom Connector 使用同一个 URL。",
            "这是连接到你自己 Wenlan runtime 的 custom MCP，不代表 Wenlan 已列入公开 ChatGPT Apps Directory。不使用时请停止 Remote Access。",
          ],
          commands: [],
          ctas: [],
        },
        {
          id: "other-mcp-clients",
          number: "04",
          title: "其他本地 MCP clients",
          paragraphs: [
            "Cursor、Claude Desktop、Gemini CLI、VS Code 和其他受支持的本地 MCP clients，要先设置 Wenlan runtime，再让 CLI 写入 client-specific MCP configuration。",
            "Wenlan setup 会安装 CLI、daemon 和 MCP connector，向操作系统的 user service manager 注册 daemon，并验证状态。",
          ],
          commands: [
            "npx -y wenlan setup",
            "~/.wenlan/bin/wenlan connect cursor\n# 或：claude-desktop, vscode, gemini",
          ],
          ctas: [],
        },
        {
          id: "try-first",
          number: "05",
          title: "先试什么",
          paragraphs: [
            "保存一个 durable project fact，再请另一个 session 或 client recall。Wenlan 应该能找回这个 fact，并把来源保留给 wiki 与 review flow。",
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
          { id: "source-backed-wiki", label: "有来源依据的 LLM wiki" },
          { id: "local-daemon", label: "本地 daemon" },
          { id: "agent-plugins", label: "Claude Code + Codex 插件" },
          { id: "mcp-server", label: "本地 + 远程 MCP" },
        ],
      },
      schema: {
        name: "开始使用 Wenlan",
        description:
          "通过 Claude Code、Codex、ChatGPT、Claude.ai 或其他 MCP client 连接 Wenlan。",
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
    sourceHash: "1714d73686bccf763c739c64094ff99091f9eaca217172514695c9dad5b54c69",
    content: {
      ariaLabel: "网站页脚",
      brand: "Wenlan",
      tagline: "AI 工作的 LLM wiki。",
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
        tagline: "LLM wiki",
        builtByPrefix: "作者",
        author: "Qi-Xuan Lu",
        authorUrl: "https://github.com/7xuanlu",
      },
    },
  },
} as const satisfies CoreContent;
