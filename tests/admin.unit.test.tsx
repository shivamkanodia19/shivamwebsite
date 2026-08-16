import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { clearSessionToken, fetchAnalytics, getSessionToken, login } from "../src/admin/api";
import { corsHeaders } from "../supabase/functions/_shared/cors.ts";

const posthogMock = vi.hoisted(() => ({
  init: vi.fn(),
  startSessionRecording: vi.fn(),
  stopSessionRecording: vi.fn(),
  capture: vi.fn(),
}));

vi.mock("posthog-js", () => ({ default: posthogMock }));

const report = {
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
  trend: [],
  sections: [],
  actions: [],
  acquisition: [],
  audience: { countries: [], devices: [], browsers: [] },
  funnel: [],
  posthogLinks: { sessions: null, heatmaps: null, paths: null, events: null },
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

    await screen.findByRole("heading", { name: /analytics access verified/i });
    expect(getSessionToken()).toBe("signed-admin-token");
    expect(sessionStorage.length).toBe(1);
    expect([...Array(sessionStorage.length)].map((_, index) => sessionStorage.key(index))).toEqual(["admin-session-token"]);
    expect([...Array(sessionStorage.length)].map((_, index) => sessionStorage.getItem(sessionStorage.key(index)!))).not.toContain("never-persist-this");
    expect(localStorage.length).toBe(0);

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    expect(screen.getByLabelText(/password/i)).not.toBeNull();
    expect(getSessionToken()).toBeNull();
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
