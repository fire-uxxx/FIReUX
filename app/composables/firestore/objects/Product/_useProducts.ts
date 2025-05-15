// ~/composables/useProducts.ts

export function useProducts() {
  const {
    firestoreFetchCollection,
    firestoreFetchDoc,
    firestoreQueryOneByField,
    firestoreFetchSubcollection
  } = useFirestoreManager()

  // Fetch all products (scoped by app_id automatically)
  const { collectionData: productsCollection } =
    firestoreFetchCollection<FirebaseProduct>('products')

  // Fetch by document ID
  function fetchProduct(id: string): Ref<FirebaseProduct | null | undefined> {
    return firestoreFetchDoc<FirebaseProduct>('products', id)
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
