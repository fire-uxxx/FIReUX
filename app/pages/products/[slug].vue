<template>
  <div v-if="product" class="page">
    <OrganismsProductCardsPage :product="product" />
  </div>
  <div v-else>
    <h1>404 – Product not found</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchProductBySlug } = useProducts()


const product = await fetchProductBySlug(route.params.slug as string)
</script>