import tseslint from 'typescript-eslint';
import { type Linter } from 'eslint';

import { merge } from '../merge.js';

import { importTsRules } from './import.js';

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
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowNumber: true,
                    allowBoolean: true,
                },
            ],
        },
    },
]);

export const typescriptTyped = merge('typescript-with-types', [
    ...(tseslint.configs.strictTypeCheckedOnly as Linter.Config[]),
    ...(tseslint.configs.stylisticTypeCheckedOnly as Linter.Config[]),
    {
        // No customisation at present
        rules: {},
    },
]);
