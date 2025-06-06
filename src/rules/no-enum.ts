import { createRule } from './base.js';

export const noEnumRule = createRule({
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
    name: 'no-enum',
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
    defaultOptions: [],
});
