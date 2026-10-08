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
