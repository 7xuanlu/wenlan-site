# SEO 目前決策與下一步

更新：2026-10-08。#223 修正已合併並部署（46566c3）；#220 已合併 19 篇英文重複頁至既有 owner，154 個 sitemap URL；[發布及抓取請求收據](seo-audits/2026-10-07-learn-consolidation.md) 取代舊 inventory。只留目前決定與下一步。
規則見 [操作入口](seo-growth-loop.md)、[共用需求流程](seo-demand-workflow.md)。

## 當前決策

**先增加相關搜尋的曝光與點擊。** 三市場18詞已實查：連接入口100–1K／月；完整「Claude查筆記附來源」三語均0–10，不作主要增長詞。英／簡中原始提問支持查找舊筆記與避免AI補造；保留三語既有頁與本地練習，不另開長問句頁。SEO基礎先排除抓取／索引阻塞，之後和AEO共同改善、分開量測。見[本輪判定](seo-audits/2026-10-07-ranking-gap.md#seoaeo-依存與候選用語實查)。

| 工作 | 已知證據與限制 | 下一步 |
| --- | --- | --- |
| EN LLM Wiki | 09-09～10-06，精確 `karpathy llm wiki` 8 次曝光、0 點擊、位置 22.125；v2 詞 3／0、15.33；10-06 改版後 crawl 未確認 | 優先觀察新版 crawl、同詞排名與點擊；hold 再重寫 |
| 繁中 Wiki | 台灣市場有需求；本站「如何使用」僅 1 次可見曝光 | 沿用 owner，核對新版 crawl 與樣本，不承諾前五 |
| Obsidian + Claude Code | US長詞1K–10K／Planner三月−90%，短詞0%；EN owner 11 page曝光／0點擊，無精確詞joined row | 三語完整練習／答案範例已修，前段與練習後明示 Obsidian 可接 Wenlan；Opus 5.5 複審及12組畫面檢查通過，10/08已獲本版發布授權，補手機跳轉與頁尾引導後發布；後續手動核對crawl與成效 |
| 中文個人知識庫 | 泛「搭建」混企業 RAG；本輪 Planner 已補：`个人知识库搭建`10–100、台灣`個人知識庫`10–100／月 | 範例已發布；觀察相應詞是否開始展示本站 |
| Claude／Codex／MCP memory | 新 US Planner：Claude1K–10K、Codex100–1K、MCP10–100／月；GSC仍稀少或缺列 | 保留正確教學；按任務匹配與本站曝光判斷優先序 |
| source-backed wiki | 泛 `knowledge base wiki` 26 次曝光、平均 78.62；SERP 偏團隊選型 | 不硬爭錯誤意圖，不因低 CTR 自動改標題 |
| 獨立引用 | GSC Links 樣本：英文 Wiki 5 條中 4 條自有 README、1 條 npm.io；未見獨立評測直接引用 | 研究相關指南與實作者的引用理由；不以目錄數量或自有連結代替權威 |

資料窗口、地域、159 詞逐詞決定及排除原因見 [三語需求實測](seo-audits/2026-10-07-trilingual-demand-workflow.md)。
[排名缺口核對](seo-audits/2026-10-07-ranking-gap.md) 保存 16 組查詢、43 個外部頁身／節錄比較、Links 與逐頁審查。未隔離各因素對排名的因果貢獻。

## 最近五組改寫與已發布修正

#213～#217 是 5 組、8 個 URL。[獨立審查](seo-audits/2026-10-07-ranking-gap.md#五組改寫與核心頁獨立審查) 判定 Claude／Codex 指南基本可用；MCP 缺建資料夾與共檔並發限制；Obsidian 三語過度否定原生記憶；中文知識庫缺完整小例子。

#223 已發布上述修正、RAG說明與繁簡中文範例，正式站核對通過。兩份虛構筆記示範操作、引用與未知資訊處理，**不是產品優勢或搜尋成效證明**。收據見審查；未證明勝過直接讀檔或外掛。

Wiki、來源型知識庫、工具選型頁已存在，分別作實作入口、維護方法與選型決策。是否寫對、是否有人搜、是否有機會排上去分開驗證。每次選題保留「原始搜尋詞 → 使用者任務 → 頁面答案 → 本站同詞曝光／位置／點擊」；缺證據明記未知。

## 下一個觀察與邊界

使用者確認 `weekly-wenlan-seo` 維持 PAUSED，以下由我們手動追蹤，不自動執行。

- **抓取與排名：** 三語API仍只見08-19／08-01／10-02 crawl，早於改版；09-09～10-06共13曝光、0點擊，query×page無可見列。索引設定／入口正常；#222未含這三頁。使用者要求先優化；三語本地補強已驗證，尚未發布／申請重抓。上線後各請求一次，再手動查crawl。見[複核](seo-audits/2026-10-07-ranking-gap.md#obsidian-新版抓取與頁面表現複核)。
- **需求：** 搜尋建議提供用語，社群提供痛點，Planner 提供市場量級，GSC 提供本站表現；不可互換。Ubersuggest 本日免費額度耗盡，不重試；舊 50 量值與新 Planner 範圍不可直接比較。Keyword Tool 無量值，不足以單獨驗證獲客需求。
- **外部觸達：** MindStudio 指南被另一篇文章列來源，Salesforce 指南有分享與彙整引用，但未取得完整反向連結或排名因果證據。README 三語補丁仍未發布，自有導流不等於獨立引用；Awesome LLM Wiki 已列 Wenlan，不重複投稿。
- **共用流程：** Claude 已同意且成功載入共用 skill；Codex 已重跑資料／備援。協作證據見重跑收據及 [連續性規則](seo-demand-workflow.md#claude-and-codex-continuity)。此次隨修正一起交付共用流程／skill；其他 checkout 需同步合併版本。
- **AI與引用：** 同窗GSC AI報告131次property曝光；有三語頁面，無Obsidian可見列，未知問題／點擊。先沿既有owner量測，不另開prompt清單。Ahrefs的9頁壞連結已核對5個目的地404，待修；description長短警告不等於排名原因。

#223已發布。本輪依新指示完成Obsidian三語本地補強、搜尋文案／英文入口對齊與標題字級／不斷行修正；未發布／提交索引。站外聯絡、付費、新文章與新campaign不在範圍。

## 按需回查

[09-04 診斷](seo-audits/2026-09-04-seo-growth-diagnosis.md) · [09-08 基線](seo-audits/2026-09-08-core-acquisition-baseline.md) · [基線修正](seo-audits/2026-09-08-core-acquisition-correction.md) · [索引請求收據](seo-audits/2026-09-08-core-indexing-requests.md)。舊窗口與請求成功不能替代当前成效或新版抓取證據。
