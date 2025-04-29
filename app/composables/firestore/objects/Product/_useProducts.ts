export function useProducts() {
  const { firestoreFetchCollection, firestoreFetchDoc } = useFirestoreManager()

  // Expose products collection
  const { collectionData: productsCollection } =
    firestoreFetchCollection<Product>('products')

  // Fetch single product by id
  function fetchProduct(id: string): Ref<Product | null | undefined> {
    return firestoreFetchDoc<Product>('products', id)
  }
  const currency = 'EUR'

  return {
    currency,
    productsCollection,
    fetchProduct,
    ...useProductCreate(),
    ...useProductUpdate(),
    ...useProductDelete(),
    ...useProductUtils()
  }
}
