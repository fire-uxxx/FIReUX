<template>
  <div class="prices-fields">
    <UFormField :label="`Price (${currency})`">
      <UInputNumber
        v-model.number="priceAmount"
        placeholder="0.00"
      />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
const { product } = useCreateProductState()
const { currency } = useProducts()

// Ensure first price exists using full `Price` shape
watchEffect(() => {
  if (!Array.isArray(product.value.prices)) {
    product.value.prices = []
  }

  if (!product.value.prices.length) {
    const defaultPrice: Price = {
      id: 'temp-id', // Replace with real ID after Stripe creation
      active: true,
      billing_scheme: 'per_unit',
      currency: currency.toLowerCase(),
      unit_amount: 0,
      type: 'one_time'
    }
    product.value.prices.push(defaultPrice)
  }
})

const firstPrice = computed(() => product.value.prices?.[0])

const priceAmount = computed<number>({
  get: () =>
    firstPrice.value?.unit_amount
      ? firstPrice.value.unit_amount / 100
      : 0,
  set: val => {
    if (firstPrice.value) {
      firstPrice.value.unit_amount = Math.round(val * 100)
    }
  }
})
</script>