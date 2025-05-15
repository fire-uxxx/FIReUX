import {
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAdminManager() {
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  async function promoteAdmin(uid: string): Promise<void> {
    await updateAppProfileRole(uid, 'admin')
    await updateAppAdmins(uid, true)
    console.log(`✅ User ${uid} promoted to admin for ${APP_ID}`)
  }

  async function demoteAdmin(uid: string): Promise<void> {
    await updateAppProfileRole(uid, 'user')
    await updateAppAdmins(uid, false)
    console.log(`✅ User ${uid} demoted from admin for ${APP_ID}`)
  }

  async function updateAppProfileRole(uid: string, role: 'user' | 'admin') {
    const profileRef = doc(db, `users/${uid}/profiles`, APP_ID)
    await setDoc(profileRef, { role }, { merge: true })
  }

  async function updateAppAdmins(uid: string, add: boolean) {
    const appRef = doc(db, 'apps', APP_ID)
    await updateDoc(appRef, {
      admins: add ? arrayUnion(uid) : arrayRemove(uid)
    })
  }

  return {
    promoteAdmin,
    demoteAdmin
  }
}
