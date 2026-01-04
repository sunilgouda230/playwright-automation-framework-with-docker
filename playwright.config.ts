import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from './utility/envLoader';

/**
 * Load environment variables (e.g., BASE_URL) from your utility.
 */
loadEnv();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI to avoid resource contention in shards. */
  workers: isCI ? 1 : undefined,

  /**
   * REPORTER CONFIGURATION
   * In CI: We use 'blob' which is required for sharding. 
   * Locally: We use 'html' for a better developer experience.
   */
  reporter: isCI ? 'blob' : 'html',

  use: {
    /* Base URL loaded from your env utility */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    
    /* Standard headless mode for CI */
    headless: true,

    /* Optional: Action timeout to prevent hanging tests */
    actionTimeout: 15000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /** * You can uncomment these as you expand your testing:
     * {
     * name: 'firefox',
     * use: { ...devices['Desktop Firefox'] },
     * },
     * {
     * name: 'webkit',
     * use: { ...devices['Desktop Safari'] },
     * },
     */
  ],
});