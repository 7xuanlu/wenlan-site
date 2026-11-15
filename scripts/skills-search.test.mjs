import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MAX_LIMIT,
  normalizeHits,
  parseSearchParams,
  searchSkills,
  SKILLS_SH_SEARCH_URL,
} from "../src/lib/skills-search.ts";

const url = (qs) => new URL(`https://wenlan.app/api/skills/search?${qs}`);

test("rejects too-short, too-long and bad limits", () => {
  assert.ok("error" in parseSearchParams(url("q=a")));
  assert.ok("error" in parseSearchParams(url(`q=${"x".repeat(101)}`)));
  assert.ok("error" in parseSearchParams(url("q=notes&limit=0")));
  assert.ok("error" in parseSearchParams(url(`q=notes&limit=${MAX_LIMIT + 1}`)));
  assert.ok("error" in parseSearchParams(url("q=notes&limit=2.5")));
  assert.deepEqual(parseSearchParams(url("q=%20meeting%20notes%20&limit=5")), { query: "meeting notes", limit: 5 });
  assert.deepEqual(parseSearchParams(url("q=notes")), { query: "notes", limit: 20 });
});

test("keeps only known fields and drops broken rows", () => {
  const hits = normalizeHits({
    skills: [
      { id: "a/b/c", slug: "c", name: "C", source: "a/b", installs: 12.7, secret: "x" },
      { slug: "d", source: "a/b" },
      { slug: "", source: "a/b" },
      { name: "no slug" },
      null,
    ],
  });
  assert.deepEqual(hits, [
    { id: "a/b/c", slug: "c", name: "C", source: "a/b", installs: 12 },
    { id: "a/b/d", slug: "d", name: "d", source: "a/b", installs: 0 },
  ]);
  assert.equal(normalizeHits({ nope: [] }), null);
  assert.equal(normalizeHits("text"), null);
});

test("no token means not configured, upstream is never called", async () => {
  let called = false;
  const result = await searchSkills({ query: "notes", limit: 5 }, undefined, async () => {
    called = true;
    return new Response("{}");
  });
  assert.equal(result.status, 503);
  assert.equal(called, false);
});

test("sends the token and query to the documented API", async () => {
  let seen;
  const result = await searchSkills({ query: "meeting notes", limit: 5 }, "tok", async (target, init) => {
    seen = { target: String(target), auth: init.headers.Authorization };
    return Response.json({ skills: [{ slug: "m", source: "o/r", installs: 3 }] });
  });
  assert.equal(seen.auth, "Bearer tok");
  assert.equal(seen.target, `${SKILLS_SH_SEARCH_URL}?q=meeting+notes&limit=5`);
  assert.deepEqual(result, {
    ok: true,
    status: 200,
    body: { query: "meeting notes", skills: [{ id: "o/r/m", slug: "m", name: "m", source: "o/r", installs: 3 }] },
  });
});

test("upstream failures become 502", async () => {
  const q = { query: "notes", limit: 5 };
  assert.equal((await searchSkills(q, "t", async () => new Response("no", { status: 401 }))).status, 502);
  assert.equal((await searchSkills(q, "t", async () => new Response("not json"))).status, 502);
  assert.equal((await searchSkills(q, "t", async () => Response.json({ other: 1 }))).status, 502);
  assert.equal(
    (await searchSkills(q, "t", async () => {
      throw new Error("down");
    })).status,
    502,
  );
});
