"use client";

import type { NotFoundContent } from "@/i18n/content";
import { NotFoundPage } from "../_pages/not-found";
import { TRANSLATED_LOCALES, type TranslatedLocale } from "@/i18n/locales";
import { useParams } from "next/navigation";

export function LocalizedNotFoundContent({
  contentByLocale,
}: {
  contentByLocale: Record<TranslatedLocale, NotFoundContent>;
}) {
  const params = useParams<{ locale?: string | string[] }>();
  const localeParam = Array.isArray(params.locale) ? params.locale[0] : params.locale;
  const locale = TRANSLATED_LOCALES.includes(localeParam as TranslatedLocale)
    ? (localeParam as TranslatedLocale)
    : "zh-TW";

  return <NotFoundPage locale={locale} content={contentByLocale[locale]} />;
}
