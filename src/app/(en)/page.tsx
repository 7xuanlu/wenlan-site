import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { HomePage } from "../_pages/home";

export const metadata = buildPageMetadata(
  "en",
  "/",
  getCoreContent("en").home.content.seo,
);

export default function LandingPage() {
  return <HomePage locale="en" />;
}
