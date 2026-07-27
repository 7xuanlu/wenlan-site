import assert from "node:assert/strict";
import test from "node:test";
import { TrackedLink } from "../src/components/tracked-link.tsx";

const cases = [
  ["github_outbound", "github"],
  ["get_started_click", "setup"],
  ["learn_article_click", "learn"],
  ["setup_path_click", "setup"],
];

test("TrackedLink sends normalized bounded events to Umami only", (t) => {
  const previousWindow = globalThis.window;
  const calls = [];
  globalThis.window = {
    umami: {
      track: (...args) => calls.push(args),
    },
  };
  t.after(() => {
    globalThis.window = previousWindow;
  });

  for (const [eventName, destinationCategory] of cases) {
    const link = TrackedLink({
      href: eventName === "github_outbound" ? "https://github.com/7xuanlu/wenlan" : "/learn",
      eventName,
      placement: "learn-article",
      locale: "en",
      context: "comparisons",
      children: eventName,
    });

    link.props.onClick();

    assert.deepEqual(calls.at(-1), [
      eventName,
      {
        placement: "learn-article",
        locale: "en",
        context: "comparisons",
        destination_category: destinationCategory,
      },
    ]);
  }
});

test("TrackedLink click remains safe when Umami is unavailable", (t) => {
  const previousWindow = globalThis.window;
  globalThis.window = {};
  t.after(() => {
    globalThis.window = previousWindow;
  });

  const link = TrackedLink({
    href: "https://github.com/7xuanlu/wenlan",
    eventName: "github_outbound",
    placement: "home-footer",
    locale: "zh-TW",
    context: "home",
    children: "GitHub",
  });

  assert.doesNotThrow(() => link.props.onClick());
});

test("download-page placement preserves the bounded outbound event shape", (t) => {
  const previousWindow = globalThis.window;
  const calls = [];
  globalThis.window = {
    umami: {
      track: (...args) => calls.push(args),
    },
  };
  t.after(() => {
    globalThis.window = previousWindow;
  });

  const link = TrackedLink({
    href: "https://github.com/7xuanlu/wenlan/releases/download/v0.15.0/example.zip",
    eventName: "github_outbound",
    placement: "download-page",
    locale: "zh-TW",
    context: "setup",
    children: "下載 Windows x64",
  });

  link.props.onClick();
  assert.deepEqual(calls, [
    [
      "github_outbound",
      {
        placement: "download-page",
        locale: "zh-TW",
        context: "setup",
        destination_category: "github",
      },
    ],
  ]);
});
