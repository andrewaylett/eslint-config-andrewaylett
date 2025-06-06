import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import tseslint from 'typescript-eslint';

import { merge } from '../merge.js';

import { importTsRules } from './import.js';

export const typescript: FlatConfig.Config = merge('typescript', [
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
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

export const typescriptTyped: FlatConfig.Config = merge(
    'typescript-with-types',
    [
        ...tseslint.configs.strictTypeCheckedOnly,
        ...tseslint.configs.stylisticTypeCheckedOnly,
        {
            // No customisation at present
            rules: {},
        },
    ],
);
