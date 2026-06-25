import { getCoreContent } from "@/i18n/content";
import { buildPageMetadata } from "@/i18n/metadata";
import { GetStartedPage } from "../../../_pages/get-started";

export const metadata = buildPageMetadata(
  "en",
  "/docs/get-started",
  getCoreContent("en").getStarted.content.seo,
  { openGraphType: "article" },
);

export default function EnglishGetStartedPage() {
  return <GetStartedPage locale="en" />;
}
