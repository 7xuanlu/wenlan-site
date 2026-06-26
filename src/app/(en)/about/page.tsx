import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { AboutPage } from "../../_pages/about";

export const metadata = buildPageMetadata(
  "en",
  "/about",
  getCoreContent("en").about.content.seo,
);

export default function EnglishAboutPage() {
  return <AboutPage locale="en" />;
}
