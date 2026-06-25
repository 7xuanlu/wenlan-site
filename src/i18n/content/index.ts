import { type Locale } from "../locales";
import { enContent } from "./en";
import { zhCNContent } from "./zh-CN";
import { zhTWContent } from "./zh-TW";
import type { CoreContent } from "./schema";

export { enContent } from "./en";
export { zhCNContent } from "./zh-CN";
export { zhTWContent } from "./zh-TW";
export type {
  AboutContent,
  ContentLeaf,
  ContentUnit,
  CoreContent,
  CoreTextSection,
  ContentStatus,
  DocsContent,
  FooterContent,
  GetStartedContent,
  HomeContent,
  LinkContent,
  NotFoundContent,
  SeoContent,
} from "./schema";

export const coreContentByLocale = {
  en: enContent,
  "zh-TW": zhTWContent,
  "zh-CN": zhCNContent,
} as const satisfies Record<Locale, CoreContent>;

export const localizedContentByLocale = coreContentByLocale;

export function getCoreContent(locale: Locale): CoreContent {
  return coreContentByLocale[locale];
}
