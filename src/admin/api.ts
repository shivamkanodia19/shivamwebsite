import type { AdminAnalyticsResponse, RangeDays } from "./types";

const sessionTokenKey = "admin-session-token";
const requestTimeoutMilliseconds = 10_000;

type ApiErrorCode = "invalid-password" | "throttled" | "unauthorized" | "unavailable";

export class AdminApiError extends Error {
  constructor(readonly code: ApiErrorCode, message: string) {
    super(message);
    this.name = "AdminApiError";
  }
}

function functionUrl(name: "admin-login" | "admin-analytics") {
  const baseUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) {
    throw new AdminApiError("unavailable", "Analytics access is temporarily unavailable. Please try again.");
  }
  return `${baseUrl}/${name}`;
}

function routingHeaders() {
  const anonymousKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
  if (!anonymousKey) {
    throw new AdminApiError("unavailable", "Analytics access is temporarily unavailable. Please try again.");
  }
  return { apikey: anonymousKey };
}

async function request(url: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMilliseconds);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    throw new AdminApiError("unavailable", "Analytics access is temporarily unavailable. Please try again.");
  } finally {
    window.clearTimeout(timeout);
  }
}

async function responseBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function loginError(status: number): AdminApiError {
  if (status === 429) {
    return new AdminApiError("throttled", "Too many attempts. Please wait and try again.");
  }
  if (status === 400 || status === 401 || status === 403) {
    return new AdminApiError("invalid-password", "Invalid password. Please try again.");
  }
  return new AdminApiError("unavailable", "Analytics access is temporarily unavailable. Please try again.");
}

function analyticsError(status: number): AdminApiError {
  if (status === 401 || status === 403) {
    return new AdminApiError("unauthorized", "Your session has expired. Please sign in again.");
  }
  return new AdminApiError("unavailable", "Unable to load analytics. Please try again.");
}

export function getSessionToken() {
  try {
    return sessionStorage.getItem(sessionTokenKey) || null;
  } catch {
    return null;
  }
}

export function clearSessionToken() {
  try {
    sessionStorage.removeItem(sessionTokenKey);
  } catch {
    // Storage may be unavailable in privacy-restricted browsers.
  }
}

export async function login(password: string) {
  const response = await request(functionUrl("admin-login"), {
    method: "POST",
    headers: {
      ...routingHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  const body = await responseBody(response);
  if (!response.ok) throw loginError(response.status);
  const token = body && typeof body === "object" && "token" in body ? body.token : undefined;
  if (typeof token !== "string" || !token) {
    throw new AdminApiError("unavailable", "Analytics access is temporarily unavailable. Please try again.");
  }

  try {
    sessionStorage.setItem(sessionTokenKey, token);
  } catch {
    throw new AdminApiError("unavailable", "Your browser could not save this private session.");
  }
  return token;
}

export async function fetchAnalytics(range: RangeDays, token: string): Promise<AdminAnalyticsResponse> {
  const response = await request(`${functionUrl("admin-analytics")}?range=${range}`, {
    headers: {
      ...routingHeaders(),
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await responseBody(response);
  if (!response.ok) throw analyticsError(response.status);
  if (!body || typeof body !== "object") {
    throw new AdminApiError("unavailable", "Unable to load analytics. Please try again.");
  }
  return body as AdminAnalyticsResponse;
}
