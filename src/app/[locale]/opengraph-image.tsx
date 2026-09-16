import { createOgImage } from "@/lib/og-template";
import type { TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

// One static alt serves both zh-TW and zh-CN, so it cannot be Traditional
// Chinese. Every other OG alt on the site is English too.
export const alt = "Wenlan. Your AI-native knowledge base.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const copy: Record<
  TranslatedLocale,
  { eyebrow: string; title: string; description: string }
> = {
  "zh-TW": {
    eyebrow: "Wenlan 文瀾",
    title: "你的 AI 原生知識庫",
    description: "文瀾把文件與決策整理成附來源的知識頁，你的 AI 下次接著用。",
  },
  "zh-CN": {
    eyebrow: "Wenlan 文澜",
    title: "你的 AI 原生知识库",
    description: "文澜把文档和决策整理成带来源的知识页，你的 AI 下次接着用。",
  },
};

type Params = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Params) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const text = copy[resolvedLocale];

  return createOgImage(
      <OgTemplate
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}

        titleSize={56}
        cjk={resolvedLocale === "zh-TW" ? "tc" : "sc"}      />
    );
}
