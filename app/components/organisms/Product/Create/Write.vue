<!-- app/components/organisms/Product/Create/Write.vue -->
<template>
  <div class="write-system">
    <!-- Name -->
    <UInput v-model="product.name" placeholder="Product Name" />

    <!-- Short Description -->
    <UFormField label="Description">
      <UInput
        v-model="product.description"
        placeholder="Enter product description"
        type="textarea"
      />
    </UFormField>

    <!-- Long Content (HTML) -->
    <UFormField label="Content">
      <ClientOnly>
        <QuillEditor
          v-model:content="product.content"
          content-type="html"
          theme="snow"
        />
      </ClientOnly>
    </UFormField>

    <!-- Price / Currency / Stock / Active -->
    <div class="fields-grid">
      <!-- Price as currency -->
      <UFormField label="Price">
        <UInputNumber
          v-model="product.price"
          :format-options="{
            style: 'currency',
            currency: currency,
            currencyDisplay: 'code',
            currencySign: 'accounting'
          }"
        />
      </UFormField>

      <!-- Stock Management -->
      <USelect
        v-model="product.stockType"
        :options="stockTypeOptions"
        placeholder="Select stock type"
      />

      <!-- Finite stock count -->
      <UFormField v-if="product.stockType === 'finite'" label="Stock Quantity">
        <UInputNumber v-model="product.stock" placeholder="0" />
      </UFormField>

      <!-- Availability toggle for manual & infinite stock -->
      <UFormField v-else label="Active">
        <USwitch v-model="product.active" label="Active" />
      </UFormField>
    </div>

    <!-- Advanced Settings -->
    <OrganismsProductCreateAdvanced />

    <!-- Prices (Stripe-style) -->
    <OrganismsProductCreatePrices />

    <!-- Images -->
    <OrganismsProductCreateImages />
  </div>
</template>

<script setup lang="ts">
import { USelect } from '#components'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// Stock options
import type { StockType } from '@/models/product.model'

// Shared entry state and currency
const product = useState<ProductEntry>('createProduct')
const { currency } = useProducts()
const stockTypeOptions: Array<{ label: string; value: StockType }> = [
  { label: 'Finite', value: 'finite' },
  { label: 'Infinite', value: 'infinite' },
  { label: 'Manual', value: 'manual' }
]

// Ensure defaults on mount
if (!product.value.stockType) {
  product.value.stockType = 'finite'
  product.value.stock = product.value.stock ?? 0
  product.value.active = product.value.active ?? true
}
</script>

<style scoped>
.write-system {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
