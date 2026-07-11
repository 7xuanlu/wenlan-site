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
      title: "AI 工作記憶與 LLM Wiki 指南 | Wenlan 文瀾",
      description:
        "閱讀 Wenlan 的中文指南，了解 source-backed LLM wiki、AI 工作記憶、蒸餾頁面與跨工具 MCP context。",
    },
    breadcrumb: "學習",
    eyebrow: "Learn",
    title: "讓 AI 工作可以延續的記憶指南。",
    description:
      "Wenlan 把 captures 與可信來源整理成 agent 和人都能檢查的 LLM wiki。先從有來源的頁面與蒸餾流程開始。",
    topicLabel: "主題",
    topics: ["AI 工作記憶", "LLM wiki", "Source-backed pages", "MCP context"],
    startEyebrow: "從這裡開始",
    startDescription:
      "這個中文入口只列出已有完整翻譯的文章；其他英文指南仍保留英文 canonical，不會建立空白翻譯頁。",
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
      title: "AI 工作记忆与 LLM Wiki 指南 | Wenlan 文澜",
      description:
        "阅读 Wenlan 的中文指南，了解 source-backed LLM wiki、AI 工作记忆、蒸馏页面与跨工具 MCP context。",
    },
    breadcrumb: "学习",
    eyebrow: "Learn",
    title: "让 AI 工作可以延续的记忆指南。",
    description:
      "Wenlan 把 captures 与可信来源整理成 agent 和人都能检查的 LLM wiki。先从有来源的页面与蒸馏流程开始。",
    topicLabel: "主题",
    topics: ["AI 工作记忆", "LLM wiki", "Source-backed pages", "MCP context"],
    startEyebrow: "从这里开始",
    startDescription:
      "这个中文入口只列出已有完整翻译的文章；其他英文指南仍保留英文 canonical，不会建立空白翻译页。",
    articlesHeading: "中文指南",
    articleCountLabel: "篇文章",
    ctaEyebrow: "准备建立第一个本地记忆循环？",
    ctaTitle: "安装 Wenlan，连接你的 AI 工具。",
    ctaDescription: "选择一条 client 路径，再验证第一次 capture 与 recall。",
    getStarted: "开始使用",
    github: "在 GitHub 查看",
  },
};
