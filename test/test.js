const treasuresplitJS = require("../src/treasuresplit");

test("Checking ", () => {
  expect(treasuresplitJS.treasuresplit().run("4,4,4,4").testData).toBe([2, 4]);
});
