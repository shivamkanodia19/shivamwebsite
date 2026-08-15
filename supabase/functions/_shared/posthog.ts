export type RangeDays = 7 | 30 | 90;

export type MetricValue = { value: number | null; previous: number | null; deltaPercent: number | null };
export type TrendPoint = { date: string; visitors: number; sessions: number; resumeViews: number };
export type RankedValue = { label: string; visitors: number; total: number; share: number };
export type PostHogLinks = { sessions: string | null; heatmaps: string | null; paths: string | null; events: string | null };

export class PostHogDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostHogDataError";
  }
}

export type ReportQuery = {
  id: "kpis" | "trend" | "sections" | "actions" | "acquisition" | "audience" | "funnel";
  payload: { query: { kind: "HogQLQuery"; query: string } };
};

export function parseRange(value: string | null): RangeDays {
  if (value === "7" || value === "30" || value === "90") return Number(value) as RangeDays;
  throw new PostHogDataError("Unsupported report range");
}

export function buildReportQueries(range: RangeDays): ReportQuery[] {
  assertRange(range);
  const current = `timestamp >= now() - INTERVAL ${range} DAY`;
  const previous = `timestamp >= now() - INTERVAL ${range * 2} DAY AND timestamp < now() - INTERVAL ${range} DAY`;

  return [
    report("kpis", `SELECT
      uniqIf(distinct_id, ${current}), uniqIf(distinct_id, ${previous}),
      uniqIf(properties.$session_id, ${current}), uniqIf(properties.$session_id, ${previous}),
      sumIf(toFloat(properties.active_milliseconds), event = 'section_engaged' AND ${current}) / 1000,
      sumIf(toFloat(properties.active_milliseconds), event = 'section_engaged' AND ${previous}) / 1000,
      countIf(properties.$is_bounce = 'true' AND ${current}) * 100 / nullIf(uniqIf(properties.$session_id, ${current}), 0),
      countIf(properties.$is_bounce = 'true' AND ${previous}) * 100 / nullIf(uniqIf(properties.$session_id, ${previous}), 0),
      countIf(event = 'resume_viewed' AND ${current}), countIf(event = 'resume_viewed' AND ${previous})
      FROM events WHERE ${current} OR ${previous}`),
    report("trend", `SELECT toString(toDate(timestamp)), uniq(distinct_id), uniq(properties.$session_id), countIf(event = 'resume_viewed')
      FROM events WHERE ${current} GROUP BY toDate(timestamp) ORDER BY toDate(timestamp)`),
    report("sections", `SELECT properties.section_label, uniq(distinct_id), count()
      FROM events WHERE event IN ('section_viewed', 'section_engaged') AND ${current}
      GROUP BY properties.section_label ORDER BY visitors DESC LIMIT 20`),
    report("actions", `SELECT coalesce(properties.label, properties.project_name, properties.placement), uniq(distinct_id), count()
      FROM events WHERE event IN ('element_clicked', 'project_opened', 'resume_viewed', 'external_link_clicked', 'contact_clicked') AND ${current}
      GROUP BY coalesce(properties.label, properties.project_name, properties.placement) ORDER BY visitors DESC LIMIT 20`),
    report("acquisition", `SELECT coalesce(nullIf(properties.$referring_domain, ''), nullIf(properties.utm_source, ''), 'Direct'), uniq(distinct_id), count()
      FROM events WHERE event = '$pageview' AND ${current}
      GROUP BY coalesce(nullIf(properties.$referring_domain, ''), nullIf(properties.utm_source, ''), 'Direct') ORDER BY visitors DESC LIMIT 20`),
    report("audience", `SELECT 'country', coalesce(nullIf(properties.$geoip_country_name, ''), 'Unknown'), uniq(distinct_id), count()
      FROM events WHERE event = '$pageview' AND ${current} GROUP BY properties.$geoip_country_name
      UNION ALL SELECT 'device', coalesce(nullIf(properties.$device_type, ''), 'Unknown'), uniq(distinct_id), count()
      FROM events WHERE event = '$pageview' AND ${current} GROUP BY properties.$device_type
      UNION ALL SELECT 'browser', coalesce(nullIf(properties.$browser, ''), 'Unknown'), uniq(distinct_id), count()
      FROM events WHERE event = '$pageview' AND ${current} GROUP BY properties.$browser`),
    report("funnel", `SELECT 'Visit', uniqIf(distinct_id, event = '$pageview'), countIf(event = '$pageview') FROM events WHERE ${current}
      UNION ALL SELECT 'Work view', uniqIf(distinct_id, event = 'section_viewed' AND properties.section_id = 'work'), countIf(event = 'section_viewed' AND properties.section_id = 'work') FROM events WHERE ${current}
      UNION ALL SELECT 'Portfolio action', uniqIf(distinct_id, event IN ('element_clicked', 'project_opened', 'external_link_clicked', 'contact_clicked')), countIf(event IN ('element_clicked', 'project_opened', 'external_link_clicked', 'contact_clicked')) FROM events WHERE ${current}
      UNION ALL SELECT 'Resume action', uniqIf(distinct_id, event = 'resume_viewed'), countIf(event = 'resume_viewed') FROM events WHERE ${current}`),
  ];
}

export function normalizeKpis(rows: unknown): Record<"visitors" | "sessions" | "activeTime" | "bounceRate" | "resumeViews", MetricValue> {
  if (!Array.isArray(rows) || rows.length === 0) return emptyKpis();
  const row = rows[0];
  if (!Array.isArray(row) || row.length !== 10) throw new PostHogDataError("Malformed KPI report");
  const values = row.map(optionalNumber);
  return {
    visitors: metric(values[0], values[1]),
    sessions: metric(values[2], values[3]),
    activeTime: metric(values[4], values[5]),
    bounceRate: metric(values[6], values[7]),
    resumeViews: metric(values[8], values[9]),
  };
}

export function normalizeTrendPoints(rows: unknown): TrendPoint[] {
  if (!Array.isArray(rows)) throw new PostHogDataError("Malformed trend report");
  return rows.map((row) => {
    if (!Array.isArray(row) || row.length !== 4 || typeof row[0] !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row[0])) {
      throw new PostHogDataError("Malformed trend row");
    }
    return { date: row[0], visitors: requiredNumber(row[1]), sessions: requiredNumber(row[2]), resumeViews: requiredNumber(row[3]) };
  });
}

export function normalizeRankedValues(rows: unknown): RankedValue[] {
  if (!Array.isArray(rows)) throw new PostHogDataError("Malformed ranked report");
  return rows.map((row) => {
    if (!Array.isArray(row) || row.length !== 3 || typeof row[0] !== "string" || !row[0].trim()) {
      throw new PostHogDataError("Malformed ranked row");
    }
    const visitors = requiredNumber(row[1]);
    const total = requiredNumber(row[2]);
    return { label: row[0], visitors, total, share: total === 0 ? 0 : round((visitors / total) * 100) };
  });
}

export function normalizeAudience(rows: unknown): { countries: RankedValue[]; devices: RankedValue[]; browsers: RankedValue[] } {
  if (!Array.isArray(rows)) throw new PostHogDataError("Malformed audience report");
  const groups = { countries: [] as RankedValue[], devices: [] as RankedValue[], browsers: [] as RankedValue[] };
  for (const row of rows) {
    if (!Array.isArray(row) || row.length !== 4 || typeof row[0] !== "string") throw new PostHogDataError("Malformed audience row");
    const value = normalizeRankedValues([row.slice(1)])[0];
    if (row[0] === "country") groups.countries.push(value);
    else if (row[0] === "device") groups.devices.push(value);
    else if (row[0] === "browser") groups.browsers.push(value);
    else throw new PostHogDataError("Unknown audience group");
  }
  return groups;
}

export function createPostHogLinks(projectUrl: string | undefined): PostHogLinks {
  if (!projectUrl) return { sessions: null, heatmaps: null, paths: null, events: null };
  let url: URL;
  try {
    url = new URL(projectUrl);
  } catch {
    throw new PostHogDataError("Invalid PostHog project URL");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || !/^\/project\/\d+$/.test(url.pathname)) {
    throw new PostHogDataError("Invalid PostHog project URL");
  }
  const base = url.toString().replace(/\/$/, "");
  return {
    sessions: `${base}/replay`,
    heatmaps: `${base}/heatmaps`,
    paths: `${base}/insights/new?insight=PATHS`,
    events: `${base}/events`,
  };
}

function report(id: ReportQuery["id"], query: string): ReportQuery {
  return { id, payload: { query: { kind: "HogQLQuery", query } } };
}

function assertRange(range: number): asserts range is RangeDays {
  if (range !== 7 && range !== 30 && range !== 90) throw new PostHogDataError("Unsupported report range");
}

function emptyKpis(): Record<"visitors" | "sessions" | "activeTime" | "bounceRate" | "resumeViews", MetricValue> {
  const empty = () => ({ value: null, previous: null, deltaPercent: null });
  return { visitors: empty(), sessions: empty(), activeTime: empty(), bounceRate: empty(), resumeViews: empty() };
}

function metric(value: number | null, previous: number | null): MetricValue {
  return { value, previous, deltaPercent: value === null || previous === null || previous === 0 ? null : round(((value - previous) / previous) * 100) };
}

function optionalNumber(value: unknown): number | null {
  return value === null ? null : requiredNumber(value);
}

function requiredNumber(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new PostHogDataError("Expected finite aggregate value");
  return value;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
