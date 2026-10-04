import type { Locale } from "@/i18n/locales";
import { LocalizedLink } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons";

const copyByLocale = {
  en: {
    title: "Your knowledge stays yours.",
    intro: "Readable files, separate work contexts, and a history of what changed.",
    setup: "Local storage; model processing follows your provider settings.",
    setupLink: "Data and privacy",
    items: [
      { title: "Open your files", body: "Read your Pages and session notes as Markdown in your own editor.", link: "Files and portability", href: "/docs/import-and-portability" },
      { title: "Keep projects apart", body: "Use Spaces for different projects and personal work. Choose the right Space when saving or asking AI.", link: "How Spaces work", href: "/docs/spaces" },
      { title: "See what changed", body: "Inspect earlier Pages and notes in local Git history, and compare changes before restoring a file.", link: "Local version history", href: "/docs/local-git-history" },
    ],
  },
  "zh-TW": {
    title: "知識留下來，也由你掌握。",
    intro: "檔案自己能讀、專案分開整理，改過什麼也查得到。",
    setup: "資料保存在本機；模型處理位置依供應商設定而定。",
    setupLink: "資料與隱私",
    items: [
      { title: "檔案自己能讀", body: "知識頁與工作紀錄以 Markdown 保存，用自己的編輯器也能開啟。", link: "檔案與可攜性", href: "/docs/import-and-portability" },
      { title: "不同專案分開放", body: "用 Space 整理各個專案與個人工作，保存或詢問 AI 時選對空間。", link: "認識工作空間", href: "/docs/spaces" },
      { title: "改過什麼查得到", body: "透過本機 Git 歷史查看舊版知識頁與紀錄，先比較差異，再還原檔案。", link: "查看版本歷史", href: "/docs/local-git-history" },
    ],
  },
  "zh-CN": {
    title: "知识留下来，也由你掌握。",
    intro: "文件自己能读、项目分开整理，改过什么也查得到。",
    setup: "数据保存在本机；模型处理位置取决于提供商设置。",
    setupLink: "数据与隐私",
    items: [
      { title: "文件自己能读", body: "知识页与工作记录以 Markdown 保存，用自己的编辑器也能打开。", link: "文件与可移植性", href: "/docs/import-and-portability" },
      { title: "不同项目分开放", body: "用 Space 整理各个项目与个人工作，保存或询问 AI 时选对空间。", link: "了解工作空间", href: "/docs/spaces" },
      { title: "改过什么查得到", body: "通过本地 Git 历史查看旧版知识页与记录，先比较差异，再恢复文件。", link: "查看版本历史", href: "/docs/local-git-history" },
    ],
  },
} as const;

export function KnowledgeOwnership({ locale }: { readonly locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <section id="knowledge-ownership" className="scroll-mt-20 px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <h2 className="max-w-lg text-balance font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{copy.title}</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[var(--o-text-secondary)]">{copy.intro}</p>
          <p className="mt-6 max-w-md text-sm leading-6 text-[var(--o-text-muted)]">{copy.setup}</p>
          <LocalizedLink href="/docs/data-and-privacy" locale={locale} className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--o-warm)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]">
            {copy.setupLink}<ArrowRightIcon className="size-4" />
          </LocalizedLink>
        </div>
        <dl className="divide-y divide-[var(--o-border-subtle)]">
          {copy.items.map((item) => (
            <div key={item.href} className="py-5 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-base font-medium leading-7">{item.title}</dt>
              <dd className="mt-2 text-sm leading-6 text-[var(--o-text-secondary)] sm:mt-0">
                <p>{item.body}</p>
                <LocalizedLink href={item.href} locale={locale} className="mt-1 inline-flex min-h-11 items-center gap-2 text-[var(--o-text)] underline decoration-[var(--o-border)] underline-offset-4 hover:text-[var(--o-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--o-warm)]">
                  {item.link}<ArrowRightIcon className="size-4" />
                </LocalizedLink>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
