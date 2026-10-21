import type { ArticleOpeningExample as OpeningExample } from "@/app/(en)/learn/articles";
import type { Locale } from "@/i18n/locales";
import { RecordedEvidenceGallery } from "./recorded-evidence-gallery";

const labels = {
  en: { context: "Recorded example · fictional Cedar files", question: "You ask", answer: "Claude answers", source: "Source" },
  "zh-TW": { context: "實測範例 · 虛構 Cedar 文件", question: "你問", answer: "Claude 回答", source: "來源" },
  "zh-CN": { context: "实测示例 · 虚构 Cedar 文档", question: "你问", answer: "Claude 回答", source: "来源" },
} as const;

export function ArticleOpeningExample({ example, locale }: { example: OpeningExample; locale: Locale }) {
  const copy = labels[locale];
  return (
    <section id="answer-preview" aria-labelledby="knowledge-base-uses-heading" className="article-opening-example mt-6">
      <div className="mb-6">
        <h2 id="knowledge-base-uses-heading" className="text-base font-semibold text-[var(--o-text)]">{example.usesHeading}</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--o-text-secondary)]">
          {example.questions.map((question) => <li key={question}>{question}</li>)}
        </ul>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-[var(--o-text-secondary)]">{example.context}</p>
      <div className="overflow-hidden rounded-2xl border border-[var(--o-border)] bg-[var(--o-bg-alt)]">
        <div className="p-5 sm:p-7">
          <p className="flex items-center gap-2 text-xs leading-5 text-[var(--o-text-secondary)]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--o-sage)]" />
            {copy.context}
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-[0.9fr_1.2fr] sm:gap-8">
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--o-text-secondary)]">{copy.question}</p>
              <h2 id="answer-preview-heading" className="mt-2 text-xl leading-snug font-semibold tracking-tight text-[var(--o-text)]">{example.question}</h2>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--o-text-secondary)]">{copy.answer}</p>
              <p className="mt-2 font-serif text-[28px] leading-tight font-medium tracking-tight text-[var(--o-text)] sm:text-[30px]">{example.answer}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--o-text-secondary)]">{example.answerDetail}</p>
              <p className="mt-3 flex max-w-full items-center gap-2 text-[var(--o-text-secondary)]">
                <svg aria-hidden="true" className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
                <span className="text-xs">{copy.source}:</span>
                <span className="min-w-0 break-words font-mono text-[11px]">{example.sourceLabel}</span>
              </p>
            </div>
          </div>
        </div>
        <RecordedEvidenceGallery image={example.image} sourceImage={example.sourceImage} locale={locale} />
      </div>
      <a href="#worked-example-files" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--o-text)] px-4 text-sm font-medium text-[var(--o-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
        {example.actionLabel}
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
      </a>
    </section>
  );
}
