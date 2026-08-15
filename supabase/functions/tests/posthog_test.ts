import {
  PostHogDataError,
  buildReportQueries,
  createPostHogLinks,
  normalizeKpis,
  normalizeRankedValues,
  parseRange,
} from "../_shared/posthog.ts";

Deno.test("parseRange accepts only supported report windows", () => {
  assert(parseRange("7") === 7);
  assert(parseRange("30") === 30);
  assert(parseRange("90") === 90);

  for (const value of [null, "", "07", "14", "91", "7.0", "seven"]) {
    assertThrows(() => parseRange(value));
  }
});

Deno.test("normalizeKpis preserves absent report data instead of inventing zeroes", () => {
  const result = normalizeKpis([]);

  assert(result.visitors.value === null);
  assert(result.sessions.previous === null);
  assert(result.activeTime.deltaPercent === null);
  assert(result.bounceRate.value === null);
  assert(result.resumeViews.value === null);
});

Deno.test("normalizeKpis rejects malformed PostHog aggregate rows", () => {
  assertThrows(
    () => normalizeKpis([["not-a-number", 4, 10, 5, 3, 2, 1, 1, 1, 1]]),
    PostHogDataError,
  );
});

Deno.test("normalizeRankedValues returns an empty collection for absent report data", () => {
  const result = normalizeRankedValues([]);

  assert(Array.isArray(result));
  assert(result.length === 0);
});

Deno.test("normalizeRankedValues rejects rows that could not have come from an aggregate", () => {
  assertThrows(
    () => normalizeRankedValues([["Work", "8", 12]]),
    PostHogDataError,
  );
});

Deno.test("report query builders are fixed, aggregate-only, and range-bound", () => {
  const reports = buildReportQueries(30);

  assert(reports.length === 7);
  assert(reports.every((report) => report.payload.query.kind === "HogQLQuery"));
  assert(reports.every((report) => report.payload.query.query.includes("INTERVAL 30 DAY")));
  assert(reports.every((report) => /\buniq(?:If)?\(/.test(report.payload.query.query)));
  assert(reports.every((report) => !/\bSELECT\s+distinct_id\b/i.test(report.payload.query.query)));
});

Deno.test("PostHog links remain under the configured project URL", () => {
  const links = createPostHogLinks("https://us.posthog.com/project/12345");

  assert(links.sessions === "https://us.posthog.com/project/12345/replay");
  assert(links.heatmaps === "https://us.posthog.com/project/12345/heatmaps");
  assert(links.paths === "https://us.posthog.com/project/12345/insights/new?insight=PATHS");
  assert(links.events === "https://us.posthog.com/project/12345/events");
});

Deno.test("PostHog links reject an unscoped project URL", () => {
  assertThrows(() => createPostHogLinks("https://us.posthog.com/"));
  assertThrows(() => createPostHogLinks("https://us.posthog.com/project/12345?next=https://evil.example"));
});

function assert(condition: unknown, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}

function assertThrows(operation: () => unknown, expected?: new (message: string) => Error): void {
  try {
    operation();
  } catch (error) {
    if (!expected || error instanceof expected) return;
    const received = error instanceof Error ? error.constructor.name : typeof error;
    throw new Error(`Expected ${expected.name}, received ${received}`);
  }
  throw new Error("expected operation to throw");
}
