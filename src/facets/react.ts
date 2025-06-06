import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import { merge } from '../merge.js';

export default merge('react', [
    {
        ...react.configs.flat.recommended,
        settings: { react: { version: 'detect' } },
    },
    reactHooks.configs['recommended-latest'],
    {
        rules: {
            'react/no-unescaped-entities': [
                'error',
                {
                    forbid: [
                        {
                            char: '>',
                            alternatives: ['&gt;'],
                        },
                        {
                            char: '}',
                            alternatives: ['&#125;'],
                        },
                    ],
                },
            ],
            'react/no-unknown-property': [
                'error',
                { ignore: ['property', 'resource', 'typeof', 'vocab'] },
            ],
            'react-hooks/exhaustive-deps': 'error',
        },
    },
]);
