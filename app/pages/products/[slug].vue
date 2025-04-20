<template>
  <div v-if="product" class="page">
    <OrganismsProductCardsPage :product="product" />
  </div>
  <div v-else>
    <h1>404 – Product not found</h1>
  </div>
</template>

<script setup>
const route = useRoute()
const { fetchProduct } = useProducts()

// Fetch the product based on the slug parameter from the URL
const product = fetchProduct(route.params.slug)
</script>
