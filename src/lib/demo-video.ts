import type { Locale } from "@/i18n/locales";

export type DemoVideo = {
  videoId: string;
  embedUrl: string;
  posterUrl: string;
};

const DEMO_VIDEO_IDS = {
  en: "4r3_rJVjBwI",
  "zh-TW": "NPJMRityir4",
  "zh-CN": "HGh7br0SPFI",
} as const satisfies Record<Locale, string>;

export function demoVideoForLocale(locale: Locale): DemoVideo {
  const videoId = DEMO_VIDEO_IDS[locale];

  return {
    videoId,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
    posterUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  };
}
