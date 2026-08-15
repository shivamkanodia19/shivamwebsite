import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  captureAnalyticsEvent,
  initializeAnalytics,
  isTrackablePath,
} from "../src/analytics/client";

const posthogMock = vi.hoisted(() => ({
  capture: vi.fn(),
  init: vi.fn(),
}));

vi.mock("posthog-js", () => ({ default: posthogMock }));

describe("analytics boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    window.history.replaceState({}, "", "/");
  });

  it("excludes the private admin route and all of its children", () => {
    expect(isTrackablePath("/")).toBe(true);
    expect(isTrackablePath("/pitch")).toBe(true);
    expect(isTrackablePath("/admin")).toBe(false);
    expect(isTrackablePath("/admin/reports")).toBe(false);
  });

  it("initializes anonymous analytics with masked session replay", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");

    initializeAnalytics();

    expect(posthogMock.init).toHaveBeenCalledWith(
      "public-project-key",
      expect.objectContaining({
        api_host: "https://eu.i.posthog.com",
        person_profiles: "identified_only",
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: "*",
        },
      }),
    );
  });

  it("does not initialize unless both public analytics variables exist", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    initializeAnalytics();
    expect(posthogMock.init).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();
    expect(posthogMock.init).not.toHaveBeenCalled();
  });

  it("drops unknown event properties before capture", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();
    const rawProperties = {
      project_id: "case-study",
      project_name: "Case Study",
      unexpected: "must not leave the browser",
    };

    captureAnalyticsEvent("project_opened", rawProperties);

    expect(posthogMock.capture).toHaveBeenCalledWith("project_opened", {
      project_id: "case-study",
      project_name: "Case Study",
    });
  });

  it("refuses to capture events while on an admin path", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();
    window.history.replaceState({}, "", "/admin/reports");

    captureAnalyticsEvent("resume_viewed", { placement: "admin" });

    expect(posthogMock.capture).not.toHaveBeenCalled();
  });
});
