import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { AboutPage } from "../../_pages/about";
import { getLatestRelease } from "@/lib/release-server";

// Keep this literal aligned with RELEASE_REVALIDATE_SECONDS (Next static analysis).
export const revalidate = 86400;

export const metadata = buildPageMetadata(
  "en",
  "/about",
  getCoreContent("en").about.content.seo,
);

export default async function EnglishAboutPage() {
  const release = await getLatestRelease();
  return <AboutPage locale="en" release={release} />;
}
