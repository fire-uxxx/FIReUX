import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useFirestore as vuefireFirestore } from 'vuefire'

export function useFirestoreArrayHelpers() {
  const db = vuefireFirestore()

  async function getArrayField(collectionName, documentId, fieldName) {
    const docRef = doc(db, collectionName, documentId)
    const docSnapshot = await getDoc(docRef)
    if (!docSnapshot.exists()) return []
    return Array.isArray(docSnapshot.data()[fieldName])
      ? docSnapshot.data()[fieldName]
      : []
  }

  async function modifyArray(collectionName, documentId, fieldName, modifyFn) {
    const currentArray = await getArrayField(
      collectionName,
      documentId,
      fieldName
    )
    const updatedArray = modifyFn([...currentArray]) // Clone to avoid direct mutation
    await updateDoc(doc(db, collectionName, documentId), {
      [fieldName]: updatedArray
    })
    return updatedArray
  }

  return {
    async addItem(collectionName, documentId, fieldName, item) {
      return modifyArray(collectionName, documentId, fieldName, arr => [
        ...arr,
        item
      ])
    },
    async updateItem(
      collectionName,
      documentId,
      fieldName,
      index,
      updatedItem
    ) {
      return modifyArray(collectionName, documentId, fieldName, arr => {
        if (index < 0 || index >= arr.length) throw new Error('Invalid index.')
        return arr.map((item, i) => (i === index ? updatedItem : item))
      })
    },
    async removeItem(collectionName, documentId, fieldName, index) {
      return modifyArray(collectionName, documentId, fieldName, arr => {
        if (index < 0 || index >= arr.length) throw new Error('Invalid index.')
        return arr.filter((_, i) => i !== index)
      })
    },
    async replaceArray(collectionName, documentId, fieldName, newArray) {
      if (!Array.isArray(newArray))
        throw new Error('Must provide a valid array.')
      return modifyArray(collectionName, documentId, fieldName, () => newArray)
    }
  }
}
