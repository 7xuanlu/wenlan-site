import { notFound } from "next/navigation";
import { TRANSLATED_LOCALES, type TranslatedLocale } from "./locales";

export function resolveLocalizedRouteLocale(locale: string): TranslatedLocale {
  if (!TRANSLATED_LOCALES.includes(locale as TranslatedLocale)) {
    notFound();
  }

  return locale as TranslatedLocale;
}
