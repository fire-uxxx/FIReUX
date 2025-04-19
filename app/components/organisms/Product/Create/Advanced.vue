<template>
  <UCollapsible>
    <UButton
      class="group"
      label="Advanced"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      block
    />
    <template #content>
      <div class="advanced-settings">
        <UInput
          v-model="secondaryText"
          placeholder="Secondary Text"
          label="Secondary Text"
        />
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">

const props = defineProps<{ product: Product }>()
const secondaryText = toRef(props.product, 'secondaryText')
</script>

<style scoped>
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
}
</style>