// composables/useVuefireCollection.js
import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export function useVuefireCollection(path) {
  const db = useFirestore()
  const collRef = collection(db, path)
  return useCollection(collRef)
}
