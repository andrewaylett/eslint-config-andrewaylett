import importPlugin from 'eslint-plugin-import';
import { type Linter } from 'eslint';

import { merge } from '../merge.js';

export const importRules: Linter.Config = merge('import', [
    importPlugin.flatConfigs.recommended,
    {
        rules: {
            'import/no-unresolved': ['off'],
            'import/prefer-default-export': ['off'],
            'no-duplicate-imports': ['error', { includeExports: true }],
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
                            pattern:
                                '{react,react-dom,react-dom/server,prop-types}',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '{*.scss,*.css}',
                            group: 'type',
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
        },
    },
]);

export const importTsRules: Linter.Config = merge('import-typescript', [
    importPlugin.flatConfigs.typescript,
    {
        rules: {
            'import/consistent-type-specifier-style': [
                'error',
                'prefer-inline',
            ],
        },
    },
]);
