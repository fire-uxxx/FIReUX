import { useFirestore, useCollection, useDocument } from 'vuefire'
import { collection, query, where, doc } from 'firebase/firestore'
import type { Ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

// Export each function individually so that they are globally available
export const firestoreFetchCollection = <T>(
  collectionName: string
): { collectionData: Ref<T[] | undefined> } => {
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  // Use exact equality on the 'appId' field
  const collQuery = query(
    collection(db, collectionName),
    where('appId', '==', APP_ID)
  )

  const { data: collectionData } = useCollection<T>(collQuery)

  return { collectionData }
}

export const firestoreFetchDoc = <T>(
  collectionName: string,
  id: string
): Ref<T | null | undefined> => {
  const db = useFirestore()
  const docRef = doc(db, collectionName, id)
  const { data } = useDocument<T>(docRef)
  return data
}

// Additionally, export a wrapper for easier usage if desired
export function useFirestoreFetch() {
  return {
    firestoreFetchCollection,
    firestoreFetchDoc
  }
}
