import { doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useFirestoreDelete() {
  const db = useFirestore()

  async function deleteDocument(collectionName: string, documentId: string) {
    if (!collectionName || !documentId) {
      throw new Error('Collection name and document ID are required.')
    }

    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
    console.log(`✅ Deleted document: ${documentId} from ${collectionName}`)
  }

  return { deleteDocument }
}
