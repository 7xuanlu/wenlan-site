import { HomePage } from "../_pages/home";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";

type LocalePageParams = {
  locale: string;
};

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <HomePage locale={resolveLocalizedRouteLocale(locale)} />;
}
