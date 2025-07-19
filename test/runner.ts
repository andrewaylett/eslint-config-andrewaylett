import { testBuild } from 'test-in-build';

await testBuild('.', 'test', (details) => ({
    cmd: 'npm',
    args: ['run', 'lint'],
    cwd: details.testDirectory,
}));
