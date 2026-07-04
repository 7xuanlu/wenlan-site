import {
  DEFAULT_LOCALE,
  TRANSLATED_LOCALES,
  hreflangByLocale,
  type Locale,
  type TranslatedLocale,
} from "./locales";

export const SITE_URL = "https://wenlan.app";

export const CORE_TRANSLATED_PATHS = [
  "/",
  "/about",
  "/docs",
  "/docs/get-started",
] as const;

type CoreTranslatedPath = (typeof CORE_TRANSLATED_PATHS)[number];

export const TRANSLATED_LEARN_PATHS = [
  "/learn/distilled-wiki-pages-ai-memory",
  "/learn/source-backed-wiki-pages-ai-work",
] as const;

type TranslatedLearnPath = (typeof TRANSLATED_LEARN_PATHS)[number];

const CORE_TRANSLATED_PATH_SET = new Set<string>(CORE_TRANSLATED_PATHS);
const TRANSLATED_LEARN_PATH_SET = new Set<string>(TRANSLATED_LEARN_PATHS);
const TRANSLATED_PATH_SET = new Set<string>([
  ...CORE_TRANSLATED_PATHS,
  ...TRANSLATED_LEARN_PATHS,
]);

const localePrefixes = {
  "zh-TW": "/zh-TW",
  "zh-CN": "/zh-CN",
} as const satisfies Record<TranslatedLocale, string>;

function normalizePathname(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  return withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function stripLocalePrefix(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const normalizedPathname = normalizePathname(pathname);

  for (const locale of TRANSLATED_LOCALES) {
    const prefix = localePrefixes[locale];
    if (normalizedPathname === prefix) {
      return { locale, pathname: "/" };
    }
    if (normalizedPathname.startsWith(`${prefix}/`)) {
      return {
        locale,
        pathname: normalizePathname(normalizedPathname.slice(prefix.length)),
      };
    }
  }

  return { locale: DEFAULT_LOCALE, pathname: normalizedPathname };
}

export function isTranslatedPath(locale: Locale, pathname: string): boolean {
  return locale !== DEFAULT_LOCALE && TRANSLATED_PATH_SET.has(normalizePathname(pathname));
}

export function localizePath(locale: Locale, pathname: string): string {
  const { pathname: unprefixedPathname } = stripLocalePrefix(pathname);

  if (!isTranslatedPath(locale, unprefixedPathname)) {
    return unprefixedPathname;
  }

  const prefix = localePrefixes[locale as TranslatedLocale];
  return unprefixedPathname === "/" ? prefix : `${prefix}${unprefixedPathname}`;
}

export function canonicalUrl(locale: Locale, pathname: string): string {
  const localizedPath = localizePath(locale, pathname);
  return `${SITE_URL}${localizedPath === "/" ? "" : localizedPath}`;
}

export function alternateUrls(pathname: string): Record<string, string> {
  const { pathname: unprefixedPathname } = stripLocalePrefix(pathname);
  const englishUrl = canonicalUrl(DEFAULT_LOCALE, unprefixedPathname);

  if (!TRANSLATED_PATH_SET.has(unprefixedPathname)) {
    return {
      [hreflangByLocale.en]: englishUrl,
      "x-default": englishUrl,
    };
  }

  return {
    [hreflangByLocale.en]: englishUrl,
    [hreflangByLocale["zh-TW"]]: canonicalUrl("zh-TW", unprefixedPathname),
    [hreflangByLocale["zh-CN"]]: canonicalUrl("zh-CN", unprefixedPathname),
    "x-default": englishUrl,
  };
}

export function isCoreTranslatedPath(pathname: string): pathname is CoreTranslatedPath {
  return CORE_TRANSLATED_PATH_SET.has(normalizePathname(pathname));
}

export function isTranslatedLearnPath(pathname: string): pathname is TranslatedLearnPath {
  return TRANSLATED_LEARN_PATH_SET.has(normalizePathname(pathname));
}
