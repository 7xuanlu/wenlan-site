import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "About Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="About"
        title="Living personal knowledge library."
        description="Open-source, local-first AI work memory built by agents and grounded in source-cited pages. Built by Qi-Xuan Lu."
        footerLeft={["useorigin.app/about", "v0.12.0 · Apache-2.0"]}
        footerRight="by Qi-Xuan Lu"
        titleSize={76}
      />
    ),
    size,
  );
}
