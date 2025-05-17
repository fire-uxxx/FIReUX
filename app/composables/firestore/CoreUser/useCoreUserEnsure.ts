import { getDoc, doc } from 'firebase/firestore'

export function useCoreUserEnsure() {
  const { waitForCurrentUser, createDocumentWithId } = useFirestoreManager()

  async function ensureCoreUser() {
    const currentUser = await waitForCurrentUser()
    const uid = currentUser.uid
    const collectionName = 'users'
    const db = useFirestore()
    const coreUserDocRef = doc(db, collectionName, uid)
    const coreUserSnap = await getDoc(coreUserDocRef)

    if (coreUserSnap.exists()) {
      const createdAt = coreUserSnap.data()?.created_at || 'unknown date'
      console.log(
        `✅ [ensureCoreUser] Core user with ID '${uid}' already exists. Continuing with established user created on ${createdAt}.`
      )
      return
    }

    const coreUserData: Partial<CoreUser> = {
      id: uid,
      adminOf: []
    }

    return await createDocumentWithId(collectionName, uid, coreUserData, false)  }

  return { ensureCoreUser }
}
