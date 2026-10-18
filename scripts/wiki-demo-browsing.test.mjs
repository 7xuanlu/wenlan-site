import test from "node:test";
import assert from "node:assert/strict";
import { getDemoLibrary } from "../src/components/home/wiki-demo-library.ts";
import { filterDemoSources, isDemoSource } from "../src/components/home/wiki-demo-sources.tsx";
import { getDemoGraphEdges, getDemoGraphNeighbors } from "../src/components/home/wiki-library-graph-data.ts";

for (const locale of ["en", "zh-TW", "zh-CN"]) {
  test(`${locale}: Sources contains only imported documents and filters each type`, () => {
    const { resources } = getDemoLibrary(locale);
    const all = filterDemoSources(resources, "all");
    assert.equal(all.length, 7);
    assert.equal(resources.filter((resource) => resource.kind === "memory").length, 7, "Memories remain available in the library");
    for (const kind of ["file", "url", "obsidian"]) {
      const filtered = filterDemoSources(resources, kind);
      assert.ok(filtered.length > 0);
      assert.ok(filtered.every((resource) => resource.kind === kind));
    }
    const source = all[0];
    assert.deepEqual(filterDemoSources(resources, "all", `  ${source.title.toUpperCase()}  `), [source]);
    assert.deepEqual(filterDemoSources(resources, "all", "nonexistent-source-123"), []);
  });

  test(`${locale}: graph uses the whole library and retains real bidirectional neighbors`, () => {
    const { resources, notes } = getDemoLibrary(locale);
    const edges = getDemoGraphEdges(resources, notes);
    assert.equal(new Set(edges.map((edge) => edge.join("\0"))).size, edges.length);
    assert.ok(edges.every(([a, b]) => a !== b));
    for (const note of notes) {
      const neighbors = getDemoGraphNeighbors(note.id, edges);
      for (const id of [...note.relatedIds, ...note.sourceIds, ...note.topicIds]) {
        assert.ok(neighbors.includes(id), `${note.id} must connect to ${id}`);
        assert.ok(getDemoGraphNeighbors(id, edges).includes(note.id));
      }
    }
    assert.ok(!getDemoGraphNeighbors("page-agent-loop", edges).includes("page-lumo"), "Do not invent cross-project relationships");
    assert.notDeepEqual(getDemoGraphNeighbors("topic-personal", edges), getDemoGraphNeighbors("page-agent-loop", edges));
  });
}

test("a Memory with a URL remains a Memory, not a Source", () => {
  const memory = { id: "saved-decision", kind: "memory", title: "A decision", body: "", tags: [], href: "https://example.com" };
  assert.equal(isDemoSource(memory), false);
  assert.deepEqual(filterDemoSources([memory], "all"), []);
});

test("graph ignores dangling references and self-links", () => {
  const resources = [{ id: "a", kind: "page", relatedIds: ["a", "b", "missing"] }, { id: "b", kind: "topic", relatedIds: ["a"] }];
  assert.deepEqual(getDemoGraphEdges(resources, []), [["a", "b"]]);
});
