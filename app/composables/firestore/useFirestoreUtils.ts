// useFirestoreUtils.ts
/**
 * Firestore utilities placeholder
 * (No active utility functions at this time)
 */
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'

/**
 * Firestore utilities: generic slug existence check
 */
export function useFirestoreUtils() {

  async function checkSlug(
    collectionName: string,
    slug: string
  ): Promise<boolean> {
    const db = getFirestore()
    const q = query(collection(db, collectionName), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  return { checkSlug }
}
