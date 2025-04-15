import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useRuntimeConfig } from 'nuxt/app'

export function useAppUpdate() {
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  async function addAdmin(uid: string): Promise<void> {
    if (!APP_ID) {
      throw new Error('App ID not available')
    }
    await updateDoc(doc(db, 'apps', APP_ID), { admins: arrayUnion(uid) })
    await updateDoc(doc(db, 'users', uid), { adminAppIds: arrayUnion(APP_ID) })
    console.log(`✅ Added ${uid} as admin to ${APP_ID}`)
  }

  async function removeAdmin(uid: string): Promise<void> {
    if (!APP_ID) {
      throw new Error('App ID not available')
    }
    await updateDoc(doc(db, 'apps', APP_ID), { admins: arrayRemove(uid) })
    await updateDoc(doc(db, 'users', uid), { adminAppIds: arrayRemove(APP_ID) })
    console.log(`✅ Removed ${uid} from admins of ${APP_ID}`)
  }

  return {
    addAdmin,
    removeAdmin
  }
}
