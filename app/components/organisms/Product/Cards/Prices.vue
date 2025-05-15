<template>
  <div class="product-prices">
    <div v-if="prices.length === 0">No price available</div>
    <div
      v-for="(price, index) in prices"
      :key="index"
      class="price-option"
      :class="{ selected: selectedIndex === index }"
      @click="selectedIndex = index"
    >
      {{ formatPrice(price.unit_amount, price.currency) }} - {{ price.type }}
    </div>
    <pre>{{ JSON.stringify(prices, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  productId: string
}>()

const selectedIndex = defineModel<number>('selectedIndex', { default: 0 })
const prices = ref<Price[]>([])

const { fetchProductPrices } = useProducts()
prices.value = await fetchProductPrices(props.productId)

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount / 100)
}
</script>

<style scoped>
.product-prices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.price-option {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  cursor: pointer;
}
.price-option.selected {
  background-color: var(--background-2);
  border-color: var(--primary);
}
</style>
