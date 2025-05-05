<template>
  <UCard class="card" variant="outline" @click="navigateToProduct">
    <template #header>
      <h3>{{ product.name || 'Unnamed Product' }}</h3>
    </template>

    <template #body>
      <p>{{ product.description || 'No description available.' }}</p>
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        style="width: 100%; height: auto; object-fit: cover"
      >
      <p>{{ product.content }}</p>
    </template>

    <template #footer>
      <p v-if="product.prices?.[0]">
        Price: ${{ ((product.prices[0].unit_amount ?? 0) / 100).toFixed(2) }}
        {{ product.prices[0].currency?.toUpperCase?.() || 'USD' }}
      </p>
      <p v-else>No price set</p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: Partial<FirebaseProduct>
}>()

const router = useRouter()

function navigateToProduct() {
  if (props.product.slug) {
    router.push(`/products/${props.product.slug}`)
  }
}
</script>