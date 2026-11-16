import Image from "next/image";

const BASE = "/images/projects/bangalore";

/**
 * Bangalore Art Weekend — the identity off the page. The printed programme and
 * the feather flags stack down the left, the panel backdrop stands portrait to
 * their right.
 *
 * The layout is read straight off the deck as percentages of the container, so
 * it holds at every width: the two columns are 37.4% and 46.7% wide with the
 * rest falling out as the gutter, the flags sit inset under the programme, and
 * the gap between them (14.2cqw) is what drops the left column's foot below the
 * backdrop's — the stagger the deck has. Change the gap and that stagger goes.
 */
export default function FestivalCollateral() {
  return (
    <section className="bg-black">
      <div className="page-container @container pt-4 pb-16 sm:pb-24 lg:pb-28">
        <h2 className="sr-only">
          Bangalore Art Weekend — printed programme, panel backdrop and festival
          flags
        </h2>

        <div className="grid gap-y-12 sm:gap-y-16 lg:grid-cols-[37.4%_46.7%] lg:justify-between lg:gap-y-0">
          {/* Left column: the programme, then the flags inset beneath it. */}
          <div className="flex flex-col gap-y-12 sm:gap-y-16 lg:gap-y-[14.2cqw]">
            <Image
              src={`${BASE}/Asset 20@4x.webp`}
              width={835}
              height={709}
              alt="Two hands holding the Bangalore Art Weekend programme — a duotone screen print of the Bangalore Palace in red over blue-grey, the title set across it in English and Kannada"
              sizes="(max-width: 1024px) 100vw, 37vw"
              className="h-auto w-full"
            />

            <Image
              src={`${BASE}/Asset 19@4x.webp`}
              width={632}
              height={596}
              alt="Three feather flags side by side — Bangalore Art Weekend set vertically in white on blue, the palace print in red at the centre, and the title again in English and Kannada"
              sizes="(max-width: 1024px) 100vw, 31vw"
              className="h-auto w-[82%] self-center lg:ml-[11.5%] lg:self-start"
            />
          </div>

          {/* Right column: the backdrop in the room. */}
          <Image
            src={`${BASE}/Asset 21@4x.webp`}
            width={1012}
            height={1410}
            alt="A panel on stage in front of the festival backdrop — three speakers seated on white chairs under the Bangalore Art Weekend title and the session name, “Becoming: Shaping a Character — From Script to Screen”"
            sizes="(max-width: 1024px) 100vw, 47vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
