// The official iframe API reports readiness and errors; iframe load alone does not.
// https://developers.google.com/youtube/iframe_api_reference

type Player = { playVideo(): void; destroy(): void };
type PlayerEvent = { target: Player };
type PlayerApi = {
  Player: new (element: HTMLIFrameElement, options: {
    events: {
      onReady(event: PlayerEvent): void;
      onError(event: { data: number }): void;
      onAutoplayBlocked(): void;
    };
  }) => Player;
};

type PlayerWindow = Window & {
  YT?: PlayerApi;
  onYouTubeIframeAPIReady?: () => void;
};

let apiPromise: Promise<PlayerApi> | undefined;

function loadApi(): Promise<PlayerApi> {
  const playerWindow = window as PlayerWindow;
  if (playerWindow.YT?.Player) return Promise.resolve(playerWindow.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<PlayerApi>((resolve, reject) => {
    const previousReady = playerWindow.onYouTubeIframeAPIReady;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => finish(new Error("Player API timed out")), 10000);

    function finish(error?: Error) {
      window.clearTimeout(timeout);
      playerWindow.onYouTubeIframeAPIReady = previousReady;
      script.onerror = null;
      if (error) {
        script.remove();
        reject(error);
      } else if (playerWindow.YT?.Player) {
        resolve(playerWindow.YT);
      } else {
        reject(new Error("Player API unavailable"));
      }
    }

    playerWindow.onYouTubeIframeAPIReady = () => {
      finish();
      previousReady?.();
    };
    script.async = true;
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => finish(new Error("Player API failed to load"));
    document.head.append(script);
  }).catch((error: unknown) => {
    apiPromise = undefined;
    throw error;
  });
  return apiPromise;
}

export function mountDemoPlayer(
  host: HTMLDivElement,
  embedUrl: string,
  title: string,
  callbacks: { onReady(play: () => void): void; onError(reason: string): void },
): () => void {
  let disposed = false;
  let player: Player | undefined;
  const iframe = document.createElement("iframe");
  const url = new URL(embedUrl);
  url.searchParams.set("enablejsapi", "1");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("origin", window.location.origin);
  iframe.src = url.href;
  iframe.title = title;
  iframe.className = "absolute inset-0 h-full w-full";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.tabIndex = -1;

  let timeout: number | undefined;

  function dispose() {
    if (disposed) return;
    disposed = true;
    window.clearTimeout(timeout);
    player?.destroy();
    host.replaceChildren();
  }

  function fail(reason: string) {
    if (disposed) return;
    dispose();
    callbacks.onError(reason);
  }

  function ready() {
    if (disposed) return;
    window.clearTimeout(timeout);
    iframe.tabIndex = 0;
    callbacks.onReady(() => { if (!disposed) player?.playVideo(); });
    if (document.activeElement === document.body || host.contains(document.activeElement)) {
      iframe.focus({ preventScroll: true });
    }
  }

  void loadApi().then((api) => {
    if (disposed) return;
    // API loading has its own deadline; give the actual player its full budget.
    timeout = window.setTimeout(() => fail("player-ready-timeout"), 12000);
    host.append(iframe);
    player = new api.Player(iframe, {
      events: {
        onReady: (event) => {
          if (disposed) return;
          ready();
          event.target.playVideo();
        },
        onError: (event) => fail(`youtube-${event.data}`),
        onAutoplayBlocked: ready,
      },
    });
  }).catch((error: unknown) => fail(error instanceof Error ? error.message : "player-init-failed"));

  return dispose;
}
