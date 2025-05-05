<template>
  <div>
    <h3>Debug Info</h3>
    <ul>
      <li>
        <strong>ID:</strong>
        {{ product.id || 'n/a' }}
      </li>
      <li>
        <strong>Slug:</strong>
        {{ product.slug || 'n/a' }}
      </li>
      <li>
        <strong>Created at:</strong>
        {{ product.createdAt ? formattedTimestamp(product.createdAt) : 'n/a' }}
      </li>
      <li>
        <strong>Updated at:</strong>
        {{ product.updatedAt ? formattedTimestamp(product.updatedAt) : 'n/a' }}
      </li>
      <li>
        <strong>App ID:</strong>
        {{ product.appId || 'n/a' }}
      </li>
      <li>
        <strong>Gallery:</strong>
        <template v-if="product.galleryImages?.length">
          <ul>
            <li v-for="(img, i) in product.galleryImages" :key="i">
              {{ img }}
            </li>
          </ul>
        </template>
        <span v-else>None</span>
      </li>
      <li>
        <strong>Prices:</strong>
        <template v-if="product.prices?.length">
          <ul>
            <li v-for="p in product.prices" :key="p.id">
              <code>{{ p.id }}</code> — {{ (p.currency || 'usd').toUpperCase() }}
              {{ ((p.unit_amount || 0) / 100).toFixed(2) }}
              <span v-if="p.type === 'recurring'">
                ({{ p.intervalCount || 1 }}×{{ p.interval || 'month' }})
              </span>
            </li>
          </ul>
        </template>
        <span v-else>None</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { product } = useCreateProductState()

function formattedTimestamp(ts: string | Date) {
  try {
    return new Date(ts).toLocaleString()
  } catch {
    return String(ts)
  }
}
</script>