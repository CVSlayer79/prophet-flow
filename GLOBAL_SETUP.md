# ProphetAI Global Expansion Guide

ProphetAI is built with a **Modular Architecture**. This means you can take the same code and deploy it for any country where real estate wholesaling is legal.

## 🌍 How to Add a New Country

To expand to the **UK**, **Canada**, or **Australia**, follow these steps:

### 1. Update `src/real_scraper.js`
Add the country configuration to the `regions` object:
```javascript
"UK": { 
    name: "United Kingdom", 
    currency: "GBP", 
    sources: ["Rightmove", "Gumtree", "Zoopla"] 
}
```

### 2. Legal Modules
Update the footer in `index.html` to include specific legal disclaimers for that region (e.g., UK Property Misdescriptions Act).

### 3. Pricing & Stripe
Create a new Stripe Product for the local currency and update the "Checkout" link in `index.html` based on the user's IP or a dropdown selector.

### 4. Data Sourcing
ProphetAI uses `agent-browser` for scraping. To target a new site:
- Run: `npx agent-browser "go to rightmove.co.uk, search London, find auction properties"`
- Copy the selector logic into `src/real_scraper.js`.

---

## 🏗 Modular File Structure
- `index.html`: The multi-region storefront.
- `src/real_scraper.js`: The engine that talks to global websites.
- `src/autopilot.js`: The brain that calculates profit in any currency.
- `src/db.js`: Stores leads from every country.

## 🚀 Deployment
Your site is ready for Vercel. Every time you push to GitHub, the global updates go live.
