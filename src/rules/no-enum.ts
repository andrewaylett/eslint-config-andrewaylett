import { Rule } from 'eslint';

export const noEnumRule: Rule.RuleModule = {
    create(context) {
        return {
            TSEnumDeclaration(node) {
                context.report({
                    node,
                    messageId: 'noEnum',
                });
            },
        };
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
