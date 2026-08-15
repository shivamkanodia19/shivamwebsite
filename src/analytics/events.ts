export type AnalyticsEventProperties = {
  section_viewed: {
    section_id: string;
    section_label: string;
    visibility_threshold: number;
  };
  section_engaged: { section_id: string; active_milliseconds: number };
  element_clicked: {
    element_id: string;
    label: string;
    section_id: string;
    destination_type: string;
  };
  project_opened: { project_id: string; project_name: string };
  resume_viewed: { placement: string };
  external_link_clicked: { destination_type: string };
  pitch_opened: Record<string, never>;
  contact_clicked: { channel: "email" | "linkedin" };
};

export type AnalyticsEventName = keyof AnalyticsEventProperties;

export const analyticsValueRegistry = {
  channel: ["email", "linkedin"],
  destination_type: ["email", "external", "linkedin", "pitch", "project", "resume"],
  element_id: [
    "contact-email",
    "contact-linkedin",
    "footer-resume",
    "hero-resume",
    "hero-work",
    "nav-builds",
    "nav-outside-work",
    "nav-research",
    "nav-resume",
    "nav-work",
    "pitch-resume",
  ],
  label: [
    "Builds",
    "Email",
    "Hackathons",
    "LinkedIn",
    "Outside work",
    "Research",
    "Resume",
    "Work",
  ],
  placement: ["footer", "hero", "navigation", "pitch", "resume-section"],
  project_id: ["case-study", "cattle-futures-research", "celvio", "clara", "clinicalhours", "finseek", "legends", "matic", "persona"],
  project_name: ["Case Study", "Cattle Futures Research", "Celvio", "Clara", "ClinicalHours", "FinSeek", "Legends Global", "Matic", "Persona"],
  section_id: ["builds", "clinicalhours", "contact", "hero", "projects", "recognition", "research", "resume", "work"],
  section_label: ["ClinicalHours", "Experience", "Hackathon projects", "Outside work", "Personal builds", "Research", "Resume", "Work"],
} as const;
