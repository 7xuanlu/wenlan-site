import type { HomeContent } from "@/i18n/content";

/* FAQ */

type FAQCopy = HomeContent["faqs"];

export function FAQSection({ copy }: { copy: FAQCopy }) {
  return (
    <section className="border-t border-[var(--o-border-subtle)] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[var(--o-border-subtle)] rounded-lg border border-[var(--o-border)]">
          {copy.items.map((f) => (
            <details key={f.id} className="group">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-serif text-sm font-medium text-[var(--o-text)] transition-colors duration-150 hover:text-[var(--o-text-secondary)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="ml-4 text-[var(--o-text-muted)] transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-[13px] leading-relaxed text-[var(--o-text-muted)]">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
