import type { Locale } from "@/i18n/locales";
import type { WenlanRelease } from "@/lib/release-manifest";
import { softwareApplicationSchema } from "@/app/structured-data";

export function SoftwareApplicationData({
  locale,
  release,
}: {
  locale: Locale;
  release?: WenlanRelease;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareApplicationSchema(locale, release)),
      }}
    />
  );
}
