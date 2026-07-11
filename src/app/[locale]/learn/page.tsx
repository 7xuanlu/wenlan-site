import type { Metadata } from "next";
import { LocalizedLearnIndexPage } from "../../_pages/localized-learn-index";
import { localizedLearnIndexContent } from "@/i18n/learn-index";
import { buildPageMetadata } from "@/i18n/metadata";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";

type LocalePageParams = {
  locale: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalePageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  return buildPageMetadata(
    resolvedLocale,
    "/learn",
    localizedLearnIndexContent[resolvedLocale].seo,
  );
}

export default async function LocalizedLearnPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  return <LocalizedLearnIndexPage locale={resolvedLocale} />;
}
