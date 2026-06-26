import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import type { Metadata } from "next";
import { AboutPage } from "../../_pages/about";

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
    "/about",
    getCoreContent(resolvedLocale).about.content.seo,
  );
}

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <AboutPage locale={resolveLocalizedRouteLocale(locale)} />;
}
