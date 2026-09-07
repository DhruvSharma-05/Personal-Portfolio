import type { Certification, SkillGroup } from "./types";

/**
 * Deliberately no percentage bars. A self-assigned "Python 90%" is unverifiable
 * and reads as filler; grounded context reads as experience. `note` is set only
 * where a specific piece of work backs the claim up.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: [
      { name: "Python", note: "Primary language across every role" },
      { name: "SQL", note: "Query and schema work at Accosoft" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML & CSS" },
    ],
  },
  {
    id: "ai",
    title: "AI & ML",
    icon: "library",
    skills: [
      { name: "LLM Integration", note: "Inference and enrichment at RevClerx" },
      { name: "Scikit-learn", note: "Regression and churn models" },
      { name: "XGBoost" },
      { name: "SHAP", note: "Model interpretability" },
      { name: "Edge AI", note: "On-device inference optimisation" },
      { name: "Pandas" },
      { name: "NumPy" },
    ],
  },
  {
    id: "infra",
    title: "Systems & Infra",
    icon: "cloud",
    skills: [
      { name: "FastAPI", note: "Pipeline orchestration" },
      { name: "gRPC" },
      { name: "Kafka" },
      { name: "Redis Streams" },
      { name: "WebAssembly", note: "Browser-side compute offloading" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "AWS", note: "Cloud Foundations certified" },
    ],
  },
  {
    id: "data",
    title: "Data & Delivery",
    icon: "wrench",
    skills: [
      { name: "Power BI", note: "Production dashboards at Accosoft" },
      { name: "Streamlit", note: "Dashboard delivery layer" },
      { name: "Flask" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Matplotlib, Seaborn & Plotly" },
      { name: "Excel", note: "Modelling and data cleaning" },
      { name: "Figma", note: "Interface and event design work" },
      { name: "Git & GitHub" },
      { name: "n8n", note: "No-code workflow automation" },
      { name: "Adobe Creative Suite" },
    ],
  },
];

/**
 * `credentialUrl` drives the "Verify" affordance. The original site printed a
 * "Verified" badge next to placeholder IDs like `AWS-12345`; a badge nobody can
 * check is worse than no badge. Paste the real share links here to light them up.
 *
 * `date` is optional and omitted where the award date isn't recorded — an
 * invented year is the same failure mode as an invented credential ID.
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
    id: "sql-data-science",
    name: "SQL for Data Science",
    issuer: "Coursera",
    skills: ["SQL", "Data Modelling", "Querying"],
  },
  {
    id: "powerbi",
    name: "Data-Driven Decisions with Power BI",
    issuer: "Coursera",
    date: "2024",
    skills: ["Power BI", "DAX", "Business Intelligence"],
  },
  {
    id: "ibm-excel",
    name: "Excel Basics for Data Analysis",
    issuer: "IBM",
    skills: ["Excel", "Data Cleaning", "Spreadsheet Analysis"],
  },
  {
    id: "meta-marketing-analytics",
    name: "Marketing Analytics Foundation",
    issuer: "Meta",
    skills: ["Marketing Analytics", "Attribution", "Measurement"],
  },
  {
    id: "chatgpt-guide",
    name: "ChatGPT Complete Guide",
    issuer: "Udemy",
    skills: ["Prompt Engineering", "LLM Tooling"],
  },
  {
    id: "design-thinking",
    name: "Design Thinking for Innovation",
    issuer: "Coursera",
    skills: ["Design Thinking", "Problem Framing", "Ideation"],
  },
];
