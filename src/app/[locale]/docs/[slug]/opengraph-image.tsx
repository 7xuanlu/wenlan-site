import { ImageResponse } from "next/og";
import { docPages, getDocPage } from "@/app/(en)/docs/docs";
import { TRANSLATED_LOCALES } from "@/i18n/locales";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan docs page";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return TRANSLATED_LOCALES.flatMap((locale) =>
    docPages.map((page) => ({ locale, slug: page.slug })),
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const page = getDocPage(slug);
  const title = page?.title ?? "Wenlan Docs";
  const description =
    page?.description ?? "Source-backed LLM wiki for AI work.";
  const eyebrow = page?.eyebrow ?? "Docs";

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={eyebrow}
        title={title}
        description={description}
        footerLeft={[
          "wenlan.app/docs",
          "Source-backed LLM wiki",
        ]}
        footerRight="Apache-2.0"
        titleSize={72}
      />
    ),
    size,
  );
}
