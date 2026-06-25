import type { Metadata } from "next";
import { NotFoundPage } from "../_pages/not-found";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundPage locale="en" />;
}
