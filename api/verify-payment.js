import crypto from 'crypto'

// Verifies the Razorpay payment signature on the server. This is what proves a
// payment is genuine, so it must never be skipped or done in the browser.
// Runs at POST /api/verify-payment.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' })
  }

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return res.status(501).json({ valid: false })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {}
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ valid: false })
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  // Constant-time compare to avoid timing attacks.
  const valid =
    expected.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))

  return res.status(200).json({ valid })
}
