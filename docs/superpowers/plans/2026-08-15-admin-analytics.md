# Admin Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add privacy-conscious visitor tracking and a password-protected analytics dashboard at `/admin` while retaining GitHub Pages deployment.

**Architecture:** The React application sends anonymous, typed events to PostHog and renders the public portfolio plus a private admin dashboard. Supabase Edge Functions verify a single password, issue short-lived HMAC-signed tokens, rate-limit failed logins, and proxy a fixed set of aggregate PostHog reports without exposing private credentials.

**Tech Stack:** React 18, TypeScript 5, Vite 5, React Router 7, PostHog JS, Supabase Edge Functions/Deno, Supabase Postgres, Vitest, Testing Library, Playwright.

## Global Constraints

- Keep GitHub Pages and the existing `dist/index.html` to `dist/404.html` SPA fallback.
- Serve the private dashboard at `/admin` and do not add it to public navigation.
- Use one server-side password string with no email or user-account system.
- Never commit the password, password hash, token secret, rate-limit salt, or PostHog private API key.
- Exclude `/admin` from PostHog analytics and session replay.
- Do not collect typed text, clipboard contents, form values, email addresses, or sensitive URL query data.
- Use development and QA subagents with review gates before completion.

---

## File Structure

- `src/analytics/events.ts`: typed public event names and safe property schemas.
- `src/analytics/client.ts`: PostHog initialization, route exclusion, capture, and test reset boundary.
- `src/analytics/usePageTracking.ts`: React route-view tracking.
- `src/analytics/useSectionTracking.ts`: visibility and active-attention instrumentation.
- `src/analytics/TrackedLink.tsx`: reusable safe click tracking for anchors.
- `src/admin/api.ts`: login/report API client and session token storage.
- `src/admin/types.ts`: stable frontend/backend report contracts.
- `src/admin/AdminPage.tsx`: authentication and dashboard state coordinator.
- `src/admin/AdminLogin.tsx`: accessible password form.
- `src/admin/AdminDashboard.tsx`: dashboard composition and report states.
- `src/admin/AdminCharts.tsx`: lightweight SVG trend and bar visuals with accessible summaries.
- `src/admin/admin.css`: isolated dashboard styling using existing design tokens.
- `supabase/functions/_shared/auth.ts`: password verification and HMAC admin-token functions.
- `supabase/functions/_shared/cors.ts`: strict origin validation and response headers.
- `supabase/functions/_shared/posthog.ts`: fixed PostHog query builders and response normalization.
- `supabase/functions/admin-login/index.ts`: password verification and throttled login endpoint.
- `supabase/functions/admin-analytics/index.ts`: authenticated aggregate report endpoint.
- `supabase/migrations/202608150001_admin_login_attempts.sql`: hashed-IP login throttle storage and cleanup indexes.
- `tests/analytics.unit.test.tsx`: browser analytics unit tests.
- `tests/admin.unit.test.tsx`: admin UI and API unit tests.
- `supabase/functions/tests/auth_test.ts`: backend authentication tests.
- `supabase/functions/tests/posthog_test.ts`: report validation/normalization tests.
- `tests/admin-analytics.spec.ts`: end-to-end admin behavior and responsive QA.
- `.env.example`: public browser configuration names only.
- `supabase/.env.example`: documented server secret names with non-secret explanatory values.
- `README.md`: local setup, secret generation, PostHog/Supabase setup, and deployment verification.

---

### Task 1: Test Infrastructure and Typed Analytics Boundary

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Create: `src/analytics/events.ts`
- Create: `src/analytics/client.ts`
- Create: `tests/analytics.unit.test.tsx`

**Interfaces:**
- Produces: `AnalyticsEventName`, `AnalyticsEventProperties`, `captureAnalyticsEvent()`, `initializeAnalytics()`, `isTrackablePath()`.
- Consumes: `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`.

- [ ] **Step 1: Add the unit-test dependencies and scripts**

Run:

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
npm install posthog-js
```

Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Configure Vite test environment as `jsdom`, with test files matching `tests/**/*.unit.test.ts?(x)`.

- [ ] **Step 2: Write failing tests for the analytics boundary**

Cover these assertions in `tests/analytics.unit.test.tsx`:

```tsx
expect(isTrackablePath("/")).toBe(true);
expect(isTrackablePath("/pitch")).toBe(true);
expect(isTrackablePath("/admin")).toBe(false);
expect(isTrackablePath("/admin/reports")).toBe(false);
```

Mock `posthog-js` and assert initialization enables masked session replay, disables automatic person profiles, and never initializes without both public variables. Assert `captureAnalyticsEvent()` drops unknown properties and refuses to capture on `/admin`.

- [ ] **Step 3: Run the focused test and verify failure**

Run: `npm test -- tests/analytics.unit.test.tsx`

Expected: FAIL because the analytics modules do not exist.

- [ ] **Step 4: Implement the typed analytics boundary**

Define an explicit event map:

```ts
export type AnalyticsEventProperties = {
  section_viewed: { section_id: string; section_label: string; visibility_threshold: number };
  section_engaged: { section_id: string; active_milliseconds: number };
  element_clicked: { element_id: string; label: string; section_id: string; destination_type: string };
  project_opened: { project_id: string; project_name: string };
  resume_viewed: { placement: string };
  external_link_clicked: { destination_type: string };
  pitch_opened: Record<string, never>;
  contact_clicked: { channel: "email" | "linkedin" };
};
```

Initialize PostHog with anonymous profiles, masked inputs/text, no capture on `/admin`, and a no-op behavior when configuration is absent.

- [ ] **Step 5: Run tests, lint, and build**

Run:

```bash
npm test -- tests/analytics.unit.test.tsx
npm run lint
npm run build
```

Expected: all commands exit 0 and built assets contain no private secret names.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/analytics tests/analytics.unit.test.tsx
git commit -m "feat: add typed analytics boundary"
```

---

### Task 2: Portfolio Event and Engagement Instrumentation

**Files:**
- Create: `src/analytics/usePageTracking.ts`
- Create: `src/analytics/useSectionTracking.ts`
- Create: `src/analytics/TrackedLink.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/ProfileSections.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/pages/PitchPage.tsx`
- Modify: `tests/analytics.unit.test.tsx`

**Interfaces:**
- Consumes: `captureAnalyticsEvent()` from Task 1.
- Produces: `usePageTracking()`, `useSectionTracking(sectionDefinitions)`, and `TrackedLink`.

- [ ] **Step 1: Write failing page, click, visibility, and active-time tests**

Use a mocked `IntersectionObserver`, fake timers, and `document.visibilityState`. Assert:

- `/` and `/pitch` each emit one `$pageview` per navigation.
- `/admin` emits no event.
- a section emits `section_viewed` once after reaching at least 50% visibility.
- engagement time pauses while the tab is hidden.
- resume links report their placement.
- email clicks report only `{ channel: "email" }`, never the email address.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/analytics.unit.test.tsx`

Expected: FAIL on missing hooks and tracked link component.

- [ ] **Step 3: Implement route and section hooks**

Use `useLocation()` to capture explicit pageviews. Use one shared observer for named section IDs and emit coarse `section_engaged` milestones at 10, 30, and 60 active seconds to cap event volume.

- [ ] **Step 4: Instrument stable public actions**

Add explicit IDs/labels for navigation, hero work, resume placements, Matic, Legends, ClinicalHours, research poster, project/build links, powerlifting, LinkedIn, email, and pitch. Do not scrape element text or URL query strings.

- [ ] **Step 5: Run unit tests and Playwright portfolio regression**

Run:

```bash
npm test -- tests/analytics.unit.test.tsx
npm run test:qa
```

Expected: unit and existing portfolio QA tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/analytics src/App.tsx src/components src/pages tests/analytics.unit.test.tsx
git commit -m "feat: track portfolio engagement"
```

---

### Task 3: Supabase Authentication and Rate Limiting Backend

**Files:**
- Create: `supabase/config.toml`
- Create: `supabase/migrations/202608150001_admin_login_attempts.sql`
- Create: `supabase/functions/_shared/auth.ts`
- Create: `supabase/functions/_shared/cors.ts`
- Create: `supabase/functions/admin-login/index.ts`
- Create: `supabase/functions/tests/auth_test.ts`
- Create: `supabase/.env.example`

**Interfaces:**
- Produces: `verifyPassword(password): Promise<boolean>`, `issueAdminToken(now): Promise<string>`, `verifyAdminToken(token, now): Promise<boolean>`, `corsHeaders(origin)`, and `POST /admin-login`.
- Login request: `{ "password": string }`.
- Success response: `{ "token": string, "expiresAt": string }`.
- Error response: `{ "error": "Invalid password" | "Too many attempts" | "Invalid request" }`.

- [ ] **Step 1: Write failing Deno tests for password and token behavior**

Cover correct password, incorrect password, constant response shape, valid token, modified signature, wrong audience, and expiration. Inject secrets and clock through test parameters rather than global mutation.

- [ ] **Step 2: Run the focused Deno test and verify failure**

Run: `deno test supabase/functions/tests/auth_test.ts`

Expected: FAIL because shared authentication modules do not exist.

- [ ] **Step 3: Implement password hashing and token signing**

Use Web Crypto PBKDF2-SHA-256 with a per-hash random salt and at least 600,000 iterations for password verification. Use HMAC-SHA-256 for a compact signed token containing `aud: "admin-analytics"`, `iat`, and `exp` no more than eight hours after issue. Compare derived values without early exit.

- [ ] **Step 4: Add rate-limit storage**

Create `admin_login_attempts` with `ip_hash`, `attempted_at`, and an index on both fields. Revoke public table access. Hash the normalized forwarding IP with `ADMIN_RATE_LIMIT_SALT`; store no raw address. Reject five failures in fifteen minutes and clear that hash's failures after successful login.

- [ ] **Step 5: Implement the login Edge Function**

Require JSON POST, enforce allowed origins, cap password length, apply throttling, verify the hash, issue the token, and set `Cache-Control: no-store`. Never log passwords, request bodies, derived hashes, or secrets.

- [ ] **Step 6: Run backend tests**

Run: `deno test supabase/functions/tests/auth_test.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add supabase
git commit -m "feat: add password protected admin backend"
```

---

### Task 4: Protected PostHog Aggregate Reports

**Files:**
- Create: `src/admin/types.ts`
- Create: `supabase/functions/_shared/posthog.ts`
- Create: `supabase/functions/admin-analytics/index.ts`
- Create: `supabase/functions/tests/posthog_test.ts`

**Interfaces:**
- Consumes: `verifyAdminToken()` and `corsHeaders()` from Task 3.
- Request: `GET /admin-analytics?range=7|30|90` with `Authorization: Bearer <token>`.
- Produces: `AdminAnalyticsResponse` with `generatedAt`, `rangeDays`, `coverage`, `kpis`, `trend`, `sections`, `actions`, `acquisition`, `audience`, `funnel`, and `posthogLinks`.

- [ ] **Step 1: Define stable response types**

Use explicit types such as:

```ts
export type MetricValue = { value: number | null; previous: number | null; deltaPercent: number | null };
export type TrendPoint = { date: string; visitors: number; sessions: number; resumeViews: number };
export type RankedValue = { label: string; visitors: number; total: number; share: number };
```

Keep backend JSON field names identical to frontend types.

- [ ] **Step 2: Write failing query validation and normalization tests**

Assert only 7, 30, or 90 are accepted; malformed upstream rows become a controlled module error; absent data becomes `null` or an empty array rather than a fabricated zero; and PostHog links are limited to configured project URLs.

- [ ] **Step 3: Run the focused test and verify failure**

Run: `deno test supabase/functions/tests/posthog_test.ts`

Expected: FAIL because PostHog helpers do not exist.

- [ ] **Step 4: Implement fixed query builders**

Build server-owned HogQL/query payloads for KPIs, daily trend, section events, named actions, referrer/UTM acquisition, country/device/browser groups, and the four-stage funnel. Never accept raw query text, event names, properties, or report URLs from the client.

- [ ] **Step 5: Implement the protected report endpoint**

Verify the bearer token before any PostHog request, validate the range, fetch reports with bounded timeouts, normalize partial failures, apply `Cache-Control: private, max-age=60`, and return no person identifiers or raw events.

- [ ] **Step 6: Run backend tests**

Run:

```bash
deno test supabase/functions/tests/auth_test.ts
deno test supabase/functions/tests/posthog_test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/admin/types.ts supabase/functions
git commit -m "feat: expose protected analytics reports"
```

---

### Task 5: Admin Login and API State

**Files:**
- Create: `src/admin/api.ts`
- Create: `src/admin/AdminLogin.tsx`
- Create: `src/admin/AdminPage.tsx`
- Create: `tests/admin.unit.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: login and analytics endpoints from Tasks 3–4.
- Produces: `login(password)`, `fetchAnalytics(range, token)`, `getSessionToken()`, `clearSessionToken()`, and `/admin` route.

- [ ] **Step 1: Write failing authentication-state tests**

Assert direct `/admin` navigation shows only the password form, the password is never persisted, successful login stores only the token in `sessionStorage`, logout clears it, expired/401 responses return to login, and `/admin` does not initialize PostHog.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/admin.unit.test.tsx`

Expected: FAIL because admin modules do not exist.

- [ ] **Step 3: Implement the API client**

Read `VITE_SUPABASE_FUNCTIONS_URL` and `VITE_SUPABASE_ANON_KEY`, send the anonymous key only as required by Supabase function routing, send the admin token as bearer authorization for reports, use `AbortController` timeouts, and map server errors to safe UI messages.

- [ ] **Step 4: Implement the login screen and route coordinator**

Use an accessible labeled password field, submit button, generic invalid-password message, throttling message, pending state, and portfolio return link. Never render dashboard content until a report request succeeds with a valid token.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test -- tests/admin.unit.test.tsx
npm run build
```

Expected: PASS and direct route exists in the SPA bundle.

- [ ] **Step 6: Commit**

```bash
git add src/admin src/App.tsx tests/admin.unit.test.tsx
git commit -m "feat: add private admin login"
```

---

### Task 6: Polished Analytics Dashboard UI

**Files:**
- Create: `src/admin/AdminDashboard.tsx`
- Create: `src/admin/AdminCharts.tsx`
- Create: `src/admin/admin.css`
- Modify: `src/admin/AdminPage.tsx`
- Modify: `tests/admin.unit.test.tsx`

**Interfaces:**
- Consumes: `AdminAnalyticsResponse`, range selection callback, refresh callback, and logout callback.
- Produces: responsive dashboard modules and accessible chart summaries.

- [ ] **Step 1: Write failing rendering and accessibility tests**

Render a fixed response fixture and assert one `h1`, ordered module headings, all KPI labels, semantic acquisition table headers, 7/30/90-day controls, empty/partial/error copy, logout, protected PostHog link labels, and no raw visitor identities.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/admin.unit.test.tsx`

Expected: FAIL on missing dashboard modules.

- [ ] **Step 3: Build the dashboard composition**

Implement tracking status, KPI strip, SVG trend chart, journey signals, section bars, ranked actions, acquisition table, audience tabs, vertical/horizontal funnel, qualitative-tool links, and privacy metadata in the approved order.

- [ ] **Step 4: Implement visual and responsive states**

Reuse existing CSS variables and fonts. Add desktop twelve-column layout, tablet two-column KPIs, stacked mobile modules, 44-pixel controls, reduced-motion loading treatment, high-contrast focus states, truthful new-installation copy, partial-data banners, card-level errors, and stale-data timestamp.

- [ ] **Step 5: Add accessible chart alternatives**

Each SVG chart receives a text summary and hidden semantic data table. Series use line style or marker differences in addition to color. Range updates use `aria-live="polite"` without moving focus.

- [ ] **Step 6: Run unit, lint, and build checks**

Run:

```bash
npm test -- tests/admin.unit.test.tsx
npm run lint
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit**

```bash
git add src/admin tests/admin.unit.test.tsx
git commit -m "feat: build admin analytics dashboard"
```

---

### Task 7: Deployment Configuration and Operator Documentation

**Files:**
- Create: `.env.example`
- Modify: `.github/workflows/deploy.yml`
- Modify: `README.md`
- Modify: `public/robots.txt`

**Interfaces:**
- Consumes public GitHub secrets `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `VITE_SUPABASE_FUNCTIONS_URL`, and `VITE_SUPABASE_ANON_KEY`.
- Documents Supabase secrets `ADMIN_PASSWORD_HASH`, `ADMIN_TOKEN_SECRET`, `ADMIN_RATE_LIMIT_SALT`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, `POSTHOG_API_HOST`, and `ALLOWED_ORIGINS`.

- [ ] **Step 1: Add public build-variable wiring**

Expose only the four public browser variables to the build job. Keep all private values out of GitHub Pages build configuration.

- [ ] **Step 2: Exclude the admin route from indexing**

Add `Disallow: /admin` to `public/robots.txt` while retaining existing crawler rules.

- [ ] **Step 3: Document reproducible setup**

Document PostHog project creation, replay masking configuration, Supabase migration/function deployment, creation of the `shiv` password hash without writing the cleartext password to a file, secret-setting commands, local origins, public GitHub secrets, password rotation, function deployment, and validation steps.

- [ ] **Step 4: Verify secret absence and production build**

Run:

```bash
npm run build
rg -n "ADMIN_PASSWORD_HASH|ADMIN_TOKEN_SECRET|POSTHOG_PERSONAL_API_KEY|shiv" dist
```

Expected: build succeeds and `rg` returns no matches.

- [ ] **Step 5: Commit**

```bash
git add .env.example .github/workflows/deploy.yml README.md public/robots.txt
git commit -m "docs: configure analytics deployment"
```

---

### Task 8: End-to-End and Independent QA Gate

**Files:**
- Create: `tests/admin-analytics.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `scripts/audit-layout.mjs` if its route allowlist requires `/admin`.

**Interfaces:**
- Consumes: completed public instrumentation, mocked Edge Function responses, and dashboard UI.
- Produces: end-to-end proof for auth, dashboard, privacy exclusions, responsiveness, and regressions.

- [ ] **Step 1: Write Playwright admin scenarios**

Mock function endpoints and cover incorrect password, successful login, range switching, empty data, partial coverage, upstream error, expired token, logout, reload in the same tab, direct `/admin` navigation, and protected external links.

- [ ] **Step 2: Add privacy assertions**

Intercept outbound requests and assert `/admin` sends no requests to PostHog ingestion/replay endpoints. Assert the password is absent from local storage, session storage, page text after login, URLs, console output, and analytics request bodies.

- [ ] **Step 3: Add responsive and accessibility assertions**

Run desktop, tablet, and mobile viewports; assert no horizontal overflow, minimum control sizes, keyboard-only login/range/logout flows, visible focus, reduced-motion behavior, semantic tables, and chart summaries.

- [ ] **Step 4: Run the complete verification suite**

Run:

```bash
npm test
npm run lint
npm run build
npm run test:qa
deno test supabase/functions/tests/auth_test.ts supabase/functions/tests/posthog_test.ts
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 5: Perform independent QA review**

Assign a QA subagent that did not implement the relevant code. Require it to inspect the spec, plan, changed files, test evidence, security boundary, responsive UI, and secret scan. Resolve every high- or medium-severity finding or document a concrete external-service blocker.

- [ ] **Step 6: Commit the QA suite**

```bash
git add tests/admin-analytics.spec.ts playwright.config.ts scripts/audit-layout.mjs
git commit -m "test: verify private analytics experience"
```

---

## External Setup Boundary

The codebase can be fully implemented and tested with mocked PostHog/Supabase responses. Live deployment additionally requires authenticated access to create the PostHog and Supabase projects, set their secrets, apply the migration, deploy the Edge Functions, and configure GitHub repository secrets. If those credentials are unavailable during implementation, completion means the repository is production-ready with exact operator commands, while live data collection remains explicitly pending external setup.
