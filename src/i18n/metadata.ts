import type { Metadata, Viewport } from "next";

import { localizedContentByLocale } from "./content";
import {
  DEFAULT_LOCALE,
  LOCALE_CONFIG,
  SUPPORTED_LOCALES,
  type Locale,
} from "./locales";
import {
  alternateUrls,
  canonicalUrl,
  isCoreTranslatedPath,
  isTranslatedLearnPath,
  SITE_URL,
} from "./routing";

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

// Only the locales this particular page actually exists in: some Learn articles
// are translated into zh-TW but not zh-CN, so the supported-locale list would
// advertise a URL that does not exist.
function alternateOpenGraphLocales(
  locale: Locale,
  languages: object,
): string[] {
  const availableLocales = SUPPORTED_LOCALES.filter(
    (supported) =>
      supported !== locale &&
      Object.hasOwn(languages, LOCALE_CONFIG[supported].hreflang),
  );

  return availableLocales.map(
    (supported) => LOCALE_CONFIG[supported].openGraphLocale,
  );
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

  if (isCoreTranslatedPath(pathname) || isTranslatedLearnPath(pathname)) {
    alternates.languages = alternateUrls(pathname);
  }

  // The feed is English-only (<language>en-US</language>), so only the English
  // home page advertises it.
  if (pathname === "/" && locale === DEFAULT_LOCALE) {
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
      ...(alternates.languages
        ? { alternateLocale: alternateOpenGraphLocales(locale, alternates.languages) }
        : {}),
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
    { media: "(prefers-color-scheme: dark)", color: "#15171c" },
    { media: "(prefers-color-scheme: light)", color: "#fefcf9" },
  ],
};
