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
        title="Wenlan LLM wiki guides."
        description="Source-backed LLM wiki guides for Claude Code, Codex, ChatGPT, MCP clients, setup, trust, and comparisons."
        footerLeft={[
          "wenlan.app/learn",
          "Source-backed LLM wiki",
        ]}
        footerRight="by Qi-Xuan Lu"
        titleSize={80}
      />
    ),
    size,
  );
}
