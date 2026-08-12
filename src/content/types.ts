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

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  kind: "Work" | "Leadership" | "Creative";
  highlights: string[];
  technologies: string[];
  icon: IconKey;
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
};

export type DesignProject = {
  id: string;
  title: string;
  description: string;
  type: string;
  year: string;
  tools: string[];
  features: string[];
  icon: IconKey;
  href?: string;
  linkLabel: string;
  linkKind: "figma" | "drive";
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
  date: string;
  skills: string[];
  /** Public verification URL. Renders a "Verify" link only when present. */
  credentialUrl?: string;
};

export type SectionMeta = {
  id: string;
  index: string;
  label: string;
};
