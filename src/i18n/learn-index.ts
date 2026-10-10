import type { TranslatedLocale } from "./locales";

export type LocalizedLearnIndexContent = {
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
  readonly breadcrumb: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly topicLabel: string;
  readonly topics: readonly string[];
  readonly startEyebrow: string;
  readonly startDescription: string;
  readonly comparisonLink: string;
  readonly articlesHeading: string;
  readonly articleCountLabel: string;
  readonly ctaEyebrow: string;
  readonly ctaTitle: string;
  readonly ctaDescription: string;
  readonly getStarted: string;
  readonly github: string;
};

export const localizedLearnIndexContent: Record<
  TranslatedLocale,
  LocalizedLearnIndexContent
> = {
  "zh-TW": {
    seo: {
      title: "LLM Wiki 與 AI 知識庫教學｜文瀾 Wenlan",
      description:
        "LLM Wiki 和 AI 知識庫怎麼做？從 Karpathy 的做法、工具選擇到 Claude Code、Codex 實作，教你用 Wenlan 把資料整理成有來源、可審查、會持續更新的頁面。",
    },
    breadcrumb: "學習",
    eyebrow: "Learn",
    title: "LLM Wiki 與 AI 知識庫指南。",
    description:
      "Wenlan 把可信來源、原子知識與維護型頁面分開，建立 agent 和人都能檢查、審查與更新的本地 AI 知識庫。",
    topicLabel: "主題",
    topics: ["AI 知識庫", "LLM Wiki", "有來源頁面", "MCP 工作流"],
    startEyebrow: "從這裡開始",
    startDescription:
      "先選一個工作：建立 AI 知識庫、維護 LLM Wiki、連接 MCP 工具，或檢查來源與更新流程。這裡只列出已有完整翻譯的頁面。",
    comparisonLink: "比較 Wenlan、Obsidian、Notion 等工具 →",
    articlesHeading: "中文指南",
    articleCountLabel: "篇文章",
    ctaEyebrow: "準備建立第一個本地記憶迴圈？",
    ctaTitle: "安裝 Wenlan，連接你的 AI 工具。",
    ctaDescription: "選擇一條 client 路徑，再驗證第一次 capture 與 recall。",
    getStarted: "開始使用",
    github: "在 GitHub 查看",
  },
  "zh-CN": {
    seo: {
      title: "LLM Wiki 与 AI 知识库教程｜文澜 Wenlan",
      description:
        "LLM Wiki 和 AI 知识库怎么搭？从 Karpathy 的思路、工具选型到 Claude Code、Codex 实操，教你用 Wenlan 把资料整理成有来源、可审核、持续更新的页面。",
    },
    breadcrumb: "学习",
    eyebrow: "Learn",
    title: "LLM Wiki 与 AI 知识库指南。",
    description:
      "Wenlan 把可信来源、原子知识与维护型页面分开，建立 agent 和人都能检查、审核与更新的本地 AI 知识库。",
    topicLabel: "主题",
    topics: ["AI 知识库", "LLM Wiki", "有来源页面", "MCP 工作流"],
    startEyebrow: "从这里开始",
    startDescription:
      "先选一个工作：建立 AI 知识库、维护 LLM Wiki、连接 MCP 工具，或检查来源与更新流程。这里只列出已有完整翻译的页面。",
    comparisonLink: "比较 Wenlan、Obsidian、Notion 等工具 →",
    articlesHeading: "中文指南",
    articleCountLabel: "篇文章",
    ctaEyebrow: "准备建立第一个本地记忆循环？",
    ctaTitle: "安装 Wenlan，连接你的 AI 工具。",
    ctaDescription: "选择一条 client 路径，再验证第一次 capture 与 recall。",
    getStarted: "开始使用",
    github: "在 GitHub 查看",
  },
};
