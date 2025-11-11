import { test, expect } from '@playwright/test';

test.describe('Homepage Calculator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.calc-display, [class*="calc-display"]', { timeout: 5000 });
  });

  test('should display calculator on homepage', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toBeVisible();
    await expect(display).toContainText(/0|[\d.]/);
  });

  test('should input numbers via button clicks on homepage', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Click number buttons
    const button7 = page.locator('button:has-text("7")').first();
    const button8 = page.locator('button:has-text("8")').first();
    const button9 = page.locator('button:has-text("9")').first();
    
    if (await button7.count() > 0) {
      await button7.click();
      await button8.click();
      await button9.click();
      
      const displayText = await display.textContent();
      expect(displayText).toMatch(/789/);
    }
  });

  test('should perform addition on homepage calculator', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Find and click calculator buttons
    const button5 = page.locator('button:has-text("5")').first();
    const buttonPlus = page.locator('button:has-text("+")').first();
    const button3 = page.locator('button:has-text("3")').first();
    const buttonEquals = page.locator('button:has-text("=")').first();
    
    if (await button5.count() > 0) {
      await button5.click();
      await buttonPlus.click();
      await button3.click();
      await buttonEquals.click();
      
      const displayText = await display.textContent();
      expect(displayText).toMatch(/8/);
    }
  });

  test('should support keyboard input on homepage calculator', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Focus the page (homepage calculator works globally)
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/123/);
  });

  test('should perform keyboard operations on homepage', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Clear first
    await page.keyboard.press('Escape');
    
    // Perform calculation: 4 + 4 = 8
    await page.keyboard.press('4');
    await page.keyboard.press('+');
    await page.keyboard.press('4');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/8/);
  });
});

