import type { Locale } from "@/i18n/locales";
import { knowledgeNodes, type KnowledgeNode } from "./knowledge-story-data";
import { knowledgeNodesEn } from "./knowledge-story-data-en";

export { knowledgeIds } from "./knowledge-story-ids";

/**
 * The sample library exists in two languages. English visitors read the
 * English rendering; zh-TW and zh-CN keep the captured Traditional Chinese
 * library, exactly as before. Both share ids, kinds, coordinates and links.
 */
export type KnowledgeLanguage = "zh" | "en";

export const knowledgeLanguage = (locale: Locale): KnowledgeLanguage => (locale === "en" ? "en" : "zh");

const nodeSets: Record<KnowledgeLanguage, KnowledgeNode[]> = { zh: knowledgeNodes, en: knowledgeNodesEn };
export const knowledgeNodeIndexes: Record<KnowledgeLanguage, Map<string, KnowledgeNode>> = {
  zh: new Map(knowledgeNodes.map((node) => [node.id, node])),
  en: new Map(knowledgeNodesEn.map((node) => [node.id, node])),
};

export const knowledgeNodesFor = (locale: Locale) => nodeSets[knowledgeLanguage(locale)];
export const knowledgeNodeIndexFor = (locale: Locale) => knowledgeNodeIndexes[knowledgeLanguage(locale)];
