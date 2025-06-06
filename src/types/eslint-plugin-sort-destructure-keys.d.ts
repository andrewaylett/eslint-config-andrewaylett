declare module 'eslint-plugin-sort-destructure-keys' {
    import { type RuleWithMetaAndName } from '@typescript-eslint/utils/eslint-utils';

    import { type ExamplePluginDocs } from '../rules/base.js';
    export const rules: {
        'sort-destructure-keys': Pick<
            RuleWithMetaAndName<
                [{ caseSensitive: boolean }],
                string,
                ExamplePluginDocs
            >,
            'meta' | 'create'
        >;
    };
}
