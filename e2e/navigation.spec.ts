import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Pockett Calculator/);
    await expect(page.locator('h1')).toContainText('Pockett Calculator');
  });

  test('should navigate to scientific calculator', async ({ page }) => {
    await page.click('a[href="/scientific-calculator"]');
    await expect(page).toHaveURL(/.*scientific-calculator/);
    await expect(page.locator('h1, h2')).toContainText(/Scientific Calculator/i);
  });

  test('should navigate to percentage calculator', async ({ page }) => {
    await page.click('a[href="/percentage-calculator"]');
    await expect(page).toHaveURL(/.*percentage-calculator/);
    await expect(page.locator('h1, h2')).toContainText(/Percentage Calculator/i);
  });

  test('should navigate to fraction calculator', async ({ page }) => {
    await page.click('a[href="/fraction-calculator"]');
    await expect(page).toHaveURL(/.*fraction-calculator/);
    await expect(page.locator('h1, h2')).toContainText(/Fraction Calculator/i);
  });

  test('should navigate to age calculator', async ({ page }) => {
    await page.click('a[href="/age-calculator"]');
    await expect(page).toHaveURL(/.*age-calculator/);
    await expect(page.locator('h1, h2')).toContainText(/Age Calculator/i);
  });

  test('should navigate to FAQ page', async ({ page }) => {
    await page.click('a[href="/faq"]');
    await expect(page).toHaveURL(/.*faq/);
    await expect(page.locator('h1')).toContainText(/Frequently Asked Questions/i);
  });

  test('should navigate to privacy page', async ({ page }) => {
    await page.click('a[href="/privacy"]');
    await expect(page).toHaveURL(/.*privacy/);
    await expect(page.locator('h1, h2')).toContainText(/Privacy Policy/i);
  });

  test('should navigate to terms page', async ({ page }) => {
    await page.click('a[href="/terms"]');
    await expect(page).toHaveURL(/.*terms/);
    await expect(page.locator('h1, h2')).toContainText(/Terms of Service/i);
  });

  test('should navigate back to homepage from calculator', async ({ page }) => {
    await page.goto('/scientific-calculator');
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Pockett Calculator');
  });

  test('should have working header navigation', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check logo link
    const logoLink = header.locator('a[href="/"]');
    await expect(logoLink).toBeVisible();
    
    // Check navigation links exist
    const navLinks = header.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have working footer navigation', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check footer links
    const footerLinks = footer.locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
    
    // Check FAQ link exists
    const faqLink = footer.locator('a[href="/faq"]');
    await expect(faqLink).toBeVisible();
  });
});

