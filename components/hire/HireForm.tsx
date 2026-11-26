"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";

import { sendEnquiry } from "@/app/hire/actions";
import {
  HIRE_FIELDS,
  validateHireFields,
  type HireErrors,
  type HireField,
  type HireFields,
  type HireState,
} from "@/lib/hire";
import { CONTACT_EMAIL } from "@/lib/site";

const EMPTY: HireFields = {
  name: "",
  company: "",
  need: "",
  timeline: "",
  budget: "",
  email: "",
  message: "",
};

const fieldId = (field: HireField) => `hire-${field}`;
const errorId = (field: HireField) => `hire-${field}-error`;

/*
  The underline is an inset shadow rather than a border, so thickening it on
  focus or error never nudges the text around it. Ivy Ora Display is already
  slanted, so answers stay in the same face (no faux italic) and the underline
  alone marks them out.
*/
const blankClass =
  "font-ivy-ora min-w-0 appearance-none rounded-none bg-transparent p-0 font-light text-brand-ivory shadow-[inset_0_-1px_0_rgb(245_241_234/0.4)] transition-shadow duration-200 outline-none placeholder:text-[#f5f1ea]/40 hover:shadow-[inset_0_-1px_0_rgb(245_241_234/0.8)] focus:shadow-[inset_0_-2px_0_var(--brand-red)] aria-invalid:shadow-[inset_0_-2px_0_var(--brand-red)] motion-reduce:transition-none";

type BlankProps = {
  field: HireField;
  label: string;
  value: string;
  error?: string;
  onChange: (field: HireField, value: string) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "id" | "name"
>;

/**
 * One blank in the sentence. An invisible copy of the text sits in the same
 * grid cell as the input and sets its width, so the blank grows as you type
 * (or fits its placeholder while empty). `max-w-full` stops a long answer
 * pushing past the edge on a phone; past that point the input scrolls.
 */
function Blank({
  field,
  label,
  value,
  error,
  onChange,
  placeholder,
  ...rest
}: BlankProps) {
  return (
    <span className="inline-grid max-w-full grid-cols-[minmax(0,auto)] align-baseline">
      <label htmlFor={fieldId(field)} className="sr-only">
        {label}
      </label>
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 overflow-hidden pr-[0.12em] font-light whitespace-pre"
      >
        {value || placeholder}
      </span>
      <input
        id={fieldId(field)}
        name={field}
        value={value}
        // Without this the input brings its default ~20-character width to the
        // grid cell, and every blank would be at least that wide.
        size={1}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(field, event.target.value)
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(field) : undefined}
        className={`${blankClass} col-start-1 row-start-1 w-full`}
        {...rest}
      />
    </span>
  );
}

/**
 * The /hire enquiry, written as a letter: the visitor fills the blanks in a
 * sentence addressed to Riti. Only name, what they need and email are
 * required. Checks run in the browser first (so mistakes show without a round
 * trip) and again in the server action.
 */
export default function HireForm() {
  const [values, setValues] = useState<HireFields>(EMPTY);
  const [errors, setErrors] = useState<HireErrors>({});
  const successRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Wrapping the action lets the server's field errors land in the same
  // `errors` state the browser checks fill, so both show the same way.
  const [state, formAction, pending] = useActionState(
    async (previous: HireState, formData: FormData) => {
      const result = await sendEnquiry(previous, formData);

      if (result.status === "error") setErrors(result.fieldErrors ?? {});

      return result;
    },
    { status: "idle" } as HireState,
  );

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error" && !state.fieldErrors)
      summaryRef.current?.focus();
  }, [state]);

  const update = (field: HireField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a message as soon as its blank is touched again.
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (pending) {
      event.preventDefault();
      return;
    }

    const found = validateHireFields(values);

    if (Object.keys(found).length === 0) return;

    event.preventDefault();
    setErrors(found);

    const first = HIRE_FIELDS.find((field) => found[field]);

    if (first) document.getElementById(fieldId(first))?.focus();
  };

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="outline-none"
      >
        <p className="font-ivy-ora text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.35] font-light">
          Thank you{state.name ? `, ${state.name}` : ""}. It’s on its way to me,
          and I’ll reply within a few days.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 border-b border-[#f5f1ea]/30 pb-0.5 text-[0.8rem] font-medium tracking-[0.18em] text-[#f5f1ea]/70 uppercase transition-colors duration-200 hover:border-[#f5f1ea] hover:text-[#f5f1ea] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
        >
          Write another
        </button>
      </div>
    );
  }

  const errorList = HIRE_FIELDS.filter((field) => errors[field]);
  const failure =
    state.status === "error" && !state.fieldErrors ? state.message : null;
  const blank = { onChange: update };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="hire-required-note"
    >
      {/*
        The sentence. Every blank has a real (visually hidden) label, so a
        screen reader announces "Your name, edit text" rather than just the
        placeholder. `text-pretty` keeps the ragged edge even as blanks grow.
      */}
      <p className="font-ivy-ora text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.6] font-light text-pretty">
        Hi Riti, my name is{" "}
        <Blank
          {...blank}
          field="name"
          label="Your name (required)"
          placeholder="your name"
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
        />{" "}
        and I work at{" "}
        <Blank
          {...blank}
          field="company"
          label="Company or project (optional)"
          placeholder="company or project"
          autoComplete="organization"
          value={values.company}
          error={errors.company}
        />
        . I’m looking for help with{" "}
        <Blank
          {...blank}
          field="need"
          label="What you need help with (required)"
          placeholder="a brand identity, a campaign…"
          required
          value={values.need}
          error={errors.need}
        />
        , ideally by{" "}
        <Blank
          {...blank}
          field="timeline"
          label="Timeline (optional)"
          placeholder="when"
          value={values.timeline}
          error={errors.timeline}
        />
        , with a budget of around{" "}
        <Blank
          {...blank}
          field="budget"
          label="Budget (optional)"
          placeholder="a rough figure"
          value={values.budget}
          error={errors.budget}
        />
        . You can reach me at{" "}
        <Blank
          {...blank}
          field="email"
          label="Your email address (required)"
          placeholder="your email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={values.email}
          error={errors.email}
        />
        . One more thing:
      </p>

      {/* The open-ended note gets a full line of its own and grows downwards
          (`field-sizing: content`; `rows` is the floor where that isn't supported). */}
      <label htmlFor={fieldId("message")} className="sr-only">
        Anything else you’d like to tell me (optional)
      </label>
      <textarea
        id={fieldId("message")}
        name="message"
        rows={2}
        value={values.message}
        onChange={(event) => update("message", event.target.value)}
        placeholder="tell me a little more about the project, if you like."
        className={`${blankClass} mt-2 block [field-sizing:content] w-full resize-none text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.6]`}
      />

      {/* Bots fill in every field they find; people never see this one. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="hire-website">Leave this empty</label>
        <input
          id="hire-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Errors: each message is linked to its blank (aria-describedby) and
          doubles as a link back to it. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        className="mt-8 outline-none"
      >
        {errorList.length > 0 && (
          <ul className="text-brand-red space-y-1.5 text-[0.95rem] leading-[1.5]">
            {errorList.map((field) => (
              <li key={field} id={errorId(field)}>
                <a
                  href={`#${fieldId(field)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(fieldId(field))?.focus();
                  }}
                  className="underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)]"
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        )}
        {failure && (
          <p className="text-brand-red text-[0.95rem] leading-[1.5]">
            {failure} Please email me at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Enquiry from ${values.name}`)}&body=${encodeURIComponent(
                [
                  values.need,
                  values.timeline && `Timeline: ${values.timeline}`,
                  values.budget && `Budget: ${values.budget}`,
                  values.message,
                ]
                  .filter(Boolean)
                  .join("\n\n"),
              )}`}
              className="underline decoration-1 underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            instead — the link fills in what you wrote.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-10">
        {/* Same hand-drawn red ring as the Hero buttons, shown on hover/focus
            and held while sending. */}
        <button
          type="submit"
          aria-disabled={pending}
          onClick={(event) => pending && event.preventDefault()}
          className={`group text-brand-ivory relative -ml-6 inline-flex min-h-18 min-w-47.5 items-center justify-center text-[0.8rem] font-medium tracking-[0.18em] uppercase outline-none sm:min-w-50 ${pending ? "cursor-progress" : ""}`}
        >
          <svg
            viewBox="0 0 240 76"
            aria-hidden="true"
            className={`text-brand-red pointer-events-none absolute inset-0 size-full overflow-visible transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 ${pending ? "animate-pulse opacity-100" : "opacity-40"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <ellipse cx="120" cy="36" rx="117" ry="35" />
            <path d="M62 69c35 1 71 3 112 8" strokeLinecap="round" />
          </svg>
          <span className="relative decoration-1 underline-offset-6 group-focus-visible:underline">
            {pending ? "Sending…" : "Send it over"}
          </span>
        </button>

        <p
          id="hire-required-note"
          className="body-copy text-[0.85rem] text-[#f5f1ea]/60"
        >
          Only your name, what you need and an email are required.
          <br />
          Prefer email?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="border-b border-[#f5f1ea]/30 text-[#f5f1ea]/80 transition-colors hover:text-[#f5f1ea] focus-visible:text-[#f5f1ea]"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
