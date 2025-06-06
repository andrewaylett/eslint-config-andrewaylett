declare module 'eslint-plugin-import' {
    import { type Linter } from 'eslint';

    export const rules: {
        'no-unresolved': Linter.RuleEntry;
        named: Linter.RuleEntry;
        default: Linter.RuleEntry;
        namespace: Linter.RuleEntry;
        'no-namespace': Linter.RuleEntry;
        export: Linter.RuleEntry;
        'no-mutable-exports': Linter.RuleEntry;
        extensions: Linter.RuleEntry;
        'no-restricted-paths': Linter.RuleEntry;
        'no-internal-modules': Linter.RuleEntry;
        'group-exports': Linter.RuleEntry;
        'no-relative-packages': Linter.RuleEntry;
        'no-relative-parent-imports': Linter.RuleEntry;
        'consistent-type-specifier-style': Linter.RuleEntry;
        'no-self-import': Linter.RuleEntry;
        'no-cycle': Linter.RuleEntry;
        'no-named-default': Linter.RuleEntry;
        'no-named-as-default': Linter.RuleEntry;
        'no-named-as-default-member': Linter.RuleEntry;
        'no-anonymous-default-export': Linter.RuleEntry;
        'no-unused-modules': Linter.RuleEntry;
        'no-commonjs': Linter.RuleEntry;
        'no-amd': Linter.RuleEntry;
        'no-duplicates': Linter.RuleEntry;
        first: Linter.RuleEntry;
        'max-dependencies': Linter.RuleEntry;
        'no-extraneous-dependencies': Linter.RuleEntry;
        'no-absolute-path': Linter.RuleEntry;
        'no-nodejs-modules': Linter.RuleEntry;
        'no-webpack-loader-syntax': Linter.RuleEntry;
        order: Linter.RuleEntry;
        'newline-after-import': Linter.RuleEntry;
        'prefer-default-export': Linter.RuleEntry;
        'no-default-export': Linter.RuleEntry;
        'no-named-export': Linter.RuleEntry;
        'no-dynamic-require': Linter.RuleEntry;
        unambiguous: Linter.RuleEntry;
        'no-unassigned-import': Linter.RuleEntry;
        'no-useless-path-segments': Linter.RuleEntry;
        'dynamic-import-chunkname': Linter.RuleEntry;
        'no-import-module-exports': Linter.RuleEntry;
        'no-empty-named-blocks': Linter.RuleEntry;
        'exports-last': Linter.RuleEntry;
        'no-deprecated': Linter.RuleEntry;
        'imports-first': Linter.RuleEntry;
    };

    export const configs: {
        recommended: Linter.Config;
        errors: Linter.Config;
        warnings: Linter.Config;
        'stage-0': Linter.Config;
        react: Linter.Config;
        'react-native': Linter.Config;
        electron: Linter.Config;
        typescript: Linter.Config;
    };

    export const flatConfigs: {
        recommended: Linter.Config;
        errors: Linter.Config;
        warnings: Linter.Config;
        react: Linter.Config;
        'react-native': Linter.Config;
        electron: Linter.Config;
        typescript: Linter.Config;
    };
}
