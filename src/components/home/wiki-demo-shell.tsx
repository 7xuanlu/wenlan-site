"use client";

import type { Locale } from "@/i18n/locales";
import { nativeDemoIconPaths } from "./native-demo-icon-paths";

export type DemoDestination = "wiki" | "search" | "spaces" | "graph" | "sources" | "memories" | "topics";
export const shellCopy = {
  en: { navigation: "Navigation", wiki: "Wiki", search: "Search", spaces: "Spaces", graph: "Graph", sources: "Sources", memories: "Memories", topics: "Topics", more: "More", query: "Search pages, memories, sources…", none: "No matching content", back: "Back to page", project: "Lumo launch project", demo: "Fictional personal library" },
  "zh-TW": { navigation: "導覽", wiki: "Wiki", search: "搜尋", spaces: "空間", graph: "圖譜", sources: "來源", memories: "記憶", topics: "主題", more: "更多", query: "搜尋頁面、記憶、來源…", none: "沒有符合的內容", back: "返回知識頁", project: "Lumo 發佈專案", demo: "虛構個人知識庫" },
  "zh-CN": { navigation: "导航", wiki: "Wiki", search: "搜索", spaces: "空间", graph: "图谱", sources: "来源", memories: "记忆", topics: "主题", more: "更多", query: "搜索页面、记忆、来源…", none: "没有匹配的内容", back: "返回知识页", project: "Lumo 发布项目", demo: "虚构个人知识库" },
} as const;

export function ShellIcon({ name }: { name: DemoDestination | "more" | "back" | "forward" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[22px] shrink-0">
    {name === "wiki" ? <><path d="m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5" /></>
      : name === "search" ? <><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></>
      : name === "spaces" ? <><circle cx="12" cy="12" r="7" /><ellipse cx="12" cy="12" rx="12" ry="3" transform="rotate(35 12 12)" /></>
      : name === "graph" ? <><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 6h10M6 8l5 8M18 8l-5 8" /></>
      : name === "sources" ? <><path d="M8 3h9l4 4v12h-4M17 3v5h4" /><rect x="3" y="7" width="13" height="15" rx="1" /><path d="M7 13h5m-5 4h5" /></>
      : name === "topics" ? <><circle cx="17" cy="6" r="3" /><path d="m2 15 4-10 4 10H2Zm11-1h8v8h-8z" /></>
      : name === "memories" ? <><path d="M12 6c-1-6-8-3-7 2-4 2-3 8 1 8-1 5 6 6 6 1V6Zm0 0c1-6 8-3 7 2 4 2 3 8-1 8 1 5-6 6-6 1M5 8l4 2m10-2-4 2" /></>
      : name === "back" ? <path d="m10 5-7 7 7 7M3 12h18" />
      : name === "forward" ? <path d="m14 5 7 7-7 7M21 12H3" />
      : <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>}
  </svg>;
}

// Current App reference: consistent-ui-delivery, PrimaryNavigation / TopicIcon / SpaceMark.
export function NativeRailIcon({ name, size = 22, className }: { name: Exclude<DemoDestination, "search"> | "account"; size?: number; className?: string }) {
  if (name === "wiki" || name === "sources" || name === "topics" || name === "account") {
    return <svg aria-hidden="true" focusable="false" data-native-rail-icon={name} width={size} height={size} className={className} viewBox="0 0 256 256" fill="currentColor">{nativeDemoIconPaths[name].map((d) => <path key={d} d={d} />)}</svg>;
  }
  return <svg aria-hidden="true" focusable="false" data-native-rail-icon={name} width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {name === "spaces" ? <><path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" /><path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /></>
      : name === "graph" ? <><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 6h10M6 8l5 8M18 8l-5 8" /></>
      : <><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></>}
  </svg>;
}

export function DemoIconRail({ locale, active, onNavigate }: { locale: Locale; active: DemoDestination; onNavigate: (destination: DemoDestination) => void }) {
  const copy = shellCopy[locale];
  return <nav data-demo-icon-rail aria-label={copy.navigation} className="wiki-demo-rail">
    <button type="button" data-demo-nav="search" aria-label={copy.search} title={copy.search} aria-current={active === "search" ? "page" : undefined} onClick={() => onNavigate("search")} className="wiki-demo-rail-button"><ShellIcon name="search" /></button>
    {(["wiki", "spaces", "graph", "sources", "memories", "topics"] as const).map((name) => <button key={name} type="button" data-demo-nav={name} aria-label={copy[name]} title={copy[name]} aria-current={active === name ? "page" : undefined} onClick={() => onNavigate(name)} className="wiki-demo-rail-button"><NativeRailIcon name={name} /></button>)}
    <span className="mt-auto mb-3 grid size-11 shrink-0 place-items-center text-[#646875]" title={copy.demo} aria-label={copy.demo}><NativeRailIcon name="account" /></span>
  </nav>;
}
