<template>
  <div class="product-list">
    <OrganismsProductCardsCell
      v-for="product in products"
      :key="product.slug"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ products: Product[] }>()
</script>

<style>
.product-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
