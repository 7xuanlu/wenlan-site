# 核心獲客：GSC 對帳與方法修正 — 2026-09-08 PDT

狀態：本地量測修復與下一批執行準備。不是排名改善讀取，也不是發布批准。
後續使用者已明確批准本文 7 URL 索引請求，全部 live test 通過並獲接受：
見 [執行收據](2026-09-08-core-indexing-requests.md)。下方「尚未提交」保留為準備當時的狀態。
來源工作狀態：`9948bfac080327d968ec8185b52e52cab14bc20d` 加本輪量測文件／工具修改。
沿用 [122 頁基線](2026-09-08-core-acquisition-baseline.md)，不重跑相同 GSC 窗口。

## 已直接對帳，不只是引用 API

在已登入 GSC 的 `sc-domain:wenlan.app`，選 Web、2026-08-10 至 2026-09-06、
無其他篩選，介面回報 14 clicks、1,270 impressions、平均位置 22.3。
API 的 22.341732283464566 與介面顯示精度一致。

| Exact query | Clicks | Impressions | GSC UI position |
| --- | ---: | ---: | ---: |
| llm wiki | 1 | 15 | 40.4 |
| karpathy llm wiki | 1 | 13 | 51.3 |
| agent knowledge base | 0 | 21 | 67.2 |

使用者原本看到的 27 clicks、2.31K impressions、17.8 position，是三個月選項，
並非這個 28 日窗口。平均位置是有曝光時的平均，不是當下固定 Google 名次。
第一頁的工作目標必須落在特定 query 與實際結果頁；不能靠品牌詞占比增加，
讓全站平均變好就宣布核心任務已進第一頁。

## 修正：Google AI 並非零曝光

本次 GSC 介面已提供 **Generative AI features（Beta）**。同窗口：

- Property：79 impressions。
- Page table：27 rows，合計 85 impressions；不拿 page sum 取代 property。
- EN homepage 18；coding-agent KB 10；EN LLM Wiki 3；CN LLM Wiki 1。
- 本報表未提供 query、click、position 或文字品牌提及；未顯示 AI Overview／
  AI Mode 個別拆分。沒有列出的 URL 不能在工作表補成完整的零需求證據。

[當前官方報表定義](https://support.google.com/webmasters/answer/16984139)
涵蓋 AI Overviews 與 AI Mode 的連結曝光，屬於 Web 報表內的資料，不能另加到
1,270 次 Web 曝光上。官方文件記錄 2026-08-31 全球推出；先前僅依舊版一般
AI 文件與少量回答抽樣，漏掉了這個已可用的原生報表。這是本輪查證修正。

先前 Google／Perplexity 的少量查詢沒有出現 Wenlan，只能描述那些回答。
不能從它們推論整個 Google AI 從未引用本站，也不能把 79 當成 79 次品牌推薦。
這些曝光早於 #182，不能歸功於剛發布的品質修復。

## 工具各自回答什麼

| 工具 | 實際執行 | 可用結論 |
| --- | --- | --- |
| GSC API + UI | 已成功逐項對帳 | 本站 Google 表現的權威來源 |
| GSC AI UI | 已讀取全 27 個 page rows | AI 搜尋連結曝光，不能代替品牌提及抽樣 |
| OpenSEO | 2 個 SERP 請求均因點數不足失敗 | 沒有排名結果；未購買點數 |
| 直接 Google | 2 個 EN SERP／AI Overview 樣本 | 可檢查搜尋意圖、答案與引用對象；受帳號／地區影響 |
| Perplexity | 同任務三語各 1 次 | 探索樣本；有帳號個人化，不是中立推薦率 |
| Ubersuggest | backlinks overview + one-per-domain sample 成功 | 外鏈調查線索，不是 Google 排名或處罰判定 |

Ubersuggest overview 回傳 44 backlinks、9 referring domains、DA 1、follow 0、
nofollow 42；明細實際返回 7 個 domain rows，其中 2 rows 的 nofollow=false。
摘要與明細口徑／索引不同而未對齊，不能說「完全沒有 follow links」。其 DA
也是供應商分數，不是 Google 分數。樣本混有 MCP 目錄、domain discovery、
GitHub mirror 與自動 SEO 商店頁；後者的宣傳 anchor 不是真實用戶證言。
不因此買連結、宣告處罰或提交 disavow。

已直接讀取 [現行 MCP 目錄頁](https://mcpservers.org/servers/7xuanlu/wenlan)：
它已有指向 LLM-wiki implementation guide 的連結。這個觀察也說明第三方
backlink index 會漏頁；「工具沒回傳」不能變成「連結不存在」。它是現有
目錄引用，並非本輪新取得的獨立編輯推薦。

## 三件事一起管理，依序交付

### 1. 相關排名：固定任務與現有 owner

| 搜尋者要完成的事 | 保留 owner | 本輪判斷 |
| --- | --- | --- |
| 理解／實作 LLM Wiki | distilled-wiki-pages-ai-memory | 主力詞已有 GSC clicks；新版先保留，引用完整範例 |
| 建立 agent knowledge base 的整體結構 | source-backed-wiki-pages-ai-work | 已有 broad build 標題与直接答案，不另造同義頁 |
| 匯入 Markdown／PDF／Obsidian | build-local-ai-knowledge-base-from-documents | 專注文件建立步驟 |
| 選擇工具 | choose-ai-knowledge-base-tool | 比較適用條件，不與建庫教程混合 |
| 接入 coding-agent 專案知識 | coding-agent-source-backed-knowledge-base | 已有 10 次 AI 曝光；不把 CLAUDE.md 相容 query 當成泛 KB 需求 |
| 決定 agent 何時檢索 | when-ai-agent-should-query-knowledge-base | 保留 retrieval-policy 任務，不 redirect |

`agent knowledge base` 落到最後一頁是待驗的意圖落差。最小候選不是整頁改写，
而是其開頭附近的任務分流；連到现有 broad owner：

- EN：Building an agent knowledge base? Start with the source-backed knowledge-base guide. This page covers when your agent should retrieve from it.
- zh-TW：正在建立 Agent 知識庫？先看來源型知識庫建立指南。本頁處理的是：知識庫建好後，Agent 何時需要查詢。
- zh-CN：正在建立 Agent 知识库？先看有来源依据的知识库搭建指南。本页讨论的是：知识库建好后，Agent 何时需要查询。

目標分別是三語 `source-backed-wiki-pages-ai-work`。這是具體候選文案，尚未
寫入頁面、未做畫面驗收、未發布；不能當成已完成 SEO 實驗。目前沒有重複
query-owner 的可靠證據，不做刪頁／改 slug／redirect。待發布資格成立後，
只先檢驗這個分流，避免同時把 broad owner 再改一遍。

### 2. Google AI：修好原生量測，再驗證可引用的答案

現有 manual worksheet 的 28 題多為 generic memory，並混有指定 Wenlan 的
比較題；它不能作為目前核心 discovery 基線。已完成本地修復：保留 legacy 原文及
歷史觀察，新增無品牌提示、三語核心任務，分開 Google AI Overview、AI Mode
與各 assistant；記錄帳號、個人化、模型、時間、地區與 citation URL。

原生 GSC AI impressions、單次答案的品牌提及、連結引用與 referral 都分開。
未跑、AI 未觸發、沒有提及、沒有 citation 是不同狀態。舊題與新題不可做升降
百分比比較，也不批量每天重試到得到喜歡的結果。

引用素材優先沿用已發布的 source-change worked example、輸入文件、參考答案
和真實產品畫面；它們能讓讀者查核一次來源變更影響什麼。不得宣稱先前用
authored pages 與 disabled-model fixture 的驗證證明了模型生成品質或自動批准。
沒有必要再建 AI 專用文章、特殊 schema 或一批同義 landing pages。

### 3. 三語抓取：有限、可核對的處理

122 次 inspection 中 113 PASS、9 NEUTRAL；9 頁均 live 200、自指 canonical、
index/follow、在 sitemap。沒有找到值得修改 robots／canonical／redirect 的錯誤。
已更新 27 頁皆缺 post-#182 crawl；先前的 HTTP 檢查不等於 Google 已抓到新版。

優先重新抓取準備名單（每個均應先在提交當時做 live inspection）：

1. https://wenlan.app/learn/distilled-wiki-pages-ai-memory
2. https://wenlan.app/zh-TW/learn/distilled-wiki-pages-ai-memory
3. https://wenlan.app/zh-CN/learn/distilled-wiki-pages-ai-memory
4. https://wenlan.app/learn/source-backed-wiki-pages-ai-work
5. https://wenlan.app/zh-TW/learn/source-backed-wiki-pages-ai-work
6. https://wenlan.app/zh-CN/learn/source-backed-wiki-pages-ai-work
7. https://wenlan.app/zh-CN/learn/when-ai-agent-should-query-knowledge-base

前六個是已更新的主力頁；第七個目前 discovered-not-indexed。這是少量重新
索引請求的 reviewable queue，不是 122 頁群發。**尚未提交**；需明確外部操作
批准。請求不保證抓取／收錄／排名，不重設當前 crawl 日期，也不虛改 lastmod。

## 方法論的保留與改正

保留：GSC 原始資料、三語分開、可核對產品證據、不量產同義頁、發布邊界。
改正：全站平均掩蓋核心詞；人工 AI 問卷未跟上任務與最新 GSC；把目錄數量
當權威；在 Google 尚未抓新版時繼續重寫；只把時間花在站內文章。

下一個成效讀取應先確認 exact owner 的 post-deploy crawl，再讀相同完整窗口
中的 query-owner clicks／impressions／position；輔以固定地區／裝置的 SERP
抽樣與 GSC AI page impressions。保留目前受保護 20/3/28 門檻與截止日，
不把此次量測修復改稱新成功指標、不承諾一次修改即可進第一頁。

## 原始本地證據

本地修改：`docs/seo-measurement.md`、`scripts/seo-ai-visibility-worksheet.mjs`、
其既有 weekly test 與 recovery index。預設 9 個 core prompts，54 個獨立
surface-context records，實際國家不從語言推定；品牌提及與引用分開。
這是可選測試目錄，不要求每輪跑完 54 次，更不代表本輪已執行這些回答測試。
`--cohort legacy` 保留歷史 28 題；預設與 legacy 都保留防覆寫。

整合後 `scripts/seo-weekly.test.mjs` 全套通過、weekly fixture sample 通過、
goal control 通過、diff check 通過。實際產出的三個 Markdown 表分别有
9/54/54 筆資料、5/11/10 欄，已檢查欄數一致與 core 題目不帶 Wenlan 名稱。
本輪沒有網站元件／文案部署，沒有新跑網站 build 或冒稱新的視覺驗收。

與基線相同 external artifact directory 新增：
`gsc-ai-ui-observation.json`、`gsc-ui-api-reconciliation.json`。
前者是已登入介面完整 27 rows 的手動轉錄，不冒稱 API export。
工具對話保留完整 GSC DOM／截圖與 Ubersuggest 回傳；raw exports 不加入 Git。
