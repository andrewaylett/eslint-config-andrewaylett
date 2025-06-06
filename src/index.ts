import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

import packageJson from '../package.json' with { type: 'json' };

import { type Configs } from './presets.js';
import { noEnumRule } from './rules/no-enum.js';
import recommendedConfig from './facets/recommended.js';
import { mergeConfig } from './merge.js';
import { typescript, typescriptTyped } from './facets/typescript.js';
import jestConfigs from './facets/jest.js';
import react from './facets/react.js';

const plugin = {
    meta: {
        name: 'andrewaylett',
        version: packageJson.version,
    } as const,
    configs: {} as Partial<Configs>,
    rules: {
        'no-enum': noEnumRule,
    } as const,
    processors: {} as const,
} satisfies FlatConfig.Plugin;

const LOCAL: FlatConfig.Config = {
    plugins: {
        andrewaylett: plugin,
    },
    rules: {
        'andrewaylett/no-enum': 'error',
    },
} as const;

const sharedConfigs = {
    ...mergeConfig('recommended', [LOCAL, recommendedConfig, typescript]),
    ...mergeConfig('recommendedWithTypes', [
        LOCAL,
        recommendedConfig,
        typescript,
        typescriptTyped,
    ]),
    ...mergeConfig('recommendedWithJest', [
        LOCAL,
        recommendedConfig,
        typescript,
        jestConfigs,
    ]),
    ...mergeConfig('recommendedWithoutTypescript', [LOCAL, recommendedConfig]),
    ...mergeConfig('recommendedWithReact', [
        LOCAL,
        recommendedConfig,
        typescript,
        react,
    ]),
    ...mergeConfig('recommendedWithReactWithoutTypescript', [
        LOCAL,
        recommendedConfig,
        react,
    ]),
    ...mergeConfig('recommendedWithReactWithTypes', [
        LOCAL,
        recommendedConfig,
        typescript,
        typescriptTyped,
        react,
    ]),
    ...mergeConfig('recommendedWithJestWithoutTypescript', [
        LOCAL,
        recommendedConfig,
        jestConfigs,
    ]),
    ...mergeConfig('recommendedWithJestWithReact', [
        LOCAL,
        recommendedConfig,
        typescript,
        jestConfigs,
        react,
    ]),
    ...mergeConfig('recommendedWithJestWithReactWithoutTypescript', [
        LOCAL,
        recommendedConfig,
        jestConfigs,
        react,
    ]),
    ...mergeConfig('recommendedWithJestWithReactWithTypes', [
        LOCAL,
        recommendedConfig,
        typescript,
        typescriptTyped,
        jestConfigs,
        react,
    ]),
    ...mergeConfig('recommendedWithJestWithTypes', [
        LOCAL,
        recommendedConfig,
        typescript,
        jestConfigs,
    ]),
} as const satisfies Configs & FlatConfig.SharedConfigs;

// assign configs here so we can reference `plugin`
plugin.configs = sharedConfigs;

// noinspection JSUnusedGlobalSymbols
export default plugin as Readonly<FlatConfig.Plugin & { configs: Configs }>;
