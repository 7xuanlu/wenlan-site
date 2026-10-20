import type { Locale } from "@/i18n/locales";

export const storyCopyByLocale = {
  en: {
    heroDescription: "Wenlan is your personal knowledge base, maintained with AI. Connect notes, files, and chats into knowledge you and your AI tools can find and use.",
    comparisonLabel: "Compare AI knowledge-base tools",
    steps: { wiki: "Organize", updates: "Update with new evidence", ai: "Put to work", graph: "See the connections" },
    wikiTitle: "Scattered notes. Connected knowledge.",
    wikiBody: "Turn notes, files, and saved chats into wiki pages you can edit, connect, and check against their sources.",
    wikiMedia: {
      title: "A Wiki page with its source notes",
      description: "Notes, files, and saved conversations become an editable launch plan with links to its sources.",
    },
    aiTitle: "Help your AI find the context to get things done.",
    aiBody: "Find context through keywords, meaning, and knowledge connections. Let your connected AI use that evidence to answer, write, and act.",
    aiMediaSubject: "An interactive retrieval example using real notes, saved lessons, and a grounded task checklist.",
    examplesLabel: "See examples",
    updates: {
      title: "Knowledge changes. Its history stays.",
      body: "Untouched AI-organized pages can update automatically. Changes to pages you create or edit stay available for review.",
      mediaSubject: "Actual App captures show a new source, updated memory, automatic page update, and a protected page awaiting review.",
    },
    graph: {
      title: "Your knowledge grows and connects.",
      body: "From personal notes to research and projects, explore the connections across your knowledge.",
      mediaSubject: "Explore real relationships in a personal knowledge library, with connected pages, memories, and topics.",
    },
    media: {
      placeholder: "Product capture coming next",
      labels: { wiki: "Wiki page & sources", updates: "Review a page update", ai: "AI working with your wiki", graph: "Connected pages & evidence" },
    },
    moreFeatures: "Explore all features",
    moreTechnical: "Retrieval tests and methodology",
  },
  "zh-TW": {
    heroDescription: "由 AI 協助維護的個人知識庫。文瀾將筆記、文件與對話連成可持續更新的知識，供你與 AI 查找、使用。",
    comparisonLabel: "比較 AI 知識庫工具",
    steps: { wiki: "整理", updates: "隨資料更新", ai: "用進工作", graph: "知識相連" },
    wikiTitle: "把散落的內容，整理成可用的知識。",
    wikiBody: "筆記、文件與保存的對話，整理成可編輯、彼此連結、查得到來源的知識頁。",
    wikiMedia: {
      title: "附有來源筆記的 Wiki 知識頁",
      description: "筆記、文件與保存的對話，整理成可編輯、附來源的發佈計畫。",
    },
    aiTitle: "讓 AI 找到相關知識，接著把事情做好。",
    aiBody: "從關鍵詞、語義與知識關聯找回背景，讓你已連接的 AI 帶著依據回答、寫作與執行任務。",
    aiMediaSubject: "以真實筆記與記憶示範檢索，將相關依據帶進工作清單。",
    examplesLabel: "查看範例",
    updates: {
      title: "知識會改變，歷史仍會保留。",
      body: "未經手改的 AI 知識頁可自動更新；你建立或編輯過的頁面，保留修訂供你審核。",
      mediaSubject: "App 實機素材呈現新來源、記憶更新、自動更新的知識頁，以及受保護頁面的待審修訂。",
    },
    graph: {
      title: "知識不只累積，也彼此相連。",
      body: "從個人脈絡到研究與專案，在同一個知識庫裡延伸。",
      mediaSubject: "可探索的個人知識圖譜，呈現頁面、記憶與主題之間的真實關係。",
    },
    media: {
      placeholder: "實機畫面待補",
      labels: { wiki: "知識頁與來源", updates: "知識頁修訂", ai: "AI 查閱並使用知識", graph: "知識連結與依據" },
    },
    moreFeatures: "查看完整功能",
    moreTechnical: "檢索評測與測試範圍",
  },
  "zh-CN": {
    heroDescription: "由 AI 协助维护的个人知识库。文澜将笔记、文档与对话连成可持续更新的知识，供你与 AI 查找、使用。",
    comparisonLabel: "比较 AI 知识库工具",
    steps: { wiki: "整理", updates: "随资料更新", ai: "用于工作", graph: "知识相连" },
    wikiTitle: "把散落的内容，整理成可用的知识。",
    wikiBody: "笔记、文档与保存的对话，整理成可编辑、相互关联、查得到来源的知识页。",
    wikiMedia: {
      title: "附有来源笔记的 Wiki 知识页",
      description: "笔记、文档与保存的对话，整理成可编辑、附来源的发布计划。",
    },
    aiTitle: "让 AI 找到相关知识，接着把事情做好。",
    aiBody: "从关键词、语义与知识关联找回背景，让你已连接的 AI 带着依据回答、写作与执行任务。",
    aiMediaSubject: "以真实笔记与记忆演示检索，将相关依据带入工作清单。",
    examplesLabel: "查看示例",
    updates: {
      title: "知识会改变，历史仍会保留。",
      body: "未经手动修改的 AI 知识页可自动更新；你创建或编辑过的页面，保留修订供你审核。",
      mediaSubject: "App 实机素材呈现新来源、记忆更新、自动更新的知识页，以及受保护页面的待审修订。",
    },
    graph: {
      title: "知识不只积累，也彼此相连。",
      body: "从个人背景到研究与项目，在同一个知识库里延伸。",
      mediaSubject: "可探索的个人知识图谱，呈现页面、记忆与主题之间的真实关系。",
    },
    media: {
      placeholder: "实机画面待补",
      labels: { wiki: "知识页与来源", updates: "知识页修订", ai: "AI 查阅并使用知识", graph: "知识链接与依据" },
    },
    moreFeatures: "查看完整功能",
    moreTechnical: "检索评测与测试范围",
  },
} as const satisfies Record<Locale, unknown>;

export type HomeStoryCopy = (typeof storyCopyByLocale)[Locale];
