import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

export function useMediaStorage() {
  const { uploadFile } = useStorage()

  const uploadProfileImage = async ({ source, path }) => {
    console.log('[MediaStorage] Starting profile image upload')
    let result = null
    if (source instanceof File) {
      result = await processImageFile({ file: source, path })
    } else if (typeof source === 'string') {
      result = await processImageUrl({ url: source, path })
    } else {
      console.error('[MediaStorage] ❌ Invalid source provided')
    }
    console.log('[MediaStorage] Profile image upload complete. Result:', result)
    return result
  }

  const processImageUrl = async ({ url = '', path, defaultImgPath }) => {
    console.log('[MediaStorage] 🌐 Starting processImageUrl')
    if (!path || typeof path !== 'string' || path.trim() === '') {
      console.error('[MediaStorage] ❌ Invalid path for image upload:', path)
      return null
    }

    const finalUrl = url || defaultImgPath
    console.log('[MediaStorage] 📡 Using provided image URL:', finalUrl)

    let blob
    try {
      blob = await fetchImageBlob(finalUrl)
      console.log('[MediaStorage] ✅ Image blob fetched:', blob)
    } catch (err) {
      console.warn('[MediaStorage] ⚠️ Fallback to proxy due to:', err.message)
      try {
        const proxyEndpoint = `/api/proxy-google-avatar-upload?photo_url=${encodeURIComponent(finalUrl)}&storagePath=${encodeURIComponent(path)}`
        const response = await fetch(proxyEndpoint)
        const result = await response.json()
        if (!response.ok || !result.firebaseUrl) throw new Error(result.message || 'Proxy failed.')

        console.log('[MediaStorage] ✅ Proxy upload succeeded:', result.firebaseUrl)
        return result.firebaseUrl
      } catch (proxyError) {
        console.error('[MediaStorage] ❌ Proxy upload failed:', proxyError.message)
        return null
      }
    }

    try {
      const resizedBlob = await resizeImageBlob(blob, 512)
      console.log('[MediaStorage] ✅ Image blob resized:', resizedBlob)
      const downloadUrl = await uploadBlob(resizedBlob, path)
      console.log(
        '[MediaStorage] ✅ Image uploaded successfully. Final URL:',
        downloadUrl
      )
      return downloadUrl
    } catch (err) {
      console.error(
        '[MediaStorage] ❌ Error processing image URL:',
        err.message
      )
      return null
    }
  }

  const processImageFile = async ({ file, path }) => {
    console.log('[MediaStorage] 🖼️ Starting processImageFile')
    if (!file || !(file instanceof File)) {
      console.error('[MediaStorage] ❌ Invalid file input')
      return null
    }

    if (!path || typeof path !== 'string' || path.trim() === '') {
      console.error('[MediaStorage] ❌ Invalid path for image upload:', path)
      return null
    }

    try {
      const resizedBlob = await resizeImageBlob(file, 512)
      console.log('[MediaStorage] ✅ Image blob resized:', resizedBlob)
      const downloadUrl = await uploadBlob(resizedBlob, path)
      console.log(
        '[MediaStorage] ✅ Image uploaded successfully. Final URL:',
        downloadUrl
      )
      return downloadUrl
    } catch (err) {
      console.error(
        '[MediaStorage] ❌ Error processing image file:',
        err.message
      )
      return null
    }
  }

  const fetchImageBlob = async url => {
    console.log('[MediaStorage] Fetching image from URL:', url)
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) throw new Error('Failed to fetch image from URL')
    const blob = await response.blob()
    console.log('[MediaStorage] Image fetched and converted to blob')
    return blob
  }

  const uploadBlob = async (blob, path) => {
    try {
      console.log('[MediaStorage] Uploading blob to path:', path)
      const uploadRef = storageRef(getStorage(), path)
      await uploadFile(path, blob)
      const downloadUrl = await getDownloadURL(uploadRef)
      console.log('[MediaStorage] ✅ Fetched download URL:', downloadUrl)
      return downloadUrl
    } catch (error) {
      console.error('[MediaStorage] Upload failed:', error.message)
      return null
    }
  }

  const resizeImageBlob = (blob, maxWidth) => {
    console.log('[MediaStorage] Resizing image blob to max width:', maxWidth)
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scaleFactor = maxWidth / img.width
        canvas.width = maxWidth
        canvas.height = img.height * scaleFactor

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          resizedBlob => {
            console.log('[MediaStorage] Image resizing complete')
            resolve(resizedBlob)
          },
          'image/jpeg',
          0.8
        )
      }
      img.onerror = err => {
        console.error('[MediaStorage] Error loading image for resize', err)
        reject(err)
      }
      img.src = URL.createObjectURL(blob)
    })
  }

  return {
    uploadProfileImage,
    processImageUrl,
    processImageFile
  }
}
