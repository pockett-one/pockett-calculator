import { test, expect } from '@playwright/test';

test.describe('Keyboard Input Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scientific-calculator');
    await page.waitForSelector('.calc-display, [class*="calc-display"]');
    
    // Focus the calculator by clicking on it
    const calculatorContainer = page.locator('div[tabindex="0"]').first();
    if (await calculatorContainer.count() > 0) {
      await calculatorContainer.click();
    } else {
      // Fallback: click on the display
      await page.locator('.calc-display, [class*="calc-display"]').first().click();
    }
  });

  test('should input numbers via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Type numbers
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    
    await expect(display).toContainText('123');
  });

  test('should perform addition via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Type: 5 + 3 = 8
    await page.keyboard.press('5');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/8/);
  });

  test('should perform subtraction via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Type: 10 - 4 = 6
    await page.keyboard.press('1');
    await page.keyboard.press('0');
    await page.keyboard.press('-');
    await page.keyboard.press('4');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/6/);
  });

  test('should perform multiplication via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Type: 6 * 7 = 42
    await page.keyboard.press('6');
    await page.keyboard.press('*');
    await page.keyboard.press('7');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/42/);
  });

  test('should perform division via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Type: 20 / 4 = 5
    await page.keyboard.press('2');
    await page.keyboard.press('0');
    await page.keyboard.press('/');
    await page.keyboard.press('4');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/5/);
  });

  test('should handle decimal point via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('3');
    await page.keyboard.press('.');
    await page.keyboard.press('1');
    await page.keyboard.press('4');
    
    await expect(display).toContainText('3.14');
  });

  test('should clear via Escape key', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Input some numbers
    await page.keyboard.press('5');
    await page.keyboard.press('6');
    await expect(display).toContainText('56');
    
    // Clear with Escape
    await page.keyboard.press('Escape');
    await expect(display).toContainText('0');
  });

  test('should clear via C key', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Input some numbers
    await page.keyboard.press('7');
    await page.keyboard.press('8');
    await expect(display).toContainText('78');
    
    // Clear with C
    await page.keyboard.press('c');
    await expect(display).toContainText('0');
  });

  test('should use equals key (=)', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('4');
    await page.keyboard.press('+');
    await page.keyboard.press('4');
    await page.keyboard.press('=');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/8/);
  });

  test('should support numpad keys', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Test numpad numbers (Playwright simulates these as regular keys)
    await page.keyboard.press('Numpad1');
    await page.keyboard.press('Numpad2');
    await page.keyboard.press('Numpad3');
    
    await expect(display).toContainText('123');
  });

  test('should support numpad operators', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('Numpad5');
    await page.keyboard.press('NumpadAdd');
    await page.keyboard.press('Numpad3');
    await page.keyboard.press('NumpadEnter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/8/);
  });

  test('should not interfere when calculator is not focused', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Click outside calculator (on header)
    await page.locator('header').click();
    
    // Try typing - should not affect calculator
    await page.keyboard.press('9');
    await page.keyboard.press('9');
    await page.keyboard.press('9');
    
    // Display should still show 0 (or previous value if any)
    const displayText = await display.textContent();
    // If calculator wasn't focused, these keys shouldn't have been processed
    // This test verifies keyboard input only works when focused
    expect(displayText).not.toContain('999');
  });
});

