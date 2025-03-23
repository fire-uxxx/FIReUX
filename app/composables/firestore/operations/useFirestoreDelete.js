import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import { getApp } from 'firebase/app'

export function useFirestoreDelete() {
  const db = getFirestore(getApp(), process.env.VUEFIRE_DATABASE_ID)

  async function deleteDocument(collectionName, documentId) {
    if (!collectionName || !documentId) {
      return Promise.reject('❌ Collection name and document ID are required.')
    }

    try {
      const docRef = doc(db, collectionName, documentId)
      await deleteDoc(docRef)
      console.log(
        `✅ Successfully deleted document: ${documentId} from ${collectionName}`
      )
    } catch (error) {
      console.error(
        `❌ Error deleting document ${documentId} from ${collectionName}:`,
        error
      )
      throw error
    }
  }

  return {
    deleteDocument
  }
}
