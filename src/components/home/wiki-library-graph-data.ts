import type { DemoNote } from "./wiki-demo-library";
import type { DemoResource } from "./wiki-demo-data";

export type DemoGraphEdge = readonly [string, string];

/** Return only fixture-backed links, normalized as unique undirected pairs. */
export function getDemoGraphEdges(
  resources: readonly DemoResource[],
  notes: readonly DemoNote[],
): DemoGraphEdge[] {
  const validIds = new Set(resources.map(({ id }) => id));
  const pairs = new Map<string, DemoGraphEdge>();

  const add = (from: string, to: string) => {
    if (from === to || !validIds.has(from) || !validIds.has(to)) return;
    const [a, b] = from < to ? [from, to] : [to, from];
    pairs.set(`${a}\u0000${b}`, [a, b]);
  };

  for (const resource of resources) {
    for (const id of resource.relatedIds ?? []) add(resource.id, id);
  }

  for (const note of notes) {
    for (const id of note.relatedIds) add(note.id, id);
    for (const id of note.topicIds) add(note.id, id);
    for (const id of note.sourceIds) add(note.id, id);
  }

  return [...pairs.values()].sort(([a1, b1], [a2, b2]) => a1.localeCompare(a2) || b1.localeCompare(b2));
}

export function getDemoGraphNeighbors(id: string, edges: readonly DemoGraphEdge[]): string[] {
  const neighbors = new Set<string>();
  for (const [a, b] of edges) {
    if (a === id) neighbors.add(b);
    else if (b === id) neighbors.add(a);
  }
  return [...neighbors];
}
