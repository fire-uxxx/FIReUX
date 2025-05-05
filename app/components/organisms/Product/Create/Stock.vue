<template>
  <div class="stock-fields">
    <h1>STOCK</h1>

    <!--
    <UFormField label="Product Type">
      <USelect
        v-model="product.productType"
        :items="productTypeOptions"
        placeholder="Select product type"
      />
    </UFormField>

    <UFormField label="Stock Quantity">
      <UInputNumber v-model="product.stock" placeholder="0" />
    </UFormField>

    <UFormField label="Available">
      <USwitch v-model="product.active" label="In Stock" />
    </UFormField>
    -->
  </div>
</template>

<script setup lang="ts">
// const { product } = useCreateProductState()

// const productTypeOptions = [
//   { label: 'Physical', value: 'physical' },
//   { label: 'Digital', value: 'digital' },
//   { label: 'Service', value: 'service' }
// ]
</script>

<style scoped>
.stock-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>