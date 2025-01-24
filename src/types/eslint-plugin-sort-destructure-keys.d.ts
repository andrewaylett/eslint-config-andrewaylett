declare module 'eslint-plugin-sort-destructure-keys' {
    import { type Linter } from 'eslint';

    export const rules: {
        'sort-destructure-keys': Linter.RuleModule;
    };
}
