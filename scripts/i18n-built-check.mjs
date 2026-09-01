#!/usr/bin/env node

const baseUrl = process.env.I18N_CHECK_BASE_URL ?? "http://127.0.0.1:3000";

const expectedOkRoutes = [
  "/",
  "/about",
  "/download",
  "/docs",
  "/docs/get-started",
  "/zh-TW",
  "/zh-TW/about",
  "/zh-TW/download",
  "/zh-TW/docs",
  "/zh-TW/docs/get-started",
  "/zh-TW/learn",
  "/zh-TW/learn/distilled-wiki-pages-ai-memory",
  "/zh-TW/learn/source-backed-wiki-pages-ai-work",
  "/zh-TW/learn/wenlan-vs-obsidian-ai-memory",
  "/zh-TW/learn/build-local-ai-knowledge-base-from-documents",
  "/zh-TW/learn/choose-ai-knowledge-base-tool",
  "/zh-TW/learn/verify-ai-knowledge-base-citations",
  "/zh-TW/learn/test-ai-knowledge-base-retrieval-after-changes",
  "/zh-TW/learn/source-backed-research-knowledge-base",
  "/zh-TW/learn/build-customer-support-answer-knowledge-base",
  "/zh-TW/learn/build-course-wiki-from-lecture-notes",
  "/zh-CN",
  "/zh-CN/about",
  "/zh-CN/download",
  "/zh-CN/docs",
  "/zh-CN/docs/get-started",
  "/zh-CN/learn",
  "/zh-CN/learn/distilled-wiki-pages-ai-memory",
  "/zh-CN/learn/source-backed-wiki-pages-ai-work",
  "/zh-CN/learn/wenlan-vs-obsidian-ai-memory",
  "/zh-CN/learn/build-local-ai-knowledge-base-from-documents",
  "/zh-CN/learn/choose-ai-knowledge-base-tool",
  "/zh-CN/learn/verify-ai-knowledge-base-citations",
  "/zh-CN/learn/test-ai-knowledge-base-retrieval-after-changes",
  "/zh-CN/learn/source-backed-research-knowledge-base",
  "/zh-CN/learn/build-customer-support-answer-knowledge-base",
  "/zh-CN/learn/build-course-wiki-from-lecture-notes",
];

const expectedNotFoundRoutes = [
  "/zh-TW/learn/wenlan-vs-basic-memory",
  "/zh-TW/docs/daily-workflow",
  "/zh-CN/learn/wenlan-vs-basic-memory",
  "/zh-CN/docs/daily-workflow",
];

function routeUrl(route) {
  return new URL(route, baseUrl).toString();
}

async function checkRoute(route, expectedStatus) {
  const response = await fetch(routeUrl(route), { redirect: "manual" });
  if (response.status !== expectedStatus) {
    throw new Error(`${route} expected ${expectedStatus}, got ${response.status}`);
  }
}

async function run() {
  const checks = [
    ...expectedOkRoutes.map((route) => [route, 200]),
    ...expectedNotFoundRoutes.map((route) => [route, 404]),
  ];
  const failures = [];

  for (const [route, expectedStatus] of checks) {
    try {
      await checkRoute(route, expectedStatus);
    } catch (error) {
      failures.push(`${route} expected ${expectedStatus}: ${error.message}`);
    }
  }

  if (failures.length) {
    throw new Error(failures.join("\n"));
  }

  console.log(`[i18n-built] base URL ok: ${baseUrl}`);
  console.log(`[i18n-built] 200 routes ok: ${expectedOkRoutes.length}`);
  console.log(`[i18n-built] 404 routes ok: ${expectedNotFoundRoutes.length}`);
}

run().catch((error) => {
  console.error(`[i18n-built] ${error.message}`);
  process.exit(1);
});
