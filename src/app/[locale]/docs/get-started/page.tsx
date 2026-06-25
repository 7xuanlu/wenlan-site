import { GetStartedPage } from "../../../_pages/get-started";
import { resolveLocalizedRouteLocale } from "@/i18n/resolve-locale";

type LocalePageParams = {
  locale: string;
};

export default async function LocalizedGetStartedPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;
  return <GetStartedPage locale={resolveLocalizedRouteLocale(locale)} />;
}
