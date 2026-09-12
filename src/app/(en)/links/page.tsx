import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { LinksPage } from "../../_pages/links";

export const metadata = buildPageMetadata(
  "en",
  "/links",
  getCoreContent("en").links.content.seo,
);

export default function EnglishLinksPage() {
  return <LinksPage locale="en" />;
}
