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
    updatedAt: "2026-08-12",
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
        heading: "一份最小可用的 LLM Wiki Schema",
        body: [
          "讓固定載入的合約保持精簡。CLAUDE.md 或 AGENTS.md 只需說明知識庫的用途、不可靜默改變的邊界，以及需要時才按需載入的操作流程；不要把整個 wiki 或所有維護指令都塞進每次 context。",
          "這是工具無關的資訊與維護合約，不強迫特定資料夾或產品儲存格式；可以調整名稱，但每個邊界都應該能被檢查。",
        ],
        bullets: [
          "用途與範圍：哪些重複問題或決策屬於這個 wiki，哪些不屬於。",
          "不可變來源邊界：原始證據放在哪裡，以及自動化絕不能改寫哪些檔案。",
          "頁面所有權：哪些頁面由機器維護、人擁有，或只能透過審查修改。",
          "命名與連結規則：穩定主題、別名、頁面連結和最小 routing index。",
          "引用要求：重要說法必須能回到可檢查來源。",
          "Ingest、Query、Lint 與維護紀錄：分開按需載入的流程，加上 append-only 變更紀錄。",
          "過期與審查行為：來源改變、證據衝突或人擁有文字時要怎麼處理。",
        ],
        code: {
          label: "精簡 client 合約",
          code: [
            "# LLM Wiki",
            "用途：<這個 wiki 維護的重複決策>",
            "來源：<不可變來源邊界>",
            "頁面：<所有權、命名、連結、引用>",
            "索引：<最小主題路由；頁面按需載入>",
            "流程：ingest | query | lint | review",
            "紀錄：<append-only 維護紀錄>",
            "過期規則：<來源改變 -> stale 或 review>",
          ].join("\n"),
        },
      },
      {
        heading: "正式使用前的最小驗收測試",
        body: [
          "檔案存在不代表 template 已經可用。先用一個無風險主題做端到端測試，而且必須包含一次來源變更，再匯入私人或重要資料。",
          "這套驗收可用於資料夾加 prompt、Obsidian 工作流或專門的 LLM Wiki 工具；預期結果是人能檢查的證據，不只是一段流暢回答。",
        ],
        bullets: [
          "匯入一份無風險來源，確認原始內容沒有被改寫。",
          "回答一個問題，並替重要說法引用來源。",
          "執行 lint，確認缺少引用、斷鏈或重複能被看見。",
          "修改來源，再問一次相同問題。",
          "確認舊答案進入 stale 或 review，而不是被靜默覆蓋。",
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
          "Wenlan 不要求使用者自訂 Page schema。typed Memory fields 與內建 Page 規則已管理來源、引用、刷新、所有權和審查；上面的 starter schema 是可攜的 client 與流程驗收合約。",
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
        label: "jackwener LLM Wiki 實作",
        href: "https://github.com/jackwener/llm-wiki",
      },
      {
        label: "LLM Wiki CLAUDE.md template",
        href: "https://hjarni.com/blog/llm-wiki-claude-md-template",
      },
      {
        label: "LLM Wiki v2 提案",
        href: "https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2",
      },
    ],
    relatedSlugs: [
      "coding-agent-source-backed-knowledge-base",
      "wenlan-vs-obsidian-ai-memory",
      "source-backed-wiki-pages-ai-work",
      "verify-ai-knowledge-base-citations",
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
      "coding-agent-source-backed-knowledge-base",
      "wenlan-vs-obsidian-ai-memory",
      "distilled-wiki-pages-ai-memory",
      "verify-ai-knowledge-base-citations",
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
  "coding-agent-source-backed-knowledge-base": {
    slug: "coding-agent-source-backed-knowledge-base",
    eyebrow: "Coding agent 知識",
    category: "Workflows",
    title: "如何讓 Codex 使用有來源的專案知識庫",
    description:
      "把 AGENTS.md、原始程式與文件、維護型知識頁分工，讓 Codex 按需取得有來源、可審查的專案知識。",
    metaTitle: "Codex 有來源專案知識庫工作流 | Wenlan",
    metaDescription:
      "用 AGENTS.md、專案文件、引用、按需檢索與驗證，為 Codex、Claude Code 或其他 coding agent 建立有來源的專案知識庫。",
    keywords: [
      "Codex 知識庫",
      "Codex 專案知識",
      "coding agent 知識庫",
      "AI agent 專案知識庫",
      "AGENTS.md 知識庫",
      "Claude Code 知識庫",
      "有來源的專案知識庫",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    author: "Qi-Xuan Lu",
    readingTime: "8 分鐘閱讀",
    audience: "希望 Codex、Claude Code 或其他 coding agent 能重用可信專案知識的開發者",
    heroBullets: [
      "AGENTS.md 或 CLAUDE.md 只放每次都必須載入的短規則。",
      "程式、測試、規格與第一方文件繼續作為單一事實來源。",
      "維護型知識頁只保存需要跨檔整理、附來源並反覆重用的結論。",
    ],
    sections: [
      {
        heading: "一句話做法",
        body: [
          "把 coding agent 的專案知識分成三層：AGENTS.md 或 CLAUDE.md 放短而穩定的操作規則；程式、測試、規格與文件保留為單一事實來源；有來源的知識庫保存需要跨檔整理、引用與審查的目前答案。",
          "Agent 接到任務時先讀最小規則，再按問題取用一個相關 Page，最後回到引用、程式與測試驗證。這比把全部內容塞進 instruction file，或每次重掃整個 repo 更容易保持目前與可檢查。",
        ],
      },
      {
        heading: "AGENTS.md、CLAUDE.md 與知識庫各做什麼",
        body: [
          "AGENTS.md 適合放 build、test、branch、權限與禁區等 agent 無法只靠讀 code 推出的規則；Claude Code 使用者可用 CLAUDE.md 表達同一類專案指引。檔案越長，越容易擠掉目前任務真正需要的 context。",
          "知識庫不應複製 repo。架構理由、外部限制、跨檔結論、決策歷史與已驗證的操作手冊，才是適合維護成有引用 Page 的內容。程式與測試一旦改變，Page 應進入 stale 或 review，而不是繼續假裝正確。",
        ],
        bullets: [
          "每次載入：非顯而易見的專案規則與安全邊界。",
          "單一事實來源：目前程式、測試、規格與第一方文件。",
          "按需知識：有來源、可審查、需要跨會話重用的結論。",
        ],
      },
      {
        heading: "建立 coding agent 可用的有來源工作流",
        body: [
          "先選一個會重複詢問的小主題，例如 release 流程或資料遷移邊界。完成 Wenlan 與 Codex 連線後，只加入能回答該主題的 Markdown、文字或可擷取文字 PDF；不要一開始匯入整個 repository。",
          "把來源蒸餾成 Page 後，檢查重要說法能回到來源，再跑 lint 與 review。只有 MCP 連線的 client 應使用該 client 顯示的 Wenlan tools；下列 slash commands 適用於已安裝 Wenlan plugin 的 client。",
        ],
        code: {
          label: "一個有界的 Codex 專案知識流程",
          code: "wenlan status\nwenlan connect codex\nwenlan sources add ~/project/docs\n/distill <專案主題>\n/pages <專案主題>\n/lint\n/curate",
        },
      },
      {
        heading: "每次任務只取用足夠的 context",
        body: [
          "不要在每次 session 開始時重播全部文件。先用任務名稱、錯誤症狀或模組查詢最相關的 Page，再沿引用打開真正需要的來源。若答案直接存在目前 code 或 test，就讓 agent 讀原檔，不要多繞一層摘要。",
          "任務結束時只保存能影響未來工作的決策、限制、修正或交接。聊天摘要、暫時探索與 agent 自己可以從 repo 推出的內容，不應自動升格為專案知識。",
        ],
      },
      {
        heading: "如何驗證引用與不支援的答案",
        body: [
          "準備一個來源中有答案的問題、一個必須跨兩份文件才能回答的問題，以及一個來源沒有答案的問題。前兩者應顯示支持材料；最後一個應保持未知，不應因為文字流暢就補成確定結論。",
          "修改其中一份來源並重新同步，再確認受影響 Page 能被標成需要刷新或產生可審查修訂。這個 acceptance test 比『agent 看起來記得』更能證明知識庫有用。",
        ],
      },
      {
        heading: "什麼時候不需要另一套知識庫",
        body: [
          "如果資訊已在一份短而目前的 README、規格或測試裡，coding agent 直接讀來源通常更準。只有當同一問題跨多個來源、反覆出現，且重建答案的成本明顯時，才值得維護額外的 source-backed Page。",
          "這條邊界即使不使用 Wenlan 也成立：先維持權威來源，再決定哪些結論值得做成可查詢、可引用、可刷新的專案知識。",
        ],
      },
    ],
    faqs: [
      {
        question: "AGENTS.md 應該放完整專案知識嗎？",
        answer:
          "不應該。它只需放 agent 每次都要知道、又無法從 repo 自己推出的規則。較長的架構說明、決策與外部限制應留在權威文件或按需知識頁。",
      },
      {
        question: "知識庫可以取代程式與測試嗎？",
        answer:
          "不可以。程式、測試、規格與核准的第一方文件仍是權威；知識頁應保留引用，並在來源改變時進入 stale、refresh 或 review。",
      },
      {
        question: "Claude Code 也能用同一套方法嗎？",
        answer:
          "可以。工具的指令入口不同，但短規則、權威來源、按需 Page、引用與驗證的分層相同；Wenlan 也能讓多個已連接 client 使用同一套本地知識。",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "build-local-ai-knowledge-base-from-documents",
      "choose-ai-knowledge-base-tool",
      "distilled-wiki-pages-ai-memory",
    ],
    officialReferences: [
      {
        label: "OpenAI harness engineering",
        href: "https://openai.com/index/harness-engineering/",
      },
      {
        label: "AGENTS.md 開放格式",
        href: "https://agents.md/",
      },
      {
        label: "Wenlan 與 AI client 設定",
        href: "https://github.com/7xuanlu/wenlan/blob/main/docs/setup-with-ai.md",
      },
      {
        label: "Wenlan 有來源 Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
      {
        label: "Wenlan 審查與信任",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "先讓 Codex 驗證一個專案主題",
      body: "連接 Codex、加入一組可檢查來源，再確認 Page 的引用、刷新與審查都從屬於目前 repo。",
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
      "coding-agent-source-backed-knowledge-base",
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
  "choose-ai-knowledge-base-tool": {
    slug: "choose-ai-knowledge-base-tool",
    eyebrow: "選型指南",
    category: "Workflows",
    title: "如何選 AI 知識庫工具：8 個真正重要的檢查",
    description:
      "先分清文件問答、RAG、筆記工具與維護型知識庫，再用來源、更新、審查、資料控制與實測結果選擇工具。",
    metaTitle: "如何選 AI 知識庫工具：8 個檢查 | Wenlan",
    metaDescription:
      "用 8 個實際測試選擇 AI 知識庫工具，比較文件問答、RAG、本地筆記與跨 AI agent 維護知識的差異。",
    keywords: [
      "AI 知識庫工具",
      "AI 知識庫軟體推薦",
      "如何選 AI 知識庫",
      "本地 AI 知識庫工具",
      "開源 AI 知識庫",
      "AI agent 知識庫",
      "AI 知識庫比較",
      "Wenlan 文瀾",
    ],
    publishedAt: "2026-08-02",
    updatedAt: "2026-08-02",
    author: "Qi-Xuan Lu",
    readingTime: "8 分鐘閱讀",
    audience: "正在選擇文件問答、RAG、本地筆記或跨 AI agent 知識系統的繁體中文使用者",
    heroBullets: [
      "先選操作模式，再比較功能清單。",
      "用來源改變與衝突測試答案是否仍可追溯、可更新。",
      "用自己的小型文件集對每個候選工具執行同一套驗收。",
    ],
    sections: [
      {
        heading: "先分清你需要哪一種 AI 知識庫",
        body: [
          "不要先問哪個工具最好。先判斷需要的是當次會話的文件上傳、針對一組文件的 RAG 問答、讓 AI 直接讀取筆記或 Markdown vault，還是跨會話與多個 agent 維護有來源的目前答案。",
          "這四種模式可以組合，但解決的問題不同。把它們放在同一張功能表比較，通常會買到不符合實際工作方式的產品。",
        ],
      },
      {
        heading: "8 個真正重要的檢查",
        body: ["用一小組具代表性的文件，先寫下預期答案，再對每個候選工具做相同測試。"],
        bullets: [
          "來源可追溯：重要答案能否開啟支持它的確切來源或引用？",
          "更新狀態：來源改變後，哪些答案過期、哪些需要刷新是否看得見？",
          "衝突與審查：矛盾證據會進入明確審查，還是被模型靜默改寫？",
          "資料所有權與匯出：能否保留或匯出可讀檔案與歷史，不被單一服務綁住？",
          "隱私邊界：哪些檔案、提示、檢索片段與模型呼叫會離開電腦？",
          "Agent 互通：同一份知識能否供實際使用的 Claude Code、Codex、Cursor 或 ChatGPT 讀取？",
          "輸入限制：真正支援哪些格式、掃描文件、資料夾、vault 與檔案大小？",
          "可重複驗收：工具能否處理可回答、不可回答、跨來源三種問題，並在來源修改後得到正確結果？",
        ],
      },
      {
        heading: "一組能揭露問題的驗收資料",
        body: [
          "不要一開始匯入整個資料庫。準備一份乾淨來源、一份過期版本、一組互相矛盾的說法，以及一個資料中沒有答案的問題。好的工具應該暴露不確定性和衝突，而不是只產生流暢文字。",
          "修改其中一份來源後重跑相同問題。若答案不會顯示過期、引用仍指向舊內容，或無法判斷哪些頁面需要更新，這套系統就還不適合承擔長期知識。",
        ],
      },
      {
        heading: "Wenlan 適合哪一種模式",
        body: [
          "Wenlan 對應維護型、具來源的本地知識層。Sources、原子知識與 Pages 分開保存；Claude Code、Codex、Cursor、ChatGPT 等客戶端透過 plugin 或 MCP 使用同一套知識；引用、過期狀態、修訂與人工審查保持可見。",
          "完成平台與客戶端設定後，可用一個小型來源集驗證，而不是只相信產品描述。",
        ],
        code: {
          label: "Wenlan 驗證流程",
          code: "wenlan status\nwenlan sources add ~/Knowledge/evaluation-set\n/distill <測試主題>\n/pages <測試主題>\n/lint\n/curate",
        },
      },
      {
        heading: "何時不該增加另一套知識庫",
        body: [
          "如果只是讀一份短文件、現有 wiki 已由團隊穩定維護，或 AI 不需要跨會話重用答案，直接文件閱讀或目前的筆記工具可能已經足夠。",
          "選擇的標準不是功能最多，而是以最低維護成本通過你的來源、更新、衝突、隱私與可重複驗收。",
        ],
      },
    ],
    faqs: [
      {
        question: "最好的 AI 知識庫一定是 RAG 工具嗎？",
        answer:
          "不一定。RAG 很適合在提問時找來源片段，但有些需求只要臨時讀文件，另一些則需要跨會話維護可審查、可重用的答案。",
      },
      {
        question: "測試時應該匯入全部資料嗎？",
        answer:
          "不用。先用包含乾淨來源、過期版本、衝突與無答案問題的小型資料集。工具通過後再逐步擴大。",
      },
      {
        question: "開源就代表資料一定不會離開本機嗎？",
        answer:
          "不代表。仍要檢查儲存位置、模型供應商、embedding 與 reranking 呼叫，以及遠端同步或遙測設定。",
      },
    ],
    relatedSlugs: [
      "coding-agent-source-backed-knowledge-base",
      "build-local-ai-knowledge-base-from-documents",
      "source-backed-wiki-pages-ai-work",
      "distilled-wiki-pages-ai-memory",
      "verify-ai-knowledge-base-citations",
    ],
    officialReferences: [
      {
        label: "Wenlan 知識模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 支援的文件來源",
        href: "https://github.com/7xuanlu/wenlan#what-can-i-bring-in",
      },
      {
        label: "Wenlan MCP 客戶端",
        href: "https://wenlan.app/docs/mcp-clients",
      },
      {
        label: "Wenlan 審查與信任",
        href: "https://wenlan.app/docs/review-and-trust",
      },
      {
        label: "Wenlan 資料與隱私",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    cta: {
      heading: "用同一套 8 項檢查測試 Wenlan",
      body: "從一組小型來源開始，驗證引用、更新與審查，再判斷維護型本地知識層是否適合你的工作流。",
    },
  },
  "verify-ai-knowledge-base-citations": {
    slug: "verify-ai-knowledge-base-citations",
    eyebrow: "引用除錯",
    category: "Workflows",
    title: "AI 知識庫引用對不上？逐項驗證來源與無依據回答",
    description:
      "把 RAG 或 AI 知識庫回答拆成可檢查主張，找出錯頁、錯片段、過期來源與沒有證據支持的結論。",
    metaTitle: "AI 知識庫引用對不上？驗證來源與回答 | Wenlan",
    metaDescription:
      "逐項驗證 AI 知識庫引用，診斷錯頁、錯片段、過期版本與無依據回答，並建立可重複的來源檢查流程。",
    keywords: [
      "AI 知識庫引用對不上",
      "驗證 AI 知識庫引用",
      "AI 知識庫回答沒有依據",
      "RAG 引用錯誤",
      "引用來源可追溯",
      "AI 知識庫來源驗證",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    author: "Qi-Xuan Lu",
    readingTime: "7 分鐘閱讀",
    audience: "看到 AI 回答附了引用，卻發現頁碼、片段、版本或內容對不上的繁體中文使用者",
    heroBullets: [
      "有引用標記，只代表系統附上來源，不代表來源真的支持這句話。",
      "每個重要主張都要回到確切頁面、片段與文件版本檢查。",
      "檢查結果分成支持、部分支持、無依據與過期，不用一個模糊分數帶過。",
    ],
    sections: [
      {
        heading: "先回答：引用存在，不等於回答有依據",
        body: [
          "驗證 AI 知識庫回答時，先把文字拆成可單獨判斷的事實主張，再逐項打開它引用的頁面或片段。只有目前版本的來源完整支持主張的內容、範圍、數字與歸屬，這一項才算通過。",
          "如果引用打不開、指向錯頁、只支持半句、引用的是舊版本，或來源根本沒說這件事，就要分別記錄。不要因為回答讀起來合理，或頁尾列了三個來源，就把它當成已驗證。",
        ],
      },
      {
        heading: "先分清楚五種引用失敗",
        body: [
          "缺少引用、連結失效、引用錯頁、來源不支持主張，以及來源已過期，是五個不同問題。分類正確，才知道應該修檢索、metadata、文件版本，還是直接撤回結論。",
        ],
        bullets: [
          "缺少：重要事實沒有任何可檢查來源。",
          "失效：source ID、連結、頁碼或片段已無法開啟。",
          "錯配：來源存在，但指向另一頁、另一段或另一個主張。",
          "無依據：來源內容沒有支持回答所下的結論。",
          "過期：舊版本曾支持，但目前文件、程式或政策已改變。",
        ],
      },
      {
        heading: "逐項做 claim-to-evidence 檢查",
        body: [
          "從一個可疑回答開始，替每個事實主張記下引用標記、source ID、文件名稱、頁碼或段落，以及能取得的版本。打開原文後，判斷它是完整支持、部分支持、無依據或過期。",
          "數字、否定詞、適用範圍、作者歸屬與日期要分開檢查。相鄰段落看起來很像，也可能剛好否定回答；缺資料時應標示未知，不能把 unavailable 當成通過。",
        ],
        code: {
          label: "檢查一個 Wenlan Page",
          code: "/pages <主題>\n/lint\n/curate",
        },
      },
      {
        heading: "修正後要用同一個問題重測",
        body: [
          "找到錯頁或無依據主張後，先修正來源 metadata、刪除錯誤結論，或把 Page 標記為需要刷新與審查。接著用同一個問題重跑，確認答案回到預期來源，而不是換一個看似合理的錯誤片段。",
          "Wenlan 會把 Sources、原子知識與維護型 Pages 分開，並提供 source IDs、修訂、stale 狀態、lint 與人工審查；這讓證據路徑可檢查，但不會自動保證來源本身正確。",
        ],
      },
      {
        heading: "這不是自動化真實性分數",
        body: [
          "這套方法是可重複的除錯清單，不是宣稱一個分數就能證明整套 RAG 正確。高風險結論仍要回到目前的第一方來源，必要時由熟悉領域的人審查。",
          "即使不使用 Wenlan，也可以用相同表格記錄 claim、來源位置、版本、判定與修正結果；它的獨立價值在於讓『哪一句沒有依據』變得具體。",
        ],
      },
    ],
    faqs: [
      {
        question: "回答有引用，就代表沒有幻覺嗎？",
        answer:
          "不代表。引用可能指向錯頁、錯片段、舊版本，或只支持部分內容；每個重要主張仍需對照原文。",
      },
      {
        question: "引用頁面不對時應該怎麼修？",
        answer:
          "先記錄為引用錯配，再尋找真正支持主張的目前來源。找不到就撤回或標示未知，不要因為回答聽起來合理而保留。",
      },
      {
        question: "Wenlan 能自動證明來源一定正確嗎？",
        answer:
          "不能。Wenlan 讓來源、source IDs、修訂與審查可見，但來源的權威性與重要結論仍需人工判斷。",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "choose-ai-knowledge-base-tool",
      "distilled-wiki-pages-ai-memory",
      "coding-agent-source-backed-knowledge-base",
    ],
    officialReferences: [
      {
        label: "Anthropic 繁體中文引用文件",
        href: "https://platform.claude.com/docs/zh-TW/build-with-claude/citations",
      },
      {
        label: "Open WebUI 引用錯誤來源 issue",
        href: "https://github.com/open-webui/open-webui/issues/12655",
      },
      {
        label: "Open WebUI 重複片段引用 issue",
        href: "https://github.com/open-webui/open-webui/issues/20435",
      },
      {
        label: "Wenlan 審查與信任",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "先驗證一個回答，再擴大知識庫",
      body: "用 Wenlan 打開 Page、來源、過期狀態、lint 與審查路徑，只保留目前證據真的支持的主張。",
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
    updatedAt: "2026-08-12",
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
        heading: "一份最小可用的 LLM Wiki Schema",
        body: [
          "让固定加载的契约保持精简。CLAUDE.md 或 AGENTS.md 只需说明知识库的用途、不可静默改变的边界，以及需要时才按需加载的操作流程；不要把整个 wiki 或所有维护指令都塞进每次 context。",
          "这是工具无关的信息与维护契约，不强迫特定文件夹或产品存储格式；可以调整名称，但每个边界都应该能够检查。",
        ],
        bullets: [
          "用途与范围：哪些重复问题或决策属于这个 wiki，哪些不属于。",
          "不可变来源边界：原始证据放在哪里，以及自动化绝不能改写哪些文件。",
          "页面所有权：哪些页面由机器维护、人拥有，或只能通过审核修改。",
          "命名与链接规则：稳定主题、别名、页面链接和最小 routing index。",
          "引用要求：重要说法必须能够回到可检查来源。",
          "Ingest、Query、Lint 与维护记录：分开按需加载的流程，加上 append-only 变更记录。",
          "过期与审核行为：来源改变、证据冲突或人拥有文字时要如何处理。",
        ],
        code: {
          label: "精简 client 契约",
          code: [
            "# LLM Wiki",
            "用途：<这个 wiki 维护的重复决策>",
            "来源：<不可变来源边界>",
            "页面：<所有权、命名、链接、引用>",
            "索引：<最小主题路由；页面按需加载>",
            "流程：ingest | query | lint | review",
            "记录：<append-only 维护记录>",
            "过期规则：<来源改变 -> stale 或 review>",
          ].join("\n"),
        },
      },
      {
        heading: "正式使用前的最小验收测试",
        body: [
          "文件存在不代表 template 已经可用。先用一个无风险主题做端到端测试，而且必须包含一次来源变更，再导入私人或重要资料。",
          "这套验收可用于文件夹加 prompt、Obsidian 工作流或专门的 LLM Wiki 工具；预期结果是人能检查的证据，不只是一段流畅回答。",
        ],
        bullets: [
          "导入一份无风险来源，确认原始内容没有被改写。",
          "回答一个问题，并为重要说法引用来源。",
          "运行 lint，确认缺失引用、断链或重复能够被看见。",
          "修改来源，再问一次相同问题。",
          "确认旧答案进入 stale 或 review，而不是被静默覆盖。",
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
          "Wenlan 不要求用户自定义 Page schema。typed Memory fields 与内置 Page 规则已经管理来源、引用、刷新、所有权和审核；上面的 starter schema 是可移植的 client 与流程验收契约。",
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
        label: "jackwener LLM Wiki 实现",
        href: "https://github.com/jackwener/llm-wiki",
      },
      {
        label: "LLM Wiki CLAUDE.md template",
        href: "https://hjarni.com/blog/llm-wiki-claude-md-template",
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
      "coding-agent-source-backed-knowledge-base",
      "wenlan-vs-obsidian-ai-memory",
      "distilled-wiki-pages-ai-memory",
      "verify-ai-knowledge-base-citations",
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
  "coding-agent-source-backed-knowledge-base": {
    slug: "coding-agent-source-backed-knowledge-base",
    eyebrow: "Coding agent 知识",
    category: "Workflows",
    title: "如何让 Codex 使用有来源的项目知识库",
    description:
      "让 AGENTS.md、源代码与文档、维护型知识页面分工，使 Codex 按需获取有来源、可审核的项目知识。",
    metaTitle: "Codex 有来源项目知识库工作流 | Wenlan",
    metaDescription:
      "用 AGENTS.md、项目文档、引用、按需检索与验证，为 Codex、Claude Code 或其他 coding agent 建立有来源的项目知识库。",
    keywords: [
      "Codex 知识库",
      "Codex 项目知识",
      "code agent 知识库",
      "coding agent 知识库",
      "AI agent 项目知识库",
      "AGENTS.md 知识库",
      "Claude Code 知识库",
      "有来源的项目知识库",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    author: "Qi-Xuan Lu",
    readingTime: "8 分钟阅读",
    audience: "希望 Codex、Claude Code 或其他 coding agent 能复用可信项目知识的开发者",
    heroBullets: [
      "AGENTS.md 或 CLAUDE.md 只放每次都必须加载的短规则。",
      "代码、测试、规范与第一方文档继续作为单一事实来源。",
      "维护型知识页面只保存需要跨文件整理、有引用并反复复用的结论。",
    ],
    sections: [
      {
        heading: "一句话做法",
        body: [
          "把 coding agent 的项目知识分成三层：AGENTS.md 或 CLAUDE.md 放短而稳定的操作规则；代码、测试、规范与文档保留为单一事实来源；有来源的知识库保存需要跨文件整理、引用与审核的当前答案。",
          "Agent 接到任务时先读最小规则，再按问题获取一个相关 Page，最后回到引用、代码与测试验证。这比把全部内容塞进 instruction file，或每次重扫整个 repo 更容易保持当前与可检查。",
        ],
      },
      {
        heading: "AGENTS.md、CLAUDE.md 与知识库各做什么",
        body: [
          "AGENTS.md 适合放 build、test、branch、权限与禁区等 agent 无法只靠读 code 推出的规则；Claude Code 用户可用 CLAUDE.md 表达同一类项目指引。文件越长，越容易挤掉当前任务真正需要的 context。",
          "知识库不应复制 repo。架构理由、外部限制、跨文件结论、决策历史与已验证的操作手册，才适合维护成有引用的 Page。代码与测试一旦改变，Page 应进入 stale 或 review，而不是继续假装正确。",
        ],
        bullets: [
          "每次加载：不明显的项目规则与安全边界。",
          "单一事实来源：当前代码、测试、规范与第一方文档。",
          "按需知识：有来源、可审核、需要跨会话复用的结论。",
        ],
      },
      {
        heading: "建立 coding agent 可用的有来源工作流",
        body: [
          "先选一个会重复询问的小主题，例如 release 流程或数据迁移边界。完成 Wenlan 与 Codex 连接后，只加入能回答该主题的 Markdown、文本或可提取文字的 PDF；不要一开始导入整个 repository。",
          "把来源蒸馏成 Page 后，检查重要说法能回到来源，再运行 lint 与 review。只有 MCP 连接的 client 应使用该 client 显示的 Wenlan tools；下列 slash commands 适用于已安装 Wenlan plugin 的 client。",
        ],
        code: {
          label: "一个有界的 Codex 项目知识流程",
          code: "wenlan status\nwenlan connect codex\nwenlan sources add ~/project/docs\n/distill <项目主题>\n/pages <项目主题>\n/lint\n/curate",
        },
      },
      {
        heading: "每次任务只获取足够的 context",
        body: [
          "不要在每次 session 开始时重放全部文档。先用任务名称、错误症状或模块查询最相关的 Page，再沿引用打开真正需要的来源。如果答案直接存在当前 code 或 test，就让 agent 读原文件，不要多绕一层摘要。",
          "任务结束时只保存能影响未来工作的决策、限制、修正或交接。聊天摘要、临时探索与 agent 自己可以从 repo 推出的内容，不应自动升级为项目知识。",
        ],
      },
      {
        heading: "如何验证引用与不支持的答案",
        body: [
          "准备一个来源中有答案的问题、一个必须跨两份文档才能回答的问题，以及一个来源没有答案的问题。前两者应显示支持材料；最后一个应保持未知，不应因为文字流畅就补成确定结论。",
          "修改其中一份来源并重新同步，再确认受影响 Page 能被标成需要刷新或产生可审核修订。这个 acceptance test 比『agent 看起来记得』更能证明知识库有用。",
        ],
      },
      {
        heading: "什么时候不需要另一套知识库",
        body: [
          "如果信息已在一份短而当前的 README、规范或测试里，coding agent 直接读来源通常更准。只有当同一问题跨多个来源、反复出现，且重建答案的成本明显时，才值得维护额外的 source-backed Page。",
          "这条边界即使不使用 Wenlan 也成立：先维护权威来源，再决定哪些结论值得做成可查询、可引用、可刷新的项目知识。",
        ],
      },
    ],
    faqs: [
      {
        question: "AGENTS.md 应该放完整项目知识吗？",
        answer:
          "不应该。它只需放 agent 每次都要知道、又无法从 repo 自己推出的规则。较长的架构说明、决策与外部限制应留在权威文档或按需知识页面。",
      },
      {
        question: "知识库可以取代代码与测试吗？",
        answer:
          "不可以。代码、测试、规范与批准的第一方文档仍是权威；知识页面应保留引用，并在来源变化时进入 stale、refresh 或 review。",
      },
      {
        question: "Claude Code 也能用同一套方法吗？",
        answer:
          "可以。工具的命令入口不同，但短规则、权威来源、按需 Page、引用与验证的分层相同；Wenlan 也能让多个已连接 client 使用同一套本地知识。",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "build-local-ai-knowledge-base-from-documents",
      "choose-ai-knowledge-base-tool",
      "distilled-wiki-pages-ai-memory",
    ],
    officialReferences: [
      {
        label: "OpenAI harness engineering",
        href: "https://openai.com/index/harness-engineering/",
      },
      {
        label: "AGENTS.md 开放格式",
        href: "https://agents.md/",
      },
      {
        label: "Wenlan 与 AI client 设置",
        href: "https://github.com/7xuanlu/wenlan/blob/main/docs/setup-with-ai.md",
      },
      {
        label: "Wenlan 有来源 Pages",
        href: "https://wenlan.app/docs/source-backed-pages",
      },
      {
        label: "Wenlan 审核与信任",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "先让 Codex 验证一个项目主题",
      body: "连接 Codex、加入一组可检查来源，再确认 Page 的引用、刷新与审核都从属于当前 repo。",
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
      "coding-agent-source-backed-knowledge-base",
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
  "choose-ai-knowledge-base-tool": {
    slug: "choose-ai-knowledge-base-tool",
    eyebrow: "选型指南",
    category: "Workflows",
    title: "如何选 AI 知识库工具：8 个真正重要的检查",
    description:
      "先分清文档问答、RAG、笔记工具与维护型知识库，再用来源、更新、审核、数据控制与实测结果选择工具。",
    metaTitle: "如何选 AI 知识库工具：8 个检查 | Wenlan",
    metaDescription:
      "用 8 个实际测试选择 AI 知识库工具，比较文档问答、RAG、本地笔记与跨 AI agent 维护知识的区别。",
    keywords: [
      "AI 知识库工具",
      "AI 知识库软件推荐",
      "如何选 AI 知识库",
      "本地 AI 知识库工具",
      "开源 AI 知识库",
      "AI agent 知识库",
      "AI 知识库比较",
      "Wenlan 文澜",
    ],
    publishedAt: "2026-08-02",
    updatedAt: "2026-08-02",
    author: "Qi-Xuan Lu",
    readingTime: "8 分钟阅读",
    audience: "正在选择文档问答、RAG、本地笔记或跨 AI agent 知识系统的简体中文用户",
    heroBullets: [
      "先选运行模式，再比较功能列表。",
      "用来源变化与冲突测试答案是否仍可追溯、可更新。",
      "用自己的小型文档集对每个候选工具执行同一套验收。",
    ],
    sections: [
      {
        heading: "先分清你需要哪一种 AI 知识库",
        body: [
          "不要先问哪个工具最好。先判断需要的是当次会话的文档上传、针对一组文档的 RAG 问答、让 AI 直接读取笔记或 Markdown vault，还是跨会话与多个 agent 维护有来源的当前答案。",
          "这四种模式可以组合，但解决的问题不同。把它们放在同一张功能表比较，通常会选到不符合实际工作方式的产品。",
        ],
      },
      {
        heading: "8 个真正重要的检查",
        body: ["用一小组有代表性的文档，先写下预期答案，再对每个候选工具做相同测试。"],
        bullets: [
          "来源可追溯：重要答案能否打开支持它的确切来源或引用？",
          "更新状态：来源变化后，哪些答案过期、哪些需要刷新是否看得见？",
          "冲突与审核：矛盾证据会进入明确审核，还是被模型静默改写？",
          "数据所有权与导出：能否保留或导出可读文件与历史，不被单一服务绑定？",
          "隐私边界：哪些文件、提示、检索片段与模型调用会离开电脑？",
          "Agent 互通：同一份知识能否供实际使用的 Claude Code、Codex、Cursor 或 ChatGPT 读取？",
          "输入限制：真正支持哪些格式、扫描文档、文件夹、vault 与文件大小？",
          "可重复验收：工具能否处理可回答、不可回答、跨来源三种问题，并在来源修改后得到正确结果？",
        ],
      },
      {
        heading: "一组能暴露问题的验收资料",
        body: [
          "不要一开始导入整个资料库。准备一份干净来源、一份过期版本、一组互相矛盾的说法，以及一个资料中没有答案的问题。好的工具应该暴露不确定性和冲突，而不是只生成流畅文字。",
          "修改其中一份来源后重跑相同问题。如果答案不会显示过期、引用仍指向旧内容，或无法判断哪些页面需要更新，这套系统就还不适合承担长期知识。",
        ],
      },
      {
        heading: "Wenlan 适合哪一种模式",
        body: [
          "Wenlan 对应维护型、有来源的本地知识层。Sources、原子知识与 Pages 分开保存；Claude Code、Codex、Cursor、ChatGPT 等客户端通过 plugin 或 MCP 使用同一套知识；引用、过期状态、修订与人工审核保持可见。",
          "完成平台与客户端设置后，可以用一个小型来源集验证，而不是只相信产品描述。",
        ],
        code: {
          label: "Wenlan 验证流程",
          code: "wenlan status\nwenlan sources add ~/Knowledge/evaluation-set\n/distill <测试主题>\n/pages <测试主题>\n/lint\n/curate",
        },
      },
      {
        heading: "什么时候不该增加另一套知识库",
        body: [
          "如果只是阅读一份短文档、现有 wiki 已由团队稳定维护，或 AI 不需要跨会话复用答案，直接文档阅读或当前笔记工具可能已经足够。",
          "选择标准不是功能最多，而是以最低维护成本通过你的来源、更新、冲突、隐私与可重复验收。",
        ],
      },
    ],
    faqs: [
      {
        question: "最好的 AI 知识库一定是 RAG 工具吗？",
        answer:
          "不一定。RAG 很适合在提问时找来源片段，但有些需求只要临时读文档，另一些则需要跨会话维护可审核、可复用的答案。",
      },
      {
        question: "测试时应该导入全部资料吗？",
        answer:
          "不用。先用包含干净来源、过期版本、冲突与无答案问题的小型资料集。工具通过后再逐步扩大。",
      },
      {
        question: "开源就代表数据一定不会离开本机吗？",
        answer:
          "不代表。仍要检查存储位置、模型提供方、embedding 与 reranking 调用，以及远程同步或遥测设置。",
      },
    ],
    relatedSlugs: [
      "coding-agent-source-backed-knowledge-base",
      "build-local-ai-knowledge-base-from-documents",
      "source-backed-wiki-pages-ai-work",
      "distilled-wiki-pages-ai-memory",
      "verify-ai-knowledge-base-citations",
    ],
    officialReferences: [
      {
        label: "Wenlan 知识模型",
        href: "https://github.com/7xuanlu/wenlan#what-does-wenlan-build",
      },
      {
        label: "Wenlan 支持的文档来源",
        href: "https://github.com/7xuanlu/wenlan#what-can-i-bring-in",
      },
      {
        label: "Wenlan MCP 客户端",
        href: "https://wenlan.app/docs/mcp-clients",
      },
      {
        label: "Wenlan 审核与信任",
        href: "https://wenlan.app/docs/review-and-trust",
      },
      {
        label: "Wenlan 数据与隐私",
        href: "https://wenlan.app/docs/data-and-privacy",
      },
    ],
    cta: {
      heading: "用同一套 8 项检查测试 Wenlan",
      body: "从一组小型来源开始，验证引用、更新与审核，再判断维护型本地知识层是否适合你的工作流。",
    },
  },
  "verify-ai-knowledge-base-citations": {
    slug: "verify-ai-knowledge-base-citations",
    eyebrow: "引用排错",
    category: "Workflows",
    title: "AI 知识库引用对不上？逐项验证来源与无依据回答",
    description:
      "把 RAG 或 AI 知识库回答拆成可检查的主张，找出错页、错片段、过期来源与没有证据支持的结论。",
    metaTitle: "AI 知识库引用对不上？验证来源与回答 | Wenlan",
    metaDescription:
      "逐项验证 AI 知识库引用，诊断错页、错片段、过期版本与无依据回答，并建立可重复的来源检查流程。",
    keywords: [
      "AI 知识库引用对不上",
      "验证 AI 知识库引用",
      "知识库回答无依据",
      "RAG 引用错误",
      "引用溯源",
      "AI 知识库来源校验",
    ],
    publishedAt: "2026-08-23",
    updatedAt: "2026-08-23",
    author: "Qi-Xuan Lu",
    readingTime: "7 分钟阅读",
    audience: "看到 AI 回答附了引用，却发现页码、片段、版本或内容对不上的简体中文用户",
    heroBullets: [
      "有引用标记，只代表系统附上来源，不代表来源真的支持这句话。",
      "每个重要主张都要回到准确页面、片段与文档版本检查。",
      "检查结果分成支持、部分支持、无依据与过期，不用一个模糊分数带过。",
    ],
    sections: [
      {
        heading: "先说结论：引用存在，不等于回答有依据",
        body: [
          "验证 AI 知识库回答时，先把文字拆成可单独判断的事实主张，再逐项打开它引用的页面或片段。只有当前版本的来源完整支持主张的内容、范围、数字与归属，这一项才算通过。",
          "如果引用打不开、指向错页、只支持半句话、引用的是旧版本，或来源根本没说这件事，就要分别记录。不要因为回答读起来合理，或页尾列了三个来源，就把它当成已验证。",
        ],
      },
      {
        heading: "先分清五种引用失败",
        body: [
          "缺少引用、链接失效、引用错页、来源不支持主张，以及来源已过期，是五个不同问题。分类正确，才知道应该修检索、metadata、文档版本，还是直接撤回结论。",
        ],
        bullets: [
          "缺少：重要事实没有任何可检查来源。",
          "失效：source ID、链接、页码或片段已经无法打开。",
          "错配：来源存在，但指向另一页、另一段或另一个主张。",
          "无依据：来源内容没有支持回答得出的结论。",
          "过期：旧版本曾支持，但当前文档、代码或政策已经变化。",
        ],
      },
      {
        heading: "逐项做 claim-to-evidence 校验",
        body: [
          "从一个可疑回答开始，为每个事实主张记录引用标记、source ID、文档名称、页码或段落，以及能取得的版本。打开原文后，判断它是完整支持、部分支持、无依据还是过期。",
          "数字、否定词、适用范围、作者归属与日期要分开检查。相邻段落看起来很像，也可能正好否定回答；缺数据时应标记未知，不能把 unavailable 当成通过。",
        ],
        code: {
          label: "检查一个 Wenlan Page",
          code: "/pages <主题>\n/lint\n/curate",
        },
      },
      {
        heading: "修正后用同一个问题重测",
        body: [
          "找到错页或无依据主张后，先修正来源 metadata、删除错误结论，或把 Page 标记为需要刷新与审核。接着用同一个问题重跑，确认答案回到预期来源，而不是换一个看似合理的错误片段。",
          "Wenlan 把 Sources、原子知识与维护型 Pages 分开，并提供 source IDs、修订、stale 状态、lint 与人工审核；这让证据路径可检查，但不会自动保证来源本身正确。",
        ],
      },
      {
        heading: "这不是自动化真实性分数",
        body: [
          "这套方法是可重复的排错清单，不是宣称一个分数就能证明整套 RAG 正确。高风险结论仍要回到当前第一方来源，必要时由熟悉领域的人审核。",
          "即使不使用 Wenlan，也可以用同一张表记录 claim、来源位置、版本、判定与修正结果；它的独立价值在于让『哪一句没有依据』变得具体。",
        ],
      },
    ],
    faqs: [
      {
        question: "回答有引用，就代表没有幻觉吗？",
        answer:
          "不代表。引用可能指向错页、错片段、旧版本，或只支持部分内容；每个重要主张仍需对照原文。",
      },
      {
        question: "引用页面不对时应该怎么修？",
        answer:
          "先记录为引用错配，再寻找真正支持主张的当前来源。找不到就撤回或标记未知，不要因为回答听起来合理而保留。",
      },
      {
        question: "Wenlan 能自动证明来源一定正确吗？",
        answer:
          "不能。Wenlan 让来源、source IDs、修订与审核可见，但来源的权威性与重要结论仍需人工判断。",
      },
    ],
    relatedSlugs: [
      "source-backed-wiki-pages-ai-work",
      "choose-ai-knowledge-base-tool",
      "distilled-wiki-pages-ai-memory",
      "coding-agent-source-backed-knowledge-base",
    ],
    officialReferences: [
      {
        label: "Anthropic 简体中文引用文档",
        href: "https://platform.claude.com/docs/zh-CN/build-with-claude/citations",
      },
      {
        label: "Open WebUI 引用错误来源 issue",
        href: "https://github.com/open-webui/open-webui/issues/12655",
      },
      {
        label: "Open WebUI 重复片段引用 issue",
        href: "https://github.com/open-webui/open-webui/issues/20435",
      },
      {
        label: "Wenlan 审核与信任",
        href: "https://wenlan.app/docs/review-and-trust",
      },
    ],
    cta: {
      heading: "先验证一个回答，再扩大知识库",
      body: "用 Wenlan 打开 Page、来源、过期状态、lint 与审核路径，只保留当前证据真正支持的主张。",
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
