import eslintPluginAstro from 'eslint-plugin-astro';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
export default defineConfig([
  globalIgnores(['**/*.d.ts', '/.astro']),
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      '**/*.d.ts',
      '/.astro',
      './.astro/',
      'node_modules/',
      'dist/',
      'build/',
      '.vercel/',
      '.output/',
      'public/',
    ],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
