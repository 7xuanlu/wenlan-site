import { buildRootMetadata, viewport } from "@/i18n/metadata";
import RootDocument from "../root-document";
import "../globals.css";

export const metadata = buildRootMetadata("en");
export { viewport };

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
