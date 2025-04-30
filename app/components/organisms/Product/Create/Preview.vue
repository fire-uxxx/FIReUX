<template>
  <article class="preview-card">
    <!-- NAME -->
    <h1>
      <span v-if="product.name">{{ product.name }}</span>
      <em v-else class="warning">Missing product name</em>
    </h1>

    <!-- SLUG -->
    <p>
      <strong>Slug:</strong>
      <span v-if="product.slug">{{ product.slug }}</span>
      <em v-else class="warning">Missing slug</em>
    </p>

    <!-- DESCRIPTION -->
    <p v-if="product.description">{{ product.description }}</p>
    <em v-else class="warning">Missing description</em>

    <!-- CONTENT (sanitized HTML) -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <section v-if="product.content" v-html="sanitizedContent" />
    <em v-else class="warning">Missing content</em>

    <!-- PRICE -->
    <p>
      <strong>Price:</strong>
      <span v-if="product.price != null">
        {{ (product.price / 100).toFixed(2) }} {{ currency.toUpperCase() }}
      </span>
      <em v-else class="warning">Missing price</em>
    </p>

    <!-- BILLING TYPE & INTERVAL -->
    <template v-if="product.pricingType">
      <p><strong>Billing:</strong> {{ pricingLabel }}</p>
      <p v-if="product.pricingType === 'subscription'">
        <strong>Interval:</strong>
        {{ product.intervalCount }} × {{ product.interval }}
      </p>
    </template>

    <!-- STOCK & STATUS -->
    <p>
      <strong>Stock:</strong>
      <span v-if="product.stockType === 'finite'">
        {{ product.stock }} remaining
      </span>
      <span v-else>
        {{ product.stockType === 'infinite' ? 'Unlimited' : 'Manual control' }}
      </span>
    </p>
    <p><strong>Status:</strong> {{ product.active ? 'Active' : 'Inactive' }}</p>

    <!-- MAIN IMAGE -->
    <div v-if="mainSrc" class="preview-image">
      <img :src="mainSrc" alt="Main product image" />
    </div>
    <em v-else class="warning">Missing main image</em>
  </article>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

// Shared creation state (mainImageData under same key)
const { product, mainImageData } = useCreateProductState()
const { currency } = useProducts()

// Sanitize HTML safely for v-html
const sanitizedContent = computed(() =>
  DOMPurify.sanitize(product.value.content || '')
)

// Derived billing label
const pricingLabel = computed(() =>
  product.value.pricingType === 'subscription' ? 'Subscription' : 'One-time'
)

// Compute preview source from the Data-URL or persisted URL
const mainSrc = computed(() =>
  mainImageData.value || product.value.image || ''
)
</script>

<style scoped>
.preview-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-image {
  max-width: 400px;
}

.preview-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 1px solid var(--ui-border);
  border-radius: var(--radius-sm);
}

.warning {
  color: var(--ui-danger);
  font-style: italic;
}
</style>