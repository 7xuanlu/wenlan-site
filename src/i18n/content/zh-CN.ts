import type { CoreContent } from "./schema";

export const zhCNContent = {
  home: {
    status: "translated",
    sourceHash: "9f2f9352787cfa8d898143bf31dc7ef2c0839f3e853624c175a697cd4b58da9c",
    content: {
      seo: {
        title: "Wenlan | AI 工作的活个人知识库",
        description:
          "Wenlan 是为 AI 工作而生的活个人知识库：agent 捕捉学到的内容，你加入信任的来源，daemon 让有来源引用的页面保持最新。",
      },
    },
  },
  about: {
    status: "translated",
    sourceHash: "70474706aa31a8413421882f5b8b38dbd9027fd39456f7a99bb4df33c24b73f6",
    content: {
      seo: {
        title: "关于 Wenlan | 活个人知识库",
        description:
          "Wenlan 是 open-source、local-first 的 AI 工作个人知识库，由 agents 建立，并以来源为根基。",
      },
    },
  },
  docs: {
    status: "translated",
    sourceHash: "a48be530f274fa7c9f761dadd4c5d33f483fbdfe2cdc397362d472cd1e144e41",
    content: {
      seo: {
        title: "Wenlan 文档 | 产品手册",
        description:
          "安装 Wenlan，学习每日 AI 工作记忆循环，理解架构，并追踪项目 roadmap、changelog 和 evals。",
      },
    },
  },
  getStarted: {
    status: "translated",
    sourceHash: "f5f5910e8be01945ed81cad34101b84ee2de23b5dbce90f142ea196eefd3ed1b",
    content: {
      seo: {
        title: "开始使用 Wenlan | 本地 AI 工作记忆",
        description:
          "通过 Claude Code plugin 安装 Wenlan，或先运行 Wenlan setup，再连接其他 MCP client。",
      },
    },
  },
  notFound: {
    status: "translated",
    sourceHash: "0940a066500ab8b73d9de14425404e4097edfcdd28e07b04dab78cc94bb4f916",
    content: {
      eyebrow: "404",
      title: "这个页面不存在。",
      description:
        "如果你是从链接进入，链接可能已经过期。如果你手动输入 URL，请检查是否有错字。下面是常用起点。",
      primaryCta: "回到首页",
      secondaryCta: "浏览文章",
      popularDestinations: [
        {
          href: "/docs/get-started",
          label: "开始使用",
          description: "安装 Wenlan，并验证第一次本地记忆循环。",
        },
        {
          href: "/docs/daily-workflow",
          label: "每日工作流程",
          description: "在 AI sessions 之间 capture、handoff、distill。",
        },
        {
          href: "/learn/ai-work-memory",
          label: "AI 工作记忆",
          description: "当 AI sessions 能跨天带着 context，工作会有什么改变。",
        },
        {
          href: "/learn/mcp-memory-server",
          label: "MCP 记忆服务器",
          description: "Wenlan 如何通过 MCP 暴露记忆。",
        },
        {
          href: "/learn/wenlan-vs-basic-memory",
          label: "Wenlan 与 Basic Memory 对比",
          description: "Markdown knowledge base 与 AI work-session memory layer 的差异。",
        },
        {
          href: "/about",
          label: "关于",
          description: "项目背景、原则，以及 Wenlan 背后的人。",
        },
      ],
    },
  },
  footer: {
    status: "translated",
    sourceHash: "9072d2a97d7b463a4218e80c5ed1c8e12c0e443bf785dc8570bbbab5aee90c53",
    content: {
      brand: "Wenlan",
      tagline: "为 AI 工作而生的活个人知识库。",
      groups: [
        {
          title: "产品",
          links: [
            { href: "/docs/get-started", label: "开始使用" },
            { href: "/docs/daily-workflow", label: "每日工作流程" },
            { href: "/docs/capture-quality", label: "捕捉质量" },
            { href: "/docs/core-concepts", label: "核心概念" },
            { href: "/docs/data-and-privacy", label: "数据与隐私" },
            { href: "/docs/configuration", label: "配置" },
            { href: "/docs/updates-and-uninstall", label: "更新" },
            { href: "/docs/platforms", label: "平台" },
            { href: "/docs", label: "文档" },
          ],
        },
        {
          title: "学习",
          links: [
            { href: "/learn", label: "学习中心" },
            { href: "/learn/wenlan-vs-basic-memory", label: "与 Basic Memory 对比" },
            { href: "/learn/wenlan-vs-claude-mem", label: "与 claude-mem 对比" },
            {
              href: "/learn/wenlan-vs-superlocal-memory",
              label: "与 Superlocal Memory 对比",
            },
          ],
        },
        {
          title: "项目",
          links: [
            { href: "/about", label: "关于" },
            { href: "/docs/architecture", label: "架构" },
            { href: "/docs/evaluation", label: "评估" },
            { href: "/docs/changelog", label: "更新日志" },
            { href: "/docs/roadmap", label: "路线图" },
            { href: "/docs/project-scope", label: "项目范围" },
            { href: "/docs/security", label: "安全" },
            { href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
            { href: "/feed.xml", label: "RSS 订阅" },
            {
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
