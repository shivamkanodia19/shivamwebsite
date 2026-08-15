import {
  PostHogDataError,
  buildReportQueries,
  createPostHogLinks,
  normalizeFunnel,
  normalizeKpis,
  normalizeRankedValues,
  normalizeSectionValues,
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

Deno.test("normalizeKpis treats zero event evidence as unavailable data", () => {
  const result = normalizeKpis([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

  for (const metric of Object.values(result)) {
    assert(metric.value === null);
    assert(metric.previous === null);
    assert(metric.deltaPercent === null);
  }
});

Deno.test("normalizeKpis rejects malformed PostHog aggregate rows", () => {
  assertThrows(
    () => normalizeKpis([[1, 1, "not-a-number", 4, 10, 5, 3, 2, 1, 1, 1, 1]]),
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
    () => normalizeRankedValues([["Work", "8", 12, 66.67]]),
    PostHogDataError,
  );
});

Deno.test("normalizeRankedValues preserves the report-defined denominator and share", () => {
  const [action] = normalizeRankedValues([["Resume: hero", 8, 20, 40]]);

  assert(action.visitors === 8);
  assert(action.total === 20);
  assert(action.share === 40);
});

Deno.test("normalizeSectionValues exposes session reach without a visitors field", () => {
  const [section] = normalizeSectionValues([["Work", 8, 20, 40]]);

  assert(section.sessions === 8);
  assert(section.total === 20);
  assert(section.share === 40);
  assert(!("visitors" in section));
});

Deno.test("normalizeFunnel rejects non-monotonic stage counts", () => {
  assertThrows(() => normalizeFunnel([
    ["Visit", 10, 100],
    ["Work view", 11, 100],
    ["Portfolio action", 6, 60],
    ["Resume action", 4, 40],
  ]), PostHogDataError);
});

Deno.test("normalizeFunnel returns no stages when the starting session count is zero", () => {
  const result = normalizeFunnel([
    ["Visit", 0, 0],
    ["Work view", 0, 0],
    ["Portfolio action", 0, 0],
    ["Resume action", 0, 0],
  ]);

  assert(result.length === 0);
});

Deno.test("normalizeFunnel returns no stages when the report is absent", () => {
  assert(normalizeFunnel([]).length === 0);
});

Deno.test("report query builders are fixed, aggregate-only, and range-bound", () => {
  const reports = buildReportQueries(30);

  assert(reports.length === 7);
  assert(reports.every((report) => report.payload.query.kind === "HogQLQuery"));
  assert(reports.every((report) => report.payload.query.query.includes("INTERVAL 30 DAY")));
  assert(reports.every((report) => /\b(?:uniq|count|sum|min)(?:If)?\(/.test(report.payload.query.query)));
  assert(reports.every((report) => !/\bSELECT\s+distinct_id\b/i.test(report.payload.query.query)));
});

Deno.test("report queries alias aggregates and never order by an undefined alias", () => {
  const reports = new Map(buildReportQueries(7).map((report) => [report.id, report.payload.query.query]));

  assert(reports.get("trend")?.includes("AS visitors"));
  assert(reports.get("sections")?.includes("AS sessions"));
  assert(reports.get("actions")?.includes("AS label"));
  assert(reports.get("acquisition")?.includes("AS share"));
  assert(reports.get("audience")?.includes("AS audience_group"));
  assert(reports.get("funnel")?.includes("AS stage_order"));
});

Deno.test("sections and actions use controlled, non-null dimensions", () => {
  const reports = new Map(buildReportQueries(7).map((report) => [report.id, report.payload.query.query]));
  const sections = reports.get("sections") ?? "";
  const actions = reports.get("actions") ?? "";

  assert(sections.includes("event = 'section_viewed'"));
  assert(!sections.includes("section_engaged"));
  assert(sections.includes("properties.section_id"));
  assert(sections.includes("properties.section_label"));
  assert(actions.includes("CASE event"));
  for (const event of ["element_clicked", "project_opened", "resume_viewed", "external_link_clicked", "contact_clicked"]) {
    assert(actions.includes(`WHEN '${event}'`));
  }
});

Deno.test("funnel counts ordered stages within the same anonymous session", () => {
  const funnel = buildReportQueries(30).find((report) => report.id === "funnel")?.payload.query.query ?? "";

  assert(funnel.includes("properties.$session_id AS session_id"));
  assert(funnel.includes("GROUP BY session_id"));
  assert(funnel.includes("e.timestamp >= v.visit_at"));
  assert(funnel.includes("e.timestamp >= w.work_at"));
  assert(funnel.includes("e.timestamp >= a.action_at"));
  assert(funnel.includes("starting_sessions AS sessions"));
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
