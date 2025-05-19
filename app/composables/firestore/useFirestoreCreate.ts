import { doc, setDoc } from 'firebase/firestore'
import { useFirestore as vuefireFirestore } from 'vuefire'

export function useFirestoreCreate() {
  const db = vuefireFirestore()
  const {
    public: { appId }
  } = useRuntimeConfig()

  async function createDocumentWithId(
    collectionName: string,
    documentId: string,
    data: Record<string, unknown>,
    includeUser: boolean = true
  ): Promise<string> {
    const baseData: Record<string, unknown> = {
      created_in: appId,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (includeUser) {
      const { waitForCurrentUser } = useFirestoreManager()
      const currentUser = await waitForCurrentUser()
      baseData.created_by = currentUser.uid
    }

    try {
      await setDoc(doc(db, collectionName, documentId), baseData)
      console.log(
        `[createDocumentWithId] ✅ Created document in '${collectionName}' with ID: ${documentId}`
      )
      return documentId
    } catch (error) {
      console.error(
        `[createDocumentWithId] ❌ Error creating document in '${collectionName}':`,
        error
      )
      throw error
    }
  }
  /**
   * The parent must provide the full object shape for Core User creation.
   */

  return {
    createDocumentWithId

    /*
    async function addSluggedDocument<T extends Partial<Sluggable>>(
      collectionName: string,
      data: T
    ): Promise<string> {
      const { waitForCurrentUser } = useFirestoreManager();
      const currentUser = await waitForCurrentUser();

      const { slug, ...rest } = data as { slug?: string }

      if (!slug) {
        return Promise.reject('[addSluggedDocument] Slug is required.')
      }

      try {
        const docRef = doc(db, collectionName, slug)
        const now = new Date().toISOString()

        await setDoc(docRef, {
          app_id: appId,
          creator_id: currentUser.uid,
          slug,
          ...rest,
          created_at: now,
          updated_at: now
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
      const { waitForCurrentUser } = useFirestoreManager();
      const currentUser = await waitForCurrentUser();

      if (!collectionName || !data) {
        return Promise.reject(
          '[createDocument] Collection name and data are required.'
        )
      }

      try {
        const docRef = await addDoc(collection(db, collectionName), {
          app_id: appId,
          creator_id: currentUser.uid,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
      const { waitForCurrentUser } = useFirestoreManager();
      const currentUser = await waitForCurrentUser();

      if (!collectionName || !data) {
        return Promise.reject(
          '[createObject] Collection name and data are required.'
        )
      }

      try {
        const docRef = await addDoc(collection(db, collectionName), {
          app_id: appId,
          creator_id: currentUser.uid,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
    */
  }
}
