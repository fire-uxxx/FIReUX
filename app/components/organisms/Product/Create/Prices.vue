<template>
  <div class="prices-fields">
    <!-- Base Price -->
    <UFormField label="Price">
      <UInputNumber
        v-model="product.price"
        :format-options="{
          style: 'currency',
          currency,
          currencySign: 'accounting'
        }"
        placeholder="0.00"
      />
    </UFormField>

    <!-- Billing Type for non-physical products -->
    <UFormField
      v-if="product.productType !== ProductType.Physical"
      label="Billing Type"
    >
      <USelect
        v-model="product.pricingType"
        :items="pricingTypes"
        placeholder="One-time or Subscription"
      />
    </UFormField>

    <!-- Subscription Details -->
    <template v-if="product.pricingType === 'subscription'">
      <UFormField label="Interval">
        <USelect
          v-model="product.interval"
          :items="intervalOptions"
          placeholder="Select interval"
        />
      </UFormField>
      <UFormField label="Interval Count">
        <UInputNumber
          v-model.number="product.intervalCount"
          placeholder="e.g. 1"
        />
      </UFormField>
    </template>
  </div>
</template>

<script setup lang="ts">

const { product } = useCreateProductState()
const { currency } = useProducts()

// Billing options
const pricingTypes = [
  { label: 'One-time', value: 'one_time' },
  { label: 'Subscription', value: 'subscription' }
]
// Subscription intervals
const intervalOptions = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' }
]
</script>

<style scoped>
.prices-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
