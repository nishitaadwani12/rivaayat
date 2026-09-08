// ─────────────────────────────────────────────────────────────
//  Rivaayat — store settings. Change these to make the store yours.
//  No secret keys live in this file (those go in environment variables,
//  see README). This file is safe to share publicly.
// ─────────────────────────────────────────────────────────────

export const site = {
  brand: 'Rivaayat',
  tagline: 'Traditional co-ord sets, woven for every occasion.',
  intro:
    'Handpicked co-ord sets in timeless Indian prints. Comfortable, elegant and made to be worn again and again.',

  currency: 'INR',
  locale: 'en-IN',

  // Free delivery above this cart value (in rupees). Set to 0 to always charge.
  freeShippingAbove: 1999,
  shippingFee: 99,

  // Payment methods to offer at checkout.
  payments: {
    razorpay: true, // UPI, cards, netbanking, wallets (needs keys, see README)
    cod: true, // Cash on Delivery works with no setup
  },

  // OPTIONAL: paste a free Formspree ID (formspree.io) to also get an email
  // for every order placed. Leave '' to skip. Orders still work without it.
  orderNotifyFormspreeId: '',

  // WhatsApp ordering / enquiries. Full number with country code, digits only
  // (no +, spaces or dashes). Example for India: '919876543210'.
  // Leave '' to hide all WhatsApp buttons.
  whatsapp: '',

  // Contact shown in the footer. Leave '' to hide.
  instagram: '',
  email: '',
  phone: '',
}
