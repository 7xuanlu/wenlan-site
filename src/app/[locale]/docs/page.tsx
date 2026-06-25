import { DocsIndexPage } from "../../_pages/docs-index";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";

type LocalePageParams = {
  locale: string;
};

export default async function LocalizedDocsPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <DocsIndexPage locale={resolveLocalizedRouteLocale(locale)} />;
}
