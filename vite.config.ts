import { copyFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const spaRoutes = [
  "pitch",
  "admin",
  "work/matic",
  "work/legends",
  "work/clinicalhours",
];

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "spa-fallback-pages",
      closeBundle() {
        const dist = path.resolve(__dirname, "dist");
        const indexPath = path.join(dist, "index.html");
        if (!existsSync(indexPath)) return;

        copyFileSync(indexPath, path.join(dist, "404.html"));

        for (const route of spaRoutes) {
          const dir = path.join(dist, route);
          mkdirSync(dir, { recursive: true });
          copyFileSync(indexPath, path.join(dir, "index.html"));
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.unit.test.ts?(x)"],
  },
});
