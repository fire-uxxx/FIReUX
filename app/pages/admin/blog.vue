<template>
  <ClientOnly>
    <div class="dashboard-page-grid">
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <UButton to="/__studio/content/blog" target="_blank" icon="i-lucide-pen-line" size="lg">
              Open Blog Studio
            </UButton>
          </template>
        </UCard>
      </div>

      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <p>Total posts: {{ postCount }}</p>
          </template>
        </UCard>
      </div>

      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <p>Last post title: {{ lastPost?.title || 'N/A' }}</p>
          </template>
        </UCard>
      </div>

      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminBlogLink />
          </template>
        </UCard>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { label, icon } = getRouteMetaForPath('/admin/blog')

definePageMeta({
  layout: 'dashboard',
  layoutProps: {
    dashboardType: 'admin-dashboard'
  },
  title: label,
  icon: icon
})

// TODO: Replace with real Nuxt Content query logic
const postCount = 0
const lastPost = null
</script>
