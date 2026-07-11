"use client";

import { track } from "@vercel/analytics";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/i18n/locales";
import { localizedHrefForLocale } from "@/i18n/navigation";

export type AnalyticsEventName =
  | "Get Started Click"
  | "GitHub Click"
  | "Learn Article Click"
  | "Setup Path Click";

export type AnalyticsPlacement =
  | "home-hero"
  | "home-footer"
  | "learn-search-path"
  | "learn-grid"
  | "learn-footer"
  | "learn-article"
  | "docs-get-started";

export type AnalyticsContext =
  | "home"
  | "concepts"
  | "comparisons"
  | "workflows"
  | "setup";

type TrackingProps = {
  readonly eventName: AnalyticsEventName;
  readonly placement: AnalyticsPlacement;
  readonly locale: Locale;
  readonly context: AnalyticsContext;
};

type TrackedLinkProps = Omit<ComponentProps<typeof NextLink>, "href" | "onClick"> &
  TrackingProps & {
    readonly href: string;
  };

export function TrackedLink({
  eventName,
  placement,
  locale,
  context,
  ...props
}: TrackedLinkProps) {
  return (
    <NextLink
      {...props}
      onClick={() => track(eventName, { placement, locale, context })}
    />
  );
}

type TrackedLocalizedLinkProps = Omit<TrackedLinkProps, "href"> & {
  readonly href: string;
};

export function TrackedLocalizedLink({
  href,
  locale,
  ...props
}: TrackedLocalizedLinkProps) {
  return (
    <TrackedLink
      {...props}
      href={localizedHrefForLocale(locale, href)}
      locale={locale}
    />
  );
}
