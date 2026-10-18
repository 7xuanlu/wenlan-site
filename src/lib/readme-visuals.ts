import type { Locale } from "@/i18n/locales";

const suffixes = { en: "", "zh-TW": "-zh-Hant", "zh-CN": "-zh-Hans" } satisfies Record<Locale, string>;
const visuals = {
  graph: { name: "wenlan-personal-graph", width: 3600, height: 2488 },
  updates: { name: "wenlan-updates-history", width: 4800, height: 2160 },
  cover: { name: "wenlan-personal-knowledge", width: 6000, height: 3600 },
} as const;

const updateRevisions = {"en": "b8674e6f37f2", "zh-TW": "bdbf253296b9", "zh-CN": "0bf421529d9e"} satisfies Record<Locale, string>;

// Localized shared compositions; see public/images/home/readme/provenance.json.
export function readmeVisualForLocale(locale: Locale, kind: keyof typeof visuals) {
  const { name, width, height } = visuals[kind];
  const revision = kind === "updates" ? `.${updateRevisions[locale]}` : "";
  return { src: `/images/home/readme/${name}${suffixes[locale]}${revision}.png`, width, height };
}
