import { test, expect } from '@playwright/test';

test.describe('Calculator Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scientific-calculator');
    // Wait for calculator to be visible
    await page.waitForSelector('.calc-display, [class*="calc-display"]');
  });

  test('should display initial value of 0', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('0');
  });

  test('should input numbers via button clicks', async ({ page }) => {
    // Click number buttons
    await page.click('button:has-text("7")');
    await page.click('button:has-text("8")');
    await page.click('button:has-text("9")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('789');
  });

  test('should perform addition', async ({ page }) => {
    // Input: 5 + 3 = 8
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('8');
  });

  test('should perform subtraction', async ({ page }) => {
    // Input: 10 - 4 = 6
    await page.click('button:has-text("1")');
    await page.click('button:has-text("0")');
    try {
      await page.click('button:has-text("−")');
    } catch (e) {
      await page.click('button:has-text("-")');
    }
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    const displayText = await display.textContent();
    expect(displayText).toMatch(/6/);
  });

  test('should perform multiplication', async ({ page }) => {
    // Input: 6 × 7 = 42
    await page.click('button:has-text("6")');
    await page.click('button:has-text("×")');
    await page.click('button:has-text("7")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('42');
  });

  test('should perform division', async ({ page }) => {
    // Input: 20 ÷ 4 = 5
    await page.click('button:has-text("2")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("÷")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('5');
  });

  test('should handle decimal input', async ({ page }) => {
    await page.click('button:has-text("3")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("4")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('3.14');
  });

  test('should clear calculator', async ({ page }) => {
    // Input some numbers
    await page.click('button:has-text("5")');
    await page.click('button:has-text("6")');
    
    // Clear
    await page.locator('button').filter({ hasText: /^(C|AC)$/ }).click();
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('0');
  });

  test('should perform scientific functions - square root', async ({ page }) => {
    // Input: √16 = 4
    await page.click('button:has-text("1")');
    await page.click('button:has-text("6")');
    await page.click('button:has-text("√")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    const displayText = await display.textContent();
    expect(displayText).toMatch(/4/);
  });

  test('should perform scientific functions - square', async ({ page }) => {
    // Input: 5² = 25
    await page.click('button:has-text("5")');
    await page.click('button:has-text("x²"), button:has-text("²")');
    
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    await expect(display).toContainText('25');
  });
});

