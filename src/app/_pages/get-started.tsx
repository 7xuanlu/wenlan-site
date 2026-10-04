import { SiteHeader } from "@/components/site-header";
import { ArticleHalo, MemoryIndex } from "../(en)/learn/article-visuals";
import { RuntimeInstallBlock } from "@/components/docs/runtime-install-block";
import { getCoreContent } from "@/i18n/content";
import { LOCALE_CONFIG, type Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { canonicalUrl } from "@/i18n/routing";
import { TrackedLocalizedLink } from "@/components/tracked-link";
import { WENLAN_RELEASE } from "@/lib/releases";
import type { WenlanRelease } from "@/lib/release-manifest";
import { SoftwareApplicationData } from "@/components/software-application-data";

export function GetStartedPage({ locale, release = WENLAN_RELEASE }: { locale: Locale; release?: WenlanRelease }) {
  const dictionary = getCoreContent(locale);
  const sourceContent = dictionary.getStarted.content;
  const content = {...sourceContent, steps: sourceContent.steps.map(step => step.id !== "install-runtime" ? step : {
    ...step,
    paragraphs: step.paragraphs.map(paragraph => paragraph.replace(/\bv\d+\.\d+\.\d+\b/g, release.tag)),
    ctas: step.ctas.map(cta => ({...cta,
      href: cta.id === "windows-download"
        ? release.assets.find(asset => asset.id === "windows-x64")!.href
        : cta.id === "all-downloads" ? release.releaseUrl : cta.href,
      label: cta.label.replace(/\bv\d+\.\d+\.\d+\b/g, release.tag),
    })),
  })};
  const chrome = dictionary.chrome.content;
  const ui = setupLabels[locale];
  const install = content.steps.find(step => step.id === "install-runtime")!;
  const trial = content.steps.find(step => step.id === "try-first")!;
  const clients = content.steps.filter(step => step.id !== "install-runtime" && step.id !== "try-first");
  const homeUrl = canonicalUrl(locale, "/");
  const docsUrl = canonicalUrl(locale, "/docs");
  const getStartedUrl = canonicalUrl(locale, "/docs/get-started");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: content.breadcrumbs.home,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.breadcrumbs.docs,
        item: docsUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.hero.eyebrow,
        item: getStartedUrl,
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: content.schema.name,
    description: content.schema.description,
    url: getStartedUrl,
    inLanguage: LOCALE_CONFIG[locale].hreflang,
    step: [
      { "@type": "HowToStep", name: install.title, text: install.paragraphs.join("\n") },
      { "@type": "HowToStep", name: ui.chooseTitle, text: ui.chooseBody },
      { "@type": "HowToStep", name: trial.title, text: trial.paragraphs.join("\n") },
    ],
  };

  return (
    <main className="grain min-h-screen">
      <SoftwareApplicationData locale={locale} release={release} />
      <SiteHeader locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <article>
        <header className="relative px-6 pt-28 pb-12 sm:pt-32 sm:pb-16">
          <ArticleHalo />
          <div className="relative z-10 mx-auto max-w-5xl">
            <nav aria-label={chrome.breadcrumbAriaLabel} className="flex items-center gap-3 font-mono text-xs text-[var(--o-text-muted)]">
              <LocalizedLink
                href="/"
                locale={locale}
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                {content.breadcrumbs.home}
              </LocalizedLink>
              <span>/</span>
              <LocalizedLink
                href="/docs"
                locale={locale}
                className="transition-colors hover:text-[var(--o-text-secondary)]"
              >
                {content.breadcrumbs.docs}
              </LocalizedLink>
            </nav>
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[var(--o-warm)]/80 uppercase">
                  {content.hero.eyebrow}
                </p>
                <h1 className="warm-glow break-keep font-serif text-[2rem] leading-[1.15] font-medium tracking-tight sm:text-5xl sm:leading-[1.05]">
                  {content.hero.title}
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--o-text-secondary)] sm:max-w-2xl">
                  {content.hero.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[var(--o-text-muted)]">
                  {content.hero.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <MemoryIndex label={content.hero.setupPathLabel} items={[...content.hero.setupPathItems]} />
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl space-y-14">
            <section id="install-runtime" className="scroll-mt-24 grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)]">
              <p className="font-mono text-sm text-[var(--o-warm)]">01</p>
              <div className="min-w-0">
                <h2 className="font-serif text-3xl font-medium">{install.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--o-text-secondary)]">{install.paragraphs[0]}</p>
                <TrackedLocalizedLink href="/download" locale={locale} eventName="setup_path_click" placement="docs-get-started" context="setup" className="btn-wenlan btn-wenlan-primary mt-6 inline-flex">
                  {ui.download}
                </TrackedLocalizedLink>
                {install.paragraphs.slice(1).map(text => <p key={text} className="mt-6 max-w-2xl text-sm leading-7 text-[var(--o-text-secondary)]">{text}</p>)}
                <details className="group mt-6 max-w-3xl">
                  <summary className="min-h-11 cursor-pointer py-3 text-sm text-[var(--o-text-secondary)] focus-wenlan">{ui.runtime}</summary>
                  <p className="mt-2 text-sm leading-6 text-[var(--o-text-secondary)]">{ui.runtimeBody}</p>
                  <RuntimeInstallBlock commands={install.commands} ctas={install.ctas} locale={locale} />
                </details>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)]">
              <p className="font-mono text-sm text-[var(--o-warm)]">02</p>
              <div className="min-w-0">
                <h2 className="font-serif text-3xl font-medium">{ui.chooseTitle}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--o-text-secondary)]">{ui.chooseBody}</p>
                <div className="mt-6 grid min-w-0 grid-cols-1 gap-3">
                  {clients.map(step => (
                    <details key={step.id} id={step.id} name="setup-client" className="group min-w-0 scroll-mt-24 rounded-lg bg-[var(--o-surface)] px-5 sm:px-6">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium focus-wenlan [&::-webkit-details-marker]:hidden">
                        {step.title}<span aria-hidden="true" className="text-[var(--o-warm)] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <div className="pb-6">
                        {step.paragraphs.map(text => <p key={text} className="mt-3 max-w-3xl text-base leading-7 text-[var(--o-text-secondary)]">{text}</p>)}
                        {step.commands.map(command => <pre key={command} className="mt-5 overflow-x-auto rounded-md bg-[var(--o-bg-deep)] p-4 font-mono text-sm leading-7"><code>{command}</code></pre>)}
                        {step.ctas.map(cta => <LocalizedLink key={cta.id} href={cta.href} locale={locale} className="mt-5 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 focus-wenlan">{cta.label}</LocalizedLink>)}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <section id="try-first" className="scroll-mt-24 grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)]">
              <p className="font-mono text-sm text-[var(--o-warm)]">03</p>
              <div className="min-w-0">
                <h2 className="font-serif text-3xl font-medium">{trial.title}</h2>
                {trial.paragraphs.map(text => <p key={text} className="mt-4 max-w-3xl text-base leading-7 text-[var(--o-text-secondary)]">{text}</p>)}
                {trial.commands.map(command => <pre key={command} className="mt-5 whitespace-pre-wrap break-words rounded-md bg-[var(--o-surface)] p-5 text-base leading-7"><code className="font-sans">{command}</code></pre>)}
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {trial.ctas.map(cta => <TrackedLocalizedLink key={cta.id} href={cta.href} locale={locale} eventName="setup_path_click" placement="docs-get-started" context="setup" className="inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 focus-wenlan">{cta.label}</TrackedLocalizedLink>)}
                </div>
              </div>
            </section>
          </div>
        </section>
      </article>
    </main>
  );
}


const setupLabels = {
  en: {
    download: "Choose your download",
    runtime: "Prefer the command line, or use Linux?",
    runtimeBody: "Install the local service without the desktop app. Choose only your operating system below. On Windows, extract the complete archive into a folder on PATH and keep its libraries beside the executables.",
    chooseTitle: "Connect one AI tool",
    chooseBody: "Choose the tool you already use. You only need one of these paths. If you prefer to read and organize in the desktop app, you can connect an AI tool later.",
  },
  "zh-TW": {
    download: "選擇適合你的下載",
    runtime: "使用 Linux，或偏好指令列？",
    runtimeBody: "不安裝桌面 App，也能使用本機服務。只需執行下方對應作業系統的指令。Windows 請完整解壓縮套件，將資料夾加入 PATH，並讓程式與附帶的函式庫放在一起。",
    chooseTitle: "連接一個 AI 工具",
    chooseBody: "選你平常使用的工具，只需設定其中一種。若先在桌面 App 閱讀與整理，也可以之後再連接 AI。",
  },
  "zh-CN": {
    download: "选择适合你的下载",
    runtime: "使用 Linux，或偏好命令行？",
    runtimeBody: "不安装桌面 App，也能使用本机服务。只需执行下方对应操作系统的命令。Windows 请完整解压软件包，将文件夹加入 PATH，并让程序与附带的库放在一起。",
    chooseTitle: "连接一个 AI 工具",
    chooseBody: "选你平常使用的工具，只需配置其中一种。如果先在桌面 App 阅读与整理，也可以之后再连接 AI。",
  },
} as const;
