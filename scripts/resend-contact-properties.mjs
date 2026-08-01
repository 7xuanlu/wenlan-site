#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

const REQUIRED_PROPERTIES = [
  "signup_locale",
  "signup_landing_path",
  "signup_referrer_host",
  "signup_utm_source",
  "signup_utm_medium",
  "signup_utm_campaign",
];
const PAGE_SIZE = 100;
const MAX_PROPERTY_PAGES = 5;

export async function ensureContactProperties(resend) {
  const existing = new Set();
  let after;
  for (let page = 1; page <= MAX_PROPERTY_PAGES; page += 1) {
    const listed = await resend.contactProperties.list({
      limit: PAGE_SIZE,
      ...(after ? { after } : {}),
    });
    if (listed.error) throw new Error(listed.error.message);
    const rows = listed.data?.data;
    if (!Array.isArray(rows)) {
      throw new Error("Resend contact property list is missing data rows");
    }
    for (const property of rows) existing.add(property.key);
    if (!listed.data.has_more) break;

    const nextAfter = rows.at(-1)?.id;
    if (!nextAfter || nextAfter === after) {
      throw new Error("Resend contact property pagination did not advance");
    }
    if (page === MAX_PROPERTY_PAGES) {
      throw new Error(
        `Resend contact properties exceed the ${MAX_PROPERTY_PAGES * PAGE_SIZE} property safety cap`,
      );
    }
    after = nextAfter;
  }

  for (const key of REQUIRED_PROPERTIES) {
    if (existing.has(key)) {
      console.log(`[resend-properties] exists: ${key}`);
      continue;
    }

    const created = await resend.contactProperties.create({
      key,
      type: "string",
    });
    if (created.error) throw new Error(`${key}: ${created.error.message}`);
    console.log(`[resend-properties] created: ${key}`);
  }
}

async function run() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await ensureContactProperties(resend);

  console.log(
    "[resend-properties] ready; set RESEND_ACQUISITION_PROPERTIES_ENABLED=1 in the production environment",
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(`[resend-properties] ${error.message}`);
    process.exit(1);
  });
}
