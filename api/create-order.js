import Razorpay from 'razorpay'

// Creates a Razorpay order on the server so the secret key never reaches the
// browser. Runs as a Vercel serverless function at POST /api/create-order.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  // 501 tells the site "payments aren't set up yet" so it can fall back to COD.
  if (!keyId || !keySecret) {
    return res.status(501).json({ error: 'Payments not configured' })
  }

  const { amount, notes } = req.body || {}
  // amount is in paise; guard against junk / tiny values.
  if (!amount || typeof amount !== 'number' || amount < 100) {
    return res.status(400).json({ error: 'Invalid amount' })
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: notes || {},
    })
    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // public key id, safe to send to the browser
    })
  } catch (err) {
    return res.status(500).json({ error: 'Could not create order' })
  }
}
