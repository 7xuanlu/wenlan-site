import type { Metadata } from "next";
import { LocalizedNotFoundContent } from "./not-found-content";

// A not-found boundary cannot read route params on the server, so the locale is
// resolved in the client child. This file stays a server component purely so it
// can export metadata: without it the localized 404 inherits the layout's home
// metadata and tells crawlers it is the indexable home page.
export const metadata: Metadata = {
  title: "404 · Wenlan",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
  },
};

export default function LocalizedNotFound() {
  return <LocalizedNotFoundContent />;
}
