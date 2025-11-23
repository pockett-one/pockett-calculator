#!/usr/bin/env node

/**
 * Setup Script for Code Review Hooks
 * 
 * Installs the pre-commit hook that runs the code review agent
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function setupHooks() {
  try {
    // Get hooks directory (works with worktrees too)
    const hooksDir = execSync('git rev-parse --git-path hooks', { encoding: 'utf8' }).trim();
    const preCommitHook = path.join(hooksDir, 'pre-commit');
    const hookScript = path.join(__dirname, 'pre-commit-hook.sh');

    // Create hooks directory if it doesn't exist
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Check if hook already exists
    if (fs.existsSync(preCommitHook)) {
      const existing = fs.readFileSync(preCommitHook, 'utf8');
      if (existing.includes('code-review-agent')) {
        console.log(`${colors.yellow}Pre-commit hook already installed.${colors.reset}`);
        return;
      } else {
        console.log(`${colors.yellow}Pre-commit hook exists but doesn't include review agent.${colors.reset}`);
        console.log(`${colors.yellow}Backing up existing hook to pre-commit.backup${colors.reset}`);
        fs.copyFileSync(preCommitHook, preCommitHook + '.backup');
      }
    }

    // Create the hook
    const hookContent = `#!/bin/bash
# Code Review Agent Pre-Commit Hook
# This hook runs automatically before every commit

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

# Run the code review agent
node scripts/code-review-agent.js
exit $?
`;

    fs.writeFileSync(preCommitHook, hookContent);
    
    // Make it executable
    try {
      fs.chmodSync(preCommitHook, '755');
    } catch (e) {
      // On Windows, chmod might not work, but that's okay
      console.log(`${colors.yellow}Note: Could not set executable permissions (this is okay on Windows)${colors.reset}`);
    }

    // Make the hook script executable too
    try {
      fs.chmodSync(hookScript, '755');
    } catch (e) {
      // Ignore on Windows
    }

    console.log(`${colors.green}${colors.bold}✅ Code review hook installed successfully!${colors.reset}\n`);
    console.log(`${colors.cyan}The pre-commit hook will now run automatically before every commit.${colors.reset}`);
    console.log(`${colors.cyan}Commits will be blocked if there are unresolved review comments or critical issues.${colors.reset}\n`);

  } catch (error) {
    console.error(`${colors.red}Error setting up hooks: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

if (require.main === module) {
  setupHooks();
}

module.exports = { setupHooks };

