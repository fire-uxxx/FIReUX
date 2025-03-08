import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export function useStorage() {
  const storage = getStorage()

  /**
   * Uploads a file to Firebase Storage and returns its URL.
   * @param {string} path - The storage path (e.g., 'users/uid/avatar.jpg').
   * @param {Blob} file - The file/blob to upload.
   * @returns {Promise<string>} - The download URL of the uploaded file.
   */
  const uploadFile = async (path, file) => {
    try {
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('Error uploading file:', error.message)
      return null
    }
  }

  /**
   * Downloads an external image (e.g., Google profile photo), converts it to a blob, and uploads it.
   * @param {string} imageUrl - The external image URL.
   * @param {string} path - The storage path (e.g., 'users/uid/avatar.jpg').
   * @returns {Promise<string>} - The download URL of the uploaded image.
   */
  const uploadExternalImage = async (imageUrl, path) => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' })
      const blob = await response.blob()
      return await uploadFile(path, blob)
    } catch (error) {
      console.error(
        'Error fetching and uploading external image:',
        error.message
      )
      return null
    }
  }

  return {
    uploadFile,
    uploadExternalImage
  }
}
