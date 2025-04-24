export function useProducts() {
  const { firestoreFetchCollection, firestoreFetchDoc } = useFirestoreManager()

  function fetchProducts(): { collectionData: Ref<Product[] | undefined> } {
    return firestoreFetchCollection<Product>('products')
  }

  function fetchProductById(id: string): Ref<Product | null | undefined> {
    return firestoreFetchDoc<Product>('products', id)
  }

  return {
    fetchProducts,
    fetchProductById,
    ...useProductCreate(),
    ...useProductUpdate(),
    ...useProductDelete(),
    ...useProductUtils()
  }
}
