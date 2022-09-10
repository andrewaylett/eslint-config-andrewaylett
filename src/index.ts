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

import { Linter } from 'eslint';
import { ESLintRules } from 'eslint/rules';

const parser: Linter.Config<ESLintRules>['parser'] =
    '@typescript-eslint/parser';
const plugins: Linter.Config<ESLintRules>['plugins'] = [
    '@typescript-eslint',
    'prettier',
    'eslint-comments',
    'import',
    'jest',
    'jest-formatting',
    'sort-destructure-keys',
    'typescript-enum',
];

const extend_s: Linter.Config<ESLintRules>['extends'] = [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/strict',
    'plugin:import/typescript',
    'plugin:typescript-enum/recommended',
    'prettier',
];
const rules: Linter.Config<ESLintRules>['rules'] = {
    'prettier/prettier': 2,
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
        },
    ],
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
    // The airbnb config we extend does not support TypeScript so we override it here
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
};

// noinspection JSUnusedGlobalSymbols,ReservedWordAsName
export { parser, plugins, extend_s as extends, rules };
