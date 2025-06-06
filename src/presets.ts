import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

type WithJest = 'WithJest' | '';
type WithReact = 'WithReact' | '';
type Typescript = 'WithoutTypescript' | 'WithTypes' | '';

type Recommended = `recommended${WithJest}${WithReact}${Typescript}`;

export type Configs = Record<Recommended, FlatConfig.Config>;
