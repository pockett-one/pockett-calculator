# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing and CI/CD.

## Workflows

### `test.yml`
Comprehensive test suite that runs on:
- Pull requests to main/master
- Pushes to main/master

**Jobs:**
- `unit-tests` - Runs Jest unit tests
- `e2e-tests` - Runs Playwright E2E tests
- `lint` - Runs ESLint
- `build` - Verifies the app builds successfully
- `test-summary` - Aggregates results

### `pr-checks.yml`
PR validation workflow that runs on:
- PR opened
- PR updated (synchronize)
- PR reopened
- PR marked ready for review

**Validates:**
- Linting
- Unit tests
- Build
- E2E tests

## Status Checks

These workflows create status checks that can be required for branch protection:

- `Unit Tests`
- `E2E Tests`
- `Lint`
- `Build Check`
- `PR Validation`

## Configuration

### Branch Protection

To require these checks before merging:

1. Go to Repository Settings → Branches
2. Add/edit rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select the status checks listed above
5. Enable "Require branches to be up to date before merging"

### Local Testing

Run tests locally before pushing:

```bash
# All tests
npm run test:all

# Unit tests only
npm run test

# E2E tests only
npm run test:e2e
```

## Troubleshooting

### Tests Fail in CI

1. Check the Actions tab for detailed logs
2. Run tests locally to reproduce
3. Ensure Node version matches (18.x)
4. Clear cache: `rm -rf node_modules .next && npm ci`

### E2E Tests Timeout

- Check if server starts properly
- Verify port 3000 is available
- Review test timeouts in `playwright.config.ts`

