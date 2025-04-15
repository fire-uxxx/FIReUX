import { useFirestore, useCollection, useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'

export function useFirestoreFetch() {
  const db = useFirestore()

  function firestoreFetchCollection<T>(collectionName: string): {
    collectionData: Ref<T[] | undefined>
  } {
    const colRef = collection(db, collectionName)
    const { data: collectionData } = useCollection<T>(colRef)
    return { collectionData }
  }

  function firestoreFetchDoc<T>(
    collectionName: string,
    id: string
  ): Ref<T | null | undefined> {
    const docRef = doc(db, collectionName, id)
    const { data } = useDocument<T>(docRef)
    return data
  }

  return {
    firestoreFetchCollection,
    firestoreFetchDoc
  }
}
