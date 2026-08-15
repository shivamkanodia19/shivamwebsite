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

describe("analytics boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
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

  it("uses canonical current URLs for allowed routes and removes referrers", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
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
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
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

  it("captures exactly one pageview for home and pitch without stable-rerender duplicates", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");

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
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
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
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
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
      active_milliseconds: 30_000,
    });
  });

  it("reports resume placement and emits an email contact event without the address", () => {
    vi.stubEnv("VITE_POSTHOG_KEY", "public-project-key");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://eu.i.posthog.com");
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
});
