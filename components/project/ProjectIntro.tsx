import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

const NBSP = String.fromCharCode(0xa0);

/**
 * Joins the last two words of every run of text with a non-breaking space, so a
 * line can never end with a single word on its own. A "run" is the text up to a
 * `<br />` or the end of its parent. `text-wrap: pretty` already does this most
 * of the time; this makes it certain.
 */
function bindLastWords(children: ReactNode): ReactNode {
  const items = Children.toArray(children);

  return items.map((child, index) => {
    const next = items[index + 1];

    if (typeof child === "string") {
      const endsRun =
        next === undefined || (isValidElement(next) && next.type === "br");

      return endsRun ? child.replace(/\s+(\S+)(\s*)$/, `${NBSP}$1$2`) : child;
    }

    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;

      return element.props.children === undefined
        ? element
        : cloneElement(
            element,
            undefined,
            bindLastWords(element.props.children),
          );
    }

    return child;
  });
}

/**
 * One continuous block of copy that sits straight under the sub-hero, on a
 * black card. On large screens it splits into two balanced columns; below that
 * it is a single column.
 *
 * The card is inset by the page gutter, so its edges line up with the logo and
 * the last nav link, and the section around it is transparent. It sits above
 * the cover (`relative z-10`), so as the cover sinks the card rides up over it
 * with the cover still showing in the gaps either side.
 *
 * Pass the copy as children — one or more `<p>`s.
 */
export default function ProjectIntro({ children }: { children: ReactNode }) {
  return (
    <section className="text-brand-ivory relative z-10">
      <div className="page-container">
        <div className="bg-black px-6 pt-18 pb-24 sm:px-10 sm:pt-21 sm:pb-36 lg:px-16">
          <div className="text-[1rem] leading-[1.8] tracking-[0.04em] text-pretty sm:text-[1.05rem] lg:columns-2 lg:gap-x-16 lg:text-[1.15rem] xl:text-[1.25rem] [&_p+p]:mt-[1.8em]">
            {bindLastWords(children)}
          </div>
        </div>
      </div>
    </section>
  );
}
