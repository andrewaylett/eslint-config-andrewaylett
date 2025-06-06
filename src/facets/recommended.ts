import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import js from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import prettier_required from 'eslint-plugin-prettier/recommended';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

import { merge } from '../merge.js';
import sortDestructureKeys from '../plugins/sort-destructure-keys.js';

import { importRules } from './import.js';

const recommended: FlatConfig.Config = merge('recommended', [
    js.configs.recommended,
    unicorn.configs.recommended,
    importRules,
    prettier_required,
    comments.recommended,
    { plugins: { 'sort-destructure-keys': sortDestructureKeys } },
    {
        rules: {
            'prettier/prettier': 'error',
            '@eslint-community/eslint-comments/disable-enable-pair': [
                'warn',
                { allowWholeFile: true },
            ],
            '@eslint-community/eslint-comments/no-aggregating-enable': ['warn'],
            '@eslint-community/eslint-comments/no-duplicate-disable': ['warn'],
            '@eslint-community/eslint-comments/no-unlimited-disable': ['warn'],
            '@eslint-community/eslint-comments/no-unused-disable': ['warn'],
            '@eslint-community/eslint-comments/no-unused-enable': ['warn'],
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
            'no-use-before-define': ['off'],
            'unicorn/prevent-abbreviations': ['off'],
            'unicorn/consistent-function-scoping': ['off'],
        },
    },
]);

export default recommended;
