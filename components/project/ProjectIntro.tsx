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
 * One continuous block of copy that sits straight under the sub-hero. It spans
 * the same container as the navbar, so the text lines up with the logo on the
 * left and the last nav link on the right. On large screens it splits into two
 * balanced columns; below that it is a single column.
 *
 * Pass the copy as children — one or more `<p>`s.
 */
export default function ProjectIntro({ children }: { children: ReactNode }) {
  return (
    <section className="text-brand-ivory bg-black">
      <div className="page-container pt-12 pb-16 sm:pt-14 sm:pb-24">
        <div className="text-[1rem] leading-[1.8] tracking-[0.04em] text-pretty sm:text-[1.05rem] lg:columns-2 lg:gap-x-16 lg:text-[1.15rem] xl:text-[1.25rem] [&_p+p]:mt-[1.8em]">
          {bindLastWords(children)}
        </div>
      </div>
    </section>
  );
}
