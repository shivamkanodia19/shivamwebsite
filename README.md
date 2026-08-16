# Shivam Kanodia Portfolio

Static Vite + React + TypeScript site for GitHub Pages.

## 1) Local development

```bash
npm install
npm run dev
```

### Analytics function secrets

Copy `supabase/.env.example` values into Supabase Edge Function secrets. Required secrets are `ADMIN_PASSWORD_HASH`, `ADMIN_TOKEN_SECRET`, `ADMIN_RATE_LIMIT_SALT`, `POSTHOG_API_HOST`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, and `ANALYTICS_REPORT_START_DATES`.

`ANALYTICS_REPORT_START_DATES` must be a complete JSON object containing `kpis`, `trend`, `sections`, `actions`, `acquisition`, `audience`, and `funnel`. Each value is the ISO date/time when that report's instrumentation became available; use the same timestamp for every key when all instrumentation launches together.

## 2) Build and deploy to `gh-pages`

```bash
npm run build
```

Then publish the **contents of `dist/`** to your `gh-pages` branch (or use your GitHub Actions Pages workflow to deploy `dist`).

## 3) Custom domain

`public/CNAME` is already included with:

```txt
shivamkanodia.com
```

Point apex DNS to GitHub Pages A records:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

## Notes

- `public/.nojekyll` is included.
- `public/404.html` matches `index.html` template, and build output also writes `dist/404.html` from built `dist/index.html` for SPA fallback.
