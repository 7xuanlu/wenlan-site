"use client";

import { useEffect, useRef } from "react";
import type { LinkContent } from "@/i18n/content/schema";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { CaretDownIcon } from "@/components/icons";

export function ResourceMenu({ locale, label, links }: {
  locale: Locale;
  label: string;
  links: readonly LinkContent[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (details && event.target instanceof Node && !details.contains(event.target)) details.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="group/resources relative hidden md:block"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !detailsRef.current?.open) return;
        event.preventDefault();
        detailsRef.current.open = false;
        summaryRef.current?.focus();
      }}
    >
      <summary ref={summaryRef} className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 whitespace-nowrap text-sm text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)] group-open/resources:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] [&::-webkit-details-marker]:hidden">
        {label}<CaretDownIcon className="size-3.5 transition-transform group-open/resources:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-64 rounded-lg bg-[var(--o-bg-alt)] p-2 shadow-[var(--o-shadow-media)]">
        {links.map((link) => (
          <LocalizedLink key={link.id} href={link.href} locale={locale}
            onClick={() => { if (detailsRef.current) detailsRef.current.open = false; }}
            className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm text-[var(--o-text-secondary)] transition-colors hover:bg-[var(--o-surface)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)]">
            {link.label}
          </LocalizedLink>
        ))}
      </div>
    </details>
  );
}
