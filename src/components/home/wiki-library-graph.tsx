"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Locale } from "@/i18n/locales";
import type { DemoNote } from "./wiki-demo-library";
import type { DemoResource } from "./wiki-demo-data";
import { getDemoGraphEdges } from "./wiki-library-graph-data";

type GraphPoint = { id: string; kind: "page" | "topic"; title: string; x: number; y: number };
type Copy = { label: string; page: string; topic: string; selected: string };

const copy: Record<Locale, Copy> = {
  en: { label: "Knowledge graph", page: "Page", topic: "Topic", selected: "Selected" },
  "zh-TW": { label: "知識圖譜", page: "頁面", topic: "主題", selected: "已選取" },
  "zh-CN": { label: "知识图谱", page: "页面", topic: "主题", selected: "已选择" },
};

const groupCenters: Record<string, { x: number; y: number }> = {
  "group-ai": { x: 250, y: 160 },
  "group-personal": { x: 750, y: 160 },
  "group-product": { x: 250, y: 450 },
  "group-project": { x: 750, y: 450 },
};

function getPoints(resources: readonly DemoResource[], notes: readonly DemoNote[]): GraphPoint[] {
  const visible = resources.filter((resource): resource is DemoResource & { kind: "page" | "topic" } => resource.kind === "page" || resource.kind === "topic");
  const noteById = new Map(notes.map((note) => [note.id, note]));
  const topicIdsByGroup = new Map<string, string[]>();
  for (const note of notes) {
    const ids = topicIdsByGroup.get(note.groupId) ?? [];
    for (const id of note.topicIds) if (!ids.includes(id)) ids.push(id);
    topicIdsByGroup.set(note.groupId, ids);
  }

  const points: GraphPoint[] = [];
  const groups = [...new Set(notes.map(({ groupId }) => groupId))];
  for (const groupId of groups) {
    const center = groupCenters[groupId];
    if (!center) continue;
    const groupNotes = notes.filter((note) => note.groupId === groupId && visible.some((item) => item.id === note.id));
    const topicIds = (topicIdsByGroup.get(groupId) ?? []).filter((id) => visible.some((item) => item.id === id));

    // Topic markers anchor clusters; the secondary topic sits below its project pages.
    topicIds.forEach((id, index) => {
      const resource = visible.find((item) => item.id === id)!;
      points.push({ id, kind: "topic", title: resource.title.replace(/\.md$/, ""), x: center.x, y: center.y + index * 120 });
    });

    const radiusX = groupId === "group-ai" ? 175 : 158;
    const radiusY = groupId === "group-project" ? 100 : 112;
    groupNotes.forEach((note, index) => {
      const resource = visible.find((item) => item.id === note.id)!;
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / groupNotes.length;
      points.push({
        id: note.id,
        kind: "page",
        title: resource.title.replace(/\.md$/, ""),
        x: center.x + Math.cos(angle) * radiusX,
        y: center.y + Math.sin(angle) * radiusY,
      });
    });
  }

  // Keep any valid page or topic from the fixture visible if its note metadata
  // did not provide a group; it remains unpositioned only when no cluster exists.
  for (const resource of visible) {
    if (points.some((point) => point.id === resource.id)) continue;
    const note = noteById.get(resource.id);
    const center = note ? groupCenters[note.groupId] : undefined;
    if (center) points.push({ id: resource.id, kind: resource.kind, title: resource.title.replace(/\.md$/, ""), x: center.x, y: center.y + 34 });
  }
  return points;
}

export function WikiLibraryGraph({ locale, resources, notes, selectedId, onSelect, onPreview, onPreviewEnd }: {
  locale: Locale;
  resources: readonly DemoResource[];
  notes: readonly DemoNote[];
  selectedId: string;
  onSelect: (id: string) => void;
  onPreview: (id: string, anchor: HTMLElement) => void;
  onPreviewEnd: (anchor: HTMLElement) => void;
}) {
  const labels = copy[locale];
  const viewportRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const viewport = viewportRef.current;
    const selected = selectedRef.current;
    if (!viewport || !selected) return;
    const frame = viewport.getBoundingClientRect();
    const node = selected.getBoundingClientRect();
    if (node.left < frame.left + 12) viewport.scrollLeft += node.left - frame.left - 12;
    else if (node.right > frame.right - 12) viewport.scrollLeft += node.right - frame.right + 12;
  }, [selectedId]);
  const points = getPoints(resources, notes);
  const pointsById = new Map(points.map((point) => [point.id, point]));
  const edges = getDemoGraphEdges(resources, notes).flatMap(([a, b]) => {
    const from = pointsById.get(a);
    const to = pointsById.get(b);
    return from && to ? [{ id: `${a}\u0000${b}`, from, to }] : [];
  });
  const connected = new Set<string>();
  for (const { from, to } of edges) {
    if (from.id === selectedId) connected.add(to.id);
    if (to.id === selectedId) connected.add(from.id);
  }
  const hasSelection = pointsById.has(selectedId);

  return <section className="wiki-library-graph" aria-label={labels.label}>
    <div ref={viewportRef} className="wiki-library-graph-viewport" role="region" aria-label={labels.label} tabIndex={0}>
      <div className="wiki-library-graph-canvas">
        <svg className="wiki-library-graph-edges" aria-hidden="true" viewBox="0 0 1000 620" preserveAspectRatio="none">
          {edges.map(({ id, from, to }) => {
            const active = from.id === selectedId || to.id === selectedId;
            return <line key={id} data-edge-from={from.id} data-edge-to={to.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y} data-active={active || undefined} data-muted={hasSelection && !active || undefined} />;
          })}
        </svg>
        {points.map((point) => {
          const selected = point.id === selectedId;
          const neighbor = connected.has(point.id);
          const muted = hasSelection && !selected && !neighbor;
          const style = { left: `${point.x / 10}%`, top: `${(point.y / 620) * 100}%` } as CSSProperties;
          return <button
            key={point.id}
            ref={selected ? selectedRef : undefined}
            type="button"
            className="wiki-library-graph-node"
            data-graph-node={point.id}
            style={style}
            data-kind={point.kind}
            data-selected={selected || undefined}
            data-neighbor={neighbor || undefined}
            data-muted={muted || undefined}
            aria-label={`${point.title} · ${point.kind === "page" ? labels.page : labels.topic}${selected ? ` · ${labels.selected}` : ""}`}
            aria-pressed={selected}
            title={point.title}
            onPointerEnter={(event) => { if (event.pointerType !== "touch") onPreview(point.id, event.currentTarget); }}
            onPointerLeave={(event) => onPreviewEnd(event.currentTarget)}
            onFocus={(event) => onPreview(point.id, event.currentTarget)}
            onBlur={(event) => onPreviewEnd(event.currentTarget)}
            onClick={() => onSelect(point.id)}
          >
            <span className="wiki-library-graph-dot" aria-hidden="true" />
            <span className="wiki-library-graph-title">{point.title}</span>
          </button>;
        })}
      </div>
    </div>
    <div className="wiki-library-graph-legend" aria-hidden="true">
      <span><i data-kind="page" />{labels.page}</span><span><i data-kind="topic" />{labels.topic}</span>
    </div>
  </section>;
}
