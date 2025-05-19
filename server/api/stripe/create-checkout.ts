import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'
import admin from '../../utils/firebase'

export default defineEventHandler(async event => {
  const {
    public: { domain }
  } = useRuntimeConfig()

  const stripeSecretKey = useRuntimeConfig().stripeSecretKey

  if (!stripeSecretKey) {
    console.error('Stripe Secret Key is missing in runtimeConfig.')
    setResponseStatus(event, 500)
    return { error: 'Internal Server Error: Stripe Secret Key is missing.' }
  }

  const currency = 'usd'

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-04-30.basil'
  })

  if (event.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return { error: 'Method Not Allowed' }
  }

  try {
    const body = await readBody(event)
    const { userId, collection, product, amount } = body

    if (!userId || !collection || !product || !amount) {
      setResponseStatus(event, 400)
      return { error: 'Missing required parameters', received: body }
    }

    const frontendUrl = domain || 'https://fireux.app/'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: product },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`
    })

    const db = admin.firestore()
    await db.collection(collection).add({
      userId,
      product,
      amount,
      sessionId: session.id,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      currency
    })

    return {
      id: session.id,
      url: session.url
    }
  } catch (error) {
    console.error('Stripe Checkout Error:', error)
    setResponseStatus(event, 500)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
})
