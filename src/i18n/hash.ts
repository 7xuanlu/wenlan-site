import { createHash } from "node:crypto";

export type LeafString = {
  path: string;
  value: string;
};

export function normalizeForHash(value: string): string {
  return value.replace(/\r\n?/g, "\n").replace(/\s+/g, " ").trim();
}

export function flattenLeafStrings(value: unknown, path = ""): LeafString[] {
  if (typeof value === "string") {
    return [{ path, value }];
  }

  if (Array.isArray(value)) {
    return value
      .flatMap((item, index) => flattenLeafStrings(item, `${path}[${index}]`))
      .sort(compareLeaves);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .flatMap((key) =>
        flattenLeafStrings(
          (value as Record<string, unknown>)[key],
          path ? `${path}.${key}` : key,
        ),
      )
      .sort(compareLeaves);
  }

  return [];
}

export function hashEnglishContentUnit(content: unknown): string {
  const payload = flattenLeafStrings(content)
    .map(({ path, value }) => `${path}\u0000${normalizeForHash(value)}`)
    .join("\u0001");

  return createHash("sha256").update(payload).digest("hex");
}

// Learn articles carry their own publication metadata. Drift detection is about
// the English prose a translator worked from, so identity and dates are
// excluded: a date bump alone must not look like stale translation, and a
// changed sentence or link must.
export function hashEnglishLearnArticle(article: unknown): string {
  const { slug, publishedAt, updatedAt, ...translatable } = article as Record<
    string,
    unknown
  >;
  void slug;
  void publishedAt;
  void updatedAt;

  return hashEnglishContentUnit(translatable);
}

function compareLeaves(left: LeafString, right: LeafString): number {
  return left.path.localeCompare(right.path);
}
