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
          v-model="metaDescription"
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
          v-model="canonicalUrl"
          placeholder="Canonical URL"
          label="Canonical URL"
        />
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">


const props = defineProps<{ blogPost: BlogPost }>()
const emit = defineEmits<{ (e: 'update:blogPost', value: BlogPost): void }>()

// Simple string fields via toRef
const metaDescription = toRef(props.blogPost, 'metaDescription')
const canonicalUrl   = toRef(props.blogPost, 'canonicalUrl')

// Comma‑separated arrays via computed getters/setters
const keywordsInput = computed<string>({
  get: () => props.blogPost.keywords.join(', '),
  set: (val) => {
    emit('update:blogPost', {
      ...props.blogPost,
      keywords: val.split(',').map(s => s.trim()).filter(Boolean)
    })
  }
})

const tagsInput = computed<string>({
  get: () => props.blogPost.tags.join(', '),
  set: (val) => {
    emit('update:blogPost', {
      ...props.blogPost,
      tags: val.split(',').map(s => s.trim()).filter(Boolean)
    })
  }
})
</script>

<style scoped>
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
}
</style>