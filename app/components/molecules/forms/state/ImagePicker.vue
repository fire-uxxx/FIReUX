<template>
  <div class="picker">
    <label :for="id" class="picker-label">{{ label }}</label>
    <!-- hidden file input -->
    <input
      ref="inputRef"
      :id="id"
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

// shared Nuxt state, using the same key the parent initialized
const dataRef = useState<string>(props.stateKey, () => '')
const fileRef = useState<File | null>(props.stateKey + 'File', () => null)

// file input ref for triggering dialog
const inputRef = ref<HTMLInputElement | null>(null)
const id = `upload-${props.stateKey}`

function trigger() {
  inputRef.value?.click()
}

function onSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null
  if (!file) {
    dataRef.value = ''
    fileRef.value = null
    return
  }

  // hold onto the File for your upload step
  fileRef.value = file

  // generate a Data-URL for instant preview
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
</style>