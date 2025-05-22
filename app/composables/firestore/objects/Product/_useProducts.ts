// ~/composables/useProducts.ts

export async function useProducts() {
  const {
    firestoreFetchCollection,
    firestoreFetchDoc,
    firestoreQueryOneByField,
    firestoreFetchSubcollection
  } = useFirestoreManager()

  // Fetch all products (scoped by tenant_id automatically)
  const { collectionData: productsCollection } =
    await firestoreFetchCollection<FirebaseProduct>('products')

  // After fetching products, load their prices and assign directly to product.prices
  if (productsCollection.value) {
    for (const product of productsCollection.value) {
      const prices = await fetchProductPrices(product.slug || '')
      product.prices = prices
    }
  }

  // Fetch by document ID
  async function fetchProduct(id: string): Promise<Ref<FirebaseProduct | null | undefined>> {
    return await firestoreFetchDoc<FirebaseProduct>('products', id)
  }

  // Fetch by slug (scoped by app_id automatically)
  function fetchProductBySlug(slug: string): Promise<FirebaseProduct | null> {
    return firestoreQueryOneByField<FirebaseProduct>('products', 'slug', slug)
  }

  const defaultCurrency = 'EUR'

  async function fetchProductPrices(productId: string): Promise<Price[] | []> {
    if (!productId) return []
    try {
      return await firestoreFetchSubcollection<Price>(
        'products',
        productId,
        'prices'
      )
    } catch (error) {
      console.error('Error fetching prices:', error)
      return []
    }
  }

  return {
    defaultCurrency,
    productsCollection,
    fetchProduct,
    fetchProductBySlug,
    fetchProductPrices,
    ...useProductCreate(),
    ...useProductUpdate(),
    ...useProductDelete(),
    ...useProductUtils()
  }
}
