<!-- app/components/organisms/Product/Create/Preview.vue -->
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

    <!-- DESCRIPTION (sanitized HTML) -->
    <section v-html="sanitizedDescription" />
    <em v-if="!product.description" class="warning">Missing description</em>

    <!-- CONTENT (sanitized HTML) -->
    <section v-html="sanitizedContent" />
    <em v-if="!product.content" class="warning">Missing content</em>

    <!-- PRICE -->
    <p>
      <strong>Price:</strong>
      <span v-if="product.price != null">{{ formattedPrice }}</span>
      <em v-else class="warning">Missing price</em>
    </p>

    <!-- STOCK -->
    <p>
      <strong>Stock:</strong>
      <span v-if="product.stock != null">{{ product.stock }}</span>
      <em v-else class="warning">Missing stock</em>
    </p>

    <!-- STATUS -->
    <p>
      <strong>Status:</strong>
      <span v-if="product.active">Active</span>
      <span v-else>Inactive</span>
    </p>

    <!-- CREATED AT -->
    <p>
      <strong>Created at:</strong>
      <span v-if="createdAt">{{ createdAt }}</span>
      <em v-else class="warning">Missing created_at</em>
    </p>

    <!-- UPDATED AT -->
    <p>
      <strong>Updated at:</strong>
      <span v-if="updatedAt">{{ updatedAt }}</span>
      <em v-else class="warning">Missing updated_at</em>
    </p>

    <!-- APP ID -->
    <p>
      <strong>App ID:</strong>
      <span v-if="APP_ID">{{ APP_ID }}</span>
      <em v-else class="warning">Missing appId</em>
    </p>

    <!-- MAIN IMAGE -->
    <div v-if="mainImage" class="preview-image">
      <img :src="mainImage" alt="Main product image preview" />
    </div>
    <em v-else class="warning">Missing main image</em>

    <!-- GALLERY IMAGES -->
    <div v-for="(img, idx) in galleryImages" :key="idx" class="preview-image">
      <img :src="img" :alt="`Gallery image #${idx + 1} preview`" />
      <em v-if="!img" class="warning">Missing gallery image #{{ idx + 1 }}</em>
    </div>
  </article>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'
// entry state
const product = useState<ProductEntry>('createProduct')

// preview-only Data-URLs from your pickers
const mainImage = useState<string>('createProductMainImageFile', () => '')
const galleryImage1 = useState<string>('createProductGallery1File', () => '')
const galleryImage2 = useState<string>('createProductGallery2File', () => '')
const galleryImage3 = useState<string>('createProductGallery3File', () => '')
const galleryImage4 = useState<string>('createProductGallery4File', () => '')

// collect gallery slots into an array
const galleryImages = [
  galleryImage1.value,
  galleryImage2.value,
  galleryImage3.value,
  galleryImage4.value
]

// sanitize HTML fields
const sanitizedDescription = computed(() =>
  DOMPurify.sanitize(product.value.description || '')
)
const sanitizedContent = computed(() =>
  DOMPurify.sanitize(product.value.content || '')
)

// format cents → currency
const formattedPrice = computed(() => {
  if (product.value.price == null) return ''
  const dollars = product.value.price / 100
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: (product.value.currency || 'USD').toUpperCase()
  }).format(dollars)
})

// Timestamps for display-only
const now = new Date().toISOString()
const createdAt = now
const updatedAt = now

// App ID from runtime config
const config = useRuntimeConfig()
const APP_ID = config.public.APP_ID
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
