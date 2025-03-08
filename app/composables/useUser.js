import { doc, setDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser, useDocument } from 'vuefire'
import { useStorage } from '@/composables/firebase/useStorage'

export function useUser() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const { uploadExternalImage, uploadFile } = useStorage()

  // Track user Firestore document
  const userDoc = useDocument(
    computed(() =>
      currentUser.value && !currentUser.value.isAnonymous
        ? doc(db, 'users', currentUser.value.uid)
        : null
    )
  )

  const userState = computed(() => {
    return userDoc.value ? 'EXISTS' : 'DOES_NOT_EXIST'
  })

  const createUser = async () => {
    if (!currentUser.value || currentUser.value.isAnonymous) return

    const userRef = doc(db, 'users', currentUser.value.uid)
    const avatarPath = `users/${currentUser.value.uid}/avatar.jpg`

    try {
      let avatarUrl

      if (currentUser.value.photoURL) {
        // Try to upload Google profile picture
        avatarUrl = await uploadExternalImage(
          currentUser.value.photoURL,
          avatarPath
        )
      }

      if (!avatarUrl) {
        // If Google image fails, upload the default fallback avatar
        const response = await fetch('/img/default-avatar.png')
        const fallbackBlob = await response.blob()
        avatarUrl = await uploadFile(avatarPath, fallbackBlob)
      }

      await setDoc(
        userRef,
        {
          uid: currentUser.value.uid,
          email: currentUser.value.email || '',
          displayName: currentUser.value.displayName || 'Anonymous',
          provider: currentUser.value.providerData[0]?.providerId || 'unknown',
          avatar: avatarUrl, // Always points to a stored avatar
          createdAt: new Date()
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error creating user:', error.message)
    }
  }

  return {
    userState,
    user: userDoc,
    createUser
  }
}
