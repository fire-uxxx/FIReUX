<template>
  <UCard class="card" variant="outline" @click="navigateToProduct">
    <template #header>
      <h3>{{ product.name }}</h3>
    </template>
    <template #body>
      <p>{{ product.description }}</p>
      <img :src="product.image" :alt="product.name" />
    </template>
    <template #footer>
      <p>
        Price: ${{ (product.price / 100).toFixed(2) }} {{ product.currency }}
      </p>
    </template>
  </UCard>
</template>

<script setup lang="ts">

const props = defineProps<{ product: Product }>()
const router = useRouter()

function navigateToProduct() {
  router.push(`/products/${props.product.slug}`)
}
</script>
