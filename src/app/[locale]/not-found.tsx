import type { Metadata } from "next";
import { getCoreContent, type NotFoundContent } from "@/i18n/content";
import type { TranslatedLocale } from "@/i18n/locales";
import { LocalizedNotFoundContent } from "./not-found-content";

// A not-found boundary cannot read route params on the server, so the locale is
// resolved in the client child. This file stays a server component purely so it
// can export metadata: without it the localized 404 inherits the layout's home
// metadata and tells crawlers it is the indexable home page.
export const metadata: Metadata = {
  title: "404 · Wenlan",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
  },
};

export default function LocalizedNotFound() {
  const contentByLocale = {
    "zh-TW": getCoreContent("zh-TW").notFound.content,
    "zh-CN": getCoreContent("zh-CN").notFound.content,
  } satisfies Record<TranslatedLocale, NotFoundContent>;

  return <LocalizedNotFoundContent contentByLocale={contentByLocale} />;
}
