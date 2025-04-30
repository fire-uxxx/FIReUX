<!-- app/components/organisms/Product/Cards/Info.vue -->
<template>
  <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
    <h3 class="text-lg font-medium text-gray-800">Debug Info</h3>
    <ul class="text-sm text-gray-700 space-y-1">
      <li><span class="font-semibold">ID:</span> {{ product.id }}</li>
      <li><span class="font-semibold">Slug:</span> {{ product.slug }}</li>
      <li><span class="font-semibold">Created at:</span> {{ formattedTimestamp(product.created_at) }}</li>
      <li><span class="font-semibold">Updated at:</span> {{ formattedTimestamp(product.updated_at) }}</li>
      <li><span class="font-semibold">App ID:</span> {{ product.appId }}</li>
      <li><span class="font-semibold">Type:</span> {{ product.productType || 'n/a' }}</li>
      <li><span class="font-semibold">Secondary Text:</span> {{ product.secondaryText || 'n/a' }}</li>
      <li>
        <span class="font-semibold">Gallery:</span>
        <template v-if="product.galleryImages.length">
          <ul class="ml-4 list-disc">
            <li v-for="(img, i) in product.galleryImages" :key="i" class="break-all">
              {{ img }}
            </li>
          </ul>
        </template>
        <span v-else class="text-gray-500">None</span>
      </li>
      <li>
        <span class="font-semibold">Metadata:</span>
        <pre class="bg-white p-2 rounded overflow-auto text-xs">{{ json(product.metadata) }}</pre>
      </li>
      <li>
        <span class="font-semibold">Prices:</span>
        <template v-if="product.prices?.length">
          <ul class="ml-4 list-disc">
            <li v-for="p in product.prices" :key="p.id">
              <code class="text-xs">{{ p.id }}</code>
              — {{ p.currency.toUpperCase() }}
              {{ (p.unit_amount / 100).toFixed(2) }}
              <span v-if="p.type === 'recurring'">
                ({{ p.interval_count }}×{{ p.interval }})
              </span>
            </li>
          </ul>
        </template>
        <span v-else class="text-gray-500">None</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const { product } = defineProps<{ product: Product }>()

// Helpers
function json(obj: unknown) {
  return JSON.stringify(obj || {}, null, 2)
}

function formattedTimestamp(ts: string) {
  try {
    return new Date(ts).toLocaleString()
  } catch {
    return ts
  }
}
</script>

<style scoped>
/* nothing extra—layout handled by Tailwind */
</style>