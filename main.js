// Connects the page (HTML) to the logic (bmi.js).

const form = document.getElementById("bmi-form");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  const bmi = calculateBMI(weight, height);
  const category = bmiCategory(bmi);

  result.hidden = false;
  result.textContent = bmi === null ? category : `BMI: ${bmi} (${category})`;
});
