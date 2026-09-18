# 七頁索引請求執行收據 — 2026-09-08 PDT

使用者針對精確 7 頁清單回覆「批准繼續」後執行。範圍僅本次 URL Inspection、
live test、request indexing 與結果驗證；不擴張為網站部署或外部留言批准。

結果：**7/7 即時測試可索引，7/7 請求被接受，0 跳過、0 失敗。**
每頁均先讀取索引版本；前六頁最後 crawl 均早於 #182 發布邊界，故沒有可跳過的新版。
逐頁看到 `Indexing requested` 對話框及加入 priority crawl queue 的確認，沒有重複提交。

| URL | 提交前 last crawl（UTC） | Live test（9/8 PDT） | 收據記錄時間（UTC） |
| --- | --- | --- | --- |
| https://wenlan.app/learn/distilled-wiki-pages-ai-memory | 2026-08-29T22:32:31Z | 19:46 PASS | 2026-09-09T02:48:04.536Z |
| https://wenlan.app/zh-TW/learn/distilled-wiki-pages-ai-memory | 2026-07-29T01:10:28Z | 19:48 PASS | 2026-09-09T02:49:42.418Z |
| https://wenlan.app/zh-CN/learn/distilled-wiki-pages-ai-memory | 2026-08-29T23:22:06Z | 19:50 PASS | 2026-09-09T02:51:23.276Z |
| https://wenlan.app/learn/source-backed-wiki-pages-ai-work | 2026-08-27T23:50:52Z | 19:51 PASS | 2026-09-09T02:53:09.515Z |
| https://wenlan.app/zh-TW/learn/source-backed-wiki-pages-ai-work | 2026-07-30T08:08:05Z | 19:53 PASS | 2026-09-09T02:54:46.839Z |
| https://wenlan.app/zh-CN/learn/source-backed-wiki-pages-ai-work | 2026-08-19T11:01:00Z | 19:55 PASS | 2026-09-09T02:56:29.878Z |
| https://wenlan.app/zh-CN/learn/when-ai-agent-should-query-knowledge-base | N/A | 19:56 PASS | 2026-09-09T02:59:28.573Z |

收據記錄時間是成功畫面讀回後的時間，不是假定 Google 伺服器的精確接受時間。
前六頁 indexed，Google-selected canonical 均為 inspected URL。簡中來源型頁的
Sitemaps 欄顯示 Temporary processing error；即時測試仍通過，未修改 sitemap。

最後一頁本次 UI 顯示 `URL is unknown to Google`，而先前 API 快照是
discovered-not-indexed；保留兩個來源與時間差，不推論原因。最後一頁即時測試
通過後也成功提交，但不能因此說已正式收錄。

## 下一次讀取

沿用既有週報流程，先看 last crawl 是否晚於部署邊界／請求，再驗證 Google canonical
與索引狀態；live test timestamp 不替代 indexed-version last crawl。再觀察原有核心
query-owner 的曝光、點擊與位置，以及 GSC 原生 AI 曝光。不得把收到請求當成流量成效。
不建立重複 automation，不連續重送相同 URL，不改原目標、窗口或既有實驗基線。

## 證據

原始逐頁收據：既有 external artifact directory 的 `indexing-request-receipts.json`。
本次 tool history 保存逐頁 GSC DOM 與最後一筆成功畫面截圖。此檔為執行解讀，
不是 GSC API export。沒有網站來源變動，因此未重跑 build／UI regression suite。
