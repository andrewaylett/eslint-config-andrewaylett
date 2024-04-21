/*
 * Copyright 2022 Andrew Aylett
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from 'node:path';
import { fileURLToPath } from 'url';

import js from '@eslint/js';
import { Linter } from 'eslint';
import { FlatCompat } from '@eslint/eslintrc';
import prettier_required from 'eslint-plugin-prettier/recommended';
import typescript_parser from '@typescript-eslint/parser';

import type { ESLintRules } from 'eslint/rules';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const HAS_JEST = await (async () => {
    try {
        await import('jest');
        return true;
    } catch {
        return false;
    }
})();

const jest_plugin: string[] = HAS_JEST ? ['jest', 'jest-formatting'] : [];

// noinspection JSUnusedGlobalSymbols
const jest_extends: string[] = HAS_JEST
    ? ['plugin:jest/recommended', 'plugin:jest-formatting/strict']
    : [];

// noinspection JSUnusedGlobalSymbols
const rules: Partial<ESLintRules> = {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
        },
    ],
    '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
            allowNumber: true,
            allowBoolean: true,
        },
    ],
    'import/prefer-default-export': ['off'],
    'no-use-before-define': ['off'],
    // Enforce a convention in the order of require/import statements
    // See https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    // Order:
    //   1. builtin (node native)
    //   2. react, react-dom, prop-types
    //   3. external (other external libraries)
    //   4. Backpack components
    //   5. common package (shared functionailities between client and server)
    //   6. parent (parent folders)
    //   7. sibling (sibling folders)
    //   8. index (same folder)
    //   9. Types
    //  10. Style files (scss, css)
    'import/order': [
        'error',
        {
            groups: [
                'builtin',
                'external',
                'parent',
                'sibling',
                'index',
                'type',
            ],
            'newlines-between': 'always',
            pathGroups: [
                {
                    pattern: '{react,react-dom,react-dom/server,prop-types}',
                    group: 'external',
                    position: 'before',
                },
                {
                    pattern:
                        '{bpk-*,bpk-**,bpk-*/**,bpk-*/**/**,@skyscanner/bpk-*/**/**,@skyscanner/backpack-web/**/**}',
                    group: 'external',
                    position: 'after',
                },
                {
                    pattern: 'common/**',
                    group: 'external',
                    position: 'after',
                },
                {
                    pattern: '{*.scss,*.css}',
                    group: 'type',
                    patternOptions: { matchBase: true },
                    position: 'after',
                },
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-dom', 'prop-types'],
        },
    ],

    // Require object destructure key to be sorted
    // https://github.com/mthadley/eslint-plugin-sort-destructure-keys
    'sort-destructure-keys/sort-destructure-keys': ['error'],

    // Ensure consistent use of file extension within the import path
    // The airbnb config we extend does not support TypeScript, so we override it here
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
    // Unfortunately Node.js in ESM mode doesn't seem to be consistent in what it wants to see
    // 'import/extensions': [
    //     'error',
    //     'ignorePackages',
    //     {
    //         js: 'never',
    //         jsx: 'never',
    //         mjs: 'never',
    //         ts: 'never',
    //         tsx: 'never',
    //     },
    // ],

    // Additional ESLint rules for directive comments of ESLint
    // See: https://github.com/mysticatea/eslint-plugin-eslint-comments
    'eslint-comments/disable-enable-pair': ['warn', { allowWholeFile: true }],
    'eslint-comments/no-aggregating-enable': ['warn'],
    'eslint-comments/no-duplicate-disable': ['warn'],
    'eslint-comments/no-unlimited-disable': ['warn'],
    'eslint-comments/no-unused-disable': ['warn'],
    'eslint-comments/no-unused-enable': ['warn'],
    'no-restricted-syntax': [
        'error',
        {
            selector: 'ForInStatement',
            message:
                'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
            selector: 'LabeledStatement',
            message:
                'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
            selector: 'WithStatement',
            message:
                '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
    ],
    'unicorn/prevent-abbreviations': ['off'],
    'unicorn/consistent-function-scoping': ['off'],
} satisfies Partial<ESLintRules>;

// noinspection JSUnusedGlobalSymbols,ReservedWordAsName
export default [
    js.configs.recommended,
    ...compat.plugins(
        '@typescript-eslint',
        'eslint-comments',
        ...jest_plugin,
        'import',
        'sort-destructure-keys',
        'typescript-enum',
    ),
    ...compat.extends(
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:eslint-comments/recommended',
        ...jest_extends,
        'plugin:import/typescript',
        'plugin:typescript-enum/recommended',
    ),
    prettier_required,
    {
        languageOptions: {
            parser: typescript_parser,
        },
        rules,
    } satisfies Linter.Config,
] satisfies Linter.Config[];
