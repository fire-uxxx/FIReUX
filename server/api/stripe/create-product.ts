import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY

  if (!STRIPE_SECRET_KEY) {
    setResponseStatus(event, 500)
    return {
      success: false,
      error: 'Missing Stripe Secret Key'
    }
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-04-30.basil'
  })

  if (event.node.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return {
      success: false,
      error: 'Method Not Allowed'
    }
  }

  try {
    const body = await readBody(event)
    const { product } = body

    if (!product?.name || !product?.prices?.[0]) {
      setResponseStatus(event, 400)
      return {
        success: false,
        error: 'Missing product name or prices array',
        received: body
      }
    }

    const images = product.image ? [product.image] : []

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      active: product.active,
      images
    })

    const firstPrice = product.prices[0]

    await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: firstPrice.unit_amount,
      currency: firstPrice.currency,
      billing_scheme: firstPrice.billing_scheme,
      recurring:
        firstPrice.type === 'recurring'
          ? {
              interval: firstPrice.interval ?? 'month',
              interval_count: firstPrice.intervalCount ?? 1
            }
          : undefined
    })

    return {
      success: true,
      message: 'Product and price created successfully',
      id: stripeProduct.id
    }
  } catch (error) {
    console.error('Stripe Product Creation Error:', error)
    setResponseStatus(event, 500)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})
