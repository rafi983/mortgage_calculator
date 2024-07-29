document.addEventListener("DOMContentLoaded", (event) => {
  const radioButtons = document.querySelectorAll(".radio-button");

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      radioButtons.forEach((r) =>
        r.closest(".container").classList.remove("checked-container-color")
      );
      if (radio.checked) {
        radio.closest(".container").classList.add("checked-container-color");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const amountInput = document.querySelector("#amnt");
    const yearInput = document.querySelector("#year");
    const rateInput = document.querySelector("#rate");
    let typeInput = null;
    const radioButtons = document.querySelectorAll(".radio-button");
    const emptyDiv = document.querySelector("#emptyResults");
    const completedDiv = document.querySelector("#completedResults");
    const monthlyDiv = document.querySelector("#monthly");
    const totalDiv = document.querySelector("#total");

    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        typeInput = radioButton.value;
      }
    });
    if (
      amountInput.value.length == 0 ||
      yearInput.value.length == 0 ||
      rateInput.value.length == 0 ||
      typeInput == null
    ) {
      validate(amountInput.value, yearInput.value, rateInput.value, typeInput);
    } else {
      removeError(
        amountInput.value,
        yearInput.value,
        rateInput.value,
        typeInput
      );
      let amount = parseFloat(amountInput.value);
      let annualRate = parseFloat(rateInput.value) / 100;
      let term = parseInt(yearInput.value);

      const r = annualRate / 12; //monthly Interest
      const n = term * 12; //no of monthly payments
      if (typeInput === "Repayment") {
        //formula  - M = (p*r*(1+r)^n) / ((1+r)^n -1)
        const monthlyMortgage =
          (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = monthlyMortgage * 12 * term;
        emptyDiv.classList.add("hidden");
        completedDiv.classList.remove("hidden");
        monthlyDiv.textContent = `£${monthlyMortgage
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        totalDiv.textContent = `£${total
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      } else {
        let monthlyInterest = amount * annualRate;
        let totalInterest = monthlyInterest * n;
        emptyDiv.classList.add("hidden");
        completedDiv.classList.remove("hidden");
        monthlyDiv.textContent = `£${monthlyInterest
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        totalDiv.textContent = `£${totalInterest
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      }
    }
  });
});

//add validation
function validate(amnt, year, rate, type) {
  const amntErr = document.querySelector(".amnt-error");
  const yearErr = document.querySelector(".year-error");
  const rateErr = document.querySelector(".rate-error");
  const typeErr = document.querySelector(".type-error");
  const tags = document.querySelectorAll(".tags");
  const inputDiv = document.querySelectorAll(".input-div");

  if (amnt.length == 0) {
    amntErr.classList.add("visible");
    amntErr.classList.remove("invisible");
    tags[0].classList.add("input-error");
    tags[0].classList.remove("input-empty");
    inputDiv[0].classList.add("input-div-error");
    inputDiv[0].classList.remove("input-div-empty");
  } else {
    amntErr.classList.add("visible");
    amntErr.classList.add("invisible");
    tags[0].classList.remove("input-error");
    tags[0].classList.add("input-empty");
    inputDiv[0].classList.remove("input-div-error");
    inputDiv[0].classList.add("input-div-empty");
  }

  if (year.length == 0) {
    yearErr.classList.add("visible");
    yearErr.classList.remove("invisible");
    tags[1].classList.add("input-error");
    tags[1].classList.remove("input-empty");
    inputDiv[1].classList.add("input-div-error");
    inputDiv[1].classList.remove("input-div-empty");
  } else {
    yearErr.classList.remove("visible");
    yearErr.classList.add("invisible");
    tags[1].classList.remove("input-error");
    tags[1].classList.add("input-empty");
    inputDiv[1].classList.remove("input-div-error");
    inputDiv[1].classList.add("input-div-empty");
  }

  if (rate.length == 0) {
    rateErr.classList.add("visible");
    rateErr.classList.remove("invisible");
    tags[2].classList.add("input-error");
    tags[2].classList.remove("input-empty");
    inputDiv[2].classList.add("input-div-error");
    inputDiv[2].classList.remove("input-div-empty");
  } else {
    rateErr.classList.remove("visible");
    rateErr.classList.add("invisible");
    tags[2].classList.remove("input-error");
    tags[2].classList.add("input-empty");
    inputDiv[2].classList.remove("input-div-error");
    inputDiv[2].classList.add("input-div-empty");
  }
  if (type == null) {
    typeErr.classList.add("visible");
    typeErr.classList.remove("invisible");
  } else {
    typeErr.classList.remove("visible");
    typeErr.classList.add("invisible");
  }
}

//clear all
function clearForm() {
  const amountInput = document.querySelector("#amnt");
  const yearInput = document.querySelector("#year");
  const rateInput = document.querySelector("#rate");
  const radioButtons = document.querySelectorAll(".radio-button");
  const amntErr = document.querySelector(".amnt-error");
  const yearErr = document.querySelector(".year-error");
  const rateErr = document.querySelector(".rate-error");
  const typeErr = document.querySelector(".type-error");
  const tags = document.querySelectorAll(".tags");
  const inputDiv = document.querySelectorAll(".input-div");
  const emptyDiv = document.querySelector("#emptyResults");
  const completedDiv = document.querySelector("#completedResults");

  amountInput.value = "";
  yearInput.value = "";
  rateInput.value = "";
  radioButtons.forEach((radio) => {
    radio.checked = false;
    radio.closest(".container").classList.remove("checked-container-color");
  });

  amntErr.classList.add("visible");
  amntErr.classList.add("invisible");
  yearErr.classList.remove("visible");
  yearErr.classList.add("invisible");
  rateErr.classList.remove("visible");
  rateErr.classList.add("invisible");
  typeErr.classList.remove("visible");
  typeErr.classList.add("invisible");
  tags.forEach((tag) => {
    tag.classList.remove("input-error");
    tag.classList.add("input-empty");
  });
  inputDiv.forEach((div) => {
    div.classList.remove("input-div-error");
    div.classList.add("input-div-empty");
  });
  emptyDiv.classList.remove("hidden");
  completedDiv.classList.add("hidden");
}

function removeError(amnt, year, rate, type) {
  const amntErr = document.querySelector(".amnt-error");
  const yearErr = document.querySelector(".year-error");
  const rateErr = document.querySelector(".rate-error");
  const typeErr = document.querySelector(".type-error");
  const tags = document.querySelectorAll(".tags");
  const inputDiv = document.querySelectorAll(".input-div");

  if (amnt.length != 0) {
    amntErr.classList.add("visible");
    amntErr.classList.add("invisible");
    tags[0].classList.remove("input-error");
    tags[0].classList.add("input-empty");
    inputDiv[0].classList.remove("input-div-error");
    inputDiv[0].classList.add("input-div-empty");
  }
  if (year.length != 0) {
    yearErr.classList.remove("visible");
    yearErr.classList.add("invisible");
    tags[1].classList.remove("input-error");
    tags[1].classList.add("input-empty");
    inputDiv[1].classList.remove("input-div-error");
    inputDiv[1].classList.add("input-div-empty");
  }
  if (rate.length != 0) {
    rateErr.classList.remove("visible");
    rateErr.classList.add("invisible");
    tags[2].classList.remove("input-error");
    tags[2].classList.add("input-empty");
    inputDiv[2].classList.remove("input-div-error");
    inputDiv[2].classList.add("input-div-empty");
  }
  if (type != null) {
    typeErr.classList.remove("visible");
    typeErr.classList.add("invisible");
  }
}
