#!/usr/bin/env node

/**
 * Code Review Agent
 * 
 * Reviews git commits and blocks them until review comments are resolved.
 * This script analyzes staged changes and provides code review feedback.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REVIEW_COMMENTS_FILE = path.join(__dirname, '..', '.code-review-comments.json');
const REVIEW_HISTORY_FILE = path.join(__dirname, '..', '.code-review-history.json');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

class CodeReviewAgent {
  constructor() {
    this.comments = this.loadComments();
    this.history = this.loadHistory();
  }

  loadComments() {
    if (fs.existsSync(REVIEW_COMMENTS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(REVIEW_COMMENTS_FILE, 'utf8'));
      } catch (e) {
        return { comments: [], version: 1 };
      }
    }
    return { comments: [], version: 1 };
  }

  loadHistory() {
    if (fs.existsSync(REVIEW_HISTORY_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(REVIEW_HISTORY_FILE, 'utf8'));
      } catch (e) {
        return { reviews: [] };
      }
    }
    return { reviews: [] };
  }

  saveComments() {
    fs.writeFileSync(REVIEW_COMMENTS_FILE, JSON.stringify(this.comments, null, 2));
  }

  saveHistory() {
    fs.writeFileSync(REVIEW_HISTORY_FILE, JSON.stringify(this.history, null, 2));
  }

  getStagedFiles() {
    try {
      const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
      return output.trim().split('\n').filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  getStagedDiff() {
    try {
      return execSync('git diff --cached', { encoding: 'utf8' });
    } catch (e) {
      return '';
    }
  }

  getFileContent(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      return null;
    }
  }

  analyzeCode(filePath, content, diff) {
    const issues = [];
    const lines = content.split('\n');

    // Check for common issues
    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Check for console.log statements
      if (line.includes('console.log') && !line.includes('// REVIEW: OK')) {
        issues.push({
          file: filePath,
          line: lineNum,
          severity: 'warning',
          category: 'debugging',
          message: 'console.log found - remove before committing or add // REVIEW: OK comment',
          code: line.trim(),
        });
      }

      // Check for TODO/FIXME without tracking
      if ((line.includes('TODO') || line.includes('FIXME')) && !line.includes('// REVIEW: OK')) {
        issues.push({
          file: filePath,
          line: lineNum,
          severity: 'info',
          category: 'maintenance',
          message: 'TODO/FIXME found - ensure it\'s tracked in issue tracker or add // REVIEW: OK',
          code: line.trim(),
        });
      }

      // Check for commented out code
      if (line.trim().startsWith('//') && line.trim().length > 10 && 
          (line.includes('function') || line.includes('const') || line.includes('let'))) {
        issues.push({
          file: filePath,
          line: lineNum,
          severity: 'warning',
          category: 'code-quality',
          message: 'Commented out code detected - consider removing or documenting why it\'s kept',
          code: line.trim(),
        });
      }

      // Check for hardcoded secrets/API keys
      const secretPatterns = [
        /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i,
        /password\s*[:=]\s*['"][^'"]+['"]/i,
        /secret\s*[:=]\s*['"][^'"]+['"]/i,
        /token\s*[:=]\s*['"][^'"]+['"]/i,
      ];
      secretPatterns.forEach(pattern => {
        if (pattern.test(line) && !line.includes('// REVIEW: OK')) {
          issues.push({
            file: filePath,
            line: lineNum,
            severity: 'error',
            category: 'security',
            message: 'Potential hardcoded secret detected - use environment variables instead',
            code: line.trim(),
          });
        }
      });

      // Check for large functions (more than 50 lines)
      // This is a simplified check - in reality, we'd need to track function boundaries
    });

    // Check for TypeScript/React specific issues
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      // Check for any types
      if (content.includes(': any') && !content.includes('// REVIEW: OK')) {
        const anyLines = lines
          .map((line, idx) => ({ line, idx: idx + 1 }))
          .filter(({ line }) => line.includes(': any'));
        
        anyLines.forEach(({ line, idx }) => {
          issues.push({
            file: filePath,
            line: idx,
            severity: 'warning',
            category: 'type-safety',
            message: 'Usage of "any" type - consider using proper types',
            code: line.trim(),
          });
        });
      }

      // Check for missing error handling in async functions
      const asyncFunctionPattern = /async\s+(function|\()/g;
      let match;
      while ((match = asyncFunctionPattern.exec(content)) !== null) {
        const startLine = content.substring(0, match.index).split('\n').length;
        const functionContent = this.extractFunction(content, match.index);
        if (!functionContent.includes('try') && !functionContent.includes('catch') && 
            !functionContent.includes('// REVIEW: OK')) {
          issues.push({
            file: filePath,
            line: startLine,
            severity: 'info',
            category: 'error-handling',
            message: 'Async function without try-catch - ensure errors are handled',
            code: lines[startLine - 1]?.trim() || '',
          });
        }
      }
    }

    // Check file size
    if (lines.length > 500) {
      issues.push({
        file: filePath,
        line: 1,
        severity: 'info',
        category: 'code-organization',
        message: `Large file (${lines.length} lines) - consider splitting into smaller modules`,
        code: '',
      });
    }

    return issues;
  }

  extractFunction(content, startIndex) {
    // Simple extraction - find the function body
    let braceCount = 0;
    let inFunction = false;
    let result = '';
    
    for (let i = startIndex; i < content.length; i++) {
      const char = content[i];
      if (char === '{') {
        braceCount++;
        inFunction = true;
      } else if (char === '}') {
        braceCount--;
        if (inFunction && braceCount === 0) {
          result += char;
          break;
        }
      }
      if (inFunction) {
        result += char;
      }
    }
    return result;
  }

  reviewChanges() {
    const stagedFiles = this.getStagedFiles();
    
    if (stagedFiles.length === 0) {
      console.log(`${colors.yellow}No staged files to review.${colors.reset}`);
      return { passed: true, issues: [] };
    }

    console.log(`${colors.cyan}${colors.bold}Code Review Agent - Analyzing ${stagedFiles.length} file(s)...${colors.reset}\n`);

    const allIssues = [];
    const reviewId = `review-${Date.now()}`;

    stagedFiles.forEach(file => {
      const fullPath = path.join(process.cwd(), file);
      if (!fs.existsSync(fullPath)) {
        // File was deleted, skip
        return;
      }

      const content = this.getFileContent(fullPath);
      if (!content) return;

      const diff = this.getStagedDiff();
      const issues = this.analyzeCode(file, content, diff);
      allIssues.push(...issues);
    });

    // Filter out resolved comments
    const activeComments = this.comments.comments.filter(c => 
      c.status === 'pending' || c.status === 'acknowledged'
    );

    // Check if there are unresolved review comments
    const unresolvedComments = activeComments.filter(c => c.status === 'pending');
    const acknowledgedComments = activeComments.filter(c => c.status === 'acknowledged');

    // Save review to history
    this.history.reviews.push({
      id: reviewId,
      timestamp: new Date().toISOString(),
      files: stagedFiles,
      issuesFound: allIssues.length,
      unresolvedComments: unresolvedComments.length,
      acknowledgedComments: acknowledgedComments.length,
    });
    this.saveHistory();

    // Add new issues as review comments
    if (allIssues.length > 0) {
      allIssues.forEach(issue => {
        this.comments.comments.push({
          id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          reviewId,
          file: issue.file,
          line: issue.line,
          severity: issue.severity,
          category: issue.category,
          message: issue.message,
          code: issue.code,
          status: 'pending',
          createdAt: new Date().toISOString(),
          resolvedAt: null,
          response: null,
        });
      });
      this.saveComments();
    }

    // Display results
    this.displayResults(allIssues, unresolvedComments, acknowledgedComments);

    // Determine if commit should be blocked
    const hasErrors = allIssues.some(i => i.severity === 'error');
    const hasUnresolved = unresolvedComments.length > 0;

    return {
      passed: !hasErrors && !hasUnresolved,
      issues: allIssues,
      unresolvedComments,
      acknowledgedComments,
    };
  }

  displayResults(issues, unresolvedComments, acknowledgedComments) {
    if (issues.length > 0) {
      console.log(`${colors.yellow}${colors.bold}⚠️  Found ${issues.length} issue(s) in staged changes:${colors.reset}\n`);
      
      const bySeverity = {
        error: [],
        warning: [],
        info: [],
      };

      issues.forEach(issue => {
        bySeverity[issue.severity].push(issue);
      });

      // Display errors
      if (bySeverity.error.length > 0) {
        console.log(`${colors.red}${colors.bold}❌ ERRORS (${bySeverity.error.length}):${colors.reset}`);
        bySeverity.error.forEach(issue => {
          console.log(`  ${colors.red}•${colors.reset} ${issue.file}:${issue.line} - ${issue.message}`);
          if (issue.code) {
            console.log(`    ${colors.gray}  ${issue.code}${colors.reset}`);
          }
        });
        console.log();
      }

      // Display warnings
      if (bySeverity.warning.length > 0) {
        console.log(`${colors.yellow}${colors.bold}⚠️  WARNINGS (${bySeverity.warning.length}):${colors.reset}`);
        bySeverity.warning.forEach(issue => {
          console.log(`  ${colors.yellow}•${colors.reset} ${issue.file}:${issue.line} - ${issue.message}`);
          if (issue.code) {
            console.log(`    ${colors.gray}  ${issue.code}${colors.reset}`);
          }
        });
        console.log();
      }

      // Display info
      if (bySeverity.info.length > 0) {
        console.log(`${colors.blue}${colors.bold}ℹ️  INFO (${bySeverity.info.length}):${colors.reset}`);
        bySeverity.info.forEach(issue => {
          console.log(`  ${colors.blue}•${colors.reset} ${issue.file}:${issue.line} - ${issue.message}`);
          if (issue.code) {
            console.log(`    ${colors.gray}  ${issue.code}${colors.reset}`);
          }
        });
        console.log();
      }
    } else {
      console.log(`${colors.green}✅ No new issues found in staged changes.${colors.reset}\n`);
    }

    // Display unresolved comments
    if (unresolvedComments.length > 0) {
      console.log(`${colors.red}${colors.bold}🚫 BLOCKING: ${unresolvedComments.length} unresolved review comment(s)${colors.reset}`);
      console.log(`${colors.yellow}   Run 'npm run review:list' to see all comments${colors.reset}`);
      console.log(`${colors.yellow}   Run 'npm run review:ack <id>' to acknowledge a comment${colors.reset}`);
      console.log(`${colors.yellow}   Run 'npm run review:resolve <id>' to resolve a comment${colors.reset}`);
      console.log(`${colors.yellow}   Run 'npm run review:respond <id> "response"' to respond to a comment${colors.reset}\n`);
    }

    // Display acknowledged comments
    if (acknowledgedComments.length > 0) {
      console.log(`${colors.blue}ℹ️  ${acknowledgedComments.length} acknowledged comment(s) (not blocking)${colors.reset}\n`);
    }
  }
}

// CLI interface
if (require.main === module) {
  const agent = new CodeReviewAgent();
  const result = agent.reviewChanges();

  if (!result.passed) {
    console.log(`${colors.red}${colors.bold}\n❌ COMMIT BLOCKED${colors.reset}`);
    console.log(`${colors.yellow}Please address the issues above or acknowledge/resolve review comments before committing.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}✅ Review passed - commit allowed${colors.reset}\n`);
    process.exit(0);
  }
}

module.exports = CodeReviewAgent;

