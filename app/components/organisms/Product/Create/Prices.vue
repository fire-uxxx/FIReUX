<template>
  <div class="prices-fields">
    <OrganismsProductCreatePrice
      v-for="(_, index) in prices"
      :key="index"
      :index="index"
      :show-remove="prices.length > 1"
      @remove="removePrice(index)"
    />

    <div class="add-price">
      <UButton
        icon="i-lucide-plus"
        size="md"
        color="primary"
        variant="solid"
        class="font-bold rounded-full"
        @click="addPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { prices, addPrice, removePrice } = useCreatePricesState()
</script>

<style scoped>
.prices-fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center; /* Centers content horizontally */
}
</style>
