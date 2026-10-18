import type { Locale } from "@/i18n/locales";
import { demoCopy, demoRevisions, getDemoResources, inspectorCopy, type DemoResource } from "./wiki-demo-data";
import { wikiInteractionData } from "./wiki-interaction-data";
import { getPersonalLibrary, type PersonalNote } from "./wiki-personal-data";

export const libraryCopy = {
  en: { library: "My knowledge", savedAt: "Snapshot saved", projects: "Project notes", snapshot: "Saved page", unknownAuthor: "Not recorded", snapshotDetail: "Current page from the fictional personal library. Earlier revisions are not included in this preview.", previous: "Earlier version", current: "Current version", revisionContent: "Version content", revisionSources: "Sources in this version", noEarlier: "No earlier version is included in this preview.", noSources: "No attached sources for this note." },
  "zh-TW": { library: "我的知識庫", savedAt: "資料保存時間", projects: "專案筆記", snapshot: "保存的頁面", unknownAuthor: "未記錄", snapshotDetail: "個人知識庫示範資料中的目前頁面；此預覽未收錄更早的版本。", previous: "較早版本", current: "目前版本", revisionContent: "此版本內容", revisionSources: "此版本來源", noEarlier: "此預覽未收錄更早版本。", noSources: "這篇筆記尚未附加來源。" },
  "zh-CN": { library: "我的知识库", savedAt: "数据保存时间", projects: "项目笔记", snapshot: "保存的页面", unknownAuthor: "未记录", snapshotDetail: "个人知识库演示数据中的当前页面；此预览未收录更早的版本。", previous: "较早版本", current: "当前版本", revisionContent: "此版本内容", revisionSources: "此版本来源", noEarlier: "此预览未收录更早版本。", noSources: "这篇笔记尚未附加来源。" },
} as const;

export type DemoRevision = { version: number; at: string; timeLabel: string; author: string; summary: string; detail: string; sourceIds: readonly string[]; body?: string; title?: string };
export type DemoNote = PersonalNote & { revisions: DemoRevision[] };
type RecoveredRevisionData = { version: number; at: string; summary: string; detail: string; sourceIds: readonly string[]; body: string; title?: string };

// Historical page bodies are copied from read-only projection recovery snapshots
// in the fictional personal-library fixture. English and Simplified Chinese are
// localized renderings of the same Traditional Chinese source snapshot.
const recoveredRevisions: Record<Locale, Record<string, RecoveredRevisionData>> = {
  "zh-TW": {
    "page-agent-loop": {
      version: 5,
      at: "2026-10-13T01:26:41.583814+00:00",
      summary: "加入可重用的決定與記憶連結。",
      detail: "較早版本保留了「下次不用重新想一遍」一節，以及三則記憶連結；目前版本縮短了結尾，讓決定與來源更直接。",
      body: `# Agent Loop\n\n一次排版修復，如何變成下次能直接用的經驗。\n\n## 問題是怎麼發現的\n\n打開右側欄後，文章的句首向左跳動。各頁面分別計算寬度，修好 Wiki，卻漏掉 Memory 和 Topic。\n\n## 留下可重用的決定\n\n固定正文的左側起點。側欄開啟時只縮小右側寬度，讓文字自然換行；四種閱讀頁共用同一個容器。\n\n這項決定連到 [[產品原則]]，檢查方式寫進 [[介面驗收]]，再由 [[工作交接]] 帶到下一次修改。\n\n## 下次不用重新想一遍\n\n調整閱讀版面時，先取回這次的決定和驗收方式，再開始改動。\n\n**這次留下的記憶**\n\n[側欄不推移正文](#demo:mem_8434be7eda44) · [共用閱讀容器](#demo:mem_a5229d9e467d) · [側欄開關也要驗收](#demo:mem_a0a619f5e4cb)`,
      sourceIds: ["mem_8434be7eda44", "mem_a5229d9e467d", "mem_a0a619f5e4cb"],
    },
    "ai-work-style": {
      version: 3,
      at: "2026-10-13T01:42:01.098952+00:00",
      summary: "補上與 Agent Loop、產品原則和介面驗收的連結。",
      detail: "這個版本的正文標題是「AI 協作」，並已連到三則記憶。",
      title: "AI 協作",
      body: `# AI 協作\n\n從 [[Agent Loop]] 留下的具體決定開始，不必每次重建脈絡。\n\n閱讀排版的修正記在 [[產品原則]]，檢查流程放在 [[介面驗收]]。`,
      sourceIds: ["mem_8434be7eda44", "mem_a5229d9e467d", "mem_a0a619f5e4cb"],
    },
  },
  en: {
    "page-agent-loop": {
      version: 5,
      at: "2026-10-13T01:26:41.583814+00:00",
      summary: "Added a reusable decision and links to its memories.",
      detail: "This earlier version kept a ‘No need to rethink it next time’ section and three memory links. The current version shortens the ending so the decision and sources are more direct.",
      body: `# Agent Loop\n\nHow a layout fix became reusable knowledge for next time.\n\n## How the issue surfaced\n\nOpening the right sidebar shifted the first line of the article to the left. Each page calculated its width separately: Wiki was fixed, while Memory and Topic were missed.\n\n## Keep a decision that can be reused\n\nKeep the article's left edge fixed. When the sidebar opens, reduce only the available width on the right so text wraps naturally; use one shared container across all four reading views.\n\nConnect this decision to [[產品原則]], record the review steps in [[介面驗收]], and carry them into the next change with [[工作交接]].\n\n## No need to rethink it next time\n\nBefore changing the reading layout, retrieve this decision and its review steps.\n\n**Memories kept from this work**\n\n[Keep the article in place](#demo:mem_8434be7eda44) · [One reading container for four views](#demo:mem_a5229d9e467d) · [Check the sidebar in review](#demo:mem_a0a619f5e4cb)`,
      sourceIds: ["mem_8434be7eda44", "mem_a5229d9e467d", "mem_a0a619f5e4cb"],
    },
    "ai-work-style": {
      version: 3,
      at: "2026-10-13T01:42:01.098952+00:00",
      summary: "Added links to Agent Loop, product principles, and interface review.",
      detail: "The page heading in this version was ‘AI collaboration’; it already linked to three memories.",
      title: "AI collaboration",
      body: `# AI collaboration\n\nStart from the specific decision recorded in [[Agent Loop]], so the project context does not need to be rebuilt every time.\n\nThe reading-layout fix is recorded in [[產品原則]], and the review steps are in [[介面驗收]].`,
      sourceIds: ["mem_8434be7eda44", "mem_a5229d9e467d", "mem_a0a619f5e4cb"],
    },
  },
  "zh-CN": {
    "page-agent-loop": {
      version: 5,
      at: "2026-10-13T01:26:41.583814+00:00",
      summary: "加入可重复使用的决定与记忆链接。",
      detail: "较早版本保留了「下次不用重新想一遍」一节，以及三则记忆链接；当前版本缩短了结尾，让决定与来源更直接。",
      body: `# Agent Loop\n\n一次排版修复，如何变成下次能直接使用的经验。\n\n## 问题是怎么发现的\n\n打开右侧栏后，文章的句首向左跳动。各页面分别计算宽度，修好 Wiki，却漏掉 Memory 和 Topic。\n\n## 留下可重复使用的决定\n\n固定正文左侧的起点。侧栏打开时只缩小右侧宽度，让文字自然换行；四种阅读页共用同一个容器。\n\n这项决定连接到 [[產品原則]]，检查方式写进 [[介面驗收]]，再由 [[工作交接]] 带到下一次修改。\n\n## 下次不用重新想一遍\n\n调整阅读版面时，先取回这次的决定和验收方式，再开始修改。\n\n**这次留下的记忆**\n\n[侧栏不推移正文](#demo:mem_8434be7eda44) · [四种页面共用阅读容器](#demo:mem_a5229d9e467d) · [验收包含侧栏开关](#demo:mem_a0a619f5e4cb)`,
      sourceIds: ["mem_8434be7eda44", "mem_a5229d9e467d", "mem_a0a619f5e4cb"],
    },
    "ai-work-style": {
      version: 3,
      at: "2026-10-13T01:42:01.098952+00:00",
      summary: "补上与 Agent Loop、产品原则和界面验收的链接。",
      detail: "这个版本的正文标题是「AI 协作」，并已连接到三则记忆。",
      title: "AI 协作",
      body: `# AI 协作\n\n从 [[Agent Loop]] 留下的具体决定开始，不必每次重建上下文。\n\n阅读排版的修正记在 [[產品原則]]，检查流程放在 [[介面驗收]]。`,
      sourceIds: ["mem_8434be7eda44", "mem_a5229d9e467d", "mem_a0a619f5e4cb"],
    },
  },
};

const currentRevisionDetail: Record<Locale, string> = {
  en: "Current version adds the imported W3C reference and Markdown review notes, alongside the three saved memories.",
  "zh-TW": "目前版本補上 W3C 網址與 Markdown 驗收筆記，保留設計決定與三則記憶。",
  "zh-CN": "当前版本补上 W3C 网址与 Markdown 验收笔记，保留设计决定与三则记忆。",
};

export function getDemoLibrary(locale: Locale) {
  const personal = getPersonalLibrary(locale);
  const originalNotes = getPersonalLibrary("zh-TW").notes;
  const localizeLinks = (text: string) => text.replace(/\[\[([^\]]+)\]\]/g, (_match, title: string) => {
    const original = originalNotes.find((note) => note.title === title);
    const target = personal.notes.find((note) => note.id === original?.id);
    return target ? `[${target.title}](#demo:${target.id})` : title;
  });
  const copy = demoCopy[locale];
  const info = inspectorCopy[locale];
  const labels = libraryCopy[locale];
  const lumo = getDemoResources(locale);
  const link = (id: string, label?: string) => `[${label ?? lumo.find((resource) => resource.id === id)!.title}](#demo:${id})`;
  const body = `## ${copy.dates}\n\n- ${copy.ios}\n- ${copy.android}\n\n## ${copy.reason}\n\n${copy.beforeReport}${link("file-beta")}${copy.afterReport}\n\n${copy.beforeDecision}${link("memory-decision", copy.kind.memory)}${copy.afterDecision}${link("page-decision")}${copy.afterPage}\n\n## ${copy.owner}\n\n${copy.ownerText}${link("page-checklist")}\n\n## ${copy.announcement}\n\n${copy.announcementText}${link("url-announcement")}${copy.afterAnnouncement}${link("obsidian-notes")}`;
  const lumoSources = lumo.filter((resource) => resource.kind !== "page" && resource.kind !== "topic").map((resource) => resource.id);
  const launchRevisions: DemoRevision[] = demoRevisions.map((revision) => ({ ...revision, author: info.author, timeLabel: revision.version === 2 ? info.v2Time : info.v1Time, summary: revision.version === 2 ? info.v2 : info.v1, detail: revision.version === 2 ? info.v2Detail : info.v1Detail, ...(revision.version === 2 ? { body } : {}) }));
  const launch: DemoNote = { id: "page-lumo", kind: "page", title: wikiInteractionData[locale].pageTitle, body, tags: ["Lumo 2.0"], groupId: "group-project", topicIds: ["topic-lumo", "topic-reading"], sourceIds: lumoSources, relatedIds: ["page-decision", "page-checklist"], version: 2, updatedAt: demoRevisions[0].at, revisions: launchRevisions };
  const notes: DemoNote[] = personal.notes.map((note) => {
    const timeLabel = (at: string) => new Intl.DateTimeFormat(locale, { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" }).format(new Date(at));
    const current: DemoRevision = { version: note.version, at: note.updatedAt, timeLabel: timeLabel(note.updatedAt), author: labels.unknownAuthor, summary: note.id === "page-agent-loop" ? { en: "Added web and Markdown references.", "zh-TW": "補上網址與 Markdown 依據。", "zh-CN": "补上网址与 Markdown 依据。" }[locale] : labels.snapshot, detail: note.id === "page-agent-loop" ? currentRevisionDetail[locale] : note.id === "ai-work-style" ? { en: "Renamed the page to Working with AI.", "zh-TW": "將頁面標題更新為「AI 工作方式」。", "zh-CN": "将页面标题更新为「AI 工作方式」。" }[locale] : labels.snapshotDetail, sourceIds: note.sourceIds, body: note.body };
    const earlier = recoveredRevisions[locale][note.id];
    const revisions: DemoRevision[] = earlier ? [current, { ...earlier, body: localizeLinks(earlier.body), timeLabel: timeLabel(earlier.at), author: labels.unknownAuthor }] : [current];
    return { ...note, revisions };
  });
  notes.push(launch);
  for (const resource of lumo.filter((item) => item.kind === "page")) {
    const sourceIds = resource.id === "page-decision" ? ["file-beta", "memory-decision"] : ["file-checklist", "memory-checklist"];
    notes.push({ ...resource, groupId: "group-project", topicIds: ["topic-lumo"], sourceIds, relatedIds: ["page-lumo"], version: 1, updatedAt: demoRevisions[0].at, revisions: [{ ...launchRevisions[0], version: 1, summary: resource.title, detail: copy.fixture, sourceIds, body: resource.body }] });
  }
  const resources: DemoResource[] = [...personal.resources.filter((resource) => resource.kind !== "page"), ...lumo.filter((resource) => resource.kind !== "page"), ...notes];
  return { notes, resources, groups: [...personal.groups, { id: "group-project", title: labels.projects }] };
}
