import type { Locale } from "@/i18n/locales";
import { wikiInteractionData } from "./wiki-interaction-data";

export type DemoKind = "page" | "memory" | "file" | "url" | "obsidian" | "tag" | "topic";
export type DemoResource = {
  id: string;
  kind: DemoKind;
  title: string;
  body: string;
  location?: string;
  href?: string;
  tags: readonly string[];
  relatedIds?: readonly string[];
};

export const demoCopy = {
  en: {
    sampleLibrary: "Sample library",
    hint: "Hover to preview, click to read.",
    touchHint: "Tap a reference to read.",
    info: "Info", sources: "Sources", related: "Linked pages", tags: "Tags", all: "All sources", back: "Back", close: "Close reader", open: "Click the reference to read", filter: "Click the tag to filter sources", original: "Open original source", usedIn: "Used in this page", recorded: "App screenshots", kind: { topic: "Topic", page: "Page", memory: "Memory", file: "File", url: "URL", obsidian: "Obsidian", tag: "Tag" },
    dates: "Dates", ios: "iOS · October 20, unchanged.", android: "Android · November 3, tentative. Release only after the next stability test passes.",
    reason: "Why the plan changed", beforeReport: "In ", afterReport: ", Android recorded 31 crashes in 1,000 test sessions (3.1%), above the release gate of 1%. iOS passed.",
    beforeDecision: "The team's saved ", afterDecision: " keeps iOS on schedule and postpones Android. The linked ", afterPage: " explains the decision.",
    owner: "Owner", ownerText: "Rin still owns the unfixed Android crash issue. Check the release gates in ",
    announcement: "Announcement", announcementText: "The ", afterAnnouncement: " must not say both platforms are live. Cross-check the notes in ",
    referenceNotes: "Reference notes", obsidianTitle: "Launch notes", urlTitle: "Launch announcement draft", launchTag: "Launch", decisionTag: "Decision", betaTag: "Beta",
    draft: "## Announcement draft\n\n**iOS launches on October 20.**\n\nAndroid is tentatively planned for November 3, subject to the next stability test.\n\nDo not announce that both platforms are live.",
    fixture: "Fictional source for this interactive demo",
  },
  "zh-TW": {
    sampleLibrary: "示範知識庫",
    hint: "滑過預覽，點擊閱讀。", touchHint: "點擊引用即可閱讀。",
    info: "資訊", sources: "來源", related: "連結到的頁面", tags: "標籤", all: "全部來源", back: "返回", close: "關閉閱讀面板", open: "點擊引用以閱讀全文", filter: "點擊標籤以篩選來源", original: "開啟原始來源", usedIn: "出現在這個頁面", recorded: "查看實機畫面", kind: { topic: "主題", page: "頁面", memory: "記憶", file: "檔案", url: "網址", obsidian: "Obsidian", tag: "標籤" },
    dates: "日期", ios: "iOS：10 月 20 日（不變）。", android: "Android：暫定 11 月 3 日，須通過下一次穩定性測試才發佈。",
    reason: "變更原因", beforeReport: "在", afterReport: "中，Android 在 1,000 次測試工作階段閃退 31 次（3.1%），未達低於 1% 的發佈門檻；iOS 通過。",
    beforeDecision: "依照發佈小組保存的", afterDecision: "，iOS 維持原定時程、Android 延後。詳見", afterPage: "。",
    owner: "負責人", ownerText: "阿岑負責尚未修復的 Android 閃退問題。發佈前須逐項確認", announcement: "公告", announcementText: "發佈時的", afterAnnouncement: "不得寫成全平台已上線，並須對照", referenceNotes: "參考筆記", obsidianTitle: "發佈筆記", urlTitle: "上線公告草稿", launchTag: "發佈", decisionTag: "決策", betaTag: "Beta",
    draft: "## 公告草稿\n\n**iOS 於 10 月 20 日上線。**\n\nAndroid 暫定 11 月 3 日，須通過下一次穩定性測試才發佈。\n\n公告不得寫成全平台已上線。", fixture: "此互動示範的虛構來源",
  },
  "zh-CN": {
    sampleLibrary: "示范知识库",
    hint: "悬停预览，点击阅读。", touchHint: "点击引用即可阅读。",
    info: "信息", sources: "来源", related: "链接到的页面", tags: "标签", all: "全部来源", back: "返回", close: "关闭阅读面板", open: "点击引用以阅读全文", filter: "点击标签以筛选来源", original: "打开原始来源", usedIn: "出现在这个页面", recorded: "查看实机画面", kind: { topic: "主题", page: "页面", memory: "记忆", file: "文件", url: "网址", obsidian: "Obsidian", tag: "标签" },
    dates: "日期", ios: "iOS：10 月 20 日（不变）。", android: "Android：暂定 11 月 3 日，须通过下一次稳定性测试才发布。",
    reason: "变更原因", beforeReport: "在", afterReport: "中，Android 在 1,000 次测试会话中崩溃 31 次（3.1%），未达低于 1% 的发布门槛；iOS 通过。",
    beforeDecision: "按照发布小组保存的", afterDecision: "，iOS 维持原定时间、Android 延后。详见", afterPage: "。",
    owner: "负责人", ownerText: "阿岑负责尚未修复的 Android 崩溃问题。发布前须逐项确认", announcement: "公告", announcementText: "发布时的", afterAnnouncement: "不得写成全平台已上线，并须对照", referenceNotes: "参考笔记", obsidianTitle: "发布笔记", urlTitle: "上线公告草稿", launchTag: "发布", decisionTag: "决策", betaTag: "Beta",
    draft: "## 公告草稿\n\n**iOS 于 10 月 20 日上线。**\n\nAndroid 暂定 11 月 3 日，须通过下一次稳定性测试才发布。\n\n公告不得写成全平台已上线。", fixture: "此互动演示的虚构来源",
  },
} as const;

export function getDemoResources(locale: Locale): DemoResource[] {
  const copy = demoCopy[locale];
  const existing = wikiInteractionData[locale].resources;
  const sources: DemoResource[] = existing.map((resource) => ({
    ...resource,
    tags: ["Lumo 2.0", resource.id.includes("decision") ? copy.decisionTag : resource.id.includes("beta") ? copy.betaTag : copy.launchTag],
  }));
  const checklist = existing.find((resource) => resource.id === "memory-checklist")!;
  const decision = existing.find((resource) => resource.id === "memory-decision")!;
  // These two extra source types are authored demo fixtures, not native capture/import evidence.
  const topicCopy = {
    en: { reading: "Mobile reading project", launch: "The Lumo 2.0 launch plan, decisions, release checklist, and supporting sources.", body: "The mobile reading project brings together the iOS and Android release gates, Beta feedback, and launch checklist." },
    "zh-TW": { reading: "行動閱讀專案", launch: "Lumo 2.0 的發佈計畫、平台決策、上線檢查清單，以及相關來源。", body: "整理行動閱讀專案的 iOS 與 Android 發佈門檻、Beta 回饋和上線檢查清單。" },
    "zh-CN": { reading: "移动阅读项目", launch: "Lumo 2.0 的发布计划、平台决策、上线检查清单，以及相关来源。", body: "整理移动阅读项目的 iOS 与 Android 发布门槛、Beta 反馈和上线检查清单。" },
  }[locale];
  return [
    ...sources,
    { id: "topic-lumo", kind: "topic", title: "Lumo 2.0", body: topicCopy.launch, tags: [], relatedIds: ["page-decision", "page-checklist", ...sources.map((source) => source.id), "url-announcement", "obsidian-notes"] },
    { id: "topic-reading", kind: "topic", title: topicCopy.reading, body: topicCopy.body, tags: [], relatedIds: ["page-checklist", "file-checklist", "file-beta", "memory-beta"] },
    { id: "url-announcement", kind: "url", title: copy.urlTitle, body: copy.draft, location: "https://lumo.example/launch", tags: ["Lumo 2.0", copy.launchTag] },
    { id: "obsidian-notes", kind: "obsidian", title: copy.obsidianTitle, body: checklist.body, location: `Lumo / ${copy.obsidianTitle}.md`, tags: ["Lumo 2.0", copy.launchTag] },
    { id: "page-decision", kind: "page", title: decision.title, body: decision.body, tags: ["Lumo 2.0", copy.decisionTag] },
    { id: "page-checklist", kind: "page", title: checklist.title, body: checklist.body, tags: ["Lumo 2.0", copy.launchTag] },
  ];
}

// Static history for the fictional Lumo demonstration; no live App state is read.
export const inspectorCopy = {
  en: { editedBy: "Edited by", updatedAt: "Updated", author: "Rin", v2Time: "Oct 11, 14:30", v1Time: "Oct 10, 09:00", details: "Details", wiki: "Wiki page", graph: "Connections", openGraph: "Open in graph", history: "Version history", current: "Current", more: "Show all", less: "Show less", v2: "Android postponed; iOS stays on schedule.", v1: "Initial launch plan and release checklist.", v2Detail: "The Beta report changed the plan. Android is tentative for November 3, subject to the next stability test.", v1Detail: "The kickoff meeting established the launch plan. The checklist records the release gates and owners." },
  "zh-TW": { editedBy: "修改者", updatedAt: "修改時間", author: "阿岑", v2Time: "10/11 14:30", v1Time: "10/10 09:00", details: "詳細資訊", wiki: "Wiki 筆記", graph: "關聯圖", openGraph: "在圖譜中開啟", history: "版本歷史", current: "目前版本", more: "顯示全部", less: "收起", v2: "Android 延後，iOS 維持原定時程。", v1: "建立發佈計畫與上線檢查清單。", v2Detail: "依據 Beta 報告更新計畫：Android 暫定 11 月 3 日，須通過下一次穩定性測試。", v1Detail: "依據啟動會議建立發佈計畫，整理上線門檻與負責人。" },
  "zh-CN": { editedBy: "修改者", updatedAt: "修改时间", author: "阿岑", v2Time: "10/11 14:30", v1Time: "10/10 09:00", details: "详细信息", wiki: "Wiki 笔记", graph: "关联图", openGraph: "在图谱中打开", history: "版本历史", current: "当前版本", more: "显示全部", less: "收起", v2: "Android 延后，iOS 维持原定时间。", v1: "建立发布计划与上线检查清单。", v2Detail: "依据 Beta 报告更新计划：Android 暂定 11 月 3 日，须通过下一次稳定性测试。", v1Detail: "依据启动会议建立发布计划，整理上线门槛与负责人。" },
} as const;

// Fixed, fictional revision metadata; dates and authors are not live App activity.
export const demoRevisions = [
  { version: 2, at: "2026-10-11T14:30:00-07:00", sourceIds: ["file-beta", "memory-decision"] },
  { version: 1, at: "2026-10-10T09:00:00-07:00", sourceIds: ["file-meeting", "file-checklist"] },
] as const;

export function getDemoSourcePreview(resources: readonly DemoResource[]): DemoResource[] {
  const preferred = ["file-beta", "memory-decision", "url-announcement", "obsidian-notes"];
  const ranked = [...preferred.flatMap((id) => resources.filter((resource) => resource.id === id)), ...resources];
  const selected: DemoResource[] = [];
  for (const resource of ranked) {
    if (!selected.some((item) => item.kind === resource.kind)) selected.push(resource);
    if (selected.length === 3) break;
  }
  for (const resource of resources) {
    if (selected.length === 3) break;
    if (!selected.some((item) => item.id === resource.id)) selected.push(resource);
  }
  return selected;
}
