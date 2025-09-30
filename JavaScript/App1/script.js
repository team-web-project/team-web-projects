const counter = document.getElementById("count");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const resetButton = document.getElementById("reset");

let count = 0;
plusButton.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});

minusButton.addEventListener("click", () => {
  count--;
  counter.textContent = count;
});

resetButton.addEventListener("click", () => {
  count = 0;
  counter.textContent = count;
});
