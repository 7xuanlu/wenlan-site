import type { Metadata } from "next";
import { AboutPage } from "../../_pages/about";
import { SITE_URL } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "About Wenlan | Living Personal Knowledge Library",
  description:
    "Wenlan is an open-source, local-first personal knowledge library for AI work, built by agents and grounded in its sources.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Wenlan | Living Personal Knowledge Library",
    description:
      "Wenlan is an open-source, local-first personal knowledge library for AI work, built by agents and grounded in its sources.",
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: "Wenlan",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Wenlan | Living Personal Knowledge Library",
    description:
      "Wenlan is an open-source, local-first personal knowledge library for AI work, built by agents and grounded in its sources.",
  },
};

export default function EnglishAboutPage() {
  return <AboutPage locale="en" />;
}
