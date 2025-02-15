import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  retries: 0,
  reporter: [
    ['list'],
    [require.resolve('./src/utils/customReporter.js')],
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'artifacts/test-results.json' }],
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'https://jupiter.cloud.planittesting.com/',
    trace: 'on',
    headless: true, // Run tests in headless mode
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: true },
    },
  ],
});