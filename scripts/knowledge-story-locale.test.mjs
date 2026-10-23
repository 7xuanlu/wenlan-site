import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { knowledgeNodes } from "../src/components/home/knowledge-story-data.ts";
import { knowledgeNodesEn, readingReviewMarkdownEn } from "../src/components/home/knowledge-story-data-en.ts";
import { knowledgeIds } from "../src/components/home/knowledge-story-ids.ts";
import { graphNodes, graphNodesEn, graphPoints, graphPointsEn, graphCommunities, communityRegions } from "../src/components/home/knowledge-graph-communities.ts";
import { getPersonalLibrary } from "../src/components/home/wiki-personal-data.ts";

const cjk = /[㐀-鿿豈-﫿　-〿＀-￯]/u;
const dashes = /[–—]/u;
const targets = (body) => [...body.matchAll(/\]\(#demo:([^)]+)\)/g)].map((match) => match[1]);
const links = (body) => [...body.matchAll(/\[([^\]]+)\]\(#demo:([^)]+)\)/g)].map((match) => ({ text: match[1], target: match[2] }));

function assertSameStructure(zh, en) {
  assert.deepEqual(en.map((node) => node.id), zh.map((node) => node.id), "same ids in the same order");
  for (const [index, node] of zh.entries()) {
    const other = en[index];
    const { title: _zhTitle, body: _zhBody, ...zhRest } = node;
    const { title: _enTitle, body: _enBody, ...enRest } = other;
    assert.deepEqual(enRest, zhRest, `${node.id}: kind, coordinates and topicId are identical`);
    assert.deepEqual(targets(other.body), targets(node.body), `${node.id}: #demo link targets are unchanged`);
    assert.equal(other.body === "", node.body === "", `${node.id}: empty bodies stay empty`);
    assert.ok(other.title.trim(), `${node.id}: has an English title`);
  }
}

test("English library keeps the structure of the captured library", () => {
  assert.equal(knowledgeNodesEn.length, 33);
  assertSameStructure(knowledgeNodes, knowledgeNodesEn);
});

test("English research and design examples keep the structure of the Chinese examples", () => {
  assert.equal(graphNodesEn.length, graphNodes.length);
  assertSameStructure(graphNodes, graphNodesEn);
  assert.deepEqual(graphPointsEn.map(({ px, py, community }) => [px, py, community]), graphPoints.map(({ px, py, community }) => [px, py, community]));
});

test("English library text is plain English without CJK characters or dashes", () => {
  for (const node of graphNodesEn) {
    assert.ok(!cjk.test(node.title + node.body), `${node.id} contains CJK characters`);
    assert.ok(!dashes.test(node.title + node.body), `${node.id} contains an en or em dash`);
  }
  assert.ok(!cjk.test(readingReviewMarkdownEn) && !dashes.test(readingReviewMarkdownEn));
});

test("visible link text matches the English title of the page it points to", () => {
  const byId = new Map(graphNodesEn.map((node) => [node.id, node]));
  for (const node of graphNodesEn) {
    for (const { text, target } of links(node.body)) {
      const expected = target === knowledgeIds.fileReadingReview ? "reading-review.md" : byId.get(target)?.title;
      assert.equal(text, expected, `${node.id} links to ${target} as "${text}"`);
    }
  }
});

test("a page repeats the memory it cites, in English as in the source library", () => {
  const byId = new Map(knowledgeNodesEn.map((node) => [node.id, node]));
  for (const node of knowledgeNodesEn.filter((item) => item.kind === "page" && item.body.includes("## Lessons kept"))) {
    const memoryId = targets(node.body).find((target) => target.startsWith("mem_"));
    assert.ok(node.body.includes(byId.get(memoryId).body), `${node.title} quotes ${memoryId}`);
  }
});

test("community regions are identified by ids and carry their topic", () => {
  const ids = new Set(graphNodes.map((node) => node.id));
  for (const group of graphCommunities) {
    assert.ok(group.ids.every((id) => ids.has(id)));
    assert.equal(group.topicId, group.ids[0]);
    assert.equal(graphNodesEn.find((node) => node.id === group.topicId).title.toLowerCase(), group.en.toLowerCase(), `${group.id}: English topic title matches the region label`);
  }
  assert.equal(communityRegions.length, graphCommunities.length);
});

test("the published English reading-review file matches the English file node", () => {
  const published = readFileSync(new URL("../public/images/home/personal-knowledge/reading-review.en.md", import.meta.url), "utf8");
  assert.equal(published, `${readingReviewMarkdownEn}\n`);
  const zh = readFileSync(new URL("../public/images/home/personal-knowledge/reading-review.md", import.meta.url), "utf8");
  assert.equal(zh, `${knowledgeNodes.find((node) => node.id === knowledgeIds.fileReadingReview).body}\n`);
  const file = getPersonalLibrary("en").resources.find((resource) => resource.id === "file-reading-review");
  assert.equal(file.href, "/images/home/personal-knowledge/reading-review.en.md");
  assert.ok(!cjk.test(file.body));
  assert.equal(getPersonalLibrary("zh-TW").resources.find((resource) => resource.id === "file-reading-review").href, "/images/home/personal-knowledge/reading-review.md");
});

test("English scenarios use keywords that occur in the English passages", () => {
  const source = readFileSync(new URL("../src/components/home/retrieval-workspace.tsx", import.meta.url), "utf8");
  const word = (name) => JSON.parse(`[${/en: \{ tab:[\s\S]*$/m.exec(source)[0].match(new RegExp(`${name}:\\[([^\\]]*)\\]`))[1]}]`);
  const english = source.slice(source.indexOf("  en: [\n    { phrase"));
  const bodies = [...english.matchAll(/keywordBody:\[([^\]]*)\]/g)].map((match) => JSON.parse(`[${match[1]}]`));
  assert.equal(bodies.length, 2);
  for (const keyword of word("keywords")) assert.match(bodies[0].join(" "), new RegExp(`\\b${keyword}\\b`, "i"), `keyword "${keyword}"`);
  for (const keyword of word("handoffWords")) assert.match(bodies[1].join(" "), new RegExp(`\\b${keyword}\\b`, "i"), `handoff word "${keyword}"`);
  assert.match(bodies[0][0], /\bsidebar\b/i, "the passage shown in the keyword lane highlights at least one keyword");
  const phrases = [...english.matchAll(/phrase:"([^"]+)", matching:"([^"]+)"/g)];
  const memoryBodies = new Map(knowledgeNodesEn.map((node) => [node.id, node.body]));
  assert.ok(memoryBodies.get(knowledgeIds.memNarrow).includes(phrases[0][2]));
  assert.ok(memoryBodies.get(knowledgeIds.memHandoff).includes(phrases[1][2]));
  for (const line of bodies[0]) assert.ok(memoryBodies.get(knowledgeIds.fileReadingReview).includes(line), line);
  assert.ok(memoryBodies.get(knowledgeIds.aiChecklist).includes(bodies[1][0]));
});
