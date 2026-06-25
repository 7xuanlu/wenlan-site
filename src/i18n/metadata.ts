import type { Metadata, Viewport } from "next";

import { localizedContentByLocale } from "./content";
import { DEFAULT_LOCALE, LOCALE_CONFIG, type Locale } from "./locales";
import { canonicalUrl, SITE_URL } from "./routing";

export function rootHomeSeo(locale: Locale) {
  return localizedContentByLocale[locale].home.content.seo;
}

export function buildRootMetadata(locale: Locale): Metadata {
  const seo = rootHomeSeo(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: locale === DEFAULT_LOCALE ? "/" : canonicalUrl(locale, "/"),
      types: {
        "application/rss+xml": [
          { url: "/feed.xml", title: "Wenlan Learn RSS feed" },
        ],
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: canonicalUrl(locale, "/"),
      siteName: "Wenlan",
      locale: LOCALE_CONFIG[locale].openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    icons: {
      icon: "/favicon.svg",
    },
    manifest: "/manifest.webmanifest",
    authors: [
      {
        name: "Qi-Xuan Lu",
        url: "https://github.com/7xuanlu",
      },
    ],
    creator: "Qi-Xuan Lu",
    publisher: "Qi-Xuan Lu",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: light)", color: "#fefcf9" },
  ],
};
