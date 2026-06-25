const tokenPatterns = [
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

export function extractProtectedTokens(source: string): string[] {
  const tokens: string[] = [];
  const seen = new Set<string>();

  for (const pattern of tokenPatterns) {
    for (const match of source.matchAll(pattern)) {
      const token = cleanToken(match[0]);
      if (token && !seen.has(token)) {
        seen.add(token);
        tokens.push(token);
      }
    }
  }

  return tokens;
}

export function assertProtectedTokensPreserved(
  source: string,
  translated: string,
  label: string,
): void {
  const missing = extractProtectedTokens(source).filter(
    (token) => !translated.includes(token),
  );

  if (missing.length > 0) {
    throw new Error(`Protected tokens missing in ${label}: ${missing.join(", ")}`);
  }
}

function cleanToken(token: string): string {
  return token.trim().replace(/[.,;:!?]+$/g, "");
}
