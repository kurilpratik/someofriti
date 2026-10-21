"use client";

import { useEffect, useState } from "react";

const letters = "Hello".split("");

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 2600);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={`pointer-events-none fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-black transition-all duration-1000 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full"
      }`}
    >
      <span
        className="font-ivy-ora flex items-center justify-center text-[clamp(4rem,10vw,10rem)] font-extralight text-white italic"
        style={{ fontStyle: "italic" }}
      >
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="hello-letter inline-block"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
