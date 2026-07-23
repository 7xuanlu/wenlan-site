import {
  TRANSLATED_LOCALES,
  type TranslatedLocale,
} from "./locales";

export const TRANSLATED_LEARN_SLUGS = [
  "distilled-wiki-pages-ai-memory",
  "source-backed-wiki-pages-ai-work",
  "wenlan-vs-obsidian-ai-memory",
] as const;

export type TranslatedLearnSlug = (typeof TRANSLATED_LEARN_SLUGS)[number];

export const TRANSLATED_LEARN_SLUGS_BY_LOCALE = {
  "zh-TW": [
    "distilled-wiki-pages-ai-memory",
    "source-backed-wiki-pages-ai-work",
    "wenlan-vs-obsidian-ai-memory",
  ],
  "zh-CN": [
    "distilled-wiki-pages-ai-memory",
    "source-backed-wiki-pages-ai-work",
  ],
} as const satisfies Record<
  TranslatedLocale,
  readonly TranslatedLearnSlug[]
>;

const translatedLearnSlugSet = new Set<string>(TRANSLATED_LEARN_SLUGS);

export function isTranslatedLearnSlug(
  slug: string,
): slug is TranslatedLearnSlug {
  return translatedLearnSlugSet.has(slug);
}

export function translatedLocalesForLearnSlug(
  slug: string,
): readonly TranslatedLocale[] {
  if (!isTranslatedLearnSlug(slug)) return [];

  return TRANSLATED_LOCALES.filter((locale) =>
    TRANSLATED_LEARN_SLUGS_BY_LOCALE[locale].some(
      (candidate) => candidate === slug,
    ),
  );
}

export function translatedLearnStaticParams() {
  return TRANSLATED_LEARN_SLUGS.flatMap((slug) =>
    translatedLocalesForLearnSlug(slug).map((locale) => ({ locale, slug })),
  );
}
