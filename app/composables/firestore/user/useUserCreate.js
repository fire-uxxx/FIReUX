export function useUserCreate() {
  const currentUser = useCurrentUser()

  async function createUser() {
    const { createEntity } = useFirestoreCreate()

    while (!currentUser.value?.uid) {
      console.log('[createUser] Waiting for user authentication...')
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const uid = currentUser.value?.uid
    if (!uid) {
      console.error('❌ Error: No user UID found during onboarding!')
      return false
    }

    try {
      const photoURL =
        currentUser.value?.photoURL || (await generateProfileURL(null, uid))

      const displayName = generateDisplayName(
        currentUser.value?.email,
        currentUser.value?.displayName
      )

      const handle = generateHandle(displayName)

      const data = {
        email: currentUser.value?.email || null,
        display_name: displayName,
        handle,
        photoURL
      }

      await createEntity('users', data)
      console.log('✅ User Created Successfully:', data)
      return true
    } catch (error) {
      console.error('❌ Error creating user:', error.message)
      return false
    }
  }

  return { createUser }
}

export function generateDisplayName(email, displayName) {
  if (displayName?.trim()) return displayName
  if (email?.trim()) return email.split('@')[0] || randomUserId()
  return randomUserId()
}

export function generateHandle(displayName) {
  return displayName?.toLowerCase().replace(/\s+/g, '') || randomUserId()
}

function randomUserId() {
  return `user${Math.random().toString(36).substring(2, 7)}`
}

export async function generateProfileURL(url = null, uid) {
  if (url?.trim()) return url
  try {
    const { uploadFile } = useStorage()
    const response = await fetch('/img/default-avatar.png')
    const blob = await response.blob()
    const path = `users/${uid}/avatar.jpg`
    const downloadURL = await uploadFile(path, blob)
    console.log('✅ Default avatar uploaded. Storage URL:', downloadURL)
    return downloadURL
  } catch (error) {
    console.error('Error generating profile URL:', error.message)
    return null
  }
}
