<!-- app/components/organisms/Product/Cards/Customer.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <!-- Product image -->
    <div class="w-full aspect-video overflow-hidden">
      <img
        :src="product.image"
        :alt="`Image of ${product.name}`"
        class="w-full h-full object-cover object-center"
      />
    </div>

    <!-- Card body -->
    <div class="p-4 flex flex-col gap-2">
      <h2 class="text-xl font-semibold text-gray-800">{{ product.name }}</h2>

      <p class="text-gray-600 line-clamp-3">
        {{ product.description }}
      </p>

      <div class="mt-2 flex items-center justify-between">
        <span class="text-lg font-bold text-indigo-600">
          {{ formattedPrice }}
        </span>
        <span
          class="px-2 py-1 text-sm font-medium rounded-full"
          :class="product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          {{ product.active ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>

      <div v-if="product.stockType === 'finite'" class="text-sm text-gray-500">
        {{ product.stock }} units remaining
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { product } = defineProps<{ product: Product }>()

// Pull global currency setting for formatting
const { currency } = useProducts()

const formattedPrice = computed(() =>
  // assume price is stored in cents
  (product.price / 100).toLocaleString(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  })
)
</script>

<style scoped>
/* Truncate description to 3 lines */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>