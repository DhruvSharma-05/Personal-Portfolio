import type { Profile, SectionMeta } from "./types";

export const profile: Profile = {
  name: "Dhruv Sharma",
  firstName: "Dhruv",
  lastName: "Sharma",
  initials: "DS",
  roles: [
    "Web Analyst",
    "Data Science Enthusiast",
    "UI/UX Designer",
    "Python Developer",
    "Power BI Specialist",
  ],
  headline: "I turn messy data into decisions people actually make.",
  summary:
    "Computer Science student at SVKM's NMIMS Chandigarh. I build dashboards, automate the boring parts of analytics, and design the interfaces that make the numbers land.",
  email: "dhruv.sharma1592@gmail.com",
  phone: "+91 9855560324",
  location: "Panchkula, Haryana, India",
  locationNote: "Open to remote opportunities",
  university: "SVKM's NMIMS Chandigarh",
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

export const sections: SectionMeta[] = [
  { id: "about", index: "01", label: "About" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "work", index: "03", label: "Work" },
  { id: "design", index: "04", label: "Design" },
  { id: "skills", index: "05", label: "Skills" },
  { id: "contact", index: "06", label: "Contact" },
];

/** Headline numbers. Each one must be countable from the content below. */
export const stats = [
  { value: 5, suffix: "", label: "Shipped projects" },
  { value: 5, suffix: "", label: "Design case studies" },
  { value: 4, suffix: "", label: "Certifications" },
  { value: 1, suffix: "", label: "Hackathon win" },
];
