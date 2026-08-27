import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPageIntentRows,
  validatePageIntentRows,
} from "./seo-intent-map.mjs";

test("every sitemap URL has one explicit locale-aware search intent", () => {
  const rows = buildPageIntentRows();
  const result = validatePageIntentRows(rows);

  assert.deepEqual(result.errors, []);
  assert.equal(rows.length, 138);
  assert.deepEqual(
    Object.fromEntries(
      ["en", "zh-TW", "zh-CN"].map((locale) => [
        locale,
        rows.filter((row) => row.locale === locale).length,
      ]),
    ),
    {
      en: 104,
      "zh-TW": 17,
      "zh-CN": 17,
    },
  );
});
test("intent validation rejects duplicate owners and unmapped sitemap URLs", () => {
  const rows = buildPageIntentRows();
  const duplicateOwner = {
    ...rows[1],
    primaryQuery: rows[0].primaryQuery,
  };
  const withoutLastPage = [...rows.slice(0, -1), duplicateOwner];
  const result = validatePageIntentRows(withoutLastPage);

  assert.ok(
    result.errors.some((error) => error.includes("duplicate primary query")),
  );
  assert.ok(result.errors.some((error) => error.includes("missing sitemap URL")));
});
