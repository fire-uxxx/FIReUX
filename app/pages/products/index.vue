<template>
  <div class="page">
    <h1>Products</h1>
    <p>Browse our available products.</p>
    <OrganismsProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
const { productCollection: products } = useProductFetch()
</script>
