import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // Keep output clean; use console.warn/error if needed.
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  },
  {
    files: ['src/domain/**/*.js'],
    rules: {
      // Domain must be pure.
      'no-console': 'error'
    }
  }
];
