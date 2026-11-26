"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Artwork = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const OpenArtwork = createContext<(index: number) => void>(() => {});

const CONTROL =
  "text-brand-ivory absolute z-10 flex size-12 items-center justify-center text-[1.6rem] leading-none opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100";

/**
 * Full-screen viewer for the artwork grid. Wrap the grid in it, and each piece
 * in an `ArtworkButton` with its index in `artworks`. Arrow keys step through
 * every piece; Escape, the close button or a click outside the art closes it.
 */
export default function ArtworkViewer({
  artworks,
  children,
}: {
  artworks: Artwork[];
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((next: number) => {
    setIndex(next);
    dialogRef.current?.showModal();
  }, []);

  const step = useCallback(
    (by: number) =>
      setIndex((current) =>
        current === null
          ? current
          : (current + by + artworks.length) % artworks.length,
      ),
    [artworks.length],
  );

  // Hold the page still behind the viewer.
  useEffect(() => {
    if (index === null) return;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, [index]);

  const artwork = index === null ? null : artworks[index];

  return (
    <OpenArtwork.Provider value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label={artwork ? artwork.alt : "Artwork"}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          // Clicks on the dialog itself (not the art or controls) land on the backdrop area.
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-black/95 p-0 backdrop:bg-transparent"
      >
        {artwork && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-16 sm:p-20">
            <Image
              key={artwork.src}
              src={artwork.src}
              alt={artwork.alt}
              width={artwork.width}
              height={artwork.height}
              sizes="90vw"
              quality={90}
              className="pointer-events-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className={`${CONTROL} top-3 right-3 sm:top-5 sm:right-5`}
        >
          ✕
        </button>
        {artworks.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous artwork"
              className={`${CONTROL} top-1/2 left-1 -translate-y-1/2 sm:left-4`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next artwork"
              className={`${CONTROL} top-1/2 right-1 -translate-y-1/2 sm:right-4`}
            >
              →
            </button>
          </>
        )}
      </dialog>
    </OpenArtwork.Provider>
  );
}

/** Makes one piece of the grid open the viewer at `index`. */
export function ArtworkButton({
  index,
  label,
  children,
  className,
}: {
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const open = useContext(OpenArtwork);

  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={`View larger: ${label}`}
      aria-haspopup="dialog"
      className={`block w-full ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
