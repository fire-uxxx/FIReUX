import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export function useStorage() {
  const storage = getStorage()

  const uploadFile = async (path, file) => {
    try {
      const storageRef = ref(storage, path)
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
