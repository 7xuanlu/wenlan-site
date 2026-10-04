import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { AboutPage } from "../../_pages/about";
import { getLatestRelease } from "@/lib/release-server";

export const metadata = buildPageMetadata(
  "en",
  "/about",
  getCoreContent("en").about.content.seo,
);

export default async function EnglishAboutPage() {
  const release = await getLatestRelease();
  return <AboutPage locale="en" release={release} />;
}
