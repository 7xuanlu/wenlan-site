# 共用 SEO 流程重跑：2026-10-07

21:18–21:22 UTC，以原生清單中的 `wenlan-seo` skill 執行。工作狀態為
`main@d4f1a734e6b0559cfc014076440fe872d0713fa9` 加現有未提交改動。
控制檢查通過；本輪只讀外部資料、重跑本地報告並更新決策，未發布或提交索引。
規則依據：campaign 的 Quality conditions、Evidence roles、Successor contract
與 [共用流程](../seo-demand-workflow.md)。

## 哪些重查、哪些沿用

| 資料來源 | 本次結果與限制 |
| --- | --- |
| GSC URL Inspection | 三語 Obsidian owner 各 HTTP 200、PASS、Submitted and indexed、canonical 一致；抓取日期如下 |
| 正式網站 HTTP | 三頁均 200；title、H1、description 與 #217 改寫內容相符，canonical 正確。未取得精確部署時間，也未證明整頁逐位元等同 commit |
| GSC 搜尋表 | 沿用今天完成的 09-09～10-06 API／weekly：property 16 clicks、1,209 impressions；未重抓重疊窗口 |
| Google Ads Planner | 已登入的 US／English／Google 介面可讀，84 ideas；`obsidian claude code` 仍顯示 1K–10K。三語詳細區間沿用同日快照，沒有重查所有詞 |
| Google Trends | 沿用同日已保存序列與市場／期間；本次未重新連線抓取 |
| GA4 | `Wenlan Website` property 557888023，Pages and screens，09-09～10-06：2 views、1 active user、4 events。兩路徑為 `/zh-TW` 與 `/zh-TW/learn/choose-ai-knowledge-base-tool`，與已記錄驗收路徑一致；不能證明自然流量，亦未以時區對齊 GSC 作比較 |
| OpenSEO | GSC Insights 仍可讀，並顯示免費 credits 用完。其 Last 28 days 畫面顯示 20 clicks／1,419 impressions，但目前窗口未核對，不拿來替換固定 API 窗口或宣告增長 |
| Ubersuggest | auth 成功、free；帳戶 allowance reports=3 不代表剩餘額度。US 國家解析成功後，單次 overview 回 HTTP 403：每日 3 reports 額度已用完。未重試或升級 |
| Keyword Tool 備援 | Guest quota 可讀；US／English／Google／web 的 10 詞請求成功，scope 正確，全部沒有快取量值。只作候選用語，不當市場規模 |

## 補上的關鍵證據

共同 slug：`/learn/wenlan-vs-obsidian-ai-memory`，本地原始碼在 10-06 的
`d6bafdd`（#217）改寫。最新 URL Inspection 回傳：

| 語言 owner | lastCrawlTime（UTC） |
| --- | --- |
| EN | 2026-08-19 22:38:21 |
| zh-TW | 2026-08-01 22:04:09 |
| zh-CN | 2026-10-02 08:03:24 |

三者都早於改寫。新版內容已可從正式 HTTP 取得，但尚無 Google 已抓新版的證據。
EN 的既有 page average 7.4 仍不能當 `obsidian claude code` 的排名。

備援回傳 `install obsidian claude code`、`how to set up obsidian claude code`、
`obsidian claude code plugin`、`obsidian claude code skills`、`obsidian claude code mcp`
等。現有 owner 的 title／H1／摘要已涵蓋這些任務；僅 autocomplete 不成立新頁缺口。
`graphify ...` 也只是未驗證候選，不據此宣稱 Wenlan 有整合或另開文章。

**決定：**暫停此 owner 的進一步 SEO 重寫；保留 plain-files 對照示例為獨立可準備
的產品證據工作。下一次沿既有量測節奏核對新版 crawl，再按實際曝光與 cooldown
判斷；本輪未實作示例、未新增排程，也未證明排名或獲客改善。

原始 Inspection、正式 HTTP 欄位與 provider 回覆保留在
`/tmp/wenlan-seo/2026-10-07-rerun/`。同日需求 manifest 重跑成功，輸出
`/tmp/wenlan-seo-demand/2026-10-07/demand-report-rerun.md` 與原報告完全一致；
這證明同輸入可重現，不是新資料。歷史輸入與完整方法見
[三語需求實測](2026-10-07-trilingual-demand-workflow.md)。
