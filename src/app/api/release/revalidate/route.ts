import { revalidatePath, revalidateTag } from "next/cache";

import { fetchPublishedRelease } from "@/lib/release-manifest";
import { RELEASE_CACHE_TAG, handleReleaseWebhook } from "@/lib/release-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GitHub "Releases" webhook from wenlan-app/wenlan, signed with
// RELEASE_WEBHOOK_SECRET. Expires the release cache and the pages that render it.
export async function POST(request: Request): Promise<Response> {
  return handleReleaseWebhook(request, {
    secret: process.env.RELEASE_WEBHOOK_SECRET,
    fetchLatest: () => fetchPublishedRelease(),
    revalidate: (paths) => {
      revalidateTag(RELEASE_CACHE_TAG, { expire: 0 });
      for (const path of paths) revalidatePath(path);
    },
  });
}
