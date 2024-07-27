const amountEl = document.getElementById("amount");
const termEl = document.getElementById("term");
const rateEl = document.getElementById("rate");
const clearAllBtn = document.querySelector(".clear-all-btn");
const calculateBtn = document.querySelector("button");
const resultsEmpty = document.querySelector(".results-empty");
const resultsCompleted = document.querySelector(".results-completed");
const monthlyRepayments = document.getElementById("monthly-repayments");
const totalRepaid = document.getElementById("total-repaid");
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interest-only");

let amount = Number(amountEl.value.trim());
let term = termEl.value.trim();
let rate = rateEl.value.trim();

repayment.checked = false;
interestOnly.checked = false;

//!  FUNCTIONS
const monthlyRepayment = (principal, numPayments, interestRate) => {
  const monthlyInterestRate = interestRate / 12;
  return (
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numPayments)) /
    (Math.pow(1 + monthlyInterestRate, numPayments) - 1)
  );
};

//? I "borrowed" this function from Wes Bos' JS30 - typeAhead - project because I just could not get toLocaleString() to work
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const removeErrors = (element) => {
  element.parentElement.nextElementSibling.style.display = "none";
  element.style.borderColor = "hsl(203, 41%, 72%)";
  element.nextElementSibling.style.backgroundColor = "hsl(202, 86%, 94%)";
  element.nextElementSibling.children[0].style.color = "hsl(200, 26%, 54%)";
  element.nextElementSibling.style.borderColor = "hsl(203, 41%, 72%)";
};

//!   EVENT LISTENERS
calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const interestRate = Number(rateEl.value / 100);
  const numPayments = Number(termEl.value * 12);
  let monthlyPaymentAmount;
  let totalToRepayOverTheTerm;

  //if repayment is checked and all other fields are completed
  if (repayment.checked && amountEl.value && termEl.value && rateEl.value) {
    monthlyPaymentAmount = monthlyRepayment(
      Number(amountEl.value),
      numPayments,
      interestRate
    );

    monthlyPaymentAmount = parseFloat(monthlyPaymentAmount);

    totalToRepayOverTheTerm = monthlyPaymentAmount * (termEl.value * 12);
    totalToRepayOverTheTerm = totalToRepayOverTheTerm.toFixed(2);

    monthlyRepayments.innerHTML = `£${numberWithCommas(
      monthlyPaymentAmount.toFixed(2)
    )}`;
    totalRepaid.innerHTML = `£${numberWithCommas(totalToRepayOverTheTerm)}`;
  }

  if (interestOnly.checked && amountEl.value && termEl.value && rateEl.value) {
    monthlyPaymentAmount = monthlyRepayment(
      Number(amountEl.value),
      numPayments,
      interestRate
    );

    totalToRepayOverTheTerm = monthlyPaymentAmount * Number(termEl.value * 12);

    let monthlyRepaymentInterestOnlyAmount =
      (totalToRepayOverTheTerm - amountEl.value) / (termEl.value * 12);

    monthlyRepaymentInterestOnlyAmount =
      monthlyRepaymentInterestOnlyAmount.toFixed(2);
    totalToRepayOverTheTerm = totalToRepayOverTheTerm.toFixed(2);

    monthlyRepayments.innerHTML = `£${numberWithCommas(
      monthlyRepaymentInterestOnlyAmount
    )}`;
    totalRepaid.innerHTML = `£${numberWithCommas(totalToRepayOverTheTerm)}`;
  }
  //! if inputs are empty"
  if (!amountEl.value) {
    amountEl.parentElement.nextElementSibling.style.display = "block";
    amountEl.style.borderColor = " hsl(4, 69%, 50%)";
    amountEl.nextElementSibling.style.backgroundColor = " hsl(4, 69%, 50%)";
    amountEl.nextElementSibling.children[0].style.color = "white";
    amountEl.nextElementSibling.style.borderColor = " hsl(4, 69%, 50%)";
  } else if (amountEl.value) {
    removeErrors(amountEl);
  }

  if (!termEl.value) {
    termEl.parentElement.nextElementSibling.style.display = "block";
    termEl.style.borderColor = " hsl(4, 69%, 50%)";
    termEl.nextElementSibling.style.backgroundColor = " hsl(4, 69%, 50%)";
    termEl.nextElementSibling.children[0].style.color = "white";
    termEl.nextElementSibling.style.borderColor = " hsl(4, 69%, 50%)";
  } else if (amountEl.value) {
    removeErrors(termEl);
  }

  if (!rateEl.value) {
    rateEl.parentElement.nextElementSibling.style.display = "block";
    rateEl.style.borderColor = " hsl(4, 69%, 50%)";
    rateEl.nextElementSibling.style.backgroundColor = " hsl(4, 69%, 50%)";
    rateEl.nextElementSibling.children[0].style.color = "white";
    rateEl.nextElementSibling.style.borderColor = " hsl(4, 69%, 50%)";
  } else if (rateEl.value) {
    removeErrors(rateEl);
  }

  resultsEmpty.style.display = "none";
  resultsCompleted.style.display = "block";

  //! if no radio btn is checked - show error
  if (!repayment.checked || !interestOnly.checked) {
    interestOnly.parentElement.nextElementSibling.style.display = "block";
  }
  if (repayment.checked || interestOnly.checked) {
    interestOnly.parentElement.nextElementSibling.style.display = "none";
  }
});

clearAllBtn.addEventListener("click", () => {
  console.log("clicked");

  amountEl.value = "";
  termEl.value = "";
  rateEl.value = "";
  repayment.checked = false;
  interestOnly.checked = false;

  //!  AND REMOVE RED ERROR BITS
  removeErrors(amountEl);
  removeErrors(termEl);
  removeErrors(rateEl);

  interestOnly.parentElement.nextElementSibling.style.display = "none";

  monthlyRepayments.innerHTML = `£`;
  totalRepaid.innerHTML = `£`;

  resultsEmpty.style.display = "block";
  resultsCompleted.style.display = "none";
});
