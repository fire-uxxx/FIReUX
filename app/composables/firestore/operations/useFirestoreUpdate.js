// composables/firestore/operations/useFirestoreUpdate.js
import { doc, updateDoc, getFirestore } from 'firebase/firestore'
import { getApp } from 'firebase/app'

export function useFirestoreUpdate() {
  const db = getFirestore(getApp(), process.env.VUEFIRE_DATABASE_ID)

  // Update a document by its collection name and document ID
  async function updateDocument(collectionName, documentId, updates) {
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
