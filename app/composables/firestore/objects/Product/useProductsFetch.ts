
export function useProductFetch(): {
  productCollection: Ref<Product[] | undefined>
  fetchProduct: (id: string) => Ref<Product | null | undefined>
} {
  const { firestoreFetchCollection, firestoreFetchDoc } = useFirestoreFetch()
  const { collectionData: productCollection } =
    firestoreFetchCollection<Product>('products')

  function fetchProduct(id: string): Ref<Product | null | undefined> {
    return firestoreFetchDoc<Product>('products', id)
  }

  return {
    productCollection,
    fetchProduct
  }
}
