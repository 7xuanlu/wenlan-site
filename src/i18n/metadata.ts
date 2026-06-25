import type { Metadata, Viewport } from "next";

import { localizedContentByLocale } from "./content";
import { LOCALE_CONFIG, type Locale } from "./locales";
import { alternateUrls, canonicalUrl, isCoreTranslatedPath, SITE_URL } from "./routing";

type PageSeo = {
  title: string;
  description: string;
};

type BuildPageMetadataOptions = {
  openGraphType?: "website" | "article";
};

function rssTypeAlternate() {
  return {
    "application/rss+xml": [
      { url: "/feed.xml", title: "Wenlan Learn RSS feed" },
    ],
  };
}

export function rootHomeSeo(locale: Locale) {
  return localizedContentByLocale[locale].home.content.seo;
}

export function buildPageMetadata(
  locale: Locale,
  pathname: string,
  seo: PageSeo,
  options: BuildPageMetadataOptions = {},
): Metadata {
  const canonical = canonicalUrl(locale, pathname);
  const alternates: NonNullable<Metadata["alternates"]> = {
    canonical,
  };

  if (isCoreTranslatedPath(pathname)) {
    alternates.languages = alternateUrls(pathname);
  }

  if (pathname === "/") {
    alternates.types = rssTypeAlternate();
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: options.openGraphType ?? "website",
      url: canonical,
      siteName: "Wenlan",
      locale: LOCALE_CONFIG[locale].openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function buildRootMetadata(locale: Locale): Metadata {
  const seo = rootHomeSeo(locale);
  const pageMetadata = buildPageMetadata(locale, "/", seo);

  return {
    ...pageMetadata,
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
