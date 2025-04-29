<template>
  <div>
    <img :src="product.image" :alt="product.name" >
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>
    <p>
      Stock: {{ product.stock }} &bull; Status:
      {{ product.active ? 'In stock' : 'Out of stock' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/models/product.model'
const { product } = defineProps<{ product: Product }>()
</script>
