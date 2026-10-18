/** Bind one expanded player. Closing/retrying releases audio and the media request. */
export function mountNativeDemoPlayer(
  video: HTMLVideoElement,
  source: string,
  callbacks: { onReady: () => void; onError: (reason: string) => void },
  timeoutMs = 20000,
) {
  let disposed = false;
  let failed = false;
  const ready = () => {
    if (disposed || failed) return;
    clearTimeout(timer);
    callbacks.onReady();
  };
  const fail = (reason: string) => {
    if (disposed || failed) return;
    failed = true;
    clearTimeout(timer);
    video.pause();
    callbacks.onError(reason);
  };
  const error = () => fail(`media-error-${video.error?.code ?? "unknown"}`);
  const timer = setTimeout(() => {
    if (video.readyState >= 2) ready();
    else fail("media-load-timeout");
  }, timeoutMs);
  video.addEventListener("loadeddata", ready);
  video.addEventListener("error", error);
  // Subscribe before starting a request, including during Strict Mode remounts.
  video.src = source;
  if (video.error) error();
  else if (video.readyState >= 2) ready();
  void video.play().catch((error: unknown) => {
    if (disposed || failed) return;
    // Autoplay may be refused, especially on mobile. Keep native Play available.
    if (error instanceof Error && error.name === "NotAllowedError") return;
    else fail("media-play-failed");
  });
  return () => {
    disposed = true;
    clearTimeout(timer);
    video.removeEventListener("loadeddata", ready);
    video.removeEventListener("error", error);
    video.pause();
    video.removeAttribute("src");
    video.load();
  };
}
