#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

const DEFAULT_OUTPUT = "/tmp/wenlan-seo/resend-metadata.json";
const DAY_MS = 24 * 60 * 60 * 1000;
const PAGE_SIZE = 100;
const MAX_CONTACTS = 5_000;
const DETAIL_CONCURRENCY = 8;
const RESEND_SCOPE = "configured Resend audience";
const UTM_VALUE = /^[\p{L}\p{N}][\p{L}\p{N} ._~-]*$/u;
const PROPERTY_KEYS = [
  "signup_locale",
  "signup_landing_path",
  "signup_referrer_host",
  "signup_utm_source",
  "signup_utm_medium",
  "signup_utm_campaign",
];

function parseIsoDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date`);
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date`);
  }
  return parsed;
}

function dateRangeFromReportDate(date) {
  const reportDate = parseIsoDate(date, "--date");
  const endDate = new Date(reportDate.valueOf() - DAY_MS);
  const startDate = new Date(endDate.valueOf() - 27 * DAY_MS);
  return {
    reportDate: date,
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
  };
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (!argument.startsWith("--")) {
      throw new Error(`Unexpected argument: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${argument}`);
    }
    args[argument.slice(2)] = value;
    index += 1;
  }

  if (!args.date) throw new Error("Missing required --date");
  return {
    ...dateRangeFromReportDate(args.date),
    outputPath: resolve(args.output ?? DEFAULT_OUTPUT),
  };
}

function propertyValue(contact, key) {
  const raw = contact.properties?.[key];
  const value = raw && typeof raw === "object" && "value" in raw ? raw.value : raw;
  if (typeof value !== "string" && typeof value !== "number") return "";
  const normalized = String(value)
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  if (!normalized || normalized.includes("@")) return "";
  if (key === "signup_locale") {
    return /^(?:en|zh-TW|zh-CN)$/.test(normalized) ? normalized : "";
  }
  if (key === "signup_landing_path") {
    let decoded;
    try {
      decoded = decodeURIComponent(normalized);
    } catch {
      return "";
    }
    return normalized.startsWith("/") &&
      !normalized.startsWith("//") &&
      !/[?#\\]/.test(normalized) &&
      !decoded.includes("@")
      ? normalized
      : "";
  }
  if (key === "signup_referrer_host") {
    if (normalized === "direct") return normalized;
    try {
      const parsed = new URL(`https://${normalized}`);
      return parsed.hostname.toLowerCase() === normalized.toLowerCase() &&
        !parsed.username &&
        !parsed.password &&
        !parsed.port
        ? normalized
        : "";
    } catch {
      return "";
    }
  }
  return UTM_VALUE.test(normalized) ? normalized : "";
}

function breakdown(contacts, key) {
  const counts = new Map();
  for (const contact of contacts) {
    const value = propertyValue(contact, key);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => right.count - left.count || left.value.localeCompare(right.value));
}

function validTimestamp(value, label) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    throw new Error(`${label} must be an ISO timestamp`);
  }
  return parsed;
}

export function buildResendMetadata({ contacts, date, fetchedAt }) {
  const range = dateRangeFromReportDate(date);
  const rangeStart = new Date(`${range.startDate}T00:00:00.000Z`);
  const rangeEndExclusive = new Date(`${date}T00:00:00.000Z`);
  validTimestamp(fetchedAt, "fetchedAt");

  const normalized = contacts.map((contact, index) => {
    const createdAt = validTimestamp(contact.createdAt, `contact ${index} createdAt`);
    return {
      createdAt,
      unsubscribed: Boolean(contact.unsubscribed),
      properties: contact.properties ?? {},
    };
  });
  const inRange = normalized.filter(
    (contact) => contact.createdAt >= rangeStart && contact.createdAt < rangeEndExclusive,
  );
  const isAttributed = (contact) =>
    PROPERTY_KEYS.some((key) => propertyValue(contact, key));
  const attributed = normalized.filter(isAttributed);
  const attributedInRange = inRange.filter(isAttributed);

  return {
    schemaVersion: 1,
    source: "Resend Contacts API",
    scope: RESEND_SCOPE,
    ...range,
    fetchedAt,
    totals: {
      contacts: normalized.length,
      subscribedContacts: normalized.filter((contact) => !contact.unsubscribed).length,
      attributedContacts: attributed.length,
      rangeContacts: inRange.length,
      rangeAttributedContacts: attributedInRange.length,
    },
    rangeBreakdowns: Object.fromEntries(
      PROPERTY_KEYS.map((key) => [key, breakdown(attributedInRange, key)]),
    ),
  };
}

export async function listContacts(resend, audienceId) {
  const contacts = [];
  let after;
  while (contacts.length < MAX_CONTACTS) {
    const result = await resend.contacts.list({
      limit: PAGE_SIZE,
      audienceId,
      ...(after ? { after } : {}),
    });
    if (result.error) throw new Error(result.error.message);
    const rows = result.data?.data;
    if (!Array.isArray(rows)) {
      throw new Error("Resend contacts response is missing data rows");
    }
    contacts.push(...rows);
    if (!result.data.has_more) return contacts;
    const nextAfter = rows.at(-1)?.id;
    if (!nextAfter || nextAfter === after) {
      throw new Error("Resend contacts pagination did not advance");
    }
    after = nextAfter;
  }
  throw new Error(`Resend contact count exceeds the ${MAX_CONTACTS} safety cap`);
}

async function contactDetails(resend, contacts) {
  const details = [];
  for (let index = 0; index < contacts.length; index += DETAIL_CONCURRENCY) {
    const batch = contacts.slice(index, index + DETAIL_CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (contact) => {
        const result = await resend.contacts.get(contact.id);
        if (result.error) throw new Error(result.error.message);
        return {
          createdAt: result.data.created_at,
          unsubscribed: result.data.unsubscribed,
          properties: result.data.properties,
        };
      }),
    );
    details.push(...results);
  }
  return details;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required");
  }
  if (!process.env.RESEND_AUDIENCE_ID) {
    throw new Error("RESEND_AUDIENCE_ID is required");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const contacts = await listContacts(resend, process.env.RESEND_AUDIENCE_ID);
  const details = await contactDetails(resend, contacts);
  const metadata = buildResendMetadata({
    contacts: details,
    date: args.reportDate,
    fetchedAt: new Date().toISOString(),
  });

  await mkdir(dirname(args.outputPath), { recursive: true });
  await writeFile(args.outputPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
  console.log(
    `[seo-resend] wrote ${args.outputPath}: ${metadata.totals.rangeAttributedContacts} attributed contacts in range; ${metadata.totals.contacts} total contacts`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(`[seo-resend] ${error.message}`);
    process.exit(1);
  });
}
