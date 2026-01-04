import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from './utility/envLoader';

loadEnv();
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  // ✅ Blob reporter for CI shards, HTML for local runs
  reporter: isCI
    ? [['blob']]
    : [['html', { open: 'never' }]],

  use: {
    headless: true,
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
