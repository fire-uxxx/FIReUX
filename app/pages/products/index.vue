<template>
  <div class="products-page">
    <h1>Debug Products</h1>
    <pre>{{ products }}</pre>
  </div>
</template>

<script setup lang="ts">
const { productsCollection: products } = useProducts()


</script>