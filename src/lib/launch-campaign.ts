import type { Locale } from "@/i18n/locales";

// Frozen to this launch, not the moving download release. Existing posted URLs
// must remain measurable after a later maintenance release changes the site.
export const LAUNCH_RELEASE_TAG = "v0.17.7";
// Link preparation only: presence here never authorizes publishing to a channel.
export const LAUNCH_CHANNELS = {
  x: "social", threads: "social", reddit: "community", producthunt: "launch",
  hackernews: "community", linkedin: "social", wechat: "social", zhihu: "community",
  xiaohongshu: "social", github: "referral", email: "email", directory: "referral",
  youtube: "video", bilibili: "video",
} as const;
export type LaunchChannel = keyof typeof LAUNCH_CHANNELS;
export const LAUNCH_LOCALES = ["en", "zh-TW", "zh-CN"] as const;

export function launchCampaign(locale: Locale) {
  return `wenlan-${LAUNCH_RELEASE_TAG}-launch-${locale}-demo`;
}

export function launchUrl(channel: LaunchChannel, locale: Locale) {
  const url = new URL(locale === "en" ? "/" : `/${locale}/`, "https://wenlan.app");
  url.searchParams.set("utm_source", channel);
  url.searchParams.set("utm_medium", LAUNCH_CHANNELS[channel]);
  url.searchParams.set("utm_campaign", launchCampaign(locale));
  return url.href;
}

// Only values from our finite link registry reach anonymous event properties.
// Arbitrary URL parameters, referrer URLs and email never leave this function.
export function launchEventProperties(source: string, medium: string, campaign: string) {
  if (!Object.hasOwn(LAUNCH_CHANNELS, source) ||
      LAUNCH_CHANNELS[source as LaunchChannel] !== medium ||
      !LAUNCH_LOCALES.some(locale => launchCampaign(locale) === campaign)) return {};
  return { campaign_source: source, campaign_medium: medium, campaign };
}
