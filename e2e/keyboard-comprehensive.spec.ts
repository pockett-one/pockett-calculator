import { test, expect } from '@playwright/test';

test.describe('Comprehensive Keyboard Input Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scientific-calculator');
    await page.waitForSelector('.calc-display, [class*="calc-display"]');
    
    // Focus the calculator
    const calculatorContainer = page.locator('div[tabindex="0"]').first();
    if (await calculatorContainer.count() > 0) {
      await calculatorContainer.click();
      await calculatorContainer.focus();
    } else {
      await page.locator('.calc-display, [class*="calc-display"]').first().click();
    }
    
    // Wait for focus to be applied
    await expect(calculatorContainer).toBeFocused();
  });

  test('should handle all number keys (0-9)', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Clear first
    await page.keyboard.press('Escape');
    
    // Test all numbers
    for (let i = 0; i <= 9; i++) {
      await page.keyboard.press(String(i));
    }
    
    const displayText = await display.textContent();
    // Should contain all digits (0 might be at start, so check for all digits)
    expect(displayText).toMatch(/0.*1.*2.*3.*4.*5.*6.*7.*8.*9/);
  });

  test('should handle complex calculation via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    // Clear first
    await page.keyboard.press('Escape');
    
    // Complex: (10 + 5) * 2 = 30
    // Note: We'll do it step by step since we don't have parentheses in basic operations
    // 10 + 5 = 15, then manually multiply by 2
    await page.keyboard.press('1');
    await page.keyboard.press('0');
    await page.keyboard.press('+');
    await page.keyboard.press('5');
    await page.keyboard.press('Enter');
    
    let displayText = await display.textContent();
    expect(displayText).toMatch(/15/);
    
    // Continue with multiplication
    await page.keyboard.press('*');
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    
    displayText = await display.textContent();
    expect(displayText).toMatch(/30/);
  });

  test('should handle decimal calculations via keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('Escape');
    
    // 3.14 + 2.86 = 6
    await page.keyboard.press('3');
    await page.keyboard.press('.');
    await page.keyboard.press('1');
    await page.keyboard.press('4');
    await page.keyboard.press('+');
    await page.keyboard.press('2');
    await page.keyboard.press('.');
    await page.keyboard.press('8');
    await page.keyboard.press('6');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/6/);
  });

  test('should handle division with keyboard', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('Escape');
    
    // 100 / 4 = 25
    await page.keyboard.press('1');
    await page.keyboard.press('0');
    await page.keyboard.press('0');
    await page.keyboard.press('/');
    await page.keyboard.press('4');
    await page.keyboard.press('Enter');
    
    const displayText = await display.textContent();
    expect(displayText).toMatch(/25/);
  });

  test('should handle multiple operations in sequence', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('Escape');
    
    // 5 + 3 = 8, then * 2 = 16
    await page.keyboard.press('5');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    
    let displayText = await display.textContent();
    expect(displayText).toMatch(/8/);
    
    await page.keyboard.press('*');
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    
    displayText = await display.textContent();
    expect(displayText).toMatch(/16/);
  });

  test('should prevent multiple decimal points', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('Escape');
    
    await page.keyboard.press('3');
    await page.keyboard.press('.');
    await page.keyboard.press('1');
    await page.keyboard.press('.');
    await page.keyboard.press('4');
    
    const displayText = await display.textContent();
    // Should only have one decimal point
    const decimalCount = (displayText?.match(/\./g) || []).length;
    expect(decimalCount).toBeLessThanOrEqual(1);
  });

  test('should handle equals key (=) and Enter key', async ({ page }) => {
    const display = page.locator('.calc-display, [class*="calc-display"]').first();
    
    await page.keyboard.press('Escape');
    
    // Test with = key
    await page.keyboard.press('6');
    await page.keyboard.press('+');
    await page.keyboard.press('4');
    await page.keyboard.press('=');
    
    let displayText = await display.textContent();
    expect(displayText).toMatch(/10/);
    
    // Clear and test with Enter
    await page.keyboard.press('Escape');
    await page.keyboard.press('7');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    
    displayText = await display.textContent();
    expect(displayText).toMatch(/10/);
  });
});

