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

    // Validate product name
    if (!product.name || product.name.trim() === '') {
      setResponseStatus(event, 400)
      return { error: 'Missing or empty product name' }
    }

    // Validate image URL and build images array
    const isValidUrl = (url: string) => {
      try {
        new URL(url)
        return true
      } catch {
        return false
      }
    }
    const images: string[] = []
    if (product.image && isValidUrl(product.image.trim())) {
      images.push(product.image.trim())
    }

    // Build Stripe product parameters
    const productParams: Stripe.ProductCreateParams = {
      name: product.name,
      description: product.description,
      active: product.active,
      metadata: product.metadata || {}
    }
    if (images.length) {
      productParams.images = images
    }

    const stripeProduct = await stripe.products.create(productParams)

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: product.currency || 'usd'
    })

    const id = stripeProduct.id // Use Stripe-generated product ID
    const db = admin.firestore()
    const docRef = db.collection(collection).doc(id)
    await docRef.set({
      userId,
      appId,
      stripeProductId: id,
      stripePriceId: stripePrice.id,
      slug: id,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      ...product // Optional: store the original product info for convenience
    })

    return {
      product: stripeProduct,
      price: stripePrice,
      id
    }
  } catch (error) {
    console.error('Stripe Product Creation Error:', error)
    setResponseStatus(event, 500)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
})
