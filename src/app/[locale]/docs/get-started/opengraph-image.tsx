import { ImageResponse } from "next/og";
import { getCoreContent } from "@/i18n/content";
import type { TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Get started with Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const copy: Record<
  TranslatedLocale,
  { eyebrow: string; title: string; footerLeft: string[] }
> = {
  "zh-TW": {
    eyebrow: "開始使用",
    title: "五分鐘安裝 Wenlan。",
    footerLeft: ["wenlan.app/docs/get-started", "macOS, Linux, Windows"],
  },
  "zh-CN": {
    eyebrow: "开始使用",
    title: "五分钟安装 Wenlan。",
    footerLeft: ["wenlan.app/docs/get-started", "macOS, Linux, Windows"],
  },
};

type Params = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Params) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const text = copy[resolvedLocale];
  const seo = getCoreContent(resolvedLocale).getStarted.content.seo;

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={text.eyebrow}
        title={text.title}
        description={seo.description}
        footerLeft={text.footerLeft}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
