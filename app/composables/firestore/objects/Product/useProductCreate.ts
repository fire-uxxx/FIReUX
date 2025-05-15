// ~/composables/firestore/objects/Product/useProductCreate.ts

import { useCurrentUser } from 'vuefire'

export function useProductCreate() {
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  const { product, productPayload, mainImageData, resetCreateProductState } =
    useCreateProductState()
  const { pricesPayload, resetCreatePricesState } = useCreatePricesState()
  const { uploadImage } = useMediaStorage()
  const { updateProduct } = useProductUpdate()

  type StripeCreateResponse =
    | { success: true; id: string; message: string }
    | { success: false; error: string }

  const now = new Date().toISOString()

  async function createProduct() {
    const currentUser = useCurrentUser()
    while (!currentUser.value) await new Promise(r => setTimeout(r, 50))

    try {
      // Upload and assign image
      const imageUrl = await uploadImage(
        mainImageData.value,
        'products',
        product.value.id || '',
        'main'
      )

      product.value.main_image = imageUrl

      const stripePayload = {
        ...productPayload.value,
        images: [imageUrl],
        prices: pricesPayload.value
      }

      const response: StripeCreateResponse = await $fetch(
        '/api/stripe/create-product',
        {
          method: 'POST',
          body: { product: stripePayload }
        }
      )

      if (!response.success || !response.id) {
        console.error('❌ Stripe product creation failed:', response)
        return { success: false, error: 'Stripe product creation failed' }
      }

      await updateProduct(response.id, {
        main_image: product.value.main_image,
        app_id: APP_ID,
        creator_id: currentUser.value?.uid || '',
        slug: product.value.slug,
        content: product.value.content,
        product_type: product.value.product_type,
        stock: product.value.stock,
        track_stock: product.value.track_stock,
        created_at: now
      })

      resetCreateProductState()
      resetCreatePricesState()

      return { success: true, id: response.id }
    } catch (error) {
      console.error('❌ Product creation error:', error)
      return { success: false, error: 'Unexpected error occurred.' }
    }
  }

  return { createProduct }
}
