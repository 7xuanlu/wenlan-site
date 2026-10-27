# 公開文件內容審查與本機修稿 — 2026-10-26

## 結論

不要整站重寫。文件的工作是幫使用者把事做成、排除問題或查到精確規格；`/learn` 才負責較完整的需求教育與工具比較。

此次檢查 46 篇詳細文件，加上 get-started 共 47 個文件目的頁，另看三語入口。先修 5 個有明確閱讀問題的頁面；10 月 27 日接續完成 8 頁重複內容整併、4 頁優先改寫，另修正其直接依賴的備份步驟。**沒有刪除 URL、改文章、部署或提交索引。**

應刪的是內容，而非依流量刪文件：
- Product Matrix 的 repo owner、eval/docs provenance、route checklist 和重複導覽，讓使用者讀第二次目錄卻不能選安裝方式。
- Roadmap 的「Near-term documentation gaps」實際是既有文件名單，不能告訴讀者哪些功能可用。無狀態依據的發展敘述也不保留成承諾。
- API、安全、隱私、備份與版本記錄不必寫成熱門文章。它們的價值是需要時能查到可靠答案。

## 參考如何改變本次編輯

| 讀過的參考 | 採用 | 不照搬 |
|---|---|---|
| [Nowledge Mem：Start here](https://mem.nowledge.co/docs/start-here) 與 [Getting started](https://mem.nowledge.co/docs/getting-started) | 先完成保存與找回，再選一個工具；明確的成功判準 | 不把其時間承諾或自己的功能算作文瀾證據 |
| [Nowledge Mem：Crystals](https://mem.nowledge.co/docs/concepts/crystals) | 用讀者的零散資料情境解釋整理後的成果，再講來源與審核 | 不移植它的生成門檻、資料模型或自動化規則 |
| [Nowledge Mem：Notes everywhere](https://mem.nowledge.co/docs/use-cases/notes-everywhere) | 問題、操作、結果相接；畫面需要證明某一步 | 不為了有圖而加入無關或未授權圖片 |
| [LangChain OpenWiki：Quickstart](https://docs.langchain.com/oss/openwiki/quickstart) | 前置條件、第一個成果、生成物、後續更新分清楚 | 它是 CLI 導向工具；文瀾不因此改成 CLI 優先 |
| [Strands docs-writer](https://github.com/strands-agents/harness-sdk/blob/main/.agents/skills/docs-writer/SKILL.md) 與 [Google docs-writer](https://github.com/google-gemini/gemini-cli/blob/main/.gemini/skills/docs-writer/SKILL.md) | 先定文件類型，再寫讀者問題；動作順序、預期結果、精確術語、刪空話 | 不照搬 SDK 術語、MDX 格式與一律禁用目錄等不合本網站的規則 |

OpenWiki 指本次實際讀取的 LangChain 專案，不把同名的 openwiki.sh 混為同一產品。上述是寫法參考，不是「用了某 skill 就提升自然流量」的效果證明。使用先前保存的 skill 原文，不安裝新插件。

## 搜尋資料與本次範圍

沿用已成功的 2026-10-26 週報，GSC 區間 **2026-09-27～2026-10-24**。`/docs` 路徑在 page 維度共有 **26 個可見 URL、173 次曝光、1 次點擊**（包含入口與本地化 get-started）。這是頁面列加總，不是網站 property 曝光，也不是搜尋量。

已返回的 docs query/page 列主要是 `wenlan`、`site:useorigin.app`、相近或不明字串；不能把未返回的 query 當成沒有需求。例：architecture 的 40 次頁面曝光中，27 次可對到 `wenlan`；core-concepts 只有 6 次頁面曝光；source-backed-pages、product-matrix 沒有出現在這份頁面匯出。**這些資料不支持按流量排名刪頁，也不支持宣稱重寫後能大增曝光。**

本次是使用者要求的文件可用性整理，不是重新開啟最近 Learn 文章的 SEO 實驗。完整數據來源沿用 [當週報告](2026-10-26-weekly-seo.md)，原始匯出留在本機 `/tmp/wenlan-seo/2026-10-26-weekly/current/`，不放進 git。

## 全部頁面去向

「整併」指內容歸屬與刪重，**不是本輪已刪頁或已轉址**；「保留」表示有獨立用途，不代表每個命令都重新實測過。`—` 表示匯出沒有該頁，並非零。

| 頁面 | 處理 | 曝光／點擊 | 理由與內容歸屬 |
|---|---|---:|---|
| [daily-workflow](https://wenlan.app/docs/daily-workflow) | 本機已改 | 1／0 | 用一個明確標為虛構的決定示範保存、換對話找回、核對；日常任務與可選整理分開。 |
| [capture-quality](https://wenlan.app/docs/capture-quality) | 保留 | 2／0 | 什麼值得存、怎麼寫才找得到。 |
| [review-and-trust](https://wenlan.app/docs/review-and-trust) | 保留 | — | 審核與確認有獨立操作價值。 |
| [core-concepts](https://wenlan.app/docs/core-concepts) | 本機已改 | 6／0 | 沿同一專案例子解釋 memory、session、handoff、page；移走開場的系統架構負擔。 |
| [memory-types](https://wenlan.app/docs/memory-types) | 保留 | — | 類型與保留規則屬查詢用途。 |
| [glossary](https://wenlan.app/docs/glossary) | 保留 | — | 查詞與概念導讀用途不同，不因同詞就合併。 |
| [architecture](https://wenlan.app/docs/architecture) | 保留 | 40／0 | 整合與故障定位需要，不能以不是新手內容就刪。 |
| [product-matrix](https://wenlan.app/docs/product-matrix) | 本機已改 | — | 刪除第二份文件目錄與 repo owner 清單，改成依使用工具選擇設定入口。 |
| [commands](https://wenlan.app/docs/commands) | 保留 | — | 命令查詢有獨立價值；維持精簡，教學回連任務頁。 |
| [claude-code-plugin](https://wenlan.app/docs/claude-code-plugin) | 本機已改 | 1／0 | 保留插件專屬安裝與首次成功驗證；日常使用回連 daily-workflow，避免重複命令教學。 |
| [cli-and-service](https://wenlan.app/docs/cli-and-service) | 保留 | — | 服務管理與診斷命令。 |
| [updates-and-uninstall](https://wenlan.app/docs/updates-and-uninstall) | 本機已整併 | 1／0 | 一般更新、重啟驗證、移除由本頁擁有；不複製版本遷移清單。 |
| [upgrade-notes](https://wenlan.app/docs/upgrade-notes) | 本機已整併 | — | 只留版本特定遷移與相容性；一般更新步驟整併到 updates-and-uninstall。 |
| [packages-and-registries](https://wenlan.app/docs/packages-and-registries) | 保留 | 1／0 | 不同安裝包的辨識與來源。 |
| [platforms](https://wenlan.app/docs/platforms) | 保留 | 5／0 | 下載前必須核對作業系統與架構。 |
| [http-api](https://wenlan.app/docs/http-api) | 保留 | 2／0 | 開發整合契約。 |
| [api-examples](https://wenlan.app/docs/api-examples) | 保留 | 1／0 | 參數查詢不能替代可執行例子。 |
| [typed-clients](https://wenlan.app/docs/typed-clients) | 保留 | — | 型別與整合使用者需要。 |
| [spaces](https://wenlan.app/docs/spaces) | 保留 | 2／0 | 範圍、存取與專案隔離。 |
| [knowledge-graph](https://wenlan.app/docs/knowledge-graph) | 本機已改 | 1／0 | 先說圖何時有幫助、怎麼找到關聯；實驗檢索細節回連 advanced-retrieval。 |
| [source-backed-pages](https://wenlan.app/docs/source-backed-pages) | 本機已改 | — | 回答何時建頁、如何查來源、何時自動更新、何時審核與未更新怎麼查。 |
| [import-and-portability](https://wenlan.app/docs/import-and-portability) | 保留 | — | 加入既有資料與匯出。 |
| [local-git-history](https://wenlan.app/docs/local-git-history) | 本機已校正 | 1／0 | 二輪審查後改為內建頁面修訂與可選自管 Git，連同相關索引及摘要修正；保留舊 URL。 |
| [models-and-keys](https://wenlan.app/docs/models-and-keys) | 保留 | — | 模型與資料去向，需版本核對而不是行銷化。 |
| [advanced-retrieval](https://wenlan.app/docs/advanced-retrieval) | 本機已整併 | 2／0 | 集中檢索原理、適用範圍、評估；開關設定交 experimental-flags。 |
| [experimental-flags](https://wenlan.app/docs/experimental-flags) | 本機已整併 | — | 集中是否穩定、預設值、啟閉與風險；不複製檢索教學。 |
| [data-and-privacy](https://wenlan.app/docs/data-and-privacy) | 保留 | 23／0 | 資料去向與控制；低流量也必須保留。 |
| [backup-and-migration](https://wenlan.app/docs/backup-and-migration) | 本機局部修正 | — | 修正 Windows 資料路徑、備份前停機及還原後啟動與核對；本輪未實際搬移資料。 |
| [configuration](https://wenlan.app/docs/configuration) | 本機已整併 | 6／0 | 只解釋去哪設定與優先順序；完整變數清單交 environment-variables。 |
| [environment-variables](https://wenlan.app/docs/environment-variables) | 本機已整併 | — | 保留名稱、預設、作用與變更生效方式的查詢手冊；不再寫一般設定入門。 |
| [mcp-clients](https://wenlan.app/docs/mcp-clients) | 本機已改 | 1／0 | 每個客戶端保留必要步驟與成功判準；共用安裝回連 get-started，不能只列設定檔。 |
| [agent-profiles](https://wenlan.app/docs/agent-profiles) | 保留 | — | 工具權限與範圍設定。 |
| [troubleshooting](https://wenlan.app/docs/troubleshooting) | 本機已整併 | — | 以症狀→檢查→修復為主；正式回報流程回連 diagnostics-and-issue-reports。 |
| [diagnostics-and-issue-reports](https://wenlan.app/docs/diagnostics-and-issue-reports) | 本機已整併 | — | 只留收集診斷、遮蔽敏感資料、回報內容；不重複一般故障排查。 |
| [faq](https://wenlan.app/docs/faq) | 保留 | — | 保留短答與指向完整指南的連結。 |
| [security](https://wenlan.app/docs/security) | 保留 | 5／0 | 安全回報與邊界。 |
| [evaluation](https://wenlan.app/docs/evaluation) | 保留 | 7／0 | 效能證據與限制，不能改成未證明的效果承諾。 |
| [desktop-app](https://wenlan.app/docs/desktop-app) | 本機已改 | 1／0 | 應回答匯入、閱讀、編輯、審核在哪做；版本狀態與 repo 歸屬留給 release/architecture。 |
| [changelog](https://wenlan.app/docs/changelog) | 保留 | 26／0 | 合法的版本歷史，不是 skill 內混入的工作日誌。 |
| [releases-and-versioning](https://wenlan.app/docs/releases-and-versioning) | 保留 | — | 版本、套件及發布規則的正式參考。 |
| [roadmap](https://wenlan.app/docs/roadmap) | 本機已改 | 7／0 | 移除失效的「文件缺口」清單及無具體狀態的主題，收斂為版本與功能狀態查核。 |
| [project-scope](https://wenlan.app/docs/project-scope) | 保留 | — | 產品範圍與不處理的工作。 |
| [build-from-source](https://wenlan.app/docs/build-from-source) | 保留 | — | 貢獻者的可執行建置路徑。 |
| [testing-and-ci](https://wenlan.app/docs/testing-and-ci) | 保留 | — | 開發測試與 CI 的必要參考。 |
| [development-conventions](https://wenlan.app/docs/development-conventions) | 保留 | — | 貢獻者約定。 |
| [contributing](https://wenlan.app/docs/contributing) | 保留 | — | 外部參與入口。 |

get-started 另行檢查：已具備首次保存與找回的教學路徑，本輪保留，不重做。公開詳細 docs 目前只提供英文；繁中、簡中入口明確連往英文文件，兩輪同步已改頁面的入口名稱與摘要，未聲稱新增全文翻譯。

## 本輪產品事實與驗收界線

- 網站起點：`364ad91034e23b40a1da97880d528c7e114e412f` 加本機工作區。前一輪 SEO 流程清理的變更保留。
- 產品文件核對：本機 Wenlan `862941d684881f91991c287f862bdfe1cdc043d2` 的 `docs/steep.md`、`plugin/README.md`、`plugin/skills/wenlan/SKILL.md`；refresh/review 的說明亦與本機 v0.20.1 的 steep 文件核對。
- 原有發布日期 fallback 保持 2026-10-23，這次更新日期獨立記為 2026-10-26；保留五頁原 section anchors，使既有深連結不失效。
- 這是來源核對與文件呈現驗證，**沒有把本次文件修改說成新一輪產品背景更新或跨工具實測**。Atlas 決定明確標為虛構教學例子。
- 獨立閱讀審查指出「Roadmap 沒有具體路線圖」與「一個複製框混入跨對話兩個命令」。已收斂為版本狀態指南，複製框只留當下要執行的指令。
- 已完成（跨日至 2026-10-27）：`pnpm lint`、`pnpm test:i18n`（88/88）、兩項相關品牌／入口契約、`pnpm build`、`pnpm seo:technical:built`、campaign control、scenario check 均通過。初次 build 無法下載 Google 字型；允許建置連網後通過，沒有部署。
- 瀏覽器：Playwright 1.61.1 Chromium headless shell 1228，Chromium 149.0.7827.55。5 篇文件及三語入口 × 1440/393px × 深淺色共 32 個畫面條件通過 HTTP、水平溢出、頁面錯誤與舊錨點檢查；另確認 `/handoff` 複製值及目錄跳轉。已目視手機日常教學與桌面設定選擇頁，保留既有 Fumadocs 視覺。
- 完整 `pnpm test:seo`：420 通過、20 失敗，不能標為全綠。失敗涉及宿主 `NODE_OPTIONS` 預載的 child_process 包裝：直接探針證實 `promisify(execFile)` 回傳 string，測試所需的 `.stdout` 是 undefined。未關閉保護或修改宿主規則來湊通過；版本來源與子程序相關完整契約仍待正常環境核對，後續串接的 measurement 測試也未由此命令執行。
- 本機預覽：`http://127.0.0.1:3392/docs`。設定選擇已移至三語 Start here；完整正文仍為英文。
- 逐檔 SHA-256、測試日誌與實際截圖保存在本對話的 `docs-review-2026-10-26/verified-state.json` 及相鄰檔案。這些是本機工作狀態證據，並非正式站驗收。

## 10 月 27 日：其餘 12 頁整併與改寫

由原生 Terra（gpt-6.1-terra，high）負責 `docs.ts` 的指定頁面，主代理定範圍、核對來源、退修與整合。另一次獨立讀者審查檢查步驟能否完成、權限是否清楚；不是只憑 lint 或字數通過。

| 分組 | 內容歸屬與本次修正 |
|---|---|
| 更新／升級注意事項 | 一般更新集中於 updates-and-uninstall；upgrade-notes 保留版本特定指令與設定遷移。 |
| 排錯／診斷回報 | troubleshooting 負責症狀與修復；diagnostics 負責版本、重現與遮蔽資訊。終端指令不再混入 Claude slash command。 |
| 設定／環境變數 | configuration 說明設定位置與用途；environment-variables 逐項列出作用、預設與生效程序。 |
| 搜尋原理／實驗開關 | advanced-retrieval 說明結果與評估界線；experimental-flags 列來源確認的開關、預設值與停用界線，明說是選錄而非完整變數清單。 |
| 桌面／客戶端／Claude 插件／圖譜 | 先回答要完成的事，提供操作入口與可檢查的結果；將日常教學與共用安裝回連既有指南。 |

另外只修直接依賴的 backup-and-migration：目前 Windows 資料根目錄、備份前停止 app/背景程序、還原後啟動與核對已知資料。沒有刪除 URL；13 頁原有效發布日期與舊 section anchors 保留，五頁前次稿未重寫。三語索引與機器摘要同步；詳細文件仍為英文，沒有宣稱完成三語全文。

### 產品事實與具體退修

以 GitHub 最新穩定版 v0.20.2（tree `a52312cca34334f16386e7f2e2083cf75a655da4`）的原始碼核對：

- `crates/wenlan-cli/npm/run.js:240–357`、`commands/setup.rs:534–542`：重新執行 setup 的 basic 路徑會清除模型設定。既有 headless 安裝改用 installer 的 `--version` 路徑刷新，再 restart／status／doctor；離線重用舊版必須明說。官方安裝器的新版下載／離線回退兩個 fixture 測試通過，未更新使用者安裝。
- `plugin/skills/wenlan/SKILL.md` 與 `plugin/skills/setup/SKILL.md:149–170`：狀態／setup 的 read-only brief 呼叫只證明連線；真正保存與找回另走 daily-workflow。
- `docs/setup-and-data.md:81–100`：Windows 為 `%LOCALAPPDATA%\wenlan\`；background off 停止並取消自動啟動，不等於移除所有服務註冊；備份前須停止寫入。
- `docs/PRIVACY.md:71`、`src/components/memory/PageDetail.tsx`、Atlas 與 Settings 元件：Web access 的 Search and write 可新增、修改、刪除共享範圍內記憶／頁面；頁面編輯自動保存；圖譜關係不等於來源引用。
- `crates/wenlan-core/src/db.rs`、`retrieval/compress.rs`、`post_write/page_update.rs`：graph gate 控制是否略過原本的圖譜跳轉；布林開關與數值 shrink threshold 不混用；實驗寫入停用後不會自動復原。

這是正式版來源核對、fixture 與網站呈現驗證，**不是新一輪真實安裝、備份還原或產品背景更新實測**。這一階段發現 `local-git-history` 與相關摘要的自動 Git 說法過時；後續兩輪獨立審查已作定點修正（見下節），仍非全站所有產品操作的實測。

### 最終驗證

- `pnpm lint`、`pnpm test:i18n`（88/88）、相關文件／品牌／連線契約 4/4、production build、`pnpm seo:technical:built` 通過。建置沒有觸發 IndexNow。
- 13 篇文件與三語入口 × 1440/393px × 深淺色，64 個條件檢查 HTTP、溢出、舊錨點、頁面錯誤；另實際複製更新指令、核對舊 Web access 錨點的語意目的地。目視桌面指南、手機參數清單與網頁授權步驟。
- 完整 SEO 套件 420/440 通過，20 失敗；`test:goal` 59/60。宿主 child_process 包裝使 promisify(execFile) 回傳字串而不是 stdout 物件，版本／子程序檢查仍受阻；新 v0.20.2 repo 連結亦未由本機 Git tag 契約完整驗證。沒有停用保護、忽略退出碼或標成 CI 全綠。新增連結已對照同版下載的來源與錨點。
- 可交付的是未發布本機審稿預覽。完整測試的環境缺口須在發布前解決；未執行 push、PR、合併、部署或索引申請。

## 10 月 27 日：兩輪獨立讀者審查與退修

使用者要求檢查是否真正有助讀者、符合寫作標準並避免 AI 式空話。兩位未參與撰寫的原生 reviewer（Sol / xhigh）分別讀實際稿，第一輪覆蓋原 18 頁及必要相鄰路徑；修正後第二位重新審查修後稿和直接相關頁。Terra / high 負責退修，主代理核對來源、整合三語入口與最後檢查。不是同一作者自行宣告兩次通過。

| 審查 | 發現與處理 |
|---|---|
| 第一輪：讀者能否照做 | Windows 新舊路徑互相衝突；Git 自動版控承諾過時；備份框只列部分根目錄；停止服務被標成解除安裝；Space 未說怎麼核對；模型下載說明含混；AI 工具名與客戶名的遮蔽要求混淆；實驗範例只啟動隔離程序卻像已驗證實驗。已按相同版本來源定點修正。 |
| 第二輪：修後稿與事實一致性 | 預設 On demand 模式的更新排錯缺命令；模型選項誤像只有 Anthropic；版本頁把歷史版本及已發布實驗仍標成最新／未發布。已補齊分支、提供模型選項、保留歷史但連到目前發布資訊。 |
| 主代理整合檢查 | 模型指南的複製框會串行執行 basic setup、模型安裝及 key 設定，且有過時的內部流程矩陣。移除該整包操作，保留唯讀 status／doctor 與設定入口；不拿縮短字數代替任務完成。 |

第二位 reviewer 對最後兩節作定點複核，已關閉其提出的內容阻礙。判斷依據是頁面能回答／完成的具體任務，不是 AI 偵測器分數，也沒有聲稱普通讀者已參與使用測試。保留的介紹、範例與參考資訊各自有用途；不存在為了「像人」而編造的親身經驗。

共用要求整合到 `seo-product-evidence-standard.md` 原 editorial acceptance，workflow 的呼叫範圍明確包含 Learn 與 public Docs：開場用途、操作缺步、決策價值、具體自然寫法、來源及相鄰頁一致性、圖文與讀取／複製操作。Claude 與 Codex 同讀該規範；skill 不存這份歷史或第二份規則。這些規則需隨日後獲准提交才會進入其他 checkout。

產品核對使用前節已取得的官方 v0.20.2 來源；本輪沒有實際變更模型、執行備份還原、連接私人資料或重跑背景整理。文件／來源核對與已實測產品行為分開。

### 二輪後驗證結果

- 最終 lint、i18n 88/88、相關文件／安全政策／CLI／舊路徑檢查 4/4、build 及 seo:technical:built 通過；IndexNow 跳過。新增 Windows 舊路徑斷言能抓到修前副本，修後不觸發。
- Playwright Chromium headless shell 149.0.7827.55：首輪 112 個頁面／尺寸／主題條件，修後 36 個受影響條件，最後模型指令框再核對 4 個條件。檢查 HTTP、主題、舊錨點、頁內連結、溢出與頁面錯誤；主代理目視手機教學、模型頁與桌面版本說明。這不是實際新手研究或備份還原實測。
- 完整 SEO 套件指定 WENLAN_REPO_ROOT 後為 420/440；其中新增的 CLI 缺少 keys 查詢問題已補回唯讀 `wenlan keys status`，定點重跑通過。其餘 19 項仍是既有 host child_process 包裝／版本來源檢查限制，未聲稱全綠、未關閉保護。沒有再對未改的整套測試反覆重跑。
- 本輪本機內容、標準與證據的精確雜湊和日誌保存在 `docs-review-2026-10-26/two-rounds-2026-10-27/verified-state.json` 及相鄰檔案。預覽維持 3392，尚未發布。

## 發布邊界

本輪僅本機可檢查稿。若後續批准發布，重新核對產品版本與整合狀態，為已改的英文 canonical URL 及三語 docs 入口作 recrawl 決策；未取得該批索引授權前不送出。最近 `/learn` 實驗與觀察窗不變。


## 10 月 27 日：測試問題關閉與最終驗收

本節取代前述「完整測試仍受阻」的當前狀態，保留舊數字作歷史紀錄。本輪仍為未發布本機稿。

- 找到並修復宿主 Node child_process 保護包裝遺漏 `util.promisify.custom` 的相容性問題。修復保留受保護的呼叫路徑，沒有關閉 `NODE_OPTIONS` 或放寬瀏覽器政策。新增回歸測試涵蓋 stdout/stderr、child、錯誤輸出、Buffer 與拒絕未授權瀏覽器；宿主政策 30/30 通過，共用 harness 檢查無 FAIL。
- 修正一項過時文件測試：不再要求操作指南保留舊架構措辭，改為驗證必要操作章節及文件實際引用的 pinned Cargo 版本與授權來源。缺少產品 checkout 仍會失敗，沒有跳過事實核對。
- 沿用原 Strands doc-writer／reviewer、Google docs-writer 與共用 editorial acceptance。最後獨立審查補到 Spaces 建立順序、解析優先序、預設保存位置，以及模型設定的實際路徑。再次核對後也修正不存在的「Test connection」按鈕名稱，區分可 Test 的 provider 卡片與僅 Save 的 Anthropic 表單；獨立 reviewer 已關閉這兩處內容阻礙。
- 完整 SEO 440/440 通過；連帶 measurement 133 通過、0 失敗、2 項因未安裝 PGlite QA fixture 跳過。goal 60/60、i18n 88/88、lint、最終產品契約 6/6、production build、built technical SEO 均通過。建置的 IndexNow 確認跳過。
- 最新補改後，四篇直接相關文件及三語入口 × 1440/393px × 深淺色，共 28 個瀏覽器條件通過 HTTP、主題、水平溢出、舊錨點、頁內連結與頁面錯誤檢查。主代理目視模型步驟及 Spaces 的手機／桌面截圖，保留既有 Fumadocs 排版。
- 讀者驗收覆蓋任務目的、起點、動作、結果核對、必要設定與相鄰頁一致性；來源為官方 v0.20.2。本輪沒有重跑真實安裝、備份還原或產品背景更新，也沒有新手受試者測試，因此不把來源／網站驗證寫成所有產品流程皆實測成功。
- 精確工作狀態、宿主修復前後雜湊、日誌及截圖保存在既有外部證據目錄的 `test-closure-2026-10-27/`。公開詳細 Docs 仍為英文，繁中／簡中為已同步的入口；沒有宣稱三語全文重寫。

可審稿入口：`http://127.0.0.1:3392/docs/daily-workflow`。沒有提交、推送、建立 PR、合併、部署或索引請求；原有 Learn 文章未動。


## 10 月 27 日：獲准發布後的 main 整合

使用者已批准這批 Docs 合併發布。以 main `3b8733b` 建立獨立發布分支，只帶入 Docs、直接相關入口／測試及共用驗收標準；原工作區的週報、實驗、測量與流程清理改動留在原處。

整合保留 main 新增的 v0.20.2／v0.20.1 版本資料與首頁內容；刪除重複的歷史版本段落，將實際設定名更新為 Ask me first on pages I wrote。另將舊 desktop 深連結移到語意對應的更新審查、架構及 app 原始碼小節。獨立 reviewer 已聚焦複核這些整合點，沒有剩餘阻礙；原稿的產品實測界線不變。

PR 包含各變更網址的 recrawl 決策；本次發布授權不包含代替使用者提交 Google 索引申請。正式站驗證結果隨交付另記，不能以本機檢查代替。
