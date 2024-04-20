/** @type {import('test-in-build').AssertFunction} */
const assert = (blob, expect) => {
    expect(blob).toContain('1:1  error  Delete `;;;⏎`  prettier/prettier');
    expect(blob).toContain('1 problem (1 error, 0 warnings)');
};

// eslint-disable-next-line no-undef
module.exports = { assert };
