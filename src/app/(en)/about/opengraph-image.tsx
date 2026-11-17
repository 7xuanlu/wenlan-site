import { createOgImage, OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "About Wenlan";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return createOgImage(
      <OgTemplate
        eyebrow="About"
        title="The living playbook for every AI tool."
        description="Pages with sources, skills and rules your AI tools keep up to date and work from. Open source, for you and your team. Built by Qi-Xuan Lu."

        titleSize={56}
      />
    );
}
