<template>
  <div class="product-create-container">
    <h2>Create Product</h2>
    <form @submit.prevent="handleCreate">
      <UInput v-model="product.name" placeholder="Product Name" />
      <UInput v-model="product.description" placeholder="Product Description" />
      <UInput v-model.number="product.price" placeholder="Price" type="number" />
      <UInput v-model="product.image" placeholder="Image URL" />
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="product.active" /> Active
        </label>
      </div>
      <UButton type="submit">Create Product</UButton>
    </form>
    <pre v-if="createdProduct">{{ createdProduct }}</pre>

  </div>
</template>

<script setup lang="ts">

// Initialize an empty product object
const product = ref<Product>({
  id: '',
  name: '',
  description: '',
  price: 0,
  currency: 'USD',
  image: '',
  active: false
})

// Create a ref to hold the created product JSON string
const createdProduct = ref('')
const { createProduct } = useProducts()

// Function to handle form submission
const handleCreate = async () => {
  try {
    const response = await createProduct(product.value)
    console.log('Product created', response)
    createdProduct.value = JSON.stringify(response, null, 2)
  } catch (err) {
    console.error('Error creating product:', err)
    createdProduct.value = `Error: ${err instanceof Error ? err.message : err}`
  }
}
</script>

<style scoped>
.product-create-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 720px;
  margin: 0 auto;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>