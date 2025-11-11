const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'playwright/.cache/**',
      '*.config.js',
      '*.config.ts',
      'jest.config.js',
      'jest.setup.js',
      'scripts/**',
      'public/**',
      'e2e/**',
      '__tests__/**',
      'next-env.d.ts',
      '.git/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'off', // Allow apostrophes and quotes in JSX
    },
  },
];

