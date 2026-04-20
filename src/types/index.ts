export type SlideTheme = "light" | "dark";

export type SlideType =
  | "problem"
  | "founder"
  | "portfolio"
  | "traction"
  | "vision"
  | "ask"
  | "contact";

export type NavDirection = 1 | -1;

export type PortfolioStatus = "ACTIVE" | "IN PROGRESS" | "COMPLETE";

export interface Slide {
  id: number;
  type: SlideType;
  label: string;
  theme: SlideTheme;
}

export interface SlideMeta {
  id: number;
  label: string;
  theme: SlideTheme;
}

export interface PortfolioCard {
  name: string;
  thesis: string;
  detail: string;
  status: PortfolioStatus;
  metric: string;
}

export interface TractionStat {
  key: string;
  value: string;
  label: string;
  kind: "plus" | "type" | "decimal" | "times";
}

export interface TimelineEntry {
  date: string;
  body: string;
}

export interface ContactLinks {
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  linkedin: string;
  linkedinLabel: string;
}
