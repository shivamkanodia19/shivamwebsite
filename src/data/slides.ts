import type {
  ContactLinks,
  PortfolioCard,
  Slide,
  SlideMeta,
  TimelineEntry,
  TractionStat,
} from "@/types";

export const slides: Slide[] = [
  { id: 1, type: "problem", label: "PROBLEM", theme: "dark" },
  { id: 2, type: "founder", label: "FOUNDER", theme: "light" },
  { id: 3, type: "portfolio", label: "PORTFOLIO", theme: "light" },
  { id: 4, type: "traction", label: "TRACTION", theme: "dark" },
  { id: 5, type: "vision", label: "VISION", theme: "light" },
  { id: 6, type: "ask", label: "ASK", theme: "light" },
  { id: 7, type: "contact", label: "CONTACT", theme: "dark" },
];

export const slideMetas: SlideMeta[] = slides.map(({ id, label, theme }) => ({
  id,
  label,
  theme,
}));

export const SLIDE_COUNT = slides.length;

export const slide01HeadlineLines = ["Built and launched", "three systems.", "As a freshman."];
export const slide01Subhead = "~400 students. BCS Free Health Clinic. 5 competition wins.";
export const slide01Accent = "Here's how I think.";

export const slide02Paragraphs = [
  "Industrial & Systems Engineering (Honors), Texas A&M. 3.7 GPA.",
  "Software Engineering Intern at Matic, working on healthcare workflow automation.",
  "Insights Intern at Legends Global, supporting hospitality and venue decisions.",
  "Aggie Venture Fund Cohort 6 · EH EDGE (Adam C. Sinn '00 Center for Investment Management).",
  "Co-founded ClinicalHours — volunteer scheduling infrastructure for free clinics and pre-med students. Pilot clinic: BCS Free Health Clinic. clinicalhours.org. Good Bull Pitch winner · Ideas Challenge finalist · Meloy Kickstart Launch (1 of 3 teams selected).",
  "Undergraduate researcher with Dr. Karun Kaniyamattam: cattle futures forecasting using SARIMA, LSTM, and XGBoost. Presented at TAMU Student Research Week. Coauthoring paper on economic dashboards and system dynamics.",
  "Also built: a wearable NMES rehab device (Celvio), an AI voice intake system (Clara), and a fraud detection ML pipeline (FinSeek). Product@TAMU Ideathon — 2nd place.",
];

export const portfolioCards: PortfolioCard[] = [
  {
    name: "ClinicalHours",
    thesis: "Volunteer scheduling infrastructure for free clinics and pre-med students.",
    detail:
      "Lifecycle management across applications, scheduling, interviews, and communications. Claude-powered outreach pipeline. Pilot clinic: BCS Free Health Clinic. clinicalhours.org",
    status: "ACTIVE",
    metric: "Good Bull Pitch winner · Meloy Kickstart Launch · BCS Free Health Clinic pilot",
  },
  {
    name: "FEDVT Research",
    thesis: "ML forecasting dashboard for feedlot cattle futures decisions.",
    detail:
      "65 inputs, 6 cost categories. Compared SARIMA, LSTM, and XGBoost via walk-forward validation. Paper in progress with Dr. Karun Kaniyamattam.",
    status: "IN PROGRESS",
    metric: "Presented · TAMU Student Research Week",
  },
  {
    name: "FinSeek",
    thesis: "Fraud detection ML pipeline on synthetic transaction data.",
    detail:
      "3-model ensemble: Logistic Regression, Isolation Forest, LightGBM. 2-of-3 voting consensus on PaySim benchmark dataset.",
    status: "COMPLETE",
    metric: "Strong precision on PaySim benchmark",
  },
  {
    name: "Clara",
    thesis: "AI voice intake system for clinical pre-visit workflows.",
    detail:
      "Twilio voice calls, GPT-4o mini entity extraction, Epic FHIR sync. Converts conversational intake into structured SOAP notes.",
    status: "COMPLETE",
    metric: "Prototype · Clinical workflow proof-of-concept",
  },
  {
    name: "Celvio",
    thesis: "Wearable NMES device for medical rehabilitation.",
    detail:
      "Business plan, financial model, PCB layout in Altium, pulse generator circuitry. FDA 510K compliance positioning.",
    status: "COMPLETE",
    metric: "$382M NMES market · $45 COGS target",
  },
  {
    name: "Persona",
    thesis: "Universal digital identity layer for safer online interactions.",
    detail:
      "Government-verified identity with a portable reputation score (Karma) that follows users across platforms. Infrastructure for accountability without sacrificing privacy — one verified identity, safer interactions everywhere.",
    status: "COMPLETE",
    metric: "Product@TAMU Ideathon — 2nd place · 24-hour build",
  },
];

export const tractionStats: TractionStat[] = [
  { key: "students", value: "400+", label: "students on ClinicalHours · BCS Free Health Clinic pilot", kind: "plus" },
  { key: "clinic", value: "1", label: "live pilot clinic · BCS Free Health Clinic · Spring 2025", kind: "decimal" },
  { key: "gpa", value: "3.7", label: "GPA · ISE Honors · freshman year", kind: "decimal" },
  { key: "wins", value: "5+", label: "competition placements · first semester", kind: "times" },
];

export const visionTimeline: TimelineEntry[] = [
  {
    date: "Now",
    body: "Building across healthcare software at Matic, hospitality insights at Legends Global, and volunteer infrastructure through ClinicalHours.",
  },
  {
    date: "2026 – 2027",
    body: "Scale ClinicalHours to 10 Texas universities. Publish FEDVT cattle futures paper. Complete WEF nexus system dynamics research.",
  },
  {
    date: "2027+",
    body: "Quantitative finance or venture capital. Building at the intersection of data and real-world operations.",
  },
];

export const askBody = `Interested in product, strategy, and software engineering roles tied to real operational problems.

Also open to research collaborations on ClinicalHours, FEDVT, or applied ML.`;

export const askPills = ["Product & Strategy", "Software Engineering", "Research Collaboration"];

export const contactLinks: ContactLinks = {
  email: "shivamkanodia77@gmail.com",
  phoneDisplay: "(214) 470-0598",
  phoneTel: "+12144700598",
  linkedin: "https://www.linkedin.com/in/shivamkanodia19/",
  linkedinLabel: "linkedin.com/in/shivamkanodia19",
};
