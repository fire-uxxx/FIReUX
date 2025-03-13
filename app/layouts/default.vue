<template>
  <div class="layout-container">
    <LayoutsHeader :nav-links="mainNavLinks" />
    <div class="layout-content">
      <main class="layout-main-content">
        <client-only>
          <UBreadcrumb :links="breadcrumbLinks" class="layout-breadcrumbs" />
        </client-only>
        <NuxtPage />
      </main>
    </div>
    <LayoutsDefaultFooter />
  </div>
</template>

<script setup lang="ts">
const breadcrumbLinks = useBreadcrumbs()

const mainNavLinks = ref([
  { label: 'products', to: '/products' },
  { label: 'white-label', to: '/white-label' },
  { label: 'saas', to: '/saas' },
  { label: 'templates', to: '/templates' },
  { label: 'pricing', to: '/pricing' },
  { label: 'getting-started', to: '/getting-started' }
])
</script>