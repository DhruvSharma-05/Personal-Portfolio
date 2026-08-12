import type { Certification, SkillGroup } from "./types";

/**
 * Deliberately no percentage bars. A self-assigned "Python 90%" is unverifiable
 * and reads as filler; grounded context reads as experience.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: [
      { name: "Python", note: "Primary language for analysis and automation" },
      { name: "SQL", note: "Query and schema work at Accosoft" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML & CSS" },
    ],
  },
  {
    id: "data",
    title: "Data & ML",
    icon: "library",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn", note: "Regression and churn models" },
      { name: "XGBoost" },
      { name: "SHAP", note: "Model interpretability" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
      { name: "Plotly" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "wrench",
    skills: [
      { name: "Power BI", note: "Production dashboards at Accosoft" },
      { name: "Excel", note: "Modelling and data cleaning" },
      { name: "Figma", note: "All design case studies" },
      { name: "Git & GitHub" },
      { name: "n8n", note: "No-code workflow automation" },
      { name: "Adobe Creative Suite" },
    ],
  },
  {
    id: "infra",
    title: "Frameworks & Infra",
    icon: "cloud",
    skills: [
      { name: "Streamlit", note: "Dashboard delivery layer" },
      { name: "Flask" },
      { name: "React" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "AWS", note: "Cloud Foundations certified" },
      { name: "Vercel" },
    ],
  },
];

/**
 * `credentialUrl` drives the "Verify" affordance. The previous site printed a
 * "Verified" badge next to placeholder IDs like `AWS-12345`; a badge nobody can
 * check is worse than no badge. Paste the real share links here to light them up.
 */
export const certifications: Certification[] = [
  {
    id: "aws-cloud-foundations",
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "2024",
    skills: ["Cloud Computing", "AWS Core Services", "Cloud Architecture"],
  },
  {
    id: "google-data-analytics",
    name: "Google Data Analytics Specialization",
    issuer: "Google",
    date: "2024",
    skills: ["Data Analysis", "Visualization", "SQL", "R"],
  },
  {
    id: "powerbi",
    name: "Data-Driven Decisions with Power BI",
    issuer: "Microsoft",
    date: "2024",
    skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"],
  },
  {
    id: "ibm-python",
    name: "Python for Data Science",
    issuer: "IBM",
    date: "2024",
    skills: ["Python", "Data Science", "Jupyter"],
  },
];
