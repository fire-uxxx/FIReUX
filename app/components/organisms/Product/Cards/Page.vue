<template>
  <div class="product-page">
    <div class="product-header">
      <img
        class="product-image"
        :src="product.image"
        :alt="product.name"
      >
      <div class="product-summary">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">
          {{ formattedPrice }}
        </p>
        <UBadge :color="product.active ? 'success' : 'warning'" variant="subtle">
          {{ product.active ? 'Active' : 'Inactive' }}
        </UBadge>
        <p class="product-description">{{ product.description }}</p>
      </div>
    </div>

    <div class="product-content" v-html="product.content" />
  </div>
</template>

<script setup lang="ts">
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useFirebaseApp } from 'vuefire'
import { ref } from 'vue'

const props = defineProps<{
  product: FirebaseProduct
}>()

const app = useFirebaseApp()
const db = getFirestore(app)

const prices = ref<Price[]>([])

try {
  const subRef = collection(db, `products/${props.product.id}/prices`)
  const snapshot = await getDocs(subRef)
  prices.value = snapshot.docs.map(doc => doc.data() as Price)
} catch (error) {
  console.error('❌ Error fetching prices:', error)
}

const firstPrice = prices.value[0]
const formattedPrice = firstPrice
  ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: firstPrice.currency.toUpperCase(),
    }).format(firstPrice.unit_amount / 100)
  : 'No price available'
</script>

<style scoped>
.product-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-image {
  width: 100%;
  max-width: 600px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.product-summary {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.product-title {
  font-size: 2rem;
  font-weight: bold;
}

.product-price {
  font-size: 1.25rem;
  color: var(--primary);
}

.product-description {
  color: var(--text-secondary);
}

.product-content {
  line-height: 1.7;
  color: var(--text);
}
</style>