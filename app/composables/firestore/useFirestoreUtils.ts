import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'

export function useFirestoreUtils() {
  const db = useFirestore()

  async function checkSlug(
    collectionName: string,
    slug: string
  ): Promise<boolean> {
    const q = query(collection(db, collectionName), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  return { checkSlug }
}
