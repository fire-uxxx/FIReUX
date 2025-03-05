<!-- File: layouts/default.vue -->
<template>
  <div class="default-layout">
    <LayoutHeader />
    <div class="default-layout-content">
      <main class="default-layout-main-content">
        <client-only>
          <UBreadcrumb :links="breadcrumbLinks" class="crumb" />
        </client-only>
        <NuxtPage />
      </main>
    </div>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
const breadcrumbLinks = useBreadcrumbs()
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background: linear-gradient(135deg, var(--background-2), var(--background));
}

.default-layout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.default-layout-main-content {
  width: 100%;
}
.crumb {
  padding-left: 1rem;
}
</style>
