# AGENTS.md

This file provides guidance for working with code in this repository.

## What This Is

A personal ESLint configuration package (ESLint v9 flat config only, ES modules, TypeScript). It lints itself using its own configuration. Exports a plugin with combinatorial presets for TypeScript, Jest, and React.

## Commands

```bash
# Build (TypeScript compiler with project references)
npm run buildonly

# Lint (requires build first — prelint does this automatically)
npm run lint

# Lint with auto-fix
npm run lint:fix

# Full build (clean + build + post-build checks)
npm run build

# Tests (runs lint, test-in-build, and downgrade-build)
npm test

# Run all pre-commit hooks
jj pre-commit
```

Note: `npm run build` runs tests as a prebuild step, which in turn runs lint as a pretest step. The full dependency chain is: clean → build → lint → test → build again.

## Architecture

The package produces a single ESLint plugin (`eslint-config-andrewaylett`) with named configs like `recommended`, `recommendedWithTypes`, `recommendedWithJest`, `recommendedWithReact`, and all valid combinations thereof.

### Source layout

-   `src/index.ts` — Entry point. Assembles the plugin by combining facets into all valid preset permutations.
-   `src/presets.ts` — Type-level definitions for valid config name combinations.
-   `src/merge.ts` — Utility to merge multiple ESLint flat configs.
-   `src/facets/` — Each facet adds rules for one concern:
    -   `recommended.ts` — Base rules (eslint:recommended, unicorn, prettier, import, eslint-comments).
    -   `typescript.ts` — TypeScript strict+stylistic, with optional type-checked variant.
    -   `jest.ts` — Jest plugin.
    -   `react.ts` — React + React Hooks.
    -   `import.ts` — Import ordering and rules.
-   `src/rules/no-enum.ts` — Custom rule disallowing TypeScript enums.
-   `src/plugins/sort-destructure-keys.ts` — Wrapper for the sort-destructure-keys plugin.

### Test structure

Tests use `test-in-build` and `downgrade-build` to validate that the published package works correctly with its declared peer dependency ranges. Test fixtures live in `test/successful/` and `test/failing/`.

## Style

-   Prettier: semicolons, single quotes, trailing commas.
-   4-space indentation (2-space for JSON/YAML).
-   The package's own `recommendedWithTypes` config is applied via `eslint.config.mjs`.
