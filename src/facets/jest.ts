import plugin from 'eslint-plugin-jest';

import { merge } from '../merge.js';

export default merge('jest', [
    plugin.configs['flat/recommended'],
    plugin.configs['flat/style'],
]);
