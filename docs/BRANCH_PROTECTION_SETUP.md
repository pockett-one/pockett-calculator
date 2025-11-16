# Branch Protection Setup Guide

This guide will help you configure GitHub branch protection rules to ensure PRs can only be merged when all tests pass.

## 🎯 Quick Setup (5 minutes)

### Step 1: Navigate to Branch Settings

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Branches** (left sidebar)

### Step 2: Add Branch Protection Rule

1. Click **Add rule** button (or edit existing rule for `main`/`master`)
2. In **Branch name pattern**, enter: `main` (or `master`)

### Step 3: Configure Protection Settings

Enable these checkboxes:

#### ✅ Required Settings

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1` (optional but recommended)
  - [x] Dismiss stale pull request approvals when new commits are pushed

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Check the following status checks:
    - ✅ `Unit Tests`
    - ✅ `E2E Tests`
    - ✅ `Lint`
    - ✅ `Build Check`
    - ✅ `PR Validation` (if using pr-checks.yml)

- [x] **Do not allow bypassing the above settings**
  - Prevents administrators from force-merging without tests

#### ⚠️ Optional Settings (Recommended)

- [x] **Require conversation resolution before merging**
  - Ensures all PR comments are addressed

- [x] **Require linear history**
  - Keeps git history clean (optional)

- [x] **Include administrators**
  - Applies rules to everyone, including admins

### Step 4: Save

Click **Create** (or **Save changes** if editing)

## 📋 Status Checks Reference

After the first workflow run, these status checks will appear:

| Status Check | Workflow | Description |
|-------------|----------|-------------|
| `Unit Tests` | test.yml | Jest unit tests |
| `E2E Tests` | test.yml | Playwright E2E tests |
| `Lint` | test.yml | ESLint validation |
| `Build Check` | test.yml | Next.js build verification |
| `PR Validation` | pr-checks.yml | Complete PR validation |

## 🔍 Verifying Setup

### Check 1: Create a Test PR

1. Create a new branch
2. Make a small change
3. Open a PR
4. Check the **Checks** tab - you should see workflows running

### Check 2: Verify Merge Button

1. In the PR, the **Merge** button should be disabled
2. It should show: "Merging is blocked"
3. Message: "X required status checks must pass"

### Check 3: After Tests Pass

1. Wait for all workflows to complete
2. All status checks should show ✅
3. **Merge** button should become enabled

## 🛠️ Troubleshooting

### Status Checks Not Appearing

**Problem:** Status checks don't show up in branch protection settings

**Solution:**
1. Make sure workflows have run at least once
2. Push a commit or open a PR to trigger workflows
3. Wait for workflows to complete
4. Go back to branch protection settings - checks should appear

### Can't Select Status Checks

**Problem:** Can't find status checks in the dropdown

**Solution:**
1. Ensure workflows are in `.github/workflows/` directory
2. Check workflow files are valid YAML
3. Push workflows to repository
4. Trigger a workflow run
5. Status checks appear after first successful run

### Tests Pass But Still Can't Merge

**Problem:** All tests pass but merge is still blocked

**Solution:**
1. Check "Require branches to be up to date" is enabled
2. Click "Update branch" button in PR
3. This will merge latest main into your branch
4. Re-run tests on updated branch

### Need to Bypass (Emergency Only)

**Problem:** Need to merge urgent fix but tests are failing

**Solution:**
1. If "Do not allow bypassing" is enabled, you cannot bypass
2. Fix the failing tests first
3. Or temporarily disable branch protection (not recommended)

## 📊 Monitoring

### View Test Status

1. **In PR:** Check the "Checks" tab
2. **In Actions:** Go to repository → Actions tab
3. **In Settings:** Repository → Settings → Branches → View rules

### Test Results

- ✅ Green checkmark = Test passed
- ❌ Red X = Test failed
- 🟡 Yellow circle = Test in progress
- ⚪ Gray circle = Test skipped

## 🔄 Workflow Behavior

### When Tests Run

- **On PR open:** All workflows trigger
- **On new commits:** All workflows re-run
- **On PR update:** All workflows re-run
- **On push to main:** All workflows run

### Test Execution Order

1. **Lint** (fastest, ~30 seconds)
2. **Unit Tests** (~1-2 minutes)
3. **Build Check** (~2-3 minutes)
4. **E2E Tests** (~3-5 minutes)

Total time: ~6-10 minutes

## 💡 Best Practices

1. **Run tests locally first:**
   ```bash
   npm run test:all
   ```

2. **Keep PRs small:**
   - Easier to review
   - Faster test runs
   - Quicker feedback

3. **Fix tests before requesting review:**
   - Don't wait for CI to catch issues
   - Run locally first

4. **Monitor test results:**
   - Check Actions tab regularly
   - Fix flaky tests immediately

5. **Update branch regularly:**
   - Keeps PR up to date
   - Avoids merge conflicts
   - Ensures tests run on latest code

## 📚 Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging)

---

**Note:** Once branch protection is enabled, all PRs must pass tests before merging. This ensures code quality and prevents broken code from reaching production.

