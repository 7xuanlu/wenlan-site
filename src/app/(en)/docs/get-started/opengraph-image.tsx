import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Get started with Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Get started"
        title="Install Wenlan in five minutes."
        description="Connect Claude Code, Codex, ChatGPT, or another MCP client, then verify the first capture and recall round trip."
        footerLeft={[
          "wenlan.app/docs/get-started",
          "macOS, Linux, Windows",
        ]}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
