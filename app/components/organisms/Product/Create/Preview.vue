<template>
  <div class="preview-layout">
    <div
      v-if="mainImageData"
      style="grid-column: 1 / -1; text-align: center; margin-bottom: 1rem"
    >
      <img
        :src="mainImageData"
        alt="Main Product Preview"
        style="
          max-width: 320px;
          max-height: 320px;
          border-radius: 12px;
          box-shadow: 0 2px 8px #0001;
        "
      />
      <div style="font-size: 0.9em; color: #888; margin-top: 0.25rem">
        Main Product Image Preview
      </div>
    </div>
    <OrganismsProductCardsProduct
      mode="preview"
      variant="cell"
      :product="previewProduct"
    />
    <OrganismsProductCardsProduct
      mode="preview"
      variant="customer"
      :product="previewProduct"
    />
    <OrganismsProductCardsProduct
      mode="preview"
      variant="info"
      :product="previewProduct"
    />
    <OrganismsProductCardsProduct
      mode="preview"
      variant="page"
      :product="previewProduct"
    />
    <pre>{{ prices }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const { product } = useCreateProductState()
const { prices, defaultPrice } = useCreatePricesState()

const mainImageData = useStorage('createProductMainImage', '')

const previewProduct = computed(
  () =>
    ({
      ...product.value,
      prices: prices.value,
      main_image: mainImageData.value,
      default_price: defaultPrice.value
    } as Partial<FirebaseProduct>)
)
</script>

<style scoped>
.preview-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}
</style>
