import { useCurrentUser } from 'vuefire'
import { useRuntimeConfig } from '#app'
import type { Product } from '@/models/product.model'

export function useProductCreate() {
  const currentUser = useCurrentUser()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  async function createProduct(
    product: Partial<Product>,
    collection = 'products'
  ) {
    if (!currentUser.value) throw new Error('[useProductCreate] No user')
    if (!APP_ID) throw new Error('[useProductCreate] No APP_ID')

    const userId = currentUser.value.uid

    const defaultProduct: Product = {
      id: '',
      slug: '',
      name: 'Untitled Product',
      description: 'No description provided.',
      price: 0,
      currency: 'USD',
      image: '/img/default-product.png',
      galleryImages: [],
      active: true,
      metadata: {},
      prices: [],
      productType: 'physical',
      secondaryText: '',
      stock: 0
    }

    const completeProductData = { ...defaultProduct, ...product }

    const response = await $fetch('/api/stripe/create-product', {
      method: 'POST',
      body: {
        userId,
        appId: APP_ID,
        collection,
        product: completeProductData
      }
    })

    return response
  }

  return { createProduct }
}
