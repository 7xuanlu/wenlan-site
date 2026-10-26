import type { Locale } from "@/i18n/locales";

export const storyCopyByLocale = {
  en: {
    heroDescription: "Wenlan pages cite their sources, get checked against them, and update when they change. Claude Code, Codex, Cursor, and more can put them to work.",
    heroTrust: ["Free", "Open source", "Runs locally"],
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
      title: "Know what needs an update.",
      body: "Change a source, and only the pages built on it get flagged. Wenlan can update pages it wrote; pages you wrote ask you first.",
      mediaSubject: "Actual App captures show a new source, updated memory, automatic page update, and a protected page awaiting review.",
    },
    citeCheck: {
      title: "It tells you what it can't back up.",
      body: "When your AI tool saves a page, Wenlan compares each cited sentence with its source. If most citations don't match, the page isn't saved and the AI is told why, so it can fix them.",
      alt: "An AI tool session in four steps: an AI tool writes a page; Wenlan refuses the write with the error \"write_page refused, nothing was written: too few cited sentences match their source\"; the AI fixes its citations so each sentence cites the memory that says it; the page is saved.",
      caption: "Wenlan's real error when a write is refused · sample data",
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
    heroDescription: "文瀾的筆記附上來源，會對照來源檢查，來源改了就跟著更新。Claude Code、Codex、Cursor 等 AI 工具都能直接拿來用。",
    // TODO(zh): provisional draft, review after English approval
    heroTrust: ["免費", "開源", "本機執行"],
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
      // TODO(zh): provisional draft, review after English approval
      title: "知道哪些頁面該更新。",
      body: "改了一個來源，只有建立在它上面的頁面會被標記。Wenlan 寫的頁面可以由它更新；你寫的頁面會先問你。",
      mediaSubject: "App 實機素材呈現新來源、記憶更新、自動更新的知識頁，以及受保護頁面的待審修訂。",
    },
    // TODO(zh): provisional draft, review after English approval
    citeCheck: {
      title: "說不出根據的，它會告訴你。",
      body: "AI 工具儲存頁面時，Wenlan 會把每個附引用的句子和來源比對。如果多數引用對不上，頁面不會存入，AI 也會知道原因，好修正引用。",
      alt: "Wenlan App 畫面的四個步驟：AI 工具寫入頁面；Wenlan 拒絕這次寫入，錯誤訊息是「write_page refused, nothing was written: too few cited sentences match their source」；AI 修正引用，讓每句話引用說出它的那則記憶；頁面成功儲存。",
      caption: "Wenlan 實際拒絕的一次寫入 · 示範資料",
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
    heroDescription: "文澜的笔记附上来源，会对照来源检查，来源变了就跟着更新。Claude Code、Codex、Cursor 等 AI 工具都能直接拿来用。",
    // TODO(zh): provisional draft, review after English approval
    heroTrust: ["免费", "开源", "本机运行"],
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
      // TODO(zh): provisional draft, review after English approval
      title: "知道哪些页面该更新。",
      body: "改了一个来源，只有建立在它上面的页面会被标记。Wenlan 写的页面可以由它更新；你写的页面会先问你。",
      mediaSubject: "App 实机素材呈现新来源、记忆更新、自动更新的知识页，以及受保护页面的待审修订。",
    },
    // TODO(zh): provisional draft, review after English approval
    citeCheck: {
      title: "说不出根据的，它会告诉你。",
      body: "AI 工具保存页面时，Wenlan 会把每个带引用的句子和来源比对。如果多数引用对不上，页面不会保存，AI 也会知道原因，好修正引用。",
      alt: "Wenlan 应用画面的四个步骤：AI 工具写入页面；Wenlan 拒绝这次写入，错误信息是“write_page refused, nothing was written: too few cited sentences match their source”；AI 修正引用，让每句话引用说出它的那条记忆；页面成功保存。",
      caption: "Wenlan 实际拒绝的一次写入 · 示范数据",
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
