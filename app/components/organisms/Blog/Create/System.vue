<template>
  <UTabs v-model="selectedTab" :items="tabItems">
    <!-- Write Tab -->
    <template #write>
      <div class="tab">
        <UInput v-model="fullBlogPost.title" placeholder="Blog Title" />
        <UInputMenu
          v-model="fullBlogPost.type"
          :items="[
            { label: 'Article', value: 'article' },
            { label: 'Product', value: 'product' }
          ]"
          placeholder="Select Post Type"
          value-key="value"
        />
        <UInputMenu
          v-if="fullBlogPost.type === 'product'"
          v-model="fullBlogPost.product_id"
          :items="productItems"
          placeholder="Select Product"
          value-key="value"
        />
        <div class="editor-container">
          <ClientOnly>
            <QuillEditor
              v-model:content="fullBlogPost.content"
              content-type="html"
              theme="snow"
            />
          </ClientOnly>
        </div>
        <OrganismsBlogCreateAdvanced v-model:blog-post="fullBlogPost" />
        <OrganismsBlogCreateImages v-model:blog-post="fullBlogPost" />
      </div>
    </template>

    <!-- Preview Tab -->
    <template #preview>
      <div class="tab">
        <OrganismsBlogCreatePreview v-model:blog-post="fullBlogPost" />
      </div>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import type { BlogPost } from '@/models/blogPost.model'

// Get the functions that generate slug and calculate reading time.
const { generateSlug, computeReadingTime } = useBlogPostCreate()

// Use Partial to allow an open object structure that will gradually get filled
const blogPost = ref<Partial<BlogPost>>({})

// Define default BlogPost
const defaultBlogPost: BlogPost = {
  title: '',
  content: '',
  metaDescription: '',
  slug: '',
  created_at: '',
  updated_at: '',
  author: { display_name: '', handle: '', avatar: '', id: '' },
  keywords: [],
  tags: [],
  canonicalUrl: '',
  featuredImage: '',
  socialImage: '',
  readingTime: '',
  cta_link: '',
  type: 'article',
  appId: ''
}

// Create computed property for full BlogPost
const fullBlogPost = computed({
  get: () => ({ ...defaultBlogPost, ...blogPost.value }),
  set: (value: BlogPost) => { blogPost.value = value }
})

// Tab selection state, defaulting to the "write" tab.
const selectedTab = ref('write')

// Define the UTabs items. These items correspond to the "Write" and "Preview" slots.
const tabItems = ref([
  { label: 'Write', icon: 'i-lucide-edit', value: 'write', slot: 'write' },
  { label: 'Preview', icon: 'i-lucide-eye', value: 'preview', slot: 'preview' }
]) as Ref<Array<{ label: string; icon: string; value: string; slot: string }>>

// Optional: If product functionality is needed later, the placeholder array can be populated.
const productItems: { label: string; value: string }[] = []

// When the user switches to the Preview tab, update derived properties.
// This ensures that the preview is up-to-date with computed values.
watch(selectedTab, newVal => {
  if (newVal === 'preview') {
    fullBlogPost.value.slug = generateSlug(fullBlogPost.value.title || '')
    fullBlogPost.value.readingTime = computeReadingTime(fullBlogPost.value.content || '')
  }
})

// Alternatively, consider real-time updates using computed properties:
// const slug = computed(() => generateSlug(blogPost.value.title))
// const readingTime = computed(() => computeReadingTime(blogPost.value.content))
// Then pass these computed values to the preview component or merge them into blogPost when needed.
</script>

<style scoped lang="css">
.tab {
  display: flex;
  flex-direction: column;
}
.tab > * {
  margin-bottom: 1rem;
}
.tab > *:last-child {
  margin-bottom: 0;
}
.editor-container {
  margin-bottom: 1rem;
}
:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-inline: 0 !important;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>