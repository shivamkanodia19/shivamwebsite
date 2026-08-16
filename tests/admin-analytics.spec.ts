import type { Locator, Page, Request } from "@playwright/test";
import { expect, test } from "./playwright-test";

const adminPassword = "qa-owner-password-9F!";
const adminToken = "qa-signed-admin-token";
const publicAnonKey = "qa-public-anon-key";
const analyticsBatchWindowMilliseconds = 1_500;

const availableReportStatus = {
  kpis: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
  trend: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
  sections: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
  actions: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
  acquisition: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
  audience: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
  funnel: { availability: "available", availableFrom: "2026-08-08T00:00:00.000Z" },
} as const;

function reportForRange(rangeDays: 7 | 30 | 90 = 7) {
  return {
    generatedAt: "2026-08-15T12:00:00.000Z",
    rangeDays,
    coverage: { requestedFrom: "2026-08-08", availableFrom: "2026-08-08", partial: false },
    reportStatus: availableReportStatus,
    trackingHealth: "healthy",
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
}

function emptyReport() {
  return {
    ...reportForRange(),
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
}

type JsonReply = { status?: number; json: unknown; delayMilliseconds?: number };
type AdminMockOptions = {
  login?: (password: string, attempt: number) => JsonReply;
  analytics?: (range: 7 | 30 | 90, requestNumber: number) => JsonReply;
};

type RequestEvidence = {
  url: string;
  method: string;
  postData: string | null;
  headers: Record<string, string>;
};

function requestEvidence(request: Request): RequestEvidence {
  return {
    url: request.url(),
    method: request.method(),
    postData: request.postData(),
    headers: request.headers(),
  };
}

function isPostHogTelemetryRequest(request: RequestEvidence) {
  const url = new URL(request.url);
  return url.hostname === "posthog.invalid" || /(^|\.)posthog(?:\.com|usercontent\.com)$/i.test(url.hostname);
}

async function mockAdminApi(page: Page, options: AdminMockOptions = {}) {
  const requests: RequestEvidence[] = [];
  const consoleMessages: string[] = [];
  let loginAttempts = 0;
  let analyticsRequests = 0;
  page.on("request", (request) => requests.push(requestEvidence(request)));
  page.on("console", (message) => consoleMessages.push(message.text()));

  await page.route("**/functions/v1/admin-login", async (route) => {
    if (route.request().headers().apikey !== publicAnonKey) {
      await route.fulfill({ status: 403, json: { error: "Missing routing key" } });
      return;
    }
    loginAttempts += 1;
    const payload = route.request().postDataJSON() as { password?: unknown };
    const response = options.login?.(String(payload.password ?? ""), loginAttempts) ?? {
      json: { token: adminToken, expiresAt: "2026-08-15T13:00:00.000Z" },
    };
    if (response.delayMilliseconds) await new Promise((resolve) => setTimeout(resolve, response.delayMilliseconds));
    await route.fulfill({ json: response.json, status: response.status });
  });
  await page.route("**/functions/v1/admin-analytics?*", async (route) => {
    const headers = route.request().headers();
    if (headers.apikey !== publicAnonKey || headers.authorization !== `Bearer ${adminToken}`) {
      await route.fulfill({ status: 401, json: { error: "Unauthorized" } });
      return;
    }
    analyticsRequests += 1;
    const range = Number(new URL(route.request().url()).searchParams.get("range")) as 7 | 30 | 90;
    const response = options.analytics?.(range, analyticsRequests) ?? { json: reportForRange(range) };
    if (response.delayMilliseconds) await new Promise((resolve) => setTimeout(resolve, response.delayMilliseconds));
    await route.fulfill({ json: response.json, status: response.status });
  });

  return { requests, consoleMessages };
}

async function installSession(page: Page, token = adminToken) {
  await page.addInitScript((storedToken) => {
    window.sessionStorage.setItem("admin-session-token", storedToken);
  }, token);
}

async function signIn(page: Page, password = adminPassword) {
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();
}

async function expectNoDocumentOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
}

async function waitForAnalyticsBatchWindow(page: Page) {
  await page.waitForTimeout(analyticsBatchWindowMilliseconds);
}

async function expectVisibleFocus(locator: Locator) {
  await expect.poll(() => locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return style.outlineStyle !== "none" || (style.boxShadow !== "none" && style.boxShadow !== "");
  })).toBe(true);
}

async function tabTo(page: Page, locator: Locator, direction: "forward" | "backward" = "forward") {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await page.keyboard.press(direction === "forward" ? "Tab" : "Shift+Tab");
    if (await locator.evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error(`Could not reach ${await locator.getAttribute("aria-label") ?? await locator.textContent() ?? "control"} with the keyboard`);
}

test("direct admin navigation exposes only the private login and emits no PostHog traffic", async ({ page, posthogRequests }) => {
  const evidence = await mockAdminApi(page);
  await page.goto("/admin");
  await waitForAnalyticsBatchWindow(page);

  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "Private analytics" })).toBeVisible();
  await expect(page.getByLabel("Password")).toHaveAttribute("type", "password");
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toHaveCount(0);
  expect(evidence.requests.filter(isPostHogTelemetryRequest)).toEqual([]);
  expect(posthogRequests).toEqual([]);
});

test("incorrect password, successful login, ranges, reload, external tools, logout, and privacy boundary", async ({ page, posthogRequests }) => {
  const evidence = await mockAdminApi(page, {
    login: (password) => password === adminPassword
      ? { json: { token: adminToken, expiresAt: "2026-08-15T13:00:00.000Z" } }
      : { status: 401, json: { error: "Invalid password" } },
  });
  await page.goto("/admin");

  await page.getByLabel("Password").fill("incorrect-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("alert")).toContainText("Invalid password");
  await expect(page.getByLabel("Password")).toHaveValue("");

  await signIn(page);
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();
  await expect(page.getByText("12", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "30 days" }).click();
  await expect(page.getByRole("status")).toContainText("Showing 30 days");
  await expect(page.getByRole("button", { name: "30 days" })).toHaveAttribute("aria-pressed", "true");

  const toolLinks = page.locator(".admin-tool-grid a");
  await expect(toolLinks).toHaveCount(4);
  for (const link of await toolLinks.all()) {
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^https:\/\/app\.posthog\.com\/project\/1\//);
    expect(href).not.toContain(adminPassword);
    expect(href).not.toContain(adminToken);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
  }
  await waitForAnalyticsBatchWindow(page);

  const storage = await page.evaluate(() => ({
    local: Object.fromEntries(Array.from({ length: localStorage.length }, (_, index) => {
      const key = localStorage.key(index) ?? "";
      return [key, localStorage.getItem(key)];
    })),
    session: Object.fromEntries(Array.from({ length: sessionStorage.length }, (_, index) => {
      const key = sessionStorage.key(index) ?? "";
      return [key, sessionStorage.getItem(key)];
    })),
  }));
  expect(storage.local).toEqual({});
  expect(storage.session).toEqual({ "admin-session-token": adminToken });
  expect(JSON.stringify(storage)).not.toContain(adminPassword);
  await expect(page.locator("body")).not.toContainText(adminPassword);
  await expect(page.locator("body")).not.toContainText(adminToken);
  expect(page.url()).not.toContain(adminPassword);
  expect(page.url()).not.toContain(adminToken);
  expect(evidence.consoleMessages.join("\n")).not.toContain(adminPassword);
  expect(evidence.consoleMessages.join("\n")).not.toContain(adminToken);

  for (const request of evidence.requests) {
    expect(request.url).not.toContain(adminPassword);
    expect(request.url).not.toContain(adminToken);
    expect(request.postData ?? "").not.toContain(adminToken);
    if (!request.url.endsWith("/functions/v1/admin-login")) {
      expect(request.postData ?? "").not.toContain(adminPassword);
    }
  }
  const passwordBodies = evidence.requests.filter((request) => request.postData?.includes(adminPassword));
  expect(passwordBodies).toHaveLength(1);
  expect(passwordBodies[0]?.url).toMatch(/\/functions\/v1\/admin-login$/);
  const authorizedRequests = evidence.requests.filter((request) => request.headers.authorization?.includes(adminToken));
  expect(authorizedRequests.length).toBeGreaterThan(0);
  for (const request of authorizedRequests) {
    expect(request.url).toContain("/functions/v1/admin-analytics?range=");
    expect(request.headers.authorization).toBe(`Bearer ${adminToken}`);
  }
  for (const request of evidence.requests.filter((request) => !request.url.includes("/functions/v1/admin-analytics?"))) {
    expect(JSON.stringify(request.headers)).not.toContain(adminToken);
  }
  expect(evidence.requests.filter(isPostHogTelemetryRequest)).toEqual([]);
  expect(posthogRequests).toEqual([]);

  await page.reload();
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();
  await waitForAnalyticsBatchWindow(page);
  for (const request of evidence.requests) {
    expect(request.url).not.toContain(adminPassword);
    expect(request.url).not.toContain(adminToken);
    expect(request.postData ?? "").not.toContain(adminToken);
    if (!request.url.endsWith("/functions/v1/admin-login")) expect(request.postData ?? "").not.toContain(adminPassword);
  }
  expect(evidence.consoleMessages.join("\n")).not.toContain(adminPassword);
  expect(evidence.consoleMessages.join("\n")).not.toContain(adminToken);
  expect(posthogRequests).toEqual([]);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByLabel("Password")).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem("admin-session-token"))).toBeNull();
});

test("throttled login uses a safe retry message and stores no secret", async ({ page }) => {
  await mockAdminApi(page, {
    login: () => ({ status: 429, json: { error: "Too many attempts" } }),
  });
  await page.goto("/admin");
  await page.getByLabel("Password").fill(adminPassword);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("alert")).toContainText("Too many attempts");
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await expect(page.getByLabel("Password")).toHaveValue("");
});

test("empty and partial aggregate responses remain truthful", async ({ page }) => {
  await installSession(page);
  await mockAdminApi(page, {
    analytics: (range, requestNumber) => requestNumber === 1
      ? { json: emptyReport() }
      : {
          json: {
            ...reportForRange(range),
            coverage: { requestedFrom: "2026-05-17", availableFrom: "2026-08-12", partial: true },
            reportStatus: {
              ...availableReportStatus,
              actions: { availability: "unavailable", availableFrom: "2026-08-12T00:00:00.000Z" },
              audience: { availability: "available", availableFrom: "2026-08-12T00:00:00.000Z" },
            },
            trackingHealth: "degraded",
            actions: [],
          },
        },
  });
  await page.goto("/admin");

  await expect(page.getByText("There is not enough aggregate activity yet to draw a useful chart.")).toBeVisible();
  await expect(page.getByRole("img", { name: "Traffic over time" })).toHaveCount(0);
  await page.getByRole("button", { name: "90 days" }).click();
  await expect(page.getByRole("alert")).toContainText("Partial coverage");
  await expect(page.getByRole("alert")).toContainText("August 12, 2026");
  await expect(page.getByRole("alert")).toContainText("actions");
  await expect(page.getByText("Ranked actions report is unavailable.")).toBeVisible();
  await expect(page.getByText("Tracking degraded")).toBeVisible();
});

test("upstream refresh failure keeps stale aggregates visible", async ({ page }) => {
  await installSession(page);
  await mockAdminApi(page, {
    analytics: (range, requestNumber) => requestNumber === 1
      ? { json: reportForRange(range) }
      : { status: 502, json: { error: "private upstream detail must not render" } },
  });
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();
  await page.getByRole("button", { name: "Refresh" }).click();

  await expect(page.getByRole("alert")).toContainText("Refresh unavailable");
  await expect(page.getByRole("alert")).toContainText("Showing the report last updated");
  await expect(page.getByRole("alert")).not.toContainText("private upstream detail");
  await expect(page.getByText("12", { exact: true })).toBeVisible();
});

test("expired token clears the private session and returns to login", async ({ page }) => {
  await installSession(page, "expired-qa-token");
  await mockAdminApi(page, {
    analytics: () => ({ status: 401, json: { error: "Unauthorized" } }),
  });
  await page.goto("/admin");

  await expect(page.getByRole("alert")).toContainText("Your session has expired");
  await expect(page.getByLabel("Password")).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem("admin-session-token"))).toBeNull();
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toHaveCount(0);
});

test("cold-load report failure shows a safe full-page error without aggregate data", async ({ page }) => {
  await installSession(page);
  await mockAdminApi(page, {
    analytics: () => ({ status: 502, json: { error: "private upstream detail must not render" } }),
  });
  await page.goto("/admin");

  await expect(page.getByRole("heading", { name: "Private analytics unavailable" })).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("Unable to load analytics");
  await expect(page.locator("body")).not.toContainText("private upstream detail");
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toHaveCount(0);
  await expect(page.getByText("12", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByLabel("Password")).toBeVisible();
});

test("keyboard-only login, range selection, audience tabs, and logout expose visible focus", async ({ page }) => {
  await mockAdminApi(page);
  await page.goto("/admin");

  const password = page.getByLabel("Password");
  const submit = page.getByRole("button", { name: "Sign in" });
  await tabTo(page, password);
  await page.keyboard.type(adminPassword);
  await tabTo(page, submit);
  await expectVisibleFocus(submit);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();

  const range30 = page.getByRole("button", { name: "30 days" });
  await tabTo(page, range30);
  await expectVisibleFocus(range30);
  await page.keyboard.press("Enter");
  await expect(range30).toHaveAttribute("aria-pressed", "true");
  await expect(range30).toBeFocused();

  const countryTab = page.getByRole("tab", { name: "Country" });
  await tabTo(page, countryTab);
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Device" })).toBeFocused();
  await expect(page.getByRole("tab", { name: "Device" })).toHaveAttribute("aria-selected", "true");

  const logout = page.getByRole("button", { name: "Log out" });
  await tabTo(page, logout, "backward");
  await expectVisibleFocus(logout);
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Password")).toBeVisible();
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`${viewport.name} dashboard is responsive and exposes semantic chart alternatives`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await installSession(page);
    await mockAdminApi(page);
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();

    await expectNoDocumentOverflow(page);
    await expect(page.getByRole("img", { name: "Traffic over time" })).toBeVisible();
    await expect(page.locator(".admin-chart-summary")).toContainText("Visitors peaked at 5 on Aug 14");
    await expect(page.getByRole("table", { name: "Traffic over time data" })).toBeAttached();
    const acquisition = page.getByRole("table", { name: "Acquisition sources" });
    await expect(acquisition.getByRole("columnheader", { name: "Source" })).toBeAttached();
    await expect(acquisition.getByRole("columnheader", { name: "Visitors" })).toBeAttached();
    await expect(acquisition.getByRole("columnheader", { name: "Share" })).toBeAttached();

    if (viewport.name === "mobile") {
      const undersizedControls = await page.locator(".admin-shell a, .admin-shell button").evaluateAll((controls) => controls.flatMap((control) => {
        const box = control.getBoundingClientRect();
        if (!box.width || !box.height || (box.width >= 43.5 && box.height >= 43.5)) return [];
        return [{
          label: control.getAttribute("aria-label") || control.textContent?.trim() || control.tagName,
          width: Number(box.width.toFixed(2)),
          height: Number(box.height.toFixed(2)),
        }];
      }));
      expect(undersizedControls).toEqual([]);
    }

    await page.screenshot({ path: testInfo.outputPath(`${viewport.name}-dashboard.png`), fullPage: true });
  });
}

test("reduced-motion users receive a static loading state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await installSession(page);
  await mockAdminApi(page, {
    analytics: (range) => ({ json: reportForRange(range), delayMilliseconds: 500 }),
  });
  await page.goto("/admin");

  const skeleton = page.locator(".admin-skeleton-block").first();
  await expect(skeleton).toBeVisible();
  expect(await skeleton.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.getByRole("heading", { name: "Portfolio analytics" })).toBeVisible();
});
