<template>
  <div class="advanced-settings">
    <UInput
      v-model="local.metaDescription"
      placeholder="Meta Description"
      label="Meta Description"
    />
    <UInput
      v-model="keywordsInput"
      placeholder="Keywords (comma separated)"
      label="Keywords"
    />
    <UInput
      v-model="tagsInput"
      placeholder="Tags (comma separated)"
      label="Tags"
    />
    <UInput
      v-model="local.canonicalUrl"
      placeholder="Canonical URL"
      label="Canonical URL"
    />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{ blogPost: BlogPost }>()
const emit = defineEmits<{ (e: 'update:blogPost', value: BlogPost): void }>()

// Local copy for editing
const local = reactive({
  metaDescription: props.blogPost.metaDescription,
  keywords: props.blogPost.keywords.slice(),
  tags: props.blogPost.tags.slice(),
  canonicalUrl: props.blogPost.canonicalUrl
})

// Inputs as comma-separated strings
const keywordsInput = local.keywords.join(', ')
const tagsInput = local.tags.join(', ')

watch(
  () => keywordsInput,
  (val) => {
    local.keywords = val.split(',').map(s => s.trim()).filter(Boolean)
  }
)

watch(
  () => tagsInput,
  (val) => {
    local.tags = val.split(',').map(s => s.trim()).filter(Boolean)
  }
)

// Whenever local changes, emit updated blogPost
watch(
  local,
  () => {
    emit('update:blogPost', {
      ...props.blogPost,
      metaDescription: local.metaDescription,
      keywords: local.keywords,
      tags: local.tags,
      canonicalUrl: local.canonicalUrl
    })
  },
  { deep: true }
)
</script>

<style scoped>
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>