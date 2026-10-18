import type { Locale } from "@/i18n/locales";

export type DemoVideo = { videoUrl: string; posterUrl: string };
const languages = { en: "en", "zh-TW": "zh-Hant", "zh-CN": "zh-Hans" } as const satisfies Record<Locale, string>;

// R131 shared media. Versioned paths keep previous films out of caches.
export function demoVideoForLocale(locale: Locale): DemoVideo {
  const language = languages[locale];
  return {
    videoUrl: `https://media.wenlan.app/media/r131/Wenlan-R131-${language}-16x9-AB.mp4`,
    posterUrl: `https://media.wenlan.app/media/r131/Wenlan-R131-${language}-poster.jpg`,
  };
}
