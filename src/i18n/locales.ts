export const DEFAULT_LOCALE = "en";

export const SUPPORTED_LOCALES = ["en", "zh-TW", "zh-CN"] as const;

export const TRANSLATED_LOCALES = ["zh-TW", "zh-CN"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type TranslatedLocale = (typeof TRANSLATED_LOCALES)[number];

export const htmlLangByLocale = {
  en: "en",
  "zh-TW": "zh-Hant",
  "zh-CN": "zh-Hans",
} as const satisfies Record<Locale, string>;

export const hreflangByLocale = {
  en: "en-US",
  "zh-TW": "zh-TW",
  "zh-CN": "zh-CN",
} as const satisfies Record<Locale, string>;

export const openGraphLocaleByLocale = {
  en: "en_US",
  "zh-TW": "zh_TW",
  "zh-CN": "zh_CN",
} as const satisfies Record<Locale, string>;

export const LOCALE_CONFIG = {
  en: {
    htmlLang: htmlLangByLocale.en,
    hreflang: hreflangByLocale.en,
    openGraphLocale: openGraphLocaleByLocale.en,
  },
  "zh-TW": {
    htmlLang: htmlLangByLocale["zh-TW"],
    hreflang: hreflangByLocale["zh-TW"],
    openGraphLocale: openGraphLocaleByLocale["zh-TW"],
  },
  "zh-CN": {
    htmlLang: htmlLangByLocale["zh-CN"],
    hreflang: hreflangByLocale["zh-CN"],
    openGraphLocale: openGraphLocaleByLocale["zh-CN"],
  },
} as const satisfies Record<
  Locale,
  {
    htmlLang: string;
    hreflang: string;
    openGraphLocale: string;
  }
>;

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
