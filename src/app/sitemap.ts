import type { MetadataRoute } from "next";
import { articles, articleUrl, SITE_URL } from "./learn/articles";

const siteUpdatedAt = new Date("2026-05-14");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/docs/get-started`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...articles.map((article) => ({
      url: articleUrl(article.slug),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
