<template>
  <div class="picker">
    <label :for="id" class="picker-label">{{ label }}</label>
    <!-- hidden file input -->
    <input
      :id="id"
      ref="inputRef"
      type="file"
      accept="image/*"
      class="hidden-input"
      @change="onSelect"
    >
    <div class="image-container">
      <template v-if="dataRef">
        <img :src="dataRef" :alt="`${label} preview`" >
      </template>
    </div>
    <UButton icon="i-lucide-image-up" variant="subtle" @click="trigger">
      Upload
    </UButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  stateKey: string
}>()

// Preview Data-URL state
const dataRef = useState<string>(props.stateKey, () => '')

const inputRef = ref<HTMLInputElement | null>(null)
const id = `upload-${props.stateKey}`

function trigger() {
  inputRef.value?.click()
}

function onSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null

  if (!file) {
    dataRef.value = ''
    return
  }

  // Generate Data-URL for preview
  const reader = new FileReader()
  reader.onload = () => {
    dataRef.value = reader.result as string
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.hidden-input {
  display: none;
}
.picker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.image-container img {
  max-width: 100%;
  border-radius: var(--radius-sm);
  object-fit: cover;
}
</style>