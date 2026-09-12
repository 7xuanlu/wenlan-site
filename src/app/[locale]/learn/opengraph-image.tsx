import { ImageResponse } from "next/og";
import type { TranslatedLocale } from "@/i18n/locales";
import { localizedLearnIndexContent } from "@/i18n/learn-index";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Learn";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const footerLeft: Record<TranslatedLocale, string[]> = {
  "zh-TW": ["wenlan.app/learn", "有來源的 LLM wiki"],
  "zh-CN": ["wenlan.app/learn", "有来源的 LLM wiki"],
};

type Params = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Params) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const content = localizedLearnIndexContent[resolvedLocale];

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        footerLeft={footerLeft[resolvedLocale]}
        footerRight="by Qi-Xuan Lu"
        titleSize={80}
      />
    ),
    size,
  );
}
