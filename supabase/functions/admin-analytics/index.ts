import { verifyAdminToken } from "../_shared/auth.ts";
import { corsHeaders, isAllowedOrigin, runtimeCorsConfig, type CorsConfig } from "../_shared/cors.ts";
import {
  buildReportQueries,
  createPostHogLinks,
  normalizeAudience,
  normalizeKpis,
  normalizeRankedValues,
  normalizeTrendPoints,
  parseRange,
  type PostHogLinks,
  type RangeDays,
  type ReportQuery,
} from "../_shared/posthog.ts";

type AnalyticsResponse = {
  generatedAt: string;
  rangeDays: RangeDays;
  coverage: { requestedFrom: string; availableFrom: string | null; partial: boolean };
  kpis: ReturnType<typeof normalizeKpis>;
  trend: ReturnType<typeof normalizeTrendPoints>;
  sections: ReturnType<typeof normalizeRankedValues>;
  actions: ReturnType<typeof normalizeRankedValues>;
  acquisition: ReturnType<typeof normalizeRankedValues>;
  audience: ReturnType<typeof normalizeAudience>;
  funnel: ReturnType<typeof normalizeRankedValues>;
  posthogLinks: PostHogLinks;
};

type AnalyticsDependencies = {
  corsConfig: CorsConfig;
  now: () => Date;
  verifyToken: (token: string, now: Date) => Promise<boolean>;
  fetchReport: (report: ReportQuery) => Promise<unknown>;
  posthogLinks: () => PostHogLinks;
};

const reportTimeoutMilliseconds = 8_000;

Deno.serve((request) => createAdminAnalyticsHandler(runtimeDependencies())(request));

export function createAdminAnalyticsHandler(dependencies: AnalyticsDependencies) {
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
    if (!token || !(await dependencies.verifyToken(token, dependencies.now()))) {
      return json({ error: "Unauthorized" }, 401, headers);
    }

    let range: RangeDays;
    try {
      range = parseRange(new URL(request.url).searchParams.get("range"));
    } catch {
      return json({ error: "Invalid request" }, 400, headers);
    }

    try {
      const now = dependencies.now();
      const response = await fetchAnalytics(range, now, dependencies);
      return json(response, 200, headers);
    } catch {
      return json({ error: "Unable to load reports" }, 502, headers);
    }
  };
}

async function fetchAnalytics(range: RangeDays, now: Date, dependencies: AnalyticsDependencies): Promise<AnalyticsResponse> {
  const reports = buildReportQueries(range);
  const settled = await Promise.all(reports.map(async (report) => {
    try {
      return { id: report.id, rows: await dependencies.fetchReport(report), failed: false };
    } catch {
      return { id: report.id, rows: undefined, failed: true };
    }
  }));
  const byId = new Map(settled.map((report) => [report.id, report]));
  let partial = settled.some((report) => report.failed);
  const normalized = <Value>(id: ReportQuery["id"], fallback: Value, normalizer: (rows: unknown) => Value): Value => {
    const result = byId.get(id);
    if (!result || result.failed) return fallback;
    try {
      return normalizer(result.rows);
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
  const funnel = normalized("funnel", [], normalizeRankedValues);

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

function runtimeDependencies(): AnalyticsDependencies {
  const config = runtimePostHogConfig();
  return {
    corsConfig: runtimeCorsConfig(),
    now: () => new Date(),
    verifyToken: verifyAdminToken,
    fetchReport: (report) => fetchPostHogReport(config, report),
    posthogLinks: () => createPostHogLinks(Deno.env.get("POSTHOG_PROJECT_URL")),
  };
}

type PostHogConfig = { apiHost: string; apiKey: string; projectId: string };

function runtimePostHogConfig(): PostHogConfig {
  const apiHost = requiredSecret("POSTHOG_API_HOST");
  const apiKey = requiredSecret("POSTHOG_PERSONAL_API_KEY");
  const projectId = requiredSecret("POSTHOG_PROJECT_ID");
  const parsed = new URL(apiHost);
  if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.pathname !== "/" || parsed.search || parsed.hash || !/^\d+$/.test(projectId)) {
    throw new TypeError("Invalid PostHog configuration");
  }
  return { apiHost: parsed.origin, apiKey, projectId };
}

async function fetchPostHogReport(config: PostHogConfig, report: ReportQuery): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), reportTimeoutMilliseconds);
  try {
    const response = await fetch(`${config.apiHost}/api/projects/${config.projectId}/query/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report.payload),
      signal: controller.signal,
    });
    if (!response.ok) throw new TypeError("PostHog report request failed");
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !("results" in body)) throw new TypeError("Invalid PostHog response");
    return (body as { results: unknown }).results;
  } finally {
    clearTimeout(timeout);
  }
}

function bearerToken(value: string | null): string | null {
  const match = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/.exec(value ?? "");
  return match?.[1] ?? null;
}

function requiredSecret(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new TypeError(`Missing ${name}`);
  return value;
}

function json(body: AnalyticsResponse | { error: string }, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}
