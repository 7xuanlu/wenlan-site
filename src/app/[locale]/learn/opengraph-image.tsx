import { createOgImage } from "@/lib/og-template";
import type { TranslatedLocale } from "@/i18n/locales";
import { localizedLearnIndexContent } from "@/i18n/learn-index";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Learn";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;


type Params = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Params) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const content = localizedLearnIndexContent[resolvedLocale];

  return createOgImage(
      <OgTemplate
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}

        titleSize={80}
        cjk={resolvedLocale === "zh-TW" ? "tc" : "sc"}      />
    );
}
