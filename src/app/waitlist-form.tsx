"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/components/tracked-link";
import type { WaitlistContent } from "@/i18n/content";
import type { Locale } from "@/i18n/locales";
import {
  currentSignupAttribution,
  type SignupAttribution,
} from "@/lib/signup-attribution";
import { joinWaitlist } from "./actions";

const emptyAttribution: SignupAttribution = {
  signup_landing_path: "/",
  signup_referrer_host: "direct",
  signup_utm_source: "",
  signup_utm_medium: "",
  signup_utm_campaign: "",
};

export function WaitlistForm({
  copy,
  locale,
}: {
  copy: WaitlistContent;
  locale: Locale;
}) {
  const [state, action, isPending] = useActionState(joinWaitlist, null);
  const [attribution, setAttribution] =
    useState<SignupAttribution>(emptyAttribution);
  const signupTracked = useRef(false);
  const errorMessage =
    state && !state.success
      ? (copy.errors[state.errorCode] ?? copy.fallbackError)
      : null;

  useEffect(() => {
    setAttribution(currentSignupAttribution());
  }, []);

  useEffect(() => {
    if (!state?.success || signupTracked.current) return;
    signupTracked.current = true;
    trackAnalyticsEvent({
      eventName: "waitlist_signup",
      placement: "home-footer",
      locale,
      context: "home",
    });
  }, [locale, state]);

  if (state?.success) {
    return (
      <div className="animate-fade-up flex items-center gap-3 rounded-lg border border-[var(--o-sage)]/20 bg-[var(--o-sage)]/5 px-6 py-3.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--o-sage)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span className="text-sm text-[var(--o-sage)]">
          {copy.successMessage}
        </span>
      </div>
    );
  }

  return (
    <form action={action} className="w-full max-w-md">
      <input type="hidden" name="locale" value={locale} />
      {Object.entries(attribution).map(([name, value]) => (
        <input
          key={name}
          type="hidden"
          name={name}
          value={value}
        />
      ))}
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={copy.emailPlaceholder}
          disabled={isPending}
          className="flex-1 rounded-lg border border-[var(--o-border)] bg-[var(--o-input-bg)] px-4 py-3 text-sm text-[var(--o-text)] placeholder-[var(--o-text-muted)] outline-none transition-colors duration-150 focus:border-[var(--o-warm)]/40 focus:bg-[var(--o-input-focus-bg)] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-lg bg-gradient-to-r from-[var(--o-warm)] to-[var(--o-warm-hover)] px-5 py-3 text-sm font-semibold text-[var(--o-btn-text)] transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
              {copy.pendingLabel}
            </span>
          ) : (
            copy.submitLabel
          )}
        </button>
      </div>
      {errorMessage && (
        <p className="mt-2 text-xs text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
