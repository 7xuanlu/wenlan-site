#!/usr/bin/env node
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const exec = promisify(execFile);
const REPO = "7xuanlu/wenlan";

export async function githubTrafficSnapshot(read, capturedAt = new Date().toISOString()) {
  const observations = {};
  // Each source can be unavailable independently. Never substitute a zero.
  for (const endpoint of ["views", "clones", "popular/referrers", "popular/paths"]) {
    try {
      const data = await read(`repos/${REPO}/traffic/${endpoint}`);
      observations[endpoint] = { status: "available", data };
    } catch {
      observations[endpoint] = { status: "unavailable", reason: "Authenticated GitHub traffic read failed; verify access separately." };
    }
  }
  try {
    const dates = [];
    let complete = false;
    for (let page = 1; page <= 10; page++) {
      const rows = await read(`repos/${REPO}/stargazers?per_page=100&page=${page}`, true);
      if (!Array.isArray(rows) || rows.some(row => !Number.isFinite(Date.parse(row.starred_at)))) throw Error("Invalid dates");
      dates.push(...rows.map(row => row.starred_at));
      if (rows.length < 100) { complete = true; break; }
    }
    const perDay = {};
    for (const date of dates) perDay[date.slice(0, 10)] = (perDay[date.slice(0, 10)] ?? 0) + 1;
    observations.stargazers = {
      status: complete ? "available" : "partial",
      currentStargazersRead: dates.length,
      perDayUTC: perDay,
      caveat: "Dates of current stargazers, not historical net growth; unstarring is not reconstructed. No user identities or source-to-star join are stored.",
    };
  } catch {
    observations.stargazers = { status: "unavailable" };
  }
  return {
    source: "GitHub REST", repository: REPO, capturedAt,
    trafficWindow: "GitHub rolling 14 days; latest returned day may lag capture time. Referrer/path rows are aggregates, not daily attribution.",
    caveat: "Clones include automation and are not installs or people. Referrer unique counts cannot be summed into a deduplicated audience. No causality or star conversion is inferred.",
    observations,
  };
}

async function main() {
  const argv = process.argv.slice(2).filter(arg => arg !== "--");
  if (argv.length !== 2 || argv[0] !== "--output") throw Error("Usage: --output /absolute/path/github-traffic.json");
  const output = resolve(argv[1]);
  const snapshot = await githubTrafficSnapshot(async (path, star) => {
    const args = ["api", path];
    if (star) args.push("-H", "Accept: application/vnd.github.star+json");
    const { stdout } = await exec("gh", args, { maxBuffer: 4 * 1024 * 1024, timeout: 30000 });
    return JSON.parse(stdout);
  });
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(JSON.stringify({ output, capturedAt: snapshot.capturedAt, statuses: Object.fromEntries(Object.entries(snapshot.observations).map(([key, value]) => [key, value.status])) }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
