import { createAdminAnalyticsHandler } from "../_shared/admin_analytics.ts";
import type { AdminAnalyticsResponse } from "../_shared/admin_types.ts";
import type { ReportQuery } from "../_shared/posthog.ts";

const origin = "https://shivamkanodia.com";
const now = new Date("2026-08-15T12:00:00.000Z");

Deno.test("analytics rejects unauthorized requests before report fetching", async () => {
  let fetches = 0;
  const handler = createHandler({
    verifyToken: async () => false,
    fetchReport: async () => {
      fetches += 1;
      return [];
    },
  });

  const response = await handler(request("30"));

  assert(response.status === 401);
  assert(fetches === 0);
});

Deno.test("analytics rejects unsupported ranges without report fetching", async () => {
  let fetches = 0;
  const handler = createHandler({
    fetchReport: async () => {
      fetches += 1;
      return [];
    },
  });

  const response = await handler(request("14"));

  assert(response.status === 400);
  assert(fetches === 0);
});

Deno.test("analytics returns the stable private aggregate response contract", async () => {
  const handler = createHandler({ fetchReport: async (report) => fixture(report.id) });

  const response = await handler(request("30"));
  const body = await response.json() as AdminAnalyticsResponse;

  assert(response.status === 200);
  assert(response.headers.get("cache-control") === "private, max-age=60");
  assert(body.generatedAt === now.toISOString());
  assert(body.rangeDays === 30);
  assert(body.coverage.partial === false);
  assert(body.kpis.visitors.value === 10);
  assert(body.sections[0].sessions === 8);
  assert(!("visitors" in body.sections[0]));
  assert(body.sections[0].share === 40);
  assert(body.audience.countries[0].label === "United States");
  assert(body.funnel.map((stage) => stage.sessions).join(",") === "10,8,6,4");
  assert(body.funnel.every((stage) => !("visitors" in stage)));
  assert(!/distinct_id|person_id|session_id/.test(JSON.stringify(body)));
});

Deno.test("analytics preserves successful modules when one report fails", async () => {
  const handler = createHandler({
    fetchReport: async (report) => {
      if (report.id === "actions") throw new Error("upstream unavailable");
      return fixture(report.id);
    },
  });

  const response = await handler(request("7"));
  const body = await response.json() as AdminAnalyticsResponse;

  assert(response.status === 200);
  assert(body.coverage.partial);
  assert(body.actions.length === 0);
  assert(body.trend.length === 1);
});

Deno.test("analytics maps complete upstream failure to a controlled error", async () => {
  const handler = createHandler({ fetchReport: async () => { throw new Error("upstream unavailable"); } });

  const response = await handler(request("90"));
  const body = await response.json() as { error: string };

  assert(response.status === 502);
  assert(body.error === "Unable to load reports");
});

Deno.test("analytics aborts timed-out reports and returns a controlled error", async () => {
  let aborted = 0;
  const handler = createHandler({
    timeoutMilliseconds: 1,
    fetchReport: (_report, signal) => new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => {
        aborted += 1;
        reject(new DOMException("Aborted", "AbortError"));
      }, { once: true });
    }),
  });

  const response = await handler(request("7"));

  assert(response.status === 502);
  assert(aborted === 7);
});

function createHandler(overrides: Partial<Parameters<typeof createAdminAnalyticsHandler>[0]> = {}) {
  return createAdminAnalyticsHandler({
    corsConfig: { allowedOrigins: [origin] },
    now: () => now,
    verifyToken: async () => true,
    fetchReport: async (report) => fixture(report.id),
    posthogLinks: () => ({ sessions: null, heatmaps: null, paths: null, events: null }),
    timeoutMilliseconds: 100,
    ...overrides,
  });
}

function request(range: string): Request {
  return new Request(`https://example.supabase.co/functions/v1/admin-analytics?range=${range}`, {
    method: "GET",
    headers: { origin, authorization: "Bearer header.payload.signature" },
  });
}

function fixture(id: ReportQuery["id"]): unknown[] {
  switch (id) {
    case "kpis": return [[100, 80, 10, 8, 12, 9, 300, 240, 25, 30, 5, 4]];
    case "trend": return [["2026-08-15", 10, 12, 5]];
    case "sections": return [["Work", 8, 20, 40]];
    case "actions": return [["Resume: hero", 5, 10, 50]];
    case "acquisition": return [["Direct", 10, 10, 100]];
    case "audience": return [["country", "United States", 8, 10, 80]];
    case "funnel": return [["Visit", 10, 100], ["Work view", 8, 80], ["Portfolio action", 6, 60], ["Resume action", 4, 40]];
  }
}

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}
