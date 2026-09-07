import type { Profile, SectionMeta } from "./types";
import { services } from "./services";

export const profile: Profile = {
  name: "Dhruv Sharma",
  firstName: "Dhruv",
  lastName: "Sharma",
  initials: "DS",
  roles: [
    "AI Engineer",
    "Data & ML Pipelines",
    "Web Scraping Systems",
    "Python Developer",
    "Web Analyst",
  ],
  headline: "I build the systems that get raw web data to a model — and the model to a decision.",
  summary:
    "Final-year Computer Science student at SVKM’s NMIMS Chandigarh, currently an AI Engineer Intern at RevClerx. I work on web-scraping infrastructure, LLM-backed data pipelines and on-device inference — plus the dashboards that make the output usable.",
  email: "dhruv.sharma1592@gmail.com",
  phone: "+91 9855560324",
  location: "Panchkula, Haryana, India",
  locationNote: "Open to remote opportunities",
  university: "SVKM’s NMIMS Chandigarh",
  degree: "B.Tech, Computer Science",
  degreeDuration: "Aug 2022 — Jul 2026",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dhruvsharma-05.github.io",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/DhruvSharma-05",
      handle: "DhruvSharma-05",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dhruvsharma05/",
      handle: "dhruvsharma05",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:dhruv.sharma1592@gmail.com",
      handle: "dhruv.sharma1592@gmail.com",
      icon: "mail",
    },
  ],
};

/**
 * Section order and numbering.
 *
 * Indices are derived, not written by hand, so removing or inserting a section
 * renumbers the plate headers, the nav and the left rail in one place. Services
 * only appears once `content/services.ts` has real entries — an empty section
 * would otherwise leave a nav link pointing at nothing.
 */
const sectionOrder: Omit<SectionMeta, "index">[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  ...(services.length > 0 ? [{ id: "services", label: "Services" }] : []),
  { id: "contact", label: "Contact" },
];

export const sections: SectionMeta[] = sectionOrder.map((section, i) => ({
  ...section,
  index: String(i + 1).padStart(2, "0"),
}));

/** Headline numbers. Each one must be countable from the content below. */
export const stats = [
  { value: 5, suffix: "", label: "Shipped projects" },
  { value: 8, suffix: "", label: "Certifications" },
  { value: 2, suffix: "", label: "Industry roles" },
  { value: 1, suffix: "", label: "Hackathon win" },
];
