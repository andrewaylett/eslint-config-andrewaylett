import { type Linter } from 'eslint';

type WithJest = 'WithJest' | '';
type WithReact = 'WithReact' | '';
type Typescript = 'WithoutTypescript' | 'WithTypes' | '';

export type Recommended = `recommended${WithJest}${WithReact}${Typescript}`;

export type Configs = Record<Recommended, Linter.Config>;
