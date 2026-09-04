import type { Locale } from "@/i18n/locales";

export type DemoVideo = {
  videoId: string;
  embedUrl: string;
  posterUrl: string;
};

const DEMO_VIDEO_IDS = {
  en: "1K_Zjogwxrw",
  "zh-TW": "bTGvS8wg4rQ",
  "zh-CN": "Ie3FvmDo4Ho",
} as const satisfies Record<Locale, string>;

export function demoVideoForLocale(locale: Locale): DemoVideo {
  const videoId = DEMO_VIDEO_IDS[locale];

  return {
    videoId,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
    posterUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  };
}
