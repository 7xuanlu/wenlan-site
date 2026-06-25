import type { Metadata } from "next";
import { GetStartedPage } from "../../../_pages/get-started";
import { SITE_URL } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Get Started with Wenlan | Local AI Work Memory",
  description:
    "Install Wenlan through the Claude Code plugin or run Wenlan setup before connecting another MCP client.",
  alternates: {
    canonical: "/docs/get-started",
  },
  openGraph: {
    title: "Get Started with Wenlan | Local AI Work Memory",
    description:
      "Install Wenlan through the Claude Code plugin or run Wenlan setup before connecting another MCP client.",
    type: "article",
    url: `${SITE_URL}/docs/get-started`,
    siteName: "Wenlan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started with Wenlan | Local AI Work Memory",
    description:
      "Install Wenlan through the Claude Code plugin or run Wenlan setup before connecting another MCP client.",
  },
};

export default function EnglishGetStartedPage() {
  return <GetStartedPage locale="en" />;
}
