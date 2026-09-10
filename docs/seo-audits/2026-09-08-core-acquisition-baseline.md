# 核心頁流量基線與處理順序 — 2026-09-08

本輪依使用者要求，以所有核心頁為範圍，先建立可核對的搜尋證據。
這是新的診斷快照，不是實驗成功讀取，也不改動既有目標、窗口或發布批准。

後續補查：[GSC 介面對帳與方法修正](2026-09-08-core-acquisition-correction.md)
已確認同窗口數字一致，並在 GSC Generative AI features 報表讀到 79 次連結
曝光。以下少量 AI 回答沒有 Wenlan 的觀察，不能推論全站 Google AI 零曝光。

## 結論

最有直接搜尋證據的優先頁是英文 LLM Wiki 指南；其次是
`agent knowledge base` 的落地頁意圖。三語來源型知識庫、建立文件知識庫、
選型與 coding-agent 頁都納入盤點，但沒有把曝光不足的頁面排成改寫清單。
目前沒有證據支持全站被技術封鎖，也沒有證據支持已發生核心頁互相搶排名。

剛發布的 27 頁，尚無任何一頁回報發布後的 Google crawl。現在的 GSC 數字
不能用來評估這次品質改善的成效。

## 本次證據與範圍

- 先重用 09-04 weekly 的保存解讀與 automation receipt；其 ff5f 報告工作樹及
  `/tmp/wenlan-seo` 原始輸入已不存在。沒有重跑 Vercel、GitHub 或整套 weekly。
- 因逐頁 join 與最新 crawl 證據缺失，獨立補取 authenticated Search Console API。
  原始檔保存在 `/tmp/wenlan-seo/core-2026-09-08`，不加入 Git。
- 最新完整窗口：**2026-08-10..2026-09-06**，Web search，PT 日期。
  日期探針回傳 `firstIncompleteDate=2026-09-07`；9/7、9/8 不進 headline。
- 完整 sitemap inventory：168 URLs（EN 114、zh-TW 27、zh-CN 27）。
  URL Inspection 本輪涵蓋 **18 個核心導覽入口 + 104 個 Learn = 122 URLs**；
  其餘 46 個 Docs 有 performance inventory，沒有冒稱此次也做了 URL Inspection。
- 每個 URL 保留 page 指標、可見 query-page join、locale、crawl、Google canonical
  與下一步判斷。沒有 page/query row 時記「未提供」，不補成零。
- 網站來源 HEAD：`9948bfac080327d968ec8185b52e52cab14bc20d`。
  Built link inventory：`W3Jejv_EK5c44SpyLl3Wg`；不是新的 browser render QA。
- #182 production boundary：`2026-09-09T01:16:20Z`（9/8 PDT）。
  [已合併 PR 與發布驗證](https://github.com/7xuanlu/wenlan-site/pull/182)。

## GSC 數字：保持原始單位

| 資料層 | Clicks | Impressions | 限制 |
| --- | ---: | ---: | --- |
| Property | 14 | 1,270 | CTR 1.102%；平均位置 22.34 |
| 可見 query rows | 3 | 322 | 78 rows，不代表完整 non-brand demand |
| Query visibility gap | 11 | 948 | 74.65% property impressions 沒有可見 query 對照 |
| Page rows | 14 | 1,587 | 107 rows；by-page aggregation 不等於 property |
| Page + country | 3 | 375 | 135 rows，僅返回的分維度資料 |
| Query + page + country | 3 | 375 | 190 rows，不能補回或取代 headline |

國家資料覆蓋明顯較少；不假設其缺失原因，也不把國家當成頁面語言。
[Search Console API 文件](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
明確說明 API 不保證返回所有資料列。不同維度保持各自範圍。

122 個核心／Learn 頁的 locale page-row sums：EN 8 clicks / 1,289 impressions，
zh-TW 0 / 51，zh-CN 4 / 72。這些是 URL 語言的 by-page 數字，不是地區需求量。
它們不包含其餘 46 個 Docs，也不與 property 相加。

## 優先處理順序

| 順序 | 頁面／問題 | 直接證據 | 現在的決策 |
| --- | --- | --- | --- |
| 1 | EN `/learn/distilled-wiki-pages-ai-memory` | Page 148 impressions / 3 clicks / position 26.8；18 個可見 query joins 共 53 impressions。`llm wiki` 15 / 1 / 40.4；`karpathy llm wiki` 13 / 1 / 51.31 | 核心獲客首選。以這兩個確切 query 作觀察，不以 page 平均排名掩蓋核心詞落後。現有範例與產品證據已發布；先觀察新版 crawl，再準備有獨立讀者價值的引用／分發入口，不立即再改相同頁。 |
| 2 | EN `/learn/when-ai-agent-should-query-knowledge-base` 的 query ownership | Page 36 / 0 / 50.6；`agent knowledge base` 21 / 0 / 67.24，全部 visible joins 23 impressions | 優先解決 landing intent 判斷。泛詞的當次 Google 結果偏向定義、建立與架構，本站此頁專注何時查詢。這是可驗證的語意落差假設；不能直接改 URL、redirect 或宣告 cannibalization。 |
| 3 | 三語核心 cluster 的 crawl 與 qualified exposure | EN source-backed 13 / 0；build-local 13 / 0；choose-tool 2 / 0；coding-agent 53 / 0，但 coding-agent 只有 2 個可見 joined impressions，都是 CLAUDE.md/Codex 相容問題 | 所有核心 owner 保留監測；不把 53 次 page 曝光當作 53 次知識庫需求。來源型／建庫／選型各自維持不同任務，不先新增同義文章。 |
| 4 | 既有比較與工具入口 | EN SuperLocalMemory 126 / 0 / 7.6；Basic Memory 61 / 3 / 7.1；claude-mem 74 / 0 / 18.0 | 作第二層獲客證據。需拆開競品導航、明確比較與 `site:` 診斷詞；generic-memory 歷史流量不取代核心 LLM Wiki／AI KB 主題。 |
| 5 | 年輕場景頁與 9 個未收錄 URL | 本次沒有發現 9 頁的 HTTP/canonical/noindex 阻擋；部分來源已於 #182 補齊 | 觀察發現與收錄，保留實際任務價值；不因短期低曝光量產更多場景，也不把未收錄直接判成品質懲罰。 |

優先 2 的具體檢查題：讀者想「了解／建立 agent knowledge base」，還是想
「決定 agent 什麼時候應該查詢」？目前 `source-backed-wiki-pages-ai-work`
與 `build-local-ai-knowledge-base-from-documents` 已回答相鄰建立任務。
下一個局部方案應清楚分配這三個現有 URL 的角色，保留 when-to-query 的
檢索時機用途，而不是新增第四個同義 owner。這是待 gate 的提案，尚未改寫。

## 索引與抓取

113/122 inspection 為 PASS，Google canonical 均與目標相符；9/122 為 NEUTRAL。
這是本次 API snapshot，不等於整站 168 頁的索引覆蓋率。

| 核心家族 | EN 最後 crawl（UTC） | zh-TW | zh-CN |
| --- | --- | --- | --- |
| LLM Wiki | 08-29 22:32 | 07-29 01:10 | 08-29 23:22 |
| Source-backed Wiki | 08-27 23:50 | 07-30 08:08 | 08-19 11:01 |
| Build local KB | 08-02 14:11 | 08-03 12:56 | 08-25 18:06 |
| Choose KB tool | 08-02 14:20 | 08-03 10:19 | 08-08 20:22 |
| Coding-agent KB | 08-25 16:51 | 08-25 13:59 | 09-05 13:28 |
| When to query KB | 08-25 16:41 | 08-25 15:56 | 無 crawl；discovered-not-indexed |

#182 的 27 頁中，22 頁 indexed、5 頁 NEUTRAL；有值的最新 crawl 也只到
`2026-09-05T08:56:30Z`。沒有新版 Google crawl，不能判定剛發布的改善無效。

未收錄名單：business-metric 三語、fix-pdf EN/TW、support CN、when-to-query CN、
verify-citations TW、supplier TW。前八頁是 discovered-not-indexed；supplier TW
是 crawled-not-indexed（09-05 00:02 UTC）。九頁均經正式 HTTP 讀取確認直接 200、
self-canonical、`index, follow`、無 X-Robots 阻擋、在 sitemap。這只排除上述
明確技術阻擋，不代替 Google 的選擇或全套 CWV／WAF 診斷。

Sitemap API 仍回報 08-02 最後讀取、120 submitted web URLs。這不能拿來與
168 個現行 URL 相減推算未索引數，也不能推論 Google 完全沒有發現後續頁面。

## 直接 Google 與 AI 搜尋觀察

OpenSEO 兩個 bounded SERP queries 都因 `INSUFFICIENT_CREDITS` 失敗，沒有取得
付費排名資料，也沒有購買點數。改用直接 Google 搜尋作有限場景觀察。

- Google：已登入、`hl=en&gl=us`、第一頁；地理位置與個人化未控制。
  `agent knowledge base` 的 9 個主要自然結果及展開 AI Overview 均未見 Wenlan。
  可見來源包括 Wisq、Google Cloud、OpenAI、AWS；不能把這一次位置當全球固定排名。
- `llm wiki` 的 7 個主要自然結果及展開 AI Overview 均未見 Wenlan。
  摘要引用 Karpathy 原始 Gist、nashsu/llm_wiki、MindStudio 等。
  [nashsu 的一手 README](https://github.com/nashsu/llm_wiki)已清楚交付
  desktop 使用、來源與 Wiki 的關係、安裝與維護入口；這是競爭內容形式觀察，
  不是經本輪驗證的競品效能或 Wenlan 排名因果。
- Perplexity Search：EN、繁中、簡中各一個不含品牌的獨立新查詢，題目都是
  「本機專案文件 Wiki、來源引用、文件變更後的過期答案」；全部回答完成。
  三次都未提到 Wenlan，也未在各自 30／45／30 個來源中引用 Wenlan。
  回答主要導向 Open WebUI、Qdrant、LlamaIndex 等 RAG 組合。
  這提示該任務表述被解讀成 RAG 工程方案；它不是必須改變產品定位的證據。
- Perplexity 已登入免費帳號，模型未明示；英文回答明確使用了帳號既有技術背景。
  因此這三個相關樣本只能作 exploratory observation，不能聲稱是去個人化基線
  或「AI 推薦率 0%」。ChatGPT、Claude 與獨立 Gemini 回答未測，不補零。

當次三語回答僅保留為本機證據，未另行 Share 公開；因此不提供需要原帳號存取的回答網址作為公開可重現證據。

[Google 官方 AI 搜尋指南](https://developers.google.com/search/docs/appearance/ai-features)
沒有要求額外的 AI 檔案或特殊 schema；可索引、可顯示 snippet 只是資格。
本輪優先提高現有頁面的相關查詢競爭力與可引用價值，不新增 llms/schema 儀式。

## 內鏈與重疊：修正舊證據的用法

本次解析同一已驗證 build 的 168 份 HTML，計算「不同來源頁 main 區域的內鏈」，
包含 related cards，排除 footer 與自連結。EN/TW/CN LLM Wiki 分別是 13/10/10，
source-backed 是 23/18/18，coding-agent 是 5/7/7，when-to-query 是 5/5/5。
這個定義不同於 09-04 的 contextual-link 盤點，不能相減宣稱成長。
它也不能證明每個連結位置有效；但不能再把目前核心頁說成完全沒有入站入口。

在這次可見 `wiki`／`knowledge` query-page joins 中，未見同一確切 query
分配到多個 Wenlan owner；隱藏 query 比例很高，仍不能排除語意重疊。
不因相近詞彙就合併、刪除或 redirect 核心頁。

## 驗證與下一個交付

- 原生 explorer 完成 sitemap/locale inventory，並獨立重算 GSC totals、gap、
  122 次 inspection、LLM Wiki joins、null 行為與資料日期；沒有發現 headline 算術錯誤。
- 逐頁證據表涵蓋所有 122 個入口／Learn owners；46 個 Docs 保留在機器資料中
  作旁證，未冒稱同等 inspection coverage。原始 export 不加入 Git。
- 新一輪公共文案實驗仍需符合既有 post-crawl、20 page impressions、3 qualified
  joined impressions、28 完整日 cooldown 與局部發布批准；本次沒有重設窗口。
- 下一個具體交付：英文 LLM Wiki 的可引用成果與精準受眾入口，以及
  agent-knowledge-base 三個既有 owner 的任務分配提案。以實際引用、相關曝光、
  clicks 與閱讀入口衡量；不以文章數、HTTP PASS 或 synthetic bot UA 作成效。
- 本輪只有診斷與逐頁證據輸出，沒有網站改寫、commit、push、PR、merge、
  新部署、indexing request、validation、外部宣傳、付費或 analytics mutation。

## 本機完整證據

完整矩陣、逐頁下一步、API receipt、抓取程式与 hash manifest：
`/Users/lucian/.codex/visualizations/2026/09/08/01a081dd-3b78-7662-b354-7d3aab995038/quality/acquisition-2026-09-08/`。
`core-page-matrix.md` 是 122 頁閱讀表；`matrix.json` 保留全部 168 頁與可見 joins。
這些本機產物沒有發布到網站。
