import type { Locale } from "@/i18n/locales";

export const storyCopyByLocale = {
  en: {
    heroDescription: "Wenlan pages cite their sources, get checked against them, and update when they change. Claude Code, Codex, Cursor, and more can put them to work.",
    heroTrust: ["Free", "Open source", "Local-first"],
    comparisonLabel: "Compare AI knowledge-base tools",
    steps: { wiki: "Organize", updates: "Update with new evidence", ai: "Put to work", graph: "See the connections" },
    wikiTitle: "Scattered notes. Connected knowledge.",
    wikiBody: "Turn notes, files, and saved chats into wiki pages you can edit, connect, and check against their sources.",
    wikiMedia: {
      title: "A Wiki page with its source notes",
      description: "Notes, files, and saved conversations become an editable launch plan with links to its sources.",
    },
    aiTitle: "Put your knowledge to work.",
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
    heroTrust: ["免費", "開源", "本地優先"],
    comparisonLabel: "比較 AI 知識庫工具",
    steps: { wiki: "整理", updates: "隨資料更新", ai: "用進工作", graph: "知識相連" },
    wikiTitle: "把散落的內容，整理成可用的知識。",
    wikiBody: "筆記、文件與保存的對話，整理成可編輯、彼此連結、查得到來源的筆記。",
    wikiMedia: {
      title: "附有來源的 Wiki 筆記",
      description: "筆記、文件與保存的對話，整理成可編輯、附來源的發佈計畫。",
    },
    aiTitle: "讓你的知識派上用場。",
    aiBody: "從關鍵字、語意和知識關聯找回脈絡，讓你連接的 AI 帶著依據回答、寫作、做事。",
    aiMediaSubject: "以真實筆記與記憶示範檢索，將相關依據帶進工作清單。",
    examplesLabel: "查看範例",
    updates: {
      title: "知道哪些筆記該更新。",
      body: "來源一改，只有用到它的筆記會被標出來。Wenlan 寫的筆記可以自己更新；你寫的筆記會先問你。",
      mediaSubject: "App 實機素材呈現新來源、記憶更新、自動更新的筆記，以及受保護筆記的待審修訂。",
    },
    citeCheck: {
      title: "哪句沒有根據，它會告訴你。",
      body: "AI 工具存筆記時，Wenlan 會把每句附引用的話拿去和來源比對。多數引用對不上，這篇就不會存進去，AI 也會知道原因，好去修正。",
      alt: "Wenlan App 畫面的四個步驟：AI 工具寫入頁面；Wenlan 拒絕這次寫入，錯誤訊息是「write_page refused, nothing was written: too few cited sentences match their source」；AI 修正引用，讓每句話引用說出它的那則記憶；頁面成功儲存。",
      caption: "Wenlan 實際拒絕的一次寫入 · 示範資料",
    },
    graph: {
      title: "知識不只累積，也彼此相連。",
      body: "從個人筆記到研究和專案，看見知識之間怎麼相連。",
      mediaSubject: "可探索的個人知識圖譜，呈現筆記、記憶與主題之間的真實關係。",
    },
    media: {
      placeholder: "實機畫面待補",
      labels: { wiki: "筆記與來源", updates: "筆記修訂", ai: "AI 查閱並使用知識", graph: "知識連結與依據" },
    },
    moreFeatures: "查看完整功能",
    moreTechnical: "檢索評測與測試範圍",
  },
  "zh-CN": {
    heroDescription: "文澜的笔记附上来源，会对照来源检查，来源变了就跟着更新。Claude Code、Codex、Cursor 等 AI 工具都能直接拿来用。",
    heroTrust: ["免费", "开源", "本地优先"],
    comparisonLabel: "比较 AI 知识库工具",
    steps: { wiki: "整理", updates: "随资料更新", ai: "用于工作", graph: "知识相连" },
    wikiTitle: "把散落的内容，整理成可用的知识。",
    wikiBody: "笔记、文档与保存的对话，整理成可编辑、相互关联、查得到来源的笔记。",
    wikiMedia: {
      title: "附有来源的 Wiki 笔记",
      description: "笔记、文档与保存的对话，整理成可编辑、附来源的发布计划。",
    },
    aiTitle: "让你的知识派上用场。",
    aiBody: "从关键词、语义和知识关联找回上下文，让你连接的 AI 带着依据回答、写作、做事。",
    aiMediaSubject: "以真实笔记与记忆演示检索，将相关依据带入工作清单。",
    examplesLabel: "查看示例",
    updates: {
      title: "知道哪些笔记该更新。",
      body: "来源一改，只有用到它的笔记会被标出来。Wenlan 写的笔记可以自己更新；你写的笔记会先问你。",
      mediaSubject: "App 实机素材呈现新来源、记忆更新、自动更新的笔记，以及受保护笔记的待审修订。",
    },
    citeCheck: {
      title: "哪句没有根据，它会告诉你。",
      body: "AI 工具保存笔记时，Wenlan 会把每句带引用的话拿去和来源比对。多数引用对不上，这篇就不会保存，AI 也会知道原因，好去修正。",
      alt: "Wenlan 应用画面的四个步骤：AI 工具写入页面；Wenlan 拒绝这次写入，错误信息是“write_page refused, nothing was written: too few cited sentences match their source”；AI 修正引用，让每句话引用说出它的那条记忆；页面成功保存。",
      caption: "Wenlan 实际拒绝的一次写入 · 示范数据",
    },
    graph: {
      title: "知识不只积累，也彼此相连。",
      body: "从个人笔记到研究和项目，看见知识之间怎么相连。",
      mediaSubject: "可探索的个人知识图谱，呈现笔记、记忆与主题之间的真实关系。",
    },
    media: {
      placeholder: "实机画面待补",
      labels: { wiki: "笔记与来源", updates: "笔记修订", ai: "AI 查阅并使用知识", graph: "知识链接与依据" },
    },
    moreFeatures: "查看完整功能",
    moreTechnical: "检索评测与测试范围",
  },
} as const satisfies Record<Locale, unknown>;

export type HomeStoryCopy = (typeof storyCopyByLocale)[Locale];
