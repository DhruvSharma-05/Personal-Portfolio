import type { Project } from "./types";

/**
 * Metrics policy: only numbers that can be reproduced from the repo belong in
 * `metrics`. Descriptive claims live in `features`. An empty `metrics` array is
 * better than an invented accuracy figure someone can ask you to defend.
 */
export const projects: Project[] = [
  {
    id: "energy-output",
    title: "Energy Output Prediction",
    category: "machine-learning",
    summary:
      "End-to-end regression pipeline predicting net hourly electrical output of a combined cycle power plant from ambient conditions.",
    metrics: [
      { label: "MAE", value: "0.392" },
      { label: "RMSE", value: "0.874" },
      { label: "Best model", value: "Bagging + REPTree" },
    ],
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Matplotlib",
      "Seaborn",
    ],
    features: [
      "Compares Linear Regression, Bagging and XGBoost on the same split",
      "Cleaning, scaling and cross-validation baked into the pipeline",
      "Ensemble tuning with Bagging over REPTree as the winning configuration",
      "Feature engineering and selection driven by ambient variable correlation",
      "SHAP values for per-prediction interpretability",
    ],
    icon: "bolt",
    githubUrl: "https://github.com/DhruvSharma-05/Energy-Anomaly-Detector",
    status: "completed",
  },
  {
    id: "cafetrends",
    title: "CafeTrends",
    category: "data-analytics",
    summary:
      "Analytics dashboard for a college canteen: RFM customer segmentation, clustering and live transaction tracking in one Streamlit surface.",
    metrics: [],
    technologies: [
      "Streamlit",
      "Flask",
      "Pandas",
      "Scikit-learn",
      "Plotly",
      "MySQL",
      "Redis",
    ],
    features: [
      "Customer segmentation built on RFM (recency, frequency, monetary) scoring",
      "Clustering to group buyers into actionable categories",
      "Automated summaries that surface the insight, not just the chart",
      "Interactive dashboards with 3D Plotly views",
      "Real-time transaction monitoring",
      "Sales forecasting on historical canteen throughput",
    ],
    icon: "chart",
    githubUrl: "https://github.com/DhruvSharma-05/CafeTrends",
    status: "completed",
  },
  {
    id: "customer-retention",
    title: "Customer Retention Analysis",
    category: "machine-learning",
    summary:
      "Churn prediction system that scores retention risk and turns the model output into a dashboard an account team can act on.",
    metrics: [],
    technologies: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "Flask",
      "Streamlit",
      "Plotly",
      "MySQL",
    ],
    features: [
      "Churn likelihood modelling across several classifier families",
      "Retention KPI dashboards with segment drill-down",
      "Customer segmentation and engagement tracking",
      "Alerting for accounts crossing the high-risk threshold",
      "ROI view for retention campaigns",
    ],
    icon: "userCheck",
    githubUrl: "https://github.com/DhruvSharma-05/Customer-Retention-Analytics",
    status: "completed",
  },
  {
    id: "attendance-tracker",
    title: "n8n Attendance Tracker",
    category: "data-analytics",
    summary:
      "No-code automation that reads class attendance messages from Telegram and writes them straight into Google Sheets.",
    metrics: [],
    technologies: [
      "n8n",
      "Telegram API",
      "Google Sheets API",
      "REST",
      "Workflow Automation",
    ],
    features: [
      "Captures and parses Telegram messages as they arrive",
      "Writes directly to Google Sheets with no manual entry step",
      "Validation and error handling on malformed messages",
      "Confirmation replies so submitters know it landed",
      "Scales to multiple classes and groups from one workflow",
    ],
    icon: "chart",
    githubUrl: "https://github.com/DhruvSharma-05/n8n-Attendance-Tracker",
    status: "completed",
  },
  {
    id: "medium-curator",
    title: "Medium Content Curator API",
    category: "web-development",
    summary:
      "REST API that aggregated and filtered Medium articles for programmatic access, with keyword search and topic recommendations.",
    metrics: [],
    technologies: [
      "Python",
      "REST API",
      "Web Scraping",
      "Content Filtering",
      "Categorisation",
    ],
    features: [
      "RESTful endpoints for aggregated article retrieval",
      "Filtering and categorisation layer over raw article data",
      "Keyword search and discovery",
      "Trending and author-scoped queries",
      "Topic-wise recommendations",
    ],
    icon: "rss",
    githubUrl: "https://github.com/DhruvSharma-05/Medium-Content-Curator",
    status: "discontinued",
    note: "Retired after Medium updated its policies to prohibit automated scraping.",
  },
];

export const projectFilters = [
  { value: "all", label: "All" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "data-analytics", label: "Data Analytics" },
  { value: "web-development", label: "Web Development" },
] as const;
