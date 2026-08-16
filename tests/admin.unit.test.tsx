import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { clearSessionToken, fetchAnalytics, getSessionToken, login } from "../src/admin/api";
import type { AdminAnalyticsResponse } from "../src/admin/types";
import { corsHeaders } from "../supabase/functions/_shared/cors.ts";

const posthogMock = vi.hoisted(() => ({
  init: vi.fn(),
  startSessionRecording: vi.fn(),
  stopSessionRecording: vi.fn(),
  capture: vi.fn(),
}));

vi.mock("posthog-js", () => ({ default: posthogMock }));

const report: AdminAnalyticsResponse = {
  generatedAt: "2026-08-15T12:00:00.000Z",
  rangeDays: 7 as const,
  coverage: { requestedFrom: "2026-08-08", availableFrom: "2026-08-08", partial: false },
  kpis: {
    visitors: { value: 12, previous: 9, deltaPercent: 33.3 },
    sessions: { value: 15, previous: 10, deltaPercent: 50 },
    activeTime: { value: 120, previous: 100, deltaPercent: 20 },
    bounceRate: { value: 20, previous: 25, deltaPercent: -20 },
    resumeViews: { value: 3, previous: 2, deltaPercent: 50 },
  },
  trend: [
    { date: "2026-08-13", visitors: 3, sessions: 4, resumeViews: 1 },
    { date: "2026-08-14", visitors: 5, sessions: 6, resumeViews: 1 },
    { date: "2026-08-15", visitors: 4, sessions: 5, resumeViews: 1 },
  ],
  sections: [
    { label: "Work", sessions: 10, total: 15, share: 66.7 },
    { label: "About", sessions: 6, total: 15, share: 40 },
  ],
  actions: [
    { label: "Resume: hero", visitors: 3, total: 4, share: 75 },
    { label: "Project: Matic", visitors: 2, total: 3, share: 50 },
  ],
  acquisition: [
    { label: "Direct", visitors: 8, total: 12, share: 66.7 },
    { label: "LinkedIn", visitors: 4, total: 12, share: 33.3 },
  ],
  audience: {
    countries: [{ label: "United States", visitors: 9, total: 12, share: 75 }],
    devices: [{ label: "Desktop", visitors: 8, total: 12, share: 66.7 }],
    browsers: [{ label: "Chrome", visitors: 7, total: 12, share: 58.3 }],
  },
  funnel: [
    { label: "Visit", sessions: 15, share: 100 },
    { label: "Work view", sessions: 10, share: 66.7 },
    { label: "Portfolio action", sessions: 6, share: 40 },
    { label: "Resume action", sessions: 3, share: 20 },
  ],
  posthogLinks: {
    sessions: "https://app.posthog.com/project/1/replay",
    heatmaps: "https://app.posthog.com/project/1/heatmaps",
    paths: "https://app.posthog.com/project/1/paths",
    events: "https://app.posthog.com/project/1/events",
  },
};

const emptyReport: AdminAnalyticsResponse = {
  ...report,
  coverage: { requestedFrom: "2026-08-08", availableFrom: null, partial: false },
  kpis: {
    visitors: { value: null, previous: null, deltaPercent: null },
    sessions: { value: null, previous: null, deltaPercent: null },
    activeTime: { value: null, previous: null, deltaPercent: null },
    bounceRate: { value: null, previous: null, deltaPercent: null },
    resumeViews: { value: null, previous: null, deltaPercent: null },
  },
  trend: [],
  sections: [],
  actions: [],
  acquisition: [],
  audience: { countries: [], devices: [], browsers: [] },
  funnel: [],
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function renderAdmin() {
  window.history.replaceState({}, "", "/admin");
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}

describe("admin access", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.stubEnv("VITE_POSTHOG_KEY", "public-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    vi.stubEnv("VITE_SUPABASE_FUNCTIONS_URL", "https://project.supabase.co/functions/v1");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "public-anon-key");
    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("keeps direct admin navigation to the password form without initializing PostHog", () => {
    renderAdmin();

    expect(screen.getByRole("heading", { name: /private analytics/i })).not.toBeNull();
    expect(screen.getByLabelText(/password/i).getAttribute("type")).toBe("password");
    expect(screen.getByRole("button", { name: /sign in/i }).hasAttribute("disabled")).toBe(false);
    expect(screen.queryByText(/visitors/i)).toBeNull();
    expect(posthogMock.init).not.toHaveBeenCalled();
  });

  it("stores only the returned token for a successful login and clears it on logout", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ token: "signed-admin-token", expiresAt: "2026-08-15T13:00:00.000Z" }))
      .mockResolvedValueOnce(jsonResponse(report));
    vi.stubGlobal("fetch", fetchMock);

    renderAdmin();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "never-persist-this" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await screen.findByRole("heading", { name: /portfolio analytics/i });
    expect(getSessionToken()).toBe("signed-admin-token");
    expect(sessionStorage.length).toBe(1);
    expect([...Array(sessionStorage.length)].map((_, index) => sessionStorage.key(index))).toEqual(["admin-session-token"]);
    expect([...Array(sessionStorage.length)].map((_, index) => sessionStorage.getItem(sessionStorage.key(index)!))).not.toContain("never-persist-this");
    expect(localStorage.length).toBe(0);

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    expect(screen.getByLabelText(/password/i)).not.toBeNull();
    expect(getSessionToken()).toBeNull();
  });

  it("renders the aggregate dashboard in the approved editorial order without visitor identities", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({
      ...report,
      rawVisitors: [{ distinctId: "visitor-123", email: "private@example.com" }],
    })));

    renderAdmin();

    await screen.findByRole("heading", { name: /portfolio analytics/i });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual([
      "Period snapshot",
      "Traffic over time",
      "Journey signals",
      "Section attention",
      "Ranked actions",
      "Acquisition",
      "Audience",
      "Conversion funnel",
      "Deeper analysis",
      "Privacy & provenance",
    ]);
    for (const label of ["Visitors", "Sessions", "Active time", "Bounce rate", "Resume actions"]) {
      expect(screen.getByText(label, { selector: ".admin-kpi-label" })).not.toBeNull();
    }
    expect(screen.getByRole("img", { name: /traffic over time/i })).not.toBeNull();
    expect(screen.getByRole("table", { name: /traffic over time data/i })).not.toBeNull();
    expect(screen.getByText(/visitors peaked at 5/i, { selector: ".admin-chart-summary" })).not.toBeNull();
    const acquisitionTable = screen.getByRole("table", { name: /acquisition sources/i });
    expect(within(acquisitionTable).getByRole("columnheader", { name: /source/i })).not.toBeNull();
    expect(within(acquisitionTable).getByRole("columnheader", { name: /visitors/i })).not.toBeNull();
    expect(within(acquisitionTable).getByRole("columnheader", { name: /share/i })).not.toBeNull();
    expect(screen.getByRole("tab", { name: /country/i }).getAttribute("aria-selected")).toBe("true");
    for (const label of ["Session replay", "Heatmaps", "Path analysis", "Event explorer"]) {
      expect(screen.getByRole("link", { name: new RegExp(label, "i") })).not.toBeNull();
    }
    expect(screen.getByRole("link", { name: /^portfolio$/i })).not.toBeNull();
    expect(screen.getByRole("button", { name: /log out/i })).not.toBeNull();
    expect(document.body.textContent).not.toContain("visitor-123");
    expect(document.body.textContent).not.toContain("private@example.com");
  });

  it("updates the report range without moving focus and exposes the update politely", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse(report))
      .mockResolvedValueOnce(jsonResponse({ ...report, rangeDays: 30 }));
    vi.stubGlobal("fetch", fetchMock);

    renderAdmin();
    await screen.findByRole("heading", { name: /portfolio analytics/i });
    const rangeButton = screen.getByRole("button", { name: /30 days/i });
    rangeButton.focus();
    fireEvent.click(rangeButton);

    await waitFor(() => expect(fetchMock).toHaveBeenLastCalledWith(
      "https://project.supabase.co/functions/v1/admin-analytics?range=30",
      expect.any(Object),
    ));
    await waitFor(() => expect(screen.getByRole("status").textContent).toMatch(/showing 30 days/i));
    expect(document.activeElement).toBe(rangeButton);
    expect(rangeButton.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: /7 days/i })).not.toBeNull();
    expect(screen.getByRole("button", { name: /90 days/i })).not.toBeNull();
  });

  it("moves through audience tabs with arrow keys", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(report)));

    renderAdmin();
    await screen.findByRole("heading", { name: /portfolio analytics/i });
    const countryTab = screen.getByRole("tab", { name: /country/i });
    countryTab.focus();
    fireEvent.keyDown(countryTab, { key: "ArrowRight" });

    const deviceTab = screen.getByRole("tab", { name: /device/i });
    expect(deviceTab.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(deviceTab);
  });

  it("does not restore private analytics when a refresh finishes after logout", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    let finishRefresh: ((response: Response) => void) | undefined;
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse(report))
      .mockImplementationOnce(() => new Promise<Response>((resolve) => { finishRefresh = resolve; }));
    vi.stubGlobal("fetch", fetchMock);

    renderAdmin();
    await screen.findByRole("heading", { name: /portfolio analytics/i });
    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));
    fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    finishRefresh?.(jsonResponse({ ...report, kpis: { ...report.kpis, visitors: { value: 999, previous: 0, deltaPercent: null } } }));

    await waitFor(() => expect(screen.getByLabelText(/password/i)).not.toBeNull());
    expect(screen.queryByRole("heading", { name: /portfolio analytics/i })).toBeNull();
    expect(getSessionToken()).toBeNull();
  });

  it("keeps stale data visible and timestamps it when a refresh fails", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce(jsonResponse(report))
      .mockResolvedValueOnce(jsonResponse({ error: "upstream" }, 502)));

    renderAdmin();
    await screen.findByRole("heading", { name: /portfolio analytics/i });
    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));

    await screen.findByRole("alert");
    expect(screen.getByRole("alert").textContent).toMatch(/showing the report last updated/i);
    expect(screen.getByText("12", { selector: ".admin-kpi-value" })).not.toBeNull();
    expect(screen.getByRole("button", { name: /refresh/i }).hasAttribute("disabled")).toBe(false);
  });

  it("labels partial modules and the date aggregate coverage began", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({
      ...report,
      coverage: { requestedFrom: "2026-08-08", availableFrom: "2026-08-12", partial: true },
      actions: [],
    })));

    renderAdmin();

    await screen.findByRole("heading", { name: /portfolio analytics/i });
    expect(screen.getByRole("alert").textContent).toMatch(/partial coverage/i);
    expect(screen.getByRole("alert").textContent).toMatch(/august 12, 2026/i);
    expect(screen.getByText(/ranked actions are unavailable for this report/i)).not.toBeNull();
    expect(screen.getByText("Work")).not.toBeNull();
  });

  it("uses truthful new-installation copy and does not fabricate empty charts", async () => {
    sessionStorage.setItem("admin-session-token", "signed-admin-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(emptyReport)));

    renderAdmin();

    await screen.findByRole("heading", { name: /portfolio analytics/i });
    expect(screen.getByText(/tracking is live/i)).not.toBeNull();
    expect(screen.getByText(/not enough aggregate activity yet/i)).not.toBeNull();
    expect(screen.queryByRole("img", { name: /traffic over time/i })).toBeNull();
  });

  it("returns expired sessions to the password form and removes their token", async () => {
    sessionStorage.setItem("admin-session-token", "expired-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ error: "Unauthorized" }, 401)));

    renderAdmin();

    await waitFor(() => expect(screen.getByRole("alert").textContent).toMatch(/session has expired/i));
    expect(screen.getByLabelText(/password/i)).not.toBeNull();
    expect(getSessionToken()).toBeNull();
  });

  it("maps throttled login responses to a safe retry message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ error: "Too many attempts" }, 429)));

    renderAdmin();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrong-password" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(screen.getByRole("alert").textContent).toMatch(/too many attempts/i));
    expect(getSessionToken()).toBeNull();
  });

  it("sends the anonymous key only as the Supabase routing key and the admin token as report authorization", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ token: "stored-token", expiresAt: "2026-08-15T13:00:00.000Z" }))
      .mockResolvedValueOnce(jsonResponse(report));
    vi.stubGlobal("fetch", fetchMock);

    await login("private-password");
    await fetchAnalytics(30, "signed-admin-token");

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://project.supabase.co/functions/v1/admin-login",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ apikey: "public-anon-key" }),
      }),
    );
    expect(fetchMock.mock.calls[0]?.[1]?.headers).not.toHaveProperty("Authorization");
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://project.supabase.co/functions/v1/admin-analytics?range=30",
      expect.objectContaining({
        headers: expect.objectContaining({
          apikey: "public-anon-key",
          Authorization: "Bearer signed-admin-token",
        }),
      }),
    );
    clearSessionToken();
  });

  it("allows the browser's apikey header in admin CORS preflight responses", () => {
    const headers = corsHeaders("https://shivamkanodia.com", {
      allowedOrigins: ["https://shivamkanodia.com"],
    });

    expect(headers["Access-Control-Allow-Headers"]).toBe("apikey, authorization, content-type");
  });

  it("disables platform JWT verification for the custom HMAC admin analytics bearer", () => {
    const config = readFileSync("supabase/config.toml", "utf8");

    expect(config).toMatch(/\[functions\.admin-analytics\]\s+verify_jwt\s*=\s*false/);
  });
});
