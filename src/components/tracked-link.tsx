"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/i18n/locales";
import { localizedHrefForLocale } from "@/i18n/navigation";

export type AnalyticsEventName =
  | "get_started_click"
  | "github_outbound"
  | "learn_article_click"
  | "setup_path_click"
  | "waitlist_signup";

export type AnalyticsPlacement =
  | "home-hero"
  | "home-acquisition"
  | "home-download"
  | "home-footer"
  | "download-page"
  | "learn-search-path"
  | "learn-grid"
  | "learn-footer"
  | "learn-article"
  | "docs-get-started"
  | "docs-article";

export type AnalyticsContext =
  | "home"
  | "concepts"
  | "comparisons"
  | "workflows"
  | "setup";

type AnalyticsDestinationCategory = "email" | "github" | "learn" | "setup";

type AnalyticsEventData = {
  readonly placement: AnalyticsPlacement;
  readonly locale: Locale;
  readonly context: AnalyticsContext;
  readonly destination_category: AnalyticsDestinationCategory;
};

declare global {
  interface Window {
    umami?: {
      track: (eventName: AnalyticsEventName, data: AnalyticsEventData) => void;
    };
  }
}

const destinationCategoryByEvent: Record<
  AnalyticsEventName,
  AnalyticsDestinationCategory
> = {
  get_started_click: "setup",
  github_outbound: "github",
  learn_article_click: "learn",
  setup_path_click: "setup",
  waitlist_signup: "email",
};

type TrackingProps = {
  readonly eventName: AnalyticsEventName;
  readonly placement: AnalyticsPlacement;
  readonly locale: Locale;
  readonly context: AnalyticsContext;
};

export function trackAnalyticsEvent({
  eventName,
  placement,
  locale,
  context,
}: TrackingProps) {
  window.umami?.track(eventName, {
    placement,
    locale,
    context,
    destination_category: destinationCategoryByEvent[eventName],
  });
}

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
      onClick={() =>
        trackAnalyticsEvent({ eventName, placement, locale, context })
      }
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
