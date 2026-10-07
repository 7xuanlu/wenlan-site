import type { Locale } from "./locales";

export const googleAnalyticsCopy = {
  en: {
    title: "Cookie preferences",
    body: "Allow optional analytics cookies to understand visits and actions and improve the site? Decline or change your choice in the footer anytime.",
    allow: "Allow cookies", deny: "Decline", settings: "Cookie preferences",
    privacy: "Data use and Google Analytics", close: "Close", disabled: "Analytics cookies are off because your browser requests no tracking.",
  },
  "zh-TW": {
    title: "Cookie 設定",
    body: "允許選用的分析 Cookie，幫助我們了解造訪與操作、改善網站嗎？你可以拒絕，或隨時在頁尾更改。",
    allow: "允許 Cookie", deny: "不允許", settings: "Cookie 設定",
    privacy: "資料使用與 Google Analytics 說明", close: "關閉", disabled: "你的瀏覽器要求不追蹤，因此分析 Cookie 已關閉。",
  },
  "zh-CN": {
    title: "Cookie 设置",
    body: "允许可选的分析 Cookie，帮助我们了解访问与操作、改善网站吗？你可以拒绝，或随时在页脚更改。",
    allow: "允许 Cookie", deny: "不允许", settings: "Cookie 设置",
    privacy: "数据使用与 Google Analytics 说明", close: "关闭", disabled: "你的浏览器要求不跟踪，因此分析 Cookie 已关闭。",
  },
} satisfies Record<Locale, Record<string, string>>;
