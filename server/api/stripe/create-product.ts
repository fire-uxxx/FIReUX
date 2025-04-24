// server/api/create-stripe-product.ts

import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'
import admin from '../../utils/firebase'

export default defineEventHandler(async event => {
  const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY

  if (!STRIPE_SECRET_KEY) {
    setResponseStatus(event, 500)
    return { error: 'Missing Stripe Secret Key' }
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia'
  })

  if (event.node.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return { error: 'Method Not Allowed' }
  }

  try {
    const body = await readBody(event)
    const { userId, collection, product, appId } = body

    if (!userId || !collection || !product || !appId) {
      setResponseStatus(event, 400)
      return { error: 'Missing required parameters', received: body }
    }

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      images: [product.image],
      active: product.active,
      metadata: product.metadata || {}
    })

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: product.currency || 'usd'
    })

    const slug = product.slug // Use the slug generated earlier in the frontend

    const db = admin.firestore()
    await db.collection(collection).add({
      userId,
      appId,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
      slug,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      ...product // Optional: store the original product info for convenience
    })

    return {
      product: stripeProduct,
      price: stripePrice
    }
  } catch (error) {
    console.error('Stripe Product Creation Error:', error)
    setResponseStatus(event, 500)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
})
