import type { MetadataRoute } from "next";

// One wildcard group covers every crawler, AI crawlers included. Naming bots
// individually is not just redundant: a named group replaces the wildcard group
// for that bot, so any future Disallow under "*" would silently skip them.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://wenlan.app/sitemap.xml",
  };
}
