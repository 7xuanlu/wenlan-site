import { createOgImage, OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan. Your AI-native knowledge base.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return createOgImage(
      <OgTemplate
        eyebrow="Wenlan"
        title={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Your AI-native</div>
            <div>knowledge base.</div>
          </div>
        }
        description="Wenlan turns documents and decisions into a source-backed wiki you and your AI can pick up next time."
        titleSize={52}
      />
    );
}
