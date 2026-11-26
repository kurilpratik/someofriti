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

const isBreak = (node: ReactNode) => isValidElement(node) && node.type === "br";

/** Drops the whitespace JSX leaves around the edges of a paragraph. */
function trimEdges(nodes: ReactNode[]): ReactNode[] {
  const out = [...nodes];
  if (typeof out[0] === "string") out[0] = out[0].trimStart();
  const last = out.length - 1;
  if (typeof out[last] === "string") out[last] = out[last].trimEnd();
  return out.filter((node) => node !== "");
}

/**
 * Put between two paragraphs of a `ProjectIntro` to start the right-hand column
 * there, for copy whose paragraphs should stay whole rather than flow on from
 * one column into the next. Has no effect on phones, where there is one column.
 */
export function ColumnBreak() {
  return null;
}

type Paragraph = { nodes: ReactNode[]; startsColumn: boolean };

/**
 * Turns the copy into a flat list of paragraphs. Each `<p>` is one paragraph,
 * and a `<br /><br />` inside a `<p>` also counts as a paragraph break, so
 * every page can be laid out the same way whichever form its copy is in.
 */
function toParagraphs(children: ReactNode): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  let breakPending = false;

  const push = (nodes: ReactNode[]) => {
    const trimmed = trimEdges(nodes);
    if (trimmed.length === 0) return;
    paragraphs.push({ nodes: trimmed, startsColumn: breakPending });
    breakPending = false;
  };

  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === ColumnBreak) {
      breakPending = true;
      continue;
    }

    const element = child as ReactElement<{ children?: ReactNode }>;
    if (!isValidElement(child) || element.type !== "p") {
      push([child]);
      continue;
    }

    const parts = Children.toArray(element.props.children);
    let current: ReactNode[] = [];
    for (let i = 0; i < parts.length; i++) {
      if (isBreak(parts[i]) && isBreak(parts[i + 1])) {
        push(current);
        current = [];
        i++;
      } else {
        current.push(parts[i]);
      }
    }
    push(current);
  }

  return paragraphs;
}

/**
 * The copy that sits straight under the sub-hero, on a black card. From `sm` up
 * the text flows through two balanced columns — a paragraph can run on from the
 * bottom of the left column to the top of the right — and both columns start on
 * the same line. On phones it is a single column.
 *
 * Spacing between paragraphs is a top margin, which the browser drops at the
 * top of a column, so the right column never starts with a gap. That's also why
 * `<br /><br />` breaks are turned into real paragraphs: a pair of `<br />`s
 * landing at a column top would leave a blank line there.
 *
 * The card is inset by the page gutter, so its edges line up with the logo and
 * the last nav link, and the section around it is transparent. It sits above
 * the cover (`relative z-10`), so as the cover sinks the card rides up over it
 * with the cover still showing in the gaps either side.
 *
 * Pass the copy as children — one or more `<p>`s; `<br /><br />` inside a `<p>`
 * is treated as a paragraph break. A `<ColumnBreak />` between paragraphs
 * starts the right column there instead of letting the columns balance.
 */
export default function ProjectIntro({ children }: { children: ReactNode }) {
  return (
    <section className="text-brand-ivory relative z-10">
      <div className="page-container">
        <div className="bg-black px-6 pt-18 pb-24 sm:px-10 sm:pt-21 sm:pb-36 lg:px-16">
          <div className="body-copy text-[1rem] text-pretty sm:columns-2 sm:gap-x-10 sm:text-[1.05rem] lg:gap-x-16 lg:text-[1.15rem] xl:text-[1.25rem] [&>p+p]:mt-[1.8em]">
            {toParagraphs(children).map(({ nodes, startsColumn }, i) => (
              <p
                key={i}
                // A margin after a forced column break is kept, so drop it
                // here or the right column would start a line lower.
                className={
                  startsColumn ? "sm:mt-0! sm:break-before-column" : undefined
                }
              >
                {bindLastWords(nodes)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
