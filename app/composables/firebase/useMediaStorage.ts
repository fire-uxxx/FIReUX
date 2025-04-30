import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

/**
 * Handles converting Data-URL strings to Blob, resizing, uploading to Firebase Storage,
 * and returning public download URLs.
 */
export function useMediaStorage() {
  const { uploadFile } = useStorage()
  const storage = getStorage()
  const APP_ID = useRuntimeConfig().public.APP_ID

  // Utility: convert Data-URL to Blob
  const dataUrlToBlob = (dataUrl: string): Promise<Blob> =>
    fetch(dataUrl).then(res => res.blob())

  // Utility: resize a Blob to a maximum width
  const resizeBlob = (blob: Blob, maxWidth = 512): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const scale = maxWidth / img.width
        const canvas = document.createElement('canvas')
        canvas.width = maxWidth
        canvas.height = img.height * scale
        canvas
          .getContext('2d')
          ?.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          resized =>
            resized ? resolve(resized) : reject(new Error('Resize failed')),
          'image/jpeg',
          0.8
        )
      }
      img.onerror = reject
      img.src = URL.createObjectURL(blob)
    })

  // Uploads a Blob to Firebase Storage and returns its download URL
  const uploadBlobToStorage = async (blob: Blob, fullPath: string) => {
    await uploadFile(fullPath, blob)
    return getDownloadURL(storageRef(storage, fullPath))
  }

  /**
   * Main entry: accept File or Data-URL, process, and upload under "APP_ID/collection/id/typeImage.jpg"
   */
  const uploadImage = async (
    source: File | string,
    collection: string,
    id: string,
    type: string
  ): Promise<string> => {
    let blob: Blob

    if (typeof source === 'string') {
      blob = await dataUrlToBlob(source)
    } else {
      blob = source
    }

    // resize
    const resized = await resizeBlob(blob)
    const path = `${APP_ID}/${collection}/${id}/${type}Image.jpg`
    return uploadBlobToStorage(resized, path)
  }

  return { uploadImage }
}
