"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import type { DemoResource } from "./wiki-demo-data";

export type DemoSourceKind = "file" | "url" | "obsidian";
export type DemoSourceFilter = "all" | DemoSourceKind;

// Memories may support a page, but they are not imported source documents.
export function isDemoSource(resource: DemoResource): resource is DemoResource & { kind: DemoSourceKind } {
  return resource.kind === "file" || resource.kind === "url" || resource.kind === "obsidian";
}

export function filterDemoSources(resources: readonly DemoResource[], filter: DemoSourceFilter, query = "") {
  const term = query.trim().toLocaleLowerCase();
  return resources.filter(isDemoSource).filter((resource) =>
    (filter === "all" || resource.kind === filter) &&
    (!term || [resource.title, resource.location, resource.href].filter(Boolean).join(" ").toLocaleLowerCase().includes(term)));
}

const sourceCopy = {
  en: { all: "All", file: "Files", url: "URLs", obsidian: "Obsidian", filter: "Source type", search: "Search sources", none: "No matching sources", clear: "Clear filters" },
  "zh-TW": { all: "全部", file: "檔案", url: "網址", obsidian: "Obsidian", filter: "來源類型", search: "搜尋來源", none: "沒有符合的來源", clear: "清除篩選" },
  "zh-CN": { all: "全部", file: "文件", url: "网址", obsidian: "Obsidian", filter: "来源类型", search: "搜索来源", none: "没有匹配的来源", clear: "清除筛选" },
} as const;

export function WikiDemoSources({ locale, resources, reference, filter, query, onFilterChange, onQueryChange }: {
  locale: Locale;
  resources: readonly DemoResource[];
  reference: (id: string, label?: ReactNode, row?: boolean) => ReactNode;
  filter: DemoSourceFilter;
  query: string;
  onFilterChange: (filter: DemoSourceFilter) => void;
  onQueryChange: (query: string) => void;
}) {
  const copy = sourceCopy[locale];
  const visible = filterDemoSources(resources, filter, query);
  const filters: DemoSourceFilter[] = ["all", "file", "url", "obsidian"];
  return <div data-demo-source-library>
    <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={copy.search} aria-label={copy.search} className="wiki-demo-source-search" />
    <div className="wiki-demo-source-filters" role="group" aria-label={copy.filter}>
      {filters.map((value) => <button key={value} type="button" data-source-filter={value} aria-pressed={filter === value} onClick={() => onFilterChange(value)}>
        {copy[value]}<span>{filterDemoSources(resources, value, query).length}</span>
      </button>)}
    </div>
    <ul data-source-results>
      {visible.map((resource) => <li key={resource.id} data-source-kind={resource.kind}>{reference(resource.id, undefined, true)}</li>)}
    </ul>
    {visible.length === 0 && <div className="wiki-demo-source-empty"><p role="status">{copy.none}</p><button type="button" onClick={() => { onFilterChange("all"); onQueryChange(""); }}>{copy.clear}</button></div>}
  </div>;
}
