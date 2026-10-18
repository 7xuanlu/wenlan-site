"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  htmlLangByLocale,
  hreflangByLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/i18n/locales";
import { localizedHrefForLocale } from "@/i18n/navigation";
import { GlobeIcon, CheckIcon } from "@/components/icons";

// Static prerender of the English home reports its pathname as "/index".
function normalizePathname(pathname: string): string {
  return pathname.replace(/\/index$/, "") || "/";
}

// A page with no translation would localize back to itself, so the menu item
// would reload the same English page. Send the reader to the nearest
// translated parent instead (the Learn or Docs index, or the home page) and
// say so in the menu.
function switchTarget(targetLocale: Locale, href: string): { href: string; exact: boolean } {
  if (targetLocale === "en") {
    return { href: localizedHrefForLocale(targetLocale, href), exact: true };
  }
  let path = href;
  for (;;) {
    const localized = localizedHrefForLocale(targetLocale, path);
    if (localized !== path || path === "/") {
      return { href: localized, exact: path === href };
    }
    path = path.replace(/\/[^/]*$/, "") || "/";
  }
}

const untranslatedHints = {
  en: "",
  "zh-TW": "此頁尚無中文版",
  "zh-CN": "此页暂无中文版",
} as const satisfies Record<Locale, string>;

const localeLabels = {
  en: "English",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
} as const satisfies Record<Locale, string>;

const switcherLabels = {
  en: "Change language",
  "zh-TW": "切換語言",
  "zh-CN": "切换语言",
} as const satisfies Record<Locale, string>;

export function LanguageSwitcher({
  locale,
  href: hrefProp,
  placement = "down",
}: {
  locale: Locale;
  // Omit to switch locale on the current page instead of a fixed one. Paths
  // with no translation resolve back to the unprefixed URL, so the link is
  // always real rather than a localized 404.
  href?: string;
  placement?: "down" | "up";
}) {
  const pathname = usePathname();
  const href = normalizePathname(hrefProp ?? pathname ?? "/");
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (details && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <details
      ref={detailsRef}
      className="group/language relative"
      onKeyDown={(event) => {
        const details = detailsRef.current;
        if (event.key !== "Escape" || !details?.open) return;
        event.preventDefault();
        // Close this disclosure before an enclosing mobile navigation panel.
        event.stopPropagation();
        details.open = false;
        summaryRef.current?.focus();
      }}
    >
      <summary
        ref={summaryRef}
        aria-label={`${switcherLabels[locale]}: ${localeLabels[locale]}`}
        title={switcherLabels[locale]}
        className="site-utility-icon flex size-11 shrink-0 cursor-pointer list-none items-center justify-center rounded-lg text-sm text-[var(--o-text-secondary)] transition-colors duration-150 hover:bg-[var(--o-card-bg)] hover:text-[var(--o-text)] group-open/language:bg-[var(--o-surface)] group-open/language:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)] [&::-webkit-details-marker]:hidden"
      >
        <GlobeIcon className="size-5" />
      </summary>

      <div
        className={`absolute z-50 w-48 rounded-lg border border-[var(--o-border)] bg-[var(--o-bg-alt)] p-1.5 shadow-[var(--o-shadow-media)] ${
          placement === "up"
            ? // The footer row stacks on phones, leaving the switcher at the
              // left edge, where a right-anchored menu would open off-screen.
              "bottom-[calc(100%+0.375rem)] left-0 sm:left-auto sm:right-0"
            : "top-[calc(100%+0.375rem)] right-0"
        }`}
      >
        {SUPPORTED_LOCALES.map((targetLocale) => {
          const active = targetLocale === locale;
          const target = switchTarget(targetLocale, href);

          return (
            <a
              key={targetLocale}
              href={target.href}
              lang={htmlLangByLocale[targetLocale]}
              hrefLang={hreflangByLocale[targetLocale]}
              aria-current={active ? "true" : undefined}
              className={`flex min-h-11 items-center justify-between gap-3 rounded-md px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--o-warm)] ${
                active
                  ? "bg-[var(--o-surface)] font-medium text-[var(--o-text)]"
                  : "text-[var(--o-text-secondary)] hover:bg-[var(--o-surface)] hover:text-[var(--o-text)]"
              }`}
            >
              <span className="flex flex-col items-start">
                <span>{localeLabels[targetLocale]}</span>
                {!target.exact && (
                  <span className="text-[11px] leading-tight text-[var(--o-text-muted)]">
                    {untranslatedHints[targetLocale]}
                  </span>
                )}
              </span>
              {active && <CheckIcon className="size-4 shrink-0 text-[var(--o-warm)]" />}
            </a>
          );
        })}
      </div>
    </details>
  );
}
