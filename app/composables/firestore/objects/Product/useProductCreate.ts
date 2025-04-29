export function useProductCreate() {
  const currentUser = useCurrentUser()
  // pull currency default
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  async function createProduct(
    product: Partial<Product>,
    collection = 'products'
  ) {
    const { currency } = useProducts()

    if (!currentUser.value) throw new Error('[useProductCreate] No user')
    if (!APP_ID) throw new Error('[useProductCreate] No APP_ID')

    const userId = currentUser.value.uid

    // combine incoming partial with default currency
    const completeProductData: Partial<Product> = {
      ...product,
      currency
    }

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
