import type { CoreContent } from "./schema";

const claudeCommands = [
  "/plugin marketplace add 7xuanlu/claude-plugins",
  "/plugin install wenlan@7xuanlu",
  "/init",
] as const;

export const zhTWContent = {
  chrome: {
    status: "translated",
    sourceHash: "bda0fd8a846d006539eab9c685b3be1e51df3f019c837c06e79900eb774faa57",
    content: {
      skipLinkLabel: "跳到主要內容",
      breadcrumbAriaLabel: "麵包屑",
    },
  },
  home: {
    status: "translated",
    sourceHash: "cbb903525db65e6783fb185115c56c4a53092671e9c318ce1502ce61912fb297",
    content: {
      seo: {
        title: "Wenlan 文瀾 | AI 工作的活個人知識庫",
        description:
          "Wenlan 文瀾是為 AI 工作而生的活個人知識庫：agent 捕捉學到的內容，你加入信任的來源，daemon 讓有來源引用的頁面保持最新。",
      },
      nav: {
        schemaName: "Wenlan 文瀾網站導覽",
        brand: "Wenlan 文瀾",
        previewBadge: "預覽版",
        githubAriaLabel: "在 GitHub 查看 Wenlan",
        themeToggle: {
          lightLabel: "切換到淺色主題",
          darkLabel: "切換到深色主題",
        },
        links: [
          { id: "docs", href: "/docs", label: "文件" },
          { id: "learn", href: "/learn", label: "學習" },
          { id: "about", href: "/about", label: "關於" },
          { id: "github", href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
        ],
      },
      hero: {
        title: "Wenlan 文瀾",
        description:
          "面向 AI-native 時代的活個人知識庫。Agents 捕捉學到的內容，你加入信任的來源，Wenlan 讓有來源引用的頁面保持最新。",
        primaryCta: { id: "get-started", href: "/docs/get-started", label: "開始使用" },
        secondaryCta: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "在 GitHub 查看",
        },
        metaText: [
          { id: "claude-code-plugin", label: "Claude Code 外掛" },
          { id: "local-daemon", label: "本地 daemon" },
        ],
        metaLinks: [
          {
            id: "claude-code-memory",
            href: "/learn/claude-code-memory",
            label: "Claude Code 記憶",
          },
          {
            id: "mcp-memory-server",
            href: "/learn/mcp-memory-server",
            label: "MCP 伺服器",
          },
        ],
      },
      demo: {
        title: "Wenlan 示範 v0.9",
        playLabel: "播放 Wenlan 示範 v0.9",
      },
      sections: {
        problem: {
          eyebrow: "問題",
          title: "每一次新的 AI session 都從冷啟動開始。",
          body: "工作已經發生，但 context 沒有留下來。決策、修 bug 的教訓和專案直覺都困在舊聊天裡，沒有幫到下一個 agent。",
          note: "少一次 handoff，就足以讓下一段對話重跑上一段工作。",
        },
        solution: {
          eyebrow: "Wenlan 帶來什麼",
          title: "給 AI 工作用的 handoff 循環。",
          body: "Wenlan 會在工作發生時捕捉決策、教訓和下一步，並在下一個 agent 開始時載入 handoff。",
          note: "下一段對話從 handoff 開始，而不是重新拼回過去。",
          visualLabels: {
            start: "開始",
            capture: "捕捉",
            handoff: "交接",
            resume: "接續",
          },
        },
        memoryDistillery: {
          eyebrow: "刻意蒸餾",
          title: "Wenlan 把重複出現的 context 變成有來源支持的頁面。",
          body: "當重複捕捉的內容值得變成可讀頁面時，執行 /distill。可選的本地模型或 API key 路徑可以加入背景擷取與頁面更新。",
          note: "下一次執行從有引用的 context 開始，而不是從 transcript 殘留開始。",
          visualLabels: {
            merged: "合併",
            linked: "連結",
            refined: "精煉",
          },
        },
        features: {
          eyebrow: "知識頁面",
          title: "工作會變成可重用的頁面。",
          body: "整理過的決策與教訓會成為耐用頁面，而不是被埋在聊天記錄裡。它們足夠有組織，agent 能使用；也足夠具體，人可以閱讀。",
          note: "你的工作不再只是 transcript 歷史，而是開始變成專案知識。",
        },
        humanControl: {
          eyebrow: "混合儲存",
          title: "daemon 負責 recall，可讀 artifacts 仍然可檢查。",
          body: "Wenlan 把原始 captures 保存在本地 daemon store 供 retrieval 使用，再投射出你可以開啟、diff、移動的 pages、handoffs 和 status files。",
          note: "Agents 從 daemon recall。你檢查可讀檔案。",
        },
        openSourceCta: {
          eyebrow: "開源",
          title: "在重要的地方保持開放。",
          body: "本地 runtime、CLI、MCP server 和 Claude Code plugin 都是 Apache-2.0。",
          note: "",
          primaryCta: { id: "get-started", href: "/docs/get-started", label: "開始使用" },
          secondaryCta: {
            id: "github",
            href: "https://github.com/7xuanlu/wenlan",
            label: "在 GitHub 查看",
          },
          waitlistHeading: "取得 release 更新。",
          waitlist: {
            successMessage: "你已加入。我們會持續通知你。",
            pendingLabel: "加入中...",
            submitLabel: "取得更新",
            emailPlaceholder: "you@email.com",
            fallbackError: "發生錯誤，請再試一次。",
            errors: {
              required: "請輸入 email。",
              invalid: "請輸入有效的 email。",
              notConfigured: "候補名單尚未設定。",
              unknown: "發生錯誤，請再試一次。",
            },
          },
        },
      },
      metrics: {
        eyebrow: "Hybrid retrieval，實測",
        title: "少 96% tokens。誠實的 retrieval metrics。",
        description: "Hybrid retrieval 不需要重播聊天歷史，也能找到正確的本地 context。",
        headers: {
          surface: "表面",
          scope: "範圍",
          result: "結果",
        },
        rows: [
          {
            id: "full-replay",
            surface: "完整重播",
            scope: "不使用 retrieval",
            result: "每次查詢 4,505 tokens / query",
          },
          {
            id: "lme-oracle",
            surface: "LME_Oracle",
            scope: "CE-reranked，500 Q",
            result: "每次查詢 168 tokens / query · 93.6% R@5 · 0.883 NDCG@10",
          },
          {
            id: "lme-s",
            surface: "LME_S",
            scope: "CE-reranked，N=90 deep-S",
            result: "每次查詢 168 tokens / query · 87.7% R@5 · 0.822 NDCG@10",
          },
        ],
        note:
          "Retrieval-only snapshots。LME_Oracle 也記錄 0.857 MRR；LME_S 在 90-question deep-S fixture 的 84 個可評分 rows 上記錄 0.815 MRR。Token 比較是完整重播對 retrieved context。",
        link: {
          id: "harness",
          href: "https://github.com/7xuanlu/wenlan/tree/main/crates/wenlan-core/src/eval",
          label: "自己執行 harness。",
        },
      },
      faqs: {
        eyebrow: "常見問題",
        title: "常見問題。",
        items: [
          {
            id: "what-is-wenlan",
            q: "Wenlan 是什麼？",
            a: "Wenlan 是為 AI 工作而生的活個人知識庫。Agents 捕捉學到的內容，你加入信任的來源，本地 daemon 讓有來源引用的頁面跨 chats、tools、projects 和時間保持最新。",
          },
          {
            id: "built-in-memory",
            q: "Wenlan 和內建 AI memory 有什麼不同？",
            a: "內建 memory 會保存 AI 認為重要的內容。你通常無法追蹤、修正，或從另一個工具使用它。Wenlan 讓 memory 留在本地、可見、可修正、可追溯。可讀 pages、session logs 和 project status 都 versioned in ~/.wenlan/.git/，每個 distilled page 都會引用產生它的 source memory IDs。",
          },
          {
            id: "retrieval-quality",
            q: "Wenlan 的 retrieval quality 到哪裡？",
            a: "Hybrid retrieval 結合 vector search (BGE-Base-EN-v1.5-Q, 768-dim)、FTS5、reciprocal-rank fusion、knowledge-graph context 和本地 BGE reranker。LME_Oracle 在 500-question snapshot 上是 93.6% Recall@5、0.857 MRR、0.883 NDCG@10。LME_S 在 stratified N=90 deep-S snapshot 上是 87.7% Recall@5、0.815 MRR、0.822 NDCG@10。Eval harness 放在 repo 的 crates/wenlan-core/src/eval/。",
          },
          {
            id: "privacy",
            q: "我的資料是私密的嗎？",
            a: "是。Wenlan 在你的機器上執行，資料庫也存放在本地。預設沒有 cloud sync 或 telemetry。本地 memory setup 不需要模型或 API key。On-device models 或 Anthropic key 只有在你選擇啟用 automatic page distillation、recaps 和更豐富 graph work 時才會使用。",
          },
          {
            id: "memory-mcp",
            q: "Wenlan 只是另一個 memory MCP 嗎？",
            a: "不是。MCP server 只是 connector。Wenlan 還包含本地 daemon、manual /distill、可選的 model-backed background extraction 和 page work、具備 DiskANN vectors 的 libSQL store、FTS5 + knowledge graph、mandatory provenance、memory/page/session artifacts 的真實 git versioning，以及可讀的 Markdown export paths。",
          },
          {
            id: "tools",
            q: "哪些 AI tools 可以搭配 Wenlan？",
            a: "Claude Code 有 marketplace plugin。Cursor、Codex、Claude Desktop、VS Code、Gemini CLI 等 MCP-compatible clients 可透過 Wenlan 的 MCP server 連接。",
          },
          {
            id: "not-notes",
            q: "Wenlan 能取代 Notion 或 Obsidian 嗎？",
            a: "不能。Wenlan 不是 notes app，也不是 writing tool。它捕捉並整理你從 AI conversations 學到的內容。如果你想在 Obsidian 閱讀，可以把 ~/.wenlan/ 底下的 Markdown projection symlink 進去。",
          },
          {
            id: "setup",
            q: "我要怎麼設定？",
            a: "在 Claude Code 中執行 /plugin marketplace add 7xuanlu/claude-plugins，接著執行 /plugin install wenlan@7xuanlu，然後執行 /init。其他 MCP clients 先執行 npx -y wenlan setup，再執行 ~/.wenlan/bin/wenlan mcp add codex、cursor、claude-desktop、vscode 或 gemini。",
          },
          {
            id: "platforms",
            q: "Wenlan 支援 Windows 或 Linux 嗎？",
            a: "支援。daemon 可以在 macOS (arm64, x64)、Linux (x86_64, aarch64; glibc) 和 Windows (x86_64) build 並執行。Service registration 在 macOS 使用 launchd、Linux 使用 systemd-user、Windows 使用 Task Scheduler (schtasks)。",
          },
          {
            id: "spaces",
            q: "我可以把工作和個人 memory 分開嗎？",
            a: "可以。Memories、pages 和 recalls 都屬於一個 space，例如 work、personal 或 client-X。你可以用 WENLAN_SPACE 在每個 shell 設定 active space，或在 ~/.wenlan/spaces.toml 宣告。Auto-detector 也會從目前 repo 或 workspace 選擇 space。",
          },
          {
            id: "free",
            q: "Wenlan 免費嗎？",
            a: "是。Wenlan 是 open-source。Wenlan repo 裡的本地 runtime、CLI、MCP server 和 Claude Code plugin files 都是 Apache-2.0。",
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
        title: "關於 Wenlan | 活個人知識庫",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作個人知識庫，由 agents 建立，並以來源為根基。",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "關於",
      },
      hero: {
        eyebrow: "關於",
        title: "活個人知識庫。",
        description:
          "Agents 捕捉學到的內容，你加入信任的來源，Wenlan 讓有來源引用的 wiki pages 在 AI 工作中保持最新。",
        statusLabel: "專案狀態",
        statusItems: ["版本 v0.9.1", "支援 macOS、Linux、Windows", "Apache-2.0", "Qi-Xuan Lu 建置"],
      },
      sections: [
        {
          id: "why",
          number: "01",
          title: "為什麼 Wenlan 存在",
          paragraphs: [
            "AI 工作已經變成嚴肅工作，但大多數 sessions 仍像一次性對話一樣結束。決策、debugging lessons、專案限制和 handoffs 都被埋在舊 chats 裡。",
            "Wenlan 是為了讓工作能 compound 而建。Agents 可以保存重要內容，之後 recall，並讓 refined context 跨 MCP-compatible tools 持續可用。",
          ],
        },
        {
          id: "builder",
          number: "03",
          title: "由 Qi-Xuan Lu 建置",
          paragraphs: [
            "Wenlan 由 Qi-Xuan Lu (GitHub @7xuanlu) 建置與維護。背景涵蓋 AI infrastructure、knowledge graphs 和 local-first systems。",
            "這項工作把 memory 視為 AI tools 的 first-class layer：libSQL 上的 hybrid retrieval、可讀頁面的真實 git versioning、session handoffs、status artifacts、distilled pages 的 mandatory provenance，以及一個 daemon 服務所有 MCP-compatible client。",
            "專案渠道：bugs 和 feature requests 用 GitHub Issues，vulnerabilities 看 SECURITY.md，變更則看 Wenlan release notes。",
          ],
        },
        {
          id: "status",
          number: "04",
          title: "目前狀態",
          paragraphs: [
            "Wenlan v0.9.1 支援 macOS (arm64, x64)、Linux (x86_64, aarch64; glibc) 和 Windows (x86_64)。daemon、CLI、MCP server 和 Claude Code plugin 都以 Apache-2.0 open source。",
          ],
        },
      ],
      principles: {
        title: "設計原則",
        items: [
          {
            id: "local-first",
            title: "本地優先",
            body: "Memory 從你的機器開始。Cloud sync、telemetry、本地模型和 API keys 都是 opt-in，而不是預設的 source of truth。",
          },
          {
            id: "human-readable",
            title: "人可閱讀",
            body: "Memory、page 和 session writes 會在本地 git 留下 Markdown artifacts。daemon database 負責 retrieval，而有來源引用的 artifacts 仍可檢查。",
          },
          {
            id: "session-rhythm",
            title: "Session 節奏",
            body: "Wenlan 順著 AI 工作實際發生的方式：載入 context、捕捉 durable facts、寫 handoffs，並把正確 context 帶進下一次執行。",
          },
          {
            id: "deliberate-distillation",
            title: "刻意蒸餾",
            body: "Sessions 之間，Wenlan 會 deduplicate 重複 facts 並連結相關 ideas。當一個 topic 值得成為 source-backed page 時，執行 /distill；本地模型或 API keys 可以加入 automatic page distillation 和更豐富的 graph work。",
          },
        ],
      },
      projectLinksHeading: "開源",
      projectLinks: [
        {
          id: "repository",
          href: "https://github.com/7xuanlu/wenlan",
          label: "GitHub 程式碼庫",
        },
        {
          id: "license",
          href: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
          label: "Apache-2.0 授權",
        },
        {
          id: "contributing",
          href: "https://github.com/7xuanlu/wenlan/blob/main/CONTRIBUTING.md",
          label: "貢獻指南",
        },
        {
          id: "security",
          href: "https://github.com/7xuanlu/wenlan/blob/main/SECURITY.md",
          label: "安全政策",
        },
      ],
      help: {
        eyebrow: "協助",
        bodyPrefix: "Bugs 和 feature requests 請使用 GitHub Issues。Vulnerabilities 請遵循",
        securityLink: {
          id: "security-reporting-guide",
          href: "/docs/security",
          label: "安全回報指南",
        },
        bodySuffix: "。",
      },
      cta: {
        primary: { id: "get-started", href: "/docs/get-started", label: "開始使用" },
        secondary: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "在 GitHub 查看",
        },
      },
      schema: {
        name: "關於 Wenlan",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作個人知識庫，由 Qi-Xuan Lu 建置。",
      },
    },
  },
  docs: {
    status: "translated",
    sourceHash: "3b69ea57f9aa702add03b87f2d09388dba86ee174c0b9c52dfbbc4ffc269b2bc",
    content: {
      seo: {
        title: "Wenlan 文件 | 產品手冊",
        description:
          "安裝 Wenlan，學習每日 AI 工作記憶循環，理解架構，並追蹤專案 roadmap、changelog 和 evals。",
      },
      breadcrumbs: {
        home: "Wenlan",
        current: "文件",
      },
      hero: {
        eyebrow: "文件",
        title: "開始使用 Wenlan。",
        description:
          "安裝本地 memory layer，學習每日 handoff loop，並讓 AI 工作 context 可讀、可搜尋、可由你掌控。",
      },
      intro: {
        eyebrow: "從這裡開始",
        body: "新使用者應該先安裝，為自己的 client 執行 setup，接著閱讀 daily workflow 和 core concepts。Project docs 涵蓋 architecture、reference paths、evals、releases、scope、source builds、roadmap、development conventions 和 contribution paths。",
      },
      sections: {
        items: [
          {
            id: "start-here",
            title: "從這裡開始",
            description: "安裝 Wenlan，並驗證第一次 memory round trip。",
            items: [
              {
                id: "get-started",
                href: "/docs/get-started",
                label: "設定",
                title: "開始使用 Wenlan",
                description:
                  "安裝 Claude Code plugin，或為另一個 MCP client 執行 Wenlan setup，然後確認本地 memory loop 可以運作。",
                meta: "Wenlan 團隊 · 更新於 2026 年 5 月 15 日 · 4 分鐘設定",
              },
            ],
          },
          {
            id: "after-setup",
            title: "安裝之後",
            description:
              "把安裝變成工作習慣：帶著 context 開始、捕捉有用內容、檢查哪些內容應該被信任，並在 context 變冷前 hand off。",
            items: [
              {
                id: "daily-workflow",
                href: "/docs/daily-workflow",
                label: "工作流程",
                title: "每日 Workflow",
                description:
                  "帶著 context 開始，捕捉重要內容，需要時 recall，並在 context 變冷前 hand off。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "capture-quality",
                href: "/docs/capture-quality",
                label: "捕捉",
                title: "捕捉品質",
                description:
                  "判斷什麼該進 Wenlan：durable facts、decisions、lessons、gotchas、corrections 和 project context。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "review-and-trust",
                href: "/docs/review-and-trust",
                label: "信任",
                title: "檢視與信任",
                description:
                  "了解 Wenlan 如何讓不確定的 memory 可見：pending captures、revisions、contradictions、rejections、confirm 和 forget。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "core-concepts",
                href: "/docs/core-concepts",
                label: "概念",
                title: "核心概念",
                description:
                  "了解 Wenlan 背後的元件：memories、sessions、handoffs、pages、daemon、MCP、Markdown 和 local index。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
            ],
          },
          {
            id: "reference",
            title: "參考資料",
            description:
              "Memory types、glossary、architecture、commands、Claude Code plugin、CLI/service management、updates、upgrade notes、package names、platform support、HTTP API、API examples、typed clients、spaces、graph context、pages、import paths、git history、retrieval status、experimental flags、local data、backup paths、configuration、environment variables、MCP clients、agent profiles、diagnostics、FAQ 和 repair paths。",
            items: [
              {
                id: "memory-types",
                href: "/docs/memory-types",
                label: "記憶",
                title: "Memory 類型",
                description:
                  "了解 Wenlan 的六種 canonical memory types、agent 如何選擇，以及哪些 legacy aliases 仍會出現在 API 邊界。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "glossary",
                href: "/docs/glossary",
                label: "詞彙表",
                title: "詞彙表",
                description:
                  "快速對照 Wenlan 術語：memory、handoff、page、space、daemon、MCP、local index、provenance 和 eval language。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "architecture",
                href: "/docs/architecture",
                label: "架構",
                title: "架構",
                description:
                  "Wenlan 的組成方式：一個本地 daemon、薄 client、shared wire types、本地 artifacts，以及由 wenlan-core 負責的 retrieval。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 7 分鐘閱讀",
              },
              {
                id: "commands",
                href: "/docs/commands",
                label: "指令參考",
                title: "Commands 與 Tools",
                description:
                  "日常使用 Wenlan 時最重要的 Claude Code commands 和 MCP tools。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "claude-code-plugin",
                href: "/docs/claude-code-plugin",
                label: "外掛",
                title: "Claude Code 外掛",
                description:
                  "在 Claude Code 中使用 Wenlan 最完整的 workflow：setup、session brief、capture、recall、review、distill、read 和 handoff。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "cli-and-service",
                href: "/docs/cli-and-service",
                label: "CLI 管理",
                title: "CLI 與 Service 管理",
                description:
                  "使用 Wenlan CLI 安裝 runtime、管理 daemon、檢查 status、搜尋 memory，並連接 MCP clients。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "updates-and-uninstall",
                href: "/docs/updates-and-uninstall",
                label: "生命週期",
                title: "更新與解除安裝",
                description:
                  "刷新 Wenlan 本地 runtime、驗證版本健康、重啟 MCP clients，並在不意外遺失資料的前提下移除 service。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "upgrade-notes",
                href: "/docs/upgrade-notes",
                label: "升級",
                title: "升級筆記",
                description:
                  "閱讀 Wenlan releases 的實用升級路徑：要重跑什麼、驗證什麼，以及目前 public runtime shape 改了什麼。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "packages-and-registries",
                href: "/docs/packages-and-registries",
                label: "Packages 套件",
                title: "Packages 與 Registries",
                description:
                  "了解 Wenlan package name 如何對應到 plugin、runtime setup、MCP connector、Rust crates 和 release binaries。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "platforms",
                href: "/docs/platforms",
                label: "平台",
                title: "平台支援",
                description:
                  "了解 Wenlan 如何在 macOS、Linux 和 Windows 上執行：service managers、local data paths、model backends，以及 Docker/VM caveats。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "http-api",
                href: "/docs/http-api",
                label: "API 參考",
                title: "HTTP API 參考",
                description:
                  "了解 CLI、MCP connector、plugin 和 local tools 背後呼叫的本地 daemon surfaces。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "api-examples",
                href: "/docs/api-examples",
                label: "API 範例",
                title: "API 範例",
                description:
                  "當 CLI 或 MCP tools 不是合適選擇時，從 scripts 使用本地 daemon HTTP API。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "typed-clients",
                href: "/docs/typed-clients",
                label: "Types 參考",
                title: "Typed Clients 型別客戶端",
                description:
                  "當 Rust tool 需要呼叫本地 daemon、又不想依賴 untyped JSON shapes 時，使用 wenlan-types。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "spaces",
                href: "/docs/spaces",
                label: "Spaces 管理",
                title: "Spaces 空間",
                description:
                  "分開 work、personal、client 和 project memory，並了解 Wenlan 如何解析 active space。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "knowledge-graph",
                href: "/docs/knowledge-graph",
                label: "Graph 圖譜",
                title: "Knowledge Graph 知識圖譜",
                description:
                  "了解 Wenlan 如何連結 people、projects、tools、observations 和 relations，讓 recall 不只靠文字相似度也能找回 context。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "source-backed-pages",
                href: "/docs/source-backed-pages",
                label: "Pages 頁面",
                title: "有來源支撐的 Pages",
                description:
                  "了解 Wenlan 如何把 atomic captures 變成含 source memory IDs、revision state 和 refresh paths 的可讀 pages。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "import-and-portability",
                href: "/docs/import-and-portability",
                label: "可攜性",
                title: "Import 與 Portability",
                description:
                  "把選定的 durable context 移入 Wenlan，並讓 Wenlan 的可讀 artifacts 在 daemon 之外也保持 portable。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "local-git-history",
                href: "/docs/local-git-history",
                label: "版本",
                title: "本地 Git History",
                description:
                  "檢查 Wenlan 為可讀 page、session、handoff 和 status artifacts 保留的真實 git history。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "models-and-keys",
                href: "/docs/models-and-keys",
                label: "模型",
                title: "Models 與 Keys",
                description:
                  "在 local memory mode、可選 on-device models 和可選 Anthropic API keys 之間選擇，用於更豐富的 extraction、page synthesis、recaps 和 graph work。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "advanced-retrieval",
                href: "/docs/advanced-retrieval",
                label: "Retrieval 檢索",
                title: "進階 Retrieval 狀態",
                description:
                  "了解 Wenlan 已發布的 retrieval path，以及新版 retrieval work 背後那些 opt-in main-branch experiments。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "experimental-flags",
                href: "/docs/experimental-flags",
                label: "Experiments 實驗",
                title: "Experimental Flags 實驗旗標",
                description:
                  "了解如何閱讀 Wenlan 的 opt-in main-branch flags，而不把它們誤認為 released defaults。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "data-and-privacy",
                href: "/docs/data-and-privacy",
                label: "本地控制",
                title: "資料與隱私",
                description:
                  "Wenlan 把資料放在哪裡、哪些內容保持本地，以及可讀 artifacts 如何搭配 daemon-owned retrieval store。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "backup-and-migration",
                href: "/docs/backup-and-migration",
                label: "備份",
                title: "備份與遷移",
                description:
                  "一起備份 Wenlan 的可讀 artifacts 和 daemon data，並在信任 recall 前驗證還原後的 runtime。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "configuration",
                href: "/docs/configuration",
                label: "設定",
                title: "Wenlan 設定",
                description:
                  "設定 Wenlan spaces、MCP clients、daemon bind address、local paths、models 和 keys，不需要手動編輯 database。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "environment-variables",
                href: "/docs/environment-variables",
                label: "Config 變數",
                title: "Environment Variables 環境變數",
                description:
                  "了解哪些 Wenlan environment variables 是一般 configuration、哪些只用於 development，以及哪些屬於 eval 或 Windows repair paths。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "mcp-clients",
                href: "/docs/mcp-clients",
                label: "MCP 連接",
                title: "連接 MCP Clients",
                description:
                  "從 Claude Code、Codex、Cursor、Claude Desktop、Gemini CLI 和其他 MCP clients 使用同一個本地 Wenlan memory layer。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "agent-profiles",
                href: "/docs/agent-profiles",
                label: "Agents 管理",
                title: "Agent Profiles 設定檔",
                description:
                  "檢查寫入 Wenlan 的 AI clients 和 local tools，並從 CLI 管理 source attribution、enabled state 和 trust。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "troubleshooting",
                href: "/docs/troubleshooting",
                label: "修復",
                title: "疑難排解",
                description:
                  "修正常見 setup issues：daemon 未執行、MCP 未連上、Claude commands 缺失、stale context，以及 support escalation。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "diagnostics-and-issue-reports",
                href: "/docs/diagnostics-and-issue-reports",
                label: "診斷",
                title: "診斷與 Issue 回報",
                description:
                  "求助前先跑正確 checks，分開 daemon problems 與 client problems，並只分享 redacted output。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "faq",
                href: "/docs/faq",
                label: "常見問題",
                title: "FAQ 常見問題",
                description:
                  "安裝 Wenlan 前後常見 adoption questions 的短答案。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
            ],
          },
          {
            id: "project",
            title: "專案",
            description:
              "Security reporting、evaluation、desktop status、changelog、release/versioning、roadmap、project scope、source builds、testing、CI、development conventions，以及協助判斷 Wenlan 是否可信到值得採用或貢獻的 contribution paths。",
            items: [
              {
                id: "security",
                href: "/docs/security",
                label: "安全",
                title: "安全與回報",
                description:
                  "私下回報 vulnerabilities、讓 diagnostic reports 保持 redacted，並了解 Wenlan 的本地安全邊界。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "evaluation",
                href: "/docs/evaluation",
                label: "評估",
                title: "Evaluation 評估",
                description:
                  "了解 Wenlan 公開 retrieval numbers 代表什麼、如何產生，以及沒有聲稱什麼。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "desktop-app",
                href: "/docs/desktop-app",
                label: "桌面版",
                title: "Desktop App 狀態",
                description:
                  "了解可選的 Wenlan desktop app 與 daemon、CLI、MCP server 和 Claude Code plugin 的關係。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 4 分鐘閱讀",
              },
              {
                id: "changelog",
                href: "/docs/changelog",
                label: "版本",
                title: "Changelog 變更記錄",
                description:
                  "Wenlan 的 public release history，以及如何閱讀 main 上尚未發布的工作。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "releases-and-versioning",
                href: "/docs/releases-and-versioning",
                label: "發布",
                title: "Releases 與 Versioning",
                description:
                  "了解 Wenlan 如何把 merged work 變成 tagged releases、package versions、binaries、npm packages 和 crates。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "roadmap",
                href: "/docs/roadmap",
                label: "路線圖",
                title: "Roadmap 與 Status",
                description:
                  "了解 Wenlan 目前方向，同時不混淆 released features、main-branch work 和 future bets。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 6 分鐘閱讀",
              },
              {
                id: "project-scope",
                href: "/docs/project-scope",
                label: "範疇",
                title: "Project Scope 專案範疇",
                description:
                  "Wenlan 適合什麼、刻意避開什麼，以及如何判斷它是否適合你的 AI work。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "build-from-source",
                href: "/docs/build-from-source",
                label: "開發",
                title: "從 Source Build",
                description:
                  "從 public repository build Wenlan daemon、CLI、MCP server、shared types、core crate 和 plugin。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "testing-and-ci",
                href: "/docs/testing-and-ci",
                label: "品質",
                title: "Testing 與 CI",
                description:
                  "了解哪些 Wenlan checks 在本地執行、哪些在 GitHub Actions 執行，以及哪些 evals 保持 manual。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "development-conventions",
                href: "/docs/development-conventions",
                label: "開發慣例",
                title: "Development Conventions 開發慣例",
                description:
                  "讓 Wenlan daemon、CLI、MCP connector、shared types 和 core logic 維持可維護的 codebase rules。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
              {
                id: "contributing",
                href: "/docs/contributing",
                label: "開源貢獻",
                title: "Contributing 貢獻",
                description:
                  "如何為 Wenlan 貢獻有用的 bug reports、docs、eval cases 和 code changes。",
                meta: "Qi-Xuan Lu · 更新於 2026 年 6 月 24 日 · 5 分鐘閱讀",
              },
            ],
          },
        ],
      },
      cta: {
        eyebrow: "已經安裝了？",
        title: "把 memory loop 變成習慣。",
        body: "先從 daily workflow 開始；需要 commands、MCP setup 或 repair steps 時，再使用 reference docs。",
        primary: { id: "daily-workflow", href: "/docs/daily-workflow", label: "每日工作流程" },
        secondary: {
          id: "github",
          href: "https://github.com/7xuanlu/wenlan",
          label: "GitHub",
        },
      },
      schema: {
        name: "Wenlan 文件",
        description: "Wenlan local-first AI 工作 memory 的產品文件。",
      },
    },
  },
  getStarted: {
    status: "translated",
    sourceHash: "87fbb446a6a248806986c9233ccfa1c886a08b5fb18c2fb3e0bb7863ba312525",
    content: {
      seo: {
        title: "開始使用 Wenlan | 本地 AI 工作記憶",
        description:
          "透過 Claude Code plugin 安裝 Wenlan，或先執行 Wenlan setup，再連接其他 MCP client。",
      },
      breadcrumbs: {
        home: "Wenlan",
        docs: "文件",
      },
      hero: {
        eyebrow: "開始使用",
        title: "把 Wenlan 接到你的 AI tools。",
        description:
          "先從 Claude Code plugin 開始，或透過本地 MCP server 把 Wenlan 加到另一個 MCP-compatible client。",
        meta: ["Wenlan 團隊", "更新於 2026 年 5 月 15 日", "4 分鐘設定"],
        setupPathLabel: "設定路徑",
        setupPathItems: ["Claude Code 工具", "MCP clients 連接", "本地 daemon"],
      },
      steps: [
        {
          id: "claude-code-plugin",
          number: "01",
          title: "Claude Code 外掛",
          paragraphs: [
            "這是最快的路徑。plugin 會處理 daemon setup、MCP wiring、本地 memory setup，以及第一次 round-trip check。",
            "如果 Claude Code 在安裝後要求 restart，重啟一次，然後執行 /init。",
          ],
          commands: claudeCommands,
          ctas: [],
        },
        {
          id: "other-mcp-clients",
          number: "02",
          title: "其他 MCP clients",
          paragraphs: [
            "Cursor、Codex、Claude Desktop、Gemini CLI 和其他 MCP-compatible clients，要先設定本地 Wenlan runtime。接著讓 Wenlan CLI 把 MCP connector 加到你使用的 client。",
            "Wenlan setup 會安裝 CLI、daemon 和 MCP connector，設定本地 memory，向作業系統的 user service manager 註冊 daemon，並驗證狀態。",
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
          title: "先試什麼",
          paragraphs: [
            "保存一個 durable project fact，然後在新 session 請你的 agent recall。Wenlan 應該讓這段 context 可見、可搜尋，並透過同一個本地 memory layer 使用。",
          ],
          commands: [],
          ctas: [
            { id: "daily-workflow", href: "/docs/daily-workflow", label: "開始 daily workflow" },
            { id: "learn", href: "/learn", label: "閱讀文章" },
          ],
        },
      ],
      sidebar: {
        eyebrow: "你會得到",
        items: [
          { id: "local-daemon", label: "本地 daemon" },
          { id: "claude-code-plugin", label: "Claude Code 外掛" },
          { id: "mcp-server", label: "MCP 伺服器" },
          { id: "shared-memory-layer", label: "共享 memory layer" },
        ],
      },
      schema: {
        name: "開始使用 Wenlan",
        description:
          "在 Claude Code 安裝 Wenlan，或先執行 Wenlan setup 再連接其他 MCP client。",
      },
    },
  },
  notFound: {
    status: "translated",
    sourceHash: "58391d595516d6d5c9ccfe9b619b16eadab552459334ae9fefd950899b332dc5",
    content: {
      eyebrow: "404",
      title: "這個頁面不存在。",
      description:
        "如果你是從連結進來，連結可能已經過期。如果你手動輸入 URL，請檢查是否有錯字。下面是常用起點。",
      primaryCta: "回到首頁",
      secondaryCta: "瀏覽文章",
      popularHeading: "常用目的地",
      popularDestinations: [
        {
          id: "get-started",
          href: "/docs/get-started",
          label: "開始使用",
          description: "安裝 Wenlan，並驗證第一次本地 memory loop。",
        },
        {
          id: "daily-workflow",
          href: "/docs/daily-workflow",
          label: "每日工作流程",
          description: "在 AI sessions 之間 capture、handoff、distill。",
        },
        {
          id: "ai-work-memory",
          href: "/learn/ai-work-memory",
          label: "AI 工作記憶",
          description: "當 AI sessions 能跨天帶著 context，工作會有什麼改變。",
        },
        {
          id: "mcp-memory-server",
          href: "/learn/mcp-memory-server",
          label: "MCP 記憶伺服器",
          description: "Wenlan 如何透過 MCP 暴露 memory。",
        },
        {
          id: "basic-memory",
          href: "/learn/wenlan-vs-basic-memory",
          label: "Wenlan 與 Basic Memory 比較",
          description: "Markdown knowledge base 與 AI work-session memory layer 的差異。",
        },
        {
          id: "about",
          href: "/about",
          label: "關於",
          description: "專案背景、原則，以及 Wenlan 背後的人。",
        },
      ],
    },
  },
  footer: {
    status: "translated",
    sourceHash: "a3b1e8876670ba5362e3499b8ea48b9738f917ecdd6e5ff28d3944350b09b18f",
    content: {
      ariaLabel: "網站頁尾",
      brand: "Wenlan",
      tagline: "為 AI 工作而生的活個人知識庫。",
      groups: [
        {
          id: "product",
          title: "產品",
          links: [
            { id: "get-started", href: "/docs/get-started", label: "開始使用" },
            { id: "daily-workflow", href: "/docs/daily-workflow", label: "每日工作流程" },
            { id: "capture-quality", href: "/docs/capture-quality", label: "捕捉品質" },
            { id: "core-concepts", href: "/docs/core-concepts", label: "核心概念" },
            { id: "data-and-privacy", href: "/docs/data-and-privacy", label: "資料與隱私" },
            { id: "configuration", href: "/docs/configuration", label: "設定" },
            { id: "updates", href: "/docs/updates-and-uninstall", label: "更新" },
            { id: "platforms", href: "/docs/platforms", label: "平台" },
            { id: "docs", href: "/docs", label: "文件" },
          ],
        },
        {
          id: "learn",
          title: "學習",
          links: [
            { id: "learn-hub", href: "/learn", label: "學習中心" },
            { id: "vs-basic-memory", href: "/learn/wenlan-vs-basic-memory", label: "與 Basic Memory 比較" },
            { id: "vs-claude-mem", href: "/learn/wenlan-vs-claude-mem", label: "與 claude-mem 比較" },
            {
              id: "vs-superlocal-memory",
              href: "/learn/wenlan-vs-superlocal-memory",
              label: "與 Superlocal Memory 比較",
            },
          ],
        },
        {
          id: "project",
          title: "專案",
          links: [
            { id: "about", href: "/about", label: "關於" },
            { id: "architecture", href: "/docs/architecture", label: "架構" },
            { id: "evaluation", href: "/docs/evaluation", label: "評估" },
            { id: "changelog", href: "/docs/changelog", label: "變更記錄" },
            { id: "roadmap", href: "/docs/roadmap", label: "路線圖" },
            { id: "project-scope", href: "/docs/project-scope", label: "專案範疇" },
            { id: "security", href: "/docs/security", label: "安全" },
            { id: "github", href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
            { id: "rss", href: "/feed.xml", label: "RSS 訂閱" },
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
        tagline: "活個人知識庫",
        builtByPrefix: "作者",
        author: "Qi-Xuan Lu",
        authorUrl: "https://github.com/7xuanlu",
      },
    },
  },
} as const satisfies CoreContent;
