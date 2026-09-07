import type { Achievement, Experience } from "./types";

/**
 * Ordered most recent first. `kind` drives the caption on each panel, so an
 * internship, a leadership post and a volunteer stint are legible as different
 * things rather than flattened into one "experience" list.
 */
export const experiences: Experience[] = [
  {
    id: "revclerx",
    title: "AI Engineer Intern",
    company: "RevClerx AI Solutions",
    location: "Mohali, India",
    duration: "Jan 2025 — Present",
    kind: "Internship",
    highlights: [
      "Worked on an enterprise-grade internal web-scraping infrastructure platform, cutting cloud compute cost by 20–40% by offloading work to the browser through WebAssembly and Web Workers.",
      "Built a B2B AI-powered web-scraping platform for marketing and sales teams — automating lead-generation pipelines and wiring in AI services over gRPC, Kafka and Redis Streams for real-time web data.",
      "Contributed to the Interactive Coach AI system, implementing an avatar-based conversational interface on HeyGen LiveAvatar and ElevenLabs TTS for AI-driven sales-training roleplay.",
      "Built a data-intelligence pipeline spanning tabular ML, small-dataset analytics and conversational enrichment, with FastAPI orchestrating ingestion, semantic profiling, PII handling, LLM-assisted inference, entity resolution, model training and chat-based insights.",
      "Developed performance-optimisation modules for an offline mobile AI assistant — hardware-aware model selection, GPU/NPU acceleration through Vulkan and OpenCL, and speculative decoding with KV-cache optimisation for on-device inference speed.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "WebAssembly",
      "gRPC",
      "Kafka",
      "Redis Streams",
      "LLM Integration",
      "Vulkan",
      "OpenCL",
    ],
    icon: "bolt",
  },
  {
    id: "accosoft",
    title: "Web Analyst",
    company: "Accosoft India",
    location: "Mohali, India",
    duration: "May 2024 — Jul 2024",
    kind: "Work",
    highlights: [
      "Built interactive Power BI dashboards for sales and operational data, giving management a real-time view instead of week-old spreadsheets.",
      "Automated data extraction from multiple web sources with Python scrapers, cutting manual collection effort by roughly 30%.",
      "Maintained and optimised complex Excel and SQL data sets, tightening accuracy and integrity at the source.",
      "Worked with cross-functional teams to translate vague business questions into analytics that answered them.",
    ],
    technologies: ["Power BI", "Python", "SQL", "Excel", "Web Scraping"],
    icon: "briefcase",
  },
  {
    id: "placement-coordinator",
    title: "Student Placement Coordinator",
    company: "NMIMS Chandigarh",
    location: "Chandigarh, India",
    duration: "Nov 2023 — Present",
    kind: "Leadership",
    highlights: [
      "Act as the liaison between students and recruiters, keeping placement drives running end to end.",
      "Coordinate interview schedules and maintain placement records across multiple concurrent drives.",
      "Help organise career development workshops and seminars for the student body.",
      "Maintain the database of student profiles and company requirements used for shortlisting.",
    ],
    technologies: ["MS Office", "Database Management", "Stakeholder Comms"],
    icon: "users",
  },
  {
    id: "creative-designer",
    title: "Creative Designer",
    company: "NMIMS Chandigarh",
    location: "Chandigarh, India",
    duration: "Jan 2024 — Present",
    kind: "Creative",
    highlights: [
      "Design the visual identity and collateral for technical events and campus communications.",
      "Produce promotional content for college events and social channels on tight turnarounds.",
      "Support the School of Technology Management and Engineering’s visual communication needs.",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Canva", "Brand Design"],
    icon: "brush",
    link: {
      label: "View collection",
      href: "https://drive.google.com/drive/folders/1wEVuRkzd2Tflf1r80gKhm2AcUBfPfD3e",
      kind: "drive",
    },
  },
  {
    id: "anviksha",
    title: "Designer for Anviksha",
    company: "NMIMS Chandigarh",
    location: "Chandigarh, India",
    duration: "Mar 2024 — Sep 2024",
    kind: "Creative",
    highlights: [
      "Led design for Anviksha, the institute’s innovation and technology event.",
      "Produced the full branding set — posters, banners, logos and ID cards.",
      "Held one consistent visual identity across every event material.",
    ],
    technologies: ["Adobe Creative Suite", "Brand Identity", "Print Design"],
    icon: "palette",
    link: {
      label: "View collection",
      href: "https://drive.google.com/drive/folders/1wEVuRkzd2Tflf1r80gKhm2AcUBfPfD3e",
      kind: "drive",
    },
  },
  {
    id: "swaas-trust",
    title: "Volunteer",
    company: "Swaas Trust",
    location: "Panchkula, India",
    duration: "Jun 2023",
    kind: "Volunteer",
    highlights: [
      "Organised and took part in community service drives, including blood donation and Chabeel distribution.",
      "Contributed to environmental sustainability through plantation drives.",
      "Joined social welfare activities including orphanage visits.",
    ],
    technologies: [],
    icon: "userCheck",
  },
];

export const achievements: Achievement[] = [
  {
    id: "hackomania",
    title: "STME Hackathon — 1st Place",
    organization: "NMIMS University, Chandigarh",
    description:
      "Won first place for a YOLOv5-based system that automatically identifies defects in urban infrastructure, built and demoed inside the event window.",
    award: "Winner",
    date: "March 2024",
    technologies: ["YOLOv5", "Python", "Computer Vision"],
  },
  {
    id: "unstop-uxui",
    title: "BUILD — Fitness App",
    organization: "Unstop UX/UI Development Hackathon",
    description:
      "Designed and built a working prototype for a workout-tracking app during the hackathon, from wireframes through to a clickable flow.",
    award: "Prototype",
    date: "2024",
    technologies: ["Figma", "UI/UX", "Prototyping"],
    link: {
      label: "Open in Figma",
      href: "https://www.figma.com/design/KRQ5IwdUpqd2L1t2H7iNxx/BUILD?m=auto&t=DKRpFgtfUbMejaSP-1",
      kind: "figma",
    },
  },
];
