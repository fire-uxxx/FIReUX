export function useFirestoreSubcollectionHelpers() {
  const { createEntity, createObject } = useFirestoreCreate()
  const { updateDocument } = useFirestoreUpdate()
  const { deleteDocument } = useFirestoreDelete()

  function subcollectionPath(parentCollection, parentId, subCollectionName) {
    return `${parentCollection}/${parentId}/${subCollectionName}`
  }

  return {
    createSubEntity(parentCollection, parentId, subCollectionName, data) {
      return createEntity(
        subcollectionPath(parentCollection, parentId, subCollectionName),
        data
      )
    },
    createSubObject(parentCollection, parentId, subCollectionName, data) {
      return createObject(
        subcollectionPath(parentCollection, parentId, subCollectionName),
        data
      )
    },
    updateSubDocument(
      parentCollection,
      parentId,
      subCollectionName,
      documentId,
      updates
    ) {
      return updateDocument(
        subcollectionPath(parentCollection, parentId, subCollectionName),
        documentId,
        updates
      )
    },
    deleteSubDocument(
      parentCollection,
      parentId,
      subCollectionName,
      documentId
    ) {
      return deleteDocument(
        subcollectionPath(parentCollection, parentId, subCollectionName),
        documentId
      )
    }
  }
}
