import importPlugin from 'eslint-plugin-import';

import { merge } from '../merge.js';

import type { Linter } from 'eslint';

export const importRules: Linter.Config = merge('import', [
    importPlugin.flatConfigs.recommended,
    {
        rules: {
            'import/no-duplicates': ['error', { 'prefer-inline': true }],
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: [
                        '**/*.{test,spec}.{m,}{t,j}s{x,}',
                        '*.{m,}{t,j}s',
                        '**/test/**',
                    ],
                },
            ],
            'import/no-unresolved': ['off'],
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
                            group: 'external',
                            pattern:
                                '{react,react-dom,react-dom/server,prop-types}',
                            position: 'before',
                        },
                        {
                            group: 'type',
                            pattern: '{*.scss,*.css}',
                            patternOptions: { matchBase: true },
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: [
                        'react',
                        'react-dom',
                        'prop-types',
                    ],
                },
            ],
            'import/prefer-default-export': ['off'],
            'no-duplicate-imports': ['error', { includeExports: true }],
        },
    },
]);

export const importTsRules: Linter.Config = merge('import-typescript', [
    importPlugin.flatConfigs.typescript,
    {
        rules: {
            'import/consistent-type-specifier-style': [
                'off',
                'prefer-top-level',
            ],
        },
    },
]);
