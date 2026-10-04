import { ProductShowcase } from "./product-showcase";
import type { HomeContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { TrackedLocalizedLink } from "@/components/tracked-link";

type FitCopy = HomeContent["redesign"]["fit"];

export function PainsSection({ copy, locale }: { readonly copy: FitCopy; readonly locale: Locale }) {
  const title = locale === "en"
    ? "Turn a discussion into your next starting point."
    : locale === "zh-TW"
      ? "把一次討論，變成下次的起點。"
      : "把一次讨论，变成下次的起点。";

  return (
    <section id="knowledge-workflows" data-home-fit className="scroll-mt-24 px-6 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-serif text-3xl font-medium tracking-tight text-balance text-[var(--o-text)] sm:text-5xl sm:leading-tight">
          {locale === "en" ? title : <><span className="block">{locale === "zh-TW" ? "把一次討論，" : "把一次讨论，"}</span><span className="block">{locale === "zh-TW" ? "變成下次的起點。" : "变成下次的起点。"}</span></>}
        </h2>

        <div className="mt-7 sm:mt-9">
          <ProductShowcase locale={locale} />
          <p className="mt-8 flex flex-col items-start gap-2 text-sm leading-6 text-[var(--o-text-secondary)] sm:flex-row sm:items-center sm:gap-3">
            <span>{copy.comparisonPrompt}</span>
            <TrackedLocalizedLink
              href="/learn/choose-ai-knowledge-base-tool#compare-tools"
              locale={locale}
              eventName="learn_article_click"
              placement="home-comparison"
              context="comparisons"
              className="inline-flex min-h-11 items-center font-medium text-[var(--o-text)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
            >
              {copy.comparisonLabel}
            </TrackedLocalizedLink>
          </p>
        </div>
      </div>
    </section>
  );
}
