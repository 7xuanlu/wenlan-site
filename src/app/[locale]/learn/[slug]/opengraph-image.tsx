import { ImageResponse } from "next/og";
import type { TranslatedLocale } from "@/i18n/locales";
import {
  getLocalizedLearnArticle,
  translatedLearnStaticParams,
} from "@/i18n/learn-articles";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { getArticle } from "@/app/(en)/learn/articles";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Learn article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return translatedLearnStaticParams();
}

const footerLeft: Record<TranslatedLocale, string[]> = {
  "zh-TW": ["wenlan.app/learn", "有來源的 LLM wiki"],
  "zh-CN": ["wenlan.app/learn", "有来源的 LLM wiki"],
};

const englishFooterLeft = ["wenlan.app/learn", "Source-backed LLM wiki"];

type Params = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Params) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const localizedArticle = getLocalizedLearnArticle(resolvedLocale, slug);
  const article = localizedArticle ?? getArticle(slug);
  const title = article?.title ?? "Wenlan Learn";
  const description =
    article?.description ?? "Source-backed LLM wiki for AI work.";
  const eyebrow = article?.eyebrow ?? "Learn";

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={eyebrow}
        title={title}
        description={description}
        footerLeft={localizedArticle ? footerLeft[resolvedLocale] : englishFooterLeft}
        footerRight="by Qi-Xuan Lu"
      />
    ),
    size,
  );
}
