import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import type { Metadata } from "next";
import { LinksPage } from "../../_pages/links";

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
    "/links",
    getCoreContent(resolvedLocale).links.content.seo,
  );
}

export default async function LocalizedLinksPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <LinksPage locale={resolveLocalizedRouteLocale(locale)} />;
}
