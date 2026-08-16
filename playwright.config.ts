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
    command: `${process.execPath} node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4173 --strictPort`,
    env: {
      VITE_ANALYTICS_TEST_MODE: "true",
      VITE_POSTHOG_HOST: "https://posthog.invalid",
      VITE_POSTHOG_KEY: "qa-public-project-key",
      VITE_POSTHOG_TEST_FLUSH_INTERVAL_MS: "250",
      VITE_SUPABASE_ANON_KEY: "qa-public-anon-key",
      VITE_SUPABASE_FUNCTIONS_URL: "http://127.0.0.1:4173/functions/v1",
    },
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
