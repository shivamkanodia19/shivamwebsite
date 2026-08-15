import posthog from "posthog-js";
import type { BeforeSendFn } from "posthog-js";
import {
  analyticsValueRegistry,
  type AnalyticsEventName,
  type AnalyticsEventProperties,
} from "./events";

const eventPropertyNames: Record<AnalyticsEventName, readonly string[]> = {
  $pageview: [],
  section_viewed: ["section_id", "section_label", "visibility_threshold"],
  section_engaged: ["section_id", "active_milliseconds"],
  element_clicked: ["element_id", "label", "section_id", "destination_type"],
  project_opened: ["project_id", "project_name"],
  resume_viewed: ["placement"],
  external_link_clicked: ["destination_type"],
  pitch_opened: [],
  contact_clicked: ["channel"],
};

const controlledValues = new Map(
  Object.entries(analyticsValueRegistry).map(([propertyName, values]) => [
    propertyName,
    new Set<string>(values),
  ]),
);
const canonicalPageviewUrls = new Map([
  ["/", "https://shivamkanodia.com/"],
  ["/pitch", "https://shivamkanodia.com/pitch"],
]);
let analyticsInitialized = false;
let replayStoppedForAdmin = false;
let routeSyncInstalled = false;

function getAnalyticsConfig() {
  const key = import.meta.env.VITE_POSTHOG_KEY?.trim();
  const host = import.meta.env.VITE_POSTHOG_HOST?.trim();

  return key && host ? { host, key } : undefined;
}

function getCurrentPath() {
  return typeof window === "undefined" ? "/admin" : window.location.pathname;
}

function isSafeAnalyticsValue(propertyName: string, value: unknown) {
  const allowedValues = controlledValues.get(propertyName);

  if (allowedValues) {
    return typeof value === "string" && allowedValues.has(value);
  }

  if (propertyName === "visibility_threshold") {
    return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
  }

  return (
    propertyName === "active_milliseconds" &&
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 0
  );
}

function sanitizeSdkCurrentUrl(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }

    return canonicalPageviewUrls.get(url.pathname);
  } catch {
    return undefined;
  }
}

const sanitizeSdkUrlProperties: BeforeSendFn = (event) => {
  const properties = { ...event.properties };
  const sanitizedCurrentUrl = sanitizeSdkCurrentUrl(properties.$current_url);

  if (sanitizedCurrentUrl) {
    properties.$current_url = sanitizedCurrentUrl;
  } else {
    delete properties.$current_url;
  }
  delete properties.$referrer;

  return { ...event, properties };
};

function getKnownProperties<EventName extends AnalyticsEventName>(
  eventName: EventName,
  properties: AnalyticsEventProperties[EventName],
) {
  const source = properties as Record<string, unknown>;

  const knownPropertyNames = eventPropertyNames[eventName];

  if (
    knownPropertyNames.some(
      (propertyName) =>
        !Object.prototype.hasOwnProperty.call(source, propertyName) ||
        !isSafeAnalyticsValue(propertyName, source[propertyName]),
    )
  ) {
    return undefined;
  }

  return Object.fromEntries(knownPropertyNames.map((propertyName) => [propertyName, source[propertyName]]));
}

export function isTrackablePath(pathname: string) {
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}

export function isTrackablePageviewPath(pathname: string) {
  return canonicalPageviewUrls.has(pathname);
}

export function syncAnalyticsRoute(pathname = getCurrentPath()) {
  if (!analyticsInitialized) {
    return;
  }

  if (isTrackablePath(pathname)) {
    if (replayStoppedForAdmin) {
      posthog.startSessionRecording();
      replayStoppedForAdmin = false;
    }
    return;
  }

  if (!replayStoppedForAdmin) {
    posthog.stopSessionRecording();
    replayStoppedForAdmin = true;
  }
}

function installRouteSync() {
  if (routeSyncInstalled || typeof window === "undefined") {
    return;
  }

  const syncAfterNavigation = () => syncAnalyticsRoute();
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = (...args) => {
    originalPushState.apply(window.history, args);
    syncAfterNavigation();
  };
  window.history.replaceState = (...args) => {
    originalReplaceState.apply(window.history, args);
    syncAfterNavigation();
  };
  window.addEventListener("popstate", syncAfterNavigation);
  routeSyncInstalled = true;
}

export function initializeAnalytics() {
  const config = getAnalyticsConfig();

  if (!config || !isTrackablePath(getCurrentPath())) {
    return;
  }

  posthog.init(config.key, {
    api_host: config.host,
    autocapture: false,
    before_send: sanitizeSdkUrlProperties,
    capture_pageleave: false,
    capture_pageview: false,
    person_profiles: "identified_only",
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "*",
    },
  });
  analyticsInitialized = true;
  installRouteSync();
}

export function captureAnalyticsEvent<EventName extends AnalyticsEventName>(
  eventName: EventName,
  properties: AnalyticsEventProperties[EventName],
) {
  if (!getAnalyticsConfig() || !isTrackablePath(getCurrentPath())) {
    return;
  }

  const knownProperties = getKnownProperties(eventName, properties);

  if (knownProperties) {
    posthog.capture(eventName, knownProperties);
  }
}
