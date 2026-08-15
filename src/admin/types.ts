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

export type AdminAnalyticsResponse = {
  generatedAt: string;
  rangeDays: RangeDays;
  coverage: AnalyticsCoverage;
  kpis: {
    visitors: MetricValue;
    sessions: MetricValue;
    activeTime: MetricValue;
    bounceRate: MetricValue;
    resumeViews: MetricValue;
  };
  trend: TrendPoint[];
  sections: RankedValue[];
  actions: RankedValue[];
  acquisition: RankedValue[];
  audience: {
    countries: RankedValue[];
    devices: RankedValue[];
    browsers: RankedValue[];
  };
  funnel: RankedValue[];
  posthogLinks: PostHogLinks;
};
