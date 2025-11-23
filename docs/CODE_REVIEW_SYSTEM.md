# Code Review System

This project includes an automated code review agent that runs before every commit via git hooks. The system reviews your code changes and blocks commits until review comments are acknowledged, resolved, or responded to.

## 🚀 Quick Start

### 1. Install the Git Hook

Run the setup script to install the pre-commit hook:

```bash
npm run review:setup
```

This will:
- Install the pre-commit hook in `.git/hooks/pre-commit`
- Make the hook executable
- Set up the review system

### 2. How It Works

Every time you try to commit:

1. **Review Agent Runs**: Automatically analyzes all staged files
2. **Issues Detected**: Creates review comments for any issues found
3. **Commit Blocked**: If there are errors or unresolved comments, the commit is blocked
4. **Review Required**: You must acknowledge, resolve, or respond to comments before committing

## 📋 Review Categories

The review agent checks for:

### Security Issues (Error - Blocks Commit)
- Hardcoded API keys, passwords, secrets, or tokens
- Potential security vulnerabilities

### Code Quality (Warning)
- `console.log` statements left in code
- Commented-out code blocks
- Large files (>500 lines)

### Type Safety (Warning)
- Usage of `any` type in TypeScript
- Missing type definitions

### Error Handling (Info)
- Async functions without try-catch blocks
- Missing error handling

### Maintenance (Info)
- TODO/FIXME comments without tracking
- Code organization issues

## 🛠️ Managing Review Comments

### List Comments

```bash
# List all comments
npm run review:list

# List only pending (blocking) comments
npm run review:list:pending

# List acknowledged comments
npm run review:list:acknowledged

# List resolved comments
npm run review:list:resolved
```

### Acknowledge a Comment

Acknowledging a comment means you've seen it and will address it later. Acknowledged comments **don't block commits** but should still be addressed.

```bash
npm run review:ack <comment-id>
```

Example:
```bash
npm run review:ack comment-1234567890-abc123
```

### Resolve a Comment

Resolve a comment when you've fixed the issue:

```bash
npm run review:resolve <comment-id>
```

### Respond to a Comment

Add a response explaining why the issue is acceptable or how you plan to address it:

```bash
npm run review:respond <comment-id> "Your response text here"
```

Example:
```bash
npm run review:respond comment-1234567890-abc123 "This console.log is temporary for debugging and will be removed in the next commit"
```

### View Statistics

```bash
npm run review:stats
```

Shows:
- Number of pending comments (blocking)
- Number of acknowledged comments (not blocking)
- Number of resolved comments
- Total comments

## 🔍 Review Comment Status

### Pending (🔴 Blocking)
- New comments start as "pending"
- **Blocks commits** until acknowledged or resolved
- Red status in listings

### Acknowledged (🔵 Not Blocking)
- You've seen the comment and will address it
- **Does not block commits**
- Blue status in listings
- Should still be addressed eventually

### Resolved (🟢 Complete)
- Issue has been fixed
- Green status in listings
- Historical record only

## 📝 Workflow Examples

### Example 1: Fixing an Issue

```bash
# Try to commit
git commit -m "Add new feature"

# Review agent finds console.log
# Commit is blocked

# View the comment
npm run review:list:pending

# Fix the issue (remove console.log)
# ... edit file ...

# Resolve the comment
npm run review:resolve comment-1234567890-abc123

# Try commit again
git commit -m "Add new feature"
# ✅ Commit succeeds
```

### Example 2: Acknowledging for Later

```bash
# Try to commit
git commit -m "WIP: Feature in progress"

# Review agent finds TODO comment
# Commit is blocked

# Acknowledge the comment (will fix later)
npm run review:ack comment-1234567890-abc123

# Try commit again
git commit -m "WIP: Feature in progress"
# ✅ Commit succeeds (acknowledged comments don't block)
```

### Example 3: Responding with Explanation

```bash
# Review agent finds 'any' type
# You have a valid reason to use it

# Respond with explanation
npm run review:respond comment-1234567890-abc123 "Using any here is intentional - this is a generic utility that accepts any type"

# Comment is auto-acknowledged
# Commit succeeds
```

## 🎯 Bypassing Review (Not Recommended)

If you absolutely need to bypass the review (e.g., emergency hotfix), you can use:

```bash
git commit --no-verify -m "Emergency fix"
```

**⚠️ Warning**: Only use `--no-verify` in genuine emergencies. The review system is there to maintain code quality.

## 🔧 Configuration

### Review Files

- `.code-review-comments.json` - Stores all review comments (gitignored)
- `.code-review-history.json` - Stores review history (gitignored)

These files are automatically created and managed by the system.

### Customizing Review Rules

Edit `scripts/code-review-agent.js` to:
- Add new review checks
- Modify severity levels
- Change blocking behavior
- Customize issue detection

## 🐛 Troubleshooting

### Hook Not Running

1. Check if hook is installed:
   ```bash
   ls -la .git/hooks/pre-commit
   ```

2. Reinstall the hook:
   ```bash
   npm run review:setup
   ```

3. Check hook permissions:
   ```bash
   chmod +x .git/hooks/pre-commit
   ```

### Too Many False Positives

If the review agent flags too many false positives:

1. Add `// REVIEW: OK` comment to the line
2. Or acknowledge the comment and explain why it's acceptable

### Review Comments Not Clearing

If comments persist after fixing:

1. Check comment status: `npm run review:list`
2. Manually resolve: `npm run review:resolve <id>`
3. Or delete `.code-review-comments.json` to start fresh (not recommended)

## 📊 Integration with CI/CD

The review system runs locally via git hooks. For CI/CD:

- The review system complements (doesn't replace) CI checks
- GitHub Actions workflows still run tests, linting, etc.
- Local review catches issues before pushing

## 🎓 Best Practices

1. **Review Before Committing**: Run `npm run review` manually before committing
2. **Address Issues Promptly**: Don't let pending comments accumulate
3. **Use Acknowledge Wisely**: Only acknowledge if you'll fix it soon
4. **Respond with Context**: Explain why something is acceptable
5. **Resolve When Fixed**: Mark comments as resolved when issues are fixed

## 📚 Related Documentation

- [Testing Setup](./TESTING_SETUP.md) - Testing infrastructure
- [GitHub Actions Setup](./GITHUB_ACTIONS_SETUP.md) - CI/CD workflows
- [Branch Protection](./BRANCH_PROTECTION_SETUP.md) - Branch protection rules

---

**Status**: ✅ Fully Configured  
**Last Updated**: 2025-01-27

