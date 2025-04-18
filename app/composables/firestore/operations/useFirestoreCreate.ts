import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { useFirestore as vuefireFirestore, useCurrentUser } from 'vuefire'
import { useRuntimeConfig } from '#app'

export function useFirestoreCreate() {
  const db = vuefireFirestore()
  const currentUser = useCurrentUser()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  // Create a new document using slug as the document ID
  async function addSluggedDocument(
    collectionName: string,
    data: Record<string, unknown>
  ): Promise<string> {
    const { slug, ...rest } = data as { slug: string }

    if (!slug) {
      return Promise.reject('[addSluggedDocument] Slug is required.')
    }

    try {
      const docRef = doc(db, collectionName, slug)
      await setDoc(docRef, {
        appId: APP_ID,
        ...rest,
        created_at: new Date().toISOString(),
        slug
      })

      console.log(
        `[addSluggedDocument] Created document in '${collectionName}' with ID: ${slug}`
      )
      return slug
    } catch (error) {
      console.error(
        `[addSluggedDocument] Error creating document in '${collectionName}' with ID: ${slug}`,
        error
      )
      throw error
    }
  }

  async function createDocument(
    collectionName: string,
    data: Record<string, unknown>
  ): Promise<string> {
    if (!collectionName || !data) {
      return Promise.reject(
        '[createDocument] Collection name and data are required.'
      )
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        appId: APP_ID,
        ...data,
        created_at: new Date().toISOString()
      })

      console.log(
        `[createDocument] Created document in '${collectionName}' with ID: ${docRef.id}`
      )
      return docRef.id
    } catch (error) {
      console.error(
        `[createDocument] Error creating document in '${collectionName}':`,
        error
      )
      throw error
    }
  }

  async function createObject(
    collectionName: string,
    data: Record<string, unknown>
  ): Promise<string> {
    if (!collectionName || !data) {
      return Promise.reject(
        '[createObject] Collection name and data are required.'
      )
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        appId: APP_ID,
        ...data,
        created_at: new Date().toISOString()
      })

      console.log(
        `[createObject] Created object in '${collectionName}' with ID: ${docRef.id}`
      )
      return docRef.id
    } catch (error) {
      console.error(
        `[createObject] Error creating object in '${collectionName}':`,
        error
      )
      throw error
    }
  }

  async function createEntity(
    collectionName: string,
    data: Record<string, unknown>
  ): Promise<string> {
    if (!currentUser.value) {
      return Promise.reject('[createEntity] No authenticated user found.')
    }

    const documentId = currentUser.value.uid

    try {
      await setDoc(doc(db, collectionName, documentId), {
        appId: APP_ID,
        ...data,
        id: documentId,
        created_at: new Date().toISOString()
      })

      console.log(
        `[createEntity] Created entity in '${collectionName}' with ID: ${documentId}`
      )
      return documentId
    } catch (error) {
      console.error(
        `[createEntity] Error creating entity in '${collectionName}':`,
        error
      )
      throw error
    }
  }

  return {
    createDocument,
    createObject,
    createEntity,
    addSluggedDocument
  }
}
