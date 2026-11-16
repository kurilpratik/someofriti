import Image from "next/image";

const BASE = "/images/projects/netflix";

/**
 * The StreamFest artwork, in the two rows the deck lays it out in. Each file is
 * already a full row of tiles with the gaps built in — the collab posts carry
 * their own red, and the character studies are cut out on transparency — so
 * both sit straight on the section's red without any seam.
 */
const ROWS = [
  {
    src: `${BASE}/Asset 17@4x.jpg`,
    width: 2282,
    height: 733,
    alt: "Three Bira 91 × Netflix collab posts — Eleven from Stranger Things beside the Money Heist monkey in a red jumpsuit; a Stranger Things girl on ruled notepaper beside Sartaj from Sacred Games; and the Bira White bottle with the monkey shouting “B*TTL#D!!!”",
  },
  {
    src: `${BASE}/Asset 16@4x.webp`,
    width: 2209,
    height: 722,
    alt: "Three character illustrations — the Money Heist monkey with a rifle, Eleven in a crown on red, and Ganesh Gaitonde from Sacred Games in a paisley shirt",
  },
] as const;

/**
 * Bira × Netflix — StreamFest. The show artwork on the campaign's red: the
 * collab posts across the top, the character studies that built them below.
 */
export default function StreamFestShows() {
  return (
    <section className="bg-brand-primary text-white">
      <div className="page-container py-16 sm:py-24 lg:py-28">
        <h2 className="sr-only">
          Bira 91 × Netflix StreamFest — show artwork and character studies
        </h2>

        <ul className="grid gap-y-10 sm:gap-y-14 lg:gap-y-16">
          {ROWS.map((row) => (
            <li key={row.src}>
              <Image
                src={row.src}
                width={row.width}
                height={row.height}
                alt={row.alt}
                sizes="100vw"
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
