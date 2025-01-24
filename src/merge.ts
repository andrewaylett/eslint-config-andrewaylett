import { type Linter } from 'eslint';

import { type Recommended } from './presets.js';

export function merge(
    name: string,
    configArray: Linter.Config[],
): Linter.Config {
    // eslint-disable-next-line unicorn/no-array-reduce
    const accumulated = configArray.reduce(
        (acc, config) => {
            acc.plugins = { ...acc.plugins, ...config.plugins };
            acc.rules = { ...acc.rules, ...config.rules };
            acc.languageOptions = {
                ...acc.languageOptions,
                ...config.languageOptions,
            };
            return acc;
        },
        {
            plugins: {},
            rules: {},
            languageOptions: {},
        } satisfies Linter.Config,
    );

    accumulated.name = name;
    return accumulated;
}

export function mergeConfig<K extends Recommended>(
    key: K,
    configArray: Linter.Config[],
): Record<K, Linter.Config> {
    const mergedConfig = merge(key, configArray);
    return { [key]: mergedConfig } as Record<K, Linter.Config>;
}
