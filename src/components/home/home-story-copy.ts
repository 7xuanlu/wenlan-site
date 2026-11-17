import type { Locale } from "@/i18n/locales";

export const storyCopyByLocale = {
  en: {
    heroDescription: "Bring your notes and knowledge. Every doc cites its sources.",
    heroTrust: ["Free", "Open source", "For you and your team"],
    heroPrimaryCta: "Download the desktop app",
    heroSecondaryCta: "Connect from your AI tool",
    comparisonLabel: "Compare AI knowledge-base tools",
    steps: { wiki: "Organize", updates: "Update with new evidence", ai: "Put to work", graph: "See the connections" },
    wikiTitle: "Pages with their sources, ready to read and edit.",
    wikiBody: "Notes, files, and saved chats become pages you can edit, with links to their sources.",
    wikiMedia: {
      title: "A page with its sources",
      description: "Notes, files, and saved conversations become an editable launch plan with links to its sources.",
    },
    problem: {
      title: "Each AI tool keeps its own memory and rules.",
      body: "Wenlan gives every tool, agent and teammate what you settled. For people who use several AI tools daily, and small teams, all engineers or mixed.",
    },
    vsRules: {
      title: "Wenlan or a rules file per tool?",
      intro: "A rules file (AGENTS.md, CLAUDE.md, .cursor/rules) is enough for one tool in one repository. Beyond that:",
      bullets: [
        { lead: "One copy for every tool.", text: "No more copying a file per tool and keeping them in step by hand." },
        { lead: "Old rules don't linger.", text: "Your AI tools update a page when its source changes." },
        { lead: "More than rules.", text: "Docs, skills and memory sit next to them." },
      ],
      link: "More comparisons: Obsidian, Notion AI, memory tools",
    },
    aiTitle: "One copy of skills and rules.",
    aiBody: "It runs in every AI tool and platform you connect. Your AI tools search it, then answer, write and act with the sources in hand.",
    aiMediaSubject: "An interactive example of an AI tool working from Wenlan pages and sources to build a task checklist.",
    examplesLabel: "See examples",
    updates: {
      title: "Organized memory keeps it current.",
      body: "What you settle is sorted into your docs, skills and rules, so they stay current.",
      mediaSubject: "App captures show a new source, an updated memory, a page updated for you, and a page you wrote waiting for your review.",
    },
    citeCheck: {
      title: "Sources are checked before a page is saved.",
      body: "When your AI tool saves a page, Wenlan checks that each cited source supports its sentence. If too many don't match, the page isn't saved and the AI is told why, so it can fix them.",
      alt: "An AI tool session in four steps: an AI tool writes a page; Wenlan refuses the write with the error \"write_page refused, nothing was written: too few cited sentences match their source\"; the AI fixes its citations so each sentence cites the memory that says it; the page is saved.",
      caption: "Wenlan's real error when a write is refused · sample data",
    },
    graph: {
      title: "Pages, memories, and sources, connected.",
      body: "See how what your AI tools saved and wrote links together.",
      mediaSubject: "Explore how pages, memories, and topics connect in a sample library.",
    },
    media: {
      placeholder: "Product capture coming next",
      labels: { wiki: "Page & sources", updates: "Review a page update", ai: "AI working from Wenlan", graph: "Connected pages & sources" },
    },
    moreFeatures: "Explore all features",
    moreTechnical: "Retrieval tests and methodology",
  },
  "zh-TW": {
    heroDescription: "筆記和知識都能放進來，每份文件都附出處。",
    heroTrust: ["免費", "開源", "個人和團隊都能用"],
    heroPrimaryCta: "下載桌面版",
    heroSecondaryCta: "從你的 AI 工具連上",
    comparisonLabel: "比較 AI 知識庫工具",
    steps: { wiki: "整理", updates: "隨資料更新", ai: "用進工作", graph: "知識相連" },
    wikiTitle: "有出處的頁面，打開就能看、能改。",
    wikiBody: "筆記、文件與保存的對話，整理成可編輯、附出處連結的頁面。",
    wikiMedia: {
      title: "附有出處的頁面",
      description: "筆記、文件與保存的對話，整理成可編輯、附出處的發佈計畫頁面。",
    },
    problem: {
      title: "每個 AI 工具各記各的、規則各一份。",
      body: "有了文瀾，你定下的事，每個工具、代理和隊友都拿得到。給每天用好幾個 AI 工具的人，和小團隊，全是工程師或混著其他角色都行。",
    },
    vsRules: {
      title: "文瀾，還是每個工具各放一份規則檔？",
      intro: "只用一個工具、一個儲存庫時，一份規則檔（AGENTS.md、CLAUDE.md、.cursor/rules）就夠了。再多的話：",
      bullets: [
        { lead: "一份，每個工具都用。", text: "不用每個工具各複製一份、再手動對齊。" },
        { lead: "舊規則不會一直留著。", text: "來源變了，你的 AI 工具會更新那一頁。" },
        { lead: "不只規則。", text: "文件、技能和記憶就放在旁邊。" },
      ],
      link: "更多比較：Obsidian、Notion AI、各種記憶工具",
    },
    aiTitle: "技能和規則只有一份。",
    aiBody: "同一份，在你連上的每個 AI 工具和平台上都能用。AI 工具先查這裡，再帶著出處回答、寫東西、做事。",
    aiMediaSubject: "互動示範：AI 工具從 Wenlan 的頁面和出處找資料，列出工作清單。",
    examplesLabel: "查看範例",
    updates: {
      title: "整理過的記憶，讓它一直是新的。",
      body: "你定下的事會整理進文件、技能和規則，所以它們一直是新的。",
      mediaSubject: "App 實機素材呈現新來源、更新的記憶、已更新的頁面，以及等你審閱的頁面。",
    },
    citeCheck: {
      title: "存頁面之前，先查過出處。",
      body: "AI 工具存頁面時，Wenlan 會檢查每句引用的出處是否支持那句話。對不上的太多，這個頁面就不會存進去，AI 也會知道原因，好去修正。",
      alt: "Wenlan App 畫面的四個步驟：AI 工具寫入頁面；Wenlan 拒絕這次寫入，錯誤訊息是「write_page refused, nothing was written: too few cited sentences match their source」；AI 修正引用，讓每句話引用說出它的那則記憶；頁面成功儲存。",
      caption: "Wenlan 實際拒絕的一次寫入 · 示範資料",
    },
    graph: {
      title: "頁面、記憶和出處，彼此相連。",
      body: "看看你的 AI 工具存下和寫下的內容，怎麼連在一起。",
      mediaSubject: "可探索的示範圖譜，呈現頁面、記憶與主題之間怎麼相連。",
    },
    media: {
      placeholder: "實機畫面待補",
      labels: { wiki: "頁面與出處", updates: "頁面修訂", ai: "AI 從 Wenlan 找資料做事", graph: "頁面連結與出處" },
    },
    moreFeatures: "查看完整功能",
    moreTechnical: "檢索評測與測試範圍",
  },
  "zh-CN": {
    heroDescription: "笔记和知识都能放进来，每份文档都附出处。",
    heroTrust: ["免费", "开源", "个人和团队都能用"],
    heroPrimaryCta: "下载桌面版",
    heroSecondaryCta: "从你的 AI 工具连接",
    comparisonLabel: "比较 AI 知识库工具",
    steps: { wiki: "整理", updates: "随资料更新", ai: "用于工作", graph: "知识相连" },
    wikiTitle: "有出处的页面，打开就能看、能改。",
    wikiBody: "笔记、文档与保存的对话，整理成可编辑、附出处链接的页面。",
    wikiMedia: {
      title: "附有出处的页面",
      description: "笔记、文档与保存的对话，整理成可编辑、附出处的发布计划页面。",
    },
    problem: {
      title: "每个 AI 工具各记各的、规则各一份。",
      body: "有了文澜，你定下的事，每个工具、代理和队友都拿得到。给每天用好几个 AI 工具的人，和小团队，全是工程师或混着其他角色都行。",
    },
    vsRules: {
      title: "文澜，还是每个工具各放一份规则文件？",
      intro: "只用一个工具、一个仓库时，一份规则文件（AGENTS.md、CLAUDE.md、.cursor/rules）就够了。再多的话：",
      bullets: [
        { lead: "一份，每个工具都用。", text: "不用每个工具各复制一份、再手动对齐。" },
        { lead: "旧规则不会一直留着。", text: "来源变了，你的 AI 工具会更新那一页。" },
        { lead: "不只规则。", text: "文档、技能和记忆就放在旁边。" },
      ],
      link: "更多比较：Obsidian、Notion AI、各种记忆工具",
    },
    aiTitle: "技能和规则只有一份。",
    aiBody: "同一份，在你连上的每个 AI 工具和平台上都能用。AI 工具先查这里，再带着出处回答、写东西、做事。",
    aiMediaSubject: "交互演示：AI 工具从 Wenlan 的页面和出处查资料，列出工作清单。",
    examplesLabel: "查看示例",
    updates: {
      title: "整理过的记忆，让它一直是新的。",
      body: "你定下的事会整理进文档、技能和规则，所以它们一直是新的。",
      mediaSubject: "App 实机素材呈现新来源、更新的记忆、已更新的页面，以及等你审阅的页面。",
    },
    citeCheck: {
      title: "保存页面之前，先查过出处。",
      body: "AI 工具保存页面时，Wenlan 会检查每句引用的出处是否支持那句话。对不上的太多，这个页面就不会保存，AI 也会知道原因，好去修正。",
      alt: "Wenlan 应用画面的四个步骤：AI 工具写入页面；Wenlan 拒绝这次写入，错误信息是“write_page refused, nothing was written: too few cited sentences match their source”；AI 修正引用，让每句话引用说出它的那条记忆；页面成功保存。",
      caption: "Wenlan 实际拒绝的一次写入 · 示范数据",
    },
    graph: {
      title: "页面、记忆和出处，彼此相连。",
      body: "看看你的 AI 工具保存和写下的内容，是怎么连在一起的。",
      mediaSubject: "可探索的示范图谱，呈现页面、记忆与主题之间怎么相连。",
    },
    media: {
      placeholder: "实机画面待补",
      labels: { wiki: "页面与出处", updates: "页面修订", ai: "AI 从 Wenlan 查资料做事", graph: "页面链接与出处" },
    },
    moreFeatures: "查看完整功能",
    moreTechnical: "检索评测与测试范围",
  },
} as const satisfies Record<Locale, unknown>;

export type HomeStoryCopy = (typeof storyCopyByLocale)[Locale];
