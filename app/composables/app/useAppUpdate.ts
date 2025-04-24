import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppUpdate(appId: string) {
  const db = useFirestore()

  async function addAdmin(uid: string): Promise<void> {
    if (!appId) {
      throw new Error('App ID not available')
    }
    await updateDoc(doc(db, 'apps', appId), { admins: arrayUnion(uid) })
    await updateDoc(doc(db, 'users', uid), { adminAppIds: arrayUnion(appId) })
    console.log(`✅ Added ${uid} as admin to ${appId}`)
  }

  async function removeAdmin(uid: string): Promise<void> {
    if (!appId) {
      throw new Error('App ID not available')
    }
    await updateDoc(doc(db, 'apps', appId), { admins: arrayRemove(uid) })
    await updateDoc(doc(db, 'users', uid), { adminAppIds: arrayRemove(appId) })
    console.log(`✅ Removed ${uid} from admins of ${appId}`)
  }

  return {
    addAdmin,
    removeAdmin
  }
}
