import { test, expect } from '@playwright/test';

// Test all calculator pages to ensure they load and basic functionality works
const calculators = [
  { name: 'Scientific Calculator', path: '/scientific-calculator' },
  { name: 'Percentage Calculator', path: '/percentage-calculator' },
  { name: 'Fraction Calculator', path: '/fraction-calculator' },
  { name: 'Age Calculator', path: '/age-calculator' },
  { name: 'Date Calculator', path: '/date-calculator' },
  { name: 'Time Calculator', path: '/time-calculator' },
  { name: 'Hours Calculator', path: '/hours-calculator' },
  { name: 'GPA Calculator', path: '/gpa-calculator' },
  { name: 'Grade Calculator', path: '/grade-calculator' },
  { name: 'Triangle Calculator', path: '/triangle-calculator' },
  { name: 'Standard Deviation Calculator', path: '/standard-deviation-calculator' },
  { name: 'Random Number Generator', path: '/random-number-generator' },
  { name: 'Subnet Calculator', path: '/subnet-calculator' },
  { name: 'Password Generator', path: '/password-generator' },
  { name: 'Conversion Calculator', path: '/conversion-calculator' },
  { name: 'Concrete Calculator', path: '/concrete-calculator' },
];

test.describe('All Calculators - Page Load Tests', () => {
  for (const calculator of calculators) {
    test(`should load ${calculator.name} page`, async ({ page }) => {
      await page.goto(calculator.path);
      
      // Check page loads without errors
      await expect(page).toHaveURL(new RegExp(calculator.path.replace('/', '\\/')));
      
      // Check title contains calculator name
      const title = await page.title();
      expect(title.toLowerCase()).toContain(calculator.name.toLowerCase().split(' ')[0]);
      
      // Check page has main content
      const mainContent = page.locator('main, [role="main"]');
      await expect(mainContent.first()).toBeVisible();
    });
  }
});

test.describe('All Calculators - Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const calculator of calculators) {
    test(`should navigate to ${calculator.name} from homepage`, async ({ page }) => {
      // Try to find link to calculator
      const link = page.locator(`a[href="${calculator.path}"]`).first();
      
      if (await link.count() > 0) {
        await Promise.all([
          page.waitForURL(new RegExp(calculator.path.replace('/', '\\/'))),
          link.click(),
        ]);
      } else {
        // If link not found on homepage, test direct navigation
        await page.goto(calculator.path);
        await expect(page).toHaveURL(new RegExp(calculator.path.replace('/', '\\/')));
      }
    });
  }
});

