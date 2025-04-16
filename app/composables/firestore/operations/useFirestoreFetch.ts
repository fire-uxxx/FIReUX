import { useCollection, useDocument, useFirestore } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import type { Ref } from 'vue'

export function useFirestoreFetch() {
  function firestoreFetchCollection<T>(collectionName: string): {
    collectionData: Ref<T[] | undefined>
  } {
    const db = useFirestore()
    const colRef = collection(db, collectionName)
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
