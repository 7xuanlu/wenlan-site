# OG 預覽圖視覺審查清單

每次修改 `src/lib/og-template.tsx` 或任一 `opengraph-image.tsx` 後，跑完 `next build` 並用 `next start` 本地渲染實際圖片，逐項勾選。

## 1. 版式與尺寸
- [ ] 圖片為 1200×630 PNG
- [ ] 背景為 `#101024` 深色，與 GitHub social-preview 一致
- [ ] 左右留白 80px、上下留白 72px，沒有元素貼邊

## 2. Logo（左側主視覺）
- [ ] Logo 尺寸 264×264，佔據左側版面（參考 `wenlan/docs/assets/social-preview.png`）
- [ ] Logo 圓角 60px，沒有變形、沒有被裁切
- [ ] Logo 清晰（用 128px PNG 轉 data URI，Satori 渲染不糊）

## 3. 文字區（右側）
- [ ] `WENLAN` 眉題：30px、粗體、青色 `#93E3F2`、字距 0.18em、大寫
- [ ] 標題：白色 `#F7F8FF`、粗體，在 724px 文字欄內不斷字、不溢出右邊界
- [ ] 描述：22px、灰藍色 `#AEB6DC`，自動換行完整顯示，沒有「keeps s」這種斷尾
- [ ] 長標題頁面（learn 文章）標題字級適中，不擠壓描述區

## 4. Footer
- [ ] 單行顯示：benchmark · 平台 · Apache-2.0 ＋ 右側 `by Qi-Xuan Lu`
- [ ] `by Qi-Xuan Lu` 不斷行、不被裁切、不與 `Apache-2.0` 黏在一起
- [ ] 字級 16px、灰色 `#7a7a85`，不搶主視覺

## 5. 多頁面覆蓋
- [ ] 首頁（`/`）
- [ ] `/about`、`/download`、`/links`
- [ ] `/docs` 索引與至少一篇 doc 頁
- [ ] `/learn` 索引與至少一篇長標題文章
- [ ] zh-TW、zh-CN 首頁（`/[locale]/opengraph-image`）

## 6. 真實平台預覽
- [ ] Twitter/X Card Validator（`summary_large_image`）
- [ ] Facebook Sharing Debugger
- [ ] LINE / WhatsApp / Telegram 實際分享截圖
- [ ] 縮圖尺寸下標題與 Logo 仍可辨識

## 7. 技術
- [ ] `tsc --noEmit` 通過
- [ ] `next build` 成功，`/opengraph-image-*` 路由正常生成
- [ ] 圖片檔案 < 300KB（目前 ~95KB）

## 本地渲染指令
```bash
./node_modules/.bin/next build
./node_modules/.bin/next start -p 3122
# 抓圖：
python3 - << 'EOF'
import urllib.request, re
html = urllib.request.urlopen("http://localhost:3122/").read().decode()
m = re.search(r'og:image["\']?\s+content=["\']([^"\']+)', html)
url = m.group(1).replace("https://wenlan.app", "http://localhost:3122")
open("/tmp/og-check.png","wb").write(urllib.request.urlopen(url).read())
EOF
```
