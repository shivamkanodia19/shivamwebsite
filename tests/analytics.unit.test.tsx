import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  captureAnalyticsEvent,
  initializeAnalytics,
  isTrackablePath,
} from "../src/analytics/client";
import { TrackedLink } from "../src/analytics/TrackedLink";
import { usePageTracking } from "../src/analytics/usePageTracking";
import { useSectionTracking } from "../src/analytics/useSectionTracking";
import { SiteFooter } from "../src/components/SiteFooter";

const posthogMock = vi.hoisted(() => ({
  capture: vi.fn(),
  init: vi.fn(),
  startSessionRecording: vi.fn(),
  stopSessionRecording: vi.fn(),
}));

vi.mock("posthog-js", () => ({ default: posthogMock }));

class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];
  readonly observe = vi.fn();
  readonly disconnect = vi.fn();

  constructor(readonly callback: IntersectionObserverCallback) {
    IntersectionObserverMock.instances.push(this);
  }

  emit(entries: Array<Partial<IntersectionObserverEntry>>) {
    this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

function RouteProbe() {
  usePageTracking();
  const navigate = useNavigate();

  return <button onClick={() => navigate("/pitch")}>Open pitch</button>;
}

function SectionProbe() {
  useSectionTracking([{ id: "work", label: "Experience" }]);
  return <section id="work">Work</section>;
}

function enableAnalyticsTestMode() {
  vi.stubEnv("VITE_ANALYTICS_TEST_MODE", "true");
  vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
  vi.stubEnv("VITE_POSTHOG_HOST", "https://posthog.invalid");
}

describe("analytics boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/");
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    IntersectionObserverMock.instances = [];
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  });

  it("excludes the private admin route and all of its children", () => {
    expect(isTrackablePath("/")).toBe(true);
    expect(isTrackablePath("/pitch")).toBe(true);
    expect(isTrackablePath("/admin")).toBe(false);
    expect(isTrackablePath("/admin/reports")).toBe(false);
  });

  it("initializes anonymous analytics with masked session replay", () => {
    enableAnalyticsTestMode();

    initializeAnalytics();

    expect(posthogMock.init).toHaveBeenCalledWith(
      "public-project-key",
      expect.objectContaining({
        api_host: "https://posthog.invalid",
        person_profiles: "identified_only",
        session_recording: {
          maskAttributeFn: expect.any(Function),
          maskAllInputs: true,
          maskCapturedNetworkRequestFn: expect.any(Function),
          maskTextSelector: "*",
        },
      }),
    );
  });

  it("does not initialize analytics in development without explicit safe test mode", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://posthog.invalid");

    initializeAnalytics();
    expect(posthogMock.init).not.toHaveBeenCalled();

    vi.stubEnv("VITE_ANALYTICS_TEST_MODE", "true");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
    initializeAnalytics();
    expect(posthogMock.init).not.toHaveBeenCalled();

    vi.stubEnv("VITE_POSTHOG_HOST", "http://127.0.0.1:9999");
    initializeAnalytics();
    expect(posthogMock.init).toHaveBeenCalledOnce();
  });

  it("uses the deterministic development-only PostHog flush interval when configured", () => {
    enableAnalyticsTestMode();
    vi.stubEnv("VITE_POSTHOG_TEST_FLUSH_INTERVAL_MS", "250");

    initializeAnalytics();

    expect(posthogMock.init).toHaveBeenCalledWith(
      "public-project-key",
      expect.objectContaining({ request_queue_config: { flush_interval_ms: 250 } }),
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
    enableAnalyticsTestMode();
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
    enableAnalyticsTestMode();
    initializeAnalytics();
    window.history.replaceState({}, "", "/admin/reports");

    captureAnalyticsEvent("resume_viewed", { placement: "admin" });

    expect(posthogMock.capture).not.toHaveBeenCalled();
  });

  it("stops session replay on admin navigation and restarts it on public exit", () => {
    enableAnalyticsTestMode();
    initializeAnalytics();
    posthogMock.startSessionRecording.mockClear();
    posthogMock.stopSessionRecording.mockClear();

    window.history.pushState({}, "", "/admin");
    expect(posthogMock.stopSessionRecording).toHaveBeenCalledOnce();

    window.history.pushState({}, "", "/pitch");
    expect(posthogMock.startSessionRecording).toHaveBeenCalledOnce();
  });

  it("rejects sensitive values in otherwise allowlisted event properties", () => {
    enableAnalyticsTestMode();
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
    enableAnalyticsTestMode();
    initializeAnalytics();

    captureAnalyticsEvent("resume_viewed", {
      placement: "please-call-me-when-you-have-a-chance",
    });
    captureAnalyticsEvent("resume_viewed", { placement: "214-470-0598" });

    expect(posthogMock.capture).not.toHaveBeenCalled();
  });

  it("uses canonical current URLs for allowed routes and removes referrers", () => {
    enableAnalyticsTestMode();
    initializeAnalytics();
    const options = posthogMock.init.mock.calls.at(-1)?.[1] as {
      before_send: (event: Record<string, unknown>) => Record<string, unknown>;
    };

    const pitchEvent = options.before_send({
      event: "$pageview",
      properties: {
        $current_url: "https://arbitrary-origin.example/pitch?email=private@example.com#contact",
        $referrer: "https://search.example/?q=private#top",
      },
    });
    const homeEvent = options.before_send({
      event: "$pageview",
      properties: {
        $current_url: "https://another-origin.example/?token=private#top",
        $referrer: "https://referrer.example/pitch",
      },
    });

    expect(pitchEvent).toEqual({
      event: "$pageview",
      properties: {
        $current_url: "https://shivamkanodia.com/pitch",
      },
    });
    expect(homeEvent).toEqual({
      event: "$pageview",
      properties: {
        $current_url: "https://shivamkanodia.com/",
      },
    });
  });

  it("drops SDK URL properties whose path is not an allowlisted public route", () => {
    enableAnalyticsTestMode();
    initializeAnalytics();
    const options = posthogMock.init.mock.calls.at(-1)?.[1] as {
      before_send: (event: Record<string, unknown>) => Record<string, unknown>;
    };

    const event = options.before_send({
      event: "$pageview",
      properties: {
        $current_url: "https://shivamkanodia.com/private/customer-name?token=secret",
        $referrer: "https://search.example/results/private-query#match",
      },
    });

    expect(event).toEqual({ event: "$pageview", properties: {} });
  });

  it("drops every SDK event on admin and recursively strips search and hash from replay URLs", () => {
    enableAnalyticsTestMode();
    initializeAnalytics();
    const options = posthogMock.init.mock.calls.at(-1)?.[1] as {
      before_send: (event: Record<string, unknown>) => Record<string, unknown> | null;
      session_recording: {
        maskAttributeFn: (name: string, value: string) => string;
        maskCapturedNetworkRequestFn: (request: { name: string; method?: string }) => { name: string; method?: string } | null;
      };
    };

    window.history.replaceState({}, "", "/admin/reports?token=admin-secret#details");
    expect(options.before_send({
      event: "$snapshot",
      properties: { $snapshot_data: { data: { href: "https://shivamkanodia.com/admin?token=admin-secret#details" } } },
    })).toBeNull();
    expect(options.before_send({
      event: "$$heatmap",
      properties: { $heatmap_data: { "https://shivamkanodia.com/admin?token=admin-secret#details": [] } },
    })).toBeNull();

    window.history.replaceState({}, "", "/pitch");
    const sanitized = options.before_send({
      event: "$snapshot",
      properties: {
        $snapshot_data: [{ data: { href: "https://shivamkanodia.com/pitch?email=private@example.com#contact" } }],
        $heatmap_data: { "https://shivamkanodia.com/?campaign=private#hero": [{ href: "/resume.pdf?token=private#page" }] },
      },
    });
    expect(sanitized).toEqual({
      event: "$snapshot",
      properties: {
        $snapshot_data: [{ data: { href: "https://shivamkanodia.com/pitch" } }],
        $heatmap_data: { "https://shivamkanodia.com/": [{ href: "/resume.pdf" }] },
      },
    });
    expect(JSON.stringify(sanitized)).not.toMatch(/private|\?|#/);
    expect(options.session_recording.maskAttributeFn("href", "/pitch?token=private#contact")).toBe("/pitch");
    expect(options.session_recording.maskCapturedNetworkRequestFn({
      name: "https://shivamkanodia.com/api?token=private#response",
      method: "GET",
    })).toEqual({ name: "https://shivamkanodia.com/api", method: "GET" });
  });

  it("captures exactly one pageview for home and pitch without stable-rerender duplicates", () => {
    enableAnalyticsTestMode();

    const view = render(
      <BrowserRouter>
        <RouteProbe />
      </BrowserRouter>,
    );
    const pageviewCalls = () => posthogMock.capture.mock.calls.filter(([eventName]) => eventName === "$pageview");

    expect(pageviewCalls()).toEqual([["$pageview", {}]]);
    view.rerender(
      <BrowserRouter>
        <RouteProbe />
      </BrowserRouter>,
    );
    expect(pageviewCalls()).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "Open pitch" }));
    expect(pageviewCalls()).toEqual([
      ["$pageview", {}],
      ["$pageview", {}],
    ]);

    view.rerender(
      <BrowserRouter>
        <RouteProbe />
      </BrowserRouter>,
    );
    expect(pageviewCalls()).toHaveLength(2);
  });

  it.each(["/private/customer-name", "/admin"])('does not capture a pageview on "%s"', (pathname) => {
    enableAnalyticsTestMode();
    window.history.replaceState({}, "", pathname);

    render(
      <BrowserRouter>
        <RouteProbe />
      </BrowserRouter>,
    );

    expect(posthogMock.capture).not.toHaveBeenCalled();
  });

  it("captures a section once at fifty percent visibility and pauses active time while hidden", () => {
    vi.useFakeTimers();
    enableAnalyticsTestMode();
    render(<SectionProbe />);
    const observer = IntersectionObserverMock.instances[0];
    const section = document.getElementById("work");
    expect(section).not.toBeNull();

    act(() => {
      observer.emit([{ target: section!, isIntersecting: true, intersectionRatio: 0.5 }]);
      observer.emit([{ target: section!, isIntersecting: true, intersectionRatio: 0.5 }]);
      vi.advanceTimersByTime(10_000);
    });

    expect(posthogMock.capture).toHaveBeenCalledWith("section_viewed", {
      section_id: "work",
      section_label: "Experience",
      visibility_threshold: 0.5,
    });
    expect(posthogMock.capture).toHaveBeenCalledWith("section_engaged", {
      section_id: "work",
      active_milliseconds: 10_000,
    });
    expect(posthogMock.capture.mock.calls.filter(([eventName]) => eventName === "section_viewed")).toHaveLength(1);

    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    act(() => vi.advanceTimersByTime(30_000));

    expect(posthogMock.capture).not.toHaveBeenCalledWith("section_engaged", {
      section_id: "work",
      active_milliseconds: 20_000,
    });
  });

  it("emits milestone deltas totaling active time and persists section state across remounts", () => {
    vi.useFakeTimers();
    enableAnalyticsTestMode();
    const firstView = render(<SectionProbe />);
    const firstObserver = IntersectionObserverMock.instances.at(-1)!;
    const firstSection = document.getElementById("work")!;

    act(() => {
      firstObserver.emit([{ target: firstSection, isIntersecting: true, intersectionRatio: 0.5 }]);
      vi.advanceTimersByTime(10_000);
    });
    firstView.unmount();

    const secondView = render(<SectionProbe />);
    const secondObserver = IntersectionObserverMock.instances.at(-1)!;
    const secondSection = document.getElementById("work")!;
    act(() => {
      secondObserver.emit([{ target: secondSection, isIntersecting: true, intersectionRatio: 0.5 }]);
      vi.advanceTimersByTime(50_000);
    });
    secondView.unmount();

    const sectionViews = posthogMock.capture.mock.calls.filter(([eventName]) => eventName === "section_viewed");
    const engagementDeltas = posthogMock.capture.mock.calls
      .filter(([eventName]) => eventName === "section_engaged")
      .map(([, properties]) => properties.active_milliseconds);
    expect(sectionViews).toHaveLength(1);
    expect(engagementDeltas).toEqual([10_000, 20_000, 30_000]);
    expect(engagementDeltas.reduce((total, delta) => total + delta, 0)).toBe(60_000);
  });

  it("reports resume placement and emits an email contact event without the address", () => {
    enableAnalyticsTestMode();
    const { rerender } = render(
      <TrackedLink href="/resume.pdf" tracking={{ eventName: "resume_viewed", properties: { placement: "hero" } }}>
        Resume
      </TrackedLink>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Resume" }));
    expect(posthogMock.capture).toHaveBeenCalledWith("resume_viewed", { placement: "hero" });

    posthogMock.capture.mockClear();
    rerender(
      <TrackedLink href="mailto:shivamkanodia77@gmail.com" tracking={{ eventName: "contact_clicked", properties: { channel: "email" } }}>
        Email
      </TrackedLink>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Email" }));

    expect(posthogMock.capture).toHaveBeenCalledWith("contact_clicked", { channel: "email" });
    expect(posthogMock.capture).toHaveBeenLastCalledWith("contact_clicked", { channel: "email" });
  });

  it("discloses anonymous masked analytics in the public footer", () => {
    render(<SiteFooter />);

    expect(screen.getByText(/anonymous analytics measure visits and interactions/i)).toBeDefined();
    expect(screen.getByText(/session replays mask page text and inputs/i)).toBeDefined();
  });
});
