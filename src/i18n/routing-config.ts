import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./locales";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "zh-TW": "/zh-TW",
      "zh-CN": "/zh-CN",
    },
  },
  localeDetection: false,
});
