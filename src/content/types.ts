/**
 * Content model for the portfolio.
 *
 * Everything rendered on the page comes from `src/content/*`. Icons are stored
 * as string keys and resolved through `src/components/ui/icon.tsx` so these
 * modules stay pure data (importable from server components, no JSX).
 */

export type IconKey =
  | "briefcase"
  | "users"
  | "brush"
  | "bolt"
  | "chart"
  | "userCheck"
  | "rss"
  | "trophy"
  | "monitor"
  | "search"
  | "smartphone"
  | "headphones"
  | "palette"
  | "cloud"
  | "code"
  | "database"
  | "wrench"
  | "library"
  | "graduation"
  | "mapPin"
  | "mail"
  | "phone";

export type Social = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "mail";
};

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  roles: string[];
  headline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  locationNote: string;
  university: string;
  degree: string;
  degreeDuration: string;
  siteUrl: string;
  socials: Social[];
};

/** Optional public artefact backing an entry. No URL → no link rendered. */
export type EntryLink = {
  label: string;
  href: string;
  kind: "figma" | "drive" | "external";
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  kind: "Work" | "Internship" | "Leadership" | "Creative" | "Volunteer";
  highlights: string[];
  technologies: string[];
  icon: IconKey;
  link?: EntryLink;
};

export type Project = {
  id: string;
  title: string;
  category: "machine-learning" | "data-analytics" | "web-development";
  summary: string;
  /** Verified, quotable outcomes only. Leave empty rather than inventing one. */
  metrics: { label: string; value: string }[];
  technologies: string[];
  features: string[];
  icon: IconKey;
  githubUrl: string;
  liveUrl?: string;
  status: "completed" | "discontinued";
  note?: string;
};

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  description: string;
  award: string;
  date: string;
  technologies: string[];
  link?: EntryLink;
};

/**
 * Freelance offer. `services.ts` ships empty on purpose — the Services section
 * and its enquiry flow render nothing until there is real work to describe.
 * Never fill `rateBand` with a guess: a published rate is a commitment.
 */
export type Service = {
  id: string;
  title: string;
  summary: string;
  /** What the client actually receives. */
  deliverables: string[];
  /** Free text, e.g. "from ₹X / project" or "hourly, on request". */
  rateBand?: string;
  /** Typical turnaround, e.g. "2–3 weeks". */
  leadTime?: string;
  icon: IconKey;
};

export type SkillGroup = {
  id: string;
  title: string;
  icon: IconKey;
  /** `note` is only set where real work backs it up — it renders as a caption. */
  skills: { name: string; note?: string }[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  /** Optional: omitted rather than guessed when the award date isn't recorded. */
  date?: string;
  skills: string[];
  /** Public verification URL. Renders a "Verify" link only when present. */
  credentialUrl?: string;
};

export type SectionMeta = {
  id: string;
  index: string;
  label: string;
};
