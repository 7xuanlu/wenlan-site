# 技術 SEO 與 i18n 修正交接 — 2026-09-16

狀態：分支 `claude/magical-shannon-cfohdu`，已推送，未開 PR。
第一輪在雲端容器完成；第二輪（同日）在本地收尾，見「本地收尾」。
這是工作交接紀錄，不是排名讀取，也不是發布批准。

## 執行環境警告（第一輪）

第一輪在雲端容器執行，缺 `../wenlan` 與 `../wenlan-app`，也無法呼叫 Muse。
當時 `pnpm test:seo` 有 13 個失敗，並以「對未修改 HEAD 的失敗清單逐字相同」
判定全屬環境因素。**這個判定不完整**：本地補齊 Wenlan checkout 後，
其中 3 個是 main 上真實的紅燈（#203 改版 OG 圖，契約測試沒跟上），
在未含本分支的 `75a7767` 也能重現。基線相同只證明「不是本分支造成」，
不證明「是環境造成」。

Google API、chromestatus 被網路政策擋掉，無法跑 `seo:gsc:fetch`，
也無法查證 Chrome XSLT 移除的確切里程碑；這兩點本地收尾未處理。

## 起因與最初的誤判

使用者朋友比對兩站的 `sitemap.xml` 截圖，認為本站「SEO 完全亂調」。
實際差異是對方掛了 XSL 樣式表、瀏覽器渲染成表格；本站是原始 XML。
**爬蟲不套用 XSLT**，此差異對排名無影響。對方的 sitemap index 反而
沒有 `lastmod`，本站每筆都有。該指控不成立。

## 改動（依 commit 順序）

| Commit | 內容 |
| --- | --- |
| `114a1d8` | sitemap 移除 173 筆重複 image、hreflang `en-US`→`en`、robots 27 群組收斂為 1 |
| `300d796` | 加 CI workflow；技術檢查進 postbuild |
| `1ba2491` | XSL 樣式表 + route handler |
| `9da009b` | 技術檢查從 postbuild 移到 CI 步驟 |
| `009dc01` | **撤回** `1ba2491` |
| `fdcf06d` | i18n 稽核七項修正 |
| `bbf73d0` | 本交接文件 |
| `d1cfe6b` | footer 語言選單在手機上錨定左側，不再開到畫面外 |
| `2449d9c` | 品牌契約測試對齊 #203 無指標、無版本的 OG 圖（修 main 的 3 個紅燈） |
| `095eb36` | CI 移除 token 閘門、固定 checkout 公開的 Wenlan repo；公開原始碼掃描略過 `.release-source` |
| `cf8f946` | `distilled-wiki-pages-ai-memory` 中文翻譯對齊英文 |
| `3eafbb5` | 中文 `/docs` 的 sitemap lastmod 改依 get-started，不再跟英文 docs 走（Muse 審查發現） |
| `5d31945` | CI 改為淺層 checkout 加 tag 抓取，不再拉完整歷史（Muse 審查發現） |

### 為什麼撤回 XSL（`1ba2491` → `009dc01`）

使用者原本要求「全做」，實作完成後獨立審查指出：Chrome 已排程移除 XSLT
（審查員稱 143 起警告、155 移除，**日期未能獨立查證**）。等於用維護中的
Next metadata route，換一個即將失效的裝飾，且該功能 SEO 價值為零。
使用者裁示撤回。Cache-Control 迴歸與 `/sitemap.xsl` 漏 noindex 兩個缺陷
隨撤回一併消失。

### 為什麼技術檢查不放 postbuild（`9da009b`）

`seo-built-technical-check.mjs` 寫死逐篇文章的 `datePublished`／`dateModified`
與必要 slug、必要內鏈。放在 postbuild 會讓**任何內容編輯擋下 Vercel 正式部署**。
改為 CI 步驟：迴歸仍在合併前攔截，代價是紅色 PR 而不是線上發不出去。
理由已記入 `AGENTS.md`，避免日後被搬回。

## 三輪獨立審查的結論

三份審查（迴歸、技術 SEO、多語系）一致認定**基礎是健康的**：
canonical 全部自我指向、hreflang 互指且含 `x-default`、無孤兒 alternate、
無語言自動轉址擋爬蟲、zh-TW 與 zh-CN 是真區域化（用字掃描確認，非機械轉換）、
sitemap 173 筆無重複。robots 收斂一項另以 RFC 9309 §2.2.1 逐條驗證。

i18n 稽核七項已於 `fdcf06d` 全數修正，最重要兩項：

1. **中文 404 對爬蟲宣稱自己是可收錄的首頁** —— `[locale]/not-found.tsx`
   是 client component 又無 metadata export，繼承了 layout 的首頁 metadata
   （`index, follow` + canonical 指向 `/zh-TW` + 首頁 hreflang + 首頁標題）。
   英文版本來就做對了。已拆為 server wrapper + client child。
2. **中文 sitemap 的 lastmod 抄英文** —— `/zh-TW/learn` 標成英文最新文章日期，
   且任何英文 docs 編輯都會重蓋兩個中文 hub。核心 entry 現在可逐語系解析。

## 本地收尾（第二輪）

第一輪留下的待辦全部已處理：

1. **`WENLAN_REPO_TOKEN`：不需要**。`7xuanlu/wenlan` 是公開 repo，閘門只是讓
   `pnpm test:seo` 在 CI 永遠不跑。現在固定淺層 checkout 到
   `.release-source/wenlan`，再另外抓取所有 tag（測試要讀選定 release tag）。原本的閘門還藏了一個
   潛在失敗：checkout 進工作區後，公開原始碼掃描會掃到 Wenlan 自己的歷史文字，
   兩個品牌測試會失敗（已用反向對照確認），因此加入略過清單。
   `wenlan-app` checkout 沒有任何測試讀取，已從 `AGENTS.md`／`CLAUDE.md` 移除。
2. **翻譯漂移已對齊**。英文 09-13 新增的 Obsidian 遷移連結與兩篇相關文章，
   已補進 zh-TW 與 zh-CN；雜湊本來就與目前英文一致，未改值。
3. **robots 與結尾斜線：刻意不改**。唯一的 GET API `/api/release` 已送
   `X-Robots-Tag: noindex, nofollow`；加 `Disallow: /api/` 反而讓爬蟲看不到這個標頭。
   其餘兩個 API 只接受 POST。`https://wenlan.app` 與 `https://wenlan.app/`
   是同一個 URL（空路徑等同 `/`），不是缺陷。
4. **footer 語言切換器已目視確認**，並發現一個缺陷：手機寬度下 footer 換行，
   切換器落在左側，而選單靠右展開，會超出畫面左緣。已修正並在
   375／640／1024px 與首頁 header 重新確認。

驗證（工作樹 = `5d31945`，模擬 CI 的淺層 checkout 加 tag 抓取）：`test:seo` 371/371、
`test:i18n` 86/86、`lint`、`build`、`seo:technical:built` 通過；
`i18n:technical:built` 對 `next start` 通過（39 條 200、4 條 404）；
建置後的 sitemap 顯示 `/docs` 為 09-10，中文 `/docs` 為 09-09。
注意該檢查預設打 `127.0.0.1:3000`，本機該埠被其他服務佔用時會產生大量假 404，
請用 `I18N_CHECK_BASE_URL` 指定。

### Muse 審查（muse-spark-1.3-contributor，effort high）

審查整個分支（`origin/main...cf8f946`），**無 blocker**。處理結果：

| 發現 | 等級 | 處理 |
| --- | --- | --- |
| 中文 `/docs` lastmod 仍用英文 docs 最新日期，與 `fdcf06d` 修的 lastmod 灌水同類 | should-fix | 已修（`3eafbb5`），並補契約測試；反向對照確認舊寫法會失敗 |
| 翻譯 `updatedAt` 09-16 晚於英文 09-13 | should-fix | 不改：中文頁面內容確實在 09-16 變更，lastmod 應反映本頁 |
| CI job 名稱沒寫到契約測試 | nit | 已改名；`ci.yml` 不在 main，不影響必要檢查名稱 |
| `fetch-depth: 0` 每次拉完整歷史 | nit | 已改（`5d31945`）：本地完整歷史 814 MB，淺層加 tag 98 MB，371/371 |
| about OG 版本迴圈在無版本時空轉通過 | nit | 不改：符合 #203 意圖，Muse 同意 |

closure check 五項全部 accepted，fix diff 無新缺陷。第 4 項 Muse 註明
未在 GitHub 網路上重驗，只有本地模擬；第一次 CI 執行才是最終證據。

**限制**：審查 session 要求唯讀，但 `set-mode readOnly` 套用後 adapter
在首次提問時重建 session，實際模式是 `default`，唯讀並未強制。
兩次呼叫實際只用了 read 與 search 工具，工作樹確認無非預期變更。

## 流量診斷：技術不是瓶頸

本輪一度引用 2026-07-31 的舊數據並得出錯誤的樂觀結論，已更正。
最新已對帳數字（`2026-09-08`，窗口 08-10..09-06）：
property 14 clicks／1,270 impressions／平均位置 **22.34**。

核心目標查詢（**不是 memory 類**）：

| 查詢 | 曝光 | 點擊 | 位置 |
| --- | ---: | ---: | ---: |
| `llm wiki` | 15 | 1 | 40.4 |
| `karpathy llm wiki` | 13 | 1 | 51.3 |
| `agent knowledge base` | 21 | 0 | 67.2 |

Manual actions 為 No issues detected、128 頁已收錄、抽查 URL 全部 indexed
且 canonical 一致。**沒有證據支持「Google 認為網站有問題而降權」**。
與 `2026-09-04-seo-growth-diagnosis.md` 的結論一致：瓶頸是核心查詢能見度、
build/how-to 頁面交付不足、第三方曝光薄弱（大量 backlink 是自有舊網域遷移）。

技術 SEO 這條線建議停止投入。
