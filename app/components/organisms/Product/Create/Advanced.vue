<template>
  <UCollapsible>
    <UButton
      class="group"
      label="Advanced Settings"
      trailing-icon="i-lucide-chevron-down"
      block
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
    />

    <template #content>
      <div class="advanced-settings">
        <!-- Secondary Text / Tagline -->
        <UFormField label="Tagline / Secondary Text">
          <UInput
            v-model="product.secondaryText"
            placeholder="Short tagline or subheading"
          />
        </UFormField>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">
// Pull in shared product state for secondaryText
const { product } = useCreateProductState()
</script>

<style scoped>
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
