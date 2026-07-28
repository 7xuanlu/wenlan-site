import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { DownloadPage } from "../../_pages/download";

export const metadata = buildPageMetadata(
  "en",
  "/download",
  getCoreContent("en").home.content.download.page.seo,
);

export default function EnglishDownloadPage() {
  return <DownloadPage locale="en" />;
}
