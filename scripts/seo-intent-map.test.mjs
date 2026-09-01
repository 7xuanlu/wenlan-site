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
  assert.equal(rows.length, 165);
  assert.deepEqual(
    Object.fromEntries(
      ["en", "zh-TW", "zh-CN"].map((locale) => [
        locale,
        rows.filter((row) => row.locale === locale).length,
      ]),
    ),
    {
      en: 113,
      "zh-TW": 26,
      "zh-CN": 26,
    },
  );
  for (const url of [
    "https://wenlan.app/learn/source-backed-research-knowledge-base",
    "https://wenlan.app/zh-TW/learn/source-backed-research-knowledge-base",
    "https://wenlan.app/zh-CN/learn/source-backed-research-knowledge-base",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-client-project-knowledge-base-for-consulting",
    "https://wenlan.app/zh-TW/learn/build-client-project-knowledge-base-for-consulting",
    "https://wenlan.app/zh-CN/learn/build-client-project-knowledge-base-for-consulting",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-investment-research-knowledge-base",
    "https://wenlan.app/zh-TW/learn/build-investment-research-knowledge-base",
    "https://wenlan.app/zh-CN/learn/build-investment-research-knowledge-base",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-product-research-knowledge-base-for-prd",
    "https://wenlan.app/zh-TW/learn/build-product-research-knowledge-base-for-prd",
    "https://wenlan.app/zh-CN/learn/build-product-research-knowledge-base-for-prd",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-sre-incident-knowledge-base",
    "https://wenlan.app/zh-TW/learn/build-sre-incident-knowledge-base",
    "https://wenlan.app/zh-CN/learn/build-sre-incident-knowledge-base",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-competitive-intelligence-knowledge-base",
    "https://wenlan.app/zh-TW/learn/build-competitive-intelligence-knowledge-base",
    "https://wenlan.app/zh-CN/learn/build-competitive-intelligence-knowledge-base",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-ict-supplier-due-diligence-evidence-pack",
    "https://wenlan.app/zh-TW/learn/build-ict-supplier-due-diligence-evidence-pack",
    "https://wenlan.app/zh-CN/learn/build-ict-supplier-due-diligence-evidence-pack",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-customer-support-answer-knowledge-base",
    "https://wenlan.app/zh-TW/learn/build-customer-support-answer-knowledge-base",
    "https://wenlan.app/zh-CN/learn/build-customer-support-answer-knowledge-base",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
  for (const url of [
    "https://wenlan.app/learn/build-course-wiki-from-lecture-notes",
    "https://wenlan.app/zh-TW/learn/build-course-wiki-from-lecture-notes",
    "https://wenlan.app/zh-CN/learn/build-course-wiki-from-lecture-notes",
  ]) {
    assert.ok(rows.some((row) => row.url === url), url);
  }
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
