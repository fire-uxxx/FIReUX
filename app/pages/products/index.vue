<template>
  <div class="page">
    <h1>Products</h1>
    <p>Browse our available products.</p>
    <div v-for="prod in products" :key="prod.id" class="product-row">
      <OrganismsProductCardsCustomer :product="prod" />
      <OrganismsProductCardsInfo :product="prod" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { productsCollection: products } = useProducts()
</script>
