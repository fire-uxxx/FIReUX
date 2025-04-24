// composables/firestore/operations/useFirestoreUpdate.js
import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import type { FieldValue } from 'firebase/firestore'

export function useFirestoreUpdate() {
  const db = useFirestore()

  async function updateDocument(
    collectionName: string,
    documentId: string,
    updates: { [key: string]: FieldValue | Partial<unknown> | undefined }
  ) {
    if (!collectionName || !documentId || !updates) {
      return Promise.reject(
        '❌ Collection name, document ID, and updates are required.'
      )
    }

    try {
      await updateDoc(doc(db, collectionName, documentId), updates)
      console.log(
        `✅ Document updated in '${collectionName}' with ID: ${documentId}`
      )
    } catch (error) {
      console.error(`❌ Error updating document in '${collectionName}':`, error)
      throw error
    }
  }

  return {
    updateDocument
  }
}
