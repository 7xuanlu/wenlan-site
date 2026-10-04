"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/app/theme-toggle";
import { GitHubLogoIcon } from "@/components/icons";
import type { HomeContent } from "@/i18n/content/schema";
import { LocalizedLink } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";

const menuCopy = {
  en: { nav: "Main navigation", menu: "Menu", appearance: "Theme" },
  "zh-TW": { nav: "主要導覽", menu: "選單", appearance: "外觀主題" },
  "zh-CN": { nav: "主导航", menu: "菜单", appearance: "外观主题" },
} as const satisfies Record<Locale, { nav: string; menu: string; appearance: string }>;

const visibleLinkIds = new Set(["download", "docs", "learn", "about", "github"]);

export function HomeMobileNav({
  locale,
  nav,
}: {
  locale: Locale;
  nav: HomeContent["nav"];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copy = menuCopy[locale];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const links = nav.links.filter((link) => visibleLinkIds.has(link.id));

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="home-mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-md text-xs font-medium text-[var(--o-text-secondary)] transition-colors hover:bg-[var(--o-card-bg)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]"
      >
        {copy.menu}
      </button>

      <div
        id="home-mobile-navigation"
        role="group"
        aria-label={copy.nav}
        hidden={!open}
        className="fixed top-16 right-6 z-50 max-h-[calc(100dvh-5rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-2 shadow-[var(--o-shadow-media)]"
      >
          <div className="flex flex-col">
            {links.map((link) =>
              link.id === "github" ? (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={nav.githubAriaLabel}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm text-[var(--o-text-secondary)] transition-colors hover:bg-[var(--o-surface)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)]"
                >
                  <GitHubLogoIcon className="size-4" />
                  {link.label}
                </a>
              ) : (
                <LocalizedLink
                  key={link.id}
                  href={link.href}
                  locale={locale}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-md px-3 text-sm text-[var(--o-text-secondary)] transition-colors hover:bg-[var(--o-surface)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)]"
                >
                  {link.label}
                </LocalizedLink>
              ),
            )}
          </div>

          <div className="mt-1 flex min-h-12 items-center justify-between border-t border-[var(--o-border-subtle)] px-3 pt-1">
            <span className="text-sm text-[var(--o-text-secondary)]">{copy.appearance}</span>
            <div className="flex size-11 items-center justify-center [&>button]:!size-11">
              <ThemeToggle
                darkLabel={nav.themeToggle.darkLabel}
                lightLabel={nav.themeToggle.lightLabel}
              />
            </div>
          </div>
      </div>
    </div>
  );
}
