import { useCollection, useDocument, useFirestore } from 'vuefire'
import { collection, doc, query, where } from 'firebase/firestore'

export function useFirestoreManager() {
  function firestoreFetchCollection<T>(collectionName: string): {
    collectionData: Ref<T[] | undefined>
  } {
    const db = useFirestore()
    const {
      public: { APP_ID }
    } = useRuntimeConfig()

    const colRef = query(
      collection(db, collectionName),
      where('appId', '==', APP_ID)
    )

    const { data: collectionData } = useCollection<T>(colRef, {
      ssrKey: collectionName
    })
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
    firestoreFetchDoc,
    ...useFirestoreCreate(),
    ...useFirestoreUpdate(),
    ...useFirestoreDelete(),
    ...useFirestoreUtils()  
  }
}
