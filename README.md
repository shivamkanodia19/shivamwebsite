# Shivam Kanodia Portfolio

Static Vite + React + TypeScript site for GitHub Pages. The public portfolio and the password-protected `/admin` frontend are both served by GitHub Pages; Supabase Edge Functions hold private credentials and retrieve aggregate PostHog analytics.

## Local development and public browser configuration

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with the four values from `.env.example`. They are public browser configuration and are intentionally embedded in the Vite bundle:

- `VITE_POSTHOG_KEY`: the PostHog project API key used only for event ingestion.
- `VITE_POSTHOG_HOST`: the project ingestion host, such as `https://us.i.posthog.com`.
- `VITE_SUPABASE_FUNCTIONS_URL`: `https://<project-ref>.supabase.co/functions/v1`.
- `VITE_SUPABASE_ANON_KEY`: the Supabase public anonymous key.

Analytics initializes only in production builds. `npm run dev` does not send events even when `.env.local` contains live PostHog values. The Playwright suite uses the separate `VITE_ANALYTICS_TEST_MODE=true` gate with a `.invalid` sink; do not add that test-only flag to `.env.local` or deployment configuration.

Never put a password, password hash, Supabase service-role key, signing secret, rate-limit salt, or PostHog personal API key in `.env.local`, a `VITE_` variable, or GitHub Pages configuration.

## PostHog setup

1. Create or select the production PostHog project and record its public project API key, ingestion host, numeric project ID, and project URL (for example, `https://us.posthog.com/project/<id>`).
2. Create a personal API key that can run the project's aggregate queries. Treat it as server-only; it must never appear in browser configuration or GitHub Actions.
3. In PostHog session-replay settings, keep input masking enabled and set text masking to mask all text. The client also requests `maskAllInputs: true` and `maskTextSelector: "*"`; verify the project-level settings do not weaken those protections.
4. Confirm `/admin` is not captured: the client does not initialize there and stops recording when navigating into `/admin`.

## Supabase deployment

Install and authenticate the Supabase CLI, then link the intended production project. Run these commands from the repository root; replace only the project reference.

```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push
```

The migration creates the hashed-IP login throttle table and its server-only RPCs. The platform provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to deployed Edge Functions; do not set either as a browser or GitHub Pages value.

### Create and store server secrets safely

`supabase/.env.example` lists the server configuration names and safe placeholders. The live functions read these required private values: `ADMIN_PASSWORD_HASH`, `ADMIN_TOKEN_SECRET`, `ADMIN_RATE_LIMIT_SALT`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, `POSTHOG_API_HOST`, and `ANALYTICS_REPORT_START_DATES`. The implemented CORS setting is named `ADMIN_ALLOWED_ORIGINS` (the older plan name `ALLOWED_ORIGINS` is not read by the function). `POSTHOG_PROJECT_URL` is also required to create the protected PostHog deep links, but is a non-secret URL.

Set the report-start map to the exact time each report first has instrumentation. It must be a complete JSON object with `kpis`, `trend`, `sections`, `actions`, `acquisition`, `audience`, and `funnel`; all values are ISO timestamps. For a single launch, use the same timestamp for every key. `supabase/.env.example` contains a complete safe template.

The following process prompts for the owner password without echoing it or writing its cleartext to a file. It requires Deno for the PBKDF2 calculation and keeps the generated hash and random server values only in shell variables long enough to submit them to Supabase. Run it in a private terminal after `supabase link`; do not paste values into shell history, logs, screenshots, or source files.

```bash
printf "Enter new admin password: "; read -rs ADMIN_PASSWORD; printf '\n'
export ADMIN_PASSWORD
ADMIN_PASSWORD_HASH="$(deno eval 'const e=new TextEncoder(), p=Deno.env.get("ADMIN_PASSWORD"); if (!p) throw new Error("missing password"); const s=crypto.getRandomValues(new Uint8Array(16)), k=await crypto.subtle.importKey("raw",e.encode(p),"PBKDF2",false,["deriveBits"]), d=new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:s,iterations:600000},k,256)), b=(v)=>btoa(String.fromCharCode(...v)).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,""); console.log(`pbkdf2-sha256$600000$${b(s)}$${b(d)}`)')"
unset ADMIN_PASSWORD
ADMIN_TOKEN_SECRET="$(openssl rand -base64 48 | tr -d '\n')"
ADMIN_RATE_LIMIT_SALT="$(openssl rand -base64 48 | tr -d '\n')"
printf "Paste PostHog personal API key: "; read -rs POSTHOG_PERSONAL_API_KEY; printf '\n'
printf "PostHog numeric project ID: "; read -r POSTHOG_PROJECT_ID
printf "PostHog API host [https://us.posthog.com]: "; read -r POSTHOG_API_HOST; POSTHOG_API_HOST="${POSTHOG_API_HOST:-https://us.posthog.com}"
printf "PostHog project URL: "; read -r POSTHOG_PROJECT_URL
printf "Analytics report start timestamp (UTC ISO-8601): "; read -r ANALYTICS_START
ANALYTICS_REPORT_START_DATES="{\"kpis\":\"$ANALYTICS_START\",\"trend\":\"$ANALYTICS_START\",\"sections\":\"$ANALYTICS_START\",\"actions\":\"$ANALYTICS_START\",\"acquisition\":\"$ANALYTICS_START\",\"audience\":\"$ANALYTICS_START\",\"funnel\":\"$ANALYTICS_START\"}"
supabase secrets set ADMIN_PASSWORD_HASH="$ADMIN_PASSWORD_HASH" ADMIN_TOKEN_SECRET="$ADMIN_TOKEN_SECRET" ADMIN_RATE_LIMIT_SALT="$ADMIN_RATE_LIMIT_SALT" POSTHOG_PERSONAL_API_KEY="$POSTHOG_PERSONAL_API_KEY" POSTHOG_PROJECT_ID="$POSTHOG_PROJECT_ID" POSTHOG_API_HOST="$POSTHOG_API_HOST" POSTHOG_PROJECT_URL="$POSTHOG_PROJECT_URL" ANALYTICS_REPORT_START_DATES="$ANALYTICS_REPORT_START_DATES" ADMIN_ALLOWED_ORIGINS="http://localhost:5173"
unset ADMIN_PASSWORD_HASH ADMIN_TOKEN_SECRET ADMIN_RATE_LIMIT_SALT POSTHOG_PERSONAL_API_KEY POSTHOG_PROJECT_ID POSTHOG_API_HOST POSTHOG_PROJECT_URL ANALYTICS_START ANALYTICS_REPORT_START_DATES
```

`ADMIN_ALLOWED_ORIGINS` is a comma-separated allowlist for development origins. Production `https://shivamkanodia.com` is always allowed; use only explicit `http://localhost:<port>` or `http://127.0.0.1:<port>` entries for local development. Add a preview origin only when it is intentional and HTTPS. For a password rotation, repeat the password prompt and hash-creation lines through `unset ADMIN_PASSWORD`, then run `supabase secrets set ADMIN_PASSWORD_HASH="$ADMIN_PASSWORD_HASH"`, unset the hash, and deploy `admin-login`; existing browser sessions naturally expire within eight hours.

Deploy the functions after the migration and secrets are in place:

```bash
supabase functions deploy admin-login
supabase functions deploy admin-analytics
```

## GitHub Pages deployment

The Pages workflow keeps the existing SPA fallback (`dist/index.html` copied to `dist/404.html`) so direct `/admin` navigation works. In the GitHub repository, create these four Actions secrets using the public values from `.env.local`:

```bash
set -a; source .env.local; set +a
gh secret set VITE_POSTHOG_KEY --body "$VITE_POSTHOG_KEY"
gh secret set VITE_POSTHOG_HOST --body "$VITE_POSTHOG_HOST"
gh secret set VITE_SUPABASE_FUNCTIONS_URL --body "$VITE_SUPABASE_FUNCTIONS_URL"
gh secret set VITE_SUPABASE_ANON_KEY --body "$VITE_SUPABASE_ANON_KEY"
```

The build job receives only those four public `VITE_` variables. Do not add any Supabase Edge Function or PostHog personal credential to GitHub Actions. Push `main` or run the workflow manually to deploy the `dist` artifact to GitHub Pages.

## Local mock review and release validation

The unit suites use mocked PostHog and Edge Function responses, so they can review the public/admin UI without live credentials:

```bash
npm test
npm run lint
npm run test:qa
npm run build
rg -n "ADMIN_PASSWORD_HASH|ADMIN_TOKEN_SECRET|POSTHOG_PERSONAL_API_KEY|shiv" dist
```

The private secret identifiers in that scan must return no matches. The broad `shiv` term will intentionally match the public site domain and identity; inspect those matches and use `rg -n '\bshiv\b' dist` to confirm a standalone password value was not bundled. Before release, manually confirm a public page emits the expected anonymous events, `/admin` emits no PostHog requests or replay data, the replay masks content, direct `/admin` navigation works after a refresh, an invalid password is rejected, valid credentials show only aggregate reports, and the deployed function rejects missing or expired tokens.

## Custom domain

`public/CNAME` is already included with `shivamkanodia.com`. Point apex DNS to GitHub Pages A records:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

`public/.nojekyll` is included, and build output writes `dist/404.html` from `dist/index.html` for SPA fallback.
