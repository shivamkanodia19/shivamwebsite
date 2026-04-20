import type { PortfolioCard, SlideMeta, TimelineEntry } from "@/types";

export const slideMetas: SlideMeta[] = [
  { id: 1, label: "PROBLEM", theme: "light" },
  { id: 2, label: "FOUNDER", theme: "light" },
  { id: 3, label: "PORTFOLIO", theme: "light" },
  { id: 4, label: "TRACTION", theme: "dark" },
  { id: 5, label: "VISION", theme: "light" },
  { id: 6, label: "ASK", theme: "light" },
  { id: 7, label: "CONTACT", theme: "dark" },
];

export const SLIDE_COUNT = slideMetas.length;

/** Headline lines for slide 1 — words animate in sequence across lines */
export const slide01HeadlineLines = [
  "The systems around you are broken.",
  "Most people accept that.",
] as const;

export const slide01Subhead = "Shivam Kanodia doesn't.";

export const slide02Paragraphs = [
  "Freshman. Industrial & Systems Engineering (Honors), Texas A&M. GPA 3.7.",
  "Co-founded ClinicalHours at 18 — volunteer infrastructure for free clinics. 200+ organic users. Zero marketing spend. Meloy Kickstart Accelerator.",
  "Undergraduate researcher coauthoring papers on cattle futures forecasting using SARIMA, LSTM, and XGBoost. SARIMA selected as production model (R² = 0.97).",
  "Presented at TAMU Student Research Week. Building a WEF nexus system dynamics model in Vensim for dairy farm stress simulation.",
  "Texas state bench press record holder. Competed since 16.",
  "Thinks in systems. Builds things that work.",
] as const;

export const portfolioCards: PortfolioCard[] = [
  {
    name: "ClinicalHours",
    thesis:
      "B2B volunteer infrastructure connecting free clinics with pre-med students.",
    detail:
      "Lifecycle management: applications, scheduling, interviews, communications. Built Claude-powered marketing agent + Gmail API outreach pipeline.",
    status: "ACTIVE",
    metric: "200+ users · $30M SAM · BCS Free Health Clinic live",
  },
  {
    name: "FEDVT Research",
    thesis: "ML forecasting dashboard for feedlot cattle futures decisions.",
    detail:
      "65 inputs across 6 cost categories. SARIMA (R²=0.97) selected over LSTM and XGBoost via walk-forward validation. Paper in progress.",
    status: "IN PROGRESS",
    metric: "Presented at TAMU Student Research Week",
  },
  {
    name: "FinSeek (TAMUHack)",
    thesis: "Fintech fraud detection platform.",
    detail:
      "3-model ensemble: Logistic Regression, Isolation Forest, LightGBM. 2-of-3 voting consensus. Trained on 200k+ PaySim transactions.",
    status: "COMPLETE",
    metric: "95%+ precision · 99% false positive reduction",
  },
  {
    name: "Clara (Product@TAMU Ideathon)",
    thesis: "AI pre-visit intake system for clinical settings.",
    detail:
      "Voice-based patient calls via Twilio, GPT-4o mini medical entity extraction, Epic FHIR sync. Reduces intake time ~4.5 min/visit.",
    status: "COMPLETE",
    metric: "Conversational AI → structured SOAP notes",
  },
  {
    name: "Celvio (MedXplore)",
    thesis: "Wearable NMES device for medical rehabilitation.",
    detail:
      "Led business plan + financial model. PCB layout in Altium, pulse generator circuitry. $45 COGS target. FDA 510K compliance positioning.",
    status: "COMPLETE",
    metric: "$382M NMES market · $45 COGS target",
  },
];

export const tractionStats = [
  { key: "users", display: "200+", label: "organic ClinicalHours users", kind: "plus" as const },
  { key: "r2", display: "R²=0.97", label: "SARIMA production model accuracy", kind: "type" as const },
  { key: "gpa", display: "3.7", label: "GPA, ISE Honors, freshman year", kind: "decimal" as const },
  {
    key: "comp",
    display: "4×",
    label:
      "competition placements in first semester (Meloy 3rd, Good Bull Pitch 3rd, Ideas Challenge Finalist, Persona 2nd)",
    kind: "times" as const,
  },
];

export const visionTimeline: TimelineEntry[] = [
  {
    date: "Summer 2026",
    body: "Internship at a DFW-area startup or tech company. Operations, product, or engineering.",
  },
  {
    date: "2026 – 2027",
    body: "Scale ClinicalHours to 10 Texas universities. Publish FEDVT cattle futures paper. Complete WEF nexus system dynamics research.",
  },
  {
    date: "2027+",
    body: "Quantitative finance or venture. Building at the intersection of data and real-world operations.",
  },
];

export const askBody = `Looking for a summer 2026 internship in operations, product, or engineering at a company building something real in DFW or remote.

Open to research collaborations around ClinicalHours, FEDVT, or applied ML. Happy to talk if you're building something interesting.`;

export const askPills = [
  "Summer 2026 Internship",
  "Research Collab",
  "Advisor / Mentor",
] as const;

export const contactLinks = {
  email: "shivamkanodia77@gmail.com",
  phoneDisplay: "(214) 470-0598",
  phoneTel: "+12144700598",
  linkedin: "https://www.linkedin.com/in/shivamkanodia19/",
  linkedinLabel: "linkedin.com/in/shivamkanodia19",
};
