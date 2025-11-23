# Code Review Scripts

This directory contains scripts for the automated code review system.

## Files

- **`code-review-agent.js`** - Main review agent that analyzes code changes
- **`review-manager.js`** - CLI tool for managing review comments
- **`setup-review-hooks.js`** - Installs git pre-commit hook
- **`pre-commit-hook.sh`** - Git pre-commit hook script

## Usage

See [../docs/CODE_REVIEW_SYSTEM.md](../docs/CODE_REVIEW_SYSTEM.md) for complete documentation.

### Quick Commands

```bash
# Setup (install git hook)
npm run review:setup

# Run review manually
npm run review

# List comments
npm run review:list

# Manage comments
npm run review:ack <id>
npm run review:resolve <id>
npm run review:respond <id> "response"

# View statistics
npm run review:stats
```

## How It Works

1. **Pre-commit Hook**: Automatically runs `code-review-agent.js` before every commit
2. **Code Analysis**: Agent analyzes staged files for issues
3. **Comment Creation**: Issues are saved as review comments
4. **Commit Blocking**: Commits are blocked if there are errors or unresolved comments
5. **Comment Management**: Use `review-manager.js` to acknowledge, resolve, or respond to comments

## Review Categories

- **Security** (Error - blocks commit): Hardcoded secrets, API keys
- **Code Quality** (Warning): console.log, commented code, large files
- **Type Safety** (Warning): `any` types in TypeScript
- **Error Handling** (Info): Missing try-catch in async functions
- **Maintenance** (Info): TODO/FIXME without tracking

## Files Created

- `.code-review-comments.json` - Stores review comments (gitignored)
- `.code-review-history.json` - Stores review history (gitignored)

