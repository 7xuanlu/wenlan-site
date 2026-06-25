import type { Metadata } from "next";
import { DocsIndexPage } from "../../_pages/docs-index";
import { SITE_URL } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Wenlan Docs | Product Manual",
  description:
    "Install Wenlan, learn the daily AI work memory loop, understand the architecture, and follow the project roadmap, changelog, and evals.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Wenlan Docs | Product Manual",
    description:
      "Install Wenlan, learn the daily AI work memory loop, understand the architecture, and follow the project roadmap, changelog, and evals.",
    type: "website",
    url: `${SITE_URL}/docs`,
    siteName: "Wenlan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenlan Docs | Product Manual",
    description:
      "Install Wenlan, learn the daily AI work memory loop, understand the architecture, and follow the project roadmap, changelog, and evals.",
  },
};

export default function EnglishDocsPage() {
  return <DocsIndexPage locale="en" />;
}
