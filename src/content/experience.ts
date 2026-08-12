import type { Achievement, Experience } from "./types";

export const experiences: Experience[] = [
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
      "Partner with multiple departments to hit design requirements without missing deadlines.",
      "Wrote the brand guidelines that keep event visuals consistent across organisers.",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Canva", "Brand Design"],
    icon: "brush",
  },
];

export const achievements: Achievement[] = [
  {
    id: "hackomania",
    title: "STME Hackomania — 1st Place",
    organization: "NMIMS University, Chandigarh",
    description:
      "Won first place for a working prototype of a smart-city pothole detection system, built and demoed inside the event window.",
    award: "Winner",
    date: "March 2024",
    technologies: ["React", "Python", "Computer Vision"],
  },
];
