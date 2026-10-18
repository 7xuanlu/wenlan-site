import type { ReactNode } from "react";
import type { DemoResource } from "./wiki-demo-data";

type Point = { id: string; x: number; y: number };
const positions = [[19, 15], [75, 13], [84, 53], [70, 83], [30, 83], [13, 53], [47, 7], [49, 94]];

// Static layout for the website demo, following the App's round page/topic nodes
// and smaller memory dots. Edges come only from the displayed fixture relations.
export function WikiDemoGraph({ center, ids, resources, reference, compact = false }: {
  center: DemoResource;
  ids: readonly string[];
  resources: readonly DemoResource[];
  reference: (id: string, label?: ReactNode) => ReactNode;
  compact?: boolean;
}) {
  const neighbors = [...new Set(ids)].filter((id) => id !== center.id && resources.some((resource) => resource.id === id)).slice(0, compact ? 6 : 8);
  const points: Point[] = [{ id: center.id, x: 47, y: 45 }, ...neighbors.map((id, index) => ({ id, x: positions[index][0], y: positions[index][1] }))];
  const edges = new Map<string, [Point, Point]>();
  const connect = (a: Point, b: Point) => edges.set([a.id, b.id].sort().join(":"), [a, b]);
  for (const point of points.slice(1)) connect(points[0], point);
  for (const point of points.slice(1)) {
    const resource = resources.find((item) => item.id === point.id);
    for (const id of resource?.relatedIds ?? []) {
      const target = points.find((item) => item.id === id);
      if (target && target.id !== point.id) connect(point, target);
    }
  }
  return <div data-demo-node-graph className={`wiki-demo-node-graph ${compact ? "is-compact" : "is-expanded"}`}>
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">{[...edges].map(([key, [a, b]]) => <line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />)}</svg>
    {points.map((point) => {
      const resource = resources.find((item) => item.id === point.id)!;
      return <div key={point.id} className="wiki-demo-circle-node" data-kind={resource.kind} data-center={point.id === center.id} style={{ left: `${point.x}%`, top: `${point.y}%` }}>
        {reference(point.id, <><span className="wiki-demo-node-dot" aria-hidden="true" /><span className="wiki-demo-node-label">{resource.title.replace(/\.md$/, "")}</span></>)}
      </div>;
    })}
  </div>;
}
