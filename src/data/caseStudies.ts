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
    lede: "An AI inbox inside Provider AI, Matic's flagship product. It drafts replies for refills, labs, and chart updates and escalates anything unsupported to a physician.",
    outcome: "Saves physicians about 90 minutes a day by automating 50 to 100 daily tasks. 90% first-pass approval. 64% lower latency and 82% lower token cost.",
    results: [
      { label: "Time saved", value: "About 90 minutes per physician per day" },
      { label: "Daily tasks automated", value: "50 to 100 refill, lab, and chart tasks" },
      { label: "First-pass approval", value: "90% in physician review" },
      { label: "Retrieval vs. full-chart prompts", value: "64% lower latency, 82% lower token cost" },
    ],
    processLabel: "Build",
    processTitle: "How PulseMatic came together",
    steps: [
      { title: "Sit with physicians", detail: "Physician feedback became user stories and acceptance criteria." },
      { title: "Retrieve, don't dump", detail: "Relevant chart sections replaced full-chart prompts in the Python pipeline." },
      { title: "Gate the draft", detail: "Accuracy checks run first. Supported drafts go to physician confirmation; the rest escalate." },
      { title: "Ship inside the product", detail: "CI/CD on Cloud Run, then Provider AI for physician testing." },
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
    lede: "Food and beverage product and pricing analysis for AT&T Stadium and the Dallas Cowboys, extended into tools for the venue portfolio.",
    projects: [
      {
        number: "01",
        title: "Stadium food and beverage recommendations",
        what: "Benchmarked peer NFL venue sales and DFW fan demographics, then proposed assortment changes and new concepts.",
        result: "Presented recommendations to venue stakeholders.",
      },
      {
        number: "02",
        title: "Pricing model for 1,400+ SKUs",
        what: "Modeled price elasticity and sales heatmaps in Python and Databricks SQL. Designed an A/B pilot for targeted SKUs and stands.",
        result: "$3.6M projected annual revenue uplift.",
      },
      {
        number: "03",
        title: "Menu platform for the venue portfolio",
        what: "Built a menu optimization platform for 400+ venues. AI agent workflows and a rule-based system apply 10 behavioral merchandising strategies.",
        result: "Built for 400+ venues to speed guest decisions and shorten lines.",
      },
      {
        number: "04",
        title: "FIFA match revenue dashboard",
        what: "Validated order- and item-level POS data in Databricks SQL. Built a dashboard of AT&T Stadium FIFA match data comparing revenue, units, transactions, and average order value.",
        result: "One source of truth for venue stakeholders.",
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
    lede: "Co-founded platform for free clinics to run volunteer recruiting, scheduling, and hours tracking in one place. The pilot clinic runs its full volunteer program on it.",
    outcome: "700+ student users. At the BCS Free Health Clinic pilot, applications rose 325% to 150+ and recruiting time fell 50%.",
    results: [
      { label: "Users", value: "700+ student users" },
      { label: "Pilot clinic", value: "BCS Free Health Clinic, full volunteer program" },
      { label: "Applications", value: "Up 325% to 150+" },
      { label: "Recruiting time", value: "Down 50%" },
      { label: "Pricing", value: "$750 to $1,250 per clinic per year" },
    ],
    processLabel: "Founding",
    processTitle: "How the product and pilot moved",
    steps: [
      { title: "Talk to both sides", detail: "Clinic admins and students shaped the roadmap." },
      { title: "Set pricing", detail: "$750 to $1,250 per clinic per year, based on admin and student interviews." },
      { title: "One recruiting path", detail: "Role-based intake, review, and onboarding replaced manual coordination." },
      { title: "Move the clinic on", detail: "BCS Free Health Clinic ran its full volunteer program on the platform." },
      { title: "Grow through orgs and peers", detail: "SQL analysis of signup, referral, and retention data shifted marketing to pre-health organizations and peer referrals, adding 300 users in 2 weeks after 400 in 2.5 months." },
    ],
    deliverableTitle: "Clinic workflow and live product",
  },
};
