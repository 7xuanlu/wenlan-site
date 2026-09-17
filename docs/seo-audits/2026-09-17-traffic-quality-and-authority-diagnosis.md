# 流量品質與權重診斷 — 2026-09-17

狀態：只讀診斷加一項量測修正（週報的 Vercel 流量品質拆分）。沒有改網站內容、
沒有索引請求、沒有外部投稿或分析事件。依 `pnpm seo:goal:control` PASS
（fingerprint `6779efcd…0b6e`）後的「Resume」與「Propose external distribution」書籤判讀。
網站原始碼：`origin/main` `12afe3f`。原始數據（Vercel 免費方案只保留 31 天，無法事後重抓）：
`~/.local/share/repo-data/wenlan-site/traffic-diagnosis-20260916/`。

## 結論

流量低不是技術或收錄問題。需求查詢排在第 4–10 頁，而這組查詢已被 4 月上線、
星數高出兩個數量級的 GitHub 專案和部落格佔住；Vercel 的訪客數另外被疑似
自動化流量灌高約三分之二。Successor Goal 四項目標在 2026-09-21 都不會達成，
停止條件 1 會觸發。

## 收錄：健康（2026-09-16 URL Inspection）

- sitemap 173 個 URL：170 個「Submitted and indexed」，3 個「Discovered – currently
  not indexed」（`/learn/fix-pdf-ingestion-ai-knowledge-base` 英文與 zh-TW、
  `/zh-CN/learn/build-customer-support-answer-knowledge-base`）。
- Google 選定 canonical 全部等於 URL；抓取全部 SUCCESSFUL、robots ALLOWED。
- `useorigin.app` 以 308 轉到 `wenlan.app`。
- Sitemaps API 的 `indexed: 0` 是 Google 已不填的欄位，不代表未收錄。

## GSC（2026-08-18..09-15，byProperty）

- 19 clicks、1,651 impressions、平均排名 18.6。可見非品牌查詢 4 clicks／298 impressions；
  1,255 impressions 屬匿名查詢。
- 需求查詢排名：`llm wiki` 46.7、`karpathy llm wiki` 44.5、`agent knowledge base` 69.2、
  `knowledge base wiki` 80.3；`/learn` hub 43.0。含 `wiki` 的可見查詢 9 月每週約 40 impressions、
  排名 44–53。
- 排進前 10 的只有比較頁（superlocalmemory 8.7、`claude-mem vs` 8.3），需求量每月個位數到二十幾。
- 語系：en 1,812 imp／15 clk（87 頁）；zh-CN 88／4（18 頁）；zh-TW 90／0（18 頁）。
  52 個 sitemap URL 28 天零曝光（en 32、zh-CN 10、zh-TW 10）。

## Vercel：疑似自動化流量（2026-08-19..09-15）

- 1,194 visitors／1,558 pageviews；`google.com` 來源 48 visitors。
- CN 319、SG 245、HK 231 visitors：幾乎 100% direct、每人約 1.0 pageview、95% 以上桌機、
  Windows／Mac 約各半、分散在大量頁面。`/zh-CN/learn` 201 visitors／201 pageviews
  （HK 81、SG 52、CN 47、US 21），全為桌機、Windows 101／Mac 100。
- 每週 CN+HK+SG：08-19 起 35 → 169 → 347 → 248。
- 這是依彙總形狀判斷，沒有 user-agent 紀錄佐證。依「Authority-first growth correction」，
  raw visitors 仍是合約單位，但不能在沒有品質拆分時當成真人獲客。週報已加入
  `Traffic quality split`（同一分支）。
- 新抓取腳本實測（`--date 2026-09-17`，窗口 08-20..09-16，36 個國家列）。旗標規則：
  visitors ≥ 20、direct ≥ 95%、每人 pageview ≤ 1.10、桌機 ≥ 90%。

  | 國家 | Visitors | PV／人 | Direct | 桌機 | 旗標 |
  | --- | ---: | ---: | ---: | ---: | --- |
  | CN | 334 | 1.01 | 100% | 91.62% | 是 |
  | US | 329 | 1.93 | 86.02% | 76.90% | 否 |
  | SG | 254 | 1.06 | 99.21% | 97.64% | 是 |
  | HK | 245 | 1.01 | 100% | 97.14% | 是 |
  | TW | 50 | 1.70 | 54% | 22% | 否 |

  旗標訪客 833，旗標外 452。

## 權重現況（2026-09-17）

- `llm wiki` 與 `karpathy llm wiki` 搜尋結果前段：Karpathy gist、`nashsu/llm_wiki`（19,685★）、
  `Astro-Han/karpathy-llm-wiki`（2,269★）、`lucasastorian/llmwiki`（1,621★）、Obsidian 外掛，
  以及 MindStudio、starmorph、datasciencedojo、Medium 等教學文。GitHub `llm-wiki` topic 有 471 個 repo。
- `7xuanlu/wenlan`：72★，已有 `llm-wiki`、`knowledge-base` 等 topic。
- 已收錄 Wenlan 的主題清單：`gavischneider/awesome-llm-wiki`（177★，09-16 仍有更新）。
- `7xuanlu` 對其他 repo 的 PR：2026-07-01 以來 31 筆，合併 8、open 21、未合併關閉 2；
  合併的多是既有 Origin 條目改名或描述更新。2026-09-12 同日開了 14 筆，其中 11 筆標題相同
  （「Add Wenlan – source-backed AI knowledge base and LLM wiki」）；這批 PR 不在本 repo
  或 `~/.wenlan/specs` 的紀錄裡。
  2026-08-27 紀錄已指出清單維護者會拒絕大量相同投稿，因此**不再新增目錄 PR**；
  已開的只被動追蹤，不催促維護者。

## Successor Goal 讀數（固定窗口 2026-08-24..09-20）

| 目標 | 截至目前 | 門檻 |
| --- | --- | --- |
| GitHub stars | 72（09-17） | ≥ 100 |
| GSC clicks | 18（08-24..09-15） | ≥ 100 |
| GSC impressions | 1,533（08-24..09-15） | ≥ 10,000 |
| Vercel visitors | 最終讀數待取 | ≥ 2,000 |

- **Vercel 期限**：免費方案只開放最近 31 天。`2026-08-24` 起算的窗口必須在 2026-09-23（含）前讀取，
  否則窗口開頭的資料會永久讀不到。
- 最終 GSC 讀數等報表延遲結束後讀，不移動窗口。

## 下一步判斷

- LLM wiki owner（`/learn/distilled-wiki-pages-ai-memory`）在 #199 與 #206 後仍在 28 天冷卻期，
  on-page 路線關閉。
- 目錄 PR 已飽和，也有被視為推銷的風險。
- 剩下有槓桿的是**獨立有用的社群內容**：針對已有人討論的痛點「LLM wiki 的來源過期後頁面不會跟著更新」，
  以可檢查的真實產品收據說明偵測與重建方法，發在 LLM wiki 實作者聚集的地方。
  依批准邊界，任何外部發文都需要使用者對確切文案與目的地逐次批准。
