import posthog from "posthog-js";
import type { BeforeSendFn, CapturedNetworkRequest } from "posthog-js";
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

function isPostHogLoaded() {
  return posthog.__loaded === true;
}

function getAnalyticsConfig() {
  const key = import.meta.env.VITE_POSTHOG_KEY?.trim();
  const host = import.meta.env.VITE_POSTHOG_HOST?.trim();

  if (!key || !host || (!import.meta.env.PROD && !isSafeAnalyticsTestMode(host))) {
    return undefined;
  }

  return { host, key, testMode: !import.meta.env.PROD };
}

function isSafeAnalyticsTestMode(host: string) {
  if (!import.meta.env.DEV || import.meta.env.VITE_ANALYTICS_TEST_MODE !== "true") {
    return false;
  }

  try {
    const url = new URL(host);
    const isLoopback = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
    const isInvalidSink = url.hostname.endsWith(".invalid");
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      (isLoopback || (url.protocol === "https:" && isInvalidSink))
    );
  } catch {
    return false;
  }
}

function getDevelopmentRequestQueueConfig() {
  if (!import.meta.env.DEV) return undefined;
  const flushInterval = Number(import.meta.env.VITE_POSTHOG_TEST_FLUSH_INTERVAL_MS);
  if (!Number.isInteger(flushInterval) || flushInterval < 250 || flushInterval > 5_000) return undefined;
  return { flush_interval_ms: flushInterval };
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

const urlPropertyName = /(?:^|[_$-])(href|url|uri|referrer|location|src|action|name)(?:$|[_$-])/i;

function sanitizeUrl(value: string, allowRelative = false) {
  const isAbsoluteHttpUrl = /^https?:\/\//i.test(value);
  const isRelativeUrl = allowRelative && /^(?:\/|\.\/|\.\.\/|#)/.test(value);
  if (!isAbsoluteHttpUrl && !isRelativeUrl) {
    return value;
  }

  try {
    const base = "https://analytics-redaction.invalid/";
    const url = new URL(value, base);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return value;
    }
    url.search = "";
    url.hash = "";
    if (!isAbsoluteHttpUrl) {
      return url.pathname;
    }
    return url.toString();
  } catch {
    return value;
  }
}

function sanitizeNestedUrls(value: unknown, propertyName?: string): unknown {
  if (typeof value === "string") {
    return sanitizeUrl(value, propertyName ? urlPropertyName.test(propertyName) : false);
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeNestedUrls(item, propertyName));
  }
  if (!value || Object.getPrototypeOf(value) !== Object.prototype) {
    return value;
  }

  return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
    sanitizeUrl(key),
    sanitizeNestedUrls(nestedValue, key),
  ]));
}

const sanitizeSdkEvent: BeforeSendFn = (event) => {
  if (!event || !isTrackablePath(getCurrentPath())) {
    return null;
  }

  const properties = sanitizeNestedUrls(event.properties) as Record<string, unknown>;
  const sanitizedCurrentUrl = sanitizeSdkCurrentUrl(properties.$current_url);

  if (sanitizedCurrentUrl) {
    properties.$current_url = sanitizedCurrentUrl;
  } else {
    delete properties.$current_url;
  }
  delete properties.$referrer;

  const sanitizedEvent = { ...event, properties };
  if (getAnalyticsConfig()?.testMode && typeof window !== "undefined") {
    window.__analyticsTestCapturedPayloads?.push(sanitizedEvent);
  }
  return sanitizedEvent;
};

function maskCapturedNetworkRequest(request: CapturedNetworkRequest) {
  return { ...request, name: sanitizeUrl(request.name) };
}

function maskReplayAttribute(name: string, value: string) {
  return sanitizeUrl(value, urlPropertyName.test(name));
}

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

export function getAnalyticsSessionId() {
  try {
    const sessionId = posthog.get_session_id?.();
    return typeof sessionId === "string" && sessionId.length > 0 ? sessionId : null;
  } catch {
    return null;
  }
}

export function resetAnalyticsClientForTests() {
  analyticsInitialized = false;
  replayStoppedForAdmin = false;
}

export function initializeAnalytics() {
  const config = getAnalyticsConfig();
  const requestQueueConfig = getDevelopmentRequestQueueConfig();

  if (!config || !isTrackablePath(getCurrentPath())) {
    return;
  }

  if (analyticsInitialized || isPostHogLoaded()) {
    analyticsInitialized = true;
    installRouteSync();
    return;
  }

  analyticsInitialized = true;
  if (config.testMode && typeof window !== "undefined") {
    window.__analyticsTestCapturedPayloads = [];
  }
  posthog.init(config.key, {
    api_host: config.host,
    autocapture: false,
    before_send: sanitizeSdkEvent,
    capture_pageleave: false,
    capture_pageview: false,
    disable_capture_url_hashes: true,
    ...(config.testMode ? { disable_compression: true } : {}),
    person_profiles: "identified_only",
    ...(requestQueueConfig ? { request_queue_config: requestQueueConfig } : {}),
    session_recording: {
      maskAttributeFn: maskReplayAttribute,
      maskAllInputs: true,
      maskCapturedNetworkRequestFn: maskCapturedNetworkRequest,
      maskTextSelector: "*",
    },
  });
  if (config.testMode && typeof window !== "undefined") {
    window.__analyticsTestPostHog = {
      capture: (event, properties) => {
        sanitizeSdkEvent({ event, properties } as Parameters<BeforeSendFn>[0]);
        posthog.capture(event, properties, { send_instantly: true });
      },
      startSessionRecording: () => { posthog.startSessionRecording(); },
    };
  }
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
    posthog.capture(eventName, knownProperties, { send_instantly: true });
  }
}
