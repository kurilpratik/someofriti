"use client";

import { useEffect, useRef, useState } from "react";

type CoverVideoProps = {
  src: string;
  poster?: string;
  alt: string;
  position?: string;
};

/**
 * A cover video that plays with its audio, used for covers marked `sound: true`
 * in lib/projects.ts.
 *
 * Browsers refuse to autoplay a video with sound until the viewer has engaged
 * with the site, and a refused `play()` leaves the cover frozen on its poster.
 * So this asks for sound first and drops back to silent playback when the
 * browser says no — and either way it keeps a toggle on screen, so the viewer
 * can turn the sound on themselves (which always counts as engagement) or off
 * again.
 */
export default function CoverVideo({
  src,
  poster,
  alt,
  position,
}: CoverVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;

    if (!video) return;

    let cancelled = false;

    video.muted = false;
    video.play().then(
      () => {
        if (!cancelled) setMuted(false);
      },
      () => {
        // Sound was blocked. Keep the cover moving silently.
        if (cancelled) return;

        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = () => {
    const video = ref.current;

    if (!video) return;

    const next = !video.muted;

    video.muted = next;
    setMuted(next);

    if (!next) video.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: position }}
      />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        className="text-brand-ivory focus-visible:outline-brand-primary absolute right-4 bottom-4 z-10 flex items-center gap-2 bg-black/55 px-3 py-2 text-[0.68rem] font-medium tracking-[0.18em] uppercase backdrop-blur-sm transition-colors duration-300 hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 sm:right-6 sm:bottom-6"
      >
        <SpeakerIcon muted={muted} />
        {muted ? "Sound on" : "Sound off"}
      </button>
    </>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      {muted ? (
        <>
          <path d="m16 9 5 6" />
          <path d="m21 9-5 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      )}
    </svg>
  );
}
