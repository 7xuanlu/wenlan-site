# SEO 目前決策與下一步

更新：2026-10-07。#220 已合併 19 篇英文重複頁至既有 owner，154 個 sitemap URL；[發布及抓取請求收據](seo-audits/2026-10-07-learn-consolidation.md) 取代舊 inventory。只保留目前決定與下一個觀察；替換舊狀態，不追加日誌。
規則見 [操作入口](seo-growth-loop.md)、[共用需求流程](seo-demand-workflow.md)。

## 當前決策

**先增加相關搜尋的曝光與點擊。** 對同一搜尋詞比較競爭頁、抓取狀態與外部引用；完整產品價值對照不是排名診斷的前置條件。入口不限 Obsidian，也包括 Claude Code、Codex、Notion、Wiki 與個人文件任務；工具名稱不是需求證據。

| 工作 | 已知證據與限制 | 下一步 |
| --- | --- | --- |
| EN LLM Wiki | 09-09～10-06，精確 `karpathy llm wiki` 8 次曝光、0 點擊、位置 22.125；v2 詞 3／0、15.33；10-06 改版後 crawl 未確認 | 優先觀察新版 crawl、同詞排名與點擊；hold 再重寫 |
| 繁中 Wiki | 台灣市場有需求；本站「如何使用」僅 1 次可見曝光 | 沿用 owner，核對新版 crawl 與樣本，不承諾前五 |
| Obsidian + Claude Code | US Planner 1K–10K／月；EN owner 11 page 曝光、0 點擊、平均 7.4，但無可見精確詞 joined row | 市場需求成立，本站該詞排名未知；查新版 crawl，不拿 page 平均當詞排名 |
| 中文個人知識庫 | 泛「搭建」混企業 RAG；本輪 Planner 已補：`个人知识库搭建`10–100、台灣`個人知識庫`10–100／月 | 補可照做範例；觀察相應詞是否開始展示本站 |
| Claude／Codex／MCP memory | 新 US Planner：Claude1K–10K、Codex100–1K、MCP10–100／月；GSC仍稀少或缺列 | 保留正確教學；按任務匹配與本站曝光判斷優先序 |
| source-backed wiki | 泛 `knowledge base wiki` 26 次曝光、平均 78.62；SERP 偏團隊選型 | 不硬爭錯誤意圖，不因低 CTR 自動改標題 |
| 獨立引用 | GSC Links 樣本：英文 Wiki 5 條中 4 條自有 README、1 條 npm.io；未見獨立評測直接引用 | 研究相關指南與實作者的引用理由；不以目錄數量或自有連結代替權威 |

資料窗口、地域、159 詞逐詞決定及排除原因見 [三語需求實測](seo-audits/2026-10-07-trilingual-demand-workflow.md)。
[排名缺口核對](seo-audits/2026-10-07-ranking-gap.md) 保存 16 組查詢、43 個外部頁身／節錄比較、Links 與逐頁審查。未隔離各因素對排名的因果貢獻。

## 最近五組改寫與本地修正

#213～#217 是 5 組、8 個 URL。[獨立審查](seo-audits/2026-10-07-ranking-gap.md#五組改寫與核心頁獨立審查) 判定 Claude／Codex 指南基本可用；MCP 缺建資料夾與共檔並發限制；Obsidian 三語過度否定原生記憶；中文知識庫缺完整小例子。

使用者已授權本地修正上述具體問題與補中文例子。範例是兩份虛構筆記的讀取、回答、檔名核對與未知資訊處理，**不是產品實測或搜尋需求證明**。修正與驗收收據見同一份審查；其他文章不另開泛文。正式 Claude 與中文知識庫部分內容比本地 HEAD 新；發布前必須對齊，不能覆蓋已部署修正。

Wiki、來源型知識庫、工具選型頁已存在，分別作實作入口、維護方法與選型決策。是否寫對、是否有人搜、是否有機會排上去分開驗證。每次選題保留「原始搜尋詞 → 使用者任務 → 頁面答案 → 本站同詞曝光／位置／點擊」；缺證據明記未知。

## 下一個觀察與邊界

目前 `weekly-wenlan-seo` 排程為 PAUSED（本輪唯讀核對），因此下列週期是操作方式，不代表會自動執行；未擅自恢復排程。

- **抓取與排名：** #217 的 EN／TW／CN 已部署新版標題與正文；最新已讀 crawl 為 08-19／08-01／10-02，均早於 10-06 改寫。按實際新版 crawl 與原契約門檻排讀數，不預造日期；#217 當時例外來源未核實，不追認或逕稱違規。見 [重跑收據](seo-audits/2026-10-07-shared-workflow-rerun.md)。
- **需求：** 搜尋建議提供用語，社群提供痛點，Planner 提供市場量級，GSC 提供本站表現；不可互換。Ubersuggest 本日免費額度耗盡，不重試；舊 50 量值與新 Planner 範圍不可直接比較。Keyword Tool 無量值，不足以單獨驗證獲客需求。
- **外部觸達：** MindStudio 指南被另一篇文章列來源，Salesforce 指南有分享與彙整引用，但未取得完整反向連結或排名因果證據。README 三語補丁仍未發布，自有導流不等於獨立引用；Awesome LLM Wiki 已列 Wenlan，不重複投稿。
- **共用流程：** Claude 已同意且成功載入共用 skill；Codex 已重跑資料／備援。協作證據見重跑收據及 [連續性規則](seo-demand-workflow.md#claude-and-codex-continuity)。此次隨修正一起交付共用流程／skill；其他 checkout 需同步合併版本。
- **效果：** GA4 2 views／1 active user 與驗收路徑相符，不算自然獲客。来源／stale 訊號不證明語義正確或勝過 plain files。只有新增省時、正確性或跨工具主張時，才啟動相應產品對照。

使用者已批准本輪網站修正的 commit、push、PR、merge、部署與唯讀驗收；索引提交、站外聯絡／投稿、付費及新 campaign 目標不在本次授權內。

## 按需回查

[09-04 診斷](seo-audits/2026-09-04-seo-growth-diagnosis.md) · [09-08 基線](seo-audits/2026-09-08-core-acquisition-baseline.md) · [基線修正](seo-audits/2026-09-08-core-acquisition-correction.md) · [索引請求收據](seo-audits/2026-09-08-core-indexing-requests.md)。舊窗口與請求成功不能替代当前成效或新版抓取證據。
