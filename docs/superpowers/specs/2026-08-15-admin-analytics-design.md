# Admin Analytics Design

## Goal

Add anonymous behavioral analytics to `shivamkanodia.com` and provide a polished, password-protected dashboard at `/admin` while retaining GitHub Pages for the public site and dashboard frontend.

## Confirmed constraints

- Keep the existing React, Vite, TypeScript, and GitHub Pages deployment.
- The private dashboard route is `/admin`.
- Authentication uses one owner-managed password string with no email or user-account UI.
- Historical behavior from before deployment cannot be reconstructed.
- Visitor tracking is anonymous and must not attempt to discover a visitor's identity.
- Private credentials must never be shipped in the public Vite bundle.

## Architecture

The browser application has two responsibilities: send anonymous events to PostHog and render the `/admin` interface. PostHog stores events, aggregates, heatmaps, and masked session replays. Supabase provides the backend boundary through Edge Functions and a small database table used for login throttling.

`/admin` initially renders only a password form. The login function compares a server-side password hash, applies IP-hash-based throttling, and returns a short-lived signed admin token after a successful attempt. The dashboard sends that token to a separate protected analytics function, which verifies it before querying PostHog with the private API key. The PostHog private key, password hash, token-signing secret, and rate-limit salt exist only as Supabase secrets.

The PostHog browser project key is public by design and may be provided through a `VITE_` build variable. It permits event ingestion but does not grant access to analytics data.

## Authentication and security

The password itself is never stored in Git, a Vite variable, browser storage, analytics events, or logs. Deployment setup creates a salted password hash and stores it as `ADMIN_PASSWORD_HASH`. The login function performs constant-time verification.

Successful login returns a signed token with an audience restricted to the admin analytics API and a short expiration. The frontend keeps it in `sessionStorage`, so closing the tab ends the local session. It is sent only in the `Authorization` header to the protected analytics function. The dashboard provides an explicit Log out action that deletes it.

Failed logins are recorded in a Supabase table using a salted one-way hash of the requester IP, never the raw IP. Five failures within fifteen minutes trigger a fifteen-minute lockout. Successful authentication clears the corresponding failure records. Responses use the same generic message for an incorrect password and a throttled request where practical, and secrets or raw upstream errors are never returned.

All functions require HTTPS, validate request origin against `https://shivamkanodia.com` plus explicitly configured local development origins, and return restrictive CORS headers. The analytics function accepts a fixed allowlist of report names and date ranges rather than arbitrary PostHog queries.

## Tracking model

PostHog initializes only in production when its public project key and host are configured. Development and automated tests do not send production events. Tracking failures never block navigation or normal site behavior.

Stable events:

- `$pageview`: route-level page view for `/` and `/pitch`; `/admin` is excluded.
- `session_started`: anonymous visit initialization when required beyond PostHog session semantics.
- `section_viewed`: first meaningful visibility of a named section in a session, with `section_id`, `section_label`, and `visibility_threshold`.
- `section_engaged`: estimated active time in a visible section, emitted in coarse milestones rather than continuous telemetry.
- `element_clicked`: named navigation or portfolio action with `element_id`, `label`, `section_id`, and `destination_type`.
- `project_opened`: project identifier and display name.
- `resume_viewed`: resume action with its page placement.
- `external_link_clicked`: safe destination category without sensitive query strings.
- `pitch_opened`: transition into the pitch page.
- `contact_clicked`: channel value limited to `email` or `linkedin`.

Click metadata comes from explicit stable attributes or typed tracking helpers, not scraped DOM text. Section observation uses `IntersectionObserver`; engagement time counts only while the document is visible and the section remains meaningfully intersecting. The UI labels it as estimated attention rather than exact reading time.

PostHog provides anonymous visitor/session counts, session duration, bounce/engagement, referrers, UTM attribution, country-level geography, device, operating system, browser, heatmaps, paths, and session replay.

## Privacy

Session replay uses input masking and text masking by default. The tracker does not capture typed text, clipboard contents, email addresses, full query strings, form values, or private admin activity. The `/admin` route, password form, and dashboard are excluded from analytics and replay.

The custom dashboard displays country-level geography only. City-level or person-level investigation stays inside the protected PostHog application. The site does not call `identify()` because visitors do not have accounts. A concise analytics disclosure is added to the site footer or privacy note.

## Admin dashboard design

The dashboard matches the portfolio's editorial system: `--paper` page background, `--surface` cards, one-pixel `--line` borders, Instrument Sans values, IBM Plex Mono labels, cobalt primary actions, and restrained green, amber, and plum statuses. It avoids a generic rounded SaaS appearance.

The fixed header contains the `SK.` wordmark, `ANALYTICS / PRIVATE`, a portfolio link, a protected PostHog link, and Log out. Analytics is not added to the public navigation.

Dashboard order:

1. Tracking health, last refresh, and 7/30/90-day range controls.
2. Visitors, sessions, active time, bounce rate, and resume-action KPI cards.
3. Traffic-over-time chart and journey-signal summary.
4. Section-attention bars and ranked actions.
5. Acquisition table plus country/device/browser tabs.
6. Funnel from visit to Work view to portfolio action to resume action.
7. Protected links to PostHog session replay, heatmaps, path analysis, and event explorer.
8. Privacy, data-source, and timezone metadata.

The first release uses custom SVG/CSS charts and semantic HTML tables to avoid adding a heavy charting dependency. Every chart has a concise text summary and accessible tabular equivalent. Color is never the only series or status indicator.

## Responsive behavior

Desktop uses the existing site container width and a twelve-column dashboard grid. Tablet collapses KPI cards to two columns and primary modules to one column. At 700 pixels and below, modules stack, tables become ranked rows where appropriate, and the funnel becomes vertical. Controls retain at least 44-by-44-pixel targets.

## States and error handling

- Loading preserves card dimensions and respects reduced-motion preferences.
- A new installation says tracking is live but insufficient data exists; it never displays fabricated zero charts.
- Partial coverage identifies the date a metric began tracking.
- Module-level failures leave the rest of the dashboard available.
- Authentication or API failure shows a private access/error panel without revealing totals behind a blur.
- Expired tokens return the user to the password screen.
- Stale cached data remains visible with an explicit last-updated warning when refresh fails.

## Backend reports

The protected analytics function exposes fixed report keys for headline KPIs, daily trends, section attention, actions, acquisition, audience, and funnel. It validates range values of 7, 30, or 90 days, queries PostHog server-side, normalizes upstream results into stable response types, and returns the report timestamp and data-coverage start dates.

Private PostHog URLs are provided to the frontend through non-secret configuration so deep-analysis buttons can open the corresponding protected PostHog pages. Session recordings and raw visitor/event streams are not proxied into `/admin`.

## Testing and QA

Unit tests cover event metadata normalization, route exclusion, visibility/engagement thresholds, token parsing, allowed ranges, report normalization, password verification, and throttling behavior. Browser tests cover login, incorrect password, lockout messaging, token expiry, dashboard loading, empty/partial/error states, date ranges, logout, direct navigation to `/admin`, mobile layout, and keyboard access.

Production verification confirms that public pages emit the intended events, `/admin` emits none, replay masks content, secrets are absent from built assets, direct `/admin` navigation works through the GitHub Pages SPA fallback, and the deployed analytics function rejects missing, expired, malformed, or incorrectly signed tokens.

## Deployment setup

Implementation can be completed without changing hosting, but live analytics requires the owner to create or connect PostHog and Supabase projects and supply deployment secrets. GitHub Actions receives only the public PostHog project key and host. Supabase receives `ADMIN_PASSWORD_HASH`, `ADMIN_TOKEN_SECRET`, `ADMIN_RATE_LIMIT_SALT`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, and `POSTHOG_API_HOST`.

The administrator chooses the password during secret configuration. No default password is committed. Rotating the password hash or token secret invalidates future or existing sessions respectively.

## Out of scope

- Reconstructing pre-installation visitor behavior.
- Identifying anonymous visitors by name, email, or exact address.
- Capturing form contents or sensitive typed information.
- Hosting session replay recordings inside the custom dashboard.
- Replacing GitHub Pages.
- Supporting multiple administrators, password recovery, or user management in the first release.
