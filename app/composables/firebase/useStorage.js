import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useCurrentUser } from 'vuefire'

export function useStorage() {
  const storage = getStorage()
  const currentUser = useCurrentUser()

  const uploadFile = async (path, file) => {
    if (!currentUser.value?.uid) {
      console.error('[Storage] No authenticated user. Cannot determine UID.')
      return null
    }

    try {
      const fullPath = `users/${currentUser.value.uid}/${path}`
      const storageRef = ref(storage, fullPath)
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('[Storage] Upload failed:', error.message)
      return null
    }
  }

  return {
    uploadFile
  }
}
