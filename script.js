"use strict";

// Declare and initiate variables
let billValue = 0;
let tipValue = 0;
let totalNumberOfPeople = 0;
let totalCurrentTip = 0;
let totalTipPerPeople = 0;
let totalAmountPerPeople = 0;

const bill = document.querySelector(".calc__bill-value");
const tips = document.querySelectorAll(".calc__tip-amount");
const customTip = document.querySelector(".calc__custom-tip");
const numberOfPeople = document.querySelector(".calc__number-of-people");
const displayTotalTip = document.querySelector(".calc__total-tip");
const displayTotalAmount = document.querySelector(
  ".calc__total-amount-per-people"
);
const error = document.querySelector(".calc__error");
const resetButton = document.querySelector(".calc__reset-button");

const calculate = function () {
  totalCurrentTip = (Number(billValue) / 100) * Number(tipValue);
  totalTipPerPeople = totalCurrentTip / Number(totalNumberOfPeople);
  totalAmountPerPeople =
    (Number(billValue) + totalCurrentTip) / totalNumberOfPeople;
  if (numberOfPeople.value === "" || numberOfPeople.value == "0") {
    error.classList.remove("hidden");
    numberOfPeople.classList.add("error");
  } else {
    error.classList.add("hidden");
    numberOfPeople.classList.remove("error");
    resetButton.classList.add("active");
    displayTotalTip.textContent = `${totalTipPerPeople.toFixed(2)}`;
    displayTotalAmount.textContent = `${totalAmountPerPeople.toFixed(2)}`;
  }
};

const removeSelectedTipClass = function () {
  tips.forEach((tip) => tip.classList.remove("active"));
};

bill.addEventListener("keyup", function () {
  billValue = bill.value;
  calculate();
});

tips.forEach((tip) =>
  tip.addEventListener("click", function (e) {
    removeSelectedTipClass();
    tip.classList.add("active");
    tipValue = e.target.value;
    calculate();
  })
);

customTip.addEventListener("click", function () {
  removeSelectedTipClass();
});

customTip.addEventListener("keyup", function () {
  tipValue = customTip.value;
  calculate();
});

numberOfPeople.addEventListener("keyup", function (e) {
  totalNumberOfPeople = numberOfPeople.value;
  if (!tipValue) {
    tipValue = customTip.value;
  }
  calculate();
});

// RESET BUTTON
resetButton.addEventListener("click", function () {
  bill.value = "";
  removeSelectedTipClass();
  numberOfPeople.value = "";
  customTip.value = "";
  displayTotalTip.textContent = "0.00";
  displayTotalAmount.textContent = "0.00";
  resetButton.classList.remove("active");
});
