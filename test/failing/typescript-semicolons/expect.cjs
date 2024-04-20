/** @type {import('test-in-build').AssertFunction} */
const assert = (blob, expect) => {
    expect(blob).not.toContain(
        "Parsing error: project was set to `true` but couldn't find any tsconfig.json relative to",
    );
    expect(blob).not.toContain('No files matching the pattern "." were found.');
    expect(blob).toContain('1:1  error  Delete `;;;⏎`  prettier/prettier');
    expect(blob).toContain('1 problem (1 error, 0 warnings)');
};

// eslint-disable-next-line no-undef
module.exports = { assert };
