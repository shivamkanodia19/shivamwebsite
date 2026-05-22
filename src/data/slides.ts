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

export const slide01HeadlineLines = ["The systems around you", "are broken."];
export const slide01Subhead = "Most people accept that.";
export const slide01Accent = "Shivam Kanodia doesn't.";

export const slide02Paragraphs = [
  "Freshman. Industrial & Systems Engineering (Honors), Texas A&M. 3.7 GPA.",
  "Incoming Business Intelligence Intern at Legends Global — Summer 2026.",
  "Aggie Venture Fund Cohort 6 · EH EDGE (Adam C. Sinn '00 Center for Investment Management).",
  "Co-founded ClinicalHours — volunteer scheduling infrastructure for free clinics. 200+ users, clinicalhours.org. Good Bull Pitch winner · Ideas Challenge finalist · Meloy Bullet Pitch 3/60 · Meloy Kickstart Launch (1 of 3 teams selected).",
  "Undergraduate researcher with Dr. Karun Kaniyamattam: cattle futures forecasting (SARIMA R²=0.97, LSTM, XGBoost). Presented at TAMU Student Research Week. Coauthoring paper on economic dashboards and system dynamics.",
  "Also built: a wearable NMES rehab device, an AI voice intake system (Clara), and a fraud detection ensemble (95%+ precision, 200k+ transactions). Product@TAMU Ideathon — 2nd place.",
  "Texas state bench press record. I apply the same discipline to code.",
];

export const portfolioCards: PortfolioCard[] = [
  {
    name: "ClinicalHours",
    thesis: "B2B volunteer infrastructure for free clinics and pre-med students.",
    detail:
      "Lifecycle management across applications, scheduling, interviews, communications. Claude-powered marketing agent + Gmail API outreach pipeline. clinicalhours.org",
    status: "ACTIVE",
    metric: "200+ users · Good Bull Pitch winner · Meloy Kickstart Launch · BCS Free Health Clinic live",
  },
  {
    name: "FEDVT Research",
    thesis: "ML forecasting dashboard for feedlot cattle futures decisions.",
    detail:
      "65 inputs, 6 cost categories. SARIMA (R²=0.97) selected over LSTM and XGBoost via walk-forward validation. Paper in progress.",
    status: "IN PROGRESS",
    metric: "Presented · TAMU Student Research Week",
  },
  {
    name: "FinSeek",
    thesis: "Fintech fraud detection platform.",
    detail:
      "3-model ensemble: Logistic Regression, Isolation Forest, LightGBM. 2-of-3 voting consensus. 200k+ PaySim transactions.",
    status: "COMPLETE",
    metric: "95%+ precision · 99% false positive reduction",
  },
  {
    name: "Clara",
    thesis: "AI pre-visit intake system for clinical settings.",
    detail:
      "Twilio voice calls, GPT-4o mini entity extraction, Epic FHIR sync. Conversational AI → structured SOAP notes.",
    status: "COMPLETE",
    metric: "~4.5 min/visit reduction in intake time",
  },
  {
    name: "Celvio",
    thesis: "Wearable NMES device for medical rehabilitation.",
    detail:
      "Business plan, financial model, PCB layout in Altium, pulse generator circuitry. FDA 510K compliance positioning.",
    status: "COMPLETE",
    metric: "$382M NMES market · $45 COGS target",
  },
];

export const tractionStats: TractionStat[] = [
  { key: "users", value: "200+", label: "organic ClinicalHours users", kind: "plus" },
  { key: "sarima", value: "R²=0.97", label: "SARIMA production model accuracy", kind: "type" },
  { key: "gpa", value: "3.7", label: "GPA, ISE Honors, freshman year", kind: "decimal" },
  { key: "wins", value: "5+", label: "competition placements, first semester", kind: "times" },
];

export const visionTimeline: TimelineEntry[] = [
  {
    date: "Summer 2026",
    body: "Business Intelligence Intern at Legends Global. Sports and entertainment analytics.",
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

export const askBody = `Interning at Legends Global this summer as a Business Intelligence Intern.

Open to research collaborations on ClinicalHours, FEDVT, or applied ML.

If you're building something worth building, reach out.`;

export const askPills = ["Legends Global · BI Intern · Summer 2026", "Research Collab", "Mentor / Advisor"];

export const contactLinks: ContactLinks = {
  email: "shivamkanodia77@gmail.com",
  phoneDisplay: "(214) 470-0598",
  phoneTel: "+12144700598",
  linkedin: "https://www.linkedin.com/in/shivamkanodia19/",
  linkedinLabel: "linkedin.com/in/shivamkanodia19",
};
