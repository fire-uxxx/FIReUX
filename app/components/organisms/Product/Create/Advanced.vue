<!-- app/components/organisms/Product/Create/Advanced.vue -->
<template>
  <UCollapsible>
    <UButton
      class="group"
      label="Advanced Settings"
      trailing-icon="i-lucide-chevron-down"
      block
      :ui="{
        trailingIcon:
          'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
    />

    <template #content>
      <div class="advanced-settings">
        <!-- Secondary Text -->
        <UFormField label="Tagline / Secondary Text">
          <UInput
            v-model="product.secondaryText"
            placeholder="Short tagline or subheading"
          />
        </UFormField>

        <!-- Product Type -->
        <UFormField label="Product Type">
          <USelect
            v-model="product.productType"
            :options="typeOptions"
            placeholder="Select type"
          />
        </UFormField>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">
import { ProductType } from '@/models/product.model'
import type { ProductEntry } from '@/models/product.model'

const product = useState<ProductEntry>('createProduct')

const typeOptions = Object.values(ProductType).map(t => ({
  label: t.charAt(0).toUpperCase() + t.slice(1),
  value: t
}))
</script>

<style scoped>
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
