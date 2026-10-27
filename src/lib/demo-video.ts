import type { Locale } from "@/i18n/locales";

export type DemoVideo = { videoUrl: string; posterUrl: string };

// R144 launch film (1:44). It is English only, so every locale plays the same file.
// Served from the shared R2 media host; versioned paths keep previous films out of caches.
export function demoVideoForLocale(_locale: Locale): DemoVideo {
  return {
    videoUrl: "https://media.wenlan.app/media/r144/Wenlan-R144-en-16x9.mp4",
    posterUrl: "https://media.wenlan.app/media/r144/Wenlan-R144-en-poster.jpg",
  };
}
