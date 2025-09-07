// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail build on CI if test.only is left
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Parallel workers (1 on CI to avoid conflicts)
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
  ],

  use: {
    headless: true, // Headless browsers
    navigationTimeout: 120000, // 2 minutes for slow pages
    actionTimeout: 60000, // 1 minute for clicks, fills, etc.
    trace: 'retain-on-failure',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',

    launchOptions: {
      args: [
        '--disable-dev-shm-usage', // Prevent /dev/shm errors
      ],
      // Do NOT set a fixed remote debugging port to avoid conflicts
    },

    contextOptions: {
      recordHar: { path: 'test-results/network.har' },
    },
  },

  // Browser projects
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
