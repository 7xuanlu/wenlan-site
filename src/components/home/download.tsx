import { TrackedLink, TrackedLocalizedLink } from "@/components/tracked-link";
import type { HomeContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { WENLAN_RELEASE } from "@/lib/releases";

function DownloadArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function DownloadSection({
  copy,
  locale,
}: {
  copy: HomeContent["download"];
  locale: Locale;
}) {
  const platforms = WENLAN_RELEASE.assets.map((asset) => {
    const platform = copy.platforms.find((item) => item.id === asset.id);
    if (!platform) {
      throw new Error(`Missing localized download copy for ${asset.id}`);
    }
    return { ...asset, ...platform };
  });
  const [windows, ...otherPlatforms] = platforms;

  return (
    <section
      id="download"
      className="scroll-mt-20 border-b border-[var(--o-border-subtle)] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--o-warm)] uppercase">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-medium tracking-tight text-balance sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-[var(--o-text-secondary)] sm:text-lg">
              {copy.description}
            </p>
          </div>
          <div className="flex items-center gap-4 lg:col-span-5 lg:justify-end">
            <span className="font-mono text-xs text-[var(--o-text-muted)]">
              {copy.stableLabel} {WENLAN_RELEASE.tag}
            </span>
            <TrackedLink
              href={WENLAN_RELEASE.releaseUrl}
              eventName="github_outbound"
              placement="home-download"
              locale={locale}
              context="home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
            >
              {copy.releaseNotesLabel}
              <ExternalArrow />
            </TrackedLink>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-[var(--o-border)] bg-[var(--o-border)] lg:grid lg:grid-cols-12 lg:gap-px">
          <article className="relative overflow-hidden bg-[var(--o-bg-alt)] p-6 sm:p-8 lg:col-span-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--o-warm) 1px, transparent 1px), linear-gradient(90deg, var(--o-warm) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage: "linear-gradient(to left, black, transparent)",
              }}
            />
            <div className="relative">
              <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--o-warm)] uppercase">
                {copy.windowsLabel}
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-3xl font-medium">{windows.name}</h3>
                <span className="font-mono text-xs text-[var(--o-text-muted)]">
                  {windows.architecture}
                </span>
              </div>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-[var(--o-text-secondary)]">
                {windows.description}
              </p>
              <p className="mt-5 font-mono text-[11px] text-[var(--o-text-muted)]">
                {copy.packageIncludesLabel} · {windows.format} · {windows.size}
              </p>
              <TrackedLink
                href={windows.href}
                eventName="github_outbound"
                placement="home-download"
                locale={locale}
                context="home"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--o-text)] px-5 py-3 text-sm font-semibold text-[var(--o-bg)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
              >
                <DownloadArrow />
                {windows.actionLabel}
              </TrackedLink>
            </div>
          </article>

          <div className="grid gap-px bg-[var(--o-border)] lg:col-span-5">
            {otherPlatforms.map((platform) => (
              <article
                key={platform.id}
                className="flex flex-col justify-between gap-5 bg-[var(--o-card-bg)] p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-serif text-xl font-medium">{platform.name}</h3>
                    <span className="font-mono text-[11px] text-[var(--o-text-muted)]">
                      {platform.architecture}
                    </span>
                  </div>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--o-text-secondary)]">
                    {platform.description}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-[var(--o-text-muted)]">
                    {platform.format} · {platform.size}
                  </p>
                </div>
                <TrackedLink
                  href={platform.href}
                  eventName="github_outbound"
                  placement="home-download"
                  locale={locale}
                  context="home"
                  aria-label={`${platform.actionLabel}: ${platform.name} ${platform.architecture}`}
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-[var(--o-border)] px-4 py-2.5 text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:border-[var(--o-text-dim)] hover:text-[var(--o-text)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] sm:self-center"
                >
                  <DownloadArrow />
                  {platform.actionLabel}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 border-t border-[var(--o-border-subtle)] pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="text-sm font-medium text-[var(--o-text)]">
              {copy.setup.title}
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--o-text-muted)]">
              {copy.setup.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <code className="rounded-md bg-[var(--o-bg-deep)] px-3 py-2 font-mono text-xs text-[var(--o-text-secondary)]">
              {copy.setup.command}
            </code>
            <TrackedLocalizedLink
              href="/docs/get-started"
              eventName="get_started_click"
              placement="home-download"
              locale={locale}
              context="home"
              className="text-sm font-medium text-[var(--o-text-secondary)] underline decoration-[var(--o-border)] underline-offset-4 transition-colors hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]"
            >
              {copy.setup.guideLabel}
            </TrackedLocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
