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
    lede: "An AI inbox built inside Provider AI, Matic's flagship product. It drafts replies for refills, labs, and chart updates and routes anything it cannot support to a physician.",
    outcome: "Saves physicians about 90 minutes a day by automating 50 to 100 daily clinical tasks. 90% of drafts approved on first pass. Chart-section retrieval cut latency 64% and token cost 82%.",
    results: [
      { label: "Daily tasks automated", value: "50 to 100 refill, lab, and chart tasks" },
      { label: "First-pass approval", value: "90% in physician review" },
      { label: "Retrieval vs. full-chart prompts", value: "64% lower latency, 82% lower token cost" },
      { label: "Time saved", value: "About 90 minutes per physician per day" },
    ],
    processLabel: "Build",
    processTitle: "How PulseMatic came together",
    steps: [
      { title: "Sit with physicians", detail: "Their feedback became user stories and acceptance criteria for the sprint." },
      { title: "Retrieve, don't dump", detail: "Relevant chart sections replaced full-chart prompts in the Python pipeline feeding the drafting agents." },
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
    lede: "Food and beverage product and pricing analysis for AT&T Stadium and the Dallas Cowboys, extended into tools for the wider venue portfolio.",
    projects: [
      {
        number: "01",
        title: "Stadium food and beverage recommendations",
        what: "Benchmarked peer NFL venue sales and DFW fan demographics for AT&T Stadium and the Dallas Cowboys, then presented assortment changes and new food and beverage concepts to venue stakeholders.",
        result: "Presented assortment and pricing recommendations to venue stakeholders.",
      },
      {
        number: "02",
        title: "Pricing model for 1,400+ SKUs",
        what: "Modeled price elasticity and sales heatmaps in Python and Databricks SQL, then designed an A/B pilot for targeted SKUs and stands.",
        result: "Projected $3.6M in annual revenue uplift over current pricing.",
      },
      {
        number: "03",
        title: "Menu platform for the venue portfolio",
        what: "Built a menu optimization platform intended for 400+ venues, pairing AI agent workflows with a rule-based system to apply 10 behavioral merchandising strategies.",
        result: "Intended for 400+ venues, aimed at faster guest decisions and shorter lines.",
      },
      {
        number: "04",
        title: "FIFA match revenue dashboard",
        what: "Validated order- and item-level POS data in Databricks SQL, then built a dashboard combining FIFA match data from AT&T Stadium's POS systems to compare revenue, units, transactions, and average order value.",
        result: "One source of truth for venue F&B stakeholders.",
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
    lede: "Co-founded ClinicalHours so free clinics can run volunteer recruiting, scheduling, and hours tracking in one place. The partner clinic moved its full volunteer program onto the platform.",
    outcome: "700+ student users. At the pilot clinic, applications rose 325% to 150+ and recruiting time fell 50%.",
    results: [
      { label: "Users", value: "700+ student users on the platform" },
      { label: "Pilot clinic", value: "BCS Free Health Clinic, full volunteer program" },
      { label: "Applications", value: "Up 325% to 150+ at the pilot" },
      { label: "Recruiting time", value: "Down 50% at the pilot" },
      { label: "Pricing", value: "$750 to $1,250 a year per clinic" },
    ],
    processLabel: "Founding",
    processTitle: "How the product and pilot moved",
    steps: [
      { title: "Talk to both sides", detail: "Clinic admins and students set the roadmap." },
      { title: "Set pricing", detail: "Annual per-clinic pricing of $750 to $1,250, from interviews with clinic admins and students." },
      { title: "One recruiting path", detail: "Role-based intake, review, and onboarding replaced the manual coordination." },
      { title: "Move the clinic on", detail: "BCS Free Health Clinic ran the full volunteer program on the platform." },
      { title: "Grow through orgs and peers", detail: "SQL analysis of signup, referral, and retention data after 400 users in 2.5 months moved marketing to pre-health organizations and peer referrals, adding 300 users in 2 weeks." },
    ],
    deliverableTitle: "Clinic workflow and live product",
  },
};
