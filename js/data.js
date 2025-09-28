// ===== PERSONAL INFORMATION =====
const personalInfo = {
  name: "Dhruv Sharma",
  title: "Web Analyst & Data Science Enthusiast",
  email: "dhruv.sharma1592@gmail.com",
  phone: "+91 9855560324",
  location: "Panchkula, Haryana, India",
  university: "SVKM's NMIMS Chandigarh",
  degree: "Computer Science Bachelors",
  duration: "Aug 2022 - July 2026",
  github: "https://github.com/dhruv-sharma",
  linkedin: "https://linkedin.com/in/dhruv-sharma",
  designPortfolio: "https://behance.net/dhruv-sharma",
  dataPortfolio: "https://kaggle.com/dhruv-sharma"
};

// ===== TYPING TEXT ROLES =====
const typingRoles = [
  "Web Analyst",
  "Data Science Enthusiast",
  "UI/UX Designer",
  "Python Developer", 
  "Power BI Expert"
];
// ===== EXPERIENCE DATA =====
const experiences = [
  {
    id: 1,
    title: "Web Analyst",
    company: "Accosoft India",
    location: "Mohali, India",
    duration: "May 2024 - July 2024",
    type: "work",
    description: [
      "Developed interactive Power BI dashboards to visualize sales and operational data, improving real-time decision-making for management",
      "Automated data extraction from multiple web sources using Python-based web scraping, reducing manual effort by 30%",
      "Managed and optimized complex Excel and SQL databases, ensuring data accuracy and integrity",
      "Collaborated with cross-functional teams to translate business needs into actionable analytics solutions"
    ],
    technologies: ["Power BI", "Python", "SQL", "Excel", "Web Scraping"],
    icon: "fas fa-briefcase",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Student Placement Coordinator",
    company: "NMIMS Chandigarh", 
    location: "Chandigarh, India",
    duration: "Nov 2023 - Present",
    type: "leadership",
    description: [
      "Managed placement activities and served as liaison between students and recruiters for smooth coordination",
      "Coordinated interview schedules and maintained placement records with attention to detail",
      "Assisted in organizing career development workshops and seminars for student development",
      "Maintained database of student profiles and company requirements for optimal matching"
    ],
    technologies: ["MS Office", "Database Management", "Communication"],
    icon: "fas fa-users",
    color: "from-green-500 to-blue-500"
  },
  {
    id: 3,
    title: "Creative Designer",
    company: "NMIMS Chandigarh",
    location: "Chandigarh, India", 
    duration: "Jan 2024 - Present",
    type: "creative",
    description: [
      "Designed visually engaging materials for technical events and communications",
      "Created promotional content for college events and social media platforms",
      "Collaborated with various departments to meet design requirements and deadlines",
      "Developed brand guidelines and visual identity for college events"
    ],
    technologies: ["Adobe Creative Suite", "Canva", "Figma", "Brand Design"],
    icon: "fas fa-paint-brush",
    color: "from-purple-500 to-pink-500"
  }
];

// ===== UPDATED PROJECTS DATA (FROM RESUME) =====
const projects = [
  {
    id: 1,
    title: "Energy Output Prediction - Combined Cycle Power Plant",
    category: "machine-learning",
    description: "End-to-end machine learning script to predict net hourly electrical energy output from a Combined Cycle Power Plant using ambient variables.",
    longDescription: "Comprehensive machine learning project that implements multiple algorithms including Linear Regression, Bagging, and XGBoost to predict electrical energy output. Features robust data preprocessing, cross-validation, and model optimization techniques.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "XGBoost", "SHAP"],
    features: [
      "Predicts electrical energy output using ambient variables",
      "Implements Linear Regression, Bagging, and XGBoost models",
      "Robust data cleaning, scaling, and cross-validation",
      "Bagging and REPTree ensemble model optimization",
      "Advanced feature engineering and selection",
      "Model interpretability using SHAP values"
    ],
    metrics: {
      "MAE": "0.391552",
      "RMSE": "0.873753", 
      "Models": "3 Algorithms",
      "Performance": "Best: Bagging+REPTree",
      "Accuracy": "94.2%"
    },
    icon: "fas fa-bolt",
    color: "from-yellow-500 to-orange-500",
    image: "assets/images/projects/energy-prediction.jpg",
    liveUrl: "https://dhruvsharma-05.github.io/",
    githubUrl: "https://github.com/DhruvSharma-05/Energy-Anomaly-Detector",
    status: "completed",
    featured: true,
    hasLiveDemo: true
  },
  {
    id: 2,
    title: "CafeTrends: College Canteen Analytics Dashboard",
    category: "data-analytics",
    description: "Comprehensive analytics dashboard performing RFM customer segmentation with advanced clustering techniques and real-time transaction tracking.",
    longDescription: "Advanced analytics platform that provides deep insights into customer behavior through RFM analysis, clustering techniques, and real-time monitoring of canteen operations.",
    technologies: ["Streamlit", "Flask", "Pandas", "Scikit-learn", "Plotly", "Seaborn", "MySQL", "Redis"],
    features: [
      "In-depth customer segmentation using RFM analysis",
      "Advanced clustering techniques for customer categorization", 
      "Automated analytics summaries and actionable insights",
      "Interactive dashboards with dynamic 3D charts",
      "Real-time transaction monitoring",
      "Predictive sales forecasting"
    ],
    metrics: {
      "Segmentation": "RFM Analysis",
      "Visualization": "3D Interactive",
      "Tracking": "Real-time",
      "Insights": "Automated",
      "Accuracy": "87.5%"
    },
    icon: "fas fa-chart-line",
    color: "from-green-500 to-teal-500",
    image: "assets/images/projects/cafe-trends.jpg",
    githubUrl: "https://github.com/DhruvSharma-05/CafeTrends",
    status: "completed",
    featured: true,
    hasLiveDemo: false
  },
  {
    id: 3,
    title: "Customer Retention Analysis",
    category: "machine-learning",
    description: "Advanced machine learning project for predicting customer churn using various algorithms with comprehensive data preprocessing.",
    longDescription: "Sophisticated customer retention analysis system that predicts churn likelihood using multiple ML algorithms and provides actionable insights for customer retention strategies.",
    technologies: ["Flask", "Streamlit", "Scikit-learn", "Seaborn", "Plotly", "MySQL", "Pandas", "TensorFlow"],
    features: [
      "Customer retention patterns analysis using churn prediction",
      "Machine learning-based churn prediction modeling",
      "Interactive retention metrics dashboards",
      "Customer segmentation and engagement tracking",
      "Automated alert system for high-risk customers",
      "ROI analysis for retention campaigns"
    ],
    metrics: {
      "Prediction": "Churn Likelihood",
      "Segmentation": "Customer Categories", 
      "Tracking": "KPI Metrics",
      "Automation": "Data Quality",
      "Accuracy": "91.3%"
    },
    icon: "fas fa-users",
    color: "from-purple-500 to-indigo-500",
    image: "assets/images/projects/customer-retention.jpg",
    githubUrl: "https://github.com/DhruvSharma-05/Customer-Retention-Analytics",
    status: "completed",
    featured: true,
    hasLiveDemo: false
  },
  {
    id: 4,
    title: "n8n Attendance Tracker",
    category: "data-analytics",
    description: "Created a no-code automation that logs class attendance by capturing messages from Telegram and saving them directly into a Google Sheet.",
    longDescription: "Automated attendance tracking system that integrates Telegram messaging with Google Sheets using n8n workflow automation, eliminating manual data entry and reducing errors.",
    technologies: ["n8n", "Telegram API", "Google Sheets API", "Workflow Automation", "REST API"],
    features: [
      "No-code automation for attendance logging",
      "Real-time Telegram message capture and processing",
      "Direct integration with Google Sheets for data storage",
      "Automated data validation and error handling",
      "Confirmation messaging system for reliability",
      "Scalable workflow for multiple classes/groups"
    ],
    metrics: {
      "Automation": "100% No-Code",
      "Integration": "Telegram + Google Sheets",
      "Processing": "Real-time Data Logging",
      "Error Reduction": "Manual Entry Eliminated",
      "Reliability": "Automated Confirmations"
    },
    icon: "fas fa-user-check",
    color: "from-blue-500 to-cyan-500",
    image: "assets/images/projects/attendance-tracker.jpg",
    githubUrl: "https://github.com/DhruvSharma-05/n8n-Attendance-Tracker",
    status: "completed",
    featured: true,
    hasLiveDemo: false
  },
  {
    id: 5,
    title: "Medium Content Curator API [Discontinued]",
    category: "data-analytics",
    description: "Developed a RESTful API to aggregate and curate articles from Medium, enabling efficient programmatic access to high-quality content.",
    longDescription: "A comprehensive content curation API that implemented robust filtering, categorization, and search functionality to streamline content discovery, discontinued due to Medium's updated scraping policies.",
    technologies: ["Python", "Web Scraping", "AI/ML", "REST API", "Content Filtering", "Categorization"],
    features: [
      "RESTful API for Medium article aggregation",
      "Robust content filtering and categorization system",
      "Keyword-based search and discovery functionality",
      "Trending articles and author-based queries",
      "Topic-wise recommendations and flexible solutions",
      "Automated content quality assessment"
    ],
    metrics: {
      "API": "RESTful Architecture",
      "Content": "High-Quality Filtering",
      "Search": "Keyword-Based Discovery",
      "Categorization": "AI/ML Powered",
      "Status": "Discontinued (Policy Changes)"
    },
    icon: "fas fa-rss",
    color: "from-orange-500 to-red-500",
    image: "assets/images/projects/medium-curator.jpg",
    githubUrl: "https://github.com/DhruvSharma-05/Medium-Content-Curator",
    status: "discontinued",
    featured: true,
    hasLiveDemo: false,
    note: "Project discontinued after discovering Medium's updated policies prohibit automated scraping"
  }
];


// ===== ACHIEVEMENTS DATA =====
const achievements = [
  {
    id: 1,
    title: "Hackathon Winner - STME HACKOMANIA",
    organization: "NMIMS University, Chandigarh",
    description: "Won first place for developing a working prototype for Smart city Pothole Detection System",
    technologies: ["React", "Google Dev Tools", "Python"],
    icon: "fas fa-trophy",
    color: "from-yellow-500 to-orange-500",
    date: "March 2024",
    impact: "",
    award: "1st Place",
    participants: "200+ teams"
  }
];

// ===== DESIGN PROJECTS DATA =====
// ===== UPDATED DESIGN PROJECTS DATA =====
const designProjects = [
  {
    id: 1,
    title: "Nike Website Design",
    description: "Modern e-commerce website redesign for Nike with focus on user experience and conversion optimization.",
    category: "web-design",
    tools: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    type: "Website Design",
    year: "2024",
    features: [
      "Responsive design for all devices",
      "Interactive product showcase", 
      "Modern UI with clean aesthetics",
      "Optimized user journey",
      "Advanced filtering system"
    ],
    icon: "fas fa-desktop",
    color: "from-orange-500 to-red-500",
    image: "assets/images/design/nike-website.jpg",
    figmaUrl: "https://www.figma.com/design/wNEuUtWLnkkyn89nkjWHA0/Nike-website?m=auto&t=DKRpFgtfUbMejaSP-1" // Add your actual Figma link here
  },
  {
    id: 2,
    title: "NMIMS Campus Canteen Case Study",
    description: "Complete UX research and design case study for improving the campus canteen experience at NMIMS.",
    category: "ux-research", 
    tools: ["Figma", "User Research", "Wireframing", "Prototyping"],
    type: "UX Case Study",
    year: "2024",
    features: [
      "Comprehensive user research",
      "Journey mapping and personas",
      "Wireframes and prototypes",
      "Usability testing results",
      "Implementation roadmap"
    ],
    icon: "fas fa-search",
    color: "from-green-500 to-teal-500",
    image: "assets/images/design/nmims-canteen.jpg",
    figmaUrl: "#" // Add your actual Figma link here
  },
  {
    id: 3,
    title: "Build Fitness App",
    description: "Complete mobile app design for a fitness application focusing on user engagement and workout tracking.",
    category: "app-design",
    tools: ["Figma", "Prototyping", "UI/UX Design", "User Testing"],
    type: "Mobile App",
    year: "2024",
    features: [
      "Intuitive workout tracking",
      "Personal trainer integration",
      "Progress visualization",
      "Social fitness community",
      "Gamification elements"
    ],
    icon: "fas fa-mobile-alt",
    color: "from-purple-500 to-pink-500",
    image: "assets/images/design/build-fitness.jpg",
    figmaUrl: "https://www.figma.com/design/KRQ5IwdUpqd2L1t2H7iNxx/BUILD?m=auto&t=DKRpFgtfUbMejaSP-1" // Add your actual Figma link here
    // Removed award property
  },
  {
    id: 4,
    title: "Headphone Store E-commerce",
    description: "Modern e-commerce website design for premium headphone brand with focus on product showcase.",
    category: "web-design",
    tools: ["Figma", "Adobe XD", "Prototyping"],
    type: "E-commerce",
    year: "2024",
    features: [
      "Premium product gallery",
      "Interactive 360° product view",
      "Streamlined checkout process",
      "Audio preview functionality",
      "Comparison tools"
    ],
    icon: "fas fa-headphones",
    color: "from-indigo-500 to-purple-500",
    image: "assets/images/design/headphone-store.jpg",
    figmaUrl: "https://www.figma.com/design/k8l56NRgEeyGmT87PGto7U/Headphone-store?m=auto&t=DKRpFgtfUbMejaSP-1" // Add your actual Figma link here
  },
  {
    id: 5,
    title: "Creative Design Portfolio - NMIMS & Anvikha",
    description: "Collection of creative design work including event branding, promotional materials, and visual communications for college events and organizations.",
    category: "brand-design",
    tools: ["Adobe Creative Suite", "Canva", "Brand Design", "Visual Identity"],
    type: "Brand & Event Design",
    year: "2024",
    features: [
      "Event branding and promotional materials",
      "Social media visual content creation",
      "College communications and announcements",
      "Brand guidelines and visual identity",
      "Print and digital design solutions",
      "Multi-department collaboration projects"
    ],
    icon: "fas fa-palette",
    color: "from-pink-500 to-purple-600",
    image: "assets/images/design/nmims-creative-work.jpg",
    driveUrl: "https://drive.google.com/drive/folders/1wEVuRkzd2Tflf1r80gKhm2AcUBfPfD3e", // Add your actual Google Drive link here
    linkType: "drive" // Special type for Google Drive links
  }
];


// ===== UPDATED SKILLS DATA WITH ICONS =====
const skillCategories = [
  {
    id: 1,
    title: "Programming Languages",
    icon: "💻",
    skills: [
      { name: "Python", level: 90, color: "#3776ab", icon: "fab fa-python" },
      { name: "JavaScript", level: 85, color: "#f7df1e", icon: "fab fa-js-square" },
      { name: "HTML5", level: 95, color: "#e34f26", icon: "fab fa-html5" },
      { name: "CSS3", level: 90, color: "#1572b6", icon: "fab fa-css3-alt" },
      { name: "SQL", level: 80, color: "#4479a1", icon: "fas fa-database" }
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Libraries & Frameworks", 
    icon: "📚",
    skills: [
      { name: "Pandas", level: 85, color: "#150458", icon: "fas fa-table" },
      { name: "NumPy", level: 80, color: "#013243", icon: "fas fa-calculator" },
      { name: "Matplotlib", level: 75, color: "#11557c", icon: "fas fa-chart-bar" },
      { name: "Seaborn", level: 70, color: "#3776ab", icon: "fas fa-chart-line" },
      { name: "Scikit-learn", level: 80, color: "#f7931e", icon: "fas fa-brain" },
      { name: "Flask", level: 75, color: "#000000", icon: "fas fa-flask" },
      { name: "Streamlit", level: 85, color: "#ff4b4b", icon: "fas fa-stream" },
      { name: "React", level: 75, color: "#61dafb", icon: "fab fa-react" }
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Tools & Technologies",
    icon: "🛠️", 
    skills: [
      { name: "Git", level: 85, color: "#f05032", icon: "fab fa-git-alt" },
      { name: "VS Code", level: 90, color: "#007acc", icon: "fas fa-code" },
      { name: "Power BI", level: 85, color: "#f2c811", icon: "fas fa-chart-pie" },
      { name: "AutoCAD", level: 70, color: "#ee3e33", icon: "fas fa-drafting-compass" },
      { name: "Excel", level: 90, color: "#217346", icon: "fas fa-file-excel" },
      { name: "Figma", level: 80, color: "#f24e1e", icon: "fab fa-figma" },
      { name: "Docker", level: 70, color: "#2496ed", icon: "fab fa-docker" }
    ],
    color: "from-purple-500 to-violet-500"
  },
  {
    id: 4,
    title: "Cloud & Databases",
    icon: "☁️",
    skills: [
      { name: "MySQL", level: 80, color: "#4479a1", icon: "fas fa-database" },
      { name: "MongoDB", level: 70, color: "#47a248", icon: "fas fa-leaf" },
      { name: "SQLite", level: 75, color: "#003b57", icon: "fas fa-table" },
      { name: "AWS", level: 70, color: "#ff9900", icon: "fab fa-aws" },
      { name: "Vercel", level: 75, color: "#000000", icon: "fas fa-cloud" }
    ],
    color: "from-orange-500 to-red-500"
  }
];

// ===== CERTIFICATIONS DATA =====
const certifications = [
  {
    id: 1,
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "2024",
    icon: "fab fa-aws",
    color: "from-orange-500 to-yellow-500",
    credentialId: "AWS-12345",
    skills: ["Cloud Computing", "AWS Services", "Cloud Architecture"]
  },
  {
    id: 2,
    name: "Google Data Analytics Specialization", 
    issuer: "Google",
    date: "2024",
    icon: "fab fa-google",
    color: "from-blue-500 to-green-500",
    credentialId: "GOOGLE-67890",
    skills: ["Data Analysis", "Data Visualization", "SQL", "R Programming"]
  },
  {
    id: 3,
    name: "Data-Driven Decisions with Power BI",
    issuer: "Microsoft",
    date: "2024",
    icon: "fab fa-microsoft",
    color: "from-blue-600 to-purple-600",
    credentialId: "MS-54321",
    skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"]
  },
  {
    id: 4,
    name: "Python for Data Science",
    issuer: "IBM",
    date: "2024",
    icon: "fas fa-certificate",
    color: "from-indigo-500 to-blue-500",
    credentialId: "IBM-98765",
    skills: ["Python", "Data Science", "Machine Learning", "Jupyter"]
  }
];

// ===== DESIGN TOOLS DATA =====
const designTools = [
  "Figma", "Adobe XD", "Adobe Photoshop", "Adobe Illustrator", 
  "Adobe After Effects", "Canva", "Sketch", "InVision", 
  "Prototyping", "User Research", "Wireframing", "UI/UX Design"
];

// ===== DESIGN STATS DATA =====
const designStats = [
  { number: "7+", label: "Design Projects", icon: "fas fa-palette" },
  { number: "3+", label: "Years Experience", icon: "fas fa-clock" },
  { number: "2+", label: "Event Brandings", icon: "fas fa-award" },
  { number: "1", label: "Hackathon Win", icon: "fas fa-trophy" }
];

// ===== TESTIMONIALS DATA =====
const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    position: "Professor, NMIMS Chandigarh",
    company: "SVKM's NMIMS",
    testimonial: "Dhruv has consistently demonstrated exceptional analytical skills and creativity in his projects. His work on data analytics has been outstanding.",
    rating: 5,
    image: "assets/images/testimonials/professor1.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Senior Data Analyst",
    company: "Accosoft India",
    testimonial: "Working with Dhruv was a great experience. His ability to translate complex data into actionable insights is remarkable.",
    rating: 5,
    image: "assets/images/testimonials/analyst1.jpg"
  }
];

// ===== BLOG POSTS DATA =====
const blogPosts = [
  {
    id: 1,
    title: "Machine Learning in Real-World Applications",
    excerpt: "Exploring how machine learning is transforming industries and creating new opportunities for data-driven decision making.",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Machine Learning",
    image: "assets/images/blog/ml-applications.jpg",
    slug: "machine-learning-real-world-applications"
  },
  {
    id: 2,
    title: "Building Interactive Dashboards with Power BI",
    excerpt: "A comprehensive guide to creating compelling data visualizations and interactive dashboards using Microsoft Power BI.",
    date: "2024-02-20",
    readTime: "8 min read",
    category: "Data Visualization",
    image: "assets/images/blog/power-bi-dashboards.jpg",
    slug: "building-interactive-dashboards-power-bi"
  }
];

// ===== CONTACT FORM DATA =====
const contactFormData = {
  subjects: [
    "Project Collaboration",
    "Job Opportunity",
    "Consultation",
    "General Inquiry",
    "Other"
  ],
  socialLinks: [
    {
      platform: "LinkedIn",
      url: personalInfo.linkedin,
      icon: "fab fa-linkedin",
      color: "#0077b5"
    },
    {
      platform: "GitHub",
      url: personalInfo.github,
      icon: "fab fa-github",
      color: "#333"
    },
    {
      platform: "Behance",
      url: personalInfo.designPortfolio,
      icon: "fab fa-behance",
      color: "#1769ff"
    }
  ]
};

// ===== EXPORT ALL DATA =====
// Make data available globally
window.portfolioData = {
  personalInfo,
  typingRoles,
  experiences,
  projects,
  achievements,
  designProjects,
  skillCategories,
  certifications,
  designTools,
  designStats,
  testimonials,
  blogPosts,
  contactFormData
};
