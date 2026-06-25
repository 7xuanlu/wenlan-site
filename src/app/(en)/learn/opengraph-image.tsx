import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Learn";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Learn"
        title="Wenlan AI work memory guides."
        description="Guides for Claude Code memory, MCP memory servers, Cursor/Codex workflows, local AI work context, setup, trust, and comparisons."
        footerLeft={[
          "useorigin.app/learn",
          "Living personal knowledge library",
        ]}
        footerRight="by Qi-Xuan Lu"
        titleSize={80}
      />
    ),
    size,
  );
}
