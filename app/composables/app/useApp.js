import { ref } from 'vue'
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useRuntimeConfig } from 'nuxt/app'

export function useApp() {
  const db = useFirestore()
  const hasAdmin = ref('resolving')
  const appId = useRuntimeConfig().public.APP_ID
  const appName = useRuntimeConfig().public.PWA_APP_NAME?.trim() || ''

  const appDocRef = doc(db, 'apps', appId)

  // Watch for any admin presence
  onSnapshot(appDocRef, docSnap => {
    if (!docSnap.exists()) {
      hasAdmin.value = false
      return
    }
    const data = docSnap.data()
    hasAdmin.value = Array.isArray(data.admins) && data.admins.length > 0
  })

  const adminQuery = query(collection(db, 'users'), where('isAdmin', '==', true))

  // Fetch all admin users
  async function fetchAllAdmins() {
    const snapshot = await getDocs(adminQuery)
    return snapshot.docs.map(doc => doc.data())
  }

  // Add an admin to both the app and user doc
  async function addAdmin(uid) {
    await updateDoc(doc(db, 'apps', appId), {
      admins: arrayUnion(uid)
    })
    await updateDoc(doc(db, 'users', uid), {
      isAdmin: true
    })
    console.log(`✅ Added ${uid} as admin to ${appId}`)
  }

  // Remove an admin from both the app and user doc
  async function removeAdmin(uid) {
    await updateDoc(doc(db, 'apps', appId), {
      admins: arrayRemove(uid)
    })
    await updateDoc(doc(db, 'users', uid), {
      isAdmin: false
    })
    console.log(`✅ Removed ${uid} from admins of ${appId}`)
  }

  return {
    appId,
    appName,
    hasAdmin,
    fetchAllAdmins,
    addAdmin,
    removeAdmin
  }
}
