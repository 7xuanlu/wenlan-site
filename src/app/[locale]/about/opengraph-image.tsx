import { ImageResponse } from "next/og";
import { getCoreContent } from "@/i18n/content";
import type { TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "About Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const copy: Record<
  TranslatedLocale,
  { eyebrow: string; title: string; footerLeft: string[] }
> = {
  "zh-TW": {
    eyebrow: "關於",
    title: "AI 工作的 LLM wiki。",
    footerLeft: ["wenlan.app/about", "v0.18.5 · Apache-2.0"],
  },
  "zh-CN": {
    eyebrow: "关于",
    title: "AI 工作的 LLM wiki。",
    footerLeft: ["wenlan.app/about", "v0.18.5 · Apache-2.0"],
  },
};

type Params = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Params) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const text = copy[resolvedLocale];
  const seo = getCoreContent(resolvedLocale).about.content.seo;

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={text.eyebrow}
        title={text.title}
        description={seo.description}
        footerLeft={text.footerLeft}
        footerRight="by Qi-Xuan Lu"
        titleSize={76}
      />
    ),
    size,
  );
}
