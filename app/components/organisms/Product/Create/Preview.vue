<!-- app/components/organisms/Product/Create/Preview.vue -->
<template>
  <div class="preview-layout">
    <!-- customer-style card -->
    <OrganismsProductCardsCustomer :product="product" />

    <!-- debug info card -->
    <OrganismsProductCardsInfo :product="product" />
  </div>
</template>

<script setup lang="ts">
// Grab the live draft state so both cards render current values
const { product } = useCreateProductState()
</script>

<style scoped>
.preview-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>