/** @type {import('test-in-build').AssertFunction} */
const assert = (blob, expect) => {
    expect(blob).toContain(
        "Parsing error: project was set to `true` but couldn't find any tsconfig.json relative to",
    );
    expect(blob).toContain('1 problem (1 error, 0 warnings)');
};

// eslint-disable-next-line no-undef
module.exports = { assert };
