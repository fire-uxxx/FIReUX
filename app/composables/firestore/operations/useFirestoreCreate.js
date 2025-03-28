import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { useFirestore as vuefireFirestore, useCurrentUser } from 'vuefire'
import { useApp } from '@/composables/app/useApp'

export function useFirestoreCreate() {
  const db = vuefireFirestore()
  const currentUser = useCurrentUser()

  // **Create a new document using slug as the document ID**
  async function addSluggedDocument(collectionName, data) {
    const { slug, ...rest } = data

    if (!slug) {
      return Promise.reject('[addSluggedDocument] Slug is required.')
    }

    try {
      // Using slug as the document ID
      const docRef = doc(db, collectionName, slug)

      await setDoc(docRef, {
        ...rest,
        created_at: new Date().toISOString(),
        slug // Include the slug as part of the document
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

  // **Create a new document (standalone)**
  async function createDocument(collectionName, data) {
    if (!collectionName || !data) {
      return Promise.reject(
        '[createDocument] Collection name and data are required.'
      )
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), {
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

  // **Create a new object (can contain subcollections & arrays)**
  async function createObject(collectionName, data) {
    if (!collectionName || !data) {
      return Promise.reject(
        '[createObject] Collection name and data are required.'
      )
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), {
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

  // **Create a new entity (bound to a user ID)**
  async function createEntity(collectionName, data) {
    if (!currentUser.value) {
      return Promise.reject('[createEntity] No authenticated user found.')
    }

    const documentId = currentUser.value.uid

    try {
      await setDoc(doc(db, collectionName, documentId), {
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

  // **Create an app document using internal appId and appName**
  async function createApp() {
    if (!currentUser.value) {
      return Promise.reject(
        '[createApp] Authenticated user required.'
      )
    }

    const { appId, appName, addAdmin } = useApp()

    try {
      await setDoc(doc(db, 'apps', appId), {
        site_name: appName,
        created_by: currentUser.value.uid,
        created_at: new Date().toISOString(),
      })

      await addAdmin(currentUser.value.uid)

      console.log(`[createApp] Created app in 'apps' with ID: ${appId}`)
      return appId
    } catch (error) {
      console.error(`[createApp] Error creating app in 'apps':`, error)
      throw error
    }
  }

  return {
    createDocument,
    createObject,
    createEntity,
    createApp,
    addSluggedDocument // Added function to create a document with a slug
  }
}
