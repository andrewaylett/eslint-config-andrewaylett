import { type Rule, type JSSyntaxElement } from 'eslint';

export const noEnumRule: Rule.RuleModule = {
    create(context) {
        return {
            TSEnumDeclaration(node: JSSyntaxElement) {
                context.report({
                    node,
                    messageId: 'noEnum',
                });
            },
        } satisfies Rule.RuleListener;
    },
    meta: {
        docs: {
            description: 'Disallow the use of enums',
            recommended: true,
        },
        messages: {
            noEnum: 'Enums are not allowed. Use a union of string literals instead.',
        },
        type: 'problem',
        schema: [],
    },
};
