import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { DocsIndexPage } from "../../_pages/docs-index";

export const metadata = buildPageMetadata(
  "en",
  "/docs",
  getCoreContent("en").docs.content.seo,
);

export default function EnglishDocsPage() {
  return <DocsIndexPage locale="en" />;
}
