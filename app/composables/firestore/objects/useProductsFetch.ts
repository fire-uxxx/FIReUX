import { useFirestoreFetch } from '@/composables/firestore/operations/useFirestoreFetch'
import type { Product } from '@/models/product.model'
import type { Ref } from 'vue'

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
