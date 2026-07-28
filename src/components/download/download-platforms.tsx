"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import type { HomeContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { recommendedReleaseAssetId } from "@/lib/platform-recommendation";
import type { WenlanReleaseAssetId } from "@/lib/releases";

type DownloadCopy = HomeContent["download"];
type PlatformCopy = DownloadCopy["platforms"][number];

export type DownloadPlatform = PlatformCopy & {
  href: string;
  format: string;
  size: string;
};

export function DownloadPlatforms({
  copy,
  locale,
  platforms,
  releaseTag,
  releaseUrl,
}: {
  copy: DownloadCopy;
  locale: Locale;
  platforms: readonly DownloadPlatform[];
  releaseTag: string;
  releaseUrl: string;
}) {
  const [recommendedId, setRecommendedId] =
    useState<WenlanReleaseAssetId | null>(null);

  useEffect(() => {
    setRecommendedId(recommendedReleaseAssetId(navigator.userAgent));
  }, []);

  const orderedPlatforms = recommendedId
    ? [
        ...platforms.filter((platform) => platform.id === recommendedId),
        ...platforms.filter((platform) => platform.id !== recommendedId),
      ]
    : platforms;
  const recommendedPlatform = platforms.find(
    (platform) => platform.id === recommendedId,
  );

  return (
    <>
      <section className="px-5 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            {copy.page.buildsTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--o-text-secondary)]">
            {copy.page.buildsDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-xs text-[var(--o-text-secondary)]">
              {copy.stableLabel} {releaseTag}
            </span>
            <TrackedLink
              href={releaseUrl}
              eventName="github_outbound"
              placement="download-page"
              locale={locale}
              context="setup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
            >
              {copy.page.releaseSourceLabel}
            </TrackedLink>
          </div>

          <p className="sr-only" aria-live="polite">
            {recommendedPlatform
              ? `${copy.recommendation.label}: ${recommendedPlatform.name} ${recommendedPlatform.architecture}`
              : copy.recommendation.fallbackDescription}
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg)]">
            {orderedPlatforms.map((platform) => {
              const isRecommended = platform.id === recommendedId;

              return (
                <article
                  id={platform.id}
                  key={platform.id}
                  className={`grid scroll-mt-24 gap-5 border-b border-[var(--o-border-subtle)] p-5 last:border-b-0 sm:p-6 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center ${
                    isRecommended ? "bg-[var(--o-card-bg)]" : ""
                  }`}
                >
                  {isRecommended ? (
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--o-warm)] uppercase md:col-span-3">
                      {copy.recommendation.label}
                    </p>
                  ) : null}
                  <div>
                    <h3 className="font-serif text-2xl font-medium">
                      {platform.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[var(--o-text-secondary)]">
                      {platform.architecture}
                    </p>
                  </div>
                  <div>
                    <p className="max-w-xl text-sm leading-relaxed text-[var(--o-text-secondary)]">
                      {platform.description}
                    </p>
                    <p className="mt-3 font-mono text-xs text-[var(--o-text-secondary)]">
                      {platform.format} · {platform.size}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--o-text-secondary)]">
                      {copy.packageIncludesLabel}
                    </p>
                  </div>
                  <TrackedLink
                    href={platform.href}
                    eventName="github_outbound"
                    placement="download-page"
                    locale={locale}
                    context="setup"
                    className="inline-flex min-h-11 w-full items-center justify-center whitespace-nowrap rounded-lg bg-[var(--o-text)] px-5 py-3 text-center text-sm font-semibold text-[var(--o-bg)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] md:w-auto"
                  >
                    {platform.actionLabel}
                  </TrackedLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--o-border-subtle)] bg-[var(--o-bg-alt)] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            {copy.page.setupTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--o-text-secondary)]">
            {copy.page.setupDescription}
          </p>

          <div className="mt-7 overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-bg)]">
            {orderedPlatforms.map((platform) => {
              const isRecommended = platform.id === recommendedId;

              return (
                <details
                  key={`${platform.id}-setup`}
                  open={isRecommended || undefined}
                  className="group border-b border-[var(--o-border-subtle)] last:border-b-0"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--o-warm)] sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="font-serif text-xl font-medium">
                        {platform.name}
                      </span>
                      <span className="ml-3 font-mono text-xs text-[var(--o-text-secondary)]">
                        {platform.architecture}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xl text-[var(--o-warm)]"
                    >
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">-</span>
                    </span>
                  </summary>
                  <ol className="space-y-4 px-5 pb-6 sm:px-6">
                    {platform.setupSteps.map((step, index) => (
                      <li
                        key={step}
                        className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-[var(--o-text-secondary)]"
                      >
                        <span className="font-mono text-xs text-[var(--o-warm)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
