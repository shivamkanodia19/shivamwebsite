import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  captureAnalyticsEvent,
  initializeAnalytics,
  isTrackablePath,
} from "../src/analytics/client";

const posthogMock = vi.hoisted(() => ({
  capture: vi.fn(),
  init: vi.fn(),
  startSessionRecording: vi.fn(),
  stopSessionRecording: vi.fn(),
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

  it("stops session replay on admin navigation and restarts it on public exit", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();
    posthogMock.startSessionRecording.mockClear();
    posthogMock.stopSessionRecording.mockClear();

    window.history.pushState({}, "", "/admin");
    expect(posthogMock.stopSessionRecording).toHaveBeenCalledOnce();

    window.history.pushState({}, "", "/pitch");
    expect(posthogMock.startSessionRecording).toHaveBeenCalledOnce();
  });

  it("rejects sensitive values in otherwise allowlisted event properties", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();

    captureAnalyticsEvent("element_clicked", {
      element_id: "contact",
      label: "email: shivam@example.com",
      section_id: "contact",
      destination_type: "email",
    });
    captureAnalyticsEvent("project_opened", {
      project_id: "case-study",
      project_name: "https://example.com/?email=shivam@example.com",
    });

    expect(posthogMock.capture).not.toHaveBeenCalled();
  });

  it("rejects arbitrary sentences and phone numbers in controlled event values", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();

    captureAnalyticsEvent("resume_viewed", {
      placement: "please-call-me-when-you-have-a-chance",
    });
    captureAnalyticsEvent("resume_viewed", { placement: "214-470-0598" });

    expect(posthogMock.capture).not.toHaveBeenCalled();
  });

  it("strips query strings and fragments from SDK URL properties", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();
    const options = posthogMock.init.mock.calls.at(-1)?.[1] as {
      before_send: (event: Record<string, unknown>) => Record<string, unknown>;
    };

    const event = options.before_send({
      event: "$pageview",
      properties: {
        $current_url: "https://shivamkanodia.com/pitch?email=private@example.com#contact",
        $referrer: "https://search.example/results?q=private#top",
      },
    });

    expect(event).toEqual({
      event: "$pageview",
      properties: {
        $current_url: "https://shivamkanodia.com/pitch",
        $referrer: "https://search.example/results",
      },
    });
  });
});
