import { createOgImage, OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Get started with Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return createOgImage(
      <OgTemplate
        eyebrow="Get started"
        title="Install Wenlan in five minutes."
        description="Connect Claude Code, Codex, ChatGPT, or another MCP client, then verify the first capture and recall round trip."
        titleSize={68}
      />
    );
}
