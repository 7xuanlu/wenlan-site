"use client";

import { useState } from "react";

type DemoVideoProps = {
  embedUrl: string;
  posterUrl: string;
  title: string;
};

export function DemoVideo({ embedUrl, posterUrl, title }: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={embedUrl}
        title={title}
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={`Play ${title}`}
      onClick={() => setIsPlaying(true)}
      className="group absolute inset-0 block overflow-hidden bg-[var(--o-bg-deep)] text-left"
    >
      <img
        src={posterUrl}
        alt=""
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover brightness-[0.72] transition-transform duration-300 group-hover:scale-[1.015]"
      />
      <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/55" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#111124] shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-transform duration-150 group-hover:scale-105 sm:size-20" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-7 sm:size-8">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="absolute bottom-5 left-5 font-serif text-xl font-medium text-white shadow-black [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] sm:bottom-7 sm:left-7 sm:text-2xl">
        {title}
      </span>
    </button>
  );
}
