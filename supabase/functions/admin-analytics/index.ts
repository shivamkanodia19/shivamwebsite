import { createAdminAnalyticsHandler, parseReportStartDates, type AdminAnalyticsDependencies } from "../_shared/admin_analytics.ts";
import { verifyAdminToken } from "../_shared/auth.ts";
import { runtimeCorsConfig } from "../_shared/cors.ts";
import { createPostHogLinks, type ReportQuery } from "../_shared/posthog.ts";

const reportTimeoutMilliseconds = 8_000;

Deno.serve(createAdminAnalyticsHandler(runtimeDependencies()));

function runtimeDependencies(): AdminAnalyticsDependencies {
  const config = runtimePostHogConfig();
  return {
    corsConfig: runtimeCorsConfig(),
    now: () => new Date(),
    verifyToken: verifyAdminToken,
    fetchReport: (report, signal) => fetchPostHogReport(config, report, signal),
    posthogLinks: () => createPostHogLinks(Deno.env.get("POSTHOG_PROJECT_URL")),
    reportStartDates: parseReportStartDates(requiredSecret("ANALYTICS_REPORT_START_DATES")),
    timeoutMilliseconds: reportTimeoutMilliseconds,
  };
}

type PostHogConfig = { apiHost: string; apiKey: string; projectId: string };
type RequiredSecretName = "POSTHOG_API_HOST" | "POSTHOG_PERSONAL_API_KEY" | "POSTHOG_PROJECT_ID" | "ANALYTICS_REPORT_START_DATES";

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

async function fetchPostHogReport(
  config: PostHogConfig,
  report: ReportQuery,
  signal: AbortSignal,
): Promise<unknown> {
  const response = await fetch(`${config.apiHost}/api/projects/${config.projectId}/query/`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report.payload),
    signal,
  });
  if (!response.ok) throw new TypeError("PostHog report request failed");
  const body: unknown = await response.json();
  if (!body || typeof body !== "object" || !("results" in body)) throw new TypeError("Invalid PostHog response");
  return (body as { results: unknown }).results;
}

function requiredSecret(name: RequiredSecretName): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new TypeError(`Missing ${name}`);
  return value;
}
