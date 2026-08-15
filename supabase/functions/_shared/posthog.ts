import type { FunnelStage, MetricValue, PostHogLinks, RangeDays, RankedValue, SectionValue, TrendPoint } from "./admin_types.ts";
export type { FunnelStage, MetricValue, PostHogLinks, RangeDays, RankedValue, SectionValue, TrendPoint } from "./admin_types.ts";

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
      countIf(${current}) AS current_events, countIf(${previous}) AS previous_events,
      uniqIf(distinct_id, ${current}) AS current_visitors, uniqIf(distinct_id, ${previous}) AS previous_visitors,
      uniqIf(properties.$session_id, ${current}) AS current_sessions, uniqIf(properties.$session_id, ${previous}) AS previous_sessions,
      sumIf(toFloat(properties.active_milliseconds), event = 'section_engaged' AND ${current}) / 1000 AS current_active_time,
      sumIf(toFloat(properties.active_milliseconds), event = 'section_engaged' AND ${previous}) / 1000 AS previous_active_time,
      countIf(properties.$is_bounce = 'true' AND ${current}) * 100 / nullIf(uniqIf(properties.$session_id, ${current}), 0) AS current_bounce_rate,
      countIf(properties.$is_bounce = 'true' AND ${previous}) * 100 / nullIf(uniqIf(properties.$session_id, ${previous}), 0) AS previous_bounce_rate,
      countIf(event = 'resume_viewed' AND ${current}) AS current_resume_views,
      countIf(event = 'resume_viewed' AND ${previous}) AS previous_resume_views
      FROM events WHERE ${current} OR ${previous}`),
    report("trend", `SELECT toString(toDate(timestamp)) AS date, uniq(distinct_id) AS visitors,
      uniq(properties.$session_id) AS sessions, countIf(event = 'resume_viewed') AS resume_views
      FROM events WHERE ${current} GROUP BY date ORDER BY date`),
    report("sections", `WITH session_totals AS (
        SELECT uniq(properties.$session_id) AS total FROM events WHERE ${current} AND notEmpty(properties.$session_id)
      )
      SELECT concat(properties.section_label, ' [', properties.section_id, ']') AS label,
        uniq(properties.$session_id) AS sessions, totals.total AS total,
        if(totals.total = 0, 0, uniq(properties.$session_id) * 100 / totals.total) AS share
      FROM events CROSS JOIN session_totals AS totals
      WHERE event = 'section_viewed' AND ${current} AND notEmpty(properties.$session_id)
        AND notEmpty(properties.section_id) AND notEmpty(properties.section_label)
      GROUP BY label, totals.total ORDER BY sessions DESC LIMIT 20`),
    report("actions", `WITH visitor_totals AS (
        SELECT uniq(distinct_id) AS total FROM events WHERE ${current}
      )
      SELECT CASE event
          WHEN 'element_clicked' THEN concat('Click: ', coalesce(nullIf(properties.label, ''), 'Unknown'))
          WHEN 'project_opened' THEN concat('Project: ', coalesce(nullIf(properties.project_name, ''), 'Unknown'))
          WHEN 'resume_viewed' THEN concat('Resume: ', coalesce(nullIf(properties.placement, ''), 'Unknown'))
          WHEN 'external_link_clicked' THEN 'External link'
          WHEN 'contact_clicked' THEN concat('Contact: ', coalesce(nullIf(properties.channel, ''), 'Unknown'))
        END AS label,
        uniq(distinct_id) AS visitors, totals.total AS total,
        if(totals.total = 0, 0, uniq(distinct_id) * 100 / totals.total) AS share
      FROM events CROSS JOIN visitor_totals AS totals
      WHERE event IN ('element_clicked', 'project_opened', 'resume_viewed', 'external_link_clicked', 'contact_clicked') AND ${current}
      GROUP BY label, totals.total ORDER BY visitors DESC LIMIT 20`),
    report("acquisition", `WITH pageview_totals AS (
        SELECT uniq(distinct_id) AS total FROM events WHERE event = '$pageview' AND ${current}
      )
      SELECT coalesce(nullIf(properties.$referring_domain, ''), nullIf(properties.utm_source, ''), 'Direct') AS label,
        uniq(distinct_id) AS visitors, totals.total AS total,
        if(totals.total = 0, 0, uniq(distinct_id) * 100 / totals.total) AS share
      FROM events CROSS JOIN pageview_totals AS totals WHERE event = '$pageview' AND ${current}
      GROUP BY label, totals.total ORDER BY visitors DESC LIMIT 20`),
    report("audience", `WITH pageview_totals AS (
        SELECT uniq(distinct_id) AS total FROM events WHERE event = '$pageview' AND ${current}
      )
      SELECT 'country' AS audience_group, coalesce(nullIf(properties.$geoip_country_name, ''), 'Unknown') AS label,
        uniq(distinct_id) AS visitors, totals.total AS total,
        if(totals.total = 0, 0, uniq(distinct_id) * 100 / totals.total) AS share
      FROM events CROSS JOIN pageview_totals AS totals WHERE event = '$pageview' AND ${current} GROUP BY label, totals.total
      UNION ALL SELECT 'device' AS audience_group, coalesce(nullIf(properties.$device_type, ''), 'Unknown') AS label,
        uniq(distinct_id) AS visitors, totals.total AS total,
        if(totals.total = 0, 0, uniq(distinct_id) * 100 / totals.total) AS share
      FROM events CROSS JOIN pageview_totals AS totals WHERE event = '$pageview' AND ${current} GROUP BY label, totals.total
      UNION ALL SELECT 'browser' AS audience_group, coalesce(nullIf(properties.$browser, ''), 'Unknown') AS label,
        uniq(distinct_id) AS visitors, totals.total AS total,
        if(totals.total = 0, 0, uniq(distinct_id) * 100 / totals.total) AS share
      FROM events CROSS JOIN pageview_totals AS totals WHERE event = '$pageview' AND ${current} GROUP BY label, totals.total`),
    report("funnel", `WITH visits AS (
        SELECT properties.$session_id AS session_id, min(timestamp) AS visit_at
        FROM events WHERE event = '$pageview' AND ${current} AND notEmpty(properties.$session_id) GROUP BY session_id
      ), work_stages AS (
        SELECT v.session_id AS session_id, v.visit_at AS visit_at, min(e.timestamp) AS work_at
        FROM visits AS v INNER JOIN events AS e ON e.properties.$session_id = v.session_id
        WHERE e.event = 'section_viewed' AND e.properties.section_id = 'work' AND ${current.replaceAll("timestamp", "e.timestamp")}
          AND e.timestamp >= v.visit_at GROUP BY v.session_id, v.visit_at
      ), action_stages AS (
        SELECT w.session_id AS session_id, w.visit_at AS visit_at, w.work_at AS work_at, min(e.timestamp) AS action_at
        FROM work_stages AS w INNER JOIN events AS e ON e.properties.$session_id = w.session_id
        WHERE e.event IN ('element_clicked', 'project_opened', 'external_link_clicked', 'contact_clicked')
          AND ${current.replaceAll("timestamp", "e.timestamp")} AND e.timestamp >= w.work_at
        GROUP BY w.session_id, w.visit_at, w.work_at
      ), resume_stages AS (
        SELECT a.session_id AS session_id, min(e.timestamp) AS resume_at
        FROM action_stages AS a INNER JOIN events AS e ON e.properties.$session_id = a.session_id
        WHERE e.event = 'resume_viewed' AND ${current.replaceAll("timestamp", "e.timestamp")}
          AND e.timestamp >= a.action_at GROUP BY a.session_id
      ), stage_counts AS (
        SELECT (SELECT count() FROM visits) AS starting_sessions,
          (SELECT count() FROM work_stages) AS work_sessions,
          (SELECT count() FROM action_stages) AS action_sessions,
          (SELECT count() FROM resume_stages) AS resume_sessions
      )
      SELECT label, sessions, share FROM (
        SELECT 1 AS stage_order, 'Visit' AS label, starting_sessions AS sessions,
          if(starting_sessions = 0, 0, 100) AS share FROM stage_counts
        UNION ALL SELECT 2 AS stage_order, 'Work view' AS label, work_sessions AS sessions,
          if(starting_sessions = 0, 0, work_sessions * 100 / starting_sessions) AS share FROM stage_counts
        UNION ALL SELECT 3 AS stage_order, 'Portfolio action' AS label, action_sessions AS sessions,
          if(starting_sessions = 0, 0, action_sessions * 100 / starting_sessions) AS share FROM stage_counts
        UNION ALL SELECT 4 AS stage_order, 'Resume action' AS label, resume_sessions AS sessions,
          if(starting_sessions = 0, 0, resume_sessions * 100 / starting_sessions) AS share FROM stage_counts
      ) ORDER BY stage_order`),
  ];
}

export function normalizeKpis(rows: unknown): Record<"visitors" | "sessions" | "activeTime" | "bounceRate" | "resumeViews", MetricValue> {
  if (!Array.isArray(rows) || rows.length === 0) return emptyKpis();
  const row = rows[0];
  if (!Array.isArray(row) || row.length !== 12) throw new PostHogDataError("Malformed KPI report");
  const currentEvidence = requiredNumber(row[0]);
  const previousEvidence = requiredNumber(row[1]);
  const values = row.slice(2).map(optionalNumber);
  return {
    visitors: metricWithEvidence(values[0], values[1], currentEvidence, previousEvidence),
    sessions: metricWithEvidence(values[2], values[3], currentEvidence, previousEvidence),
    activeTime: metricWithEvidence(values[4], values[5], currentEvidence, previousEvidence),
    bounceRate: metricWithEvidence(values[6], values[7], currentEvidence, previousEvidence),
    resumeViews: metricWithEvidence(values[8], values[9], currentEvidence, previousEvidence),
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
    if (!Array.isArray(row) || row.length !== 4 || typeof row[0] !== "string" || !row[0].trim()) {
      throw new PostHogDataError("Malformed ranked row");
    }
    const visitors = requiredNumber(row[1]);
    const total = requiredNumber(row[2]);
    const share = requiredNumber(row[3]);
    if (visitors < 0 || total < 0 || visitors > total || share < 0 || share > 100) throw new PostHogDataError("Invalid ranked aggregate");
    return { label: row[0], visitors, total, share };
  });
}

export function normalizeSectionValues(rows: unknown): SectionValue[] {
  if (!Array.isArray(rows)) throw new PostHogDataError("Malformed section report");
  return rows.map((row) => {
    if (!Array.isArray(row) || row.length !== 4 || typeof row[0] !== "string" || !row[0].trim()) {
      throw new PostHogDataError("Malformed section row");
    }
    const sessions = requiredNumber(row[1]);
    const total = requiredNumber(row[2]);
    const share = requiredNumber(row[3]);
    if (sessions < 0 || total < 0 || sessions > total || share < 0 || share > 100) {
      throw new PostHogDataError("Invalid section aggregate");
    }
    return { label: row[0], sessions, total, share };
  });
}

export function normalizeFunnel(rows: unknown): FunnelStage[] {
  if (!Array.isArray(rows)) throw new PostHogDataError("Malformed funnel report");
  if (rows.length === 0) return [];
  const result = rows.map((row) => {
    if (!Array.isArray(row) || row.length !== 3 || typeof row[0] !== "string" || !row[0].trim()) {
      throw new PostHogDataError("Malformed funnel row");
    }
    const sessions = requiredNumber(row[1]);
    const share = requiredNumber(row[2]);
    if (sessions < 0 || share < 0 || share > 100) throw new PostHogDataError("Invalid funnel aggregate");
    return { label: row[0], sessions, share };
  });
  const labels = ["Visit", "Work view", "Portfolio action", "Resume action"];
  if (result.length !== labels.length) throw new PostHogDataError("Malformed funnel report");
  for (let index = 0; index < result.length; index += 1) {
    if (result[index].label !== labels[index] || (index > 0 && result[index].sessions > result[index - 1].sessions)) {
      throw new PostHogDataError("Invalid funnel ordering");
    }
  }
  if (result[0].sessions === 0) return [];
  return result;
}

export function normalizeAudience(rows: unknown): { countries: RankedValue[]; devices: RankedValue[]; browsers: RankedValue[] } {
  if (!Array.isArray(rows)) throw new PostHogDataError("Malformed audience report");
  const groups = { countries: [] as RankedValue[], devices: [] as RankedValue[], browsers: [] as RankedValue[] };
  for (const row of rows) {
    if (!Array.isArray(row) || row.length !== 5 || typeof row[0] !== "string") throw new PostHogDataError("Malformed audience row");
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

function metricWithEvidence(
  value: number | null,
  previous: number | null,
  currentEvidence: number,
  previousEvidence: number,
): MetricValue {
  return metric(currentEvidence === 0 ? null : value, previousEvidence === 0 ? null : previous);
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
