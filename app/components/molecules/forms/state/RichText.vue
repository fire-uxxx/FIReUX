<template>
  <UFormField label="Content">
    <ClientOnly>
      <QuillEditor
        v-model:content="localValue"
        content-type="html"
        theme="snow"
      />
    </ClientOnly>
  </UFormField>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Local 2-way bindable state
const localValue = ref(props.modelValue || '')

// Sync prop -> local
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== localValue.value) {
      localValue.value = newVal || ''
    }
  }
)

// Sync local -> parent
watch(localValue, (val) => {
  emit('update:modelValue', val)
})
</script>
