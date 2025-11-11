# GitHub Actions Test Setup

This document explains how the automated testing works in GitHub Actions and how to configure branch protection.

## 🚀 Automated Testing

### Test Workflows

Two GitHub Actions workflows are configured:

1. **`.github/workflows/test.yml`** - Comprehensive test suite
   - Runs on: Pull Requests and pushes to main/master
   - Jobs:
     - Unit Tests (Jest)
     - E2E Tests (Playwright)
     - Lint Check
     - Build Check
     - Test Summary

2. **`.github/workflows/pr-checks.yml`** - PR validation
   - Runs on: PR opened, updated, or marked ready for review
   - Validates: Lint, Unit Tests, Build, E2E Tests

### What Gets Tested

#### Unit Tests
- Calculator keyboard hook functionality
- Component logic
- Utility functions

#### E2E Tests
- **Navigation Tests** (`e2e/navigation.spec.ts`)
  - All page navigation
  - Header and footer links
  - Calculator page routing

- **Calculator Tests** (`e2e/calculator.spec.ts`)
  - Basic arithmetic operations
  - Scientific functions
  - Decimal handling
  - Clear functionality

- **Keyboard Tests** (`e2e/keyboard.spec.ts`)
  - Numeric key input
  - Operator keys
  - Numpad support
  - Focus detection

- **Comprehensive Keyboard** (`e2e/keyboard-comprehensive.spec.ts`)
  - All number keys
  - Complex calculations
  - Decimal operations
  - Multiple operations

- **All Calculators** (`e2e/all-calculators.spec.ts`)
  - All 16 calculator pages load
  - Navigation from homepage

- **Homepage Calculator** (`e2e/homepage-calculator.spec.ts`)
  - Homepage calculator functionality
  - Keyboard support on homepage

## 🔒 Branch Protection Setup

To make PRs only mergeable when tests pass:

### Step 1: Go to Repository Settings

1. Navigate to your GitHub repository
2. Click **Settings** → **Branches**
3. Click **Add rule** or edit existing rule for `main`/`master`

### Step 2: Configure Branch Protection

Enable these settings:

- ✅ **Require a pull request before merging**
  - Require approvals: 1 (optional, recommended)
  
- ✅ **Require status checks to pass before merging**
  - Check these status checks:
    - `Unit Tests`
    - `E2E Tests`
    - `Lint`
    - `Build Check`
    - `PR Validation` (if using pr-checks.yml)
  
- ✅ **Require branches to be up to date before merging**
  - This ensures PRs are tested against latest main branch

- ✅ **Do not allow bypassing the above settings**
  - Prevents force merges without tests

### Step 3: Save Settings

Click **Create** or **Save changes**

## 📊 Test Status

### Viewing Test Results

1. **In Pull Requests:**
   - Check the "Checks" tab on any PR
   - See status of all test jobs
   - Click on a job to see detailed logs

2. **In Actions Tab:**
   - Go to repository → **Actions** tab
   - See all workflow runs
   - Click on a run to see details

### Test Reports

- **Unit Test Coverage:** Available in Actions logs
- **E2E Test Reports:** Uploaded as artifacts (playwright-report)
- **Test Summary:** Shown in PR comments

## 🛠️ Local Testing

Before pushing, you can run tests locally:

```bash
# Run all tests
npm run test:all

# Run only unit tests
npm run test

# Run only E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run smoke tests (quick check)
npm run test:e2e:smoke
```

## 🔧 Troubleshooting

### Tests Fail in CI but Pass Locally

1. **Check Node version:**
   - CI uses Node 18
   - Ensure local matches: `node --version`

2. **Clear cache:**
   ```bash
   rm -rf node_modules .next
   npm ci
   ```

3. **Check environment variables:**
   - Some tests might need env vars
   - Check `.env.example` for required vars

### E2E Tests Timeout

- Increase timeout in `playwright.config.ts`
- Check if dev server starts properly
- Verify port 3000 is available

### Flaky Tests

- Check for race conditions
- Add proper waits/assertions
- Review test isolation

## 📝 Adding New Tests

### Unit Tests
- Add to `__tests__/` directory
- Follow naming: `*.test.ts` or `*.test.tsx`
- Use Jest and React Testing Library

### E2E Tests
- Add to `e2e/` directory
- Follow naming: `*.spec.ts`
- Use Playwright

### Test Best Practices

1. **Isolation:** Each test should be independent
2. **Naming:** Use descriptive test names
3. **Assertions:** Be specific about what you're testing
4. **Cleanup:** Clean up after tests if needed
5. **Speed:** Keep tests fast (E2E can be slower)

## 🎯 Test Coverage Goals

- **Unit Tests:** >80% coverage
- **E2E Tests:** Cover all critical user flows
- **Integration:** Test calculator interactions
- **Accessibility:** Test keyboard navigation

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

---

**Note:** All tests must pass before a PR can be merged (if branch protection is enabled).

