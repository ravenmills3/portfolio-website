// Runs against the static build, with the system Chrome (no browser download).
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: process.env.CONTENT ? "content.spec.ts" : "*.spec.ts",
  // Placeholder checks run only through pnpm test:content.
  testIgnore: process.env.CONTENT ? [] : ["content.spec.ts"],
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    channel: process.env.CI ? undefined : "chrome",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node tests/e2e/serve.mjs",
    url: "http://localhost:4173",
    reuseExistingServer: true,
    cwd: "../..",
  },
});
