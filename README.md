# Shivam Kanodia — portfolio deck

Fullscreen investor-style pitch deck built with **Vite**, **React**, **TypeScript**, **Framer Motion**, and **Tailwind CSS** (v4). The production bundle under `dist/` is fully static and ready for **GitHub Pages**.

## Local development

```bash
npm install
npm run dev
```

The dev server defaults to port `8080` (see `vite.config.ts`).

## Production build

```bash
npm run build
```

Output is written to `dist/`. A `404.html` that matches the built `index.html` is written to `dist/` at the end of the build so GitHub Pages serves the SPA for unknown routes.

## Deploy to GitHub Pages

1. Run `npm run build`.
2. Push the contents of `dist/` to the `gh-pages` branch, or configure **GitHub Actions → Pages** to publish the `dist` artifact from CI (see `.github/workflows/deploy.yml`).
3. In the repository **Pages** settings, set the source to the branch or workflow output you use.

## Custom domain

`public/CNAME` contains `shivamkanodia.com`. It is copied into `dist/` on build. In your DNS provider, add the records GitHub documents for your apex or `www` subdomain, and enable **Enforce HTTPS** in the repo Pages settings once the certificate is issued.

## Static hosting notes

- `public/.nojekyll` prevents Jekyll from stripping paths that start with `_`.
- Root `index.html` and `public/404.html` are the same template; **production** `dist/404.html` is replaced during `vite build` so asset hashes match `index.html`.
