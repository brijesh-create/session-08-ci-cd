// The app's logic. Small, pure functions, so they are easy to test.

function calculateBMI(weightKg, heightCm) {
  if (!(weightKg > 0) || !(heightCm > 0)) return null;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

function bmiCategory(bmi) {
  if (bmi === null) return "Invalid input";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// Lets the test file (run by Node) use these functions.
// The browser ignores this line.
if (typeof module !== "undefined") {
  module.exports = { calculateBMI, bmiCategory };
}
