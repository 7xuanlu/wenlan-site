"use client";

import { getCoreContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const content = getCoreContent(locale).notFound.content;

  return (
    <main className="grain min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
          {content.eyebrow}
        </p>
        <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-[var(--o-text)] sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--o-text-secondary)]">
          {content.description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <LocalizedLink
            href="/"
            locale={locale}
            className="rounded-xl bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] transition-all hover:shadow-[0_0_28px_var(--o-glow-warm)]"
          >
            {content.primaryCta}
          </LocalizedLink>
          <LocalizedLink
            href="/learn"
            locale={locale}
            className="rounded-xl border border-[var(--o-border)] px-5 py-3 text-center text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)]"
          >
            {content.secondaryCta}
          </LocalizedLink>
        </div>

        <section className="mt-16">
          <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--o-warm)]/80 uppercase">
            {content.popularHeading}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.popularDestinations.map((destination) => (
              <LocalizedLink
                key={destination.id}
                href={destination.href}
                locale={locale}
                className="card-wenlan group block rounded-xl p-5 transition-transform duration-150 hover:-translate-y-1"
              >
                <p className="font-serif text-lg font-medium tracking-tight text-[var(--o-text)]">
                  {destination.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--o-text-muted)]">
                  {destination.description}
                </p>
              </LocalizedLink>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
