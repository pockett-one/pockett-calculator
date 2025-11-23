#!/bin/bash

# Git Pre-Commit Hook
# Runs code review agent before allowing commits

# Get the repository root
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

# Run the code review agent
node scripts/code-review-agent.js

# Exit with the review agent's exit code
exit $?

