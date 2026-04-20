# Shivam Kanodia Portfolio

Static Vite + React + TypeScript site for GitHub Pages.

## 1) Local development

```bash
npm install
npm run dev
```

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
