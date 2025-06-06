import { ESLintUtils } from '@typescript-eslint/utils';

export interface ExamplePluginDocs {
    description: string;
    recommended?: boolean;
    requiresTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<ExamplePluginDocs>(
    (name) =>
        `https://github.com/andrewaylett/eslint-config.andrewaylett/tree/main/docs/${name}.md`,
);
