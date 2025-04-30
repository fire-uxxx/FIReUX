import { useStorage } from '@vueuse/core'
import { useState } from '#app'
import { computed } from 'vue'
import type { ProductEntry, StockType } from '@/models/product.model'

export function useCreateProductState() {
  // Persisted product state in localStorage (core fields)
  const product = useStorage<ProductEntry>('createProduct', {
    name: '',
    description: '',
    content: '',
    price: 0,
    active: true,
    stockType: 'finite' as StockType,
    stock: 0,
    slug: '',
    id: '',
    image: '',
    galleryImages: []
  })

  // Main image Data-URL (persisted for preview)
  const mainImageData = useState<string>('createProductMainImage', () => '')

  // Auto-generated slug based on product name
  const slug = computed(() =>
    product.value.name.trim().replace(/\s+/g, '-').toLowerCase()
  )

  /**
   * Reset creation state: clears storage and in-memory fields
   */
  function resetCreateProductState() {
    if (import.meta.client) {
      localStorage.removeItem('createProduct')
    }

    // Reset persisted state
    product.value = {
      name: '',
      description: '',
      content: '',
      price: 0,
      active: true,
      stockType: 'finite' as StockType,
      stock: 0,
      slug: '',
      id: '',
      image: '',
      galleryImages: []
    }

    mainImageData.value = ''
  }

  return {
    product,
    mainImageData,
    slug,
    resetCreateProductState
  }
}
