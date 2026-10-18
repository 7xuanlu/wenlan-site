import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import { localizePath } from "@/i18n/routing";
import type { LearnArticle } from "@/app/(en)/learn/articles";
import { getScenarioPacket } from "@/lib/scenario-examples";
import ReadingFrame, { type TocItem } from "./reading-frame";
import { getReadingGroups } from "./reading-data";

export function ReadingShell({locale, section, path, toc, children, index = false}: {locale: Locale; section: "learn" | "docs"; path: string; toc?: TocItem[]; children: ReactNode; index?: boolean}) {
  return <ReadingFrame key={path} locale={locale} section={section} currentPath={localizePath(locale, path)} groups={getReadingGroups(locale, section)} toc={toc} index={index}>{children}</ReadingFrame>;
}

export function learnContents(article: LearnArticle, ids: string[], locale: Locale): TocItem[] {
  const labels = {
    en: ["Compare tools", "Worked example", "Workflow comparisons", "Sources and related reading", "Real app walkthrough", "Frequently asked questions"],
    "zh-TW": ["比較工具", "實作範例", "工作流程比較", "來源與延伸閱讀", "實際 App 操作", "常見問題"],
    "zh-CN": ["比较工具", "实操示例", "工作流程对比", "来源与延伸阅读", "实际 App 操作", "常见问题"],
  }[locale];
  const before: TocItem[] = [];
  if (article.slug === "choose-ai-knowledge-base-tool") before.push({id: "compare-tools", label: labels[0]});
  if (getScenarioPacket(article.slug) || article.productEvidence) before.push({id: "product-evidence", label: labels[1]});
  if (article.slug === "choose-ai-knowledge-base-tool") before.push({id: "workflow-comparisons", label: labels[2]});
  return [...before, ...article.sections.map((section, index) => ({id: ids[index], label: section.heading})),
    ...(article.comparisonTable ? [{id: "article-comparison", label: locale === "en" ? "Comparison at a glance" : locale === "zh-TW" ? "比較總覽" : "对比总览"}] : []),
    {id: "article-resources", label: labels[3]},
    ...(["distilled-wiki-pages-ai-memory", "source-backed-wiki-pages-ai-work", "wenlan-vs-obsidian-ai-memory", "build-local-ai-knowledge-base-from-documents"].includes(article.slug) ? [{id: "recorded-workflow", label: labels[4]}] : []),
    {id: "article-faq", label: labels[5]},
  ];
}
