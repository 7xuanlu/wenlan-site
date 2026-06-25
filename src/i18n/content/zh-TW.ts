import type { CoreContent } from "./schema";

export const zhTWContent = {
  home: {
    coverage: "translated",
    sourceHash: "9f2f9352787cfa8d898143bf31dc7ef2c0839f3e853624c175a697cd4b58da9c",
    content: {
      seo: {
        title: "Wenlan | AI 工作的活個人知識庫",
        description:
          "Wenlan 是為 AI 工作而生的活個人知識庫：agent 捕捉學到的內容，你加入信任的來源，daemon 讓有來源引用的頁面保持最新。",
      },
    },
  },
  about: {
    coverage: "translated",
    sourceHash: "70474706aa31a8413421882f5b8b38dbd9027fd39456f7a99bb4df33c24b73f6",
    content: {
      seo: {
        title: "關於 Wenlan | 活個人知識庫",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作個人知識庫，由 agents 建立，並以來源為根基。",
      },
    },
  },
  docs: {
    coverage: "translated",
    sourceHash: "a48be530f274fa7c9f761dadd4c5d33f483fbdfe2cdc397362d472cd1e144e41",
    content: {
      seo: {
        title: "Wenlan 文件 | 產品手冊",
        description:
          "安裝 Wenlan，學習每日 AI 工作記憶循環，理解架構，並追蹤專案 roadmap、changelog 和 evals。",
      },
    },
  },
  getStarted: {
    coverage: "translated",
    sourceHash: "f5f5910e8be01945ed81cad34101b84ee2de23b5dbce90f142ea196eefd3ed1b",
    content: {
      seo: {
        title: "開始使用 Wenlan | 本地 AI 工作記憶",
        description:
          "透過 Claude Code plugin 安裝 Wenlan，或先執行 Wenlan setup，再連接其他 MCP client。",
      },
    },
  },
  notFound: {
    coverage: "translated",
    sourceHash: "0940a066500ab8b73d9de14425404e4097edfcdd28e07b04dab78cc94bb4f916",
    content: {
      eyebrow: "404",
      title: "這個頁面不存在。",
      description:
        "如果你是從連結進來，連結可能已經過期。如果你手動輸入 URL，請檢查是否有錯字。下面是常用起點。",
      primaryCta: "回到首頁",
      secondaryCta: "瀏覽文章",
      popularDestinations: [
        {
          href: "/docs/get-started",
          label: "開始使用",
          description: "安裝 Wenlan，並驗證第一次本地記憶循環。",
        },
        {
          href: "/docs/daily-workflow",
          label: "每日工作流程",
          description: "在 AI sessions 之間 capture、handoff、distill。",
        },
        {
          href: "/learn/ai-work-memory",
          label: "AI 工作記憶",
          description: "當 AI sessions 能跨天帶著 context，工作會有什麼改變。",
        },
        {
          href: "/learn/mcp-memory-server",
          label: "MCP memory server",
          description: "Wenlan 如何透過 MCP 暴露記憶。",
        },
        {
          href: "/learn/wenlan-vs-basic-memory",
          label: "Wenlan vs Basic Memory",
          description: "Markdown knowledge base 與 AI work-session memory layer 的差異。",
        },
        {
          href: "/about",
          label: "關於",
          description: "專案背景、原則，以及 Wenlan 背後的人。",
        },
      ],
    },
  },
  footer: {
    coverage: "translated",
    sourceHash: "9072d2a97d7b463a4218e80c5ed1c8e12c0e443bf785dc8570bbbab5aee90c53",
    content: {
      brand: "Wenlan",
      tagline: "為 AI 工作而生的活個人知識庫。",
      groups: [
        {
          title: "產品",
          links: [
            { href: "/docs/get-started", label: "開始使用" },
            { href: "/docs/daily-workflow", label: "每日工作流程" },
            { href: "/docs/capture-quality", label: "Capture quality" },
            { href: "/docs/core-concepts", label: "Core concepts" },
            { href: "/docs/data-and-privacy", label: "Data and privacy" },
            { href: "/docs/configuration", label: "Configuration" },
            { href: "/docs/updates-and-uninstall", label: "Updates" },
            { href: "/docs/platforms", label: "Platforms" },
            { href: "/docs", label: "Docs" },
          ],
        },
        {
          title: "Learn",
          links: [
            { href: "/learn", label: "Learn hub" },
            { href: "/learn/wenlan-vs-basic-memory", label: "vs Basic Memory" },
            { href: "/learn/wenlan-vs-claude-mem", label: "vs claude-mem" },
            {
              href: "/learn/wenlan-vs-superlocal-memory",
              label: "vs Superlocal Memory",
            },
          ],
        },
        {
          title: "專案",
          links: [
            { href: "/about", label: "關於" },
            { href: "/docs/architecture", label: "Architecture" },
            { href: "/docs/evaluation", label: "Evaluation" },
            { href: "/docs/changelog", label: "Changelog" },
            { href: "/docs/roadmap", label: "Roadmap" },
            { href: "/docs/project-scope", label: "Project scope" },
            { href: "/docs/security", label: "Security" },
            { href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
            { href: "/feed.xml", label: "RSS feed" },
            {
              href: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
              label: "Apache-2.0",
            },
          ],
        },
      ],
      signature: {
        brand: "Wenlan",
        tagline: "活個人知識庫",
        builtByPrefix: "Built by",
        author: "Qi-Xuan Lu",
        authorUrl: "https://github.com/7xuanlu",
      },
    },
  },
} as const satisfies CoreContent;
