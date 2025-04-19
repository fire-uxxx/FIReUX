<template>
  <UCollapsible>
    <UButton
      class="group"
      label="Images"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      block
    />
    <template #content>
      <div class="image-settings">
        <!-- Hero Image -->
        <UInput
          v-model="local.image"
          placeholder="Hero Image URL"
          label="Hero Image"
        />

        <!-- Gallery Images -->
        <div class="gallery">
          <label class="gallery-label">Gallery Images</label>
          <div
            v-for="(url, idx) in local.galleryImages"
            :key="idx"
            class="gallery-item"
          >
            <UInput
              v-model="local.galleryImages[idx]"
              placeholder="Image URL"
            />
            <UButton
              size="sm"
              @click="remove(idx)"
            >
              Remove
            </UButton>
          </div>
          <UButton size="sm" @click="add">
            Add Image
          </UButton>
        </div>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">

const props = defineProps<{ product: Product }>()
const emit  = defineEmits<{
  (e: 'update:product', value: Product): void
}>()

// Local reactive copy of image data
const local = reactive({
  image: props.product.image,
  galleryImages: [...(props.product.galleryImages ?? [])]
})

// When local changes, emit updated product
watch(
  local,
  () => {
    emit('update:product', {
      ...props.product,
      image: local.image,
      galleryImages: local.galleryImages
    })
  },
  { deep: true }
)

function add() {
  local.galleryImages.push('')
}

function remove(index: number) {
  local.galleryImages.splice(index, 1)
}
</script>

<style scoped>
.image-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
}

.gallery {
  margin-top: var(--space-4);
}

.gallery-label {
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.gallery-item {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  margin-bottom: var(--space-2);
}
</style>