# 個人 AI 知識庫三語教學：Cedar 實機證據

本發布僅涵蓋 `build-local-ai-knowledge-base-from-documents` 三語、相關公開教學素材與呈現元件。以下保留這篇文章的實機證據；其他關鍵字研究與 LLM Wiki 改稿不在本次發布。

### Obsidian 操作步驟與實機畫面補齊

使用者指出前一版只有三段文字，缺少可跟做的 Obsidian 步驟與畫面。此輪把既有 Cedar 練習改為三個編號步驟：從 Manage vaults／Open folder as vault 開啟三份筆記；在同一資料夾啟動 Claude Code 或 Codex（提供可複製指令）；加入第四份來源、開新對話並核對變更。三語同步，H1及metadata不變。保留原本下載、問題、預期答案與Wenlan操作，沒有再造另一套例子。

實際啟動本機 Obsidian 1.13.7，使用可丟棄 Cedar vault，先讀取三份公開虛構來源中的核准日期，再加入第四份來源並開啟客服更新。新增兩張未改字、未合成、未裁切的 2048×1600 原始JPEG：

| 公開教學素材 | SHA-256 |
| --- | --- |
| `obsidian-cedar-approved.jpg` | `a73a37041dfaad2a4367e45086046f512854660ec51a4a123d160a09b34f39bb` |
| `obsidian-cedar-update.jpg` | `718df506b4d2888c594c5d8436c9d9f258f20ac1874e8283ecd8ab9d82a84704` |

畫面只含公開虛構 Cedar 筆記，顯示3→4份來源、11月19日核准日期及email→email/in-app更新；不是AI回答，也不證明模型正確性。英文教學資料在三語共用，圖說各自本地化；圖片可放大檢視。沿用既有真實Claude→Wenlan測試結果，本輪沒有重跑Claude／Codex模型。

本輪由主代理完成操作、閱讀與畫面自查；前一輪獨立reviewer的結論不涵蓋這次新增圖片。既有公開素材完整性檢查已加入這兩張圖的實際雜湊，首次因未登記而失敗，登記後430項SEO測試通過；量測133通過／2略過、88項i18n、lint、build及built technical檢查通過。12個三語／1440px與393px／深淺色狀態無水平溢出，兩張圖均載入成功，canonical正確；實際開關三語放大視窗，英文另驗證1600px放大，瀏覽器沒有error／warn。主代理目視代表桌面與手機的三語新段落。

收據：`/tmp/wenlan-seo-demand/2026-10-20-claude-kb/obsidian-*.log`、`obsidian-browser/results.json`、`obsidian-browser/*.jpg`與`obsidian-review-ready-state.json`。正式狀態仍為`3f3385100ee51fe51e523650208f9154bffa9a3c`加未提交變更。IndexNow未觸發；尚未提交、推送、合併、發布或申請索引，weekly維持暫停。


### 免 CLI 主流程：實機加入、Claude 提問、來源及更新核對

使用者要求主流程讓不會 CLI 的人也能照做。本輪把既有 KB 三語文章改為 Wenlan 圖形介面→Claude 網頁版：加入測試資料夾、檢查索引、明確選 Web access 分享範圍、配對、提問、回 Sources 打開原文、加入第四份來源後 Refresh，再用新對話核對。Obsidian／CLI 保留在後段進階分支。Wenlan 負責來源管理，提問發生在外部 AI；未冒稱內建聊天或離線模型。標題與需求歸屬不變，沒有新增成效窗口或重抓 GSC。

實際使用官方 Wenlan 0.19.2（binary SHA-256 `eb0e2a8e9ff22987d08473d6adb7542f4088d011b3e2c30aef6f865bf7a003cb`），從隔離 launcher 啟動僅含虛構 Cedar／Atlas 的資料庫。使用者明確批准前景操作及整個虛構測試庫經 Wenlan relay 分享給 Claude；未連私人 library。Claude 網頁版顯示 Opus 5.5 Medium。第一次成功 Recall 後回答11月19日、email only、security review、CSV、price unknown；加入第四份來源並手動 Refresh 後，Sources 顯示4 files／4 memories，新 Claude 對話的兩次成功 Recall 讀到原文，回答改為email＋in-app，其他四項不變。lead 展開實際工具回傳核對來源；答案全文與操作界線在既有 public/examples/claude-knowledge-base-check/recorded-result.md 的 GUI 區塊，不以模型自述代替工具證據。

實測修正：初次 Claude 猜 Cedar Space，Recall／Brief 回 HTTP422；移除 Space 篩選即成功。文章提示不把專案名當 Space。Whole-library 查詢也回傳 Atlas 虛構來源，Claude 排除於答案；提示詞不是權限邊界。原始來源庫3→4、模型回答與原文已逐項比對；未把此結果泛化為 PDF、Codex、自動 wiki 維護或自然曝光成效。

測試結束後，UI確認 Claude「Ended: access was removed」，Web access off；只停止本輪 launcher 擁有的隔離程序。launch receipt 記錄 app exit code 0；該 launcher 本身不驗證 OAuth，OAuth／撤權證據來自另外保存的 UI 操作。未修改私人庫、付費、發布或申請索引。

新增7張原始 JPEG，未改字、合成或裁切；五張 Wenlan 2560×1440、兩張 Claude 1382×753，圖說三語共用實測、各自本地化。SHA-256：
- `wenlan-cedar-add-source.jpg`: `a29453fadb99d5784a5bdce8fff09bda27d7e329bab73b56a7cdae721c0baf82`
- `wenlan-cedar-three-sources.jpg`: `e4cde339127d718ead831530ff0e4fda8ee2a5ac58458cc9c8da80ce3823e916`
- `wenlan-cedar-approved-source.jpg`: `4c094195a78dc95113047d871679c260a82b01107571bf5494ea8aee32661c0a`
- `wenlan-cedar-connected.jpg`: `1012d16679213ec8ba1882e9d8d69adf451eebdd0707d88a0a97de76126ca2dc`
- `wenlan-cedar-update-source.jpg`: `9f137d8f190fda80b4c981d5d87131495ee7e7f3e76782b39910dda6f71df1d0`
- `claude-cedar-first-answer.jpg`: `deddabd05fa67fac21d9b860b83acc2a613e4ab484108e0e0010e49e3d94f057`
- `claude-cedar-updated-answer.jpg`: `a6c844ee6caabec2e11a755a041c72caee81719e40cc459bd1df627f8dd8aca8`

原件保留在 `/tmp/wenlan-seo-demand/2026-10-20-claude-kb/` 的 `gui-no-cli-*.txt`、`gui-no-cli-captures/`、`gui-cedar-profile/reviewer-launch-receipt.json`；不加入 git。

最終檢查：430項SEO測試、量測133通過／2略過、88項i18n、lint、build、built technical及scenario檢查通過，IndexNow未觸發。最初非提升權限的build因工作樹寫入限制失敗，改以核准的隔離工作樹範圍重跑後成功，未變更產品設定。三語1440×1000／393×1000與深淺主題共12種操作段落畫面已由主代理逐一目視，沒有頁面水平溢出、可見壞圖或無效頁內錨點。英文8張圖（含Obsidian進階分支）逐張開關放大並讀回原始尺寸，雙中文Claude圖亦實際開關。清除KB舊Tally流程及其目錄連結，避免與Cedar實測混淆。瀏覽器沒有error；有1項Next開發模式LCP提示，發生在深連結跳至懶載入圖片時，不等同網站執行錯誤。

收據：`gui-final-*.log`、`gui-build.log`、`gui-technical-built.log`、`gui-browser/results.json`及原始畫面。最終程式狀態為`3f3385100ee51fe51e523650208f9154bffa9a3c`加未提交變更，檔案hash另存`gui-review-ready-state.json`。仍未提交、推送、合併、部署或申請索引；weekly維持暫停。


獨立唯讀收尾：reviewer逐一閱讀三語KB、公開實測紀錄及原始回傳，未找到內容阻擋項；沒有重演UI或模型，主代理的UI實測與12種畫面驗證不冒稱為reviewer重跑。複查曾發現原始文字中的「Claude Desktop (macOS), Connected」可能混淆客戶端；主代理唯讀重開同一既有Claude網頁對話，將實際Chrome分頁的claude.ai位址、標題與同頁Cedar答案存為`gui-browser-provenance.json`。reviewer核對後確認那是頁內電腦連線卡，解除疑點；沒有重新傳訊、呼叫模型或恢復Wenlan授權。


入口閱讀調整：三語先用研究筆記、專案決定、答案來源三個問題解釋用途，再介紹虛構 Cedar 專案並呈現真實問答。「為什麼用文瀾」移到操作前，講清楚文件管理、原文核對與手動刷新，並保留單次文件可直接上傳的選擇。移除入門段落的進階 Wiki 跳轉；原有定義、Wiki 延伸閱讀、五步操作、更新核對、限制與 Obsidian／CLI 分支仍在。保留專用問答元件、未重繪的原圖及放大功能。閱讀與任務覆蓋自查通過；本次目視三語1440px／393px深淺色共12種開頭，無溢出或破圖，頁內錨點完整，並實測來源切圖、放大關閉、範例操作入口與章節索引。goal、scenario、test:goal、test:seo、i18n、lint、build、built technical 均通過；瀏覽器error／warn為空。收據在既有暫存目錄 beginner-opening/（測試log、browser/results.json、各語畫面及review-ready-state.json）。先前元件獨立審查收據保留於visual-final-browser/與visual-review-ready-state.json；不代表本次文案另做了獨立審查。沿用既有實機測試，未新增模型實測或曝光成效證據；僅本機，未提交或發布。

發布前複查：將 Web access 的資料分享條件提前，私人筆記或範圍不確定時須停止；雙中文搜尋標題改為文件問答、來源核對與更新，移除不再符合主流程的「工具比較」承諾。使用者已批准本篇三語合併發布及索引請求；最終 CI、部署與索引回執記錄於本批 PR。

隔離發布檢查：只整合本篇三語及必要元件，原工作樹其他 LLM Wiki 改動未帶入。獨立 reviewer 複核上述三項修正後無剩餘阻擋；主代理再讀三語最終分享提示的手機與桌面畫面。隔離工作樹 goal、scenario、test:goal、test:seo、i18n、lint、build、built technical 及 recrawl URL 比對均通過。畫面與檢查收據在既有暫存目錄 publication/；沿用開頭12種畫面，未重跑模型。
