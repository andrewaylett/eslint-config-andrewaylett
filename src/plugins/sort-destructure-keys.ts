import { rules } from 'eslint-plugin-sort-destructure-keys';
import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

import { createRule } from '../rules/base.js';

export default {
    rules: {
        'sort-destructure-keys': createRule({
            ...rules['sort-destructure-keys'],
            meta: {
                ...rules['sort-destructure-keys'].meta,
                type: 'layout',
                fixable: 'code',
            },
            name: 'sort-destructure-keys',
            defaultOptions: [
                {
                    caseSensitive: true,
                },
            ],
        }),
    },
} satisfies FlatConfig.Plugin;
