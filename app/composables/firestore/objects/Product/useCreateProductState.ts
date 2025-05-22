// ~/composables/admin/useCreateProductState.ts
import { useStorage } from '@vueuse/core'
import { useCurrentUser } from 'vuefire'
import { useCreatePricesState } from './Prices/useCreatePricesState'

export function useCreateProductState() {
  const now = new Date().toISOString()

  const currentUser = useCurrentUser()
  const {
    public: { tenantId }
  } = useRuntimeConfig()

  const defaultProduct: Partial<FirebaseProduct> = {
    id: '',
    name: '',
    description: '',
    content: '',
    active: true,
    prices: [],
    created_at: now,
    updated_at: now,
    slug: '',
    creator_id: currentUser.value?.uid || '',
    tenant_id: tenantId as string,
    stock: null,
    track_stock: false,
    product_type: 'physical',
    default_price: undefined
  }

  const product = useStorage<Partial<FirebaseProduct>>(
    'createProduct',
    defaultProduct
  )

  const mainImageData = useStorage<string>('createProductMainImage', '')

  const { generateSlug } = useProductUtils()
  const { defaultPrice } = useCreatePricesState()

  // Auto-generate slug
  watch(
    () => product.value.name,
    async newName => {
      if (!newName) return
      const slugResult = await generateSlug(newName)
      if (slugResult.success) {
        product.value.slug = slugResult.slug
      }
    }
  )

  // Populate creator_id and tenant_id on mount
  onMounted(() => {
    if (currentUser.value?.uid) product.value.creator_id = currentUser.value.uid
    if (tenantId) product.value.tenant_id = tenantId as string
  })

  function resetCreateProductState() {
    product.value = {
      id: '',
      name: '',
      description: '',
      content: '',
      active: true,
      prices: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      slug: '',
      creator_id: currentUser.value?.uid || '',
      tenant_id: tenantId as string,
      stock: null,
      track_stock: false,
      product_type: 'physical',
      default_price: defaultPrice.value ?? undefined
    }
    mainImageData.value = ''
  }

  const productPayload = computed(() => {
    const name = product.value.name?.trim()
    if (!name) throw new Error('❌ Product name is required.')
    if (!mainImageData.value) throw new Error('❌ Main image is required.')

    return {
      name,
      description: product.value.description || '',
      content: product.value.content || '',
      active: product.value.active ?? true,
      slug: product.value.slug || '',
      stock: product.value.stock ?? null,
      product_type: product.value.product_type ?? 'physical',
      track_stock: product.value.track_stock ?? false,
      images: [mainImageData.value],
      default_price: defaultPrice.value ?? undefined
    }
  })

  return {
    product,
    mainImageData,
    resetCreateProductState,
    productPayload,
    defaultPrice
  }
}
