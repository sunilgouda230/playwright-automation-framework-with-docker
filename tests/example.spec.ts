import { test, expect } from '../fixtures/baseTest';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Testing environment variable', async ({ page }) => {
  console.log('Base URL from environment variable:', process.env.BASE_URL);
  await page.goto(process.env.BASE_URL || 'https://playwright.dev/');
});