import { ImageResponse } from "next/og";
import type { TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan links";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const copy: Record<
  TranslatedLocale,
  { eyebrow: string; title: string; description: string; footerLinks: string }
> = {
  "zh-TW": {
    eyebrow: "連結",
    title: "所有文瀾官方連結。",
    description:
      "下載 Wenlan、閱讀文件與指南，並在 GitHub 和 npm 找到專案——bio 連結的唯一入口。",
    footerLinks: "下載 · 文件 · 指南",
  },
  "zh-CN": {
    eyebrow: "链接",
    title: "所有文澜官方链接。",
    description:
      "下载 Wenlan、阅读文档与指南，并在 GitHub 和 npm 找到项目——bio 链接的唯一入口。",
    footerLinks: "下载 · 文档 · 指南",
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
        footerLeft={["wenlan.app/links", text.footerLinks]}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
