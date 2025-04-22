<template>
  <div class="root-container">
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
          <OrganismsBlogCreateImages
            :blog-post="blogPost"
            @update:blog-post="updateBlogPost"
          />
        </div>
      </template>

      <!-- Preview Tab -->
      <template #preview>
        <div class="tab">
          <OrganismsBlogCreatePreview v-model:blog-post="blogPost" />
        </div>
      </template>
    </UTabs>
    <div class="actions">
      <UButton @click="handleCreate">Create Blog Post</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const {
  computeReadingTime,
  // createBlogPost,
  getAuthor,
  getDefaultImages,
  generateSlug
} = useBlogPosts()

const blogPost = ref<Partial<BlogPost>>({
  title: 'Sample Blog Post',
  content: '<p>This is a sample blog post content.</p>',
  metaDescription: 'A sample meta description for the blog post.',
  slug: 'sample-blog-post',
  updated_at: new Date().toISOString(),
  author: {
    display_name: 'John Doe',
    handle: 'johndoe',
    avatar: '/img/default-avatar.png',
    id: '12345'
  },
  keywords: ['sample', 'blog', 'post'],
  tags: ['example', 'test'],
  canonicalUrl: 'https://example.com/sample-blog-post',
  featuredImage: '/img/logo-type-dark.png',
  socialImage: '/img/logo.png',
  readingTime: '5 min',
  cta_link: 'https://example.com',
  type: 'article',
  appId: 'fireux-app',
  product_id: 'product-123'
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

function updateBlogPost(updatedFields: Partial<BlogPost>) {
  blogPost.value = { ...blogPost.value, ...updatedFields }
}

async function handleCreate() {
  try {
    // Set dummy URLs for testing
    blogPost.value.featuredImage = 'https://dummy.url/featuredImage.jpg'
    blogPost.value.socialImage = 'https://dummy.url/socialImage.jpg'

    // Create the blog post document
    // const created = await createBlogPost(blogPost.value)
    // console.log('Blog post created', created)
    console.log('Blog post created', blogPost.value)
  } catch (err) {
    console.error('Error creating blog post:', err)
  }
}
</script>

<style scoped lang="css">
.root-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
