import { ImageResponse } from "next/og";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Docs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Docs"
        title="Start using Wenlan."
        description="Install the local memory layer, learn the daily handoff loop, and keep AI work context readable, searchable, and under your control."
        footerLeft={[
          "wenlan.app/docs",
          "Living personal knowledge library",
        ]}
        footerRight="Apache-2.0"
        titleSize={80}
      />
    ),
    size,
  );
}
