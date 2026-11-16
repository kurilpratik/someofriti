import Image from "next/image";

const BASE = "/images/projects/netflix";

/**
 * The Taproom creatives. Each file is already a pair of posts side by side on
 * black, so the two stacked make up the mockup's 2x2 grid.
 */
const CREATIVES = [
  {
    src: `${BASE}/Asset 12@4x.webp`,
    width: 1139,
    height: 569,
    alt: "Two Limited Release Taproom posts — clinking illustrated beer glasses announcing the 01.04.2021 reopening, and a #MakePlay together! post over a photo of the tap board",
  },
  {
    src: `${BASE}/Asset 11@4x.webp`,
    width: 1139,
    height: 569,
    alt: "Two more Taproom posts — a “reopening soon” glass illustration beside photographs of the taps, and the Curry Shop menu by Chef Vicky Ratnani now on Zomato",
  },
] as const;

/** The two smaller phones, stacked on the left of the device cluster. */
const SMALL_PHONES = [
  {
    src: `${BASE}/Asset 14@4x.webp`,
    width: 350,
    height: 615,
    alt: "The bira91beer Instagram profile on a phone, the grid laid out as the Gold Collection campaign",
  },
  {
    src: `${BASE}/Asset 13@4x.webp`,
    width: 350,
    height: 615,
    alt: "An Instagram story on a phone — “Celebrating 91 today as we hit 91K followers!” with the Bira monkey riding a spray of beer",
  },
] as const;

/** The large phone that stands to the right of the pair. */
const LARGE_PHONE = {
  src: `${BASE}/Asset 15@4x.webp`,
  width: 592,
  height: 1040,
  alt: "A full-bleed Instagram post on a phone — “Stay home, stay safe, repeat!” with the Bira monkey in a bubble bath",
} as const;

/**
 * Bira — Taproom campaign and socials. The retainer work as the deck lays it
 * out: the grid of Taproom creatives on the left, and the posts and stories
 * standing in device mockups to its right. Black on black, so the artwork's own
 * backgrounds run into the page.
 */
export default function TaproomSocials() {
  return (
    <section className="bg-black text-white">
      <div className="page-container pb-16 sm:pb-24 lg:pb-28">
        <h2 className="sr-only">
          Bira Taproom — campaign creatives and social stories
        </h2>

        <div className="grid grid-cols-1 items-center gap-x-10 gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          {/* The 2x2 grid of Taproom posts. */}
          <ul className="grid gap-y-4 sm:gap-y-6 lg:col-span-7">
            {CREATIVES.map((creative) => (
              <li key={creative.src}>
                <Image
                  src={creative.src}
                  width={creative.width}
                  height={creative.height}
                  alt={creative.alt}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>

          {/* The device cluster: two phones stacked beside one larger one, all
              at the same scale, which is what the fr track widths hold. */}
          <ul className="mx-auto grid w-full max-w-[26rem] grid-cols-[350fr_592fr] items-center gap-x-[9%] sm:max-w-[32rem] lg:col-span-5 lg:max-w-none">
            <li className="@container">
              {/* The gap is read off the column's own width, so the two phones
                  keep the mockup's spacing at every size. */}
              <div className="grid gap-y-[25cqw]">
                {SMALL_PHONES.map((phone) => (
                  <Image
                    key={phone.src}
                    src={phone.src}
                    width={phone.width}
                    height={phone.height}
                    alt={phone.alt}
                    sizes="(max-width: 1024px) 40vw, 16vw"
                    className="h-auto w-full"
                  />
                ))}
              </div>
            </li>

            <li>
              <Image
                src={LARGE_PHONE.src}
                width={LARGE_PHONE.width}
                height={LARGE_PHONE.height}
                alt={LARGE_PHONE.alt}
                sizes="(max-width: 1024px) 60vw, 26vw"
                className="h-auto w-full"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
