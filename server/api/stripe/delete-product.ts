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
    const { slug, userId } = body

    if (!slug || !userId) {
      setResponseStatus(event, 400)
      return { error: 'Missing required parameters', received: body }
    }

    const db = admin.firestore()
    const productSnapshot = await db
      .collection('products')
      .where('slug', '==', slug)
      .where('userId', '==', userId)
      .get()

    if (productSnapshot.empty) {
      setResponseStatus(event, 404)
      return { error: 'Product not found' }
    }

    const productDoc = productSnapshot.docs[0]
    const productData = productDoc.data()

    if (productData.stripeProductId) {
      await stripe.products.del(productData.stripeProductId)
    }

    await productDoc.ref.delete()

    return { success: true }
  } catch (error) {
    console.error('Stripe Product Deletion Error:', error)
    setResponseStatus(event, 500)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
})
