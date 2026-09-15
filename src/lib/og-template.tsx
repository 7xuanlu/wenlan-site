import type { ReactElement } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_LOGO_DATA_URI } from "./og-logo";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

const FONTS_DIR = join(process.cwd(), "src/lib/fonts");

async function loadOgFonts() {
  const [
    fraunces700,
    sans400,
    sans700,
    tc400,
    tc700,
    sc400,
    sc700,
  ] = await Promise.all([
    readFile(join(FONTS_DIR, "fraunces-700.ttf")),
    readFile(join(FONTS_DIR, "instrument-sans-400.ttf")),
    readFile(join(FONTS_DIR, "instrument-sans-700.ttf")),
    readFile(join(FONTS_DIR, "noto-sans-tc-400-subset.ttf")),
    readFile(join(FONTS_DIR, "noto-sans-tc-700-subset.ttf")),
    readFile(join(FONTS_DIR, "noto-sans-sc-400-subset.ttf")),
    readFile(join(FONTS_DIR, "noto-sans-sc-700-subset.ttf")),
  ]);
  return [
    { name: "Fraunces", data: fraunces700, weight: 700 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sans400, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sans700, weight: 700 as const, style: "normal" as const },
    { name: "Noto Sans TC", data: tc400, weight: 400 as const, style: "normal" as const },
    { name: "Noto Sans TC", data: tc700, weight: 700 as const, style: "normal" as const },
    { name: "Noto Sans SC", data: sc400, weight: 400 as const, style: "normal" as const },
    { name: "Noto Sans SC", data: sc700, weight: 700 as const, style: "normal" as const },
  ];
}

export async function createOgImage(element: ReactElement) {
  const fonts = await loadOgFonts();
  return new ImageResponse(element, { ...OG_SIZE, fonts });
}

export type OgTemplateProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  titleSize?: number;
  cjk?: "tc" | "sc";
};

export function OgTemplate({
  eyebrow,
  title,
  description,
  titleSize = 64,
  cjk,
}: OgTemplateProps): ReactElement {
  const titleFont = cjk
    ? `"Noto Sans ${cjk === "tc" ? "TC" : "SC"}", sans-serif`
    : '"Fraunces", Georgia, serif';
  const bodyFont = cjk
    ? `"Noto Sans ${cjk === "tc" ? "TC" : "SC"}", "Instrument Sans", sans-serif`
    : '"Instrument Sans", sans-serif';
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#101024",
        color: "#fefcf9",
        fontFamily: bodyFont,
      }}
    >
      <div
        style={{
          width: "1096px",
          height: "526px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 64px",
          background: "#101024",
          border: "1px solid #2F3769",
          borderRadius: "32px",
        }}
      >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
          flex: 1,
          minHeight: 0,
        }}
      >
        <img
          src={OG_LOGO_DATA_URI}
          width={240}
          height={240}
          style={{ borderRadius: "54px", flexShrink: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: 0,
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#93E3F2",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: `${titleSize}px`,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#F7F8FF",
              fontFamily: titleFont,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "21px",
              lineHeight: 1.45,
              color: "#AEB6DC",
            }}
          >
            {description}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
