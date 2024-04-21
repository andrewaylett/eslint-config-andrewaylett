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

import { findPackage } from './autoDetect';

import type { Linter } from 'eslint';
import type { ESLintRules } from 'eslint/rules';

const HAS_JEST: boolean = findPackage('jest');

const HAS_TYPESCRIPT: boolean = findPackage('typescript');

const jest_plugin = HAS_JEST ? ['jest', 'jest-formatting'] : [];
const ts_plugin = HAS_TYPESCRIPT
    ? ['@typescript-eslint', 'typescript-enum']
    : [];

// noinspection JSUnusedGlobalSymbols
const parser: Linter.Config<ESLintRules>['parser'] = HAS_TYPESCRIPT
    ? '@typescript-eslint/parser'
    : undefined;

// noinspection JSUnusedGlobalSymbols
const plugins: Linter.Config<ESLintRules>['plugins'] = [
    ...ts_plugin,
    'prettier',
    'eslint-comments',
    'import',
    ...jest_plugin,
    'sort-destructure-keys',
];

const jest_extends = HAS_JEST
    ? ['plugin:jest/recommended', 'plugin:jest-formatting/strict']
    : [];

const ts_extends = HAS_TYPESCRIPT
    ? [
          'plugin:@typescript-eslint/strict-type-checked',
          'plugin:@typescript-eslint/stylistic-type-checked',
          'plugin:import/typescript',
          'plugin:typescript-enum/recommended',
      ]
    : [];

const extend_s: Linter.Config<ESLintRules>['extends'] = [
    'eslint:recommended',
    ...ts_extends,
    'plugin:eslint-comments/recommended',
    ...jest_extends,
    'prettier',
];

const ts_rules: Linter.Config<ESLintRules>['rules'] = HAS_TYPESCRIPT
    ? {
          '@typescript-eslint/no-unused-vars': [
              'error',
              {
                  destructuredArrayIgnorePattern: '^_',
                  varsIgnorePattern: '^_',
              },
          ],
          '@typescript-eslint/consistent-type-imports': 'error',
      }
    : {};

// noinspection JSUnusedGlobalSymbols
const rules: Linter.Config<ESLintRules>['rules'] = {
    'prettier/prettier': 2,
    ...ts_rules,
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
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
    'sort-destructure-keys/sort-destructure-keys': 'error',

    // Ensure consistent use of file extension within the import path
    // The airbnb config we extend does not support TypeScript, so we override it here
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'never',
            jsx: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
        },
    ],

    // Additional ESLint rules for directive comments of ESLint
    // See: https://github.com/mysticatea/eslint-plugin-eslint-comments
    'eslint-comments/disable-enable-pair': ['warn', { allowWholeFile: true }],
    'eslint-comments/no-aggregating-enable': 'warn',
    'eslint-comments/no-duplicate-disable': 'warn',
    'eslint-comments/no-unlimited-disable': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'eslint-comments/no-unused-enable': 'warn',
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
    'unicorn/prevent-abbreviations': 0,
    'unicorn/consistent-function-scoping': 0,
};

// noinspection JSUnusedGlobalSymbols
const parserOptions: Linter.Config<ESLintRules>['parserOptions'] = {
    project: HAS_TYPESCRIPT,
};

// noinspection JSUnusedGlobalSymbols,ReservedWordAsName
export { parser, parserOptions, plugins, extend_s as extends, rules };
