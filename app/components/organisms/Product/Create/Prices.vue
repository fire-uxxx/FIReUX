<!-- app/components/organisms/Product/Create/Prices.vue -->
<template>
  <div class="prices-system">
    <template v-for="(price, idx) in product.prices || []" :key="idx">
      <div class="price-row">
        <UInput v-model="price.id" placeholder="Price ID" />
        <USwitch v-model="price.active" label="Active" />
        <UInput
          v-model.number="price.unit_amount"
          type="number"
          placeholder="Amount (cents)"
        />
        <UInput v-model="price.currency" placeholder="Currency" />
        <UInput v-model="price.billing_scheme" placeholder="Billing scheme" />
        <UInput v-model="price.interval" placeholder="Interval (e.g. month)" />
        <UInput
          v-model.number="price.interval_count"
          type="number"
          placeholder="Interval count"
        />
        <UFormField label="Description">
          <UInput
            v-model="price.description"
            type="textarea"
            placeholder="Optional description"
          />
        </UFormField>
        <UIcon
          name="lucide:x-circle"
          class="remove-icon"
          @click="removePrice(idx)"
        />
      </div>
      <hr />
    </template>

    <UButton variant="outline" @click="addPrice"> Add Price </UButton>
  </div>
</template>

<script setup lang="ts">
import type { Price, ProductEntry } from '@/models/product.model'

const product = useState<ProductEntry>('createProduct')

function addPrice() {
  if (!product.value.prices) product.value.prices = []
  product.value.prices.push({
    id: '',
    active: true,
    billing_scheme: 'per_unit',
    currency: product.value.currency,
    product: product.value.id || '',
    unit_amount: 0
  } as Price)
}

function removePrice(i: number) {
  product.value.prices?.splice(i, 1)
}
</script>

<style scoped>
.prices-system {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.price-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) 40px;
  gap: 0.5rem;
  align-items: center;
}
.remove-icon {
  cursor: pointer;
  color: var(--ui-danger);
}
</style>
