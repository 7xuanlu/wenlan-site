import type { AdvancedIndex } from "fumadocs-core/search/server";
import { articles } from "@/app/(en)/learn/articles";
import { englishLearnOverview } from "./learn-index-copy";
import { localizedLearnIndexContent } from "@/i18n/learn-index";
import { docPages } from "@/app/(en)/docs/docs";
import { getLocalizedLearnArticles } from "@/i18n/learn-articles";
import { getCoreContent } from "@/i18n/content";
import { buildSectionIds } from "@/app/[locale]/learn/[slug]/section-ids";
import { localizePath } from "@/i18n/routing";
import { SUPPORTED_LOCALES } from "@/i18n/locales";

const slugify = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Index the same authored data the routes render; English-only references keep their real URLs. */
export function readingSearchIndexes(): AdvancedIndex[] {
  return SUPPORTED_LOCALES.flatMap(locale => {
    const learn: AdvancedIndex[] = (locale === "en" ? articles : getLocalizedLearnArticles(locale)).map(article => {
      const ids = locale === "en" ? article.sections.map(s => s.id ?? slugify(s.heading)) : buildSectionIds(article.sections.map(s => s.heading), article.sections.map(s => s.id));
      return {
        id: `${locale}/learn/${article.slug}`, locale, title: article.title,
        description: article.description, url: localizePath(locale, `/learn/${article.slug}`),
        structuredData: {
          headings: article.sections.map((s, i) => ({id: ids[i], content: s.heading})),
          contents: article.sections.flatMap((s, i) => [...s.body, ...(s.bullets ?? []),
            ...(s.steps ?? []).flatMap(step => [step.title, step.body, ...(step.code ? [step.code.code] : [])]),
            ...(s.code ? [s.code.code] : []),
          ].map(content => ({heading: ids[i], content}))),
        },
      };
    });
    const docs: AdvancedIndex[] = docPages.map(page => ({
      id: `${locale}/docs/${page.slug}`, locale,
      title: `${page.title}${locale === "en" ? "" : " (English)"}`,
      description: page.description, url: `/docs/${page.slug}`,
      structuredData: {
        headings: page.sections.map(s => ({id: slugify(s.heading), content: s.heading})),
        contents: page.sections.flatMap(s => [...s.body, ...(s.bullets ?? []), ...(s.code ? [s.code.code] : [])].map(content => ({heading: slugify(s.heading), content}))),
      },
    }));
    const setup = getCoreContent(locale).getStarted.content;
    const setupAnchor = (id: string) => id === "install-runtime" || id === "try-first" ? id : "connect-ai-tool";
    const gettingStarted: AdvancedIndex = {
      id: `${locale}/docs/get-started`, locale, title: setup.hero.title,
      description: setup.seo.description, url: localizePath(locale, "/docs/get-started"),
      structuredData: {
        headings: setup.steps.filter(s => s.id === "install-runtime" || s.id === "try-first").map(s => ({id: s.id, content: s.title})).concat([{id: "connect-ai-tool", content: locale === "en" ? "Connect your AI tool" : locale === "zh-TW" ? "連接 AI 工具" : "连接 AI 工具"}]),
        contents: setup.steps.flatMap(s => [s.title, ...s.paragraphs, ...s.commands].map(content => ({heading: setupAnchor(s.id), content}))),
      },
    };
    const learnOverview = locale === "en" ? englishLearnOverview : localizedLearnIndexContent[locale];
    const docsOverview = getCoreContent(locale).docs.content;
    const overviews: AdvancedIndex[] = [
      {id: `${locale}/learn`, locale, title: learnOverview.title, description: learnOverview.description,
        url: localizePath(locale, "/learn"), structuredData: {headings: [], contents: [learnOverview.description, learnOverview.startDescription, ...(locale === "en" ? [englishLearnOverview.quickAnswer] : [])].map(content => ({heading: undefined, content}))}},
      {id: `${locale}/docs`, locale, title: docsOverview.hero.title, description: docsOverview.hero.description,
        url: localizePath(locale, "/docs"), structuredData: {headings: [], contents: [docsOverview.hero.description, ...docsOverview.sections.items.flatMap(s => [s.title, s.description])].map(content => ({heading: undefined, content}))}},
    ];
    return [...overviews, ...learn, gettingStarted, ...docs];
  });
}
