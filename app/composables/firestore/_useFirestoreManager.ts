// ~/composables/useFirestoreManager.ts

import { useCollection, useDocument, useFirestore } from 'vuefire'
import {
  collection,
  doc,
  query,
  where,
  limit,
  getDocs
} from 'firebase/firestore'

export function useFirestoreManager() {
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  function firestoreFetchCollection<T>(collectionName: string): {
    collectionData: Ref<T[] | undefined>
  } {
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
    const docRef = doc(db, collectionName, id)
    const { data } = useDocument<T>(docRef)
    return data
  }

  async function firestoreQueryOneByField<T>(
    collectionName: string,
    field: string,
    value: string
  ): Promise<T | null> {
    const q = query(
      collection(db, collectionName),
      where('appId', '==', APP_ID),
      where(field, '==', value),
      limit(1)
    )

    const snapshot = await getDocs(q)
    const doc = snapshot.docs[0]

    return doc ? ({ id: doc.id, ...doc.data() } as T) : null
  }
  async function firestoreFetchSubcollection<T>(
    parentCollection: string,
    parentId: string,
    subcollection: string
  ): Promise<T[]> {
    const subRef = collection(db, parentCollection, parentId, subcollection)
    const snapshot = await getDocs(subRef)
    return snapshot.docs.map(doc => doc.data() as T)
  }
  return {
    firestoreFetchCollection,
    firestoreFetchDoc,
    firestoreQueryOneByField,
    firestoreFetchSubcollection,
    ...useFirestoreCreate(),
    ...useFirestoreUpdate(),
    ...useFirestoreDelete(),
    ...useFirestoreUtils()
  }
}
