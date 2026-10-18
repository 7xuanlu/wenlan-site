"use client";

import { WaitlistForm } from "@/app/waitlist-form";
import { usePathname } from "next/navigation";
import type { WaitlistContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";

export function FooterSubscription({
  locale,
  heading,
  copy,
}: {
  locale: Locale;
  heading: string;
  copy: WaitlistContent;
}) {
  const pathname = usePathname();
  const path = pathname?.replace(/\/$/, "") || "/";
  if (!["/", "/zh-TW", "/zh-CN"].includes(path)) return null;

  return (
    <div className="mt-5 max-w-md sm:mt-6">
      <p className="mb-1 text-xs leading-5 font-normal text-[var(--o-text-secondary)]">{heading}</p>
      <WaitlistForm copy={copy} locale={locale} showPurpose={false} />
    </div>
  );
}
