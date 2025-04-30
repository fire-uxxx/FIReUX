
/**
 * Handles product creation via Stripe + Firestore,
 * then redirects to the new product page.
 */
export function useProductCreate() {
  const currentUser = useCurrentUser()
  const router = useRouter()
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

    // Call backend to create product in Stripe and Firestore
    const response = await $fetch('/api/stripe/create-product', {
      method: 'POST',
      body: {
        userId,
        appId: APP_ID,
        collection,
        product: completeProductData
      }
    })

    // Redirect to the new product's page using slug
    if (product.slug) {
      router.push(`/admin/products/${product.slug}`)
    }

    return response
  }

  return { createProduct }
}
