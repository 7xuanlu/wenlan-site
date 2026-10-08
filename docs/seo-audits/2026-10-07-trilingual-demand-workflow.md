# 三語搜尋需求與排名決策：2026-10-07

本輪已實際走完 Keyword Planner → Trends → Google 搜尋結果 → GSC query/page
→ 既有 owner 與改頁門檻 → 本地需求報告。這是需求研究與流程驗證，尚未取得
新的排名成效，也沒有投放廣告、發布新頁或新增外部引用。

## 結論與證據範圍

既有 LLM Wiki 實作頁的具體任務詞值得追蹤，但這是量測順序，不是下一輪
新增內容策略。「個人 AI 知識庫」需求、LLM Wiki 做法與工具入口並存。不能從免費工具
證明哪個詞「搜尋最多且一定最容易進前五」。本輪最高需求區間有多個並列詞，
廣告競爭 Low 也不是自然搜尋難度。先以 qualified query × canonical owner
的前 10、前 5 平均位置作診斷目標，同時看曝光與點擊；不以全站平均位置驗收。
平均位置不是固定名次，前十也不保證點擊。

- Planner：Google network，2025-09..2026-08，沒有網站篩選。美國／English、
  台灣／Chinese (traditional)、中國／Chinese (simplified) 各 10 個種子詞。
  下載結果分別 84、14、15 列；報告只使用介面實際核對的 18、14、15 個區間，
  不是把全部 CSV 數值冒充精確月量。
- GSC：`sc-domain:wenlan.app`，全球 Web，2026-09-09..10-06。按頁面語言分組，
  並非與 Planner 國家相同的分母，不計算市場覆蓋率。
- Property：16 clicks／1,209 impressions；可見 query 表：8／252；
  可見性差額：8／957。隱藏查詢不能推回具體詞，也不是沒有需求。
- 簡體中文不等於中國地區。這次中國 Google 樣本不代表百度或全部簡中受眾；
  其他地區的簡中需求仍待獨立 cohort，不能套用本次數字。
- SERP 是登入瀏覽器中指定語言／地區提示的質性觀察，可能有個人化、廣告、
  AI Overview、影片；結果順序不充當中立排名稽核。排名仍以 GSC 為準。

## 實際查到的搜尋量區間

數字是月均估計區間，不是本站曝光，也不是互不重疊的搜尋人數。
以下保留 Planner 的分詞空格；相近詞不可直接相加。

| 語言／市場 | 實際詞與月均區間 | 本輪判斷 |
| --- | --- | --- |
| EN／美國 | `karpathy llm wiki`、`llm wiki`、`obsidian claude code`、`obsidian ai`：各 1K–10K；`ai knowledge base`：100–1K | 優先追蹤 Karpathy 實作 owner；Obsidian + Claude Code 留作下一個精確 SERP／owner 檢查，未判定容易排名 |
| zh-TW／台灣 | `llm wiki`：1K–10K；`ai 知識 庫`、`obsidian claude code`、`ai 筆記`：各 100–1K；`知識 庫 建立`：10–100 | 優先驗證既有 LLM Wiki 入門實作；不能把泛詞區間套給「如何使用」長尾 |
| zh-CN／中國 Google | `llm wiki`：1K–10K；`ai 知识 库`、`知识 库 搭建`、`obsidian claude code`：各 100–1K；`本地 知识 库`：10–100 | 保留 LLM Wiki／本地文件實作候選；泛「搭建」多為 RAG／雲端部署，尚無本站簡中 query 證據支持優先改頁 |

排除 `llm degree wiki` 的法學學位歧義，以及 `吴恩达 笔记` 等不相符任務。
`llm wikipedia` 也不能未經消歧就算 AI Wiki 需求。未出現的種子詞是未知，非零。

## 搜尋意圖與現有位置

| 實際 GSC query → owner | 28 日曝光／點擊／平均位置 | 搜尋結果與下一個決定 |
| --- | --- | --- |
| EN `karpathy llm wiki` → `/learn/distilled-wiki-pages-ai-memory` | 8／0／22.13 | 原始 Gist、可安裝技能、實作教學並存；新版先測能否完成第一個 Wiki，而非再加概念介紹 |
| EN `karpathy llm wiki v2` → 同頁 | 3／0／15.33 | 接近前十，但樣本很薄；保留原詞，不合併成泛詞排名或假設同等搜尋量 |
| EN `knowledge base wiki` → `/learn/source-backed-wiki-pages-ai-work` | 26／0／78.62 | 多為團隊 Wiki／知識庫選型與比較；不是當前 AI source-backed 頁的明確快速機會 |
| EN `wiki knowledge base` → 同頁 | 26／0／87.62 | 同上；需要先確認任務是否相符，不能只因曝光較多而重寫 |
| zh-TW `llm wiki 如何 使用` → `/zh-TW/learn/distilled-wiki-pages-ai-memory` | 1／0／20 | 任務相符但不足以判定成效；泛 `llm wiki` 在該頁另有 1／0／64，兩者不可混算 |
| zh-CN 核心 owner | 這個可見 join 中沒有對應核心詞 | 未知，不是無人搜尋；page aggregate 不能倒推出 query |

直接閱讀的競爭成果包括 [Kenming 實作教學](https://kenming.idv.tw/karpathy-llm-wiki-fundamental/)
的目錄、首次 ingest 與 query/file-back，以及 [Astro-Han 的安裝式技能](https://github.com/Astro-Han/karpathy-llm-wiki)。
這表示讀者已有可操作替代方案，Wenlan 的可追溯／更新工作流必須提供實際成果，
不能把「有教學」本身當獨特優勢。中文泛搭建結果中的
[阿里雲本地 RAG 教學](https://help.aliyun.com/zh/model-studio/build-rag-application-based-on-local-retrieval)
則解決不同部署任務；這是意圖區分，未實測比較各產品品質。

## Trends：避免追年度平均的舊熱度

三個查詢均為 Web Search／過去三個月。保存 07-09..10-05 的 89 個完整每日
0–100 指數，排除介面標為 partial 的 10-06。不同查詢與市場各自正規化，不能跨表比大小。

- 美國 `llm wiki`：介面顯示相較前一個三個月下降 80%；年度高區間不能推成持續成長。
- 台灣 `AI 知識庫`：89 日僅 5 日非零；即使介面顯示 breakout，也不足以判穩定成長。
- 中國 `AI 知识库`：89 日僅 1 日非零；樣本更稀疏，不能選成趨勢贏家。

零指數不是零搜尋。取樣／正規化含義依
[Google Trends 說明](https://support.google.com/trends/answer/4365533?hl=en)。
這些訊號只修正研究優先順序，不轉換成搜尋量或合成分數。

同日補查 [美國／過去一年／四個 Search term 同圖](https://trends.google.com/explore?date=today%2012-m&geo=US&q=llm%20wiki,AI%20knowledge%20base,personal%20AI%20knowledge%20base,obsidian%20claude%20code)：
截至完整週 09-26..10-03，`llm wiki`、`AI knowledge base`、
`personal AI knowledge base`、`obsidian claude code` 指數依序 11、8、0、4；
04-11..04-18 為 100、74、4、39。排除 10-03..10-10 partial 週。
這組樣本沒有支持「換一個詞就正逢上升趨勢」；精確 personal 詞太稀疏，
也不能據此否定個人需求。原始同圖序列另存 `trends-us-direction-comparison.txt`。
已完成頁保留；降溫降低繼續擴寫同題的理由，不等於應刪除已有成果。

## 抓取與改頁門檻

同日搜尋呈現抽查：`site:wenlan.app/zh-TW/learn/build-local-ai-knowledge-base-from-documents`
（`hl=zh-TW&gl=tw`，桌面登入／個人化結果）顯示「如何用Markdown、PDF 與Obsidian
建立本地AI 知識庫」，摘要為「用Markdown、文字檔、文字型PDF、資料夾或Obsidian vault
建立本地AI 知識庫，並驗證同步、來源與維護型頁面。」但實際打開線上頁面，H1
已是「AI 知識庫是什麼？個人怎麼建立（工具比較＋步驟）」，分頁標題是
「AI 知識庫是什麼？個人建立步驟與工具比較 | Wenlan」。兩者有可重現落差；
原因仍待 crawl／query-specific snippet 查證，不能單憑此斷言 Google 沒抓新版。
指定網址查詢不代表一般搜尋詞的摘要或排名。原始觀察存 `snippet-zh-tw-site-query.txt`。

10-07 唯讀 URL Inspection 的四頁均為 indexed、自選 canonical、允許且成功抓取；
這只代表 Google 記錄中的版本，不是 live test 或目前部署版本已收錄。

| Owner | lastCrawlTime（UTC） | 決定 |
| --- | --- | --- |
| EN LLM Wiki | 09-09 02:50:54 | 早於 10-06 的 #211 實質改寫；先等新版抓取，不能立即重寫 |
| zh-TW LLM Wiki | 09-09 02:52:19 | 同上 |
| EN source-backed wiki | 09-22 04:39:21 | 晚於已知 9 月頁面修正，但尚未經過 28 個完整日；意圖也待確認 |
| zh-CN build-local guide | 08-25 18:06:13 | 早於 10-06 的 #213 改寫；目前位置不能評價新版 |

精確 production deploy 時刻本輪未另外取證；上述三頁的 crawl 早於原始碼改寫，
已足以排除「新版抓取已確認」。現階段沒有通過門檻的立即 SEO 重寫。
後續仍遵守同一完整 28 日的 20 page impressions／3 qualified joined-query
impressions、確認新版 crawl 與其後 28 完整日冷卻期；詳見 campaign contract。

## 兩個原始假說的處理

「搜尋任務不夠對齊」有局部支持：`knowledge base wiki` 的比較意圖和當前頁
主軸不同，但不能把全部低排名歸因於這一點。LLM Wiki 的新版尚未確認抓取。

「獨立權威引用不足」仍是合理工作方向，尚非已隔離的排名因果。歷史
[09-04 Links 稽核](2026-09-04-seo-growth-diagnosis.md#gsc-backlinks-不能直接讀成-authority)
的 342 links 中 290 來自自有舊網域；這些不是獨立推薦。另有已 merged 的
awesome-mcp-servers 與既有 MCP 目錄引用，不能說外部引用為零；本輪沒有刷新
Links 總數，也沒有把舊數字當今天的值。

既有實作指南可供相關 LLM Wiki／agent 工作流讀者使用，這是待驗證的分發素材。
第一讀者路徑先從已有目錄引用與實際 referrer 證據判斷；新社群投稿／維護者接洽
要另有具體適用性與發布授權。本輪沒有新增 outreach。若兩次實驗仍低於曝光
門檻，停止頁面反覆改寫，改走可檢驗的引用／分發路徑。

## 採用的實務方法與限制

- [Ahrefs 的 72,635 詞研究](https://ahrefs.com/blog/gsc-gkp-search-volume-study/)：
  保留 Planner 區間，不加總 close variants；它是 2021 年特定樣本與供應商研究，
  不把其中誤差比例套用到 Wenlan，也不把本站 GSC 曝光當全市場搜尋量。
- [Ahrefs 難度分析方法](https://ahrefs.com/blog/keyword-difficulty/)：
  看實際搜尋結果、任務、成果形式和本站條件；單一 KD 或 Ads 競爭不能決定難度。
- [Grow and Convert 的 SaaS 實務案例](https://www.growandconvert.com/seo/all-in-one-saas-seo-case-study/)：
  採用具體需求與使用情境優先的研究方式，再用進站行為檢驗價值。
這是 agency 自述案例，不是對照試驗；不借用其轉換率或成功承諾。
- [14 個市場的在地化經驗](https://ahrefs.com/blog/localization-seo/)：
  每個市場獨立查詞與意圖，不把英文候選直譯成三語需求；大站經驗不是本站預測。
- [LearningSEO 的排名診斷清單](https://learningseo.io/seo_roadmap/train-test-troubleshoot-your-seo-further/why-my-page-doesnt-rank/)：
  分查抓取、任務相關性、內容用途、引用與搜尋結果呈現；採其診斷結構，
  不採固定見效週數或把 site: 查詢當完整收錄稽核。
- [Animalz 的 distribution-first 方法](https://www.animalz.co/blog/distribution-first-strategy)：
  先查讀者在哪裡及渠道是否有效，再配置內容投入；是 agency 經驗，不是成長保證。
- [Seer 2026 CTR 原始研究](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)：
  53 品牌、547 萬查詢的 cohort 提醒搜尋結果形式會影響點擊機會。不能把其 CTR
  套給本站，或未查本站 SERP 就把低點擊歸因於 AI Overview。

## 已有素材與下一個觸達候選

英文 `/learn/wenlan-vs-obsidian-ai-memory` 已是 Obsidian + Claude Code 實作，
繁中 `/zh-TW/learn/build-local-ai-knowledge-base-from-documents` 已回答個人
AI 知識庫建立與工具比較。下一步不是再寫相同文章，而是驗證既有素材能否
讓相符讀者完成任務。Obsidian Forum 的
[AI CLI 實作討論](https://forum.obsidian.md/t/open-source-agent-skill-for-obsidian-cli-prevents-13-silent-failures/111169)
證明有相符的討論場域，未證明 Wenlan 會獲得流量或接受投稿。
已讀 [論壇規則](https://forum.obsidian.md/guidelines)：貢獻討論、放對分類、禁止
spam 與跨主題重貼。先準備能獨立重現的 vault 示例並驗證差異價值，才評估
Workflows & Templates 的具體稿件。此輪未發布；不把潛在渠道算成外部引用。

官方文件用於釐清工具單位；實務來源用於形成可反駁的候選。社群自述只能補充
問題用語，不能單憑流量截圖或 upvotes 宣告因果。

## 工具選型與現成流程盤點

2026-10-07 補充：檢查截圖的 20 個項目與 OpenSEO。這是分層盤點：下表的方案／
功能來自供應商或目錄；Ubersuggest、Keyword Tool 才做了本帳戶或匿名端點實測。
沒有把「有目錄項目」「有免費試用」「內建 skill」當成已跑通或有效獲客。
價格是當日美元／歐元標示，可能調整；未核實的能力與費用保留未知。

| 工具 | 能補哪一段／現成流程 | 免費與連接判斷；本輪決定 |
| --- | --- | --- |
| **Ubersuggest** | 已安裝 3.0.0 的 research、content-brief、action-plan 等 skills；工具涵蓋候選、估計量值、SERP、文章規劃 | 已登入 free、實際取到 EN/TW 資料；帳戶 `reports: 3`，官方為每天 3 個新報告主題。採用其研究／brief 流程，按免費額度縮小批次；[免費限制](https://ubersuggest.zendesk.com/hc/en-us/articles/9704437892635-Free-Account-Key-Features-and-Limits) |
| **Keyword Tool: Free SEO Ideas** | autocomplete、問句／介系詞擴展；已測 Guest MCP，未確認目錄版與 Guest 全部能力相同 | 免費 Guest 60 次/小時、120 次/天；僅前 5 詞可能有快取量值。作備援，不是主流程；[Guest](https://keywordtool.io/mcp/guest) |
| **GSC SEO & Content Planner** | 目錄列出 GSC 分析與 Content Planning Skill；未讀到 skill 原始碼、未連帳戶 | Free 永久方案，但 GSC 機會完整範圍僅試用 7 天，之後最近 3 天、最多保存 5 個機會；不取代 28 天 GSC；[方案](https://smepost.io/pricing) |
| **OpenSEO**（既有工具） | 實際讀了 keyword-research 與 clustering 原始 skill；包含專案脈絡、重用研究、SERP 分群與頁面對應 | 免費網頁 generator 最多 20 詞；託管 $10/月，試用 $0.50 點數，GSC 不扣點仍需方案。採用可移植的方法，不增加付費依賴；[skills](https://openseo.so/docs/skills)、[定價](https://openseo.so/pricing)、[GSC 成本](https://openseo.so/google-search-console-mcp) |
| **Ahrefs** | 關鍵字、SERP、競爭／連結資料；本輪未檢視套裝 skill | 完整 API/MCP 為 Lite 以上付費能力；免費網頁工具不等於免費 MCP。暫不採用；[方案差異](https://help.ahrefs.com/en/articles/6117209-what-s-the-difference-between-all-ahrefs-subscription-plans) |
| **SE Ranking** | 關鍵字／問題詞／SERP；有公開 prompt library，非本輪驗證的內建 skill | API 有 14 天試用，持續 MCP 使用依 API/訂閱權限；不當永久免費基線；[MCP](https://seranking.com/api/integrations/mcp/)、[prompt 與額度](https://help.seranking.com/hc/en-us/articles/22903914755100-Prompt-library) |
| **Serpstat** | 關鍵字與意圖研究；另有免費 Brief Generator GPT，和資料 MCP 不同 | 方案頁將 MCP 列在付費 Team；免費帳戶不證明免費 MCP。試用付款說明有頁面差異，不啟用；[方案](https://serpstat.com/page/plans/)、[GPT 區別](https://help.serpstat.com/en/articles/14938323-chatgpt-plugin) |
| **SEOcrawl AI** | GSC＋GA4、跨期比較、頁面／詞診斷與任務；MCP 流程可減少手工報表 | 14 天試用，持續方案受 credits 限制；沒有驗證長期免費。與既有量測重疊，暫不採用；[MCP](https://seocrawl.ai/mcp)、[方案](https://seocrawl.ai/pricing) |
| **SiteGuru** | GSC／站點診斷與優先修復，有 MCP 問法 | 6 週試用，MCP 在 $49/月 Small 起方案；試用後免費功能不證明 MCP 留存。非當前缺口；[方案](https://www.siteguru.co/pricing/signup)、[MCP](https://www.siteguru.co/seo-academy/siteguru-mcp-chatgpt) |
| **SEO with Distribb** | 供應商稱支援關鍵字、內容 clusters、GSC 與可安裝 skill | 7 天試用；永久免費、三語與完整 skill 原始碼未確認。暫不接入；[供應商](https://distribb.io/) |
| **Able SEO by VibeSEO** | 供應商描述需求→內容→審核／發布→GSC 的整套流程 | $39/月起；未驗證免費長期資料。功能較廣，但本輪無需代發文章；[供應商](https://vibeseo.dev/)、[MCP](https://vibeseo.dev/mcp) |
| **SEO Programático** | 免費基礎流量／AI referrals 與助手連接；提供研究到發布的流程介紹 | GSC＋Analytics 整合為報價制 premium，免費不等於含關鍵字量值。暫不替代現有量測；[方案](https://seo-programatico.com/pricing) |
| **Keyword.com** | 相關詞量值／intent、地區語言設定、排名工具；有 MCP | 14 天試用後付費；主要優勢含排名監測，目前不優先；[方案](https://keyword.com/pricing/)、[MCP](https://keyword.com/docs/mcp/) |
| **PagePulse** | 目錄描述 GSC＋GA4 與頁面改動效果，較接近量測 | 同名站 [pagepulse.dev](https://pagepulse.dev/) 宣稱一站 50 頁免費，但與截圖插件身分連結未核實；不宣稱已找到可用免費替代品 |
| **Writrex SEO** | 公開單頁技術／頁內檢查；不是需求研究 | 預覽＋一次性 10 credits，後續預付；非持續免費研究；[供應商](https://seo.writrex.com/) |
| **seoClarity ArcAI** | AI 回答中的品牌／引用分析 | 報價型，未發現長期免費；不是目前搜尋需求缺口；[定價](https://www.seoclarity.net/ai-seo/pricing) |
| **Finseo** | AI 品牌可見度與建議 | 7 天試用後 Starter €84/月；當前不採用；[定價](https://www.finseo.ai/pricing) |
| **BrightEdge** | 大型 SEO／AEO 數據平台 | 企業詢價，未核實免費層；成本／範圍不合當前需求；[產品](https://www.brightedge.com/technology/local-global-and-mobile-seo/global-content-performance) |
| **AccuRanker Search Intelligence** | 帳戶內排名、關鍵字／頁面、搜尋意圖 | Professional $224/月，無已核實永久免費；目前不需額外排名系統；[定價](https://www.accuranker.com/pricing/) |
| **Ranked AI** | SEO 軟體與代營運／內容服務 | 官網列付費軟體及服務，無已核實永久免費；暫不採用；[供應商](https://www.ranked.ai/) |
| **SEO&OH AI** | 官方產品是錄音轉錄、摘要／心智圖與錄音 MCP | 名稱有 SEO，但不是搜尋引擎優化工具，排除；[官方](https://seoandoh.kr/) |

沒有逐一登入上述付費／試用工具；不能宣稱完成所有產品實測。當前目錄搜尋亦不完整，
找不到某個插件不代表不存在。Ubersuggest 舊公開目錄未列 skills，但本機已安裝包有；
採本機來源與實際工具結果，不以舊目錄推翻已觀察能力。

### Ubersuggest 實測與保留判斷

`auth_status` 為已登入 free；`user_limits` 顯示 3 reports、20 keywords、1 project、
每 project 1 location。未建立專案、未購買方案，也未呼叫付費文章生成或量值重算。

- 英文：`obsidian claude code`／US／en 的 overview、suggestions、SERP 均成功。
  suggestions 含 `obsidian claude code mcp`、`obsidian claude code skills` 等具體用語。
  SERP 回應日期為 2026-10-07，含 AI Overview、影片與一般頁面；排除 `NODOMAIN`
  這類 feature placeholder，不能把估計 clicks 當實際頁面流量。
- 繁中：`個人知識庫`／Taiwan／zh-TW 取得量值與 autocomplete。可見 `claude 個人知識庫`、
  `notion 個人知識庫`，也混入「沒有知識 成語」等無關項目。工具分組不代替意圖審查。
- 中國：`location_suggest("China")` 未回傳 country，只回傳同名城市等；本輪沒有猜 ID，
  沒有宣稱中國量值已驗證，也沒有將全球簡中樣本充當中國資料。
- 新舊不一致：英文 overview 回傳 search volume 50、SD 14，但其月序列只到 2025-11；
  suggestions 的同一 seed 更新時間為 2026-04。先前 Planner 是 2025-09..2026-08 的
  1K–10K 區間。來源、更新時間、方法／近似詞範圍未對齊，不能平均兩者或挑較大數字。
  繁中 overview 月序列到 2026-08。這支持逐欄記錄時間，而非把「今天取得」等同最新。

原始參數與結果：`/tmp/wenlan-seo-demand/2026-10-07/ubersuggest-probes.json`。
Keyword Tool 原生 quota 工具也已成功，確認新連接已載入；quota 與查詞成功仍是不同證據。

### 哪些流程直接重用，哪些不照搬

- **重用**：已讀 Ubersuggest 3.0.0 `seo-foundations`、`keyword-research`、`content-brief`、
  `content-demand-finder`、`seo-action-plan`。先用現成研究／brief 工具順序，縮為免費小批次；
  不再自製關鍵字擴展器、SERP 抓取器、通用分群器或通用文章大綱 skill。
- **有用但不全搬**：OpenSEO 的 [research 原始 skill](https://github.com/every-app/open-seo/blob/main/.agents/skills/keyword-research/SKILL.md)
  與 [clustering 原始 skill](https://github.com/every-app/open-seo/blob/main/.agents/skills/keyword-clustering/SKILL.md)
  包含讀既有專案脈絡、重用近期研究、GSC query/page 起步及 SERP 分群。完整執行依賴
  專案／MCP／report 服務，也會寫回脈絡；本輪只採可移植原則，不宣稱已免費接通。
- **不照搬**：Ubersuggest 的固定 SD 門檻／混合機會分數、供應商限定路由、無資料即無
  organic presence、強制產 50 個想法，都不符合本案的證據與精簡要求。
  Skill 是可審閱的操作配方，不是效果已被證明的最佳實務認證。
- **保留自有部分**：Wenlan 的六個需求問題、真實產品證據、三語 canonical owner、
  量測／發布門檻及可追溯的報告 adapter。供應商無法知道我們實際已交付什麼，或代替
  專案決定哪個功能、頁面和使用者任務相符。

選型結果已取代需求流程中的單一 Keyword Tool 優先路由；沒有新增平台、scheduler 或
自有 skill。原先「七步通用流程」縮為四個專案檢查點，日常只讀流程；本表供重選工具時查閱。

## 可重跑流程與本輪產物

### 免費工具整合驗證

同日實測 [Keyword Tool Guest MCP](https://keywordtool.io/mcp/guest) 的匿名端點，
並以 Codex 原生設定加入 `keywordtool-guest`。設定已讀回確認；本輪資料來自
直接 MCP 呼叫，此初次查詞尚未驗證新對話載入；後續原生 quota 工具成功見上節。沒有登入或開通付費方案。

- EN／美國：`obsidian claude code` 成功回傳前 10 筆，服務報告共 327 個建議。
  含 `how to set up obsidian claude code`、`obsidian claude code mcp`；本次均無量值。
  327 是建議數，不是搜尋次數。這些長尾尚未逐詞查 Planner／SERP，不新增優先頁。
- zh-TW／台灣：`個人知識庫` 首次與使用完整語言名稱的一次重試均回傳 `KT-DZE`。
  此連接的繁中樣本未成功，沿用已核對的 Planner／GSC 與直接搜尋介面。
- zh-CN：`个人知识库` 回傳前 10 筆／共 36 個建議，但 `country: China` 被解析為
  `Global / Worldwide`。保留為全球簡中候選，不能接成中國 Planner 的同市場證據。
  本次亦無量值；不把空值當成零或用母詞區間補值。

查詢參數、時間與原始回應位於 `/tmp/wenlan-seo-demand/2026-10-07/keywordtool/`；持續操作與
回傳地區檢查只維護在[需求流程](../seo-demand-workflow.md#tool-routing-and-project-judgment)。
GSC SEO & Content Planner 未連接，Ahrefs 付費 MCP 未啟用；既有 Google 資料源仍是基線。

### 既有需求報告

持續操作見 [需求研究流程](../seo-demand-workflow.md) 與
[每週 SEO loop](../seo-growth-loop.md)。每週先讀 GSC 的 exact query/page 和 crawl，
每月或意圖改變時更新 Planner／Trends／SERP；人工明確選擇 hold、investigate、
candidate 或 reject。GA4 只驗證到站後行為，不提供所有人的搜尋詞；GA4 sessions
與 GSC clicks 分開，OpenSEO 可作候選／整合介面但不是必要資料源。

原始 Planner CSV／DOM、Trends DOM、SERP DOM、人工整理的 `manifest.json` 與
`demand-report.md` 位於 `/tmp/wenlan-seo-demand/2026-10-07/`。
GSC、weekly report、`inspections.json` 位於 `/tmp/wenlan-seo/2026-10-07-demand/`。
這些都是可重新取得的外部資料，未加入 git；本文件保留會影響決策的解讀。

```bash
pnpm seo:demand:report -- --input /tmp/wenlan-seo-demand/2026-10-07/manifest.json --output /tmp/wenlan-seo-demand/2026-10-07/demand-report.md
```

本輪基底：`d4f1a734e6b0559cfc014076440fe872d0713fa9` 加本地流程／文件修改。
此報告與工具通過檢查不代表排名改善；發布、合併、廣告和索引提交均未執行。

驗證：真實三語 manifest 經上述 `pnpm` 命令成功產出報告；檢查了三語 queried、
EN exact query/page 數值、跨語 owner 分離與簡中未知值。`pnpm test:seo` 完成
385 個 SEO 測試與 133 個量測測試，另有 2 個 skipped；`pnpm seo:weekly:sample`
成功。這些是工具／流程檢查，不是自然搜尋成效。

## Reddit 實務與 skills 交叉查證

2026-10-07 補查；本節基底 `d5a989945f5c639689fd8b181279c7ef03d9ed48`，含既有未提交流程檔。
使用者要的是「在 Reddit 研究別人如何增加 Google 自然搜尋」，不是 Reddit 發帖獲客。
本次整理 17 個不同討論（含前輪重查），另核對 4 份業者原始研究；這是目的性樣本，
不是全 Reddit 的系統性統計。兩個 native explorer（工具角色設定為 Luna/high）分查
案例與實驗，主線核對關鍵原文、skills 及本案適配性；未委派 Claude 改文章。

### 案例、社群回應與可信程度

「票」是搜尋索引快照顯示的淨分，非本次即時票數或成功複製人數；無法可靠取得的
票數與留言總數標為未知。以下流量均為發文者自述，沒有取得其 GSC 帳戶獨立稽核。
交叉貼文只計一案；恭喜、索取模板、同一作者回覆均不算獨立驗證。

| 討論／時間 | 指標、作法 | 社群回應與查證結果 |
| --- | --- | --- |
| [工作流程 SaaS](https://www.reddit.com/r/SEO/comments/s3ry25/)／2022-01 | <2 年月自然流量 0→20 萬；聚焦產品相關詞、重寫、內鏈 | 約 220 票；其他版 373／51 票是同一案例。原作者留言承認已有 PR 自然連結；網站匿名，不能證明「無外鏈也成功」或哪一項造成成長。 |
| [Gainframe](https://www.reddit.com/r/juststart/comments/1umaicw/how_i_grew_my_apps_organic_traffic_15x_in_90_days/)／2026-07 | 90 天 GSC 共 2,143 clicks；每日約 7→90–108。改搜尋不匹配頁、開場、標題與比較文 | 票數未知；可見留言主要提問／稱讚，無獨立複製。具名站，但自有站圖表頁未成功開啟；期間 Google 更新，收入還含其他來源。保留方法假說。 |
| [四個排程工具](https://www.reddit.com/r/SaaS/comments/1s3olbr/)／2026-03 | 月自然 visits 約 5k→19k；做時區、排程、投票等免費工具 | 票數未知、開啟頁未呈現實質留言；公司匿名。作者承認同時有內容與站點變更；無工具頁獨立數據，不足以把增幅歸因工具。 |
| [六個計算器](https://www.reddit.com/r/SaaS/comments/1rx52bl/)／2026-03 | Beyondfolder：六週 1,310 impressions／6 clicks／position 21.8；KD 1–8 | 票數未知；回覆多為鼓勵。是「有工具、低 KD 仍低點擊」反例；六週不足以判定長期失敗，銷售不能直接算 SEO。 |
| [Unicorn Platform](https://www.reddit.com/r/SaaS/comments/1as78j4/)／2024-02 | 大量 AI 輔助文章、目錄與交叉連結、多項自有 SEO 工具 | 票數未知；留言指出是自有工具廣告，作者承認商業關係。多項變更與推銷混在一起，不用作購買、批量內容或「強制索引」的效益證據。 |
| [AquaSwitch](https://www.reddit.com/r/Entrepreneur/comments/yfom5e/)／2022-10 | 高購買意圖比較詞、內容與技術調整；自述 2022-03 有 162 organic leads | 票數未知；具名商業水費服務及連結證據，並非 SaaS。保留少量 Ads、追蹤曾有誤差；不能說全公司獲客只靠 SEO。 |
| [HeyHuman](https://www.reddit.com/r/SEO/comments/1b97ze3/)／2024-03 | 三個月 15 Google clicks、僅 8 頁索引；已做 metadata、內鏈、sitemap | 約 6 票；作者補充 Webflow→React 遷移與 crawled/discovered-not-indexed。留言建議不能代替修复後讀數；尚無已查得恢復結果。 |
| [匿名 B2B SaaS +50%](https://www.reddit.com/r/SaaS/comments/1ny1skc/)／2025-10 | 六個月月 organic visits 2.8k→4.2k；內容、內鏈、約 15 外鏈一起做 | 約 6 票；無具名站／可核對報表／獨立佐證。降級，不據此認定外鏈回報。 |
| [Catfishes](https://www.reddit.com/r/SaaS/comments/1d9z9uc/)／2024-06 | 自述五個月無自然流量後突然成長；大量相似 landing pages | 票數未知；留言質疑重複內容，作者承認沿用內容改部分文字／metadata。無可靠來源拆分與長期結果，不照搬。 |
| [SanctionsAtlas](https://www.reddit.com/r/SaaS/comments/1uydtdm/)／2026-07 | 數萬資料頁，稱索引後很快有流量 | 約 7 票；無具體 click 數，圖片未能讀取，留言問轉換而未提供佐證。只作資料型頁面候選，不算成長證據。 |
| [MyDraftly 討論](https://www.reddit.com/r/SEO/comments/1vdb2ju/)／2026-08 | 三個月 10k impressions／137 clicks、position 16.3；AI 文初期上升後停滯 | 約 3 票；匿名站，外鏈與選題建議未經後續測試。反駁「已有內容與曝光就必然持續成長」。 |
| [短暫恢復又下跌](https://www.reddit.com/r/SEO/comments/1wiycv7/)／2026-09 | 自述 565/600 頁索引，已修速度、內鏈、目錄；仍跌 | 約 8 票；未公開站與流量幅度，沒有解決後讀數。只能說檢查通過不等於成長，不診斷其因果。 |
| [Skroutz 技術案例](https://www.reddit.com/r/bigseo/comments/dqkwkj/)／2019-11 | [具名工程原文](https://engineering.skroutz.gr/blog/SEO-Crawl-Budget-Optimization-2019/)：1.5 年處理數千萬重複／篩選 URLs，縮短新 URL 索引與排名恢復時間 | 約 80 票；同行以 zimbio.com 經驗補充 crawler 資源隔離，其他人討論 pagination/redirect。工程細節可核對，但 30M sessions 是全流量規模、約 80% organic，非該改動的新增量；大型站作法不套給 Wenlan。 |
| [四年站點追蹤](https://www.reddit.com/r/juststart/comments/18x63dp/)／2024-01 | 多年收入／pageviews 表，外鏈與內容；明示 UA→GA4 造成 PV 斷點 | 約 74 票；同行同時分享買鏈經驗與更新後損失。收入含持續佣金，流量含其他引擎；不是純 Google 成長證據，也無社群一致結論。 |
| [大量刪頁討論](https://www.reddit.com/r/SEO/comments/1p4gooe/)／2025-11 | 轉述刪 50–70% 頁面後增長，試圖解釋機制 | 約 41 票；具體質疑原始案例不存在、其他同步變更未排除。不是可採用的刪頁實驗；保留為查證失敗例。 |
| [15 個月百萬流量](https://www.reddit.com/r/juststart/comments/ra9zav/)／2021-12 | 自述 organic sessions 3,818→1,090,930；買既有站、內容產能、PR、演算法下跌後調整 | 約 202 票；有月表與作者澄清，無公開站；影片未能核對。留言多提問／稱讚，不能視為獨立複製；不是新站只寫文章的案例。 |
| [第三個月更新](https://www.reddit.com/r/juststart/comments/sbvuiz/)／2022-01 | 自述近 30 日 GSC 1.56k clicks／45.1k impressions，約 100 篇文章 | 約 46 票；無主動建鏈卻回覆 GSC 有 94 links。圖未能核對；HARO 留言包含出版者經驗和零成果成本反例，並非一致支持。主線重開失敗，保留研究子代理已讀原文的限制。 |

結論：較多人參與的討論存在，但未找到足以稱為「大量獨立使用者成功複製同一方法」
的證據。不要把較高票數等同實證，也不要把 17 案說成 17 次成功驗證。

### 用較強資料檢查方法

| 原始資料 | 可以支持的判斷 | 不能外推的部分 |
| --- | --- | --- |
| [SearchPilot 地區頁分組測試](https://www.searchpilot.com/resources/blog/seo-testing-local-landing-pages)／2022，更新 2023 | 約 8,000 regional pages；新增相關內鏈的組別 organic traffic +7%。同篇標題測試亦有 -2%／+18% 及跨站相反結果 | 高流量、同類頁面、原先缺系統性內鏈；不是 Wenlan 改內鏈會 +7%，也不是 title 改動必漲。 |
| [SearchPilot 摘要測試](https://www.searchpilot.com/resources/case-studies/seo-split-test-lessons-forcing-google-respect-meta-descriptions-data-nosnippet)／2020 | 以 data-nosnippet 限制正文摘要、迫使使用自訂 description 的組別，約四週 organic traffic -3%；後續修改未定論 | 測的是限制 Google 摘要選擇，不是所有 description 改寫；結果是流量，不單是排名。 |
| [Ahrefs 內容更新](https://ahrefs.com/blog/republishing-content/)／2025 更新 | 具名 link-reclamation 頁 2024-08 重寫後估計自然流量約三倍，值得檢查陳舊答案與需求不符 | 業者自有頁、前後比較、估計 visits，沒有隔離其他原因；不主張照抄增幅或只改日期。 |
| [Ahrefs 移除連結訊號](https://ahrefs.com/blog/impact-of-links/)／2021 | 三頁 disavow 3,476 links 四週後撤回；估計自然流量／排名出現下降與恢復，支持連結可能重要 | 小樣本無控制，重抓與競爭結果也變動；估計流量非等同 GSC clicks。不能據此選定目錄、買鏈或 PR 為最高報酬渠道。 |

這些業者有商業利益，仍須按其方法而非品牌評價證據。分組測試比單站前後故事更能
隔離改動，但公開摘要仍未給完整原始資料；小站不能假裝有同樣統計把握。

### 九個 skill 的原文與本案適配檢查

讀了 OpenSEO 公開 main 的 5 個 skills，以及本機 Ubersuggest 3.0.0 的 4 個 skills
（另讀 methodology reference）。這是原文審查加既有資料適配，不是九項服務端到端實測。

| Skill | 有用且可重用的部分 | 必須修正／執行界限 |
| --- | --- | --- |
| [OpenSEO keyword-research](https://github.com/every-app/open-seo/blob/main/.agents/skills/keyword-research/SKILL.md) | GSC 起步、需求與產品匹配、SERP 檢查、近期研究重用 | 預設 impressions≥50、position 5–20 會漏本案低量／較後排詞；探索可放寬，改頁門檻仍按本案。 |
| [OpenSEO keyword-clustering](https://github.com/every-app/open-seo/blob/main/.agents/skills/keyword-clustering/SKILL.md) | 按意圖及結果重合分群，對應既有頁 | 同詞有多個 URL 只是需檢查，不能直接診斷有害競食或合併頁面。 |
| [OpenSEO seo-audit](https://github.com/every-app/open-seo/blob/main/.agents/skills/seo-audit/SKILL.md) | 比較多種機會、查真實頁面／結果、記錄未採用候選原因、保留 unknown | 比 Ubersuggest action-plan 的強制單一原因更合本案；但完整流程需 MCP／project／report，US 預設不可代替三語市場。 |
| [OpenSEO link-prospecting](https://github.com/every-app/open-seo/blob/main/.agents/skills/link-prospecting/SKILL.md) | 先確認值得引用的素材，再找相關編輯頁／資源頁，附具體引用理由與聯絡來源 | 找到候選不等於取得連結，更不等於點擊／排名提升；只重用方法，未執行 outreach。 |
| [OpenSEO seo-coach](https://github.com/every-app/open-seo/blob/main/.agents/skills/seo-coach/SKILL.md) | 讀已有脈絡、短答、選工作流程 | 是解釋與分流，沒有驗證最佳 SEO 方法的研究資料庫；不把專案唯一狀態搬進 vendor context。 |
| Ubersuggest seo-foundations | 不編數字、地區解析、費用／配額順序 | 其限定供應商、額度後 upsell、固定 SD 可贏門檻不採用；methodology 的「不索引就是技術問題」也不是充分診斷。 |
| Ubersuggest keyword-research | 現成候選擴展、metrics、SERP、分群 | 預設 20–40 詞／混合機會分數不合免費額度及證據要求；不把 autocomplete 當量值。 |
| Ubersuggest content-brief | 查看排名頁、意圖／形式、整理大綱 | 不照單採用「所有競品排名詞都要覆蓋」與預估 click 承諾；免費列數也不代表全部關鍵字。 |
| Ubersuggest seo-action-plan | 短答、先看已有工作、不亂跑所有工具 | 原文要求只選一個原因、把 domain_overview 無資料當無自然流量；拒絕這兩項，GSC 優先。 |

Ubersuggest 原文：本機已安裝包
`~/.codex/plugins/cache/openai-curated-remote/app-69457f8444848191918f7c00fea68076/3.0.0/skills/`；
四個同名子目錄的 `SKILL.md`，以及 `seo-foundations/references/methodology.md`。
不複製 vendor skills，不新增自己的同功能 skill。

**實際連線：**本輪 Ubersuggest auth 再次成功（free），user_limits 為 reports=3、
keywords=20；它們是 allowance，不是剩餘額度。`search_neilpatel_blog` 成功，但查
intent／content-update case study 返回演算法與關鍵字通用指南，沒有提供獨立案例验证。
沿用[同日已成功的 EN/TW 查詞與 403 紀錄](2026-10-07-shared-workflow-rerun.md)，
沒有重試已耗盡的 keyword reports，也沒有啟動付費功能。CN 仍未驗證成功。

**OpenSEO 邊界：**本次工具清單沒有 OpenSEO MCP。公開 skills 可讀，但不能稱完整
流程已跑通。[託管方案](https://www.openseo.so/pricing)為 $10/月；
[GSC MCP 說明](https://www.openseo.so/google-search-console-mcp)明示 GSC 不扣 credits
但包含於該訂閱。先前 UI 免費 credits 用完仍可讀 GSC，是當時帳戶觀察，不等於永久
免費 MCP 權利。沒有登入新方案、購買或自行架服務。

**本案檢查與決定：**用既有 exact query 的 8 impressions／position 22.125 檢查
OpenSEO 預設篩選，該詞會被雙重排除；這不能推導「沒有需求」。用同日舊 Ubersuggest
volume 50 與不同窗口 Planner 1K–10K 檢查排序，不能直接混算。三語／未知地區、免費
配額、既有頁 ownership 與 crawl 窗口仍由共用流程把關。只把方法查證、預設防誤判與
OpenSEO prospecting 路由寫回流程；沒有據外站案例另建工具、重寫 Claude 文章或發外鏈。

## 全量候選核對

核對日期：2026-10-07（America/Los_Angeles；最後查核的 UTC 日期為 10-08）。
網站來源 `d5a989945f5c639689fd8b181279c7ef03d9ed48`，產品 README 來源
`c85678549fb1eab814c1d0b76c69e9042d261b41`。本節及
[逐詞決定表](2026-10-07-demand-validation.csv) 取代本日早期報告的候選初判；
這是已取得資料的全量核對，不是全部市場關鍵字普查，也不是新文章 backlog。

### 範圍與真正完成的檢查

| 輸入 | 原始候選紀錄 | 同語言去重後 | 查核方式 |
| --- | ---: | ---: | --- |
| 英文：Planner 84、Ubersuggest 11、Keyword Tool 10 | 105 | 102 | 全部逐詞查詢；8 個另看 Google 搜尋頁 |
| 繁中：Planner 14、Ubersuggest 27 個不同原始字串 | 41 | 33 | 全部逐詞查詢；2 個另看 Google 搜尋頁 |
| 簡中：Planner 15、Keyword Tool 10 | 25 | 24 | 全部逐詞查詢；2 個另看 Google 搜尋頁 |
| 合計 | **171** | **159** | **12 個 Google 頁面實查＋147 個一般網路搜尋** |

去重保留原始字串、來源與語言；中文工具插入的空格不算新需求。逐詞表保存
來源、Planner 可核對的區間、期間、回傳地域、需求分類、決定、理由、既有頁、
查詢結果與證據網址。「已查詢」不等於「需求已證明」；結果混合的詞仍標示歧義。
一般網路搜尋不冒充 Google 當地排名。Google 使用 `hl`、`gl`、`pws=0`；
瀏覽器已登入且使用美國 IP，不是無偏的當地排名測試。廣告、影片、AI 摘要不計作
普通自然結果名次。快速換詞曾讀到前一頁，該批錯標資料已捨棄，按載入後標題重記。

另逐項核對同一完整窗口 **2026-09-09～10-06** 的 GSC：manifest 將相同資料放在
三個 cohort，共出現 228 列，實際只有 **76 個 query × page 列、59 個查詢**。
按頁面網址區分為 EN 59、繁中 14、簡中 3 列，不是三份分國家報表。可見列合計
8 點擊／286 曝光，不能替代 property 的 16／1,209；缺失查詢與隱私過濾不補造。
包含品牌、歧義及帶 `site:` 的研究式用語，不能全部視為目標客戶需求。

### 判斷與實際用途

159 個詞的決定是：**31 保留既有頁、65 待縮小需求、26 待查證、37 排除**。
「保留」指現有內容方向相符，不代表搜尋量、產品轉換或排名難度已逐詞證實。

| 需求方向 | 證據支持什麼 | 現在怎麼做 |
| --- | --- | --- |
| LLM Wiki／Karpathy 實作 | EN、繁中 Google 實查是原始方法、安裝與實作；本站 exact query 已有可見曝光。US Planner `karpathy llm wiki` 1K–10K，窗口為 2025-09～2026-08 | 保留三語 `distilled-wiki-pages-ai-memory`，沿新版 crawl 與 query × page 觀察；不是重新擴寫一批文章 |
| 用個人文件建立 AI 知識庫、找回內容並核對來源 | 個人任務與產品現有文件匯入、來源引用、更新審閱相符；[實際提問者](https://www.reddit.com/r/PKMS/comments/1iv8iim/what_ai_tools_you_use_to_build_a_personal/)要求報告整理、搜尋與長期取用，亦有人質疑可靠性。這是痛點證據，不是市場量或產品勝出證據 | 沿既有 `build-local-ai-knowledge-base-from-documents`／`choose-ai-knowledge-base-tool` 回答；不要把企業客服量算進個人需求 |
| Obsidian ＋ Claude Code 安裝、MCP、外掛、skills | US Planner 主詞 1K–10K；[Obsidian 外掛頁](https://community.obsidian.md/plugins/claude-code-ide)與實際結果明確是連接 vault／編輯器的操作。長尾詞多數無可用量值 | 既有 `wenlan-vs-obsidian-ai-memory` 已是 setup/MCP/plugin/skills 指南；不按每個變體新建頁。Wenlan 的唯讀 vault 來源只是後續需求的銜接，不是該外掛 |
| ChatGPT／Claude knowledge base | Google 同時出現官方產品知識功能、Projects、企業知識及外部建置指南；[Salesforce 的實作](https://engineering.salesforce.com/using-claude-to-build-an-ai-knowledge-base-in-30-minutes/)另證明「文件整理成持續使用的知識」是可觀察的工作流程 | 拆清「教我設定原產品」與「我要跨工具使用自己的資料」，未釐清前不把兩者當同一 landing page |
| 泛 PKM、knowledge base 軟體／建立／管理 | 大量結果是筆記方法、工具比較、企業文件、客服或雲端 RAG | 降低優先度；先限定讀者、資料與要完成的任務，不能只改成 AI 字眼 |
| 課程、Wumpus、書名、成語、學術資料庫 | [Berkeley 教材](https://inst.eecs.berkeley.edu/~cs188/textbook/logic/knowledge.html)、[Georgia Tech 課程](https://lucylabs.gatech.edu/kbai/)及字典／館藏結果對應其他用途 | 排除這些詞；不是因為沒量，而是流量不對題 |

**各語言的取捨：**英文可同時保留 Wiki 實作、個人 AI 文件任務及 Obsidian 操作，
但 generic AI knowledge base 的企業比例明顯，不能當成單一個人需求。繁中
`AI 知識庫` 有企業與個人實作混合，既有文章需維持「個人怎麼用」的明確範圍；
`llm wiki` 對應獨立實作頁。簡中 `本地知识库` 多為 RAG／本地模型部署，
`个人知识库软件` 才更接近個人選型；本地優先資料不等於所有推理都離線。
中國 Google 不能代表百度或全部簡中讀者。三語都沒有「已證明最容易進前五名」的證據。

**趨勢：**沿用同日已取的 Trends，US `llm wiki` 顯示相較前期 -80%；繁中與簡中
AI 知識庫各只有 5/89、1/89 個完整日為非零，不能據 breakout 字樣宣稱持續成長。
因此 Wiki 保留並測量，新增投入要看具體文件任務，不能押注熱詞必然回升。

### 修正了哪些錯判

- 不是所有「knowledge base in AI」都是教材：建置教學有現代 AI 用途；模糊詞保留待判。
- `llm wikipedia`、`llm degree wiki` 不再硬算作 Wiki 建置需求或一律斷言法律學位；維持待查證。
- `個人知識庫`／`個人 知識 庫`、`個人知識管理` 的重複來源現在有同一個決定，
  不再分別指向互相衝突的文章。繁中 Wiki 改回專屬實作 owner；不存在的
  `obsidian-claude-code` 站內路徑改成真正的 `wenlan-vs-obsidian-ai-memory`。
- 英文企業 AI 知識管理五詞一致暫緩；Notion 的結果不再套用到全部 25 個泛 PKM 詞。
- 中文 Keyword Tool 的「China 要求／Global 回傳」保留原貌；不把候選字串當中國月量。
  Planner CSV 的 50／500 等欄位也不提升成精確量值；未保存 UI 區間的列維持未知。

### 可重查的證據與剩餘限制

原始帳戶資料及查詢紀錄留在 `/tmp/wenlan-seo-demand/2026-10-07/`，不提交原始
GSC 匯出。`full-check/` 包含 `en-inventory.json`、`tw-inventory.json`、
`cn-inventory.json`、`gsc-inventory.json`、`en-web-validation.json`、
`exact-en-a.json`（40 詞）、`exact-en-b.json`（40 詞）、`exact-zh.json`（18 詞）、
`four-gap-searches.json`（補回四筆缺少可歸屬 URL 的查詢）、
`exact-en-attribution.json`（14 詞再以獨立查詢補齊逐詞來源）及
`google-observations.json`（12 次已確認 Google 頁面）。初稿與補查差異由最終 CSV 裁決，
不把初稿另當工作隊列；`coverage-summary.json` 記錄列數與最終檔案 SHA-256，
`source-fingerprints.json` 固定九個輸入檔，`verification-receipt.json` 記錄最終核對。

三個 explorer 分別完成盤點／補查；獨立 auditor 逐項對回原始輸入，找出的重複決定、
錯誤 owner、Notion 家族誤套及 exact-search 標記問題已在最終表修正。收尾核對另找出
合併列的 China／Global 標示與 14 筆英文來源歸屬不足，已補正地域並逐詞重查；
其中兩個技術研究詞由待查改為排除，其餘決定保留。
使用 native explorer（GPT-6 Luna/high）與 auditor（GPT-6 Sol/xhigh）角色預設，
不是跨 Claude 共識驗證。`pnpm seo:intent:check` 通過：173/173 sitemap URL 有
locale-aware owner；這項檢查不證明搜尋意圖、產品效果或 Google 排名。

Keyword Tool EN 只實際回傳 10/327，CN 10/36；未取得的分頁不是本次已驗證內容。
Ubersuggest 本日額度耗盡不抹去先前證據，但舊估值也不能冒充當前量。
未付費、未重寫 Claude 的文章、未發布、未新增排程。產品能力只查來源文件，
未重新實測相較 plain files 更省時、語義更正確或轉換更好。

**完成的是既有需求池查核；尚未證明的是獲客結果。** 下一個有用動作仍是讓既有
實作頁承接上述具體任務，確認新版 crawl 後比較同窗口的曝光、點擊及可用的後續行為；
只有候選詞或 plugin 成功回傳，不足以承諾排名與流量。
