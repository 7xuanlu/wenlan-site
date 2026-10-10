// Search Console credentials shared by the GSC scripts: GSC_ACCESS_TOKEN, or
// the gcloud application-default login.

import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

export const DEFAULT_QUOTA_PROJECT = "wenlan-500502";
const execFileAsync = promisify(execFile);

async function adcQuotaProject() {
  const credentialsPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    (process.env.HOME
      ? join(process.env.HOME, ".config", "gcloud", "application_default_credentials.json")
      : null);
  if (!credentialsPath) return null;

  try {
    const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
    return credentials.quota_project_id || null;
  } catch {
    return null;
  }
}

export async function getAccessToken() {
  const envToken = process.env.GSC_ACCESS_TOKEN?.trim();
  if (envToken) return envToken;

  const { stdout } = await execFileAsync(
    "gcloud",
    ["auth", "application-default", "print-access-token"],
    { maxBuffer: 1024 * 1024 },
  );
  const adcToken = stdout.trim();
  if (!adcToken) {
    throw new Error("gcloud auth application-default print-access-token returned an empty token");
  }
  return adcToken;
}

export async function getQuotaProject() {
  return (
    process.env.GSC_QUOTA_PROJECT?.trim() ||
    process.env.GOOGLE_CLOUD_QUOTA_PROJECT?.trim() ||
    await adcQuotaProject() ||
    DEFAULT_QUOTA_PROJECT
  );
}
