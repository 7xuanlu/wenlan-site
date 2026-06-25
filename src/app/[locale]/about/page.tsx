import { AboutPage } from "../../_pages/about";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";

type LocalePageParams = {
  locale: string;
};

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <AboutPage locale={resolveLocalizedRouteLocale(locale)} />;
}
