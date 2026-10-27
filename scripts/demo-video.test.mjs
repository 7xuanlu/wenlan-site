import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { enContent } from "../src/i18n/content/en.ts";
import { zhCNContent } from "../src/i18n/content/zh-CN.ts";
import { zhTWContent } from "../src/i18n/content/zh-TW.ts";

const homeSource = await readFile(new URL("../src/app/_pages/home.tsx", import.meta.url), "utf8");

test("every homepage locale plays the English R144 launch film and its poster", async () => {
  const { demoVideoForLocale } = await import("../src/lib/demo-video.ts");

  for (const locale of ["en", "zh-TW", "zh-CN"]) {
    assert.deepEqual(demoVideoForLocale(locale), {
      videoUrl: "/media/r144/Wenlan-R144-en-16x9.mp4",
      posterUrl: "/media/r144/Wenlan-R144-en-poster.jpg",
    });
  }
});

test("the homepage consumes the locale mapping without the legacy demo", () => {
  assert.match(homeSource, /import \{ demoVideoForLocale \} from "@\/lib\/demo-video"/);
  assert.match(homeSource, /const demoVideo = demoVideoForLocale\(locale\)/);
  assert.match(homeSource, /videoUrl=\{demoVideo\.videoUrl\}/);
  assert.match(homeSource, /posterUrl=\{demoVideo\.posterUrl\}/);
  assert.doesNotMatch(homeSource, /k37gjWVPHwI/);
});

test("demo titles and play labels stay localized and short", () => {
  assert.deepEqual(
    {
      en: enContent.home.content.demo,
      "zh-TW": zhTWContent.home.content.demo,
      "zh-CN": zhCNContent.home.content.demo,
    },
    {
      en: { title: "Wenlan introduction video", playLabel: "Play Wenlan introduction video" },
      "zh-TW": { title: "Wenlan 產品介紹", playLabel: "播放 Wenlan 產品介紹" },
      "zh-CN": { title: "Wenlan 产品介绍", playLabel: "播放 Wenlan 产品介绍" },
    },
  );
});


// Native-media lifecycle tests: no browser simulation or playback claims.
const { mountNativeDemoPlayer } = await import("../src/lib/native-demo-player.ts");
class FakeVideo extends EventTarget {
  readyState = 0;
  error = null;
  pauses = 0;
  loads = 0;
  removed = [];
  playResult = Promise.resolve();
  play() { return this.playResult; }
  pause() { this.pauses += 1; }
  load() { this.loads += 1; }
  removeAttribute(name) { this.removed.push(name); }
}

test("closing releases video/audio and ignores late ready events", () => {
  const video = new FakeVideo();
  let ready = 0;
  const dispose = mountNativeDemoPlayer(video, "/test.mp4", { onReady: () => ready++, onError: assert.fail });
  video.dispatchEvent(new Event("loadeddata"));
  assert.equal(ready, 1);
  dispose();
  video.dispatchEvent(new Event("loadeddata"));
  assert.equal(ready, 1);
  assert.equal(video.pauses, 1);
  assert.equal(video.loads, 1);
  assert.deepEqual(video.removed, ["src"]);
});

test("autoplay refusal waits for actual data; native controls remain usable", async () => {
  const video = new FakeVideo();
  video.playResult = Promise.reject(Object.assign(new Error("user gesture required"), { name: "NotAllowedError" }));
  let ready = 0;
  const dispose = mountNativeDemoPlayer(video, "/test.mp4", { onReady: () => ready++, onError: assert.fail });
  await Promise.resolve();
  assert.equal(ready, 0);
  video.dispatchEvent(new Event("loadeddata"));
  assert.equal(ready, 1);
  dispose();
});

test("a hung request times out and pauses; a late load cannot hide the retry state", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const video = new FakeVideo();
  const errors = [];
  const dispose = mountNativeDemoPlayer(video, "/test.mp4", { onReady: () => assert.fail("late success"), onError: (reason) => errors.push(reason) });
  t.mock.timers.tick(20000);
  assert.deepEqual(errors, ["media-load-timeout"]);
  assert.equal(video.pauses, 1);
  video.dispatchEvent(new Event("loadeddata"));
  dispose();
});

test("failed playback is reported and a fresh player can retry", async () => {
  const video = new FakeVideo();
  video.playResult = Promise.reject(new Error("unsupported codec"));
  const errors = [];
  const dispose = mountNativeDemoPlayer(video, "/test.mp4", { onReady: assert.fail, onError: (reason) => errors.push(reason) });
  await Promise.resolve();
  assert.deepEqual(errors, ["media-play-failed"]);
  dispose();
  const retry = new FakeVideo();
  let ready = false;
  const disposeRetry = mountNativeDemoPlayer(retry, "/test.mp4", { onReady: () => { ready = true; }, onError: assert.fail });
  retry.dispatchEvent(new Event("loadeddata"));
  assert.equal(ready, true);
  disposeRetry();
});

test("late rejected playback after closing does not update state", async () => {
  const video = new FakeVideo();
  let reject;
  video.playResult = new Promise((_, rejectPromise) => { reject = rejectPromise; });
  const dispose = mountNativeDemoPlayer(video, "/test.mp4", { onReady: assert.fail, onError: assert.fail });
  dispose();
  reject(new Error("aborted after close"));
  await Promise.resolve();
});

test("the initial server render contains no video or poster download", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { DemoVideo } = await import("../src/app/demo-video.tsx");
  const html = renderToStaticMarkup(createElement(DemoVideo, {
    primaryAction: null, sectionTitle: "Watch video", videoUrl: "/media/r131/test.mp4",
    posterUrl: "/media/r131/poster.jpg", playLabel: "Play demo", title: "Demo", locale: "en", caption: "",
  }));
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-selected="false" aria-controls="demo-player"/);
  assert.doesNotMatch(html, /<video|<img|src=|poster=/);
});


test("autoplay denial cannot cancel a stalled-source timeout", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const video = new FakeVideo();
  video.playResult = Promise.reject(Object.assign(new Error("blocked"), { name: "NotAllowedError" }));
  const errors = [];
  const dispose = mountNativeDemoPlayer(video, "/stalled.mp4", { onReady: assert.fail, onError: (reason) => errors.push(reason) });
  await Promise.resolve();
  t.mock.timers.tick(20000);
  assert.deepEqual(errors, ["media-load-timeout"]);
  dispose();
});

test("listeners are attached before the source starts loading", () => {
  class CachedVideo extends FakeVideo {
    set src(value) { this.source = value; this.dispatchEvent(new Event("loadeddata")); }
  }
  const video = new CachedVideo();
  let ready = 0;
  const dispose = mountNativeDemoPlayer(video, "/cached.mp4", { onReady: () => ready++, onError: assert.fail });
  assert.equal(ready, 1);
  assert.equal(video.source, "/cached.mp4");
  dispose();
});
