# Mortgage Calculator (Next.js)

A responsive mortgage calculator built with **Next.js App Router**, **React**, and **TypeScript**.

It supports:
- **Repayment** mortgages (principal + interest)
- **Interest-only** mortgages
- Client-side validation
- Clean result state + reset flow

## Tech Stack

- `next@16.2.4`
- `react@19.2.4`
- `typescript@5`
- `eslint@9`
- Tailwind CSS package support is installed, while this app currently uses custom global CSS styles.

## Features

- Mortgage input fields:
  - Mortgage amount
  - Mortgage term (years)
  - Annual interest rate (%)
  - Mortgage type selection
- Validation:
  - Required inputs
  - Positive amount and term
  - Non-negative interest rate
  - Mortgage type selection required
- Results panel:
  - Monthly repayment
  - Total repayment over full term
- `Clear all` action to reset form and output
- Responsive layout for desktop and mobile

## Project Structure

```text
mortgage-calc/
├─ app/
│  ├─ globals.css      # Global styles + calculator UI styles
│  ├─ layout.tsx       # Root layout and metadata wiring
│  └─ page.tsx         # Main calculator UI + logic (client component)
├─ public/             # Static assets served from root
├─ package.json        # Scripts and dependencies
└─ README.md
```

## How Calculation Works

### 1) Repayment Mortgage

Uses the standard amortization formula:

```text
M = P * r * (1 + r)^n / ((1 + r)^n - 1)
```

Where:
- `M` = monthly payment
- `P` = principal (mortgage amount)
- `r` = monthly interest rate (`annualRate / 12`)
- `n` = total number of monthly payments (`years * 12`)

Total repayment is:

```text
total = M * n
```

### 2) Interest-Only Mortgage

Monthly payment:

```text
monthly = P * r
```

Total shown in this app:

```text
total = (monthly * n) + P
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

In `package.json`:

- `npm run dev` — start Next.js development server
- `npm run build` — create production build
- `npm run start` — run production server (after build)
- `npm run lint` — run ESLint checks

## Customization Guide

### Update styles

- Edit `app/globals.css` for:
  - color variables under `:root`
  - card/layout spacing
  - button/radio/input visuals

### Update behavior

- Edit `app/page.tsx` for:
  - validation rules (`validate` function)
  - formulas (`calculation` logic in `useMemo`)
  - additional input fields or output metrics

### Update metadata

- Edit `app/layout.tsx` for page title/description metadata.

## Notes

- The active calculator app is inside the Next.js `app/` directory.
- Legacy static template files (`index.html`, `css/`, `js/`) may still exist in the repository but are not used by the Next.js page.

## Deployment

You can deploy this Next.js app to any platform that supports Node.js, including:

- Vercel
- Netlify
- Render
- Railway

For Vercel, import the repository and deploy with default Next.js settings.

## License

This project currently has no explicit license file. Add a `LICENSE` file if you plan to distribute it publicly.
