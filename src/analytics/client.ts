import posthog from "posthog-js";
import type { AnalyticsEventName, AnalyticsEventProperties } from "./events";

const eventPropertyNames: Record<AnalyticsEventName, readonly string[]> = {
  section_viewed: ["section_id", "section_label", "visibility_threshold"],
  section_engaged: ["section_id", "active_milliseconds"],
  element_clicked: ["element_id", "label", "section_id", "destination_type"],
  project_opened: ["project_id", "project_name"],
  resume_viewed: ["placement"],
  external_link_clicked: ["destination_type"],
  pitch_opened: [],
  contact_clicked: ["channel"],
};

function getAnalyticsConfig() {
  const key = import.meta.env.VITE_POSTHOG_KEY?.trim();
  const host = import.meta.env.VITE_POSTHOG_HOST?.trim();

  return key && host ? { host, key } : undefined;
}

function getCurrentPath() {
  return typeof window === "undefined" ? "/admin" : window.location.pathname;
}

function getKnownProperties<EventName extends AnalyticsEventName>(
  eventName: EventName,
  properties: AnalyticsEventProperties[EventName],
) {
  const source = properties as Record<string, unknown>;

  return Object.fromEntries(
    eventPropertyNames[eventName]
      .filter((propertyName) => Object.prototype.hasOwnProperty.call(source, propertyName))
      .map((propertyName) => [propertyName, source[propertyName]]),
  );
}

export function isTrackablePath(pathname: string) {
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}

export function initializeAnalytics() {
  const config = getAnalyticsConfig();

  if (!config || !isTrackablePath(getCurrentPath())) {
    return;
  }

  posthog.init(config.key, {
    api_host: config.host,
    autocapture: false,
    capture_pageleave: false,
    capture_pageview: false,
    person_profiles: "identified_only",
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "*",
    },
  });
}

export function captureAnalyticsEvent<EventName extends AnalyticsEventName>(
  eventName: EventName,
  properties: AnalyticsEventProperties[EventName],
) {
  if (!getAnalyticsConfig() || !isTrackablePath(getCurrentPath())) {
    return;
  }

  posthog.capture(eventName, getKnownProperties(eventName, properties));
}
