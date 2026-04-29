import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Important: do NOT pass `-s` here. The Next.js static export uses
    // `trailingSlash: true` and writes a real `out/es/index.html`. The `-s`
    // (single-page-app) flag would rewrite all unknown paths to the root
    // English index, which would mask localised pages in tests and prod-like
    // dry-runs alike. Cloudflare Pages serves the bare directory layout.
    command: "npx serve out -l 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
