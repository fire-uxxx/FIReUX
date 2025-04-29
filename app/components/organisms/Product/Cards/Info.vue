<template>
  <div class="info-card">
    <ul>
      <li><strong>ID:</strong> {{ product.id }}</li>
      <li><strong>Slug:</strong> {{ product.slug }}</li>
      <li><strong>Created at:</strong> {{ product.created_at }}</li>
      <li><strong>Updated at:</strong> {{ product.updated_at }}</li>
      <li><strong>App ID:</strong> {{ product.appId }}</li>
      <li><strong>Product Type:</strong> {{ product.productType || 'n/a' }}</li>
      <li><strong>Secondary Text:</strong> {{ product.secondaryText || 'n/a' }}</li>
      <li><strong>Gallery Images:</strong> 
        <ul>
          <li v-for="(img, i) in product.galleryImages" :key="i">{{ img }}</li>
        </ul>
      </li>
      <li><strong>Metadata:</strong> {{ product.metadata ? JSON.stringify(product.metadata) : '{}' }}</li>
      <li><strong>Prices:</strong> 
        <ul>
          <li v-for="p in product.prices || []" :key="p.id">
            {{ p.id }} – {{ p.currency }} {{ p.unit_amount }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

defineProps<{ product: Product }>()
</script>

<style scoped>
.info-card {
  border: 1px dashed var(--ui-border);
  border-radius: var(--radius-sm);
  padding: var(--space-4);
  background: var(--ui-bg-muted);
}
.info-card ul {
  list-style: none;
  padding: 0;
}
.info-card li {
  margin-bottom: var(--space-2);
}
</style>