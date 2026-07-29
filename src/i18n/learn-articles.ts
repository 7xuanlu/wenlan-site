import type { LearnArticle } from "@/app/(en)/learn/articles";
import {
  isTranslatedLearnSlug,
  TRANSLATED_LEARN_SLUGS,
  TRANSLATED_LEARN_SLUGS_BY_LOCALE,
  translatedLearnStaticParams,
  type TranslatedLearnSlug,
} from "./learn-availability";
import type { TranslatedLocale } from "./locales";

export {
  isTranslatedLearnSlug,
  TRANSLATED_LEARN_SLUGS,
  TRANSLATED_LEARN_SLUGS_BY_LOCALE,
  translatedLearnStaticParams,
  type TranslatedLearnSlug,
} from "./learn-availability";

const zhTWArticles = {
  "distilled-wiki-pages-ai-memory": {
    slug: "distilled-wiki-pages-ai-memory",
    eyebrow: "概念",
    category: "Concepts",
    title: "AI 工作的 LLM wiki：Wenlan 的有來源頁面",
    description:
      "Wenlan 把重複出現的 AI 工作 context 蒸餾成有來源依據的 wiki 頁面，讓 agent 和人都能跨工具重用。",
    metaTitle: "AI 工作的 LLM wiki | Wenlan 文瀾",
    metaDescription:
      "了解 Wenlan 如何作為 AI 工作的 LLM wiki，把 captures 蒸餾成有來源依據、可追溯、可刷新 revision state 的頁面。",
    keywords: [
      "AI 工作的 LLM wiki",
      "有來源依據的 AI 工作 wiki",
      "AI memory 蒸餾",
      "Wenlan 文瀾",
      "LLM wiki",
    ],
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-04",
    author: "Qi-Xuan Lu",
    readingTime: "4 分鐘閱讀",
    audience: "正在評估 AI memory 是否需要 wiki layer 的中文使用者",
    heroBullets: [
      "Wenlan 把 capture 當成 LLM wiki 的原料，而不是最後介面。",
      "蒸餾頁面會把相關 memories 聚成可讀 Markdown wiki entries。",
      "source memory IDs、revision state 和 git history 讓頁面可檢查。",
    ],
    sections: [
      {
        heading: "一句話答案",
        body: [
          "AI 工作的 LLM wiki 是一層有來源依據的知識層：agent 可以讀、更新、引用，人也能檢查它為什麼這樣說。",
          "Wenlan 的工作流是先捕捉 durable facts、decisions、lessons 和 handoffs，再用 /distill 把重複 context 變成 wiki pages；每個頁面保留 source memory IDs。",
        ],
        link: {
          label: "先安裝 Wenlan",
          href: "/docs/get-started",
        },
      },
      {
        heading: "為什麼 memory 需要 wiki layer",
        body: [
          "一長串 memories 很快會變成另一個 inbox。agent 可以 search，但人仍要相信 search 能處理 duplicates、stale facts 和 contradictions。",
          "wiki layer 給重複出現的工作一個穩定頁面：目前 constraint、已接受 tradeoff、setup fix、handoff pattern，或跨 session 不斷出現的概念。",
        ],
        link: {
          label: "看 daily workflow",
          href: "/docs/daily-workflow",
        },
      },
      {
        heading: "Wenlan 如何保持 source-backed",
        body: [
          "每個蒸餾頁面都保留產生它的 source memory IDs。Wenlan daemon 會拒絕沒有來源的 page record，而不是讓好看的 summary 直接進入可信 context。",
          "當 memory 錯了，這條來源鏈很重要。你可以回到原始 capture、看它何時寫下、再用新的 context supersede 舊結論。",
        ],
        link: {
          label: "檢查本地資料邊界",
          href: "/docs/data-and-privacy",
        },
      },
      {
        heading: "頁面可以變舊，也可以刷新",
        body: [
          "有用的 LLM wiki 必須承認 knowledge 會變。Wenlan pages 帶著 revision state 和 stale reason，讓新的 captures 可以刷新舊結論。",
          "今天的 deliberate path 是手動 /distill。當你想讓 daemon 在 session 之間做更多工作時，可以選擇本地模型或 API keys 做更豐富的背景整理。",
        ],
      },
    ],
    faqs: [
      {
        question: "蒸餾頁面只是摘要嗎？",
        answer:
          "不是。摘要壓縮一個來源；蒸餾頁面會組合多個 related memories，保留 source IDs，並能隨著新的 captures 更新。",
      },
      {
        question: "我可以自己讀這些頁面嗎？",
        answer:
          "可以。頁面會投影成 ~/.wenlan/pages/ 裡的 Markdown，也可以用 editor 打開或 symlink 到 Obsidian。",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-obsidian-ai-memory",
      "source-backed-wiki-pages-ai-work",
      "ai-memory-provenance",
      "local-git-history-ai-memory",
    ],
    cta: {
      heading: "把 memory 變成 LLM wiki",
      body: "Wenlan 把重複 captures 蒸餾成 source-backed wiki pages，讓下一個 AI session 真正能用。",
    },
  },
  "source-backed-wiki-pages-ai-work": {
    slug: "source-backed-wiki-pages-ai-work",
    eyebrow: "信任",
    category: "Concepts",
    title: "AI 工作的 source-backed wiki pages",
    description:
      "為什麼 Wenlan 會把重複 memories 蒸餾成保留 source IDs 和 refresh state 的頁面。",
    metaTitle: "Source-Backed Wiki Pages | Wenlan 文瀾",
    metaDescription:
      "Wenlan distilled pages 保留 source memory IDs 和 revision state，讓 AI work memory 變得可讀又不失去 provenance。",
    keywords: [
      "source-backed wiki pages",
      "AI memory provenance",
      "AI 工作 wiki",
      "Wenlan 文瀾",
      "LLM wiki",
    ],
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-04",
    author: "Qi-Xuan Lu",
    readingTime: "4 分鐘閱讀",
    audience: "想讓 AI memory 變可讀但仍可驗證的中文使用者",
    heroBullets: [
      "Pages 由 related memories 合成。",
      "Source IDs 保留下來，summary 不會變成無來源 claims。",
      "頁面可以隨著 memories 累積而成長或刷新。",
    ],
    sections: [
      {
        heading: "一句話答案",
        body: [
          "Source-backed pages 是 Wenlan LLM wiki 的信任層：它們把 related memories 變成可讀 wiki artifacts，同時保留可檢查的 source memory IDs。",
          "這讓 memory 不只是搜尋結果，也不是自由浮動的 summary；它是能回到來源的工作知識。",
        ],
        link: {
          label: "看 LLM wiki 導覽",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "為什麼不能只存 summary",
        body: [
          "Summary 很好讀，但一旦失去來源，就很難判斷它是從哪個 session、哪個 decision 或哪個錯誤修正來的。",
          "Atomic memories 保留細粒度 evidence；pages 把它們組成可讀 context。Wenlan 需要兩者一起存在。",
        ],
      },
      {
        heading: "Wenlan page record 保存什麼",
        body: [
          "Wenlan 的 page record 保留 source IDs、version、changelog、stale reason 和 source counts。人和 agent 都可以檢查這條 chain。",
          "如果新 capture 顯示舊頁面已經不準，page 可以被標成 stale 或重新 distilled，而不是和舊結論並排堆積。",
        ],
      },
      {
        heading: "什麼時候該使用 pages",
        body: [
          "不要把每個 capture 都立刻塞進頁面。先捕捉 atomic memories，等 topic 重複、跨 session 仍然重要，再把它 distilled 成 page。",
          "頁面適合 project constraints、accepted decisions、setup fixes、handoff patterns，以及人和 agent 都會反覆查的概念。",
        ],
      },
    ],
    faqs: [
      {
        question: "Wenlan pages 是手寫 notes 嗎？",
        answer:
          "可以像 Markdown notes 一樣閱讀，但 Wenlan 仍會在 page record 裡保留 source provenance。",
      },
      {
        question: "為什麼不只存 pages？",
        answer:
          "Atomic memories 才是細粒度 evidence。Pages 是用來把它們組成更可讀、更適合 orientation 的 context。",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-obsidian-ai-memory",
      "distilled-wiki-pages-ai-memory",
      "review-before-trust-ai-memory",
      "ai-memory-provenance",
    ],
    cta: {
      heading: "讓 memory 可讀，也可驗證",
      body: "Wenlan 用 source-backed pages 讓 AI work memory 成為能被檢查、能被刷新、能被 agent 重用的 wiki。",
    },
  },
  "wenlan-vs-obsidian-ai-memory": {
    slug: "wenlan-vs-obsidian-ai-memory",
    eyebrow: "比較",
    category: "Comparisons",
    title: "Obsidian + Claude Code 的 AI 筆記：何時需要 Agent Memory？",
    description:
      "比較 Obsidian vault、Claudian、Claude Code MCP bridge 與 Wenlan agent memory，釐清 AI 筆記、跨 session context、review、provenance 與 handoff 的分工。",
    metaTitle: "Obsidian + Claude Code：AI 筆記或 Agent Memory？",
    metaDescription:
      "Obsidian 適合可讀 Markdown 與個人知識庫；Wenlan 補上 Claude Code、Codex、Cursor 等 agent 的跨 session memory、review、provenance 與 handoff。",
    keywords: [
      "Obsidian Claude Code",
      "Obsidian AI 筆記",
      "Agent Memory",
      "Claude Code memory",
      "Obsidian MCP",
      "AI 知識庫",
      "Wenlan 文瀾",
    ],
    publishedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    author: "Qi-Xuan Lu",
    readingTime: "6 分鐘閱讀",
    audience:
      "已經使用 Obsidian，正在評估 Claude Code、MCP 或跨工具 agent memory 的繁體中文使用者",
    heroBullets: [
      "Obsidian 最適合由人維護、可直接閱讀的 Markdown vault。",
      "Claudian 與 Obsidian MCP 專案的文件重點是讓 agent 讀寫 vault；capture、review、handoff 等 memory lifecycle 仍要另外確認。",
      "當 context 必須跨 Claude Code、Codex、Cursor 與其他 MCP client 延續時，再加入獨立的 agent-memory runtime。",
    ],
    sections: [
      {
        heading: "先給答案：AI 筆記和 Agent Memory 不是同一層",
        body: [
          "如果你的主要工作是整理文章、研究與個人知識，先用 Obsidian。Markdown vault 對人可讀、可編輯，也容易用 git 或一般備份工具保存。",
          "如果問題是 AI agent 每次開新 session 都忘記決策、踩過的坑與 handoff，光讓 Claude Code 讀寫 vault 還不夠。你還需要決定什麼值得 capture、何時 recall、誰能修正、來源在哪，以及舊結論何時應被 supersede。",
        ],
      },
      {
        heading: "Obsidian、Claudian 與 MCP bridge 各自解決什麼",
        body: [
          "Obsidian core 提供本地 Markdown vault、連結與人類知識工作介面。Claudian 把 Claude Code 工作流帶進 Obsidian；其他 MCP bridge 則把 vault 檔案與操作暴露給支援 MCP 的 client。",
          "這些工具很適合 vault 搜尋、建立筆記、改寫內容或在 Obsidian 內協作。它們的共同中心仍是 vault；memory 是否要 review、如何跨 client 共用、如何保留 handoff 與來源，要看各專案另外提供什麼。",
        ],
        link: {
          label: "查看 Obsidian 的資料儲存方式",
          href: "https://obsidian.md/help/data-storage",
        },
      },
      {
        heading: "什麼時候需要獨立的 Agent Memory",
        body: [
          "當同一份工作會在 Claude Code、Codex、Cursor、Gemini CLI 或其他 MCP client 之間移動，memory runtime 的責任開始和筆記 app 不同。它必須讓不同 client 用同一套 capture、recall、review、distill 與 handoff 語意工作。",
          "Wenlan 把 atomic memories、sessions、handoffs 與 source-backed pages 保存在本地 runtime，再把可讀 artifacts 投影成 Markdown。這讓 Obsidian 可以當檢視與寫作介面，但不必承擔 retrieval index、review state 或跨 client protocol。",
        ],
        bullets: [
          "需要跨 session 保留決策、限制與已驗證的修復方式。",
          "需要知道一段 context 來自哪個 capture 或 source memory。",
          "需要在錯誤記憶進入未來 session 前先 review、修正或刪除。",
          "需要讓多個 MCP client 讀到相同的 durable work context。",
        ],
      },
      {
        heading: "實際分工：vault 保存原文，memory 保存後果",
        body: [
          "把設計稿、研究筆記與長篇原文留在 Obsidian。當其中一個結論會影響未來 AI 工作，再 capture 那個可重用的後果，例如已接受的 tradeoff、部署限制、使用者偏好或已驗證的 gotcha。",
          "工作結束時寫 handoff；同一主題反覆出現後，再把相關 memories distill 成 source-backed page。不要把整個 vault 複製進 memory，也不要讓 agent 自動改寫所有人類筆記。",
        ],
        code: {
          label: "一個最小的 Wenlan 工作循環",
          code: [
            "/capture 這個專案使用 Obsidian 保存研究原文，Wenlan 只保存會影響未來 agent 工作的結論。",
            "/recall Obsidian agent memory workflow",
            "/handoff",
            "/distill Obsidian 與 agent memory 的分工",
          ].join("\n"),
        },
      },
      {
        heading: "如何選擇，不要被工具名稱帶著走",
        body: [
          "先問 source of truth 在哪裡。如果人類維護的 vault 是中心，而且 agent 只要協助搜尋與寫作，Obsidian-centered workflow 已經足夠。",
          "如果中心是跨工具延續的 AI work context，就把 vault 當可讀知識面，把 agent memory 當 runtime。兩者可以共存；重點是不要讓同一份資料在兩套系統裡互相覆寫。",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Obsidian + AI integrations",
      rows: [
        {
          dimension: "主要中心",
          wenlan: "本地 daemon 與 MCP tools 管理 agent memory；Markdown 是可讀投影。",
          competitor: "Obsidian vault 是原文、連結、寫作與人類操作介面。",
        },
        {
          dimension: "最適合",
          wenlan: "跨 Claude Code、Codex、Cursor 與其他 client 延續工作 context。",
          competitor: "個人知識庫、研究、寫作，以及 vault 內的 AI 協作。",
        },
        {
          dimension: "Memory lifecycle",
          wenlan: "Capture、recall、review、distill、handoff、provenance。",
          competitor: "依 plugin 或 MCP server 而異，通常以 vault 讀寫與搜尋為中心。",
        },
        {
          dimension: "Source of truth",
          wenlan: "Atomic memories 與 source-backed pages；可讀 artifacts 投影到本地檔案。",
          competitor: "人類維護的 Markdown 檔案與 Obsidian metadata。",
        },
        {
          dimension: "主要風險",
          wenlan: "多一個有明確 lifecycle 的 runtime，需要刻意 capture 與 review。",
          competitor: "不同 integration 的 memory 語意不一致，agent 寫入可能污染 vault。",
        },
      ],
    },
    faqs: [
      {
        question: "Wenlan 會直接同步 Obsidian vault 嗎？",
        answer:
          "不會。Wenlan 不宣稱提供 Obsidian sync。它會把 pages、sessions 與 handoffs 投影成可讀 Markdown；你可以在 Obsidian 中查看或連結這些檔案，但兩邊仍有各自的 source of truth。",
      },
      {
        question: "已經有 Claudian 或 Obsidian MCP，還需要 Wenlan 嗎？",
        answer:
          "如果需求只是讓 agent 讀寫 vault，不需要。當你還需要跨 client recall、review queue、source-backed pages、handoff 與可修正的 durable memory，才值得加入 Wenlan。",
      },
      {
        question: "AI 筆記可以直接當長期記憶嗎？",
        answer:
          "可以把筆記當來源，但不要假設所有筆記都應進入 agent context。先保存原文，再只 capture 會影響未來工作的結論，通常更容易維護。",
      },
    ],
    relatedSlugs: [
      "distilled-wiki-pages-ai-memory",
      "source-backed-wiki-pages-ai-work",
      "ai-work-memory-vs-knowledge-base",
    ],
    officialReferences: [
      {
        label: "Obsidian 的資料儲存說明",
        href: "https://obsidian.md/help/data-storage",
      },
      {
        label: "Obsidian plugins 說明",
        href: "https://obsidian.md/help/plugins",
      },
      {
        label: "Claudian repository",
        href: "https://github.com/YishenTu/claudian",
      },
      {
        label: "Obsidian Claude Code MCP repository",
        href: "https://github.com/iansinnott/obsidian-claude-code-mcp",
      },
      {
        label: "Wenlan 核心概念",
        href: "https://wenlan.app/docs/core-concepts",
      },
      {
        label: "Wenlan 資料與隱私",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    cta: {
      heading: "讓 vault 與 agent memory 各自做好一件事",
      body: "保留 Obsidian 作為人類可讀的知識面，再用 Wenlan 延續跨工具的 AI 工作 context、handoff 與有來源頁面。",
    },
  },
} satisfies Partial<Record<TranslatedLearnSlug, LearnArticle>>;

const zhCNArticles = {
  "distilled-wiki-pages-ai-memory": {
    ...zhTWArticles["distilled-wiki-pages-ai-memory"],
    title: "什么是 LLM Wiki 知识库？架构、RAG 对比与搭建方法",
    description:
      "LLM Wiki 知识库把原始来源、可复用事实与持续更新的页面分开，让 AI 代理按需读取有来源、可检查的答案。",
    metaTitle: "LLM Wiki 知识库：架构、RAG 对比与搭建 | Wenlan",
    metaDescription:
      "了解 LLM Wiki 知识库和 RAG、Obsidian 的区别，并用来源、蒸馏、检索与校验流程搭建可持续更新的本地 AI 知识库。",
    keywords: [
      "LLM Wiki 知识库",
      "AI 知识库",
      "本地 AI 知识库",
      "RAG vs LLM Wiki",
      "LLM Wiki 搭建",
      "AI 维护知识库",
      "有来源的知识库",
      "Claude Code 知识库",
      "Obsidian AI 知识库",
      "Wenlan 文澜",
    ],
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-29",
    readingTime: "9 分钟阅读",
    audience: "正在搭建可由 AI 代理读取、更新并检查来源的本地知识库的中文用户",
    heroBullets: [
      "LLM Wiki 维护可复用的当前答案，不把聊天记录、检索片段或笔记直接当成成品知识。",
      "可靠架构会分开原始来源、原子事实、维护页面与按需检索。",
      "页面需要保留 source IDs、变旧原因和可检查的修订，而不是静默覆盖。",
    ],
    sections: [
      {
        heading: "什么是 LLM Wiki 知识库",
        body: [
          "LLM Wiki 知识库是给 AI 代理使用、也让人能够检查的维护型知识层。它把文档、对话和文件等来源整理成主题页面，代理只在需要时载入相关答案，不必反复重放整个资料库或聊天历史。",
          "它不只是让 LLM 自动写一批 Markdown 笔记。真正有用的系统会把原始证据、可复用事实与当前解释分开，保留来源和更新状态；即使读者不安装 Wenlan，这套判断标准也能用来评估自己的知识库。",
        ],
        link: {
          label: "先安装 Wenlan",
          href: "/docs/get-started",
        },
      },
      {
        heading: "一个可靠 AI 知识库的四层架构",
        body: [
          "最小可维护架构包含四层：Raw Sources 保存可检查的原始材料；Atomic Knowledge 保存一次决策、纠正或经验；Wiki Pages 汇总当前答案；Schema 与 Index 负责按主题定位所需内容。",
          "常见流程可以概括为 Ingest、Query、Lint：Ingest 注册来源而不急着改写结论；Query 只取当前问题所需的页面和证据；Lint 检查缺失来源、重复、矛盾、过期依赖与不可维护的页面。",
        ],
        bullets: [
          "Raw Sources：保存文档、网页、文件和对话等原始材料。",
          "Atomic Knowledge：保留一个完整事实、决策、经验或纠正及其来源。",
          "Wiki Pages：把相关证据编成一个可读、可维护的当前答案。",
          "Schema 与 Index：记录主题、依赖和状态，并只加载相关内容。",
        ],
      },
      {
        heading: "LLM Wiki 知识库和 RAG 有什么不同",
        body: [
          "RAG 通常在提问时检索原始片段；LLM Wiki 则维护一个可重复使用的答案、支持它的来源以及需要刷新的状态。知识库可以在底层使用 RAG，但只有检索还不会自动维护结论。",
          "Obsidian 是人拥有的资料库和写作界面，可以承载或查看 Markdown wiki 页面；但开放 vault 给代理读取，并不等于已经处理选择性检索、来源、过期状态和自动修改边界。两者可以配合，不需要互相替代。",
        ],
        bullets: [
          "RAG：为这次问题寻找相关来源片段。",
          "LLM Wiki：维护以后还能复用的答案、引用和刷新状态。",
          "Obsidian：保留人可读、可编辑的 Markdown 知识面。",
          "Agent memory：保存工作中可复用的事实和决策，作为页面原料之一。",
        ],
      },
      {
        heading: "如何搭建一个会持续更新的 AI 知识库",
        body: [
          "先选一个无风险的小主题，不要一开始就导入整个 vault。注册可检查的来源，捕捉一条完整事实，再把相关内容蒸馏成主题页面；随后用同一问题重新检索，并从页面回到 source IDs 检查证据。",
          "发布第一版不是结束。来源改变时，系统应该标记受影响页面、记录 stale reason，并产生可审查的修订；对于人拥有的文字，自动化不应静默覆盖。",
        ],
        code: {
          label: "Wenlan 五分钟验证流程",
          code: `/brief <主题>
/recall <问题>
/capture <结论 + 原因>
/handoff
/distill <主题>
/pages <主题>`,
        },
        link: {
          label: "查看完整日常工作流",
          href: "/docs/daily-workflow",
        },
      },
      {
        heading: "如何验证知识库真的可用",
        body: [
          "不要只看命令是否返回成功。真正的验收是：下一次会话能找回正确内容，人能在聊天之外阅读页面，而且重要说法可以追溯到来源。",
          "如果检查失败，先保留测试内容的低风险范围，修复连接、来源或重复问题，再用同一主题复测；不要靠继续生成更多页面掩盖故障。",
        ],
        bullets: [
          "相同主题可以再次找到刚才保存的事实。",
          "页面是可读 Markdown，并显示重要说法对应的 source IDs。",
          "后续检索只加载相关页面或来源片段，而不是整个资料库。",
          "来源变化会产生可检查的过期原因或修订，不会静默覆盖。",
          "Lint 能暴露缺失来源、重复、矛盾或过期依赖。",
        ],
        link: {
          label: "查看审查与修复流程",
          href: "/docs/review-and-trust",
        },
      },
      {
        heading: "Wenlan 如何实现本地 LLM Wiki",
        body: [
          "Wenlan 把 Sources、Memories 和 Pages 分成三种耐久角色：Sources 保存原始材料，Memories 保存工作中产生的原子事实，Pages 编成有来源的当前解释。本地 daemon 负责检索，Markdown 页面和 git 历史让结果保持可见。",
          "每个蒸馏页面都要保留 source IDs。页面可以随着新证据变旧、刷新或进入审查；memory 在这里是支撑知识库的材料和状态，不是产品的搜索入口。",
        ],
        link: {
          label: "检查有来源页面模型",
          href: "/learn/source-backed-wiki-pages-ai-work",
        },
      },
      {
        heading: "什么时候不需要 LLM Wiki",
        body: [
          "一次性聊天、很小且长期稳定的文档集，或团队已经维护良好的普通 wiki，不一定需要额外系统。当前代码、测试结果和工具官方文档也始终比知识库里的旧解释更权威。",
          "当多个 AI 工具需要共享同一套检索、来源、交接和审查规则，而且答案会随项目持续变化时，维护型 LLM Wiki 才开始产生独立价值。",
        ],
        link: {
          label: "查看 Wenlan 的层级边界",
          href: "/docs/architecture",
        },
      },
    ],
    faqs: [
      {
        question: "LLM Wiki 和 RAG 是同一种东西吗？",
        answer:
          "不是。RAG 在提问时检索来源片段；LLM Wiki 维护可复用的答案、引用和刷新状态。LLM Wiki 可以使用 RAG，但检索本身不会维护答案。",
      },
      {
        question: "Obsidian 可以直接当 AI 知识库吗？",
        answer:
          "Obsidian 很适合做人拥有的 Markdown vault 和阅读界面。要让它成为代理可依赖的知识库，还需要选择性检索、来源、过期处理和安全的自动修改边界。",
      },
      {
        question: "本地 AI 知识库一定要导入所有笔记吗？",
        answer:
          "不用。先从一个会重复使用的小主题开始，只注册必要来源并检索最小相关集合。整库注入会增加 token 成本、噪音和过期内容风险。",
      },
      {
        question: "Wenlan 的蒸馏页面只是摘要吗？",
        answer:
          "不是。摘要通常压缩单一来源；蒸馏页面会组合相关事实与来源，保留 source IDs、修订状态和变旧原因，并能随着新证据更新。",
      },
    ],
    officialReferences: [
      {
        label: "Wenlan 的 Source、Memory 与 Page 模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 日常工作流",
        href: "https://github.com/7xuanlu/wenlan#daily-workflow",
      },
      {
        label: "Karpathy 的 LLM Wiki 说明",
        href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
      },
      {
        label: "LLM Wiki v2 提案",
        href: "https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2",
      },
    ],
    cta: {
      heading: "搭建可维护的本地 LLM Wiki",
      body: "用 Wenlan 把来源与工作事实蒸馏成可检查、可刷新、让下一个 AI 会话按需读取的知识页面。",
    },
  },
  "source-backed-wiki-pages-ai-work": {
    ...zhTWArticles["source-backed-wiki-pages-ai-work"],
    title: "AI 工作的 source-backed wiki pages",
    description:
      "为什么 Wenlan 会把重复 memories 蒸馏成保留 source IDs 和 refresh state 的页面。",
    metaTitle: "Source-Backed Wiki Pages | Wenlan 文澜",
    metaDescription:
      "Wenlan distilled pages 保留 source memory IDs 和 revision state，让 AI work memory 变得可读又不失去 provenance。",
    keywords: [
      "source-backed wiki pages",
      "AI memory provenance",
      "AI 工作 wiki",
      "Wenlan 文澜",
      "LLM wiki",
    ],
    audience: "想让 AI memory 变可读但仍可验证的中文用户",
    heroBullets: [
      "Pages 由 related memories 合成。",
      "Source IDs 保留下来，summary 不会变成无来源 claims。",
      "页面可以随着 memories 积累而成长或刷新。",
    ],
    sections: [
      {
        heading: "一句话答案",
        body: [
          "Source-backed pages 是 Wenlan LLM wiki 的信任层：它们把 related memories 变成可读 wiki artifacts，同时保留可检查的 source memory IDs。",
          "这让 memory 不只是搜索结果，也不是自由浮动的 summary；它是能回到来源的工作知识。",
        ],
        link: {
          label: "看 LLM wiki 导览",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "为什么不能只存 summary",
        body: [
          "Summary 很好读，但一旦失去来源，就很难判断它是从哪个 session、哪个 decision 或哪个错误修正来的。",
          "Atomic memories 保留细粒度 evidence；pages 把它们组成可读 context。Wenlan 需要两者一起存在。",
        ],
      },
      {
        heading: "Wenlan page record 保存什么",
        body: [
          "Wenlan 的 page record 保留 source IDs、version、changelog、stale reason 和 source counts。人和 agent 都可以检查这条 chain。",
          "如果新 capture 显示旧页面已经不准，page 可以被标成 stale 或重新 distilled，而不是和旧结论并排堆积。",
        ],
      },
      {
        heading: "什么时候该使用 pages",
        body: [
          "不要把每个 capture 都立刻塞进页面。先捕捉 atomic memories，等 topic 重复、跨 session 仍然重要，再把它 distilled 成 page。",
          "页面适合 project constraints、accepted decisions、setup fixes、handoff patterns，以及人和 agent 都会反复查的概念。",
        ],
      },
    ],
    faqs: [
      {
        question: "Wenlan pages 是手写 notes 吗？",
        answer:
          "可以像 Markdown notes 一样阅读，但 Wenlan 仍会在 page record 里保留 source provenance。",
      },
      {
        question: "为什么不只存 pages？",
        answer:
          "Atomic memories 才是细粒度 evidence。Pages 是用来把它们组成更可读、更适合 orientation 的 context。",
      },
    ],
    cta: {
      heading: "让 memory 可读，也可验证",
      body: "Wenlan 用 source-backed pages 让 AI work memory 成为能被检查、能被刷新、能被 agent 复用的 wiki。",
    },
  },
} satisfies Partial<Record<TranslatedLearnSlug, LearnArticle>>;

export const localizedLearnArticlesByLocale: Record<
  TranslatedLocale,
  Partial<Record<TranslatedLearnSlug, LearnArticle>>
> = {
  "zh-TW": zhTWArticles,
  "zh-CN": zhCNArticles,
};

export function getLocalizedLearnArticle(
  locale: TranslatedLocale,
  slug: string,
): LearnArticle | null {
  if (!isTranslatedLearnSlug(slug)) return null;
  return localizedLearnArticlesByLocale[locale][slug] ?? null;
}

export function getLocalizedLearnArticles(locale: TranslatedLocale): readonly LearnArticle[] {
  return TRANSLATED_LEARN_SLUGS_BY_LOCALE[locale].flatMap((slug) => {
    const article = localizedLearnArticlesByLocale[locale][slug];
    return article ? [article] : [];
  });
}

export function localizedLearnArticlePath(slug: TranslatedLearnSlug): `/learn/${TranslatedLearnSlug}` {
  return `/learn/${slug}`;
}
