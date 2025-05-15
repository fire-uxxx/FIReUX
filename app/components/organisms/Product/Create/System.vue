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
const selectedTab = ref<'write' | 'preview'>('write')
const tabItems = [
  { label: 'Write', icon: 'i-lucide-pencil', value: 'write', slot: 'write' },
  { label: 'Preview', icon: 'i-lucide-eye', value: 'preview', slot: 'preview' }
]

// Composable state
const {
  product
  // resetCreateProductState // optionally re-enable for reset after create
} = useCreateProductState()

const { createProduct } = useProducts()

const isCreating = ref(false)

async function handleCreate() {
  if (!product.value.name || !product.value.name.trim()) {
    alert('Product name is required')
    return
  }

  isCreating.value = true

  const response = await createProduct()

  if (!response.success) {
    alert(`❌ Failed to create product: ${response.error}`)
    isCreating.value = false
    return
  }

  isCreating.value = false
}
</script>
