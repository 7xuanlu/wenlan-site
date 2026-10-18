import type { Locale } from "@/i18n/locales";
import type { DemoResource } from "./wiki-demo-data";
import { nativeDemoIconPaths } from "./native-demo-icon-paths";

export type TopicFilter = "all" | "concept" | "project";
export type DemoTopicType = Exclude<TopicFilter, "all">;

const copy = {
  en: {
    search: "Search topics",
    searchPlaceholder: "Search topics…",
    filters: "Topic type",
    all: "All",
    concept: "Concepts",
    project: "Projects",
    empty: "No topics match your search.",
    clear: "Clear filters",
    conceptType: "Concept",
    projectType: "Project",
  },
  "zh-TW": {
    search: "搜尋主題",
    searchPlaceholder: "搜尋主題…",
    filters: "主題類型",
    all: "全部",
    concept: "概念",
    project: "專案",
    empty: "找不到符合條件的主題。",
    clear: "清除篩選",
    conceptType: "概念",
    projectType: "專案",
  },
  "zh-CN": {
    search: "搜索主题",
    searchPlaceholder: "搜索主题…",
    filters: "主题类型",
    all: "全部",
    concept: "概念",
    project: "项目",
    empty: "没有符合条件的主题。",
    clear: "清除筛选",
    conceptType: "概念",
    projectType: "项目",
  },
} as const;

/** The two project labels are authored demo fixture metadata, not native App data. */
export function getDemoTopicType(resource: DemoResource): DemoTopicType {
  return resource.id === "topic-lumo" || resource.id === "topic-reading" ? "project" : "concept";
}

export function filterDemoTopics(
  resources: readonly DemoResource[],
  filter: TopicFilter,
  query = "",
): DemoResource[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return resources.filter((resource) => {
    if (resource.kind !== "topic") return false;
    if (filter !== "all" && getDemoTopicType(resource) !== filter) return false;
    return !normalizedQuery || resource.title.toLocaleLowerCase().includes(normalizedQuery);
  });
}

interface WikiDemoTopicsProps {
  locale: Locale;
  topics: readonly DemoResource[];
  filter: TopicFilter;
  query: string;
  onFilterChange: (value: TopicFilter) => void;
  onQueryChange: (value: string) => void;
  onOpen: (resource: DemoResource, anchor: HTMLElement) => void;
}

/**
 * MIT License
 * Copyright (c) 2020 Phosphor Icons
 * Permission notice and disclaimer are included in native-demo-icon-paths.ts.
 */
const lightbulbPath = "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z";

export function TopicTypeIcon({ type, className = "wiki-demo-topics__icon" }: { type: DemoTopicType; className?: string }) {
  const paths = type === "concept" ? [lightbulbPath] : nativeDemoIconPaths.topics;
  return (
    <svg aria-hidden="true" className={className} focusable="false" viewBox="0 0 256 256" fill="none">
      {paths.map((path) => <path d={path} key={path} fill="currentColor" />)}
    </svg>
  );
}

const filters: TopicFilter[] = ["all", "concept", "project"];

export function WikiDemoTopics({
  locale,
  topics,
  filter,
  query,
  onFilterChange,
  onQueryChange,
  onOpen,
}: WikiDemoTopicsProps) {
  const labels = copy[locale];
  const visibleTopics = filterDemoTopics(topics, filter, query);

  return (
    <section aria-label={labels.filters} className="wiki-demo-topics">
      <label className="wiki-demo-topics__search">
        <svg aria-hidden="true" className="wiki-demo-topics__search-icon" focusable="false" viewBox="0 0 24 24" fill="none">
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m15.4 15.4 4.2 4.2" />
        </svg>
        <input
          aria-label={labels.search}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={labels.searchPlaceholder}
          type="search"
          value={query}
        />
      </label>

      <div aria-label={labels.filters} className="wiki-demo-topics__filters" role="group">
        {filters.map((value) => (
          <button
            aria-pressed={filter === value}
            className="wiki-demo-topics__filter"
            data-topic-filter={value}
            key={value}
            onClick={() => onFilterChange(value)}
            type="button"
          >
            {labels[value === "all" ? "all" : value]}
          </button>
        ))}
      </div>

      {visibleTopics.length > 0 ? (
        <div className="wiki-demo-topics__grid">
          {visibleTopics.map((resource) => {
            const type = getDemoTopicType(resource);
            return (
              <button
                aria-label={`${resource.title}, ${type === "concept" ? labels.conceptType : labels.projectType}`}
                className="wiki-demo-topics__card"
                data-demo-topic={resource.id}
                key={resource.id}
                onClick={(event) => onOpen(resource, event.currentTarget)}
                type="button"
              >
                <TopicTypeIcon type={type} />
                <span className="wiki-demo-topics__name">{resource.title}</span>
                <span className="wiki-demo-topics__type">{type === "concept" ? labels.conceptType : labels.projectType}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="wiki-demo-topics__empty" role="status">
          <p>{labels.empty}</p>
          <button
            className="wiki-demo-topics__clear"
            onClick={() => {
              onFilterChange("all");
              onQueryChange("");
            }}
            type="button"
          >
            {labels.clear}
          </button>
        </div>
      )}
    </section>
  );
}
