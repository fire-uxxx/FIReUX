<template>
  <UTabs v-model="selectedTab" :items="tabItems">
    <template #write>
      <div class="tab">
        <UInput v-model="blogPost.title" placeholder="Blog Title" />
        <UInputMenu
          v-model="blogPost.type"
          :items="[
            { label: 'Article', value: 'article' },
            { label: 'Product', value: 'product' }
          ]"
          placeholder="Select Post Type"
          value-key="value"
        />
        <UInputMenu
          v-if="blogPost.type === 'product'"
          v-model="blogPost.product_id"
          :items="productItems"
          placeholder="Select Product"
          value-key="value"
        />
        <div class="editor-container">
          <ClientOnly>
            <QuillEditor
              v-model:content="blogPost.content"
              content-type="html"
              theme="snow"
            />
          </ClientOnly>
        </div>
        <OrganismsBlogCreateAdvanced v-model:blog-post="blogPost" />
        <OrganismsBlogCreateImages v-model:blog-post="blogPost" />
      </div>
    </template>

    <!-- Preview Tab -->
    <template #preview>
      <div class="tab">
        <OrganismsBlogCreatePreview v-model:blog-post="blogPost" />
        <div class="actions">
          <UButton @click="handleCreate">Create Blog Post</UButton>
        </div>
      </div>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const {
  computeReadingTime,
  createBlogPost,
  getAuthor,
  getDefaultImages,
  generateSlug
} = useBlogPosts()

const blogPost = ref<BlogPost>({
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
  readingTime: '0 min',
  cta_link: '',
  type: 'article',
  appId: '',
  product_id: ''
})

onMounted(() => {
  blogPost.value.author = getAuthor()
  const { featuredImage, socialImage } = getDefaultImages()
  blogPost.value.featuredImage = featuredImage
  blogPost.value.socialImage = socialImage
})

watch(
  () => blogPost.value.content,
  (content = '') => {
    blogPost.value.readingTime = computeReadingTime(content)
  }
)

watch(
  () => blogPost.value.title,
  (title = '') => {
    blogPost.value.slug = generateSlug(title)
  }
)

// Tab state
const selectedTab = ref('write')
const tabItems = ref<
  Array<{ label: string; icon: string; value: string; slot: string }>
>([
  { label: 'Write', icon: 'i-lucide-edit', value: 'write', slot: 'write' },
  { label: 'Preview', icon: 'i-lucide-eye', value: 'preview', slot: 'preview' }
])

// Placeholder for product dropdown
const productItems = ref<{ label: string; value: string }[]>([])

async function handleCreate() {
  try {
    const created = await createBlogPost(blogPost.value)
    console.log('Blog post created', created)
  } catch (err) {
    console.error('Error creating blog post:', err)
  }
}
</script>

<style scoped lang="css">
/* Removed CSS for normalization */
</style>
