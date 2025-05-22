import { test, expect } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Welcome/);

  // Click the get started link.
  await page.getByRole('link', { name: 'Se connecter' }).click();

  // Expects the URL to contain login.
  await expect(page).toHaveURL(/.*login/);
});

test('login page works', async ({ page }) => {
  await page.goto('/login');

  // Fill in login form
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the homepage
  await expect(page).toHaveURL('/');
});
