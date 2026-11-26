/**
 * Shared by the /hire form and its server action, so the browser and the
 * server agree on which blanks are required and what the messages say.
 */
export const HIRE_FIELDS = [
  "name",
  "company",
  "need",
  "timeline",
  "budget",
  "email",
  "message",
] as const;

export type HireField = (typeof HIRE_FIELDS)[number];
export type HireFields = Record<HireField, string>;
export type HireErrors = Partial<Record<HireField, string>>;

export type HireState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "error"; message: string; fieldErrors?: HireErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateHireFields(fields: HireFields): HireErrors {
  const errors: HireErrors = {};

  if (!fields.name.trim()) errors.name = "Tell me your name.";
  if (!fields.need.trim()) errors.need = "Tell me what you need help with.";

  if (!fields.email.trim()) {
    errors.email = "Add an email so I can write back.";
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = "That email doesn’t look quite right.";
  }

  return errors;
}
