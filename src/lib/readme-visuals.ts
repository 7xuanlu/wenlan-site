import type { Locale } from "@/i18n/locales";

const suffixes = { en: "", "zh-TW": "-zh-Hant", "zh-CN": "-zh-Hans" } satisfies Record<Locale, string>;
const visuals = {
  graph: { name: "wenlan-personal-graph", width: 3600, height: 2488 },
  updates: { name: "wenlan-updates-history", width: 4800, height: 2310 },
  cover: { name: "wenlan-personal-knowledge", width: 6000, height: 3600 },
} as const;

const updateRevisions = {"en": "5aabcdbdb9a3", "zh-TW": "d7ea3f24fa11", "zh-CN": "405fefec34f1"} satisfies Record<Locale, string>;

// Localized shared compositions; see public/images/home/readme/provenance.json.
export function readmeVisualForLocale(locale: Locale, kind: keyof typeof visuals) {
  const { name, width, height } = visuals[kind];
  const revision = kind === "updates" ? `.${updateRevisions[locale]}` : "";
  return { src: `/images/home/readme/${name}${suffixes[locale]}${revision}.png`, width, height };
}
