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
        description="Add the Claude Code plugin or run Wenlan setup, then verify the local memory loop with a capture and recall."
        footerLeft={[
          "useorigin.app/docs/get-started",
          "macOS, Linux, Windows",
        ]}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
