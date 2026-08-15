import { corsHeaders, isAllowedOrigin, type CorsConfig } from "./cors.ts";
import type { AdminAnalyticsResponse, PostHogLinks, RangeDays } from "./admin_types.ts";
import {
  buildReportQueries,
  normalizeAudience,
  normalizeFunnel,
  normalizeKpis,
  normalizeRankedValues,
  normalizeTrendPoints,
  parseRange,
  type ReportQuery,
} from "./posthog.ts";

export type AdminAnalyticsDependencies = {
  corsConfig: CorsConfig;
  now: () => Date;
  verifyToken: (token: string, now: Date) => Promise<boolean>;
  fetchReport: (report: ReportQuery, signal: AbortSignal) => Promise<unknown>;
  posthogLinks: () => PostHogLinks;
  timeoutMilliseconds: number;
};

export function createAdminAnalyticsHandler(dependencies: AdminAnalyticsDependencies) {
  return async (request: Request): Promise<Response> => {
    const origin = request.headers.get("origin");
    const headers = {
      ...corsHeaders(origin, dependencies.corsConfig),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "private, max-age=60",
    };
    if (!isAllowedOrigin(origin, dependencies.corsConfig)) return json({ error: "Invalid request" }, 403, headers);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "GET") return json({ error: "Invalid request" }, 405, headers);

    const token = bearerToken(request.headers.get("authorization"));
    const now = dependencies.now();
    if (!token || !(await dependencies.verifyToken(token, now))) {
      return json({ error: "Unauthorized" }, 401, headers);
    }

    let range: RangeDays;
    try {
      range = parseRange(new URL(request.url).searchParams.get("range"));
    } catch {
      return json({ error: "Invalid request" }, 400, headers);
    }

    try {
      return json(await fetchAnalytics(range, now, dependencies), 200, headers);
    } catch {
      return json({ error: "Unable to load reports" }, 502, headers);
    }
  };
}

async function fetchAnalytics(
  range: RangeDays,
  now: Date,
  dependencies: AdminAnalyticsDependencies,
): Promise<AdminAnalyticsResponse> {
  const reports = buildReportQueries(range);
  const settled = await Promise.all(reports.map(async (report) => {
    try {
      return { id: report.id, rows: await fetchWithTimeout(report, dependencies), failed: false };
    } catch {
      return { id: report.id, rows: undefined, failed: true };
    }
  }));
  const byId = new Map(settled.map((report) => [report.id, report]));
  let partial = settled.some((report) => report.failed);
  let usableReports = 0;
  const normalized = <Value>(id: ReportQuery["id"], fallback: Value, normalizer: (rows: unknown) => Value): Value => {
    const result = byId.get(id);
    if (!result || result.failed) return fallback;
    try {
      const value = normalizer(result.rows);
      usableReports += 1;
      return value;
    } catch {
      partial = true;
      return fallback;
    }
  };

  const kpis = normalized("kpis", normalizeKpis([]), normalizeKpis);
  const trend = normalized("trend", [], normalizeTrendPoints);
  const sections = normalized("sections", [], normalizeRankedValues);
  const actions = normalized("actions", [], normalizeRankedValues);
  const acquisition = normalized("acquisition", [], normalizeRankedValues);
  const audience = normalized("audience", { countries: [], devices: [], browsers: [] }, normalizeAudience);
  const funnel = normalized("funnel", [], normalizeFunnel);
  if (usableReports === 0) throw new Error("No analytics reports available");

  return {
    generatedAt: now.toISOString(),
    rangeDays: range,
    coverage: {
      requestedFrom: new Date(now.getTime() - range * 24 * 60 * 60 * 1_000).toISOString().slice(0, 10),
      availableFrom: trend[0]?.date ?? null,
      partial,
    },
    kpis,
    trend,
    sections,
    actions,
    acquisition,
    audience,
    funnel,
    posthogLinks: dependencies.posthogLinks(),
  };
}

async function fetchWithTimeout(report: ReportQuery, dependencies: AdminAnalyticsDependencies): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), dependencies.timeoutMilliseconds);
  try {
    return await dependencies.fetchReport(report, controller.signal);
  } finally {
    clearTimeout(timeout);
  }
}

function bearerToken(value: string | null): string | null {
  const match = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/.exec(value ?? "");
  return match?.[1] ?? null;
}

function json(body: AdminAnalyticsResponse | { error: string }, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}
