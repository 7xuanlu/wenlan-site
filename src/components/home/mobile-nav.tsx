"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/app/theme-toggle";
import type { HomeContent } from "@/i18n/content/schema";
import { LocalizedLink } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import { LanguageSwitcher } from "@/components/language-switcher";
import { resourceLinks } from "@/components/resource-navigation";
import { CloseIcon, MenuIcon, GitHubLogoIcon } from "@/components/icons";

const menuCopy = {
  en: { nav: "Main navigation", menu: "Menu", appearance: "Preferences" },
  "zh-TW": { nav: "主要導覽", menu: "選單", appearance: "偏好設定" },
  "zh-CN": { nav: "主导航", menu: "菜单", appearance: "偏好设置" },
} as const satisfies Record<Locale, { nav: string; menu: string; appearance: string }>;

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
      if (event.defaultPrevented || event.key !== "Escape" || !open) return;
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

  const links = resourceLinks(locale, nav);
  const githubLink = nav.links.find((link) => link.id === "github");

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-center md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={copy.menu}
        aria-expanded={open}
        aria-controls="home-mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-lg text-[var(--o-text-secondary)] transition-colors duration-150 hover:bg-[var(--o-card-bg)] hover:text-[var(--o-text)] aria-expanded:bg-[var(--o-surface)] aria-expanded:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]"
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      <div
        id="home-mobile-navigation"
        role="group"
        aria-label={copy.nav}
        hidden={!open}
        className="fixed top-16 right-6 md:absolute md:top-[calc(100%+0.625rem)] md:right-0 md:w-52 z-50 max-h-[calc(100dvh-5rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-lg bg-[var(--o-bg-alt)] p-2 shadow-[var(--o-shadow-media)]"
      >
          <div className="flex flex-col">
            {links.map((link) => (
                <LocalizedLink
                  key={link.id}
                  href={link.href}
                  locale={locale}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-md px-3 text-sm text-[var(--o-text-secondary)] transition-colors hover:bg-[var(--o-surface)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)]"
                >
                  {link.label}
                </LocalizedLink>
              ))}
            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-2.5 rounded-md px-3 text-sm text-[var(--o-text-secondary)] transition-colors hover:bg-[var(--o-surface)] hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)] sm:hidden"
              >
                <GitHubLogoIcon className="size-5 shrink-0" />{githubLink.label}
              </a>
            )}
          </div>

          <div className="mt-3 flex min-h-12 items-center justify-between px-3">
            <span className="text-sm text-[var(--o-text-secondary)]">{copy.appearance}</span>
            <div className="flex items-center gap-1">
              <LanguageSwitcher locale={locale} />
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
