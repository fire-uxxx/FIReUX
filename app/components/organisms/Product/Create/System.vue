<template>
  <UTabs v-model="selectedTab" :items="tabItems">
    <template #write>
      <div class="tab">
        <UInput v-model="product.name" placeholder="Product Name" />
        <div class="editor-container">
          <ClientOnly>
            <QuillEditor
              v-model:content="product.description"
              content-type="html"
              theme="snow"
            />
          </ClientOnly>
        </div>
        <UInput v-model.number="product.price" placeholder="Price" type="number" />
        <UInput v-model="product.image" placeholder="Image URL" />
        <OrganismsProductCreateAdvanced v-model:product="product" />
        <OrganismsProductCreateImages v-model:product="product" />
      </div>
    </template>

    <template #preview>
      <div class="tab">
        <OrganismsProductCreatePreview v-model:product="product" />
        <div class="actions">
          <UButton @click="handleCreate">Create Product</UButton>
        </div>
      </div>
    </template>
  </UTabs>
</template>

<script setup lang="ts">

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const { createProduct, generateSlug } = useProducts()
const product = ref<Product>({
  id: '',
  slug: '',
  name: '',
  description: '',
  price: 0,
  currency: 'USD',
  image: '',
  galleryImages: [],
  active: false
})

watch(() => product.value.name, (name = '') => {
  product.value.slug = generateSlug(name)
})

const selectedTab = ref('write')
const tabItems = ref<Array<{ label: string; icon: string; value: string; slot: string }>>([
  { label: 'Write', icon: 'i-lucide-edit', value: 'write', slot: 'write' },
  { label: 'Preview', icon: 'i-lucide-eye', value: 'preview', slot: 'preview' }
])

async function handleCreate() {
  try {
    const created = await createProduct(product.value)
    console.log('Blog post created', created)
  } catch (err) {
    console.error('Error creating blog post:', err)
  }
}
</script>

<style scoped lang="css">
.tab {
  display: flex;
  flex-direction: column;
}
.tab > * {
  margin-bottom: 1rem;
}
.tab > *:last-child {
  margin-bottom: 0;
}
.editor-container {
  margin-bottom: 1rem;
}
:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-inline: 0 !important;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.actions {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
</style>