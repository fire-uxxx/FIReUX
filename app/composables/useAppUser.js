import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser, useDocument } from 'vuefire'
import { useStorage } from '@/composables/firebase/useStorage'
import { computed } from 'vue'

export function useAppUser() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const { uploadExternalImage, uploadFile } = useStorage()

  // ✅ Firestore document reference
  const appUserDoc = useDocument(
    computed(() =>
      currentUser.value && !currentUser.value.isAnonymous
        ? doc(db, 'users', currentUser.value.uid)
        : null
    )
  )

  // ✅ VueFire's pending state tells us when Firestore is still loading
  const { pending } = appUserDoc

  // ✅ Computed state instead of a watcher
  const appUserState = computed(() => {
    if (pending.value) return 'PENDING' // Still loading
    return appUserDoc.value ? 'EXISTS' : 'DOES_NOT_EXIST'
  })

  // ✅ Create Firestore user document
  const createAppUser = async uid => {
    if (!uid) return

    const userRef = doc(db, 'users', uid)
    const avatarPath = `users/${uid}/avatar.jpg`

    try {
      let avatarUrl = null

      if (currentUser.value?.photoURL) {
        avatarUrl = await uploadExternalImage(
          currentUser.value.photoURL,
          avatarPath
        )
      }

      if (!avatarUrl) {
        const response = await fetch('img/default-avatar.png')
        const fallbackBlob = await response.blob()
        avatarUrl = await uploadFile(avatarPath, fallbackBlob)
      }

      await setDoc(
        userRef,
        {
          uid,
          email: currentUser.value?.email || '',
          displayName: currentUser.value?.displayName || 'Anonymous',
          provider: currentUser.value?.providerData[0]?.providerId || 'unknown',
          avatar: avatarUrl,
          createdAt: new Date()
        },
        { merge: true }
      )

      console.log('✅ App User Created Successfully')
    } catch (error) {
      console.error('❌ Error Creating App User:', error.message)
    }
  }

  // ✅ Onboarding Function: Ensures the user exists before creating an app user
  const onboardAppUser = async uid => {
    if (!uid) return

    const userRef = doc(db, 'users', uid)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
      console.log('🆕 No app user found - Creating App User')
      await createAppUser(uid)
    } else {
      console.log('✅ App user already exists - Skipping creation')
    }
  }

  return {
    onboardAppUser,
    appUserState, // ✅ Reactive and computed
    appUser: appUserDoc,
    pending, // ✅ Expose pending state
    createAppUser
  }
}
