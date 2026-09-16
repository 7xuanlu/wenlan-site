# 技術 SEO 與 i18n 修正交接 — 2026-09-16

狀態：分支 `claude/magical-shannon-cfohdu`，6 個 commit，已推送，未開 PR。
這是工作交接紀錄，不是排名讀取，也不是發布批准。

## 執行環境警告（影響本輪所有未完成項）

本輪在雲端容器執行，**不是**設置完整的本地環境。因此以下事情做不到，
其結論必須在本地重跑後才算數：

- `../wenlan` 與 `../wenlan-app` 不存在 → `pnpm test:seo` 有 13 個失敗。
  已用 `git stash` 對未修改的 HEAD 跑過基線，**失敗清單逐字相同**，
  確認是環境因素，不是本輪改動造成。本地應重跑確認 371/371。
- Google API、chromestatus 被網路政策擋掉 → 無法跑 `seo:gsc:fetch`，
  也無法查證 Chrome XSLT 移除的確切里程碑。
- Muse（Musecode CLI）不在容器內。`acpx muse` 回報
  `Failed to spawn agent command: muse`。程式碼審查改由兩個獨立模型執行。

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

## 待辦

1. **`WENLAN_REPO_TOKEN` 未設**。CI 的 `pnpm test:seo` 步驟因此永遠不會執行，
   只輸出一行 notice。那 371 個契約測試目前在 CI 沒有任何覆蓋。
2. **翻譯漂移基線是快照，不是「全部是最新」的保證**。
   `learn-article-source-hashes.ts` 取自當下英文；
   `distilled-wiki-pages-ai-memory` 在加入檢查時**已經漂移**
   （英文 2026-09-13、翻譯 2026-09-08），未處理。
3. **既有問題，非本輪引入**：首頁 `<loc>` 與 canonical 無結尾斜線
   （`src/i18n/routing.ts:98-101`，Google 會正規化）；robots.txt 允許爬 `/api/*`。
4. **語言切換器現在出現在每一頁的 footer**（原本只有首頁）。這是可見的
   UI 變更，本地應目視確認，特別是向上展開在各頁面的表現。

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
