import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { DownloadPage } from "../../_pages/download";
import { getLatestRelease } from "@/lib/release-server";

// Keep this literal aligned with RELEASE_REVALIDATE_SECONDS (Next static analysis).
export const revalidate = 86400;

export const metadata = buildPageMetadata(
  "en",
  "/download",
  getCoreContent("en").home.content.download.page.seo,
);

export default async function EnglishDownloadPage() {
  return <DownloadPage locale="en" release={await getLatestRelease()} />;
}
