import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";
import { ensureContactProperties } from "./resend-contact-properties.mjs";
import {
  buildResendMetadata,
  listContacts,
} from "./seo-resend-fetch.mjs";

const execFileAsync = promisify(execFile);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function property(value) {
  return { type: "string", value };
}

test("Resend evidence aggregates contacts without retaining email", () => {
  const metadata = buildResendMetadata({
    date: "2026-08-01",
    fetchedAt: "2026-08-01T18:00:00.000Z",
    contacts: [
      {
        createdAt: "2026-07-31T10:00:00.000Z",
        unsubscribed: false,
        email: "must-not-survive@example.com",
        properties: {
          signup_locale: property("zh-TW"),
          signup_landing_path: property("/download?token=example-secret"),
          signup_referrer_host: property("reddit.com"),
          signup_utm_source: property("reddit"),
          signup_utm_medium: property("post"),
          signup_utm_campaign: property("llm-wiki"),
          signup_utm_medium: property("user@例子.中国"),
        },
      },
      {
        createdAt: "2026-07-30T10:00:00.000Z",
        unsubscribed: true,
        properties: {},
      },
      {
        createdAt: "2026-06-01T10:00:00.000Z",
        unsubscribed: false,
        properties: {
          signup_locale: property("en"),
        },
      },
    ],
  });

  assert.deepEqual(metadata.totals, {
    contacts: 3,
    subscribedContacts: 2,
    attributedContacts: 2,
    rangeContacts: 2,
    rangeAttributedContacts: 1,
  });
  assert.deepEqual(metadata.rangeBreakdowns.signup_locale, [
    { value: "zh-TW", count: 1 },
  ]);
  assert.deepEqual(metadata.rangeBreakdowns.signup_utm_source, [
    { value: "reddit", count: 1 },
  ]);
  assert.deepEqual(metadata.rangeBreakdowns.signup_utm_medium, []);
  assert.deepEqual(metadata.rangeBreakdowns.signup_landing_path, []);
  assert.doesNotMatch(JSON.stringify(metadata), /must-not-survive@example\.com/);
  assert.doesNotMatch(JSON.stringify(metadata), /user@例子\.中国/);
});

test("Resend evidence lists only the configured audience", async () => {
  const calls = [];
  const contacts = await listContacts(
    {
      contacts: {
        async list(options) {
          calls.push(options);
          return { data: { data: [], has_more: false }, error: null };
        },
      },
    },
    "audience-test-id",
  );

  assert.deepEqual(contacts, []);
  assert.deepEqual(calls, [{ limit: 100, audienceId: "audience-test-id" }]);
});

test("Resend contact property setup reads every page before creating", async () => {
  const listCalls = [];
  const createCalls = [];
  const required = [
    "signup_locale",
    "signup_landing_path",
    "signup_referrer_host",
    "signup_utm_source",
    "signup_utm_medium",
    "signup_utm_campaign",
  ];
  await ensureContactProperties({
    contactProperties: {
      async list(options) {
        listCalls.push(options);
        if (!options.after) {
          return {
            data: { data: [{ id: "page-one", key: "unrelated" }], has_more: true },
            error: null,
          };
        }
        return {
          data: {
            data: required.map((key, index) => ({ id: `required-${index}`, key })),
            has_more: false,
          },
          error: null,
        };
      },
      async create(options) {
        createCalls.push(options);
        return { data: { id: options.key }, error: null };
      },
    },
  });

  assert.deepEqual(listCalls, [
    { limit: 100 },
    { limit: 100, after: "page-one" },
  ]);
  assert.deepEqual(createCalls, []);
});

test("weekly report keeps Resend evidence aggregate and separate", async () => {
  const directory = await mkdtemp(join(tmpdir(), "wenlan-resend-weekly-"));
  try {
    const metadataPath = join(directory, "resend-metadata.json");
    const reportPath = join(directory, "weekly.md");
    const metadata = buildResendMetadata({
      date: "2026-06-13",
      fetchedAt: "2026-06-13T18:00:00.000Z",
      contacts: [
        {
          createdAt: "2026-06-12T10:00:00.000Z",
          unsubscribed: false,
          email: "must-not-survive@example.com",
          properties: {
            signup_locale: property("zh-TW"),
            signup_landing_path: property("/zh-TW/learn"),
          },
        },
      ],
    });
    await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
    await execFileAsync(
      process.execPath,
      [
        resolve(repoRoot, "scripts/seo-weekly.mjs"),
        "--",
        "--queries",
        resolve(repoRoot, "scripts/fixtures/seo-weekly/gsc-queries.csv"),
        "--pages",
        resolve(repoRoot, "scripts/fixtures/seo-weekly/gsc-pages.csv"),
        "--resend-metadata",
        metadataPath,
        "--date",
        "2026-06-13",
        "--output",
        reportPath,
      ],
      { cwd: repoRoot },
    );
    const report = await readFile(reportPath, "utf8");
    assert.match(report, /## Resend Signup Evidence/);
    assert.match(report, /\| Resend attributed contacts in range \| 1 \|/);
    assert.match(report, /\| Locale \| zh-TW \| 1 \|/);
    assert.match(report, /aggregate counts only and intentionally omits email addresses/);
    assert.doesNotMatch(report, /must-not-survive@example\.com/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
