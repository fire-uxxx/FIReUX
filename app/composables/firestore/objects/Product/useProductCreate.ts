// ~/composables/admin/useProductCreate.ts

export function useProductCreate() {
  const router = useRouter()
  const { updateDocument } = useFirestoreUpdate()
  const { product, mainImageData } = useCreateProductState()
  const { uploadImage } = useMediaStorage()

  type StripeCreateResponse =
    | { success: true; id: string }
    | {
        success: false
        error: string
        message?: string
        received?: Record<string, unknown>
      }

  async function createProduct() {
    if (!product.value.name?.trim()) {
      return { success: false, error: 'Product name is required.' }
    }

    // Ensure all required fields are safely initialized
    product.value.description = product.value.description || ''
    product.value.active = product.value.active ?? true
    product.value.prices = product.value.prices || []
    product.value.appId = product.value.appId || ''
    product.value.creatorId = product.value.creatorId || ''
    product.value.createdAt =
      product.value.createdAt || new Date().toISOString()
    product.value.updatedAt =
      product.value.updatedAt || new Date().toISOString()
    product.value.slug = product.value.slug || ''
    product.value.content = product.value.content || ''

    const response: StripeCreateResponse = await $fetch(
      '/api/stripe/create-product',
      {
        method: 'POST',
        body: {
          product: {
            name: product.value.name,
            description: product.value.description,
            active: product.value.active,
            prices: (product.value.prices || []).map(p => ({
              billing_scheme: p.billing_scheme,
              currency: p.currency,
              unit_amount: p.unit_amount,
              type: p.type,
              interval: p.interval,
              intervalCount: p.intervalCount,
              metadata: p.metadata
            }))
          }
        }
      }
    )

    if (!response.success) {
      console.error('❌ Stripe product creation failed:', response.error)
      return {
        success: false,
        error: response.error || 'Unknown error'
      }
    }

    if (!response.id) {
      console.error('❌ No Stripe product ID returned')
      return {
        success: false,
        error: 'No Stripe product ID returned'
      }
    }

    // Upload main image (if present in state)
    if (mainImageData.value) {
      try {
        const imageUrl = await uploadImage(
          mainImageData.value,
          'products',
          response.id,
          'main'
        )
        product.value.galleryImages = [imageUrl]
        product.value.image = imageUrl
      } catch (uploadError) {
        console.error('❌ Failed to upload image:', uploadError)
      }
    }

    try {
      await updateDocument('products', response.id, {
        appId: product.value.appId,
        creatorId: product.value.creatorId,
        createdAt: product.value.createdAt,
        updatedAt: product.value.updatedAt,
        slug: product.value.slug,
        content: product.value.content,
        image: product.value.image || '',
        galleryImages: product.value.galleryImages || []
      })

      router.push(`/products/${product.value.slug}`)
    } catch (err) {
      console.error('❌ Failed to update Firestore:', err)
      return {
        success: false,
        error: 'Failed to update Firestore'
      }
    }

    return response
  }

  return { createProduct }
}
