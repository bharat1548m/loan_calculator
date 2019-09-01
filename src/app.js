/*
Here's the formula to calculate EMI:
E = P * r * ((1 + r)^n/((1 + r)^n - 1))
-> E is EMI(Equated Monthly Installment)
-> P is Principal Loan Amount
-> r is rate of interest calculated on monthly basis. (i.e., r = Rate of Annual interest/12/100. If rate of interest is 10.5% per annum, then r = 10.5/12/100=0.00875)
-> n is loan term / tenure / duration in number of months

For example, if you borrow ₹10,00,000 from the bank at 10.5% annual interest for a period of 10 years (i.e., 120 months), then EMI = ₹10,00,000 * 0.00875 * (1 + 0.00875)120 / ((1 + 0.00875)120 - 1) = ₹13,493. i.e., you will have to pay ₹13,493 for 120 months to repay the entire loan amount. The total amount payable will be ₹13,493 * 120 = ₹16,19,220 that includes ₹6,19,220 as interest toward the loan.
*/

// variable declations
const amount = document.querySelector("#amount");
const rate = document.querySelector("#rate");
const tenure = document.querySelector("#tenure");
const calcBtn = document.querySelector("#calc-btn");
const monthlyPayment = document.querySelector("#monthly-payment");
const totalInterest = document.querySelector("#total-interest");
const totalPayment = document.querySelector("#total-payment");

// event listener
document.querySelector("#loan-form").addEventListener("submit", calculateEMI);

// calculateEMI
function calculateEMI(e) {
  e.preventDefault();
  if(amount.value.trim() !== "" && rate.value.trim() !== "" && tenure.value.trim() !== "") {
    // get values
    const principal = parseFloat(amount.value);
    const rateOfInterest = parseFloat(rate.value / 12 / 100);
    const numberOfMonths = parseFloat(tenure.value * 12);

    // calculations
    const x = Math.pow(1 + rateOfInterest, numberOfMonths);
    const emi = principal * rateOfInterest * (x / (x - 1));
    if(isFinite(emi)) {
      document.querySelector("#result-container").style.display = "block";
      // display results
      monthlyPayment.value = emi.toFixed(2);
      totalPayment.value = (emi * numberOfMonths).toFixed(2);
      totalInterest.value = ((emi * numberOfMonths) - principal).toFixed(2);
    } else {
      checkValuesError();
    }
  } else {
    blankValuesError();
  }
}

function blankValuesError() {
  const html = `<div class="alert alert-danger">
                  <p class="mb-0">Cannot accept blank values</p>
                </div>`;
  
  // get element
  const card = document.querySelector(".card-body");
  // insert html
  card.insertAdjacentHTML("afterbegin", html);
  // disable button to avoid multiple alerts on UI
  calcBtn.disabled = true;

  // clear alert from UI
  setTimeout(function() {
    document.querySelector(".alert-danger").remove();
    // enable button again
    calcBtn.disabled = false;
  }, 2000);
}

function checkValuesError() {
  const html = `<div class="alert alert-danger">
                  <p class="mb-0">Please check the Entered Values</p>
                </div>`;

// get element
const card = document.querySelector(".card-body");
// insert html
card.insertAdjacentHTML("afterbegin", html);
// disable button to avoid multiple alerts on UI
calcBtn.disabled = true;

  // clear alert from UI
  setTimeout(function() {
  document.querySelector(".alert-danger").remove();
  // enable button again
  calcBtn.disabled = false;
  }, 2000);
}