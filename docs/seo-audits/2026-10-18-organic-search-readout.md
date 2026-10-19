# 10-18 Google 自然搜尋人工讀數

## 下一個英文頁：跨對話後恢復工作（10-19，本地已驗證）

發布授權（10-19）：使用者明確要求本篇與共用SEO檢查流程一起合併發布；不提交Google索引請求，等自然抓取，weekly維持暫停。以下本地驗證不冒充正式部署或曝光結果；合併與部署收據記錄於[#247](https://github.com/7xuanlu/wenlan-site/pull/247)，以該PR狀態與部署驗證為準。

閱讀修正（使用者10-19回饋）：可見文字含程式碼／FAQ／參考標籤由1,542縮至743詞（約−52%），七節收為五節；用恢復路徑表、測試前後表取代長段解釋，提示縮短並調整手機斷行。標題、搜尋意圖、來源與實跑範例保留。此為本地稿閱讀性修正，不是新SEO結果；本版收據改見`readability-verification.json`。

完整性複核（10-19）：逐項對照精簡前七節，恢復分支留在開頭對照表；staged／unstaged／untracked及舊commit→HEAD檢查留在第二節；決定原因／命令歷史來源由獨立段合併為檢查要點；可貼恢復提示、實跑結果及原始JSON入口、Wenlan用途／plugin與MCP-only界線均保留。三個原FAQ答案已併入正文，另保留中斷命令／沒有handoff兩個實用問題。未發現必要任務答案遺失，不因743詞本身補字；此為編輯完整性判斷，不是搜尋成長證據。往後交稿必做[共用編輯驗收](../seo-product-evidence-standard.md#editorial-acceptance-before-delivery)，由既有goal check保護規則不被移除；語意與閱讀仍需實際審閱。

依[既有頁改寫規則](../../SEO-CAMPAIGN.md#authority-first-growth-correction)、[內容修正界線](../../SEO-CAMPAIGN.md#protected-trilingual-scenario-expansion-correction)與[需求／交付標準](../seo-product-evidence-standard.md)做本地準備，發布前仍須核對授權與觀察期。

選擇 [Why AI Coding Agents Lose Context Between Sessions](https://wenlan.app/learn/ai-coding-agent-loses-context)。逐頁核對同一完整28天（09-18～10-15）42個有page列的英文Learn owner；Codex、共用記憶、比較頁及Obsidian已由#241／#243／#244／#245處理，不重做；Claude較大的176曝光混聊天版意圖，wiki的87曝光多偏團隊選型。這是剩餘既有頁的具體補強，不是已證明的大流量市場。

| 證據 | 觀察與改法 |
| --- | --- |
| GSC全球Web，原始page表 | 全頁34曝光／0點擊，平均位置11.6；可見query子集15曝光，不能當完整需求份額 |
| 實際query × page | `ai coding agent session persistence context handoff between sessions skill`：7曝光／0點擊、平均位置9。另有5次「變更、原因、diff、command history」長問句，含AI式位置指令，其來源與客戶身分未知；不當月搜尋量 |
| 10-19 Google，一次US/en桌面、pws=0 | 此7曝光精確詞的首個結果頁，AIHero、softaworks與其他handoff教學／skill出現，未見本站；不是穩定全美排名 |
| 前排原文 | [AIHero](https://www.aihero.dev/skills-handoff)已分native resume／handoff並給可用文件；[Session Handoff](https://github.com/softaworks/agent-toolkit/blob/main/skills/session-handoff/README.md)有create／resume與staleness檢查。本站原文偏解釋層次，缺拿現有程式碼核對舊交接的操作 |

需求決策：讀者換對話或工具後要接續未完成工作；成果是知道現在改了什麼、哪些測試仍有效、下一步是什麼。沿用已有搜尋入口，補恢復步驟、可貼提示及實際結果；既有handoff-loop保留「如何寫交接」的分工。需要重用skill者直接連到既有create／resume指南，不另造工具。Wenlan只作可選的跨工具決定／進度保存，連至已發布的Claude→Codex讀回，不聲稱它取代Git、原生續接或完整命令紀錄。

已在虛構小型Git專案執行：baseline值2時測試通過；只改實作為3、測試仍預期2，同一測試exit1。交接與目前diff、測試版本的落差可被找出，三個工作檔hash不變。文章提供[完整輸入與實際結果](https://wenlan.app/examples/context-recovery-check.json)的本地待發布檔；此連結不作正式站發布收據。此練習沒有執行LLM、Wenlan或原生resume，也不證明搜尋成長。

隔離worktree：`/Users/lucian/.codex/worktrees/seo-context-recovery/wenlan-site`，base `2734c2969e6207d8d4c73063661ce0759fc3853f`。獨立Sol／xhigh審查後已修正「舊交接commit→HEAD也要比較」、測試切片改AST及plugin／MCP-only界線，closure通過。Luna／high分別做唯讀意圖核對與固定範例實作。最終lint、build、test:seo（425＋133通過，2項原有skip）、seo:technical:built及diff檢查通過；桌面1280與手機393px、深淺色、FAQ、JSON與兩個跨頁anchor已實際驗證，無觀察到的console error。全站測試使用與CI相同的公開Wenlan source `52656ab00eae3699cb5636d4093282d85c62fcb7`；舊本機source的單項外掛規格失敗另外保留，未放寬斷言。

準備狀態：**本地驗證完成，由[#247](https://github.com/7xuanlu/wenlan-site/pull/247)交付**；最終合併／正式部署見該PR收據。當前版本的post-deploy crawl／28日冷卻尚未確認，不宣稱改寫門檻通過。原始GSC沿用既有成功讀數；逐頁解析、Google快照、範例與最終驗證見 `/tmp/wenlan-seo-demand/2026-10-19-context-recovery/` 的 `candidate-evidence.json`、`verification.json`。發布後須等自然crawl，再依契約用可比窗口觀察同詞曝光／位置與點擊；若只有模糊或AI式詞、缺合格曝光，不立即再擴寫。本段保留準備時的驗證範圍；發布收據見#247，不提交Google索引或恢復weekly。原checkout的舊dirty與Claude事實修正worktree均保留。


本輪問題：近期造訪是否主要是 Threads？SEO 下一個具體機會在哪？使用者優先自然搜尋；10-18另明確指示依真實搜尋詞與前排文章補好 Codex MEMORY.md 教學，驗證後發布。weekly 保持暫停。此為人工查核，不重啟已結束的 successor campaign，不改歷史目標。

## Google 搜尋與社群分開

來源：登入後 Search Console API，`sc-domain:wenlan.app`，Web、全球、byProperty。兩個不重疊28天；已用 `dataState: final` 每日資料核對合計。

| 指標 | 08-21～09-17 | 09-18～10-15 |
| --- | ---: | ---: |
| Google 搜尋曝光 | 1,678 | 1,934 |
| Google 搜尋點擊 | 19 | 30 |
| CTR | 1.13% | 1.55% |
| 可見 query 點擊／曝光 | 6／402 | 9／432 |
| query 隱藏差額（點擊／曝光） | 13／1,276 | 21／1,502 |

點擊增加11（57.9%），曝光增加256（15.3%）；不能歸因某次改版。可見詞中 `wenlan`4點擊、`文澜`1；明確非品牌 Wiki 詞3點擊，另1次「do they have a website?」意圖不明。其餘21點擊的詞不可見，所以不能宣稱30次全是新客或完整非品牌成長。GSC點擊不包含直接從Threads進站，但Threads可能促成品牌搜尋，也無法排除站主自行搜尋。

Vercel 同一請求日期窗口獨立記錄：947 visitors／1,199 pageviews；`google.com`47 visitors，`l.threads.com`12，direct874。訪客不等於GSC點擊，不相加為去重人數。direct不能指認為Threads或自然搜尋。

較近的Vercel補查回傳**實際窗口**10-11T00:00Z～10-18T01:00Z（API把輸入until向後展一小時）：google.com19 visitors、l.threads.com14、無referrer181。只能確認有Threads導流，不能證明大多數增長來自Threads；不與上表28天比較成長率。自訂事件仍account-gated，沒有付費或推算安裝。

## 下一個優先診斷：Codex 記憶教學

| 現有 owner | 09-18～10-15 page曝光／點擊 | 本輪動作 |
| --- | ---: | --- |
| EN how-to-give-codex-persistent-memory | 506／2（CTR0.40%） | 優先檢查可見搜尋詞與結果呈現 |
| EN distilled-wiki-pages-ai-memory | 189／7（3.70%） | 保留已完成教學；追蹤精確詞，非再全面重寫 |
| EN claude-code-memory | 176／1（0.57%） | 次順位檢查；不由頁平均判定標題問題 |
| Obsidian EN／TW／CN | 60／0、17／1、4／0 | 新版繼續人工讀數 |
| 個人KB EN／TW／CN | 12／0、5／1、2／0 | #235已合併；樣本仍小，移除待發布舊狀態 |

Codex 的可見 query×page 只涵蓋70曝光、0點擊，另外436曝光及2點擊的詞未知。具體詞 `enable codex memories`16曝光、平均7.94、0點擊；`codex memory.md`10、12.5、0；`codex memory`8、30.13、0。這些是不同任務/位置，不把506曝光全部歸到啟用記憶，也不能單由0.40%診斷description失敗。

已另取同頁 query×date×country×device：61列合計70曝光、0點擊，與可見query總量相符。美國35曝光；`enable codex memories`的16次全球曝光中僅5次美國桌面（平均7.6），加拿大桌面3次，其餘各市場各1次。`codex memory.md`美國桌面9次（平均13.11）、手機1次（平均7）。市場／裝置樣本很薄，不能把一次美國SERP當成全部506曝光的點擊原因。

逐詞任務核對：明確英文啟用詞合計19曝光／0點擊；memory.md兩種拼法11／0；「有沒有／是什麼記憶」6／0。可見詞沒有明確「記憶沒生成／沒生效」查詢；`its not there`等零散對話各1次且缺上下文，不能當已驗證的排錯需求。這不是證明沒人需要排錯，而是本輪本站資料尚不能支持把排錯當新主題。下一次內容比較先對齊已見的啟用與memory.md任務。

10-18直接查看 US/en `enable codex memories` Google 搜尋（hl=en/gl=us/pws=0，登入帳戶；頁尾顯示not personalized與美國IP定位）：本站在首個結果頁，位於官方文件、Reddit、MemoryLake、GitHub討論等之後。Google顯示本站當前標題與啟用方法片段，沒有看到舊版標題／不相關摘要。可見AI Overview已直接給出Settings與config啟用方法，可見引用是官方文件及Reddit；未展開的其他引用未知。這支持「簡單啟用問題在結果頁就可能獲答」的診斷方向，不能證明本站CTR下降由AI Overview造成。這是一次桌面快照，不是穩定排名或台灣/中國結果。沒有點擊本站搜尋結果。AX結果與截圖收據保存在私有原始資料目錄，未將帳戶／定位畫面放入repo。

直接閱讀正式本站全文、[官方記憶文件](https://learn.chatgpt.com/docs/customization/memories)及前排商業指南 [MemoryLake](https://www.memorylake.ai/en/blogs/turn-on-codex-local-memories)：啟用、延遲生成、AGENTS.md、設定、儲存位置與排錯，本站主要步驟已涵蓋。MemoryLake的標題更聚焦啟用與控制，但沒有其CTR或實驗證據，不能照抄標題就推定有效。官方文件已能回答啟用問題，所以有曝光不代表讀者必須點我們。尚未隔離AI摘要、排名、內容與品牌權威各自影響。

同日另查已出現的 `codex memory.md`：一次US/en首個結果頁未見本站，可見前排包括官方及 [Mem0指南](https://mem0.ai/library/coding-agents/how-memory-works-in-codex-cli)，AI Overview直接列記憶檔名與用途。閱讀Mem0原文後的具體差異：它逐個列檔名，本站僅畫到memories資料夾。這指出「檔案在哪、做什麼、怎麼管理」的答案比較方向，不能由一個前排頁面推定其SEO寫法造成排名。檔名細節仍需對齊當前Codex實作，不能照抄供應商技術敘述。

## Codex MEMORY.md 補強決定（10-18 使用者授權）

使用者本輪明確要求「根據實際搜尋詞和前排文章……把 Codex 那篇 memory.md 的內容補好，驗證完再發布」。這只授權本篇內容及正常發布，不修改舊 campaign 的目標、冷卻規則或其他 owner，也不重啟排程。

- **搜尋者與任務：** 英文 Codex 使用者已在搜啟用記憶（兩詞19次曝光）及 MEMORY.md（兩種拼法11次）；要知道怎麼啟用、檔案在哪與怎麼用。小樣本不代表市場月量或轉換需求。
- **可帶走的答案：** 可核對的檔案路徑／用途表、唯讀檢查指令、按需查找與 AGENTS.md 的區別；不用安裝 Wenlan 也能完成原生記憶的檢查。
- **與前排差異：** 官方使用文件足以回答開關；Mem0 逐檔列用途，本站原版只列資料夾。本次補這個具體缺口，技術細節回查 OpenAI 原始碼，不採供應商行銷論述。不聲稱內容形式使對方排名靠前。
- **讀者入口：** 既有 `/learn/how-to-give-codex-persistent-memory` Google 曝光；不新開同義頁，不靠外聯或 Threads 充當自然搜尋成果。
- **為何先做：** 這篇506次曝光高於本輪其他具體工具入口，且有已見詞、可修的答案缺口；Wiki已完成並有7點擊，先保留。中文無本篇 owner，不能將英文證據當中文需求，不增設翻譯。
- **改變決定的觀察：** 如果重新抓取後同詞仍未得到足夠曝光，先查市場／裝置／位置與 SERP，不連續再換標題；有曝光但無點擊再檢查呈現與搜尋意圖。

內容：標題／description直接說明 MEMORY.md、啟用與 AGENTS.md；新增四項檔案用途、整檔不會每次注入、唯讀路徑檢查及生成延遲。保留既有 storage anchor、URL、原生啟用步驟及跨工具 Wenlan 入口。也修正「原生記憶無來源／其他工具不能讀」的過廣敘述：本機檔案可檢視，其他工具不會自動共用記憶庫，MCP提供共同capture／recall介面。這些錯誤未被證明是低點擊的原因。

技術依據：[OpenAI使用文件](https://learn.chatgpt.com/docs/customization/memories)；[檔案角色的固定實作](https://github.com/openai/codex/blob/22dd9ad3929253ed24d7ee4f10f238e95ab25f37/codex-rs/memories/write/templates/memories/consolidation.md)；[摘要與按需查找的固定實作](https://github.com/openai/codex/blob/de513a83f3fa8ae7a4b1af8dbe34e3d20ebe4f84/codex-rs/ext/memories/templates/memories/read_path.md)。頁面明示10-18查核、內部檔案可能隨版本變動。沒有把使用文件未列出的檔案細節寫成永久介面。

### 人工追蹤事先定義

假設：補齊真實 MEMORY.md 任務，比只有開關／資料夾的答案更符合這組查詢；不是「改description保證增加流量」。基線就是本報告固定28天，更新後從確認新版抓取的次日算完整天，不把混合期作改版成效。

- 最低曝光：完整28天 MEMORY.md 兩詞合計至少20次**可見query×page曝光**；不足標為inconclusive。這是方向性觀察門檻，不是統計顯著或新 campaign 目標。
- 成功訊號：達門檻且該組至少1次點擊、沒有明顯任務錯配；同時列各國家／裝置的曝光、位置、CTR，不把不同排名的CTR混為標題因果。
- 失敗／停止：達門檻仍0點擊，或出現技術錯誤，分別回查同市場SERP／先修錯誤；不自動擴寫其他 owner。若排名／曝光改變而無法分離原因，不能宣稱文案驗證成功。
- 手動節點：24h核對部署／索引設定；7d看新版crawl；W2作暫讀；W4看完整抓取後28天；W8仍不足門檻則結束本次假設為inconclusive，另作選題判斷。weekly仍PAUSED，不建立背景作業。

## 抓取已確認，避免重送與重做

登入 URL Inspection API 11頁均 `PASS`、indexed、成功抓取、Google/user canonical一致；不提交索引請求。

- EN Codex、Claude：10-09；三語Wiki：10-10；三語Obsidian：10-09。
- 個人KB EN/TW：10-13，晚於#235；CN10-10早於#235，不能說Google已看到CN新版。
- 本次28天混合改版前後，只是挑選診斷入口，不能當改版後28天成效實驗。此次latest crawl不等於首次post-deploy crawl，不由它推算強制等到某日。本次補強依上述使用者當前、單篇明確授權，不靠舊capture推導全域解除門檻。

決定：下一個自然搜尋工作聚焦**Codex記憶教學**既有入口，已保存同詞/同頁、國家/裝置/位置基線。啟用方法已被官方和AI Overview直接回答，不只因零點擊就換標題；優先比較memory.md操作答案與排名前頁的差距，排錯尚無本站明確需求證據，不另開文章。Wiki保留成果。中文保留獨立owner/數據，沒有英文量值外推。後續比較同市場同裝置的搜尋詞、曝光、位置和點擊；任何頁改版不承諾增長。

## 驗證與保存

- 來源程式：origin/main@276502f 的 GSC fetcher/auth；Vercel fetcher與該ref無差異。主checkout main@d5a9899保留dirty，未pull/reset/stash。
- 已先重用：最新完整weekly Sep2～29（4624 worktree）及後續GSC Sep9～Oct6；不足回答目前問題，才取本輪新窗口。
- control複查 PASS（隔離分支，含本輪ledger）；已讀 current contract 的successor/quality/evidence與authority correction、共用continuity。沒有復活舊campaign，沒有新排程。
- 原始私有匯出/每日對帳/11頁inspection/檔案SHA256：`/tmp/wenlan-seo/2026-10-18-organic/verification.json`及同目錄。缺漏不以零代替；final每日資料最晚到10-16，本輪28天固定截至10-15以保留與Vercel的對照。
- 內容在隔離分支 `codex/seo-organic-codex-accuracy`，base `276502f`；原main dirty完整保留。不包含其他文章或UI架構改版。
- 本次補強：goal／scenario check、test:goal 60、test:seo 422與measurement 133通過／2跳過、test:i18n 87、lint、build、technical:built、intent check與diff check均通過。內容唯讀指令在本機執行成功，只核對檔名存在、不輸出記憶內容。桌面1280與精確393px、明暗主題、既有storage anchor與新增FAQ已檢查，無頁面橫向溢出、壞圖或瀏覽器error/warn。成品沒有向analytics送測試事件。發布前最後文字校正後重新build／technical check；正式部署收據放PR，尚未宣稱Google已抓新版。
- 唯讀來源查核使用explorer（Luna/high），獨立內容審查使用reviewer（Sol/xhigh）；lead負責判斷、編輯及整合。代理同意不取代原始證據。
- Recrawl after deploy：本篇title/meta與答案實質改動，應 Request。其他衍生URL待build差異表逐項判定；正式請求須先查新版crawl並取得本批確認。未重送已於10-18請求的首頁／evaluation。

## Claude → Codex 共用記憶實測（10-18 單篇發布授權）

使用者明確要求補強既有共用記憶頁、實際由 Claude 存決定及 Codex 讀回，驗證後發布。本次僅處理英文既有 owner `/learn/codex-claude-code-shared-memory` 的產品證據缺口；不重啟過期 campaign、不更動其他 owner 或取得索引請求／排程授權。這是本次具體內容與發布指示，不聲稱舊曝光／冷卻門檻已通過。

- **需求與入口：** 既有英文跨工具決定交接任務；同一完整 GSC 09-18～10-15 窗口，該頁79曝光／1點擊，點擊詞不可見。先前 Planner 精確長詞10–100／月是舊估值，不是實測流量，也不外推中文量。
- **可帶走的結果：** 兩端安裝與同 Space 的重現步驟、Claude capture 回執、全新 Codex recall 實際回傳、可下載的去識別 JSON。既有其他文章已有操作方式，這次補「確實跑過」的證據；不再新增同義頁。偶爾交接仍可用共用 Markdown；此測試只證明 Wenlan 能跨工具取回一筆有來源的決定。
- **實測：** Wenlan daemon0.19.1；Claude plugin0.19.0／Sonnet5.5；Codex plugin0.19.1+codex／gpt-6-luna（high）；acpx0.14.0。專用 `seo-shared-proof-20261018` Space，兩個獨立程序及工作目錄。
- **寫入：** Claude 一次 `mcp__plugin_wenlan_wenlan__capture`，保存明示為虛構的 Harbor 決定（4次、間隔17秒、取代無限重試、原因），另有隨機碼 `02cbdd0bfa`。回執 `source_memory_id: mem_15dabf75a4df`、`space_source: request`、`write_outcome: created`。
- **獨立讀回：** 新 Codex 只收到 Space 與問題，未收到決定、碼或來源 ID。trace 僅有一次 `wenlan.recall`，無檔案讀取／shell呼叫；1筆結果的完整內容與 ID逐字相同，`source_agent: claude-code`、`version: 1`、`confirmed: false`。兩端 exit0、`end_turn`，另核對工具原始回應而非只相信模型總結。
- **限制：** 原生工具／啟動環境沒有被當成安全沙箱認證；這不是盲測安全研究或成功率基準。未驗證反向流程、多機、同時改寫、自動捕捉或決定本身正確。保存／取回不等於人工確認。產品圖沿用已核實測試 fixture，明示不是本次 Harbor 記錄；真正證據為 MCP內容。
- **第一批讀者與後續：** 既有 Google owner；無外聯、社群或付費安排。發布後以 Google 自行抓取作起點，再看同詞曝光、點擊與可得的後續行為；沒有足夠曝光只能判不確定，不宣稱圖片或實測使排名提升。weekly維持PAUSED、手動追蹤。

去識別原始欄位及 transcript SHA-256：[公開實測回執](../../public/examples/claude-codex-shared-memory.json)。完整私有輸出在 `/tmp/wenlan-seo-demand/2026-10-18-shared-proof/`，不可整包公開（含其他工具清單和帳戶用量）。本篇未新增中文 owner，保留既有三語頁面／hreflang邊界。驗證及部署收據以本次 PR 的測試與正式站核對記錄為準，實測成功不代表自然搜尋已成長。


## 下一輪既有頁核對與本地修正（10-18）

重用同一完整 09-18～10-15 GSC Web 窗口，逐一核對全部116個有曝光頁面；18頁達20曝光，其餘98頁不足。沒有用Threads造訪、搜尋建議或供應商估值補成Google需求。

| 18頁的處理 | 頁數 | 根據 |
| --- | ---: | --- |
| 最近已改，保留觀察 | 8 | Codex、EN Wiki、Claude、共用記憶、EN Obsidian、TW Wiki、context-loss、ai-work-memory |
| 品牌／導覽／文件入口 | 6 | 首頁、下載、architecture、about、learn、CN首頁，不能當已見非品牌文章需求 |
| 意圖不合 | 1 | source-backed wiki 的可見詞偏泛團隊知識庫選型，不硬套個人工作流程 |
| 看不到查詢 | 1 | coding-agent-source-backed-knowledge-base 有41曝光，但query×page無列，任務未知 |
| 概念比較可補具體答案 | 1 | ai-work-memory-vs-knowledge-base：41曝光／0點擊；精確詞11曝光／0點擊 |
| 版本範圍需澄清 | 1 | SuperLocalMemory頁37曝光／1點擊；品牌詞9曝光不能證明比較意圖 |

### AI memory vs knowledge base：為什麼選這篇

1. **誰與任務：** 既有英文精確詞 `ai memory vs knowledge base` 11曝光、0點擊，平均20.55；其中美國桌面10曝光、平均22.4，羅馬尼亞手機1曝光、位置2。它直接問知識庫與記憶的分工，符合既有知識庫概念owner；樣本小，沒有市場月量或購買意圖的證明。
2. **可帶走的結果：** 用同一個決定分辨「當前規則／參考文件」和「先前決定與原因」，並能選擇KB、持久記憶或原生對話歷史；不必安裝產品。RAG與資料庫只是補充解釋，沒有宣稱是新查詢需求。
3. **實際差距：** 10-18 US/en桌面Google首頁，前兩個一般結果為[DEV](https://dev.to/bobur/agent-knowledge-vs-memories-understanding-the-difference-4pgj)和[AIAppsAPI](https://aiappsapi.com/articles/selflearningai/memoryvsknowledgebase.php)，Wenlan第三；本站顯示現行標題及July24摘要。對方提供並列實例，本站原版偏抽象；對方也有「KB永遠靜態、記憶全自動」的過廣概括，不照抄。這只是一個結果頁快照，不是穩定第三名，也不證明例子造成排名。AI Overview可直接給概念答案，未證明它造成本站零點擊。
4. **入口：** 沿用既有Google owner，不新建同義頁、不把社群流量算自然搜尋。中文無這個owner的相應需求證據，本批不由英文數據推出翻譯頁。
5. **為何先做：** 在這批達曝光門檻、尚未近期改寫的文章中，本篇有明確對應詞、可核實的答案缺口和可重用實證；其他選項的限制見上表。這支持一次有界的本地補強，不能證明它是全市場最高回報行動。
6. **停止／改變：** 發布後先確認新版crawl，再取完整28天同詞／同頁／同市場裝置資料。精確詞不足20曝光則inconclusive；達20仍零點擊，回查當時SERP、顯示摘要與位置，不自動再改文案。有點擊僅是方向性訊號，不能隔離文案因果。W8仍不足曝光則停止這項假設。手動追蹤、weekly維持PAUSED。

**抓取與版本邊界：** 只為這兩頁補取URL Inspection及本篇query×country×device，未重跑完整管線。本篇indexed／PASS、canonical一致，最後crawl09-10；語意內容最後改於07-24（git f8b8adc），頁／精確詞曝光達20／3的數量門檻。但10-11另有GitHub搬家href維修，未確認Google抓過目前部署版本，不能宣稱完整post-deploy crawl／28天條件通過。本批依使用者本輪要求準備本地可審查草稿；不能自行升格為已核准的SEO實驗或發布。發布前須確認現版抓取條件，或取得使用者對本批具體內容修正的直接發布指示；不更動門檻、也不提交索引請求。

**內容依據與真實證明：** [LangChain memory](https://docs.langchain.com/oss/python/concepts/memory)記載跨thread記憶、facts／experiences／instructions與不同寫入方式；[retrieval](https://docs.langchain.com/oss/python/deepagents/retrieval)記載既有資料源及檢索後生成。據此移除靜態／自動化的假二分。用前一篇已公開的[Claude→Codex回執](../../public/examples/claude-codex-shared-memory.json)示範真實取回一筆決定；另擬的知識庫段落必須明示為說明，沒有冒充本次生成的Page。confirmed:false，不代表人工驗證或可直接用於真實系統。重用這筆測試，不宣稱再測了一次。

**SuperLocalMemory事實維修：** [v4.2.10發布頁](https://github.com/qualixar/superlocalmemory/releases/tag/v4.2.10)標示10-17發布。原文釘在v3.8.3／Wenlan0.14.1，本次只在前面及摘要標清歷史比較、加現版本來源；不換掉舊測試版本、不把README或發布說明當重測結果，不宣稱目前產品贏家。

私有原始收據：`/tmp/wenlan-seo/2026-10-18-next-owner/`（inspection、精確詞分拆）；`/tmp/wenlan-seo-demand/2026-10-18-next-owner/`（SERP、驗證）。公開紀錄不保存登入帳戶／定位畫面。此節是本地準備記錄；發布與實際成效另據收據判定。


### 本批交付與驗證（發布前驗證）

隔離工作目錄 `seo-next-demand-repair`，base `4061498`；原dirty checkout未作內容修改。只改上述兩個英文owner、兩份既有契約測試及本輪三份既有記錄。概念頁保留原URL／發布日期／全部原段落anchor，通用比較表不再把「AI memory」標為Wenlan產品；SuperLocal的SoftwareApplication仍指向v3.8.3來源，不把v4來源配給舊版本。

- goal／scenario、test:goal 60、test:seo 422、measurement 133通過／2跳過、test:i18n 87、lint、production build、technical:built、intent與diff check通過。獨立審查後改動另跑相關契約測試；手機短行修正後重build／technical check。非production建置沒有送IndexNow或analytics事件。
- 兩頁均實看1280桌面、精確393px、明暗主題；概念表手機逐項排列，實測摘要與示例code無水平捲動，頁面無橫向溢出、壞圖或console error／warn。實際點開JSON回執及RAG FAQ，內容正確；不是只核對href存在。
- bounded explorer／worker使用原生角色預設Luna/high；獨立reviewer角色為Sol/xhigh。一輪審查及一次closure，lead修復closure指出的舊版建議現在式，並核對最終built schema和畫面。未把模型同意當證據。完整檔案雜湊、base、diff SHA與畫面收據在私有 `verified-state.json`／`browser-verification.json`。

驗證完成後，使用者直接指示「把這兩頁發布，先不用提交索引請求，等 Google 自己抓取」。據此發布本批具體修正；這不是完整抓取／冷卻門檻已通過，也不解除其他頁面的門檻或重啟campaign。實際合併、CI與正式部署以本批PR收據為準。Google索引請求跳過，weekly維持PAUSED；未宣稱獲客已改善。本次修正不代表已找出足以大幅增加流量的搜尋市場。
