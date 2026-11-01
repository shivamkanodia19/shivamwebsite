export type CaseTone = "matic" | "legends" | "clinical";

export type CaseMetric = {
  value: string;
  label: string;
  note?: string;
};

export type CaseStep = {
  title: string;
  detail: string;
};

export type CaseOp = {
  title: string;
  lines: string[];
};

export type CaseStudy = {
  slug: "matic" | "legends" | "clinicalhours";
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
  metrics: CaseMetric[];
  steps: CaseStep[];
  ops: CaseOp[];
};

export const caseStudies: Record<CaseStudy["slug"], CaseStudy> = {
  matic: {
    slug: "matic",
    tone: "matic",
    company: "Matic",
    role: "Software Engineering Intern",
    when: "Jun to Aug 2026",
    where: "Plano, part-time",
    site: "https://maticinside.ai/",
    siteLabel: "maticinside.ai",
    logo: "/brand/matic-logo-white.svg",
    logoClass: "case-logo-matic",
    title: "PulseMatic, the physician inbox.",
    lede: "Owned an AI inbox inside Provider AI. It drafts replies for refills, labs, and chart updates, and holds anything it cannot support.",
    metrics: [
      { value: "50-100", label: "Tasks a day", note: "Refills, labs, chart updates" },
      { value: "90%", label: "First-pass approval", note: "Physician review of drafts" },
      { value: "-64%", label: "Latency", note: "After chart-section retrieval" },
      { value: "-82%", label: "Token cost", note: "Same retrieval change" },
      { value: "~90 min", label: "Time back / day", note: "Projected, not a measured average" },
    ],
    steps: [
      { title: "Sit with physicians", detail: "Feedback became user stories and acceptance criteria for the sprint." },
      { title: "Retrieve, don't dump", detail: "Swapped full-chart prompts for the chart sections that mattered." },
      { title: "Gate the draft", detail: "Accuracy checks run before release. Unsupported drafts go to a physician." },
      { title: "Ship inside the product", detail: "CI/CD on Cloud Run, then into Provider AI for physician testing." },
    ],
    ops: [
      { title: "Owned", lines: ["PulseMatic, end to end", "Stories and acceptance criteria", "The review gate"] },
      { title: "Built", lines: ["Retrieval over chart sections", "Automated accuracy checks", "Cloud Run delivery"] },
      { title: "Landed", lines: ["Physicians testing it", "Inside Provider AI", "Drafts that can be refused"] },
    ],
  },
  legends: {
    slug: "legends",
    tone: "legends",
    company: "Legends Global",
    role: "Business Insights Intern",
    when: "Jun to Aug 2026",
    where: "Frisco, part-time",
    site: "https://legendsglobal.com/",
    siteLabel: "legendsglobal.com",
    logo: "/brand/legends-global-logo.svg",
    logoClass: "case-logo-legends",
    title: "Menu and price, then the portfolio.",
    lede: "Whitespace for AT&T Stadium and the Dallas Cowboys, then a pricing model that became menu rules across the venue portfolio.",
    metrics: [
      { value: "1,400+", label: "SKUs priced", note: "Elasticity and sales heatmaps" },
      { value: "$3.6M", label: "Annual uplift", note: "Projected vs current pricing" },
      { value: "400+", label: "Venues", note: "Menu optimization platform" },
      { value: "10", label: "Merchandising rules", note: "Built to speed the guest decision" },
    ],
    steps: [
      { title: "Find the gap", detail: "Peer NFL sales and DFW fans. New food and beverage concepts to stadium stakeholders." },
      { title: "Price the menu", detail: "Databricks SQL on 1,400+ SKUs. An A/B pilot drawn for targeted stands." },
      { title: "Write the rules", detail: "Graph workflows plus hard rules, so the same logic can travel." },
      { title: "Make it trackable", detail: "A dashboard for KPIs and OKRs, designed to update across venues." },
    ],
    ops: [
      { title: "Owned", lines: ["Stadium whitespace", "The pricing model", "The venue rollout shape"] },
      { title: "Built", lines: ["Elasticity and heatmaps", "10 merchandising strategies", "KPI / OKR dashboard"] },
      { title: "Landed", lines: ["Concepts in front of stakeholders", "A/B design for stands", "Rules aimed at 400+ venues"] },
    ],
  },
  clinicalhours: {
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
    lede: "A free-clinic operating layer from application to team management. The partner clinic ran its volunteer program on it.",
    metrics: [
      { value: "700+", label: "Student users", note: "Public milestone" },
      { value: "+325%", label: "Applications", note: "Pilot clinic volume" },
      { value: "-50%", label: "Recruiting time", note: "Same pilot" },
      { value: "150+", label: "Pilot applications", note: "BCS Free Health Clinic" },
    ],
    steps: [
      { title: "Talk to both sides", detail: "Clinic admins and students set the roadmap." },
      { title: "Name the price", detail: "$750 to $1,250 a year, per clinic." },
      { title: "One path", detail: "Role-based intake, review, and onboarding. Manual coordination came out." },
      { title: "Move the clinic on", detail: "BCS Free Health Clinic ran the full volunteer program on the platform." },
      { title: "Follow the data", detail: "SQL on signup, referral, and retention. Then pre-health orgs and peer referrals." },
    ],
    ops: [
      { title: "Owned", lines: ["Partnerships and pricing", "Go-to-market", "The pilot rollout"] },
      { title: "Built", lines: ["Student and admin portals", "React, TypeScript, Supabase", "Outreach tooling for clinic leads"] },
      { title: "Landed", lines: ["400 users in 2.5 months", "300 more in the next 2 weeks", "50+ clinic leads sourced"] },
    ],
  },
};

export const caseOrder = ["matic", "legends", "clinicalhours"] as const;
