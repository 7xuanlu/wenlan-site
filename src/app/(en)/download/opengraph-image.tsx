import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Download Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Download"
        title="Download Wenlan for your system."
        description="Wenlan v0.18.5 ships a Windows x64 desktop build and a macOS Apple silicon DMG, plus headless runtime builds for Windows, macOS, and Linux."
        footerLeft={[
          "wenlan.app/download",
          "macOS, Windows, Linux",
        ]}
        footerRight="Apache-2.0"
        titleSize={68}
      />
    ),
    size,
  );
}
