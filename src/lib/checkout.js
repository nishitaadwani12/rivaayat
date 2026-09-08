import { site } from '../config'

// Load Razorpay's checkout script once, on demand.
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

// Runs the full Razorpay flow: create an order on the server, open checkout,
// then verify the payment signature on the server.
// Returns { status: 'paid' | 'failed' | 'dismissed' | 'unavailable', paymentId? }
export async function payWithRazorpay({ amountRupeeTotal, customer, notes }) {
  let order
  try {
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(amountRupeeTotal * 100), notes }),
    })
    // Keys not configured yet on the server.
    if (res.status === 501) return { status: 'unavailable' }
    if (!res.ok) return { status: 'failed' }
    order = await res.json()
  } catch {
    return { status: 'unavailable' }
  }

  const ready = await loadRazorpayScript()
  if (!ready) return { status: 'failed' }

  return new Promise((resolve) => {
    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: site.brand,
      description: 'Order payment',
      order_id: order.orderId,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: '#7A1F2B' },
      handler: async (resp) => {
        try {
          const v = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resp),
          })
          const data = await v.json()
          resolve(
            data.valid
              ? { status: 'paid', paymentId: resp.razorpay_payment_id }
              : { status: 'failed' },
          )
        } catch {
          resolve({ status: 'failed' })
        }
      },
      modal: { ondismiss: () => resolve({ status: 'dismissed' }) },
    })
    rzp.open()
  })
}

// Optionally email the order to the shop owner via Formspree (if configured).
// Fire-and-forget: never blocks the customer's confirmation.
export function notifyOrder(order) {
  if (!site.orderNotifyFormspreeId) return
  fetch(`https://formspree.io/f/${site.orderNotifyFormspreeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(order),
  }).catch(() => {})
}
