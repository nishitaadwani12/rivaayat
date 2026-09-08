import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../config'
import { money } from '../lib/format'
import { payWithRazorpay, notifyOrder } from '../lib/checkout'
import { useCart } from '../context/CartContext'

const EMPTY = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' }

export default function Checkout({ open, onClose }) {
  const { lines, subtotal, shipping, total, clear } = useCart()
  const [form, setForm] = useState(EMPTY)
  // Default to whichever method is enabled first.
  const [method, setMethod] = useState(site.payments.razorpay ? 'razorpay' : 'cod')
  const [step, setStep] = useState('form') // form | processing | success
  const [result, setResult] = useState(null) // { method, paymentId? }
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const missing = () => {
    const required = ['name', 'phone', 'address', 'city', 'pincode']
    return required.some((k) => !form[k].trim())
  }

  const finish = (info) => {
    // Record the order (emails the owner if Formspree is configured).
    notifyOrder({
      ...form,
      payment: info.method,
      paymentId: info.paymentId || 'N/A',
      items: lines.map((l) => `${l.name} (size ${l.size}) x${l.qty}`).join('; '),
      subtotal,
      shipping,
      total,
    })
    setResult(info)
    setStep('success')
    clear()
  }

  const placeOrder = async () => {
    setError('')
    if (missing()) {
      setError('Please fill in your name, phone, address, city and pincode.')
      return
    }

    // ── Cash on Delivery ───────────────────────────────
    if (method === 'cod') {
      finish({ method: 'Cash on Delivery' })
      return
    }

    // ── Razorpay (UPI / cards / netbanking) ────────────
    setStep('processing')
    const res = await payWithRazorpay({
      amountRupeeTotal: total,
      customer: form,
      notes: { city: form.city, pincode: form.pincode },
    })

    if (res.status === 'paid') {
      finish({ method: 'Razorpay (Paid)', paymentId: res.paymentId })
    } else if (res.status === 'unavailable') {
      setStep('form')
      setError(
        'Online payment is not switched on yet. Please choose Cash on Delivery, or order on WhatsApp.',
      )
      setMethod('cod')
    } else if (res.status === 'dismissed') {
      setStep('form') // shopper closed the payment window; no error
    } else {
      setStep('form')
      setError('The payment did not go through. Please try again or choose Cash on Delivery.')
    }
  }

  const close = () => {
    if (step === 'success') {
      setForm(EMPTY)
      setStep('form')
      setResult(null)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 'processing' ? undefined : close}
        >
          <motion.div
            className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-ivory p-6 shadow-lift sm:rounded-3xl sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {step === 'success' ? (
              <div className="py-6 text-center">
                <div className="text-6xl">🎉</div>
                <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Order placed!</h2>
                <p className="mt-2 text-ink/65">
                  Thank you, {form.name || 'friend'}. Your order is confirmed via {result?.method}.
                  {result?.paymentId ? ` Payment ID: ${result.paymentId}.` : ''} We will reach out
                  shortly with delivery details.
                </p>
                <button onClick={close} className="btn-primary mt-6">
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-semibold text-ink">Checkout</h2>
                  {step !== 'processing' && (
                    <button onClick={close} className="text-lg text-ink/60" aria-label="Close">
                      ✕
                    </button>
                  )}
                </div>

                <div className="mt-5 grid gap-3">
                  <input className="field" placeholder="Full name" value={form.name} onChange={set('name')} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className="field" placeholder="Phone number" value={form.phone} onChange={set('phone')} />
                    <input className="field" type="email" placeholder="Email (optional)" value={form.email} onChange={set('email')} />
                  </div>
                  <input className="field" placeholder="Address" value={form.address} onChange={set('address')} />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <input className="field" placeholder="City" value={form.city} onChange={set('city')} />
                    <input className="field" placeholder="State" value={form.state} onChange={set('state')} />
                    <input className="field" placeholder="Pincode" value={form.pincode} onChange={set('pincode')} />
                  </div>
                </div>

                {/* Payment method */}
                <div className="mt-6">
                  <p className="mb-2 text-sm font-bold uppercase tracking-wide text-ink/60">Payment</p>
                  <div className="grid gap-2">
                    {site.payments.razorpay && (
                      <Method
                        active={method === 'razorpay'}
                        onClick={() => setMethod('razorpay')}
                        title="Pay online"
                        desc="UPI, cards, netbanking and wallets via Razorpay. Secure."
                      />
                    )}
                    {site.payments.cod && (
                      <Method
                        active={method === 'cod'}
                        onClick={() => setMethod('cod')}
                        title="Cash on Delivery"
                        desc="Pay in cash when your order arrives."
                      />
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-1 rounded-2xl bg-white/70 p-4 text-sm">
                  <Row label="Subtotal" value={money(subtotal)} />
                  <Row label="Delivery" value={shipping === 0 ? 'Free' : money(shipping)} />
                  <Row label="Total" value={money(total)} bold />
                </div>

                {error && <p className="mt-4 rounded-2xl bg-maroon/10 px-4 py-3 text-sm font-semibold text-maroon">{error}</p>}

                <button onClick={placeOrder} disabled={step === 'processing'} className="btn-primary mt-5 w-full">
                  {step === 'processing'
                    ? 'Processing...'
                    : method === 'cod'
                    ? `Place order · ${money(total)}`
                    : `Pay ${money(total)}`}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Method({ active, onClick, title, desc }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
        active ? 'border-maroon bg-maroon/5' : 'border-ink/15 bg-white hover:border-maroon/40'
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${
          active ? 'border-maroon' : 'border-ink/30'
        }`}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-maroon" />}
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-ink/55">{desc}</span>
      </span>
    </button>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? 'font-display text-lg font-bold text-ink' : 'text-ink/70'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
