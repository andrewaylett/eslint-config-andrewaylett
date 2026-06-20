import tseslint from 'typescript-eslint';

import { merge } from '../merge.js';

import { importTsRules } from './import.js';

import type { Linter } from 'eslint';

export const typescript = merge('typescript', [
    ...(tseslint.configs.strict as Linter.Config[]),
    ...(tseslint.configs.stylistic as Linter.Config[]),
    importTsRules,
    {
        rules: {
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
]);

export const typescriptTyped = merge('typescript-with-types', [
    ...(tseslint.configs.strictTypeCheckedOnly as Linter.Config[]),
    ...(tseslint.configs.stylisticTypeCheckedOnly as Linter.Config[]),
    {
        rules: {
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { fixStyle: 'inline-type-imports' },
            ],
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowBoolean: true,
                    allowNumber: true,
                },
            ],
        },
    },
]);
