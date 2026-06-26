import type {
  ContactLinks,
  PortfolioCard,
  Slide,
  SlideMeta,
  TimelineEntry,
  TractionStat,
} from "@/types";

export const slides: Slide[] = [
  { id: 1, type: "problem", label: "PROOF", theme: "dark" },
  { id: 2, type: "founder", label: "EXPERIENCE", theme: "light" },
  { id: 3, type: "portfolio", label: "PORTFOLIO", theme: "light" },
  { id: 4, type: "traction", label: "RECOGNITION", theme: "dark" },
  { id: 5, type: "vision", label: "RESEARCH", theme: "light" },
  { id: 6, type: "ask", label: "RECORD", theme: "light" },
  { id: 7, type: "contact", label: "CONTACT", theme: "dark" },
];

export const slideMetas: SlideMeta[] = slides.map(({ id, label, theme }) => ({ id, label, theme }));
export const SLIDE_COUNT = slides.length;

export const slide01HeadlineLines = ["Built across", "three contexts."];
export const slide01Subhead = "Matic. Legends Global. ClinicalHours.";
export const slide01Accent = "Every claim backed by public proof.";

export const slide02Paragraphs = [
  "Industrial & Systems Engineering Honors at Texas A&M.",
  "Software Engineering Intern at Matic in 2026.",
  "Business Intelligence Intern at Legends Global, the world's largest venue consulting firm, in Summer 2026.",
  "Aggie Venture Fund Cohort 6 and EH EDGE, one of 35 in the 2026 cohort.",
  "Co-founded ClinicalHours, volunteer infrastructure for clinics and pre-health students with 500+ users.",
  "Research with Dr. Karun Kaniyamattam on cattle and dairy decision-support tools.",
];

export const portfolioCards: PortfolioCard[] = [
  {
    name: "ClinicalHours",
    thesis: "Volunteer infrastructure for clinics and pre-health students.",
    detail: "Applications, onboarding, scheduling, and communications. First clinic pilot partner: BCS Free Health Clinic.",
    status: "ACTIVE",
    metric: "Good Bull Pitch, 3rd place / Ideas Challenge finalist",
  },
  {
    name: "Cattle Futures Research",
    thesis: "Forecasting dashboard for feedlot cattle futures decisions.",
    detail: "65 inputs and six cost categories. SARIMA, LSTM, and XGBoost compared through walk-forward validation.",
    status: "IN PROGRESS",
    metric: "Presented / Texas A&M Student Research Week",
  },
  {
    name: "FinSeek",
    thesis: "Fraud detection platform built for TAMUHack.",
    detail: "Model ensemble, API, risk dashboard, and containerized delivery.",
    status: "COMPLETE",
    metric: "Performance figures self-reported on PaySim",
  },
  {
    name: "Clara",
    thesis: "AI voice intake for clinical pre-visit workflows.",
    detail: "Converts conversational intake into structured clinical information.",
    status: "COMPLETE",
    metric: "Workflow prototype",
  },
  {
    name: "Celvio",
    thesis: "Wearable NMES rehabilitation concept.",
    detail: "Product strategy, business case, PCB layout, and pulse generator circuitry.",
    status: "COMPLETE",
    metric: "$45 COGS target",
  },
  {
    name: "Persona",
    thesis: "Cross-platform digital identity concept.",
    detail: "Interactive prototype, pitch, and launch story built in 24 hours.",
    status: "COMPLETE",
    metric: "Product@TAMU Ideathon, 2nd place",
  },
];

export const tractionStats: TractionStat[] = [
  { key: "students", value: "500+", label: "ClinicalHours users", kind: "plus" },
  { key: "clinic", value: "1", label: "first clinic pilot partner", kind: "decimal" },
  { key: "projects", value: "8", label: "verified projects in the archive", kind: "decimal" },
  { key: "placements", value: "4", label: "named ClinicalHours milestones", kind: "times" },
];

export const visionTimeline: TimelineEntry[] = [
  { date: "2026", body: "Software Engineering Intern at Matic." },
  { date: "Summer 2026", body: "Business Intelligence Intern at Legends Global." },
  { date: "In progress", body: "ClinicalHours and cattle and dairy decision-support research." },
];

export const askBody = `Good Bull Pitch, 3rd place. Ideas Challenge finalist. Meloy Bullet Pitch, 3 of 60. Meloy Kickstart Launch, 1 of 3 teams selected from 11.`;

export const askPills = ["ClinicalHours", "Research", "Eight projects"];

export const contactLinks: ContactLinks = {
  email: "shivamkanodia77@gmail.com",
  phoneDisplay: "(214) 470-0598",
  phoneTel: "+12144700598",
  linkedin: "https://www.linkedin.com/in/shivamkanodia19/",
  linkedinLabel: "linkedin.com/in/shivamkanodia19",
};
