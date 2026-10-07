"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { googleAnalyticsCopy } from "@/i18n/google-analytics";
import {
  GA_CONSENT_KEY,
  disableGoogleAnalytics,
  initGoogleAnalytics,
  readGoogleAnalyticsConsent,
  sendGooglePageView,
  setGoogleAnalyticsConsent,
} from "@/lib/google-analytics";

const OPEN_PREFERENCES = "wenlan-open-analytics-preferences";

function privacySignal() {
  return navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" ||
    !!(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}

export function AnalyticsSettingsButton({ locale }: { locale: Locale }) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return null;
  return <button type="button" className="cursor-pointer text-xs text-[var(--o-text-muted)] underline underline-offset-4 hover:text-[var(--o-warm)]" onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES))}>
    {googleAnalyticsCopy[locale].settings}
  </button>;
}

export function GoogleAnalytics({ locale, measurementId }: { locale: Locale; measurementId: string }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const copy = googleAnalyticsCopy[locale];

  useEffect(() => {
    function sync() {
      setChoice(readGoogleAnalyticsConsent());
      setBlocked(privacySignal());
    }
    sync();
    setVisible(readGoogleAnalyticsConsent() === null);
    const open = () => { sync(); setVisible(true); };
    const storage = (event: StorageEvent) => {
      if (event.key === GA_CONSENT_KEY || event.key === null) {
        // A revoked choice in another tab must also stop this document's tag.
        if (readGoogleAnalyticsConsent() !== "granted") {
          disableGoogleAnalytics();
          window.location.reload();
        } else sync();
      }
    };
    window.addEventListener(OPEN_PREFERENCES, open);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES, open);
      window.removeEventListener("storage", storage);
    };
  }, []);

  useEffect(() => {
    if (choice === "granted" && initGoogleAnalytics(measurementId)) {
      sendGooglePageView(pathname);
    }
  }, [choice, measurementId, pathname]);

  function choose(value: "granted" | "denied") {
    setGoogleAnalyticsConsent(value);
    setChoice(readGoogleAnalyticsConsent());
    setVisible(false);
    // Remove the loaded Google runtime on withdrawal, after disabling it.
    if (choice === "granted" && value === "denied") window.location.reload();
  }

  if (!visible) return null;
  return (
    <section aria-label={copy.title} className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm rounded-xl border border-[var(--o-border)] bg-[var(--o-bg)] p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:bottom-4">
      <h2 className="text-sm font-medium text-[var(--o-text)]">{copy.title}</h2>
      <p className="mt-1.5 text-sm leading-5 text-[var(--o-text-secondary)]">{blocked ? copy.disabled : copy.body}</p>
      <a href="/docs/data-and-privacy#public-website-analytics" className="mt-1.5 inline-block text-xs leading-5 text-[var(--o-text-secondary)] underline underline-offset-4">{copy.privacy}</a>
      <div className="mt-3 flex flex-wrap gap-2">
        {!blocked && <>
          <button type="button" onClick={() => choose("granted")} className="min-h-9 cursor-pointer rounded-lg bg-[var(--o-text)] px-3 py-1.5 text-xs font-semibold text-[var(--o-bg)] press-wenlan focus-wenlan">{copy.allow}</button>
          <button type="button" onClick={() => choose("denied")} className="min-h-9 cursor-pointer rounded-lg border border-[var(--o-border)] px-3 py-1.5 text-xs text-[var(--o-text)] transition-colors hover:bg-[var(--o-surface)] focus-wenlan">{copy.deny}</button>
        </>}
        {(blocked || choice !== null) && <button type="button" onClick={() => setVisible(false)} className="min-h-9 cursor-pointer px-3 py-1.5 text-xs text-[var(--o-text-secondary)] underline underline-offset-4">{copy.close}</button>}
      </div>
    </section>
  );
}
