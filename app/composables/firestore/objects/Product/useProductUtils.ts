// ~/composables/admin/useProductUtils.ts

export function useProductUtils() {
  // Automatically available globally
  const { uploadImage } = useMediaStorage()
  const { checkSlug } = useFirestoreUtils()

  /**
   * Generate a URL-friendly slug and ensure it doesn’t already exist.
   */
  async function generateSlug(
    title: string
  ): Promise<
    { success: true; slug: string } | { success: false; message: string }
  > {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    if (await checkSlug('products', base)) {
      return {
        success: false,
        message: 'This slug is already in use. Please pick another title.'
      }
    }

    return { success: true, slug: base }
  }

  /**
   * Upload the main product image (Data-URL or File) for the given product ID.
   */
  async function uploadMainImage(
    data: File | string,
    id: string
  ): Promise<string> {
    // Call uploadImage(fileOrUrl, collection, id, type)
    const url = await uploadImage(data, 'products', id, 'main')
    return url || ''
  }

  return {
    generateSlug,
    uploadMainImage
  }
}
