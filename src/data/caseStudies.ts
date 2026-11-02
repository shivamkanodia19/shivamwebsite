export type CaseTone = "matic" | "legends" | "clinical";

export type ResultLine = {
  label: string;
  value: string;
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type InternshipProject = {
  number: string;
  title: string;
  what: string;
  result: string;
};

export type SingleProjectCase = {
  kind: "single";
  slug: "matic" | "clinicalhours";
  tone: CaseTone;
  company: string;
  role: string;
  when: string;
  where: string;
  site: string;
  siteLabel: string;
  logo: string;
  logoClass: string;
  title: string;
  lede: string;
  outcome: string;
  results: ResultLine[];
  processLabel: string;
  processTitle: string;
  steps: ProcessStep[];
  deliverableTitle: string;
};

export type MultiProjectCase = {
  kind: "multi";
  slug: "legends";
  tone: CaseTone;
  company: string;
  role: string;
  when: string;
  where: string;
  site: string;
  siteLabel: string;
  logo: string;
  logoClass: string;
  title: string;
  lede: string;
  projects: InternshipProject[];
};

export type CaseStudy = SingleProjectCase | MultiProjectCase;

export const caseStudies: Record<"matic" | "legends" | "clinicalhours", CaseStudy> = {
  matic: {
    kind: "single",
    slug: "matic",
    tone: "matic",
    company: "Matic",
    role: "Software Engineering Intern",
    when: "Jun to Aug 2026",
    where: "Plano, part-time",
    site: "https://maticinside.ai/",
    siteLabel: "maticinside.ai",
    logo: "/brand/matic-logo-dark.svg",
    logoClass: "case-logo-matic",
    title: "PulseMatic, the physician inbox.",
    lede: "I built an AI inbox inside Provider AI. It drafts replies for refills, labs, and chart updates, and sends anything it cannot support to a physician.",
    outcome: "Physicians approved about 90% of drafts on first pass. After switching to chart-section retrieval, latency fell 64% and token cost fell 82%. About 90 minutes a day back is a projection, not a measured average.",
    results: [
      { label: "Daily load", value: "50 to 100 refill, lab, and chart tasks" },
      { label: "First-pass approval", value: "About 90% in physician review" },
      { label: "After retrieval", value: "64% lower latency, 82% lower token cost" },
      { label: "Where it lives", value: "Inside Provider AI, in physician testing" },
    ],
    processLabel: "Build",
    processTitle: "How PulseMatic came together",
    steps: [
      { title: "Sit with physicians", detail: "Their feedback became user stories and acceptance criteria for the sprint." },
      { title: "Retrieve, don't dump", detail: "I stopped sending the full chart into the prompt and only pulled the sections that mattered." },
      { title: "Gate the draft", detail: "Accuracy checks run before release. Supported drafts go to physician confirmation; unsupported drafts escalate." },
      { title: "Ship inside the product", detail: "CI/CD on Cloud Run, then into Provider AI for physician testing." },
    ],
    deliverableTitle: "How the workflow works",
  },
  legends: {
    kind: "multi",
    slug: "legends",
    tone: "legends",
    company: "Legends Global",
    role: "Business Insights Intern",
    when: "Jun to Aug 2026",
    where: "Frisco, part-time",
    site: "https://legendsglobal.com/",
    siteLabel: "legendsglobal.com",
    logo: "/brand/legends-global-logo-dark.svg",
    logoClass: "case-logo-legends",
    title: "Food and beverage work across Legends venues.",
    lede: "I worked on food and beverage product and pricing decisions for AT&T Stadium and the Dallas Cowboys, then helped turn that into tools the rest of the venue portfolio could use.",
    projects: [
      {
        number: "01",
        title: "Stadium food and beverage recommendations",
        what: "For AT&T Stadium and the Dallas Cowboys, I compared peer NFL venue sales and DFW fan demographics, then presented assortment changes and new food and beverage concepts to venue stakeholders.",
        result: "Presented assortment and pricing recommendations to venue stakeholders.",
      },
      {
        number: "02",
        title: "Pricing model for 1,400+ SKUs",
        what: "I modeled fan-friendly pricing in Databricks SQL from price elasticity and sales heatmaps, and designed an A/B pilot for targeted stands.",
        result: "Projected annual revenue opportunity of $3.6M versus current pricing.",
      },
      {
        number: "03",
        title: "Menu platform for the venue portfolio",
        what: "I helped build a menu optimization platform meant to scale across 400+ venues, applying 10 behavioral merchandising strategies through graph-based workflows and a rule-based system.",
        result: "Intended menu-platform scope across 400+ venues. Goal: faster guest decisions, higher sales, and shorter lines with reusable logic.",
      },
      {
        number: "04",
        title: "KPI and OKR tracking for venue teams",
        what: "I built a dashboard so venue teams could track and update KPIs and OKRs without hunting through spreadsheets. Implementation used Claude for assisted updates.",
        result: "Designed to scale across venues once the pricing and menu work was in place.",
      },
    ],
  },
  clinicalhours: {
    kind: "single",
    slug: "clinicalhours",
    tone: "clinical",
    company: "ClinicalHours",
    role: "Co-founder",
    when: "Dec 2025 to May 2026",
    where: "College Station",
    site: "https://clinicalhours.org/",
    siteLabel: "clinicalhours.org",
    logo: "/brand/clinicalhours-logo.png",
    logoClass: "case-logo-clinical",
    title: "The volunteer desk, in software.",
    lede: "I co-founded ClinicalHours so free clinics could run volunteer recruiting and onboarding in one place. Our partner clinic moved its full volunteer program onto the platform.",
    outcome: "700+ student users on the platform. At the pilot clinic: 150+ applications, application volume up 325%, recruiting time down about 50%.",
    results: [
      { label: "Users", value: "700+ student users on the platform" },
      { label: "Pilot clinic", value: "BCS Free Health Clinic, full volunteer program" },
      { label: "Applications", value: "150+, volume up 325% at the pilot" },
      { label: "Recruiting time", value: "Down about 50% at the pilot" },
      { label: "Proposed pricing", value: "$750 to $1,250 a year per clinic" },
    ],
    processLabel: "Founding",
    processTitle: "How the product and pilot moved",
    steps: [
      { title: "Talk to both sides", detail: "Clinic admins and students set the roadmap." },
      { title: "Set proposed pricing", detail: "Proposed annual clinic pricing: $750–$1,250." },
      { title: "One recruiting path", detail: "Role-based intake, review, and onboarding replaced the manual coordination." },
      { title: "Move the clinic on", detail: "BCS Free Health Clinic ran the full volunteer program on the platform." },
      { title: "Grow through orgs and peers", detail: "SQL on signup, referral, and retention. Then pre-health orgs and peer referrals." },
    ],
    deliverableTitle: "Clinic workflow and live product",
  },
};
