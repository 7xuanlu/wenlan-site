import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan. Living personal knowledge library for AI work.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Wenlan"
        title="Living personal knowledge library for AI work."
        description="Agents capture what they learn, you add sources you trust, and Wenlan keeps source-cited pages current across MCP-compatible AI tools."
        footerLeft={[
          "93.6% Recall@5 on LongMemEval",
          "macOS · Linux · Windows",
          "Apache-2.0",
        ]}
        footerRight="by Qi-Xuan Lu"
        titleSize={92}
      />
    ),
    size,
  );
}
