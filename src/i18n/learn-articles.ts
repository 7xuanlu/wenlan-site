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
    title: "Karpathy LLM Wiki：如何搭建有來源的 AI 知識庫",
    description:
      "Karpathy LLM Wiki 模式把可信來源、原子知識與維護頁面分開，建立讓 AI 代理按需讀取的知識庫。",
    metaTitle: "Karpathy LLM Wiki 與 AI 知識庫 | Wenlan",
    metaDescription:
      "了解 Karpathy LLM Wiki 的架構、它和 RAG 的差異，以及來源頁面、Obsidian、驗證與持續更新如何配合。",
    keywords: [
      "LLM Wiki 知識庫",
      "Karpathy LLM Wiki",
      "Andrej Karpathy LLM Wiki",
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
      "Karpathy LLM Wiki 模式維護可重用的目前答案，不把聊天紀錄、檢索片段或筆記直接當成成品知識。",
      "可靠架構會分開原始來源、原子事實、維護頁面與按需檢索。",
      "頁面需要保留 source IDs、過期原因和可檢查的修訂，而不是靜默覆蓋。",
    ],
    sections: [
      {
        heading: "Karpathy LLM Wiki 是什麼",
        body: [
          "Andrej Karpathy 用 LLM Wiki 描述一種把原始知識整理成精選、互相連結頁面的模式，讓 AI 代理只在需要時載入相關內容。本文把他的公開說明當作可維護來源，不代表 Karpathy 為 Wenlan 背書。",
          "實作上，LLM Wiki 是供 AI 代理使用、也讓人能檢查的維護型 AI 知識庫。它把文件、對話和檔案等來源整理成主題頁面，不必反覆重播整個資料庫或聊天紀錄。",
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
        question: "Karpathy LLM Wiki 的核心想法是什麼？",
        answer:
          "Andrej Karpathy 描述的是一組經過整理、彼此連結，並能由代理按需讀取的個人 wiki 頁面。重點是維護有用頁面及其結構，而不是每次載入沒有區分的完整資料庫；引用他的說明不代表他為 Wenlan 背書。",
      },
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
    title: "Obsidian + Claude Code：檔案、MCP 與可維護的 AI 知識庫",
    description:
      "比較直接讀取 Obsidian vault、即時編輯器 context、MCP 與有來源的知識維護，選出 Claude Code 真正需要的最小整合層。",
    metaTitle: "Obsidian + Claude Code：MCP 與 AI 知識庫 | Wenlan",
    metaDescription:
      "了解 Claude Code 何時直接讀 Obsidian vault 就夠、IDE 與 MCP bridge 增加什麼，以及 AI 知識庫何時需要來源、更新與審查流程。",
    keywords: [
      "Obsidian Claude Code",
      "Claude Code Obsidian",
      "Obsidian MCP",
      "Obsidian Claude Code MCP",
      "Obsidian AI 知識庫",
      "Claude Code 知識庫",
      "AI 知識庫",
      "Wenlan 文瀾",
    ],
    publishedAt: "2026-07-22",
    updatedAt: "2026-08-01",
    author: "Qi-Xuan Lu",
    readingTime: "8 分鐘閱讀",
    audience: "使用 Obsidian vault 的繁體中文 Claude Code 使用者",
    heroBullets: [
      "Claude Code 能存取本地 Markdown 時，直接讀取 vault 通常是最小且最清楚的起點。",
      "IDE bridge 補上目前檔案與選取內容；Obsidian MCP 補上結構化 vault 操作或其他 client surface。",
      "能連上 vault 不等於會維護知識；來源、過期、修訂與審查仍是另一個決策。",
    ],
    sections: [
      {
        heading: "先給答案：從最小整合層開始",
        body: [
          "如果 Claude Code 已能存取你的 Markdown 資料夾，先讓它直接讀取需要的 vault 路徑。當缺少的是目前檔案與選取內容，再加 IDE bridge；當需要 Obsidian 指令、結構化 vault 操作或另一個支援的 client，再考慮 MCP。",
          "這些連線都能改善存取，但不會自動建立可維護的 AI 知識庫。當答案要跨 session 與工具重用，還需要來源、provenance、刷新規則、衝突處理與人工審查。",
        ],
        link: {
          label: "比較 LLM Wiki 的架構與流程",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "四種 Obsidian + Claude Code 整合層",
        body: [
          "把直接檔案、編輯器 context、MCP 與內嵌 assistant 分開看，才能避免為同一件事安裝四套工具。選擇標準應該是目前缺少的能力，而不是哪個工具名稱最熱門。",
        ],
        bullets: [
          "直接檔案：Claude Code 讀寫它有權限存取的 Markdown；最適合一般搜尋、整理與修改。",
          "IDE bridge：把 Obsidian 目前檔案與選取內容傳給 Claude Code，檔案操作仍可保持直接。",
          "Obsidian MCP：提供結構化 vault tools、workspace context、Obsidian 指令或其他支援的 client。",
          "內嵌 assistant：只有當你想在 Obsidian UI 裡直接對話與操作時才需要。",
        ],
      },
      {
        heading: "連得上 vault，不等於有可維護的 AI 知識庫",
        body: [
          "Vault access 解決的是 agent 如何看到或修改筆記；知識 lifecycle 解決的是哪個答案目前有效、它來自哪裡、來源改變時要刷新哪一頁，以及衝突是否需要人審。兩者可以組合，但不能互相冒充。",
          "Obsidian 應繼續是人擁有的寫作與 Markdown 知識面。只有會影響未來 AI 工作的結論，才需要進入可追溯、可刷新、能跨 session 重用的知識層。",
        ],
        link: {
          label: "查看 Obsidian 的資料儲存方式",
          href: "https://obsidian.md/help/data-storage",
        },
      },
      {
        heading: "用 Wenlan 把 vault 當來源，而不是複製品",
        body: [
          "Wenlan 可以把 Obsidian vault 註冊為 read-only Source，按需重新同步 Markdown，再把來源與工作中確認的決策編成有引用、過期狀態與修訂記錄的 Pages。它不需要接管 Obsidian，也不應靜默覆寫人寫的 vault。",
          "當同一份知識還要給 Codex、Cursor、ChatGPT 或其他 MCP client 使用時，Wenlan 提供的是共用的 knowledge lifecycle；Obsidian 仍保留人最容易閱讀與編輯的知識面。",
        ],
        bullets: [
          "原始 Markdown 留在 read-only vault；Wenlan 按需重新掃描、分段並索引目前內容。",
          "Atomic knowledge 保存會影響未來工作的事實、決策與修正。",
          "Pages 把相關證據編成目前答案，並保留引用與刷新狀態。",
          "Lint 與 review 暴露缺少來源、衝突、過期依賴與不安全的改寫。",
        ],
      },
      {
        heading: "一個最小的 Obsidian AI 知識庫流程",
        body: [
          "先選一個無風險的小主題，而不是導入整個 vault。確認 Claude Code 能讀到一篇來源筆記，再捕捉一個會影響未來工作的結論，蒸餾成頁面，最後從頁面回到來源檢查證據。",
          "如果只需要查找與改寫 Markdown，到這裡可以停在 Obsidian。只有當答案需要跨 session、跨 client 保持一致，才增加 Wenlan 的 distill、lint 與 review 流程。",
        ],
        code: {
          label: "最小驗證循環",
          code: [
            "/brief Obsidian AI 知識庫",
            "/capture <結論 + 來源 + 為什麼重要>",
            "/handoff",
            "/distill Obsidian AI 知識庫",
            "/pages Obsidian AI 知識庫",
            "/lint",
          ].join("\n"),
        },
      },
      {
        heading: "如何驗證整合真的可用",
        body: [
          "不要只看 plugin 或 MCP 是否顯示 connected。用一個 disposable note 做端到端驗收：確認誰能讀、誰能寫、目前檔案是否正確傳入、來源是否可追溯，以及失敗時哪個 process 擁有每一次寫入。",
          "同時檢查 vault backup、模型供應商會收到哪些 context、bridge 是否只綁 localhost，以及自動化是否會改寫人擁有的筆記。連線能力不是 governance policy。",
        ],
        bullets: [
          "讀取一篇指定筆記，確認沒有把整個 vault 送進 context。",
          "修改一篇 disposable note，確認權限與寫入者符合預期。",
          "加入衝突來源，確認 lint 或 review 能把問題暴露出來。",
          "重新開啟 client，確認目前答案能被找到並回到原始來源。",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Obsidian + Claude Code 整合",
      rows: [
        {
          dimension: "直接 vault 存取",
          wenlan: "把 Obsidian vault 當 read-only Source，按需重新同步 Markdown。",
          competitor: "Claude Code 可直接讀寫有權限存取的 Markdown 檔案。",
        },
        {
          dimension: "編輯器 context",
          wenlan: "不嘗試成為 Obsidian editor bridge。",
          competitor: "IDE bridge 可分享目前檔案與選取內容，檔案修改仍可直接完成。",
        },
        {
          dimension: "結構化工具",
          wenlan:
            "Wenlan runtime 管理 Sources；MCP 提供 capture、recall、distill、Page 與 review 工具，plugin 再補上 /handoff 等工作流程。",
          competitor: "Obsidian MCP 可提供 vault 檔案、workspace context 與 Obsidian 操作。",
        },
        {
          dimension: "知識 lifecycle",
          wenlan: "Sources 與確認過的決策編成有引用、過期、修訂與審查的 Pages。",
          competitor: "Vault 是耐久 Markdown；來源、刷新與審查語意取決於所選專案與流程。",
        },
        {
          dimension: "最適合",
          wenlan: "需要跨 session 與多個 AI client 保持目前、可追溯的知識。",
          competitor: "讓 Claude Code 使用 vault 檔案、Obsidian 目前 context 或特定指令。",
        },
      ],
    },
    faqs: [
      {
        question: "使用 Claude Code 搭配 Obsidian 一定需要 MCP 嗎？",
        answer:
          "不一定。一般 Markdown 讀寫先用直接檔案存取即可；需要目前檔案與選取內容時用 IDE bridge，需要結構化 Obsidian 操作或其他 client 時再加 MCP。",
      },
      {
        question: "連上 Claude Code 後，Obsidian 就是耐久 AI 知識庫嗎？",
        answer:
          "不是。連線只提供檔案或工具存取；耐久知識還需要清楚的來源邊界、provenance、刷新、衝突處理、審查，以及跨 session 保存目前結論的方法。",
      },
      {
        question: "Wenlan 會覆寫我的 Obsidian vault 嗎？",
        answer:
          "Wenlan 可以把 vault 註冊為 read-only Source 並重新同步 Markdown。人寫的 vault 繼續是來源；Wenlan 把有來源的 Pages 與其他 artifacts 投影在自己的本地空間，不應靜默覆寫 vault。",
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
        label: "obsidian-claude-code 內嵌 assistant",
        href: "https://github.com/Roasbeef/obsidian-claude-code",
      },
      {
        label: "Obsidian 的 Claude Code IDE bridge",
        href: "https://github.com/petersolopov/obsidian-claude-ide",
      },
      {
        label: "Obsidian Claude Code MCP repository",
        href: "https://github.com/iansinnott/obsidian-claude-code-mcp",
      },
      {
        label: "Wenlan 維護型知識模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 日常工作流程",
        href: "https://wenlan.app/docs/daily-workflow",
      },
      {
        label: "Wenlan 資料與隱私",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    cta: {
      heading: "讓 vault 與 AI 知識庫各司其職",
      body: "保留 Obsidian 作為人類可讀的知識面；答案需跨工具保持目前、可追溯且可審查時，再用 Wenlan 維護具引用的 Pages。",
    },
  },
  "build-local-ai-knowledge-base-from-documents": {
    slug: "build-local-ai-knowledge-base-from-documents",
    eyebrow: "實作",
    category: "Workflows",
    title: "如何用 Markdown、PDF 與 Obsidian 建立本地 AI 知識庫",
    description:
      "從一個文件範圍開始，用可重複同步的 Sources、有來源的 Pages 與驗證步驟，建立 AI agent 真正能重用的本地知識庫。",
    metaTitle: "用 Markdown、PDF 與 Obsidian 建立 AI 知識庫 | Wenlan",
    metaDescription:
      "用 Markdown、文字檔、文字型 PDF、資料夾或 Obsidian vault 建立本地 AI 知識庫，並驗證同步、來源與維護型頁面。",
    keywords: [
      "建立 AI 知識庫",
      "本地 AI 知識庫",
      "AI 知識庫搭建",
      "開源 AI 知識庫",
      "Markdown AI 知識庫",
      "PDF AI 知識庫",
      "Obsidian AI 知識庫",
      "AI agent 知識庫",
      "Wenlan 文瀾",
    ],
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-01",
    author: "Qi-Xuan Lu",
    readingTime: "7 分鐘閱讀",
    audience: "想讓 Claude Code、Codex、Cursor 或其他 AI agent 使用本地文件的繁體中文使用者",
    heroBullets: [
      "先選一個檔案或資料夾，不要一次匯入全部資料。",
      "支援 Markdown、文字檔、可擷取文字的 PDF 與 Obsidian vault。",
      "先驗證同步與來源，再信任 AI 整理出的頁面。",
    ],
    sections: [
      {
        heading: "一句話做法",
        body: [
          "先依作業系統安裝 Wenlan runtime、連接目前使用的 AI 客戶端並驗證連線，再對一個 `.md`、`.txt`、可擷取文字的 `.pdf`、資料夾或 Obsidian vault 執行 `wenlan sources add <path>`。同一路徑再次執行會重新同步。",
          "來源能回答真實問題後，在已安裝 Wenlan plugin 的 Claude Code 或 Codex 使用 `/distill <主題>`、`/pages`、`/lint` 與 `/curate`；只有 MCP 連線的客戶端則使用該客戶端顯示的 Wenlan 工具完成同一流程。",
        ],
      },
      {
        heading: "先劃定支援的來源範圍",
        body: [
          "Wenlan 的 Directory Source 會讀取單一檔案或遞迴掃描資料夾，支援 `.md`、`.txt` 與能直接擷取文字的 `.pdf`。Obsidian vault 可作為唯讀 Markdown 來源，人寫的原始檔仍由 vault 管理。",
          "掃描型 PDF 必須先做 OCR；任意程式碼檔案目前不屬於 Directory Source 的支援範圍。程式碼、測試與專案原生文件仍應是權威，知識庫負責維護可檢查的綜合答案。",
        ],
      },
      {
        heading: "建立最小文件到頁面流程",
        body: [
          "先選一個會重複詢問的主題和一小組文件，讓錯誤、跳過與缺少來源都看得見。",
        ],
        bullets: [
          "執行 sources add，確認 found、ingested、skipped 與 errors 數量。",
          "修改來源後重跑同一指令，確認同步結果符合預期。",
          "來源足夠時才 distill，不用把每份文件都變成 Page。",
          "開啟 Page，核對重要結論能回到來源或引用。",
          "執行 lint 與 curate，處理薄弱、衝突、過期或待審查內容。",
        ],
        code: {
          label: "完成平台與客戶端設定後",
          code: "wenlan status\nwenlan sources add ~/Knowledge/project-docs",
        },
      },
      {
        heading: "如何驗收，而不是只看匯入成功",
        body: [
          "用一個來源中存在的問題和一個來源中不存在的問題測試。前者應能找到支持材料，後者不應被補成確定答案。接著修改一份文件、重新同步，確認 Page 能顯示需要刷新或產生可審查修訂。",
          "驗收重點是來源邊界、同步結果、引用與修訂，不是一次匯入多少檔案。這讓知識庫即使不使用 Wenlan，也有可重複的品質判準。",
        ],
      },
      {
        heading: "何時再擴大資料範圍",
        body: [
          "只有當一個主題能完成來源、同步、Page、lint 與 review 閉環後，才加入下一個資料夾或 vault。這能避免同名文件、過期版本與無關內容一起進入檢索結果。",
        ],
        link: {
          label: "了解有來源 AI 知識庫的維護架構",
          href: "/learn/source-backed-wiki-pages-ai-work",
        },
      },
    ],
    faqs: [
      {
        question: "Wenlan 會改寫我的 Obsidian vault 嗎？",
        answer:
          "不會。vault 會作為唯讀來源重新掃描與索引，原始 Markdown 仍由你管理；Pages 匯出或 symlink 是另一個明確選擇。",
      },
      {
        question: "掃描型 PDF 可以直接加入嗎？",
        answer:
          "不行。PDF 必須能直接擷取文字；只有影像的掃描型 PDF 需要先經過 OCR，再把可讀文字納入來源。",
      },
      {
        question: "這和把文件上傳到聊天機器人有什麼不同？",
        answer:
          "聊天附件通常只服務當次對話；這個流程會保留可重複同步的本地來源，並建立能檢查引用、過期狀態與修訂的維護型 Page。",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "distilled-wiki-pages-ai-memory",
      "wenlan-vs-obsidian-ai-memory",
    ],
    officialReferences: [
      {
        label: "Wenlan 平台與客戶端設定",
        href: "https://github.com/7xuanlu/wenlan/blob/main/docs/setup-with-ai.md",
      },
      {
        label: "Wenlan 支援的文件來源",
        href: "https://github.com/7xuanlu/wenlan#what-can-i-bring-in",
      },
      {
        label: "wenlan sources add CLI",
        href: "https://github.com/7xuanlu/wenlan/blob/main/crates/wenlan-cli/README.md#wenlan-sources-add-path",
      },
      {
        label: "Wenlan 有來源 Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
    ],
    cta: {
      heading: "先用一個資料夾驗證完整閉環",
      body: "安裝 Wenlan，加入一組可檢查的文件，再驗證同步、Page、引用與審查流程。",
    },
  },
} satisfies Partial<Record<TranslatedLearnSlug, LearnArticle>>;

const zhCNArticles = {
  "distilled-wiki-pages-ai-memory": {
    ...zhTWArticles["distilled-wiki-pages-ai-memory"],
    title: "Karpathy LLM Wiki：如何搭建有来源的 AI 知识库",
    description:
      "Karpathy LLM Wiki 模式把可信来源、原子知识与维护页面分开，建立让 AI 代理按需读取的知识库。",
    metaTitle: "Karpathy LLM Wiki 与 AI 知识库 | Wenlan",
    metaDescription:
      "了解 Karpathy LLM Wiki 的架构、它和 RAG 的区别，以及来源页面、Obsidian、校验与持续更新如何配合。",
    keywords: [
      "LLM Wiki 知识库",
      "Karpathy LLM Wiki",
      "Andrej Karpathy LLM Wiki",
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
    updatedAt: "2026-08-01",
    readingTime: "9 分钟阅读",
    audience: "正在搭建可由 AI 代理读取、更新并检查来源的本地知识库的中文用户",
    heroBullets: [
      "Karpathy LLM Wiki 模式维护可复用的当前答案，不把聊天记录、检索片段或笔记直接当成成品知识。",
      "可靠架构会分开原始来源、原子事实、维护页面与按需检索。",
      "页面需要保留 source IDs、变旧原因和可检查的修订，而不是静默覆盖。",
    ],
    sections: [
      {
        heading: "Karpathy LLM Wiki 是什么",
        body: [
          "Andrej Karpathy 用 LLM Wiki 描述一种把原始知识整理成精选、互相连接页面的模式，让 AI 代理只在需要时加载相关内容。本文把他的公开说明作为可维护来源，不代表 Karpathy 为 Wenlan 背书。",
          "实现上，LLM Wiki 是给 AI 代理使用、也让人能够检查的维护型 AI 知识库。它把文档、对话和文件等来源整理成主题页面，不必反复重放整个资料库或聊天历史。",
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
        question: "Karpathy LLM Wiki 的核心想法是什么？",
        answer:
          "Andrej Karpathy 描述的是一组经过整理、彼此连接，并能由代理按需读取的个人 wiki 页面。重点是维护有用页面及其结构，而不是每次加载没有区分的完整资料库；引用他的说明不代表他为 Wenlan 背书。",
      },
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
  "wenlan-vs-obsidian-ai-memory": {
    slug: "wenlan-vs-obsidian-ai-memory",
    eyebrow: "比较",
    category: "Comparisons",
    title: "Obsidian + Claude Code：文件、MCP 与可维护的 AI 知识库",
    description:
      "比较直接读取 Obsidian vault、实时编辑器 context、MCP 与有来源的知识维护，选择 Claude Code 真正需要的最小集成层。",
    metaTitle: "Obsidian + Claude Code：MCP 与 AI 知识库 | Wenlan",
    metaDescription:
      "了解 Claude Code 何时直接读取 Obsidian vault 就够、IDE 与 MCP bridge 增加什么，以及 AI 知识库何时需要来源、更新与审核流程。",
    keywords: [
      "Obsidian Claude Code",
      "Claude Code Obsidian",
      "Obsidian MCP",
      "Obsidian Claude Code MCP",
      "Obsidian AI 知识库",
      "Claude Code 知识库",
      "AI 知识库",
      "本地 AI 知识库",
      "Wenlan 文澜",
    ],
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-01",
    author: "Qi-Xuan Lu",
    readingTime: "8 分钟阅读",
    audience: "使用 Obsidian vault 的简体中文 Claude Code 用户",
    heroBullets: [
      "Claude Code 能访问本地 Markdown 时，直接读取 vault 通常是最小且最清楚的起点。",
      "IDE bridge 补上当前文件与选中内容；Obsidian MCP 补上结构化 vault 操作或其他 client surface。",
      "能连接 vault 不等于会维护知识；来源、过期、修订与审核仍是另一个决策。",
    ],
    sections: [
      {
        heading: "先给答案：从最小集成层开始",
        body: [
          "如果 Claude Code 已能访问你的 Markdown 文件夹，先让它直接读取需要的 vault 路径。缺少当前文件与选中内容时再加 IDE bridge；需要 Obsidian 命令、结构化 vault 操作或另一个支持的 client 时再考虑 MCP。",
          "这些连接都会改善访问，但不会自动建立可维护的 AI 知识库。答案要跨 session 与工具复用时，还需要来源、provenance、刷新规则、冲突处理与人工审核。",
        ],
        link: {
          label: "比较 LLM Wiki 的架构与流程",
          href: "/learn/distilled-wiki-pages-ai-memory",
        },
      },
      {
        heading: "四种 Obsidian + Claude Code 集成层",
        body: [
          "把直接文件、编辑器 context、MCP 与内嵌 assistant 分开看，才能避免为同一件事安装四套工具。选择标准应该是当前缺少的能力，而不是哪个工具名字最热门。",
        ],
        bullets: [
          "直接文件：Claude Code 读写它有权限访问的 Markdown；适合普通搜索、整理与修改。",
          "IDE bridge：把 Obsidian 当前文件与选中内容传给 Claude Code，文件操作仍可保持直接。",
          "Obsidian MCP：提供结构化 vault tools、workspace context、Obsidian 命令或其他支持的 client。",
          "内嵌 assistant：只有想在 Obsidian UI 中直接对话与操作时才需要。",
        ],
      },
      {
        heading: "能连接 vault，不等于有可维护的 AI 知识库",
        body: [
          "Vault access 解决 agent 如何看到或修改笔记；knowledge lifecycle 解决哪个答案当前有效、它来自哪里、来源变化时要刷新哪一页，以及冲突是否需要人审。两者可以组合，但不能互相冒充。",
          "Obsidian 应继续是人拥有的写作与 Markdown 知识面。只有会影响未来 AI 工作的结论，才需要进入可追溯、可刷新、能跨 session 复用的知识层。",
        ],
        link: {
          label: "查看 Obsidian 的数据存储方式",
          href: "https://obsidian.md/help/data-storage",
        },
      },
      {
        heading: "用 Wenlan 把 vault 当来源，而不是复制品",
        body: [
          "Wenlan 可以把 Obsidian vault 注册为 read-only Source，按需重新同步 Markdown，再把来源与工作中确认的决策编成带引用、过期状态与修订记录的 Pages。它不需要接管 Obsidian，也不应静默覆盖人写的 vault。",
          "同一份知识还要给 Codex、Cursor、ChatGPT 或其他 MCP client 使用时，Wenlan 提供共用的 knowledge lifecycle；Obsidian 仍保留人最容易阅读和编辑的知识面。",
        ],
        bullets: [
          "原始 Markdown 保留在只读 vault；Wenlan 按需重新扫描、分块并索引当前内容。",
          "Atomic knowledge 保存会影响未来工作的事实、决策与纠正。",
          "Pages 把相关证据编成当前答案，并保留引用与刷新状态。",
          "Lint 与 review 暴露缺少来源、冲突、过期依赖与不安全的改写。",
        ],
      },
      {
        heading: "一个最小的 Obsidian AI 知识库流程",
        body: [
          "先选一个无风险的小主题，不要导入整个 vault。确认 Claude Code 能读到一篇来源笔记，再捕捉一个会影响未来工作的结论，蒸馏成页面，最后从页面回到来源检查证据。",
          "如果只需要查找和改写 Markdown，到这里可以停在 Obsidian。只有答案需要跨 session、跨 client 保持一致时，才增加 Wenlan 的 distill、lint 与 review 流程。",
        ],
        code: {
          label: "最小验证循环",
          code: [
            "/brief Obsidian AI 知识库",
            "/capture <结论 + 来源 + 为什么重要>",
            "/handoff",
            "/distill Obsidian AI 知识库",
            "/pages Obsidian AI 知识库",
            "/lint",
          ].join("\n"),
        },
      },
      {
        heading: "如何验证集成真的可用",
        body: [
          "不要只看 plugin 或 MCP 是否显示 connected。用一个 disposable note 做端到端验收：确认谁能读、谁能写、当前文件是否正确传入、来源是否可追溯，以及失败时哪个 process 拥有每一次写入。",
          "同时检查 vault backup、模型提供商会收到哪些 context、bridge 是否只绑定 localhost，以及自动化是否会改写人拥有的笔记。连接能力不是 governance policy。",
        ],
        bullets: [
          "读取一篇指定笔记，确认没有把整个 vault 发送到 context。",
          "修改一篇 disposable note，确认权限与写入者符合预期。",
          "加入冲突来源，确认 lint 或 review 能暴露问题。",
          "重新打开 client，确认当前答案能被找到并回到原始来源。",
        ],
      },
    ],
    comparisonTable: {
      competitorName: "Obsidian + Claude Code 集成",
      rows: [
        {
          dimension: "直接 vault 访问",
          wenlan: "把 Obsidian vault 当 read-only Source，按需重新同步 Markdown。",
          competitor: "Claude Code 可直接读写有权限访问的 Markdown 文件。",
        },
        {
          dimension: "编辑器 context",
          wenlan: "不尝试成为 Obsidian editor bridge。",
          competitor: "IDE bridge 可共享当前文件与选中内容，文件修改仍可直接完成。",
        },
        {
          dimension: "结构化工具",
          wenlan:
            "Wenlan runtime 管理 Sources；MCP 提供 capture、recall、distill、Page 与 review 工具，plugin 再补上 /handoff 等工作流程。",
          competitor: "Obsidian MCP 可提供 vault 文件、workspace context 与 Obsidian 操作。",
        },
        {
          dimension: "知识 lifecycle",
          wenlan: "Sources 与确认过的决策编成带引用、过期、修订与审核的 Pages。",
          competitor: "Vault 是持久 Markdown；来源、刷新与审核语义取决于所选项目和流程。",
        },
        {
          dimension: "最适合",
          wenlan: "需要跨 session 与多个 AI client 保持当前、可追溯的知识。",
          competitor: "让 Claude Code 使用 vault 文件、Obsidian 当前 context 或特定命令。",
        },
      ],
    },
    faqs: [
      {
        question: "Claude Code 搭配 Obsidian 一定需要 MCP 吗？",
        answer:
          "不一定。普通 Markdown 读写先用直接文件访问即可；需要当前文件与选中内容时用 IDE bridge，需要结构化 Obsidian 操作或其他 client 时再加 MCP。",
      },
      {
        question: "连接 Claude Code 后，Obsidian 就是持久 AI 知识库吗？",
        answer:
          "不是。连接只提供文件或工具访问；持久知识还需要清楚的来源边界、provenance、刷新、冲突处理、审核，以及跨 session 保存当前结论的方法。",
      },
      {
        question: "Wenlan 会覆盖我的 Obsidian vault 吗？",
        answer:
          "Wenlan 可以把 vault 注册为 read-only Source 并重新同步 Markdown。人写的 vault 继续作为来源；Wenlan 把有来源的 Pages 与其他 artifacts 投影在自己的本地空间，不应静默覆盖 vault。",
      },
    ],
    relatedSlugs: [
      "distilled-wiki-pages-ai-memory",
      "source-backed-wiki-pages-ai-work",
      "ai-work-memory-vs-knowledge-base",
    ],
    officialReferences: [
      {
        label: "Obsidian 数据存储说明",
        href: "https://obsidian.md/help/data-storage",
      },
      {
        label: "Obsidian plugins 说明",
        href: "https://obsidian.md/help/plugins",
      },
      {
        label: "obsidian-claude-code 内嵌 assistant",
        href: "https://github.com/Roasbeef/obsidian-claude-code",
      },
      {
        label: "Obsidian 的 Claude Code IDE bridge",
        href: "https://github.com/petersolopov/obsidian-claude-ide",
      },
      {
        label: "Obsidian Claude Code MCP repository",
        href: "https://github.com/iansinnott/obsidian-claude-code-mcp",
      },
      {
        label: "Wenlan 维护型知识模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 日常工作流程",
        href: "https://wenlan.app/docs/daily-workflow",
      },
      {
        label: "Wenlan 数据与隐私",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    cta: {
      heading: "让 vault 与 AI 知识库各司其职",
      body: "保留 Obsidian 作为人可读的知识面；答案需跨工具保持当前、可追溯且可审核时，再用 Wenlan 维护带引用的 Pages。",
    },
  },
  "build-local-ai-knowledge-base-from-documents": {
    slug: "build-local-ai-knowledge-base-from-documents",
    eyebrow: "实作",
    category: "Workflows",
    title: "如何用 Markdown、PDF 与 Obsidian 建立本地 AI 知识库",
    description:
      "从一个文档范围开始，用可重复同步的 Sources、有来源的 Pages 与验证步骤，建立 AI agent 真正能复用的本地知识库。",
    metaTitle: "用 Markdown、PDF 与 Obsidian 建立 AI 知识库 | Wenlan",
    metaDescription:
      "用 Markdown、文本文件、文本型 PDF、文件夹或 Obsidian vault 搭建本地 AI 知识库，并验证同步、来源与维护型页面。",
    keywords: [
      "搭建 AI 知识库",
      "本地 AI 知识库",
      "AI 知识库搭建",
      "开源 AI 知识库",
      "Markdown AI 知识库",
      "PDF AI 知识库",
      "Obsidian AI 知识库",
      "AI agent 知识库",
      "Wenlan 文澜",
    ],
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-01",
    author: "Qi-Xuan Lu",
    readingTime: "7 分钟阅读",
    audience: "想让 Claude Code、Codex、Cursor 或其他 AI agent 使用本地文档的简体中文用户",
    heroBullets: [
      "先选一个文件或文件夹，不要一次导入全部资料。",
      "支持 Markdown、文本文件、可提取文字的 PDF 与 Obsidian vault。",
      "先验证同步与来源，再信任 AI 整理出的页面。",
    ],
    sections: [
      {
        heading: "一句话做法",
        body: [
          "先按操作系统安装 Wenlan runtime、连接当前使用的 AI 客户端并验证连接，再对一个 `.md`、`.txt`、可提取文字的 `.pdf`、文件夹或 Obsidian vault 执行 `wenlan sources add <path>`。同一路径再次执行会重新同步。",
          "来源能回答真实问题后，在已安装 Wenlan plugin 的 Claude Code 或 Codex 使用 `/distill <主题>`、`/pages`、`/lint` 与 `/curate`；只有 MCP 连接的客户端则使用该客户端显示的 Wenlan 工具完成同一流程。",
        ],
      },
      {
        heading: "先划定支持的来源范围",
        body: [
          "Wenlan 的 Directory Source 会读取单一文件或递归扫描文件夹，支持 `.md`、`.txt` 与能直接提取文字的 `.pdf`。Obsidian vault 可作为只读 Markdown 来源，人写的原始文件仍由 vault 管理。",
          "扫描型 PDF 必须先做 OCR；任意源代码文件目前不属于 Directory Source 的支持范围。代码、测试与项目原生文档仍应是权威，知识库负责维护可检查的综合答案。",
        ],
      },
      {
        heading: "建立最小文档到页面流程",
        body: [
          "先选一个会重复询问的主题和一小组文档，让错误、跳过与缺少来源都看得见。",
        ],
        bullets: [
          "执行 sources add，确认 found、ingested、skipped 与 errors 数量。",
          "修改来源后重跑同一命令，确认同步结果符合预期。",
          "来源足够时才 distill，不用把每份文档都变成 Page。",
          "打开 Page，核对重要结论能回到来源或引用。",
          "执行 lint 与 curate，处理薄弱、冲突、过期或待审核内容。",
        ],
        code: {
          label: "完成平台与客户端设置后",
          code: "wenlan status\nwenlan sources add ~/Knowledge/project-docs",
        },
      },
      {
        heading: "如何验收，而不是只看导入成功",
        body: [
          "用一个来源中存在的问题和一个来源中不存在的问题测试。前者应能找到支持材料，后者不应被补成确定答案。接着修改一份文档、重新同步，确认 Page 能显示需要刷新或产生可审核修订。",
          "验收重点是来源边界、同步结果、引用与修订，不是一次导入多少文件。这让知识库即使不使用 Wenlan，也有可重复的质量标准。",
        ],
      },
      {
        heading: "何时再扩大资料范围",
        body: [
          "只有当一个主题能完成来源、同步、Page、lint 与 review 闭环后，才加入下一个文件夹或 vault。这能避免同名文档、过期版本与无关内容一起进入检索结果。",
        ],
        link: {
          label: "了解有来源 AI 知识库的维护架构",
          href: "/learn/source-backed-wiki-pages-ai-work",
        },
      },
    ],
    faqs: [
      {
        question: "Wenlan 会改写我的 Obsidian vault 吗？",
        answer:
          "不会。vault 会作为只读来源重新扫描与索引，原始 Markdown 仍由你管理；Pages 导出或 symlink 是另一个明确选择。",
      },
      {
        question: "扫描型 PDF 可以直接加入吗？",
        answer:
          "不行。PDF 必须能直接提取文字；只有图片的扫描型 PDF 需要先经过 OCR，再把可读文本纳入来源。",
      },
      {
        question: "这和把文档上传到聊天机器人有什么不同？",
        answer:
          "聊天附件通常只服务当次对话；这个流程会保留可重复同步的本地来源，并建立能检查引用、过期状态与修订的维护型 Page。",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "distilled-wiki-pages-ai-memory",
      "wenlan-vs-obsidian-ai-memory",
    ],
    officialReferences: [
      {
        label: "Wenlan 平台与客户端设置",
        href: "https://github.com/7xuanlu/wenlan/blob/main/docs/setup-with-ai.md",
      },
      {
        label: "Wenlan 支持的文档来源",
        href: "https://github.com/7xuanlu/wenlan#what-can-i-bring-in",
      },
      {
        label: "wenlan sources add CLI",
        href: "https://github.com/7xuanlu/wenlan/blob/main/crates/wenlan-cli/README.md#wenlan-sources-add-path",
      },
      {
        label: "Wenlan 有来源 Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
    ],
    cta: {
      heading: "先用一个文件夹验证完整闭环",
      body: "安装 Wenlan，加入一组可检查的文档，再验证同步、Page、引用与审核流程。",
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
