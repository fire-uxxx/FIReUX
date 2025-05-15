<template>

  {{product}}
  <div class="product-page">
    <div class="product-header">
      <img
        class="product-image"
        :src="product.image"
        :alt="product.name"
      >
      <div class="product-summary">
        <h1 class="product-title">{{ product.name }}</h1>
        <UBadge :color="product.active ? 'success' : 'warning'" variant="subtle">
          {{ product.active ? 'Active' : 'Inactive' }}
        </UBadge>
        <p class="product-description">{{ product.description }}</p>

        <OrganismsProductCardsPrices
          :productId="product.id"
          v-model:selectedIndex="selectedPriceIndex"
        />
      </div>
    </div>

    <div class="product-content" v-html="product.content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  product: FirebaseProduct
}>()

const selectedPriceIndex = ref(0)
</script>