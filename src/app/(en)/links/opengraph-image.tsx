import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan links";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Links"
        title="Every official Wenlan link."
        description="Download Wenlan, read the docs and guides, and find the project on GitHub and npm — one hub for every bio link."
        footerLeft={["wenlan.app/links", "Download · Docs · Guides"]}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
