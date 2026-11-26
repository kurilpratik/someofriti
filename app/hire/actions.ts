"use server";

import {
  HIRE_FIELDS,
  validateHireFields,
  type HireFields,
  type HireState,
} from "@/lib/hire";

/**
 * Receives the /hire form. Validation runs again here (the browser's copy can
 * be skipped), then the enquiry goes to wherever `CONTACT_WEBHOOK_URL` points.
 *
 * Delivery: set `CONTACT_WEBHOOK_URL` in `.env.local` (and on the host) to any
 * endpoint that accepts a JSON POST — a form inbox, a Slack/Discord webhook,
 * a Zapier/Make hook or your own email route. Without it, development logs the
 * enquiry to the terminal and reports success; production reports an error so
 * nothing is silently lost, and the form offers the email address instead.
 */
export async function sendEnquiry(
  _prev: HireState,
  formData: FormData,
): Promise<HireState> {
  // Hidden "website" field: people never see it, bots fill it in. Pretend it
  // went through so they don't retry.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", name: "" };
  }

  const fields = Object.fromEntries(
    HIRE_FIELDS.map((key) => [
      key,
      String(formData.get(key) ?? "")
        .trim()
        .slice(0, key === "message" ? 4000 : 300),
    ]),
  ) as HireFields;

  const fieldErrors = validateHireFields(fields);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "A few blanks still need filling in.",
      fieldErrors,
    };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[hire] CONTACT_WEBHOOK_URL is not set; enquiry not delivered:",
        fields,
      );
      return { status: "success", name: fields.name };
    }

    console.error("[hire] CONTACT_WEBHOOK_URL is not set; enquiry dropped.");
    return {
      status: "error",
      message: "The form isn’t connected yet, so this didn’t send.",
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...fields,
        // A ready-made line for webhooks that only show `text` (Slack, Discord).
        text: `New enquiry from ${fields.name} <${fields.email}>: ${fields.need}`,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("[hire] Delivery failed:", error);
    return {
      status: "error",
      message: "Something went wrong on the way, so this didn’t send.",
    };
  }

  return { status: "success", name: fields.name };
}
