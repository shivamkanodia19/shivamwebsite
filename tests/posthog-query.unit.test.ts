import { describe, expect, it } from "vitest";
import {
  PostHogDataError,
  buildReportQueries,
  normalizeAudience,
  normalizeKpis,
} from "../supabase/functions/_shared/posthog.ts";

describe("PostHog aggregate semantics", () => {
  it("counts bounce and resume conversion once per distinct session", () => {
    const kpis = buildReportQueries(30).find((report) => report.id === "kpis")?.payload.query.query ?? "";

    expect(kpis).toContain("GROUP BY session_id");
    expect(kpis).toContain("has_meaningful_engagement");
    expect(kpis).toContain("has_resume_conversion");
    expect(kpis).not.toContain("properties.$is_bounce");
    expect(kpis).not.toMatch(/countIf\(event = 'resume_viewed'/);
  });

  it("rejects KPI aggregates whose session rates could exceed one hundred percent", () => {
    expect(() => normalizeKpis([[10, 10, 5, 5, 2, 2, 60, 60, 101, 20, 2, 2]])).toThrow(PostHogDataError);
    expect(() => normalizeKpis([[10, 10, 5, 5, 2, 2, 60, 60, 20, 20, 3, 2]])).toThrow(PostHogDataError);
  });

  it("orders audience groups and rows deterministically", () => {
    const audienceQuery = buildReportQueries(7).find((report) => report.id === "audience")?.payload.query.query ?? "";
    expect(audienceQuery).toMatch(/ORDER BY[^;]*audience_group[^;]*visitors DESC[^;]*label/);

    expect(normalizeAudience([
      ["country", "Zimbabwe", 1, 10, 10],
      ["country", "Australia", 3, 10, 30],
    ]).countries.map(({ label }) => label)).toEqual(["Australia", "Zimbabwe"]);
  });

  it("builds action labels without HogQL's incompatible CASE transform", () => {
    const actions = buildReportQueries(7).find((report) => report.id === "actions")?.payload.query.query ?? "";

    expect(actions).not.toContain("CASE event");
    expect(actions.match(/UNION ALL/g)).toHaveLength(3);
    expect(actions).toContain("event = 'element_clicked'");
    expect(actions).toContain("event = 'contact_clicked'");
  });
});
