<template>
  <div class="basic-fields">
    <UInput v-model="product.name" placeholder="Product Name" />
    <UTextarea
      v-model="product.description"
      autoresize
      placeholder="Description"
      class="unstyled-textarea"
    />
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
