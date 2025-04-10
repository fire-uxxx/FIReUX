import { useFirestore, useCollection, useDocument } from 'vuefire'
import { collection, query, where, doc } from 'firebase/firestore'
import type { Ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

// Function to fetch the collection of documents filtered by appId
export function useFirestoreFetchCollection<T>(collectionName: string): {
  collectionData: Ref<T[] | undefined>
} {
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  // Use exact equality on the 'appId' field, rather than array-contains
  const collQuery = query(
    collection(db, collectionName),
    where('appId', '==', APP_ID)
  )

  const { data: collectionData } = useCollection<T>(collQuery)

  return { collectionData }
}

// Function to fetch a single document by its ID
export function useFirestoreFetchDoc<T>(
  collectionName: string,
  id: string
): Ref<T | null | undefined> {
  const db = useFirestore()
  const docRef = doc(db, collectionName, id)
  const { data } = useDocument<T>(docRef)
  return data
}
