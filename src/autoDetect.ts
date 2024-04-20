import { readFileSync } from 'node:fs';

// A type matching the schema of the package-lock.json file
interface PackageLock {
    packages: Record<string, Dependencies | undefined>;
}

// A type matching the schema of a dependencies block in package-lock.json
interface Dependencies {
    version: string;
    resolved: string;
    integrity: string;
    dev?: boolean;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}

// Reads package-lock.json and traverses the dependency tree looking for the package
export function findPackage(pkg: string): boolean {
    try {
        require.resolve(pkg);
    } catch {
        // If we can't load it, it's definitely not available to us.
        return false;
    }

    // If we can load it, it might be because we pulled it in ourselves.
    // Check for that case.

    const packageLock = readFileSync('package-lock.json', 'utf-8');
    const lockData = JSON.parse(packageLock) as PackageLock;
    const packages = lockData.packages;

    const queue = [''];
    const visited = new Set();

    let current;
    while ((current = queue.shift()) !== undefined) {
        if (current.endsWith('eslint-config-andrewaylett')) {
            continue;
        }
        if (current === pkg) {
            return true;
        }
        if (!visited.has(current)) {
            visited.add(current);
            const currentDep =
                packages[current] ?? packages[`node_modules/${current}`];
            const newDeps = {
                ...(currentDep?.dependencies ?? {}),
                ...(currentDep?.devDependencies ?? {}),
                ...(currentDep?.peerDependencies ?? {}),
            };
            queue.push(...Object.keys(newDeps));
        }
    }

    return false;
}
