import { useStorage } from '@vueuse/core'

export function useCreateProductState() {
  const now = new Date().toISOString()

  const product = useStorage<Partial<FirebaseProduct>>('createProduct', {
    id: '',
    name: '',
    description: '',
    content: '',
    image: '',
    galleryImages: [],
    active: true,
    prices: [
      {
        id: '',
        active: true,
        billing_scheme: 'per_unit',
        currency: 'eur',
        unit_amount: 1200,
        type: 'one_time'
      }
    ],
    createdAt: now,
    updatedAt: now,
    slug: '',
    creatorId: '',
    appId: ''
  })

  const mainImageData = useState<string>('createProductMainImage', () => '')

  const currentUser = useCurrentUser()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  const { generateSlug } = useProductUtils()

  // Automatically update slug when name changes
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

  // Populate creatorId and appId when available
  onMounted(() => {
    if (currentUser.value?.uid) {
      product.value.creatorId = currentUser.value.uid
    }
    if (APP_ID) {
      product.value.appId = APP_ID
    }
  })

  function resetCreateProductState() {
    product.value = {
      id: '',
      name: '',
      description: '',
      content: '',
      image: '',
      galleryImages: [],
      active: true,
      prices: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: '',
      creatorId: currentUser.value?.uid || '',
      appId: APP_ID
    }
    mainImageData.value = ''
  }

  return {
    product,
    mainImageData,
    resetCreateProductState
  }
}
