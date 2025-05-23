// ~/composables/admin/useProductUtils.ts

export function useProductUtils() {
  // Automatically available globally
  const { uploadImage } = useMediaStorage()
  const { checkSlug } = useFirestoreUtils()

  /**
   * Generate a URL-friendly slug and ensure it doesn’t already exist.
   */
  async function generateSlug(
    title: string,
    tenantId: string
  ): Promise<
    { success: true; slug: string } | { success: false; message: string }
  > {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    let attempt = 0
    let slug = `${tenantId}-${base}`
    let finalSlug = slug

    while (await checkSlug('products', finalSlug)) {
      attempt++
      finalSlug = `${slug}-${attempt}`
      if (attempt > 50) {
        return {
          success: false,
          message: 'This slug already exists. Please pick another title'
        }
      }
    }

    return { success: true, slug: finalSlug }
  }

  /**
   * Upload the main product image (Data-URL or File) for the given product ID.
   */
  async function uploadMainImage(
    data: File | string,
    collection: string,
    id: string
  ): Promise<string> {
    // Call uploadImage(fileOrUrl, collection, id, type)
    const url = await uploadImage(data, collection, id, 'main')
    return url || ''
  }
  function formatPrice(
    cents: number | null | undefined,
    currency: string
  ): string {
    const amount = cents ?? 0
    return (amount / 100).toLocaleString(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    })
  }

  /**
   * Placeholder URL to use when a product has no image.
   */
  const placeholderImage = '/img/placeholder-product.png'

  return {
    formatPrice,
    placeholderImage,
    checkSlug,
    generateSlug,
    uploadMainImage
  }
}
