import { ArticleCodeBlock } from "@/components/learn/article-code-block";
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
          {step.prompt && (
            <div data-prompt-example className="mt-4 rounded-lg border border-[var(--o-border)] p-4">
              <p className="text-sm font-semibold text-[var(--o-text-muted)]">{step.prompt.label}</p>
              <p className="mt-2 text-base leading-relaxed text-[var(--o-text)]">{step.prompt.text}</p>
            </div>
          )}
          {step.bullets && (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--o-text-secondary)]">
              {step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          )}
          {step.afterBullets?.map((paragraph) => (
            <p key={paragraph} className="mt-3 break-words text-sm leading-relaxed text-[var(--o-text-muted)]">{paragraph}</p>
          ))}
          {step.code && <ArticleCodeBlock label={step.code.label} code={step.code.code} />}
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
