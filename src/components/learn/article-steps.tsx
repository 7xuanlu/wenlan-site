import type { LearnArticleSection } from "@/app/(en)/learn/articles";
import type { Locale } from "@/i18n/locales";
import { EvidenceImage } from "./evidence-image";

export function ArticleSteps({ steps, locale }: { steps: NonNullable<LearnArticleSection["steps"]>; locale: Locale }) {
  return (
    <ol className="mt-6 space-y-10">
      {steps.map((step, index) => (
        <li key={step.title}>
          <h3 className="text-lg font-semibold text-[var(--o-text)]">{index + 1}. {step.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-[var(--o-text-secondary)]">{step.body}</p>
          {step.code && (
            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg-alt)]">
              <p className="px-4 pt-4 font-mono text-xs text-[var(--o-text-muted)]">{step.code.label}</p>
              <pre className="overflow-x-auto p-4 text-sm text-[var(--o-text)]"><code>{step.code.code}</code></pre>
            </div>
          )}
          {step.image && (
            <figure className="mt-5 overflow-hidden rounded-xl border border-[var(--o-border)]">
              <EvidenceImage image={step.image} locale={locale} />
              <figcaption className="px-4 pb-4 text-sm leading-relaxed text-[var(--o-text-muted)]">{step.image.caption}</figcaption>
            </figure>
          )}
        </li>
      ))}
    </ol>
  );
}
