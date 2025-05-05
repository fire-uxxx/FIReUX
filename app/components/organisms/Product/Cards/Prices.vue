<template>
  <div class="product-prices">
    <div
      v-for="(price, index) in prices"
      :key="index"
      class="product-price-item"
      @click="selectPrice(index)"
      :class="{ selected: selectedIndex === index }"
    >
      <p>{{ formatPrice(price.unit_amount, price.currency) }}</p>
      <UBadge :color="price.active ? 'success' : 'warning'" variant="subtle">
        {{ price.active ? 'Active' : 'Inactive' }}
      </UBadge>
      <p class="price-type">{{ price.type }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  prices: Price[]
  modelValue?: number | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const selectedIndex = ref<number | null>(props.modelValue ?? null)

watch(
  () => props.modelValue,
  value => {
    selectedIndex.value = value ?? null
  }
)

function selectPrice(index: number) {
  selectedIndex.value = index
  emit('update:modelValue', index)
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}
</script>

<style scoped>
.product-prices {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-price-item {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s;
}

.product-price-item:hover {
  background-color: var(--background-2);
}

.selected {
  border-color: var(--primary);
  background-color: var(--background-1);
}

.price-type {
  font-size: 0.875rem;
  color: var(--text-secondary);
}
</style>