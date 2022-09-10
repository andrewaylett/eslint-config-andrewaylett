# eslint-config-andrewaylett

My personal preferences for ESLint rules

## Motivation

Working for Skyscanner, I'm a big fan of eslint-config-skyscanner.
But there are a couple of things that make it less ideal for external projects and ones that don't use React,
so this is _my_ set of preferences for my own projects.

Feel free to use it directly if you don't mind the somewhat opinionated stance,
or to copy any bits out of it if you don't want to be subject to any whimsical changes of mind.

## Execution

This is a complete Typescript configuration.
It's also written in Typescript, and linted using its own ruleset.

The post build test validates some constraints, most usefully it ensures that the ranges of peer dependencies are appropriate.
We do this by mangling the content of package.json in a temporary directory and linting, testing, and building again.
