# 🧵 Rivaayat — Traditional Co-ord Sets Store

A modern, interactive, 3D **ecommerce** store for traditional co-ord sets. Shoppers browse
the collection, pick a size, add to bag, and check out with **UPI / cards / netbanking
(Razorpay)**, **Cash on Delivery**, or order directly on **WhatsApp**. India / INR ready.

Built to be **free to build and host** (you only pay Razorpay's small per-sale fee when you
actually make a sale), and easy to edit even if you don't code.

## ✨ Features

- **Interactive 3D hero** (thread spool + folded-fabric panels), lazy-loaded for speed.
- **3D tilt product cards**, filterable catalog, quick-view with size selection.
- **Shopping bag** with quantities, delivery/free-shipping logic, saved between visits.
- **Checkout with two payment methods**: Razorpay (secure, server-verified) and Cash on Delivery.
- **WhatsApp ordering**: enquire about a piece, or send the whole bag as a message.
- Accessible and mobile-friendly (respects reduced motion, works without WebGL).

## 🛠️ Tech stack (all free / open-source)

Vite · React · Tailwind CSS · Framer Motion · react-three-fiber + drei + three ·
Razorpay (via Vercel serverless functions)

## 🚀 Run locally

```bash
npm install
npm run dev      # the storefront (browsing, bag, COD, WhatsApp all work)
```

> `npm run dev` runs the storefront only. To test **online payment** locally you need the
> serverless functions too — install the Vercel CLI (`npm i -g vercel`) and run `vercel dev`,
> with your keys in a local `.env` file (copy `.env.example`). COD and WhatsApp work without any of this.

## ✏️ Make it yours (no coding)

- **`src/config.js`** — brand name, tagline, currency, delivery fee / free-shipping threshold,
  which payment methods to show, your **WhatsApp number** (with country code, digits only, e.g.
  `919876543210`), Instagram, email. Optional `orderNotifyFormspreeId` emails you every order.
- **`src/data/products.js`** — your co-ord sets (name, price in ₹, category, fabric, description).
  For photos, drop files in **`public/`** and set `image: '/photo.jpg'`.

## 💳 Turn on online payments (Razorpay)

1. Create a free account at [razorpay.com](https://razorpay.com) and complete KYC to accept real
   money (test mode works instantly without KYC).
2. Dashboard → **Settings → API Keys** → generate a Key ID and Key Secret.
3. **Locally:** copy `.env.example` to `.env` and paste your keys (test keys start with `rzp_test_`).
4. **On Vercel:** Project → **Settings → Environment Variables** → add `RAZORPAY_KEY_ID` and
   `RAZORPAY_KEY_SECRET`. Redeploy.

Until keys are set, the store automatically hides online payment failures and steers shoppers to
**Cash on Delivery** or **WhatsApp**, so it always works.

**Fees:** no setup or monthly cost. Razorpay charges roughly **2% per successful payment** (plus
GST). COD and WhatsApp orders have no fee.

## ☁️ Deploy free on Vercel

1. Push to GitHub (done if you're reading this there).
2. [vercel.com](https://vercel.com) → New Project → import this repo → framework **Vite** is
   auto-detected. The `/api` folder becomes serverless functions automatically.
3. Add the two Razorpay environment variables (above), then **Deploy**. You get a free
   `*.vercel.app` URL; add a custom domain later.

## 🔒 Security notes

- The Razorpay **secret key lives only in environment variables** on the server, never in the
  browser or in git.
- Every payment is **verified server-side** (HMAC signature) in `api/verify-payment.js` before an
  order is treated as paid.
