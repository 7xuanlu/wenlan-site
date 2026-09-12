import { ImageResponse } from "next/og";
import type { TranslatedLocale } from "@/i18n/locales";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan — AI 工作的 LLM wiki";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const copy: Record<
  TranslatedLocale,
  { eyebrow: string; title: string; description: string; footerLeft: string[] }
> = {
  "zh-TW": {
    eyebrow: "Wenlan 文瀾",
    title: "AI 工作的 LLM wiki。",
    description: "保存有用決策，建立有來源的頁面，再透過已連接的 AI 工具找回。",
    footerLeft: [
      "wenlan.app",
      "有來源的 LLM wiki",
      "macOS · Linux · Windows",
      "Apache-2.0",
    ],
  },
  "zh-CN": {
    eyebrow: "Wenlan 文澜",
    title: "AI 工作的 LLM wiki。",
    description: "保存有用决策，建立有来源的页面，再通过已连接的 AI 工具找回。",
    footerLeft: [
      "wenlan.app",
      "有来源的 LLM wiki",
      "macOS · Linux · Windows",
      "Apache-2.0",
    ],
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
        footerLeft={text.footerLeft}
        footerRight="by Qi-Xuan Lu"
        titleSize={88}
      />
    ),
    size,
  );
}
