// server/api/create-checkout-session.ts
import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'
import admin from '../utils/firebase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia'
})

export default defineEventHandler(async event => {
  // Only allow POST requests
  if (event.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return { error: 'Method Not Allowed' }
  }

  try {
    // Read and parse the request body
    const body = await readBody(event)
    const { userId, collection, product, amount } = body

    if (!userId || !collection || !product || !amount) {
      setResponseStatus(event, 400)
      return { error: 'Missing required parameters' }
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product },
            unit_amount: amount // amount in cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    })

    // Write a record of the transaction to Firestore
    const db = admin.firestore()
    await db.collection(collection).add({
      userId,
      product,
      amount,
      sessionId: session.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    return { id: session.id }
  } catch (error: unknown) {
    setResponseStatus(event, 500)
    let message = 'Unknown error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
})
