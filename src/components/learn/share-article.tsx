"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/locales";

// Native share links only — no third-party scripts, per the site's no-tracking policy.
const labels: Record<Locale, { share: string; copy: string; copied: string }> = {
  en: { share: "Share this guide", copy: "Copy link", copied: "Copied" },
  "zh-TW": { share: "分享這篇指南", copy: "複製連結", copied: "已複製" },
  "zh-CN": { share: "分享这篇指南", copy: "复制链接", copied: "已复制" },
};

type ShareArticleProps = {
  locale: Locale;
  url: string;
  title: string;
};

export function ShareArticle({ locale, url, title }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);
  const text = labels[locale];
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      id: "x",
      label: "X",
      href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      id: "threads",
      label: "Threads",
      href: `https://www.threads.com/intent/post?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section aria-label={text.share} className="border-t border-[var(--o-border-subtle)] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--o-text-muted)] uppercase">
          {text.share}
        </p>
        <div className="flex flex-wrap gap-3">
          {targets.map((target) => (
            <a
              key={target.id}
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-semibold text-[var(--o-text-secondary)] transition-colors hover:border-[var(--o-warm)] hover:text-[var(--o-warm)]"
            >
              {target.label}
            </a>
          ))}
          <button
            type="button"
            onClick={copyLink}
            className="rounded-xl border border-[var(--o-border)] px-5 py-3 text-sm font-semibold text-[var(--o-text-secondary)] transition-colors hover:border-[var(--o-warm)] hover:text-[var(--o-warm)]"
          >
            {copied ? text.copied : text.copy}
          </button>
        </div>
      </div>
    </section>
  );
}
