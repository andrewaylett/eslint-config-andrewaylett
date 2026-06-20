/** @type {import('test-in-build').AssertFunction} */
const assert = (blob, expect) => {
  expect(blob).toMatch("error");
};

module.exports = { assert };
