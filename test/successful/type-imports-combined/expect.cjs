/** @type {import('test-in-build').AssertFunction} */
const assert = (blob, expect) => {
  expect(blob).not.toMatch("error");
};

module.exports = { assert };
