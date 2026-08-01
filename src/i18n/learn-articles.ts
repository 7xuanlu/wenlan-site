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
    title: "什麼是 LLM Wiki 知識庫？架構、RAG 對比與搭建方法",
    description:
      "LLM Wiki 知識庫把原始來源、可重用事實與持續更新的頁面分開，讓 AI 代理按需讀取有來源、可檢查的答案。",
    metaTitle: "LLM Wiki 知識庫：架構、RAG 對比與搭建 | Wenlan",
    metaDescription:
      "了解 LLM Wiki 知識庫和 RAG、Obsidian 的差異，並用來源、蒸餾、檢索與驗證流程搭建可持續更新的本地 AI 知識庫。",
    keywords: [
      "LLM Wiki 知識庫",
      "AI 知識庫",
      "本地 AI 知識庫",
      "RAG vs LLM Wiki",
      "LLM Wiki 搭建",
      "AI 維護知識庫",
      "有來源的知識庫",
      "Claude Code 知識庫",
      "Obsidian AI 知識庫",
      "Wenlan 文瀾",
    ],
    publishedAt: "2026-07-04",
    updatedAt: "2026-08-01",
    author: "Qi-Xuan Lu",
    readingTime: "9 分鐘閱讀",
    audience: "正在搭建可由 AI 代理讀取、更新並檢查來源的本地知識庫的繁體中文使用者",
    heroBullets: [
      "LLM Wiki 維護可重用的目前答案，不把聊天紀錄、檢索片段或筆記直接當成成品知識。",
      "可靠架構會分開原始來源、原子事實、維護頁面與按需檢索。",
      "頁面需要保留 source IDs、過期原因和可檢查的修訂，而不是靜默覆蓋。",
    ],
    sections: [
      {
        heading: "什麼是 LLM Wiki 知識庫",
        body: [
          "LLM Wiki 知識庫是供 AI 代理使用、也讓人能檢查的維護型知識層。它把文件、對話和檔案等來源整理成主題頁面，代理只在需要時載入相關答案，不必反覆重播整個資料庫或聊天紀錄。",
          "它不只是讓 LLM 自動寫出一批 Markdown 筆記。真正有用的系統會把原始證據、可重用事實與目前解釋分開，保留來源和更新狀態；即使讀者不安裝 Wenlan，這套判斷標準也能用來評估自己的知識庫。",
        ],
        link: {
          label: "先安裝 Wenlan",
          href: "/docs/get-started",
        },
      },
      {
        heading: "可靠 AI 知識庫的四層架構",
        body: [
          "最小可維護架構包含四層：Raw Sources 保存可檢查的原始材料；Atomic Knowledge 保存一次決策、修正或經驗；Wiki Pages 彙整目前答案；Schema 與 Index 負責按主題定位所需內容。",
          "常見流程可以概括為 Ingest、Query、Lint：Ingest 註冊來源而不急著改寫結論；Query 只取目前問題所需的頁面和證據；Lint 檢查缺少來源、重複、矛盾、過期依賴與不可維護的頁面。",
        ],
        bullets: [
          "Raw Sources：保存文件、網頁、檔案和對話等原始材料。",
          "Atomic Knowledge：保留一個完整事實、決策、經驗或修正及其來源。",
          "Wiki Pages：把相關證據編成一個可讀、可維護的目前答案。",
          "Schema 與 Index：記錄主題、依賴和狀態，並只載入相關內容。",
        ],
      },
      {
        heading: "LLM Wiki 知識庫和 RAG 有什麼不同",
        body: [
          "RAG 通常在提問時檢索原始片段；LLM Wiki 則維護可重複使用的答案、支援它的來源，以及需要刷新的狀態。知識庫可以在底層使用 RAG，但只有檢索還不會自動維護結論。",
          "Obsidian 是由人掌控的資料庫和寫作介面，可以承載或查看 Markdown wiki 頁面；但把 vault 開放給代理讀取，不等於已經處理選擇性檢索、來源、過期狀態和自動修改邊界。兩者可以配合，不必互相取代。",
        ],
        bullets: [
          "RAG：為這次問題尋找相關來源片段。",
          "LLM Wiki：維護日後還能重用的答案、引用和刷新狀態。",
          "Obsidian：保留人可讀、可編輯的 Markdown 知識面。",
          "Agent memory：保存工作中可重用的事實和決策，作為頁面原料之一。",
        ],
      },
      {
        heading: "如何搭建會持續更新的 AI 知識庫",
        body: [
          "先選一個低風險的小主題，不要一開始就匯入整個 vault。註冊可檢查的來源，捕捉一條完整事實，再把相關內容蒸餾成主題頁面；接著用同一問題重新檢索，並從頁面回到 source IDs 檢查證據。",
          "發布第一版不是結束。來源改變時，系統應該標記受影響頁面、記錄 stale reason，並產生可審查的修訂；對於由人掌控的文字，自動化不應靜默覆蓋。",
        ],
        code: {
          label: "Wenlan 五分鐘驗證流程",
          code: `/brief <主題>
/recall <問題>
/capture <結論 + 原因>
/handoff
/distill <主題>
/pages <主題>`,
        },
        link: {
          label: "查看完整日常工作流",
          href: "/docs/daily-workflow",
        },
      },
      {
        heading: "如何驗證知識庫真的可用",
        body: [
          "不要只看命令是否回傳成功。真正的驗收是：下一次會話能找回正確內容，人能在聊天之外閱讀頁面，而且重要說法可以追溯到來源。",
          "如果檢查失敗，先維持測試內容的低風險範圍，修復連線、來源或重複問題，再用同一主題重測；不要靠繼續生成更多頁面掩蓋故障。",
        ],
        bullets: [
          "相同主題可以再次找到剛才保存的事實。",
          "頁面是可讀 Markdown，並顯示重要說法對應的 source IDs。",
          "後續檢索只載入相關頁面或來源片段，而不是整個資料庫。",
          "來源變化會產生可檢查的過期原因或修訂，不會靜默覆蓋。",
          "Lint 能揭露缺少來源、重複、矛盾或過期依賴。",
        ],
        link: {
          label: "查看審查與修復流程",
          href: "/docs/review-and-trust",
        },
      },
      {
        heading: "Wenlan 如何實作本地 LLM Wiki",
        body: [
          "Wenlan 把 Sources、Memories 和 Pages 分成三種耐久角色：Sources 保存原始材料，Memories 保存工作中產生的原子事實，Pages 編成有來源的目前解釋。本地 daemon 負責檢索，Markdown 頁面和 git 歷史讓結果保持可見。",
          "每個蒸餾頁面都要保留 source IDs。頁面可以隨著新證據過期、刷新或進入審查；memory 在這裡是支撐知識庫的材料和狀態，不是產品的搜尋入口。",
        ],
        link: {
          label: "檢查有來源頁面模型",
          href: "/learn/source-backed-wiki-pages-ai-work",
        },
      },
      {
        heading: "什麼時候不需要 LLM Wiki",
        body: [
          "一次性聊天、很小且長期穩定的文件集，或團隊已經維護良好的普通 wiki，不一定需要額外系統。目前程式碼、測試結果和工具官方文件也永遠比知識庫裡的舊解釋更權威。",
          "當多個 AI 工具需要共享同一套檢索、來源、交接和審查規則，而且答案會隨專案持續變化時，維護型 LLM Wiki 才開始產生獨立價值。",
        ],
        link: {
          label: "查看 Wenlan 的層級邊界",
          href: "/docs/architecture",
        },
      },
    ],
    faqs: [
      {
        question: "LLM Wiki 和 RAG 是同一種東西嗎？",
        answer:
          "不是。RAG 在提問時檢索來源片段；LLM Wiki 維護可重用的答案、引用和刷新狀態。LLM Wiki 可以使用 RAG，但檢索本身不會維護答案。",
      },
      {
        question: "Obsidian 可以直接當 AI 知識庫嗎？",
        answer:
          "Obsidian 很適合當作由人掌控的 Markdown vault 和閱讀介面。要讓它成為代理可依賴的知識庫，還需要選擇性檢索、來源、過期處理和安全的自動修改邊界。",
      },
      {
        question: "本地 AI 知識庫一定要匯入所有筆記嗎？",
        answer:
          "不用。先從一個會重複使用的小主題開始，只註冊必要來源並檢索最小相關集合。整庫注入會增加 token 成本、雜訊和過期內容風險。",
      },
      {
        question: "Wenlan 的蒸餾頁面只是摘要嗎？",
        answer:
          "不是。摘要通常壓縮單一來源；蒸餾頁面會組合相關事實與來源，保留 source IDs、修訂狀態和過期原因，並能隨著新證據更新。",
      },
    ],
    officialReferences: [
      {
        label: "Wenlan 的 Source、Memory 與 Page 模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 日常工作流",
        href: "https://github.com/7xuanlu/wenlan#daily-workflow",
      },
      {
        label: "Karpathy 的 LLM Wiki 說明",
        href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
      },
      {
        label: "LLM Wiki v2 提案",
        href: "https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-obsidian-ai-memory",
      "source-backed-wiki-pages-ai-work",
      "ai-memory-provenance",
      "local-git-history-ai-memory",
    ],
    cta: {
      heading: "搭建可維護的本地 LLM Wiki",
      body: "用 Wenlan 把來源與工作事實蒸餾成可檢查、可刷新，並讓下一個 AI 會話按需讀取的知識頁面。",
    },
  },
  "source-backed-wiki-pages-ai-work": {
    slug: "source-backed-wiki-pages-ai-work",
    eyebrow: "信任",
    category: "Concepts",
    title: "有來源的 AI 知識庫：來源、更新與審查方法",
    description:
      "用 Wenlan 將來源、原子知識與可維護頁面分開，建立能追溯、能刷新、能審查的本地 AI 知識庫。",
    metaTitle: "有來源的 AI 知識庫：來源、更新與審查 | Wenlan",
    metaDescription:
      "建立有來源的 AI 知識庫：分開可信來源、原子知識與 LLM Wiki 頁面，並用 Wenlan 保留引用、更新與審查狀態。",
    keywords: [
      "AI 知識庫",
      "有來源的 AI 知識庫",
      "本地 AI 知識庫",
      "LLM Wiki",
      "知識庫維護",
      "Wenlan 文瀾",
    ],
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-30",
    author: "Qi-Xuan Lu",
    readingTime: "7 分鐘閱讀",
    audience: "想讓 AI agent 使用本地知識，但仍能檢查來源、更新與審查狀態的繁體中文使用者",
    heroBullets: [
      "可信來源不和模型產生的結論混在一起。",
      "原子知識保留細粒度證據，再組成可重用頁面。",
      "頁面保存引用、修訂、過期原因與審查狀態。",
    ],
    sections: [
      {
        heading: "一句話答案",
        body: [
          "有來源的 AI 知識庫會把可信來源、原子知識與維護型 LLM Wiki 頁面分開。Agent 取得的是可重用答案，人仍能沿著引用回到來源、檢查修訂，並在證據變化時刷新頁面。",
          "Wenlan 在本機連接這三層，讓知識不只是搜尋片段或脫離來源的摘要。",
        ],
        link: {
          label: "查看 LLM Wiki 的完整生命週期",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "AI 知識庫為什麼必須保留來源",
        body: [
          "直接丟入大量文件會讓 agent 每次都重新搜尋；只留下摘要，又會失去支持結論的證據。來源一旦更新，沒有人知道哪些答案也必須重算。",
          "可維護的知識庫必須回答三件事：這個結論來自哪裡、現在是否仍有效、發生衝突時誰來審查。",
        ],
      },
      {
        heading: "三層最小架構：Sources、Atomic Knowledge、Pages",
        body: [
          "Sources 是可檢查的原始資料；Atomic Knowledge 是帶著來源與理由的單一事實；Pages 則把重複、高價值的知識整理成 agent 可以按需讀取的答案。",
          "不要跳過中間層。原子知識讓頁面保持可追溯，也讓新證據只修正受影響的事實，而不是重寫整個知識庫。",
        ],
      },
      {
        heading: "Wenlan 的實際工作流程",
        body: [
          "先用一個會重複查詢的主題驗證閉環，不要一開始就匯入整個筆記庫。記錄一個帶來源與理由的事實，累積到值得重用時再蒸餾成頁面。",
        ],
        bullets: [
          "用 /capture 保存單一事實、來源與它為何重要。",
          "用 /distill 把重複主題整理成維護型頁面。",
          "用 /pages 開啟頁面並核對支持它的來源。",
          "用 /lint 找出薄弱、衝突或過期的知識。",
          "用 /curate 審查修訂，再決定是否刷新頁面。",
        ],
        code: {
          label: "Wenlan 知識庫維護迴圈",
          code: "/brief <主題>\n/capture <事實 + 來源 + 為何重要>\n/distill <主題>\n/pages <主題>\n/lint\n/curate",
        },
      },
      {
        heading: "如何處理過期與衝突",
        body: [
          "來源或工作條件改變時，不要讓新舊答案並排。把舊結論標成過期、記錄替代關係，再依最新證據刷新頁面。",
          "對高影響結論保留人工審查。自動蒸餾能加快整理，但不應把沒有支持來源的文字升級成可信知識。",
        ],
      },
      {
        heading: "如何驗收 AI 知識庫",
        body: [
          "先用一個主題做小型驗收。Agent 應該能找到目前答案，人應該能回到來源，證據變更後則能看見過期狀態並完成刷新。",
        ],
        bullets: [
          "頁面中的重要結論能追到來源 ID 或維護中的文件。",
          "重新開啟 AI client 後，仍能按需取得相同主題。",
          "加入衝突證據時，lint 或 review 流程能把問題暴露出來。",
          "刷新後保留修訂紀錄，而不是靜默覆寫舊答案。",
        ],
      },
      {
        heading: "Wenlan 如何對應這套架構",
        body: [
          "Wenlan 的 Sources、Memories 與 Pages 對應來源、原子知識與維護型頁面。頁面記錄保留 source IDs、版本、changelog、stale reason 與來源數量。",
          "這套設計讓 Claude Code、Codex、Cursor 等 MCP client 共用同一個本地知識層，同時保留人可以檢查與修正的路徑。",
        ],
        link: {
          label: "閱讀 Wenlan 的審查與信任指南",
          href: "/docs/review-and-trust",
        },
      },
    ],
    faqs: [
      {
        question: "AI 知識庫和 RAG 是同一件事嗎？",
        answer:
          "不是。RAG 在提問時找來源片段；維護型知識庫還保存可重用答案、引用、審查與刷新狀態，也可以在底層使用檢索。",
      },
      {
        question: "開始前要匯入全部筆記嗎？",
        answer:
          "不用。先挑一個高價值、會重複查詢的主題，驗證來源、capture、distill、pages、lint 與 curate 的完整閉環。",
      },
      {
        question: "Wenlan Pages 可以給人閱讀嗎？",
        answer:
          "可以。頁面會成為可讀的 Markdown，同時在 page record 中保留支持它的來源與修訂狀態。",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-obsidian-ai-memory",
      "distilled-wiki-pages-ai-memory",
      "review-before-trust-ai-memory",
      "ai-memory-provenance",
    ],
    officialReferences: [
      {
        label: "Wenlan 的知識模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 日常工作流程",
        href: "https://github.com/7xuanlu/wenlan#daily-workflow",
      },
      {
        label: "Wenlan 審查與信任指南",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "先建立一個可驗證的 AI 知識庫主題",
      body: "用 Wenlan 把來源、原子知識與維護型頁面連成小型閉環，再逐步擴大到其他 AI 工具與專案。",
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
    slug: "source-backed-wiki-pages-ai-work",
    eyebrow: "信任",
    category: "Concepts",
    title: "有来源的 AI 知识库：来源、更新与审核方法",
    description:
      "用 Wenlan 把来源、原子知识与可维护页面分开，建立能追溯、能刷新、能审核的本地 AI 知识库。",
    metaTitle: "有来源的 AI 知识库：来源、更新与审核 | Wenlan",
    metaDescription:
      "建立有来源的 AI 知识库：分开可信来源、原子知识与 LLM Wiki 页面，并用 Wenlan 保留引用、更新与审核状态。",
    keywords: [
      "AI 知识库",
      "有来源的 AI 知识库",
      "本地 AI 知识库",
      "LLM Wiki",
      "知识库维护",
      "Wenlan 文澜",
    ],
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-30",
    author: "Qi-Xuan Lu",
    readingTime: "7 分钟阅读",
    audience: "想让 AI agent 使用本地知识，但仍能检查来源、更新与审核状态的简体中文用户",
    heroBullets: [
      "可信来源不和模型产生的结论混在一起。",
      "原子知识保留细粒度证据，再组成可复用页面。",
      "页面保存引用、修订、过期原因与审核状态。",
    ],
    sections: [
      {
        heading: "一句话答案",
        body: [
          "有来源的 AI 知识库会把可信来源、原子知识与维护型 LLM Wiki 页面分开。Agent 取得的是可复用答案，人仍能沿着引用回到来源、检查修订，并在证据变化时刷新页面。",
          "Wenlan 在本地连接这三层，让知识不只是搜索片段或脱离来源的摘要。",
        ],
        link: {
          label: "查看 LLM Wiki 的完整生命周期",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "AI 知识库为什么必须保留来源",
        body: [
          "直接放入大量文档会让 agent 每次都重新搜索；只留下摘要，又会失去支持结论的证据。来源一旦更新，没有人知道哪些答案也必须重算。",
          "可维护的知识库必须回答三件事：这个结论来自哪里、现在是否仍然有效、发生冲突时由谁审核。",
        ],
      },
      {
        heading: "三层最小架构：Sources、Atomic Knowledge、Pages",
        body: [
          "Sources 是可检查的原始资料；Atomic Knowledge 是带着来源和理由的单一事实；Pages 则把重复、高价值的知识整理成 agent 可以按需读取的答案。",
          "不要跳过中间层。原子知识让页面保持可追溯，也让新证据只修正受影响的事实，而不是重写整个知识库。",
        ],
      },
      {
        heading: "Wenlan 的实际工作流程",
        body: [
          "先用一个会重复查询的主题验证闭环，不要一开始就导入整个笔记库。记录一个带来源与理由的事实，积累到值得复用时再蒸馏成页面。",
        ],
        bullets: [
          "用 /capture 保存单一事实、来源和它为什么重要。",
          "用 /distill 把重复主题整理成维护型页面。",
          "用 /pages 打开页面并核对支持它的来源。",
          "用 /lint 找出薄弱、冲突或过期的知识。",
          "用 /curate 审核修订，再决定是否刷新页面。",
        ],
        code: {
          label: "Wenlan 知识库维护循环",
          code: "/brief <主题>\n/capture <事实 + 来源 + 为什么重要>\n/distill <主题>\n/pages <主题>\n/lint\n/curate",
        },
      },
      {
        heading: "如何处理过期与冲突",
        body: [
          "来源或工作条件改变时，不要让新旧答案并排。把旧结论标成过期、记录替代关系，再按最新证据刷新页面。",
          "对高影响结论保留人工审核。自动蒸馏能加快整理，但不应把没有支持来源的文字升级成可信知识。",
        ],
      },
      {
        heading: "如何验收 AI 知识库",
        body: [
          "先用一个主题做小型验收。Agent 应该能找到当前答案，人应该能回到来源，证据变更后则能看到过期状态并完成刷新。",
        ],
        bullets: [
          "页面中的重要结论能追到来源 ID 或维护中的文档。",
          "重新打开 AI client 后，仍能按需取得相同主题。",
          "加入冲突证据时，lint 或 review 流程能把问题暴露出来。",
          "刷新后保留修订记录，而不是静默覆盖旧答案。",
        ],
      },
      {
        heading: "Wenlan 如何对应这套架构",
        body: [
          "Wenlan 的 Sources、Memories 与 Pages 对应来源、原子知识与维护型页面。页面记录保留 source IDs、版本、changelog、stale reason 与来源数量。",
          "这套设计让 Claude Code、Codex、Cursor 等 MCP client 共用同一个本地知识层，同时保留人可以检查和修正的路径。",
        ],
        link: {
          label: "阅读 Wenlan 的审核与信任指南",
          href: "/docs/review-and-trust",
        },
      },
    ],
    faqs: [
      {
        question: "AI 知识库和 RAG 是同一件事吗？",
        answer:
          "不是。RAG 在提问时找来源片段；维护型知识库还保存可复用答案、引用、审核与刷新状态，也可以在底层使用检索。",
      },
      {
        question: "开始前要导入全部笔记吗？",
        answer:
          "不用。先选一个高价值、会重复查询的主题，验证来源、capture、distill、pages、lint 与 curate 的完整闭环。",
      },
      {
        question: "Wenlan Pages 可以给人阅读吗？",
        answer:
          "可以。页面会成为可读的 Markdown，同时在 page record 中保留支持它的来源与修订状态。",
      },
    ],
    relatedSlugs: [
      "wenlan-vs-obsidian-ai-memory",
      "distilled-wiki-pages-ai-memory",
      "review-before-trust-ai-memory",
      "ai-memory-provenance",
    ],
    officialReferences: [
      {
        label: "Wenlan 的知识模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 日常工作流程",
        href: "https://github.com/7xuanlu/wenlan#daily-workflow",
      },
      {
        label: "Wenlan 审核与信任指南",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "先建立一个可验证的 AI 知识库主题",
      body: "用 Wenlan 把来源、原子知识与维护型页面连成小型闭环，再逐步扩大到其他 AI 工具和项目。",
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
