import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

import { type Configs } from './presets.js';

export function merge(
    name: string,
    configArray: FlatConfig.ConfigArray,
): FlatConfig.Config {
    // eslint-disable-next-line unicorn/no-array-reduce
    const accumulated = configArray.reduce(
        (acc, config) => {
            acc.plugins = { ...acc.plugins, ...config.plugins };
            acc.rules = { ...acc.rules, ...config.rules };
            acc.languageOptions = {
                ...acc.languageOptions,
                ...config.languageOptions,
            };
            acc.files = [...(acc.files ?? []), ...(config.files ?? [])];
            return acc;
        },
        {
            plugins: {},
            rules: {},
            languageOptions: {},
            files: [],
        } satisfies FlatConfig.Config,
    );

    accumulated.name = name;
    return accumulated;
}

export function mergeConfig<K extends keyof Configs>(
    key: K,
    configArray: FlatConfig.ConfigArray,
): Pick<Configs, K> {
    const mergedConfig = merge(key, configArray);
    return { [key]: mergedConfig } as Pick<Configs, K>;
}
