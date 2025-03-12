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
<style lang="scss" scoped>
/* ✅ Super Parent Layout */
.layout-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Ensures everything is aligned centrally */
  justify-content: space-between;
}

/* ✅ Centers Page Content */
.layout-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Keeps everything centered */
  width: 100%;
  max-width: 1200px; /* ✅ Prevents excessive stretching */
}

/* ✅ Ensures Main Content Aligns Well */
.layout-main-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Center content */
  text-align: center;
  width: 100%;
  max-width: 900px; /* ✅ Keeps it readable on large screens */
}

/* ✅ Breadcrumbs Styling */
.layout-breadcrumbs {
  align-self: flex-start; /* ✅ Aligns to the left */
  margin-bottom: var(--space-4);
}
</style>
