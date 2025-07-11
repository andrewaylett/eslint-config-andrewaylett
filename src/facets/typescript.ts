import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import tseslint from 'typescript-eslint';

import { merge } from '../merge.js';

import { importTsRules } from './import.js';
import { Linter } from 'eslint';

export const typescript = merge('typescript', [
    ...(tseslint.configs.strict as Linter.Config[]),
    ...(tseslint.configs.stylistic as Linter.Config[]),
    importTsRules,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { fixStyle: 'inline-type-imports' },
            ],
        },
    },
]);

export const typescriptTyped = merge(
    'typescript-with-types',
    [
        ...(tseslint.configs.strictTypeCheckedOnly as Linter.Config[]),
        ...(tseslint.configs.stylisticTypeCheckedOnly as Linter.Config[]),
        {
            // No customisation at present
            rules: {},
        },
    ],
);
