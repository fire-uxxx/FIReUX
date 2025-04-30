<!-- app/components/organisms/Product/Create/System.vue -->
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
      <UButton
        :loading="isCreating"
        :disabled="isCreating"
        @click="handleCreate"
      >
        Create Product
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Active tab
const selectedTab = ref<'write' | 'preview'>('write')
const tabItems = [
  { label: 'Write',   icon: 'i-lucide-pencil', value: 'write',   slot: 'write' },
  { label: 'Preview', icon: 'i-lucide-eye',    value: 'preview', slot: 'preview' }
]

// Shared state for product creation (now only Data-URL)
const {
  product,
  mainImageData,
  // resetCreateProductState
} = useCreateProductState()

// Utilities: slug validation & image upload
const {
  generateSlug,
  uploadMainImage,
  createProduct
} = useProducts()

const isCreating = ref(false)

async function handleCreate() {
  console.log('State Debug -- product:', product.value)
  console.log('State Debug -- mainImageData:', mainImageData.value)

  // Require main image data
  if (!mainImageData.value) {
    alert('Main product image is required')
    return
  }

  // Require product name
  if (!product.value.name?.trim()) {
    alert('Product name is required')
    return
  }

  isCreating.value = true

  // 1) Generate + validate slug
  const slugResult = await generateSlug(product.value.name)
  if (!slugResult.success) {
    alert(slugResult.message)
    isCreating.value = false
    return
  }
  product.value.slug = slugResult.slug

  // 2) Upload main image
  product.value.image = await uploadMainImage(
    mainImageData.value,
    product.value.slug
  )

  // 3) DEV: inspect full payload
    await createProduct(product.value)

  // 4) Reset for next create (if you re-enable)
  // resetCreateProductState()

  isCreating.value = false
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