import type { MetadataRoute } from "next";

const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "CCBot",
  "Applebot",
  "Applebot-Extended",
  "Bytespider",
  "DuckAssistBot",
  "YouBot",
  "Diffbot",
  "ImagesiftBot",
  "Cohere-AI",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://useorigin.app/sitemap.xml",
    host: "https://useorigin.app",
  };
}
