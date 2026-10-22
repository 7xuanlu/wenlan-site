import type { ReactNode } from "react";
import type { Root } from "fumadocs-core/page-tree";
import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/layouts/docs/page";
import { BookOpen, FileText } from "lucide-react";
import { GitHubLogoIcon } from "@/components/icons";
import { getCoreContent } from "@/i18n/content";
import { resourceCopy, resourceLinks } from "@/components/resource-navigation";
import { type Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/routing";
import { getReadingGroups } from "./reading-data";
import { LanguageSwitcher } from "@/components/language-switcher";
import { FumadocsThemeSwitch } from "./fumadocs-theme-switch";
import type { TocItem } from "./reading-types";

const copy = {
  en: {learn: "Learn", docs: "Documentation", overview: "Overview", search: "Search", contents: "On this page", copy: "Copy Text", copied: "Copied Text", close: "Close Search", empty: "No results found", openSidebar: "Open Sidebar", closeSidebar: "Close Sidebar", collapse: "Collapse Sidebar", language: "Page language", fallback: "Browse this section in", failed: "Search failed", tabs: "Choose Learn or Documentation"},
  "zh-TW": {learn: "學習指南", docs: "使用文件", overview: "總覽", search: "搜尋", contents: "本頁章節", copy: "複製", copied: "已複製", close: "關閉搜尋", empty: "找不到符合的內容", openSidebar: "開啟導覽", closeSidebar: "關閉導覽", collapse: "收合側欄", language: "頁面語言", fallback: "瀏覽此語言的目錄：", failed: "搜尋失敗", tabs: "選擇指南或文件"},
  "zh-CN": {learn: "学习指南", docs: "使用文档", overview: "总览", search: "搜索", contents: "本页章节", copy: "复制", copied: "已复制", close: "关闭搜索", empty: "找不到符合的内容", openSidebar: "打开导航", closeSidebar: "关闭导航", collapse: "收起侧栏", language: "页面语言", fallback: "浏览此语言的目录：", failed: "搜索失败", tabs: "选择指南或文档"},
};

export function FumadocsShell({locale, section, path, toc = [], children, index = false}: {
  locale: Locale; section: "learn" | "docs"; path: string; toc?: TocItem[]; children: ReactNode; index?: boolean;
}) {
  const chrome = copy[locale];
  const nav = getCoreContent(locale).home.content.nav;
  const download = nav.links.find(link => link.id === "download")!;
  const tree: Root = {
    name: chrome[section],
    children: [
      {type: "page", name: chrome.overview, url: localizePath(locale, `/${section}`)},
      ...getReadingGroups(locale, section).map(group => ({
        type: "folder" as const,
        name: group.label,
        defaultOpen: index || group.items.some(item => item.href === localizePath(locale, path)),
        children: group.items.map(item => ({
          type: "page" as const,
          name: item.english ? <span>{item.label}<span className="ml-2 text-[10px] text-fd-muted-foreground" lang="en">EN</span></span> : item.label,
          url: item.href,
        })),
      })),
    ],
  };
  return (
    <RootProvider theme={{enabled: false}} search={{options: {api: "/api/reading-search"}}} i18n={{locale, translations: {
      "Search(search trigger)": chrome.search,
      "Search(search dialog)": chrome.search,
      "Open Search(search trigger)(aria-label)": chrome.search,
      "On this page(table of contents)": chrome.contents,
      "Copy Text(code block)(aria-label)": chrome.copy,
      "Copied Text(code block)(aria-label)": chrome.copied,
      "Close Search(search dialog)(aria-label)": chrome.close,
      "No results found(search dialog)": chrome.empty,
      "Search failed(search dialog)": chrome.failed,
      "Open Sidebar(sidebar)(aria-label)": chrome.openSidebar,
      "Close Sidebar(sidebar)(aria-label)": chrome.closeSidebar,
      "Close Sidebar(aria-label)": chrome.closeSidebar,
      "Collapse Sidebar(sidebar)(aria-label)": chrome.collapse,
      "Layout Tab(layout tab trigger)": chrome.tabs,
    }}}>
      <link rel="stylesheet" href="/reading-search-highlight.css" precedence="default" />
      <DocsLayout tree={tree}
        tabs={[
          {title: chrome.learn, url: localizePath(locale, "/learn"), icon: <BookOpen size={18} />},
          {title: chrome.docs, url: localizePath(locale, "/docs"), icon: <FileText size={18} />},
        ]}
        nav={{title: <span className="font-serif text-2xl tracking-tight">Wenlan</span>, url: localizePath(locale, "/")}}
        themeSwitch={{enabled: false}}
        sidebar={{footer: <div data-reading-preferences className="flex items-center gap-1 pt-1">
          <LanguageSwitcher locale={locale} href={path} placement="up" variant="sidebar" />
          <FumadocsThemeSwitch locale={locale} />
          <a href="https://github.com/wenlan-app/wenlan" aria-label="GitHub" className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent"><GitHubLogoIcon className="size-4" /></a>
        </div>}}
        links={[
          {type: "button", text: download.label, url: localizePath(locale, download.href)},
          {type: "menu", text: resourceCopy[locale].title, items: resourceLinks(locale, nav).map(link => ({text: link.label, url: localizePath(locale, link.href)}))},
        ]}>
        <DocsPage full={index} tableOfContent={{single: true, enabled: !index && toc.length > 0}}
          tableOfContentPopover={{enabled: !index && toc.length > 0}}
          toc={toc.map(item => ({title: item.label, url: `#${item.id}`, depth: 2}))}
          breadcrumb={{enabled: false}} footer={{enabled: false}}
          className={`reading-content fumadocs-article${index ? " fumadocs-index" : ""}`}>
          {children}
        </DocsPage>
      </DocsLayout>
    </RootProvider>
  );
}
