import { createSearchAPI } from "fumadocs-core/search/server";
import { readingSearchIndexes } from "@/lib/reading-search";

const search = createSearchAPI("advanced", {localeFilter: true, indexes: readingSearchIndexes});
export async function GET(request: Request) {
  const response = await search.GET(request);
  response.headers.set("X-Robots-Tag", "noindex");
  return response;
}
