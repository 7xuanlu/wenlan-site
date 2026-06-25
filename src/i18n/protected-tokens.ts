import { flattenLeafStrings } from "./hash";

const tokenPatterns = [
  /\bWenlan\b/g,
  /\bGitHub\b/g,
  /\/plugin\s+(?:marketplace\s+add|install)\s+[A-Za-z0-9@/_-]+/g,
  /\/init\b/g,
  /\bnpx\s+-y\s+[A-Za-z0-9@/_-]+(?:\s+[A-Za-z0-9@/_-]+){0,4}/g,
  /~\/\.[A-Za-z0-9_-]+\/bin\/[A-Za-z0-9_-]+(?:\s+[A-Za-z0-9_-]+){0,6}/g,
  /https?:\/\/[^\s`"'<>),，。]+/g,
  /@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*/gi,
  /\b[a-z0-9][a-z0-9._-]*@[a-z0-9][a-z0-9._-]*\b/gi,
  /\b[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*\b/gi,
  /\bWENLAN_[A-Z0-9_]+\b/g,
  /\bLME_[A-Za-z0-9_]+\b/g,
  /\b\d+(?:\.\d+)?%/g,
  /\b\d+\.\d{3}\b/g,
  /\bApache-2\.0\b/g,
  /\bQi-Xuan Lu\b/g,
  /\b7xuanlu\b/g,
] as const;

export function extractProtectedTokens(source: unknown): string[] {
  const tokens: string[] = [];
  const seen = new Set<string>();

  for (const { value } of flattenLeafStrings(source)) {
    collectProtectedTokens(value, tokens, seen);
  }

  return tokens;
}

export function assertProtectedTokensPreserved(
  source: unknown,
  translated: unknown,
  label: string,
): void {
  const translatedLeaves = new Map(
    flattenLeafStrings(translated).map(({ path, value }) => [path, value]),
  );
  const missing: string[] = [];

  for (const sourceLeaf of flattenLeafStrings(source)) {
    const translatedValue = translatedLeaves.get(sourceLeaf.path) ?? "";

    if (isExactProtectedLeafPath(sourceLeaf.path)) {
      if (translatedValue !== sourceLeaf.value) {
        missing.push(formatMissingToken(sourceLeaf.path, sourceLeaf.value));
      }
      continue;
    }

    for (const token of extractProtectedTokens(sourceLeaf.value)) {
      if (!translatedValue.includes(token)) {
        missing.push(formatMissingToken(sourceLeaf.path, token));
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(`Protected tokens missing in ${label}: ${missing.join(", ")}`);
  }
}

function isExactProtectedLeafPath(path: string): boolean {
  return path === "href" || path.endsWith(".href");
}

function collectProtectedTokens(
  source: string,
  tokens: string[],
  seen: Set<string>,
): void {
  for (const pattern of tokenPatterns) {
    for (const match of source.matchAll(pattern)) {
      const token = cleanToken(match[0]);
      if (token && !seen.has(token)) {
        seen.add(token);
        tokens.push(token);
      }
    }
  }
}

function formatMissingToken(path: string, token: string): string {
  return path ? `${path}: ${token}` : token;
}

function cleanToken(token: string): string {
  return token.trim().replace(/[.,;:!?]+$/g, "");
}
