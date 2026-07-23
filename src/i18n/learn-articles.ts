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
    title: "AI 工作的 LLM wiki：Wenlan 的有来源页面",
    description:
      "Wenlan 把重复出现的 AI 工作 context 蒸馏成有来源依据的 wiki 页面，让 agent 和人都能跨工具复用。",
    metaTitle: "AI 工作的 LLM wiki | Wenlan 文澜",
    metaDescription:
      "了解 Wenlan 如何作为 AI 工作的 LLM wiki，把 captures 蒸馏成有来源依据、可追溯、可刷新 revision state 的页面。",
    keywords: [
      "AI 工作的 LLM wiki",
      "有来源依据的 AI 工作 wiki",
      "AI memory 蒸馏",
      "Wenlan 文澜",
      "LLM wiki",
    ],
    audience: "正在评估 AI memory 是否需要 wiki layer 的中文用户",
    heroBullets: [
      "Wenlan 把 capture 当成 LLM wiki 的原料，而不是最后界面。",
      "蒸馏页面会把相关 memories 聚成可读 Markdown wiki entries。",
      "source memory IDs、revision state 和 git history 让页面可检查。",
    ],
    sections: [
      {
        heading: "一句话答案",
        body: [
          "AI 工作的 LLM wiki 是一层有来源依据的知识层：agent 可以读、更新、引用，人也能检查它为什么这样说。",
          "Wenlan 的工作流是先捕捉 durable facts、decisions、lessons 和 handoffs，再用 /distill 把重复 context 变成 wiki pages；每个页面保留 source memory IDs。",
        ],
        link: {
          label: "先安装 Wenlan",
          href: "/docs/get-started",
        },
      },
      {
        heading: "为什么 memory 需要 wiki layer",
        body: [
          "一长串 memories 很快会变成另一个 inbox。agent 可以 search，但人仍要相信 search 能处理 duplicates、stale facts 和 contradictions。",
          "wiki layer 给重复出现的工作一个稳定页面：当前 constraint、已接受 tradeoff、setup fix、handoff pattern，或跨 session 不断出现的概念。",
        ],
        link: {
          label: "看 daily workflow",
          href: "/docs/daily-workflow",
        },
      },
      {
        heading: "Wenlan 如何保持 source-backed",
        body: [
          "每个蒸馏页面都保留产生它的 source memory IDs。Wenlan daemon 会拒绝没有来源的 page record，而不是让好看的 summary 直接进入可信 context。",
          "当 memory 错了，这条来源链很重要。你可以回到原始 capture、看它何时写下、再用新的 context supersede 旧结论。",
        ],
        link: {
          label: "检查本地数据边界",
          href: "/docs/data-and-privacy",
        },
      },
      {
        heading: "页面可以变旧，也可以刷新",
        body: [
          "有用的 LLM wiki 必须承认 knowledge 会变。Wenlan pages 带着 revision state 和 stale reason，让新的 captures 可以刷新旧结论。",
          "今天的 deliberate path 是手动 /distill。当你想让 daemon 在 session 之间做更多工作时，可以选择本地模型或 API keys 做更丰富的后台整理。",
        ],
      },
    ],
    faqs: [
      {
        question: "蒸馏页面只是摘要吗？",
        answer:
          "不是。摘要压缩一个来源；蒸馏页面会组合多个 related memories，保留 source IDs，并能随着新的 captures 更新。",
      },
      {
        question: "我可以自己读这些页面吗？",
        answer:
          "可以。页面会投影成 ~/.wenlan/pages/ 里的 Markdown，也可以用 editor 打开或 symlink 到 Obsidian。",
      },
    ],
    cta: {
      heading: "把 memory 变成 LLM wiki",
      body: "Wenlan 把重复 captures 蒸馏成 source-backed wiki pages，让下一个 AI session 真正能用。",
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
