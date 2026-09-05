import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { enContent } from "../src/i18n/content/en.ts";
import { zhCNContent } from "../src/i18n/content/zh-CN.ts";
import { zhTWContent } from "../src/i18n/content/zh-TW.ts";

const homeSource = await readFile(new URL("../src/app/_pages/home.tsx", import.meta.url), "utf8");

const expectedVideos = {
  en: "4r3_rJVjBwI",
  "zh-TW": "NPJMRityir4",
  "zh-CN": "HGh7br0SPFI",
};

test("each homepage locale resolves its assigned YouTube demo", async () => {
  const { demoVideoForLocale } = await import("../src/lib/demo-video.ts");

  for (const [locale, videoId] of Object.entries(expectedVideos)) {
    assert.deepEqual(demoVideoForLocale(locale), {
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
      posterUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    });
  }
});

test("the homepage consumes the locale mapping without the legacy demo", () => {
  assert.match(homeSource, /import \{ demoVideoForLocale \} from "@\/lib\/demo-video"/);
  assert.match(homeSource, /const demoVideo = demoVideoForLocale\(locale\)/);
  assert.match(homeSource, /embedUrl=\{demoVideo\.embedUrl\}/);
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
      en: { title: "Wenlan demo", playLabel: "Play Wenlan demo" },
      "zh-TW": { title: "Wenlan 產品示範", playLabel: "播放 Wenlan 產品示範" },
      "zh-CN": { title: "Wenlan 产品演示", playLabel: "播放 Wenlan 产品演示" },
    },
  );
});
