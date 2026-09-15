import { createOgImage } from "@/lib/og-template";
import { articles, getArticle } from "../articles";
import { OgTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template";

export const alt = "Wenlan Learn article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? "Wenlan Learn";
  const description = article?.description ?? "Source-backed LLM wiki for AI work.";
  const eyebrow = article?.eyebrow ?? "Learn";

  return createOgImage(
      <OgTemplate
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
    );
}
