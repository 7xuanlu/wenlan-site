import { ImageResponse } from "next/og";
import type { TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Download Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const copy: Record<
  TranslatedLocale,
  { eyebrow: string; title: string; description: string }
> = {
  "zh-TW": {
    eyebrow: "下載",
    title: "下載適合你系統的 Wenlan。",
    description:
      "Wenlan v0.18.5 提供 Windows x64 桌面版與 macOS Apple silicon DMG，以及 Windows、macOS、Linux 的 headless runtime 套件。",
  },
  "zh-CN": {
    eyebrow: "下载",
    title: "下载适合你系统的 Wenlan。",
    description:
      "Wenlan v0.18.5 提供 Windows x64 桌面版与 macOS Apple silicon DMG，以及 Windows、macOS、Linux 的 headless runtime 包。",
  },
};

type Params = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Params) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);
  const text = copy[resolvedLocale];

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
        footerLeft={["wenlan.app/download", "macOS, Windows, Linux"]}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
