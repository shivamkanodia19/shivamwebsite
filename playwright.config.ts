import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  outputDir: "test-results/playwright",
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "./node_modules/.bin/vite --host 127.0.0.1 --port 4173 --strictPort",
    env: {
      VITE_POSTHOG_HOST: "https://us.i.posthog.com",
      VITE_POSTHOG_KEY: "qa-public-project-key",
      VITE_SUPABASE_ANON_KEY: "qa-public-anon-key",
      VITE_SUPABASE_FUNCTIONS_URL: "http://127.0.0.1:4173/functions/v1",
    },
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
