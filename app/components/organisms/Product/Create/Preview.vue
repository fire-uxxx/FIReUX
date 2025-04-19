<template>
  <div class="product-preview">
    <h3>{{ product.name }}</h3>
    <div v-if="product.image" class="image-container">
      <img :src="product.image" alt="Product image" />
    </div>
    <div class="description" v-html="product.description"></div>
    <p><strong>Price:</strong> {{ formattedPrice }}</p>
    <p v-if="product.secondaryText"><strong>Note:</strong> {{ product.secondaryText }}</p>
    <p v-if="product.productType"><strong>Type:</strong> {{ product.productType }}</p>
    <pre>{{ product }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/models/product.model'

const props = defineProps<{ product: Product }>()

// Format price (assuming cents)
const formattedPrice = computed(() => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: props.product.currency
  }).format(props.product.price / 100)
})
</script>

<style scoped>
.product-preview {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.image-container img {
  max-width: 100%;
  border-radius: 8px;
}
.description {
  white-space: pre-wrap;
}
</style>
