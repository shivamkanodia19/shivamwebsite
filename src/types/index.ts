export type SlideTheme = "light" | "dark";

export type NavDirection = 1 | -1;

/** Metadata for the seven deck slides (labels align with slide components). */
export interface SlideMeta {
  id: number;
  label: string;
  theme: SlideTheme;
}

export type PortfolioStatus = "ACTIVE" | "IN PROGRESS" | "COMPLETE";

export interface PortfolioCard {
  name: string;
  thesis: string;
  detail: string;
  status: PortfolioStatus;
  metric: string;
}

export interface TimelineEntry {
  date: string;
  body: string;
}
