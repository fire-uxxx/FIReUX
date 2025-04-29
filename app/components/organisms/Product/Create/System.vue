<template>
  <div class="root-container">
    <UTabs v-model="selectedTab" :items="tabItems">
      <template #write>
        <OrganismsProductCreateWrite />
      </template>
      <template #preview>
        <OrganismsProductCreatePreview />
      </template>
    </UTabs>

    <div class="actions">
      <UButton @click="handleCreate">Create Product</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// which tab is active
const selectedTab = ref<'write' | 'preview'>('write')
const tabItems = [
  { label: 'Write', icon: 'i-lucide-pencil', value: 'write', slot: 'write' },
  { label: 'Preview', icon: 'i-lucide-eye', value: 'preview', slot: 'preview' }
]

// Shared entry state (empty defaults)
const product = useState<ProductEntry>(
  'createProduct',
  (): ProductEntry => ({
    name: '',
    description: '',
    content: '',
    price: 0,
    image: '',
    galleryImages: [],
    active: true,
    stock: 0,
    slug: '',
    id: ''
  })
)

// File refs for images
const mainImageFile = useState<File | null>(
  'createProductMainImageFile',
  () => null
)
const galleryFile1 = useState<File | null>(
  'createProductGallery1File',
  () => null
)
const galleryFile2 = useState<File | null>(
  'createProductGallery2File',
  () => null
)
const galleryFile3 = useState<File | null>(
  'createProductGallery3File',
  () => null
)
const galleryFile4 = useState<File | null>(
  'createProductGallery4File',
  () => null
)

// Firestore creation helper
const { createProduct } = useProductCreate()

// pull in generic uploader
const { uploadImage } = useMediaStorage()

async function handleCreate() {
  // Require a main image before creating
  if (!mainImageFile.value) {
    console.error('Main product image is required')
    // Optionally show UI feedback here
    return
  }

  // derive a slug/id from the name
  const slug = product.value.name.trim().replace(/\s+/g, '-').toLowerCase()
  product.value.slug = slug
  product.value.id = slug

  // upload main image if file provided, otherwise leave blank
  if (mainImageFile.value) {
    product.value.image =
      (await uploadImage({
        file: mainImageFile.value,
        collection: 'products',
        id: slug,
        type: 'main'
      })) ?? ''
  }

  // upload up to four gallery images
  product.value.galleryImages = []
  const gallerySlots: Array<{ file: File | null; type: string }> = [
    { file: galleryFile1.value, type: 'gallery1' },
    { file: galleryFile2.value, type: 'gallery2' },
    { file: galleryFile3.value, type: 'gallery3' },
    { file: galleryFile4.value, type: 'gallery4' }
  ]
  for (const slot of gallerySlots) {
    if (!slot.file) continue
    const url = await uploadImage({
      file: slot.file,
      collection: 'products',
      id: slug,
      type: slot.type
    })
    if (url) product.value.galleryImages.push(url)
  }

  try {
    const createdSlug = await createProduct(product.value)
    console.log('Product created with slug:', createdSlug)
  } catch (err) {
    console.error('Error creating product:', err)
  }
}
</script>

<style scoped>
.root-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
