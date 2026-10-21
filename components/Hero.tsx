export default function Hero() {
  return (
    <main className="text-brand-ivory flex min-h-screen items-center justify-center bg-black px-6 py-16">
      <div className="flex w-full flex-col items-center">
        <div
          aria-hidden="true"
          className="bg-brand-red mb-6 size-8"
          style={{
            maskImage: "url('/images/logo/icon.png')",
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            WebkitMaskImage: "url('/images/logo/icon.png')",
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
          }}
        />

        <h1 className="hero-title text-brand-ivory max-w-[760px] text-center text-[clamp(1.05rem,2vw,1.4rem)] leading-[1.35] tracking-[0.035em]">
          I&apos;m a designer working across identity,
          <br className="hidden sm:block" /> systems, and brand storytelling. My
          work sits between
          <br className="hidden sm:block" /> structure and instinct
        </h1>

        <nav
          aria-label="Explore"
          className="mt-9 flex items-center gap-5 sm:gap-16"
        >
          <a
            href="#about"
            className="group hover:text-brand-ivory relative inline-flex min-h-18 min-w-47.5 items-center justify-center text-[0.8rem] font-medium tracking-[0.18em] text-[#554D4D] uppercase transition-colors sm:min-w-50"
          >
            <svg
              viewBox="0 0 240 76"
              aria-hidden="true"
              className="text-brand-red pointer-events-none absolute inset-0 size-full overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <ellipse cx="110" cy="38" rx="101" ry="31" />
              <path d="M53 66c24 3 54 6 93 8" strokeLinecap="round" />
            </svg>
            <span className="relative">Know more?</span>
          </a>

          <a
            href="#work"
            className="group hover:text-brand-ivory relative inline-flex min-h-18 min-w-47.5 items-center justify-center text-[0.8rem] font-medium tracking-[0.18em] text-[#554D4D] uppercase transition-colors sm:min-w-50"
          >
            <svg
              viewBox="0 0 240 76"
              aria-hidden="true"
              className="text-brand-red pointer-events-none absolute inset-0 size-full overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <ellipse cx="120" cy="36" rx="117" ry="35" />
              <path d="M62 69c35 1 71 3 112 8" strokeLinecap="round" />
            </svg>
            <span className="relative">Straight to work</span>
          </a>
        </nav>
      </div>
    </main>
  );
}
