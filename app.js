// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // hide result
  document.getElementById("results").style.display = "none";

  // show loading
  document.getElementById("loading").style.display = "block";

  // set time out
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log("Calculating...");
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // show results after spin
    document.getElementById("results").style.display = "block";

    // hide loading/spin
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your Numbers");
  }
}

// show error
function showError(error) {
  // hide results after spin
  document.getElementById("results").style.display = "none";

  // hide loading/spin
  document.getElementById("loading").style.display = "none";
  // create a div
  const errorDiv = document.createElement("div");

  // get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add a class
  errorDiv.className = "alert alert-danger";

  // create a node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
