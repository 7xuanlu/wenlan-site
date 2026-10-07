"use client";

import history from "./site-events-v1-history.json";

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    __wenlanGoogleAnalytics?: RuntimeState;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export const GA_CONSENT_KEY = "wenlan-google-analytics-consent";

type Consent = "granted" | "denied";
type EventData = {
  placement: string;
  locale: string;
  context: string;
  destination_category: string;
  asset_id?: string;
  release_tag?: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
  __wenlanGoogleAnalytics?: RuntimeState;
};

type RuntimeState = {
  id: string;
  lastPath: string | null;
  pageReferrer: string;
  disabled: boolean;
};

const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
const PRODUCTION_ID = "G-2ZEZML4P1M";
const runtimeByWindow = new WeakMap<Window, RuntimeState>();

const EVENT_NAMES = new Set([
  "get_started_click", "github_outbound", "learn_article_click", "setup_path_click",
  "waitlist_signup", "video_play_click", "waitlist_error", "scenario_select",
  "comparison_select", "product_view_select", "product_image_open", "source_expand",
]);
const PLACEMENTS = new Set([
  "home-hero", "home-acquisition", "home-download", "home-footer", "home-demo",
  "download-page", "learn-search-path", "learn-grid", "learn-footer", "learn-article",
  "docs-get-started", "docs-article", "home-scenario", "home-comparison", "home-product-views",
]);
const CONTEXTS = new Set(["home", "concepts", "comparisons", "workflows", "setup"]);
const LOCALES = new Set(["en", "zh-CN", "zh-TW"]);
const DESTINATIONS = new Set(["email", "github", "learn", "setup", "video", "example", "comparison", "product"]);
const PUBLIC_PATHS = new Set(Object.keys(history.paths));
const ASSET_IDS = new Set(history.assetIds);

function privacySignal(windowRef: AnalyticsWindow): boolean {
  const nav = windowRef.navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav?.doNotTrack === "1" || nav?.doNotTrack === "yes" || nav?.globalPrivacyControl === true;
}

function storedConsent(windowRef: AnalyticsWindow): Consent | null {
  try {
    const value = windowRef.localStorage.getItem(GA_CONSENT_KEY);
    if (!value) return null;
    const [consent, expiresAt, ...rest] = value.split(":");
    if (rest.length || (consent !== "granted" && consent !== "denied")) return null;
    const expires = Number(expiresAt);
    if (!Number.isFinite(expires) || expires <= Date.now()) {
      windowRef.localStorage.removeItem(GA_CONSENT_KEY);
      return null;
    }
    return consent;
  } catch {
    return "denied";
  }
}

export function readGoogleAnalyticsConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const windowRef = window as unknown as AnalyticsWindow;
  if (privacySignal(windowRef)) return "denied";
  return storedConsent(windowRef);
}

function allowedEnvironment(windowRef: AnalyticsWindow, id: string): boolean {
  if (!/^G-[A-Z0-9]+$/.test(id)) return false;
  const origin = windowRef.location?.origin;
  if (origin === "https://wenlan.app") return true;
  const local = ["http://localhost", "http://127.0.0.1"].some((prefix) => origin?.startsWith(`${prefix}:`) || origin === prefix);
  return local && process.env.NEXT_PUBLIC_GA_DEBUG === "1" && id !== PRODUCTION_ID;
}

function knownPage(windowRef: AnalyticsWindow, pathname: string): string | null {
  if (typeof pathname !== "string" || !pathname.startsWith("/") || pathname.includes("?") || pathname.includes("#")) return null;
  if (!PUBLIC_PATHS.has(pathname)) return null;
  const origin = windowRef.location.origin;
  return `${origin}${pathname}`;
}

function referrerOrigin(windowRef: AnalyticsWindow): string | undefined {
  try {
    const referrer = windowRef.document.referrer;
    if (!referrer) return undefined;
    const url = new URL(referrer);
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

function queueGtag(windowRef: AnalyticsWindow): void {
  windowRef.dataLayer = windowRef.dataLayer ?? [];
  if (!windowRef.gtag) {
    windowRef.gtag = function gtag() {
      windowRef.dataLayer!.push(arguments);
    } as AnalyticsWindow["gtag"];
  }
}

function sendConsentUpdate(windowRef: AnalyticsWindow, consent: Consent): void {
  if (!windowRef.gtag) return;
  try {
    windowRef.gtag("consent", "update", {
      analytics_storage: consent,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  } catch { /* Withdrawal still disables tracking and clears cookies. */ }
}

function clearGoogleAnalyticsCookies(windowRef: AnalyticsWindow): void {
  try {
    const names = windowRef.document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0]);
    const gaCookie = /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)|^_gac_/;
    const hostname = windowRef.location.hostname;
    for (const name of names) {
      if (!name || !gaCookie.test(name)) continue;
      windowRef.document.cookie = `${name}=; Max-Age=0; path=/`;
      if (hostname === "wenlan.app" || hostname.endsWith(".wenlan.app")) {
        windowRef.document.cookie = `${name}=; Max-Age=0; path=/; domain=wenlan.app`;
        windowRef.document.cookie = `${name}=; Max-Age=0; path=/; domain=.wenlan.app`;
      }
    }
  } catch {
    // Cookie deletion is best effort; gtag is disabled immediately above.
  }
}

export function setGoogleAnalyticsConsent(consent: Consent): void {
  if (typeof window === "undefined" || (consent !== "granted" && consent !== "denied")) return;
  const windowRef = window as unknown as AnalyticsWindow;
  if (consent === "granted" && privacySignal(windowRef)) consent = "denied";
  let persisted = false;
  try {
    windowRef.localStorage.setItem(GA_CONSENT_KEY, `${consent}:${Date.now() + CONSENT_TTL_MS}`);
    persisted = true;
  } catch {
    // Storage failure is fail-closed when consent is read later.
  }
  const state = runtimeByWindow.get(windowRef);
  if (state) {
    const effectiveConsent = consent === "granted" && persisted ? "granted" : "denied";
    windowRef[`ga-disable-${state.id}`] = effectiveConsent === "denied";
    state.disabled = effectiveConsent === "denied";
    sendConsentUpdate(windowRef, effectiveConsent);
    if (effectiveConsent === "denied") clearGoogleAnalyticsCookies(windowRef);
  }
}

/** Immediately apply an externally changed opt-out without writing storage. */
export function disableGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  const windowRef = window as unknown as AnalyticsWindow;
  const state = runtimeByWindow.get(windowRef);
  if (!state) return;
  windowRef[`ga-disable-${state.id}`] = true;
  state.disabled = true;
  sendConsentUpdate(windowRef, "denied");
  clearGoogleAnalyticsCookies(windowRef);
}

export function initGoogleAnalytics(id: string): boolean {
  if (typeof window === "undefined") return false;
  const windowRef = window as unknown as AnalyticsWindow;
  try {
    if (!allowedEnvironment(windowRef, id) || readGoogleAnalyticsConsent() !== "granted") {
      disableGoogleAnalytics();
      return false;
    }

    const existing = runtimeByWindow.get(windowRef);
    if (existing) return existing.id === id;

    const currentPage = knownPage(windowRef, windowRef.location.pathname);
    if (!currentPage) return false;

    const state: RuntimeState = { id, lastPath: null, pageReferrer: referrerOrigin(windowRef) ?? "", disabled: false };
    runtimeByWindow.set(windowRef, state);
    windowRef.__wenlanGoogleAnalytics = state;
    windowRef[`ga-disable-${id}`] = false;
    queueGtag(windowRef);
    windowRef.gtag!("js", new Date());
    windowRef.gtag!("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    sendConsentUpdate(windowRef, "granted");
    windowRef.gtag!("set", "ads_data_redaction", true);
    windowRef.gtag!("config", id, {
      send_page_view: false,
      page_location: currentPage,
      page_referrer: referrerOrigin(windowRef) ?? "",
      cookie_expires: 15552000,
      cookie_update: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true,
    });

    const script = windowRef.document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.dataset.wenlanGoogleAnalytics = id;
    windowRef.document.head.appendChild(script);
    return true;
  } catch {
    const state = runtimeByWindow.get(windowRef);
    if (state) {
      runtimeByWindow.delete(windowRef);
      windowRef[`ga-disable-${state.id}`] = true;
      delete windowRef.__wenlanGoogleAnalytics;
    }
    return false;
  }
}

function eligibleState(): { windowRef: AnalyticsWindow; state: RuntimeState } | null {
  if (typeof window === "undefined") return null;
  const windowRef = window as unknown as AnalyticsWindow;
  const state = runtimeByWindow.get(windowRef);
  if (!state) return null;
  try {
    if (!allowedEnvironment(windowRef, state.id) || readGoogleAnalyticsConsent() !== "granted") {
      if (!state.disabled) disableGoogleAnalytics();
      return null;
    }
  } catch {
    if (!state.disabled) disableGoogleAnalytics();
    return null;
  }
  if (state.disabled || windowRef[`ga-disable-${state.id}`]) return null;
  return { windowRef, state };
}

export function sendGooglePageView(pathname: string): boolean {
  const eligible = eligibleState();
  if (!eligible) return false;
  try {
    const { windowRef, state } = eligible;
    const location = knownPage(windowRef, pathname);
    if (!location || state.lastPath === pathname) return false;
    const pageReferrer = state.lastPath
      ? knownPage(windowRef, state.lastPath)
      : referrerOrigin(windowRef);
    windowRef.gtag!("config", state.id, {
      send_page_view: false,
      page_location: location,
      page_referrer: pageReferrer ?? "",
    });
    windowRef.gtag!("event", "page_view", {
      page_location: location,
      page_referrer: pageReferrer ?? "",
    });
    state.lastPath = pathname;
    state.pageReferrer = pageReferrer ?? "";
    return true;
  } catch {
    return false;
  }
}

export function sendGoogleAnalyticsEvent(name: string, data: EventData): boolean {
  const eligible = eligibleState();
  try {
    if (!eligible || !EVENT_NAMES.has(name)) return false;
    if (!PLACEMENTS.has(data.placement) || !LOCALES.has(data.locale) || !CONTEXTS.has(data.context) || !DESTINATIONS.has(data.destination_category)) return false;
    if (data.asset_id !== undefined && !ASSET_IDS.has(data.asset_id)) return false;
    if (data.release_tag !== undefined && !/^v\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?$/.test(data.release_tag)) return false;

    const page = knownPage(eligible.windowRef, eligible.windowRef.location.pathname);
    if (!page) return false;
    const referrer = eligible.state.pageReferrer;
    const params = {
      placement: data.placement,
      locale: data.locale,
      context: data.context,
      destination_category: data.destination_category,
      ...(data.asset_id ? { asset_id: data.asset_id } : {}),
      ...(data.release_tag ? { release_tag: data.release_tag } : {}),
      page_location: page,
      page_referrer: referrer ?? "",
    };
    eligible.windowRef.gtag!("event", name, params);
    return true;
  } catch {
    return false;
  }
}
