import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import { merge } from '../merge.js';

export default merge('react', [
    {
        ...react.configs.flat.recommended,
        settings: { react: { version: 'detect' } },
    },
    reactHooks.configs.flat.recommended,
    {
        rules: {
            'react/jsx-uses-react': 'off',
            'react/no-unescaped-entities': [
                'error',
                {
                    forbid: [
                        {
                            alternatives: ['&gt;'],
                            char: '>',
                        },
                        {
                            alternatives: ['&#125;'],
                            char: '}',
                        },
                    ],
                },
            ],
            'react/no-unknown-property': [
                'error',
                { ignore: ['property', 'resource', 'typeof', 'vocab'] },
            ],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'error',
        },
    },
]);
