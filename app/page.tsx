"use client";

import { useMemo, useState } from "react";

type MortgageMode = "repayment" | "interestOnly";

type FormValues = {
  amount: string;
  years: string;
  rate: string;
  mode: MortgageMode | "";
};

type FormErrors = {
  amount?: string;
  years?: string;
  rate?: string;
  mode?: string;
};

function formatPounds(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.amount || Number(values.amount) <= 0) {
    errors.amount = "Enter a valid mortgage amount";
  }

  if (!values.years || Number(values.years) <= 0) {
    errors.years = "Enter the mortgage term in years";
  }

  if (!values.rate || Number(values.rate) < 0) {
    errors.rate = "Enter a valid annual interest rate";
  }

  if (!values.mode) {
    errors.mode = "Choose a mortgage type";
  }

  return errors;
}

export default function Home() {
  const [form, setForm] = useState<FormValues>({
    amount: "",
    years: "",
    rate: "",
    mode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const calculation = useMemo(() => {
    if (!submitted || hasErrors) {
      return null;
    }

    const principal = Number(form.amount);
    const years = Number(form.years);
    const annualRate = Number(form.rate) / 100;
    const monthlyRate = annualRate / 12;
    const months = years * 12;

    if (!months || principal <= 0 || annualRate < 0 || !form.mode) {
      return null;
    }

    if (form.mode === "repayment") {
      const monthlyPayment =
        monthlyRate === 0
          ? principal / months
          : (principal * monthlyRate * (1 + monthlyRate) ** months) /
            ((1 + monthlyRate) ** months - 1);

      return {
        monthly: monthlyPayment,
        total: monthlyPayment * months,
      };
    }

    const monthlyPayment = principal * monthlyRate;
    return {
      monthly: monthlyPayment,
      total: monthlyPayment * months + principal,
    };
  }, [form, hasErrors, submitted]);

  const updateField = (field: keyof FormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const clearAll = () => {
    setForm({ amount: "", years: "", rate: "", mode: "" });
    setErrors({});
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <main className="calculator-wrap">
        <section className="panel panel-form">
          <div className="title-row">
            <h1>Mortgage Calculator</h1>
            <button type="button" className="clear-link" onClick={clearAll}>
              Clear all
            </button>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className="field full">
              <label htmlFor="amount">Mortgage amount</label>
              <div className={`input-shell ${errors.amount ? "has-error" : ""}`}>
                <span>£</span>
                <input
                  id="amount"
                  type="number"
                  value={form.amount}
                  onChange={(event) => updateField("amount", event.target.value)}
                  placeholder="300000"
                />
              </div>
              {errors.amount ? <p className="error-text">{errors.amount}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="years">Mortgage term</label>
              <div className={`input-shell ${errors.years ? "has-error" : ""}`}>
                <input
                  id="years"
                  type="number"
                  value={form.years}
                  onChange={(event) => updateField("years", event.target.value)}
                  placeholder="25"
                />
                <span>years</span>
              </div>
              {errors.years ? <p className="error-text">{errors.years}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="rate">Interest rate</label>
              <div className={`input-shell ${errors.rate ? "has-error" : ""}`}>
                <input
                  id="rate"
                  type="number"
                  value={form.rate}
                  onChange={(event) => updateField("rate", event.target.value)}
                  placeholder="4.5"
                  step="0.01"
                />
                <span>%</span>
              </div>
              {errors.rate ? <p className="error-text">{errors.rate}</p> : null}
            </div>

            <div className="field full">
              <p className="radio-title">Mortgage type</p>
              <label className={`radio-card ${form.mode === "repayment" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="mode"
                  value="repayment"
                  checked={form.mode === "repayment"}
                  onChange={(event) => updateField("mode", event.target.value)}
                />
                Repayment
              </label>
              <label className={`radio-card ${form.mode === "interestOnly" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="mode"
                  value="interestOnly"
                  checked={form.mode === "interestOnly"}
                  onChange={(event) => updateField("mode", event.target.value)}
                />
                Interest only
              </label>
              {errors.mode ? <p className="error-text">{errors.mode}</p> : null}
            </div>

            <button className="submit-btn" type="submit">
              Calculate repayments
            </button>
          </form>
        </section>

        <section className="panel panel-results">
          {!calculation ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">
                🧮
              </div>
              <h2>Results shown here</h2>
              <p>
                Complete the form and click calculate repayments to see your monthly
                payment and the total amount over the full term.
              </p>
            </div>
          ) : (
            <div className="result-state">
              <h2>Your results</h2>
              <p className="result-copy">
                Based on the values entered, here is the estimated repayment breakdown.
              </p>

              <article className="result-card">
                <p>Your monthly repayments</p>
                <strong>{formatPounds(calculation.monthly)}</strong>
                <hr />
                <p>Total you&apos;ll repay over the term</p>
                <h3>{formatPounds(calculation.total)}</h3>
              </article>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
