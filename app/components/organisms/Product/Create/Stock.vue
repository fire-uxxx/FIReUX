<template>
  <div class="stock-fields">
    <!-- Product Type -->
    <UFormField label="Product Type">
      <USelect
        v-model="product.productType"
        :items="productTypeOptions"
        placeholder="Select product type"
      />
    </UFormField>

    <!-- Stock Management -->
    <UFormField label="Stock Management">
      <USelect
        v-model="product.stockType"
        :items="stockTypeOptions"
        placeholder="Select stock type"
      />
    </UFormField>

    <!-- Finite Stock Quantity -->
    <UFormField v-if="product.stockType === 'finite'" label="Stock Quantity">
      <UInputNumber v-model="product.stock" placeholder="0" />
    </UFormField>

    <!-- Infinite or Manual Availability -->
    <UFormField v-else label="Available">
      <USwitch v-model="product.active" label="In Stock" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
// Pull in the shared product state
const { product } = useCreateProductState()

// Define dropdown options
const productTypeOptions: Array<{ label: string; value: ProductType }> = [
  { label: 'Physical', value: ProductType.Physical },
  { label: 'Digital',  value: ProductType.Digital  },
  { label: 'Service',  value: ProductType.Service  }
]

const stockTypeOptions: Array<{ label: string; value: StockType }> = [
  { label: 'Finite',   value: 'finite'  },
  { label: 'Infinite', value: 'infinite'},
  { label: 'Manual',   value: 'manual'  }
]
</script>

<style scoped>
.stock-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
