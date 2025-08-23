import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default tseslint.config(
    // Base JavaScript recommended rules
    js.configs.recommended,
    
    // TypeScript recommended rules
    ...tseslint.configs.recommended,
    
    // Vue 3 essential rules  
    ...vue.configs['flat/essential'],
    
    // Global configuration for all files
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        rules: {
            'indent': ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'double'],
            'semi': ['error', 'always'],
            '@typescript-eslint/ban-ts-comment': ['warn'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { 
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true 
            }],
            '@typescript-eslint/no-unsafe-function-type': 'warn',
            '@typescript-eslint/no-unused-expressions': 'error',
        },
    },
    
    // Vue files configuration
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            // Disable TypeScript rules that might conflict with Vue
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
    
    // Ignore configuration
    {
        ignores: [
            'dist/**',
            'coverage/**',
            'vite.config.ts',
            'vitest.config.ts',
            'tailwind.config.js',
            'postcss.config.js',
        ],
    },
);
