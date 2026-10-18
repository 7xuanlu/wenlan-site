import type { HomeContent, LinkContent } from "@/i18n/content/schema";
import type { Locale } from "@/i18n/locales";

export const resourceCopy = {
  en: { title: "Resources", start: "Get started", evaluation: "Evaluation & methodology", changelog: "Changelog" },
  "zh-TW": { title: "資源", start: "開始使用", evaluation: "評測與方法", changelog: "更新紀錄" },
  "zh-CN": { title: "资源", start: "开始使用", evaluation: "评测与方法", changelog: "更新记录" },
} as const;

export function resourceLinks(locale: Locale, nav: HomeContent["nav"]): readonly LinkContent[] {
  const copy = resourceCopy[locale];
  return [
    { id: "get-started", href: "/docs/get-started", label: copy.start },
    ...nav.links.filter(({ id }) => id === "docs" || id === "learn"),
    { id: "evaluation", href: "/docs/evaluation", label: copy.evaluation },
    { id: "changelog", href: "/docs/changelog", label: copy.changelog },
  ];
}
