import { copyFileSync, existsSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

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
      name: "copy-index-to-404",
      closeBundle() {
        const dist = path.resolve(__dirname, "dist");
        const indexPath = path.join(dist, "index.html");
        const out404 = path.join(dist, "404.html");
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, out404);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
