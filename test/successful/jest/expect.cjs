/** @type {import('test-in-build').AssertFunction} */
const assert = (blob, expect) => {
    expect(blob).not.toContain('No files matching the pattern "." were found.');
};

// eslint-disable-next-line no-undef
module.exports = { assert };
