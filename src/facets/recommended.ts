import js from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import prettier_required from 'eslint-plugin-prettier/recommended';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';

import { merge } from '../merge.js';

import { importRules } from './import.js';

const recommended = merge('recommended', [
    js.configs.recommended,
    unicorn.configs.recommended,
    importRules,
    prettier_required,
    comments.recommended,
    { plugins: { 'sort-destructure-keys': sortDestructureKeys } },
    {
        rules: {
            '@eslint-community/eslint-comments/disable-enable-pair': [
                'warn',
                { allowWholeFile: true },
            ],
            '@eslint-community/eslint-comments/no-aggregating-enable': ['warn'],
            '@eslint-community/eslint-comments/no-duplicate-disable': ['warn'],
            '@eslint-community/eslint-comments/no-unlimited-disable': ['warn'],
            '@eslint-community/eslint-comments/no-unused-disable': ['warn'],
            '@eslint-community/eslint-comments/no-unused-enable': ['warn'],
            curly: ['error', 'all'],
            'no-restricted-syntax': [
                'error',
                {
                    message:
                        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
                    selector: 'ForInStatement',
                },
                {
                    message:
                        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
                    selector: 'LabeledStatement',
                },
                {
                    message:
                        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
                    selector: 'WithStatement',
                },
            ],
            'no-use-before-define': ['off'],
            'prettier/prettier': 'error',
            'unicorn/consistent-function-scoping': ['off'],
            'unicorn/filename-case': ['off'],
            'unicorn/import-style': ['off'],
            'unicorn/no-array-reverse': ['off'],
            'unicorn/no-array-sort': ['off'],
            'unicorn/no-await-expression-member': ['off'],
            'unicorn/no-null': ['off'],
            'unicorn/prevent-abbreviations': ['off'],
        },
    },
]);

export default recommended;
