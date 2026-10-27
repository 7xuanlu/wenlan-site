import { FumadocsShell } from "./fumadocs-shell";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import type { LearnArticle } from "@/app/(en)/learn/articles";
import { getScenarioPacket } from "@/lib/scenario-examples";
import type { TocItem } from "./reading-types";

export function ReadingShell({locale, section, path, toc, children, index = false}: {locale: Locale; section: "learn" | "docs"; path: string; toc?: TocItem[]; children: ReactNode; index?: boolean}) {
  return <FumadocsShell key={path} locale={locale} section={section} path={path} toc={toc} index={index}>{children}</FumadocsShell>;
}

export function learnContents(article: LearnArticle, ids: string[], locale: Locale): TocItem[] {
  const labels = {
    en: ["Compare tools", "Worked example", "Workflow comparisons", "Sources and related reading", "Real app walkthrough", "Frequently asked questions"],
    "zh-TW": ["比較工具", "實作範例", "工作流程比較", "來源與延伸閱讀", "實際 App 操作", "常見問題"],
    "zh-CN": ["比较工具", "实操示例", "工作流程对比", "来源与延伸阅读", "实际 App 操作", "常见问题"],
  }[locale];
  const before: TocItem[] = [];
  if (article.openingExample) before.push({id: "knowledge-base-uses-heading", label: article.openingExample.heading});
  if (getScenarioPacket(article.slug) || article.productEvidence) before.push({id: "product-evidence-heading", label: labels[1]});
  return [...before, ...article.sections.map((section, index) => ({id: ids[index], label: section.heading})),
    ...(article.comparisonTable ? [{id: "article-comparison", label: locale === "en" ? "Comparison at a glance" : locale === "zh-TW" ? "比較總覽" : "对比总览"}] : []),
    {id: "article-resources", label: labels[3]},
    ...(["distilled-wiki-pages-ai-memory", "source-backed-wiki-pages-ai-work", "wenlan-vs-obsidian-ai-memory"].includes(article.slug) ? [{id: "recorded-workflow", label: labels[4]}] : []),
    {id: "article-faq", label: labels[5]},
  ];
}
