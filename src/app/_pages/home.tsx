import { resourceLinks } from "@/components/resource-navigation";
import { SiteHeader } from "@/components/site-header";
import { DemoVideo } from "../demo-video";
import {
  ArrowRightIcon,
  DownloadSimpleIcon,
  GitHubLogoIcon,
} from "@/components/icons";
import type { WenlanRelease } from "@/lib/release-manifest";
import { ProductMedia, StoryIntro, KnowledgeUpdates, KnowledgeConnections } from "@/components/home/home-story";
import { storyCopyByLocale } from "@/components/home/home-story-copy";
import { HeroScenarios } from "@/components/home/hero-scenarios";
import { BentoSection } from "@/components/home/bento";
import { HomeMotion } from "@/components/home/home-motion";
import { HomeReadableText } from "@/components/home/readable-text";
import { TrackedLink, TrackedLocalizedLink } from "@/components/tracked-link";
import { getCoreContent, type HomeContent, type LinkContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import { LocalizedLink, localizedHrefForLocale } from "@/i18n/navigation";
import { SITE_URL } from "@/i18n/routing";
import { demoVideoForLocale } from "@/lib/demo-video";
import { SoftwareApplicationData } from "@/components/software-application-data";

const integrationCopy = {
  en: {
    title: "Your knowledge stays yours.",
    contextLabel: "Context per query",
    tokenUnit: "Tokens measure text length.",
    recallTitle: "Retrieval coverage",
    recallLimit: "Not answer accuracy.",
    contextScope: "LoCoMo · historical, not rerun",
    recallScope: "LongMemEval (oracle) · 500 questions",
    metricsLink: "Evaluation & methodology",
    recallLabel: "Average coverage of labeled relevant material in the top 5.",
    ownershipBody: "Your pages, memories, and graph are stored locally. Open knowledge pages in your own editor.",
    modelBody: "Choose a local or cloud model. Cloud models receive the content they process.",
    ownershipLink: "How local storage works",
  },
  "zh-TW": {
    title: "你的知識，由你掌握。",
    contextLabel: "每次查詢的背景內容",
    tokenUnit: "Token 計算文字長度。",
    recallTitle: "相關資料覆蓋率",
    recallLimit: "不代表回答正確率。",
    contextScope: "LoCoMo · 歷史結果，未重測",
    recallScope: "LongMemEval（oracle）· 500 題",
    metricsLink: "查看完整評測與方法",
    recallLabel: "前 5 筆結果對標註相關資料的平均覆蓋率。",
    ownershipBody: "知識頁、記憶與圖譜保存在本機；知識頁可用自己的編輯器開啟。",
    modelBody: "模型可選本機或雲端；雲端模型會接收需要處理的內容。",
    ownershipLink: "了解本機資料儲存",
  },
  "zh-CN": {
    title: "你的知识，由你掌握。",
    contextLabel: "每次查询的背景内容",
    tokenUnit: "Token 计算文字长度。",
    recallTitle: "相关资料覆盖率",
    recallLimit: "不代表回答正确率。",
    contextScope: "LoCoMo · 历史结果，未重测",
    recallScope: "LongMemEval（oracle）· 500 题",
    metricsLink: "查看完整评测与方法",
    recallLabel: "前 5 条结果对标注相关资料的平均覆盖率。",
    ownershipBody: "知识页、记忆与图谱保存在本地；知识页可用自己的编辑器打开。",
    modelBody: "模型可选本地或云端；云端模型会接收需要处理的内容。",
    ownershipLink: "了解本地数据存储",
  },
} as const;

// The two bars share a zero baseline and the same token scale. Retrieval
// quality remains a separate measurement, not part of the bar lengths.
const tokenSnapshotUrl = "https://github.com/7xuanlu/wenlan/blob/43d905dceb92b7f6f454443c1097f090c3b61170/README.md#evaluation";

const metricBarChrome: Record<string, { tone: "muted" | "warm"; widthPercent: number }> = {
  "full-replay": { tone: "muted", widthPercent: 100 },
  wenlan: { tone: "warm", widthPercent: 168 / 4505 * 100 },
};

function MetricBar({ label, tone, value, widthPercent }: {
  label: string; tone: "muted" | "warm"; value: string; widthPercent: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-base font-medium">{label}</p>
        <p className="shrink-0 whitespace-nowrap font-mono text-base tabular-nums" style={{ color: tone === "warm" ? "var(--o-warm)" : "var(--o-text-secondary)" }}>{value}</p>
      </div>
      <div aria-hidden="true" className="mt-3 h-3 overflow-hidden rounded-sm bg-[var(--o-surface)]">
        <div data-retrieval-bar className="h-full rounded-sm" style={{ width: `${widthPercent}%`, background: tone === "warm" ? "var(--o-warm)" : "var(--o-text-muted)" }} />
      </div>
    </div>
  );
}

export function HomePage({ locale, release }: { locale: Locale; release?: WenlanRelease }) {
  const content = getCoreContent(locale).home.content;
  const siteNavigationSchema = buildSiteNavigationSchema(locale, content.nav);
  const redesign = content.redesign;
  const cta = content.sections.openSourceCta;
  const demoVideo = demoVideoForLocale(locale);
  const integrations = integrationCopy[locale];
  const story = storyCopyByLocale[locale];

  return (
    <main className="home-page relative min-h-screen">
      <SoftwareApplicationData locale={locale} release={release} />
      <HomeMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
      <SiteHeader locale={locale} home />

      {/* One opening: promise, actions, then the existing interactive product. */}
      <section className="home-hero relative px-4 pb-6 sm:px-6 sm:pb-8" aria-labelledby="home-heading">
        <div className="mx-auto max-w-6xl">
          <div className="home-hero-copy mx-auto max-w-4xl min-w-0 text-center">
            <h1 id="home-heading" className={`home-hero-title animate-fade-up motion-reduce:animate-none font-sans font-medium tracking-tight break-words text-balance ${locale === "en" ? "home-hero-title--en" : "home-hero-title--cjk"}`}>
              <span className={locale === "en" ? "inline" : "block"}>{redesign.hero.headline.pre}</span>
              {locale === "en" ? " " : null}
              <span className={`${locale === "en" ? "inline whitespace-nowrap" : "block"} text-[var(--o-warm)]`}>{redesign.hero.headline.emphasis}</span>
              {redesign.hero.headline.post}
            </h1>
            <p className="home-hero-description mx-auto max-w-2xl text-balance text-[var(--o-text-secondary)]">
              {locale === "en" ? (
                story.heroDescription.split(/(?<=\.)\s+/).map((sentence, index) => (
                  <span key={sentence} className="md:block">
                    {index > 0 ? " " : null}{sentence}
                  </span>
                ))
              ) : (
                <HomeReadableText>{story.heroDescription}</HomeReadableText>
              )}
            </p>
          </div>
          <DemoVideo
            key={locale}
            primaryAction={<HomeCta link={content.hero.primaryCta} locale={locale} placement="home-hero" variant="primary" />}
            sourceAction={
              <a href="https://github.com/7xuanlu/wenlan" target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--o-border)] px-4 py-3 text-sm font-medium text-[var(--o-text)] transition-colors hover:bg-[var(--o-bg-alt)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] sm:px-5">
                <GitHubLogoIcon className="size-4 shrink-0" />
                GitHub
              </a>
            }
            sectionTitle={demoTitleByLocale[locale]}
            locale={locale}
            videoUrl={demoVideo.videoUrl}
            posterUrl={demoVideo.posterUrl}
            playLabel={content.demo.playLabel}
            title={content.demo.title}
            caption={demoCaption(locale)}
          />
          <section id="knowledge-workflows" aria-labelledby="knowledge-workflows-heading" className="home-hero-product scroll-mt-20">
            <h2 id="knowledge-workflows-heading" className="sr-only">{story.wikiTitle}</h2>
            <ProductMedia locale={locale} slot="wiki" />
          </section>
        </div>
      </section>

      <KnowledgeConnections locale={locale} />

      <section id="ai-recall" aria-labelledby="ai-recall-heading" className="scroll-mt-24 px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid min-w-0 gap-8">
            <StoryIntro locale={locale} slot="ai" id="ai-recall-heading" title={story.aiTitle} body={story.aiBody} wide />
            <ProductMedia locale={locale} slot="ai" />
          </div>
          <details data-home-examples className="group mt-4">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-3 text-sm font-medium text-[var(--o-text-secondary)] transition-colors hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)] [&::-webkit-details-marker]:hidden">
              {story.examplesLabel}<span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
            </summary>
            <div className="mx-auto max-w-4xl pt-8"><HeroScenarios locale={locale} /></div>
          </details>
        </div>
      </section>

      <KnowledgeUpdates locale={locale} />

      <div id="capabilities" data-home-capabilities className="scroll-mt-24">
        <BentoSection cells={redesign.bento.cells} title={content.sections.features.title} locale={locale} />
      </div>

      <section id="integrations" aria-labelledby="ownership-heading" data-home-reveal className="scroll-mt-24 px-6 pt-4 pb-12 sm:pb-16">
        <div data-knowledge-ownership className="mx-auto grid max-w-6xl gap-5 py-8 md:grid-cols-[.85fr_1.15fr] md:gap-12 sm:py-10">
          <div>
            <h2 id="ownership-heading" className="font-sans text-2xl font-medium tracking-tight text-balance sm:text-3xl">{integrations.title}</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-[var(--o-text-secondary)]">{integrations.ownershipBody}{" "}{integrations.modelBody}</p>
            <LocalizedLink href="/learn/markdown-local-index-ai-memory" locale={locale} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--o-warm)] underline decoration-[var(--o-border)] underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4">
              {integrations.ownershipLink}<ArrowRightIcon className="size-4 shrink-0" />
            </LocalizedLink>
          </div>
        </div>
      </section>

      <section id="retrieval-evidence" aria-labelledby="retrieval-heading" className="scroll-mt-24 px-6 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <h2 id="retrieval-heading" className="font-sans text-2xl font-medium tracking-tight text-balance sm:text-3xl">{content.metrics.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--o-text-secondary)]">{content.metrics.description}</p>
            </div>
            <LocalizedLink href="/docs/evaluation" locale={locale} className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start text-sm font-medium text-[var(--o-warm)] underline decoration-[var(--o-border)] underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 sm:self-auto">
              {integrations.metricsLink}<ArrowRightIcon className="size-4 shrink-0" />
            </LocalizedLink>
          </div>
          <div className="mt-8 grid min-w-0 items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="min-w-0" aria-labelledby="context-test-heading">
              <h3 id="context-test-heading" className="text-base font-medium">{integrations.contextLabel}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--o-text-muted)]"><a href={tokenSnapshotUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-4">{integrations.contextScope}</a></p>
              <div data-retrieval-bars className="mt-5 space-y-6">
                {redesign.metrics.bars.map((bar) => <MetricBar key={bar.id} label={bar.label} value={bar.value} {...metricBarChrome[bar.id]} />)}
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--o-text-secondary)]">{integrations.tokenUnit}</p>
            </div>
            <div className="min-w-0" aria-labelledby="coverage-test-heading">
              <h3 id="coverage-test-heading" className="text-base font-medium">{integrations.recallTitle}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--o-text-muted)]">{integrations.recallScope}</p>
              <div className="mt-5 flex flex-col items-start gap-3">
                <p className="font-mono text-4xl leading-none tabular-nums tracking-tight sm:text-5xl">93.6%</p>
                <p className="max-w-sm text-sm leading-6 text-[var(--o-text-secondary)]">{integrations.recallLabel}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--o-text-secondary)]">{integrations.recallLimit}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The download is the sole closing action; release updates live in the homepage footer. */}
      <section id="get-wenlan" aria-labelledby="download-heading" className="scroll-mt-24 px-6 pt-12 pb-12 text-center sm:pt-16 sm:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h2 id="download-heading" className="font-sans text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--o-text-secondary)]">
            {cta.body}
          </p>
          <div className="mt-6 flex items-start [&>a]:min-h-12">
            <HomeCta link={cta.primaryCta} locale={locale} placement="home-footer" variant="primary" />
          </div>
        </div>
      </section>
    </main>
  );
}

const demoTitleByLocale: Record<Locale, string> = {
  en: "Watch video",
  "zh-TW": "觀看介紹",
  "zh-CN": "观看介绍",
};

const demoCaptions: Record<Locale, string> = {
  en: "Product introduction · 67 seconds",
  "zh-TW": "產品介紹 · 67 秒",
  "zh-CN": "产品介绍 · 67 秒",
};

function demoCaption(locale: Locale): string {
  return demoCaptions[locale];
}

function HomeCta({
  link,
  locale,
  placement,
  showGithubIcon = false,
  variant,
}: {
  link: LinkContent;
  locale: Locale;
  placement: "home-hero" | "home-footer";
  showGithubIcon?: boolean;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "flex items-center gap-2 rounded-xl bg-[var(--o-text)] px-4 py-3 text-sm sm:px-6 font-semibold text-[var(--o-bg)] transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
      : "flex items-center gap-2 rounded-xl border border-[var(--o-border)] px-4 py-3 text-sm sm:px-6 font-medium text-[var(--o-text-secondary)] transition-all duration-150 hover:border-[var(--o-text-dim)] hover:text-[var(--o-text)]";

  const children = (
    <>
      {showGithubIcon && <GitHubLogoIcon className="size-5" />}
      {link.label}
      {!showGithubIcon && (link.id === "download"
        ? <DownloadSimpleIcon className="size-4" />
        : <ArrowRightIcon className="size-4" />)}
    </>
  );

  if (isExternalHref(link.href)) {
    return (
      <TrackedLink
        href={link.href}
        eventName="github_outbound"
        placement={placement}
        locale={locale}
        context="home"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </TrackedLink>
    );
  }

  return (
    <TrackedLocalizedLink
      href={link.href}
      eventName={link.id === "download" ? "setup_path_click" : "get_started_click"}
      placement={placement}
      locale={locale}
      context="home"
      className={className}
    >
      {children}
    </TrackedLocalizedLink>
  );
}

function buildSiteNavigationSchema(locale: Locale, nav: HomeContent["nav"]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nav.schemaName,
    itemListElement: [...nav.links.filter(({ id }) => id !== "docs" && id !== "learn"), ...resourceLinks(locale, nav)].map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.label,
      url: isExternalHref(link.href)
        ? link.href
        : `${SITE_URL}${localizedHrefForLocale(locale, link.href) === "/" ? "" : localizedHrefForLocale(locale, link.href)}`,
    })),
  };
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
