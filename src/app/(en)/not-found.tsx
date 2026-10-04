import type { Metadata } from "next";
import { getCoreContent } from "@/i18n/content";
import { NotFoundPage } from "../_pages/not-found";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundPage locale="en" content={getCoreContent("en").notFound.content} />;
}
