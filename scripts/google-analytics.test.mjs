import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import {
  disableGoogleAnalytics,
  GA_CONSENT_KEY,
  initGoogleAnalytics,
  readGoogleAnalyticsConsent,
  sendGoogleAnalyticsEvent,
  sendGooglePageView,
  setGoogleAnalyticsConsent,
} from "../src/lib/google-analytics.ts";

const PRODUCTION_ID = "G-2ZEZML4P1M";

test("GA pathname allowlist covers every current public sitemap page", async () => {
  const module = await import("../src/app/sitemap.ts");
  const sitemap = typeof module.default === "function" ? module.default : module.default.default;
  const history = JSON.parse(await readFile(new URL("../src/lib/site-events-v1-history.json", import.meta.url), "utf8"));
  const missing = sitemap().map(({ url }) => new URL(url).pathname).filter((path) => !Object.hasOwn(history.paths, path));
  assert.deepEqual(missing, [], "update the bounded public path registry when adding a public route");
});

function browser({ origin = "https://wenlan.app", pathname = "/", referrer = "https://search.example/query?private=yes", dnt, gpc, storageFailure = false } = {}) {
  const values = new Map();
  const scripts = [];
  const cookieWrites = [];
  const dataLayer = [];
  const location = new URL(`${origin}${pathname}`);
  const localStorage = {
    getItem(key) { if (storageFailure) throw new Error("storage blocked"); return values.get(key) ?? null; },
    setItem(key, value) { if (storageFailure) throw new Error("storage blocked"); values.set(key, value); },
    removeItem(key) { if (storageFailure) throw new Error("storage blocked"); values.delete(key); },
  };
  const windowRef = {
    localStorage,
    location,
    navigator: { doNotTrack: dnt, globalPrivacyControl: gpc },
    dataLayer,
    document: {
      referrer,
      cookie: "_ga=abc; _ga_123=def; _gid=ghi; _gcl_au=keep",
      head: { appendChild: (script) => scripts.push(script) },
      createElement: () => ({ dataset: {} }),
    },
  };
  Object.defineProperty(windowRef.document, "cookie", {
    get() { return "_ga=abc; _ga_123=def; _gid=ghi; _gcl_au=keep"; },
    set(value) { cookieWrites.push(value); },
  });
  return { windowRef, values, scripts, cookieWrites, dataLayer };
}

function withWindow(t, setup) {
  const previous = globalThis.window;
  const fixture = setup();
  globalThis.window = fixture.windowRef;
  t.after(() => { globalThis.window = previous; });
  return fixture;
}

function calls(dataLayer) {
  return dataLayer.map((entry) => Array.from(entry));
}

const validEvent = {
  placement: "home-acquisition",
  locale: "en",
  context: "concepts",
  destination_category: "learn",
};

test("consent is absent by default, stored for 180 days, and expires", (t) => {
  const { windowRef, values } = withWindow(t, () => browser());
  assert.equal(readGoogleAnalyticsConsent(), null);
  setGoogleAnalyticsConsent("granted");
  assert.equal(readGoogleAnalyticsConsent(), "granted");
  const [, expires] = values.get(GA_CONSENT_KEY).split(":");
  assert.ok(Math.abs(Number(expires) - (Date.now() + 180 * 24 * 60 * 60 * 1000)) < 100);
  values.set(GA_CONSENT_KEY, `granted:${Date.now() - 1}`);
  assert.equal(readGoogleAnalyticsConsent(), null);
  assert.equal(values.has(GA_CONSENT_KEY), false);
  assert.ok(windowRef);
});

test("missing, blocked storage, DNT, and GPC all fail closed", (t) => {
  withWindow(t, () => browser());
  assert.equal(readGoogleAnalyticsConsent(), null);
  const blocked = withWindow(t, () => browser({ storageFailure: true }));
  assert.equal(readGoogleAnalyticsConsent(), "denied");
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), false);
  assert.equal(blocked.scripts.length, 0);

  const dnt = withWindow(t, () => browser({ dnt: "1" }));
  dnt.values.set(GA_CONSENT_KEY, `granted:${Date.now() + 10000}`);
  assert.equal(readGoogleAnalyticsConsent(), "denied");
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), false);

  const gpc = withWindow(t, () => browser({ gpc: true }));
  gpc.values.set(GA_CONSENT_KEY, `granted:${Date.now() + 10000}`);
  assert.equal(readGoogleAnalyticsConsent(), "denied");
  setGoogleAnalyticsConsent("granted");
  assert.equal(readGoogleAnalyticsConsent(), "denied");
});

test("production id loads only on canonical production origin", (t) => {
  const preview = withWindow(t, () => browser({ origin: "https://preview.wenlan.app" }));
  setGoogleAnalyticsConsent("granted");
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), false);
  assert.equal(preview.scripts.length, 0);

  const wrongId = withWindow(t, () => browser());
  setGoogleAnalyticsConsent("granted");
  assert.equal(initGoogleAnalytics("G-OTHER123"), true);
  assert.equal(wrongId.scripts.length, 1);
});

test("local origin requires debug opt-in and a nonproduction measurement id", (t) => {
  const local = withWindow(t, () => browser({ origin: "http://localhost:3000" }));
  setGoogleAnalyticsConsent("granted");
  assert.equal(initGoogleAnalytics("G-LOCAL123"), false);
  assert.equal(local.scripts.length, 0);
  process.env.NEXT_PUBLIC_GA_DEBUG = "1";
  t.after(() => { delete process.env.NEXT_PUBLIC_GA_DEBUG; });
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), false);
  assert.equal(initGoogleAnalytics("G-LOCAL123"), true);
  assert.equal(local.scripts.length, 1);
});

test("initialization is singleton and queues denied ads plus bounded page config", (t) => {
  const { windowRef, scripts, dataLayer } = withWindow(t, () => browser({ pathname: "/learn" }));
  setGoogleAnalyticsConsent("granted");
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), true);
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), true);
  assert.equal(initGoogleAnalytics("G-OTHER123"), false);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].async, true);
  assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${PRODUCTION_ID}`);

  const queued = calls(dataLayer);
  const defaultConsent = queued.find(([, action]) => action === "default")[2];
  assert.deepEqual(defaultConsent, {
    analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied",
    ad_personalization: "denied", wait_for_update: 500,
  });
  const config = queued.find(([kind]) => kind === "config")[2];
  assert.deepEqual(config, {
    send_page_view: false,
    page_location: "https://wenlan.app/learn",
    page_referrer: "https://search.example",
    cookie_expires: 15552000,
    cookie_update: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ads_data_redaction: true,
  });
  assert.equal(windowRef[`ga-disable-${PRODUCTION_ID}`], false);
  assert.ok(dataLayer.every((entry) => Object.prototype.toString.call(entry) === "[object Arguments]"));
});

test("page views strip query/hash, allow only known paths, and dedupe consecutive path", (t) => {
  const { windowRef, dataLayer } = withWindow(t, () => browser({ pathname: "/" }));
  setGoogleAnalyticsConsent("granted");
  initGoogleAnalytics(PRODUCTION_ID);
  assert.equal(sendGooglePageView("/"), true);
  windowRef.location.pathname = "/learn/choose-ai-knowledge-base-tool";
  assert.equal(sendGooglePageView("/learn/choose-ai-knowledge-base-tool"), true);
  assert.equal(sendGooglePageView("/learn/choose-ai-knowledge-base-tool"), false);
  assert.equal(sendGooglePageView("/learn/private?email=person%40example.com"), false);
  assert.equal(sendGooglePageView("/not-a-route#private"), false);
  const views = calls(dataLayer).filter(([, name]) => name === "page_view");
  assert.equal(views.length, 2);
  assert.deepEqual(views[0][2], {
    page_location: "https://wenlan.app/",
    page_referrer: "https://search.example",
  });
  assert.equal(views[1][2].page_referrer, "https://wenlan.app/");
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), true);
  const action = calls(dataLayer).find(([, name]) => name === "learn_article_click");
  assert.equal(action[2].page_referrer, "https://wenlan.app/", "action retains the page's referrer instead of referring to itself");
  assert.doesNotMatch(JSON.stringify(views), /private|email=|query\?/i);
});

test("events require consent and finite event names and fields", (t) => {
  const { dataLayer } = withWindow(t, () => browser());
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), false);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), false);
  setGoogleAnalyticsConsent("granted");
  initGoogleAnalytics(PRODUCTION_ID);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), true);
  assert.equal(sendGoogleAnalyticsEvent("custom", validEvent), false);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", { ...validEvent, placement: "person@example.com" }), false);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", { ...validEvent, asset_id: "../../secret" }), false);
  assert.equal(sendGoogleAnalyticsEvent("github_outbound", { ...validEvent, asset_id: "macos-arm64", release_tag: "v1.2.3" }), true);
  const events = calls(dataLayer).filter(([kind]) => kind === "event");
  assert.deepEqual(events, [
    ["event", "learn_article_click", { ...validEvent, page_location: "https://wenlan.app/", page_referrer: "https://search.example" }],
    ["event", "github_outbound", { ...validEvent, asset_id: "macos-arm64", release_tag: "v1.2.3", page_location: "https://wenlan.app/", page_referrer: "https://search.example" }],
  ]);
});

test("revoke immediately disables tracking, clears only GA cookies, and regrant works", (t) => {
  const { windowRef, cookieWrites, dataLayer } = withWindow(t, () => browser());
  setGoogleAnalyticsConsent("granted");
  initGoogleAnalytics(PRODUCTION_ID);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), true);
  setGoogleAnalyticsConsent("denied");
  assert.equal(windowRef[`ga-disable-${PRODUCTION_ID}`], true);
  assert.ok(cookieWrites.length > 0);
  assert.ok(cookieWrites.every((value) => /^_(?:ga(?:_|=)|gid=|gat(?:_|=)|gac_)/.test(value)));
  assert.ok(cookieWrites.every((value) => value.includes("path=/")));
  assert.equal(cookieWrites.some((value) => value.startsWith("_gcl_au")), false);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), false);
  setGoogleAnalyticsConsent("granted");
  assert.equal(windowRef[`ga-disable-${PRODUCTION_ID}`], false);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), true);
  const events = calls(dataLayer).filter(([kind]) => kind === "event");
  assert.equal(events.length, 2);

  disableGoogleAnalytics();
  assert.equal(windowRef[`ga-disable-${PRODUCTION_ID}`], true);
  assert.equal(sendGoogleAnalyticsEvent("learn_article_click", validEvent), false);
  assert.equal(readGoogleAnalyticsConsent(), "granted", "cross-tab disable does not rewrite storage");
});

test("expired consent disables an already loaded tag on the next navigation", (t) => {
  const { windowRef, values } = withWindow(t, () => browser());
  setGoogleAnalyticsConsent("granted");
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), true);
  values.set(GA_CONSENT_KEY, `granted:${Date.now() - 1}`);
  assert.equal(initGoogleAnalytics(PRODUCTION_ID), false);
  assert.equal(windowRef[`ga-disable-${PRODUCTION_ID}`], true);
});
