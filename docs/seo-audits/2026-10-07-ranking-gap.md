# 三語搜尋競爭與排名缺口核對

日期：2026-10-07（America/Los_Angeles）。結論：**現有主題不是全部選錯，也不是再把文章寫長就能解決。先保留已有需求的實作頁，驗證新版被抓取，補同任務的產品比較，建立直接指向有用成果的獨立引用。** 最明確的新證據是核心指南的外部引用仍以自有內容為主；這不等於已證明低排名只由連結造成。

## 查了什麼、沒有查成什麼

- 承接 [159 個候選詞逐項核對](2026-10-07-demand-validation.csv)，按任務比較，不再新增一份關鍵字清單。
- 重用同日 12 次 Google UI 觀察，補做 7 次；去重為 **16 組語言市場 × 查詢**。新查詢包含繁中／簡中 Obsidian Claude Code、繁中個人 AI 知識庫、簡中 LLM Wiki。3 次是重查。
- 檢視 **43 個不同外部 URL 的可讀正文或節錄**：英文組 17、繁中組 12、簡中組 12，加主代理 2 篇。其中 32 個 URL 能對上當日 Google 觀察；另 11 個是補充參照，不能都稱為排名前列。逐頁範圍與比較見 [證據表](2026-10-07-ranking-pages.csv)。無法讀取的頁面另列；付費文章只讀公開部分。
- 新的 Google 擷取保留已載入頁面的結果標題連結，也可能包含相關卡片或重複結果；**不是每詞完整前十的中立排名測試**。登入瀏覽器、美國 IP、`hl/gl/pws=0` 的限制保留，簡中 Google 不代表百度或所有中文受眾。
- 比較目前三語文章原始碼，也確認正式英文 Wiki 頁已有可下載練習和 Tally 真實引用／修訂畫面。沒有把這些已有成果誤列為待新增功能。
- 即時讀取 GSC Links 全部 18 個顯示網域、21 個目標頁，並追到英文 Wiki 的 5 個來源 URL。GSC 搜尋成效重用同日已核對的完整 28 日資料，沒有重抓一套重疊報表。
- Ubersuggest 免費額度已耗盡，沒有重試或付費；沒有取得競爭頁的完整反向連結對照。因此不給「缺幾條連結就能前五」或第三方難度保證。

## 哪些任務值得繼續

Planner 量值沿用 2025-09～2026-08 的 UI 區間，不是本站流量；近似詞不相加。具體長尾没有量值時，不沿用大詞的月量。

| 任務／市場 | 搜尋者面前的替代方案 | Wenlan 已有內容與真正缺口 | 決定 |
| --- | --- | --- | --- |
| EN `karpathy llm wiki`／`llm wiki` | 原始 gist、可安裝 skill、Obsidian 外掛、實作者教學 | 現有頁已有原理、實作選擇、資料夾、CLAUDE.md、來源更新練習與實錄；缺的是同一任務下，Wenlan 比直接用檔案值得安裝的證據 | **保留為第一個驗證對象**。Planner 1K–10K；精確 karpathy 詞 8 曝光／0 點擊、平均 22.125，已有可辨認需求；不是再補一篇定義文 |
| zh-TW `llm wiki` | Kenming 的建置步驟與素材、Oberon 的部落格實作、Yu 的筆記法實測 | 既有繁中頁已教自建。競爭頁的可照做素材和真實使用經驗值得比較，但不意味我們完全沒有練習或畫面 | 保留既有頁；從「建好之後如何維護並查證」展示 Wenlan 的實際結果，不依 1 次可見曝光判定新版失敗 |
| zh-CN `llm wiki` | 原始模式、桌面軟體、中文自建教程 | 目前已有实现比較；開源桌面與免費模板已經能解決一部分任務 | 保留既有頁；必須與可用替代方法做同任務比較，不能只說把流程包成產品就更好 |
| EN／zh-TW／zh-CN `obsidian claude code`，及 MCP／skills／setup 等修飾詞 | 原生外掛、直接讀 vault、免費模板、具體每日工作教程 | 我們已覆蓋直讀、CLI、skills、MCP、外掛及安全步驟；Wenlan 的 Obsidian 來源唯讀、按需同步，並非原生 vault 編輯外掛 | **保留好用的設定指南，降低直接導購預期**。EN Planner 1K–10K；TW/CN 100–1K。只有讀者遇到跨工具共用、來源維護等問題，才自然引入 Wenlan |
| EN 個人 AI 文件知識庫／繁中個人 AI 知識庫 | 個人資料整理、原始文件問答和企業工具混在一起；Salesforce 有具體 Markdown 建置流程 | 個人文件頁已有輸入限制、同步與來源核對。競爭對手能直接給出檔案／提示詞；我們要展示第一次成功產生的可核對成果 | **保留為第二條驗證線**；以讀者提供的文件與具體提問驗證。精確 EN personal 詞的 Planner UI 區間未保存，不能聲稱市場最大 |
| zh-CN `本地知识库`／`个人知识库软件` | QAnything／Aliyun 本地 RAG、個人筆記工具、Wiki 桌面軟體 | 「離線文件問答」「企業部署」「維護跨 Agent 知識」不同；Wenlan local-first 不代表所有模型功能完全離線 | 既有建立／選型頁分清適用條件；Planner 各 10–100，不用泛「搭建」的 100–1K 替這兩個任務放大量值 |
| 泛 `AI knowledge base`／`agent knowledge base`／`knowledge base wiki` | Slack／Slite／Wisq 的企業搜尋、HR／客服；AWS Bedrock API；團隊 wiki 選型 | 多寫企業 RAG／客服内容會偏離產品。`knowledge base wiki` 的 26 曝光、平均 78.62 並非單靠 description 能解決 | **暫不硬爭泛詞**。有相關頁保留；先以受眾／任务筛掉不適配曝光，不另造企業採購內容 |

這是基於現有需求、產品適配與投入的優先次序，**不是已算出的最容易排名順序**。缺少同時期、同市場的競爭頁連結與排名長期資料，不能精確比較勝率。已完成的 LLM Wiki 內容仍有用；Trends 降溫只降低繼續擴寫同題的理由，不要求刪除成果或追逐另一個熱詞。

## 外部引用：這次直接查到的差距

即時 [GSC Links](https://search.google.com/search-console/links?resource_id=sc-domain%3Awenlan.app) 顯示 233 external links／18 linking sites。100 條來自自有舊域 `useorigin.app`；GitHub 66、mcpservers.org 20、docs.rs 12、crates.io 7。不能把網域總數或連結總數當成獨立編輯推薦。

英文 `/learn/distilled-wiki-pages-ai-memory` 只有 **5 條列報連結、2 個來源網域**：

| GSC 列報來源 | 條數 | 性質 |
| --- | --- | --- |
| `github.com/7xuanlu/wenlan/blob/{main,v0.17.6,v0.18.10,v0.18.7}/README.md` | 4 | 自有 README 的不同版本，不是 4 位作者推薦 |
| `npm.io/package/wenlan` | 1 | 套件內容展示；讀到的是 Wenlan README 式產品內容，不是獨立試用評測 |

其餘兩語 Wiki、本地文件與 Obsidian owner 沒出現在這份 21 列目標頁表；這只代表該表未列出。GSC 的 [Links 說明](https://support.google.com/webmasters/answer/9049606?hl=en) 明確指出它是樣本，還可能包含已移除的連結，且不標示 nofollow。因此這些數字既不能當所有現存連結，也不能單獨證明排名因果。9 月 342／12 的舊值不再當今天的現況。

**可採取的方向：增加與實作任務相關的獨立試用／引用，比再增加自有 README 版本更能補這個已觀察到的缺口。** 不表示付費目錄、買連結或大量社群貼文有效；此輪沒有取得、投稿或購買任何新引用。

## 內容之外，下一個應驗證的成果

不是再做一份漂亮的示意圖。現在已有三種不同證據：

1. Wiki 頁的可下載三份資料與人工參考答案：可練習，**不是產品執行結果**。
2. Tally 的真實來源引用和待審修訂畫面：證明可看見來源與修訂，**不證明修訂已核准且正確**。
3. 部分 scenario 頁的 v0.18.3 隔離測試畫面：讀回人工參考答案與來源變更後的過期狀態，**不證明 AI 已完成重建或跨工具正確使用**。

下一個最小有用比較應沿用現有 source-update 素材，在当前受支持版本跑一次：**相同三份來源 → 回答同一個問題並核對引用 → 改動已引用來源 → 保留矛盾與人工修改 → 審查更新 → 在另一個 AI 客戶端取得正確的更新答案**。與普通檔案＋Agent 比較實際步驟、失誤、需要的人工核對；不預設 Wenlan 勝出，不借用競品「30 分鐘」或「90 分鐘」的速度承諾。這是待執行驗證，這輪沒有把研究當成產品測試。

為何選這件事：[Salesforce 的實作](https://engineering.salesforce.com/using-claude-to-build-an-ai-knowledge-base-in-30-minutes/) 已用檔案與 skills 建立知識層；[Yu 的實測](https://yu-wenhao.com/zh-TW/blog/karpathy-zettelkasten-comparison/) 對照既有筆記系統與 Wiki 的整理差異；[Platformer 的親身使用](https://www.platformer.news/karpathy-llm-wiki-journalism-productivity/) 同時報告有用與持續維護負擔。這些支持比較「維護和重用的具體工作」，不是只比較名詞或功能表；它們是作者自述，不是 Wenlan 效果試驗。

第一讀者候選只保留一個：上述 **Yu WenHao 的實測文章及其讀者**。文章已比較既有 Obsidian 方法與新 Wiki，與同任務對照有直接關係；若 Wenlan 測試有可重現差異，可準備讓作者自行驗證的素材。這只是相關讀者路徑假說，沒有確認接受投稿、沒有承諾引用，也没有聯絡作者。若 plain files 同樣容易，停止「比 DIY 更省事」的主張；若結果有用但沒有觸達，檢查分發而非再改相同文章。

## 如何判定排名真的有改善

- 不用 property 平均位置或 page 平均位置替代目標詞。EN Wiki 頁 210 曝光／3 點擊、平均 8.9，不代表 `karpathy llm wiki` 在第 9；該詞是 8／0、22.125。Obsidian 頁 7.4 也不是精確組合詞名次。
- 同日 URL Inspection：EN／TW Wiki 最後抓取均是 09-09，CN 本地文件頁為 08-25；均早於 10-06 改写。這些舊排名不能評價新版。Obsidian 三語抓取也早於其改寫，詳見 [重跑證據](2026-10-07-shared-workflow-rerun.md)。
- 持續按既有週期觀察 GSC，先確認新 crawl，再用完整窗口評估新版；再次改頁須符合既有 page／qualified query 門檻與 cooldown，不是等 cooldown 才能讀數。觀察同一 query × page 的曝光、排名、點擊，另看自然落地頁的下載／使用行為；不把 GA4 驗收事件當獲客。
- 有曝光而位置仍後：檢查該詞的實際前排任務與外部引用；位置進入前列但少人點：再檢查該查詢顯示的標題、摘要和 SERP 版型；有人點卻不使用：查產品承諾與實際體驗。三件事不要混成一次 description 改寫。

## 可重查收據與限制

- 網站 HEAD `d5a989945f5c639689fd8b181279c7ef03d9ed48`；產品來源庫 HEAD `c85678549fb1eab814c1d0b76c69e9042d261b41`。本輪未改文章、未發布。
- Google：`/tmp/wenlan-seo-demand/2026-10-07/ranking-google.json`，加 `full-check/google-observations.json`。GSC：`/tmp/wenlan-seo/2026-10-07-ranking-links.json`，與同日需求 audit 的 09-09～10-06 視窗。
- 頁身：同目錄 `ranking-en.json`／`ranking-tw.json`／`ranking-cn.json`、`ranking-en-raw/`、`ranking-cn-google-observed-raw*.json`、`ranking-lead-fetch.json`。部分舊摘錄無逐位元原文，只保留 URL／範圍／工具收據；不能宣稱所有全文已歸檔。這些 `/tmp` 原件可能被清除，需重查時保留新舊時間區別；可持續使用的判斷保存在本表與既有決策頁。
- 工具時效陷阱已實際排除：Exa 回傳 claude-obsidian 的 9,983 stars；直接開 GitHub 顯示 15.4k，與文章相符，沒有把舊工具快照誤判成文章錯誤。星數仍不當 SEO 權重或需求量。
- 本輪三個 native explorer 使用設定角色預設（Luna/high），獨立 auditor 使用 Sol/xhigh；主代理核對整合。頁面數／工具成功是研究覆蓋，不是自然流量成果。
- 契約依據：`SEO-CAMPAIGN.md` 的 Candidate gate、Acquisition focus、Authority-first growth correction、Successor Goal Contract、Evidence roles and demand discovery；`seo-product-evidence-standard.md` 的 Demand decision before implementation。控制檢查 PASS，未變更契約或開新排程。

## 優先序修正與上層漏斗比較

同日使用者修正優先序：先解決相關搜尋曝光、排名與點擊，再評估進站後的使用。上文「先補同任務產品比較」保留為當時提案，**不再是當前首要動作**；目前決定以 [recovery](../seo-growth-recovery.md) 為準。以下重用已讀的 43 頁比較，不把補查引用頁混入原覆蓋數。

| 同題指南 | 對方具體做法 | 本站對照與可行判斷 |
| --- | --- | --- |
| [Darren Rowse：Obsidian + Claude Code](https://darrenrowse.com/posts/how-i-connected-claude-code-to-my-obsidian-vault-a-guide-for-non-coders) | 從桌面介面選資料夾，帶非技術讀者完成第一個任務 | 本站先給終端機指令，另有外掛選項；可改善的是新手第一條完整路徑，不是再加工具名 |
| [Kenming：LLM Wiki](https://kenming.idv.tw/karpathy-llm-wiki-fundamental/) | Windows 步驟、截圖、整包素材和 ingest/query/lint 提示 | 本站已有資料夾、CLAUDE.md、下載練習與真實畫面；差距是起步素材包裝與 OS 步驟，不是完全沒有示例 |
| [少數派：Obsidian 工作流](https://sspai.com/post/103119) | 連接後用日報、查找筆記、批次資料與提示詞展示日常工作 | 本站有連接方式和安全規則；候選改善是讓讀者跟做一個具體工作，減少只看選项卻無法開始的情況 |
| [MindStudio：LLM Wiki](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code) | 原理、資料夾、模板、設定與查詢 | 本站已有大量相同涵蓋，尚未證明存在足以解釋排名的內容差距；不能因對方在結果中就推定每一段都較好 |

上述是內容可用性差異，不是 Google 排名原因的實驗證明。逐頁閱讀範圍見原 CSV；新版本是否被抓取另見上文，不能用改版前排名評價它。文章仍由 Claude 編輯，本輪只修正決策與查核依據。

**補查競爭頁的公開引用痕跡：**

- [João Queirós 的文章](https://www.ai.joaoqueiros.com/blog/andrej-karpathy-skills) 在 Sources and credits 直接連到上述 MindStudio 指南，已點開核對目的 URL。這是一個其他作者引用指南的實例；未驗證其權威分數、引流量或排名貢獻。
- [Jordi Navarrete 的 LinkedIn 貼文](https://es.linkedin.com/posts/emovere_cada-semana-tu-equipo-pierde-horas-que-no-activity-7483434000913723392-HUJM) 在作者留言分享 Salesforce 的知識庫指南。[Enggist 彙整頁](https://enggist.vercel.app/?page=6) 也列該文，Read original 已核對指向原指南。前者是分享，後者是 AI 彙整，兩者均不當作獨立產品實測或有效 SEO 權重的證明。
- 用三篇競爭指南的 URL／slug 加排除本站條件搜尋公開引用；Kenming 未取得可確認的頁面級引用，維持未知。這不是完整 backlink 資料庫，查不到不表示沒有，也不能按本次找到的條數比較競爭強度。

結論：已有「怎麼讓讀者更容易完成任務」的具體差異，也有競爭指南被站外分享／引用的可查實例；**尚未隔離我們落後的各因素貢獻**。當前可做的是保留改版的觀察窗口、把上述內容差距供既有文章工作判斷、研究有讀者適配的引用路徑；不再把完整產品價值測試擋在前面。

## 五組改寫與核心頁獨立審查

審查範圍：依最近五組合併 #213～#217 辨認，不把五組當五個 URL。#213 是繁中／簡中知識庫，#214～#216 是三篇英文工具指南，#217 是三語 Obsidian，共 **8 個改寫 URL**。另盤點 #211 Wiki、來源型知識庫、工具選型三組既有核心頁。文章由 Claude 編輯，本輪未修改文章或發布。

本地來源 HEAD `d5a989945f5c639689fd8b181279c7ef03d9ed48`。已逐一打開正式 8 路由，核對 H1、正文與 metadata；**正式版本和本地並非完全相同**：正式 Claude 頁已加入 AGENTS.md 表格列，本地未有；中文知識庫 meta description 也不同。因此以正式頁判斷目前讀者看到的內容，本地行號只供定位，不宣稱正式網站就是這個 SHA。

審查問題是「是否回答特定問題、能否照做、說法正確、可查成果／限制、合理下一步」，不是以字數評分；原生工具參考文不必硬加 Wenlan 截圖。下列「基本合格」只指所查內容，不等於全裝置出版驗收、需求量或排名已成功。

| 最近改寫 | 語言 | 內容結論 | 已有價值／剩餘問題 |
| --- | --- | --- | --- |
| [Claude Code memory](https://wenlan.app/learn/claude-code-memory) #214 | EN | 基本合格，保留 | 直接回答位置、指令、開關、清理、記憶與續接的差別；正式頁已補 AGENTS.md 原生共用指令路徑。覆核後排除本地舊版的「未提 AGENTS.md」 finding |
| [Codex memory](https://wenlan.app/learn/how-to-give-codex-persistent-memory) #215 | EN | 基本合格，保留 | 開關、單次會話、儲存、AGENTS.md 與 resume 形成可用答案；獨立 reviewer 對照官方文件與本機 CLI 未找到重大事實錯誤。未把它當同詞競爭優勢已獲證明 |
| [MCP memory server](https://wenlan.app/learn/mcp-memory-server) #216 | EN | 需先補正設定可靠性 | 有設定、儲存、使用與比較，但示例漏建父資料夾，並把多 client 指向同 JSONL 說成共用方案而未交代同時寫入風險。見下方 R1/R2 |
| [Obsidian + Claude Code](https://wenlan.app/learn/wenlan-vs-obsidian-ai-memory) #217 | EN／TW／CN | 方向合格，有明確事實錯誤 | 原生直讀、CLAUDE.md、CLI、MCP、外掛均有指令；三語「每次都忘記」段落忽略原生 auto memory，需補正。新手安裝前提與第一個完整任務仍可改善，但不等於全篇無用 |
| [AI 知識庫](https://wenlan.app/zh-TW/learn/build-local-ai-knowledge-base-from-documents)／[个人知识库](https://wenlan.app/zh-CN/learn/build-local-ai-knowledge-base-from-documents) #213 | TW／CN | 入門比較可用，尚未兌現完整實作承諾 | 有個人工具比較、隱私界線與三題驗收；「一步步」「AI + Obsidian 實操」正文卻只有五項通用清單，沒有一套工具從匯入到具體答案的完整例子。可沿用並明確連接既有 Wiki 範例，或縮小標題承諾，不必另造文章 |

### 必須修正與可改善分開

- **R1／設定缺步，優先：** `src/app/(en)/learn/articles.ts:250,268` 指定 `$HOME/.mcp-memory/memory.jsonl`，沒有先建立父目錄。[上游 memory server 原始碼](https://github.com/modelcontextprotocol/servers/blob/main/src/memory/index.ts) 的自訂路徑分支與 saveGraph 不會 mkdir；以該實作推導，乾淨環境首次寫入會遇到 ENOENT。應先 `mkdir -p "$HOME/.mcp-memory"`，再設定。未安裝或執行 npm 套件，本次為來源檢查，最新 npm 發布版與 main 是否一致未驗證。
- **R2／資料遺失風險，優先：** 同檔 `:264,358` 的兩 client 共檔說法，在各自啟動 stdio server 時不等於共用單一程序；上述上游只有程序內的 mutation queue，整檔讀改寫仍可能被另一程序覆蓋。應限定依序使用，或選擇有協調寫入的共享服務。這是原始碼推導的並發風險，沒有做丟資料實測。
- **R3／事實衝突，優先：** 同檔 `:567`、`src/i18n/learn-articles.ts:737,4223` 的「不記得／其餘對話都忘記」過度絕對。[Claude 官方 memory 文件](https://code.claude.com/docs/en/memory) 區分新 context、auto memory 與歷史續接；本站另一篇正式指南也有此區分。應保留原生能力，再說明來源追蹤／跨工具知識維護的差異。
- **R4／承諾與交付落差，可改善：** 中文知識庫 `src/i18n/learn-articles.ts:963,4450`。具體範例至少應讓读者拿到一份輸入、知道在哪裡操作、看到什麼答案／出處；目前外連完整 Wiki 教程能補一部分，但本頁的「實操」承諾過大。這是文章教學是否完整，不要求先驗證整個 Wenlan 產品价值。
- **R5／比較過度簡化，可改善：** 中文知識庫與 Wiki 的「RAG 什麼都不留下／Wiki 只讀一次」是模式概括，不應寫成所有實作的保證；[原始模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 本身也描述持續更新、query 與 lint。具體產品是否保存回答、更新索引、重讀來源需分開說明。

### 五組以外，已存在的核心頁

| 頁面 | 已完成的部分 | 現在如何使用 |
| --- | --- | --- |
| [LLM Wiki](https://wenlan.app/learn/distilled-wiki-pages-ai-memory)（三語） | 已有原理、實作比較、可複製 CLAUDE.md、下載練習、人工參考答案和真實 Tally 畫面 | 可保留為主要搜尋入口；不是完美或已證明能前五。補 R5，避免把「15 分鐘」當已量測保證；優先觀察新版抓取／同詞表現 |
| [有來源的 AI 知識庫](https://wenlan.app/learn/source-backed-wiki-pages-ai-work)（三語） | 有來源、更新、審查流程與同一組實錄；英文正文仍較偏概要 | 作為了解維護方法的深入頁；不能拿它去硬爭偏團隊工具選型的泛 `knowledge base wiki` |
| [AI 知識庫工具選型](https://wenlan.app/learn/choose-ai-knowledge-base-tool)（三語） | 有替代工作流比較與八項檢查；正式頁的共用比較元件已確認存在 | 作為已在選工具者的決策頁；是選型方法，不是所有競品已跑過的實測排行榜 |

「核心」在此指已持有的主題入口／解題頁，不宣稱其他 Learn 頁沒有價值；沒有新增文章或關鍵字隊列。

驗證：主代理核對正式 8 個改寫 URL 及上述 3 個英文核心頁；Wiki 實錄錨點可跳轉、兩张可見實錄圖完成載入；檢視 Obsidian 桌面與選型頁 393px light 截圖，後者無水平溢出。這是有限視覺抽查，**未完成每頁雙主題桌面／393px 全矩陣**，不宣稱全面 UI PASS。獨立 reviewer 使用 Sol/xhigh 審三篇英文工具文，主代理以正式頁排除過時 finding。`seo:goal:control`、`seo:intent:check`（173/173）通過；未重跑 build，因為未改文章或程式。研究審查不計獲客成效。

### 需求依據再核對與本地修正

使用者於同日授權修正及補中文實例，並要求分開驗證「有人需要」與「內容寫對」。以下重讀同日原始 GSC／Planner 匯出，不是新的量測窗口。

| 頁面／搜尋詞 | 已有需求證據 | 不能推出的結論 |
| --- | --- | --- |
| EN Wiki：`karpathy llm wiki` | GSC 2026-09-09～10-06，對應 owner 8 曝光／0 點擊／22.125；US Planner 2025-09～2026-08 為 1K–10K／月 | 有人搜且本站出現過，但尚未獲得有效點擊；不能保證新版進前五 |
| Obsidian：`obsidian claude code` | US Planner 同期間 1K–10K／月；先前 SERP／社群支持設定、連接、讀 vault 任務 | 不是細分問題各自的量，也不是本站流量；GSC 無可見精確 joined row |
| 中文：`个人知识库搭建` | 搜尋建議與教學型結果；社群有讀取個人文件、找回先前資料的實際提問 | 無該精確詞保存的 Planner 量值；泛 `知识库搭建` 的 100–1K 不能借用。中文與不同地域不能合併 |
| Claude memory | `claude code memory claude.md official documentation` 與 `claude code memory files` 各 1 次 owner 曝光，位置 7／11 | 只是極小需求訊號；另有泛 `claude code` 1 次，不能算具體任務證據 |
| Codex／MCP memory | 本輪可見 GSC joined rows 與 Planner 原檔未提供對應具體詞證據 | 未知不是零需求；內容正確不代表已驗證獲客優先序 |

原始資料：`/tmp/wenlan-seo/2026-10-07-demand/gsc-query-pages.json`、`/tmp/wenlan-seo-demand/2026-10-07/planner-{en-us,zh-tw,zh-cn}.csv`；可持續查閱的市場設定與逐詞決定在 [需求報告](2026-10-07-trilingual-demand-workflow.md) 與 [159 詞表](2026-10-07-demand-validation.csv)。Planner CSV 的 50／500 為區間代表值，本文沿用原 UI 的 10–100／100–1K，不當精確月量。GSC 缺 joined row 不等於全頁無曝光。

[PKMS 實際提問](https://www.reddit.com/r/PKMS/comments/1iv8iim/what_ai_tools_you_use_to_build_a_personal/) 描述大量研究報告的匯入、整理與找回舊資訊需求；它支持問題存在，不能量化搜尋量或代表所有中文讀者。新增兩份筆記例子只示範「根據自己的文件回答、引用檔名、缺資料時不猜」；虛構專案設定是教學材料，不是使用者調查或產品執行結果。

**目前決定：** Wiki 與 Obsidian 有較強需求依據，保留為優先觀察入口；中文例子修補既有文章承諾，不新增題目。Claude／Codex／MCP 的正確性修復照做，但不能一概稱為同等程度的需求驗證。下次外部需求核對先補其精確詞與任務，對照同市場搜尋結果，再以本站 query × page 驗證是否被找到；不是再擴寫所有文章。

本地修正基於 `d5a989945f5c639689fd8b181279c7ef03d9ed48` 工作目錄：R1 建目錄、R2 依序共檔／避免跨程序同寫、R3 三語原生記憶界線、R4 繁簡中文兩份筆記→啟動→只讀提問→答案及出處。使用 native worker（Luna/high），主代理檢查 diff 與瀏覽器。沒有執行 npm memory server 或 Claude 教學情境，不宣稱端到端產品測試。

驗收收據：`pnpm lint`、`pnpm build`、`pnpm seo:technical:built`、`pnpm seo:scenario:check`、`pnpm test:goal`、`git diff --check` 通過；build 首次因 Google Fonts 網路失敗，允許下載後通過，IndexNow 明確 skip（非 production）。`pnpm test:seo` 386/387，剩下既有 CLAUDE.md 舊品牌句式斷言；決策頁超過 6000 bytes 的問題已精簡為 5519 bytes 並通過。`pnpm test:i18n` 85/86，既有中文知識庫來源 hash 不符：中文版未涵蓋當前英文的連線／匯入數檢查、來源更新同步、lint／curate 與目錄檔案界線，不能盲改 hash 隱藏。這兩項仍需發布前解決。

瀏覽器：本地 3427 逐一核對 MCP EN、Obsidian 三語與知識庫雙中文，共 6 URL 的修改文字；中文新增範例在 1280px／393px、light／dark 檢視，無頁面水平溢出，手機表格轉為可讀列卡。桌面檢視來源及啟動段落，手機檢視問題／參考答案；不是全站所有內容的視覺驗收。R5 的既有 RAG／Wiki 概括仍待收斂；未修改本轮 scope 外其他頁。未提交、未發布；部署版本差異仍須對齊。

最終本地內容 SHA-256（便於辨認驗證版本）：
- `src/app/(en)/learn/articles.ts`：`1ee3e5df55f93b9e1ded18b74e4229fd7a97c31c654bcdbd18a37f80631e800d`
- `src/i18n/learn-articles.ts`：`5a66656b82fdf71ab222ad84612c7d8bf7b109138d9d54d960e7cd8e40710d29`
- `src/i18n/learn-article-source-hashes.ts`：`8d3d7094c0ca921235975af9f968178b0cdf65214e1316a61a3d98a90f6d1618`


### 發布前：三個問題的補查與決定

此節是同日後續的**最新判斷**，取代上節「未保存到 Planner 精確詞」的缺口；不改寫舊 GSC 觀察。已在登入 Google Ads 的 Keyword Planner 實際逐詞輸入，Google network、2025-09～2026-08；每組分別選 US／English、China／Chinese simplified、Taiwan／Chinese traditional。下表是平均月搜尋量區間，中文 UI 插入空格只作排版正規化；不是本站曝光，不加總近似詞，不拿廣告競爭程度當自然排名難度。0–10 也不是零需求。

| 市場 | 精確提交詞 → UI 區間 |
| --- | --- |
| en-US | `claude code memory` 1K–10K；`codex memory` 100–1K；`mcp memory server` 10–100；`obsidian claude code setup` 10–100；`obsidian claude code mcp` 10–100；`obsidian claude code skills` 10–100；`personal ai knowledge base` 10–100；`claude code knowledge base` 10–100 |
| zh-CN-China | `个人知识库` 100–1K；`个人知识库搭建` 10–100；`个人知识库软件` 10–100；`本地知识库` 10–100；`obsidian claude code` 100–1K；`obsidian claude code 教程` 10–100；`ai 知识库搭建` 10–100 |
| zh-TW-Taiwan | `ai 知識庫` 100–1K；`個人知識庫` 10–100；`ai 知識庫建立` 10–100；`llm wiki 教學` 10–100；`個人知識庫建立` 0–10；`obsidian claude code 教學` 0–10；`obsidian ai 問答` 0–10 |

原始人工轉錄：`/tmp/wenlan-seo-demand/2026-10-07/planner-task-followup.json`。這補上 22 個任務詞的量級；China Google 不代表百度或全部簡中人口。沒有建立廣告、预算或付費活動。歷史年份與地區條件已在 UI 確認，並非把當日趨勢當全年月均。

| 既有頁面 | 人搜什麼、要做什麼 | 我們與對照頁的差距、處理 | Google 有沒有展示我們 |
| --- | --- | --- | --- |
| LLM Wiki EN／TW | `karpathy llm wiki`、`llm wiki 教學`；想理解並建好可用 wiki | 原始 gist、MindStudio、Kenming 有模式／設定／素材；本站已具備設定及練習，沒有證據支持再加一篇。修正 RAG 與讀一次的錯誤比較；保留既有教程觀察 | 舊完整窗口 EN 精確詞 8／0、22.125；TW 如何使用 1 次、位置20。證明出現過，不是新版已排好 |
| Obsidian 三語 | `obsidian claude code setup/mcp/skills`、中文教程；想接好 vault 並使用 | 本站已有三條路；查到官方 Claude Code IDE 已進 Community Plugins，但本文仍寫 GitHub。三語改成實際 Browse 安裝、終端 `/ide`；修正原生記憶否定。繁中更細的教學詞0–10，不另開頁 | 同窗口無精確組合詞 joined row；EN page平均7.4不能代替該詞排名 |
| 個人知識庫 TW／CN | `個人知識庫`、`个人知识库搭建`；想從自己資料問到答案 | 教程需要輸入、操作與答案，舊文只有清單。本輪補兩份虛構筆記、只讀問題、檔名引用與未知負責人；补連線／同步／審查步驟，維持個人文件範圍 | 同窗口無可見對應 joined row；需求存在不等於本站能被找到 |
| Claude／Codex／MCP memory | 精確工具詞已有上述量級；想設定持久記憶、位置與跨 client 使用 | #220 已集中 owner 並補原生指南，本輪保留；MCP 補建目錄與並發共檔限制，沒有因新量值再開文 | Claude 兩個具體變體各1次；其餘精確 joined row 未見。修正不宣稱突破排名 |

競爭來源由本輪 explorer 重新開啟：[Karpathy 原始模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)、[MindStudio 實作](https://www.mindstudio.ai/blog/andrej-karpathy-llm-wiki-knowledge-base-claude-code)、[Kenming 建置](https://kenming.idv.tw/karpathy-llm-wiki-fundamental/)、[Obsidian 官方外掛列表](https://community.obsidian.md/plugins/claude-code-ide)、[阿里雲本地檢索／雲端生成指南](https://help.aliyun.com/zh/model-studio/build-rag-application-based-on-local-retrieval)、[nashsu 實作](https://github.com/nashsu/llm_wiki/blob/main/README_CN.md)。它們是任務與功能對照；搜尋前排身分沿用前節有地域限制的 Google 觀察，本輪網頁搜尋不冒充新的 Google 排名。未證明 Wenlan 比這些工具更容易或更可靠。

**下一次如何判斷：** 延用週報，每個既有 owner 保留精確 query × page 的曝光、位置、點擊，先確認本次部署後 crawl。曝光不足時繼續檢查抓取與相關站外觸達，不能再以加長文章代替；曝光進前列但未點擊才檢查該詞實際 snippet。#220 的10個owner整併基線與本次修復分開記錄，不把重疊改动的成效單獨歸因於本輪。沒有建立新排程或重啟舊期限 campaign。

發布整合範圍：從最新 `origin/main e5f47b8` 建立 `codex/seo-demand-repairs`，保留 #220 的19頁合併、154 sitemap URL及已部署 AGENTS.md／metadata 修正。以前在舊 checkout 的失敗不得套到此版本。已解決中文來源對齊與翻譯 hash、舊 CLAUDE 品牌句式測試、剩餘 RAG 過度概括；共用 skill／流程隨此分支交付。獨立 Sol/xhigh 審查提出的授權狀態、來源檔覆寫和 RAG 同步用語三項已修復並完成一次 closure，無剩餘重要 finding。

最終發布前檢查：Goal check、scenario（18 families／154 owners）、intent（154/154）、Goal tests60/60、SEO377/377、measurement133通過／2預期skip、i18n86/86、report10/10、lint、production build、built technical、weekly fixture全部通過。報表新增拒絕覆寫既有檔案，測試保留來源、symlink、hardlink及舊報表。production build 在獨立依賴安裝後完成，非production IndexNow skip。

本地 production 3431 的瀏覽器驗收：雙中文知識庫新增範例／步驟、英文RAG圖在1280與393px、light／dark檢視；三語Obsidian安裝和記憶文字逐頁DOM核對。無觀察到水平溢出或console error，既有圖文元件沿用；截圖已在本次對話工具輸出檢視。未執行 Claude／MCP 實際情境或聲稱全站視覺驗收，未取得可上傳的截圖附件，因此PR只記驗收範圍，不冒稱附圖。此為品質修復，不是排名提升收據。

排程現況補查：本機既有 `weekly-origin-seo-cleanup`（名稱 `weekly-wenlan-seo`）為 PAUSED；沒有默默恢復或新建排程。流程與資料已可重用，但下一次讀數需人工啟動或使用者另行恢復排程。

### 較大需求的補查：不要把小詞當成增長策略

2026-10-07 晚間，使用者要求繼續寻找「量夠大、產品對題、可競爭」的方向。此節取代以 10–100 任務詞足以支撐主要增長的解讀，保留先前正確性修復；不是新版成效讀數。#223 已合併為 `46566c3227a267ebb98f2efad163c6a9fed5ad8c`，正式9頁文字和 deployed technical 通過；自動週報依使用者要求維持 PAUSED，往後手動追蹤。

**實做範圍：** 三個市場各提交10詞，下載 US71／TW61／CN28列（包含建議詞）的3份 Planner CSV；30個提交紀錄中29個有量級，`claude codex shared memory`沒有可用量值。沒有把160列建議當成160個合格需求。期間2025-09～2026-08、Google network，分別US/English、Taiwan/Chinese traditional、China/Chinese simplified。CSV50/500/5000是對應UI區間的代表值，不是精確月量；不加總相近詞。原檔與逐詞對帳：`/tmp/wenlan-seo-demand/2026-10-07/growth-{us,tw,cn}.csv`、`growth-followup.json`。

| 方向 | 新核對的平均月量級 | 需求與競爭判斷 | 決定 |
| --- | --- | --- | --- |
| `obsidian ai` | US1K–10K；TW/CN各100–1K | 真實提問是找回筆記、問答、引用、是否需要外掛；Google有個人實作者和社群頁，並非只有大廠首頁。但官方頁、AI Overview、影片亦分流；不能推導易排名 | **首選現有內容承接方向**；保留Obsidian owner回答接法、Wiki/文件owner回答來源更新。不是另寫泛AI工具文 |
| `obsidian claude code` | US1K–10K；TW/CN各100–1K | US/CN近三月變化−90%，TW0%；任務更明確，但全年月均掩蓋降溫 | 保留已完成指南和小詞段落，不能稱下一波成長趨勢 |
| `second brain ai` | US100–1K，Planner近三月+900% | 有自動整理、找回內容需求，亦混同名app／課程；新Trends近期點稀少，不能以+900%承諾持續增長 | **第二候選**，映射既有Obsidian第二大腦段落／文件流程，暫不獨立開頁 |
| `notebooklm alternative`／`local notebooklm` | US各100–1K；前者0%、後者−90% | 有來源問答需求，也有播客、影片、全離線需求；Wenlan不是全面替代。TW`NotebookLM 替代`、CN同詞各10–100 | 不列主攻；只有來源維護／跨工具的窄比較可能對題 |
| `ai knowledge base`／`personal knowledge management` | US各100–1K；TW`知識管理`100–1K；CN`AI 知识库`100–1K | 泛詞混企業客服、RAG實作、管理課程，不能把全部量分配給個人文件任務 | 保留既有owner，不擴寫百科式內容 |
| `llm wiki` | 本輪TW/CN各1K–10K；US沿用同日1K–10K | 原始詞有泛LLM/Wikipedia混意圖；先前US Trends降溫，不能借中文量推英文上升 | 保留實作入口，追已發布owner，不因熱詞再開文 |
| 跨Claude/Codex共用、Notion | `claude codex shared memory`量未知；`claude code knowledge base`US10–100；`notion ai alternative`US10–100；TW`notion ai`1K–10K | 跨工具問題對產品，但搜尋量未建立；Notion品牌量不等於替代需求 | 作產品轉換理由或既有頁細節，不能升格主要獲客詞 |

**近期趨勢的反證：** 新[US三詞Trends](https://trends.google.com/explore?date=today%203-m&geo=US&q=obsidian%20ai,second%20brain%20ai,obsidian%20claude%20code&hl=en)顯示 `obsidian ai` 7/10指數100，9/23～10/06多在17–22；`second brain ai`同段2–5，`obsidian claude code`3–6。只作已讀點的描述，不拿兩點算跌幅，不把0當沒有搜尋；10/07不完整點排除。這不足以證明任何一項持續爆發。CSV下載逾時，未宣稱匯出成功；可見點人工轉錄與SERP來源存`growth-public-observations.json`。

**Google實際結果和頁身對照：** US介面`obsidian ai`第一頁看到Obsidian官方、Reddit、Eric J. Ma、ssp.sh、GitHub專案、Medium、Data Science Dojo，另有AI Overview／影片／廣告。頁尾顯示非個人化，但已登入且IP在Sunnyvale；這是一次定性觀察，不是中立排名追蹤。主代理讀了[Eric實作全文](https://ericmjl.github.io/blog/2026/3/6/mastering-personal-knowledge-management-with-obsidian-and-ai/)（來源筆記→專案記錄→人工查證）、[ssp.sh全文](https://www.ssp.sh/brain/using-obsidian-with-ai/)（反對AI文字污染原筆記、推薦隔離）、[Reddit原始提問與回覆](https://www.reddit.com/r/ObsidianMD/comments/1fhhbnw/what_ai_tools_do_you_use_with_obsidian_how_do_you/)（找回不記得名稱的內容、引用、隱私及反對意見）。Data Science Dojo只拿到部分頁身，不列全文審完。

對照另讀[Smart Connections官方比較](https://smartconnections.app/obsidian-copilot/)及[Copilot原始repo](https://github.com/logancyang/obsidian-copilot)。他們也有來源、context、agent和維護工作流，**不能把「有引用／多AI」當成Wenlan獨有**。Wenlan現有Obsidian文章已有接法、第二大腦、AI筆記分離；文件owner已有匯入／同步／審查。因此缺口不是再補更多標題，而是讓讀者可直接比較：「同一份筆記修改後，原摘要如何被指出過時、如何審查，另一個AI接手時拿到哪個版本」。產品現有能力提供可測路徑；尚無同條件實測證明勝過上述替代方案。

**落地決定：** 第一優先是現有Obsidian入口→Wiki維護證據的同一條讀者路徑；第二大腦是同頁候選措辭，不新增owner。下一個最低成本檢查是既有素材能否完整展示上述來源變更結果，若缺則以兩份非私人筆記比較直接讀檔與Wenlan各一次；只有結果真有額外價值才提出精準頁面補強，不能宣稱更快／更準。排名方面沿用09-09～10-06 GSC基線，先查#223後crawl與精確query×page；未新抓GSC、不宣稱新版已排名。首批相關讀者路徑是既有Google入口及已查到的實作者受眾；潛在引用尚未取得，不宣稱外鏈或聯絡已完成。若新完整窗口仍無曝光，轉向查發現／引用原因，不能用再寫一篇掩蓋。

此輪使用一個native explorer（Luna/high）做五組獨立來源研究，主代理補Planner、Trends、Google實際結果與產品頁核對；社群票數不當SEO成功證據。本輪只更新研究決策，未修改公開文章、付費、聯絡站外或恢复排程。

### 下降詞之外的上升訊號

2026-10-07 補查並更正比較：`obsidian claude code` −90% 是 Planner 的 Three month change；`obsidian claude` +20% 是 Trends 在 `obsidian ai` 下的相關上升詞，US／近3月，截至10月。Planner匯出期間為2025-09～2026-08。不是同詞、同窗口、同指標，不能推論人群轉移。[Trends詞組還可涵蓋含有各字的更長搜尋](https://support.google.com/trends/answer/4359550?hl=en)，不是互斥人群。

Trends上一輪逐頁篩過50列，排除旅遊、食譜、筆電。`notebook lm` +750%、`graphify` +400%、`ai second brain` +40%、`second brain ai` +20%、`obsidian claude` +20%，只保留為候選線索，不宣稱各市場或最近每週都上升。`jev ai` Breakout且相對指數1，暫不優先。[增長定義](https://support.google.com/trends/answer/4355000?hl=en)；原始轉錄 `rising-followup.json`。

**同条件重查：** 本輪兩批各10詞、US／English／Google／2025-09～2026-08；實際下載2份CSV（含建議分別12與76列）。20個提交詞逐詞對帳，19個有量級；`chat with obsidian notes` 有列但量空白，為未知。虛擬表格首屏未顯示的列不可當未回傳。原始匯出 `rising-head-us.csv`、`rising-task-us.csv`；逐詞含變化值的 `rising-reconciled.json`，均在 `/tmp/wenlan-seo-demand/2026-10-07/`。CSV50/500等是UI區間代表值，不是精確月量；近似詞不加總。

| 觀察群 | 同一Planner月均區間／Three month change | 已核實的任務與切入判斷 |
| --- | --- | --- |
| Claude＋Obsidian | `obsidian claude`1K–10K／0%；`obsidian claude code`1K–10K／−90%；`claude obsidian integration`100–1K／0%；`obsidian ai plugin`100–1K／0% | **優先沿用現有Obsidian owner。** 接上現有筆記、跨會話使用是對題需求；直接讀檔、MCP、外掛已有可行方案，Wenlan不能把基本連接當獨有優勢。來源更新、引用與跨AI復用是待比較的進階任務 |
| AI第二大腦 | `ai second brain`100–1K／0%；`second brain ai`100–1K／+900%；`obsidian second brain`、`second brain app`、`ai note organizer`各100–1K／0%；`ai organize notes`10–100／0% | **第二優先，沿用既有筆記／文件owner。** 筆記整理太費事、有資料卻用不到的問題存在；不能把換字序的量相加，亦不能承諾全自動不審查或原地重整Obsidian |
| Graphify | `graphify`10K–100K／0%；`graphify obsidian`100–1K／0% | **觀察，不直接寫替代文。** 大量檔案轉成可查詢知識有重疊，但程式碼依賴分析不是同任務；同名產品也混量。需對照現有來源型Wiki頁與Graphify真實輸出，證明額外用途 |
| NotebookLM | `notebook lm`100K–1M／0%；`notebooklm alternative`100–1K／0%；`notebooklm obsidian`10–100／0%；`notebooklm sync`10–100／−100% | **只保留部分用途。** 把既有筆記交給AI、之後保持更新，有實際提問；這些窄詞量遠小於品牌。Wenlan沒有在本輪建立NotebookLM同步相容性，也不以播客、測驗或手機端功能作承諾 |

補充：`obsidian ai`1K–10K／0%；`obsidian ai search`10–100／0%。`ai note taking`10K–100K／0%，本輪建議集中會議逐字稿、Fireflies、Zoom，不能把大量全部算作本產品需求。以上只驗US英文；不外推繁簡中。

**可查的真實問題與反證：**

- [Obsidian→NotebookLM原始提問](https://www.reddit.com/r/ObsidianMD/comments/1m0ifo5/)希望整庫匯入、不逐個拖檔；回覆已有人用Claude MCP或檔案合併。這是任務證據，不是未被解決的市場或搜尋量。
- [第二大腦管理負擔](https://www.reddit.com/r/ObsidianMD/comments/1eglzk7/)談加入、整理、重用的摩擦；[AI添加筆記](https://www.reddit.com/r/ObsidianMD/comments/1djc65v/)作者同時探詢開發意願，證據強度較低，留言也反對跳過人工閱讀。不能只選贊成AI的回覆。
- [Graphify #162](https://github.com/Graphify-Labs/graphify/issues/162)是642份文稿的容量／分批問題；[#146](https://github.com/Graphify-Labs/graphify/issues/146)要求MCP、跨會話與檔案更新。後者是歷史請求，當前[官方skill](https://github.com/Graphify-Labs/graphify/blob/v8/graphify/skill-windows.md)已列MCP、增量與Wiki輸出，不能再宣稱競品沒有。[另一個同名Graphify](https://docs.getgraphify.com/docs/get-started/graphify-basics)也須排除混量。

主代理重讀上述5個問題頁及產品源文；一個native explorer（預設Luna/high）另找到8個候選來源，其中部分主代理重取失敗，不以8篇全數重驗宣稱完整。來源為歷史問題；現時是否仍未滿足需按產品現況核實。

**決策與下一步：** 先承接「讓Claude使用已有筆記」，其次「降低重複整理、讓資料可再次使用」；對應既有 `/learn/wenlan-vs-obsidian-ai-memory`、`/learn/build-local-ai-knowledge-base-from-documents`，Wiki維護輔助用 `/learn/migrate-obsidian-vault-to-llm-wiki`。來源已確認vault為唯讀、按需resync，不能包裝成NotebookLM自動同步或AI原地整理器。首次相關讀者仍來自這些owner的Google入口，新增量未實現。下一次手動讀數查同詞×owner曝光／位置／點擊及新版crawl；下一個內容判斷先看具體問題的Google結果、現有答案與缺口。若搜尋意圖以錄音、手機或程式碼圖譜為主則排除；若直接讀檔已滿足、無可證額外結果則不擴寫。保持原發布／cooldown邊界，未開新頁、恢復排程或承諾排名。

### 動詞與具體任務核對

2026-10-07；接續上節，不重做產品價值研究。依 candidate gate、acquisition focus、六個需求問題與 evidence roles 核對。工作樹 `ffa8f4c` 加本輪研究文件差異，公開文章未改。

**Planner：** 三市場各提交10詞，共30個精確提交詞；US／English、Taiwan／繁中、China／簡中，均 Google／2025-09～2026-08。實際下載3份 CSV，含建議90／11／11列；20個提交詞有非空量值、10個匯出量欄空白，30個都有回傳列。以下是UI量級，非CSV代表值50／500／5000的精確月量。空白不等於零；部分低量列UI顯示0–10而匯出空白，故不從空白推算精確量或宣稱無人搜尋。近似詞不加總。中國設定僅Google，不能代表百度或全體簡中受眾。

原始 `verb-us.csv`、`verb-tw.csv`、`verb-cn.csv` 與逐詞／條件／SHA256對帳 `verb-reconciled.json` 留在 `/tmp/wenlan-seo-demand/2026-10-07/`。繁簡詞僅忽略Google自動插入空白與英文大小寫作對帳，未合併字序或繁簡字。

| 美國英文提交詞 | 月均量級 |
| --- | --- |
| `obsidian organize notes` | 10–100 |
| `obsidian summarize notes` | 匯出空白；不可定量 |
| `obsidian ai search` | 10–100 |
| `claude organize notes` | 匯出空白；不可定量 |
| `connect claude to obsidian` | 100–1K |
| `ai note organizer` | 100–1K |
| `build a second brain` | 10–100 |
| `notebooklm sync` | 10–100 |
| `graphify obsidian` | 100–1K |
| `search notes with ai` | 匯出空白；不可定量 |

| 台灣繁中提交詞／量級 | 中國簡中提交詞／量級 |
| --- | --- |
| `AI 整理筆記`：100–1K | `AI 整理笔记`：10–100 |
| `AI 筆記整理`：100–1K | `AI 笔记整理`：匯出空白 |
| `Obsidian AI`：100–1K | `Obsidian AI`：100–1K |
| `Obsidian Claude`：100–1K | `Obsidian Claude`：100–1K |
| `Obsidian 整理筆記`：匯出空白 | `Obsidian 整理笔记`：匯出空白 |
| `Obsidian 搜尋`：匯出空白 | `Obsidian 搜索`：10–100 |
| `NotebookLM 同步`：匯出空白 | `NotebookLM 同步`：匯出空白 |
| `NotebookLM Obsidian`：10–100 | `NotebookLM Obsidian`：10–100 |
| `第二大腦 AI`：10–100 | `第二大脑 AI`：匯出空白 |
| `建立知識庫`：10–100 | `搭建知识库`：10–100 |

**直接Google觀察（4組）：** `claude obsidian integration`、`ai note organizer`（hl=en/gl=us）、`AI 整理筆記`（zh-TW/tw）、`AI 整理笔记`（zh-CN/cn），皆pws=0、登入狀態、桌面首個結果頁。介面顯示非個人化，但地理位置曾顯示Sunnyvale、簡中顯示未知；國別參數不是當地實體位置。以下為當次順序與結果型態，不是固定排名、GSC位置或排名因果。

| 查詢 | 當次主要自然結果／正文查核 | 對我們的判斷 |
| --- | --- | --- |
| claude obsidian integration | Reddit短指南、Obsidian Community IDE bridge、Darren Rowse非工程師指南、AgriciDaniel starter kit；下方亦有Starmorph指南。排除同名CRM ObsidianOS。4個正文已讀；Darren本輪僅fresh snippet，正文重取受阻，沿用前次有日期查核 | 不缺另一篇安裝教學。前排同時提供實際工作習慣、可安裝外掛、可直接取用的starter kit，競爭不只是文章字數 |
| ai note organizer | Evernote、Reddit「12年73頁筆記」、NoteGPT，其後Apple、Mindgrasp、PCMag、Microsoft、Notta；另有廣告、AI摘要與論壇模組。Reddit原文已讀 | 既有筆記整理需求確實存在，但同詞混會議錄音、課堂摘要、找工具；100–1K不可全歸Wenlan |
| AI 整理筆記 | ThetaWave、NotebookLM、Threads、Kuse、Notion、Lark、台大教學；ThetaWave及Kuse全文已讀 | 主要混課堂／考試與生成筆記，部分才是知識重用。ThetaWave直接給上傳→學習筆記／閃卡；Kuse給範例提示、格式、匯出及試用入口。是任務落地頁，不能以一篇泛知識庫文直接替代 |
| AI 整理笔记 | 飛書、Notion、知乎、Kuse、ThetaWave、萬興、Obsidian中文論壇、RemNote、Zoom；Notion主文與論壇已讀 | 也混錄音及學習工具；論壇明確要求分類、保留結構、可看AI改動，與我們既有Obsidian任務頁有關，卻不代表全部搜尋者要這件事 |

正文來源：[Reddit工作習慣](https://www.reddit.com/r/ClaudeAI/comments/1qr19df/claude_code_obsidian_how_i_use_it_short_guide/) · [Obsidian IDE外掛](https://community.obsidian.md/plugins/claude-code-ide) · [starter kit](https://github.com/AgriciDaniel/claude-obsidian) · [Starmorph五種連接路徑](https://blog.starmorph.com/blog/obsidian-claude-code-integration-guide) · [舊筆記分類去重提問](https://www.reddit.com/r/artificial/comments/18d6e92/ai_tools_for_organizing_73_pages_and_12_years_of/) · [ThetaWave繁中](https://thetawave.ai/zh-tw) · [Kuse繁中](https://www.kuse.ai/zh-tw/ai-tools/ai-notes-generator) · [Notion簡中](https://www.notion.com/zh-cn/help/guides/notion-ai-for-docs) · [中文Obsidian整理需求及反對意見](https://forum-zh.obsidian.md/t/topic/45459)。共9個正文／主文檢視；使用者自述與廠商功能聲稱未變成效果實測。

**目前答案與缺口：** 重新讀取現有三語Obsidian owner、知識庫owner及EN遷移頁。`src/app/(en)/learn/articles.ts:496–635`已教vault／CLAUDE.md／CLI搜尋／MCP／外掛，且有三筆記連結、summary、git diff等提示；繁簡對應內容亦在。PR223後中文知識庫已有兩份範例，先前「完全沒有實例」已過期。缺的是一個集中、可跟做的「既有筆記→具體問題→結果→回查原文」範例；不是再重寫連接步驟或重啟產品優勢對照。

**本輪決定：**

- 優先保留Obsidian連接owner，`connect claude to obsidian` US100–1K是直接任務證據。後續內容候選是在同頁補「用已有筆記完成一次查找／整理」，保留原文與審閱結果；是否原地編輯由Claude／Obsidian流程承擔，不誤稱Wenlan能重整vault。其獨立用途是即使不裝Wenlan也可完成任務。
- 「整理多年舊筆記」有英中獨立原始提問支持；分類、去重、摘要、找回資訊不可當同一成果。與現有來源型知識庫頁相符的只是引用可回查、重用知識部分。兩篇社群文支持問題存在，不量化其市場占比，也不證明Wenlan勝過替代工具。
- 不追整個「AI整理筆記」量；課堂錄音、考試閃卡、NotebookLM自動同步不硬轉為Wenlan承諾。`build a second brain` US1K–10K的Planner建議多書籍／Tiago Forte／課程，具體Google結果尚未讀，暫不以此較大量提高優先序。
- 重用既有產品適配結論；只有新增未驗證功能／速度／正確性宣稱才做對照。此輪不把更多產品測試設成解決曝光的前置條件。
- 下一個低成本排名檢查仍是#223後crawl與同詞×owner的GSC曝光／位置／點擊；本輪未刷新GSC。原有完整窗口／cooldown不變，暫不再改已部署文章。若新版被抓且符合門檻，優先測具體任務答案；若仍未被發現則查索引／入口／独立引用，不以再加長文章代替診斷。

未解：目前只有內容與結果型態差異，缺競品完整入站引用與受控比較，不能斷言排名低就是外鏈少或文章差；市場量亦尚未細分到每個整理子任務。首批讀者仍來自既有Google owner，新增曝光和點擊尚未證明。研究由主代理執行Planner與Google觀察，兩個native explorer分別核對既有內容與4個前排正文；未修改公開頁、付費、發信或恢復自動化。

### Obsidian 新版抓取與頁面表現複核

2026-10-07（本地日期），依使用者「請動手」補查三語既有owner。`ffa8f4c`加本輪研究文件；GSC與公開HTTP各自保存實際capturedAt於 `/tmp/wenlan-seo/2026-10-07-obsidian-followup/gsc-live.json`、`public-check.json`。沿用同日完成weekly的研究背景，只刷新指定三頁，未重跑全站報表。

| 版本 | GSC最後抓取（UTC） | 09-09～10-06頁面曝光／點擊 | 頁面平均位置 |
| --- | --- | --- | --- |
| EN | 2026-08-19 22:38:21 | 11／0 | 7.36 |
| zh-TW | 2026-08-01 22:04:09 | 1／0 | 5 |
| zh-CN | 2026-10-02 08:03:24 | 1／0 | 4 |

三頁URL Inspection均PASS、Submitted and indexed、pageFetch SUCCESSFUL、Google canonical與指定canonical一致。**仍沒有10-06改版後抓取證據**；不把PASS或收錄當新版已處理。這次搜尋API明確指定web、final、同一28日窗口與三個精確頁面；query×page回應沒有可見列，所以無法知道這13次曝光的搜尋詞，也不能把頁面平均位置當`obsidian claude code`名次。daily最後有回傳列的是10-03，這是最後有可見頁面曝光的日期，不是整個GSC最新資料日期。

公開HTTP：3篇文章、3個本語Learn入口、sitemap、robots共8個URL全200。文章index/follow、無X-Robots noindex、self-canonical正確；sitemap含三頁，lastmod都是10-06；各Learn入口已有直接可抓取連結，robots允許抓取。此窄檢查未見404、禁止索引、canonical或孤兒頁問題，不代表全站不存在其他技術問題。

**當時決定（已被下段使用者指示調整順序）：** 先處理新版被Google發現／重抓的問題，保留正文；沒有證據將曝光少歸因於新版寫得差。核對#222收據及19→10合併對照後，當天10個合併owner的重新檢索請求**不含這三個Obsidian URL**；不可拿該收據當它們已申請重抓。可供批准的下一步為對這三個canonical各提交一次Request indexing，非驗證修復、非重複送出10個已提交owner；這次只檢查，未提交。請求本身也不保證抓取或排名。之後按使用者要求手動讀取crawl，再評估同詞表現；既有自動化維持暫停。


### 先補教學，再重新檢索

使用者隨後要求先審查 Obsidian + Claude Code 文章，有明確改善就先做，再重新檢索。本次依這個具體指示補強既有三語 owner；不把它擴張成取消其他 owner 的 crawl／樣本／cooldown 門檻。依本輪已讀的 Authority correction、Content correction 與 product evidence standard 執行。

直接取得正式站三語正文後，確認10-06連接教學和#223記憶說明修正已上線；搜尋工具回傳的舊快取未用來判斷當前正文。具體缺口是開頭未交代安裝／登入，以及只有任務建議，沒有從輸入到核對答案的完整練習。已在同一篇補上：

- 安裝、登入、`claude --version`、模型存取條件及獨立練習 vault；依 [Claude Code quickstart](https://code.claude.com/docs/en/quickstart) 核對。
- 兩份明示虛構的 Markdown 筆記、可貼入對話的只讀提示、最新日期／負責人／未知場地的預期答案與原文核對；不需要先裝 MCP 或外掛。
- 找不到檔案、引用舊日期、編造未知資訊的處理。這是教學練習與人工推導的答案，**沒有宣稱已執行 Claude 模型測試、Wenlan 優勢或流量提升**。

既有標題、description、URL和搜尋方向未改；三語updatedAt為10-07，翻譯來源hash與日期固定檢查同步。驗證狀態：`ffa8f4cb08db35cddf0db20ed91d57752298498f`上的未提交修正版（兩份文章來源、來源hash及五份既有檢查檔）；goal、scenario、goal tests、SEO tests、多語tests、lint、build、built technical全部通過。IAB實際檢查EN／繁中／簡中，1440px與393px、深淺主題；新增範例／答案可讀，無頁面橫向溢出，三語console未見error。英文桌面檔名會在儲存格內換行，內容完整。檢查日誌留在`/tmp/wenlan-seo/2026-10-07-obsidian-followup/`。

**目前狀態：本地補強完成，未發布、未送Request indexing。** 後續順序為修正版上線並核對正式頁 → 三個canonical各請求一次 → 手動查新版crawl與同詞表現。不要拿重新檢索當排名提升，也不需把整篇否定後反覆重寫；既有自動化維持PAUSED。

### 信件、教學實測與 AI 搜尋複核

2026-10-08（本地）；`ffa8f4c`加既有未提交修正版。按使用者要求讀4封Ahrefs正文（兩封10-08稽核、09-17免費AEO課程、09-20入門直播），並開啟稽核詳情及課程原文；私人信件全文／帳戶資料不入庫。原始API、UI、模型結果及雜湊留在`/tmp/wenlan-seo/2026-10-08-validation/`。

**信件的實際意義：** Wenlan 183個URL、health97；30個description過短、28過長是工具警告，不是需求或排名因果。9個頁面共13條外部壞連結；詳情及即時HTTP交叉確認5個唯一目的地均404：GitHub main的CONTRIBUTING.md／SECURITY.md／CODE_OF_CONDUCT.md、Google Workspace 2026/05 NotebookLM自動同步公告、SegmentFault文章1190000048058746。涉及三語about、三語選型頁、兩個EN開發docs及CN召回測試頁。搜尋快取仍能讀GitHub舊正文，不代表目前URL有效。待修引用；這輪未改公開頁。Useorigin 5個redirect不是自動故障，須按遷移目的檢查。154個IndexNow未提交提示不是我們外部提交失敗的收據。

[免費AEO課程](https://ahrefs.com/academy/aeo-course)實際12課／1h26m；讀取研究課程正文，不宣稱看完全部影片。採用[關鍵字／prompt研究](https://ahrefs.com/academy/aeo-course/lesson-2-2)的任務適配、結果型態與「AI答完後為何仍需點進」檢查；免費課程不表示Brand Radar等工具免費。不能把課程建議當Wenlan成效實驗。

**驗證一：教學能否完成。** 從當前三語article物件直接抽取兩份虛構筆記與原提示，在三個獨立目錄各執行一次Claude（ACPX0.14.0／官方Claude ACP adapter0.75.1、Claude Code2.1.293；實際主模型Sonnet5.5，輔助Haiku5.5）。成功工具收據確認每次讀了兩檔；三次皆回答22日取代20日、Mei／小梅負責、場地未知，附檔名及原文。6檔前後SHA256相同，3次end_turn／命令exit0。這證明已登入環境的讀檔練習跑通，不是全新安裝、Obsidian GUI、Wenlan產品對照或流量效果測試。

**驗證二：搜尋效果。** 當天重查GSC三語Obsidian owner，仍是09-09～10-06 EN11／TW1／CN1曝光，皆0點擊；query×page無可見列。三頁已收錄，但crawl仍早於10-06改版，不能讀出新版效果；本地新增練習未發布。先前表格數字與限制保持有效。

**新增AI證據：** GSC實際介面`Performance → Generative AI features`，同一28日、Web，property總計131曝光、39個有可見列的URL。按URL語系加總頁面曝光EN139／TW12／CN7（合計158）；property一次可有多頁，所以158不能與131當同一指標或相加。繁簡首頁各6，TW來源型知識庫頁1，CN coding-agent知識庫頁1；三語Obsidian owner都沒有可見列，不能報成已獲AI流量。此報表只有曝光、沒有click/query；不能還原完整問題或判斷品牌／非品牌，也不能再加到Web曝光。定義見[Google](https://support.google.com/webmasters/answer/16984139?hl=en-GB)。

**長問題與三語：** 沿用10-07三市場逐詞Planner原始CSV，不把US、台灣、中國Google量互換，也不把短詞量給長問題。當前GSC匯出已有`llm wiki 如何 使用`的TW owner 1曝光；複雜英文`codex agents.md project instructions (site:developers.openai.com or site:openai.com)`亦1曝光，但可能是代理查詢，不能當人類客群證據。未取得相應簡中長問題，記未知。候選如「怎麼讓Claude查現有Obsidian筆記並附原文來源」較明確，但仍是假設用語；以社群原問、同意取得的讀者問題與各語系SERP／AI引用補證，不批量編問題冒充需求。

**決定：** SEO與AEO共用既有頁面／任務流程，新增分開量測AI引用曝光；不等SEO第一頁才開始觀察，也不宣稱AEO繞過需求驗證。[Ahrefs 2025的15,000問題研究](https://ahrefs.com/blog/ai-search-overlap/)發現AI助理與Google原問題前十引用重疊低，但同文另引AI Overview較高重疊；樣本、平台與年份不同，不套用同一比例。Bing可提供抽樣retrieval用語，非完整私人對話；此輪僅確認[能力文件](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)，未讀本站Bing帳戶。下一步修已確認失效引用，發布既有教學後手動查crawl及同詞表現；AI優先檢查已出現的相關知識庫頁能否帶來訪問。無新增排程、付費或索引提交。

### SEO／AEO 依存與候選用語實查

2026-10-08，回應使用者要求結束「尚待查證」。主代理實際操作Planner三市場18詞、重讀原始討論；兩個native explorer（Luna/high角色）分別找英／中文原問。未重跑教學測試、發布、提交索引或啟用廣告。

**依存結論：** [Ahrefs](https://ahrefs.com/aeo/what-is-aeo)、[iPullRank](https://ipullrank.com/ai-search-audit)、[Seer](https://www.seerinteractive.com/generative-engine-optimization)都保留SEO技術／內容基礎；Seer明確區分兩渠道，Ahrefs也說先能被傳統檢索發現。這支持「先解決基礎阻塞，再共同改善及分別量測」，不是全行業投票或AEO效果保證。[Google硬條件](https://developers.google.com/search/docs/appearance/ai-features)為已索引且可顯示snippet，沒有前十名門檻；不把此條件套成所有AI品牌提及皆須Google收錄。上輪「可以一起做」補上這個前提。

**Planner已查完：** US／English、Taiwan／Chinese(traditional)、China／Chinese(simplified)，Google、2025-09～2026-08；各6詞皆回傳。UI原文及18詞／雜湊對帳：`/tmp/wenlan-seo-demand/2026-10-08/questions-{us,tw,cn}.txt`、`questions-reconciled.json`。以下是月均範圍，0–10不能證明正搜尋量；近似詞不加總，中國Google不代表百度／全體簡中。

| 詞組 | 美國英文 | 台灣繁中 | 中國簡中 |
| --- | --- | --- | --- |
| 連接入口 | `connect claude to obsidian` 100–1K | `Obsidian Claude` 100–1K | `Obsidian Claude` 100–1K |
| AI查筆記 | `obsidian ai search` 10–100 | `Obsidian AI 搜尋` 0–10 | `Obsidian AI 搜索` 0–10 |
| 完整候選 | `search obsidian notes with claude and cite sources` 0–10 | `怎麼讓Claude查現有Obsidian筆記並附原文來源` 0–10 | 對應簡中完整句 0–10 |
| 其他細分 | `chat with obsidian notes`、`how to search obsidian notes with claude`、`obsidian ai citations`皆0–10 | `Obsidian 筆記問答`、`Claude 搜尋筆記`、`Obsidian AI 引用來源`皆0–10 | 對應三個簡中詞皆0–10 |

**任務證據成立，但拆開判斷：** 英文[原始討論](https://www.reddit.com/r/ObsidianMD/comments/1tkf93g/do_you_actually_find_use_ai_to_talk_to_your_vault/)有使用者實際嘗試AI查筆記，卻無法分清原筆記和AI補充；也有Claude處理既有vault的具體自述、反對AI寫筆記／速度太慢的回覆。[另一提問](https://www.reddit.com/r/ObsidianMD/comments/1v1iz8w/how_do_you_cope_when_search_cant_dig_up_a_note/)描述幾千篇雙語筆記找不回來。[簡中2024原問](https://forum-zh.obsidian.md/t/topic/42215)直接要求從搜出的筆記向LLM提問；[2025獨立求助](https://forum-zh.obsidian.md/t/topic/47122)反映vaultQA關聯性差。這些證實查找／依據已有資料回答的任務與困難，不證明所有人指定Claude或逐句引用，也不代表已有Copilot／Smart Connections不能完成。繁中查得的長篇自述有context容量等互相矛盾描述，未採為強證據；不能把簡中帖翻譯當繁中原問。中文62993帖僅snippet可讀，未用來宣布引用需求已獨立確認。

**本輪判定完成：** 保留「連接Claude與Obsidian」為既有三語頁入口；EN `obsidian ai search`作次要任務。不把三語完整候選句或「AI引用來源」升為主要增長關鍵字、不另建頁。正文的找回既有筆記／附來源／不補造內容有實際問題支持，是答案品質與讀者用途；不用再等待整句搜尋量才保留該練習。後續驗證對象是已選入口的新版crawl、同詞曝光／點擊與AI引用，不再反覆證明同一任務存在。


### Obsidian 競爭頁與文章補強

2026-10-08，使用者明確要求繼續補強既有文章並比較搜尋競爭頁；承接上一輪本地修正版，不新增 URL、不改主搜尋方向。`ffa8f4c`＋既有未提交變更。這是使用者指定的本地準備，不表示既有 GSC 改寫門檻已達成，也未授權發布。

**Google 實看：** IAB 桌面、登入狀態、`pws=0`；EN `connect claude to obsidian`（hl=en/gl=us）、TW/CN `Obsidian Claude`（各自 hl/gl），僅當次第一頁，不是中立長期排名。TW 頁尾顯示非個人化／台灣、位置不明；地區參數不改變實際 IP，CN Google 不代表百度。EN 可見 Reddit、Darren Rowse、Obsidian Community，AI Overview 引用 Darren／Reddit；TW 前四個一般網頁為科技翰林院、數位時代、claude-obsidian、Yu WenHao，AI 摘要另含 MindStudio／Obsidian；CN 前六個一般網頁為菜鳥、claude-obsidian、Obsidian Community、騰訊雲、Reddit、少數派。Wenlan 未出現在這三份第一頁觀察中；不外推精確排名或競品流量。

| 實讀來源 | 借鑑與限制 | 本次採用 |
| --- | --- | --- |
| [騰訊雲作者文章](https://cloud.tencent.com/developer/article/2646839) | 開發記錄痛點 → `/obsidian` → 日誌／Canvas；有輸入與結果。這是作者介紹第三方工具，並非騰訊自有產品；5K頁面計數不當搜尋點擊。 | 從兩份筆記接到一頁專案摘要，明確寫出驗收結果。 |
| [菜鳥教程](https://www.runoob.com/obsidian/obsidian-claude-code.html)、[少數派](https://sspai.com/post/103119) | 安裝、路徑、實際操作與畫面；內容有版本依賴，不能全抄。 | 保留已跑通的最小練習；選配另放後面。 |
| [科技翰林院](https://www.techhanlin.tw/claude-code-obsidian-second-brain/) | 直接答案、資料夾範本、日常用途；部分自動化／效果敘述未實證。 | 補適用情境表，不採速度或效果保證。 |
| [Obsidian 外掛頁](https://community.obsidian.md/plugins/claude-code-ide) | 精確功能、安裝和啟用動作，直接服務工具需求。 | 先解決連接；不把需要原生 vault 編輯的讀者硬導到唯讀來源工具。 |
| [claude-obsidian 原始 README](https://github.com/AgriciDaniel/claude-obsidian) | 已描述來源引用、維護與多 host；README 是功能主張，這輪沒安裝驗證。 | 不把三項當 Wenlan 獨有優勢；比較工作方式、可見審查及 vault 邊界。 |
| [Practical PKM](https://practicalpkm.com/how-to-use-claude-with-obsidian-to-do-your-best-thinking/) | AI Inbox、人決定保留什麼；補充方法來源，非本輪 Google 前排證據。 | 保留人工核對，不把 AI 輸出自動視為可信知識。 |

**三語修改範圍：** 保留已驗證的直讀練習；補「直接 Claude／vault skills／Wenlan」適用情境與兩份筆記後續試用。修正 Desktop 一概不能讀檔的說法，依 [官方 Desktop 文件](https://code.claude.com/docs/en/desktop) 區分 Code 分頁 Local 資料夾與一般聊天 MCP。修正 Obsidian 來源更新條件：按需重新同步，再請 AI 更新或配置背景更新；人工編輯過的 Page 在 AI 更新時走修訂提案，不是所有來源變更立即進待審。依產品 README 與 knowledge-guide 核對，不宣稱本輪已跑同資料 Wenlan 對照。

**證據界線：** 重用已存在的 Tally 實錄引用／修訂元件並保留其示範說明；主代理重新看過兩張原圖。它不是兩份練習筆記的實測、不證明較快較準。新增後續步驟是讀者驗收流程，先前三語 Claude 讀檔成功不能移作 Wenlan 成功證據。使用者後續確認名稱為 WeKnora 與 Nowledge Mem，具體產品比較見下段；騰訊雲作者教學不能代表 WeKnora。研究由一位 explorer（Luna/high）補來源；主代理實看 Google、原文及整合；本輪不用付費流量／連結工具，未啟用排程。


**指定競品核對：** 使用者補正後，再讀兩產品官方頁。三個上述非品牌 Google 第一頁觀察皆未見 WeKnora／Nowledge Mem；只代表這次目標詞快照，未知完整排名與自然流量。不能因品牌知名或功能多，就稱它們已在此詞勝出。

- [WeKnora](https://github.com/Tencent/WeKnora)：官方已同時提供 RAG、Agent、Wiki，並用用途分工說明；[MCP 文件](https://github.com/Tencent/WeKnora/blob/main/website-docs/03-features/08-mcp.md)提供知識庫範圍、工具權限與 Claude 等客戶端接入。可學「先讓讀者選工作，再給路徑」。它並非只有企業 RAG；但本次未確認官方 Obsidian vault connector，Markdown 匯入不等於 vault 同步。
- [Nowledge Mem：Your Notes, Everywhere](https://mem.nowledge.co/docs/use-cases/notes-everywhere)從找不到舊筆記／重複交代脈絡切入，給啟用 Obsidian、設定 vault path、提問的短流程；[Claude Code](https://mem.nowledge.co/docs/integrations/claude-code)分開列安裝、上下文載入與保存。這比 WeKnora 更貼近本篇個人任務。可學痛點→明確操作→第一個可見成果，不能把 integration 頁存在當排名成功。
- [Nowledge Crystals](https://mem.nowledge.co/docs/concepts/crystals)亦有來源連結、未審狀態及來源改變後重新評估；WeKnora 亦描述 Wiki 引用／歷史。引用、維護、跨 AI 共用與可見審查均不能當 Wenlan 獨有。這輪是文件核對，不是安裝實測或同任務勝負比較；不借用 Nowledge「never uploaded」宣稱，模型資料傳送另受配置影響。

採用範圍保持既有三語文章：選擇情境、可核對結果、來源更新條件、實錄入口。沒有新增競品比較 SEO 頁、填入未驗證的競品量值或承諾排名提升。

**本地驗證完成：** 在 `ffa8f4cb`＋本輪未提交內容上，goal／scenario／test:goal、test:i18n（86）、test:seo（377＋measurement 133、2項既有skip）、lint、build、technical:built及diff檢查通過。三語1440px桌面／393px手機、深淺色實看，未見頁面水平溢出；實錄圖片載入、繁中放大與關閉正常，瀏覽器無捕獲error。修正本次新增Next頁內連結在已有hash時重複串接的問題，以限定同頁的原生錨點處理；三語跳轉及最終建置繁中再驗證正確。局部畫面與檢查log保存在 `/tmp/wenlan-seo/2026-10-08-competitor/`，`verified-state.json`記錄檢查來源雜湊，`zh-TW-desktop-light.jpg`是最後建置畫面。這些只證明本地交付品質；新增Wenlan兩筆記後續練習未實跑、未發布、未提交索引，沒有新的流量成效讀數。

### 文案與 Wenlan 練習再驗證

2026-10-08，依使用者本輪指示修正文案與實作，仍為未發布修正版。拆開三語記憶／更新段落，減少未翻譯術語、重複與 star 數裝飾；修正「任何筆記」「一定送 Anthropic」「讀檔看不到屬性」及「幾百篇後」等過度絕對或無依據說法。沿用既有流程加入一句交付前文案與操作核對，不新增 Anti-AI 分數或額外流程文件。一位 native worker（配置 Luna/high）協助範圍內文字修訂；主代理整合、實跑及驗證。

**實跑找出的錯誤與修正：** 使用已安裝 App 的 Wenlan server／MCP 0.18.16，獨立資料與 Pages 目錄、loopback 57891、背景模型關閉，僅使用虛構筆記。兩來源建立 Page 實際回 HTTP 422：預設至少三筆獨立來源。新增有任務用途的 `03-checklist.md`（15 分鐘、確認場地後寄邀請），保留原兩筆記 Claude 入門練習。英文三來源建立與追溯成功，檔案 hash 未被 Wenlan 改寫；繁中匯入、建立、日期改為24日、重同步、同 Page ID 更新成功，version 2、stale_reason=null。摘要由本輪代理讀來源後經正式 MCP 寫入，不是背景模型自動生成測試。

**不能抹掉的限制：** 英文人工修改分支確實產生待審提案，接受後正文與人工補充正確，但短摘要仍含舊日期、stale_reason仍為source_updated；本輪未改產品程式。建立時亦出現 top-10 self-retrieval 警告，不能宣稱按標題搜尋已成功。文章因此保留 Page ID、核對正文與來源，短摘要只描述用途；入門更新練習先不手動改 Page，不承諾所有狀態自動同步。原生桌面點擊、首次安裝、分別在真實 Claude/Codex 主機操作、簡中 runtime fixture 均未本輪實測；設定入口與標籤依產品來源碼核對。Tally 圖片仍是另一個示範，沒有冒充本輪畫面。原始請求／回應與 `runtime-verification.json` 在 `/tmp/wenlan-seo/2026-10-08-editorial/`；測試 daemon 已停止。

**本輪交付檢查：** `ffa8f4cb`＋本輪工作區變更；goal／scenario／test:goal、test:seo（377，measurement 133＋2既有 skip）、test:i18n（86）、lint、build、technical:built、diff 檢查通過。第一次 build 遇 Google Fonts 暫時下載失敗，原碼不變重跑成功，失敗與成功 log 均保留。最終 production build 在本機 3118 實看三語 1440px／393px、深淺色；新增練習可讀，無頁面水平溢出，EN／TW 實錄錨點正確，TW 兩張實錄圖片載入，未捕獲 console error。桌面英文檔名會在表格窄欄換行，內容完整。畫面、執行 log 及來源雜湊記錄 `verified-state.json` 存於同一 `/tmp/wenlan-seo/2026-10-08-editorial/`。未發布、未提交索引，這些驗證不代表搜尋曝光或使用率已提升。

### 曝光與點擊入口獨立審查

2026-10-08；主代理重取 GSC／正式 HTTP／Google 頁面，一位未參與改稿的 reviewer（配置 Sol/xhigh）獨立讀三語修改、metadata 與入口。沿用 authority／evidence 規則及本篇既有實驗；本輪只審查，未改文章或發布。`ffa8f4cb`＋前輪未提交變更。

- **能否被看見：** 新取 URL Inspection 三頁仍 indexed／canonical 正確，但最後 crawl EN 08-19、TW 08-01、CN 10-02，早於 10-06 已發布版本。同一 final Web 窗口 09-09～10-06 仍為 EN 11／TW 1／CN 1 次頁面曝光，各 0 點擊；無可見 query×page 列。不能用這些頁面平均位置宣稱目標詞已前十，也不能把 13 次曝光、0 點擊判成標題已失敗。三頁與三語 Learn、sitemap、robots 現時皆200、允許索引且有入口。
- **Google 實際展示：** 重新實看 EN `connect claude to obsidian`（en/us）、TW／CN `Obsidian Claude`（各 hl/gl）第一頁，均未見 Wenlan；EN／TW 有 AI 摘要和影片或社群結果。登入、pws=0、介面顯示非個人化；EN IP 顯示 Sunnyvale，TW 顯示台灣／位置未知，CN 位置未知。地域參數不是當地實體位置，CN Google 不代表百度，這三個快照不是完整排名分布。TW 精確 URL 的 `site:` 探針仍顯示舊標題「檔案、MCP 與可維護的 AI 知識庫」與舊摘要；正式頁已是「教學：MCP、外掛與 Skills」。探針只證明這次展示，不代表正常查詢的名次或摘要。Web fetch 曾回舊快取，正式版本以直接 HTTP 與 IAB 為準。
- **點擊理由不足（待驗證假設）：** 現時與待發布三語 title／description 仍以 CLI、MCP、外掛、Skills 清單為主，沒把「連接後用兩份筆記查出最新決定並核對原文」的可完成成果說清楚。競爭結果則直接承諾連接、整理筆記、個人工作流程；AI 摘要已能回答基本連接步驟。保留 Obsidian + Claude Code 教學主題，優先讓摘要交代可跟做範例與預期成果，不改成未驗證的長問句主關鍵字，不保證 CTR／排名提升。
- **確定的入口不一致：** `src/app/(en)/learn/page.tsx:108-112` 的可見卡片仍叫 Obsidian AI memory、承諾比較記憶工具，目的頁卻是連接教學。應同步入口與目的頁承諾；不是孤兒頁，也不必改已索引 slug。

**建議順序：** 先在待發布版本集中修 title／description／開頭承諾及英文入口，再依授權發布、每語一次重新檢索；手動核對新 crawl／實際摘要及同詞曝光。曝光尚少時不把新增長文或 Anti-AI 分數當主要解方。原始 GSC／HTTP／三語 SERP 與舊摘要截圖在 `/tmp/wenlan-seo/2026-10-08-click-audit/`。自動化保持暫停。

**上述建議已依使用者指示本地修正（2026-10-08）：** 三語 title／meta description／頁首摘要改成連接筆記、查出最新決定並核對原文，保留教學主題與 canonical；英文 Learn 卡片改為連接教學。使用者追加排版要求後，本頁標題由桌面72px改為最大52px、手機30px；共用標題文字元件保護 Claude Code、指定中文短語及緊接標點，避免產品名或冒號被拆行。正文功能與練習未再擴寫。使用者此輪指示授權本地修正，不宣稱已達 GSC 重寫門檻或已發布。

驗證：goal／scenario／test:goal、test:seo（377＋measurement133、2既有skip）、test:i18n（86）、lint、build、technical:built及diff檢查通過；更新既有舊標題斷言，未新增AI評分檢查。最終 production build 的三語1440px桌面／393px手機、深淺主題已實看，Claude Code完整、無頁面水平溢出，英文入口實際點擊正確，未捕獲console error；瀏覽器核對新metadata。原始log、截圖及`verified-state.json`在`/tmp/wenlan-seo/2026-10-08-search-copy/`。未push、部署、提交索引或重啟自動追蹤；正式Google摘要與曝光仍須在授權發布後另驗。


**Opus 5.5 獨立諮詢（2026-10-08）：** 使用者批准攜三語完整文章及彙總 GSC／Planner／SERP 證據，經 upstream acpx 一次文字審查；公告 `opus`＝Opus 5.5，完成回應 telemetry 為 `claude-opus-5-5`、high，exit 0／end_turn、無工具呼叫，專用會話已關閉。審查的是前段未發布來源；未改文章或發布。完整輸入、回覆與 receipt 在 `/tmp/wenlan-seo/2026-10-08-opus-review/`。

主代理採納為後續小修候選：補與摘要承諾一致的完整引用答案；開頭明示 Desktop Code 分頁的無終端機路徑並分清 MCP 指令適用客戶端；把 Step 2／3 標為選配。Opus 認為不用重寫全文；這是審稿判斷，非排名提升證據。其錨點疑慮已核對：`recorded-workflow-proof.tsx:69` 確有錨點，三語頁面亦有同頁連結處理與先前瀏覽器驗證；不當壞連結修。Tally 說明已存在，僅連結文字可再說清楚是另一示範。不採重新把 MCP 塞回主標題、不改 slug；現有證據不能證明爬取時間是曝光低的唯一／最大原因，也不足以斷言 CN 可免於新版抓取核對。下一步以少量承諾一致性修正、授權發布及三語新版 crawl／query×page 驗證為準，不追加整篇改稿或恢復排程。


**協作修正已關閉（2026-10-08）：** 使用者授權 Codex／Opus 持續修正與查證至需人類裁決為止。沿用本篇 Planner 三市場連接需求、社群查筆記原問及同詞 SERP 證據，未換主詞或新增 URL。三語補先前實跑的引用答案節錄、Desktop Code／Local 路徑與訂閱前提，分清 CLI／Desktop Chat 設定；步驟2／3改標選配、先做只讀練習、Tally 連結明示另一案例。CLI 安裝前提更新為目前 installer 1.12.7+；簡中介面採官方「第三方插件／常規」。來源：[Desktop 入門](https://code.claude.com/docs/en/desktop-quickstart)、[CLI](https://obsidian.md/help/cli)、[skills 指令](https://github.com/kepano/obsidian-skills)、[MCP 分客戶端設定](https://github.com/coddingtonbear/obsidian-local-rest-api#mcp-clients)、[外掛官方清單](https://github.com/obsidianmd/obsidian-releases/blob/master/community-plugins.json)、[簡中設定](https://obsidian.md/zh/help/settings)。清單確認 Claudian／Claude Code IDE 上架；不宣稱本輪安裝實測。

Opus 5.5/high 收到完整修正版、市場證據與既有三語實跑輸出後 PASS；其三项補充疑慮查證並修正後，再返回「內容面沒有剩餘阻擋項目」。兩次實際回應 telemetry 皆 `claude-opus-5-5`、exit0／end_turn；無工具呼叫，會話已關閉。模型共識不等於 SEO 成效。原始 brief／response／final-review 在 `/tmp/wenlan-seo/2026-10-08-opus-closure/`。

驗證：goal／scenario／test:goal、SEO377＋measurement133（2既有skip）、i18n86、lint、build、technical:built、diff通過。初次SEO檢查因未指定 sibling產品repo及舊選配標題斷言失敗，設定 `WENLAN_REPO_ROOT=/Users/lucian/Repos/wenlan` 並同步舊斷言後通過。最終建置用獨立 headless Chrome 實看三語1440／393px、深淺色共12組：頁首、答案節錄正常，無頁面或答案水平溢出；12次同頁實錄連結可用，無console error。原始log、圖、browser-results與來源hash在同一資料夾；驗證後僅整理來源格式，文章內容物件不變。測試server已停止。未發布或索引提交，自動追蹤維持暫停。內容無待裁決分歧；下一步是取得本版發布授權，再驗三語新crawl與同詞曝光／點擊，不能用舊13次曝光判新版成敗。


**Obsidian → Wenlan 入口補齊（2026-10-08）：** 依使用者要求，三語前段明示既有 Obsidian vault 可作 Wenlan 唯讀來源；第一個查答案練習後新增「接到 Wenlan，試做專案摘要」入口，連到既有實作段落。交代筆記仍留原處、來源按需同步、再請 AI 更新摘要；不改主搜尋詞或宣稱轉換提升。使用者進一步指出 Obsidian 也能跨 AI 讀寫後，對照現行重定位文件及即時 claude-obsidian README，三語改成明確承認能力重疊，說明選用的是 Wenlan 整合來源、知識頁、來源變更、修訂檢查的流程，沿用 22 日改 24 日的例子；既有流程夠用者未必需要另裝。此版 Opus 5.5 文字複審 PASS（實際 telemetry `claude-opus-5-5`，exit0/end_turn，無工具呼叫），沒有速度、準確度或獨有能力主張。收據在 `/tmp/wenlan-seo/2026-10-08-obsidian-reason/`。產品邊界核對 Wenlan README 的 read-only／on-demand resync 說明，依 page-delivery／product-evidence／visual-acceptance 合約驗證。Opus 5.5 本輪指出英文「links to those notes」可能誤導為 Obsidian 直連，改成其建議的「a cited project brief」後滿足其條件式 PASS；專用會話已關閉。

既有必跑 goal／scenario／test:goal／SEO／i18n／lint／build／technical 檢查通過；最後英文措辭調整後重跑 i18n／lint／build／technical 通過。三語1440／393px、深淺色共12組瀏覽器連結與溢出檢查通過，修正後英文4組再驗通過；抽看實際畫面可讀，無捕獲的瀏覽器錯誤。同頁錨點保留語系且不重複 hash。原始審查、log、畫面及來源雜湊在 `/tmp/wenlan-seo/2026-10-08-wenlan-bridge/`。仍為 `ffa8f4cb` 加未提交修正版，未發布，非獲客效果證據。

最後依使用者補正，三語前段、練習入口與選用段落改以「為 AI 整理維護而設計的個人 Wiki；來源／頁面／修訂流程已內建」說明理由，並交代可直接使用 Wenlan、Obsidian 是可選來源。避免把減少流程組裝寫成完全免設定、免人工判斷或取代全部 Obsidian 功能；按需同步與背景更新模型前提保留。這是同一待發布版本的定位校正，未新增文章。本次 goal／scenario／test:goal／SEO／i18n／lint／build／technical 與三語桌面／393px深淺色共12組瀏覽器檢查通過，抽看三語實際畫面正常；最終來源雜湊與收據另存 `/tmp/wenlan-seo/2026-10-08-built-in-workflow/`；上一段 Opus 結果針對其當時文案。

**本版發布授權（2026-10-08）：** 使用者明確要求完成上述手機入口與頁尾引導並發布。三語新增頁首手機四個跳轉入口（連接、MCP、外掛、Wenlan），頁尾改為建立可持續更新的專案摘要，修訂日期更新為10/08。承接本篇已驗證修改，保留既有canonical與搜尋主題。發布不代表取得排名／轉換成果；週期自動化維持暫停，未擴大至付費、站外聯絡或索引提交。

發布候選 `1e26ddc` 在最新主分支 `46566c3` 上整合：必要檢查、GitHub CI及Vercel預覽通過；獨立整合審查無阻擋項。三語1440／393px、深淺色共12組實際檢查通過，手機四連結保持語系／錨點且抵達正確段落，頁尾引導與設定目的地一致。raw log、前後畫面在 `/tmp/wenlan-seo/2026-10-08-publish/`；GitHub圖片附件工具不可用，未把本地路徑當上傳證據。合併與正式網站驗證結果接續記錄於 [PR #224](https://github.com/7xuanlu/wenlan-site/pull/224)，避免另一份重複交接報告。
