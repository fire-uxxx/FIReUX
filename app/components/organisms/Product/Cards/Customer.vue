<template>
  <UCard>
    <img
      :src="mainImageData"
      :alt="product.name || 'Preview image'"
    >

    <div>
      <h3>{{ product.name || 'Untitled Product' }}</h3>

      <p>
        {{ product.description || 'No description provided.' }}
      </p>

      <div>
        <span>{{ formattedPrice }}</span>
        <UBadge
          variant="subtle"
          :color="product.active ? 'success' : 'warning'"
        >
          {{ product.active ? 'Active' : 'Inactive' }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { product } = defineProps<{ product: Partial<StripeProduct> }>()

const { formatPrice } = useProducts()

// Always pull directly from the main image state during creation
const mainImageData = useState<string>('createProductMainImage', () => '')

const firstPrice = product.prices?.[0]
const formattedPrice = firstPrice
  ? formatPrice(firstPrice.unit_amount, firstPrice.currency)
  : 'No price'
</script>