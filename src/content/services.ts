import type { Service } from "./types";

/**
 * Freelance offer.
 *
 * Intentionally EMPTY. The Services section and the enquiry flow read this
 * array and render nothing while it is empty — the same fallback pattern as
 * `Project.metrics`. That is deliberate: an empty section is honest, whereas a
 * section filled with placeholder services and invented rates is a claim.
 *
 * To switch the section on, add real entries. `rateBand` is a published price —
 * only set it to a number you will actually honour, and leave it undefined to
 * render "on request" instead.
 *
 * Example shape:
 *
 *   {
 *     id: "scraping-pipelines",
 *     title: "Web scraping pipelines",
 *     summary: "One-sentence description of the outcome the client buys.",
 *     deliverables: ["What they receive", "and what else"],
 *     rateBand: "from ₹00,000 / project",
 *     leadTime: "2–3 weeks",
 *     icon: "code",
 *   }
 */
export const services: Service[] = [];

/**
 * Drives the enquiry form's subject select. The freelance options only appear
 * once `services` has entries, so the form never offers work that isn't listed.
 */
export const enquiryKinds = [
  "A role or internship",
  "A freelance project",
  "A collaboration",
  "Something else",
] as const;
