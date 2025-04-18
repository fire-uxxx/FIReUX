import { useCollection, useDocument, useFirestore } from 'vuefire'
import { collection, doc, query, where } from 'firebase/firestore'
import type { Ref } from 'vue'

export function useFirestoreFetch() {
  function firestoreFetchCollection<T>(collectionName: string): {
    collectionData: Ref<T[] | undefined>
  } {
    const db = useFirestore()
    const config = useRuntimeConfig()
    const appId = config.public.APP_ID
    const colRef = query(
      collection(db, collectionName),
      where('appId', '==', appId)
    )
    const { data: collectionData } = useCollection<T>(colRef)
    return { collectionData }
  }

  function firestoreFetchDoc<T>(
    collectionName: string,
    id: string
  ): Ref<T | null | undefined> {
    const db = useFirestore()
    const docRef = doc(db, collectionName, id)
    const { data } = useDocument<T>(docRef)
    return data
  }

  return {
    firestoreFetchCollection,
    firestoreFetchDoc
  }
}
