<template>
  <div class="basic-fields">
    <!-- Name -->
    <UInput v-model="product.name" placeholder="Product Name" />

    <!-- Short Description -->
    <UFormField label="Description">
      <UInput
        v-model="product.description"
        placeholder="Enter product description"
        type="textarea"
      />
    </UFormField>

    <!-- Rich Text Content -->
    <MoleculesFormsStateRichText v-model="product.content" />
  </div>
</template>

<script setup lang="ts">

// Shared creation state
const { product } = useCreateProductState()
</script>

<style scoped>
.basic-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
