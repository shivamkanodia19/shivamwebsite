export type RangeDays = 7 | 30 | 90;

export type MetricValue = {
  value: number | null;
  previous: number | null;
  deltaPercent: number | null;
};

export type TrendPoint = {
  date: string;
  visitors: number;
  sessions: number;
  resumeViews: number;
};

export type RankedValue = {
  label: string;
  visitors: number;
  total: number;
  share: number;
};

export type SectionValue = {
  label: string;
  sessions: number;
  total: number;
  share: number;
};

export type FunnelStage = {
  label: string;
  sessions: number;
  share: number;
};

export type AnalyticsCoverage = {
  requestedFrom: string;
  availableFrom: string | null;
  partial: boolean;
};

export type PostHogLinks = {
  sessions: string | null;
  heatmaps: string | null;
  paths: string | null;
  events: string | null;
};

export type AnalyticsReportKey = "kpis" | "trend" | "sections" | "actions" | "acquisition" | "audience" | "funnel";
export type AnalyticsReportAvailability = "available" | "unavailable";
export type AnalyticsTrackingHealth = "healthy" | "degraded";
export type AnalyticsReportStatus = Record<AnalyticsReportKey, AnalyticsReportAvailability>;

export type AdminAnalyticsResponse = {
  generatedAt: string;
  rangeDays: RangeDays;
  coverage: AnalyticsCoverage;
  trackingHealth: AnalyticsTrackingHealth;
  reportStatus: AnalyticsReportStatus;
  kpis: {
    visitors: MetricValue;
    sessions: MetricValue;
    activeTime: MetricValue;
    bounceRate: MetricValue;
    resumeViews: MetricValue;
  };
  trend: TrendPoint[];
  sections: SectionValue[];
  actions: RankedValue[];
  acquisition: RankedValue[];
  audience: {
    countries: RankedValue[];
    devices: RankedValue[];
    browsers: RankedValue[];
  };
  funnel: FunnelStage[];
  posthogLinks: PostHogLinks;
};
