import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";
import type { Metadata } from "next";
import { DocsIndexPage } from "../../_pages/docs-index";

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
    "/docs",
    getCoreContent(resolvedLocale).docs.content.seo,
  );
}

export default async function LocalizedDocsPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <DocsIndexPage locale={resolveLocalizedRouteLocale(locale)} />;
}
