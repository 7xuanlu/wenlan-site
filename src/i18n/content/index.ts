import { type Locale } from "../locales";
import { enContent } from "./en";
import { zhCNContent } from "./zh-CN";
import { zhTWContent } from "./zh-TW";
import type { CoreContent } from "./schema";

export { enContent } from "./en";
export { zhCNContent } from "./zh-CN";
export { zhTWContent } from "./zh-TW";
export type {
  ContentLeaf,
  ContentUnit,
  CoreContent,
  CoverageStatus,
  FooterContent,
  NotFoundContent,
  SeoContent,
} from "./schema";

export const localizedContentByLocale = {
  en: enContent,
  "zh-TW": zhTWContent,
  "zh-CN": zhCNContent,
} as const satisfies Record<Locale, CoreContent>;
