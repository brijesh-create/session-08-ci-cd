// Automatic checks. The CI pipeline runs these on every push.
// If any check fails, the pipeline stops and nothing is deployed.

const test = require("node:test");
const assert = require("node:assert");
const { calculateBMI, bmiCategory } = require("./bmi.js");

test("calculates BMI correctly", () => {
  assert.strictEqual(calculateBMI(70, 175), 22.9);
});

test("rejects invalid input", () => {
  assert.strictEqual(calculateBMI(0, 175), null);
  assert.strictEqual(calculateBMI(70, -1), null);
});

test("gives the right category", () => {
  assert.strictEqual(bmiCategory(17), "Underweight");
  assert.strictEqual(bmiCategory(22.9), "Healthy");
  assert.strictEqual(bmiCategory(27), "Overweight");
  assert.strictEqual(bmiCategory(32), "Obese");
});
