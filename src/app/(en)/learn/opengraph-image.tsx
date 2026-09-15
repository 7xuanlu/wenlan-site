import { createOgImage, OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Learn";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return createOgImage(
      <OgTemplate
        eyebrow="Learn"
        title="Wenlan LLM wiki guides."
        description="Source-backed LLM wiki guides for Claude Code, Codex, ChatGPT, MCP clients, setup, trust, and comparisons."
        titleSize={80}
      />
    );
}
