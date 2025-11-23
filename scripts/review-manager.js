#!/usr/bin/env node

/**
 * Review Manager CLI
 * 
 * Manages code review comments: list, acknowledge, resolve, respond
 */

const fs = require('fs');
const path = require('path');

const REVIEW_COMMENTS_FILE = path.join(__dirname, '..', '.code-review-comments.json');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  gray: '\x1b[90m',
};

class ReviewManager {
  constructor() {
    this.comments = this.loadComments();
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

  saveComments() {
    fs.writeFileSync(REVIEW_COMMENTS_FILE, JSON.stringify(this.comments, null, 2));
  }

  list(filter = 'all') {
    const comments = this.comments.comments || [];
    
    let filtered = comments;
    if (filter === 'pending') {
      filtered = comments.filter(c => c.status === 'pending');
    } else if (filter === 'acknowledged') {
      filtered = comments.filter(c => c.status === 'acknowledged');
    } else if (filter === 'resolved') {
      filtered = comments.filter(c => c.status === 'resolved');
    }

    if (filtered.length === 0) {
      console.log(`${colors.yellow}No ${filter} comments found.${colors.reset}`);
      return;
    }

    console.log(`${colors.cyan}${colors.bold}Code Review Comments (${filtered.length} ${filter}):${colors.reset}\n`);

    filtered.forEach((comment, index) => {
      const statusColor = 
        comment.status === 'resolved' ? colors.green :
        comment.status === 'acknowledged' ? colors.blue :
        colors.red;

      const severityColor = 
        comment.severity === 'error' ? colors.red :
        comment.severity === 'warning' ? colors.yellow :
        colors.blue;

      console.log(`${colors.bold}${index + 1}. [${statusColor}${comment.status.toUpperCase()}${colors.reset}${colors.bold}]${colors.reset} ${comment.id}`);
      console.log(`   ${colors.cyan}File:${colors.reset} ${comment.file}:${comment.line}`);
      console.log(`   ${colors.cyan}Severity:${colors.reset} ${severityColor}${comment.severity}${colors.reset}`);
      console.log(`   ${colors.cyan}Category:${colors.reset} ${comment.category}`);
      console.log(`   ${colors.cyan}Message:${colors.reset} ${comment.message}`);
      if (comment.code) {
        console.log(`   ${colors.cyan}Code:${colors.reset} ${colors.gray}${comment.code}${colors.reset}`);
      }
      if (comment.response) {
        console.log(`   ${colors.cyan}Response:${colors.reset} ${comment.response}`);
      }
      console.log(`   ${colors.cyan}Created:${colors.reset} ${new Date(comment.createdAt).toLocaleString()}`);
      if (comment.resolvedAt) {
        console.log(`   ${colors.cyan}Resolved:${colors.reset} ${new Date(comment.resolvedAt).toLocaleString()}`);
      }
      console.log();
    });
  }

  acknowledge(id) {
    const comment = this.comments.comments.find(c => c.id === id);
    if (!comment) {
      console.log(`${colors.red}Comment not found: ${id}${colors.reset}`);
      process.exit(1);
    }

    if (comment.status === 'resolved') {
      console.log(`${colors.yellow}Comment is already resolved.${colors.reset}`);
      return;
    }

    comment.status = 'acknowledged';
    this.saveComments();
    console.log(`${colors.green}✅ Comment acknowledged: ${id}${colors.reset}`);
    console.log(`${colors.blue}Note: Acknowledged comments don't block commits, but should still be addressed.${colors.reset}`);
  }

  resolve(id) {
    const comment = this.comments.comments.find(c => c.id === id);
    if (!comment) {
      console.log(`${colors.red}Comment not found: ${id}${colors.reset}`);
      process.exit(1);
    }

    comment.status = 'resolved';
    comment.resolvedAt = new Date().toISOString();
    this.saveComments();
    console.log(`${colors.green}✅ Comment resolved: ${id}${colors.reset}`);
  }

  respond(id, response) {
    const comment = this.comments.comments.find(c => c.id === id);
    if (!comment) {
      console.log(`${colors.red}Comment not found: ${id}${colors.reset}`);
      process.exit(1);
    }

    comment.response = response;
    comment.status = 'acknowledged'; // Auto-acknowledge when responding
    this.saveComments();
    console.log(`${colors.green}✅ Response added to comment: ${id}${colors.reset}`);
    console.log(`${colors.blue}Response: ${response}${colors.reset}`);
  }

  stats() {
    const comments = this.comments.comments || [];
    const pending = comments.filter(c => c.status === 'pending').length;
    const acknowledged = comments.filter(c => c.status === 'acknowledged').length;
    const resolved = comments.filter(c => c.status === 'resolved').length;
    const total = comments.length;

    console.log(`${colors.cyan}${colors.bold}Review Statistics:${colors.reset}\n`);
    console.log(`  ${colors.red}Pending:${colors.reset}    ${pending} (blocking commits)`);
    console.log(`  ${colors.blue}Acknowledged:${colors.reset} ${acknowledged} (not blocking)`);
    console.log(`  ${colors.green}Resolved:${colors.reset}    ${resolved}`);
    console.log(`  ${colors.bold}Total:${colors.reset}       ${total}\n`);

    if (pending > 0) {
      console.log(`${colors.yellow}⚠️  You have ${pending} pending comment(s) that will block commits.${colors.reset}`);
      console.log(`${colors.yellow}   Run 'npm run review:list pending' to see them.${colors.reset}\n`);
    }
  }
}

// CLI interface
if (require.main === module) {
  const manager = new ReviewManager();
  const command = process.argv[2];
  const arg = process.argv[3];
  const arg2 = process.argv[4];

  switch (command) {
    case 'list':
      manager.list(arg || 'all');
      break;
    case 'ack':
    case 'acknowledge':
      if (!arg) {
        console.log(`${colors.red}Usage: npm run review:ack <comment-id>${colors.reset}`);
        process.exit(1);
      }
      manager.acknowledge(arg);
      break;
    case 'resolve':
      if (!arg) {
        console.log(`${colors.red}Usage: npm run review:resolve <comment-id>${colors.reset}`);
        process.exit(1);
      }
      manager.resolve(arg);
      break;
    case 'respond':
      if (!arg || !arg2) {
        console.log(`${colors.red}Usage: npm run review:respond <comment-id> "response text"${colors.reset}`);
        process.exit(1);
      }
      manager.respond(arg, arg2);
      break;
    case 'stats':
      manager.stats();
      break;
    default:
      console.log(`${colors.cyan}Code Review Manager${colors.reset}\n`);
      console.log('Usage:');
      console.log('  npm run review:list [all|pending|acknowledged|resolved]');
      console.log('  npm run review:ack <comment-id>');
      console.log('  npm run review:resolve <comment-id>');
      console.log('  npm run review:respond <comment-id> "response text"');
      console.log('  npm run review:stats');
      process.exit(1);
  }
}

module.exports = ReviewManager;

