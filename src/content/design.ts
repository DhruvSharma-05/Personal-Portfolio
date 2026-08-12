import type { DesignProject } from "./types";

export const designProjects: DesignProject[] = [
  {
    id: "nike",
    title: "Nike Website Redesign",
    description:
      "E-commerce redesign built around the product shot — a browsing flow that gets you from landing to cart without a detour.",
    type: "Website Design",
    year: "2024",
    tools: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    features: [
      "Responsive layouts across breakpoints",
      "Interactive product showcase",
      "Clean, high-contrast product-first UI",
      "Reworked purchase journey",
      "Advanced filtering system",
    ],
    icon: "monitor",
    href: "https://www.figma.com/design/wNEuUtWLnkkyn89nkjWHA0/Nike-website?m=auto&t=DKRpFgtfUbMejaSP-1",
    linkLabel: "Open in Figma",
    linkKind: "figma",
  },
  {
    id: "build-fitness",
    title: "BUILD — Fitness App",
    description:
      "Mobile app design for workout tracking, aimed at the drop-off point where most fitness apps lose people in week two.",
    type: "Mobile App",
    year: "2024",
    tools: ["Figma", "Prototyping", "UI/UX Design", "User Testing"],
    features: [
      "Workout tracking that takes seconds mid-set",
      "Personal trainer integration",
      "Progress visualisation over time",
      "Social fitness community",
      "Gamification to hold the habit",
    ],
    icon: "smartphone",
    href: "https://www.figma.com/design/KRQ5IwdUpqd2L1t2H7iNxx/BUILD?m=auto&t=DKRpFgtfUbMejaSP-1",
    linkLabel: "Open in Figma",
    linkKind: "figma",
  },
  {
    id: "headphones",
    title: "Headphone Store",
    description:
      "Premium e-commerce concept for an audio brand, leaning on large product photography and a short checkout.",
    type: "E-commerce",
    year: "2024",
    tools: ["Figma", "Adobe XD", "Prototyping"],
    features: [
      "Full-bleed product gallery",
      "360° product view",
      "Streamlined checkout",
      "Audio preview on the product page",
      "Side-by-side comparison tool",
    ],
    icon: "headphones",
    href: "https://www.figma.com/design/k8l56NRgEeyGmT87PGto7U/Headphone-store?m=auto&t=DKRpFgtfUbMejaSP-1",
    linkLabel: "Open in Figma",
    linkKind: "figma",
  },
  {
    id: "nmims-canteen",
    title: "NMIMS Campus Canteen",
    description:
      "UX research case study on the campus canteen experience — queues, ordering and peak-hour throughput.",
    type: "UX Case Study",
    year: "2024",
    tools: ["Figma", "User Research", "Wireframing", "Prototyping"],
    features: [
      "Primary research with students and staff",
      "Journey mapping and personas",
      "Wireframes through to clickable prototype",
      "Usability testing findings",
      "Phased implementation roadmap",
    ],
    icon: "search",
    // No public link yet — the card renders without a CTA rather than a dead "#".
    linkLabel: "Open in Figma",
    linkKind: "figma",
  },
  {
    id: "brand-work",
    title: "Event Branding — NMIMS & Anvikha",
    description:
      "Collected identity and campaign work for college events: posters, social sets, stage collateral and the guidelines holding them together.",
    type: "Brand & Event Design",
    year: "2024",
    tools: ["Adobe Creative Suite", "Canva", "Brand Design", "Visual Identity"],
    features: [
      "Event identities and promotional campaigns",
      "Social content systems",
      "Campus communications and announcements",
      "Brand guidelines and visual identity",
      "Print and digital deliverables",
    ],
    icon: "palette",
    href: "https://drive.google.com/drive/folders/1wEVuRkzd2Tflf1r80gKhm2AcUBfPfD3e",
    linkLabel: "View collection",
    linkKind: "drive",
  },
];
