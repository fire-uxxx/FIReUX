import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'
import admin from '../utils/firebase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia'
})

export default defineEventHandler(async event => {
  if (event.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return { error: 'Method Not Allowed' }
  }

  try {
    const body = await readBody(event)
    const { userId, collection, product, amount } = body

    if (!userId || !collection || !product || !amount) {
      setResponseStatus(event, 400)
      return { error: 'Missing required parameters' }
    }

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product },
            unit_amount: amount // in cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/`,
      cancel_url: `${process.env.FRONTEND_URL}/`
    })

    // Write a record to Firestore with proper fields
    const db = admin.firestore()
    await db.collection(collection).add({
      userId,
      product,
      amount, // store the raw amount (in cents)
      sessionId: session.id,
      // Use 'timestamp' (instead of createdAt) so the client can access it
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending' // Set initial status to pending
    })

    // Return both the session id and the URL so the client can redirect
    return {
      id: session.id,
      url: session.url
    }
  } catch (error) {
    setResponseStatus(event, 500)
    return { error: error?.message || 'Unknown error' }
  }
})
